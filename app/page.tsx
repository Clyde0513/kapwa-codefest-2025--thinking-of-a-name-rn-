import Header from './components/Header';
import Hero from './components/Hero';
import Events from './components/Events';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Events />
      
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

      <footer className="bg-primary-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 Filipino Apostolate of Boston. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
