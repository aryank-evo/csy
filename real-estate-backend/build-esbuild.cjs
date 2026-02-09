// Fast build script using esbuild for Hostinger deployment
const path = require('path');
const fs = require('fs');
const { build } = require('esbuild');

console.log('🚀 Starting esbuild...');

async function runBuild() {
  try {
    // Create dist directory if it doesn't exist
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Build the server file
    await build({
      entryPoints: ['./src/server.ts'],
      bundle: true,
      platform: 'node',
      outfile: './dist/server.js',
      format: 'cjs',
      minify: false, // Keep readable for debugging
      sourcemap: false, // Skip for faster build
      external: [
        // Externalize packages that don't need bundling
        'pg-native',
        'bcrypt',
        'cloudinary',
        'sequelize',
        '*.node' // native modules
      ],
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      },
      logLevel: 'info'
    });

    console.log('✅ Server bundle created successfully!');

    // Copy other source files that might be needed (like models, config, etc.)
    const srcDir = path.join(__dirname, 'src');
    const copyRecursive = (src, dest) => {
      if (!fs.existsSync(src)) return;
      
      const entries = fs.readdirSync(src, { withFileTypes: true });
      
      for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
          // Don't copy the server.ts since we're bundling it
          if (entry.name !== 'server.ts') {
            if (!fs.existsSync(destPath)) {
              fs.mkdirSync(destPath, { recursive: true });
            }
            copyRecursive(srcPath, destPath);
          }
        } else if (entry.isFile() && entry.name.endsWith('.ts')) {
          // Don't copy .ts files that were bundled, but copy others if needed
          if (!['server.ts'].includes(entry.name)) {
            // We'll copy .ts files to dist as well in case they're referenced by name
            if (!fs.existsSync(destPath)) {
              fs.copyFileSync(srcPath, destPath);
            }
          }
        }
      }
    };

    copyRecursive(srcDir, distDir);

    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

runBuild();