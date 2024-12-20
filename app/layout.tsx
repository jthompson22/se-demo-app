import { Metadata } from 'next';
import { BlogHeader } from '@/components/BlogHeader';
import './globals.css';

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
  return (
    <html lang="en">
      <body className="overflow-y-scroll bg-background text-primary">
        <div className="mx-auto max-w-6xl px-2 pt-20 lg:px-8 lg:py-8">
          <div className="rounded-lg bg-card">
            <div className="rounded-lg p-3.5 lg:p-6">
              <div className="flex flex-col sm:flex-row gap-8">
                {/* Sticky sidebar */}
                <div className="sticky top-8 h-fit w-64 flex-shrink-0">
                  <BlogHeader />
                </div>
                {/* Main content area */}
                <div className="min-h-screen flex-grow">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
