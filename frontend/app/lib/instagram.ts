// Server-only. Never import this from a "use client" component — it reads a secret access token.
// Uses the official Meta Graph API on behalf of the account owner (via their own long-lived token).
// No scraping: if the env vars below aren't set, getInstagramMedia() returns null and callers fall
// back to static content instead of guessing or hitting Instagram directly.

export type InstagramMedia = {
  id: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp: string;
};

const GRAPH_API_VERSION = "v21.0";

export async function getInstagramMedia(limit = 6): Promise<InstagramMedia[] | null> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  if (!accessToken || !businessAccountId) {
    return null;
  }

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${businessAccountId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const json = await res.json();
    if (!Array.isArray(json.data)) return null;

    return json.data.map((item: Record<string, string>) => ({
      id: item.id,
      caption: item.caption,
      mediaType: item.media_type,
      mediaUrl: item.media_url,
      thumbnailUrl: item.thumbnail_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));
  } catch {
    return null;
  }
}
