import Link from 'next/link';
import { prisma } from '../../../lib/prisma';

export default async function PostsPage() {
  let posts: any[] = [];
  let total = 0;

  try {
    const result = await prisma.post.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true, email: true },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
    posts = result;
    total = await prisma.post.count();
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Continue with empty array
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/admin" className="hover:text-gray-700">Admin</Link>
                <span>›</span>
                <span className="text-gray-900">Posts</span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Manage Posts</h1>
              <p className="text-gray-600 mt-1">Create and edit your church posts</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/admin"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Back to Admin
              </Link>
              <Link
                href="/admin/posts/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                New Post
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Posts Overview</h2>
              <p className="text-gray-600">Total posts: {total}</p>
            </div>
            <div className="flex space-x-4 text-sm">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Published: {posts.filter(p => p.published).length}
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                Drafts: {posts.filter(p => !p.published).length}
              </div>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">All Posts</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {posts.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600 mb-4">Create your first post to get started</p>
                <Link
                  href="/admin/posts/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Create First Post
                </Link>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                        {!post.published && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {post.content.length > 150 
                          ? `${post.content.substring(0, 150)}...` 
                          : post.content}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          {post.author?.name || 'Unknown author'}
                        </span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post._count.comments} comments</span>
                        <span>•</span>
                        <span>{post._count.likes} likes</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
