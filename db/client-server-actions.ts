'use server';

/**
 * This file contains server actions that can be imported directly into client components
 * since it has the 'use server' directive at the file level.
 * This allows for better code organization by avoiding prop drilling of server functions.
 */

import { revalidateTag } from 'next/cache';

export async function revalidate(tag: string) {
  console.log('revalidate', tag);
  await revalidateTag(tag);
}
