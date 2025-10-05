import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

// GET /api/events?start=2025-10-01T00:00:00Z&end=2025-10-31T23:59:59Z
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    if (!start || !end) {
      return new Response(JSON.stringify({ error: 'start and end query params (ISO) are required' }), { status: 400 });
    }

    const events = await prisma.event.findMany({
      where: {
        startsAt: { lte: new Date(end) },
        endsAt: { gte: new Date(start) },
      },
      orderBy: { startsAt: 'asc' },
    });

    return Response.json(events);
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, startsAt, endsAt, allDay, location, createdByEmail, description, url } = await req.json();
    if (!title || !startsAt || !endsAt) {
      return new Response(JSON.stringify({ error: 'title, startsAt, endsAt are required' }), { status: 400 });
    }

    let createdById: string | undefined;
    if (createdByEmail) {
      const user = await prisma.user.upsert({
        where: { email: createdByEmail },
        update: {},
        create: { email: createdByEmail, name: 'Event Creator' },
      });
      createdById = user.id;
    }

    const ev = await prisma.event.create({
      data: {
        title,
        description,
        startsAt: new Date(startsAt),
        endsAt: new Date(endsAt),
        allDay: Boolean(allDay),
        location,
        url,
        createdById,
      },
    });

    return new Response(JSON.stringify(ev), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

// PUT /api/events (update event by ID)
export async function PUT(req: Request) {
  try {
    const { id, title, startsAt, endsAt, allDay, location, description, url, gcalEventId, gcalCalendarId } = await req.json();
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'id is required' }), { status: 400 });
    }

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return new Response(JSON.stringify({ error: 'Event not found' }), { status: 404 });
    }

    // Build update data object with only provided fields
    const updateData: any = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (startsAt !== undefined) updateData.startsAt = new Date(startsAt);
    if (endsAt !== undefined) updateData.endsAt = new Date(endsAt);
    if (allDay !== undefined) updateData.allDay = Boolean(allDay);
    if (location !== undefined) updateData.location = location;
    if (url !== undefined) updateData.url = url;
    if (gcalEventId !== undefined) updateData.gcalEventId = gcalEventId;
    if (gcalCalendarId !== undefined) updateData.gcalCalendarId = gcalCalendarId;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: updateData,
    });

    return Response.json(updatedEvent);
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

// DELETE /api/events (delete event by ID)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'id query parameter is required' }), { status: 400 });
    }

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return new Response(JSON.stringify({ error: 'Event not found' }), { status: 404 });
    }

    await prisma.event.delete({
      where: { id },
    });

    return Response.json({ message: 'Event deleted successfully', id });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
