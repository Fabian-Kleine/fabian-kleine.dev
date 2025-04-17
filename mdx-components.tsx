import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import { TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyInlineCode, TypographyLink, TypographyList, TypographyP } from '@/components/typography';
import { cn } from './lib/utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: (props) => <TypographyH1 {...props} />,
        h2: (props) => <TypographyH2 {...props} />,
        h3: (props) => <TypographyH3 {...props} />,
        h4: (props) => <TypographyH4 {...props} />,
        p: (props) => <TypographyP className="max-w-prose" {...props} />,
        ul: (props) => <TypographyList {...props} />,
        img: (props) => (
          <Image 
            width={800}
            height={800}
            {...props} />
        ),
        a: ({ children, ...props }) => <TypographyLink {...props}>{children}</TypographyLink>,
        pre: (props) => <pre {...props} className="relative -z-10 -top-8" />,
        code: (props) => <TypographyInlineCode {...props} className={cn(props.className, "rounded-lg")} />,
        ...components
    }
}