import { BlogList } from '@/components/BlogList';
import { BlogListSkeleton } from '@/components/BlogListSkeleton';
import { Suspense } from 'react';

export const experimental_ppr = true;

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList />
      </Suspense>
    </main>
  );
}
