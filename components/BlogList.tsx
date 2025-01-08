import { ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { getPublishedPost } from '@/db/actions-cache';
import Link from 'next/link';
import { Suspense } from 'react';
import { BlogMetrics } from './BlobMetrics';

interface Blog {
  title: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
  views: number;
  slug: string;
}

export async function BlogList() {
  const posts = await getPublishedPost();

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <Link href={`/blog/${post.slug}`} key={index}>
          <article className="group flex items-center gap-3 cursor-pointer rounded-lg p-4 transition-colors hover:bg-muted">
            <ChevronRightIcon className="h-5 w-5 text-primary/30 group-hover:text-primary/60" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-primary">
                    {post.title}
                  </h2>
                  <time className="text-sm text-primary/60">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <Suspense fallback={<MetricsSkeleton />}>
                  <BlogMetrics postId={post.id} />
                </Suspense>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
function MetricsSkeleton() {
  return (
    <div className="flex gap-4 text-sm text-primary/60">
      {[0, 1, 2].map((i) => (
        <span key={i} className="flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        </span>
      ))}
    </div>
  );
}