// import { db } from './index';
// import { Post, Social, Feedback } from './schema';
// import { desc, eq, sql } from 'drizzle-orm';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
// import { unstable_cacheLife as cacheLife } from 'next/cache';

// export async function getSocialMetrics(postId: string) {
//   'use cache';
//   cacheTag(`metrics-${postId}`);
//   console.log('getSocialMetrics', postId);
//   try {
//     const metrics = await db
//       .select({
//         likes: Social.likes,
//         dislikes: Social.dislikes,
//         views: Social.views,
//       })
//       .from(Social)
//       .where(eq(Social.postId, postId))
//       .limit(1);

//     return {
//       likes: metrics[0]?.likes ?? 0,
//       dislikes: metrics[0]?.dislikes ?? 0,
//       views: metrics[0]?.views ?? 0,
//     };
//   } catch (error) {
//     console.error('Failed to fetch social metrics:', error);
//     throw new Error('Failed to fetch social metrics');
//   }
// }
