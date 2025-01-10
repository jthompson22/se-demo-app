import { gameFlags, catchDerekWu } from '@/app/flags';
import BlogPost from '../page';
import Link from 'next/link';
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
              Sorry this content is behind a paywall.
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-red-600 text-white text-xl font-bold rounded hover:bg-red-700 transition"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
