import { gameFlags, californiaAgreement } from '@/app/flags';
import BlogPost from '../page';
import Link from 'next/link';
type Params = Promise<{ code: string }>;

/*

  California Rewrite to ensure they sign a waiver.  

*/
export default async function Page({ params }: { params: Params }) {
  const { code } = await params;
  const agreement = await californiaAgreement(code, flags);
  console.log('agreement', agreement);

  return (
    <div className="relative">
      {/* Original blog post content */}
      <div className={agreement ? 'blur-sm' : ''}>
        <BlogPost params={params} />
      </div>

      {/* Overlay */}
      {agreement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold mb-4">Uh Oh!</h1>
            <p className="text-lg mb-6">
              Uh oh, looks like you're in California. California requires that
              you relinquish all of your rights to the state.
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
