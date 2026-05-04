import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSimpleIconsUrl(icon: string, theme: string) {
  let color = icon
  if (
    (icon == "github" ||
      icon == "shadcnui" ||
      icon == "next.js" ||
      icon == "vercel" ||
      icon == "express" ||
      icon == "expo"
    )
    && theme === "dark") {
    color = "ffffff"
  }

  if (icon === "prisma") {
    color = theme === "dark" ? "ffffff" : "2D3748"
  }

  return `https://cdn.simpleicons.org/${icon}/${color}`
}
