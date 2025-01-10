import { notFound } from 'next/navigation';
import { getAllSlugs, getPostBySlug, submitFeedback } from '@/db/actions';
import { Suspense } from 'react';
import { gameFlags, catchDerekWu } from '@/app/flags';
import BlogPost from '../page';

type Params = Promise<{ code: string }>;

export default async function Page({ params }: { params: Params }) {
  const { code } = await params;
  const areYouDerekWu = await catchDerekWu(code, gameFlags);

  return (
    <div className="relative">
      {/* Original blog post content */}
      <div className={areYouDerekWu ? 'blur-sm' : ''}>
        <BlogPost params={params} />
      </div>

      {/* Overlay */}
      {areYouDerekWu && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold mb-4">Uh Oh!</h1>
            <p className="text-lg mb-6">
              Before you can see this content, you must pass a test.
            </p>
            <button className="px-6 py-3 bg-red-600 text-white text-xl font-bold rounded hover:bg-red-700 transition">
              Take the Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
