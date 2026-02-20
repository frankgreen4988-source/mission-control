"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle } from "lucide-react";
import { useLocalStorage } from "@/lib/useLocalState";

const typeColors: Record<string, string> = {
  task: "bg-blue-600",
  cron: "bg-purple-600",
  meeting: "bg-green-600",
  deadline: "bg-red-600",
  reminder: "bg-yellow-600",
};

export default function CalendarPage() {
  const [events, setEvents] = useLocalStorage<any[]>("calendar", []);
  const [newEvent, setNewEvent] = useState({ title: "", type: "task", assignedTo: "both", startTime: "" });

  const handleCreate = () => {
    if (!newEvent.title || !newEvent.startTime) return;
    setEvents((prev) => [...prev, { ...newEvent, id: Date.now().toString(), startTime: new Date(newEvent.startTime).getTime(), isCompleted: false, createdAt: Date.now() }]);
    setNewEvent({ title: "", type: "task", assignedTo: "both", startTime: "" });
  };

  const toggleComplete = (id: string) => {
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, isCompleted: !e.isCompleted } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const sortedEvents = [...events].sort((a, b) => a.startTime - b.startTime);

  const groupedByDate: Record<string, any[]> = {};
  sortedEvents.forEach((event) => {
    const dateKey = new Date(event.startTime).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
    groupedByDate[dateKey].push(event);
  });

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">📅 Calendar</h1>
      <div className="bg-slate-800 p-6 rounded-lg mb-6">
        <input type="text" placeholder="Event title..." value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3" />
        <div className="grid grid-cols-3 gap-3 mb-3">
          <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            className="bg-slate-700 text-white px-4 py-2 rounded">
            <option value="task">Task</option>
            <option value="cron">Cron Job</option>
            <option value="meeting">Meeting</option>
            <option value="deadline">Deadline</option>
            <option value="reminder">Reminder</option>
          </select>
          <input type="datetime-local" value={newEvent.startTime}
            onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
            className="bg-slate-700 text-white px-4 py-2 rounded" />
          <select value={newEvent.assignedTo} onChange={(e) => setNewEvent({ ...newEvent, assignedTo: e.target.value })}
            className="bg-slate-700 text-white px-4 py-2 rounded">
            <option value="jimmy">Jimmy</option>
            <option value="sam">Sam</option>
            <option value="both">Both</option>
          </select>
        </div>
        <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded flex items-center gap-2">
          <Plus size={20} /> Add Event
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedByDate).map(([date, dayEvents]) => (
          <div key={date} className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">{date}</h2>
            <div className="space-y-2">
              {dayEvents.map((event: any) => (
                <div key={event.id} className={`${typeColors[event.type] || "bg-slate-600"} p-4 rounded flex justify-between items-start ${event.isCompleted ? "opacity-50" : ""}`}>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-white ${event.isCompleted ? "line-through" : ""}`}>{event.title}</h3>
                    <p className="text-sm text-slate-200">{new Date(event.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
                    <p className="text-xs text-slate-300 mt-1">👤 {event.assignedTo}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleComplete(event.id)} className="text-white hover:text-green-300"><CheckCircle size={20} /></button>
                    <button onClick={() => deleteEvent(event.id)} className="text-white hover:text-red-300"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {events.length === 0 && <p className="text-slate-500 text-center py-8">No events yet. Add one above!</p>}
      </div>
    </div>
  );
}
