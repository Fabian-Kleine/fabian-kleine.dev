import { TypographyH1, TypographyList, TypographyP } from "@/components/blog/typography";
import ImageVideo from "@/components/blog/image-video";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { SimpleIconsTag } from "@/components/ui/simpleicons-tag";
import { ProjectMetaData } from "@/types";
import GithubIcon from "@/components/icons/github";
import { config } from "@/config";
import { Metadata } from "next";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { default: Post, metadata }: { default: React.ComponentType, metadata: ProjectMetaData } = await import(`@/projects/${slug}.mdx`)

    return <>
        <div className="mb-8 flex flex-col items-center justify-center gap-4">
            <ImageVideo
                title={metadata.title}
                img={metadata.img}
                video={metadata.video}
                className="max-w-[400px]"
            />
            <div className="flex flex-col gap-2 text-center">
                <h1 className="tracking-tighter text-2xl sm:text-3xl md:text-4xl lg:text-5xl/none font-bold">{metadata.title}</h1>
                <TypographyP className="!mt-1">{metadata.description}</TypographyP>
            </div>
            <div className="flex justify-center flex-wrap gap-2">
                {metadata.techs?.map((tech: { name: string, icon: string }, index: number) => (
                    <SimpleIconsTag key={index} name={tech.name} icon={tech.icon} />
                ))}
            </div>
            <div className="flex gap-4 pt-4">
                {metadata.demo && (
                    <a href={metadata.demo} target="_blank" rel="noopener noreferrer">
                        <Button size="lg">
                            <ExternalLink />
                            Live Demo
                        </Button>
                    </a>
                )}
                {metadata.github && (
                    <a href={metadata.github} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" variant="outline">
                            <GithubIcon />
                            View Code
                        </Button>
                    </a>
                )}
            </div>
        </div>
        <TypographyH1>Quick Overview</TypographyH1>
        <TypographyList className="space-y-4 list-none ml-1">
            {metadata.bullets.map((bullet: string, index: number) => (
                <li key={index} className="flex gap-1">
                    <span>✨</span>
                    <span>{bullet}</span>
                </li>
            ))}
        </TypographyList>
        <Post />
        <div className="my-24" />
    </>
}

export function generateStaticParams() {
    const slugs = config.projects.projectsSlugs;

    return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }:  { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const { metadata }: { metadata: ProjectMetaData } = await import(`@/projects/${slug}.mdx`)
    return {
        title: `${metadata.title} | Fabian Kleine | Portfolio`,
        description: metadata.description,
    }
}