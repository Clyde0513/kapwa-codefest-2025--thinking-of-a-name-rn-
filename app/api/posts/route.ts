import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { comments: true } }, author: true },
      take: 20,
    });
    return Response.json(posts);
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

// Minimal body: { "title": string, "content": string, "authorEmail"?: string }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, authorEmail } = body ?? {};
    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'title and content are required' }), { status: 400 });
    }

    let authorId: string | undefined;
    if (authorEmail) {
      const user = await prisma.user.upsert({
        where: { email: authorEmail },
        update: {},
        create: { email: authorEmail, name: 'Auto User' },
      });
      authorId = user.id;
    }

    const post = await prisma.post.create({ data: { title, content, authorId } });
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
