'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#decca6] via-[#c0a154] to-[#decca6] text-gray-900 py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Modern background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center z-10">
        <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-wide">
          Welcome to the  
        </h1>
          <h1>
          <span className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-wide">Filipino Apostolate of Boston</span>
       
      </h1>
        
        <p className="text-lg sm:text-xl lg:text-2xl mb-12 leading-relaxed font-bold max-w-4xl mx-auto text-gray-800">
               <br />
          We are a Christian Community who guides, takes care,
          <br className="hidden sm:block" />
          and nourishes the faith life of our young people,
          <br className="hidden sm:block" />
          and our fellow Filipinos in the Archdiocese of Boston.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-6">
          <Link
            href="#events"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-12 py-4 rounded-full transition-all text-xl font-poppins w-full sm:w-auto border-4 border-white shadow-lg"
          >
            Events
          </Link>
          <Link
            href="#mass"
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold px-12 py-4 rounded-full transition-all text-xl font-poppins w-full sm:w-auto border-4 border-white shadow-lg"
          >
            Mass Schedule
          </Link>
        </div>

        {/* Leadership Button */}
        <div className="mt-6">
          <Link
            href="#leadership"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-16 py-4 rounded-full transition-all text-xl font-poppins border-4 border-white shadow-lg"
          >
            Leadership
          </Link>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-12"></div>
    </section>
  );
}
