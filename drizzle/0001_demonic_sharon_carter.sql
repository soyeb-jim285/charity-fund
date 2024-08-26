CREATE TABLE IF NOT EXISTS "funding" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"amount" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
