import type { MDXComponents } from 'mdx/types'
import { TypographyBlockquote, TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyInlineCode, TypographyLink, TypographyList, TypographyP, TypographyOrderedList } from '@/components/blog/typography';
import { cn } from './lib/utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: (props) => <TypographyH1 {...props} />,
        h2: (props) => <TypographyH2 {...props} />,
        h3: (props) => <TypographyH3 {...props} />,
        h4: (props) => <TypographyH4 {...props} />,
        p: (props) => <TypographyP {...props} />,
        ul: (props) => <TypographyList {...props} />,
        ol: (props) => <TypographyOrderedList {...props} />,
        img: (props) => (
          <img 
            width={800}
            height={800}
            loading='lazy'
            className={cn("rounded-xl mx-auto", props.className)}
            {...props} />
        ),
        a: ({ children, ...props }) => <TypographyLink {...props}>{children}</TypographyLink>,
        pre: (props) => <pre {...props} className="relative -z-10 -top-8" />,
        code: (props) => <TypographyInlineCode {...props} className={cn(props.className)} />,
        blockquote: (props) => <TypographyBlockquote {...props} />,
        ...components
    }
}