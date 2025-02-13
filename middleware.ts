import { type NextRequest, NextResponse } from 'next/server';
import { unstable_precompute as precompute } from '@vercel/flags/next';
// import { gameFlags } from './app/flags';
import { geolocation } from '@vercel/functions';
import { cookies } from 'next/headers';

/*
Route California to a different "rewritten" page. 
*/

export const config = {
  matcher: ['/blog/:path*'],
};

export async function middleware(request: NextRequest) {
  // const code = await precompute(gameFlags);
  const cookieStore = await cookies();
  const givenUpRights = cookieStore.get('given-up-rights');

  const { country, region } = geolocation(request);

  /*
  Give up all youre rights if you're in california. 
  */
  if (country === 'US' && region === 'sfo1' && !givenUpRights) {
    // Rewrite California-specific locations to sign their rights away.
    const nextUrl = new URL(
      `/blog/understanding-modern-web-development/california-agreement`,
      request.url,
    );
    return NextResponse.rewrite(nextUrl);
  }

  /*


  */
  return NextResponse.next();
}



