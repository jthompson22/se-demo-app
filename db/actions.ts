'use server';
import { db } from './index';
import { Post, Social } from './schema';
import { desc, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

export async function getPublishedPost() {
  try {
    const posts = await db
      .select({
        id: Post.id,
        title: Post.title,
        createdAt: Post.createdAt,
        slug: Post.slug,
        likes: Social.likes,
        dislikes: Social.dislikes,
        views: Social.views,
      })
      .from(Post)
      .leftJoin(Social, eq(Post.id, Social.postId))
      .where(eq(Post.published, 'true'))
      .orderBy(desc(Post.createdAt));

    // Ensure social metrics are never null
    return posts.map((post) => ({
      ...post,
      likes: post.likes ?? 0,
      dislikes: post.dislikes ?? 0,
      views: post.views ?? 0,
    }));
  } catch (error) {
    console.error('Failed to fetch blog Post:', error);
    throw new Error('Failed to fetch blog Post');
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await db
      .select({
        title: Post.title,
        description: Post.description,
        content: Post.content,
        createdAt: Post.createdAt,
        likes: Social.likes,
        dislikes: Social.dislikes,
        views: Social.views,
      })
      .from(Post)
      .leftJoin(Social, eq(Post.id, Social.postId))
      .where(eq(Post.slug, slug))
      .limit(1);

    if (!post[0]) return null;

    return {
      ...post[0],
      likes: post[0].likes ?? 0,
      dislikes: post[0].dislikes ?? 0,
      views: post[0].views ?? 0,
    };
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

export async function updatePostEngagement(formData: FormData) {
  const slug = formData.get('slug') as string;
  const action = formData.get('action') as 'like' | 'dislike';
  const cookieStore = cookies();

  // Get post ID from slug
  const [post] = await db
    .select({ id: Post.id })
    .from(Post)
    .where(eq(Post.slug, slug));

  if (!post) return { error: 'Post not found' };

  // Get existing engagement from cookie
  const engagementCookie = cookieStore.get(`post-${slug}-engagement`);
  const previousAction = engagementCookie?.value as
    | 'like'
    | 'dislike'
    | undefined;

  // If same action, remove it (toggle off)
  if (previousAction === action) {
    cookieStore.delete(`post-${slug}-engagement`);
    await db
      .update(Social)
      .set({
        [action === 'like' ? 'likes' : 'dislikes']: sql`${
          Social[action === 'like' ? 'likes' : 'dislikes']
        } - 1`,
        updatedAt: new Date(),
      })
      .where(eq(Social.postId, post.id));
    return { action: null };
  }

  // If different action, need to remove previous and add new
  if (previousAction) {
    await db
      .update(Social)
      .set({
        [previousAction === 'like' ? 'likes' : 'dislikes']: sql`${
          Social[previousAction === 'like' ? 'likes' : 'dislikes']
        } - 1`,
        [action === 'like' ? 'likes' : 'dislikes']: sql`${
          Social[action === 'like' ? 'likes' : 'dislikes']
        } + 1`,
        updatedAt: new Date(),
      })
      .where(eq(Social.postId, post.id));
  } else {
    // New engagement
    await db
      .update(Social)
      .set({
        [action === 'like' ? 'likes' : 'dislikes']: sql`${
          Social[action === 'like' ? 'likes' : 'dislikes']
        } + 1`,
        updatedAt: new Date(),
      })
      .where(eq(Social.postId, post.id));
  }

  // Set new cookie
  cookieStore.set(`post-${slug}-engagement`, action, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return { action };
}
