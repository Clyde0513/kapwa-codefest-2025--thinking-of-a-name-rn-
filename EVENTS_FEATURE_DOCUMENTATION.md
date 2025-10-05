# Event Management Feature Documentation

## Overview

This document describes the event editing and management functionality implemented in the application. The feature allows users to create, read, update, and delete (CRUD) events stored in a PostgreSQL database using Prisma ORM.

## Architecture

### Database Schema

The `Event` model in Prisma (`prisma/schema.prisma`) includes:

```prisma
model Event {
  id             String   @id @default(uuid())
  title          String
  description    String?
  startsAt       DateTime
  endsAt         DateTime
  allDay         Boolean  @default(false)
  location       String?
  url            String?
  createdById    String?
  createdBy      User?    @relation("EventCreator", fields: [createdById], references: [id])
  gcalEventId    String?
  gcalCalendarId String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

### API Routes

#### 1. `/api/events` - Collection Operations

**GET** - Fetch multiple events
- Query parameters: `start` (ISO datetime), `end` (ISO datetime)
- Returns: Array of events within the date range
- Example: `/api/events?start=2025-10-01T00:00:00Z&end=2025-10-31T23:59:59Z`

**POST** - Create a new event
- Body: `{ title, startsAt, endsAt, allDay?, location?, description?, url?, createdByEmail? }`
- Required fields: `title`, `startsAt`, `endsAt`
- Returns: Created event object (status 201)

**PUT** - Update an event (deprecated, use PATCH on `/api/events/[id]` instead)
- Body: `{ id, title?, startsAt?, endsAt?, allDay?, location?, description?, url?, gcalEventId?, gcalCalendarId? }`
- Required fields: `id`
- Returns: Updated event object

**DELETE** - Delete an event (deprecated, use DELETE on `/api/events/[id]` instead)
- Query parameters: `id`
- Returns: Success message with deleted event ID

#### 2. `/api/events/[id]` - Individual Event Operations (Recommended)

**GET** - Fetch a single event by ID
- URL parameter: `id` (UUID)
- Returns: Event object with creator details
- Status 404 if not found

**PATCH** - Update an event
- URL parameter: `id` (UUID)
- Body: `{ title?, startsAt?, endsAt?, allDay?, location?, description?, url?, gcalEventId?, gcalCalendarId? }`
- Only provided fields are updated
- Returns: Updated event object with creator details
- Status 404 if not found

**DELETE** - Delete an event
- URL parameter: `id` (UUID)
- Returns: Success message with deleted event ID
- Status 404 if not found

## Components

### EventsAdmin Component

Location: `app/components/EventsAdmin.tsx`

A comprehensive admin interface for managing events with the following features:

**Features:**
- Display all events in a list view
- Create new events with a modal form
- Edit existing events inline
- Delete events with confirmation
- Auto-refresh event list after operations
- Form validation for required fields

**Usage:**
```tsx
import EventsAdmin from '@/app/components/EventsAdmin';

export default function AdminPage() {
  return <EventsAdmin />;
}
```

**Form Fields:**
- Title (required)
- Description (optional)
- Start Date & Time (required)
- End Date & Time (required)
- All Day checkbox
- Location (optional)
- URL (optional)

### EventsCalendar Component

Location: `app/components/EventsCalendar.tsx`

An interactive calendar view using FullCalendar that:

**Features:**
- Displays events from the database on a calendar
- Supports month, week, and day views
- Click on events to view details
- Create new events by selecting dates (optional)
- Auto-fetches events on load

**Integration:**
```tsx
import EventsCalendar from '@/app/components/EventsCalendar';

export default function CalendarPage() {
  return <EventsCalendar />;
}
```

## Admin Page

Location: `app/admin/events/page.tsx`

A dedicated admin page for event management accessible at `/admin/events`.

## Usage Examples

### Creating an Event

```typescript
const response = await fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Sunday Mass',
    description: 'Weekly Sunday Mass celebration',
    startsAt: '2025-10-12T10:00:00Z',
    endsAt: '2025-10-12T11:30:00Z',
    allDay: false,
    location: 'St. Joseph Church, 790 Salem Street, Malden, MA',
    createdByEmail: 'admin@example.com'
  })
});

