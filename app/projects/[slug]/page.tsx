import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import ImageVideo from "@/components/blog/image-video";
import GithubIcon from "@/components/icons/github";
import { SectionHeading } from "@/components/hud/section-heading";
import { LiveDot } from "@/components/hud/live-dot";
import { StatusBadge, projectStatus } from "@/components/hud/status-badge";
import { ScrambleText } from "@/components/hud/scramble-text";
import { TechIcon } from "@/components/hud/tech-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { config } from "@/config";
import { getProjects, loadProject } from "@/lib/projects";

const pad = (n: number) => String(n).padStart(2, "0");
/** "github.com/Fabian-Kleine/nexus" style label for an uplink */
const shortUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const locale = await getLocale();
    const project = await loadProject(slug, locale);
    if (!project) notFound();
    const { default: Post, metadata } = project;
    // only written in the other language
    const fallback = project.locale !== locale;
    const t = await getTranslations("ProjectPage");

    const slugs = config.projects.projectsSlugs;
    const index = slugs.indexOf(slug);
    const nextSlug = slugs[(index + 1) % slugs.length];
    const [nextProject] = await getProjects([nextSlug]);
    const techs = metadata.techs ?? [];
    const status = projectStatus(metadata);
    const statusLabel = t(status === "source" ? "sourceOnly" : status);

    const dataRows = [
        {
            k: t("status"),
            v: status === "live"
                ? <span className="flex items-center gap-1.5 text-heading"><LiveDot className="bg-primary" />{statusLabel}</span>
                : <span className={status === "offline" ? "text-muted-foreground" : "text-heading"}>{statusLabel}</span>,
        },
        metadata.demo && {
            k: t("demo"),
            v: <a href={metadata.demo} target="_blank" rel="noopener noreferrer" className="text-heading hover:text-primary">{shortUrl(metadata.demo)}</a>,
        },
        metadata.github && {
            k: t("source"),
            v: <a href={metadata.github} target="_blank" rel="noopener noreferrer" className="text-heading hover:text-primary">{shortUrl(metadata.github)}</a>,
        },
    ].filter((row) => !!row);

    return (
        <div className="mx-auto max-w-310 px-4 pt-[clamp(1.5rem,4vw,3rem)]">
            {fallback && (
                <div role="note" className="dep mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 border border-l-2 border-primary/40 border-l-primary bg-primary/10 px-4 py-3">
                    <span className="hud-label">{t("languageLabel")}</span>
                    <span className="text-sm">{t("languageFallback", { language: project.locale })}</span>
                </div>
            )}
            <nav className="dep mb-[clamp(1.5rem,4vw,3rem)] flex flex-wrap items-center gap-3 hud-meta" aria-label={t("breadcrumb")}>
                <Button asChild variant="terminal" size="xs">
                    <Link href="/projects"><ArrowLeft data-icon="inline-start" />{t("back")}</Link>
                </Button>
                <span aria-hidden="true">//</span>
                <span className="min-w-0 truncate text-heading" aria-current="page">{metadata.title}</span>
            </nav>

            {/* ================= HERO ================= */}
            <section className="grid items-center gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]" aria-labelledby="projectTitle">
                <div>
                    <div className="dep mb-5 flex flex-wrap gap-x-5 gap-y-1.5">
                        {[t("eyebrow"), t("opId", { id: pad(index + 1) })].map((label) => (
                            <span key={label} className="flex items-center gap-2 hud-label before:h-0.5 before:w-4.5 before:bg-primary">{label}</span>
                        ))}
                    </div>
                    <h1 id="projectTitle" lang={project.locale} className="dep hud-title text-[clamp(3rem,8vw,5.5rem)] text-balance"><ScrambleText text={metadata.title} /></h1>
                    <div className="dep my-6 flex flex-wrap gap-2">
                        <StatusBadge status={status}>{statusLabel}</StatusBadge>
                        {metadata.github && <Badge variant="outline">{t("openSource")}</Badge>}
                    </div>
                    <p lang={project.locale} className="dep max-w-[52ch] text-lg first-letter:uppercase">{metadata.description}</p>
                    {(metadata.demo || metadata.github) && (
                        <div className="dep mt-8 flex flex-wrap gap-3">
                            {metadata.demo && (
                                <Button asChild size="hud">
                                    <a href={metadata.demo} target="_blank" rel="noopener noreferrer"><ExternalLink />{t("liveDemo")}</a>
                                </Button>
                            )}
                            {metadata.github && (
                                <Button asChild variant="signal" size="hud">
                                    <a href={metadata.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={18} />{t("viewCode")}</a>
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                <Card className="dep wipe gap-0 py-0">
                    <ImageVideo title={metadata.title} img={metadata.img} video={metadata.video} className="w-full rounded-none shadow-none" />
                    <div className="flex justify-between gap-4 border-t px-4 py-2.5 hud-meta text-[0.62rem]">
                        <span>{t("visual")}</span>
                        <span className="tabular-nums">{pad(index + 1)} / {pad(slugs.length)}</span>
                    </div>
                </Card>
            </section>

            <div className="mt-[clamp(3.5rem,8vw,6rem)] grid items-start gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_20rem]">
                <div className="min-w-0">
                    {/* ================= BRIEFING ================= */}
                    <section aria-labelledby="briefingH">
                        <SectionHeading id="briefingH" eyebrow={t("overview")} title={t("briefing")} meta={t("objectives", { count: pad(metadata.bullets.length) })} className="dep" />
                        <ol lang={project.locale} className="dep grid gap-px border bg-border sm:grid-cols-2">
                            {metadata.bullets.map((bullet, i) => (
                                <li key={bullet} className="flex gap-3 bg-popover px-4 py-3.5 sm:last:odd:col-span-2">
                                    <span className="pt-1 font-mono text-xs text-primary tabular-nums">{pad(i + 1)}</span>
                                    <span className="first-letter:uppercase">{bullet}</span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* ================= DEBRIEF ================= */}
                    {/* hidden for projects without a write-up below their metadata */}
                    <section className="mt-[clamp(3rem,7vw,5rem)] has-[.debrief:empty]:hidden" aria-labelledby="debriefH">
                        <SectionHeading id="debriefH" eyebrow={t("reportEyebrow")} title={t("debrief")} className="dep" />
                        <article lang={project.locale} className="dep debrief">
                            <Post />
                        </article>
                    </section>
                </div>

                {/* ================= MISSION DATA ================= */}
                <aside className="dep flex flex-col gap-4 lg:sticky lg:top-20" aria-label={t("data")}>
                    <Card className="gap-0 px-5 py-5 font-mono text-sm tracking-[0.04em]">
                        <div className="mb-2 flex justify-between gap-4 border-b pb-3 text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                            <span>{t("data")}</span>
                            <span className="tabular-nums">{t("opId", { id: pad(index + 1) })}</span>
                        </div>
                        {dataRows.map((row) => (
                            <div key={row.k} className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3 border-b border-dashed py-2.5">
                                <span className="text-[0.72rem] tracking-[0.14em] text-muted-foreground uppercase">{row.k}</span>
                                <span className="min-w-0 wrap-anywhere">{row.v}</span>
                            </div>
                        ))}
                        {techs.length > 0 && (
                            <div className="pt-3">
                                <div className="mb-2.5 flex justify-between text-[0.72rem] tracking-[0.14em] text-muted-foreground uppercase">
                                    <span>{t("stack")}</span>
                                    <span className="tabular-nums">{t("stackCount", { count: pad(techs.length) })}</span>
                                </div>
                                <ul className="flex flex-col gap-px border bg-border">
                                    {techs.map((tech) => (
                                        <li key={tech.icon} className="flex items-center gap-3 bg-popover px-3 py-2 text-heading">
                                            <TechIcon name="" icon={tech.icon} size={16} />
                                            {tech.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Card>
                    {nextSlug !== slug && (
                        <Link href={`/projects/${nextSlug}`} className="group/next">
                            <Card className="gap-1 px-5 py-4 transition-[translate,border-color] duration-200 group-hover/next:-translate-y-1 group-hover/next:border-border-strong">
                                <span className="hud-label">{t("nextOp")}</span>
                                <span className="flex items-center justify-between gap-3 hud-title text-2xl">
                                    {nextProject.title}
                                    <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover/next:translate-x-1" />
                                </span>
                            </Card>
                        </Link>
                    )}
                </aside>
            </div>
        </div>
    );
}

export function generateStaticParams() {
    const slugs = config.projects.projectsSlugs;

    return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }:  { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await loadProject(slug, await getLocale());
    if (!project) return {};
    const t = await getTranslations("Metadata");
    return {
        title: t("projectTitle", { title: project.metadata.title }),
        description: project.metadata.description,
    }
}
