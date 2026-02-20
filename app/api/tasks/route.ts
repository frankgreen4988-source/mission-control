import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, generateId } from "@/lib/db";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  assignedTo: string;
  priority: string;
  dueDate?: number;
  createdAt: number;
  updatedAt: number;
}

export async function GET() {
  const tasks = readCollection<Task>("tasks");
  tasks.sort((a, b) => b.updatedAt - a.updatedAt);
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const tasks = readCollection<Task>("tasks");
  const now = Date.now();
  const task: Task = {
    _id: generateId(),
    title: body.title,
    description: body.description,
    status: "backlog",
    assignedTo: body.assignedTo || "jimmy",
    priority: body.priority || "medium",
    dueDate: body.dueDate,
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  writeCollection("tasks", tasks);
  return NextResponse.json(task);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { _id, ...updates } = body;
  const tasks = readCollection<Task>("tasks");
  const idx = tasks.findIndex((t) => t._id === _id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  tasks[idx] = { ...tasks[idx], ...updates, updatedAt: Date.now() };
  writeCollection("tasks", tasks);
  return NextResponse.json(tasks[idx]);
}

export async function DELETE(req: NextRequest) {
  const { _id } = await req.json();
  let tasks = readCollection<Task>("tasks");
  tasks = tasks.filter((t) => t._id !== _id);
  writeCollection("tasks", tasks);
  return NextResponse.json({ ok: true });
}
