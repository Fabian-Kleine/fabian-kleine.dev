import Project from "@/components/project";
import { SectionHeading } from "@/components/hud/section-heading";
import { getProjects } from "@/lib/projects";

export default async function Projects() {
    const projects = await getProjects();
    const openSource = projects.filter((p) => p.github).length;

    return (
        <section className="mx-auto max-w-310 px-4 pt-[clamp(2.5rem,6vw,5rem)]">
            <SectionHeading
                as="h1"
                id="archiveH"
                eyebrow="Mission archive // all debriefs"
                title="All Operations"
                meta={`${String(projects.length).padStart(2, "0")} on file // ${String(openSource).padStart(2, "0")} open source`}
                className="dep"
            />
            <div className="flex flex-col gap-6">
                {projects.map((project, index) => (
                    <Project
                        key={index}
                        metadata={project}
                        className="dep"
                        style={{ "--d": index + 1 } as React.CSSProperties}
                    />
                ))}
            </div>
        </section>
    )
}
