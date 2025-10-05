export type CloudinarySignature = {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  uploadPreset: string;
  folder?: string;
};

export type CloudinaryUploadResult = {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  blurDataUrl?: string;
};

// Cloudinary URL transform helpers
export function clUrl(publicId: string, transforms = "f_auto,q_auto"): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloud) {
    throw new Error('Cloudinary cloud name not configured');
  }
  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId}`;
}

// Common transform presets
export const TRANSFORMS = {
  // Auto format and quality
  AUTO: "f_auto,q_auto",
  
  // Responsive sizes
  THUMB: "f_auto,q_auto,c_fill,w_150,h_150",
  SMALL: "f_auto,q_auto,c_fill,w_400,h_300",
  MEDIUM: "f_auto,q_auto,c_fill,w_800,h_600",
  LARGE: "f_auto,q_auto,c_fill,w_1200,h_800",
  
  // Aspect ratios
  SQUARE: "f_auto,q_auto,c_fill,w_400,h_400",
  WIDE: "f_auto,q_auto,c_fill,w_1200,h_630", // 1.91:1 for social
  PORTRAIT: "f_auto,q_auto,c_fill,w_400,h_600", // 2:3 portrait
  
  // Special effects
  BLUR: "f_auto,q_auto,e_blur:1000",
  GRAYSCALE: "f_auto,q_auto,e_grayscale",
  
  // WebP optimization
  WEBP: "f_webp,q_auto",
  AVIF: "f_avif,q_auto",
} as const;

export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  // 1) Get signature from our API
  const sigRes = await fetch('/api/uploads/sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!sigRes.ok) {
    throw new Error('Failed to get upload signature');
  }

  const sig: CloudinarySignature = await sigRes.json();

  // 2) Send file directly to Cloudinary
  const form = new FormData();
  form.append('file', file);
  form.append('api_key', sig.apiKey);
  form.append('timestamp', String(sig.timestamp));
  form.append('signature', sig.signature);
  form.append('upload_preset', sig.uploadPreset);
  
  if (sig.folder) {
    form.append('folder', sig.folder);
  }

  const cloudUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`;
  
  const upRes = await fetch(cloudUrl, {
    method: 'POST',
    body: form,
  });

  if (!upRes.ok) {
    const errorText = await upRes.text();
    throw new Error(`Cloudinary upload failed: ${errorText}`);
  }

  const payload = await upRes.json();

  return {
    publicId: payload.public_id as string,
    url: payload.secure_url as string,
    width: payload.width as number,
    height: payload.height as number,
    format: payload.format as string,
    bytes: payload.bytes as number,
    blurDataUrl: payload.placeholder,
  };
}

// Helper function to create a photo record in the database
export async function savePhotoToDatabase(photoData: {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  caption?: string;
  postId?: string;
  uploaderId?: string;
}) {
  const res = await fetch('/api/photos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(photoData),
  });

  if (!res.ok) {
    throw new Error('Failed to save photo to database');
  }

  return res.json();
}