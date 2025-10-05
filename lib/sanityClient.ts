import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'b4h3ckxo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-05',
  useCdn: true,
});

export async function fetchPosts() {
  try {
    const query = `*[_type == "post"] | order(publishedAt desc){
      title, "slug": slug.current, publishedAt, excerpt, "authorName": author->name, "mainImage": mainImage.asset->url, "previewText": pt::text(body)
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.warn('Sanity fetch failed, returning empty array:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string) {
  try {
    const query = `*[_type=="post" && slug.current == $slug][0]{
      title, "slug": slug.current, publishedAt, excerpt, body, "author": author->name, "mainImage": mainImage.asset->url
    }`;
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.warn('Sanity fetch failed, returning null:', error);
    return null;
  }
}
