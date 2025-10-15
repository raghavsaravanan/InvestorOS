/**
 * Next.js Configuration for InvestorOS Frontend
 * 
 * This file configures Next.js build settings and runtime options for the trading platform.
 * Provides optimization settings, build configurations, and development options.
 * 
 * @author InvestorOS Development Team
 * @version 1.0.0
 */

import type { NextConfig } from "next";

/**
 * Next.js Configuration Object
 * 
 * Defines build settings, optimization options, and runtime configurations
 * for the InvestorOS frontend application.
 */
const nextConfig: NextConfig = {
  /* Configuration options for build optimization and runtime behavior */
  experimental: {
    // Enable experimental features for enhanced performance
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Additional configuration options can be added here as needed
};

export default nextConfig;
