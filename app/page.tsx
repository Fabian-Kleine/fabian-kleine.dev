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
import { TechIcon } from "@/components/hud/tech-icon";
import { LiveDot } from "@/components/hud/live-dot";
import { Hotkeys } from "@/components/hud/hotkeys";
import { InsigniaCase, InsigniaDossier } from "@/components/hud/insignia-case";
import { getAllTech, getProjects, usesTech } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { config } from "@/config";

const wrap = "mx-auto max-w-310 px-4";
const sectionClass = cn(wrap, "scroll-mt-20 pt-[clamp(3.5rem,8vw,6rem)]");
const pad = (n: number) => String(n).padStart(2, "0");

export default async function Home() {
  const projects = await getProjects();
  const featured = await getProjects(config.projects.featuredProjectsSlugs);
  const archived = projects.filter((p) => !featured.some((f) => f.title === p.title));
  const allTech = getAllTech();
  const coreTech = new Set(config.techStack.techStackCloudIcons);
  const opsFor = (icon: string) => projects.filter((p) => usesTech(p, icon));
  const maxOps = Math.max(1, ...allTech.map((t) => opsFor(t.icon).length));
  const liveDemos = projects.filter((p) => p.demo).length;
  const openSource = projects.filter((p) => p.github).length;

  const dossiers: InsigniaDossier[] = config.insignia.map((insignia) => {
    const ops = opsFor(insignia.tech);
    const certificates = insignia.certificateIssuer
      ? config.certificates.filter((c) => c.issuer === insignia.certificateIssuer)
      : [];
    const partners = [...new Set(ops.flatMap((p) => p.techs ?? []).filter((t) => t.icon !== insignia.tech).map((t) => t.name))];

    if (certificates.length > 0) {
      const count = (track: string) => certificates.filter((c) => c.name.includes(track)).length;
      return {
        ...insignia,
        caption: `${certificates.length} certifications`,
        stats: [[pad(certificates.length), "Certifications"], [pad(count("Backend")), "Backend"], [pad(count("Frontend")), "Frontend"]],
        certificates,
        partners,
        operations: ops,
      };
    }
    return {
      ...insignia,
      caption: `${ops.length} operations`,
      stats: [[pad(ops.length), "Operations"], [pad(ops.filter((p) => p.demo).length), "Live demos"], [pad(ops.filter((p) => p.github).length), "Open source"]],
      meter: { label: "Share of operations", value: `${ops.length} / ${projects.length}`, percent: ops.length / projects.length * 100 },
      certificates,
      partners,
      operations: ops,
    };
  });

  const ticker = [
    `Latest operation: ${projects[0].title}, ${projects[0].description}`,
    "Open to opportunities",
    `${config.certificates.length}x Shopware 6 certified`,
    `${allTech.length} technologies in the stack`,
    `${projects.length} operations on record, ${openSource} open source`,
    "Built with Next.js and shadcn/ui",
  ];

  const stacks = [
    { label: "Primary stack", title: "Arsenal", items: config.techStack.techStackMarquee1Icons },
    { label: "Secondary stack", title: "Field kit", items: config.techStack.techStackMarquee2Icons },
  ];

  // stagger every block of the interface build-up in document order
  let order = 0;
  const next = () => ({ "--d": order++ }) as React.CSSProperties;

  return (
    <>
      <Hotkeys />
      <div id="top" className="scroll-mt-20" />

      {/* ================= HERO ================= */}
      <section className={cn(wrap, "grid items-start gap-[clamp(1.5rem,4vw,3.5rem)] pt-[clamp(2.5rem,6vw,5rem)] pb-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]")} aria-labelledby="opName">
        <div>
          <div className="dep mb-6 flex flex-wrap gap-x-5 gap-y-1.5" style={next()}>
            {["Operator dossier", "ID FK-0800", "Class: Web developer"].map((label) => (
              <span key={label} className="flex items-center gap-2 hud-label before:h-0.5 before:w-4.5 before:bg-primary">{label}</span>
            ))}
          </div>
          <h1 id="opName" className="dep font-heading text-[clamp(4.2rem,15vw,10.5rem)] leading-[.8] font-extrabold tracking-[-0.005em] uppercase" style={next()}>
            <ScrambleText text="Fabian" className="block text-heading" />
            <ScrambleText text="Kleine" delay={170} className="hud-outline mt-[0.04em] block" />
          </h1>
          <div className="dep my-6 flex flex-wrap items-center gap-x-4 gap-y-2.5" style={next()}>
            <strong className="font-heading text-[clamp(1.4rem,3.4vw,2rem)] font-bold tracking-[0.06em] text-heading uppercase">Web Developer</strong>
            <Badge variant="outline">Apprentice // Self-taught</Badge>
            <Badge><LiveDot />Open to opportunities</Badge>
          </div>
          <p className="dep max-w-[58ch] text-[1.06rem] leading-relaxed" style={next()}>
            I&apos;m an apprentice and self-taught programmer focusing on web development.
            I build modern, accessible web applications with a focus on clean code and great user experience.
          </p>
          <div className="dep mt-8 flex flex-wrap gap-3" style={next()}>
            <Button asChild size="hud">
              <Link href="#operations">View operations <kbd>O</kbd></Link>
            </Button>
            <Button asChild variant="signal" size="hud">
              <Link href="#comms">Open comms <kbd>C</kbd></Link>
            </Button>
          </div>
        </div>

        <Card className="dep wipe gap-5 py-5" style={next()} aria-label="Operator stats">
          <CardHeader className="grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 px-5">
            <svg className="row-span-2 size-14.5" viewBox="0 0 58 58" aria-hidden="true">
              <polygon points="29,2 55,16 55,42 29,56 3,42 3,16" className="fill-background stroke-border-strong" strokeWidth="2" />
              <path d="M15 34 29 26l14 8M15 41l14-8 14 8" fill="none" className="stroke-primary" strokeWidth="3.2" />
              <path d="M29 10l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8Z" className="fill-highlight" />
            </svg>
            <CardTitle>Rank: Apprentice</CardTitle>
            <CardDescription>Web developer // callsign Kleine</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between hud-meta"><span>Live deployments</span><b className="font-normal text-highlight tabular-nums">{liveDemos} / {projects.length}</b></div>
              <Meter value={liveDemos / projects.length * 100} className="h-2" />
            </div>
            <dl className="grid grid-cols-2 gap-px border bg-border">
              {[
                [projects.length, "Operations"],
                [allTech.length, "Stack items"],
                [config.certificates.length, "Certifications"],
                [openSource, "Open source"],
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
                <span>Tacmap // Operations</span>
                <span>{featured.length} contacts</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ================= TICKER ================= */}
      <div className="dep relative overflow-hidden border-y bg-primary/10" style={next()} aria-hidden="true">
        <div className="hud-ticker flex w-max gap-12 py-2.5 font-mono text-xs tracking-[0.18em] text-highlight uppercase">
          {[...ticker, ...ticker].map((line, i) => (
            <span key={i} className="whitespace-nowrap before:mr-4 before:text-primary before:content-['//']">{line}</span>
          ))}
        </div>
      </div>

      {/* ================= STACK ================= */}
      <section id="stack" className={sectionClass} aria-labelledby="stackH">
        <SectionHeading id="stackH" eyebrow="Languages, frameworks, field tools" title="Stack" meta={`${pad(allTech.length)} items equipped`} className="dep" style={next()} />
        <div className="grid gap-4 lg:grid-cols-2">
          {stacks.map((stack) => (
            <Card key={stack.title} className="dep wipe gap-5 transition-colors hover:border-border-strong" style={next()}>
              <CardHeader>
                <span className="hud-label">{stack.label}</span>
                <CardTitle className="text-[clamp(2.2rem,5vw,3rem)]">{stack.title}</CardTitle>
                <CardDescription>{stack.items.filter((t) => coreTech.has(t.icon)).length} core // {stack.items.length} equipped</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] border-t border-l">
                  {stack.items.map((tech) => {
                    const ops = opsFor(tech.icon).length;
                    return (
                      <div key={tech.name} className="grid content-start gap-1 border-r border-b bg-popover px-3.5 py-3 transition-colors hover:bg-secondary">
                        <div className="flex items-center justify-between gap-2">
                          <span className={cn("hud-meta text-[0.6rem]", coreTech.has(tech.icon) && "text-primary")}>
                            {coreTech.has(tech.icon) ? "Core" : "Support"}
                          </span>
                          <TechIcon name={tech.name} icon={tech.icon} size={18} />
                        </div>
                        <strong className="font-heading text-xl leading-tight font-bold tracking-[0.05em] text-heading uppercase">{tech.name}</strong>
                        <div className="mt-1 flex justify-between hud-meta text-[0.6rem]">
                          <span>Deployed</span>
                          <b className="font-normal text-highlight tabular-nums">{ops} {ops === 1 ? "op" : "ops"}</b>
                        </div>
                        <Meter value={ops / maxOps * 100} className="h-1" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= INSIGNIA ================= */}
      <section id="insignia" className={sectionClass} aria-labelledby="insH">
        <SectionHeading id="insH" eyebrow="Commendations // select to inspect" title="Insignia" meta={`${pad(dossiers.length)} awarded`} className="dep" style={next()} />
        <div className="dep wipe" style={next()}>
          <InsigniaCase items={dossiers} />
        </div>
      </section>

      {/* ================= OPERATIONS ================= */}
      <section id="operations" className={sectionClass} aria-labelledby="opsH">
        <SectionHeading id="opsH" eyebrow="Selected work // mission debriefs" title="Operations" meta={`${pad(featured.length)} featured // ${pad(projects.length)} on file`} className="dep" style={next()} />
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((project) => (
            <Card key={project.title} className="dep wipe gap-5 pt-0 transition-[translate,border-color] duration-200 hover:-translate-y-1 hover:border-border-strong" style={next()}>
              <ImageVideo title={project.title} img={project.img} video={project.video} className="w-full rounded-none shadow-none" />
              <CardHeader>
                <CardTitle className="text-[clamp(1.9rem,4vw,2.5rem)]">{project.title}</CardTitle>
                <CardDescription>Sector: {project.techs?.slice(0, 2).map((t) => t.name).join(" / ")}</CardDescription>
                <CardAction>
                  {project.demo ? <Badge><LiveDot />Live</Badge> : <Badge variant="outline">Source</Badge>}
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
                    <Link href={`/projects/${project.slug}`}>View project <ArrowRight data-icon="inline-end" /></Link>
                  </Button>
                )}
                {project.demo && (
                  <Button asChild variant="terminal" size="sm">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"><ExternalLink data-icon="inline-start" />Live demo</a>
                  </Button>
                )}
                {project.github && (
                  <Button asChild variant="terminal" size="sm">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"><GithubIcon />Source</a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}

          <Card className="dep wipe gap-5 bg-[repeating-linear-gradient(-45deg,color-mix(in_oklab,var(--glow)_10%,transparent)_0_12px,transparent_12px_24px)]" style={next()}>
            <CardHeader>
              <CardTitle className="text-[clamp(1.9rem,4vw,2.5rem)]">Archive</CardTitle>
              <CardDescription>Sector: Archive // {pad(archived.length)} files</CardDescription>
              <CardAction><Badge variant="outline">Classified</Badge></CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-base">
                {archived.length} more operations on file, from <span className="inline-block h-[0.9em] w-[5em] bg-border-strong align-[-0.05em]" /> to{" "}
                <span className="inline-block h-[0.9em] w-[3em] bg-border-strong align-[-0.05em]" />. Clearance granted for the full archive.
              </p>
              <Separator />
              <div className="flex flex-wrap gap-1.5">
                {archived.map((p) => <Badge key={p.title} variant="outline">{p.title}</Badge>)}
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button asChild variant="terminal" size="sm">
                <Link href="/projects">Open archive <ArrowRight data-icon="inline-end" /></Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* ================= COMMS ================= */}
      <section id="comms" className={sectionClass} aria-labelledby="commsH">
        <SectionHeading id="commsH" eyebrow="Secure channel" title="Comms" meta="Contact form // GitHub" className="dep" style={next()} />
        <div className="grid items-start gap-[clamp(1.5rem,4vw,3rem)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="dep" style={next()}>
            <h3 className="mb-4 hud-title text-[clamp(2.2rem,5vw,3.2rem)] text-balance">Got a mission? Open a channel.</h3>
            <p className="mb-4 max-w-[52ch]">
              If you have any questions or inquiries, feel free to reach out by filling in the contact form. I will get back to you as soon as possible.
            </p>
            <p className="text-muted-foreground">Currently open to opportunities.</p>
          </div>
          <Card className="dep wipe gap-0 px-5 py-5 font-mono text-sm tracking-[0.04em]" style={next()} aria-label="Contact details">
            <div className="mb-2 flex justify-between gap-4 border-b pb-3 text-[0.7rem] tracking-[0.18em] text-muted-foreground">
              <span>CHANNEL // ENCRYPTED</span>
              <span className="flex items-center gap-1.5"><LiveDot className="bg-primary" />OPEN</span>
            </div>
            {[
              {
                k: "CONTACT",
                v: <span className="text-heading">Contact form</span>,
                action: (
                  <ContactDialog>
                    <Button variant="terminal" size="xs">OPEN</Button>
                  </ContactDialog>
                ),
              },
              {
                k: "GITHUB",
                v: <a href="https://github.com/Fabian-Kleine" target="_blank" rel="noopener noreferrer" className="text-heading hover:text-primary">github.com/Fabian-Kleine</a>,
                action: <Badge variant="outline" aria-hidden="true">EXT</Badge>,
              },
              {
                k: "ARCHIVE",
                v: <Link href="/projects" className="text-heading hover:text-primary">/projects</Link>,
                action: <Badge variant="outline" aria-hidden="true">{pad(projects.length)}</Badge>,
              },
              {
                k: "STATUS",
                v: <span className="text-heading">AWAITING TRANSMISSION <span className="inline-block h-[1em] w-[0.55em] animate-blink bg-primary align-[-0.15em]" /></span>,
                action: null,
              },
            ].map((row) => (
              <div key={row.k} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 border-b border-dashed py-2.5 last:border-b-0 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto]">
                <span className="col-span-full text-[0.72rem] tracking-[0.14em] text-muted-foreground sm:col-span-1">{row.k}</span>
                <span className="min-w-0 wrap-anywhere">{row.v}</span>
                {row.action}
              </div>
            ))}
          </Card>
        </div>
      </section>
    </>
  );
}
