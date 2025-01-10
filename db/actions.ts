import { db } from './index';
import { Post, Social, Feedback } from './schema';
import { desc, eq } from 'drizzle-orm';
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache';
import { sql } from 'drizzle-orm';

export async function getPublishedPost() {
  'use cache';
  cacheLife('blog');
  try {
    const posts = await db
      .select({
        id: Post.id,
        title: Post.title,
        createdAt: Post.createdAt,
        slug: Post.slug,
      })
      .from(Post)
      .where(eq(Post.published, 'true'))
      .orderBy(desc(Post.createdAt));

    return posts;
  } catch (error) {
    console.error('Failed to fetch blog Post:', error);
    throw new Error('Failed to fetch blog Post');
  }
}

export async function getPostBySlug(slug: string) {
  'use cache';
  cacheTag(`post-${slug}`);
  cacheLife('blog');
  try {
    const post = await db
      .select({
        id: Post.id,
        title: Post.title,
        description: Post.description,
        content: Post.content,
        createdAt: Post.createdAt,
      })
      .from(Post)
      .where(eq(Post.slug, slug))
      .limit(1);

    if (!post[0]) return null;

    return post[0];
  } catch (error) {
    console.error('Failed to fetch post:', error);
    throw new Error('Failed to fetch post');
  }
}
// export const getPostBySlug = cache(async (slug: string) => {
//   try {
//     const post = await db
//       .select({
//         id: Post.id,
//         title: Post.title,
//         description: Post.description,
//         content: Post.content,
//         createdAt: Post.createdAt,
//       })
//       .from(Post)
//       .where(eq(Post.slug, slug))
//       .limit(1);

//     if (!post[0]) return null;

//     return post[0];
//   } catch (error) {
//     console.error('Failed to fetch post:', error);
//     throw new Error('Failed to fetch post');
//   }
// });

export async function getAllSlugs() {
  'use cache';
  cacheTag('slugs');
  cacheLife('blog');
  try {
    const slugs = await db
      .select({ slug: Post.slug })
      .from(Post)
      .where(eq(Post.published, 'true'));

    return slugs;
  } catch (error) {
    console.error('Failed to fetch slugs:', error);
    throw new Error('Failed to fetch slugs');
  }
}

export async function getSocialMetrics(postId: string) {
  'use cache';
  cacheTag(`metrics-${postId}`);
  try {
    const metrics = await db
      .select({
        likes: Social.likes,
        dislikes: Social.dislikes,
        views: Social.views,
      })
      .from(Social)
      .where(eq(Social.postId, postId))
      .limit(1);
    return {
      likes: metrics[0]?.likes ?? 0,
      dislikes: metrics[0]?.dislikes ?? 0,
      views: metrics[0]?.views ?? 0,
    };
  } catch (error) {
    console.error('Failed to fetch social metrics:', error);
    throw new Error('Failed to fetch social metrics');
  }
}

export async function submitFeedback(
  postId: string,
  type: 'like' | 'dislike',
  comment: string,
  slug: string,
) {
  'use server';
  try {
    await db.insert(Feedback).values({
      postId,
      type,
      comment,
      createdAt: new Date(),
    });

    // Update the social metrics
    let result = await db
      .insert(Social)
      .values({
        postId,
        likes: type === 'like' ? 1 : 0,
        dislikes: type === 'like' ? 0 : 1,
        views: 0,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: Social.postId,
        set: {
          [type === 'like' ? 'likes' : 'dislikes']: sql`${
            type === 'like' ? Social.likes : Social.dislikes
          } + 1`,
          updatedAt: new Date(),
        },
      });
    //await revalidate(`metrics-${postId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    return { success: false, error: 'Failed to submit feedback' };
  }
}

/**
 * Engagement Section
 *
 * These functions handle post engagement metrics like:
 * - Views tracking
 * - Like/dislike counts
 * - User feedback submission
 *
 * Each function uses cache tags for efficient revalidation
 * of engagement data without reloading the entire page.
 */

export async function getEngagementMetrics(postId: string) {
  'use cache';
  cacheTag(`engagement-metrics-${postId}`);
  try {
    const metrics = await db
      .select({
        likes: Social.likes,
        dislikes: Social.dislikes,
      })
      .from(Social)
      .where(eq(Social.postId, postId))
      .limit(1);

    return {
      likes: metrics[0]?.likes ?? 0,
      dislikes: metrics[0]?.dislikes ?? 0,
    };
  } catch (error) {
    console.error('Failed to fetch engagement metrics:', error);
    throw new Error('Failed to fetch engagement metrics');
  }
}

export async function getViewMetrics(postId: string) {
  //Always be dynamic because views are dynamic
  //await new Promise((resolve) => setTimeout(resolve, 500));
  try {
    const metrics = await db
      .select({
        views: Social.views,
      })
      .from(Social)
      .where(eq(Social.postId, postId))
      .limit(1);

    return {
      views: metrics[0]?.views ?? 0,
    };
  } catch (error) {
    console.error('Failed to fetch view metrics:', error);
    throw new Error('Failed to fetch view metrics');
  }
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
