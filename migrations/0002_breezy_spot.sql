CREATE TABLE "Feedback" (
	"id" text PRIMARY KEY NOT NULL,
	"postId" text NOT NULL,
	"type" text NOT NULL,
	"comment" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_postId_Post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE no action ON UPDATE no action;