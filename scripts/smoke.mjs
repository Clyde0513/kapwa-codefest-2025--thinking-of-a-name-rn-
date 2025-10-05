import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const u = await prisma.user.upsert({
    where: { email: 'smoke@site.test' },
    update: {},
    create: { email: 'smoke@site.test', name: 'Smoke Bot' },
  });

  const p = await prisma.post.create({
    data: { title: 'Smoke Post', content: '🔥 If you read me, DB is alive.', authorId: u.id },
  });

  await prisma.comment.create({ data: { postId: p.id, authorId: u.id, content: 'Looks good!' } });

  const now = new Date();
  const ev = await prisma.event.create({
    data: {
      title: 'Smoke Event',
      startsAt: new Date(now.getTime() + 60 * 60 * 1000),
      endsAt: new Date(now.getTime() + 2 * 60 * 60 * 1000),
      createdById: u.id,
    },
  });

  const [users, posts, comments, events] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.comment.count(),
    prisma.event.count(),
  ]);

  console.log({ created: { user: u.id, post: p.id, event: ev.id }, totals: { users, posts, comments, events } });
}

run().finally(() => prisma.$disconnect());
