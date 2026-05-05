# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # ESLint
```

No test suite is configured.

## MCP

A shadcn MCP server is configured in [.mcp.json](.mcp.json). It exposes shadcn component operations (add, diff, list, etc.) directly to Claude Code. Run `pnpm dlx shadcn@latest mcp` to start it manually if needed.

## Architecture

Personal portfolio site built with **Next.js 15 App Router**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **MDX** for project content.

### Content Management

Projects are MDX files in [projects/](projects/) with frontmatter (img, title, description, bullets, demo, github, tech stack). Which projects appear on the site and in which sections is controlled entirely by [config.ts](config.ts) — `projectSlugs` lists all projects, `featuredProjectSlugs` controls the homepage feature grid. No code changes needed to add/remove projects from display.

`config.ts` also defines the two tech stack marquees and the tech cloud shown on the homepage.

### Key Directories

- [app/](app/) — App Router pages and API routes. `app/projects/[slug]` renders MDX project pages dynamically.
- [components/](components/) — Split into `ui/` (Shadcn base components), `magicui/` (typing animation, blur fade, bento grid), `aceternityui/` (3D marquee), `home/` (homepage sections), and root-level shared components.
- [lib/](lib/) — Utility helpers.
- [hooks/](hooks/) — Custom React hooks (currently `useCookie` for cookie consent).
- [projects/](projects/) — MDX project content files.

### Contact Form

`app/api/contact/route.ts` proxies form submissions to an external email service via the `PROXY_URL` environment variable. The dialog state (open/closed) is managed by Zustand in `components/contact-dialog.tsx`.

### MDX Setup

MDX is configured in [next.config.ts](next.config.ts) with rehype plugins for syntax highlighting and GitHub-style alerts. Custom component mappings (styled typography, images) live in [mdx-components.tsx](mdx-components.tsx).

### Theming

Dark/light mode via `next-themes`. CSS variables drive Tailwind theming. Path alias `@/*` maps to the repo root.

### Icons

Lucide React for UI icons. Brand/tech icons are loaded from the SimpleIcons CDN — not bundled locally.
