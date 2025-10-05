import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import crypto from 'crypto';

// Cloudinary webhook event types
type CloudinaryEvent = 
  | 'resource_created'
  | 'resource_deleted' 
  | 'derived_resource_created'
  | 'upload_error';

interface CloudinaryWebhookPayload {
  event_type: CloudinaryEvent;
  public_id: string;
  secure_url?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  timestamp: number;
  signature?: string;
}

// Verify webhook signature (optional but recommended)
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHash('sha1')
    .update(payload + secret)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-cloudinary-signature');
    const timestamp = req.headers.get('x-cloudinary-timestamp');
    
    // Verify signature if secret is configured
    const webhookSecret = process.env.CLOUDINARY_WEBHOOK_SECRET;
    if (webhookSecret && signature && timestamp) {
      const isValid = verifySignature(body, signature, webhookSecret);
      if (!isValid) {
        console.warn('Invalid Cloudinary webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload: CloudinaryWebhookPayload = JSON.parse(body);
    console.log('Cloudinary webhook received:', payload.event_type, payload.public_id);

    switch (payload.event_type) {
      case 'resource_created':
        await handleResourceCreated(payload);
        break;
        
      case 'resource_deleted':
        await handleResourceDeleted(payload);
        break;
        
      case 'derived_resource_created':
        await handleDerivedResourceCreated(payload);
        break;
        
      case 'upload_error':
        await handleUploadError(payload);
        break;
        
      default:
        console.log('Unknown webhook event type:', payload.event_type);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleResourceCreated(payload: CloudinaryWebhookPayload) {
  // Update photo record with final dimensions and metadata
  // This is useful when eager transformations are configured
  try {
    await prisma.photo.updateMany({
      where: { publicId: payload.public_id },
      data: {
        width: payload.width || undefined,
        height: payload.height || undefined,
        format: payload.format || undefined,
        bytes: payload.bytes || undefined,
        url: payload.secure_url || undefined,
      },
    });
    
    console.log('Updated photo metadata for:', payload.public_id);
  } catch (error) {
    console.error('Failed to update photo metadata:', error);
  }
}

async function handleResourceDeleted(payload: CloudinaryWebhookPayload) {
  // Soft delete photo record when Cloudinary resource is deleted
  try {
    // Note: We don't actually delete from DB, just mark as deleted
    // This preserves referential integrity
    console.log('Cloudinary resource deleted:', payload.public_id);
    // You could add a `deletedAt` field to the Photo model for soft deletes
  } catch (error) {
    console.error('Failed to handle resource deletion:', error);
  }
}

async function handleDerivedResourceCreated(payload: CloudinaryWebhookPayload) {
  // Handle when derived/transformed images are created
  // Useful for marking when specific transforms are ready
  console.log('Derived resource created:', payload.public_id);
  // Could update a status field or trigger notifications
}

async function handleUploadError(payload: CloudinaryWebhookPayload) {
  // Handle upload errors - could mark photo as failed
  console.error('Upload error for:', payload.public_id);
  // Could update photo status or send notification
}

// GET endpoint for webhook verification (optional)
export async function GET(req: NextRequest) {
  return NextResponse.json({ 
    status: 'Cloudinary webhook endpoint active',
    timestamp: new Date().toISOString()
  });
}
