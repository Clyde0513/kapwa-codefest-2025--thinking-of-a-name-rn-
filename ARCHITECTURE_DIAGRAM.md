# Event Management System - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT SIDE                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐   │
│  │  EventsAdmin     │  │ EventsCalendar   │  │  Test Events    │   │
│  │  Component       │  │ Component        │  │  Page           │   │
│  │                  │  │                  │  │                 │   │
│  │ - Create Event   │  │ - Display Events │  │ - API Testing   │   │
│  │ - Edit Event     │  │ - Calendar View  │  │ - Debug Tool    │   │
│  │ - Delete Event   │  │ - Click Details  │  │                 │   │
│  │ - List Events    │  │ - Date Selection │  │                 │   │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬────────┘   │
│           │                     │                      │            │
│           └─────────────────────┼──────────────────────┘            │
│                                 │                                   │
└─────────────────────────────────┼───────────────────────────────────┘
                                  │
                                  │ HTTP Requests
                                  │
┌─────────────────────────────────┼───────────────────────────────────┐
│                           API LAYER                                  │
├─────────────────────────────────┼───────────────────────────────────┤
│                                 │                                   │
│  ┌──────────────────────────────▼────────────────────────────────┐ │
│  │           /api/events (Collection Endpoints)                   │ │
│  │                                                                 │ │
│  │  GET    /api/events?start=...&end=...  → List events          │ │
│  │  POST   /api/events                     → Create new event     │ │
│  │  PUT    /api/events (deprecated)        → Update event         │ │
│  │  DELETE /api/events?id=... (deprecated) → Delete event         │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │           /api/events/[id] (Individual Endpoints)               │ │
│  │                                                                 │ │
│  │  GET    /api/events/[id]  → Get single event + creator info    │ │
│  │  PATCH  /api/events/[id]  → Update event (partial)             │ │
│  │  DELETE /api/events/[id]  → Delete event                       │ │
│  └─────────────────────────┬───────────────────────────────────────┘ │
│                             │                                         │
└─────────────────────────────┼─────────────────────────────────────────┘
                              │
                              │ Prisma ORM
                              │
┌─────────────────────────────▼─────────────────────────────────────────┐
│                        DATABASE LAYER                                 │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                      PostgreSQL Database                        │ │
│  │                                                                 │ │
│  │   TABLE: Event                                                  │ │
│  │   ┌──────────────────────────────────────────────────────────┐ │ │
│  │   │ id              String    @id @default(uuid())           │ │ │
│  │   │ title           String                                   │ │ │
│  │   │ description     String?                                  │ │ │
│  │   │ startsAt        DateTime                                 │ │ │
│  │   │ endsAt          DateTime                                 │ │ │
│  │   │ allDay          Boolean   @default(false)                │ │ │
│  │   │ location        String?                                  │ │ │
│  │   │ url             String?                                  │ │ │
│  │   │ createdById     String?                                  │ │ │
│  │   │ gcalEventId     String?                                  │ │ │
│  │   │ gcalCalendarId  String?                                  │ │ │
│  │   │ createdAt       DateTime  @default(now())                │ │ │
│  │   │ updatedAt       DateTime  @updatedAt                     │ │ │
│  │   └──────────────────────────────────────────────────────────┘ │ │
│  │                                                                 │ │
│  │   TABLE: User                                                   │ │
│  │   ┌──────────────────────────────────────────────────────────┐ │ │
│  │   │ id        String   @id @default(uuid())                  │ │ │
│  │   │ email     String?  @unique                               │ │ │
│  │   │ name      String?                                        │ │ │
│  │   │ image     String?                                        │ │ │
│  │   │ createdAt DateTime @default(now())                       │ │ │
│  │   │                                                          │ │ │
│  │   │ Relation: events Event[] @relation("EventCreator")       │ │ │
│  │   └──────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘


DATA FLOW EXAMPLE - Creating an Event:
═══════════════════════════════════════════════════════════════════════

1. User fills form in EventsAdmin component
   └─> Form data: { title, startsAt, endsAt, location, ... }

2. Component sends POST request
   └─> POST /api/events
       Headers: { 'Content-Type': 'application/json' }
       Body: JSON event data

3. API Route Handler (app/api/events/route.ts)
   ├─> Validates required fields (title, startsAt, endsAt)
   ├─> If createdByEmail provided:
   │   └─> Upsert user in database
   └─> Creates event via Prisma

4. Prisma ORM
   └─> Executes INSERT query to PostgreSQL
       INSERT INTO "Event" (id, title, startsAt, endsAt, ...)
       VALUES (uuid_generate_v4(), 'Sunday Mass', ...)

5. Database returns created event

6. API returns JSON response
   └─> Status: 201 Created
       Body: { id: "...", title: "...", ... }

7. Component receives response
   └─> Refreshes event list
       Shows success message


DATA FLOW EXAMPLE - Updating an Event:
═══════════════════════════════════════════════════════════════════════

1. User clicks "Edit" on event card
   └─> EventsAdmin opens modal with pre-filled data

2. User modifies fields and saves
   └─> Form data: { title: "Updated Title" }

3. Component sends PATCH request
   └─> PATCH /api/events/[id]
       Body: { title: "Updated Title" }

4. API Route Handler (app/api/events/[id]/route.ts)
   ├─> Checks if event exists (404 if not)
   ├─> Builds update object with only provided fields
   └─> Updates event via Prisma

5. Prisma ORM
   └─> Executes UPDATE query
       UPDATE "Event" SET title = 'Updated Title', updatedAt = NOW()
       WHERE id = '...'

6. Database returns updated event

7. API returns JSON response
   └─> Status: 200 OK
       Body: { id: "...", title: "Updated Title", ... }

8. Component refreshes list
   └─> Shows updated event


PAGES & ACCESS POINTS:
═══════════════════════════════════════════════════════════════════════

┌────────────────────────────────────────────────────────────────────┐
│ /                    → Main page with EventsCalendar               │
│ /admin/events        → Event management dashboard (EventsAdmin)    │
│ /test-events         → API testing interface                       │
├────────────────────────────────────────────────────────────────────┤
│ API Endpoints:                                                     │
│ /api/events          → Collection operations                       │
│ /api/events/[id]     → Individual event operations                 │
└────────────────────────────────────────────────────────────────────┘
```
