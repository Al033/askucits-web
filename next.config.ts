import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // Cache Components is the cleaner Next 16 model for bigger apps; this
  // two-page editorial site uses the legacy `revalidate` segment + fetch
  // options, which is plenty. Opt in when the content model grows.
};

export default config;
