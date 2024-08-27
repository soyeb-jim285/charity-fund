CREATE TABLE IF NOT EXISTS "account" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"user_id" text NOT NULL
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
	"moderators" text[] NOT NULL
);
