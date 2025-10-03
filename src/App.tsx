import { useState, useEffect } from 'react'
import * as Switch from '@radix-ui/react-switch'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      if (saved !== null) return saved === 'true'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="fixed top-6 right-6 z-50">
        <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <SunIcon className="w-4 h-4 text-amber-500" />
          <Switch.Root
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative transition-colors data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
          <MoonIcon className="w-4 h-4 text-blue-600" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
            Igor Lab Works
          </h1>
          
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Under Construction
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
              <div className="w-2 h-2 bg-pink-600 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12 text-sm md:text-base">
            {[
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
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-200 hover:scale-105"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Portfolio and online presence for creative projects spanning technology, design, and art.
            <br />
            <span className="text-sm mt-2 block">Coming soon...</span>
          </p>
        </div>
      </div>

      <footer className="fixed bottom-6 left-0 right-0 text-center text-sm text-gray-500 dark:text-gray-500">
        <p>igorlabworks.com</p>
      </footer>
    </div>
  )
}

export default App
