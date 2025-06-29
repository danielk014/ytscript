import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 PitchArchitect Diagnostic Tool\n');

// Check Node version
console.log(`✓ Node.js version: ${process.version}`);

// Check if .env exists
if (fs.existsSync('.env')) {
    console.log('✓ .env file exists');
    const envContent = fs.readFileSync('.env', 'utf8');
    if (envContent.includes('CLAUDE_API_KEY')) {
        console.log('✓ Claude API key is configured');
    } else {
        console.log('⚠ Claude API key not found in .env');
    }
} else {
    console.log('⚠ .env file not found');
}

// Check required files
const requiredFiles = [
    'package.json',
    'src/server.js',
    'public/index.html',
    'public/script.js',
    'public/style.css'
];

console.log('\nChecking required files:');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✓ ${file} exists`);
    } else {
        console.log(`✗ ${file} MISSING!`);
    }
});

// Check if node_modules exists
if (fs.existsSync('node_modules')) {
    console.log('\n✓ node_modules directory exists');
    
    // Check key dependencies
    const deps = ['express', '@anthropic-ai/sdk', 'dotenv'];
    deps.forEach(dep => {
        if (fs.existsSync(path.join('node_modules', dep))) {
            console.log(`  ✓ ${dep} installed`);
        } else {
            console.log(`  ✗ ${dep} NOT INSTALLED!`);
        }
    });
} else {
    console.log('\n✗ node_modules directory NOT FOUND! Run: npm install');
}

console.log('\n📋 Next Steps:');
console.log('1. If any files are missing, the project structure may be corrupted');
console.log('2. If node_modules is missing or dependencies are not installed, run: npm install');
console.log('3. To start the server, run: npm run web');
console.log('4. Open http://localhost:3000 in your browser');
console.log('\nIf the page loads but buttons don\'t work, check browser console for errors (F12)');