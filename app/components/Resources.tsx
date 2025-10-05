'use client';

import { useEffect, useState } from 'react';

interface Settings {
  resourcesTitle?: string;
  resourcesSubtitle?: string;
  resourceLinks?: Array<{ title: string; url: string }>;
}

export default function Resources() {
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

  // Fallback values
  const title = settings?.resourcesTitle || 'Resources for Spiritual Growth';
  const subtitle = settings?.resourcesSubtitle || 'Connect with Catholic resources and deepen your faith';
  const resources = settings?.resourceLinks || [
    { title: 'The Vatican: The Holy See', url: 'https://www.vatican.va/' },
    { title: 'Archdiocese of Boston', url: 'https://www.bostoncatholic.org/' },
    { title: 'Daily Readings', url: 'https://bible.usccb.org/daily-bible-reading' },
    { title: "Cardinal Sean's Blog", url: 'https://www.cardinalseansblog.org/' },
    { title: 'The Good Catholic Life', url: 'https://www.thegoodcatholiclife.com/' },
    { title: 'Catholic Devotions', url: 'https://www.catholicdevotions.org/' }
  ];

  return (
    <section id="resources" className="py-20 px-4" style={{ backgroundColor: '#faecc8' }}>
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 text-center mb-8">
          {title.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h2>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-center text-gray-700 text-lg mb-16 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        
        {/* Resources List */}
        <div className="space-y-6">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-2xl md:text-3xl font-serif text-gray-900 hover:text-red-700 transition-colors duration-200 py-3"
            >
              {resource.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
