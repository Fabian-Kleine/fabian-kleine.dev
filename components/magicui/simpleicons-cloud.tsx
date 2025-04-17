"use client";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { getSimpleIconsUrl } from "@/lib/utils";
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

    if (!mounted || !resolvedTheme) {
        return null;
    }

    const images = icons.map(
        (slug) => {
            return getSimpleIconsUrl(slug, resolvedTheme);
        },
    );

    return (
        <IconCloud className={className} images={images} />
    );
}