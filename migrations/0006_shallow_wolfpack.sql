ALTER TABLE "accounts" ALTER COLUMN "institution" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "funds" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "phone_number" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "photo_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "about" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "bkash" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "bkash_image_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "nagad" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "nagad_image_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "bank_account" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "bank_brach" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "funds" ALTER COLUMN "moderators" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "date_of_birth" timestamp;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "facebook" text;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "twitter" text;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "linkedin" text;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "telegram" text;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "discord" text;