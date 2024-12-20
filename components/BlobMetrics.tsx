import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { getSocialMetrics } from '@/db/actions-nocache';
import { connection } from 'next/server';

export async function BlogMetrics({ postId }: { postId: string }) {
  await connection();
  const metrics = await getSocialMetrics(postId);

  return (
    <div className="flex gap-4 text-sm text-primary/60">
      <span className="flex items-center gap-1">
        <EyeIcon className="h-4 w-4" /> {metrics.views}
      </span>
      <span className="flex items-center gap-1">
        <HandThumbUpIcon className="h-4 w-4" /> {metrics.likes}
      </span>
      <span className="flex items-center gap-1">
        <HandThumbDownIcon className="h-4 w-4" /> {metrics.dislikes}
      </span>
    </div>
  );
}
