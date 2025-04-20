"use client";

import { cn, getSimpleIconsUrl } from "@/lib/utils";
import { Marquee } from "../magicui/marquee";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { config } from "@/config";

interface TechStackMarqueesHomeProps {
    className?: string;
}

function MarqueeItem({ name, icon }: { name: string; icon: string }) {
    return (
        <div className="flex flex-col items-center overflow-visible">
            <div className="border w-20 h-20 rounded-2xl p-6 transition-shadow hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <Image src={icon} alt={name} width={35} height={35} unoptimized />
            </div>
            <span className="text-sm mt-1">{name}</span>
        </div>
    );
}

export function TechStackMarqueesHome({ className }: TechStackMarqueesHomeProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !resolvedTheme) {
        return null;
    }

    const marqeeItems1 = config.techStack.techStackMarquee1Icons.map((item) => ({
        ...item,
        icon: getSimpleIconsUrl(item.icon, resolvedTheme),
    }));
    
    const marqeeItems2 = config.techStack.techStackMarquee2Icons.map((item) => ({
        ...item,
        icon: getSimpleIconsUrl(item.icon, resolvedTheme),
    }));

    return (
        <div className={cn("relative space-y-4", className)}>
            <Marquee className="py-6">
                {marqeeItems1.map((item) => (
                    <MarqueeItem key={item.name} {...item} />
                ))}
            </Marquee>
            <Marquee className="py-6 mb-0">
                {marqeeItems2.map((item) => (
                    <MarqueeItem key={item.name} {...item} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    )
}