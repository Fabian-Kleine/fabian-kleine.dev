import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.simpleicons.org/**")],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    // String paths are serializable, required for Turbopack compatibility.
    // rehype-github-alerts uses a named export so we proxy it via a wrapper.
    rehypePlugins: [
      'rehype-highlight',
      path.resolve('./lib/rehype-github-alerts-plugin.mjs'),
    ],
  },
});

export default withMDX(nextConfig);
