'use client';
import { useState } from 'react';
import FeedbackModal from '@/components/feedback-modal';

interface Props {
  children: React.ReactNode;
  postId: string;
  submitFeedback: any;
  slug: string;
}

export function AddEngagementInteractivity({
  children,
  postId,
  submitFeedback,
  slug,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'like' | 'dislike'>('like');

  const handleFeedbackClick = (
    e: React.MouseEvent,
    type: 'like' | 'dislike',
  ) => {
    e.preventDefault();
    setFeedbackType(type);
    setShowModal(true);
  };

  return (
    <>
      <div
        className="hover:cursor-pointer"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('[data-like]')) handleFeedbackClick(e, 'like');
          if (target.closest('[data-dislike]'))
            handleFeedbackClick(e, 'dislike');
        }}
      >
        {children}
      </div>

      <FeedbackModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        postId={postId}
        type={feedbackType}
        submitFeedback={submitFeedback}
        slug={slug}
      />
    </>
  );
}
