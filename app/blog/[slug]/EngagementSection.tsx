import { getSocialMetrics } from '@/db/actions-nocache';
import EngagementButtons from '@/components/EngagementButtons';
import { connection } from 'next/server';

export async function EngagementSection({
  slug,
  submitFeedback,
  post,
}: {
  slug: string;
  submitFeedback: any;
  post: { id: string };
}) {
  // Mark this component's data requirements as dynamic
  await connection();

  const socialMetrics = await getSocialMetrics(post.id);
  const postWithMetrics = {
    ...post,
    ...socialMetrics,
  };

  return (
    <EngagementButtons
      post={postWithMetrics}
      submitFeedback={submitFeedback}
      slug={slug}
    />
  );
}
