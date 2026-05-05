interface Config {
    projects: {
        projectsSlugs: string[];
        featuredProjectsSlugs: string[];
    }
    techStack: {
        techStackMarquee1Icons: { name: string; icon: string }[];
        techStackMarquee2Icons: { name: string; icon: string }[];
        techStackCloudIcons: string[];
    },
    cookies: {
        cookieConsent: boolean;
    }
}

export const config: Config = {
    projects: {
        projectsSlugs: [
            "favorlist",
            "bang-search",
            "vue-vs-react",
            "portfolio",
            "weather-app",
            "sil-touch",
            "mockup-creator",
            "postrocket",
            "mywishlists",
            "portfolio-legacy",
            "r6-creative-hub"
        ],
        featuredProjectsSlugs: [
            "favorlist",
            "vue-vs-react",
            "bang-search",
        ]
    },
    techStack: {
        techStackMarquee1Icons: [
            { name: "HTML", icon: "html5" },
            { name: "CSS", icon: "css" },
            { name: "JavaScript", icon: "javascript" },
            { name: "TypeScript", icon: "typescript" },
            { name: "Node.js", icon: "node.js" },
            { name: "Express", icon: "express" },
            { name: "Vue.js", icon: "vue.js" },
            { name: "React", icon: "react" },
            { name: "Next.js", icon: "next.js" },
            { name: "Tailwind CSS", icon: "tailwindcss" },
            { name: "PHP", icon: "php" },
            { name: "MongoDB", icon: "mongodb" },
            { name: "Prisma", icon: "prisma" },
            { name: "PostgreSQL", icon: "postgresql" },
            { name: "Python", icon: "python" },
        ],
        techStackMarquee2Icons: [
            { name: "Shadcn UI", icon: "shadcnui" },
            { name: "Bootstrap", icon: "bootstrap" },
            { name: "Git", icon: "git" },
            { name: "GitHub", icon: "github" },
            { name: "GitLab", icon: "gitlab" },
            { name: "Vite", icon: "vite" },
            { name: "Vercel", icon: "vercel" },
            { name: "Expo", icon: "expo" },
            { name: "Wordpress", icon: "wordpress" },
            { name: "Shopware", icon: "shopware" }
        ],
        techStackCloudIcons: [
            'html5',
            'css',
            'javascript',
            'typescript',
            'node.js',
            'react',
            'vue.js',
            'next.js',
            'tailwindcss',
            'php',
            'mongodb',
            'prisma',
            'python',
            'postgresql',
            'git'
        ]
    },
    cookies: {
        cookieConsent: false
    }
}