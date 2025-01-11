// import { gameFlags, californiaAgreement } from '@/app/flags';
import BlogPost from '../page';
import Link from 'next/link';
type Params = Promise<{ code: string }>;
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
/*

  California Rewrite to ensure they sign a waiver to give up all their rights. Enabled by middleware. 

*/
async function acceptRights() {
  'use server';
  const cookieStore = await cookies();
  cookieStore.set('given-up-rights', 'true', { maxAge: 60 * 60 * 24 * 365 });
  const headersList = await headers();
  // Get current URL from headers
  const referer = headersList.get('referer');
  const fullPath = referer?.replace(headersList.get('origin') || '', '') || '/';
  console.log('fullPath', fullPath);
  redirect(fullPath);
}

export default async function Page({ params }: { params: Params }) {
  return (
    <div className="relative">
      {/* Original blog post content */}
      <div className="blur-sm">
        <BlogPost params={params} />
      </div>

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-xl font-bold mb-4">California Agreement</h1>
          <p className=" mb-6">
            Uh oh, looks like you're in California. California requires that you
            relinquish all of your rights to the state.
            <br />
            <span className="font-semibold">
              Relinquish rights and continue to the blog.
            </span>
          </p>
          <div className="flex gap-4 justify-center">
            <form action={acceptRights}>
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white text-xl font-bold rounded hover:bg-green-700 transition"
              >
                Yes
              </button>
            </form>
            <Link
              href="/"
              className="px-6 py-3 bg-red-600 text-white text-xl font-bold rounded hover:bg-red-700 transition"
            >
              No
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
