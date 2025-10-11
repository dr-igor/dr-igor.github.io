import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MDXLayoutProps {
  children: ReactNode
  frontmatter?: {
    title: string
    description: string
    date: string
  }
}

function MDXLayout({ children, frontmatter }: MDXLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-neutral-950">
      <article className="max-w-4xl mx-auto px-4 py-16">
        {frontmatter && (
          <motion.header 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 bg-clip-text text-transparent">
              {frontmatter.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              {frontmatter.description}
            </p>
            <time className="text-sm text-gray-500 dark:text-gray-500">
              {new Date(frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </motion.header>
        )}
        
        <motion.div 
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 dark:prose-strong:text-gray-100
            prose-ul:text-gray-700 dark:prose-ul:text-gray-300
            prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </article>
    </div>
  )
}

export default MDXLayout
