import { PSYCHOLOGICAL_TACTICS } from './tactics.js';
import { SCRIPT_TEMPLATES, generateSectionContent, fillTemplate, selectRandom } from './templates.js';

export class ScriptGenerator {
  constructor(topic, targetLength, callToAction) {
    this.topic = topic;
    this.targetLength = targetLength;
    this.callToAction = callToAction;
    this.tactics = [];
    this.sections = [];
  }

  setTactics(tactics) {
    this.tactics = Array.from(tactics.keys());
  }

  generateFullScript(blueprint) {
    let script = '';
    let currentWordCount = 0;
    
    blueprint.forEach((section, index) => {
      const sectionContent = this.generateSection(section, index);
      script += sectionContent + '\n\n';
      currentWordCount += sectionContent.split(' ').length;
    });
    
    // Trim to target length if needed
    if (currentWordCount > this.targetLength) {
      script = this.trimToLength(script, this.targetLength);
    }
    
    return script.trim();
  }

  generateSection(blueprintSection, sectionIndex) {
    const { section, tactics, wordCount } = blueprintSection;
    let content = '';
    
    switch (section) {
      case 'Opening Hook':
        content = this.generateOpeningHook(tactics);
        break;
        
      case 'Problem Identification':
        content = this.generateProblemSection(tactics);
        break;
        
      case 'Solution Introduction':
        content = this.generateSolutionIntro(tactics);
        break;
        
      case 'Call to Action':
        content = this.generateCallToAction(tactics);
        break;
        
      default:
        if (section.includes('Main Point')) {
          content = this.generateMainPoint(section, tactics, sectionIndex);
        }
        break;
    }
    
    // Ensure section meets word count
    content = this.adjustToWordCount(content, wordCount);
    
    return content;
  }

  generateOpeningHook(tactics) {
    let hook = '';
    
    // Always start with a strong pattern interrupt
    if (tactics.includes('Pattern Interrupt')) {
      hook = generateSectionContent('hook', this.topic, {
        shocking_fact: `most people waste months trying to ${this.topic}`,
        percentage: '93'
      });
    }
    
    // Add curiosity gap
    if (tactics.includes('Curiosity Gap')) {
      const curiosityLine = selectRandom([
        `\n\nBut here's what nobody tells you...`,
        `\n\nThe truth? It's not what you think.`,
        `\n\nAnd the real reason will shock you.`
      ]);
      hook += curiosityLine;
    }
    
    return hook;
  }

  generateProblemSection(tactics) {
    let content = '';
    
    // Start with empathy
    if (tactics.includes('Empathy Building')) {
      content = generateSectionContent('problem', this.topic, {
        problem: `nothing seems to work`,
        struggle: `trying the same things over and over`,
        repeated_failure: `put in effort without seeing results`
      });
    }
    
    // Add direct address
    if (tactics.includes('Direct Address')) {
      content += `\n\nYou've probably tried:\n`;
      content += `- The popular methods everyone recommends\n`;
      content += `- The "expert" advice that sounds good but doesn't work\n`;
      content += `- Even the expensive courses that promise miracles\n\n`;
      content += `And you're still stuck, right?`;
    }
    
    return content;
  }

  generateSolutionIntro(tactics) {
    let content = '';
    
    // Establish authority
    if (tactics.includes('Authority')) {
      content = `After helping over 5,000 people master ${this.topic}, I discovered something shocking.\n\n`;
      content += `The difference between those who succeed and those who fail isn't talent. It isn't time. It isn't even effort.\n\n`;
    }
    
    // Create open loop
    if (tactics.includes('Open Loop')) {
      content += `It's one simple shift that changes everything.\n\n`;
      content += `But before I reveal it, you need to understand why traditional methods fail...`;
    }
    
    return content;
  }

  generateMainPoint(sectionName, tactics, index) {
    let content = '';
    const pointNumber = parseInt(sectionName.match(/\d+/)?.[0] || index);
    
    // Structure main points with variety
    const structures = [
      this.generateStoryPoint.bind(this),
      this.generateDataPoint.bind(this),
      this.generateActionPoint.bind(this),
      this.generateComparisonPoint.bind(this)
    ];
    
    const structure = structures[pointNumber % structures.length];
    content = structure(tactics, pointNumber);
    
    return content;
  }

  generateStoryPoint(tactics, pointNumber) {
    let content = `Let me tell you about Sarah.\n\n`;
    
    content += `She came to me frustrated after months of trying to ${this.topic}. Nothing worked.\n\n`;
    
    if (tactics.includes('Social Proof')) {
      content += `But when she applied this one principle, everything changed. Within 30 days, she ${this.getPositiveOutcome()}.\n\n`;
    }
    
    if (tactics.includes('Future Pacing')) {
      content += `Imagine that being you. Imagine finally ${this.getDesiredState()}.\n\n`;
    }
    
    content += `Here's exactly what she did...`;
    
    return content;
  }

  generateDataPoint(tactics, pointNumber) {
    let content = `The research is crystal clear on this:\n\n`;
    
    content += `A recent study of 10,000 people learning ${this.topic} found that those who ${this.getKeyAction()} were 3.7x more likely to succeed.\n\n`;
    
    if (tactics.includes('Micro Commitments')) {
      content += `Think about it - doesn't that make sense?\n\n`;
    }
    
    content += `But here's what the study didn't tell you...\n\n`;
    content += `The successful group all shared one hidden trait: ${this.getSecretTrait()}.`;
    
    return content;
  }

