import { put, list } from "@vercel/blob";

const BLOB_AVAILABLE = !!process.env.BLOB_READ_WRITE_TOKEN;

// In-memory fallback when Blob is not configured (local dev / pre-setup)
const memoryStore: Record<string, any[]> = {};

function blobKey(collection: string): string {
  return `collections/${collection}.json`;
}

export async function readCollection<T = any>(collection: string): Promise<T[]> {
  if (!BLOB_AVAILABLE) {
    console.warn(`[db] Vercel Blob not configured – using in-memory fallback for "${collection}"`);
    return (memoryStore[collection] ?? []) as T[];
  }

  try {
    const key = blobKey(collection);
    console.log(`[db] Reading collection "${collection}" with key "${key}"`);
    
    // Use list() to find the blob by prefix, then fetch its URL
    // head() requires a full URL, not a pathname - list() works with prefixes
    const { blobs } = await list({ prefix: key, limit: 1 });
    
    if (blobs.length === 0) {
      console.log(`[db] No blob found for "${collection}" - returning empty array`);
      return [];
    }

    const blobUrl = blobs[0].url;
    console.log(`[db] Found blob at: ${blobUrl}`);
    
    const res = await fetch(blobUrl, { cache: "no-store" });
    if (!res.ok) {
      console.error(`[db] Fetch failed for "${collection}": ${res.status}`);
      return [];
    }
    
    const data = await res.json();
    console.log(`[db] Read ${Array.isArray(data) ? data.length : 0} items from "${collection}"`);
    return data as T[];
  } catch (err) {
    console.error(`[db] Error reading "${collection}":`, err);
    return [];
  }
}

export async function writeCollection<T = any>(collection: string, data: T[]): Promise<void> {
  if (!BLOB_AVAILABLE) {
    memoryStore[collection] = data;
    return;
  }

  const key = blobKey(collection);
  console.log(`[db] Writing ${data.length} items to "${collection}"`);
  await put(key, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
