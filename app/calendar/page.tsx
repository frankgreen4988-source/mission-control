"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [newEvent, setNewEvent] = useState({ title: "", type: "task", assignedTo: "both", startTime: Date.now() });

  const load = useCallback(() => {
    fetch("/api/calendar?t=" + Date.now()).then((r) => r.json()).then((data) => { console.log("Fetched calendar:", data); setEvents(data); }).catch((err) => console.error("Calendar fetch error:", err));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!newEvent.title) return;
    await fetch("/api/calendar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newEvent) });
    setNewEvent({ title: "", type: "task", assignedTo: "both", startTime: Date.now() });
    load();
  };

  const handleToggleComplete = async (id: string, current: boolean) => {
    await fetch("/api/calendar", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: id, isCompleted: !current }) });
    load();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/calendar", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: id }) });
    load();
  };

  const eventsByDate: Record<string, any[]> = {};
  events.forEach((event: any) => {
    const dateKey = format(new Date(event.startTime), "yyyy-MM-dd");
    if (!eventsByDate[dateKey]) eventsByDate[dateKey] = [];
    eventsByDate[dateKey].push(event);
  });

  const typeColors: Record<string, string> = { task: "bg-blue-600", cron: "bg-purple-600", meeting: "bg-green-600", deadline: "bg-red-600", reminder: "bg-yellow-600" };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">📅 Calendar</h1>
        <div className="bg-slate-800 p-6 rounded-lg">
          <input type="text" placeholder="Event title..." value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3" />
          <div className="grid grid-cols-3 gap-3 mb-3">
            <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })} className="bg-slate-700 text-white px-4 py-2 rounded">
              <option value="task">Task</option>
              <option value="cron">Cron Job</option>
              <option value="meeting">Meeting</option>
              <option value="deadline">Deadline</option>
              <option value="reminder">Reminder</option>
            </select>
            <input type="datetime-local" onChange={(e) => setNewEvent({ ...newEvent, startTime: new Date(e.target.value).getTime() })} className="bg-slate-700 text-white px-4 py-2 rounded" />
            <select value={newEvent.assignedTo} onChange={(e) => setNewEvent({ ...newEvent, assignedTo: e.target.value })} className="bg-slate-700 text-white px-4 py-2 rounded">
              <option value="jimmy">Jimmy</option>
              <option value="sam">Sam</option>
              <option value="both">Both</option>
            </select>
          </div>
          <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded flex items-center gap-2"><Plus size={20} /> Add Event</button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(eventsByDate).sort().map(([date, dayEvents]) => (
          <div key={date} className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">{format(new Date(date), "EEEE, MMMM d, yyyy")}</h2>
            <div className="space-y-2">
              {dayEvents.map((event: any) => (
                <div key={event._id} className={`${typeColors[event.type]} p-4 rounded flex justify-between items-start`}>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{event.title}</h3>
                    <p className="text-sm text-slate-200">{format(new Date(event.startTime), "HH:mm")}</p>
                    <p className="text-xs text-slate-300 mt-1">👤 {event.assignedTo}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleToggleComplete(event._id, event.isCompleted)} className="text-white hover:text-green-300"><CheckCircle size={20} /></button>
                    <button onClick={() => handleDelete(event._id)} className="text-white hover:text-red-300"><Trash2 size={20} /></button>
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
