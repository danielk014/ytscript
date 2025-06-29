export const PSYCHOLOGICAL_TACTICS = {
  // Hook Tactics
  PATTERN_INTERRUPT: {
    name: 'Pattern Interrupt',
    category: 'hook',
    description: 'Breaks expected patterns to grab attention instantly',
    effectiveness: 'Stops viewers from scrolling by disrupting their mental autopilot'
  },
  CONTROVERSIAL_STATEMENT: {
    name: 'Controversial Statement',
    category: 'hook',
    description: 'Makes a bold claim that challenges common beliefs',
    effectiveness: 'Triggers cognitive dissonance and forces engagement'
  },
  CURIOSITY_GAP: {
    name: 'Curiosity Gap',
    category: 'hook',
    description: 'Creates knowledge gap that viewers feel compelled to fill',
    effectiveness: 'Leverages psychological need for closure to maintain attention'
  },
  SHOCKING_STATISTIC: {
    name: 'Shocking Statistic',
    category: 'hook',
    description: 'Opens with surprising data point that challenges assumptions',
    effectiveness: 'Triggers emotional response and establishes credibility'
  },
  
  // Narrative Tactics
  OPEN_LOOP: {
    name: 'Open Loop',
    category: 'narrative',
    description: 'Starts story without finishing it, creating tension',
    effectiveness: 'Keeps viewers watching to get resolution'
  },
  FUTURE_PACING: {
    name: 'Future Pacing',
    category: 'narrative',
    description: 'Helps viewer imagine their improved future state',
    effectiveness: 'Creates emotional investment in the outcome'
  },
  STORY_ARC: {
    name: 'Story Arc',
    category: 'narrative',
    description: 'Traditional narrative structure with setup, conflict, resolution',
    effectiveness: 'Engages viewers through familiar storytelling patterns'
  },
  
  // Persuasion Tactics
  SOCIAL_PROOF: {
    name: 'Social Proof',
    category: 'persuasion',
    description: 'Shows others successfully using the method/product',
    effectiveness: 'Reduces perceived risk through herd mentality'
  },
  SCARCITY: {
    name: 'Scarcity',
    category: 'persuasion',
    description: 'Emphasizes limited availability or time',
    effectiveness: 'Triggers fear of missing out (FOMO)'
  },
  AUTHORITY: {
    name: 'Authority',
    category: 'persuasion',
    description: 'Establishes credibility through expertise or credentials',
    effectiveness: 'Increases trust and reduces skepticism'
  },
  RECIPROCITY: {
    name: 'Reciprocity',
    category: 'persuasion',
    description: 'Gives value first to create obligation',
    effectiveness: 'Triggers psychological need to return favors'
  },
  
  // Engagement Tactics
  DIRECT_ADDRESS: {
    name: 'Direct Address',
    category: 'engagement',
    description: 'Speaks directly to viewer using "you"',
    effectiveness: 'Creates personal connection and maintains attention'
  },
  RHETORICAL_QUESTIONS: {
    name: 'Rhetorical Questions',
    category: 'engagement',
    description: 'Asks questions that make viewer think',
    effectiveness: 'Increases mental engagement and participation'
  },
  PATTERN_VARIATION: {
    name: 'Pattern Variation',
    category: 'engagement',
    description: 'Varies sentence length, pace, and energy',
    effectiveness: 'Prevents monotony and maintains interest'
  },
  
  // Emotional Tactics
  FEAR_APPEAL: {
    name: 'Fear Appeal',
    category: 'emotional',
    description: 'Highlights negative consequences of inaction',
    effectiveness: 'Motivates through loss aversion'
  },
  ASPIRATIONAL_IMAGERY: {
    name: 'Aspirational Imagery',
    category: 'emotional',
    description: 'Paints vivid picture of desired outcome',
    effectiveness: 'Creates emotional pull toward positive future'
  },
  EMPATHY_BUILDING: {
    name: 'Empathy Building',
    category: 'emotional',
    description: 'Shows understanding of viewer pain points',
    effectiveness: 'Builds trust through shared experience'
  },
  
  // Retention Tactics
  BREADCRUMBING: {
    name: 'Breadcrumbing',
    category: 'retention',
    description: 'Hints at valuable information coming later',
    effectiveness: 'Keeps viewers watching for payoff'
  },
  MICRO_COMMITMENTS: {
    name: 'Micro Commitments',
    category: 'retention',
    description: 'Gets small agreements throughout video',
    effectiveness: 'Uses consistency principle to maintain engagement'
  },
  SEGMENTATION: {
    name: 'Segmentation',
    category: 'retention',
    description: 'Breaks content into clear, digestible sections',
    effectiveness: 'Reduces cognitive load and improves comprehension'
  },
  
  // Additional Tactics
  VALUE_STACKING: {
    name: 'Value Stacking',
    category: 'retention',
    description: 'Continuously adds benefits and value propositions',
    effectiveness: 'Creates perception of overwhelming value'
  },
  CLIFFHANGER: {
    name: 'Cliffhanger',
    category: 'retention',
    description: 'Creates suspense before revealing key information',
    effectiveness: 'Maintains viewer attention through anticipation'
  },
  PAIN_AGITATION: {
    name: 'Pain Agitation',
    category: 'emotional',
    description: 'Intensifies awareness of current problems',
    effectiveness: 'Motivates action through dissatisfaction with status quo'
  },
  CALLBACK: {
    name: 'Callback',
    category: 'narrative',
    description: 'References earlier points to create coherence',
    effectiveness: 'Reinforces key messages and creates satisfying structure'
  },
  COMMITMENT: {
    name: 'Commitment & Consistency',
    category: 'persuasion',
    description: 'Gets viewers to agree with small points first',
    effectiveness: 'Builds toward larger agreement through consistency principle'
  },
  EMOTIONAL_INTENSITY: {
    name: 'Emotional Intensity',
    category: 'emotional',
    description: 'Uses highly charged emotional language',
    effectiveness: 'Creates memorable impact and drives action'
  }
};

