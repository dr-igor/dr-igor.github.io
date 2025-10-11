import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const topics = [
  'Software Engineering',
  'Automation',
  'Electronics Design',
  'Art & Design',
  'Interior Design',
  'CAD & 3D Modeling',
  'Music Production',
  'Audio DSP',
  'Light & Color',
  'Burning Man',
]

function Home() {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)
  const { scrollYProgress } = useScroll()
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopicIndex((prev) => (prev + 1) % topics.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background layers */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-50 via-amber-50 to-purple-100 dark:from-purple-950/20 dark:via-zinc-950 dark:to-amber-950/20"
        style={{ y: backgroundY }}
      />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-300/20 dark:bg-amber-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative flex flex-col items-center justify-center min-h-screen px-4"
        style={{ opacity }}
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 bg-clip-text text-transparent" 
            style={{ fontFamily: "'Anta', sans-serif" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Igor Labworks
          </motion.h1>
          
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-800 dark:text-gray-100">
              Coming Soon
            </h2>
            
            <div className="relative h-16 flex items-center justify-center overflow-hidden">
              <motion.div
                key={currentTopicIndex}
                className="absolute text-2xl md:text-3xl font-medium text-purple-700 dark:text-purple-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {topics[currentTopicIndex]}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              A creative space where technology meets art and design
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Home
