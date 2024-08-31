ALTER TABLE "account" ADD COLUMN "current_balance" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "received_balance" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "withdraw_balance" numeric NOT NULL;