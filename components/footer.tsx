import Link from "next/link";
import GithubIcon from "./icons/github";

export default function Footer() {
    return (
        <footer className="flex justify-between py-6 px-6 lg:px-36 border-t">
            <span>
                &copy; {new Date().getFullYear()}. Made with ❤️ by <Link className="underline font-bold" href='/'>Fabian Kleine</Link>
            </span>
            <a href="http://github.com/Fabian-Kleine" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={20} />
                <span className="sr-only">Github</span>
            </a>
        </footer>
    )
}