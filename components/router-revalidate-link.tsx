'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { revalidate } from '@/db/client-server-actions';

type RouterLinkProps = {
  href: string;
  tags?: string[];
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<'a'>, 'href'>;

export function RouterLink({
  href,
  tags = [],
  className,
  children,
  ...props
}: RouterLinkProps) {
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Revalidate all tags
    await Promise.all(tags.map((tag) => revalidate(tag)));

    router.refresh();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
