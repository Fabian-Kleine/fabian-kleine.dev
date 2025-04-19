import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypeHighlight from 'rehype-highlight';
import { rehypeGithubAlerts } from 'rehype-github-alerts'

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
    rehypePlugins: [rehypeHighlight, rehypeGithubAlerts],
  },
});

export default withMDX(nextConfig);
