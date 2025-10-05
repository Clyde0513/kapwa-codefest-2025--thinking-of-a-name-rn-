import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get('title');
    
    if (!title) {
      return NextResponse.json({ error: 'Title parameter is required' }, { status: 400 });
    }

    // Find PostgreSQL posts that match the title (case-insensitive, partial match)
    const dbPosts = await prisma.post.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive'
        }
      },
      include: {
        photos: {
          orderBy: {
            createdAt: 'asc'
          }
        },
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Return all photos from matching posts
    const allPhotos = dbPosts.flatMap(post => 
      post.photos.map(photo => ({
        ...photo,
        postTitle: post.title,
        postId: post.id
      }))
    );

    return NextResponse.json({ 
      photos: allPhotos,
      matchingPosts: dbPosts.map(post => ({
        id: post.id,
        title: post.title,
        photoCount: post.photos.length
      }))
    });

  } catch (error) {
    console.error('Error fetching photos for post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}