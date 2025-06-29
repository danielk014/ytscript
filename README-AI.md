# PitchArchitect - AI YouTube Script Writer

A powerful AI-powered YouTube script writer that analyzes reference scripts and generates new ones using proven psychological tactics. Now with Claude AI integration for enhanced analysis!

## 🚀 Features

- **Script Analysis**: Deep analysis of reference scripts to extract psychological tactics
- **AI-Powered Generation**: Uses Claude AI or local engine to generate compelling scripts
- **Psychological Tactics**: 30+ proven tactics for engagement and retention
- **Web Interface**: Beautiful, user-friendly interface for script creation
- **Improvement Engine**: Iteratively improve scripts with specific enhancements
- **YouTube Integration**: Extract transcripts from YouTube videos (manual process)

## 🔧 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Claude AI (Optional but Recommended)

Create a `.env` file in the root directory:
```env
# Copy from .env.example
CLAUDE_API_KEY=your-claude-api-key-here

# Optional: Choose Claude model
CLAUDE_MODEL=claude-3-sonnet-20240229

# Server port
PORT=3000
```

To get a Claude API key:
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy it to your `.env` file

### 3. Run the Application

**Web Interface:**
```bash
npm run web
```
Then open http://localhost:3000

**CLI Interface:**
```bash
npm start
```

## 📝 How It Works

1. **Input Reference Scripts**: Provide two high-performing YouTube scripts
2. **AI Analysis**: Claude AI analyzes tactics, patterns, and psychological triggers
3. **Script Generation**: Creates a new script optimized for your topic
4. **Review & Refine**: Get suggestions and iteratively improve your script

## 🤖 AI Modes

- **With Claude API**: Full AI-powered analysis and generation
- **Without Claude API**: Uses local pattern matching and templates

## 🔐 Security

- API keys are stored in `.env` (never commit this file)
- `.gitignore` is configured to exclude sensitive files
- All API calls are made server-side

## 📚 Tactics Library

View 30+ psychological tactics including:
- Pattern Interrupt
- Curiosity Gap
- Social Proof
- Scarcity
- Authority
- And many more...

## 🛠️ Development

The project uses ES6 modules and includes:
- Express.js server
- Claude AI SDK integration
- Local analysis engine fallback
- Responsive web interface

## 📄 License

MIT