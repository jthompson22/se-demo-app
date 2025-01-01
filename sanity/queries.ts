import { client } from '../lib/sanity';
import { unstable_cacheTag as cacheTag } from 'next/cache';

export async function getPage() {
  'use cache';
  cacheTag('photoGallery');
  const query = `
    *[_type == "page"][0]{
      title,
      gallery{
        images[]{
          "imageUrl": asset->url,
          alt,
        },
        display,
        zoom
      }
    }`;

  const data = await client.fetch(query);
  return data;
}
