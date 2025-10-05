import Image from 'next/image';
import { fetchPostBySlug } from '../../../lib/sanityClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post: any = await fetchPostBySlug(slug);

  if (!post) {
    return <div className="max-w-4xl mx-auto py-12 px-4">Post not found</div>;
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-poppins mb-4">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-6">{post.publishedAt?.slice(0,10)} • {post.author}</p>
      {post.mainImage && (
        <Image 
          src={post.mainImage} 
          alt={post.title} 
          width={800} 
          height={400} 
          className="w-full h-auto mb-6" 
        />
      )}
      <article className="prose prose-lg">
        {/* We kept body as Portable Text — for demo we simply stringify */}
        {Array.isArray(post.body) ? post.body.map((block: any, i: number) => (
          block._type === 'block' ? <p key={i}>{block.children?.map((c: any) => c.text).join('')}</p> : null
        )) : <p>{post.body}</p>}
      </article>
    </main>
  );
}
