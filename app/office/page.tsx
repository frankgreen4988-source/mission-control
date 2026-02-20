"use client";

import { useState } from "react";
import { useLocalStorage } from "@/lib/useLocalState";

const defaultTeam = [
  { id: "sam", name: "Sam", avatar: "👤", role: "lead", status: "working", desk: "Desk 1", task: "Strategy planning" },
  { id: "jimmy", name: "Jimmy", avatar: "⚡", role: "developer", status: "at_desk", desk: "Desk 2", task: "Polymarket trading" },
  { id: "tradingbot", name: "TradingBot", avatar: "📈", role: "agent", status: "at_desk", desk: "Desk 3", task: "Running arb blaster" },
  { id: "codebot", name: "CodeBot", avatar: "🤖", role: "developer", status: "away", desk: "Desk 4", task: "" },
  { id: "contentbot", name: "ContentBot", avatar: "✍️", role: "writer", status: "at_desk", desk: "Desk 5", task: "Writing docs" },
  { id: "monitorbot", name: "MonitorBot", avatar: "👁️", role: "agent", status: "at_desk", desk: "Desk 6", task: "Watching systems" },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  at_desk: { label: "At Desk", color: "text-green-400" },
  working: { label: "Working", color: "text-green-400" },
  away: { label: "Away", color: "text-yellow-400" },
  in_meeting: { label: "In Meeting", color: "text-blue-400" },
  offline: { label: "Offline", color: "text-red-400" },
};

const deskPositions = [
  { label: "Desk 1", x: "15%", y: "25%" },
  { label: "Desk 2", x: "50%", y: "25%" },
  { label: "Desk 3", x: "85%", y: "25%" },
  { label: "Desk 4", x: "15%", y: "70%" },
  { label: "Desk 5", x: "50%", y: "70%" },
  { label: "Desk 6", x: "85%", y: "70%" },
];

export default function OfficePage() {
  const [team, setTeam] = useLocalStorage<any[]>("office", defaultTeam);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const updateStatus = (id: string, status: string) => {
    setTeam((prev) => prev.map((m) => m.id === id ? { ...m, status } : m));
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">🏢 Digital Office</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* Floorplan */}
        <div className="col-span-2 bg-slate-800 rounded-lg p-4 border-2 border-slate-700 relative" style={{ height: "400px" }}>
          <h2 className="text-xl font-bold mb-2 text-blue-400">Office Layout</h2>
          <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 rounded"
            style={{ backgroundImage: "linear-gradient(0deg, #888 1px, transparent 1px), linear-gradient(90deg, #888 1px, transparent 1px)", backgroundSize: "40px 40px", backgroundPosition: "center", opacity: 1 }}>
            <div className="absolute inset-0" style={{ background: "rgba(15,23,42,0.85)" }} />
            {deskPositions.map((desk) => {
              const member = team.find((m) => m.desk === desk.label);
              const isOnline = member && !["offline", "away"].includes(member.status);
              return (
                <div key={desk.label} className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: desk.x, top: desk.y }}
                  onClick={() => member && setSelectedId(selectedId === member.id ? null : member.id)}>
                  <div className={`w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition ${isOnline ? "bg-slate-700 border-green-500" : "bg-slate-800 border-slate-600"}`}>
                    {member ? (
                      <>
                        <span className="text-2xl">{member.avatar}</span>
                        <span className="text-xs text-slate-300 mt-1">{member.name}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xl">💼</span>
                        <span className="text-xs text-slate-500">{desk.label}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Panel */}
        <div className="bg-slate-800 rounded-lg p-6 border-2 border-slate-700 overflow-y-auto" style={{ height: "400px" }}>
          <h2 className="text-xl font-bold mb-4 text-blue-400">Team Status</h2>
          <div className="space-y-3">
            {team.map((member: any) => {
              const s = statusLabels[member.status] || statusLabels.offline;
              const isSelected = selectedId === member.id;
              return (
                <div key={member.id}
                  className={`bg-slate-700 p-4 rounded-lg border-2 cursor-pointer transition ${isSelected ? "border-blue-500" : "border-slate-600"}`}
                  onClick={() => setSelectedId(isSelected ? null : member.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{member.avatar}</span>
                      <div>
                        <p className="font-semibold text-white">{member.name}</p>
                        <p className={`text-xs ${s.color}`}>● {s.label}</p>
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-600">
                      <p className="text-xs text-slate-400 mb-1">Desk: {member.desk}</p>
                      {member.task && <p className="text-xs text-slate-400 mb-2">Task: {member.task}</p>}
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={(e) => { e.stopPropagation(); updateStatus(member.id, "at_desk"); }}
                          className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs">At Desk</button>
                        <button onClick={(e) => { e.stopPropagation(); updateStatus(member.id, "away"); }}
                          className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded text-xs">Away</button>
                        <button onClick={(e) => { e.stopPropagation(); updateStatus(member.id, "in_meeting"); }}
                          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs">Meeting</button>
                        <button onClick={(e) => { e.stopPropagation(); updateStatus(member.id, "offline"); }}
                          className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs">Offline</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
