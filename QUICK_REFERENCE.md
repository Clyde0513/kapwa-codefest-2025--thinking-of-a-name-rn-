# Event Management Quick Reference

## 🚀 Quick Start

### Access Points
- **Admin Dashboard**: http://localhost:3000/admin/events
- **API Tester**: http://localhost:3000/test-events
- **Calendar View**: http://localhost:3000/ (main page)

### Quick Test (Copy & Paste)

```bash
# Test in browser console or use the /test-events page

// Create an event
fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Test Event',
    startsAt: new Date(Date.now() + 86400000).toISOString(),
    endsAt: new Date(Date.now() + 90000000).toISOString(),
    location: 'Test Location'
  })
}).then(r => r.json()).then(console.log)
```

## 📋 API Cheat Sheet

### Get Events
```javascript
// Get events for next month
const start = new Date().toISOString();
const end = new Date(Date.now() + 30*24*60*60*1000).toISOString();
const events = await fetch(`/api/events?start=${start}&end=${end}`).then(r => r.json());
```

### Create Event
```javascript
const event = await fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Sunday Mass',              // Required
    startsAt: '2025-10-12T10:00:00Z',  // Required (ISO format)
    endsAt: '2025-10-12T11:30:00Z',    // Required (ISO format)
    description: 'Weekly celebration', // Optional
    location: 'St. Joseph Church',     // Optional
    allDay: false,                     // Optional (default: false)
    url: 'https://example.com'         // Optional
  })
}).then(r => r.json());
```

### Get Single Event
```javascript
const event = await fetch(`/api/events/${eventId}`).then(r => r.json());
```

### Update Event
```javascript
const updated = await fetch(`/api/events/${eventId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Updated Title',    // Only send fields you want to update
    location: 'New Location'
  })
}).then(r => r.json());
```

### Delete Event
```javascript
const result = await fetch(`/api/events/${eventId}`, {
  method: 'DELETE'
}).then(r => r.json());
```

## 🎨 Component Usage

### EventsAdmin Component
```tsx
import EventsAdmin from '@/app/components/EventsAdmin';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EventsAdmin />
    </div>
  );
}
```

### EventsCalendar Component
```tsx
import EventsCalendar from '@/app/components/EventsCalendar';

export default function CalendarPage() {
  return <EventsCalendar />;
}
```

## 🗃️ Database Schema Quick Reference

### Event Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | Auto | Unique identifier |
| title | String | ✓ | Event name |
| description | String | ✗ | Event details |
| startsAt | DateTime | ✓ | Start date/time (ISO) |
| endsAt | DateTime | ✓ | End date/time (ISO) |
| allDay | Boolean | ✗ | All-day event flag |
| location | String | ✗ | Event location |
| url | String | ✗ | External link |
| createdById | UUID | ✗ | Creator user ID |
| createdAt | DateTime | Auto | Creation timestamp |
| updatedAt | DateTime | Auto | Last update timestamp |

## ⚡ Common Tasks

### Task 1: Add a Mass Event
```javascript
fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Sunday Mass',
    startsAt: '2025-10-12T10:00:00Z',
    endsAt: '2025-10-12T11:30:00Z',
    location: 'St. Joseph Church, 790 Salem Street, Malden, MA',
    description: 'Weekly Sunday Mass celebration'
  })
})
```

### Task 2: Update Event Time
```javascript
fetch(`/api/events/${eventId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    startsAt: '2025-10-12T11:00:00Z',  // New start time
    endsAt: '2025-10-12T12:30:00Z'     // New end time
  })
})
```

### Task 3: Get All Events This Month
```javascript
const now = new Date();
const start = new Date(now.getFullYear(), now.getMonth(), 1);
const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

fetch(`/api/events?start=${start.toISOString()}&end=${end.toISOString()}`)
  .then(r => r.json())
  .then(events => console.log(events))
```

### Task 4: Mark Event as All-Day
```javascript
fetch(`/api/events/${eventId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ allDay: true })
})
```

## 🔧 Troubleshooting

### "Event not found" error
- ✓ Check event ID is correct UUID
- ✓ Event may have been deleted
- ✓ Use GET /api/events to list all events

### Dates not working
- ✓ Use ISO 8601 format: `2025-10-12T10:00:00Z`
- ✓ Or use: `new Date().toISOString()`
- ✗ Don't use: `10/12/2025`

### Calendar not showing events
- ✓ Check events exist in date range
- ✓ Open browser console for errors
- ✓ Verify API returns data: `/api/events?start=...&end=...`

### Events not updating
- ✓ Check response status (should be 200)
- ✓ Verify request body has correct fields
- ✓ Refresh the page or component

## 📁 File Locations

```
app/
├── api/
│   └── events/
│       ├── route.ts          → Collection endpoints (GET, POST)
│       └── [id]/
│           └── route.ts      → Individual endpoints (GET, PATCH, DELETE)
├── components/
│   ├── EventsAdmin.tsx       → Admin dashboard component
│   └── EventsCalendar.tsx    → Calendar view component
├── admin/
│   └── events/
│       └── page.tsx          → Admin page (/admin/events)
└── test-events/
    └── page.tsx              → Testing page (/test-events)

prisma/
└── schema.prisma             → Event model definition

Documentation/
├── EVENTS_FEATURE_DOCUMENTATION.md  → Full documentation
├── IMPLEMENTATION_SUMMARY.md        → Implementation overview
├── ARCHITECTURE_DIAGRAM.md          → Visual architecture
└── QUICK_REFERENCE.md              → This file
```

## 💡 Pro Tips

1. **Use PATCH, not PUT** for updates (more efficient)
2. **Always validate dates** before sending to API
3. **Use the test page** (`/test-events`) to debug API issues
4. **Check browser console** for client-side errors
5. **Event IDs are UUIDs** - copy them carefully
6. **Partial updates work** - only send fields you want to change
7. **Date range queries** require both start and end parameters

## 🎯 Next Steps

1. Visit `/admin/events` to manage events visually
2. Try `/test-events` to test API operations
3. Check main page to see calendar integration
4. Read `EVENTS_FEATURE_DOCUMENTATION.md` for details

## 📞 Need Help?

- Check `EVENTS_FEATURE_DOCUMENTATION.md` for comprehensive guide
- View `ARCHITECTURE_DIAGRAM.md` for system overview
- Use `/test-events` page for hands-on testing
- Check browser console for error messages
