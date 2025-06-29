import express from 'express';
import cors from 'cors';
import { PitchArchitect } from './PitchArchitect.js';
import { ScriptGenerator } from './scriptGenerator.js';
import { getYouTubeTranscript } from './youtubeTranscript.js';
import { analyzeWithClaude, improveScriptWithClaude } from './claudeAPI.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Check for Claude API key on startup
if (process.env.CLAUDE_API_KEY) {
  console.log('✅ Claude API key detected - AI analysis will be powered by Claude');
} else {
  console.log('⚠️  No Claude API key found - using local analysis engine');
  console.log('   To enable Claude AI, add CLAUDE_API_KEY to your .env file');
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve static files from parent directory's public folder
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// YouTube transcript endpoint
app.post('/api/youtube-transcript', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'YouTube URL is required' });
    }
    
    const result = await getYouTubeTranscript(url);
    res.json(result);
    
  } catch (error) {
    console.error('YouTube transcript error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { script1, script2, topic, targetLength, callToAction, useClaudeAPI } = req.body;
    
    if (!script1 || !script2 || !topic) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if Claude API should be used (default to true if API key exists)
    const shouldUseClaudeAPI = useClaudeAPI !== false && process.env.CLAUDE_API_KEY;
    
    if (shouldUseClaudeAPI) {
      try {
        // Use Claude API for analysis
        console.log('Using Claude API for analysis...');
        const claudeResult = await analyzeWithClaude(script1, script2, topic, targetLength, callToAction);
        
        // Format the response to match our existing structure
        const architect = new PitchArchitect();
        res.json({
          analyses: claudeResult.analyses,
          synthesizedTactics: claudeResult.synthesizedTactics.primary
            .concat(claudeResult.synthesizedTactics.secondary)
            .map(tactic => [tactic, { scripts: ['script1', 'script2'] }]),
          blueprint: claudeResult.blueprint,
          script: claudeResult.generatedScript,
          tacticMap: claudeResult.tacticMapping,
          suggestions: claudeResult.suggestions,
          formattedAnalysis: architect.formatAnalysis([claudeResult.analyses.script1, claudeResult.analyses.script2]),
          formattedSynthesis: `Primary Tactics: ${claudeResult.synthesizedTactics.primary.join(', ')}\n\nSecondary Tactics: ${claudeResult.synthesizedTactics.secondary.join(', ')}`,
          formattedBlueprint: claudeResult.blueprint.map(b => `${b.section}: ${b.tactics.join(', ')}`).join('\n'),
          formattedMapping: claudeResult.tacticMapping.map(m => `${m.line}\nTactics: ${m.tactics.join(', ')}\n${m.explanation}`).join('\n\n'),
          usingClaude: true
        });
      } catch (claudeError) {
        console.error('Claude API error, falling back to local analysis:', claudeError.message);
        // Fall back to local analysis if Claude API fails
      }
    }
    
    // Use local analysis (fallback or if Claude API not available)
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
      formattedMapping: architect.formatTacticMapping(tacticMap),
      usingClaude: false
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/examples', async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// Improve script endpoint
app.post('/api/improve', async (req, res) => {
  try {
    const { script, improvements, topic, callToAction, useClaudeAPI } = req.body;
    
    if (!script) {
      return res.status(400).json({ error: 'Script is required' });
    }
    
    // Check if Claude API should be used
    const shouldUseClaudeAPI = useClaudeAPI !== false && process.env.CLAUDE_API_KEY;
    
    if (shouldUseClaudeAPI && improvements && improvements.length > 0) {
      try {
        console.log('Using Claude API for improvements...');
        const claudeResult = await improveScriptWithClaude(script, improvements, topic, callToAction);
        
        res.json({
          improvedScript: claudeResult.improvedScript,
          improvements: improvements,
          wordCount: claudeResult.wordCount,
          changesApplied: claudeResult.changesApplied,
          usingClaude: true
        });
        return;
      } catch (claudeError) {
        console.error('Claude API error, falling back to local improvements:', claudeError.message);
        // Fall back to local improvements
      }
    }
    
    // Use local improvements (fallback or if Claude API not available)
    const architect = new PitchArchitect();
    const generator = new ScriptGenerator(
      topic || 'Improved Topic',
      script.split(' ').length,
      callToAction || 'Take action now'
    );
    
    // Apply specific improvements
    let improvedScript = script;
    
    if (improvements.includes('stronger-hook')) {
      // Replace first paragraph with stronger hook
      const paragraphs = improvedScript.split('\n\n');
      paragraphs[0] = generator.generateOpeningHook(['Pattern Interrupt', 'Curiosity Gap']);
      improvedScript = paragraphs.join('\n\n');
    }
    
    if (improvements.includes('more-emotional')) {
      // Add more emotional language
      improvedScript = enhanceEmotionalLanguage(improvedScript);
    }
    
    if (improvements.includes('better-cta')) {
      // Improve call to action
      const paragraphs = improvedScript.split('\n\n');
      paragraphs[paragraphs.length - 1] = generator.generateCallToAction(['Scarcity', 'Reciprocity']);
      improvedScript = paragraphs.join('\n\n');
    }
    
    if (improvements.includes('add-stories')) {
      // Insert story examples
      improvedScript = insertStoryExamples(improvedScript);
    }
    
    // Re-analyze the improved script
    const analysis = architect.analyzeScript(improvedScript, 1);
    
    res.json({
      improvedScript,
      analysis,
      improvements: improvements,
      wordCount: improvedScript.split(' ').length,
      usingClaude: false
    });
    
  } catch (error) {
    console.error('Error improving script:', error);
    res.status(500).json({ error: error.message });
  }
});

function enhanceEmotionalLanguage(script) {
  const replacements = {
    'good': 'amazing',
    'bad': 'devastating',
    'want': 'desperately need',
    'like': 'absolutely love',
    'difficult': 'incredibly challenging',
    'easy': 'effortless',
    'important': 'crucial',
    'problem': 'painful problem',
    'solution': 'life-changing solution'
  };
  
  let enhanced = script;
  Object.entries(replacements).forEach(([old, newWord]) => {
    const regex = new RegExp(`\\b${old}\\b`, 'gi');
    enhanced = enhanced.replace(regex, newWord);
  });
  
  return enhanced;
}

function insertStoryExamples(script) {
  const storyTemplate = `\n\nLet me tell you a quick story that perfectly illustrates this...\n\nJust last week, Sarah messaged me. She'd been struggling for months. But after applying this one principle, everything changed. Within 30 days, she achieved what she thought would take years.\n\nAnd Sarah isn't unique. This happens every single day.\n\n`;
  
  // Insert story after the second paragraph
  const paragraphs = script.split('\n\n');
  if (paragraphs.length > 2) {
    paragraphs.splice(2, 0, storyTemplate.trim());
  }
  
  return paragraphs.join('\n\n');
}

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║       PitchArchitect Web Interface        ║
║                                           ║
║   🚀 Server running on:                   ║
║   http://localhost:${PORT}                    ║
║                                           ║
║   Press Ctrl+C to stop                    ║
╚═══════════════════════════════════════════╝

Server is ready! Open http://localhost:${PORT} in your browser.
  `);
});