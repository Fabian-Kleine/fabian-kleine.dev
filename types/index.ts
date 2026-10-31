export interface ProjectMetaData {
    img: string;
    video?: string;
    title: string;
    description: string;
    bullets: string[];
    demo?: string;
    github?: string;
    techs?: {
        name: string;
        icon: string;
    }[];
    slug?: string;
}