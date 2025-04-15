"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
    className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme();

    return (
        <div className={cn("flex items-center justify-center border gap-1 rounded-full p-1", className)}>
            <Button variant={"ghost"} size={"icon"} className={cn("rounded-full size-7 cursor-pointer", theme === "light" && "bg-accent")} onClick={() => setTheme("light")}>
                <Sun className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Toggle Light Theme</span>
            </Button>
            <Button variant={"ghost"} size={"icon"} className={cn("rounded-full size-7 cursor-pointer", theme === "dark" && "bg-accent")} onClick={() => setTheme("dark")}>
                <Moon className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Toggle Dark Theme</span>
            </Button>
        </div>
    );
}