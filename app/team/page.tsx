"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";

const roleColors: Record<string, string> = { lead: "bg-red-600", developer: "bg-blue-600", writer: "bg-green-600", designer: "bg-purple-600", agent: "bg-yellow-600" };
const statusColors: Record<string, string> = { idle: "text-gray-400", working: "text-green-400", offline: "text-red-400", break: "text-yellow-400" };

export default function TeamPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [newMember, setNewMember] = useState({ name: "", role: "developer", type: "subagent", avatar: "🤖", bio: "", skills: [] as string[] });
  const [skillInput, setSkillInput] = useState("");

  const load = useCallback(() => {
    fetch("/api/team").then((r) => r.json()).then(setMembers);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!newMember.name) return;
    await fetch("/api/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newMember) });
    setNewMember({ name: "", role: "developer", type: "subagent", avatar: "🤖", bio: "", skills: [] });
    setSkillInput("");
    load();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/team", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: id }) });
    load();
  };

  const groupedByRole = Object.fromEntries(
    ["lead", "developer", "writer", "designer", "agent"].map((role) => [role, members.filter((m) => m.role === role)])
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">👥 Team Structure</h1>
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">➕ Add Team Member</h2>
          <input type="text" placeholder="Name..." value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3" />
          <input type="text" placeholder="Avatar (emoji)..." value={newMember.avatar} onChange={(e) => setNewMember({ ...newMember, avatar: e.target.value })} className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3" maxLength={2} />
          <textarea placeholder="Bio..." value={newMember.bio} onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })} className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3 h-16" />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <select value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} className="bg-slate-700 text-white px-4 py-2 rounded">
              <option value="lead">Lead</option>
              <option value="developer">Developer</option>
              <option value="writer">Writer</option>
              <option value="designer">Designer</option>
              <option value="agent">Agent</option>
            </select>
            <select value={newMember.type} onChange={(e) => setNewMember({ ...newMember, type: e.target.value })} className="bg-slate-700 text-white px-4 py-2 rounded">
              <option value="human">Human</option>
              <option value="subagent">Subagent</option>
            </select>
          </div>
          <div className="flex gap-2 mb-3">
            <input type="text" placeholder="Add skill and press Enter..." value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && skillInput.trim()) { setNewMember({ ...newMember, skills: [...newMember.skills, skillInput.trim()] }); setSkillInput(""); } }} className="flex-1 bg-slate-700 text-white px-4 py-2 rounded" />
          </div>
          {newMember.skills.length > 0 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {newMember.skills.map((skill) => (<span key={skill} className="bg-slate-600 px-3 py-1 rounded text-sm">{skill}<button onClick={() => setNewMember({ ...newMember, skills: newMember.skills.filter((s) => s !== skill) })} className="ml-2 text-red-400">×</button></span>))}
            </div>
          )}
          <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded flex items-center gap-2"><Plus size={20} /> Add Member</button>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedByRole).map(([role, teamMembers]) => (
          <div key={role}>
            <h2 className={`text-2xl font-bold mb-4 ${roleColors[role]} px-4 py-2 rounded inline-block`}>{role.charAt(0).toUpperCase() + role.slice(1)}</h2>
            <div className="grid grid-cols-3 gap-4">
              {teamMembers.map((member: any) => (
                <div key={member._id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{member.avatar}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                        <p className={`text-sm ${statusColors[member.status]}`}>● {member.status}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(member._id)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                  </div>
                  {member.bio && <p className="text-slate-300 text-sm mb-3">{member.bio}</p>}
                  {member.skills?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-slate-400 mb-2">Skills:</p>
                      <div className="flex gap-2 flex-wrap">{member.skills.map((skill: string) => (<span key={skill} className="bg-slate-700 px-2 py-1 text-xs rounded">{skill}</span>))}</div>
                    </div>
                  )}
                  <div className="text-xs text-slate-500 pt-3 border-t border-slate-700 mt-3">{member.type === "subagent" ? "🤖 Subagent" : "👤 Human"}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
