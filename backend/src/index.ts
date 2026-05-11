import postgres from "postgres";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "./projects";
import { createTag, deleteTag, getTags, updateTag } from "./tags";
import {
  checkClockInStatus,
  clockOut,
  createEntry,
  deleteEntry,
  getEntries,
  getEntriesById,
  updateEntry,
} from "./entries";

const sql = postgres(
  process.env.DATABASE_URL ||
    "postgres://postgres:password@localhost:5432/app_database",
);

const app = new Elysia()
  .use(
    cors({
      origin: "*",
    }),
  )
  .decorate("db", sql)
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
  .get("/entries", async (ctx) => {
    return await getEntries(ctx, ctx.db);
  })
  .post("/entries", async (ctx) => {
    return await createEntry(ctx, ctx.db);
  })
  .patch("/entries/:id", async (ctx) => {
    return await updateEntry(ctx, ctx.db);
  })
  .delete("/entries/:id", async (ctx) => {
    return await deleteEntry(ctx, ctx.db);
  })
  .get("/entries/active", async (ctx) => {
    return await checkClockInStatus(ctx, ctx.db);
  })
  .patch("/entries/clockOut", async (ctx) => {
    return await clockOut(ctx, ctx.db);
  }).get("/entries/:id", async (ctx) => {
    return await getEntriesById(ctx, ctx.db);
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
