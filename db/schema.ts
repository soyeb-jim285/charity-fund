import { pgTable, text } from "drizzle-orm/pg-core";

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  userId: text("user_id").notNull(),
});
