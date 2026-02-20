"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Plus, Trash2, ChevronRight } from "lucide-react";

const stages = ["idea", "outline", "draft", "script", "review", "published"];

export default function ContentPage() {
  const content = useQuery(api.content.listContent);
  const createContent = useMutation(api.content.createContent);
  const updateContent = useMutation(api.content.updateContent);
  const deleteContent = useMutation(api.content.deleteContent);

  const [newItem, setNewItem] = useState({ title: "", idea: "", assignedTo: "jimmy" as const });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newItem.title) return;
    await createContent({
      ...newItem,
      assignedTo: newItem.assignedTo,
    });
    setNewItem({ title: "", idea: "", assignedTo: "jimmy" });
  };

  const handleMoveStage = async (id: string, currentStage: string) => {
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      await updateContent({ id, stage: stages[currentIndex + 1] as any });
    }
  };

  const groupedByStage = Object.fromEntries(
    stages.map((stage) => [
      stage,
      content?.filter((c) => c.stage === stage) || [],
    ])
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">⚡ Content Pipeline</h1>
        <div className="bg-slate-800 p-6 rounded-lg">
          <input
            type="text"
            placeholder="Content title..."
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3"
          />
          <textarea
            placeholder="Initial idea..."
            value={newItem.idea}
            onChange={(e) => setNewItem({ ...newItem, idea: e.target.value })}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3 h-24"
          />
          <div className="flex gap-3">
            <select
              value={newItem.assignedTo}
              onChange={(e) => setNewItem({ ...newItem, assignedTo: e.target.value as any })}
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

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div key={stage} className="flex-shrink-0 w-80 bg-slate-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 capitalize text-blue-400">{stage}</h2>
            <div className="space-y-3">
              {groupedByStage[stage].map((item: any) => (
                <div
                  key={item._id}
                  className="bg-slate-700 p-4 rounded border border-slate-600 hover:border-slate-500 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white flex-1">{item.title}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteContent({ id: item._id });
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {expandedId === item._id && (
                    <div className="mt-3 pt-3 border-t border-slate-600 space-y-3">
                      {item.idea && (
                        <div>
                          <label className="text-xs text-slate-400">Idea:</label>
                          <p className="text-sm text-slate-300">{item.idea}</p>
                        </div>
                      )}
                      {item.script && (
                        <div>
                          <label className="text-xs text-slate-400">Script:</label>
                          <p className="text-sm text-slate-300">{item.script}</p>
                        </div>
                      )}
                      {item.images?.length > 0 && (
                        <div>
                          <label className="text-xs text-slate-400">Images:</label>
                          <div className="flex gap-2 mt-2">
                            {item.images.map((img: any, i: number) => (
                              <img key={i} src={img.url} alt={img.caption} className="h-16 w-16 rounded" />
                            ))}
                          </div>
                        </div>
                      )}
                      {stage !== "published" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveStage(item._id, stage);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-sm flex items-center justify-center gap-2"
                        >
                          Move <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  )}

                  <div className="text-xs text-slate-400 mt-2">👤 {item.assignedTo}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
