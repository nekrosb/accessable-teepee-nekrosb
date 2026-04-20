import { Elysia } from "elysia";
import postgres from "postgres";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "./projects";
import { createTag, deleteTag, getTags, updateTag } from "./tags";

const sql = postgres(
  process.env.DATABASE_URL ||
    "postgres://postgres:password@localhost:5432/app_database",
);

const app = new Elysia().decorate("db", sql)
  .get("/projects", async (ctx) => {
    return await getProjects(ctx.db);
  })
  .post("/projects", async (ctx) => {
    return await createProject(ctx, ctx.db);
  })
  .patch("/projects/:id", async (ctx) => {
    return await updateProject(ctx, ctx.db);
  })
  .delete("/projects/:id", async (ctx) => {
    return await deleteProject(ctx, ctx.db);
  })
  .get("/tags", async (ctx) => {
    return await getTags(ctx.db);
  })
  .post("/tags", async (ctx) => {
    return await createTag(ctx, ctx.db);
  })
  .patch("/tags/:id", async (ctx) => {
    return await updateTag(ctx, ctx.db);
  })
  .delete("/tags/:id", async (ctx) => {
    return await deleteTag(ctx, ctx.db);
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
