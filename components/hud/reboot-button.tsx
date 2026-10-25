"use client";

import { Button } from "@/components/ui/button";
import { BOOT_EVENT } from "@/lib/hud";

export function RebootButton() {
    return (
        <Button variant="terminal" size="xs" onClick={() => window.dispatchEvent(new Event(BOOT_EVENT))}>
            REBOOT SYSTEM
        </Button>
    );
}
