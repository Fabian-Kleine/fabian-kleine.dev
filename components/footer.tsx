import Link from "next/link";
import GithubIcon from "./icons/github";
import ContactDialog from "./contact-dialog";
import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { RebootButton } from "./hud/reboot-button";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
    const t = await getTranslations("Footer");

    return (
        <footer data-hud-chrome="footer" className="relative z-1 mt-[clamp(4rem,9vw,7rem)] border-t bg-background/80">
            <div className="mx-auto flex max-w-310 flex-wrap items-center justify-between gap-4 px-4 py-5 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
                <span>
                    &copy; {new Date().getFullYear()} <Link href="/" className="text-heading hover:text-primary">Fabian Kleine</Link> // KLEINE-OS
                </span>
                <div className="flex flex-wrap items-center gap-2">
                    <Button asChild variant="ghost" size="xs" className="font-mono tracking-[0.16em] text-muted-foreground uppercase">
                        <Link href="/legal">{t("legal")}</Link>
                    </Button>
                    <ContactDialog>
                        <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                            <Mail />
                            <span className="sr-only">{t("contact")}</span>
                        </Button>
                    </ContactDialog>
                    <Button asChild variant="ghost" size="icon-sm" className="text-muted-foreground">
                        <a href="https://github.com/Fabian-Kleine" target="_blank" rel="noopener noreferrer">
                            <GithubIcon />
                            <span className="sr-only">{t("github")}</span>
                        </a>
                    </Button>
                    <RebootButton />
                </div>
            </div>
        </footer>
    )
}
