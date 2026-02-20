# 🚀 Deploy Mission Control RIGHT NOW (3 Simple Links)

## The 3-Step Deployment

### **STEP 1: Create Convex Project** (2 minutes)
Go here: https://convex.dev

1. Click **"Sign Up"** (use any email)
2. Create new project
3. Click Settings
4. **Copy the API URL** (save it somewhere)

Looks like: `https://xyz123.convex.cloud`

---

### **STEP 2: Create GitHub Repo** (1 minute)
Go here: https://github.com/new

1. **Repository name:** `mission-control`
2. Click **"Create repository"**
3. Copy the URL (looks like: `https://github.com/YOUR_USERNAME/mission-control.git`)

---

### **STEP 3: Push Code to GitHub** (1 minute)

Run these commands in terminal:

```bash
cd /Users/jimmy/.openclaw/workspace/mission-control

git config --global user.email "your@email.com"
git config --global user.name "Your Name"

git init
git add .
git commit -m "Initial Mission Control commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mission-control.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

### **STEP 4: Deploy to Vercel** (30 seconds)

Go here: https://vercel.com/new

1. Click **"Import Git Repository"**
2. Paste your GitHub URL
3. Click **"Import"**
4. Vercel auto-detects Next.js ✅
5. Click **"Deploy"**
6. Wait ~2 minutes
7. You get a live URL! 🎉

---

### **STEP 5: Add Convex to Vercel** (1 minute)

1. In Vercel dashboard, find your `mission-control` project
2. Click **Settings**
3. Click **Environment Variables**
4. Click **"Add"**
5. **Name:** `NEXT_PUBLIC_CONVEX_URL`
6. **Value:** (paste your Convex API URL from Step 1)
7. Click **Save**
8. Click **"Redeploy"** button
9. Wait ~30 seconds
10. Done! ✅

---

## That's It!

Your Mission Control is now **LIVE** at:
```
https://mission-control-xxx.vercel.app
```

Share this URL with Sam. Everyone uses the same live instance.

---

## Verify It Works

1. Go to your Vercel URL
2. You should see the dashboard
3. Click **Tasks** → Try creating a task
4. If it saves, everything works! ✅

---

## If Blank Page?

**Most common fix:**
1. Check Convex API URL is correct in Vercel
2. Redeploy
3. Wait 30 sec
4. Refresh

---

## Auto-Updates

From now on:

```bash
# Make changes locally
cd mission-control
# ... edit files ...

# Push to GitHub
git add .
git commit -m "your changes"
git push

# Vercel auto-deploys in 30 seconds
# Your live site updates automatically!
```

---

## Need Help?

- **Vercel issues?** → https://vercel.com/docs
- **Convex issues?** → https://docs.convex.dev
- **GitHub issues?** → https://docs.github.com

---

## Summary

| Step | What | Time | Where |
|------|------|------|-------|
| 1 | Create Convex project | 2 min | convex.dev |
| 2 | Create GitHub repo | 1 min | github.com/new |
| 3 | Push code to GitHub | 1 min | Terminal |
| 4 | Deploy to Vercel | 30 sec | vercel.com/new |
| 5 | Add Convex API to Vercel | 1 min | Vercel dashboard |

**Total time: ~5 minutes**

---

## You're Done! 🎉

Your Mission Control is now live, online, and ready to use.

Share the URL with Sam. Start creating tasks, memories, and managing your operations.

**No local setup. No complications. Just go.** ⚡
