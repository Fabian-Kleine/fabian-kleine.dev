"use client";
import { cn, getSimpleIconsUrl } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

interface SimpleIconsTagProps {
    name: string;
    icon: string;
    className?: string;
}

export function SimpleIconsTag({ name, icon, className }: SimpleIconsTagProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !resolvedTheme) {
        return null;
    }

    const src = getSimpleIconsUrl(icon, resolvedTheme);

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