import Header from '../components/Header';
import Hero from '../components/Hero';
import Events from '../components/Events';
import BlogList from '../components/BlogList';
import Link from 'next/link';

export const revalidate = 60; // ISR: revalidate every minute

function PostCard({ post }: { post: any }) {
  return (
    <article className="bg-white shadow-sm rounded-md p-6">
      <h2 className="text-2xl font-poppins mb-2">
        <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
      </h2>
      <p className="text-sm text-gray-600 mb-4">{post.publishedAt?.slice(0, 10)} • {post.authorName}</p>
      <p className="text-gray-800">{post.excerpt || (post.previewText ? (post.previewText.length > 220 ? post.previewText.slice(0, 220) + '...' : post.previewText) : '')}</p>
    </article>
  )
}

export default async function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />

      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-poppins mb-6">Blog</h1>
        <BlogList />
      </section>

      <Events />
    </main>
  )
}
