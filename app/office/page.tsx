"use client";

import { useState, useEffect, useCallback } from "react";
import { Monitor, Coffee, Phone } from "lucide-react";

const statusIcons: Record<string, React.ReactNode> = {
  at_desk: <Monitor className="text-green-400" size={20} />,
  away: <Coffee className="text-yellow-400" size={20} />,
  in_meeting: <Phone className="text-blue-400" size={20} />,
  offline: <div className="text-red-400 w-5 h-5">⊘</div>,
};

const deskPositions = [
  { id: 1, x: "20%", y: "20%", label: "Desk 1" },
  { id: 2, x: "50%", y: "20%", label: "Desk 2" },
  { id: 3, x: "80%", y: "20%", label: "Desk 3" },
  { id: 4, x: "20%", y: "50%", label: "Desk 4" },
  { id: 5, x: "50%", y: "50%", label: "Meeting Room" },
  { id: 6, x: "80%", y: "50%", label: "Lounge" },
];

export default function OfficePage() {
  const [members, setMembers] = useState<any[]>([]);
  const [officeStatus, setOfficeStatus] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/team").then((r) => r.json()).then(setMembers);
    fetch("/api/office").then((r) => r.json()).then(setOfficeStatus);
  }, []);

  useEffect(() => { load(); }, [load]);

  const getMemberStatus = (memberId: string) => officeStatus.find((s) => s.memberId === memberId);

  const handleAssignDesk = async (memberId: string) => {
    const desk = deskPositions[Math.floor(Math.random() * deskPositions.length)];
    await fetch("/api/office", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ memberId, status: "at_desk", location: desk.label }) });
    load();
  };

  const handleSetStatus = async (memberId: string, status: string) => {
    await fetch("/api/office", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ memberId, status }) });
    load();
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">🏢 Digital Office</h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-slate-800 rounded-lg p-8 border-2 border-slate-700 relative h-96">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Office Layout</h2>
          <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 rounded">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(0deg, #888 1px, transparent 1px), linear-gradient(90deg, #888 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            {deskPositions.map((desk) => {
              const member = members.find((m) => getMemberStatus(m._id)?.location === desk.label);
              return (
                <div key={desk.id} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: desk.x, top: desk.y }}>
                  <div className="w-20 h-20 bg-slate-700 rounded-lg border-2 border-slate-600 flex items-center justify-center cursor-pointer hover:border-blue-500 transition" onClick={() => member && setSelectedMember(member._id)}>
                    {member ? (<div className="text-center"><p className="text-3xl mb-1">{member.avatar}</p><p className="text-xs text-slate-400">{member.name}</p></div>) : (<div className="text-center"><p className="text-2xl">💼</p><p className="text-xs text-slate-500">{desk.label}</p></div>)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border-2 border-slate-700 h-96 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Team Status</h2>
          <div className="space-y-3">
            {members.map((member: any) => {
              const status = getMemberStatus(member._id);
              const isSelected = selectedMember === member._id;
              return (
                <div key={member._id} className={`bg-slate-700 p-4 rounded-lg border-2 transition cursor-pointer ${isSelected ? "border-blue-500" : "border-slate-600 hover:border-slate-500"}`} onClick={() => setSelectedMember(isSelected ? null : member._id)}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{member.avatar}</span>
                      <div><p className="font-semibold text-white">{member.name}</p><p className="text-xs text-slate-400">{member.role}</p></div>
                    </div>
                    {statusIcons[status?.status || "offline"]}
                  </div>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-600 space-y-2">
                      <div><p className="text-xs text-slate-400">Location:</p><p className="text-sm font-semibold">{status?.location || "Not assigned"}</p></div>
                      {status?.currentTask && <div><p className="text-xs text-slate-400">Current Task:</p><p className="text-sm">{status.currentTask}</p></div>}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <button onClick={() => handleAssignDesk(member._id)} className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm">At Desk</button>
                        <button onClick={() => handleSetStatus(member._id, "away")} className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded text-sm">Away</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-slate-800 rounded-lg p-6 border-2 border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Recent Activity</h2>
        <div className="space-y-2">
          {officeStatus.sort((a: any, b: any) => b.lastUpdate - a.lastUpdate).slice(0, 10).map((activity: any) => (
            <div key={activity._id} className="text-sm text-slate-300">
              <span className="font-semibold text-white">{activity.member?.name}</span> is <span className="text-blue-400">{activity.status}</span> at <span className="text-green-400">{activity.location}</span> <span className="text-slate-500">({new Date(activity.lastUpdate).toLocaleTimeString()})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
