import { PitchArchitect } from './PitchArchitect.js';
import { ScriptGenerator } from './scriptGenerator.js';
import chalk from 'chalk';
import fs from 'fs/promises';

async function runTest() {
  console.log(chalk.blue.bold('\n🧪 Testing PitchArchitect System\n'));
  
  try {
    // Load test data
    const testData = JSON.parse(await fs.readFile('./examples/test-input.json', 'utf-8'));
    
    console.log(chalk.green('✓ Test data loaded successfully'));
    
    // Initialize PitchArchitect
    const architect = new PitchArchitect();
    
    // Test 1: Script Analysis
    console.log(chalk.yellow('\n📝 Test 1: Analyzing Scripts...'));
    const analysis1 = architect.analyzeScript(testData.script1, 1);
    const analysis2 = architect.analyzeScript(testData.script2, 2);
    
    console.log(chalk.green('✓ Script analysis completed'));
    console.log(`  - Script 1 tactics found: ${analysis1.psychologicalTactics.length}`);
    console.log(`  - Script 2 tactics found: ${analysis2.psychologicalTactics.length}`);
    
    // Test 2: Tactic Synthesis
    console.log(chalk.yellow('\n🔧 Test 2: Synthesizing Tactics...'));
    const synthesized = architect.synthesizeTactics([analysis1, analysis2]);
    
    console.log(chalk.green('✓ Tactic synthesis completed'));
    console.log(`  - Total unique tactics: ${synthesized.size}`);
    
    // Test 3: Blueprint Creation
    console.log(chalk.yellow('\n📋 Test 3: Creating Blueprint...'));
    const blueprint = architect.createBlueprint(testData.topic, testData.targetLength, synthesized);
    
    console.log(chalk.green('✓ Blueprint created'));
    console.log(`  - Sections: ${blueprint.length}`);
    console.log(`  - Total word count: ${blueprint.reduce((sum, s) => sum + s.wordCount, 0)}`);
    
    // Test 4: Script Generation
    console.log(chalk.yellow('\n✍️  Test 4: Generating Script...'));
    const generator = new ScriptGenerator(testData.topic, testData.targetLength, testData.callToAction);
    generator.setTactics(synthesized);
    const script = generator.generateFullScript(blueprint);
    
    console.log(chalk.green('✓ Script generated'));
    console.log(`  - Word count: ${script.split(' ').length}`);
    console.log(`  - Paragraphs: ${script.split('\n\n').length}`);
    
    // Test 5: Tactic Mapping
    console.log(chalk.yellow('\n🗺️  Test 5: Mapping Tactics...'));
    const mapping = architect.mapTacticsToScript(script, synthesized);
    
    console.log(chalk.green('✓ Tactic mapping completed'));
    console.log(`  - Mapped tactics: ${mapping.length}`);
    
    // Save test output
    console.log(chalk.yellow('\n💾 Saving test output...'));
    await fs.writeFile('./examples/test-output-script.md', script);
    await fs.writeFile('./examples/test-output-analysis.json', JSON.stringify({
      analyses: [analysis1, analysis2],
      synthesizedTactics: Array.from(synthesized.entries()),
      blueprint,
      mapping
    }, null, 2));
    
    console.log(chalk.green('✓ Test output saved to examples/ directory'));
    
    // Display sample of generated script
    console.log(chalk.blue('\n📄 Script Preview:\n'));
    console.log(script.split('\n').slice(0, 10).join('\n') + '\n...\n');
    
    console.log(chalk.green.bold('\n✅ All tests passed successfully!\n'));
    
  } catch (error) {
    console.error(chalk.red('\n❌ Test failed:'), error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run tests
runTest().catch(console.error);