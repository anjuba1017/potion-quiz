#!/bin/bash

echo "🧙‍♀️ El Libro de Recetas Mágicas - GitHub Deployment"
echo "=================================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Get GitHub username
read -p "📝 Enter your GitHub username: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ Username cannot be empty"
    exit 1
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Initial commit - El Libro de Recetas Mágicas"

# Add remote
echo "🔗 Connecting to GitHub..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$GITHUB_USER/potion-quiz.git"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://github.com/new"
echo "2. Create a repository named: potion-quiz"
echo "3. Keep it PUBLIC"
echo "4. DO NOT initialize with README"
echo "5. Click 'Create repository'"
echo ""
echo "Then run: git push -u origin main"
echo ""
echo "🌐 Your site will be live at:"
echo "   https://$GITHUB_USER.github.io/potion-quiz/"
echo ""

