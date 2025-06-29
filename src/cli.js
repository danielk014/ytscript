#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { PitchArchitect } from './PitchArchitect.js';
import { ScriptGenerator } from './scriptGenerator.js';

console.log(chalk.blue.bold(`
╔═══════════════════════════════════════╗
║       PITCHARCHITECT v1.0.0           ║
║   YouTube Script Generator System      ║
╚═══════════════════════════════════════╝
`));

program
  .version('1.0.0')
  .description('AI-powered YouTube script generator that analyzes reference scripts')
  .option('-f, --file <path>', 'Load inputs from JSON file')
  .option('-o, --output <path>', 'Save generated script to file')
  .option('-i, --interactive', 'Run in interactive mode (default)', true)
  .parse(process.argv);

const options = program.opts();

async function getInputs() {
  if (options.file) {
    try {
      const data = await fs.readFile(options.file, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(chalk.red('Error reading input file:'), error.message);
      process.exit(1);
    }
  }

  console.log(chalk.yellow('\n📝 Let\'s gather your inputs...\n'));

  const questions = [
    {
      type: 'editor',
      name: 'script1',
      message: 'Paste Reference Script #1 (press enter to open editor):',
      validate: (input) => input.trim() !== '' || 'Script cannot be empty'
    },
    {
      type: 'editor',
      name: 'script2',
      message: 'Paste Reference Script #2 (press enter to open editor):',
      validate: (input) => input.trim() !== '' || 'Script cannot be empty'
    },
    {
      type: 'input',
      name: 'topic',
      message: 'What\'s the topic for your new video?',
      validate: (input) => input.trim() !== '' || 'Topic cannot be empty'
    },
    {
      type: 'input',
      name: 'targetLength',
      message: 'Target length (words or "X min" format):',
      default: '1400 words',
      filter: (input) => {
        if (input.includes('min')) {
          const minutes = parseInt(input);
          return minutes * 150; // Rough estimate: 150 words per minute
        }
        return parseInt(input) || 1400;
      }
    },
    {
      type: 'input',
      name: 'callToAction',
      message: 'What should viewers do? (your call to action):',
      default: 'Subscribe and hit the notification bell'
    }
  ];

  return await inquirer.prompt(questions);
}

async function runPitchArchitect(inputs) {
  const architect = new PitchArchitect();
  
  console.log(chalk.cyan('\n🔍 Analyzing reference scripts...\n'));
  
  // Step 1: Analyze both scripts
  const analysis1 = architect.analyzeScript(inputs.script1, 1);
  const analysis2 = architect.analyzeScript(inputs.script2, 2);
  const analyses = [analysis1, analysis2];
  
  // Display analysis
  console.log(architect.formatAnalysis(analyses));
  
  // Step 2: Synthesize tactics
  console.log(chalk.cyan('🔧 Synthesizing tactics...\n'));
  const synthesizedTactics = architect.synthesizeTactics(analyses);
  console.log(architect.formatSynthesis(synthesizedTactics));
  
  // Step 3: Create blueprint
  console.log(chalk.cyan('📋 Creating script blueprint...\n'));
  const blueprint = architect.createBlueprint(inputs.topic, inputs.targetLength, synthesizedTactics);
  console.log(architect.formatBlueprint(blueprint));
  
  // Step 4: Generate script
  console.log(chalk.cyan('✍️  Generating your script...\n'));
  
  const generator = new ScriptGenerator(inputs.topic, inputs.targetLength, inputs.callToAction);
  generator.setTactics(synthesizedTactics);
  const script = generator.generateFullScript(blueprint);
  
  console.log(chalk.green('## 📝 Generated Script\n'));
  console.log('```');
  console.log(script);
  console.log('```\n');
  
  // Step 5: Map tactics
  console.log(chalk.cyan('🗺️  Mapping tactics to script...\n'));
  const tacticMap = architect.mapTacticsToScript(script, synthesizedTactics);
  console.log(architect.formatTacticMapping(tacticMap));
  
  // Step 6: Suggest revisions
  console.log(chalk.cyan('\n💡 Suggested Revisions\n'));
  const suggestions = architect.suggestRevisions(script, blueprint);
  suggestions.forEach(suggestion => console.log(suggestion));
  
  // Save output if requested
  if (options.output) {
    const output = {
      inputs,
      analyses,
      synthesizedTactics: Array.from(synthesizedTactics.entries()),
      blueprint,
      script,
      tacticMap,
      suggestions
    };
    
    await fs.writeFile(options.output, JSON.stringify(output, null, 2));
    console.log(chalk.green(`\n✅ Output saved to ${options.output}`));
  }
  
  // Offer to save just the script
  const { saveScript } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'saveScript',
      message: 'Would you like to save just the script to a file?',
      default: true
    }
  ]);
  
  if (saveScript) {
    const { filename } = await inquirer.prompt([
      {
        type: 'input',
        name: 'filename',
        message: 'Filename for the script:',
        default: `${inputs.topic.replace(/\s+/g, '-').toLowerCase()}-script.md`
      }
    ]);
    
    await fs.writeFile(filename, script);
    console.log(chalk.green(`✅ Script saved to ${filename}`));
  }
}

async function main() {
  try {
    const inputs = await getInputs();
    await runPitchArchitect(inputs);
    
    console.log(chalk.blue('\n🎉 Script generation complete!'));
    console.log(chalk.yellow('Remember to adapt the script to your unique voice and style.\n'));
    
  } catch (error) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

// Run the CLI
main().catch(console.error);