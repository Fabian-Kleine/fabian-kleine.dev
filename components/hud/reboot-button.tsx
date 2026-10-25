"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { BOOT_EVENT } from "@/lib/hud";

export function RebootButton() {
    const t = useTranslations("Footer");

    return (
        <Button variant="terminal" size="xs" onClick={() => window.dispatchEvent(new Event(BOOT_EVENT))}>
            {t("reboot")}
        </Button>
    );
}
