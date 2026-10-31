import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import GithubIcon from "@/components/icons/github";
import ImageVideo from "@/components/blog/image-video";
import ContactDialog from "@/components/contact-dialog";
import { SectionHeading } from "@/components/hud/section-heading";
import { ScrambleText } from "@/components/hud/scramble-text";
import { CountUp } from "@/components/hud/count-up";
import { Meter } from "@/components/hud/meter";
import { Radar } from "@/components/hud/radar";
import { EuropeMap } from "@/components/hud/europe-map";
import { TechIcon } from "@/components/hud/tech-icon";
import { LiveDot } from "@/components/hud/live-dot";
import { StatusBadge, projectStatus } from "@/components/hud/status-badge";
import { Hotkeys } from "@/components/hud/hotkeys";
import { InsigniaCase, InsigniaDossier, InsigniaLink } from "@/components/hud/insignia-case";
import { getAllTech, getProjects, usesTech } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { config } from "@/config";
import { getMessages, getTranslations } from "next-intl/server";
import type messages from "@/i18n/messages/en.json";

const wrap = "mx-auto max-w-310 px-4";
const sectionClass = cn(wrap, "scroll-mt-20 pt-[clamp(3.5rem,8vw,6rem)]");
const pad = (n: number) => String(n).padStart(2, "0");
const commsRow = "flex min-h-13 items-center justify-between gap-4 px-5 uppercase transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight";
const commsRowOutline = "border-2 border-highlight text-heading hover:bg-highlight hover:text-background";

type InsigniaId = keyof typeof messages.Insignia.items;

