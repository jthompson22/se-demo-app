import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'aoxxjzpu', // from your sanity.config.ts
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
});
