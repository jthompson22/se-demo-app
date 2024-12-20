CREATE TABLE "Post" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"content" text,
	"slug" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"published" text DEFAULT 'false' NOT NULL
);
