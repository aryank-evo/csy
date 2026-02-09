#!/bin/bash

# Hostinger Deployment Script with Error Handling
# This script builds the application with proper configurations for Hostinger

echo "🚀 Starting Hostinger deployment preparation..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf real-estate-backend/dist

# Install dependencies with legacy peer deps (important for Hostinger)
echo "📦 Installing frontend dependencies..."
npm ci --legacy-peer-deps

# Build frontend with specific configurations
echo "🏗️ Building frontend..."
NEXT_TELEMETRY_DISABLED=1 npm run build

# Check if build succeeded
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

# Build backend
echo "📦 Building backend..."
cd real-estate-backend
npm ci
npm run build

# Check if backend build succeeded
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi

cd ..

echo "✅ Build completed successfully!"
echo ""
echo "Next steps for Hostinger:"
echo "1. Upload the entire project folder (excluding node_modules)"
echo "2. In Hostinger Node.js panel:"
echo "   - Set Application Root: /public_html"
echo "   - Set Application Startup File: real-estate-backend/dist/server.js"
echo "3. Set environment variables in Hostinger panel"
echo "4. Restart the Node.js application"
