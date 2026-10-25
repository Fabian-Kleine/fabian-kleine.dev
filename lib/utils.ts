import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** brand icon URL; monochrome black brands are recolored so they show on the dark theme */
export function getSimpleIconsUrl(icon: string) {
  const white = ["github", "shadcnui", "next.js", "vercel", "express", "expo", "prisma"]
  const color = white.includes(icon) ? "ffffff" : icon

  return `https://cdn.simpleicons.org/${icon}/${color}`
}
