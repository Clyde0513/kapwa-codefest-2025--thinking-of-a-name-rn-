import Header from './components/Header';
import Hero from './components/Hero';
import Events from './components/Events';
import MassSchedule from './components/MassSchedule';
import Leadership from './components/Leadership';
import Galleries from './components/Galleries';
import Resources from './components/Resources';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
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
