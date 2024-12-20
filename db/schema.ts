import {
  pgTable,
  text,
  timestamp,
  integer,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const Post = pgTable('Post', {
  id: text('id').primaryKey().notNull(),
  title: text('title'),
  description: text('description'),
  content: text('content'),
  slug: text('slug').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  published: text('published').default('false').notNull(),
});

export const Social = pgTable('Social', {
  postId: text('postId')
    .references(() => Post.id)
    .primaryKey(),
  likes: integer('likes').default(0).notNull(),
  dislikes: integer('dislikes').default(0).notNull(),
  views: integer('views').default(0).notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});
