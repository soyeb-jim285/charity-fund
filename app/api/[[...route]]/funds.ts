import { db } from "@/db/drizzel";
import { funds, insertFundsSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { Hono } from "hono";

const app = new Hono()
  .get("/", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "User not authenticated" }, 401);
    }
    const data = await db
      .select({
        id: funds.id,
        userId: funds.userId,
        name: funds.name,
        date: funds.createdAt,
        amount: funds.amount,
        description: funds.description,
        about: funds.about,
        photoUrl: funds.photoUrl,
        moderators: funds.moderators,
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
        moderators: true,
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
          id: createId(),
          userId: auth.userId,
          createdAt: new Date(),
          ...values,
          moderators: Array.isArray(values.moderators)
            ? values.moderators
            : [auth.userId], // Ensure moderators is an array
        })
        .returning();
      return ctx.json({ data: data[0] });
    },
  );

export default app;

// Argument of type '{ name: string; description: string; amount: string; about: string; photoUrl: string; moderators: string; userId: string; createdAt: Date; id: string; }' is not assignable to parameter of type '{ id: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<string, any>; name: string | SQL<unknown> | Placeholder<string, any>; ... 5 more ...; moderators: string[] | ... 1 more ... | Placeholder<...>; }'.
