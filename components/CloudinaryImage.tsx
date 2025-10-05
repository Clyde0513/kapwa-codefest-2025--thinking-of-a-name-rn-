import Image from 'next/image';
import { clUrl, TRANSFORMS } from '../lib/cloudinary';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  transforms?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}

export default function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  transforms = TRANSFORMS.AUTO,
  className,
  priority = false,
  sizes,
  fill = false,
}: CloudinaryImageProps) {
  const src = clUrl(publicId, transforms);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || '100vw'}
      />
    );
  }

  if (!width || !height) {
    throw new Error('CloudinaryImage requires width and height when fill is false');
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}

// Convenience components for common use cases
export function PhotoThumbnail({ publicId, alt, className }: { publicId: string; alt: string; className?: string }) {
  return (
    <CloudinaryImage
      publicId={publicId}
      alt={alt}
      width={150}
      height={150}
      transforms={TRANSFORMS.THUMB}
      className={className}
    />
  );
}

export function PhotoCard({ publicId, alt, className }: { publicId: string; alt: string; className?: string }) {
  return (
    <CloudinaryImage
      publicId={publicId}
      alt={alt}
      width={400}
      height={300}
      transforms={TRANSFORMS.SMALL}
      className={className}
    />
  );
}

export function PhotoHero({ publicId, alt, className }: { publicId: string; alt: string; className?: string }) {
  return (
    <CloudinaryImage
      publicId={publicId}
      alt={alt}
      width={1200}
      height={630}
      transforms={TRANSFORMS.WIDE}
      className={className}
      priority
    />
  );
}
