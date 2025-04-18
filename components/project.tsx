import { cn } from "@/lib/utils";
import { SimpleIconsTag } from "./ui/simpleicons-tag";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import GithubIcon from "./icons/github";
import Link from "next/link";
import ImageVideo from "./image-video";
import { ProjectMetaData } from "@/types";

interface ProjectProps extends ProjectMetaData {
    className?: string;
}

export default function Project({ className, title, img, video, description, bullets, techs, demo, github, slug }: ProjectProps) {
    return (
        <div className={cn("flex flex-col lg:flex-row justify-center gap-10", className)}>
            <div className="lg:w-1/2 relative">
                <ImageVideo title={title} img={img} video={video} />
            </div>
            <div className="lg:w-1/2 space-y-4 lg:space-y-8">
                <div className="space-y-4">
                    {slug ? (
                        <Link href={`/projects/${slug}`}>
                            <h3 className="flex gap-2 items-end text-3xl lg:text-4xl font-bold hover:underline">{title}<ExternalLink size={30} /></h3>
                        </Link>
                    ) : (
                        <h3 className="text-3xl lg:text-4xl font-bold">{title}</h3>
                    )}
                    <p>{description}</p>
                    <ul className="space-y-4">
                        {bullets.map((bullet, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex gap-1">
                                <span>✨</span>
                                <span>{bullet}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                    {techs?.map((tech, index) => (
                        <SimpleIconsTag key={index} name={tech.name} icon={tech.icon} />
                    ))}
                </div>
                <div className="flex gap-4 pt-4">
                    {demo && (
                        <a href={demo} target="_blank" rel="noopener noreferrer">
                            <Button size="lg">
                                <ExternalLink />
                                Live Demo
                            </Button>
                        </a>
                    )}
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer">
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