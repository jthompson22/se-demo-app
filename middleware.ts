import { type NextRequest, NextResponse } from 'next/server';
import { unstable_precompute as precompute } from '@vercel/flags/next';
import { gameFlags } from './app/flags';

export const config = {
  matcher: ['/blog/understanding-modern-web-development'],
};

export async function middleware(request: NextRequest) {
  const code = await precompute(gameFlags);

  // Construct URL with the code for the specific blog post
  const nextUrl = new URL(
    `/blog/understanding-modern-web-development/${code}`,
    request.url,
  );

  return NextResponse.rewrite(nextUrl);
}
