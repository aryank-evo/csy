// Fast build script for Hostinger deployment
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting fast build...');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('📁 Created dist directory');
}

// Copy necessary files
const copyFile = (src, dest) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`📄 Copied ${src} -> ${dest}`);
  }
};

// Copy the server.ts file directly (we'll run it with ts-node in production)
// Actually, let's copy all src files to dist for a direct transpile
const srcDir = path.join(__dirname, 'src');
const copyRecursive = (src, dest) => {
  if (!fs.existsSync(src)) return;
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyRecursive(srcPath, destPath);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.js'))) {
      if (!fs.existsSync(destPath) || fs.statSync(srcPath).mtime > fs.statSync(destPath).mtime) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`📄 Copied ${srcPath} -> ${destPath}`);
      }
    }
  }
};

copyRecursive(srcDir, distDir);

// Also copy config files if they exist
copyFile(path.join(__dirname, 'tsconfig.json'), path.join(distDir, 'tsconfig.json'));

console.log('✅ Fast build completed!');