interface Config {
    projects: {
        projectsSlugs: string[];
        featuredProjectsSlugs: string[];
    }
    techStack: {
        techStackMarquee1Icons: Tech[];
        techStackMarquee2Icons: Tech[];
        techStackCloudIcons: string[];
    },
    certificates: Certificate[];
    insignia: Insignia[];
    cookies: {
        /** shows the consent banner for externally hosted project videos; when off, they never load */
        cookieConsent: boolean;
    }
    legal: {
        /** controller details shown in the privacy policy (Art. 13 GDPR) */
        name: string;
        address: string[];
        email: string;
    }
}

/** self-assessed proficiency on the homepage stack tiles: 1 basics, 2 familiar, 3 proficient, 4 advanced, 5 expert */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Tech {
    name: string;
    /** SimpleIcons slug */
    icon: string;
    level: SkillLevel;
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
            "home-dashboard",
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
            "home-dashboard",
            "favorlist",
            "vue-vs-react"
        ]
    },
    techStack: {
        techStackMarquee1Icons: [
            { name: "HTML", icon: "html5", level: 5 },
            { name: "CSS", icon: "css", level: 5 },
            { name: "JavaScript", icon: "javascript", level: 5 },
            { name: "TypeScript", icon: "typescript", level: 4 },
            { name: "Node.js", icon: "node.js", level: 4 },
            { name: "Express", icon: "express", level: 4 },
            { name: "Vue.js", icon: "vue.js", level: 3 },
            { name: "React", icon: "react", level: 4 },
            { name: "Next.js", icon: "next.js", level: 4 },
            { name: "Expo", icon: "expo", level: 2 },
            { name: "Tailwind CSS", icon: "tailwindcss", level: 5 },
            { name: "PHP", icon: "php", level: 4 },
            { name: "MongoDB", icon: "mongodb", level: 3 },
            { name: "PostgreSQL", icon: "postgresql", level: 3 },
            { name: "Python", icon: "python", level: 2 },
        ],
        techStackMarquee2Icons: [
            { name: "Shadcn UI", icon: "shadcnui", level: 5 },
            { name: "Bootstrap", icon: "bootstrap", level: 4 },
            { name: "Git", icon: "git", level: 4 },
            { name: "GitHub", icon: "github", level: 4 },
            { name: "GitLab", icon: "gitlab", level: 3 },
            { name: "Vite", icon: "vite", level: 3 },
            { name: "Vercel", icon: "vercel", level: 3 },
            { name: "Prisma", icon: "prisma", level: 4 },
            { name: "Drizzle", icon: "drizzle", level: 2 },
            { name: "Wordpress", icon: "wordpress", level: 2 },
            { name: "Shopware", icon: "shopware", level: 4 }
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
        cookieConsent: true
    },
    legal: {
        // TODO: fill in before going live
        name: "Fabian Kleine",
        address: ["[Street and house number]", "[Postal code and city]"],
        email: "[email address]",
    }
}