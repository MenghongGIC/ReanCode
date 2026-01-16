# Vercel Deployment Guide for ReanCode Prototype

## Prerequisites
- GitHub account (https://github.com)
- Vercel account (https://vercel.com)

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

If you haven't already, initialize a git repository and push to GitHub:

```bash
cd /Users/macbookpro/ReanCode
git init
git add .
git commit -m "Initial commit: ReanCode prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ReanCode.git
git push -u origin main
```

### 2. Connect Vercel to Your GitHub Repository

1. Go to https://vercel.com and sign in with your GitHub account
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Search for "ReanCode" repository
5. Click "Import"

### 3. Configure Project Settings

In the Vercel dashboard:

**Framework Preset:** Vite
**Root Directory:** Prototype
**Build Command:** npm run build
**Output Directory:** dist

These settings are already configured in `vercel.json`, so Vercel will auto-detect them.

### 4. Environment Variables (Optional - for Judge0 API)

If you want to enable Java, C++, C, and Bash execution:

1. Go to Project Settings → Environment Variables
2. Add variable:
   - Name: `VITE_JUDGE0_API_KEY`
   - Value: `your_api_key_from_judge0`
   - Get key from: https://rapidapi.com/judge0-official/api/judge0-ce

3. Click "Save"

### 5. Deploy

1. Click "Deploy" button
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, you'll get a live URL like: `https://reancode.vercel.app`

## Post-Deployment

### View Deployment
- Your app is now live at the provided URL
- Share the URL with others to access your prototype

### Update Code
- Any push to the `main` branch automatically triggers a new deployment
- Vercel shows deployment logs in the dashboard

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Features Working on Vercel
✅ TypeScript/JavaScript execution
✅ Python execution (Pyodide)
✅ SQL execution (sql.js)
⚠️ Java, C++, C, Bash (require API key setup)

## Troubleshooting

**Build fails?**
- Check that `Prototype` is set as Root Directory
- Ensure all dependencies are in package.json
- Run `npm install` locally to verify

**Pyodide or SQL not working?**
- These are loaded from CDN, may need to wait on first run
- Check browser console for any network errors

**Environment variables not working?**
- Redeploy after setting environment variables
- Clear browser cache and refresh

## Support
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev
- Contact Vercel support for deployment issues
