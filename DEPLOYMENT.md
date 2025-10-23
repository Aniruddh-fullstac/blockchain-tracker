# 🚀 Deployment Guide

## Deploy to Vercel

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code:
```bash
cd "/Users/aniruddh/Desktop/blockchain ia/blockchain-tracker"
git add .
git commit -m "Initial commit: Beautiful blockchain tracker"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect it's a Next.js project
6. Click "Deploy"

### Step 3: Configure Environment Variables (if needed)
The Firebase configuration is already included in the code, but if you want to use environment variables:

1. In your Vercel dashboard, go to your project settings
2. Add environment variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Step 4: Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `bingo-7332c`
3. Go to "Realtime Database"
4. Create database in test mode
5. Your app will automatically connect!

## 🎉 You're Done!

Your beautiful blockchain tracker is now live! Share the Vercel URL with others to see real-time blockchain transactions and mining in action.

## Features Included:
- ✅ Real-time blockchain visualization
- ✅ Beautiful animations with Framer Motion
- ✅ Interactive transaction creation
- ✅ Manual and auto-mining controls
- ✅ Responsive design
- ✅ Firebase real-time synchronization
- ✅ Glass morphism UI design
- ✅ Gradient backgrounds and effects

## Local Development:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
