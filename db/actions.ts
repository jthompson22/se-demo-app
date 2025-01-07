'use cache';
import { revalidateTag } from 'next/cache';
import { db } from './index';
import { Post, Social, Feedback } from './schema';
import { desc, eq, sql } from 'drizzle-orm';
import {
  unstable_cacheLife as cacheLife,
  revalidatePath,
  unstable_cacheTag as cacheTag,
} from 'next/cache';

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

export async function getAllSlugs() {
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

export async function submitFeedback(
  postId: string,
  type: 'like' | 'dislike',
  comment: string,
  slug: string,
) {
  try {
    await db.insert(Feedback).values({
      postId,
      type,
      comment,
      createdAt: new Date(),
    });

    console.log('type', type);

    // Update the social metrics
    await db
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
    return { success: true };
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    return { success: false, error: 'Failed to submit feedback' };
  }
}

export async function getSocialMetrics(postId: string) {
  cacheTag(`metrics-${postId}`);
  cacheLife('metrics');
  console.log('getSocialMetrics', postId);
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
