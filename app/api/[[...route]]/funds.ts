import { db } from "@/db/drizzel";
import { funds, insertFundsSchema } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "User not authenticated" }, 401);
    }
    const data = await db
      .select({
        id: funds.id,
        name: funds.name,
        date: funds.createdAt,
        amount: funds.amount,
        description: funds.description,
        about: funds.about,
        photoUrl: funds.photoUrl,
        userId: funds.userId,
      })
      .from(funds);
    return ctx.json({ data });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertFundsSchema.pick({
        name: true,
        description: true,
        amount: true,
        about: true,
        photoUrl: true,
      }),
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const values = ctx.req.valid("json");

      if (!auth?.userId) {
        return ctx.json({ error: "User not authenticated" }, 401);
      }
      const data = await db
        .insert(funds)
        .values({
          userId: auth.userId,
          createdAt: new Date(),
          id: createId(),
          ...values,
        })
        .returning();
      return ctx.json({ data: data[0] });
    },
  );

export default app;
