import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSimpleIconsUrl(icon: string, theme: string) {
  let color = icon
  if ((icon == "github" || icon == "shadcnui" || icon == "next.js" || icon == "vercel" || icon == "express") && theme === "dark") {
    color = "ffffff"
  }
  return `https://cdn.simpleicons.org/${icon}/${color}`
}
