import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.simpleicons.org/**")],
  },
};

export default nextConfig;
