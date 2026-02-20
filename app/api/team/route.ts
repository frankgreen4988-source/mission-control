import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, generateId } from "@/lib/db";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  type: string;
  avatar: string;
  bio?: string;
  status: string;
  currentTask?: string;
  lastActive: number;
  skills: string[];
  createdAt: number;
}

export async function GET() {
  const members = readCollection<TeamMember>("team");
  const roleOrder: Record<string, number> = { lead: 0, developer: 1, writer: 2, designer: 3, agent: 4 };
  members.sort((a, b) => (roleOrder[a.role] ?? 5) - (roleOrder[b.role] ?? 5));
  return NextResponse.json(members);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const members = readCollection<TeamMember>("team");
  const now = Date.now();
  const member: TeamMember = {
    _id: generateId(),
    name: body.name,
    role: body.role || "developer",
    type: body.type || "subagent",
    avatar: body.avatar || "🤖",
    bio: body.bio,
    status: "idle",
    lastActive: now,
    skills: body.skills || [],
    createdAt: now,
  };
  members.push(member);
  writeCollection("team", members);
  return NextResponse.json(member);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { _id, ...updates } = body;
  const members = readCollection<TeamMember>("team");
  const idx = members.findIndex((m) => m._id === _id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  members[idx] = { ...members[idx], ...updates, lastActive: Date.now() };
  writeCollection("team", members);
  return NextResponse.json(members[idx]);
}

export async function DELETE(req: NextRequest) {
  const { _id } = await req.json();
  let members = readCollection<TeamMember>("team");
  members = members.filter((m) => m._id !== _id);
  writeCollection("team", members);
  return NextResponse.json({ ok: true });
}
