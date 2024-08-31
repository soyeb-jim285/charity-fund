import { sql } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const funds = pgTable("funds", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(), //
  amount: integer("amount").notNull().default(0), //
  about: text("about").notNull(), //
  photoUrl: text("photo_url").notNull(), //
  createdAt: timestamp("created_at").defaultNow(),
  moderators: text("moderators")
    .array()
    .default(sql`ARRAY[]::text[]`),
});
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  username: text("username").unique().notNull(),
  role: text("role").notNull().default("user"),
  userId: text("user_id").notNull(),
  institution: text("institution"),
  createdAt: timestamp("created_at").defaultNow(),
  dateofBirth: timestamp("date_of_birth"),
  funds: text("funds")
    .array()
    .default(sql`ARRAY[]::text[]`),
  phoneNumber: text("phone_number"),
  photoUrl: text("photo_url"),
  about: text("about"),
  facebook: text("facebook"),
  twitter: text("twitter"),
  linkedin: text("linkedin"),
  telegram: text("telegram"),
  discord: text("discord"),
  bkash: numeric("bkash"),
  bkash_image_url: text("bkash_image_url"),
  nagad: numeric("nagad"),
  nagad_image_url: text("nagad_image_url"),
  bank_account: numeric("bank_account"),
  bank_brach: text("bank_brach"),
  current_balance: integer("current_balance").notNull().default(0),
  received_balance: integer("received_balance").notNull().default(0),
  withdraw_balance: integer("withdraw_balance").notNull().default(0),
});

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  amount: integer("amount").notNull().default(0),
  type: text("type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  transactionId: text("transaction_id").notNull(),
  status: text("status").notNull(),
  to: text("to").notNull(),
  from: text("from").notNull(),
  fundId: text("fund_id").notNull(),
  description: text("description").notNull(),
});

export const insertFundsSchema = createInsertSchema(funds);
export const insertAccountsSchema = createInsertSchema(accounts);
