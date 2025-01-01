import { Metadata } from 'next';
import { BlogHeader } from '@/components/BlogHeader';
import './globals.css';
import { Suspense } from 'react';
import { VercelToolbar } from '@vercel/toolbar/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://partialprerendering.com'),
  title: 'Next.js Partial Prerendering',
  description: 'A demo of Next.js using Partial Prerendering.',
  openGraph: {
    title: 'Next.js Partial Prerendering',
    description: 'A demo of Next.js using Partial Prerendering.',
  },
  twitter: {
    card: 'summary_large_image',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shouldInjectToolbar = process.env.NODE_ENV === 'development';
  return (
    <html lang="en">
      <body className="overflow-y-scroll bg-background text-primary">
        <div className="mx-auto max-w-4xl px-2 pt-20 lg:px-8 lg:py-8">
          <div className="rounded-lg bg-card shadow-sm">
            <div className="rounded-lg p-3.5 lg:p-6">
              <div className="flex flex-col gap-8">
                <BlogHeader />
                <div className="min-h-screen">{children}</div>
              </div>
            </div>
          </div>
          {shouldInjectToolbar && <VercelToolbar />}
        </div>
      </body>
    </html>
  );
}
