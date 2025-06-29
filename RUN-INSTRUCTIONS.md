# How to Run PitchArchitect

## Step-by-Step Instructions

### 1. Open Terminal
- On Mac: Press `Cmd + Space`, type "Terminal", press Enter
- On Windows: Press `Win + R`, type "cmd", press Enter

### 2. Navigate to the Project Directory
```bash
cd /Volumes/external/newc/pitch-architect
```

### 3. Install Dependencies (if not already done)
```bash
npm install
```

### 4. Check Your Claude API Key (Optional)
Make sure your `.env` file exists and contains:
```
CLAUDE_API_KEY=your-actual-api-key-here
```

### 5. Run the Application
```bash
npm run web
```

### 6. Open in Browser
Once you see this message:
```
Server is ready! Open http://localhost:3000 in your browser.
```

Open your web browser and go to: **http://localhost:3000**

## Troubleshooting

### If Port 3000 is Already in Use:
Run with a different port:
```bash
PORT=3001 npm run web
```
Then open: **http://localhost:3001**

### If You Get Permission Errors:
Try:
```bash
sudo npm install
```

### To Stop the Server:
Press `Ctrl + C` in the terminal

## Quick Test
After starting the server, you can test if it's working by visiting:
- http://localhost:3000/health (should show JSON with status: "ok")

## Features Available:
1. Load Example Scripts (button on main page)
2. View Tactics Library (button in header)
3. Sign In (button in top right)
4. Analyze Scripts and Generate New Ones

## Alternative Test (Minimal Server)
If the main server doesn't work, try the test server:
```bash
node test-server.js
```
Then open: **http://localhost:3002**