import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, generateId } from "@/lib/db";

interface CalendarEvent {
  _id: string;
  title: string;
  description?: string;
  type: string;
  startTime: number;
  endTime?: number;
  assignedTo: string;
  cronJobId?: string;
  isCompleted: boolean;
  createdAt: number;
}

export async function GET() {
  const events = readCollection<CalendarEvent>("calendar");
  events.sort((a, b) => a.startTime - b.startTime);
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const events = readCollection<CalendarEvent>("calendar");
  const event: CalendarEvent = {
    _id: generateId(),
    title: body.title,
    description: body.description,
    type: body.type || "task",
    startTime: body.startTime,
    endTime: body.endTime,
    assignedTo: body.assignedTo || "both",
    cronJobId: body.cronJobId,
    isCompleted: false,
    createdAt: Date.now(),
  };
  events.push(event);
  writeCollection("calendar", events);
  return NextResponse.json(event);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { _id, ...updates } = body;
  const events = readCollection<CalendarEvent>("calendar");
  const idx = events.findIndex((e) => e._id === _id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  events[idx] = { ...events[idx], ...updates };
  writeCollection("calendar", events);
  return NextResponse.json(events[idx]);
}

export async function DELETE(req: NextRequest) {
  const { _id } = await req.json();
  let events = readCollection<CalendarEvent>("calendar");
  events = events.filter((e) => e._id !== _id);
  writeCollection("calendar", events);
  return NextResponse.json({ ok: true });
}
