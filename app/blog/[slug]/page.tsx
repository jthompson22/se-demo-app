import { notFound } from 'next/navigation';
import { getAllSlugs, getPostBySlug, submitFeedback } from '@/db/actions';
import { Suspense } from 'react';

import Markdown from 'react-markdown';
import Link from 'next/link';
import SummaryPanel from './summary-panel';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { EngagementSection } from './engagement-section';
import { ViewTracker } from './view-tracker';
import BlogPostSkeleton from '@/components/skeletons';

export const experimental_ppr = true;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug.slug,
  }));
}

export default function BlogPostShell({ params }: any) {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPost params={params} />
    </Suspense>
  );
}

async function BlogPost({ params, searchParams }: any) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto py-2 px-4">
      <Suspense fallback={null}>
        <ViewTracker postId={post.id} />
      </Suspense>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-primary/60 hover:text-primary mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to posts
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        {post.description && (
          <p className="text-lg text-primary/60 mb-4">{post.description}</p>
        )}
        <div className="flex items-center gap-6 text-sm text-primary/60">
          <time>{post.createdAt.toLocaleDateString()}</time>
          <div className="flex gap-4">
            <Suspense fallback={<EngagementButtonSkeleton />}>
              <EngagementSection
                slug={slug}
                post={post}
                submitFeedback={submitFeedback}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              }
            >
              <SummaryPanel content={post.content || ''} />
            </Suspense>
          </div>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <Markdown>{post.content || ''}</Markdown>
      </div>
    </article>
  );
}

function EngagementButtonSkeleton() {
  return (
    <div className="flex items-center gap-1 text-primary/60">
      <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
    </div>
  );
}
