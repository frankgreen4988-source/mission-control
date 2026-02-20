"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [memories, setMemories] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/tasks?t=" + Date.now()).then((r) => r.json()).then((data) => { console.log("Dashboard tasks:", data); setTasks(data); }).catch((err) => console.error("Dashboard tasks error:", err));
    fetch("/api/memories?t=" + Date.now()).then((r) => r.json()).then((data) => { console.log("Dashboard memories:", data); setMemories(data); }).catch((err) => console.error("Dashboard memories error:", err));
    fetch("/api/team?t=" + Date.now()).then((r) => r.json()).then((data) => { console.log("Dashboard team:", data); setTeamMembers(data); }).catch((err) => console.error("Dashboard team error:", err));
  }, []);

  const taskStats = {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-3">⚡ Mission Control Dashboard</h1>
        <p className="text-xl text-slate-400">Welcome to the operations hub for Sam & Jimmy</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-lg">
          <p className="text-slate-300 text-sm mb-2">Total Tasks</p>
          <p className="text-4xl font-bold">{taskStats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-lg">
          <p className="text-slate-300 text-sm mb-2">In Progress</p>
          <p className="text-4xl font-bold">{taskStats.inProgress}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-lg">
          <p className="text-slate-300 text-sm mb-2">Completed</p>
          <p className="text-4xl font-bold">{taskStats.done}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-6 rounded-lg">
          <p className="text-slate-300 text-sm mb-2">Team Members</p>
          <p className="text-4xl font-bold">{teamMembers.length}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-6 mb-12">
        <Link href="/tasks" className="bg-slate-800 border-2 border-slate-700 p-6 rounded-lg hover:border-blue-500 transition group">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition">📋 Task Board</h2>
          <p className="text-slate-400 mb-4">Manage all your tasks and track progress</p>
          <div className="flex items-center text-blue-400 group-hover:translate-x-2 transition">View Board <ArrowRight size={20} className="ml-2" /></div>
        </Link>
        <Link href="/content" className="bg-slate-800 border-2 border-slate-700 p-6 rounded-lg hover:border-green-500 transition group">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition">⚡ Content Pipeline</h2>
          <p className="text-slate-400 mb-4">Create and manage content through all stages</p>
          <div className="flex items-center text-green-400 group-hover:translate-x-2 transition">View Pipeline <ArrowRight size={20} className="ml-2" /></div>
        </Link>
        <Link href="/calendar" className="bg-slate-800 border-2 border-slate-700 p-6 rounded-lg hover:border-purple-500 transition group">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition">📅 Calendar</h2>
          <p className="text-slate-400 mb-4">Schedule tasks, meetings, and cron jobs</p>
          <div className="flex items-center text-purple-400 group-hover:translate-x-2 transition">View Calendar <ArrowRight size={20} className="ml-2" /></div>
        </Link>
        <Link href="/memories" className="bg-slate-800 border-2 border-slate-700 p-6 rounded-lg hover:border-yellow-500 transition group">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition">🧠 Memories</h2>
          <p className="text-slate-400 mb-4">Store and search insights and learnings</p>
          <div className="flex items-center text-yellow-400 group-hover:translate-x-2 transition">View Memories <ArrowRight size={20} className="ml-2" /></div>
        </Link>
        <Link href="/team" className="bg-slate-800 border-2 border-slate-700 p-6 rounded-lg hover:border-red-500 transition group">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition">👥 Team Structure</h2>
          <p className="text-slate-400 mb-4">View team members and subagents</p>
          <div className="flex items-center text-red-400 group-hover:translate-x-2 transition">View Team <ArrowRight size={20} className="ml-2" /></div>
        </Link>
        <Link href="/office" className="bg-slate-800 border-2 border-slate-700 p-6 rounded-lg hover:border-cyan-500 transition group">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition">🏢 Digital Office</h2>
          <p className="text-slate-400 mb-4">See team members at work in real-time</p>
          <div className="flex items-center text-cyan-400 group-hover:translate-x-2 transition">View Office <ArrowRight size={20} className="ml-2" /></div>
        </Link>
      </div>

      {/* System Status */}
      <div className="bg-slate-800 border-2 border-slate-700 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">📊 System Status</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-slate-700">
            <span className="text-slate-400">Backend</span>
            <span className="text-green-400">● JSON File Store</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-700">
            <span className="text-slate-400">API</span>
            <span className="text-green-400">● Next.js API Routes</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Last Load</span>
            <span className="text-slate-300">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
