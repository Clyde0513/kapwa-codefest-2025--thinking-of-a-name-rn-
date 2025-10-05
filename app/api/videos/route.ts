import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db-utils';

// Create a new video record
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    const { publicId, url, width, height, format, bytes } = body;
    
    if (!publicId || !url || !width || !height || !format || !bytes) {
      return NextResponse.json(
        { error: 'Missing required fields: publicId, url, width, height, format, bytes' },
        { status: 400 }
      );
    }

    // Create video record in database
    const video = await db.createVideo({
      data: {
        publicId,
        url,
        width: parseInt(width),
        height: parseInt(height),
        format,
        bytes: parseInt(bytes),
        duration: body.duration ? parseFloat(body.duration) : null,
        caption: body.caption || null,
        postId: body.postId || null,
        uploaderId: body.uploaderId || null,
      },
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ 
      ok: true, 
      video 
    });

  } catch (error) {
    console.error('Error creating video:', error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Video with this public ID already exists' },
          { status: 409 }
        );
      }
      
      if (error.message.includes('Foreign key constraint')) {
        return NextResponse.json(
          { error: 'Invalid postId or uploaderId' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}

// Get all videos with optional filtering
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const uploaderId = searchParams.get('uploaderId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    
    if (postId) {
      where.postId = postId;
    }
    
    if (uploaderId) {
      where.uploaderId = uploaderId;
    }

    const videos = await db.findManyVideos({
      where,
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    const total = await db.countVideos({ where }) as number;

    return NextResponse.json({
      ok: true,
      videos,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });

  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
