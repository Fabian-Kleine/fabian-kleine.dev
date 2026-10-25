import { cn, getSimpleIconsUrl } from "@/lib/utils";
import Image from "next/image";

interface SimpleIconsTagProps {
    name: string;
    icon: string;
    className?: string;
}

export function SimpleIconsTag({ name, icon, className }: SimpleIconsTagProps) {
    return (
        <div className={cn("inline-flex items-center gap-2 rounded-md border font-semibold px-4 py-2 text-xs", className)}>
            <Image
                src={getSimpleIconsUrl(icon)}
                alt={name}
                width={20}
                height={20}
                unoptimized
            />
            {name}
        </div>
    );
}
