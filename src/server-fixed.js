import express from 'express';
import cors from 'cors';
import { PitchArchitect } from './PitchArchitect.js';
import { ScriptGenerator } from './scriptGenerator.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS and JSON parsing
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Debug static path
const publicPath = path.join(__dirname, '../public');
console.log('Static files path:', publicPath);
console.log('Path exists:', fs.existsSync(publicPath));

// Serve static files
app.use(express.static(publicPath));

// Root route handler
app.get('/', (req, res) => {
  console.log('Root route accessed');
  const indexPath = path.join(publicPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found at ' + indexPath);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/analyze', async (req, res) => {
  console.log('Analyze endpoint hit');
  try {
    const { script1, script2, topic, targetLength, callToAction } = req.body;
    
    if (!script1 || !script2 || !topic) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const architect = new PitchArchitect();
    
    // Analyze scripts
    const analysis1 = architect.analyzeScript(script1, 1);
    const analysis2 = architect.analyzeScript(script2, 2);
    const analyses = [analysis1, analysis2];
    
    // Synthesize tactics
    const synthesizedTactics = architect.synthesizeTactics(analyses);
    
    // Create blueprint
    const blueprint = architect.createBlueprint(topic, targetLength || 1400, synthesizedTactics);
    
    // Generate script
    const generator = new ScriptGenerator(topic, targetLength || 1400, callToAction);
    generator.setTactics(synthesizedTactics);
    const script = generator.generateFullScript(blueprint);
    
    // Map tactics
    const tacticMap = architect.mapTacticsToScript(script, synthesizedTactics);
    
    // Get suggestions
    const suggestions = architect.suggestRevisions(script, blueprint);
    
    res.json({
      analyses: {
        script1: analysis1,
        script2: analysis2
      },
      synthesizedTactics: Array.from(synthesizedTactics.entries()),
      blueprint,
      script,
      tacticMap,
      suggestions,
      formattedAnalysis: architect.formatAnalysis(analyses),
      formattedSynthesis: architect.formatSynthesis(synthesizedTactics),
      formattedBlueprint: architect.formatBlueprint(blueprint),
      formattedMapping: architect.formatTacticMapping(tacticMap)
    });
    
  } catch (error) {
    console.error('Error in analyze:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

app.get('/api/examples', async (req, res) => {
  console.log('Examples endpoint hit');
  try {
    const examples = {
      script1: `Stop scrolling. I'm about to tell you why 97% of people fail at learning a new language.

And no, it's not because they're not "gifted" with languages. It's not because they don't have time. It's not even because they're using the wrong app.

The real reason? They're fighting against their own brain.

Look, I get it. You've downloaded Duolingo. Maybe even paid for Babbel. You started strong - 10 minutes a day, they said. Easy, right?

But here's what happened: Week one, you're on fire. Week two, you miss a day. Week three? The owl is sending passive-aggressive notifications while you pretend not to see them.`,
      
      script2: `What if I told you that everything you know about productivity is wrong?

Not just slightly off. Completely, fundamentally backwards.

I discovered this after burning out for the third time in two years. Despite reading every productivity book. Despite trying every system. Despite working 70-hour weeks.

Then I met Sarah, a single mom who runs three businesses while homeschooling two kids. Her secret? She works less than 4 hours a day.`
    };
    
    res.json(examples);
  } catch (error) {
    console.error('Error in examples:', error);
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  console.log('404 - Not found:', req.url);
  res.status(404).json({ error: 'Not found', url: req.url });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: err.message });
});

// Start server with error handling
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════╗
║       PitchArchitect Web Interface        ║
║                                           ║
║   🚀 Server running on:                   ║
║   http://localhost:${PORT}                    ║
║   http://127.0.0.1:${PORT}                    ║
║                                           ║
║   Static files: ${publicPath}
║                                           ║
║   Press Ctrl+C to stop                    ║
╚═══════════════════════════════════════════╝
  `);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});