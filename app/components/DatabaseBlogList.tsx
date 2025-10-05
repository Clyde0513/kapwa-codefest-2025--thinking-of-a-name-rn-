import Link from 'next/link';
import { prisma } from '../../lib/prisma';

interface DatabaseBlogListProps {
  limit?: number;
}

export default async function DatabaseBlogList({ limit }: DatabaseBlogListProps) {
  let posts: any[] = [];

  try {
    const result = await prisma.post.findMany({
      where: { published: true },
      take: limit || 10,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });
    posts = result;
  } catch (error) {
    console.error('Error fetching posts from database:', error);
    // Continue with empty array
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
        <p className="text-gray-600">Check back soon for updates from our church community!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <article key={post.id} className="bg-white shadow-sm rounded-md p-6">
          <h3 className="text-2xl font-poppins mb-2">
            <Link href={`/blog/${post.id}`} className="hover:underline">
              {post.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {new Date(post.createdAt).toLocaleDateString()} • {post.author?.name || 'Church Admin'}
          </p>
          <p className="text-gray-800">
            {post.content.length > 220 
              ? `${post.content.substring(0, 220)}...` 
              : post.content}
          </p>
        </article>
      ))}
    </div>
  );
}
