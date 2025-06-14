import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['cdn.sanity.io', 'rosterlab.com'],
  },
};

export default nextConfig;
