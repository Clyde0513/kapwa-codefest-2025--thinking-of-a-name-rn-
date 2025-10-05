# Sanity Studio Production Setup

## Issue Fixed
Changed the Studio page from `force-static` to `force-dynamic` to allow Sanity Studio to work properly in production.

## Required: Configure CORS in Sanity

To make the Sanity Studio work in production, you need to add your production URL to the CORS origins in your Sanity project:

### Steps:

1. **Go to Sanity Management Console:**
   - Visit: https://www.sanity.io/manage
   - Select your project: 

2. **Navigate to API Settings:**
   - Click on "API" in the left sidebar
   - Scroll down to "CORS Origins"

3. **Add Your Production URL:**
   - Click "Add CORS origin"
   - Add your production domain (e.g., `https://your-domain.vercel.app`)
   - Check "Allow credentials"
   - Save

4. **Common CORS Origins to Add:**
   ```
   http://localhost:3000
   https://your-production-domain.vercel.app
   https://your-production-domain.com
   ```

## Testing

After adding CORS origins and deploying the fix:

1. Visit `/studio` on your production site
2. You should see the Sanity Studio interface
3. You can now edit posts by clicking "Edit" in `/admin/blog`

## Accessing the Studio

- **Development:** http://localhost:3000/studio
- **Production:** https://your-domain/studio

## Editing Blog Posts

1. Go to `/admin/blog` 
2. Click "Edit" on any post
3. This will open the Sanity Studio in a new tab
4. Make your changes and publish
5. Changes appear immediately on the blog

## Alternative: Direct Studio Access

You can also access the Studio directly:
- Go to `/studio` 
- Navigate to "Post" in the sidebar
- Create or edit posts

## Environment Variables

Make sure these are set in your production environment:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=b4h3ckxo
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-05
```

Note: These are already hardcoded in `sanity/env.ts`, so they should work without environment variables, but it's good practice to set them.

## Troubleshooting

### "Studio not found" Error
- Make sure you've deployed the latest code with the `force-dynamic` fix
- Verify CORS origins are configured correctly in Sanity

### Authentication Issues
- The Sanity Studio handles its own authentication
- You'll be prompted to log in with your Sanity account when accessing the Studio

### Posts Not Showing
- Make sure posts are published (not drafts) in Sanity
- Check that the dataset is set to "production" (not "development")

## Next Steps

1. **Rebuild and Deploy:**
   ```bash
   npm run build
   git add .
   git commit -m "Fix Sanity Studio for production"
   git push
   ```

2. **Configure CORS** in Sanity Management Console (see steps above)

3. **Test** the Studio in production after deployment
