"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
    className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className={cn("flex items-center justify-center border gap-1 rounded-full p-1", className)}>
            <Button variant={"ghost"} size={"icon"} className={cn("rounded-full size-7", theme === "light" && "bg-accent")} onClick={() => setTheme("light")}>
                <Sun className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Toggle Light Theme</span>
            </Button>
            <Button variant={"ghost"} size={"icon"} className={cn("rounded-full size-7", theme === "dark" && "bg-accent")} onClick={() => setTheme("dark")}>
                <Moon className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Toggle Dark Theme</span>
            </Button>
        </div>
    );
}