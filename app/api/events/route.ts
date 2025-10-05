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
    const { title, startsAt, endsAt, allDay, location, createdByEmail, description } = await req.json();
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
        createdById,
      },
    });

    return new Response(JSON.stringify(ev), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
