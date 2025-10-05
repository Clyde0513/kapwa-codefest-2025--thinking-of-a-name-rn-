import { prisma } from '../../../../lib/prisma';

export const runtime = 'nodejs'; // Prisma requires Node runtime

export async function GET() {
  try {
    // Test database connection with a simple query
    await prisma.$queryRaw`SELECT 1`;
    
    // Get counts one by one to avoid connection issues
    let users = 0, posts = 0, comments = 0, events = 0;
    
    try {
      users = await prisma.user.count();
    } catch (e) {
      console.warn('Users count failed:', e);
    }
    
    try {
      posts = await prisma.post.count();
    } catch (e) {
      console.warn('Posts count failed:', e);
    }
    
    try {
      comments = await prisma.comment.count();
    } catch (e) {
      console.warn('Comments count failed:', e);
    }
    
    try {
      events = await prisma.event.count();
    } catch (e) {
      console.warn('Events count failed:', e);
    }

    return new Response(
      JSON.stringify({ 
        ok: true, 
        users, 
        posts, 
        comments, 
        events, 
        timestamp: new Date().toISOString() 
      }),
      { 
        status: 200, 
        headers: { 'content-type': 'application/json' } 
      }
    );
  } catch (err: any) {
    console.error('Database health check error:', err);
    return new Response(
      JSON.stringify({ 
        ok: false, 
        error: err.message ?? 'unknown error',
        timestamp: new Date().toISOString()
      }), 
      {
        status: 500,
        headers: { 'content-type': 'application/json' },
      }
    );
  }
}
