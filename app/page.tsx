import Link from 'next/link';
import Header from './components/Header';
import Hero from './components/Hero';
import Events from './components/Events';
import MassSchedule from './components/MassSchedule';
import Leadership from './components/Leadership';
import BlogList from './components/BlogList';
import Galleries from './components/Galleries';
import Resources from './components/Resources';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
       {/* Embedded blog preview: latest 3 posts */}
      <section className="max-w-4xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-poppins mb-6">Latest News</h2>
      {/* BlogList is a server component that fetches posts */}
      <BlogList limit={3} />
      <div className="flex justify-center mt-8">
        <Link href="/blog" className="bg-red-600 hover:bg-red-700 text-white font-bold px-12 py-4 rounded-full transition-all text-xl font-poppins border-4 border-white shadow-lg">
          View all posts
        </Link>
      </div>
      </section>
      <Events />
      <MassSchedule />
      <Leadership />
      <Galleries />
      <Resources />
      <Footer />
      
      {/* Placeholder sections - to be implemented */}
      {/* <section id="about" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-poppins font-bold text-primary-900 text-center mb-8">
            About Us
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto text-lg">
            Content coming soon...
          </p>
        </div>
      </section>

      <section id="leadership" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-poppins font-bold text-primary-900 text-center mb-8">
            Leadership
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto text-lg">
            Content coming soon...
          </p>
        </div>
      </section> */}

      {/* <section id="galleries" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-poppins font-bold text-primary-900 text-center mb-8">
            Galleries
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto text-lg">
            Content coming soon...
          </p>
        </div>
      </section> */}
    </main>
  );
}
