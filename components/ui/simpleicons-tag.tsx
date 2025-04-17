"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

interface SimpleIconsTagProps {
    name: string;
    icon: string;
    className?: string;
}

export function SimpleIconsTag({ name, icon, className }: SimpleIconsTagProps) {
    const { resolvedTheme } = useTheme();
    let color = icon;
    if ((icon == "github" || icon == "shadcnui" || icon == "next.js" || icon == "vercel" || icon == "express") && resolvedTheme === "dark") {
        color = "ffffff";
    }
    const src = `https://cdn.simpleicons.org/${icon}/${color}`;

    return (
        <div className={cn("inline-flex items-center gap-2 rounded-md border font-semibold px-4 py-2 text-xs", className)}>
            <Image
                src={src}
                alt={name}
                width={20}
                height={20}
                unoptimized
            />
            {name}
        </div>
    );
}