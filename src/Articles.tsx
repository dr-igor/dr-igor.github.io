import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const articles = [
  {
    title: "On the Edge of Hearing: How Humans Differentiate Sounds",
    description: "Exploring the fascinating mechanisms behind human sound perception and differentiation",
    date: "2025-01-15",
    slug: "edge-of-hearing"
  },
  {
    title: "Sounds in Space: Cues That Localize Sounds and What Happens When They Break Down",
    description: "Investigating the spatial audio cues that help us locate sounds and the perceptual effects when these cues are disrupted",
    date: "2025-01-20",
    slug: "sounds-in-space"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

function Articles() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-neutral-950">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 bg-clip-text text-transparent"
          style={{ fontFamily: "'Anta', sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Articles
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Exploring the intersection of audio, perception, and technology
        </motion.p>

        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles.map((article) => (
            <motion.article
              key={article.slug}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-zinc-800"
            >
              <Link to={`/articles/${article.slug}`} className="block">
                <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {article.description}
                </p>
                <time className="text-sm text-gray-500 dark:text-gray-500">
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Articles
