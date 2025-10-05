'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Settings {
  siteName: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);

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
      }
    };

    fetchSettings();
  }, []);

  const siteName = settings?.siteName || 'Filipino Apostolate of Boston';
  const nameParts = siteName.split(' ');
  const firstPart = nameParts.slice(0, -2).join(' '); // "Filipino Apostolate"
  const lastPart = nameParts.slice(-2).join(' '); // "of Boston"

  return (
    <header className="bg-gradient-to-r from-[#7A0000] to-[#A01010] text-white top-0 z-50 shadow-xl border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex justify-between items-center py-4">
          {/* Logo with Text Below - Left Side */}
          <Link href="/" className="flex flex-col items-center gap-1 hover:opacity-90 transition-opacity">
            <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex-shrink-0 drop-shadow-lg">
              <Image
                src="/images/catholic_logo.png"
                alt={`${siteName} Logo`}
                width={112}
                height={112}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="text-center mt-1">
              <h1 className="font-poppins font-semibold text-base sm:text-lg leading-tight text-white tracking-wide">
                {firstPart}
              </h1>
              <p className="text-sm sm:text-base font-poppins font-light text-white/95 tracking-wider">{lastPart}</p>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-12">
              <li className="group">
                <Link href="#about" className="font-poppins text-lg font-light text-white/95 hover:text-white transition-all flex items-center gap-1.5 group-hover:scale-105 transform duration-200">
                  About Us
                  {/* <svg className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg> */}
                </Link>
              </li>
              <li className="group">
                <Link href="#leadership" className="font-poppins text-lg font-light text-white/95 hover:text-white transition-all flex items-center gap-1.5 group-hover:scale-105 transform duration-200">
                  Leadership
                  {/* <svg className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg> */}
                </Link>
              </li>
              <li className="group">
                <Link href="#galleries" className="font-poppins text-lg font-light text-white/95 hover:text-white transition-all flex items-center gap-1.5 group-hover:scale-105 transform duration-200">
                  Galleries
                  {/* <svg className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg> */}
                </Link>
              </li>
              <li className="group">
                <Link href="#events" className="font-poppins text-lg font-light text-white/95 hover:text-white transition-all flex items-center gap-1.5 group-hover:scale-105 transform duration-200">
                  Events
                  {/* <svg className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg> */}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Facebook Icon + Contact Us - Top Right */}
          <div className="hidden lg:flex items-center gap-3 group hover:scale-105 transform transition-all duration-200">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </div>
            <Link 
              href="#contact" 
              className="font-poppins text-lg font-light text-white/95 group-hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4">
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="#about" className="block font-poppins font-medium hover:text-gray-200 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#leadership" className="block font-poppins font-medium hover:text-gray-200 transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="#galleries" className="block font-poppins font-medium hover:text-gray-200 transition-colors">
                  Galleries
                </Link>
              </li>
              <li>
                <Link href="#events" className="block font-poppins font-medium hover:text-gray-200 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#contact" className="block font-poppins font-medium hover:text-gray-200 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
