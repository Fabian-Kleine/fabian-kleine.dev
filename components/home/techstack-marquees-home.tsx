"use client";

import { cn } from "@/lib/utils";
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

    if (!mounted) {
        return null;
    }

    const marqeeItems1 = [
        {
            name: "HTML",
            icon: "https://cdn.simpleicons.org/html5/html5",
        },
        {
            name: "CSS",
            icon: "https://cdn.simpleicons.org/css3/css3",
        },
        {
            name: "JavaScript",
            icon: "https://cdn.simpleicons.org/javascript/javascript",
        },
        {
            name: "TypeScript",
            icon: "https://cdn.simpleicons.org/typescript/typescript",
        },
        {
            name: "Node.js",
            icon: "https://cdn.simpleicons.org/node.js/node.js",
        },
        {
            name: "Express",
            icon: `https://cdn.simpleicons.org/express/${resolvedTheme === "dark" ? "ffffff" : "express"}`,
        },
        {
            name: "Vue.js",
            icon: "https://cdn.simpleicons.org/vue.js/vue.js",
        },
        {
            name: "React",
            icon: "https://cdn.simpleicons.org/react/react",
        },
        {
            name: "Next.js",
            icon: `https://cdn.simpleicons.org/nextdotjs/${resolvedTheme === "dark" ? "ffffff" : "nextdotjs"}`,
        },
        {
            name: "Tailwind CSS",
            icon: "https://cdn.simpleicons.org/tailwindcss/tailwindcss",
        },
        {
            name: "PHP",
            icon: "https://cdn.simpleicons.org/php/php",
        },
        {
            name: "MongoDB",
            icon: "https://cdn.simpleicons.org/mongodb/mongodb",
        },
        {
            name: "Supabase",
            icon: "https://cdn.simpleicons.org/supabase/supabase",
        },
        {
            name: "MySQL",
            icon: "https://cdn.simpleicons.org/mysql/mysql",
        },
        {
            name: "Python",
            icon: "https://cdn.simpleicons.org/python/python",
        },
    ];
    
    const marqeeItems2 = [
        {
            name: "Shadcn UI",
            icon: `https://cdn.simpleicons.org/shadcnui/${resolvedTheme === "dark" ? "ffffff" : "shadcnui"}`,
        },
        {
            name: "Bootstrap",
            icon: "https://cdn.simpleicons.org/bootstrap/bootstrap",
        },
        {
            name: "Git",
            icon: "https://cdn.simpleicons.org/git/git",
        },
        {
            name: "GitHub",
            icon: `https://cdn.simpleicons.org/github/${resolvedTheme === "dark" ? "ffffff" : "github"}`,
        },
        {
            name: "GitLab",
            icon: "https://cdn.simpleicons.org/gitlab/gitlab",
        },
        {
            name: "Vite",
            icon: "https://cdn.simpleicons.org/vite/vite",
        },
        {
            name: "Vercel",
            icon: `https://cdn.simpleicons.org/vercel/${resolvedTheme === "dark" ? "ffffff" : "vercel"}`,
        },
        {
            name: "Wordpress",
            icon: "https://cdn.simpleicons.org/wordpress/wordpress",
        },
        {
            name: "Plesk",
            icon: "https://cdn.simpleicons.org/plesk/plesk",
        },
        {
            name: "Postman",
            icon: "https://cdn.simpleicons.org/postman/postman",
        },
        {
            name: "PHPMyAdmin",
            icon: "https://cdn.simpleicons.org/phpmyadmin/phpmyadmin",
        }
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