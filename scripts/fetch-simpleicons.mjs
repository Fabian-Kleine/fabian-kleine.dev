// Downloads every SimpleIcons brand icon referenced in config.ts and projects/**/*.mdx to public/icons/tech,
// so the site never loads icons from the SimpleIcons CDN at runtime (GDPR: no third-party requests without consent).
// Run `pnpm icons` after adding a new tech.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "icons", "tech");

/** monochrome black brands are recolored so they show on the dark theme */
const white = ["github", "shadcnui", "next.js", "vercel", "express", "expo", "prisma"];

const sources = [
    path.join(root, "config.ts"),
    // projects/<locale>/<slug>.mdx
    ...(await readdir(path.join(root, "projects"), { recursive: true }))
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => path.join(root, "projects", file)),
];

const slugs = new Set();
for (const file of sources) {
    const content = await readFile(file, "utf8");
    for (const [, slug] of content.matchAll(/name:\s*["'][^"']+["'],\s*icon:\s*["']([^"']+)["']/g)) {
        slugs.add(slug.toLowerCase());
    }
}

await mkdir(outDir, { recursive: true });

let failed = 0;
for (const slug of [...slugs].sort()) {
    const res = await fetch(`https://cdn.simpleicons.org/${slug}${white.includes(slug) ? "/ffffff" : ""}`);
    if (!res.ok) {
        console.error(`✗ ${slug} (${res.status})`);
        failed++;
        continue;
    }
    await writeFile(path.join(outDir, `${slug}.svg`), await res.text());
    console.log(`✓ ${slug}`);
}

if (failed) process.exitCode = 1;
