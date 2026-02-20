"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocalStorage } from "@/lib/useLocalState";

export default function Home() {
  const [tasks] = useLocalStorage<any[]>("tasks", []);
  const [teamMembers] = useLocalStorage<any[]>("team", []);

  const taskStats = {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-3">⚡ Mission Control</h1>
        <p className="text-xl text-slate-400">Operations hub for Sam &amp; Jimmy</p>
      </div>

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

      <div className="grid grid-cols-2 gap-6">
        {[
          { href: "/tasks", icon: "📋", title: "Task Board", desc: "Manage all tasks and track progress", color: "blue" },
          { href: "/content", icon: "⚡", title: "Content Pipeline", desc: "Create and manage content through stages", color: "green" },
          { href: "/calendar", icon: "📅", title: "Calendar", desc: "Schedule tasks, meetings, and cron jobs", color: "purple" },
          { href: "/memories", icon: "🧠", title: "Memories", desc: "Store and search insights and learnings", color: "yellow" },
          { href: "/team", icon: "👥", title: "Team Structure", desc: "View team members and subagents", color: "red" },
          { href: "/office", icon: "🏢", title: "Digital Office", desc: "See team members at work in real-time", color: "cyan" },
        ].map((item) => (
          <Link key={item.href} href={item.href}
            className={`bg-slate-800 border-2 border-slate-700 p-6 rounded-lg hover:border-${item.color}-500 transition group`}>
            <h2 className="text-2xl font-bold mb-2">{item.icon} {item.title}</h2>
            <p className="text-slate-400 mb-4">{item.desc}</p>
            <div className={`flex items-center text-${item.color}-400`}>View <ArrowRight size={20} className="ml-2" /></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
