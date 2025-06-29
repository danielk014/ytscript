#!/bin/bash

echo "Starting PitchArchitect Web Server..."
echo "=================================="

# Kill any existing processes on port 3000
echo "Checking for existing processes on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Wait a moment
sleep 1

# Start the server
echo "Starting server..."
node src/server.js &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Test if server is running
echo "Testing server..."
if curl -s http://localhost:3000/health > /dev/null; then
    echo "✅ Server is running successfully!"
    echo "📱 Open http://localhost:3000 in your browser"
    echo ""
    echo "To stop the server, run: kill $SERVER_PID"
    echo "Or press Ctrl+C"
    
    # Keep script running
    wait $SERVER_PID
else
    echo "❌ Server failed to start"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi