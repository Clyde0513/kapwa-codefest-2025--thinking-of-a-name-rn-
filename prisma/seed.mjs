import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@site.test' },
    update: {},
    create: { email: 'demo@site.test', name: 'Demo User' }
  });

  const post = await prisma.post.create({
    data: {
      authorId: user.id,
      title: 'Hello, world',
      content: 'First post! 🎉'
    }
  });

  await prisma.comment.create({
    data: {
      postId: post.id,
      authorId: user.id,
      content: 'Welcome to the blog!'
    }
  });

  await prisma.event.create({
    data: {
      title: 'Community Meetup',
      description: 'Snacks + demos.',
      startsAt: new Date(Date.now() + 24 * 3600 * 1000),
      endsAt: new Date(Date.now() + 25 * 3600 * 1000),
      location: 'Main Hall',
      url: 'https://example.com/meetup',
      createdById: user.id
    }
  });

  console.log('Seed complete.');
}

main().finally(() => prisma.$disconnect());
