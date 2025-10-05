import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`✅ User count: ${userCount}`);
    
    // Test creating a post
    const testPost = await prisma.post.create({
      data: {
        title: 'Database Connection Test',
        content: 'This post was created to test the database connection.',
        published: true,
      },
    });
    console.log(`✅ Test post created with ID: ${testPost.id}`);
    
    // Clean up test post
    await prisma.post.delete({
      where: { id: testPost.id },
    });
    console.log('✅ Test post cleaned up');
    
    console.log('🎉 All database tests passed!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
