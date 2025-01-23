export function EngagementSkeleton() {
  return (
    <span className="flex items-center gap-1">
      <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
    </span>
  );
}

export function BlogListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <article key={i} className="rounded-lg border border-border p-4">
          <div className="h-7 w-3/4 animate-pulse rounded-md bg-muted" />

          <div className="mt-2 h-4 w-24 animate-pulse rounded-md bg-muted" />
        </article>
      ))}
    </div>
  );
}

export default function BlogPostSkeleton() {
  return (
    <article className="max-w-2xl mx-auto py-2 px-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="flex items-center gap-6 text-sm text-primary/60 mb-8">
        <div className="h-4 bg-gray-300 rounded w-1/6"></div>
        <div className="flex gap-4">
          <div className="h-8 bg-gray-300 rounded w-8"></div>
          <div className="h-8 bg-gray-300 rounded w-8"></div>
        </div>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      </div>
    </article>
  );
}

export function GallerySkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-gray-700 rounded-lg mb-8 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="relative aspect-square bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}