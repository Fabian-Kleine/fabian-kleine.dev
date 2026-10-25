import { config } from "@/config";
import { ProjectMetaData } from "@/types";

export async function getProjects(slugs: string[] = config.projects.projectsSlugs) {
    return Promise.all(
        slugs.map(async (slug) => {
            const { metadata } = await import(`@/projects/${slug}.mdx`) as { metadata: ProjectMetaData };
            return metadata;
        })
    );
}

export function usesTech(project: ProjectMetaData, icon: string) {
    return project.techs?.some((tech) => tech.icon === icon) ?? false;
}

/** every tech from the homepage marquees, in display order */
export function getAllTech() {
    return [...config.techStack.techStackMarquee1Icons, ...config.techStack.techStackMarquee2Icons];
}
