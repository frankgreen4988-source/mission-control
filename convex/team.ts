import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listTeamMembers = query({
  args: { role: v.optional(v.string()), type: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let members = await ctx.db.query("teamMembers").collect();
    
    if (args.role) {
      members = members.filter((m) => m.role === args.role);
    }
    if (args.type) {
      members = members.filter((m) => m.type === args.type);
    }
    
    return members.sort((a, b) => {
      const roleOrder = { lead: 0, developer: 1, writer: 2, designer: 3, agent: 4 };
      return (
        (roleOrder[a.role as keyof typeof roleOrder] || 5) -
        (roleOrder[b.role as keyof typeof roleOrder] || 5)
      );
    });
  },
});

export const createTeamMember = mutation({
  args: {
    name: v.string(),
    role: v.union(
      v.literal("lead"),
      v.literal("developer"),
      v.literal("writer"),
      v.literal("designer"),
      v.literal("agent")
    ),
    type: v.union(v.literal("human"), v.literal("subagent")),
    avatar: v.string(),
    bio: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("teamMembers", {
      ...args,
      skills: args.skills || [],
      status: "idle",
      lastActive: Date.now(),
      createdAt: Date.now(),
    });
  },
});

export const updateTeamMember = mutation({
  args: {
    id: v.id("teamMembers"),
    status: v.optional(
      v.union(v.literal("idle"), v.literal("working"), v.literal("offline"), v.literal("break"))
    ),
    currentTask: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, { ...updates, lastActive: Date.now() });
  },
});

export const deleteTeamMember = mutation({
  args: { id: v.id("teamMembers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// OFFICE STATUS
export const getOfficeStatus = query({
  handler: async (ctx) => {
    const statuses = await ctx.db.query("officeStatus").collect();
    const members = await ctx.db.query("teamMembers").collect();
    
    return statuses.map((status) => {
      const member = members.find((m) => m._id === status.memberId);
      return { ...status, member };
    });
  },
});

export const updateOfficeStatus = mutation({
  args: {
    memberId: v.id("teamMembers"),
    status: v.union(
      v.literal("at_desk"),
      v.literal("away"),
      v.literal("in_meeting"),
      v.literal("offline")
    ),
    location: v.optional(v.string()),
    currentTask: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("officeStatus")
      .filter((s) => s.memberId === args.memberId)
      .first();
    
    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        lastUpdate: now,
      });
    } else {
      await ctx.db.insert("officeStatus", {
        memberId: args.memberId,
        status: args.status,
        location: args.location || "office",
        currentTask: args.currentTask,
        workStarted: now,
        lastUpdate: now,
      });
    }
  },
});
