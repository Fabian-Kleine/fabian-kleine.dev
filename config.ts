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
}

export interface Insignia {
    id: string;
    name: string;
    unit: string;
    image: string;
    width: number;
    height: number;
    /** SimpleIcons slug used to find the projects built with this technology */
    tech: string;
    summary: string;
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
        },
        {
            name: "Shopware 6 Certified Backend Developer (Intermediate)",
            file: "shopware6-certified-backend-developer-intermediate",
            issuer: "Shopware AG",
        },
        {
            name: "Shopware 6 Certified Frontend Developer",
            file: "shopware6-certified-frontend-developer",
            issuer: "Shopware AG",
        },
    ],
    insignia: [
        {
            id: "shopware",
            name: "Shopware",
            unit: "Commerce Vanguard",
            image: "/badges/shopware.webp",
            width: 509,
            height: 640,
            tech: "shopware",
            summary: "Official Shopware 6 developer certifications issued by Shopware AG, covering backend development at two levels and storefront frontend development.",
            certificateIssuer: "Shopware AG",
        },
        {
            id: "nextjs",
            name: "Next.js",
            unit: "Airborne Division",
            image: "/badges/nextjs.webp",
            width: 608,
            height: 640,
            tech: "next.js",
            summary: "My framework of choice for full stack React apps, from database backed web apps to this portfolio.",
        },
        {
            id: "react",
            name: "React",
            unit: "Frontend Corps",
            image: "/badges/react.webp",
            width: 556,
            height: 640,
            tech: "react",
            summary: "Component driven interfaces, from small single purpose tools to full applications.",
        },
    ],
    cookies: {
        cookieConsent: false
    }
}