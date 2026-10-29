import type { MDXComponents } from 'mdx/types'
import { TypographyBlockquote, TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyInlineCode, TypographyLink, TypographyList, TypographyP, TypographyOrderedList } from '@/components/blog/typography';
import { MediaFrame } from '@/components/blog/media-frame';
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
        img: ({ alt, ...props }) => (
          <MediaFrame caption={alt}>
            <img
              width={800}
              height={800}
              loading='lazy'
              alt={alt}
              {...props}
              className={cn("block", props.className)} />
          </MediaFrame>
        ),
        a: ({ children, ...props }) => <TypographyLink {...props}>{children}</TypographyLink>,
        pre: (props) => <pre {...props} />,
        code: (props) => <TypographyInlineCode {...props} className={cn(props.className)} />,
        blockquote: (props) => <TypographyBlockquote {...props} />,
        ...components
    }
}