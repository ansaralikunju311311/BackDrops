import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import BexLogo from './BexLogo'

const Header: React.FC = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isServicesHovered, setIsServicesHovered] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)

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
  const servicesList = [
    "Exhibition Stand Production",
    "Custom Fabrication & Joinery",
    "Event & Activation Builds",
    "On-site Installation & Project Management",
    "Mall & Retail Installations",
    "Experiential Booth Engineering",
    "Office and Villa Interiors",
    "Graphics and Signage",
    "Furniture Rentals",
    "Storage Facilities"
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#000000] ${
        isScrolled
          ? 'py-5 border-b border-brand-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-8'
      }`}
    >
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        
        <Link to="/" className="flex items-center group py-1">
          <BexLogo scale={isScrolled ? 1.15 : 1.35} />
        </Link>

        {/* Right: Navigation Links and Optional Scrolled Action Button */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-2 relative">
            {menuItems.map((item, idx) => {
              const isAbout = item.toLowerCase() === 'about us'
              const isServices = item.toLowerCase() === 'services'
              const isPortfolio = item.toLowerCase() === 'portfolio'
              const isContacts = item.toLowerCase() === 'contacts'
              const isClientRoute = isAbout || isServices || isPortfolio || isContacts
              
              const hrefPath = isAbout
                ? '/about-us'
                : isServices
                  ? '/services'
                  : isPortfolio
                    ? '/portfolio'
                    : isContacts 
                      ? '/contacts' 
                      : (location.pathname !== '/' && location.pathname !== '/home' ? `/#${item.toLowerCase().replace(' ', '-')}` : `#${item.toLowerCase().replace(' ', '-')}`)
              
              const Component = isClientRoute ? Link : 'a'
              const props = isClientRoute ? { to: hrefPath } : { href: hrefPath }

              if (isServices) {
                return (
                  <div
                    key={item}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredIndex(idx)
                      setIsServicesHovered(true)
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null)
                      setIsServicesHovered(false)
                    }}
                  >
                    <Link
                      to="/services"
                      className="font-euclid text-brand-white hover:text-brand-gold transition-colors duration-300 relative px-6 py-3 rounded-xs flex items-center gap-1.5"
                      style={{ fontSize: '1.8rem', fontWeight: 400, letterSpacing: '0.05em' }}
                    >
                      <span className="relative z-10">{item}</span>
                      <svg className={`w-4 h-4 transition-transform duration-300 z-10 ${isServicesHovered ? 'rotate-180 text-brand-gold' : 'text-brand-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                      
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
                    </Link>

                    {/* Desktop Hover Dropdown Menu */}
                    <AnimatePresence>
                      {isServicesHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-[42rem] bg-brand-bg/95 backdrop-blur-md border border-brand-white/10 p-6 rounded-xs shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50 flex flex-col gap-4 text-left"
                        >
                          {servicesList.map((service, sIdx) => (
                            <Link
                              key={service}
                              to={`/services?id=${sIdx}`}
                              onClick={() => setIsServicesHovered(false)}
                              className="font-euclid font-bold text-brand-white/70 hover:text-brand-gold transition-all duration-300 hover:translate-x-1 flex items-center gap-3 group/item"
                              style={{ fontSize: '2.1rem' }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold scale-0 group-hover/item:scale-100 transition-transform duration-300 shrink-0" />
                              {service}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <Component
                  key={item}
                  {...props}
                  className="font-euclid text-brand-white hover:text-brand-gold transition-colors duration-300 relative px-6 py-3 rounded-xs"
                  style={{ fontSize: '1.8rem', fontWeight: 400, letterSpacing: '0.05em' }}
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
                </Component>
              )
            })}
          </nav>

          {/* Scrolled Send Request Button */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/contacts"
                  className="font-euclid font-bold text-[1.6rem] tracking-wider uppercase px-8 py-4 bg-brand-gold text-brand-white hover:bg-brand-white hover:text-brand-dark transition-all duration-300 rounded-xs flex items-center gap-3 shadow-[0_10px_20px_rgba(158,83,48,0.15)] group"
                >
                  Send Request <span className="font-light text-[1.8rem] group-hover:translate-x-1 transition-transform duration-300">+</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
                {menuItems.map((item) => {
                  const isAbout = item.toLowerCase() === 'about us'
                  const isServices = item.toLowerCase() === 'services'
                  const isPortfolio = item.toLowerCase() === 'portfolio'
                  const isContacts = item.toLowerCase() === 'contacts'
                  const isClientRoute = isAbout || isServices || isPortfolio || isContacts
                  
                  const hrefPath = isAbout
                    ? '/about-us'
                    : isServices
                      ? '/services'
                      : isPortfolio
                        ? '/portfolio'
                        : isContacts 
                          ? '/contacts' 
                          : (location.pathname !== '/' && location.pathname !== '/home' ? `/#${item.toLowerCase().replace(' ', '-')}` : `#${item.toLowerCase().replace(' ', '-')}`)
                  
                  const Component = isClientRoute ? Link : 'a'
                  const props = isClientRoute ? { to: hrefPath } : { href: hrefPath }

                  if (isServices) {
                    return (
                      <div key={item} className="flex flex-col">
                        <button
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className="font-urw text-brand-white hover:text-brand-gold py-3 border-b border-brand-white/5 transition-colors duration-300 flex items-center justify-between text-left w-full cursor-pointer"
                          style={{ fontSize: '2.0rem', fontWeight: 400, letterSpacing: '0.05em' }}
                        >
                          {item}
                          <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180 text-brand-gold' : 'text-brand-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <AnimatePresence>
                          {isMobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden pl-6 flex flex-col gap-4 py-4 border-l border-brand-white/10 mt-2 bg-brand-white/[0.01]"
                            >
                              {servicesList.map((service, sIdx) => (
                                <Link
                                  key={service}
                                  to={`/services?id=${sIdx}`}
                                  onClick={() => {
                                    setIsMobileServicesOpen(false)
                                    setIsMobileMenuOpen(false)
                                  }}
                                  className="font-euclid font-bold text-brand-white/70 hover:text-brand-gold transition-colors duration-300 py-1"
                                  style={{ fontSize: '2.2rem' }}
                                >
                                  {service}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  return (
                    <Component
                      key={item}
                      {...props}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-urw text-brand-white hover:text-brand-gold py-3 border-b border-brand-white/5 transition-colors duration-300"
                      style={{ fontSize: '2.0rem', fontWeight: 400, letterSpacing: '0.05em' }}
                    >
                      {item}
                    </Component>
                  )
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

