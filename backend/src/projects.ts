import type { Context } from "elysia";
import postgres from "postgres";
import * as v from "valibot";

type DB = ReturnType<typeof postgres>;

export async function getProjects(db: DB) {
    return await db`select * from projects`;
}

const newProjectSchema = v.object({
    title: v.string(),
    description: v.string(),
});

export async function createProject(ctx: Context, db: DB) {
    const body = ctx.body;

    const checkType = v.safeParse(newProjectSchema, body);

    if (!checkType.success) {
        return ctx.status(400, {
            error: "Invalid request body",
        });
    }

    const { title, description } = checkType.output;

    return await db`
        insert into projects (title, description)
        values (${title}, ${description})
        returning *
    `;
}

const updateProjectSchema = v.object({
    title: v.optional(v.string()),
    description: v.optional(v.string()),
});

export async function updateProject(ctx: Context, db: DB) {
    const { id } = ctx.params;
    const body = ctx.body;
    const checkType = v.safeParse(updateProjectSchema, body);

    if (!checkType.success) {
        return ctx.status(400, {
            error: "Invalid request body",
        });
    }

    const { title, description } = checkType.output;

    const existingProject = await db`
        select * from projects where id = ${id}
    `;

    if (existingProject.length === 0) {
        return ctx.status(404, {
            error: "Project not found",
        });
    }

    const safeTitle = title ?? null;
    const safeDescription = description ?? null;

    const updatedProject = await db`
        update projects
        set title = coalesce(${safeTitle}, title),
            description = coalesce(${safeDescription}, description)
        where id = ${id}
        returning *
    `;
    return updatedProject[0];
}
