import { cn } from "@/lib/utils";

export function LiveDot({ className }: { className?: string }) {
    return <span aria-hidden="true" className={cn("inline-block size-1.5 animate-blink bg-current", className)} />;
}