const event = await response.json();
```

### Updating an Event

```typescript
const response = await fetch(`/api/events/${eventId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Updated Event Title',
    location: 'New Location'
  })
});

const updatedEvent = await response.json();
```

### Deleting an Event

```typescript
const response = await fetch(`/api/events/${eventId}`, {
  method: 'DELETE'
});

const result = await response.json();
// { message: 'Event deleted successfully', id: '...' }
```

### Fetching Events

```typescript
const start = new Date('2025-10-01').toISOString();
const end = new Date('2025-10-31').toISOString();

const response = await fetch(`/api/events?start=${start}&end=${end}`);
const events = await response.json();
```

### Getting a Single Event

```typescript
const response = await fetch(`/api/events/${eventId}`);
const event = await response.json();
// Includes createdBy user details
```

## Error Handling

All API routes return appropriate HTTP status codes:

- **200** - Success (GET, PATCH)
- **201** - Created (POST)
- **400** - Bad Request (missing required fields)
- **404** - Not Found (event doesn't exist)
- **500** - Server Error

Error responses include a JSON object:
```json
{
  "error": "Error message description"
}
```

## Future Enhancements

Potential improvements for the event management system:

1. **Authentication & Authorization**
   - Add user authentication
   - Restrict edit/delete to event creators or admins

2. **Google Calendar Integration**
   - Sync events with Google Calendar using `gcalEventId` and `gcalCalendarId` fields
   - Two-way synchronization

3. **Image Uploads**
   - Add event images/banners
   - Integration with photo management

4. **Recurring Events**
   - Support for recurring event patterns
   - Series management

5. **Event Categories/Tags**
   - Categorize events (Mass, Social, Education, etc.)
   - Color-coding on calendar

6. **RSVP/Registration**
   - Allow users to register for events
   - Attendance tracking

7. **Notifications**
   - Email reminders for upcoming events
   - Push notifications

8. **Search & Filtering**
   - Search events by title, description, location
   - Filter by date range, category, location

## Testing

### Manual Testing Steps

1. **Create Event**: Navigate to `/admin/events`, click "Create Event", fill form, submit
2. **Edit Event**: Click "Edit" on any event, modify fields, save
3. **Delete Event**: Click "Delete", confirm deletion
4. **View Calendar**: Check `/` or wherever EventsCalendar is rendered
5. **API Testing**: Use tools like Postman or curl to test endpoints

### Example curl Commands

```bash
# Create event
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Event",
    "startsAt": "2025-10-20T14:00:00Z",
    "endsAt": "2025-10-20T16:00:00Z"
  }'

# Get events
curl "http://localhost:3000/api/events?start=2025-10-01T00:00:00Z&end=2025-10-31T23:59:59Z"

# Update event
curl -X PATCH http://localhost:3000/api/events/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }'

# Delete event
curl -X DELETE http://localhost:3000/api/events/{id}
```

## Troubleshooting

### Common Issues

1. **"Event not found" error**
   - Verify the event ID is correct
   - Check if event was already deleted

2. **Date parsing errors**
   - Ensure dates are in ISO 8601 format
   - Example: `2025-10-20T14:00:00Z`

3. **Events not showing on calendar**
   - Check date range in API query
   - Verify events exist in database
   - Check browser console for errors

4. **Database connection issues**
   - Verify `DATABASE_URL` in `.env` file
   - Run `npx prisma db push` to sync schema
   - Check Prisma client is generated

## Database Management

### Running Migrations

After schema changes:
```bash
npx prisma migrate dev --name add_event_feature
```

### Seeding Events

Add to `prisma/seed.mjs`:
```javascript
const events = await prisma.event.createMany({
  data: [
    {
      title: 'Sunday Mass',
      startsAt: new Date('2025-10-12T10:00:00Z'),
      endsAt: new Date('2025-10-12T11:30:00Z'),
      location: 'St. Joseph Church'
    }
  ]
});
```

Run: `npm run db:seed`
