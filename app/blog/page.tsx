import Header from '../components/Header';
import { prisma } from '../../lib/prisma';
import Link from 'next/link';

export default async function BlogPage() {
  // Fetch posts from database
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-poppins mb-6">Blog</h1>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found. Check back soon for updates from our church community!</p>
            <Link 
              href="/admin/posts/new" 
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      <Link 
                        href={`/blog/${post.id}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>{post.author?.name || 'Church Staff'}</span>
                      <span>•</span>
                      <time dateTime={post.createdAt.toISOString()}>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {post.content.length > 300 
                        ? `${post.content.substring(0, 300)}...` 
                        : post.content}
                    </p>
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-block mt-3 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}