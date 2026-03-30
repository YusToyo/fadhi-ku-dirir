import { createClient, type SanityClient } from "@sanity/client";

let _client: SanityClient | null = null;

function getClient(): SanityClient {
  if (!_client) {
    _client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      useCdn: false,
      apiVersion: "2024-01-01",
      token: process.env.SANITY_API_TOKEN,
    });
  }
  return _client;
}

export function isSanityConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
}

export async function getDebates() {
  return getClient().fetch(
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
  return getClient().fetch(
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
  return getClient().fetch(
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
