import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

// Minimal body: { "postId": string, "content": string, "authorEmail"?: string }
export async function POST(req: Request) {
  try {
    const { postId, content, authorEmail } = await req.json();

    if (!postId || !content) {
      return new Response(JSON.stringify({ error: 'postId and content are required' }), { status: 400 });
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

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return new Response(JSON.stringify({ error: 'post not found' }), { status: 404 });

    const comment = await prisma.comment.create({
      data: { postId, content, authorId },
    });

    return new Response(JSON.stringify(comment), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
