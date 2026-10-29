import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Terminal } from "@/components/hud/terminal";
import { projectStatus } from "@/components/hud/status-badge";
import { config } from "@/config";
import { getAllTech, getProjects } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("Terminal");
    return {
        title: t("metaTitle"),
        robots: { index: false, follow: false },
    };
}

export default async function Page() {
    const projects = await getProjects();
    const slugs = config.projects.projectsSlugs;

    return (
        <Terminal
            projects={projects.map((project, i) => ({ slug: slugs[i], title: project.title, status: projectStatus(project) }))}
            stack={getAllTech().map(({ name, level }) => ({ name, level }))}
            insignia={config.insignia.length}
        />
    );
}
