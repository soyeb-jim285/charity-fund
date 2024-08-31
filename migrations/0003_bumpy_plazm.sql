ALTER TABLE "accounts" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_username_unique" UNIQUE("username");