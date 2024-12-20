export function BlogList() {
  // Placeholder blog items
  const blogs = [
    { id: 1, title: 'Understanding Next.js 15', date: '2024-03-20' },
    {
      id: 2,
      title: 'The Power of React Server Components',
      date: '2024-03-18',
    },
    { id: 3, title: 'Building with TailwindCSS', date: '2024-03-15' },
    { id: 4, title: 'Advanced Data Fetching in Next.js', date: '2024-03-13' },
    { id: 5, title: 'Mastering TypeScript with React', date: '2024-03-10' },
    {
      id: 6,
      title: 'Server Actions in Next.js Applications',
      date: '2024-03-08',
    },
    { id: 7, title: 'Optimizing React Performance', date: '2024-03-05' },
    {
      id: 8,
      title: 'Modern CSS Techniques with TailwindCSS',
      date: '2024-03-03',
    },
    {
      id: 9,
      title: 'Building Accessible React Components',
      date: '2024-02-28',
    },
  ];

  return (
    <div className="space-y-6">
      {blogs.map((blog) => (
        <article
          key={blog.id}
          className="cursor-pointer rounded-lg border border-border p-4 transition-colors hover:bg-muted"
        >
          <h2 className="text-xl font-semibold text-primary">{blog.title}</h2>
          <time className="text-sm text-primary/60">{blog.date}</time>
        </article>
      ))}
    </div>
  );
}
