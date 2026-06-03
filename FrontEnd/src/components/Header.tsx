import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = ['About us', 'Services', 'Portfolio', 'Contacts']

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050608]/85 backdrop-blur-md py-5 border-b border-brand-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        
        {/* Left: Brand Logo & Marker */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-urw font-black text-[3.4rem] md:text-[3.8rem] tracking-tight text-brand-white uppercase leading-none transition-all duration-300">
            Back<span className="text-brand-gold group-hover:text-brand-gold-light transition-colors duration-300">Drops</span>
          </span>
          <span className="w-2 h-2 bg-brand-gold group-hover:bg-brand-gold-light rounded-full transition-colors duration-300 self-end mb-2" />
        </a>

        {/* Center: IFES Badge (Desktop Only) */}
        <div className="hidden lg:flex items-center border border-brand-white/5 px-6 py-2.5 gap-4 bg-brand-white/[0.02] rounded-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-brand-gold/30 hover:bg-brand-white/[0.04] transition-all duration-300">
          <span className="font-urw font-black text-[2.2rem] tracking-widest text-brand-gold">
            IFES
          </span>
          <div className="w-[1px] h-6 bg-brand-white/10" />
          <div className="font-euclid font-normal text-[1.3rem] text-brand-text-muted leading-tight">
            International Federation<br />of Event Services
          </div>
        </div>

        {/* Right: Navigation Links with sliding background bubble */}
        <nav className="hidden lg:flex items-center gap-2 relative">
          {menuItems.map((item, idx) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="font-euclid font-bold text-[1.5rem] tracking-wider uppercase text-brand-white/80 hover:text-brand-gold transition-colors duration-300 relative px-6 py-3 rounded-xs"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="relative z-10">{item}</span>
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-brand-white/5 rounded-xs z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full bg-brand-white/5 border border-brand-white/10 text-brand-white hover:text-brand-gold transition-all duration-300"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[8.5rem] bg-brand-dark/95 backdrop-blur-lg border-b border-brand-border z-40 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 gap-8 h-full">
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-urw font-bold text-[2.2rem] uppercase tracking-wider text-brand-white hover:text-brand-gold py-3 border-b border-brand-white/5 transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

