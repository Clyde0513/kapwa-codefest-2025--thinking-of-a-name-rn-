#!/usr/bin/env node

/**
 * Demo Migration Script: Database Posts → Sanity CMS
 * 
 * This script demonstrates the migration process and creates
 * a migration plan for when you set up a real Sanity project.
 */

import { PrismaClient } from '@prisma/client';

// Initialize Prisma client with connection pooling fix
const prisma = new PrismaClient({
  log: ['error'],
  datasourceUrl: process.env.DATABASE_URL + '?pgbouncer=true&connection_limit=1'
});

// Helper function to convert plain text to Portable Text
function textToPortableText(text) {
  if (!text || text.trim() === '') {
    return [];
  }

  // Split text into paragraphs and convert to Portable Text blocks
  const paragraphs = text.split('\n\n').filter(p => p.trim() !== '');
  
  return paragraphs.map(paragraph => ({
    _type: 'block',
    _key: Math.random().toString(36).substr(2, 9),
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36).substr(2, 9),
        text: paragraph.trim(),
        marks: []
      }
    ],
    markDefs: []
  }));
}

// Helper function to create a slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
}

// Helper function to extract tags from content
function extractTags(title, content) {
  const tags = [];
  const text = `${title} ${content}`.toLowerCase();
  
  // Church-related tags
  const churchKeywords = ['church', 'mass', 'prayer', 'faith', 'god', 'jesus', 'christian', 'catholic'];
  const eventKeywords = ['event', 'celebration', 'festival', 'gathering', 'meeting'];
  const communityKeywords = ['community', 'fellowship', 'welcome', 'family', 'friends'];
  
  if (churchKeywords.some(keyword => text.includes(keyword))) tags.push('church');
  if (eventKeywords.some(keyword => text.includes(keyword))) tags.push('events');
  if (communityKeywords.some(keyword => text.includes(keyword))) tags.push('community');
  
  return tags.length > 0 ? tags : ['general'];
}

// Demo migration function
async function demoMigration() {
  console.log('🚀 Demo Migration: Database Posts → Sanity CMS');
  console.log('─'.repeat(60));
  console.log('📝 This is a demonstration of what would be migrated');
  console.log('   Set up a real Sanity project to perform actual migration\n');

  try {
    // 1. Fetch all posts from database
    console.log('📊 Fetching posts from database...');
    const dbPosts = await prisma.post.findMany({
      orderBy: { createdAt: 'asc' }, // Migrate oldest first
      include: {
        author: {
          select: { name: true, email: true }
        }
      }
    });

    console.log(`Found ${dbPosts.length} posts to migrate\n`);

    if (dbPosts.length === 0) {
      console.log('✅ No posts to migrate.');
      return;
    }

    // 2. Show what would be migrated
    console.log('📋 Migration Preview:');
    console.log('─'.repeat(60));

    const migrationPlan = [];

    for (const [index, dbPost] of dbPosts.entries()) {
      const sanityPost = {
        _type: 'post',
        title: dbPost.title,
        slug: {
          _type: 'slug',
          current: createSlug(dbPost.title)
        },
        publishedAt: dbPost.published ? dbPost.createdAt.toISOString() : null,
        excerpt: dbPost.content.substring(0, 200) + (dbPost.content.length > 200 ? '...' : ''),
        body: textToPortableText(dbPost.content),
        tags: extractTags(dbPost.title, dbPost.content),
        // Store original database ID for reference
        originalDbId: dbPost.id,
      };

      migrationPlan.push({
        originalId: dbPost.id,
        title: dbPost.title,
        slug: sanityPost.slug.current,
        publishedAt: sanityPost.publishedAt,
        excerpt: sanityPost.excerpt,
        tags: sanityPost.tags,
        author: dbPost.author?.name || 'Unknown'
      });

      console.log(`[${index + 1}/${dbPosts.length}] "${dbPost.title}"`);
      console.log(`   Slug: ${sanityPost.slug.current}`);
      console.log(`   Published: ${dbPost.published ? '✅' : '📝 Draft'}`);
      console.log(`   Author: ${dbPost.author?.name || 'Unknown'}`);
      console.log(`   Tags: ${sanityPost.tags.join(', ')}`);
      console.log(`   Excerpt: ${sanityPost.excerpt}`);
      console.log('');
    }

    // 3. Save migration plan
    const migrationData = {
      timestamp: new Date().toISOString(),
      totalPosts: dbPosts.length,
      posts: migrationPlan,
      nextSteps: [
        "Set up a Sanity project at https://sanity.io",
        "Configure environment variables in .env.local",
        "Run the actual migration script",
        "Update blog pages to use Sanity",
        "Test the integration"
      ]
    };
    
    // Save migration plan using Node.js fs
    const fs = await import('fs/promises');
    await fs.writeFile('migration-plan.json', JSON.stringify(migrationData, null, 2));
    
    console.log('📄 Migration plan saved to: migration-plan.json');
    console.log('\n🎯 Next Steps:');
    console.log('1. Set up a Sanity project (see SANITY_SETUP_GUIDE.md)');
    console.log('2. Configure environment variables');
    console.log('3. Run the actual migration script');
    console.log('4. Update your blog to use Sanity');

    console.log('\n💡 Benefits after migration:');
    console.log('✅ Rich content editing in Sanity Studio');
    console.log('✅ Professional CMS interface');
    console.log('✅ Better SEO and content structure');
    console.log('✅ Keep database for events, comments, and user management');
    console.log('✅ Best of both worlds: Rich content + Dynamic features');

  } catch (error) {
    console.error('💥 Demo failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run demo migration
demoMigration().catch(console.error);
