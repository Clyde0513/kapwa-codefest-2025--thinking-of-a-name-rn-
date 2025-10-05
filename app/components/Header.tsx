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
            <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex-shrink-0 drop-shadow-lg -translate-x-2">
              <Image
                src="/images/tiwalaupdated.png"
                alt={`${siteName} Logo`}
                width={1021}
                height={1024}
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
                <Link href="/mission" className="font-poppins text-lg font-light text-white/95 hover:text-white transition-all flex items-center gap-1.5 group-hover:scale-105 transform duration-200">
                  Mission Statement
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

          {/* Email Icon + Contact Us + Admin Login - Top Right */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-3 group hover:scale-105 transform transition-all duration-200">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a 
                href="mailto:manpards@gmail.com" 
                className="font-poppins text-lg font-light text-white/95 group-hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
            
            <Link 
              href="/admin/login" 
              className="bg-white/20 hover:bg-white/30 text-white font-poppins font-medium px-4 py-2 rounded-full transition-all duration-200 border border-white/30 hover:border-white/50"
            >
              Admin Login
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
                <Link href="/mission" className="block font-poppins font-medium hover:text-gray-200 transition-colors">
                  Mission Statement
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
                <a href="mailto:manpards@gmail.com" className="block font-poppins font-medium hover:text-gray-200 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/admin/login" className="block font-poppins font-medium hover:text-gray-200 transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
