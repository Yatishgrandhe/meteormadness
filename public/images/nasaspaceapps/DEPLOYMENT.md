# Deployment Guide - Meteor Madness

## Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- NASA API key (optional, for enhanced functionality)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# NASA API Configuration
NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Meteor Madness

# Environment
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1

# API Endpoints
NEXT_PUBLIC_NASA_BASE_URL=https://api.nasa.gov
NEXT_PUBLIC_NEO_API_URL=https://api.nasa.gov/neo/rest/v1
NEXT_PUBLIC_COMETS_API_URL=https://api.nasa.gov/neo/rest/v1/neo
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm run start
```

## Deployment to Vercel

1. Connect your GitHub repository to Vercel
2. The `vercel.json` configuration will automatically handle:
   - Node.js version (18.x)
   - Build commands
   - API routes with proper timeouts
   - CORS headers
   - Security headers
   - Redirects

## API Routes

- `/api/neo` - Near-Earth Object data
- `/api/comets` - Comet data

Both routes have a 30-second timeout and 1GB memory allocation.

## Performance Optimization

- Turbopack disabled for production builds
- Webpack fallbacks for Node.js modules
- Image optimization enabled
- Static file serving optimized

## Security Features

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-XSS-Protection: 1; mode=block
- CORS properly configured for API routes

## Troubleshooting

### Build Issues
- Ensure Node.js version is 18.0.0 or higher
- Clear cache: `npm run clean`
- Check TypeScript errors: `npm run type-check`

### API Issues
- Verify NASA API key is set correctly
- Check CORS headers for API routes
- Monitor function timeouts (30 seconds max)

### Performance Issues
- Disable Next.js telemetry: `NEXT_TELEMETRY_DISABLED=1`
- Use production build: `npm run build`
- Monitor memory usage on API routes