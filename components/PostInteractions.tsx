'use client';

import { useState } from 'react';
import LikeButton from './LikeButton';
import Comments from './Comments';

interface PostInteractionsProps {
  postId: string;
  initialLikeCount: number;
  initialCommentCount: number;
}

export default function PostInteractions({ 
  postId, 
  initialLikeCount, 
  initialCommentCount 
}: PostInteractionsProps) {
  const [userEmail, setUserEmail] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 bg-white rounded-lg p-6 shadow-md">
      {/* User email input for likes */}
      <div className="mb-6">
        <label htmlFor="interaction-email" className="block text-sm font-medium text-gray-700 mb-2">
          Your Email (for likes)
        </label>
        <div className="flex gap-4">
          <input
            id="interaction-email"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email address (optional)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A85A52] focus:border-transparent"
          />
          <button
            onClick={handleShowComments}
            className="px-4 py-2 bg-gradient-to-r from-[#A85A52] to-[#8B4540] text-white rounded-md hover:from-[#8B4540] hover:to-[#A85A52] transition-all duration-300"
          >
            {showComments ? 'Hide Comments' : `Show Comments (${initialCommentCount})`}
          </button>
        </div>
      </div>

      {/* Like button */}
      <div className="mb-6">
        <LikeButton 
          postId={postId}
          initialCount={initialLikeCount}
          userEmail={userEmail}
        />
      </div>

      {/* Comments section */}
      {showComments && (
        <Comments postId={postId} />
      )}
    </div>
  );
}
