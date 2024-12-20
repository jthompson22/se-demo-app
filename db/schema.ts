import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const postsTable = pgTable('Post', {
  id: text('id').primaryKey().notNull(),
  title: text('title'),
  description: text('description'),
  content: text('content'),
  slug: text('slug').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  published: text('published').default('false').notNull(),
});
