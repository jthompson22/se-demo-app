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
  ];

  return (
    <div className="space-y-6">
      {blogs.map((blog) => (
        <article
          key={blog.id}
          className="cursor-pointer rounded-lg border border-gray-800 p-4 transition-colors hover:bg-gray-800"
        >
          <h2 className="text-xl font-semibold text-white">{blog.title}</h2>
          <time className="text-sm text-gray-400">{blog.date}</time>
        </article>
      ))}
    </div>
  );
}
