'use cache';
import { db } from './index';
import { Post, Social, Feedback } from './schema';
import { desc, eq, sql } from 'drizzle-orm';
import {
  unstable_cacheLife as cacheLife,
  revalidatePath,
  unstable_cacheTag as cacheTag,
} from 'next/cache';

export async function getPublishedPost() {
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
  try {
    cacheLife('blog');
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
  slug: string
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

