declare module '*.mdx' {
  import type { ComponentType } from 'react'
  
  export const frontmatter: {
    title: string
    description: string
    date: string
    slug: string
  }
  
  const MDXComponent: ComponentType
  export default MDXComponent
}
