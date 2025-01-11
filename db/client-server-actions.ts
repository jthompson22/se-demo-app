'use server';
import { db } from './index';
import { Social } from './schema';
import { eq, sql } from 'drizzle-orm';

/**
 * This file contains server actions that can be imported directly into client components
 * since it has the 'use server' directive at the file level.
 * This allows for better code organization by avoiding prop drilling of server functions.
 */

import { revalidateTag } from 'next/cache';

export async function revalidate(tag: string) {
  console.log('revalidate', tag);
  await revalidateTag(tag);
}

export async function incrementViews(postId: string) {
  try {
    await db
      .update(Social)
      .set({
        views: sql`${Social.views} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(Social.postId, postId));
  } catch (error) {
    console.error('Failed to increment views:', error);
    throw new Error('Failed to increment views');
  }
}
