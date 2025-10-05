'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          published,
        }),
      });

      if (response.ok) {
        router.push('/admin/posts');
      } else {
        const errorData = await response.json();
        alert(`Failed to create post: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
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
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Create New Blog Post</h1>
              <p className="text-gray-600 mt-1">Write a new blog post for your church community</p>
            </div>
            <Link
              href="/admin/posts"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Back to Posts
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Post Content</h2>
              <p className="text-gray-600 mt-1">Write your blog post content</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your blog post title..."
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Content *
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your blog post content here..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                  Publish immediately
                </label>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 rounded-lg border border-blue-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-2">💡 Writing Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• <strong>Clear titles:</strong> Make your title descriptive and engaging</li>
                <li>• <strong>Good content:</strong> Write in a conversational tone that connects with your community</li>
                <li>• <strong>Formatting:</strong> Use paragraphs and line breaks to make your content easy to read</li>
                <li>• <strong>Draft mode:</strong> Uncheck &quot;Publish immediately&quot; to save as draft and review later</li>
              </ul>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {published ? 'Post will be published immediately' : 'Post will be saved as draft'}
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                {loading ? 'Creating...' : published ? 'Publish Post' : 'Save as Draft'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}