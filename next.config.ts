import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable automatic CSP nonce generation
  poweredByHeader: false,
  
  // If you're using Next.js 15+, add this to prevent automatic nonce injection
  ...(process.env.NODE_ENV === 'development' && {
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
};

export default nextConfig;