import { db } from "@/db/drizzel";
import { accounts, funds, insertAccountsSchema } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

const app = new Hono()
  .get("/", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "User not authenticated" }, 401);
    }
    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
        email: accounts.email,
        username: accounts.username,
        userId: accounts.userId,
        institution: accounts.institution,
        dateofBirth: accounts.dateofBirth,
        createdAt: accounts.createdAt,
        funds: accounts.funds,
        role: accounts.role,
        phoneNumber: accounts.phoneNumber,
        photoUrl: accounts.photoUrl,
        about: accounts.about,
        bkash: accounts.bkash,
        bkash_image_url: accounts.bkash_image_url,
        nagad: accounts.nagad,
        nagad_image_url: accounts.nagad_image_url,
        bank_account: accounts.bank_account,
        bank_brach: accounts.bank_brach,
        current_balance: accounts.current_balance,
        received_balance: accounts.received_balance,
        withdraw_balance: accounts.withdraw_balance,
      })
      .from(accounts);
    return ctx.json({ data });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertAccountsSchema.pick({
        name: true,
        email: true,
        username: true,
        userId: true,
        institution: true,
        dateofBirth: true,
        role: true,
        phoneNumber: true,
        photoUrl: true,
        about: true,
        bkash: true,
        bkash_image_url: true,
        nagad: true,
        nagad_image_url: true,
        bank_account: true,
        bank_brach: true,
        current_balance: true,
        received_balance: true,
        withdraw_balance: true,
      }),
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const values = ctx.req.valid("json");
      if (!auth?.userId) {
        return ctx.json({ error: "User not authenticated" }, 401);
      }
      const data = await db
        .insert(accounts)
        .values({
          id: createId(),
          createdAt: new Date(),
          ...values,
        })
        .returning();
      return ctx.json({ data: data[0] });
    },
  );

export default app;
