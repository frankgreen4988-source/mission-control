"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";

const statusColors: Record<string, string> = {
  backlog: "bg-slate-600",
  "in-progress": "bg-blue-600",
  review: "bg-yellow-600",
  done: "bg-green-600",
};

const priorityColors: Record<string, string> = {
  low: "text-blue-400",
  medium: "text-yellow-400",
  high: "text-red-400",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "jimmy" });

  const load = useCallback(() => {
    fetch("/api/tasks").then((r) => r.json()).then(setTasks);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!newTask.title) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newTask, priority: "medium" }),
    });
    setNewTask({ title: "", description: "", assignedTo: "jimmy" });
    load();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    load();
  };

  const handleMove = async (id: string, newStatus: string) => {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, status: newStatus }),
    });
    load();
  };

  const statuses = ["backlog", "in-progress", "review", "done"];

  const groupedByStatus = Object.fromEntries(
    statuses.map((s) => [s, tasks.filter((t) => t.status === s)])
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">📋 Task Board</h1>
        <div className="bg-slate-800 p-6 rounded-lg mb-6">
          <input
            type="text"
            placeholder="Task title..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3"
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <input
            type="text"
            placeholder="Description..."
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3"
          />
          <div className="flex gap-3">
            <select
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="bg-slate-700 text-white px-4 py-2 rounded flex-1"
            >
              <option value="jimmy">👤 Jimmy</option>
              <option value="sam">👤 Sam</option>
            </select>
            <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded flex items-center gap-2">
              <Plus size={20} /> Create
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {statuses.map((status) => (
          <div key={status} className="bg-slate-800 rounded-lg p-4">
            <div className={`${statusColors[status]} px-3 py-1 rounded text-sm font-bold mb-4 inline-block`}>
              {status.toUpperCase()}
            </div>
            <div className="space-y-3">
              {groupedByStatus[status]?.map((task: any) => (
                <div key={task._id} className="bg-slate-700 p-4 rounded border border-slate-600 hover:border-slate-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{task.title}</h3>
                    <button onClick={() => handleDelete(task._id)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {task.description && <p className="text-sm text-slate-300 mb-2">{task.description}</p>}
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs ${priorityColors[task.priority]}`}>{task.priority?.toUpperCase()}</span>
                    <span className="text-xs text-slate-400">👤 {task.assignedTo}</span>
                  </div>
                  {/* Move buttons */}
                  <div className="flex gap-1 flex-wrap">
                    {statuses.filter((s) => s !== status).map((s) => (
                      <button
                        key={s}
                        onClick={() => handleMove(task._id, s)}
                        className="text-xs bg-slate-600 hover:bg-slate-500 px-2 py-1 rounded"
                      >
                        → {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
