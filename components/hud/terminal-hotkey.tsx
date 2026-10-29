"use client";

import { usePathname, useRouter } from "next/navigation";
import { useHotkey } from "@tanstack/react-hotkeys";

export const TERMINAL_PATH = "/terminal";

/** Ctrl+Alt+T opens the secret terminal, and closes it again from inside (Ctrl+Shift+T is reserved by browsers for reopening tabs) */
export function TerminalHotkey() {
    const router = useRouter();
    const pathname = usePathname();

    useHotkey("Control+Alt+T", () => {
        if (document.documentElement.hasAttribute("data-boot")) return;
        router.push(pathname === TERMINAL_PATH ? "/" : TERMINAL_PATH);
    });

    return null;
}
