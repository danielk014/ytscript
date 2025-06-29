#!/bin/bash

echo "🚀 PitchArchitect GitHub Upload Helper"
echo "====================================="
echo ""

# Check if .env exists and remind user
if [ -f ".env" ]; then
    echo "✅ Found .env file - it will be ignored (good!)"
else
    echo "⚠️  No .env file found - that's okay"
fi

echo ""
echo "📝 Step 1: Initialize Git Repository"
echo "Running: git init"
git init

echo ""
echo "📝 Step 2: Add all files"
echo "Running: git add ."
git add .

echo ""
echo "📝 Step 3: Create first commit"
echo "Running: git commit -m 'Initial commit: PitchArchitect - AI YouTube Script Writer'"
git commit -m "Initial commit: PitchArchitect - AI YouTube Script Writer"

echo ""
echo "✅ Local repository ready!"
echo ""
echo "📌 Now you need to:"
echo "1. Go to https://github.com"
echo "2. Create a new repository called 'pitch-architect'"
echo "3. DO NOT initialize with README"
echo "4. After creating, come back here and run:"
echo ""
echo "   git remote add origin https://github.com/YOUR-USERNAME/pitch-architect.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "Replace YOUR-USERNAME with your actual GitHub username!"
echo ""
echo "📚 Full instructions are in GITHUB-UPLOAD-GUIDE.md"