import Link from "next/link";
import GithubIcon from "./icons/github";
import ContactDialog from "./contact-dialog";
import { Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="flex justify-between py-6 px-6 flex-wrap sm:flex-nowrap lg:px-36 border-t">
            <span className="text-center sm:text-start w-full sm:w-fit">
                &copy; {new Date().getFullYear()}. Made with ❤️ by <Link className="underline font-bold" href='/'>Fabian Kleine</Link>
            </span>
            <div className="flex justify-center w-full sm:w-fit mt-4 sm:mt-0 gap-4">
                <ContactDialog>
                    <span role="button" aria-haspopup className="cursor-pointer hover:text-muted-foreground hover:scale-110 transition-all">
                        <Mail size={20} />
                        <span className="sr-only">Contact</span>
                    </span>
                </ContactDialog>
                <a href="http://github.com/Fabian-Kleine" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground hover:scale-110 transition-all">
                    <GithubIcon size={20} />
                    <span className="sr-only">Github</span>
                </a>
            </div>
        </footer>
    )
}