'use client'

import { motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { Zap, Menu, X, RefreshCw, Database } from 'lucide-react'

interface HeaderProps {
  onSyncData?: () => Promise<void>
  isSyncing?: boolean
}

export function Header({ onSyncData, isSyncing }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Zap className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold">Meteor Tracker</h1>
              <p className="text-sm text-gray-300">Near-Earth Objects & Impact Assessment</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/dashboard" className="hover:text-purple-400 transition-colors">
              Dashboard
            </a>
            <a href="/objects" className="hover:text-purple-400 transition-colors">
              Near Earth Objects
            </a>
            <a href="/impact" className="hover:text-purple-400 transition-colors">
              Impact Analysis
            </a>
          </nav>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-700"
          >
            <nav className="flex flex-col space-y-4">
              <a href="/dashboard" className="hover:text-purple-400 transition-colors">
                Dashboard
              </a>
              <a href="/objects" className="hover:text-purple-400 transition-colors">
                Near Earth Objects
              </a>
              <a href="/impact" className="hover:text-purple-400 transition-colors">
                Impact Analysis
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
