import { execSync } from 'child_process';
import { existsSync, readdirSync, rmSync } from 'fs';

console.log('🚀 Starting build process...');

// Check if dist directory exists
if (existsSync('dist')) {
  console.log('🗑️  Removing existing dist directory...');
  rmSync('dist', { recursive: true, force: true });
}

console.log('🔨 Running build...');
try {
  // Run the build command directly
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Check if dist was created
  if (existsSync('dist')) {
    console.log('✅ Build successful! Contents of dist:');
    console.log(readdirSync('dist'));
  } else {
    console.error('❌ Build completed but dist directory not found!');
    console.log('📂 Current directory contents:', readdirSync('.'));
  }
} catch (error) {
  console.error('❌ Build failed:', error.message);
}
