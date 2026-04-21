import type { Context } from "elysia";
import postgres from "postgres";
import * as v from "valibot";

type DB = ReturnType<typeof postgres>;

export async function getEntries(ctx: Context, db: DB) {
    if (!Number.isInteger(ctx.query.page) || Number(ctx.query.page) < 1) {
        ctx.set.status = 400;
        return { error: "Invalid page number" };
    }
    const page = parseInt(ctx.query.page as string, 10) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        return await db`select e.*,
        COALESCE(json_agg(t.*) FILTER (WHERE t.id IS NOT NULL), '[]') as tags
        from entries e
        left join entry_tags et on e.id = et.entry_id
        left join tags t on et.tag_id = t.id
        group by e.id
        order by e.id desc
        limit ${limit} offset ${offset}`;
    } catch (error) {
        ctx.set.status = 500;
        return { error: "Internal server error: failed to fetch entries" };
    }
}

async function hasActiveEntry(db: DB) {
    const [activeEntry] = await db`
        select exists (
            select 1
            from entries
            where finish_time is null
        ) as "isClockedIn"
        `;

    return activeEntry;
}

export async function checkClockInStatus(ctx: Context, db: DB) {
    try {
        const activeEntry = await hasActiveEntry(db);
        ctx.set.status = 200;
        return activeEntry;
    } catch (error) {
        ctx.set.status = 500;
        return {
            error: "Internal server error: failed to check clock-in status",
        };
    }
}

const newEntriesSchema = v.object({
    description: v.optional(v.string("Description must be a string")),
    project_id: v.optional(v.number("Project ID must be a number")),
    start_time: v.optional(v.pipe(v.string(), v.isoTimestamp())),
    finish_time: v.optional(v.pipe(v.string(), v.isoTimestamp())),
    tagIds: v.optional(v.array(v.number("Tag ID must be a number"))),
});

export async function createEntry(ctx: Context, db: DB) {
    try {
        const activeEntryStatus = await hasActiveEntry(db);
        if (activeEntryStatus.isClockedIn) {
            ctx.set.status = 400;
            return { error: "Cannot create a new entry while clocked in" };
        }

        const body = ctx.body;
        const checkType = v.safeParse(newEntriesSchema, body);

        if (!checkType.success) {
            ctx.set.status = 400;
            return {
                error: "Invalid request body",
                issues: checkType.issues,
            };
        }

        const { description, project_id, tagIds } = checkType.output;

        const result = await db.begin(async (tx) => {
            const [entry] = await tx`
                insert into entries (
                    description
                    ${project_id ? tx`, project_id` : tx``}
                )
                values (
                    ${description ?? ""}
                    ${project_id ? tx`, ${project_id}` : tx``}
                )
                returning *
            `;

            if (tagIds && tagIds.length > 0) {
                const entryTags = tagIds.map((tagId) => ({
                    entry_id: entry.id,
                    tag_id: tagId,
                }));

                await tx`insert into entry_tags ${tx(entryTags)}`;
            }

            return entry;
        });

        ctx.set.status = 201;
        return result;
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "23505"
        ) {
            ctx.set.status = 400;
            return { error: "Cannot create a new entry while clocked in" };
        }

        ctx.set.status = 500;
        return { error: "Internal server error: failed to create entry" };
    }
}

const updateEntriesSchema = v.object({
    description: v.optional(v.string("Description must be a string")),
    project_id: v.optional(v.number("Project ID must be a number")),
    start_time: v.optional(v.pipe(v.string(), v.isoTimestamp())),
    finish_time: v.optional(v.pipe(v.string(), v.isoTimestamp())),
    tagIds: v.optional(v.array(v.number("Tag ID must be a number"))),
});

export async function updateEntry(ctx: Context, db: DB) {
    const id = parseInt(ctx.params.id as string, 10);

    if (isNaN(id)) {
        ctx.set.status = 400;
        return { error: "Invalid entry ID" };
    }

    const body = ctx.body;
    const checkType = v.safeParse(updateEntriesSchema, body);

    if (!checkType.success) {
        ctx.set.status = 400;
        return {
            error: "Invalid request body",
            issues: checkType.issues,
        };
    }

    const { description, project_id, start_time, finish_time, tagIds } =
        checkType.output;

    try {
        const result = await db.begin(async (tx) => {
            const updatedEntries = await tx`
                update entries
                set description = coalesce(${description ?? null}, description),
                    project_id = coalesce(${project_id ?? null}, project_id),
                    start_time = coalesce(${start_time ?? null}, start_time),
                    finish_time = coalesce(${finish_time ?? null}, finish_time)
                where id = ${id}
                returning *
            `;

            if (updatedEntries.length === 0) {
                return null;
            }

            if (tagIds !== undefined) {
                await tx`delete from entry_tags where entry_id = ${id}`;

                if (tagIds.length > 0) {
                    const entryTags = tagIds.map((tagId) => ({
                        entry_id: id,
                        tag_id: tagId,
                    }));
                    await tx`insert into entry_tags ${tx(entryTags)}`;
                }
            }

            return updatedEntries[0];
        });

        if (!result) {
            ctx.set.status = 404;
            return { error: "Entry not found" };
        }

        return result;
    } catch (error) {
        ctx.set.status = 500;
        return { error: "Internal server error: failed to update entry" };
    }
}

export async function deleteEntry(ctx: Context, db: DB) {
    const id = parseInt(ctx.params.id as string, 10);

    if (isNaN(id)) {
        ctx.set.status = 400;
        return { error: "Invalid entry ID" };
    }

    try {
        const deletedEntry = await db`
            delete from entries
            where id = ${id}
            returning *
        `;

        if (deletedEntry.length === 0) {
            ctx.set.status = 404;
            return { error: "Entry not found" };
        }

        return deletedEntry[0];
    } catch (error) {
        ctx.set.status = 500;
        return { error: "Internal server error: failed to delete entry" };
    }
}

export async function clockOut(ctx: Context, db: DB) {
    try {
        const updatedEntries = await db`
            update entries
            set finish_time = now()
            where finish_time is null
            returning *
        `;

        if (updatedEntries.length === 0) {
            ctx.set.status = 404;
            return { error: "Active entry not found" };
        }

        return updatedEntries[0];
    } catch (error) {
        ctx.set.status = 500;
        return { error: "Internal server error: failed to clock out" };
    }
}
