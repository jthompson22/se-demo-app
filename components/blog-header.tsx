import { Suspense } from 'react';
import { Avatar } from './avatar';
import { SocialHandles } from './social-handles';
import { SubNav } from './sub-nav';
import FunAnimations from '@/components/animations/index';

function SubNavSkeleton() {
  return (
    <nav className="flex gap-4 items-center justify-center">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
        />
      ))}
    </nav>
  );
}

export function BlogHeader() {
  return (
    <div className="flex flex-col items-center justify-center border-b border-primary/20 pb-4 mb-4">
      <div className="flex flex-row items-center justify-center gap-2">
        <Avatar rotation="right" />
        <div className="flex flex-col items-center justify-center space-y-3">
          <h1 className="text-4xl font-bold">
            <span className="text-red-500">J</span>
            <span className="text-orange-500">a</span>
            <span className="text-yellow-500">r</span>
            <span className="text-green-500">e</span>
            <span className="text-blue-500">d</span>{' '}
            <span className="text-indigo-500">T</span>
            <span className="text-purple-500">h</span>
            <span className="text-pink-500">o</span>
            <span className="text-red-500">m</span>
            <span className="text-orange-500">p</span>
            <span className="text-yellow-500">s</span>
            <span className="text-green-500">o</span>
            <span className="text-blue-500">n</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Writing and hacking about technology.
          </p>

          <Suspense fallback={<SubNavSkeleton />}>
            <SubNav />
          </Suspense>
          <Suspense>
            <FunAnimations />
          </Suspense>
        </div>
        <Avatar rotation="left" />
      </div>
    </div>
  );
}
