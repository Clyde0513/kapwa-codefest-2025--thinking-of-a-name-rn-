'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startsAt: '',
    endsAt: '',
    location: '',
    allDay: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          startsAt: new Date(formData.startsAt).toISOString(),
          endsAt: new Date(formData.endsAt).toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/admin/events/${result.event.id}/edit`);
      } else {
        alert('Failed to create event. Please try again.');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Set default times
  const setDefaultTimes = () => {
    const now = new Date();
    const startTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Next week
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
    
    setFormData(prev => ({
      ...prev,
      startsAt: startTime.toISOString().slice(0, 16),
      endsAt: endTime.toISOString().slice(0, 16),
    }));
  };

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
                <Link href="/admin/events" className="hover:text-gray-700">Events</Link>
                <span>›</span>
                <span className="text-gray-900">New Event</span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Create New Event</h1>
            </div>
            <Link
              href="/admin/events"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Details */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Event Information</h2>
              <p className="text-gray-600 mt-1">Tell people what your event is about</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Sunday Morning Service, Youth Group Meeting, Community Dinner"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Choose a clear, descriptive title that tells people what the event is
                </p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what will happen at this event, who should attend, and any important details...

Example:
Join us for our monthly community dinner! This is a great opportunity to meet new people and enjoy a home-cooked meal together. All are welcome - bring your family and friends. We'll have games for the kids and good conversation for adults."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Help people understand what to expect and why they should come
                </p>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">When & Where</h2>
              <p className="text-gray-600 mt-1">Set the date, time, and location for your event</p>
            </div>
            <div className="p-6 space-y-6">
              {/* All Day Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allDay"
                  name="allDay"
                  checked={formData.allDay}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="allDay" className="ml-2 text-sm text-gray-700">
                  All day event
                </label>
                <button
                  type="button"
                  onClick={setDefaultTimes}
                  className="ml-4 text-sm text-blue-600 hover:text-blue-700"
                >
                  Set example times
                </button>
              </div>

              {/* Date & Time Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startsAt" className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.allDay ? 'Event Date' : 'Start Date & Time'} *
                  </label>
                  <input
                    type={formData.allDay ? 'date' : 'datetime-local'}
                    id="startsAt"
                    name="startsAt"
                    value={formData.startsAt}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {!formData.allDay && (
                  <div>
                    <label htmlFor="endsAt" className="block text-sm font-medium text-gray-700 mb-2">
                      End Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      id="endsAt"
                      name="endsAt"
                      value={formData.endsAt}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Main Sanctuary, Community Hall, 123 Church Street"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Include the building, room, or address where the event will take place
                </p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-green-50 rounded-lg border border-green-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-green-900 mb-2">📅 Event Planning Tips</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• <strong>Be specific with times:</strong> Include start and end times so people can plan</li>
                <li>• <strong>Include location details:</strong> Mention the building, room, or street address</li>
                <li>• <strong>Describe the event:</strong> Tell people what will happen and who should attend</li>
                <li>• <strong>Add contact info:</strong> Include who to contact for questions or registration</li>
                <li>• <strong>Plan ahead:</strong> Create events well in advance so people can add them to their calendars</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Link
              href="/admin/events"
              className="text-gray-600 hover:text-gray-700 font-medium"
            >
              ← Back to Events
            </Link>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.push('/admin/events')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={loading || !formData.title.trim() || !formData.startsAt}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
