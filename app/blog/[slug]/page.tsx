import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllSlugs, getPostBySlug } from '@/db/actions';
import Markdown from 'react-markdown';
import Link from 'next/link';


import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  EyeIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static paths
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug.slug,
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPost({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto py-2 px-4">
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
          <time>{new Date(post.createdAt).toLocaleDateString()}</time>
          <div className="flex gap-4">
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
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <Markdown>{post.content || ''}</Markdown>
      </div>
    </article>
  );
}
