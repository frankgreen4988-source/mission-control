# ⚡ Mission Control - 10-Minute Quick Start

## Get Running in 3 Commands

```bash
cd mission-control
npm install
npm run convex
```

When prompted:
1. Sign in with your Convex account (or create one)
2. Create a new project
3. Copy the `NEXT_PUBLIC_CONVEX_URL`

Then:
```bash
echo "NEXT_PUBLIC_CONVEX_URL=<paste-url-here>" > .env.local
npm run dev
```

Open: http://localhost:3000

---

## What You See First

### Home Dashboard
- 4 stat cards (tasks, in-progress, done, team members)
- 6 quick-link cards to all sections
- System status indicator

### Sidebar Navigation
- 📋 Tasks
- ⚡ Content
- 📅 Calendar
- 🧠 Memories
- 👥 Team
- 🏢 Office

---

## Each Section at a Glance

### 📋 Tasks (Kanban)
```
┌──────────┬─────────────┬────────┬──────┐
│ BACKLOG  │ IN-PROGRESS │ REVIEW │ DONE │
├──────────┼─────────────┼────────┼──────┤
│ Task 1   │ Task 3      │ Task 5 │      │
│ Task 2   │ Task 4      │        │ Task 6
│          │             │        │
└──────────┴─────────────┴────────┴──────┘

Create → Assign to Jimmy/Sam → Set Priority → Done
```

### ⚡ Content Pipeline (Linear)
```
IDEA → OUTLINE → DRAFT → SCRIPT → REVIEW → PUBLISHED

Create with initial idea
↓
Edit at each stage
↓
Attach images
↓
Move right when ready
```

### 📅 Calendar (Monthly)
```
Monday, February 20
├── 9:00 - Sprint Planning (Meeting)
├── 14:00 - Trading Session (Task)
└── 18:00 - Review (Deadline)

Click date → Add event → Pick type → Set time
```

### 🧠 Memories (Document DB)
```
┌─────────────────────────────┐
│ Search: "arbitrage"         │
│ Category: All / Strategy    │
├─────────────────────────────┤
│ 📌 Polymarket Arb Edge      │
│    #strategy #trading       │
│    (content preview...)     │
│                             │
│ 🧠 Budget Allocation Rule  │
│    #lesson #portfolio       │
│    (content preview...)     │
└─────────────────────────────┘
```

### 👥 Team Structure (By Role)
```
🔴 LEAD (1)
├── Sam [Status: Working]

🔵 DEVELOPERS (3)
├── Jimmy ⚡ [Status: At Desk]
├── CodeBot 🤖 [Status: Offline]
└── ApiBot 🤖 [Status: Idle]

🟢 WRITERS (1)
├── ContentBot 🤖 [Status: Working]

🟣 DESIGNERS (2)
├── UIBot 🤖 [Status: Break]
└── DesignBot 🤖 [Status: Idle]

🟡 AGENTS (2)
├── TradingBot 🤖 [Status: Working]
└── MonitorBot 🤖 [Status: Offline]
```

### 🏢 Digital Office (Floorplan)
```
Office Layout:
┌─────────────────────────────────────────┐
│  💼 Desk 1    💼 Desk 2    💼 Desk 3  │
│  Jimmy        CodeBot      ⊗ Empty    │
│                                         │
│  💼 Desk 4    👥 Meeting   🪑 Lounge  │
│  ⊗ Empty      Sam + 3      ContentBot │
└─────────────────────────────────────────┘

Team Status (Right Panel):
√ Jimmy - At Desk - Current: Polymarket
  CodeBot - Working - Current: API calls
  Sam - In Meeting - No current task
  ✗ UIBot - Offline
```

---

## Common Workflows

### Workflow 1: Create & Track a Task
```
1. Go to Tasks
2. Enter title: "Deploy Polymarket Bot v2"
3. Description: "Full arb blasting with 40 shares"
4. Assign to: Jimmy
5. Priority: HIGH
6. Click Create
7. Task appears in BACKLOG
8. When working on it: Move to IN-PROGRESS
9. When done: Move to DONE
```

### Workflow 2: Create Content
```
1. Go to Content
2. Title: "Trading Strategy Guide"
3. Idea: "Document the arbitrage strategy"
4. Assign to: Jimmy
5. Click Create
6. Card appears in IDEA column
7. Edit idea as you think
8. When outline ready: Click "Move"
9. Card moves to OUTLINE column
10. Continue through stages
11. Final stage: PUBLISHED
```

