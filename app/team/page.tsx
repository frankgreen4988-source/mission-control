"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/lib/useLocalState";

const roleColors: Record<string, string> = { lead: "bg-red-600", developer: "bg-blue-600", writer: "bg-green-600", designer: "bg-purple-600", agent: "bg-yellow-600" };
const statusColors: Record<string, string> = { idle: "text-gray-400", working: "text-green-400", offline: "text-red-400", break: "text-yellow-400" };

const defaultTeam = [
  { id: "sam", name: "Sam", role: "lead", type: "human", avatar: "👤", bio: "Chief Strategist & Founder", status: "working", skills: ["strategy", "trading", "leadership"] },
  { id: "jimmy", name: "Jimmy", role: "developer", type: "subagent", avatar: "⚡", bio: "Chief AI Worker — Full Stack, Trading, Research", status: "working", skills: ["coding", "trading", "research", "automation"] },
  { id: "codebot", name: "CodeBot", role: "developer", type: "subagent", avatar: "🤖", bio: "Backend development & API integrations", status: "idle", skills: ["python", "javascript", "APIs"] },
  { id: "researchbot", name: "ResearchBot", role: "developer", type: "subagent", avatar: "🔍", bio: "Market research & data analysis", status: "idle", skills: ["data-analysis", "backtesting", "web-scraping"] },
  { id: "contentbot", name: "ContentBot", role: "writer", type: "subagent", avatar: "✍️", bio: "Documentation & content creation", status: "idle", skills: ["writing", "documentation", "copywriting"] },
  { id: "designbot", name: "DesignBot", role: "designer", type: "subagent", avatar: "🎨", bio: "UI/UX & visual design", status: "offline", skills: ["UI", "UX", "figma", "css"] },
  { id: "tradingbot", name: "TradingBot", role: "agent", type: "subagent", avatar: "📈", bio: "Automated trading & arbitrage execution", status: "working", skills: ["polymarket", "arbitrage", "CLOB"] },
  { id: "monitorbot", name: "MonitorBot", role: "agent", type: "subagent", avatar: "👁️", bio: "System monitoring & alerting", status: "working", skills: ["monitoring", "alerts", "health-checks"] },
];

export default function TeamPage() {
  const [members, setMembers] = useLocalStorage<any[]>("team", defaultTeam);
  const [newMember, setNewMember] = useState({ name: "", role: "developer", type: "subagent", avatar: "🤖", bio: "" });

  const handleCreate = () => {
    if (!newMember.name) return;
    setMembers((prev) => [...prev, { ...newMember, id: Date.now().toString(), status: "idle", skills: [], createdAt: Date.now() }]);
    setNewMember({ name: "", role: "developer", type: "subagent", avatar: "🤖", bio: "" });
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const roles = ["lead", "developer", "writer", "designer", "agent"];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">👥 Team Structure</h1>
      <div className="bg-slate-800 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-bold mb-4">➕ Add Team Member</h2>
        <div className="grid grid-cols-4 gap-3 mb-3">
          <input type="text" placeholder="Name..." value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="bg-slate-700 text-white px-4 py-2 rounded" />
          <input type="text" placeholder="Avatar emoji..." value={newMember.avatar} maxLength={2}
            onChange={(e) => setNewMember({ ...newMember, avatar: e.target.value })}
            className="bg-slate-700 text-white px-4 py-2 rounded" />
          <select value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            className="bg-slate-700 text-white px-4 py-2 rounded">
            <option value="lead">Lead</option>
            <option value="developer">Developer</option>
            <option value="writer">Writer</option>
            <option value="designer">Designer</option>
            <option value="agent">Agent</option>
          </select>
          <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2">
            <Plus size={20} /> Add
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {roles.map((role) => {
          const roleMembers = members.filter((m) => m.role === role);
          if (roleMembers.length === 0) return null;
          return (
            <div key={role}>
              <h2 className={`text-xl font-bold mb-4 ${roleColors[role]} px-4 py-2 rounded inline-block`}>
                {role.charAt(0).toUpperCase() + role.slice(1)}s ({roleMembers.length})
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {roleMembers.map((member: any) => (
                  <div key={member.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{member.avatar}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                          <p className={`text-sm ${statusColors[member.status] || "text-gray-400"}`}>● {member.status}</p>
                        </div>
                      </div>
                      {!["sam", "jimmy"].includes(member.id) && (
                        <button onClick={() => deleteMember(member.id)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                      )}
                    </div>
                    {member.bio && <p className="text-slate-300 text-sm mb-3">{member.bio}</p>}
                    {member.skills?.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {member.skills.map((s: string) => (<span key={s} className="bg-slate-700 px-2 py-1 text-xs rounded">{s}</span>))}
                      </div>
                    )}
                    <div className="text-xs text-slate-500 pt-3 border-t border-slate-700 mt-3">{member.type === "subagent" ? "🤖 Subagent" : "👤 Human"}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
