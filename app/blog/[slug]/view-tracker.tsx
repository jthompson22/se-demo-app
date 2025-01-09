'use client';
import { incrementViews } from '@/db/client-server-actions';
import { useEffect, useRef } from 'react';

export function ViewTracker({ postId }: { postId: string }) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (isFirstRender.current) {
        //Skip first render in dev mode
        isFirstRender.current = false;
        return;
      }
    }

    incrementViews(postId).catch((err) => {
      console.error('Failed to track view:', err);
    });
  }, [postId]);

  return null;
}
