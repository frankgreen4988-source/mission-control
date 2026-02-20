import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listEvents = query({
  args: {
    start: v.number(),
    end: v.number(),
    assignedTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let events = await ctx.db.query("calendarEvents").collect();
    
    events = events.filter(
      (e) => e.startTime >= args.start && e.startTime <= args.end
    );
    
    if (args.assignedTo) {
      events = events.filter(
        (e) => e.assignedTo === args.assignedTo || e.assignedTo === "both"
      );
    }
    
    return events.sort((a, b) => a.startTime - b.startTime);
  },
});

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    type: v.union(
      v.literal("task"),
      v.literal("cron"),
      v.literal("meeting"),
      v.literal("deadline"),
      v.literal("reminder")
    ),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    assignedTo: v.union(v.literal("jimmy"), v.literal("sam"), v.literal("both")),
    cronJobId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("calendarEvents", {
      ...args,
      isCompleted: false,
      createdAt: Date.now(),
    });
  },
});

export const updateEvent = mutation({
  args: {
    id: v.id("calendarEvents"),
    isCompleted: v.optional(v.boolean()),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    startTime: v.optional(v.number()),
    endTime: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteEvent = mutation({
  args: { id: v.id("calendarEvents") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
