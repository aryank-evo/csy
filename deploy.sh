#!/bin/bash

# Hostinger Deployment Script for CSY Real Estate
# This script builds and prepares the application for deployment

echo "🚀 Starting deployment preparation..."

# Build Frontend
echo "📦 Building frontend..."
cd /home/evo23/Downloads/Projects/CSY
npm ci --legacy-peer-deps
npm run build

# Build Backend
echo "📦 Building backend..."
cd /home/evo23/Downloads/Projects/CSY/real-estate-backend
npm ci
npm run build

# Run database migrations
echo "🗄️ Running database migrations..."
npm run migrate

echo "✅ Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Upload the entire project folder to Hostinger"
echo "2. Set environment variables in Hostinger panel"
echo "3. Configure the startup command"
echo "4. Start the application"
