export function BlogListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <article key={i} className="rounded-lg border border-border p-4">
          {/* Title skeleton */}
          <div className="h-7 w-3/4 animate-pulse rounded-md bg-muted" />
          {/* Date skeleton */}
          <div className="mt-2 h-4 w-24 animate-pulse rounded-md bg-muted" />
        </article>
      ))}
    </div>
  );
}
