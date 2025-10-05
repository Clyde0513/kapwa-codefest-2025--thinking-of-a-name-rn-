'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PhotoUpload from '../../../../components/PhotoUpload';

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/admin/posts`);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.details || errorData.error || 'Failed to create post. Please try again.';
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/admin" className="hover:text-gray-700">Admin</Link>
                <span>›</span>
                <Link href="/admin/posts" className="hover:text-gray-700">Posts</Link>
                <span>›</span>
                <span className="text-gray-900">New Post</span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Create New Post</h1>
            </div>
            <Link
              href="/admin/posts"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Post Content */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Post Details</h2>
              <p className="text-gray-600 mt-1">Fill in the information for your post</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a clear, descriptive title..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  A good title helps people find and understand your post
                </p>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your post content here...

Tips for writing good posts:
• Keep paragraphs short and easy to read
• Use simple, clear language
• Include important details like dates, times, and locations
• End with a clear call-to-action if needed"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Write in a clear, friendly tone that your congregation will understand
                </p>
              </div>

              {/* Published Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                  Publish immediately
                </label>
                <p className="text-sm text-gray-500 ml-4">
                  {formData.published ? 'Your post will be visible to visitors right away' : 'Save as draft to publish later'}
                </p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Featured Image</h2>
              <p className="text-gray-600 mt-1">Add a photo to make your post more engaging</p>
            </div>
            <div className="p-6">
              <PhotoUpload
                onUploadComplete={(photo) => {
                  console.log('Photo uploaded:', photo);
                  // TODO: Link photo to post after post creation
                }}
              />
              <p className="text-sm text-gray-500 mt-3">
                Choose a clear, relevant image. Good photos help people engage with your post.
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 rounded-lg border border-blue-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-2">💡 Writing Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• <strong>Keep it simple:</strong> Use everyday language that everyone can understand</li>
                <li>• <strong>Be specific:</strong> Include dates, times, locations, and contact information</li>
                <li>• <strong>Tell a story:</strong> Share why this is important to your church community</li>
                <li>• <strong>Use photos:</strong> Pictures help people connect with your message</li>
                <li>• <strong>Check spelling:</strong> Take a moment to review before publishing</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Link
              href="/admin/posts"
              className="text-gray-600 hover:text-gray-700 font-medium"
            >
              ← Back to Posts
            </Link>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, published: false }))}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={loading || !formData.title.trim() || !formData.content.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                {loading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
