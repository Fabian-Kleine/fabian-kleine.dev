import { getLocale } from "next-intl/server";
import { config } from "@/config";
import { locales, type Locale } from "@/i18n/config";
import { ProjectMetaData } from "@/types";

type ProjectModule = { default: React.ComponentType; metadata: ProjectMetaData };

/**
 * Loads `projects/<locale>/<slug>.mdx`. A project written in only one language
 * falls back to that language; `locale` on the result says which one was loaded.
 */
export async function loadProject(slug: string, locale: Locale) {
    for (const candidate of [locale, ...locales.filter((l) => l !== locale)]) {
        try {
            const project = await import(`@/projects/${candidate}/${slug}.mdx`) as ProjectModule;
            return { ...project, locale: candidate };
        } catch {
            // not written in this language
        }
    }
    return null;
}

export async function getProjects(slugs: string[] = config.projects.projectsSlugs) {
    const locale = await getLocale();
    return Promise.all(
        slugs.map(async (slug) => {
            const project = await loadProject(slug, locale);
            if (!project) throw new Error(`Project "${slug}" from config.ts has no MDX file in projects/`);
            return project.metadata;
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