### Workflow 3: Remember a Lesson
```
1. Go to Memories
2. Title: "25-share scaling works"
3. Content: "Tested 25 shares vs 20... (full explanation)"
4. Category: STRATEGY
5. Add tags: #trading #polymarket #scaling
6. Click Save
7. Appears immediately in grid
8. Search for it later with tags or content
9. Pin it if important
```

### Workflow 4: Schedule Cron Job
```
1. Go to Calendar
2. Title: "Run arb bot - Peak window"
3. Type: CRON
4. Date/Time: Feb 21 @ 16:00 UTC
5. Assign to: JIMMY (or BOTH)
6. Click Add Event
7. Appears on calendar
8. When complete: Check mark it
```

### Workflow 5: Add Team Member
```
1. Go to Team
2. Name: "AnalysisBot"
3. Role: DEVELOPER
4. Type: SUBAGENT
5. Avatar: 🤖
6. Skills: data-analysis, backtesting
7. Click Add Member
8. Appears under DEVELOPER section
9. Can assign tasks to them
```

### Workflow 6: Check Team Status
```
1. Go to Office
2. See floorplan with avatars
3. Click on team member
4. Their details expand (status, task, location)
5. Click "At Desk" or "Away" to update
6. Activity log shows when status changed
7. Helps coordinate who's available
```

---

## Data Entry Tips

### ✅ Good Task Title
"Deploy Polymarket arb bot v3 with 40 shares"

### ❌ Bad Task Title
"Work on bot stuff"

---

### ✅ Good Memory
**Title**: Infrastructure Edge Validation
**Content**: "Found that Chainlink oracle data reaches us 1-60s before Polymarket UI. This gives 95%+ win rate on infrastructure trades."
**Category**: STRATEGY
**Tags**: #polymarket #edge #trading #chainlink

### ❌ Bad Memory
"edge thing found"

---

### ✅ Good Content Title
"Polymarket Trading Strategy Guide - Complete"

### ❌ Bad Content Title
"guide"

---

## Keyboard Shortcuts (Built-in Browser)
```
Ctrl/Cmd + F  = Find in page (search tasks, etc.)
Ctrl/Cmd + L  = Focus URL bar (navigate sections)
Scroll        = View more items
Click + Hold  = Select/highlight text
```

---

## Real-Time Behavior

**Everything updates instantly:**
- ✅ Create a task → immediately in board
- ✅ Update memory → searchable right away
- ✅ Change status → live for all viewers
- ✅ Add team member → appears immediately
- ✅ Update event → calendar refreshes

No save buttons. No refresh needed. Everything syncs automatically.

---

## Colors & Status Meanings

### Task Status Colors
- ⬜ Backlog = Not started
- 🔵 In-Progress = Working on it
- 🟡 Review = Waiting for approval
- 🟢 Done = Completed

### Priority Colors
- 🔵 Low = Can wait
- 🟡 Medium = Soon
- 🔴 High = Urgent

### Member Status
- 🟢 Working = At computer doing work
- 🟡 Away = On break/lunch
- 🔵 In Meeting = Syncing/call
- ⚪ Idle = Available but not active
- ⭕ Offline = Not logged in

### Event Type Colors
- 🔵 Task = To-do item
- 🟣 Cron = Automated job
- 🟢 Meeting = Team sync
- 🔴 Deadline = External due date
- 🟡 Reminder = Alert/notification

---

## Troubleshooting

### Page is blank
→ Check .env.local has NEXT_PUBLIC_CONVEX_URL
→ Run `npm run convex` again

### Can't create items
→ Check Convex schema is deployed
→ Refresh page
→ Check browser console for errors

### Real-time not working
→ Check internet connection
→ Try refreshing page
→ Check browser WebSocket support

---

## Next: Full Docs

- Read `README.md` for complete feature docs
- Read `SETUP.md` for detailed configuration
- Check code comments for implementation details

---

## You're Ready!

Start here:
1. ✅ Create first task
2. ✅ Add yourself and Sam to Team
3. ✅ Record a memory
4. ✅ Schedule upcoming work
5. ✅ View office floorplan

**Enjoy the command center.** ⚡

---

## Need Help?

**Quick answers**: Hover over section headers
**Full docs**: README.md or SETUP.md
**How it works**: MISSION_CONTROL_READY.md
**Integration**: See feature explanations above
