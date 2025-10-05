# Cloudinary Direct Upload Setup

This guide explains how to set up Cloudinary direct upload flow for your application.

## Environment Variables

Add these to your `.env` file:

```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# For Vercel deployment, add these as environment variables in your Vercel dashboard
```

## Cloudinary Setup Steps

1. **Create a Cloudinary account** at [cloudinary.com](https://cloudinary.com)

2. **Get your credentials** from the Cloudinary dashboard:
   - Cloud Name
   - API Key
   - API Secret

3. **Create an upload preset**:
   - Go to Settings > Upload
   - Create a new unsigned upload preset
   - Set folder to `kapwa-photos` (optional)
   - Enable "Auto-generate filename"

## API Endpoints

### 1. Get Upload Signature
```typescript
POST /api/uploads/sign
// Returns: { signature, timestamp, apiKey, cloudName, uploadPreset, folder }
```

### 2. Save Photo to Database
```typescript
POST /api/photos
// Body: { publicId, url, width, height, format, bytes, caption?, postId?, uploaderId? }
```

### 3. Get Photos
```typescript
GET /api/photos?postId=uuid&limit=50&offset=0
```

## Usage Examples

### Basic Upload
```tsx
import { uploadToCloudinary, savePhotoToDatabase } from '../lib/cloudinary';

const handleFileUpload = async (file: File) => {
  try {
    // 1. Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(file);
    
    // 2. Save to database
    const dbResult = await savePhotoToDatabase({
      ...cloudinaryResult,
      caption: 'My photo',
      postId: 'post-uuid',
      uploaderId: 'user-uuid',
    });
    
    console.log('Photo saved:', dbResult.photo);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### Using the PhotoUpload Component
```tsx
import PhotoUpload from '../components/PhotoUpload';

function MyPage() {
  const handleUploadComplete = (photo: any) => {
    console.log('Photo uploaded:', photo);
    // Handle the uploaded photo (e.g., refresh list, show success message)
  };

  return (
    <div>
      <PhotoUpload
        postId="post-uuid"
        uploaderId="user-uuid"
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
}
```

## File Structure

```
app/
├── api/
│   ├── uploads/
│   │   └── sign/route.ts          # Generate Cloudinary signatures
│   └── photos/
│       └── route.ts               # CRUD operations for photos
├── components/
│   └── PhotoUpload.tsx            # Ready-to-use upload component
lib/
├── cloudinary.ts                  # Client-side upload helpers
└── prisma.ts                      # Database client
prisma/
└── schema.prisma                  # Photo model definition
```

## Security Notes

- The signature endpoint is protected and only generates signatures server-side
- File validation happens client-side (type, size) and server-side (Zod schema)
- Upload presets should be configured with appropriate security settings
- Consider implementing rate limiting for upload endpoints

## Troubleshooting

### Common Issues

1. **"Configuration missing" error**: Check environment variables
2. **"Upload failed" error**: Verify Cloudinary credentials and upload preset
3. **Database errors**: Ensure Prisma schema is up to date and database is accessible

### Debug Steps

1. Check browser network tab for API calls
2. Verify environment variables are set correctly
3. Test Cloudinary credentials in their dashboard
4. Check database connection and schema
