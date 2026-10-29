"use client";

import { Fragment, useEffect, useRef, useState, useTransition, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useLocale, useTranslations } from "next-intl";
import ContactDialog, { useContactDialogStore } from "@/components/contact-dialog";
import { LogLine, type BootLine } from "@/components/hud/boot-sequence";
import type { ProjectStatus } from "@/components/hud/status-badge";
import { useOnDeploy } from "@/hooks/use-on-deploy";
import { setLocale } from "@/i18n/actions";
import { isLocale, locales } from "@/i18n/config";
import { prefersReducedMotion, pulse } from "@/lib/hud";
import { cn } from "@/lib/utils";
import type { SkillLevel } from "@/config";

export interface TerminalProject {
    slug: string;
    title: string;
    status: ProjectStatus;
}

export interface TerminalTech {
    name: string;
    level: SkillLevel;
}

type Tone = "heading" | "dim" | "error";

type Entry =
    | { type: "boot"; line: BootLine }
    | { type: "input"; text: string }
    | { type: "output"; node: ReactNode; tone?: Tone };

/** an entry and how long to wait before printing it, in ms */
type Step = [Entry, number];

const PROMPT = "operator@kleine-os:~$";
const GITHUB_URL = "https://github.com/Fabian-Kleine";

/** usage shown by `help`, in display order. `rm` and `sudo` work too, but stay off the list */
const COMMANDS = {
    help: "help",
    whoami: "whoami",
    sitrep: "sitrep",
    neofetch: "neofetch",
    projects: "projects",
    open: "open <slug>",
    stack: "stack",
    ls: "ls [dir]",
    cat: "cat <file>",
    contact: "contact",
    hire: "hire",
    "remote-access": "remote-access <host>",
    lang: "lang <en|de>",
    theme: "theme <theme>",
    date: "date",
    echo: "echo <text>",
    github: "github",
    clear: "clear",
    exit: "exit",
} as const;
const COMMAND_NAMES = Object.keys(COMMANDS) as (keyof typeof COMMANDS)[];

/** the fake home directory, `.secrets` only shows up with `ls -a` */
const FILES = ["about.txt", "contact.txt", "projects/"];
const HIDDEN_FILES = [".", "..", ".secrets"];

const LOGO = String.raw`
 ______________
|              |
|   ___ _  __  |
|  | __| |/ /  |
|  | _|| ' <   |
|  |_| |_|\_\  |
|              |
 \            /
  \__      __/
     \____/`.slice(1);

const SWATCHES = ["bg-primary", "bg-highlight", "bg-heading", "bg-destructive", "bg-secondary", "bg-border-strong", "bg-muted-foreground"];

const TONES: Record<Tone, string> = {
    heading: "text-heading",
    dim: "text-muted-foreground",
    error: "text-destructive",
};

const out = (node: ReactNode, tone?: Tone): Entry => ({ type: "output", node, tone });
const log = (text: string, status?: string, kind?: BootLine["kind"]): Entry => ({ type: "boot", line: { text, status, kind } });
const pad = (n: number) => String(n).padStart(2, "0");
const cmd = (chunks: ReactNode) => <span className="text-heading">{chunks}</span>;
const link = "text-heading underline-offset-4 hover:text-primary hover:underline";
const githubLink = <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={link}>github.com/Fabian-Kleine</a>;
/** what `hire` last put into the contact form, so an untouched prefill can follow a language switch */
const prefilled = { subject: "", message: "" };
const hex = (bytes: number) =>Array.from({ length: bytes }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join(" ");

/** time since the site was opened in this tab, like "1h 4m 12s" */
function uptime() {
    const s = Math.floor(performance.now() / 1000);
    const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60;
    return [h && `${h}h`, (h || m) && `${m}m`, `${s % 60}s`].filter(Boolean).join(" ");
}

function table(rows: [ReactNode, ReactNode][], labelClass = "text-muted-foreground") {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-x-6">
            {rows.map(([label, value], i) => (
                <Fragment key={i}>
                    <span className={labelClass}>{label}</span>
                    <span>{value}</span>
                </Fragment>
            ))}
        </div>
    );
}

function GlitchText({ text }: { text: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => pulse(ref.current, 600), []);

    return (
        <div ref={ref} className="glitch my-1 font-heading text-[clamp(1.6rem,6vw,2.6rem)] leading-none tracking-[0.08em] text-heading uppercase" data-text={text}>
            {text}
        </div>
    );
}

