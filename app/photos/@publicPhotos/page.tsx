import Image from 'next/image';
import { Suspense } from 'react';
import { GallerySkeleton } from '@/components/skeletons';

/*
  Uses public/photos Implementation
  Build cache times:
  - getStaticProps at build time
  - Revalidate: No revalidation (static)
  - Client cache: Browser default
*/

const PUBLIC_PHOTOS = [
  '/photos/1.jpeg',
  '/photos/2.jpeg',
  '/photos/3.jpeg',
  '/photos/4.jpeg',
  '/photos/5.jpeg',
  '/photos/6.jpeg',
];

async function PhotoGallery() {
  'use cache';
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 mx-auto text-center">
        Public Photos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PUBLIC_PHOTOS.map((photo, index) => (
          <div key={photo} className="relative aspect-square">
            <Image
              src={photo}
              alt={`Gallery image ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover rounded-lg"
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Photos() {
  return (
    <Suspense fallback={<GallerySkeleton />}>
      <PhotoGallery />
    </Suspense>
  );
}
