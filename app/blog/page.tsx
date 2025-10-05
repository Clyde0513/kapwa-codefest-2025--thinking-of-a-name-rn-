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
    <main className="min-h-screen" style={{ backgroundColor: '#faecc8' }}>
      <Header />

      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-poppins mb-6 text-gray-900">Blog</h1>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found. Check back soon for updates from our church community!</p>
            <Link 
              href="/admin/posts/new" 
              className="inline-block mt-4 bg-gradient-to-r from-[#A85A52] to-[#8B4540] text-white px-6 py-2 rounded-lg hover:from-[#8B4540] hover:to-[#A85A52] transition-all duration-300"
            >
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#A85A52]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      <Link 
                        href={`/blog/${post.id}`}
                        className="hover:text-[#A85A52] transition-colors"
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
                    
                    {/* Interaction counts */}
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mt-4">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>0 likes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>0 comments</span>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-block mt-3 text-[#A85A52] hover:text-[#8B4540] font-medium transition-colors"
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