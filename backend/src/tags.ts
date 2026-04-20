import type { Context } from "elysia";
import postgres from "postgres";
import * as v from "valibot";

type DB = ReturnType<typeof postgres>;

export async function getTags(db: DB) {
    return await db`select * from tags`;
}

const newTagsSchema = v.object({
    title: v.pipe(v.string(), v.trim(), v.minLength(1)),
    description: v.string(),
});

export async function createTag(ctx: Context, db: DB) {
    const body = ctx.body;

    const checkType = v.safeParse(newTagsSchema, body);

    if (!checkType.success) {
        ctx.set.status = 400;
        return {
            error: "Invalid request body",
        };
    }

    const { title, description } = checkType.output;

    const result = await db`
        insert into tags (title, description)
        values (${title}, ${description})
        returning *
    `;

    ctx.set.status = 201;
    return result[0];
}

const updateTagsSchema = v.object({
    title: v.optional(v.pipe(v.string(), v.trim(), v.minLength(1))),
    description: v.optional(v.string()),
});

export async function updateTag(ctx: Context, db: DB) {
    const id = parseInt(ctx.params.id as string, 10);

    if (isNaN(id)) {
        ctx.set.status = 400;
        return { error: "Invalid tag ID" };
    }

    const body = ctx.body;
    const checkType = v.safeParse(updateTagsSchema, body);

    if (!checkType.success) {
        ctx.set.status = 400;
        return {
            error: "Invalid request body",
        };
    }

    const { title, description } = checkType.output;

    const safeTitle = title ?? null;
    const safeDescription = description ?? null;

    const updatedTags = await db`
        update tags
        set title = coalesce(${safeTitle}, title),
            description = coalesce(${safeDescription}, description)
        where id = ${id}
        returning *
    `;

    if (updatedTags.length === 0) {
        ctx.set.status = 404;
        return {
            error: "tag not found",
        };
    }

    return updatedTags[0];
}

export async function deleteTag(ctx: Context, db: DB) {
    const id = parseInt(ctx.params.id as string, 10);

    if (isNaN(id)) {
        ctx.set.status = 400;
        return { error: "Invalid tag ID" };
    }

    const deletedTags = await db`
        delete from tags
        where id = ${id}
        returning *
    `;

    if (deletedTags.length === 0) {
        ctx.set.status = 404;
        return {
            error: "tag not found",
        };
    }

    return deletedTags[0];
}
