'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Settings {
  siteName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
}

export default function Hero() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (response.ok) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Fallback values
  const siteName = settings?.siteName || 'Filipino Apostolate of Boston';
  const tagline = settings?.tagline || 'We are a Christian Community who guides, takes care, and nourishes the faith life of our young people, and our fellow Filipinos in the Archdiocese of Boston.';
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

      {/* Bird Silhouette - Right Side Background */}
      <div className="absolute top-1/2 right-0 transform translate-y-[-50%] translate-x-4 opacity-20 z-0 hidden lg:block">
        <Image
          src="/images/pngtree-bird-silhouette-design-png-image_14643388.png"
          alt="Bird silhouette"
          width={400}
          height={300}
          className="object-contain filter drop-shadow-2xl"
          priority={false}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center z-10">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-16 bg-gray-300 rounded mb-6 mx-auto max-w-2xl"></div>
            <div className="h-6 bg-gray-300 rounded mb-4 mx-auto max-w-4xl"></div>
            <div className="h-6 bg-gray-300 rounded mb-4 mx-auto max-w-3xl"></div>
          </div>
        ) : (
          <>
            <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-wide animate-fade-in-up opacity-0" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
              Welcome to the {siteName}
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl mb-12 leading-relaxed font-bold max-w-4xl mx-auto text-gray-800 animate-fade-in-up opacity-0" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
              {tagline}
            </p>
          </>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-6 animate-fade-in-up opacity-0" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
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
        <div className="mt-6 animate-fade-in-up opacity-0" style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}>
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
