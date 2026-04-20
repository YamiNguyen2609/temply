import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',     // cho phép mọi domain https
      },
    ],
    unoptimized: true,   // tắt Image Optimization
  },
};

export default nextConfig;
