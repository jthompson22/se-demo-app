'use client';

import { useState } from 'react';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import FeedbackModal from '@/components/FeedbackModal';

interface EngagementButtonsProps {
  post: {
    id: string;
    likes: number;
    dislikes: number;
  };
  submitFeedback: any;
  slug: string;
}

export default function EngagementButtons({
  post,
  submitFeedback,
  slug,
}: EngagementButtonsProps) {
  const [showModal, setShowModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'like' | 'dislike'>('like');

  const handleFeedbackClick = (type: 'like' | 'dislike') => {
    setFeedbackType(type);
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={() => handleFeedbackClick('like')}
        className="flex items-center gap-1 hover:text-blue-500"
      >
        <HandThumbUpIcon className="h-4 w-4" /> {post.likes}
      </button>
      <button
        onClick={() => handleFeedbackClick('dislike')}
        className="flex items-center gap-1 hover:text-red-500"
      >
        <HandThumbDownIcon className="h-4 w-4" /> {post.dislikes}
      </button>

      <FeedbackModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        postId={post.id}
        type={feedbackType}
        submitFeedback={submitFeedback}
        slug={slug}
      />
    </>
  );
}
