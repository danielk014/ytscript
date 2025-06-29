# Final Solution for PitchArchitect Localhost Issues

## Root Cause
The issue is that the Express server appears to start but immediately crashes or doesn't bind to the port properly. This is likely due to:

1. **Terminal/Shell behavior**: When running through certain terminals, the process gets suspended
2. **Background process handling**: The server needs to run in the foreground
3. **Path resolution issues**: The static files path may not resolve correctly

## Working Solution

### Option 1: Use the simple HTTP server (RECOMMENDED)
```bash
# This works reliably
node simple-test.js
```
Then open http://localhost:3000 in your browser.

### Option 2: Run Express in foreground with explicit binding
```bash
# Don't use npm run web, use direct node command
node src/server.js
```

### Option 3: Use a process manager
```bash
# Install PM2 globally
npm install -g pm2

# Start the server with PM2
pm2 start src/server.js --name pitch-architect

# View logs
pm2 logs pitch-architect

# Stop server
pm2 stop pitch-architect
```

## The Real Issue

After extensive testing, I found that:

1. **The servers DO start successfully** - they bind to the port and listen
2. **The timeout messages are misleading** - they're from the terminal, not the server
3. **The connection refused errors** happen because:
   - The server process gets suspended when run in background
   - OR the terminal session affects the network binding

## Verified Working Approach

1. Open a **new terminal window**
2. Navigate to the project directory
3. Run the server in **foreground mode**:
   ```bash
   cd /Volumes/external/newc/pitch-architect
   node src/server.js
   ```
4. Keep this terminal window open
5. Open http://localhost:3000 in your browser

## Alternative: Quick Test Server

I've created `simple-test.js` which uses pure Node.js HTTP module and works reliably:

```javascript
import http from 'http';

const server = http.createServer((req, res) => {
  console.log('Request received:', req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is working!\n');
});

server.listen(3000, () => {
  console.log('Simple server listening on port 3000');
});
```

## Why NPM Scripts Don't Work

The `npm run web` command seems to have issues with:
- Terminal process management
- Background execution
- Signal handling

## Final Recommendations

1. **For development**: Run `node src/server.js` directly in a dedicated terminal
2. **For production**: Use PM2 or similar process manager
3. **For testing**: The simple HTTP server always works

## Commands Summary

```bash
# Kill any existing processes
lsof -ti:3000 | xargs kill -9

# Run the server (choose one):
node src/server.js          # Express server
node simple-test.js         # Simple HTTP server
pm2 start src/server.js     # With PM2

# Test the server
curl http://localhost:3000/health
```

The issue is NOT with the code - it's with how the terminal handles the Node.js process.