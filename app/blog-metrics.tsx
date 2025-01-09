import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { connection } from 'next/server';
import {
  getSocialMetrics,
  getEngagementMetrics,
  getViewMetrics,
} from '@/db/actions';
import { EngagementSkeleton } from '@/components/skeletons';
import { Suspense } from 'react';

export async function BlogMetrics({ postId }: { postId: string }) {
  return (
    <div className="flex gap-4 text-sm text-primary/60">
      <Suspense fallback={<EngagementSkeleton />}>
        <ViewMetrics postId={postId} />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex gap-4 text-sm text-primary/60">
            <EngagementSkeleton />
            <EngagementSkeleton />
          </div>
        }
      >
        <EngagementMetrics postId={postId} />
      </Suspense>
    </div>
  );
}

export async function ViewMetrics({ postId }: { postId: string }) {
  const metrics = await getViewMetrics(postId);
  return (
    <span className="flex items-center gap-1">
      <EyeIcon className="h-4 w-4" /> {metrics.views}
    </span>
  );
}

export async function EngagementMetrics({ postId }: { postId: string }) {
  const metrics = await getEngagementMetrics(postId);
  return (
    <>
      <span className="flex items-center gap-1" data-like>
        <HandThumbUpIcon className="h-4 w-4" /> {metrics.likes}
      </span>
      <span className="flex items-center gap-1" data-dislike>
        <HandThumbDownIcon className="h-4 w-4" /> {metrics.dislikes}
      </span>
    </>
  );
}
