# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PitchArchitect is a Node.js CLI tool that analyzes YouTube scripts to extract psychological tactics and generate new scripts. It uses ES6 modules and has a modular architecture.

## Key Commands

```bash
# Install dependencies
npm install

# Run the CLI interactively
npm start

# Run tests
npm test

# Run CLI with file input
node src/cli.js -f examples/test-input.json

# Make CLI globally available
npm link
```

## Architecture

The codebase is organized into distinct modules:

- **src/PitchArchitect.js**: Core analysis engine that extracts tactics from scripts
- **src/tactics.js**: Database of psychological tactics and pattern matching logic
- **src/scriptGenerator.js**: Generates new scripts using analyzed tactics
- **src/templates.js**: Template system for dynamic content generation
- **src/cli.js**: Commander-based CLI interface with inquirer prompts

## Development Workflow

1. The main entry point is `src/cli.js` which handles user interaction
2. PitchArchitect class analyzes reference scripts to extract tactics
3. ScriptGenerator uses the extracted tactics and templates to create new content
4. All tactics are defined in `tactics.js` with pattern matching rules
5. Templates in `templates.js` provide variety in generated content

## Testing Approach

- Run `npm test` to execute the test suite in `src/test.js`
- Tests use example scripts from `examples/` directory
- Test output is saved to `examples/test-output-*.md/json`

## Important Patterns

- Uses ES6 modules (type: "module" in package.json)
- Async/await for file operations
- Chalk for colored console output
- Pattern matching for tactic identification
- Template-based content generation with variable substitution