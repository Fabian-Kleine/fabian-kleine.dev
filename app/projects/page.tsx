import Project from "@/components/project";
import { ProjectMetaData } from "@/types";

const projectsSlugs = [
    "weather-app",
    "sil-touch",
    "mockup-creator",
    "mywishlists",
];

const getProjects = async () => {
    const featuredProjects = await Promise.all(
        projectsSlugs.map(async (slug) => {
            const { metadata } = await import(`@/projects/${slug}.mdx`) as { metadata: ProjectMetaData };
            return metadata;
        })
    );
    return featuredProjects;
}

export default async function Projects() {
    const projects = await getProjects();

    return (
        <section className="w-full border-t bg-background px-6 lg:px-36 pt-24 mt-4">
            <h1 className="tracking-tighter text-2xl sm:text-3xl md:text-4xl lg:text-5xl/none font-bold">All My Projects</h1>
            <div className="space-y-28 my-28">
                {projects.map((project, index) => (
                    <Project
                        key={index}
                        metadata={project}
                    />
                ))}
            </div>
        </section>
    )
}