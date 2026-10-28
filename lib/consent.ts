"use client";

import { useSyncExternalStore } from "react";
import { config } from "@/config";

export type Consent = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "kleine-os-consent";
const CONSENT_EVENT = "kleine-os:consent";

function read(): Consent | null {
    try {
        const value = localStorage.getItem(CONSENT_STORAGE_KEY);
        return value === "granted" || value === "denied" ? value : null;
    } catch {
        return null;
    }
}

function subscribe(onChange: () => void) {
    window.addEventListener(CONSENT_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
        window.removeEventListener(CONSENT_EVENT, onChange);
        window.removeEventListener("storage", onChange);
    };
}

/** stores the visitor's decision; `null` forgets it so the banner asks again */
export function setConsent(consent: Consent | null) {
    try {
        if (consent) localStorage.setItem(CONSENT_STORAGE_KEY, consent);
        else localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch { /* storage unavailable */ }
    window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** `undefined` until hydrated, `null` while the visitor has not decided yet */
export function useConsent() {
    return useSyncExternalStore<Consent | null | undefined>(subscribe, read, () => undefined);
}

/** whether media from third-party hosts (jsDelivr, GitHub) may be loaded */
export function useExternalMedia() {
    return useConsent() === "granted" && config.cookies.cookieConsent;
}

export function isExternalUrl(src: string) {
    return /^https?:\/\//.test(src);
}
