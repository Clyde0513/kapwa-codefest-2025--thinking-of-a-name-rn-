import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// Delete media (soft delete - removes from Cloudinary and marks as deleted in DB)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get media record
    const media = await prisma.photo.findUnique({
      where: { id },
      select: { id: true, publicId: true, postId: true, format: true },
    });

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    // TODO: Call Cloudinary API to delete the resource
    // This would require server-side Cloudinary SDK
    // const cloudinary = require('cloudinary').v2;
    // await cloudinary.uploader.destroy(media.publicId, { resource_type: 'image' });

    // For now, just delete from database
    // In production, you might want to soft delete instead
    await prisma.photo.delete({
      where: { id },
    });

    console.log('Media deleted:', media.publicId, media.format);

    return NextResponse.json({ 
      ok: true, 
      message: 'Media deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    );
  }
}

// Update media metadata (caption, etc.)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // Get current media record
    const existingMedia = await prisma.photo.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    // Update media with new data
    const updatedMedia = await prisma.photo.update({
      where: { id },
      data: {
        caption: body.caption !== undefined ? body.caption : existingMedia.caption,
        // Add other updatable fields as needed
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
      photo: updatedMedia // Keep the same response format for compatibility
    });

  } catch (error) {
    console.error('Error updating media:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Foreign key constraint')) {
        return NextResponse.json(
          { error: 'Invalid postId or uploaderId' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to update media' },
      { status: 500 }
    );
  }
}

// Get single media item
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const media = await prisma.photo.findUnique({
      where: { id },
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

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      ok: true, 
      media 
    });

  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}