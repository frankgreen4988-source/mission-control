import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listTasks = query({
  args: { status: v.optional(v.string()), assignedTo: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let tasks = await ctx.db.query("tasks").collect();
    
    if (args.status) {
      tasks = tasks.filter((t) => t.status === args.status);
    }
    if (args.assignedTo) {
      tasks = tasks.filter((t) => t.assignedTo === args.assignedTo);
    }
    
    return tasks.sort((a, b) => b.updatedAt - a.updatedAt);
  },
});

export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    assignedTo: v.union(v.literal("jimmy"), v.literal("sam")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("tasks", {
      ...args,
      status: "backlog",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    status: v.optional(v.union(v.literal("backlog"), v.literal("in-progress"), v.literal("review"), v.literal("done"))),
    assignedTo: v.optional(v.union(v.literal("jimmy"), v.literal("sam"))),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
  },
});

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
