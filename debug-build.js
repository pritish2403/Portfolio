const { execSync } = require('child_process');
const fs = require('fs');

console.log('Starting build process...');

// Check if dist directory exists
if (fs.existsSync('dist')) {
  console.log('Removing existing dist directory...');
  fs.rmSync('dist', { recursive: true, force: true });
}

console.log('Running build...');
try {
  // Run the build command
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if dist was created
  if (fs.existsSync('dist')) {
    console.log('✅ Build successful! Contents of dist:');
    console.log(fs.readdirSync('dist'));
  } else {
    console.error('❌ Build completed but dist directory not found!');
    console.log('Current directory contents:', fs.readdirSync('.'));
  }
} catch (error) {
  console.error('❌ Build failed:', error.message);
}
