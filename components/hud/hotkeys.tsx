"use client";

import { useHotkey } from "@tanstack/react-hotkeys";

/** jump to a homepage section unless the boot sequence or a dialog has the keyboard */
function jumpTo(id: string) {
    return () => {
        if (document.documentElement.hasAttribute("data-boot")) return;
        if (document.querySelector("[role=dialog][data-state=open]")) return;
        window.location.hash = id;
    };
}

/** O jumps to operations, C to comms */
export function Hotkeys() {
    useHotkey("O", jumpTo("operations"), { ignoreInputs: true });
    useHotkey("C", jumpTo("comms"), { ignoreInputs: true });

    return null;
}
