import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listContent = query({
  args: { stage: v.optional(v.string()), assignedTo: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let items = await ctx.db.query("contentItems").collect();
    
    if (args.stage) {
      items = items.filter((i) => i.stage === args.stage);
    }
    if (args.assignedTo) {
      items = items.filter((i) => i.assignedTo === args.assignedTo);
    }
    
    return items.sort((a, b) => b.updatedAt - a.updatedAt);
  },
});

export const createContent = mutation({
  args: {
    title: v.string(),
    idea: v.optional(v.string()),
    assignedTo: v.union(v.literal("jimmy"), v.literal("sam")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("contentItems", {
      ...args,
      stage: "idea",
      script: undefined,
      images: [],
      notes: undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateContent = mutation({
  args: {
    id: v.id("contentItems"),
    stage: v.optional(
      v.union(
        v.literal("idea"),
        v.literal("outline"),
        v.literal("draft"),
        v.literal("script"),
        v.literal("review"),
        v.literal("published")
      )
    ),
    idea: v.optional(v.string()),
    script: v.optional(v.string()),
    notes: v.optional(v.string()),
    assignedTo: v.optional(v.union(v.literal("jimmy"), v.literal("sam"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
  },
});

export const addImage = mutation({
  args: {
    id: v.id("contentItems"),
    url: v.string(),
    caption: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    if (!item) throw new Error("Content not found");
    
    const newImages = [
      ...item.images,
      { url: args.url, caption: args.caption, uploadedAt: Date.now() },
    ];
    
    await ctx.db.patch(args.id, { images: newImages, updatedAt: Date.now() });
  },
});

export const deleteContent = mutation({
  args: { id: v.id("contentItems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
