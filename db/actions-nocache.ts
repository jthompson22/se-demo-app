'use server';
import { db } from '../db/index';
import { Social, Feedback } from '../db/schema';
import { sql } from 'drizzle-orm';

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
    console.log('RESULT', result);

    //await revalidate(`metrics-${postId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    return { success: false, error: 'Failed to submit feedback' };
  }
}
