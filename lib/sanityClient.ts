import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function fetchPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc){
    title, "slug": slug.current, publishedAt, excerpt, "authorName": author->name, "mainImage": mainImage.asset->url, "previewText": pt::text(body)
  }`;
  return sanityClient.fetch(query);
}

export async function fetchPostBySlug(slug: string) {
  const query = `*[_type=="post" && slug.current == $slug][0]{
    title, "slug": slug.current, publishedAt, excerpt, body, "author": author->name, "mainImage": mainImage.asset->url
  }`;
  return sanityClient.fetch(query, { slug });
}
