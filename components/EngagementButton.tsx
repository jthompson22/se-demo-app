'use client';
import { useFormStatus } from 'react-dom';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon as HandThumbUpSolid,
  HandThumbDownIcon as HandThumbDownSolid,
} from '@heroicons/react/24/solid';

export function EngagementButton({
  type,
  count,
  isActive,
  submitFeedback,
}: {
  type: 'like' | 'dislike';
  count: number;
  isActive: boolean;
  submitFeedback: any;
}) {
  const { pending } = useFormStatus();

  const OutlineIcon = type === 'like' ? HandThumbUpIcon : HandThumbDownIcon;
  const SolidIcon = type === 'like' ? HandThumbUpSolid : HandThumbDownSolid;
  const Icon = isActive ? SolidIcon : OutlineIcon;

  return (
    <button
      type="submit"
      name="action"
      value={type}
      disabled={pending}
      className={`flex items-center gap-1 hover:text-primary transition-all ${
        pending ? 'opacity-50' : ''
      } ${isActive ? 'text-blue-500' : 'text-primary/60'}`}
    >
      <Icon className="h-4 w-4" /> {count}
    </button>
  );
}
