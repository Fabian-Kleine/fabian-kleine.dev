import { cn } from "@/lib/utils";
import { SimpleIconsTag } from "./ui/simpleicons-tag";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import GithubIcon from "./icons/github";
import Link from "next/link";
import ImageVideo from "./blog/image-video";
import { ProjectMetaData } from "@/types";
import { unstable_ViewTransition as ViewTransition } from 'react'

type ProjectProps =
    | ({ className?: string } & ProjectMetaData & { metadata?: never })
    | { className?: string; metadata: ProjectMetaData; } & Partial<ProjectMetaData>;

export default function Project({ className, metadata, title, img, video, description, bullets, techs, demo, github, slug }: ProjectProps) {
    const projectTitle = title || metadata?.title || "Project Title Not Found";
    const projectImg = img || metadata?.img || "/projects/portfolio.png";
    const projectVideo = video || metadata?.video;
    const projectDescription = description || metadata?.description || "Project Description Not Found";
    const projectBullets = bullets || metadata?.bullets || ["No description available."];
    const projectTechs = techs || metadata?.techs || [{ name: "React", icon: "react" }];
    const projectDemo = demo || metadata?.demo;
    const projectGithub = github || metadata?.github;
    const projectSlug = slug || metadata?.slug;

    return (
        <div className={cn("flex flex-col lg:flex-row justify-center gap-10", className)}>
            <div className="lg:w-1/2 relative">
                <ViewTransition name={projectSlug}>
                    <ImageVideo title={projectTitle} img={projectImg} video={projectVideo} />
                </ViewTransition>
            </div>
            <div className="lg:w-1/2 space-y-4 lg:space-y-8">
                <div className="space-y-4">
                    <ViewTransition name={projectTitle}>
                        {projectSlug ? (
                            <Link href={`/projects/${projectSlug}`}>
                                <h3 className="flex gap-2 items-end text-3xl lg:text-4xl font-bold hover:underline">{projectTitle}<ExternalLink size={30} /></h3>
                            </Link>
                        ) : (
                            <h3 className="text-3xl lg:text-4xl font-bold">{projectTitle}</h3>
                        )}
                    </ViewTransition>
                    <p className="mt-4">{projectDescription}</p>
                    <ul className="space-y-4">
                        {projectBullets?.map((bullet, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex gap-1">
                                <span>✨</span>
                                <span>{bullet}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                    {projectTechs?.map((tech, index) => (
                        <SimpleIconsTag key={index} name={tech.name} icon={tech.icon} />
                    ))}
                </div>
                <div className="flex gap-4 pt-4">
                    {projectDemo && (
                        <a href={projectDemo} target="_blank" rel="noopener noreferrer">
                            <Button size="lg">
                                <ExternalLink />
                                Live Demo
                            </Button>
                        </a>
                    )}
                    {projectGithub && (
                        <a href={projectGithub} target="_blank" rel="noopener noreferrer">
                            <Button size="lg" variant="outline">
                                <GithubIcon />
                                View Code
                            </Button>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}