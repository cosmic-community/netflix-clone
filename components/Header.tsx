'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="px-4 md:px-8 lg:px-16">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-netflix-red text-2xl font-bold">
            NETFLIX
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/movies" className="text-white hover:text-gray-300 transition-colors">
              Movies
            </Link>
            <Link href="/tv-shows" className="text-white hover:text-gray-300 transition-colors">
              TV Shows
            </Link>
          </div>

          {/* Search */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}