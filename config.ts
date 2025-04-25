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
            "portfolio",
            "weather-app",
            "sil-touch",
            "mockup-creator",
            "postrocket",
            "cerberusui",
            "mywishlists",
            "fivem-utils",
            "portfolio-legacy",
            "r6-creative-hub"
        ],
        featuredProjectsSlugs: [
            "weather-app",
            "mockup-creator",
            "mywishlists"
        ]
    },
    techStack: {
        techStackMarquee1Icons: [
            { name: "HTML", icon: "html5" },
            { name: "CSS", icon: "css3" },
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
            { name: "Supabase", icon: "supabase" },
            { name: "MySQL", icon: "mysql" },
            { name: "Python", icon: "python" }
        ],
        techStackMarquee2Icons: [
            { name: "Shadcn UI", icon: "shadcnui" },
            { name: "Bootstrap", icon: "bootstrap" },
            { name: "Git", icon: "git" },
            { name: "GitHub", icon: "github" },
            { name: "GitLab", icon: "gitlab" },
            { name: "Vite", icon: "vite" },
            { name: "Vercel", icon: "vercel" },
            { name: "Wordpress", icon: "wordpress" },
            { name: "Plesk", icon: "plesk" },
            { name: "Postman", icon: "postman" },
        ],
        techStackCloudIcons: [
            'html5', 
            'css3', 
            'javascript', 
            'typescript', 
            'node.js', 
            'react', 
            'vue.js', 
            'next.js', 
            'tailwindcss', 
            'php', 
            'mongodb', 
            'supabase', 
            'python', 
            'mysql', 
            'git'
        ]
    },
    cookies: {
        cookieConsent: true
    }
}