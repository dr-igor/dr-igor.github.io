import { useState, useEffect } from 'react'

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
  const [nextTopicIndex, setNextTopicIndex] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      
      setTimeout(() => {
        setCurrentTopicIndex((prev) => (prev + 1) % topics.length)
        setNextTopicIndex((prev) => (prev + 1) % topics.length)
        setIsAnimating(false)
      }, 500) // Half second for animation
    }, 10000) // 10 seconds total

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="relative mb-8">
          {/* Title layout with Igor positioned above Labworks */}
          <div className="relative inline-block">
            {/* "Labworks" - main text */}
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 bg-clip-text text-transparent" style={{ fontFamily: "'Anta', sans-serif" }}>
              Labworks
            </h1>
            {/* "Igor" positioned above, nestled between b and k */}
            <div className="absolute left-0 right-0 flex justify-center" style={{ top: '-0.42em' }}>
              <span 
                className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 bg-clip-text text-transparent px-3 bg-gray-50 dark:bg-zinc-900 rounded-md"
                style={{ 
                  fontFamily: "'Anta', sans-serif",
                  zIndex: 10,
                }}
              >
                Igor
              </span>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-700 dark:text-gray-200">
            Coming Soon
          </h2>
          
          <div className="relative h-16 flex items-center justify-center overflow-hidden">
            {/* Current topic - slides down and fades out */}
            <div
              className={`absolute text-2xl md:text-3xl font-medium transition-all duration-500 ${
                isAnimating
                  ? 'translate-y-16 opacity-0'
                  : 'translate-y-0 opacity-100'
              } text-purple-700 dark:text-purple-400`}
            >
              {topics[currentTopicIndex]}
            </div>
            {/* Next topic - slides down from top and fades in */}
            <div
              className={`absolute text-2xl md:text-3xl font-medium transition-all duration-500 ${
                isAnimating
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-16 opacity-0'
              } text-purple-700 dark:text-purple-400`}
            >
              {topics[nextTopicIndex]}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
