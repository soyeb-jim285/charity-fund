import { db } from "@/db/drizzel";
import { account, funds } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

const app = new Hono().get("/", clerkMiddleware(), async (ctx) => {
  const auth = getAuth(ctx);
  if (!auth?.userId) {
    return ctx.json({ error: "User not authenticated" }, 401);
  }
  const data = await db
    .select({
      id: account.id,
      name: account.name,
    })
    .from(account);
  return ctx.json({ data });
});

export default app;
