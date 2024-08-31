CREATE TABLE IF NOT EXISTS "account" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"user_id" text NOT NULL,
	"institution" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"funds" text[] DEFAULT '{}' NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"phone_number" text NOT NULL,
	"photo_url" text NOT NULL,
	"about" text NOT NULL,
	"bkash" numeric NOT NULL,
	"bkash_image_url" text NOT NULL,
	"nagad" numeric NOT NULL,
	"nagad_image_url" text NOT NULL,
	"bank_account" numeric NOT NULL,
	"bank_brach" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "funds" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"amount" text NOT NULL,
	"about" text NOT NULL,
	"photo_url" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"moderators" text[] DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" text NOT NULL,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"transaction_id" text NOT NULL,
	"status" text NOT NULL,
	"to" text NOT NULL,
	"from" text NOT NULL,
	"fund_id" text NOT NULL,
	"description" text NOT NULL
);
