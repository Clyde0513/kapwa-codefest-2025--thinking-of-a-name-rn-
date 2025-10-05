'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PhotoUpload from '../../../../../components/PhotoUpload';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [postId, setPostId] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: true,
  });

  // Unwrap params and fetch the existing post
  useEffect(() => {
    const loadPost = async () => {
      const resolvedParams = await params;
      setPostId(resolvedParams.id);
      
      try {
        const response = await fetch(`/api/posts/${resolvedParams.id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.post.title,
            content: data.post.content,
            published: data.post.published,
          });
        } else if (response.status === 404) {
          setNotFound(true);
        } else {
          alert('Failed to load post. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('An error occurred while loading the post.');
      } finally {
        setFetching(false);
      }
    };

    loadPost();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/posts');
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.details || errorData.error || 'Failed to update post. Please try again.';
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/posts');
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.details || errorData.error || 'Failed to delete post. Please try again.';
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The post you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/admin/posts"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-block"
          >
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

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
                <span className="text-gray-900">Edit Post</span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Post</h1>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/admin/posts"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Post Content */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Post Details</h2>
              <p className="text-gray-600 mt-1">Update the information for your post</p>
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
                  placeholder="Write your post content here..."
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
                  Published
                </label>
                <p className="text-sm text-gray-500 ml-4">
                  {formData.published ? 'This post is visible to visitors' : 'This post is saved as a draft'}
                </p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Featured Image</h2>
              <p className="text-gray-600 mt-1">Add or update the photo for your post</p>
            </div>
            <div className="p-6">
              <PhotoUpload
                onUploadComplete={(photo: any) => {
                  console.log('Photo uploaded:', photo);
                  // TODO: Link photo to post after upload
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
                {loading ? 'Updating...' : 'Update Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
