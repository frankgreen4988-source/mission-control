# 🚀 Deploy Mission Control to Vercel (5 minutes)

## Option 1: GitHub + Vercel (Easiest - Recommended)

### Step 1: Push to GitHub
```bash
cd mission-control
git init
git add .
git commit -m "Initial Mission Control commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mission-control.git
git push -u origin main
```

### Step 2: Deploy to Vercel (Free)
1. Go to **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Paste: `https://github.com/YOUR_USERNAME/mission-control.git`
4. Vercel auto-detects Next.js ✅
5. Click **"Deploy"**
6. Wait ~2 minutes...
7. You get a live URL: `https://mission-control-xxx.vercel.app`

### Step 3: Add Environment Variable
1. In Vercel dashboard, go to your project
2. Settings → Environment Variables
3. Add:
   - **Name:** `NEXT_PUBLIC_CONVEX_URL`
   - **Value:** `https://your-convex-project.convex.cloud` (from Convex)
4. Redeploy (Vercel auto-redeploys)

**Done!** Your Mission Control is live online. 🎉

---

## Option 2: Vercel CLI (If you have Node.js)

```bash
cd mission-control
npm install -g vercel
vercel login
vercel deploy
# Follow prompts
# Add NEXT_PUBLIC_CONVEX_URL when asked
```

---

## Option 3: Railway (Alternative)

1. Go to **https://railway.app**
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Connect your GitHub account
4. Select `mission-control` repo
5. Railway detects Next.js
6. Add environment variable: `NEXT_PUBLIC_CONVEX_URL`
7. Deploy
8. Get your live URL instantly

---

## Getting Your Convex URL

### Create a Convex Project
1. Go to **https://convex.dev**
2. Sign up (free)
3. Create new project
4. Go to project settings
5. Copy the API URL (looks like: `https://xxxxx.convex.cloud`)
6. This is your `NEXT_PUBLIC_CONVEX_URL`

---

## What You Get

✅ Live URL: `https://mission-control-xxx.vercel.app`
✅ Auto-deploys when you push to GitHub
✅ Free tier (up to 3 projects)
✅ Custom domain support (optional)
✅ Environment variables (secure)
✅ Real-time Convex sync

---

## Custom Domain (Optional)

In Vercel dashboard:
1. Project → Settings → Domains
2. Add your domain (e.g., `control.samjimmy.com`)
3. Follow DNS instructions
4. Done!

---

## Automatic Redeploys

After setup:
- **Every time you push to GitHub** → Vercel auto-deploys
- No manual steps needed
- Just `git push` and it's live in 30 seconds

---

## Team Access

Share the URL with Sam:
```
https://mission-control-xxx.vercel.app
```

Everyone uses the same live instance. All data syncs via Convex.

---

## Scaling

Free tier includes:
- **Vercel**: Up to 1000 function invocations/month (plenty)
- **Convex**: Up to 1M function calls/month (plenty)
- Upgrade only if you hit limits

---

## Troubleshooting

### Blank page after deploy?
→ Check NEXT_PUBLIC_CONVEX_URL is set in Vercel dashboard
→ Redeploy after adding it

### Can't create data?
→ Make sure Convex project is active
→ Check browser console for errors

### Need to update code?
→ Edit locally → `git push` → Auto-deployed in 30 sec

---

## That's It!

**5 steps to live:**
1. GitHub push
2. Vercel import
3. Convex project
4. Add env var
5. Done!

Mission Control is now online and accessible to you and Sam. 🎉

---

## Quick Commands Cheat Sheet

```bash
# Local setup (if you ever want it)
npm install
npm run convex
npm run dev

# Deploy to GitHub
git add .
git commit -m "message"
git push

# Deploy to Vercel
vercel deploy

# View logs
vercel logs
```

---

**Your Mission Control is ready. Ship it.** ⚡
