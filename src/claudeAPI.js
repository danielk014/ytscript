import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Claude client
const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY,
});

const MODEL = process.env.CLAUDE_MODEL || 'claude-3-sonnet-20240229';

export async function analyzeWithClaude(script1, script2, topic, targetLength, callToAction) {
    if (!process.env.CLAUDE_API_KEY) {
        throw new Error('CLAUDE_API_KEY not found in environment variables. Please add it to your .env file.');
    }

    const prompt = `You are PitchArchitect, an expert YouTube script analyzer and generator. Analyze these two reference scripts and create a new script.

REFERENCE SCRIPT 1:
${script1}

REFERENCE SCRIPT 2:
${script2}

TASK: Create a new YouTube script about "${topic}" with a target length of ${targetLength} words. The call to action is: "${callToAction}"

Please provide your response in the following JSON format:
{
    "analyses": {
        "script1": {
            "hooks": ["list of opening hooks used"],
            "narrativeStructure": "description of narrative flow",
            "psychologicalTactics": [
                {
                    "name": "Tactic Name",
                    "category": "hook|narrative|persuasion|emotional|engagement|retention",
                    "example": "specific example from script",
                    "timestamp": "where it appears"
                }
            ],
            "linguisticPatterns": ["key phrases and patterns"],
            "emotionalTriggers": ["emotions targeted"]
        },
        "script2": {
            "hooks": ["list of opening hooks used"],
            "narrativeStructure": "description of narrative flow",
            "psychologicalTactics": [
                {
                    "name": "Tactic Name",
                    "category": "hook|narrative|persuasion|emotional|engagement|retention",
                    "example": "specific example from script",
                    "timestamp": "where it appears"
                }
            ],
            "linguisticPatterns": ["key phrases and patterns"],
            "emotionalTriggers": ["emotions targeted"]
        }
    },
    "synthesizedTactics": {
        "primary": ["most effective tactics to use"],
        "secondary": ["supporting tactics"],
        "combinations": ["powerful tactic combinations"]
    },
    "blueprint": [
        {
            "section": "Opening Hook",
            "timing": "0-15 seconds",
            "tactics": ["Pattern Interrupt", "Curiosity Gap"],
            "content": "specific content approach",
            "wordCount": 150
        },
        {
            "section": "Problem Introduction",
            "timing": "15-45 seconds",
            "tactics": ["Pain Point Agitation", "Social Proof"],
            "content": "specific content approach",
            "wordCount": 300
        }
    ],
    "generatedScript": "THE FULL GENERATED SCRIPT HERE",
    "tacticMapping": [
        {
            "line": "script line or section",
            "tactics": ["tactics used"],
            "explanation": "why these tactics work here"
        }
    ],
    "suggestions": [
        "Specific improvement suggestion 1",
        "Specific improvement suggestion 2",
        "Specific improvement suggestion 3"
    ]
}`;

    try {
        const response = await anthropic.messages.create({
            model: MODEL,
            max_tokens: 4000,
            temperature: 0.7,
            system: "You are an expert YouTube script analyst and writer. Always respond with valid JSON.",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        // Parse the response
        const content = response.content[0].text;
        
        // Try to extract JSON from the response
        let jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        } else {
            throw new Error('Invalid response format from Claude API');
        }
    } catch (error) {
        console.error('Claude API Error:', error);
        throw error;
    }
}

export async function improveScriptWithClaude(script, improvements, topic, callToAction) {
    if (!process.env.CLAUDE_API_KEY) {
        throw new Error('CLAUDE_API_KEY not found in environment variables. Please add it to your .env file.');
    }

    const improvementDescriptions = {
        'stronger-hook': 'Create a more powerful pattern interrupt in the opening that immediately grabs attention',
        'more-emotional': 'Add more emotional language, personal stories, and feeling-based appeals',
        'better-cta': 'Strengthen the call to action with urgency, scarcity, and clear benefits',
        'add-stories': 'Include specific examples, case studies, or personal anecdotes'
    };

    const selectedImprovements = improvements.map(imp => improvementDescriptions[imp]).join(', ');

    const prompt = `Improve this YouTube script with the following enhancements: ${selectedImprovements}

CURRENT SCRIPT:
${script}

CONTEXT:
- Topic: ${topic}
- Call to Action: ${callToAction}

Please rewrite the script with the requested improvements while maintaining the original structure and key points. Make the improvements natural and compelling.

Respond with JSON:
{
    "improvedScript": "the full improved script",
    "changesApplied": ["list of specific changes made"],
    "wordCount": number
}`;

    try {
        const response = await anthropic.messages.create({
            model: MODEL,
            max_tokens: 2000,
            temperature: 0.7,
            system: "You are an expert YouTube script writer. Always respond with valid JSON.",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        const content = response.content[0].text;
        let jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        } else {
            throw new Error('Invalid response format from Claude API');
        }
    } catch (error) {
        console.error('Claude API Error:', error);
        throw error;
    }
}