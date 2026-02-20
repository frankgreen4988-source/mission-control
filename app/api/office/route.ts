import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, generateId } from "@/lib/db";

interface OfficeStatus {
  _id: string;
  memberId: string;
  status: string;
  location: string;
  currentTask?: string;
  workStarted: number;
  lastUpdate: number;
}

export async function GET() {
  const statuses = readCollection<OfficeStatus>("office");
  const team = readCollection("team");
  const enriched = statuses.map((s) => ({
    ...s,
    member: team.find((m: any) => m._id === s.memberId),
  }));
  return NextResponse.json(enriched);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const statuses = readCollection<OfficeStatus>("office");
  const now = Date.now();
  const idx = statuses.findIndex((s) => s.memberId === body.memberId);
  if (idx !== -1) {
    statuses[idx] = { ...statuses[idx], ...body, lastUpdate: now };
  } else {
    statuses.push({
      _id: generateId(),
      memberId: body.memberId,
      status: body.status || "at_desk",
      location: body.location || "office",
      currentTask: body.currentTask,
      workStarted: now,
      lastUpdate: now,
    });
  }
  writeCollection("office", statuses);
  return NextResponse.json({ ok: true });
}
