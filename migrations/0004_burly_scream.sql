ALTER TABLE "accounts" ALTER COLUMN "current_balance" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "current_balance" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "received_balance" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "received_balance" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "withdraw_balance" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "withdraw_balance" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "funds" ALTER COLUMN "amount" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" SET DEFAULT 0;