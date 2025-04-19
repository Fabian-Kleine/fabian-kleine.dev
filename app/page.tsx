import ThemeParticles from "@/components/magicui/theme-particles";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { ExternalLink, FolderGit2 } from "lucide-react";
import GithubIcon from "@/components/icons/github";
import Link from "next/link";
import RandomEmoji from "@/components/icons/random-emoji";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { SimpleIconsCloud } from "@/components/magicui/simpleicons-cloud";
import { ThreeDMarquee } from "@/components/aceternityui/3d-marquee";
import { AnimatedListHome } from "@/components/home/animated-list-home";
import { TechStackMarqueesHome } from "@/components/home/techstack-marquees-home";
import Project from "@/components/project";
import { ProjectMetaData } from "@/types";

const projectsMarqueeImages = [
  "/projects/weather-app.png",
  "/projects/mockup-creator.png",
  "/projects/mockup-creator.png",
  "/projects/portfolio.png",
  "/projects/weather-app.png",
  "/projects/mockup-creator.png",
  "/projects/cerberusui.png",
  "/projects/postrocket.png",
  "/projects/weather-app.png",
  "/projects/mockup-creator.png",
  "/projects/postrocket.png",
  "/projects/mywishlists.png",
  "/projects/portfolio_legacy.png",
  "/projects/portfolio.png",
  "/projects/weather-app.png",
  "/projects/mockup-creator.png",
  "/projects/portfolio.png",
  "/projects/weather-app.png",
  "/projects/mockup-creator.png",
  "/projects/cerberusui.png",
  "/projects/postrocket.png",
  "/projects/portfolio_legacy.png",
  "/projects/mywishlists.png",
  "/projects/portfolio_legacy.png",
  "/projects/mywishlists.png",
  "/projects/postrocket.png",
  "/projects/portfolio_legacy.png",
  "/projects/portfolio.png",
  "/projects/mywishlists.png",
  "/projects/mockup-creator.png",
  "/projects/weather-app.png",
];

const featuredProjectsSlugs = [
  "weather-app",
  "mockup-creator",
  "mywishlists",
];

const getFeaturedProjects = async () => {
  const featuredProjects = await Promise.all(
    featuredProjectsSlugs.map(async (slug) => {
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
      <section id="about" aria-label="about" className="relative flex flex-col items-center justify-center min-h-screen w-full px-6 lg:px-36">
        <div aria-hidden className="gradient-bg opacity-0 dark:opacity-100" />
        <div className="container py-24 space-y-4">
          <BlurFade delay={2} duration={.7} direction="down">
            <RandomEmoji />
          </BlurFade>
          <TypingAnimation duration={75} as="h1" className="tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none font-bold"> Hi, I&apos;m Fabian Kleine</TypingAnimation>
          <TypingAnimation as="p" duration={35} className="text-balance text-muted-foreground text-lg font-normal">
            I&apos;m an apprentice and selftaught Programmer focusing on web development
          </TypingAnimation>
          <div className="flex gap-2 items-center">
            <BlurFade delay={1} duration={1} direction="up">
              <Link href='/projects'>
                <Button size='lg'>
                  <FolderGit2 />
                  Projects
                </Button>
              </Link>
            </BlurFade>
            <BlurFade delay={1.1} duration={1} direction="up">
              <a href="https://github.com/Fabian-Kleine" target="_blank" rel="noopener noreferrer">
                <Button size='lg' variant='outline' className="w-10 bg-background">
                  <GithubIcon />
                  <span className="sr-only">Github</span>
                </Button>
              </a>
            </BlurFade>
          </div>
        </div>
        <BlurFade className="w-full overflow-visible" delay={2.5} duration={1} direction="up">
          <BentoGrid className="overflow-visible">
            <BentoCard name="Technologies" description="I use a variety of Technoliges" cta="Learn More" href="#technologies" background={
              <div className="absolute inset-0 flex items-center justify-center">
                <SimpleIconsCloud className="-mt-14" icons={['html5', 'css3', 'javascript', 'typescript', 'node.js', 'react', 'vue.js', 'next.js', 'tailwindcss', 'php', 'mongodb', 'supabase', 'python', 'mysql', 'git']} />
              </div>
            } className="!bg-background/50 backdrop-blur-xs dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] col-span-3 lg:col-span-1" Icon={"span"} />
            <BentoCard name="Projects" description="Many different Projects" cta="Discover Projects" href="/projects" background={
              <div className="absolute mx-auto max-w-full">
                <ThreeDMarquee images={projectsMarqueeImages} />
              </div>
            } className="!bg-background/50 backdrop-blur-xs dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] col-span-3 lg:col-span-1" Icon={"span"} />
            <BentoCard name="Contact" description="Get in touch with me" cta="Contact Me" href="/contact" background={
              <div className="absolute inset-0 flex items-center justify-center px-2">
                <AnimatedListHome className="mt-40" />
              </div>
            } className="!bg-background/50 backdrop-blur-xs dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] col-span-3 lg:col-span-1" Icon={"span"} />
          </BentoGrid>
        </BlurFade>
      </section>
      <section id="technologies" className="w-full border-t bg-background px-6 lg:px-36 pt-24 mt-4">
        <h2 className="tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl/none font-bold">Technology Stack</h2>
        <TechStackMarqueesHome className="mt-4" />
      </section>
      <section id="featured" className="w-full bg-background px-6 lg:px-36 pt-24">
        <div className="flex justify-between items-center">
          <h2 className="tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl/none font-bold">Featured Projects</h2>
          <Link href='/projects'>
            <Button variant={'outline'}>
              All Projects
              <ExternalLink />
            </Button>
          </Link>
        </div>
        <div className="space-y-28 my-28">
          {featuredProjects.map((project, index) => (
            <Project
              key={index}
              metadata={project}
            />
          ))}
        </div>
      </section>
    </>
  );
}
