## Next.js 15 Demo Blog

A demo blog application showcasing new features in Next.js 15:

- **Partial Prerendering (PPR)** - The blog uses PPR to deliver a fast initial static shell while dynamically loading engagement metrics
- **Server Actions** - Like/dislike functionality implemented using server actions and next/form
- **use-cache Hook** - Caching blog post data for optimal performance
- **React 19 Features** - Built with React 19 RC for testing new concurrent features

### Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your database
3. Install dependencies: `npm install`
4. Run database migrations: `npm run db:push`
5. Start the development server: `npm run dev`

### Key Features

- Blog post listing with engagement metrics
- Individual post pages with Markdown support
- Like/Dislike functionality with cookie-based tracking
- View counter for posts
- Responsive design with Tailwind CSS

### Tech Stack

- Next.js 15
- React 19 RC
- Drizzle ORM
- Vercel Postgres
- TailwindCSS