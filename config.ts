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
    certificates: Certificate[];
    insignia: Insignia[];
    cookies: {
        cookieConsent: boolean;
    }
}

export interface Certificate {
    name: string;
    file: string;
    issuer: string;
    validUntil?: string;
}

export interface Insignia {
    /** also keys the translated unit and summary under `Insignia.items` in messages/*.json */
    id: string;
    name: string;
    image: string;
    width: number;
    height: number;
    /** SimpleIcons slug used to find the projects built with this technology */
    tech: string;
    /** shows the certificates issued by this issuer inside the insignia dossier */
    certificateIssuer?: string;
}

export const config: Config = {
    projects: {
        projectsSlugs: [
            "nexus",
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
            { name: "Expo", icon: "expo" },
            { name: "Tailwind CSS", icon: "tailwindcss" },
            { name: "PHP", icon: "php" },
            { name: "MongoDB", icon: "mongodb" },
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
            { name: "Prisma", icon: "prisma" },
            { name: "Drizzle", icon: "drizzle" },
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
    certificates: [
        {
            name: "Shopware 6 Certified Backend Developer",
            file: "shopware6-certified-backend-developer",
            issuer: "Shopware AG",
            validUntil: "April 2027",
        },
        {
            name: "Shopware 6 Certified Backend Developer (Intermediate)",
            file: "shopware6-certified-backend-developer-intermediate",
            issuer: "Shopware AG",
            validUntil: "April 2027",
        },
        {
            name: "Shopware 6 Certified Frontend Developer",
            file: "shopware6-certified-frontend-developer",
            issuer: "Shopware AG",
            validUntil: "April 2027",
        },
    ],
    insignia: [
        {
            id: "shopware",
            name: "Shopware",
            image: "/badges/shopware.webp",
            width: 509,
            height: 640,
            tech: "shopware",
            certificateIssuer: "Shopware AG",
        },
        {
            id: "nextjs",
            name: "Next.js",
            image: "/badges/nextjs.webp",
            width: 608,
            height: 640,
            tech: "next.js",
        },
        {
            id: "react",
            name: "React",
            image: "/badges/react.webp",
            width: 556,
            height: 640,
            tech: "react",
        },
    ],
    cookies: {
        cookieConsent: false
    }
}