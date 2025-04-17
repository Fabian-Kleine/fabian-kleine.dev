"use client";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface SimpleIconsCloudProps {
    icons: string[];
    className?: string;
}

export function SimpleIconsCloud({ icons, className }: SimpleIconsCloudProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const images = icons.map(
        (slug) => {
            let color = slug;
            if ((slug == "github" || slug == "shadcnui" || slug == "next.js" || slug == "vercel" || slug == "express") && resolvedTheme === "dark") {
                color = "ffffff";
            }
            return `https://cdn.simpleicons.org/${slug}/${color}`;
        },
    );

    return (
        <IconCloud className={className} images={images} />
    );
}