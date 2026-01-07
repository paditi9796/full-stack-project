const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const outputDir = path.join(__dirname, '..', 'dist');
const zipFileName = 'backend-api.zip';

console.log('Starting backend packaging process...');

// Create dist directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Files and directories to include
const filesToInclude = [
  'src',
  'package.json',
  '.env.example',
  'README.md',
];

// Create a temporary directory for packaging
const tempDir = path.join(__dirname, '..', 'temp-package');
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// Copy files to temp directory
console.log('Copying files...');
filesToInclude.forEach(item => {
  const sourcePath = path.join(__dirname, '..', item);
  const destPath = path.join(tempDir, item);
  
  if (fs.existsSync(sourcePath)) {
    if (fs.lstatSync(sourcePath).isDirectory()) {
      fs.cpSync(sourcePath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
    console.log(`  ✓ Copied ${item}`);
  }
});

// Create zip file
console.log('Creating zip file...');
const zipFilePath = path.join(outputDir, zipFileName);

try {
  // Remove old zip if exists
  if (fs.existsSync(zipFilePath)) {
    fs.unlinkSync(zipFilePath);
  }

  // Create zip using native command
  execSync(`cd ${tempDir} && zip -r ${zipFilePath} .`, { stdio: 'inherit' });
  
  console.log(`\n✓ Package created successfully: ${zipFilePath}`);
  
  // Get file size
  const stats = fs.statSync(zipFilePath);
  const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`  File size: ${fileSizeInMB} MB`);
  
} catch (error) {
  console.error('Error creating zip file:', error.message);
  process.exit(1);
} finally {
  // Clean up temp directory
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

console.log('\nPackaging complete!');
console.log(`\nTo deploy:\n  1. Extract ${zipFileName}\n  2. Run: npm install\n  3. Set up .env file\n  4. Run: npm start`);
