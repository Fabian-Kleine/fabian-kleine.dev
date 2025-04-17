import { TypographyH1 } from "@/components/typography";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;

}) {
    const { slug } = await params
    const { default: Post, metadata } = await import(`@/projects/${slug}.mdx`)

    return <>
        <TypographyH1 className="mb-4 text-center">{metadata.title}</TypographyH1>
        <Post />
    </>
}

export function generateStaticParams() {
    return [
        { slug: "example" }
    ]
}