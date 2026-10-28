import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** self-hosted SimpleIcons brand icon, downloaded by `pnpm icons` (no third-party request at runtime) */
export function getSimpleIconsUrl(icon: string) {
  return `/icons/tech/${icon.toLowerCase()}.svg`
}
