import Link from "next/link";
import Image from "next/image";
import { AlignLeft } from "lucide-react";
import { Button } from "./ui/button";
import ContactDialog from "./contact-dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { NavTabs } from "./hud/nav-tabs";
import { NAV_ITEMS } from "@/lib/nav";
import { Telemetry } from "./hud/telemetry";
import { LocaleSwitcher } from "./locale-switcher";
import { getTranslations } from "next-intl/server";
import GithubIcon from "./icons/github";

async function Mark() {
    const t = await getTranslations("Nav");

    return (
        <Link href="/#top" className="group/mark flex flex-none items-center gap-2.5" aria-label={t("backToTop")}>
            <Image
                src="/badges/fk.png"
                alt=""
                width={28}
                height={36}
                loading="eager"
                className="h-9 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,.5)] transition-[rotate,filter] duration-300 group-hover/mark:-rotate-6 group-hover/mark:drop-shadow-[0_0_8px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
            />
            <div>
                <b className="block font-heading text-[1.35rem] leading-none font-extrabold tracking-[0.04em] text-heading">KLEINE-OS</b>
                <span className="mt-0.5 hidden font-mono text-[0.62rem] tracking-[0.2em] text-primary sm:block">{t("tagline")}</span>
            </div>
        </Link>
    );
}

export default async function Navbar() {
    const t = await getTranslations("Nav");
    const sheetLink = "border-b py-3 text-left font-heading text-xl font-bold tracking-[0.09em] text-muted-foreground uppercase transition-colors hover:text-heading";

    return (
        <header data-hud-chrome="header" className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md">
            <div className="mx-auto flex h-15 max-w-310 items-center gap-4 px-4 lg:gap-6">
                <Mark />
                <NavTabs className="hidden md:flex" />
                <div className="ml-auto flex items-center gap-3 md:ml-0">
                    <Telemetry />
                    <LocaleSwitcher />
                    <Button asChild variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-heading">
                        <a href="https://github.com/Fabian-Kleine" target="_blank" rel="noopener noreferrer">
                            <GithubIcon />
                            <span className="sr-only">{t("github")}</span>
                        </a>
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <AlignLeft />
                                <span className="sr-only">{t("toggle")}</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-3/4 px-6">
                            <SheetHeader className="px-0">
                                <SheetTitle className="hud-title text-2xl">KLEINE-OS</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col" aria-label={t("main")}>
                                {NAV_ITEMS.map((item) => (
                                    <SheetClose asChild key={item.href}>
                                        <Link href={item.href} className={sheetLink}>
                                            {t(item.key)}
                                        </Link>
                                    </SheetClose>
                                ))}
                                <ContactDialog>
                                    <button type="button" className={sheetLink}>{t("contact")}</button>
                                </ContactDialog>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
