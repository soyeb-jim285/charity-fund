ALTER TABLE "account" RENAME TO "accounts";--> statement-breakpoint
ALTER TABLE "transaction" RENAME TO "transactions";--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "funds" SET DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "funds" ALTER COLUMN "moderators" SET DEFAULT ARRAY[]::text[];