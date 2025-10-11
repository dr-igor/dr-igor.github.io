import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-neutral-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-20 right-10 w-96 h-96 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-3xl pointer-events-none"
        style={{ y }}
      />
      
      <div ref={containerRef} className="max-w-4xl mx-auto px-4 py-16 relative">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 bg-clip-text text-transparent" 
          style={{ fontFamily: "'Anta', sans-serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h1>
        
        <motion.div 
          className="prose prose-lg dark:prose-invert max-w-none"
          style={{ opacity }}
        >
          <motion.p 
            className="text-gray-700 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome to Igor Labworks - a creative space where technology meets art and design.
          </motion.p>
          
          <motion.p 
            className="text-gray-700 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I'm Igor Petrik, a multidisciplinary maker passionate about exploring the intersection of:
          </motion.p>
          
          <motion.ul 
            className="text-gray-700 dark:text-gray-300 space-y-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              'Software Engineering & Development',
              'Electronics Design & Prototyping',
              'Automation & Systems',
              'Art & Design',
              'Interior Design & Architecture',
              'Home Improvement',
              'CAD & 3D Modeling',
              'Music Production & Audio DSP',
              'Light & Color Reproduction',
              'Burning Man Projects'
            ].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
          
          <motion.p 
            className="text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            This portfolio showcases my journey through creative technology and artistic expression. 
            Stay tuned for projects, experiments, and adventures in making.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default About