export default async function Home() {
  const t = await getTranslations("Home");
  const tp = await getTranslations("Project");
  const ti = await getTranslations("Insignia.items");
  const allMessages = await getMessages();
  const projects = await getProjects();
  const featured = await getProjects(config.projects.featuredProjectsSlugs);
  const archived = projects.filter((p) => !featured.some((f) => f.title === p.title));
  const allTech = getAllTech();
  const coreTech = new Set(config.techStack.techStackCloudIcons);
  const opsFor = (icon: string) => projects.filter((p) => usesTech(p, icon));
  const liveDemos = projects.filter((p) => p.demo).length;
  const openSource = projects.filter((p) => p.github).length;

  const dossiers: InsigniaDossier[] = config.insignia.map((insignia) => {
    const id = insignia.id as InsigniaId;
    const copy = { unit: ti(`${id}.unit`), summary: ti(`${id}.summary`) };
    const item = allMessages.Insignia.items[id];

    if (insignia.operator || !insignia.tech) {
      const record = "record" in item ? item.record : [];
      return {
        ...insignia,
        ...copy,
        caption: t("insignia.operatorCaption"),
        stats: [[pad(record.length), t("insignia.recordEntries")], [pad(config.certificates.length), t("insignia.certifications")], [pad(projects.length), t("insignia.operations")]],
        certificates: [],
        partners: [],
        operations: [],
        record,
      };
    }

    const ops = opsFor(insignia.tech).filter((p) => !p.slug || !insignia.excludeProjects?.includes(p.slug));
    const certificates = insignia.certificateIssuer
      ? config.certificates.filter((c) => c.issuer === insignia.certificateIssuer)
      : [];
    const partners = [...ops.flatMap((p) => p.techs ?? []), ...insignia.extraPartners ?? []]
      .filter((tech, i, all) => tech.icon !== insignia.tech && !insignia.excludePartners?.includes(tech.icon) && all.findIndex((other) => other.icon === tech.icon) === i);
    // optional `work` list in messages: professional work listed under "Deployed in" ahead of the portfolio projects
    const work = "work" in item ? item.work.map((title) => ({ title })) : [];

    if (certificates.length > 0) {
      const count = (track: string) => certificates.filter((c) => c.name.includes(track)).length;
      return {
        ...insignia,
        ...copy,
        caption: t("insignia.certificationsCaption", { count: certificates.length }),
        stats: [[pad(certificates.length), t("insignia.certifications")], [pad(count("Backend")), t("insignia.backend")], [pad(count("Frontend")), t("insignia.frontend")]],
        certificates,
        partners,
        operations: [...work, ...ops],
      };
    }
    return {
      ...insignia,
      ...copy,
      caption: t("insignia.operationsCaption", { count: ops.length }),
      stats: [[pad(ops.length), t("insignia.operations")], [pad(ops.filter((p) => p.demo).length), t("insignia.liveDemos")], [pad(ops.filter((p) => p.github).length), t("insignia.openSource")]],
      meter: { label: t("insignia.share"), value: `${ops.length} / ${projects.length}`, percent: ops.length / projects.length * 100 },
      certificates,
      partners,
      operations: [...work, ...ops],
    };
  });

  const ticker = [
    t("ticker.latest", { title: projects[0].title, description: projects[0].description }),
    t("ticker.open"),
    t("ticker.certified", { count: config.certificates.length }),
    t("ticker.tech", { count: allTech.length }),
    t("ticker.operations", { count: projects.length, openSource }),
    t("ticker.built"),
  ];

  const stacks = [
    { label: t("stack.primaryLabel"), title: t("stack.primaryTitle"), items: config.techStack.techStackMarquee1Icons },
    { label: t("stack.secondaryLabel"), title: t("stack.secondaryTitle"), items: config.techStack.techStackMarquee2Icons },
  ];

  return (
    <>
      <Hotkeys />
      <div id="top" className="scroll-mt-20" />

      {/* ================= HERO ================= */}
      <section className={cn(wrap, "grid items-start gap-[clamp(1.5rem,4vw,3.5rem)] pt-[clamp(2.5rem,6vw,5rem)] pb-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]")} aria-labelledby="opName">
        <div>
          <div className="dep mb-6 flex flex-wrap gap-x-5 gap-y-1.5">
            {[t("hero.dossier"), t("hero.id")].map((label) => (
              <span key={label} className="flex items-center gap-2 hud-label before:h-0.5 before:w-4.5 before:bg-primary">{label}</span>
            ))}
          </div>
          <h1 id="opName" className="dep font-heading text-[clamp(4.2rem,15vw,10.5rem)] leading-[.8] font-extrabold tracking-[-0.005em] uppercase">
            <ScrambleText text="Fabian" className="block text-heading" />
            <ScrambleText text="Kleine" delay={170} className="hud-outline mt-[0.04em] block" />
          </h1>
          <div className="dep my-6 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <Badge variant="outline">{t("hero.path")}</Badge>
            <Badge><LiveDot />{t("hero.open")}</Badge>
          </div>
          <p className="dep max-w-[58ch] text-[1.06rem] leading-relaxed">
            {t("hero.intro")}
          </p>
          <div className="dep mt-8 flex flex-wrap gap-3">
            <Button asChild size="hud">
              <Link href="#operations">{t("hero.viewOperations")} <kbd>O</kbd></Link>
            </Button>
            <Button asChild variant="signal" size="hud">
              <Link href="#comms">{t("hero.openComms")} <kbd>C</kbd></Link>
            </Button>
          </div>
        </div>

        <Card className="dep wipe gap-5 py-5" aria-label={t("stats.label")}>
          <CardHeader className="grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 px-5">
            <svg className="row-span-2 size-14.5" viewBox="0 0 58 58" aria-hidden="true">
              <polygon points="29,2 55,16 55,42 29,56 3,42 3,16" className="fill-background stroke-border-strong" strokeWidth="2" />
              <path d="M15 34 29 26l14 8M15 41l14-8 14 8" fill="none" className="stroke-primary" strokeWidth="3.2" />
              <path d="M29 10l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8Z" className="fill-highlight" />
            </svg>
            <CardTitle>{t("stats.rank")}</CardTitle>
            <CardDescription>{t("stats.callsign")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-5">
            <InsigniaLink id={config.insignia.find((insignia) => insignia.operator)?.id} className="group/posting flex items-center justify-between gap-3 border bg-popover px-3.5 py-2.5 transition-colors hover:border-primary">
              <span className="grid min-w-0 gap-0.5">
                <span className="flex items-center gap-1.5 hud-meta text-[0.62rem]"><LiveDot className="bg-primary" />{t("stats.postingLabel")}</span>
                <span className="truncate font-heading text-lg leading-tight font-bold tracking-[0.05em] text-heading uppercase">{t("stats.posting")}</span>
              </span>
              <ArrowRight className="size-4 flex-none text-primary transition-transform group-hover/posting:translate-x-0.5" />
            </InsigniaLink>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between hud-meta"><span>{t("stats.liveDeployments")}</span><b className="font-normal text-highlight tabular-nums">{liveDemos} / {projects.length}</b></div>
              <Meter value={liveDemos / projects.length * 100} className="h-2" />
            </div>
            <dl className="grid grid-cols-2 gap-px border bg-border">
              {[
                [projects.length, t("stats.operations")],
                [allTech.length, t("stats.stackItems")],
                [config.certificates.length, t("stats.certifications")],
                [openSource, t("stats.openSource")],
              ].map(([value, label], i) => (
                <div key={label} className="bg-popover px-3.5 py-3">
                  <dt className="hud-meta text-[0.64rem]">{label}</dt>
                  <dd className="mt-0.5 font-heading text-3xl leading-none font-bold text-heading"><CountUp to={value as number} pad={2} delay={i * 120} /></dd>
                </div>
              ))}
            </dl>
            <div className="relative border bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--glow)_25%,transparent),transparent_70%)]">
              <Radar contacts={featured.map((p) => p.title)} />
              <div className="pointer-events-none absolute inset-x-3 top-2 flex justify-between hud-meta text-[0.62rem]">
                <span>{t("stats.tacmap")}</span>
                <span>{t("stats.contacts", { count: featured.length })}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ================= TICKER ================= */}
      <div className="dep relative overflow-hidden border-y bg-primary/10" aria-hidden="true">
        <div className="hud-ticker flex w-max gap-12 py-2.5 font-mono text-xs tracking-[0.18em] text-highlight uppercase">
          {[...ticker, ...ticker].map((line, i) => (
            <span key={i} className="whitespace-nowrap before:mr-4 before:text-primary before:content-['//']">{line}</span>
          ))}
        </div>
      </div>

      {/* ================= STACK ================= */}
      <section id="stack" className={sectionClass} aria-labelledby="stackH">
        <SectionHeading id="stackH" eyebrow={t("stack.eyebrow")} title={t("stack.title")} meta={t("stack.meta", { count: pad(allTech.length) })} className="dep" />
        <div className="grid gap-4 lg:grid-cols-2">
          {stacks.map((stack) => (
            <Card key={stack.title} className="dep wipe gap-5 transition-colors hover:border-border-strong">
              <CardHeader>
                <span className="hud-label">{stack.label}</span>
                <CardTitle className="text-[clamp(2.2rem,5vw,3rem)]">{stack.title}</CardTitle>
                <CardDescription>{t("stack.summary", { core: stack.items.filter((tech) => coreTech.has(tech.icon)).length, total: stack.items.length })}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] border-t border-l">
                  {stack.items.map((tech) => (
                    <div key={tech.name} className="grid content-start gap-1 border-r border-b bg-popover px-3.5 py-3 transition-colors hover:bg-secondary">
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn("hud-meta text-[0.6rem]", coreTech.has(tech.icon) && "text-primary")}>
                          {coreTech.has(tech.icon) ? t("stack.core") : t("stack.support")}
                        </span>
                        <TechIcon name={tech.name} icon={tech.icon} size={18} />
                      </div>
                      <strong className="font-heading text-xl leading-tight font-bold tracking-[0.05em] text-heading uppercase">{tech.name}</strong>
                      <div className="mt-1 flex justify-between gap-2 hud-meta text-[0.6rem]">
                        <span>{t("stack.level", { level: String(tech.level) })}</span>
                        <b className="font-normal text-highlight tabular-nums">{t("stack.levelOf", { level: tech.level })}</b>
                      </div>
                      <Meter value={tech.level / 5 * 100} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= INSIGNIA ================= */}
      <section id="insignia" className={sectionClass} aria-labelledby="insH">
        <SectionHeading id="insH" eyebrow={t("insignia.eyebrow")} title={t("insignia.title")} meta={t("insignia.meta", { count: pad(dossiers.length) })} className="dep" />
        <div className="dep wipe">
          <InsigniaCase items={dossiers} />
        </div>
      </section>

      {/* ================= OPERATIONS ================= */}
      <section id="operations" className={sectionClass} aria-labelledby="opsH">
        <SectionHeading id="opsH" eyebrow={t("operations.eyebrow")} title={t("operations.title")} meta={t("operations.meta", { featured: pad(featured.length), total: pad(projects.length) })} className="dep" />
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((project) => (
            <Card key={project.title} className="dep wipe gap-5 pt-0 transition-[translate,border-color] duration-200 hover:-translate-y-1 hover:border-border-strong">
              <ImageVideo title={project.title} img={project.img} video={project.video} className="w-full rounded-none shadow-none" />
              <CardHeader>
                <CardTitle className="text-[clamp(1.9rem,4vw,2.5rem)]">{project.title}</CardTitle>
                <CardDescription>{tp("sector", { list: project.techs?.slice(0, 2).map((tech) => tech.name).join(" / ") ?? "" })}</CardDescription>
                <CardAction>
                  <StatusBadge status={projectStatus(project)}>{tp(projectStatus(project))}</StatusBadge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-base first-letter:uppercase">{project.description}</p>
                <ul className="flex flex-col gap-1.5 text-muted-foreground">
                  {project.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet} className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-primary">{bullet}</li>
                  ))}
                </ul>
                <Separator />
                <div className="flex flex-wrap gap-1.5">
                  {project.techs?.map((tech) => <Badge key={tech.name} variant="secondary">{tech.name}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex-wrap gap-2">
                {project.slug && (
                  <Button asChild variant="terminal" size="sm">
                    <Link href={`/projects/${project.slug}`}>{tp("viewProject")} <ArrowRight data-icon="inline-end" /></Link>
                  </Button>
                )}
                {project.demo && (
                  <Button asChild variant="terminal" size="sm">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"><ExternalLink data-icon="inline-start" />{tp("liveDemo")}</a>
                  </Button>
                )}
                {project.github && (
                  <Button asChild variant="terminal" size="sm">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"><GithubIcon />{tp("source")}</a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}

          <Card className="dep wipe gap-5 bg-[repeating-linear-gradient(-45deg,color-mix(in_oklab,var(--glow)_10%,transparent)_0_12px,transparent_12px_24px)]">
            <CardHeader>
              <CardTitle className="text-[clamp(1.9rem,4vw,2.5rem)]">{t("operations.archiveTitle")}</CardTitle>
              <CardDescription>{t("operations.archiveSector", { count: pad(archived.length) })}</CardDescription>
              <CardAction><Badge variant="outline">{t("operations.classified")}</Badge></CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-base">
                {t.rich("operations.archiveText", {
                  count: archived.length,
                  long: () => <span className="inline-block h-[0.9em] w-[5em] bg-border-strong align-[-0.05em]" />,
                  short: () => <span className="inline-block h-[0.9em] w-[3em] bg-border-strong align-[-0.05em]" />,
                })}
              </p>
              <Separator />
              <div className="flex flex-wrap gap-1.5">
                {archived.map((p) => <Badge key={p.title} variant="outline">{p.title}</Badge>)}
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button asChild variant="terminal" size="sm">
                <Link href="/projects">{t("operations.openArchive")} <ArrowRight data-icon="inline-end" /></Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* ================= COMMS ================= */}
      <section id="comms" className={sectionClass} aria-labelledby="commsH">
        <SectionHeading id="commsH" eyebrow={t("comms.eyebrow")} title={t("comms.title")} meta={t("comms.meta")} className="dep" />
        <div className="dep wipe">
          {/* inner element carries the corner cut, the wipe animation owns the outer clip-path */}
          <div className="relative isolate overflow-hidden bg-[color-mix(in_oklab,var(--glow)_55%,var(--background))] [clip-path:polygon(0_0,calc(100%-24px)_0,100%_24px,100%_100%,24px_100%,0_calc(100%-24px))]">
            <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full md:w-[68%] text-highlight mask-[linear-gradient(to_right,transparent,#000_55%)]">
              <EuropeMap label={t("comms.mapLabel")} className="size-full" />
            </div>
            <div className="grid items-end gap-x-12 gap-y-10 p-[clamp(1.75rem,6vw,4.5rem)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              <div>
                <p className="mb-5 flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-highlight uppercase">
                  <LiveDot />{t("comms.channel")}{" // "}{t("comms.open")}
                </p>
                <h3 className="hud-title text-[clamp(2.6rem,7vw,5.75rem)] text-balance">{t("comms.heading")}</h3>
                <p className="mt-6 max-w-[52ch] text-lg leading-relaxed font-medium">{t("comms.text")}</p>
                <p className="mt-3 font-mono text-sm tracking-[0.08em] text-highlight/75 uppercase">{t("comms.status")}</p>
              </div>
              <div className="flex flex-col gap-3 font-mono text-sm font-bold tracking-[0.14em] uppercase">
                <ContactDialog>
                  <button type="button" className={cn(commsRow, "bg-background text-heading hover:bg-secondary")}>
                    {t("comms.contactForm")}<span className="text-primary">&gt;&gt;</span>
                  </button>
                </ContactDialog>
                <a href="https://github.com/Fabian-Kleine" target="_blank" rel="noopener noreferrer" className={cn(commsRow, commsRowOutline)}>
                  {t("comms.github")}<span className="flex items-center gap-2"><ExternalLink className="size-4" />&gt;&gt;</span>
                </a>
                <Link href="/projects" className={cn(commsRow, commsRowOutline)}>
                  {t("comms.archive")}<span className="tabular-nums">{pad(projects.length)} &gt;&gt;</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-highlight/20 px-[clamp(1.75rem,6vw,4.5rem)] py-3 font-mono text-[0.7rem] tracking-[0.16em] text-highlight uppercase">
              <span className="flex items-center gap-2"><span aria-hidden="true" className="inline-block size-1.5 bg-current" />{t("comms.mapTitle")}{" // "}{t("comms.mapLocation")}</span>
              <span className="opacity-75">51.5°N // 6.4°E</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
