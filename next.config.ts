import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Cache Components — Next.js 16 default for new apps.
    cacheComponents: true,
  },
};

export default config;
