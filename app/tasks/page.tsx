"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/lib/useLocalState";

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
  const [tasks, setTasks] = useLocalStorage<any[]>("tasks", []);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "jimmy", priority: "medium" });

  const handleCreate = () => {
    if (!newTask.title) return;
    setTasks((prev) => [...prev, { ...newTask, id: Date.now().toString(), status: "backlog", createdAt: Date.now(), updatedAt: Date.now() }]);
    setNewTask({ title: "", description: "", assignedTo: "jimmy", priority: "medium" });
  };

  const updateStatus = (id: string, status: string) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status, updatedAt: Date.now() } : t));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const grouped = {
    backlog: tasks.filter((t) => t.status === "backlog"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    review: tasks.filter((t) => t.status === "review"),
    done: tasks.filter((t) => t.status === "done"),
  };

  const statuses = ["backlog", "in-progress", "review", "done"];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">📋 Task Board</h1>
      <div className="bg-slate-800 p-6 rounded-lg mb-6">
        <input type="text" placeholder="Task title..." value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3" />
        <input type="text" placeholder="Description..." value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3" />
        <div className="flex gap-3">
          <select value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
            className="bg-slate-700 text-white px-4 py-2 rounded flex-1">
            <option value="jimmy">⚡ Jimmy</option>
            <option value="sam">👤 Sam</option>
          </select>
          <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className="bg-slate-700 text-white px-4 py-2 rounded flex-1">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded flex items-center gap-2">
            <Plus size={20} /> Create
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {statuses.map((status) => (
          <div key={status} className="bg-slate-800 rounded-lg p-4">
            <div className={`${statusColors[status]} px-3 py-1 rounded text-sm font-bold mb-4 inline-block`}>
              {status.toUpperCase()} ({grouped[status as keyof typeof grouped].length})
            </div>
            <div className="space-y-3">
              {grouped[status as keyof typeof grouped].map((task: any) => (
                <div key={task.id} className="bg-slate-700 p-4 rounded border border-slate-600">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{task.title}</h3>
                    <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                  </div>
                  {task.description && <p className="text-sm text-slate-300 mb-2">{task.description}</p>}
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs ${priorityColors[task.priority]}`}>{task.priority.toUpperCase()}</span>
                    <span className="text-xs text-slate-400">👤 {task.assignedTo}</span>
                  </div>
                  <select value={task.status} onChange={(e) => updateStatus(task.id, e.target.value)}
                    className="w-full bg-slate-600 text-white text-xs px-2 py-1 rounded">
                    <option value="backlog">Backlog</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
