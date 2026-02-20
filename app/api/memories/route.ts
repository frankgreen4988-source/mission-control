export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, generateId } from "@/lib/db";

interface Memory {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  relatedMemories: string[];
  createdAt: number;
  updatedAt: number;
  isPinned: boolean;
}

export async function GET() {
  const memories = await readCollection<Memory>("memories");
  memories.sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return b.updatedAt - a.updatedAt;
  });
  return NextResponse.json(memories);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const memories = await readCollection<Memory>("memories");
  const now = Date.now();
  const memory: Memory = {
    _id: generateId(),
    title: body.title,
    content: body.content,
    category: body.category || "insight",
    tags: body.tags || [],
    relatedMemories: [],
    createdAt: now,
    updatedAt: now,
    isPinned: false,
  };
  memories.push(memory);
  await writeCollection("memories", memories);
  return NextResponse.json(memory);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { _id, ...updates } = body;
  const memories = await readCollection<Memory>("memories");
  const idx = memories.findIndex((m) => m._id === _id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  memories[idx] = { ...memories[idx], ...updates, updatedAt: Date.now() };
  await writeCollection("memories", memories);
  return NextResponse.json(memories[idx]);
}

export async function DELETE(req: NextRequest) {
  const { _id } = await req.json();
  let memories = await readCollection<Memory>("memories");
  memories = memories.filter((m) => m._id !== _id);
  await writeCollection("memories", memories);
  return NextResponse.json({ ok: true });
}
