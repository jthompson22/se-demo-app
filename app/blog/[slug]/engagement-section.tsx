import { BlogMetrics } from '@/app/blog-metrics';
import { AddEngagementInteractivity } from './add-engagement-interactivity';

//Allows optimistic rendering by passing server components into the client component as children

export async function EngagementSection({
  slug,
  submitFeedback,
  post,
}: {
  slug: string;
  submitFeedback: any;
  post: { id: string };
}) {
  return (
    <div className="flex gap-4 text-sm text-primary/60">
      <AddEngagementInteractivity
        postId={post.id}
        submitFeedback={submitFeedback}
        slug={slug}
      >
        <BlogMetrics postId={post.id} />
      </AddEngagementInteractivity>
    </div>
  );
}
