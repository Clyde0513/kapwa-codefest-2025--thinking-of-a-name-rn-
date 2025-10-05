import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 px-4 bg-gradient-to-br from-[#decca6] via-[#c0a154] to-[#decca6]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-poppins text-4xl sm:text-5xl lg:text-5xl font-bold mb-12 leading-tight tracking-wide text-gray-900">
            Mission Statement of the
            <br />
            Filipino Apostolate
            of the
            <br />
            Archdiocese of Boston
          </h1>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Filipino Text */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-[#7A0000] to-[#A01010] text-white p-12 rounded-2xl shadow-xl">
              <p className="font-['Georgia'] text-2xl sm:text-3xl lg:text-4xl leading-relaxed text-center italic">
                Kami ay isang Sambayanang Kristiyano
                <br />
                na gumagabay,
                <br />
                kumakalinga,
                <br />
                at umaaruga
                <br />
                sa aming mga kabataan at kapwa Pilipino
                <br />
                dito sa Arkidiosesis ng Boston.
              </p>
            </div>
          </div>

          {/* English Translation */}
          <div className="mb-16">
            <div className="bg-gray-50 p-12 rounded-2xl shadow-lg">
              <p className="font-poppins text-xl sm:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800">
                We are a Christian Community who guides, takes care, 
                and nourishes the faith life of our young people, 
                and our fellow Filipinos in the Archdiocese of Boston.
              </p>
            </div>
          </div>

          {/* Keywords Section */}
          <div className="bg-gradient-to-br from-[#decca6] via-[#c0a154] to-[#decca6] p-12 rounded-2xl shadow-xl">
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
              Key words to reflect on which should lead us to our lines of actions:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 p-8 rounded-xl shadow-lg">
                <h3 className="font-poppins text-2xl font-bold text-[#7A0000] mb-4 text-center">
                  Sambayanang Kristiyano
                </h3>
                <p className="font-poppins text-lg text-gray-700 text-center">
                  (Christian Community)
                </p>
              </div>
              
              <div className="bg-white/80 p-8 rounded-xl shadow-lg">
                <h3 className="font-poppins text-2xl font-bold text-[#7A0000] mb-4 text-center">
                  gumagabay
                </h3>
                <p className="font-poppins text-lg text-gray-700 text-center">
                  (to guide)
                </p>
              </div>
              
              <div className="bg-white/80 p-8 rounded-xl shadow-lg">
                <h3 className="font-poppins text-2xl font-bold text-[#7A0000] mb-4 text-center">
                  kumakalinga
                </h3>
                <p className="font-poppins text-lg text-gray-700 text-center">
                  (to take care)
                </p>
              </div>
              
              <div className="bg-white/80 p-8 rounded-xl shadow-lg">
                <h3 className="font-poppins text-2xl font-bold text-[#7A0000] mb-4 text-center">
                  umaaruga
                </h3>
                <p className="font-poppins text-lg text-gray-700 text-center">
                  (to nourish)
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-16">
            <Link 
              href="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-12 py-4 rounded-full transition-all text-xl font-poppins border-4 border-white shadow-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
