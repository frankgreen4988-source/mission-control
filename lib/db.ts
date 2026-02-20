import { put, head } from "@vercel/blob";

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
    const meta = await head(key);
    const res = await fetch(meta.url);
    if (!res.ok) return [];
    return (await res.json()) as T[];
  } catch {
    // Blob doesn't exist yet
    return [];
  }
}

export async function writeCollection<T = any>(collection: string, data: T[]): Promise<void> {
  if (!BLOB_AVAILABLE) {
    memoryStore[collection] = data;
    return;
  }

  const key = blobKey(collection);
  await put(key, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
