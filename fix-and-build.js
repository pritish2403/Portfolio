const fs = require('fs');
const { execSync } = require('child_process');

// Copy the fixed package.json over the broken one
try {
  const fixedPackage = fs.readFileSync('package-fixed.json', 'utf8');
  fs.writeFileSync('package.json', fixedPackage);
  console.log('✅ Successfully replaced package.json');
  
  // Install dependencies
  console.log('🔄 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Run build
  console.log('🚀 Starting build process...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if dist directory exists
  if (fs.existsSync('dist')) {
    console.log('✅ Build successful! Check the dist/ directory.');
  } else {
    console.error('❌ Build completed but dist/ directory not found.');
  }
} catch (error) {
  console.error('❌ Error during build process:', error.message);
}
