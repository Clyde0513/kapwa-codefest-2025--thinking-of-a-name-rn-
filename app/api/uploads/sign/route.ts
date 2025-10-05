import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Rate limiting helper (simple in-memory store for demo)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10; // 10 requests per minute
  
  const userLimit = rateLimit.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (userLimit.count >= maxRequests) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'unsigned';
    const environment = process.env.NODE_ENV || 'development';

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('Cloudinary configuration missing');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 500 }
      );
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    
    // Environment-specific folder structure
    const folder = `kapwa-photos/${environment}`;
    
    // For unsigned uploads, we don't need to generate a signature
    // For signed uploads, generate signature
    let signature = '';
    if (uploadPreset !== 'unsigned') {
      const params = {
        timestamp,
        upload_preset: uploadPreset,
        folder,
      };
      
      const signatureString = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key as keyof typeof params]}`)
        .join('&');
      
      signature = crypto
        .createHash('sha1')
        .update(signatureString + apiSecret)
        .digest('hex');
    }

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      cloudName,
      uploadPreset,
      folder,
    });
  } catch (error) {
    console.error('Error generating Cloudinary signature:', error);
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    );
  }
}