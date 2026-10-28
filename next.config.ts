import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const nextConfig: NextConfig = {
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

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
