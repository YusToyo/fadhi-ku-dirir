import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: "2024-01-01",
});

export function isSanityConfigured(): boolean {
  return !!projectId;
}

export async function getDebates() {
  return sanityClient.fetch(
    `*[_type == "debate" && isPublished == true] | order(scheduledAt desc) {
      _id,
      title,
      titleEn,
      "slug": slug.current,
      category,
      debaterA,
      debaterB,
      scheduledAt,
      isLive,
      isPublished,
      description
    }`
  );
}

export async function getDebateBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "debate" && slug.current == $slug][0] {
      _id,
      title,
      titleEn,
      "slug": slug.current,
      category,
      debaterA,
      debaterB,
      scheduledAt,
      isLive,
      isPublished,
      description
    }`,
    { slug }
  );
}

export async function getLiveDebate() {
  return sanityClient.fetch(
    `*[_type == "debate" && isLive == true][0] {
      _id,
      title,
      titleEn,
      "slug": slug.current,
      category,
      debaterA,
      debaterB,
      scheduledAt,
      isLive,
      isPublished,
      description
    }`
  );
}
