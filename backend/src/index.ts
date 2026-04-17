import { Elysia } from "elysia";
import postgres from "postgres";
import { createProject, getProjects, updateProject } from "./projects";

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
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
