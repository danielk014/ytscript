# How to Upload PitchArchitect to GitHub

## Prerequisites
- A GitHub account (create one at https://github.com if you don't have one)
- Git installed on your computer

## Step 1: Create a New Repository on GitHub

1. Go to https://github.com
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: https://github.com/danielk014/ytscript.git`
   - **Description**: "AI-powered YouTube script writer that analyzes reference scripts and generates new ones using proven psychological tactics"
   - **Public** or **Private**: public
   - **DO NOT** initialize with README (we already have files)
5. Click **"Create repository"**

## Step 2: Prepare Your Local Repository

Open Terminal and navigate to your project:
```bash
cd /Volumes/external/newc/pitch-architect
```

## Step 3: Initialize Git and Make First Commit

```bash
# Initialize git repository
git init

# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: PitchArchitect - AI YouTube Script Writer"
```

## Step 4: Connect to GitHub and Push

After creating the repository on GitHub, you'll see instructions. Run these commands:

```bash
# Add your GitHub repository as origin (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/danielk014/ytscript.git
# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 5: Enter Your GitHub Credentials

When prompted:
- **Username**: Your GitHub username
- **Password**: Your GitHub personal access token (NOT your password)

### How to Create a Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token"
3. Give it a name like "pitch-architect-upload"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token immediately (you won't see it again!)

## Important Files Already Configured

✅ **`.gitignore`** - Already created to exclude:
- `node_modules/`
- `.env` (your API keys)
- `.DS_Store`
- Log files
- Build directories

✅ **`README-AI.md`** - Documentation ready (rename to README.md if you want)

## Before Pushing - Security Check

1. **Verify `.env` is NOT being tracked**:
   ```bash
   git status
   ```
   You should NOT see `.env` in the list

2. **Double-check sensitive data**:
   ```bash
   git ls-files | grep -E "(\.env|api|key|secret)"
   ```
   Make sure no sensitive files appear

## After Uploading

Your repository will be available at:
`https://github.com/danielk014/ytscript.git`

### Optional: Add a Better README

Rename the documentation:
```bash
mv README-AI.md README.md
git add README.md
git commit -m "Add comprehensive README"
git push
```

## Sharing Your Project

Once uploaded, others can use your project by:

```bash
# Clone the repository
git clone https://github.com/danielk014/ytscript.git

# Install dependencies
cd pitch-architect
npm install

# Create their own .env file
cp .env.example .env
# Then add their Claude API key

# Run the application
npm run web
```

## Updating Your Repository

When you make changes:
```bash
git add .
git commit -m "Description of changes"
git push
```

## Need Help?

- If you get a "repository not found" error, make sure you created it on GitHub first
- If authentication fails, make sure you're using a personal access token, not your password
- If you see permission denied, check that your token has the correct permissions

## 🎉 Congratulations!

Once you've pushed to GitHub, your AI-powered YouTube script writer will be available for the world to see (if public) or safely stored in your private repository!