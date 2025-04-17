import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypeHighlight from 'rehype-highlight';

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
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
