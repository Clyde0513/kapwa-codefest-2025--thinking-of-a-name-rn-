'use client';

import Image from 'next/image';

export default function Leadership() {
  return (
    <section id="leadership" className="py-20 px-4" style={{ backgroundColor: '#FFFDD0' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-poppins font-bold text-gray-900 text-center mb-12">
          Leadership
        </h2>
        
        <div className="max-w-6xl mx-auto">
          {/* Leadership Card with Background Image */}
          <div className="relative rounded-2xl shadow-2xl overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <Image
                src="/images/incense.png"
                alt="Incense background"
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 text-white">
              {/* Header */}
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Filipino Apostolate
                </h3>
                <h4 className="text-2xl md:text-3xl font-bold mb-4">
                  of the Archdiocese of Boston
                </h4>
                <p className="text-xl md:text-2xl font-semibold">
                  North Shore and South Shore Communities
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                {/* Left Column - Chaplain & Board of Advisors */}
                <div className="space-y-8">
                  {/* Chaplain */}
                  <div>
                    <h5 className="text-xl md:text-2xl font-bold mb-3 text-center lg:text-left">
                      CHAPLAIN
                    </h5>
                    <p className="text-base md:text-lg text-center lg:text-left">
                      Father Peru Dayag, SVD
                    </p>
                  </div>

                  {/* Board of Advisors */}
                  <div>
                    <h5 className="text-xl md:text-2xl font-bold mb-3 text-center lg:text-left">
                      BOARD OF ADVISORS
                    </h5>
                    <p className="text-base md:text-lg mb-2 text-center lg:text-left">
                      (Former Chairpersons
                    </p>
                    <p className="text-base md:text-lg mb-4 text-center lg:text-left">
                      of the Apostolate)
                    </p>
                    <ul className="space-y-2 text-base md:text-lg text-center lg:text-left">
                      <li>Johnny Manuel</li>
                      <li>Jenny Aying</li>
                      <li>Meynard Gutierrez</li>
                      <li>Gracita Chiefe</li>
                      <li>Manuel Paradela</li>
                    </ul>
                  </div>
                </div>

                {/* Middle Column - North Shore Executive Council */}
                <div className="space-y-6">
                  <h5 className="text-xl md:text-2xl font-bold mb-4 text-center">
                    EXECUTIVE COUNCIL
                  </h5>
                  <p className="text-lg md:text-xl font-semibold mb-4 text-center">
                    North Shore Communities
                  </p>
                  
                  <div className="space-y-3 text-base md:text-lg">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Coordinator</span>
                      <span className="text-right">Annie Taliad</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Assistant Coordinator</span>
                      <span className="text-right">Jeffrey Pagulong</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Secretary</span>
                      <span className="text-right">Meynard Gutierrez</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Finance Team</span>
                      <span className="text-right">Crispina Gutierrez</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Head of Liturgy</span>
                      <span className="text-right">Kaye Vito</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Faith Formation Outreach</span>
                      <span className="text-right">
                        Pearl Brault<br />
                        Jun Cruz
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column - South Shore Executive Council */}
                <div className="space-y-6">
                  <h5 className="text-xl md:text-2xl font-bold mb-4 text-center">
                    EXECUTIVE COUNCIL
                  </h5>
                  <p className="text-lg md:text-xl font-semibold mb-4 text-center">
                    South Shore Communities
                  </p>
                  
                  <div className="space-y-3 text-base md:text-lg">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Coordinator</span>
                      <span className="text-right">John Manuel</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Assistant Coordinator</span>
                      <span className="text-right">Loreta Borneo</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Secretary</span>
                      <span className="text-right">Alpha Cattaneo</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Finance Team</span>
                      <span className="text-right">Rudy Hermosa</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Head of Liturgy</span>
                      <span className="text-right">Ross Mangilog</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Faith Formation Outreach</span>
                      <span className="text-right">
                        Lisa Paradela<br />
                        Salome Afable
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Finance Committee Section */}
              <div className="mt-10 pt-8 border-t border-white/30">
                <h5 className="text-xl md:text-2xl font-bold mb-6 text-center">
                  Finance Committee
                </h5>
                
                <div className="max-w-2xl mx-auto space-y-3 text-base md:text-lg">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold">Treasurers</span>
                    <span className="text-right">
                      Priscilla Cruz<br />
                      Gracita Chiefe
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-semibold">Auditor</span>
                    <span className="text-right">July Afable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
