import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db-utils';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(1, 'Content is required').max(10000, 'Content must be less than 10,000 characters'),
  published: z.boolean().default(true),
  authorId: z.string().uuid().optional().nullable(),
});

// GET a single post by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await db.findUniquePost({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PUT/UPDATE a post by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = postSchema.parse(body);

    // First check if post exists
    const existingPost = await db.findUniquePost({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const updatedPost = await db.updatePost({
      where: { id },
      data: {
        title: validatedData.title,
        content: validatedData.content,
        published: validatedData.published,
        authorId: validatedData.authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ ok: true, post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    // Handle database connection issues gracefully
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('prepared statement') || errorMessage.includes('connection')) {
        return NextResponse.json(
          { 
            error: 'Database temporarily unavailable. Please try again in a moment.',
            details: 'The database connection is experiencing issues. Your changes will be saved once the connection is restored.'
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to update post', details: 'Please check your input and try again.' },
      { status: 500 }
    );
  }
}

// DELETE a post by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // First check if post exists
    const existingPost = await db.findUniquePost({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete the post (this will cascade delete comments, likes, and photos)
    await db.deletePost({
      where: { id },
    });

    return NextResponse.json({ ok: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    
    // Handle database connection issues gracefully
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('prepared statement') || errorMessage.includes('connection')) {
        return NextResponse.json(
          { 
            error: 'Database temporarily unavailable. Please try again in a moment.',
            details: 'The database connection is experiencing issues.'
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to delete post', details: 'Please try again.' },
      { status: 500 }
    );
  }
}
