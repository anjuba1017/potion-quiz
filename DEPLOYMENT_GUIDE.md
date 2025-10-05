# 🚀 Deployment Guide - GitHub Pages

## Step 1: Prepare Your Project for GitHub Pages

Update `vite.config.js` to set the base path for GitHub Pages.

Already done! ✅ (We'll do this in the next step)

## Step 2: Create a GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon (top right) → **"New repository"**
3. **Repository name**: `potion-quiz` (or any name you like)
4. **Description**: "El Libro de Recetas Mágicas - Chemistry Quiz Game"
5. Keep it **Public** (so GitHub Pages works for free)
6. **DO NOT** check "Initialize with README" (you already have files)
7. Click **"Create repository"**

## Step 3: Push Your Code to GitHub

Open Terminal and run these commands:

```bash
cd /Users/andresjulianbarrios/Documents/Tarea/potion-quiz

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Potion Quiz Game"

# Connect to GitHub (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/potion-quiz.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Deploy to GitHub Pages

### Option A: Using GitHub Actions (Recommended - Automatic)

1. Your repository should now be on GitHub
2. Go to **Settings** → **Pages** (in your GitHub repository)
3. Under **"Build and deployment"**:
   - **Source**: Select "GitHub Actions"
4. GitHub will automatically detect Vite and deploy it!

### Option B: Manual Deploy with gh-pages

Run these commands:

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Build the project
npm run build

# Deploy to GitHub Pages
npx gh-pages -d dist
```

Then go to **Settings** → **Pages** and select:
- **Source**: Deploy from a branch
- **Branch**: gh-pages / (root)

## Step 5: Access Your Live Site

Your quiz will be live at:

```
https://YOUR-USERNAME.github.io/potion-quiz/
```

## 🎉 That's it! Your quiz is now online!

---

## Updating the Site

Whenever you make changes:

```bash
# Make your changes, then:
git add .
git commit -m "Your update message"
git push

# If using manual deploy:
npm run build
npx gh-pages -d dist
```

---

## Troubleshooting

### Videos/Audio not loading?
Make sure files in `/public` are committed to git:
```bash
git add public/
git commit -m "Add media files"
git push
```

### Blank page?
Check `vite.config.js` has the correct base path.

---

## 📧 Share Your Quiz

Once deployed, anyone can access your quiz at the GitHub Pages URL!
Share the link with friends, classmates, or teachers. 🧙‍♀️✨

