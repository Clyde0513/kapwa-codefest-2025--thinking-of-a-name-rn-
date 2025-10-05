'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface WebsiteSettings {
  siteName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  serviceTimes: string;
  pastorName: string;
}

export default function WebsiteSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<WebsiteSettings>({
    siteName: 'Filipino Apostolate of Boston',
    tagline: 'A Christian Community who guides, takes care, and nourishes the faith life of our young people, and our fellow Filipinos in the Archdiocese of Boston.',
    heroTitle: 'Welcome to Our Church Family',
    heroSubtitle: 'Join us in faith, fellowship, and community',
    aboutText: 'We are a welcoming community dedicated to serving God and each other. Our mission is to provide spiritual guidance and support to Filipino families in the Boston area.',
    contactEmail: 'info@church.com',
    contactPhone: '(555) 123-4567',
    address: '123 Church Street, Boston, MA 02101',
    serviceTimes: 'Sundays at 10:00 AM and 6:00 PM',
    pastorName: 'Rev. Father John Smith',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const errorData = await response.json();
        alert(`Failed to save settings: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          setSettings(data.settings);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/admin" className="hover:text-gray-700">Admin</Link>
                <span>›</span>
                <span className="text-gray-900">Website Settings</span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Website Settings</h1>
              <p className="text-gray-600 mt-1">Update your church&apos;s website information</p>
            </div>
            <Link
              href="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Preview Website
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
              <p className="text-gray-600 mt-1">Your church&apos;s name and basic details</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
                  Church Name *
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Statement
                </label>
                <textarea
                  id="tagline"
                  name="tagline"
                  value={settings.tagline}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your church's mission and purpose..."
                />
              </div>

              <div>
                <label htmlFor="pastorName" className="block text-sm font-medium text-gray-700 mb-2">
                  Pastor/Priest Name
                </label>
                <input
                  type="text"
                  id="pastorName"
                  name="pastorName"
                  value={settings.pastorName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Homepage Content */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Homepage Content</h2>
              <p className="text-gray-600 mt-1">What visitors see when they first visit your website</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Welcome Title *
                </label>
                <input
                  type="text"
                  id="heroTitle"
                  name="heroTitle"
                  value={settings.heroTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Welcome to Our Church Family"
                />
              </div>

              <div>
                <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Welcome Subtitle
                </label>
                <input
                  type="text"
                  id="heroSubtitle"
                  name="heroSubtitle"
                  value={settings.heroSubtitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Join us in faith, fellowship, and community"
                />
              </div>

              <div>
                <label htmlFor="aboutText" className="block text-sm font-medium text-gray-700 mb-2">
                  About Section
                </label>
                <textarea
                  id="aboutText"
                  name="aboutText"
                  value={settings.aboutText}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell visitors about your church community, history, and what makes you special..."
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
              <p className="text-gray-600 mt-1">How people can reach your church</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Church Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={settings.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Street address, city, state, zip code"
                />
              </div>

              <div>
                <label htmlFor="serviceTimes" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Times
                </label>
                <input
                  type="text"
                  id="serviceTimes"
                  name="serviceTimes"
                  value={settings.serviceTimes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Sundays at 10:00 AM and 6:00 PM, Wednesdays at 7:00 PM"
                />
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 rounded-lg border border-blue-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-2">💡 Tips for Great Website Content</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• <strong>Keep it welcoming:</strong> Use warm, inviting language that makes visitors feel welcome</li>
                <li>• <strong>Be specific:</strong> Include exact times, addresses, and contact information</li>
                <li>• <strong>Tell your story:</strong> Share what makes your church special and unique</li>
                <li>• <strong>Keep it current:</strong> Update information regularly, especially service times and contact details</li>
                <li>• <strong>Use simple language:</strong> Write in a way that everyone can understand</li>
              </ul>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Changes will be visible on your website immediately after saving
            </div>
            <div className="flex items-center space-x-4">
              {saved && (
                <div className="flex items-center text-green-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Settings saved successfully!
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