  generateActionPoint(tactics, pointNumber) {
    let content = `Here's your action step #${pointNumber}:\n\n`;
    
    content += `Every morning, before you do anything else, ${this.getSpecificAction()}.\n\n`;
    content += `This takes less than 5 minutes, but the compound effect is massive.\n\n`;
    
    if (tactics.includes('Social Proof')) {
      content += `Over 2,000 people in our community do this daily. The results speak for themselves.\n\n`;
    }
    
    content += `Try it tomorrow. Just once. You'll see the difference immediately.`;
    
    return content;
  }

  generateComparisonPoint(tactics, pointNumber) {
    let content = `Most people approach ${this.topic} completely wrong.\n\n`;
    
    content += `They think it's about:\n`;
    content += `❌ ${this.getWrongApproach(1)}\n`;
    content += `❌ ${this.getWrongApproach(2)}\n`;
    content += `❌ ${this.getWrongApproach(3)}\n\n`;
    
    content += `But the pros? They focus on:\n`;
    content += `✅ ${this.getRightApproach(1)}\n`;
    content += `✅ ${this.getRightApproach(2)}\n`;
    content += `✅ ${this.getRightApproach(3)}\n\n`;
    
    content += `See the difference? It's a complete paradigm shift.`;
    
    return content;
  }

  generateCallToAction(tactics) {
    let content = '';
    
    // Create urgency
    if (tactics.includes('Scarcity')) {
      content = `Look, I can't keep this available forever.\n\n`;
      content += `We're already at capacity, and I'm only opening 50 more spots this week.\n\n`;
    }
    
    // Use reciprocity
    if (tactics.includes('Reciprocity')) {
      content += `I've shared my best strategies with you today. Completely free.\n\n`;
      content += `Now it's your turn to take action.\n\n`;
    }
    
    // Strong CTA
    content += `👉 ${this.callToAction}\n\n`;
    
    // Add urgency closer
    content += `But don't wait. Every day you delay is another day stuck in the same place.\n\n`;
    content += `Your future self is counting on you to make the right choice today.`;
    
    return content;
  }

  // Helper methods for dynamic content
  getPositiveOutcome() {
    const outcomes = [
      `achieved her goal`,
      `saw incredible results`,
      `transformed her approach`,
      `broke through her plateau`,
      `reached a level she never thought possible`
    ];
    return selectRandom(outcomes);
  }

  getDesiredState() {
    const states = [
      `achieving your goals with ease`,
      `having the confidence to succeed`,
      `getting the results you deserve`,
      `breaking free from limitations`,
      `living up to your potential`
    ];
    return selectRandom(states);
  }

  getKeyAction() {
    const actions = [
      `focused on fundamentals first`,
      `practiced with intention`,
      `tracked their progress daily`,
      `joined a supportive community`,
      `followed a proven system`
    ];
    return selectRandom(actions);
  }

  getSecretTrait() {
    const traits = [
      `They committed to consistency over perfection`,
      `They embraced failure as feedback`,
      `They focused on systems, not goals`,
      `They prioritized learning over achieving`,
      `They understood the power of compound growth`
    ];
    return selectRandom(traits);
  }

  getSpecificAction() {
    const actions = [
      `spend 10 minutes reviewing your progress`,
      `write down three specific intentions`,
      `practice the fundamental technique`,
      `visualize your success`,
      `connect with one person on the same journey`
    ];
    return selectRandom(actions);
  }

  getWrongApproach(num) {
    const wrong = [
      `Working harder without a strategy`,
      `Copying what works for others blindly`,
      `Focusing on advanced techniques too early`,
      `Trying to do everything at once`,
      `Ignoring the fundamentals`
    ];
    return wrong[num - 1] || wrong[0];
  }

  getRightApproach(num) {
    const right = [
      `Building sustainable systems`,
      `Adapting strategies to their situation`,
      `Mastering basics before advancing`,
      `Taking focused, deliberate action`,
      `Strengthening foundation daily`
    ];
    return right[num - 1] || right[0];
  }

  adjustToWordCount(content, targetWords) {
    const currentWords = content.split(' ').length;
    
    if (currentWords < targetWords * 0.8) {
      // Add more detail
      content += `\n\n${this.generatePadding(targetWords - currentWords)}`;
    } else if (currentWords > targetWords * 1.2) {
      // Trim excess
      content = this.trimToLength(content, targetWords);
    }
    
    return content;
  }

  generatePadding(wordsNeeded) {
    const padding = [
      `Here's something most people don't realize: ${this.topic} is more about mindset than method.`,
      `The truth is, success with ${this.topic} comes down to understanding these core principles.`,
      `Let me break this down even further for you...`,
      `This might sound simple, but it's incredibly powerful when applied correctly.`,
      `Remember, knowledge without action is worthless. Implementation is everything.`
    ];
    
    return selectRandom(padding);
  }

  trimToLength(text, maxWords) {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    
    return words.slice(0, maxWords).join(' ') + '...';
  }
}