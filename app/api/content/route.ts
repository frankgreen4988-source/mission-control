import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, generateId } from "@/lib/db";

interface ContentItem {
  _id: string;
  title: string;
  stage: string;
  idea?: string;
  script?: string;
  images: { url: string; caption?: string; uploadedAt: number }[];
  notes?: string;
  assignedTo: string;
  createdAt: number;
  updatedAt: number;
}

export async function GET() {
  const items = readCollection<ContentItem>("content");
  items.sort((a, b) => b.updatedAt - a.updatedAt);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items = readCollection<ContentItem>("content");
  const now = Date.now();
  const item: ContentItem = {
    _id: generateId(),
    title: body.title,
    stage: "idea",
    idea: body.idea,
    images: [],
    assignedTo: body.assignedTo || "jimmy",
    createdAt: now,
    updatedAt: now,
  };
  items.push(item);
  writeCollection("content", items);
  return NextResponse.json(item);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { _id, ...updates } = body;
  const items = readCollection<ContentItem>("content");
  const idx = items.findIndex((i) => i._id === _id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  items[idx] = { ...items[idx], ...updates, updatedAt: Date.now() };
  writeCollection("content", items);
  return NextResponse.json(items[idx]);
}

export async function DELETE(req: NextRequest) {
  const { _id } = await req.json();
  let items = readCollection<ContentItem>("content");
  items = items.filter((i) => i._id !== _id);
  writeCollection("content", items);
  return NextResponse.json({ ok: true });
}
