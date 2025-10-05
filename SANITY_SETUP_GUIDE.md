# Sanity CMS Setup Guide

## 🚀 **Quick Setup (Recommended)**

Since you don't have a Sanity project set up yet, here are your options:

### **Option 1: Create a New Sanity Project (Recommended)**

1. **Install Sanity CLI globally:**
   ```bash
   npm install -g @sanity/cli
   ```

2. **Create a new Sanity project:**
   ```bash
   sanity init
   ```
   - Choose "Create new project"
   - Name it: "Filipino Apostolate Blog"
   - Choose dataset: "production"
   - Note down your Project ID

3. **Set up environment variables:**
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token_here
   ```

### **Option 2: Use Existing Sanity Project**

If you already have a Sanity project:
1. Find your Project ID in your Sanity dashboard
2. Create the `.env.local` file with your actual values

## 🔧 **Current Issue**

Your app is currently using fallback values:
- Project ID: "demo" (doesn't exist)
- Dataset: "production" (doesn't exist for demo project)

## 🎯 **After Setup**

Once you have the environment variables set up:
1. Run the migration script: `node scripts/migrate-posts-to-sanity.mjs`
2. Access Sanity Studio: `http://localhost:3001/studio`
3. Verify your posts are migrated
4. Update blog pages to use Sanity

## 📋 **What You'll Get**

- ✅ Professional content management interface
- ✅ Rich text editing with images
- ✅ Draft/publish workflow
- ✅ Author management
- ✅ Content categorization
- ✅ SEO-friendly structured content

## 🔄 **Migration Benefits**

After migration:
- **Content Creation**: Use Sanity Studio for professional blog posts
- **User Interactions**: Keep database for comments, likes, events
- **Best of Both**: Rich content + dynamic user features
