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
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true)
      
      setTimeout(() => {
        setCurrentTopicIndex((prev) => (prev + 1) % topics.length)
        setIsExiting(false)
      }, 500) // Half second for exit animation
    }, 10000) // 10 seconds total

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 bg-clip-text text-transparent" style={{ fontFamily: "'Anta', sans-serif" }}>
          Igor Labworks
        </h1>
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-800 dark:text-gray-100">
            Coming Soon
          </h2>
          
          <div className="relative h-16 flex items-center justify-center overflow-hidden">
            <div
              key={currentTopicIndex}
              className={`text-2xl md:text-3xl font-medium transition-all duration-500 ${
                isExiting
                  ? 'translate-y-8 opacity-0'
                  : 'translate-y-0 opacity-100'
              } text-purple-700 dark:text-purple-400`}
            >
              {topics[currentTopicIndex]}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
