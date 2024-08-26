import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const funds = pgTable("funds", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  amount: text("amount").notNull(),
  about: text("about").notNull(),
  photoUrl: text("photo_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  userId: text("user_id").notNull(),
});

export const insertFundsSchema = createInsertSchema(funds);
export const insertAccountSchema = createInsertSchema(account);
