import ThemeParticles from "@/components/magicui/theme-particles";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { FolderGit2 } from "lucide-react";
import GithubIcon from "@/components/icons/github";
import Link from "next/link";
import RandomEmoji from "@/components/icons/random-emoji";

export default function Home() {

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
      </section>
    </main>
  );
}
