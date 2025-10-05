import { sanityClient } from '../../../lib/sanityClient';
import { PortableText } from '@portabletext/react';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  
  let post: any = null;
  
  try {
    // Fetch post from Sanity by slug
    post = await sanityClient.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        body,
        "author": author->name,
        "mainImage": mainImage.asset->url
      }
    `, { slug });
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
            <a 
              href="/blog" 
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <article className="prose prose-lg max-w-none">
          {post.mainImage && (
            <div className="mb-8">
              <img
                src={post.mainImage}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <h1 className="text-4xl font-poppins mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
            <span>•</span>
            <span>By {post.author || 'Church Staff'}</span>
          </div>
          
          {post.excerpt && (
            <div className="text-lg text-gray-700 italic mb-8 p-4 bg-gray-50 rounded-lg">
              {post.excerpt}
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            {post.body && post.body.length > 0 ? (
              <PortableText value={post.body} />
            ) : (
              <p className="text-gray-600">Content is being loaded...</p>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}
