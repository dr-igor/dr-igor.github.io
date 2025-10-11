import { lazy, Suspense } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import MDXLayout from './MDXLayout'

const components = {
  wrapper: MDXLayout,
}

const articles: Record<string, { Component: ReturnType<typeof lazy> }> = {
  'edge-of-hearing': {
    Component: lazy(() => import('./content/articles/edge-of-hearing.mdx'))
  },
  'sounds-in-space': {
    Component: lazy(() => import('./content/articles/sounds-in-space.mdx'))
  }
}

function ArticleView() {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug || !articles[slug]) {
    return <Navigate to="/articles" replace />
  }

  const { Component } = articles[slug]

  return (
    <MDXProvider components={components}>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      }>
        <Component />
      </Suspense>
    </MDXProvider>
  )
}

export default ArticleView
