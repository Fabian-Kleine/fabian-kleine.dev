import Project from "@/components/project";
import { SectionHeading } from "@/components/hud/section-heading";
import { getProjects } from "@/lib/projects";
import { getTranslations } from "next-intl/server";

export default async function Projects() {
    const projects = await getProjects();
    const openSource = projects.filter((p) => p.github).length;
    const t = await getTranslations("Projects");

    return (
        <section className="mx-auto max-w-310 px-4 pt-[clamp(2.5rem,6vw,5rem)]">
            <SectionHeading
                as="h1"
                id="archiveH"
                eyebrow={t("eyebrow")}
                title={t("title")}
                meta={t("meta", { total: String(projects.length).padStart(2, "0"), openSource: String(openSource).padStart(2, "0") })}
                className="dep"
            />
            <div className="flex flex-col gap-6">
                {projects.map((project, index) => (
                    <Project
                        key={index}
                        metadata={project}
                        className="dep"
                    />
                ))}
            </div>
        </section>
    )
}
