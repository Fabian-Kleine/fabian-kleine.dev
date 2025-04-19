"use client";

import { cn, getSimpleIconsUrl } from "@/lib/utils";
import { Marquee } from "../magicui/marquee";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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

    const marqeeItems1 = [
        { name: "HTML", icon: getSimpleIconsUrl("html5", resolvedTheme) },
        { name: "CSS", icon: getSimpleIconsUrl("css3", resolvedTheme) },
        { name: "JavaScript", icon: getSimpleIconsUrl("javascript", resolvedTheme) },
        { name: "TypeScript", icon: getSimpleIconsUrl("typescript", resolvedTheme) },
        { name: "Node.js", icon: getSimpleIconsUrl("node.js", resolvedTheme) },
        { name: "Express", icon: getSimpleIconsUrl("express", resolvedTheme) },
        { name: "Vue.js", icon: getSimpleIconsUrl("vue.js", resolvedTheme) },
        { name: "React", icon: getSimpleIconsUrl("react", resolvedTheme) },
        { name: "Next.js", icon: getSimpleIconsUrl("next.js", resolvedTheme) },
        { name: "Tailwind CSS", icon: getSimpleIconsUrl("tailwindcss", resolvedTheme) },
        { name: "PHP", icon: getSimpleIconsUrl("php", resolvedTheme) },
        { name: "MongoDB", icon: getSimpleIconsUrl("mongodb", resolvedTheme) },
        { name: "Supabase", icon: getSimpleIconsUrl("supabase", resolvedTheme) },
        { name: "MySQL", icon: getSimpleIconsUrl("mysql", resolvedTheme) },
        { name: "Python", icon: getSimpleIconsUrl("python", resolvedTheme) },
    ];
    
    const marqeeItems2 = [
        { name: "Shadcn UI", icon: getSimpleIconsUrl("shadcnui", resolvedTheme) },
        { name: "Bootstrap", icon: getSimpleIconsUrl("bootstrap", resolvedTheme) },
        { name: "Git", icon: getSimpleIconsUrl("git", resolvedTheme) },
        { name: "GitHub", icon: getSimpleIconsUrl("github", resolvedTheme) },
        { name: "GitLab", icon: getSimpleIconsUrl("gitlab", resolvedTheme) },
        { name: "Vite", icon: getSimpleIconsUrl("vite", resolvedTheme) },
        { name: "Vercel", icon: getSimpleIconsUrl("vercel", resolvedTheme) },
        { name: "Wordpress", icon: getSimpleIconsUrl("wordpress", resolvedTheme) },
        { name: "Plesk", icon: getSimpleIconsUrl("plesk", resolvedTheme) },
        { name: "Postman", icon: getSimpleIconsUrl("postman", resolvedTheme) },
    ];

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