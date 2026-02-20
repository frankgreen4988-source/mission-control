import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listMemories = query({
  args: {
    category: v.optional(v.string()),
    search: v.optional(v.string()),
    pinnedOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let memories = await ctx.db.query("memories").collect();
    
    if (args.pinnedOnly) {
      memories = memories.filter((m) => m.isPinned);
    }
    
    if (args.category) {
      memories = memories.filter((m) => m.category === args.category);
    }
    
    if (args.search) {
      const search = args.search.toLowerCase();
      memories = memories.filter(
        (m) =>
          m.title.toLowerCase().includes(search) ||
          m.content.toLowerCase().includes(search) ||
          m.tags.some((t) => t.toLowerCase().includes(search))
      );
    }
    
    return memories.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return b.updatedAt - a.updatedAt;
    });
  },
});

export const createMemory = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    category: v.union(
      v.literal("insight"),
      v.literal("lesson"),
      v.literal("decision"),
      v.literal("research"),
      v.literal("strategy"),
      v.literal("bug-fix")
    ),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("memories", {
      ...args,
      tags: args.tags || [],
      relatedMemories: [],
      createdAt: now,
      updatedAt: now,
      isPinned: false,
    });
  },
});

export const updateMemory = mutation({
  args: {
    id: v.id("memories"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isPinned: v.optional(v.boolean()),
    relatedMemories: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
  },
});

export const deleteMemory = mutation({
  args: { id: v.id("memories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
