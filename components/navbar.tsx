import { AlignLeft, GithubIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShineBorder } from "./magicui/shine-border";
import { ShinyButton } from "./magicui/shiny-button";
import ThemeToggle from "./ui/theme-toggle";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
    return (
        <nav className="flex justify-center items-center border-border border-b w-full bg-background/50 backdrop-blur-2xl fixed z-50 px-4">
            <div className="container mx-4 flex h-14 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size={'icon'} className="md:hidden ml-2">
                            <AlignLeft className="size-6" />
                            <span className="sr-only">Toggle Navbar</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-3/4 px-6">
                        <SheetHeader>
                            <SheetTitle>
                                <div className="relative font-bold w-fit text-sm rounded-full px-4 py-1.5 transition-shadow duration-500 ease-out shadow-[inset_0_-8px_10px_#8fdfff1f] hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
                                    Fabian Kleine
                                    <ShineBorder shineColor={["#1e96fc", "#f72585", "#fb5607"]} />
                                </div>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 mt-2">
                            <Link href={'/'} className="text-muted-foreground transition-colors hover:text-foreground">Home</Link>
                            <Link href={'/#about'} className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
                            <Link href={'/projects'} className="text-muted-foreground transition-colors hover:text-foreground">Projects</Link>
                            <Link href={'/contact'} className="text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
                        </div>
                        <a href='https://github.com/Fabian-Kleine' target='_blank' rel='noopener noreferrer' className="mx-auto mt-auto mb-4">
                            <ShinyButton className="rounded-full border cursor-pointer dark:bg-radial-[at_50%_0%] from-primary/20 to-50% to-transparent">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <GithubIcon className="h-4 w-4" />
                                    Github
                                </div>
                            </ShinyButton>
                        </a>
                    </SheetContent>
                </Sheet>
                <div className="hidden md:flex gap-2">
                    <Link href={'/'} className="flex items-center mr-6">
                        <div className="relative font-bold text-sm rounded-full px-4 py-1.5 transition-shadow duration-500 ease-out shadow-[inset_0_-8px_10px_#8fdfff1f] hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
                            Fabian Kleine
                            <ShineBorder shineColor={["#1e96fc", "#f72585", "#fb5607"]} />
                        </div>
                    </Link>
                    <div className="flex items-center gap-6 text-sm font-medium">
                        <Link href={'/#about'} className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
                        <Link href={'/projects'} className="text-muted-foreground transition-colors hover:text-foreground">Projects</Link>
                        <Link href={'/contact'} className="text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
                    </div>
                </div>
                <a href='https://github.com/Fabian-Kleine' target='_blank' rel='noopener noreferrer' className="hidden md:block ml-auto">
                    <ShinyButton className="rounded-full border cursor-pointer dark:bg-radial-[at_50%_0%] from-primary/20 to-50% to-transparent">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <GithubIcon className="h-4 w-4" />
                            Github
                        </div>
                    </ShinyButton>
                </a>
                <ThemeToggle className="ml-auto mr-3 md:ml-2 md:mr-0" />
            </div>
        </nav>
    )
}