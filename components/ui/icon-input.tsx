import { IconName } from "@/types";
import { ReactNode } from "react";
import LucideIcon from "./lucide-icon";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface IconInputProps {
    icon: IconName;
    children: ReactNode;
    textarea?: boolean;
}

export default function IconInput({ icon, children, textarea }: IconInputProps) {
    return (
        <div className="relative">
            <LucideIcon className={cn("absolute left-3 transform -translate-y-1/2 text-muted-foreground text-sm", textarea ? "top-5" : "top-1/2")} size={18} name={icon} />
            <Slot className="pl-10 pr-4">
                {children}
            </Slot>
        </div>
    );
}