import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optimize for Vercel deployment
  output: 'standalone',
  // Suppress hydration warnings in development for browser extension compatibility
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Experimental features to improve performance
  experimental: {
    // optimizeCss: true, // Disabled due to critters dependency issues
    // Disable server components for CSS processing
    serverComponentsExternalPackages: ['tailwindcss', 'postcss', 'autoprefixer'],
  },
  // External packages for server components
  serverExternalPackages: [
    '@nodelib/fs.scandir', 
    '@nodelib/fs.stat', 
    'fast-glob',
    'fs',
    'lightningcss',
    'perf_hooks',
    'module',
    'tailwindcss',
    'postcss',
    'autoprefixer',
    'jiti',
    '@alloc/quick-lru',
    'is-glob'
  ],
  // Image optimization for Vercel
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Output file tracing root to fix workspace warning
  outputFileTracingRoot: __dirname,
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  // Webpack configuration to handle Node.js modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        buffer: false,
        util: false,
        url: false,
        assert: false,
        http: false,
        https: false,
        zlib: false,
        querystring: false,
        perf_hooks: false,
        lightningcss: false,
      };
      
      // Exclude problematic modules from client bundle
      config.externals = config.externals || [];
      config.externals.push({
        'fs': 'commonjs fs',
        'module': 'commonjs module',
        'path': 'commonjs path',
        'jiti': 'commonjs jiti',
        '@alloc/quick-lru': 'commonjs @alloc/quick-lru',
        'is-glob': 'commonjs is-glob',
        'fast-glob': 'commonjs fast-glob',
      });
    }
    
    // Handle Tailwind CSS module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    return config;
  },
};

export default nextConfig;
