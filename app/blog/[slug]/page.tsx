import Image from 'next/image';
import { prisma } from '../../../lib/prisma';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  
  let post: any = null;
  
  try {
    // Try to fetch by ID first (if slug is a UUID)
    if (slug.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      post = await prisma.post.findUnique({
        where: { id: slug },
        include: {
          author: {
            select: { name: true, email: true },
          },
        },
      });
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-poppins mb-4">Post not found</h1>
            <p className="text-gray-600">The post you're looking for doesn't exist or has been removed.</p>
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
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>By {post.author?.name || 'Church Admin'}</span>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph: string, index: number) => (
              paragraph.trim() ? (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ) : (
                <br key={index} />
              )
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
