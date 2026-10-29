"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { DEPLOY_EVENT, isDeployed, prefersReducedMotion } from "@/lib/hud";

const byDocumentOrder = (a: Element, b: Element) =>
    a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;

/** builds up each `.dep` block once it scrolls into view, staggered with the blocks entering alongside it */
export function RevealOnView() {
    const pathname = usePathname();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries
                .filter((entry) => entry.isIntersecting)
                .map((entry) => entry.target as HTMLElement)
                .sort(byDocumentOrder)
                .forEach((el, i) => {
                    el.style.setProperty("--d", String(i));
                    el.setAttribute("data-inview", "");
                    observer.unobserve(el);
                });
        }, { rootMargin: "0px 0px -8% 0px" });

        const scan = () => {
            const reduced = prefersReducedMotion();
            document.querySelectorAll(".dep:not([data-inview])").forEach((el) => {
                if (reduced) el.setAttribute("data-inview", "");
                else observer.observe(el);
            });
        };
        // every deploy (initial boot and reboots) builds the interface up from scratch
        const redeploy = () => {
            observer.disconnect();
            document.querySelectorAll(".dep[data-inview]").forEach((el) => el.removeAttribute("data-inview"));
            scan();
        };

        if (isDeployed()) scan();
        window.addEventListener(DEPLOY_EVENT, redeploy);
        return () => {
            observer.disconnect();
            window.removeEventListener(DEPLOY_EVENT, redeploy);
        };
    }, [pathname]);

    return null;
}
