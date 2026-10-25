"use client";

import { useEffect, useRef } from "react";
import { DEPLOY_EVENT, isDeployed } from "@/lib/hud";

/** calls `callback` whenever the HUD interface builds up (initial load and every reboot) */
export function useOnDeploy(callback: () => void | (() => void)) {
    const ref = useRef(callback);

    useEffect(() => {
        ref.current = callback;
    });

    useEffect(() => {
        let cleanup: void | (() => void);
        const run = () => {
            cleanup?.();
            cleanup = ref.current();
        };
        if (isDeployed()) run();
        window.addEventListener(DEPLOY_EVENT, run);
        return () => {
            window.removeEventListener(DEPLOY_EVENT, run);
            cleanup?.();
        };
    }, []);
}
