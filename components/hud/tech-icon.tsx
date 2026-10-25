import Image from "next/image";
import { cn, getSimpleIconsUrl } from "@/lib/utils";

/** SimpleIcons brand icon */
export function TechIcon({ name, icon, size = 24, className }: { name: string; icon: string; size?: number; className?: string }) {
    return (
        <Image
            src={getSimpleIconsUrl(icon)}
            alt={name}
            width={size}
            height={size}
            unoptimized
            className={cn("shrink-0", className)}
        />
    );
}
