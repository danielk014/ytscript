import { PSYCHOLOGICAL_TACTICS, LINGUISTIC_MARKERS, identifyTactics } from './tactics.js';
import { marked } from 'marked';

export class PitchArchitect {
  constructor() {
    this.referenceScripts = [];
    this.synthesizedTactics = new Map();
    this.scriptBlueprint = [];
  }

  analyzeScript(script, scriptNumber) {
    const analysis = {
      scriptNumber,
      hookStrategy: this.analyzeHook(script),
      narrativeStructure: this.analyzeNarrative(script),
      psychologicalTactics: this.analyzePsychologicalTactics(script),
      linguisticMarkers: this.analyzeLinguisticStyle(script),
      emotionTimeline: this.analyzeEmotionFlow(script)
    };
    
    return analysis;
  }

  analyzeHook(script) {
    const firstParagraph = script.split('\n')[0];
    const hooks = [];
    
    if (firstParagraph.includes('?')) {
      hooks.push({ type: 'Question Hook', content: firstParagraph });
    }
    if (/\d+/.test(firstParagraph)) {
      hooks.push({ type: 'Statistic Hook', content: firstParagraph });
    }
    if (firstParagraph.length < 50) {
      hooks.push({ type: 'Pattern Interrupt', content: firstParagraph });
    }
    
    return hooks;
  }

