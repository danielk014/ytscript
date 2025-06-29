export const SCRIPT_TEMPLATES = {
  hooks: {
    patternInterrupt: [
      "Stop. Whatever you're doing right now, stop.",
      "Wait. Before you {action}, you need to hear this.",
      "I was wrong about {topic}. Dead wrong.",
      "Nobody talks about this, but {shocking_fact}.",
      "Here's what they don't tell you about {topic}."
    ],
    
    curiosityGap: [
      "The {topic} secret that {result} - but nobody's talking about it.",
      "What if I told you that {percentage}% of people doing {topic} are making the same mistake?",
      "There's a reason why {successful_group} can {achievement} while others can't.",
      "I discovered something about {topic} that changed everything.",
      "The real reason you're struggling with {topic} isn't what you think."
    ],
    
    shockingStatistic: [
      "{number}% of {group} fail at {topic}. Here's why.",
      "Studies show that {statistic}. But here's what they missed.",
      "Last year, {number} people tried {topic}. Only {small_number} succeeded.",
      "Scientists just discovered that {finding}. It changes everything.",
      "New research reveals {shocking_finding} about {topic}."
    ]
  },
  
  transitions: {
    toStory: [
      "Let me tell you a quick story...",
      "Here's what happened when I tried this:",
      "I'll never forget the day I discovered this.",
      "Picture this scenario:",
      "This reminds me of something that happened last {time_period}."
    ],
    
    toMainPoint: [
      "But here's the thing:",
      "Now, pay attention to this part:",
      "This is where it gets interesting:",
      "Here's what most people miss:",
      "The key insight is this:"
    ],
    
    toAction: [
      "So here's what you need to do:",
      "Your next step is simple:",
      "Ready to take action? Here's how:",
      "Let's put this into practice:",
      "Time to make this happen:"
    ]
  },
  
  emotionalTriggers: {
    pain: [
      "I know how frustrating it is when {problem}.",
      "You're tired of {struggle}, aren't you?",
      "It's exhausting to {repeated_failure}.",
      "How many times have you {failed_attempt}?",
      "The worst part about {topic} is {pain_point}."
    ],
    
    aspiration: [
      "Imagine waking up tomorrow and {positive_outcome}.",
      "Picture yourself {achieving_goal}.",
      "What would it feel like to finally {success}?",
      "Think about where you'll be {time_frame} from now.",
      "Your future self will thank you for {action}."
    ],
    
    urgency: [
      "But here's the catch - {limitation}.",
      "Time is running out. {deadline}.",
      "Every day you wait, {negative_consequence}.",
      "The window is closing on {opportunity}.",
      "This won't last forever. {scarcity}."
    ]
  },
  
  proofElements: {
    authority: [
      "After {years} years studying {topic}, I discovered...",
      "Top {experts} in {field} all agree on one thing:",
      "Research from {institution} proves that...",
      "I've helped {number} people {achievement}, and here's what works:",
      "The data is clear: {finding}."
    ],
    
    socialProof: [
      "Join {number} others who've already {achievement}.",
      "People just like you are {success_action} right now.",
      "Here's what {name} said after trying this:",
      "Our community of {number} {group} can't be wrong.",
      "Even {skeptical_group} are starting to {action}."
    ],
    
    results: [
      "In just {timeframe}, you'll {result}.",
      "Users typically see {improvement} within {period}.",
      "The average person {achieves} after {timeline}.",
      "{percentage}% improvement is just the beginning.",
      "Expect to {benefit} starting from day one."
    ]
  },
  
  callsToAction: {
    soft: [
      "Try this for yourself and see what happens.",
      "Give it a shot - what do you have to lose?",
      "Start with just {small_action} today.",
      "Take the first step by {action}.",
      "Begin your journey with {simple_start}."
    ],
    
    medium: [
      "Click the link below to {benefit}.",
      "Download the free {resource} to get started.",
      "Join our community and {outcome}.",
      "Sign up now and {reward}.",
      "Get instant access to {offer}."
    ],
    
    strong: [
      "👉 {action} RIGHT NOW before {consequence}.",
      "👉 This is your moment. {strong_action}.",
      "👉 Don't wait another day. {urgent_action}.",
      "👉 Secure your spot immediately - {limitation}.",
      "👉 Take action NOW or {loss}."
    ]
  },
  
  retention: {
    breadcrumbs: [
      "In a moment, I'll show you exactly how to {benefit}.",
      "Stay with me, because the best part is coming up.",
      "What I'm about to share will {outcome}.",
      "But first, you need to understand {concept}.",
      "The secret I'm about to reveal will {transformation}."
    ],
    
    miniCommitments: [
      "Can we agree that {obvious_truth}?",
      "You'd like to {desirable_outcome}, right?",
      "Makes sense so far?",
      "Are you starting to see the pattern here?",
      "This is beginning to click, isn't it?"
    ],
    
    loops: [
      "Remember that {earlier_point}? Here's why it matters.",
      "Going back to what I mentioned earlier...",
      "This connects to {previous_concept} perfectly.",
      "Now you understand why {callback} is so important.",
      "See how this ties into {earlier_reference}?"
    ]
  }
};

export function fillTemplate(template, variables) {
  let filled = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{${key}}`, 'g');
    filled = filled.replace(regex, value);
  });
  
  // Remove any remaining placeholders
  filled = filled.replace(/{[^}]+}/g, '[specify]');
  
  return filled;
}

export function selectRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateSectionContent(sectionType, topic, variables = {}) {
  const defaultVariables = {
    topic,
    action: `learn ${topic}`,
    result: 'transforms everything',
    percentage: '87',
    number: '10,000',
    small_number: '137',
    group: 'people',
    achievement: `master ${topic}`,
    ...variables
  };
  
  switch (sectionType) {
    case 'hook':
      const hookType = selectRandom(['patternInterrupt', 'curiosityGap', 'shockingStatistic']);
      const hookTemplate = selectRandom(SCRIPT_TEMPLATES.hooks[hookType]);
      return fillTemplate(hookTemplate, defaultVariables);
      
    case 'problem':
      const painTemplate = selectRandom(SCRIPT_TEMPLATES.emotionalTriggers.pain);
      return fillTemplate(painTemplate, defaultVariables);
      
    case 'solution':
      const authorityTemplate = selectRandom(SCRIPT_TEMPLATES.proofElements.authority);
      const transitionTemplate = selectRandom(SCRIPT_TEMPLATES.transitions.toMainPoint);
      return `${fillTemplate(authorityTemplate, defaultVariables)}\n\n${fillTemplate(transitionTemplate, defaultVariables)}`;
      
    case 'proof':
      const socialTemplate = selectRandom(SCRIPT_TEMPLATES.proofElements.socialProof);
      const resultTemplate = selectRandom(SCRIPT_TEMPLATES.proofElements.results);
      return `${fillTemplate(socialTemplate, defaultVariables)}\n\n${fillTemplate(resultTemplate, defaultVariables)}`;
      
    case 'cta':
      const urgencyTemplate = selectRandom(SCRIPT_TEMPLATES.emotionalTriggers.urgency);
      const ctaTemplate = selectRandom(SCRIPT_TEMPLATES.callsToAction.strong);
      return `${fillTemplate(urgencyTemplate, defaultVariables)}\n\n${fillTemplate(ctaTemplate, defaultVariables)}`;
      
    default:
      return `[${sectionType} content for ${topic}]`;
  }
}