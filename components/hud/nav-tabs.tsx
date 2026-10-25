"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";
import ContactDialog from "@/components/contact-dialog";

/** which nav item matches the current page, or the homepage section under the top third of the viewport */
export function useActiveSection() {
    const pathname = usePathname();
    const [current, setCurrent] = useState<string | null>("top");

    useEffect(() => {
        if (pathname !== "/") return;
        const update = () => {
            const mid = window.innerHeight * .35;
            const insignia = document.getElementById("insignia")?.getBoundingClientRect();
            const firstSection = document.getElementById("stack")?.getBoundingClientRect();
            if (insignia && insignia.top < mid && insignia.bottom > mid) setCurrent("insignia");
            else if (!firstSection || firstSection.top > mid) setCurrent("top");
            else setCurrent(null);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, [pathname]);

    if (pathname.startsWith("/projects")) return "projects";
    return pathname === "/" ? current : null;
}

const tabClass = cn(
    "relative flex h-full items-center px-3.5 font-heading text-[1.05rem] font-bold tracking-[0.09em] whitespace-nowrap text-muted-foreground uppercase transition-colors hover:text-highlight",
    "after:absolute after:inset-x-3.5 after:-bottom-px after:h-[3px] after:scale-x-0 after:bg-primary after:transition-transform after:duration-250"
);

export function NavTabs({ className }: { className?: string }) {
    const t = useTranslations("Nav");
    const active = useActiveSection();

    return (
        <nav className={cn("h-full min-w-0 flex-1 gap-1", className)} aria-label={t("main")}>
            {NAV_ITEMS.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active === item.section ? "true" : undefined}
                    className={cn(tabClass, active === item.section && "text-heading after:scale-x-100")}
                >
                    {t(item.key)}
                </Link>
            ))}
            <ContactDialog>
                <button type="button" className={tabClass}>{t("contact")}</button>
            </ContactDialog>
        </nav>
    );
}
