"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  Zap,
  Calendar,
  Brain,
  Users,
  Briefcase,
} from "lucide-react";

const navItems = [
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Content", href: "/content", icon: Zap },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Memories", href: "/memories", icon: Brain },
  { name: "Team", href: "/team", icon: Users },
  { name: "Office", href: "/office", icon: Briefcase },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-slate-800 border-r border-slate-700 p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">⚡ Mission Control</h1>
        <p className="text-sm text-slate-400">Sam & Jimmy's Operations Hub</p>
      </div>

      <ul className="space-y-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-slate-700 pt-4 mt-4">
        <p className="text-xs text-slate-500">
          Last sync: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </nav>
  );
}
