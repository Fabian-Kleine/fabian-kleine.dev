import ThemeParticles from "@/components/magicui/theme-particles";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { FolderGit2 } from "lucide-react";
import GithubIcon from "@/components/icons/github";
import Link from "next/link";
import RandomEmoji from "@/components/icons/random-emoji";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation as TerminalTypingAnimation,
} from "@/components/magicui/terminal";
import ConfettiCanon from "@/components/magicui/confetti";

export default function Home() {
  const birthday = new Date("1975-07-326");
  const today = new Date();
  const isBirthday = today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();

  return (
    <main className="min-h-screen">
      <section id="about" aria-label="about" className="flex flex-wrap lg:flex-nowrap items-center justify-center h-screen w-full px-6 lg:px-36">
        <div aria-hidden className="gradient-bg opacity-0 dark:opacity-100" />
        <ThemeParticles />
        {isBirthday && (
          <ConfettiCanon />
        )}
        <div className="container py-24 space-y-4">
          <BlurFade delay={2} duration={.7} direction="down">
            <RandomEmoji birthday={isBirthday} />
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
        <BlurFade delay={3} duration={1} direction="up">
          <Terminal className="min-w-[500px] h-[500px] bg-background/50 backdrop-blur-3xl">
            <TerminalTypingAnimation
              duration={75}
              delay={3000}
              className="text-sm font-mono text-muted-foreground text-wrap"
            >portfolio init --name="Fabian Kleine" --type="web" --location="Germany"
            </TerminalTypingAnimation>
            <AnimatedSpan delay={9000} className="text-green-500">
              <span>✔ Web Development</span>
            </AnimatedSpan>
            <AnimatedSpan delay={9500} className="text-green-500">
              <span>✔ Frontend</span>
            </AnimatedSpan>
            <AnimatedSpan delay={10000} className="text-green-500">
              <span>✔ Backend</span>
            </AnimatedSpan>
            <AnimatedSpan delay={10500} className="text-green-500">
              <span>✔ Full-Stack</span>
            </AnimatedSpan>
            <AnimatedSpan delay={11000} className="text-blue-500">
              <span>ℹ Languages:</span>
              <span className="pl-2">JavaScript, TypeScript, PHP</span>
            </AnimatedSpan>
            <AnimatedSpan delay={11500} className="text-blue-500">
              <span>ℹ Frameworks:</span>
              <span className="pl-2">Vue, React, Nextjs</span>
            </AnimatedSpan>
            {isBirthday && (
              <AnimatedSpan delay={12000} className="text-amber-500">
                <span>🎉 Today is my Birthday</span>
              </AnimatedSpan>
            )}
            <TerminalTypingAnimation
              duration={75}
              delay={isBirthday ? 13000 : 12500}
              className="text-sm font-mono text-muted-foreground text-wrap"
            >Success! Portfolio created!
            </TerminalTypingAnimation>
            <AnimatedSpan delay={15000} className="text-muted-foreground">
              <span>- Projects: <Link className="hover:underline" href={'/projects'}>/projects</Link></span>
            </AnimatedSpan>
            <AnimatedSpan delay={15500} className="text-muted-foreground">
              <span>- Github: <a className="hover:underline" href={'https://github.com/Fabian-Kleine'} target="_blank" rel='noopener noreferrer'>https://github.com/Fabian-Kleine</a></span>
            </AnimatedSpan>
          </Terminal>
        </BlurFade>
      </section>
    </main>
  );
}
