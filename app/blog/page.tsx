import Header from '../components/Header';
import DatabaseBlogList from '../components/DatabaseBlogList';

export default async function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-poppins mb-6">Blog</h1>
        <DatabaseBlogList />
      </section>

    </main>
  )
}
