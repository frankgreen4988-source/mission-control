# 🚀 Mission Control - Setup & Getting Started

## Quick Start

### 1. Install Dependencies
```bash
cd mission-control
npm install
```

### 2. Set Up Convex
```bash
npm run convex
# Follow the prompts to sign in and create a new project
# Save your NEXT_PUBLIC_CONVEX_URL
```

### 3. Create .env.local
```bash
# .env.local
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
```

### 4. Start Development Server
```bash
npm run dev
# Open http://localhost:3000
```

---

## Architecture Overview

### Frontend (Next.js)
- **Pages**: Six main sections (Tasks, Content, Calendar, Memories, Team, Office)
- **Navigation**: Sidebar navigation with all sections
- **Real-time**: Convex hooks for live updates

### Backend (Convex)
- **Database**: Cloud-hosted document database
- **Functions**: Queries and mutations for all data operations
- **Schema**: Six main tables + relationships

### Data Flow
```
User Action → React Component → Convex Mutation → Database
Database → Convex Query → React Component → Real-time Update
```

---

## Key Features Explained

### 1. Task Board
**Purpose**: Central task management with Kanban workflow

**How to use**:
- Create task with title, description, assignee (Sam/Jimmy), priority
- Tasks auto-appear in "backlog" column
- Update status: backlog → in-progress → review → done
- Each column is a Kanban stage

**Data stored**:
- Title, description, status, assignee, priority, due date
- Timestamps (created, updated)

**Pro tips**:
- Assign high-priority urgent tasks first
- Use due dates to track deadlines
- Move to "review" before marking done

---

### 2. Content Pipeline
**Purpose**: Track content from idea to published

**How to use**:
- Create new content item with initial idea
- Develop through stages: idea → outline → draft → script → review → published
- Add images at any stage (attach during editing)
- Edit scripts, ideas, notes inline
- Move between stages with "Move" button

**Stages explained**:
- **Idea**: Raw concept
- **Outline**: Structure and flow
- **Draft**: First written version
- **Script**: Final script ready for recording
- **Review**: QA and feedback
- **Published**: Live and shipped

**Pro tips**:
- Don't skip stages - each adds value
- Keep scripts concise but complete
- Use notes for editor instructions

---

### 3. Calendar
**Purpose**: Unified view of all scheduled work and cron jobs

**How to use**:
- Create events with type (task, cron, meeting, deadline, reminder)
- Set date/time and assignee (Jimmy, Sam, or both)
- Mark as completed with checkmark
- View all events for the month
- Events sorted by date

**Event types**:
- **Task**: One-off work item
- **Cron**: Recurring scheduled job
- **Meeting**: Team sync
- **Deadline**: External deadline
- **Reminder**: Important alert

**Pro tips**:
- Add cron jobs to calendar for visibility
- Use reminders for important transitions
- Link calendar events to tasks for context

---

### 4. Memories
**Purpose**: Searchable knowledge base of insights and learnings

**How to use**:
- Create memory with title, content, category
- Add tags for cross-linking
- Search by title, content, or tags
- Pin important memories to top
- Filter by category

**Categories**:
- **Insight**: Understanding of how something works
- **Lesson**: Something learned from experience
- **Decision**: Important choice and reasoning
- **Research**: Findings from investigation
- **Strategy**: Long-term approach or plan
- **Bug Fix**: Solution to a problem

**Pro tips**:
- Write memories immediately after learning
- Use consistent tag naming
- Link related memories together
- Pin seasonal or recurring insights

---

### 5. Team Structure
**Purpose**: Visibility into team composition and roles

**How to use**:
- Add team members (humans and subagents)
- Assign role: Lead, Developer, Writer, Designer, Agent
- Add bio and skills
- View team organized by role
- Track member status (idle, working, offline, break)

**Roles**:
- **Lead**: Overall direction
- **Developer**: Code and technical
- **Writer**: Content and documentation
- **Designer**: UI/UX and visual
- **Agent**: AI/bot subagent

**Pro tips**:
- Keep skills up to date
- Add new subagents as you create them
- Use bios for quick context

---

### 6. Digital Office
**Purpose**: Real-time view of who's working and where

**How to use**:
- View office floorplan with desk assignments
- Click members to see full status
- Update status (at desk, away, in meeting, offline)
- View activity log of status changes
- See current task for each member

**Status meanings**:
- **At Desk**: Actively working
- **Away**: On break/lunch
- **In Meeting**: In sync or call
- **Offline**: Not available

**Pro tips**:
- Update status when you move desks
- Add current task for context
- Use activity log to track patterns

---

## Database Schema Quick Reference

### Tasks
```
- title: string (required)
- description: string (optional)
- status: backlog | in-progress | review | done
- assignedTo: jimmy | sam
- priority: low | medium | high
- dueDate: timestamp (optional)
- createdAt, updatedAt: timestamp
```

### Content Items
```
- title: string (required)
- stage: idea | outline | draft | script | review | published
- idea, script, notes: string (optional)
- images: array of {url, caption, uploadedAt}
- assignedTo: jimmy | sam
- createdAt, updatedAt: timestamp
```

### Calendar Events
```
- title: string (required)
- type: task | cron | meeting | deadline | reminder
- startTime: timestamp (required)
- endTime: timestamp (optional)
- assignedTo: jimmy | sam | both
- isCompleted: boolean
- cronJobId: string (optional, link to cron)
```

### Memories
```
- title: string (required)
- content: string (required)
- category: insight | lesson | decision | research | strategy | bug-fix
- tags: array of strings
- isPinned: boolean
- createdAt, updatedAt: timestamp
```

### Team Members
```
- name: string (required)
- role: lead | developer | writer | designer | agent
- type: human | subagent
- avatar: emoji/string
- bio: string (optional)
- skills: array of strings
- status: idle | working | offline | break
- lastActive: timestamp
```

### Office Status
```
- memberId: ref to teamMember
- status: at_desk | away | in_meeting | offline
- location: string (desk name)
- currentTask: string (optional)
- workStarted, lastUpdate: timestamp
```

---

## Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel deploy
# Follow prompts
# Add NEXT_PUBLIC_CONVEX_URL env var in Vercel dashboard
```

---

## Troubleshooting

### Database Not Connecting
- Check NEXT_PUBLIC_CONVEX_URL is set
- Verify Convex project is active
- Check console for Convex errors

### Real-time Updates Not Working
- Refresh page
- Check network connection
- Verify browser WebSocket support

### Missing Data
- Check if Convex project is properly initialized
- Run `npm run convex` to sync schema
- Clear browser cache

---

## Best Practices

1. **Tasks**: Keep titles concise, use descriptions for details
2. **Content**: Don't skip pipeline stages, each adds value
3. **Calendar**: Add all cron jobs for visibility
4. **Memories**: Write immediately while learning is fresh
5. **Team**: Keep roles and skills current
6. **Office**: Update status when moving/unavailable

---

## Next Steps

1. ✅ Setup complete - start using Mission Control
2. 📋 Create first task
3. ⚡ Add to content pipeline
4. 👥 Add team members (including new subagents)
5. 🧠 Record first memory
6. 📅 Schedule upcoming work
7. 🏢 Set up office view

---

Questions? Refer back to README.md or the inline help in each section.

⚡ Ready to control the mission!
