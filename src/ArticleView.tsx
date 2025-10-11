import { lazy, Suspense } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import MDXLayout from './MDXLayout'

// Import frontmatter directly
import { frontmatter as edgeOfHearingFrontmatter } from './content/articles/edge-of-hearing.mdx'
import { frontmatter as soundsInSpaceFrontmatter } from './content/articles/sounds-in-space.mdx'

const articles: Record<string, { 
  Component: ReturnType<typeof lazy>
  frontmatter: {
    title: string
    description: string
    date: string
    slug: string
  }
}> = {
  'edge-of-hearing': {
    Component: lazy(() => import('./content/articles/edge-of-hearing.mdx')),
    frontmatter: edgeOfHearingFrontmatter
  },
  'sounds-in-space': {
    Component: lazy(() => import('./content/articles/sounds-in-space.mdx')),
    frontmatter: soundsInSpaceFrontmatter
  }
}

function ArticleView() {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug || !articles[slug]) {
    return <Navigate to="/articles" replace />
  }

  const { Component, frontmatter } = articles[slug]

  return (
    <MDXLayout frontmatter={frontmatter}>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      }>
        <Component />
      </Suspense>
    </MDXLayout>
  )
}

export default ArticleView
