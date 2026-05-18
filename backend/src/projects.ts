import type { Context } from "elysia";
import postgres from "postgres";
import * as v from "valibot";

type DB = ReturnType<typeof postgres>;

export async function getProjects(db: DB) {
    return await db`select * from projects`;
}

const newProjectSchema = v.object({
    title: v.pipe(v.string(), v.trim(), v.minLength(1)),
    description: v.string(),
});

export async function createProject(ctx: Context, db: DB) {
    const body = ctx.body;

    const checkType = v.safeParse(newProjectSchema, body);

    if (!checkType.success) {
        ctx.set.status = 400;
        return {
            error: "Invalid request body",
        };
    }

    const { title, description } = checkType.output;

    const result = await db`
        insert into projects (title, description)
        values (${title}, ${description})
        returning *
    `;

    ctx.set.status = 201;
    return result[0];
}

const updateProjectSchema = v.object({
    title: v.optional(v.pipe(v.string(), v.trim(), v.minLength(1))),
    description: v.optional(v.string()),
});

export async function updateProject(ctx: Context, db: DB) {
    const id = parseInt(ctx.params.id as string, 10);

    if (isNaN(id)) {
        ctx.set.status = 400;
        return { error: "Invalid project ID" };
    }

    const body = ctx.body;
    const checkType = v.safeParse(updateProjectSchema, body);

    if (!checkType.success) {
        ctx.set.status = 400;
        return {
            error: "Invalid request body",
        };
    }

    const { title, description } = checkType.output;

    const safeTitle = title ?? null;
    const safeDescription = description ?? null;

    const updatedProject = await db`
        update projects
        set title = coalesce(${safeTitle}, title),
            description = coalesce(${safeDescription}, description)
        where id = ${id}
        returning *
    `;

    if (updatedProject.length === 0) {
        ctx.set.status = 404;
        return {
            error: "Project not found",
        };
    }

    return updatedProject[0];
}

export async function deleteProject(ctx: Context, db: DB) {
    const id = parseInt(ctx.params.id as string, 10);

    if (isNaN(id)) {
        ctx.set.status = 400;
        return { error: "Invalid project ID" };
    }

    const deletedProject = await db`
        delete from projects
        where id = ${id}
        returning *
    `;

    if (deletedProject.length === 0) {
        ctx.set.status = 404;
        return {
            error: "Project not found",
        };
    }

    return deletedProject[0];
}

export async function getProjectById(ctx: Context, db: DB) {
    const id = parseInt(ctx.params.id as string, 10);

    if (isNaN(id)) {
        ctx.set.status = 400;
        return { error: "Invalid project ID" };
    }

    const project = await db`
        select * from projects
        where id = ${id}
    `;

    if (project.length === 0) {
        ctx.set.status = 404;
        return {
            error: "Project not found",
        };
    }

    return project[0];
}
