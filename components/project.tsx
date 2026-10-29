import { cn } from "@/lib/utils";
import { SimpleIconsTag } from "./ui/simpleicons-tag";
import { Button } from "./ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight, ExternalLink } from "lucide-react";
import GithubIcon from "./icons/github";
import Link from "next/link";
import ImageVideo from "./blog/image-video";
import { StatusBadge, projectStatus } from "./hud/status-badge";
import { ProjectMetaData } from "@/types";
import { useTranslations } from "next-intl";

type ProjectProps =
    | ({ className?: string; style?: React.CSSProperties } & ProjectMetaData & { metadata?: never })
    | { className?: string; style?: React.CSSProperties; metadata: ProjectMetaData; } & Partial<ProjectMetaData>;

export default function Project({ className, style, metadata, title, img, video, description, bullets, techs, demo, github, slug }: ProjectProps) {
    const projectTitle = title || metadata?.title || "Project Title Not Found";
    const projectImg = img || metadata?.img || "/projects/portfolio.png";
    const projectVideo = video || metadata?.video;
    const projectDescription = description || metadata?.description || "Project Description Not Found";
    const projectBullets = bullets || metadata?.bullets || ["No description available."];
    const projectTechs = techs || metadata?.techs || [{ name: "React", icon: "react" }];
    const projectDemo = demo || metadata?.demo;
    const projectGithub = github || metadata?.github;
    const projectSlug = slug || metadata?.slug;
    const status = projectStatus({ demo: projectDemo, github: projectGithub });
    const t = useTranslations("Project");

    return (
        <Card className={cn("grid gap-0 py-0 lg:grid-cols-2", className)} style={style}>
            <div className="relative border-b lg:border-r lg:border-b-0">
                <ImageVideo title={projectTitle} img={projectImg} video={projectVideo} className="w-full rounded-none shadow-none" />
            </div>
            <div className="flex flex-col gap-5 py-6">
                <CardHeader>
                    <CardTitle className="text-[clamp(1.9rem,4vw,2.6rem)]">
                        {projectSlug ? (
                            <Link href={`/projects/${projectSlug}`} className="underline-offset-4 hover:text-primary hover:underline">{projectTitle}</Link>
                        ) : (
                            <>{projectTitle}</>
                        )}
                    </CardTitle>
                    <CardDescription>{t("sector", { list: projectTechs.slice(0, 2).map((tech) => tech.name).join(" / ") })}</CardDescription>
                    <CardAction>
                        <StatusBadge status={status}>{t(status)}</StatusBadge>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <p className="text-base first-letter:uppercase">{projectDescription}</p>
                    <ul className="flex flex-col gap-1.5 text-muted-foreground">
                        {projectBullets?.map((bullet, index) => (
                            <li key={index} className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-primary">
                                {bullet}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                        {projectTechs?.map((tech, index) => (
                            <SimpleIconsTag key={index} name={tech.name} icon={tech.icon} />
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="mt-auto flex-wrap gap-2">
                    {projectSlug && (
                        <Button asChild variant="terminal" size="sm">
                            <Link href={`/projects/${projectSlug}`}>{t("viewProject")} <ArrowRight data-icon="inline-end" /></Link>
                        </Button>
                    )}
                    {projectDemo && (
                        <Button asChild variant="terminal" size="sm">
                            <a href={projectDemo} target="_blank" rel="noopener noreferrer"><ExternalLink data-icon="inline-start" />{t("liveDemo")}</a>
                        </Button>
                    )}
                    {projectGithub && (
                        <Button asChild variant="terminal" size="sm">
                            <a href={projectGithub} target="_blank" rel="noopener noreferrer"><GithubIcon />{t("source")}</a>
                        </Button>
                    )}
                </CardFooter>
            </div>
        </Card>
    );
}
