# PitchArchitect 🎬

A powerful AI-powered YouTube script writer that analyzes reference scripts and generates new ones using proven psychological tactics.

## Features

- **Deep Script Analysis**: Extracts psychological tactics, narrative structures, and emotional patterns from reference scripts
- **Tactic Synthesis**: Combines the best elements from multiple scripts
- **Smart Generation**: Creates original scripts that naturally incorporate proven engagement techniques
- **Tactic Mapping**: Shows exactly where each psychological principle is applied
- **Revision Suggestions**: Provides actionable improvements for your scripts

## Installation

```bash
npm install -g pitch-architect
```

Or clone and run locally:

```bash
git clone https://github.com/yourusername/pitch-architect.git
cd pitch-architect
npm install
npm link
```

## Usage

### Interactive Mode (Default)

```bash
pitch-architect
```

Follow the prompts to:
1. Paste your two reference scripts
2. Enter your video topic
3. Set target length (words or minutes)
4. Define your call to action

### File Mode

```bash
pitch-architect -f examples/test-input.json -o output.json
```

### Input File Format

```json
{
  "script1": "Your first reference script...",
  "script2": "Your second reference script...",
  "topic": "How to learn Spanish fast",
  "targetLength": 1400,
  "callToAction": "Download my free conversation guide"
}
```

## Psychological Tactics Detected

PitchArchitect identifies and leverages 20+ psychological tactics including:

- **Hook Tactics**: Pattern Interrupt, Curiosity Gap, Shocking Statistics
- **Narrative Tactics**: Open Loops, Future Pacing, Story Arcs
- **Persuasion Tactics**: Social Proof, Scarcity, Authority, Reciprocity
- **Engagement Tactics**: Direct Address, Rhetorical Questions, Pattern Variation
- **Emotional Tactics**: Fear Appeal, Aspirational Imagery, Empathy Building
- **Retention Tactics**: Breadcrumbing, Micro Commitments, Segmentation

## How It Works

1. **Analysis Phase**: Examines reference scripts for psychological patterns
2. **Synthesis Phase**: Combines the most effective tactics from both scripts
3. **Blueprint Phase**: Creates a structured outline with tactic placement
4. **Generation Phase**: Produces an original script incorporating the tactics
5. **Mapping Phase**: Shows where each tactic appears in the final script
6. **Revision Phase**: Suggests improvements based on best practices

## Example Output Structure

```
## 📊 Deep Analysis of Reference Scripts
[Detailed breakdown of tactics found in each script]

## 🔧 Synthesis of Tactics
[Combined list of all effective tactics with explanations]

## 📋 Script Blueprint
[Section-by-section outline with timing and tactics]

## 📝 Generated Script
[Your complete, ready-to-use script]

## 🗺️ Tactic-to-Script Map
[Table showing where each tactic appears]

## 💡 Suggested Revisions
[5 actionable improvements]
```

## Script Quality Tips

- **Authenticity First**: Adapt the generated script to match your voice
- **Test Hooks**: Try multiple versions of your opening 15 seconds
- **Emotional Flow**: Ensure smooth transitions between emotional states
- **Clear CTAs**: Make your call to action specific and compelling
- **Personal Stories**: Add your own experiences to build connection

## Development

Run tests:
```bash
npm test
```

Test with example scripts:
```bash
node src/cli.js -f examples/test-input.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Ethical Considerations

- Never copy content verbatim from reference scripts
- Ensure your content provides genuine value to viewers
- Be transparent about any affiliate relationships
- Respect YouTube's community guidelines
- Focus on helping viewers, not just optimizing metrics

## License

MIT License - see LICENSE file for details

## Support

For issues and feature requests, please use the GitHub issue tracker.

---

Built with ❤️ for content creators who value both engagement and authenticity.