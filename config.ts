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
    /** SimpleIcons slug used to find the projects built with this technology; left out on the operator insignia */
    tech?: string;
    /** the operator's own insignia: framed apart in the case, and its dossier shows the service record from `Insignia.items.<id>.record` instead of projects and partners */
    operator?: boolean;
    /** shows the certificates issued by this issuer inside the insignia dossier */
    certificateIssuer?: string;
    /** project slugs left out of this dossier even though they use its tech */
    excludeProjects?: string[];
    /** SimpleIcons slugs hidden from the field partners even though its projects use them */
    excludePartners?: string[];
    /** listed as field partners on top of the techs found in its projects */
    extraPartners?: { name: string; icon: string }[];
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
            id: "operator",
            name: "Fabian Kleine",
            image: "/badges/fk.webp",
            width: 489,
            height: 640,
            operator: true,
        },
        {
            id: "shopware",
            name: "Shopware",
            image: "/badges/shopware.webp",
            width: 509,
            height: 640,
            tech: "shopware",
            certificateIssuer: "Shopware AG",
            extraPartners: [
                { name: "Vue.js", icon: "vue.js" },
                { name: "PHP", icon: "php" },
                { name: "JavaScript", icon: "javascript" },
                { name: "Symfony", icon: "symfony" },
                { name: "MySQL", icon: "mysql" },
            ],
        },
        {
            id: "nextjs",
            name: "Next.js",
            image: "/badges/nextjs.webp",
            width: 608,
            height: 640,
            tech: "next.js",
            excludeProjects: ["mywishlists"],
            extraPartners: [
                { name: "TypeScript", icon: "typescript" },
                { name: "Vercel", icon: "vercel" },
                { name: "Prisma", icon: "prisma" },
            ],
        },
        {
            id: "react",
            name: "React",
            image: "/badges/react.webp",
            width: 556,
            height: 640,
            tech: "react",
            excludePartners: ["vue.js"],
            extraPartners: [
                { name: "Expo", icon: "expo" },
                { name: "Shadcn UI", icon: "shadcnui" },
                { name: "TypeScript", icon: "typescript" },
            ],
        },
        {
            id: "postgresql",
            name: "PostgreSQL",
            image: "/badges/postgresql.webp",
            width: 598,
            height: 640,
            tech: "postgresql",
            excludePartners: ["shadcnui", "tailwindcss"],
            extraPartners: [
                { name: "Prisma", icon: "prisma" },
            ],
        },
        {
            id: "tailwindcss",
            name: "Tailwind CSS",
            image: "/badges/tailwindcss.webp",
            width: 601,
            height: 640,
            tech: "tailwindcss",
            excludePartners: ["postgresql", "drizzle", "supabase", "node.js", "express", "cheerio", "axios", "reactrouter"],
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