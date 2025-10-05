import Header from '../components/Header';
import { sanityClient } from '../../lib/sanityClient';

export default async function BlogPage() {
  // Fetch posts from Sanity CMS
  const posts = await sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "authorName": author->name,
      "mainImage": mainImage.asset->url,
      "previewText": pt::text(body)
    }
  `);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-poppins mb-6">Blog</h1>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found. Create your first post in the Sanity Studio!</p>
            <a 
              href="/studio" 
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Open Sanity Studio
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post: any) => (
              <article key={post._id} className="border-b border-gray-200 pb-8 last:border-b-0">
                <div className="flex flex-col md:flex-row gap-6">
                  {post.mainImage && (
                    <div className="md:w-64 flex-shrink-0">
                      <img
                        src={post.mainImage}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      <a 
                        href={`/blog/${post.slug.current}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </a>
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>{post.authorName || 'Church Staff'}</span>
                      <span>•</span>
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {post.excerpt || post.previewText?.substring(0, 200) + '...'}
                    </p>
                    <a 
                      href={`/blog/${post.slug.current}`}
                      className="inline-block mt-3 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Read more →
                    </a>
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
