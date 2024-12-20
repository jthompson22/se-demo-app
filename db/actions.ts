'use server';
import { db } from './index';
import { Post, Social } from './schema';
import { desc, eq } from 'drizzle-orm';


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

//One line change
