import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { getPublishedPost } from '@/db/actions';
import Link from 'next/link';
import { BlogMetrics } from './blog-metrics';

export const experimental_ppr = true;

interface Blog {
  title: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
  views: number;
  slug: string;
}

export default async function BlogList() {
  const posts = await getPublishedPost();

  return (
    <main>
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
                  <BlogMetrics postId={post.id} />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
