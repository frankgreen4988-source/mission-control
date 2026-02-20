# 🚀 Mission Control

A centralized operations hub for Sam & Jimmy built with Next.js and Convex.

## 📋 Features

### 1. **Task Board**
- Track all tasks with status (backlog, in-progress, review, done)
- Assign tasks to Jimmy or Sam
- Set priority levels (low, medium, high)
- Kanban-style columns for workflow visualization

### 2. **Content Pipeline**
- Manage content through stages: idea → outline → draft → script → review → published
- Edit ideas and full scripts inline
- Attach images to content items
- Track content ownership and progress

### 3. **Calendar**
- View all scheduled tasks and cron jobs
- Different event types: tasks, cron jobs, meetings, deadlines, reminders
- Assign to Jimmy, Sam, or both
- Mark events as completed

### 4. **Memories**
- Beautiful document-based memory storage
- Categories: insight, lesson, decision, research, strategy, bug-fix
- Full-text search across all memories
- Tag system for organization
- Pin important memories
- Search functionality

### 5. **Team Structure**
- View all team members organized by role
- Roles: Lead, Developer, Writer, Designer, Agent
- Support for both humans and subagents
- Skills and bio tracking
- Real-time status (idle, working, offline, break)

### 6. **Digital Office**
- Floorplan view of office with desk assignments
- Real-time member status and activity log
- Quick status updates (at desk, away, in meeting, offline)
- Visual avatar representation
- Activity timeline

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Convex account

### Installation

```bash
# Install dependencies
npm install

# Set up Convex
npm run convex

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
```

## 🏗️ Architecture

### Database Schema (Convex)

- **tasks**: Track project work
- **contentItems**: Manage content pipeline
- **calendarEvents**: Schedule and track events
- **memories**: Store insights and learnings
- **teamMembers**: Team information
- **officeStatus**: Real-time office presence

### Pages

- `/tasks` - Task board
- `/content` - Content pipeline
- `/calendar` - Calendar view
- `/memories` - Memory storage
- `/team` - Team structure
- `/office` - Digital office

## 💡 Usage Examples

### Creating a Task

1. Go to Task Board
2. Fill in title, description, assignee, and priority
3. Click "Create"
4. Task appears in "backlog" column
5. Drag or update status as work progresses

### Managing Content

1. Go to Content Pipeline
2. Create a new item with initial idea
3. As content develops, move it through stages
4. Attach images and scripts as needed
5. Mark as published when complete

### Recording Memories

1. Go to Memories
2. Write memory title and content
3. Select category (insight, lesson, etc.)
4. Add tags for organization
5. Use search to find later

### Team Management

1. Go to Team
2. Add new team members with roles and skills
3. View team organized by role
4. Update member status in real-time

### Office View

1. Go to Office
2. See all team members and their desk assignments
3. Click members to see details
4. Update status (at desk, away, in meeting)
5. View activity log

## 🔄 Real-time Updates

All sections use Convex queries and mutations for real-time synchronization:

- Changes are instant
- Multiple users can collaborate
- Activity log auto-updates
- Status changes reflect immediately

## 🚀 Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

Deploy to Vercel:

```bash
vercel deploy
```

## 📝 Development Notes

- Built with Next.js 14 (App Router)
- Styled with Tailwind CSS
- Real-time DB: Convex
- Icons: Lucide React
- Date handling: date-fns

## 🔒 Security

- Convex handles authentication
- All mutations are server-side
- No sensitive data in client
- Role-based access planning for future

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Convex Docs](https://docs.convex.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

Built with ⚡ for maximum efficiency.
