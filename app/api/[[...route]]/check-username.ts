import { db } from "@/db/drizzel";
import { accounts } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { z } from "zod";

const app = new Hono();

const checkUsernameSchema = z.object({
  username: z.string(),
});

app.post(
  "/",
  clerkMiddleware(),
  zValidator("json", checkUsernameSchema),
  async (ctx) => {
    const { username } = ctx.req.valid("json");

    const existingUser = await db
      .select({ id: accounts.id })
      .from(accounts)
      .where(eq(accounts.username, username));

    const isUnique = existingUser.length === 0;
    return ctx.json({ isUnique });
  },
);

export default app;
