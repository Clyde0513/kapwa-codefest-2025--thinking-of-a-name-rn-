import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db-utils';

// Create a new media record (photo or video)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    const { publicId, url, width, height, format, bytes, mediaType } = body;
    
    if (!publicId || !url || !width || !height || !format || !bytes) {
      return NextResponse.json(
        { error: 'Missing required fields: publicId, url, width, height, format, bytes' },
        { status: 400 }
      );
    }

    // Validate media type
    const validMediaTypes = ['image', 'video'];
    const resolvedMediaType = mediaType || 'image';
    if (!validMediaTypes.includes(resolvedMediaType)) {
      return NextResponse.json(
        { error: 'Invalid media type. Must be "image" or "video"' },
        { status: 400 }
      );
    }

    // Create media record in database
    const media = await db.createPhoto({
      data: {
        publicId,
        url,
        width: parseInt(width),
        height: parseInt(height),
        format,
        bytes: parseInt(bytes),
        mediaType: resolvedMediaType,
        duration: body.duration ? parseFloat(body.duration) : null,
        frameRate: body.frameRate ? parseFloat(body.frameRate) : null,
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
      media 
    });

  } catch (error) {
    console.error('Error creating media:', error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Media with this public ID already exists' },
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
      { error: 'Failed to create media' },
      { status: 500 }
    );
  }
}

// Get all media with optional filtering
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const uploaderId = searchParams.get('uploaderId');
    const mediaType = searchParams.get('mediaType'); // 'image', 'video', or null for all
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    
    if (postId) {
      where.postId = postId;
    }
    
    if (uploaderId) {
      where.uploaderId = uploaderId;
    }

    if (mediaType && ['image', 'video'].includes(mediaType)) {
      where.mediaType = mediaType;
    }

    const media = await db.findManyPhotos({
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

    const total = await db.countPhotos({ where }) as number;

    return NextResponse.json({
      ok: true,
      media,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });

  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}