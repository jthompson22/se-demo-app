import { ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { getPublishedPost } from '@/db/actions';
import Link from 'next/link';

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
                <div className="flex gap-4 text-sm text-primary/60">
                  <span className="flex items-center gap-1">
                    <EyeIcon className="h-4 w-4" /> {post.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <HandThumbUpIcon className="h-4 w-4" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <HandThumbDownIcon className="h-4 w-4" /> {post.dislikes}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
