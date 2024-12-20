/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
    dynamicIO: true,
    cacheLife: {
      blog: {
        stale: 3600, // 1 hour
        revalidate: 900, // 15 minutes
        expire: 86400, // 1 day
      },
    },
  },
};

module.exports = nextConfig;
