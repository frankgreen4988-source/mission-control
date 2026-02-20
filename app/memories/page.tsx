"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Pin, Search } from "lucide-react";

const categoryColors: Record<string, string> = {
  insight: "bg-blue-900 text-blue-200",
  lesson: "bg-green-900 text-green-200",
  decision: "bg-yellow-900 text-yellow-200",
  research: "bg-purple-900 text-purple-200",
  strategy: "bg-red-900 text-red-200",
  "bug-fix": "bg-orange-900 text-orange-200",
};

export default function MemoriesPage() {
  const [memories, setMemories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [newMemory, setNewMemory] = useState({ title: "", content: "", category: "insight", tags: [] as string[] });
  const [tagInput, setTagInput] = useState("");

  const load = useCallback(() => {
    fetch("/api/memories?t=" + Date.now()).then((r) => r.json()).then((data) => { console.log("Fetched memories:", data); setMemories(data); }).catch((err) => console.error("Memories fetch error:", err));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!newMemory.title || !newMemory.content) return;
    await fetch("/api/memories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMemory),
    });
    setNewMemory({ title: "", content: "", category: "insight", tags: [] });
    setTagInput("");
    load();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/memories", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: id }) });
    load();
  };

  const handleTogglePin = async (id: string, current: boolean) => {
    await fetch("/api/memories", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: id, isPinned: !current }) });
    load();
  };

  const filteredMemories = memories.filter((m) => {
    const matchesSearch = !search || m.title.toLowerCase().includes(search.toLowerCase()) || m.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !filterCategory || m.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">🧠 Memories</h1>
        <div className="bg-slate-800 p-4 rounded-lg mb-6">
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-3 text-slate-400" />
              <input type="text" placeholder="Search memories..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-slate-700 text-white px-10 py-2 rounded" />
            </div>
            <select value={filterCategory || ""} onChange={(e) => setFilterCategory(e.target.value || null)} className="bg-slate-700 text-white px-4 py-2 rounded">
              <option value="">All Categories</option>
              <option value="insight">Insight</option>
              <option value="lesson">Lesson</option>
              <option value="decision">Decision</option>
              <option value="research">Research</option>
              <option value="strategy">Strategy</option>
              <option value="bug-fix">Bug Fix</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-bold mb-4">📝 New Memory</h2>
          <input type="text" placeholder="Memory title..." value={newMemory.title} onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })} className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3" />
          <textarea placeholder="Content..." value={newMemory.content} onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })} className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-3 h-32" />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <select value={newMemory.category} onChange={(e) => setNewMemory({ ...newMemory, category: e.target.value })} className="bg-slate-700 text-white px-4 py-2 rounded">
              <option value="insight">Insight</option>
              <option value="lesson">Lesson</option>
              <option value="decision">Decision</option>
              <option value="research">Research</option>
              <option value="strategy">Strategy</option>
              <option value="bug-fix">Bug Fix</option>
            </select>
            <input type="text" placeholder="Add tag and press Enter..." value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && tagInput.trim()) { setNewMemory({ ...newMemory, tags: [...newMemory.tags, tagInput.trim()] }); setTagInput(""); } }} className="bg-slate-700 text-white px-4 py-2 rounded" />
          </div>
          {newMemory.tags.length > 0 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {newMemory.tags.map((tag) => (
                <span key={tag} className="bg-slate-600 px-3 py-1 rounded text-sm">{tag} <button onClick={() => setNewMemory({ ...newMemory, tags: newMemory.tags.filter((t) => t !== tag) })} className="ml-2 text-red-400">×</button></span>
              ))}
            </div>
          )}
          <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded flex items-center gap-2"><Plus size={20} /> Save Memory</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {filteredMemories.map((memory: any) => (
          <div key={memory._id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-white flex-1">{memory.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => handleTogglePin(memory._id, memory.isPinned)} className={memory.isPinned ? "text-yellow-400" : "text-slate-400"}><Pin size={18} /></button>
                <button onClick={() => handleDelete(memory._id)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
              </div>
            </div>
            <div className={`inline-block px-3 py-1 rounded text-sm font-semibold mb-3 ${categoryColors[memory.category]}`}>{memory.category}</div>
            <p className="text-slate-300 text-sm mb-4 line-clamp-3">{memory.content}</p>
            {memory.tags?.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-3">
                {memory.tags.map((tag: string) => (<span key={tag} className="bg-slate-700 px-2 py-1 text-xs text-slate-300 rounded">#{tag}</span>))}
              </div>
            )}
            <p className="text-xs text-slate-500">{new Date(memory.updatedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
