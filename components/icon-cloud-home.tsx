import { IconCloud } from "@/components/magicui/icon-cloud";

interface IconCloudHomeProps {
    icons: string[];
    className?: string;
}

export function IconCloudHome({ icons, className }: IconCloudHomeProps) {
    const images = icons.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
    );

    return (
        <IconCloud className={className} images={images} />
    );
}