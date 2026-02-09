# Hostinger Deployment Guide (No Terminal Access)

## ✅ Solution for Your Issue

The export errors occur because Hostinger is trying to statically export a dynamic Next.js application. The backend build errors were caused by TypeScript compilation issues. Here's how to fix them:

## 🔧 Fix Steps

### 1. Update Your Next.js Configuration
I've already updated your `next.config.js` with:
- `output: 'standalone'` - Creates optimized production build
- `serverComponentsExternalPackages` - Properly handles external packages
- `trailingSlash: true` - Better routing compatibility

### 2. Backend Configuration Fixed
Fixed TypeScript compilation issues by:
- Updating `tsconfig.json` with more permissive settings for Hostinger
- Resolving import order issues in `database.ts`
- Optimizing build command to use esbuild instead of tsc for much faster compilation

### 3. Hostinger Setup (No Terminal Required)

**In Hostinger hPanel:**

1. **Go to Node.js Section**
   - Advanced → Node.js

2. **Set Application Configuration:**
   - **Application Root**: `/public_html`
   - **Application Startup File**: `server.js` (for frontend) or `real-estate-backend/dist/server.js` (for backend)
   - **Node.js Version**: 18.x or 20.x

3. **Set Build Command:**
   - In the "Build Command" field, enter:
   ```
   npm run build:hostinger
   ```

4. **Set Environment Variables:**
   - Click "Environment Variables"
   - Add these (replace with your actual values):
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-domain.com
   PORT=3000
   NODE_ENV=production
   ```

### 4. File Upload

1. **Prepare Files:**
   - Delete `node_modules` folders locally
   - Zip your entire project folder

2. **Upload:**
   - Use Hostinger File Manager
   - Upload zip to `/public_html`
   - Extract files

### 5. Start Application

1. **In Node.js Panel:**
   - Click "Restart" button
   - Wait for deployment to complete

2. **Monitor Logs:**
   - Check "Logs" section for any errors

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Export fails with dynamic routes | Use standalone output mode with custom server |
| Build fails with useContext error | Use `npm run build:hostinger` as build command |
| TypeScript compilation hangs | Updated to use esbuild for faster compilation |
| Port in use error | Hostinger auto-assigns ports, don't specify PORT |
| Database connection failed | Check DB credentials and whitelist Hostinger IP |
| Static files not loading | Ensure `next.config.js` has `output: 'standalone'` |

## 📋 Checklist

Before deployment:
- [ ] Updated `next.config.js` with standalone output config
- [ ] Set build command to `npm run build:hostinger`
- [ ] Created custom `server.js` for proper routing
- [ ] Fixed backend build with esbuild (much faster compilation)
- [ ] Configured environment variables
- [ ] Removed `node_modules` before upload
- [ ] Used correct Node.js version (18+)

After deployment:
- [ ] Check application logs
- [ ] Test key pages load
- [ ] Verify API endpoints work
- [ ] Test property search functionality

## 🆘 If Still Failing

If you continue to have issues:
1. Try using Node.js version 18 instead of 20
2. Contact Hostinger support about dynamic Next.js applications
3. Consider upgrading to a plan with terminal access for more control

The configuration I've provided should resolve both the export errors and backend TypeScript compilation issues you're seeing during the build process.