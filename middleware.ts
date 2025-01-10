import { type NextRequest, NextResponse } from 'next/server';
import { unstable_precompute as precompute } from '@vercel/flags/next';
import { gameFlags } from './app/flags';
import { geolocation } from '@vercel/functions';
import { cookies } from 'next/headers';
export const config = {
  matcher: ['/blog/:path*'],
};

export async function middleware(request: NextRequest) {
  const code = await precompute(gameFlags);

  const { country, region } = geolocation(request);
  const californiaAgreement = request.cookies.get('californiaAgreement');

  console.log(country, region);

  if (country === 'US' && region === 'CA') {
    // Rewrite California-specific locations to sign their rights away.
    const nextUrl = new URL(
      `/blog/understanding-modern-web-development/${code}`,
      request.url,
    );
    return NextResponse.rewrite(nextUrl);
  }

  return NextResponse.next();
}



