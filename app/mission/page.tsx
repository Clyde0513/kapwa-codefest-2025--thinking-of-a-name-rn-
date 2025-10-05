import Link from 'next/link';
import Image from 'next/image';
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

          {/* Logo Explanation Section */}
          <div className="mt-16 bg-white p-12 rounded-2xl shadow-xl border-2 border-gray-100">
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
              Logo Explanation
            </h2>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-xl border-l-4 border-green-500">
                <h3 className="font-poppins text-xl font-bold text-green-800 mb-4">
                  The Bamboo Cross
                </h3>
                <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                  Represents our Christian identity as Asians. The bamboo also symbolizes strength, 
                  and flexibility even in the midst of trials, sufferings, and other adversities. 
                  As one Chinese actor expressed &ldquo;Notice that the stiffest tree is most easily cracked, 
                  while the bamboo survives by bending with the wind&rdquo;. It symbolizes our resiliency as Filipinos.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl border-l-4 border-yellow-500">
                <h3 className="font-poppins text-xl font-bold text-yellow-800 mb-4">
                  The Sun with Eight Rays
                </h3>
                <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                  Taken from our national flag, it symbolizes our diversity. The rays emanate from the center. 
                  Our diversity as Filipinos here in the Archdiocese of Boston draws its source in our Lord Jesus Christ 
                  especially in the Holy Eucharist.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl border-l-4 border-blue-500">
                <h3 className="font-poppins text-xl font-bold text-blue-800 mb-4">
                  The Hands
                </h3>
                <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                  They are in the action of reaching out to each other. The action is symbolic of our desire 
                  to reach out to our kababayan in the Greater Boston Areas through our apostolate as described 
                  in the words <em>gumagabay, kumakalinga, at umaaruga</em>. These are the key words from our new vision-mission statement.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              {/* Logo Display */}
              <div className="text-center mb-8">
                <div className="inline-block bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100">
                  <Image
                    src="/images/tiwalaupdated.png"
                    alt="Filipino Apostolate of Boston Logo"
                    width={300}
                    height={300}
                    className="w-64 h-64 object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Credits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Concept:</p>
                  <p>Fr. Alex Castro, AA</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Design:</p>
                  <p>Rochie Panganiban</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 italic">
                  *The logo was adapted from the logo used by the National Assembly of Filipino Priest 
                  in the USA (NAFP-USA) for their Triennial Assembly last November 2017
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
