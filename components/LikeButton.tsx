'use client';

import { useState, useEffect } from 'react';

interface LikeButtonProps {
  postId: string;
  initialCount: number;
  userEmail?: string;
  className?: string;
}

export default function LikeButton({ 
  postId, 
  initialCount, 
  userEmail: initialUserEmail = '',
  className = ''
}: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(initialUserEmail);

  // Check initial like status when userEmail changes
  useEffect(() => {
    if (userEmail.trim()) {
      checkLikeStatus();
    }
  }, [userEmail, postId]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkLikeStatus = async () => {
    try {
      const response = await fetch(`/api/likes?postId=${postId}&userEmail=${encodeURIComponent(userEmail)}`);
      if (response.ok) {
        const data = await response.json();
        setLiked(data.liked);
        setCount(data.count);
      }
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const handleLike = async () => {
    let email = userEmail.trim();
    
    if (!email) {
      email = prompt('Please enter your email address to like this post:') || '';
      if (!email.trim()) {
        return;
      }
      setUserEmail(email.trim());
      email = email.trim();
    }

    setLoading(true);
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          userEmail: email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLiked(data.liked);
        setCount(data.count);
      } else {
        const errorData = await response.json();
        alert(`Failed to like post: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error liking post:', error);
      alert('Failed to like post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
        liked 
          ? 'bg-[#A85A52] bg-opacity-20 text-[#A85A52] border border-[#A85A52] border-opacity-30' 
          : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-[#A85A52] hover:bg-opacity-10 hover:text-[#A85A52] hover:border-[#A85A52] hover:border-opacity-30'
      } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${className}`}
    >
      <svg 
        className={`w-5 h-5 transition-transform ${liked ? 'scale-110' : ''}`} 
        fill={liked ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
      <span className="font-medium">
        {count} {count === 1 ? 'like' : 'likes'}
      </span>
    </button>
  );
}
