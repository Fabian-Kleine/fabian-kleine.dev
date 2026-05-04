import { TypingAnimation } from "@/components/magicui/typing-animation";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, FolderGit2, Mail, Award } from "lucide-react";
import GithubIcon from "@/components/icons/github";
import Link from "next/link";
import { TechStackMarqueesHome } from "@/components/home/techstack-marquees-home";
import { LiquidBlob } from "@/components/home/liquid-blob";
import Project from "@/components/project";
import { ProjectMetaData } from "@/types";
import ContactDialog from "@/components/contact-dialog";
import { config } from "@/config";
import Image from "next/image";

const certificates = [
  {
    name: "Shopware 6 Certified Backend Developer",
    file: "shopware6-certified-backend-developer",
    issuer: "Shopware AG",
  },
  {
    name: "Shopware 6 Certified Backend Developer (Intermediate)",
    file: "shopware6-certified-backend-developer-intermediate",
    issuer: "Shopware AG",
  },
  {
    name: "Shopware 6 Certified Frontend Developer",
    file: "shopware6-certified-frontend-developer",
    issuer: "Shopware AG",
  },
];

const getFeaturedProjects = async () => {
  const featuredProjects = await Promise.all(
    config.projects.featuredProjectsSlugs.map(async (slug) => {
      const { metadata } = await import(`@/projects/${slug}.mdx`) as { metadata: ProjectMetaData };
      return metadata;
    })
  );
  return featuredProjects;
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      {/* Hero */}
      <section id="about" aria-label="about" className="flex flex-col justify-center min-h-screen w-full px-6 lg:px-36 border-b">
        <div className="container py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <BlurFade delay={0.2} duration={0.6} direction="up">
                <div className="flex items-center gap-2 mb-8">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Open to opportunities
                  </span>
                </div>
              </BlurFade>

              <BlurFade delay={0.35} duration={0.7} direction="up">
                <h1 className="tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
                  Hi, I&apos;m{" "}
                  <span className="text-primary">
                    Fabian Kleine
                  </span>
                </h1>
              </BlurFade>

              <BlurFade delay={0.5} duration={0.7} direction="up">
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                  I&apos;m an apprentice and self-taught programmer focusing on web development.
                  I build modern, accessible web applications with a focus on clean code and great user experience.
                </p>
              </BlurFade>

              <BlurFade delay={0.65} duration={0.7} direction="up">
                <div className="flex flex-wrap gap-3 items-center">
                  <Link href="/projects">
                    <Button size="lg">
                      <FolderGit2 />
                      View Projects
                    </Button>
                  </Link>
                  <a href="https://github.com/Fabian-Kleine" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline">
                      <GithubIcon />
                      GitHub
                    </Button>
                  </a>
                  <ContactDialog>
                    <Button size="lg" variant="ghost">
                      <Mail />
                      Get in Touch
                    </Button>
                  </ContactDialog>
                </div>
              </BlurFade>
            </div>

            <BlurFade delay={0.5} duration={0.9} direction="up" className="hidden lg:flex justify-center items-center">
              <LiquidBlob />
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="technologies" className="w-full bg-background px-6 lg:px-36 py-24 border-b">
        <div className="container">
          <BlurFade delay={0.2} duration={0.6}>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">Expertise</p>
            <h2 className="tracking-tight text-2xl sm:text-3xl md:text-4xl font-bold mb-10">Technology Stack</h2>
          </BlurFade>
          <TechStackMarqueesHome className="mt-2" />
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="w-full bg-muted/30 px-6 lg:px-36 py-24 border-b">
        <div className="container">
          <BlurFade delay={0.2} duration={0.6}>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">Credentials</p>
            <h2 className="tracking-tight text-2xl sm:text-3xl md:text-4xl font-bold mb-10">Certifications</h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {certificates.map((cert, index) => (
              <BlurFade key={cert.file} delay={0.2 + index * 0.15} duration={0.6} className="h-full">
                <div className="group h-full flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div className="relative aspect-4/3 max-h-44 bg-muted overflow-hidden">
                    <Image
                      src={`/certificats/${cert.file}.png`}
                      alt={cert.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-3 group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <Separator />
                  <div className="p-4 flex items-start gap-3 mt-auto">
                    <div className="mt-0.5 rounded-md bg-primary/10 p-1.5 text-primary shrink-0">
                      <Award className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-snug">{cert.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="featured" className="w-full bg-background px-6 lg:px-36 py-24">
        <div className="container">
          <BlurFade delay={0.2} duration={0.6}>
            <div className="flex justify-between items-end flex-wrap gap-4 mb-16">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">Portfolio</p>
                <h2 className="tracking-tight text-2xl sm:text-3xl md:text-4xl font-bold">Featured Projects</h2>
              </div>
              <Link href="/projects">
                <Button variant="outline">
                  All Projects
                  <ExternalLink />
                </Button>
              </Link>
            </div>
          </BlurFade>
          <div className="space-y-28">
            {featuredProjects.map((project, index) => (
              <BlurFade key={index} delay={0.2 + index * 0.15} duration={0.6}>
                <Project metadata={project} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
