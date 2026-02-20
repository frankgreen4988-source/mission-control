"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";

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
  const tasks = useQuery(api.tasks.listTasks);
  const createTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "jimmy" as const });
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newTask.title) return;
    await createTask({
      ...newTask,
      assignedTo: newTask.assignedTo,
      priority: "medium",
    });
    setNewTask({ title: "", description: "", assignedTo: "jimmy" });
  };

  const filteredTasks = tasks?.filter((t) => !filterStatus || t.status === filterStatus);

  const groupedByStatus = {
    backlog: filteredTasks?.filter((t) => t.status === "backlog") || [],
    "in-progress": filteredTasks?.filter((t) => t.status === "in-progress") || [],
    review: filteredTasks?.filter((t) => t.status === "review") || [],
    done: filteredTasks?.filter((t) => t.status === "done") || [],
  };

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
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value as any })}
              className="bg-slate-700 text-white px-4 py-2 rounded flex-1"
            >
              <option value="jimmy">👤 Jimmy</option>
              <option value="sam">👤 Sam</option>
            </select>
            <button
              onClick={handleCreate}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded flex items-center gap-2"
            >
              <Plus size={20} /> Create
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {Object.entries(groupedByStatus).map(([status, items]) => (
          <div key={status} className="bg-slate-800 rounded-lg p-4">
            <div className={`${statusColors[status]} px-3 py-1 rounded text-sm font-bold mb-4 inline-block`}>
              {status.toUpperCase()}
            </div>
            <div className="space-y-3">
              {items.map((task: any) => (
                <div key={task._id} className="bg-slate-700 p-4 rounded border border-slate-600 hover:border-slate-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{task.title}</h3>
                    <button
                      onClick={() => deleteTask({ id: task._id })}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {task.description && <p className="text-sm text-slate-300 mb-2">{task.description}</p>}
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${priorityColors[task.priority]}`}>
                      {task.priority.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400">👤 {task.assignedTo}</span>
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