export const LINGUISTIC_MARKERS = {
  CONVERSATIONAL_TONE: {
    name: 'Conversational Tone',
    patterns: ['contractions', 'informal language', 'personal anecdotes'],
    effect: 'Builds rapport and accessibility'
  },
  POWER_WORDS: {
    name: 'Power Words',
    patterns: ['ultimate', 'secret', 'proven', 'breakthrough', 'transform'],
    effect: 'Triggers emotional response and urgency'
  },
  SENSORY_LANGUAGE: {
    name: 'Sensory Language',
    patterns: ['visual', 'auditory', 'kinesthetic descriptions'],
    effect: 'Makes content more vivid and memorable'
  },
  SHORT_SENTENCES: {
    name: 'Short Sentences',
    patterns: ['punchy statements', 'one-line paragraphs'],
    effect: 'Increases pace and energy'
  }
};

export function identifyTactics(text) {
  const foundTactics = [];
  const lowercaseText = text.toLowerCase();
  const sentences = text.split(/[.!?]+/);
  
  // Enhanced pattern matching for various tactics
  const patterns = {
    // Hook Tactics
    PATTERN_INTERRUPT: /(stop|wait|hold on|pause|before you|don't)/i,
    CURIOSITY_GAP: /(but here's|wait|first|before|what if|the truth is|here's what)/gi,
    SHOCKING_STATISTIC: /\d+%|\d+ (million|billion|thousand)|studies show|research reveals/gi,
    CONTROVERSIAL_STATEMENT: /(wrong|lie|myth|nobody tells you|they don't want you to know)/gi,
    
    // Narrative Tactics
    OPEN_LOOP: /(but first|we'll get to that|more on that later|i'll explain|stay with me)/gi,
    STORY_ARC: /(once upon|i remember|let me tell you|story|when i was)/gi,
    FUTURE_PACING: /(imagine|picture this|envision|dream|visualize|see yourself)/gi,
    CALLBACK: /(remember when|as i mentioned|going back to|earlier)/gi,
    
    // Persuasion Tactics
    SOCIAL_PROOF: /(thousands|millions|everyone|most people|\d+\s*people|community|join)/gi,
    SCARCITY: /(limited|only \d+|running out|last chance|spots|available|closing)/gi,
    AUTHORITY: /(expert|study|research|proven|tested|science|data|years of experience)/gi,
    RECIPROCITY: /(free|gift|bonus|value|give you|share with you)/gi,
    COMMITMENT: /(agree|right\?|makes sense|you with me|obviously)/gi,
    
    // Emotional Tactics
    FEAR_APPEAL: /(mistake|wrong|fail|lose|miss out|regret|waste|risk)/gi,
    ASPIRATIONAL_IMAGERY: /(success|achieve|transform|breakthrough|finally|freedom)/gi,
    EMPATHY_BUILDING: /(i get it|i understand|been there|feel|frustrat|struggle)/gi,
    PAIN_AGITATION: /(sick of|tired of|enough|fed up|annoying|hate when)/gi,
    
    // Engagement Tactics
    DIRECT_ADDRESS: /\byou\b/gi,
    RHETORICAL_QUESTIONS: /\?(?!\s*["'])/g,
    PATTERN_VARIATION: null, // Will check sentence length variation
    MICRO_COMMITMENTS: /(try this|do this|follow|click|subscribe|comment)/gi,
    
    // Retention Tactics
    BREADCRUMBING: /(coming up|later|next|in a moment|but wait|there's more)/gi,
    VALUE_STACKING: /(plus|also|and|not only|but also|even better)/gi,
    SEGMENTATION: /(first|second|third|step \d|number \d|point \d)/gi,
    CLIFFHANGER: /(but then|suddenly|unexpected|shocking|you won't believe)/gi
  };
  
  // Check each pattern
  for (const [tactic, pattern] of Object.entries(patterns)) {
    if (pattern && pattern.test(lowercaseText)) {
      foundTactics.push(tactic);
    }
  }
  
  // Special checks for pattern variation
  if (checkPatternVariation(sentences)) {
    foundTactics.push('PATTERN_VARIATION');
  }
  
  // Check for list building
  if (checkListBuilding(text)) {
    foundTactics.push('VALUE_STACKING');
  }
  
  // Check for emotional intensity
  if (checkEmotionalIntensity(text)) {
    foundTactics.push('EMOTIONAL_INTENSITY');
  }
  
  return [...new Set(foundTactics)];
}

function checkPatternVariation(sentences) {
  const lengths = sentences.map(s => s.trim().split(' ').length);
  const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((acc, len) => acc + Math.pow(len - avgLength, 2), 0) / lengths.length;
  return variance > 50; // High variance indicates pattern variation
}

function checkListBuilding(text) {
  const listPatterns = [
    /\d\./g,
    /•/g,
    /\n-\s/g,
    /first.*second.*third/gi
  ];
  
  return listPatterns.some(pattern => pattern.test(text));
}

function checkEmotionalIntensity(text) {
  const emotionalWords = [
    'amazing', 'incredible', 'unbelievable', 'life-changing', 'revolutionary',
    'devastating', 'crushing', 'horrible', 'nightmare', 'disaster',
    'love', 'hate', 'obsessed', 'passionate', 'desperate'
  ];
  
  const wordCount = text.split(' ').length;
  const emotionalCount = emotionalWords.filter(word => 
    text.toLowerCase().includes(word)
  ).length;
  
  return (emotionalCount / wordCount) > 0.02; // More than 2% emotional words
}

export function analyzeTacticDensity(text, tactics) {
  const wordCount = text.split(' ').length;
  const tacticCount = tactics.length;
  
  return {
    totalTactics: tacticCount,
    tacticDensity: (tacticCount / wordCount * 100).toFixed(2),
    averageTacticsPerSentence: (tacticCount / text.split(/[.!?]+/).length).toFixed(2)
  };
}