  analyzeNarrative(script) {
    const structure = [];
    const lines = script.split('\n');
    
    // Detect open loops
    if (script.match(/but first|we'll get to that|more on that later/gi)) {
      structure.push('Open Loop');
    }
    
    // Detect story elements
    if (script.match(/once upon|I remember|let me tell you/gi)) {
      structure.push('Story Arc');
    }
    
    // Detect segmentation
    if (script.match(/first|second|finally|step \d+/gi)) {
      structure.push('Segmented Structure');
    }
    
    return structure;
  }

  analyzePsychologicalTactics(script) {
    const foundTactics = identifyTactics(script);
    const detailedTactics = [];
    
    foundTactics.forEach(tacticKey => {
      if (PSYCHOLOGICAL_TACTICS[tacticKey]) {
        detailedTactics.push({
          name: PSYCHOLOGICAL_TACTICS[tacticKey].name,
          category: PSYCHOLOGICAL_TACTICS[tacticKey].category,
          occurrences: this.countOccurrences(script, tacticKey)
        });
      }
    });
    
    return detailedTactics;
  }

  analyzeLinguisticStyle(script) {
    const markers = [];
    
    // Analyze tone
    const contractionsCount = (script.match(/\w+'\w+/g) || []).length;
    if (contractionsCount > 5) {
      markers.push('Conversational Tone');
    }
    
    // Analyze sentence length
    const sentences = script.split(/[.!?]+/);
    const avgLength = sentences.reduce((acc, s) => acc + s.split(' ').length, 0) / sentences.length;
    if (avgLength < 15) {
      markers.push('Short, Punchy Sentences');
    }
    
    // Check for power words
    const powerWords = ['ultimate', 'secret', 'proven', 'breakthrough', 'transform'];
    if (powerWords.some(word => script.toLowerCase().includes(word))) {
      markers.push('Power Words');
    }
    
    return markers;
  }

  analyzeEmotionFlow(script) {
    const paragraphs = script.split('\n\n');
    const timeline = [];
    
    paragraphs.forEach((para, index) => {
      const emotions = [];
      
      if (para.match(/problem|struggle|frustrate/gi)) {
        emotions.push('frustration');
      }
      if (para.match(/exciting|amazing|breakthrough/gi)) {
        emotions.push('excitement');
      }
      if (para.match(/imagine|dream|aspire/gi)) {
        emotions.push('hope');
      }
      if (para.match(/urgent|now|limited/gi)) {
        emotions.push('urgency');
      }
      
      if (emotions.length > 0) {
        timeline.push({
          section: index + 1,
          emotions: emotions,
          intensity: emotions.length
        });
      }
    });
    
    return timeline;
  }

  countOccurrences(text, tacticKey) {
    // Simple occurrence counter - can be made more sophisticated
    return 1; // Placeholder
  }

  synthesizeTactics(analyses) {
    const allTactics = new Map();
    
    analyses.forEach(analysis => {
      analysis.psychologicalTactics.forEach(tactic => {
        if (!allTactics.has(tactic.name)) {
          allTactics.set(tactic.name, {
            ...tactic,
            scripts: [analysis.scriptNumber]
          });
        } else {
          allTactics.get(tactic.name).scripts.push(analysis.scriptNumber);
        }
      });
    });
    
    this.synthesizedTactics = allTactics;
    return allTactics;
  }

  createBlueprint(topic, targetLength, tactics) {
    const blueprint = [];
    const sections = Math.ceil(targetLength / 200); // Rough estimate: 200 words per section
    
    // Opening Hook (0:00-0:15)
    blueprint.push({
      section: 'Opening Hook',
      timing: '0:00-0:15',
      tactics: ['Pattern Interrupt', 'Curiosity Gap'],
      wordCount: 50
    });
    
    // Problem Identification (0:15-1:00)
    blueprint.push({
      section: 'Problem Identification',
      timing: '0:15-1:00',
      tactics: ['Empathy Building', 'Direct Address'],
      wordCount: 150
    });
    
    // Solution Introduction (1:00-2:00)
    blueprint.push({
      section: 'Solution Introduction',
      timing: '1:00-2:00',
      tactics: ['Authority', 'Open Loop'],
      wordCount: 200
    });
    
    // Main Content (2:00-7:00)
    for (let i = 0; i < sections - 4; i++) {
      blueprint.push({
        section: `Main Point ${i + 1}`,
        timing: `${2 + i}:00-${3 + i}:00`,
        tactics: ['Social Proof', 'Future Pacing', 'Micro Commitments'],
        wordCount: 200
      });
    }
    
    // Call to Action (7:00-8:00)
    blueprint.push({
      section: 'Call to Action',
      timing: '7:00-8:00',
      tactics: ['Scarcity', 'Reciprocity', 'Direct Address'],
      wordCount: 200
    });
    
    this.scriptBlueprint = blueprint;
    return blueprint;
  }

  generateScript(topic, blueprint, callToAction) {
    let script = '';
    
    blueprint.forEach(section => {
      script += this.generateSection(section, topic, callToAction);
      script += '\n\n';
    });
    
    return script.trim();
  }

  generateSection(section, topic, callToAction) {
    const templates = {
      'Opening Hook': `Wait. Before you spend another day struggling with ${topic}, you need to hear this.\n\nWhat if I told you that 97% of people trying to ${topic} are making the exact same mistake?`,
      
      'Problem Identification': `Look, I get it. You've tried everything.\n\nYou've watched the videos. Read the articles. Maybe even bought that course.\n\nBut here's the thing - none of them told you the real secret.`,
      
      'Solution Introduction': `Here's what changed everything for me...\n\nBut first, let me be clear: This isn't some magic pill. This is a proven system that's helped thousands of people just like you.`,
      
      'Main Point': `Here's the key insight: ${topic} isn't about working harder. It's about working smarter.\n\nThink about it. The most successful people don't have more hours in the day. They just use them differently.`,
      
      'Call to Action': `So here's what you need to do right now:\n\n👉 ${callToAction}\n\nBut hurry - this won't be available forever. We're only opening spots for the next 48 hours.`
    };
    
    const sectionType = section.section.includes('Main Point') ? 'Main Point' : section.section;
    return templates[sectionType] || `[${section.section} content for ${topic}]`;
  }

  mapTacticsToScript(script, tactics) {
    const mapping = [];
    const lines = script.split('\n');
    
    tactics.forEach((tactic, tacticName) => {
      lines.forEach((line, index) => {
        if (this.lineUsesTactic(line, tacticName)) {
          mapping.push({
            tactic: tacticName,
            lineNumbers: [index + 1],
            content: line.substring(0, 50) + '...'
          });
        }
      });
    });
    
    return mapping;
  }

  lineUsesTactic(line, tacticName) {
    // Simplified tactic detection
    const tacticPatterns = {
      'Curiosity Gap': /what if|but here's|wait/i,
      'Direct Address': /\byou\b/i,
      'Social Proof': /thousands|everyone|most people/i,
      'Scarcity': /limited|only|hurry/i,
      'Authority': /proven|expert|research/i
    };
    
    return tacticPatterns[tacticName] ? tacticPatterns[tacticName].test(line) : false;
  }

  suggestRevisions(script, blueprint) {
    return [
      '💡 Try a stronger pattern interrupt in the opening - something more unexpected',
      '💡 Add more specific numbers and statistics for credibility',
      '💡 Include a personal story in the middle section for emotional connection',
      '💡 Test a scarcity element earlier in the script to maintain urgency',
      '💡 Consider adding viewer testimonials or success stories for social proof'
    ];
  }

  formatAnalysis(analyses) {
    let output = '## 📊 Deep Analysis of Reference Scripts\n\n';
    
    analyses.forEach(analysis => {
      output += `### Script #${analysis.scriptNumber}\n\n`;
      
      output += '**Hook Strategy:**\n';
      analysis.hookStrategy.forEach(hook => {
        output += `- ${hook.type}: "${hook.content.substring(0, 60)}..."\n`;
      });
      
      output += '\n**Narrative Structure:**\n';
      analysis.narrativeStructure.forEach(structure => {
        output += `- ${structure}\n`;
      });
      
      output += '\n**Psychological Tactics:**\n';
      analysis.psychologicalTactics.forEach(tactic => {
        output += `- **${tactic.name}** (${tactic.category})\n`;
      });
      
      output += '\n**Linguistic Markers:**\n';
      analysis.linguisticMarkers.forEach(marker => {
        output += `- ${marker}\n`;
      });
      
      output += '\n**Emotion Timeline:**\n';
      analysis.emotionTimeline.forEach(point => {
        output += `- Section ${point.section}: ${point.emotions.join(', ')} (Intensity: ${point.intensity}/5)\n`;
      });
      
      output += '\n---\n\n';
    });
    
    return output;
  }

  formatSynthesis(tactics) {
    let output = '## 🔧 Synthesis of Tactics\n\n';
    
    tactics.forEach((tactic, tacticName) => {
      const tacticInfo = Object.values(PSYCHOLOGICAL_TACTICS).find(t => t.name === tacticName);
      if (tacticInfo) {
        output += `### **${tacticName}**\n`;
        output += `- ${tacticInfo.description}\n`;
        output += `- *Effectiveness:* ${tacticInfo.effectiveness}\n`;
        output += `- *Found in scripts:* ${tactic.scripts.join(', ')}\n\n`;
      }
    });
    
    return output;
  }

  formatBlueprint(blueprint) {
    let output = '## 📋 Script Blueprint\n\n';
    
    blueprint.forEach(section => {
      output += `### ${section.section} (${section.timing})\n`;
      output += `- **Tactics:** ${section.tactics.map(t => `**${t}**`).join(', ')}\n`;
      output += `- **Word Count:** ~${section.wordCount} words\n\n`;
    });
    
    return output;
  }

  formatTacticMapping(mapping) {
    let output = '## 🗺️ Tactic-to-Script Map\n\n';
    output += '| Tactic | Line Numbers | Preview |\n';
    output += '|--------|--------------|----------|\n';
    
    mapping.forEach(item => {
      output += `| **${item.tactic}** | ${item.lineNumbers.join(', ')} | ${item.content} |\n`;
    });
    
    return output;
  }
}