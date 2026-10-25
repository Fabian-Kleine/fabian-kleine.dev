export const DEPLOY_EVENT = "hud:deploy";
export const BOOT_EVENT = "hud:boot";
export const BOOT_STORAGE_KEY = "kleine-os-booted";

/**
 * Runs before first paint. A first visit in this session gets the boot sequence,
 * everyone else gets the interface build-up straight away.
 */
export const bootScript = `(function(){var d=document.documentElement;try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r&&!sessionStorage.getItem('${BOOT_STORAGE_KEY}')){d.setAttribute('data-boot','');d.setAttribute('data-prebuild','');return}}catch(e){}d.setAttribute('data-deployed','')})();`;

export function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDeployed() {
    return document.documentElement.hasAttribute("data-deployed");
}

/** fires a short glitch burst on a `.glitch` element */
export function pulse(el: Element | null, ms = 280) {
    if (!el || prefersReducedMotion()) return;
    el.classList.remove("burst");
    void (el as HTMLElement).offsetWidth;
    el.classList.add("burst");
    window.setTimeout(() => el.classList.remove("burst"), ms);
}

export function readToken(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
