'use client';

import { useState } from 'react';

export default function EventAPITestPage() {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testCreateEvent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test Event - ' + new Date().toLocaleTimeString(),
          description: 'This is a test event created via API',
          startsAt: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          endsAt: new Date(Date.now() + 90000000).toISOString(), // Tomorrow + 1 hour
          allDay: false,
          location: 'Test Location',
          url: 'https://example.com',
        }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testGetEvents = async () => {
    setLoading(true);
    try {
      const start = new Date();
      start.setMonth(start.getMonth() - 1);
      const end = new Date();
      end.setMonth(end.getMonth() + 6);

      const res = await fetch(
        `/api/events?start=${start.toISOString()}&end=${end.toISOString()}`
      );
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testUpdateEvent = async () => {
    const eventId = prompt('Enter event ID to update:');
    if (!eventId) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Updated Test Event - ' + new Date().toLocaleTimeString(),
          description: 'This event was updated via API test',
        }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testDeleteEvent = async () => {
    const eventId = prompt('Enter event ID to delete:');
    if (!eventId) return;

    if (!confirm('Are you sure you want to delete this event?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testGetSingleEvent = async () => {
    const eventId = prompt('Enter event ID to fetch:');
    if (!eventId) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}`);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Event API Test Page</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Operations</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={testCreateEvent}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              Create Event
            </button>

            <button
              onClick={testGetEvents}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              Get All Events
            </button>

            <button
              onClick={testGetSingleEvent}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              Get Single Event
            </button>

            <button
              onClick={testUpdateEvent}
              disabled={loading}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              Update Event
            </button>

            <button
              onClick={testDeleteEvent}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              Delete Event
            </button>

            <button
              onClick={() => setResponse('')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold"
            >
              Clear Response
            </button>
          </div>

          {loading && (
            <div className="text-center text-gray-600 mb-4">
              Loading...
            </div>
          )}

          {response && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">API Response:</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                {response}
              </pre>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold">1. Create Event</h3>
              <p className="text-sm">Creates a new test event with sample data.</p>
            </div>

            <div>
              <h3 className="font-semibold">2. Get All Events</h3>
              <p className="text-sm">Fetches all events from the last month to 6 months ahead.</p>
            </div>

            <div>
              <h3 className="font-semibold">3. Get Single Event</h3>
              <p className="text-sm">Fetches details of a specific event by ID (will prompt for ID).</p>
            </div>

            <div>
              <h3 className="font-semibold">4. Update Event</h3>
              <p className="text-sm">Updates an existing event's title and description (will prompt for ID).</p>
            </div>

            <div>
              <h3 className="font-semibold">5. Delete Event</h3>
              <p className="text-sm">Permanently deletes an event (will prompt for ID and confirmation).</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>
                <a href="/admin/events" className="underline hover:text-blue-900">
                  → Event Admin Dashboard
                </a>
              </li>
              <li>
                <a href="/" className="underline hover:text-blue-900">
                  → Main Page (with Calendar)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
