import { prisma } from '../../../lib/prisma';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  
  let post: any = null;
  
  try {
    // Fetch post from database by ID
    post = await prisma.post.findUnique({
      where: { 
        id: id,
        published: true 
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-poppins mb-4">Post not found</h1>
            <p className="text-gray-600">The post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link 
              href="/blog" 
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-poppins mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
            <time dateTime={post.createdAt.toISOString()}>
              {new Date(post.createdAt).toLocaleDateString()}
            </time>
            <span>•</span>
            <span>By {post.author?.name || 'Church Staff'}</span>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {post.content}
            </div>
          </div>
        </article>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link 
            href="/blog" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
