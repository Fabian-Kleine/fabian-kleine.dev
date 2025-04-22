import { icons, LucideIcon as Lucide } from "lucide-react"
import { IconName } from "@/types";

interface LucideProps {
    name: IconName;
    color?: string;
    size?: number;
    className?: string;
}

export default function LucideIcon({ name, color, size, className }: LucideProps) {
    const LucideIcon = icons[name] as Lucide;

    return <LucideIcon color={color} size={size} className={className} />
}