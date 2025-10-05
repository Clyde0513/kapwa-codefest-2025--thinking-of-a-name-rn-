# Post Edit Feature Documentation

## Overview
This implementation adds full CRUD (Create, Read, Update, Delete) functionality for blog posts in the admin panel.

## Files Created/Modified

### 1. API Route: `/app/api/posts/[id]/route.ts`
This file handles all operations for individual posts:

- **GET** - Fetch a single post by ID
- **PUT** - Update an existing post
- **DELETE** - Delete a post (with cascade deletion of related comments, likes, and photos)

All operations include:
- Validation using Zod schema
- Error handling for database connection issues
- Retry logic through the db-utils wrapper
- Proper 404 handling for non-existent posts

### 2. Edit Page: `/app/admin/posts/[id]/edit/page.tsx`
A complete post editing interface featuring:

- **Automatic Data Loading**: Fetches the existing post data on mount
- **Form Fields**:
  - Title (required)
  - Content (required, textarea)
  - Published status (checkbox)
  - Featured image upload (via PhotoUpload component)

- **Actions**:
  - Update Post (saves changes)
  - Save as Draft (sets published to false and saves)
  - Delete Post (with confirmation dialog)
  - Cancel (returns to posts list)

- **States**:
  - Loading state while fetching post
  - 404 state if post doesn't exist
  - Saving state during updates
  - Deleting state during deletion

### 3. Database Utilities: `/lib/db-utils.ts`
Added two new methods to support the API:

- `updatePost(options)` - Updates a post with retry logic
- `deletePost(options)` - Deletes a post with retry logic

### 4. Posts List Page: `/app/admin/posts/page.tsx`
Already had the edit link implemented:
```tsx
<Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
```

## Usage

### To Edit a Post:
1. Navigate to `/admin/posts`
2. Click the "Edit" link next to any post
3. Modify the title, content, or published status
4. Click "Update Post" to save changes
5. Or click "Save as Draft" to unpublish and save
6. Or click "Delete" to remove the post entirely

### API Endpoints:

#### Get Single Post
```
GET /api/posts/[id]
```
Returns the post with author details and engagement counts.

#### Update Post
```
PUT /api/posts/[id]
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "published": true
}
```

#### Delete Post
```
DELETE /api/posts/[id]
```
Cascades to delete related comments, likes, and photos.

## Features

✅ **Full CRUD Support**: Create, Read, Update, and Delete posts
✅ **Validation**: Zod schema validation on the backend
✅ **Error Handling**: Graceful handling of database issues
✅ **User Feedback**: Loading states and error messages
✅ **Safety**: Confirmation dialog before deletion
✅ **Draft Support**: Save posts as drafts or publish them
✅ **Photo Upload**: Featured image support (already integrated)
✅ **Breadcrumb Navigation**: Clear navigation path
✅ **Responsive Design**: Works on all screen sizes

## Database Schema
The Post model (from schema.prisma):
```prisma
model Post {
  id          String    @id @default(uuid())
  authorId    String?
  author      User?     @relation(fields: [authorId], references: [id])
  title       String
  content     String
  published   Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  comments    Comment[]
  likes       Like[]
  photos      Photo[]
}
```

## Security Considerations
- Currently no authentication - add auth middleware before production
- Consider adding authorization checks (only post author or admin can edit)
- Add rate limiting to prevent abuse
- Validate file uploads more thoroughly

## Future Enhancements
- Rich text editor (markdown or WYSIWYG)
- Auto-save drafts
- Revision history
- Bulk operations (delete multiple posts)
- Search and filter functionality
- Post categories/tags
- SEO metadata fields (meta description, keywords)
- Preview before publishing