export function Terminal({ projects, stack, insignia }: { projects: TerminalProject[]; stack: TerminalTech[]; insignia: number }) {
    const tLocale = useTranslations("LocaleSwitcher");
    const tHome = useTranslations("Home");
    const t = useTranslations("Terminal");
    const locale = useLocale();
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [entries, setEntries] = useState<Entry[]>([]);
    const [ready, setReady] = useState(false);
    // a command is still printing, the prompt waits until it's done
    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState("");
    const [contactOpen, setContactOpen] = useState(false);
    // `remote-access` decrypts .secrets
    const [cleared, setCleared] = useState(false);
    const history = useRef<string[]>([]);
    // -1 is the line being typed, anything else points into history
    const historyIndex = useRef(-1);
    const timers = useRef<number[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // slides the navbar away and hides the footer while the terminal is open
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-terminal", "");
        return () => root.removeAttribute("data-terminal");
    }, []);

    useEffect(() => {
        const pending = timers;
        return () => pending.current.forEach(window.clearTimeout);
    }, []);

    // the startup log waits for the HUD so it doesn't play behind the boot sequence
    useOnDeploy(() => {
        const boot: BootLine[] = [
            { text: t("startup.build"), kind: "hd" },
            { text: t("startup.copyright", { year: new Date().getFullYear() }), kind: "dim" },
            { text: t("startup.tty"), status: "/dev/tty0" },
            { text: t("startup.handshake"), status: "[OK]" },
            { text: t("startup.encryption"), status: "AES-256" },
            { text: t("startup.logs"), kind: "warn", status: t("startup.partial") },
            { text: t("startup.clearance"), status: t("startup.granted") },
        ];
        const lines: Entry[] = [
            ...boot.map((line): Entry => ({ type: "boot", line })),
            out(" "),
            out(t("startup.welcome"), "heading"),
            out(t.rich("startup.hint", { cmd }), "dim"),
        ];

        setReady(false);
        if (prefersReducedMotion()) {
            setEntries(lines);
            setReady(true);
            return;
        }

        setEntries([]);
        const startup: number[] = [];
        let delay = 120;
        lines.forEach((entry, i) => {
            startup.push(window.setTimeout(() => setEntries((prev) => [...prev, entry]), delay));
            delay += i < boot.length ? 90 + Math.random() * 110 : 180;
        });
        startup.push(window.setTimeout(() => setReady(true), delay));
        return () => startup.forEach(window.clearTimeout);
    });

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [entries, ready, busy]);

    useEffect(() => {
        if (ready && !busy) inputRef.current?.focus({ preventScroll: true });
    }, [ready, busy]);

    const print = (...lines: Entry[]) => setEntries((prev) => [...prev, ...lines]);
    const navigate = (href: string) => window.setTimeout(() => router.push(href), 450);
    const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };

    /** prints the steps one after another; `done` runs once the prompt is back */
    const stream = (steps: Step[], done?: () => void) => {
        setBusy(true);
        let at = 0;
        steps.forEach(([entry, delay]) => {
            at += delay;
            later(() => print(entry), at);
        });
        later(() => { timers.current = []; setBusy(false); }, at + 150);
        if (done) later(done, at + 300);
    };

    // Ctrl+C stops a command that is still printing
    useHotkey("Control+C", () => {
        timers.current.forEach(window.clearTimeout);
        timers.current = [];
        print(out("^C", "dim"));
        setBusy(false);
    }, { enabled: busy });

    const execute = (command: string, args: string[]): Entry[] => {
        switch (command) {
            case "help":
                return [
                    out(t("help.title"), "heading"),
                    out(table(COMMAND_NAMES.map((name) => [COMMANDS[name], t(`commands.${name}`)]), "text-heading")),
                    out(t("help.hint"), "dim"),
                ];
            case "whoami":
                return [
                    out("FABIAN KLEINE // ID FK-0800", "heading"),
                    out(table((["role", "rank", "base", "status"] as const).map((field) => [t(`whoami.${field}`), t(`whoami.${field}Value`)]))),
                ];
            case "sitrep": {
                const count = (status: ProjectStatus) => projects.filter((project) => project.status === status).length;
                const now = new Date();
                const zone = { timeZone: "Europe/Berlin" } as const;
                return [
                    out(t("sitrep.title", { date: new Intl.DateTimeFormat(locale, { ...zone, dateStyle: "medium" }).format(now) }), "heading"),
                    out(table([
                        [t("sitrep.time"), new Intl.DateTimeFormat(locale, { ...zone, hour: "2-digit", minute: "2-digit", timeZoneName: "short" }).format(now)],
                        [t("sitrep.operations"), t("sitrep.operationsValue", { total: projects.length, live: count("live"), source: count("source"), offline: count("offline") })],
                        [t("sitrep.posting"), t("whoami.rankValue")],
                        [t("sitrep.readiness"), t("whoami.statusValue")],
                        [t("sitrep.threat"), t("sitrep.threatValue", { coffee: 40 + Math.floor(Math.random() * 60) })],
                    ])),
                    out(t.rich("sitrep.action", { cmd }), "dim"),
                ];
            }
            case "neofetch": {
                const live = projects.filter((project) => project.status === "live").length;
                return [out(
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                        <pre aria-hidden className="leading-tight text-primary">{LOGO}</pre>
                        <div>
                            <div><span className="text-primary">operator</span>@<span className="text-primary">kleine-os</span></div>
                            <div className="text-muted-foreground">------------------</div>
                            {table([
                                ["OS", "KLEINE-OS Tactical Build 26.10"],
                                ["Host", window.location.host],
                                ["Kernel", "Next.js 16 // React 19"],
                                ["Uptime", uptime()],
                                ["Shell", "ksh (kleine shell) 1.0"],
                                ["Resolution", `${window.innerWidth}x${window.innerHeight}`],
                                ["Stack", `${stack.length} items`],
                                ["Operations", `${projects.length} (${live} live)`],
                                ["Insignia", `${insignia} awarded`],
                                ["Locale", locale],
                                ["Theme", "Tactical Dark"],
                            ], "text-primary")}
                            <div className="mt-2 flex">
                                {SWATCHES.map((swatch) => <span key={swatch} className={cn("h-3.5 w-6", swatch)} />)}
                            </div>
                        </div>
                    </div>
                )];
            }
            case "projects":
                return [
                    out(t("projects.title", { count: projects.length }), "heading"),
                    out(
                        <div className="grid grid-cols-[auto_auto_1fr] gap-x-4">
                            {projects.map((project, i) => (
                                <Fragment key={project.slug}>
                                    <span className="text-muted-foreground">{pad(i + 1)}</span>
                                    <Link href={`/projects/${project.slug}`} className={link}>{project.slug}</Link>
                                    <span className="truncate">{project.title}</span>
                                </Fragment>
                            ))}
                        </div>
                    ),
                    out(t.rich("projects.hint", { cmd }), "dim"),
                ];
            case "open": {
                const slug = args[0]?.toLowerCase();
                if (!slug) return [out(t.rich("open.usage", { cmd }), "error")];
                if (!projects.some((project) => project.slug === slug)) {
                    return [out(t("open.notFound", { slug }), "error")];
                }
                navigate(`/projects/${slug}`);
                return [out(t("open.opening", { slug }))];
            }
            case "stack":
                return [
                    out(t("stack.title", { count: stack.length }), "heading"),
                    out(
                        <div className="grid grid-cols-[auto_auto_1fr] gap-x-4">
                            {stack.map((tech) => (
                                <Fragment key={tech.name}>
                                    <span>{tech.name}</span>
                                    <span className="text-primary">{"■".repeat(tech.level)}<span className="text-border-strong">{"■".repeat(5 - tech.level)}</span></span>
                                    <span className="text-muted-foreground">{tHome("stack.level", { level: String(tech.level) })}</span>
                                </Fragment>
                            ))}
                        </div>
                    ),
                ];
            case "ls": {
                const all = args.some((arg) => /^-\w*a/.test(arg));
                const dir = args.find((arg) => !arg.startsWith("-"))?.replace(/\/$/, "");
                const names = !dir || dir === "." || dir === "~"
                    ? [...(all ? HIDDEN_FILES : []), ...FILES]
                    : dir === "projects" ? projects.map((project) => project.slug) : null;
                if (!names) return [out(t("ls.notFound", { path: dir! }), "error")];
                return [out(
                    <div className="flex flex-wrap gap-x-6">
                        {names.map((name) => (
                            <span key={name} className={cn(name.endsWith("/") && "text-primary", name.startsWith(".") && "text-muted-foreground")}>{name}</span>
                        ))}
                    </div>
                )];
            }
            case "cat": {
                const file = args[0]?.replace(/^\.\//, "");
                if (!file) return [out(t.rich("cat.usage", { cmd }), "error")];
                if (file === "about.txt") return [out(tHome("hero.intro"))];
                if (file === "contact.txt") return [out(t.rich("files.contact", { cmd })), out(<>GitHub: {githubLink}</>)];
                if (file === ".secrets") {
                    return cleared
                        ? [out(t("secrets.title"), "heading"), out(t("secrets.list"))]
                        : [out(t("cat.encrypted"), "error"), out(t.rich("cat.clearance", { cmd }), "dim")];
                }
                if (file.replace(/\/$/, "") === "projects") return [out(t("cat.directory", { path: file }), "error")];
                const project = projects.find((project) => `projects/${project.slug}` === file);
                if (project) return [out(project.title, "heading"), out(t.rich("cat.project", { cmd, slug: project.slug }), "dim")];
                return [out(t("cat.notFound", { path: file }), "error")];
            }
            case "contact":
                setContactOpen(true);
                return [out(t("contact"))];
            case "hire":
                stream([
                    [out(t("hire.init"), "heading"), 0],
                    [log(t("hire.credentials"), "[OK]"), 450],
                    [log(t("hire.channel"), "AES-256"), 450],
                    [log(t("hire.operator"), t("hire.ready")), 500],
                    [out(t("hire.done")), 400],
                ], () => {
                    // prefill the form in the current language, but never overwrite what the visitor typed
                    const form = useContactDialogStore.getState();
                    if (!form.subject || form.subject === prefilled.subject) form.setSubject(prefilled.subject = t("hire.subject"));
                    if (!form.message || form.message === prefilled.message) form.setMessage(prefilled.message = t("hire.message"));
                    setContactOpen(true);
                });
                return [];
            case "remote-access": {
                const host = args[0] ?? "mainframe.kleine-os";
                stream([
                    [out(t("remote.connecting", { host })), 0],
                    [log(t("remote.ports"), "22, 443, 1337"), 450],
                    [log(t("remote.firewall"), "[OK]"), 400],
                    ...Array.from({ length: 8 }, (_, i): Step => [out(`0x${(0x7f00 + i * 16).toString(16)}  ${hex(16)}`, "dim"), 70]),
                    [log(t("remote.hash"), "hunter2"), 450],
                    [log(t("remote.trace"), t("remote.traceStatus"), "warn"), 400],
                    [log(t("remote.payload"), "[OK]"), 450],
                    [out(<GlitchText text={t("remote.granted")} />), 500],
                    [out(t("remote.punchline"), "dim"), 700],
                ], () => setCleared(true));
                return [];
            }
            case "rm": {
                const target = args.find((arg) => !arg.startsWith("-"));
                if (target === "/" || target === "/*") {
                    stream([
                        [log(t("rm.selfDestruct"), t("rm.armed"), "warn"), 0],
                        [out(t("rm.auth"), "error"), 700],
                        [out(t("rm.second"), "dim"), 900],
                    ]);
                    return [];
                }
                if (!target) return [out(t("rm.missing"), "error")];
                return [out(t("rm.readOnly", { path: target }), "error")];
            }
            case "lang": {
                const next = args[0]?.toLowerCase();
                if (!next) return [out(t("lang.current", { locale, available: locales.join(", ") }))];
                if (!isLocale(next)) return [out(t("lang.unknown", { locale: next }), "error")];
                if (next === locale) return [out(t("lang.active", { name: tLocale(next) }))];
                // setting the cookie re-renders the route in the new language, the session log stays
                startTransition(() => setLocale(next));
                return [out(t("lang.switching", { name: tLocale(next) }))];
            }
            case "theme": {
                const theme = args[0]?.toLowerCase();
                if (!theme) return [out(t("theme.current")), out(t.rich("theme.usage", { cmd }), "dim")];
                if (theme === "light") return [out(t("theme.light"), "error")];
                if (theme === "dark") return [out(t("theme.dark"))];
                return [out(t("theme.unknown", { theme }), "error")];
            }
            case "date":
                return [out(new Intl.DateTimeFormat(locale, { dateStyle: "full", timeStyle: "long", timeZone: "Europe/Berlin" }).format(new Date()))];
            case "echo":
                return [out(args.join(" ") || " ")];
            case "github":
                return [out(githubLink)];
            case "exit":
                navigate("/");
                return [out(t("exit"))];
            case "sudo":
                return [out(t("sudo"), "error")];
            default:
                return [out(t("notFound", { command }), "error"), out(t.rich("startup.hint", { cmd }), "dim")];
        }
    };

    const run = (raw: string) => {
        const input = raw.trim();
        historyIndex.current = -1;
        if (!input) return print({ type: "input", text: raw });

        history.current.push(input);
        const [name, ...args] = input.split(/\s+/);
        const command = name.toLowerCase();
        if (command === "clear") return setEntries([]);
        print({ type: "input", text: raw }, ...execute(command, args));
    };

    /** what Tab can complete after a command, hidden files only once a dot is typed */
    const argCandidates = (command: string) => {
        const slugs = projects.map((project) => project.slug);
        switch (command) {
            case "open": return slugs;
            case "cat": return ["about.txt", "contact.txt", ".secrets", ...slugs.map((slug) => `projects/${slug}`)];
            case "ls": return ["projects/"];
            case "lang": return [...locales];
            default: return [];
        }
    };

    /** completes a command or its argument, as far as all matches agree */
    const complete = (input: string) => {
        const withArg = input.match(/^(\S+)\s+(\S*)$/);
        const [prefix, word, candidates]: [string, string, readonly string[]] = withArg
            ? [`${withArg[1]} `, withArg[2], argCandidates(withArg[1].toLowerCase())]
            : /^\S*$/.test(input) ? ["", input, COMMAND_NAMES] : ["", "", []];
        const matches = candidates.filter((c) => c.startsWith(word.toLowerCase()) && (!c.startsWith(".") || word.startsWith(".")));
        if (!matches.length) return;

        const common = matches.reduce((a, b) => {
            let i = 0;
            while (i < a.length && a[i] === b[i]) i++;
            return a.slice(0, i);
        });
        if (matches.length === 1) setValue(prefix + common + (withArg ? "" : " "));
        else if (common.length > word.length) setValue(prefix + common);
        else print({ type: "input", text: input }, out(matches.join("  "), "dim"));
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const list = history.current;
        if (e.key === "Enter") {
            e.preventDefault();
            run(value);
            setValue("");
        } else if ((e.key === "ArrowUp" || e.key === "ArrowDown") && list.length) {
            e.preventDefault();
            let i = historyIndex.current;
            if (e.key === "ArrowUp") i = i === -1 ? list.length - 1 : Math.max(0, i - 1);
            else i = i === -1 || i === list.length - 1 ? -1 : i + 1;
            historyIndex.current = i;
            setValue(i === -1 ? "" : list[i]);
        } else if (e.key === "Tab") {
            e.preventDefault();
            complete(value);
        } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
            e.preventDefault();
            setEntries([]);
        } else if (e.ctrlKey && e.key.toLowerCase() === "c" && e.currentTarget.selectionStart === e.currentTarget.selectionEnd) {
            // without a selection Ctrl+C cancels the line like a real shell
            e.preventDefault();
            print({ type: "input", text: `${value}^C` });
            setValue("");
            historyIndex.current = -1;
        }
    };

    return (
        <>
            <section
                aria-label={t("label")}
                className="terminal fixed inset-0 z-40 flex flex-col bg-background/90 font-mono text-highlight"
                onClick={() => {
                    // keep text selectable, focus the prompt on a plain click
                    if (window.getSelection()?.isCollapsed) inputRef.current?.focus({ preventScroll: true });
                }}
            >
                <div ref={scrollRef} className="relative z-1 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
                    <div className="mx-auto max-w-310 text-[clamp(.75rem,2.4vw,.9rem)] leading-[1.7] tracking-[0.04em]" aria-live="polite">
                        {entries.map((entry, i) => {
                            if (entry.type === "boot") return <LogLine key={i} line={entry.line} />;
                            if (entry.type === "input") {
                                return (
                                    <div key={i} className="break-all">
                                        <span className="text-primary">{PROMPT}</span> <span className="text-heading">{entry.text}</span>
                                    </div>
                                );
                            }
                            return <div key={i} className={cn("wrap-break-word whitespace-pre-wrap", entry.tone && TONES[entry.tone])}>{entry.node}</div>;
                        })}
                        {ready && !busy && (
                            <div className="flex items-baseline gap-[0.6em]">
                                <span aria-hidden className="flex-none text-primary">{PROMPT}</span>
                                <input
                                    ref={inputRef}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    onKeyDown={onKeyDown}
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck={false}
                                    aria-label={t("inputLabel")}
                                    className="min-w-0 flex-1 bg-transparent text-heading caret-primary outline-none"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="relative z-1 border-t bg-background/85 px-4 sm:px-8">
                    <div className="mx-auto flex max-w-310 justify-between gap-4 py-2 text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
                        <span>{t("status.session")}</span>
                        <span><span className="text-primary">CTRL+ALT+T</span> {t("status.exit")}</span>
                    </div>
                </div>
            </section>
            {/* outside the section, its clicks would otherwise bubble up and pull focus back to the prompt */}
            <ContactDialog
                open={contactOpen}
                onOpenChange={setContactOpen}
                onCloseAutoFocus={(e) => {
                    e.preventDefault();
                    inputRef.current?.focus({ preventScroll: true });
                }}
            />
        </>
    );
}
