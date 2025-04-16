import ThemeParticles from "@/components/magicui/theme-particles";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { FolderGit2 } from "lucide-react";
import GithubIcon from "@/components/icons/github";
import Link from "next/link";
import RandomEmoji from "@/components/icons/random-emoji";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { IconCloudHome } from "@/components/icon-cloud-home";
import { ThreeDMarquee } from "@/components/aceternityui/3d-marquee";
import { AnimatedListHome } from "@/components/animated-list-home";

export default function Home() {
  const projectsMarqueeImages = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];

  return (
    <main className="min-h-screen">
      <section id="about" aria-label="about" className="flex flex-col items-center justify-center h-screen w-full px-6 lg:px-36">
        <div aria-hidden className="gradient-bg opacity-0 dark:opacity-100" />
        <ThemeParticles />
        <div className="container py-24 space-y-4">
          <BlurFade delay={2} duration={.7} direction="down">
            <RandomEmoji />
          </BlurFade>
          <TypingAnimation duration={75} as="h1" className="tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none font-bold"> Hi, I'm Fabian Kleine</TypingAnimation>
          <TypingAnimation as="p" duration={35} className="text-balance text-muted-foreground text-lg font-normal">
            I'm an apprentice and selftaught Programmer focusing on web development
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
            <BentoCard name="Technologies" description="I use a variety of Technoliges" cta="Learn More" href="#technoliges" background={
              <div className="absolute inset-0 flex items-center justify-center">
                <IconCloudHome className="-mt-14" icons={['html5', 'css3', 'javascript', 'typescript', 'node.js', 'react', 'vue.js', 'next.js', 'tailwindcss', 'php', 'shadcnui', 'mongodb', 'supabase', 'python', 'mysql', 'git', 'github', 'bootstrap']} />
              </div>
            } className="!bg-background/50 backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] col-span-3 lg:col-span-1" Icon={"span"} />
            <BentoCard name="Projects" description="Many different Projects" cta="Discover Projects" href="/projects" background={
              <div className="absolute mx-auto max-w-full">
                <ThreeDMarquee images={projectsMarqueeImages} />
              </div>
            } className="!bg-background/50 backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] col-span-3 lg:col-span-1" Icon={"span"} />
            <BentoCard name="Contact" description="Get in touch with me" cta="Contact Me" href="/contact" background={
              <div className="absolute inset-0 flex items-center justify-center px-2">
                <AnimatedListHome className="mt-40" />
              </div>
            } className="!bg-background/50 backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] col-span-3 lg:col-span-1" Icon={"span"} />
          </BentoGrid>
        </BlurFade>
      </section>
    </main>
  );
}
