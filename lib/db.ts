import { kv } from "@vercel/kv";

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// In-memory fallback when KV is not configured (local dev / pre-setup)
const memoryStore: Record<string, any[]> = {};

export async function readCollection<T = any>(collection: string): Promise<T[]> {
  if (!KV_AVAILABLE) {
    console.warn(`[db] Vercel KV not configured – using in-memory fallback for "${collection}"`);
    return (memoryStore[collection] ?? []) as T[];
  }
  const data = await kv.get<T[]>(`collection:${collection}`);
  return data ?? [];
}

export async function writeCollection<T = any>(collection: string, data: T[]): Promise<void> {
  if (!KV_AVAILABLE) {
    memoryStore[collection] = data;
    return;
  }
  await kv.set(`collection:${collection}`, data);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
