import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // TASKS TABLE
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("backlog"),
      v.literal("in-progress"),
      v.literal("review"),
      v.literal("done")
    ),
    assignedTo: v.union(v.literal("jimmy"), v.literal("sam")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.optional(v.number()), // timestamp
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_assigned", ["assignedTo"])
    .index("by_updated", ["updatedAt"]),

  // CONTENT PIPELINE TABLE
  contentItems: defineTable({
    title: v.string(),
    stage: v.union(
      v.literal("idea"),
      v.literal("outline"),
      v.literal("draft"),
      v.literal("script"),
      v.literal("review"),
      v.literal("published")
    ),
    idea: v.optional(v.string()),
    script: v.optional(v.string()),
    images: v.array(
      v.object({
        url: v.string(),
        caption: v.optional(v.string()),
        uploadedAt: v.number(),
      })
    ),
    notes: v.optional(v.string()),
    assignedTo: v.union(v.literal("jimmy"), v.literal("sam")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_stage", ["stage"])
    .index("by_assigned", ["assignedTo"]),

  // CALENDAR EVENTS TABLE
  calendarEvents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    type: v.union(
      v.literal("task"),
      v.literal("cron"),
      v.literal("meeting"),
      v.literal("deadline"),
      v.literal("reminder")
    ),
    startTime: v.number(), // timestamp
    endTime: v.optional(v.number()), // timestamp
    assignedTo: v.union(v.literal("jimmy"), v.literal("sam"), v.literal("both")),
    cronJobId: v.optional(v.string()),
    isCompleted: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_start", ["startTime"])
    .index("by_assigned", ["assignedTo"])
    .index("by_type", ["type"]),

  // MEMORIES TABLE
  memories: defineTable({
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
    tags: v.array(v.string()),
    relatedMemories: v.array(v.string()), // IDs
    createdAt: v.number(),
    updatedAt: v.number(),
    isPinned: v.boolean(),
  })
    .index("by_category", ["category"])
    .index("by_pinned", ["isPinned"])
    .index("by_updated", ["updatedAt"]),

  // TEAM MEMBERS TABLE
  teamMembers: defineTable({
    name: v.string(),
    role: v.union(
      v.literal("lead"),
      v.literal("developer"),
      v.literal("writer"),
      v.literal("designer"),
      v.literal("agent")
    ),
    type: v.union(v.literal("human"), v.literal("subagent")),
    avatar: v.string(), // emoji or URL
    bio: v.optional(v.string()),
    status: v.union(
      v.literal("idle"),
      v.literal("working"),
      v.literal("offline"),
      v.literal("break")
    ),
    currentTask: v.optional(v.string()), // task ID
    lastActive: v.number(),
    skills: v.array(v.string()),
    createdAt: v.number(),
  })
    .index("by_role", ["role"])
    .index("by_status", ["status"])
    .index("by_type", ["type"]),

  // OFFICE STATUS TABLE
  officeStatus: defineTable({
    memberId: v.string(), // ref to teamMembers
    status: v.union(
      v.literal("at_desk"),
      v.literal("away"),
      v.literal("in_meeting"),
      v.literal("offline")
    ),
    location: v.string(), // desk name
    currentTask: v.optional(v.string()),
    workStarted: v.number(),
    lastUpdate: v.number(),
  })
    .index("by_member", ["memberId"])
    .index("by_status", ["status"]),
});
