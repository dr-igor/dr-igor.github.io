import { Link, useLocation } from 'react-router-dom'
import * as Switch from '@radix-ui/react-switch'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo/Icon */}
          <Link to="/" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-8 h-8">
              <defs>
                <linearGradient id="nav-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M 35 20 L 35 40 L 25 70 Q 20 85 30 90 L 70 90 Q 80 85 75 70 L 65 40 L 65 20 Z" 
                    fill="url(#nav-grad)" stroke="currentColor" strokeWidth="2" className="text-gray-800 dark:text-gray-200"/>
              <rect x="40" y="10" width="20" height="10" fill="url(#nav-grad)" stroke="currentColor" strokeWidth="2" className="text-gray-800 dark:text-gray-200"/>
              <circle cx="45" cy="60" r="4" fill="white" opacity="0.6"/>
              <circle cx="55" cy="70" r="3" fill="white" opacity="0.7"/>
              <circle cx="50" cy="75" r="2.5" fill="white" opacity="0.8"/>
            </svg>
          </Link>

          {/* Center: Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-purple-700 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/about'
                  ? 'text-purple-700 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400'
              }`}
            >
              About
            </Link>
          </div>

          {/* Right: Theme Toggle */}
          <div className="flex items-center gap-3">
            <SunIcon className="w-4 h-4 text-amber-600 dark:text-amber-500" />
            <Switch.Root
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="w-11 h-6 bg-gray-300 dark:bg-zinc-700 rounded-full relative transition-colors data-[state=checked]:bg-purple-700 outline-none cursor-pointer"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
            <MoonIcon className="w-4 h-4 text-purple-700 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
