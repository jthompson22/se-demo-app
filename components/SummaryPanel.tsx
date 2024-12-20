'use client';

import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useCompletion } from 'ai/react';
import { FC, useState } from 'react';

interface SummaryPanelProps {
  content: string;
}

const SummaryPanel: FC<SummaryPanelProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { complete, completion, isLoading, setCompletion } = useCompletion({
    api: '/api/summary',
    body: { content },
  });

  const generateSummary = async () => {
    await complete('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 hover:text-blue-500"
      >
        <SparklesIcon className="h-4 w-4" /> AI Summary
      </button>

      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">AI Summary</h2>
            <button
              onClick={() => {
                setIsOpen(false);
                setCompletion('');
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="prose dark:prose-invert">
            {isLoading ? (
              <div className="animate-pulse">Generating summary...</div>
            ) : completion ? (
              <div>{completion}</div>
            ) : (
              <button
                onClick={generateSummary}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Generate Summary
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryPanel;
