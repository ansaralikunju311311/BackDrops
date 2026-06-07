import React, { useEffect, useState } from 'react'
import { motion, animate, AnimatePresence } from 'framer-motion'
import { MessageSquare, Phone } from 'lucide-react'

const InstagramIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C16.255 1.876 13.779 1.042 11.14 1.04 5.707 1.04 1.282 5.461 1.277 10.899c-.001 1.816.486 3.594 1.417 5.158l-.979 3.57 3.655-.959c1.506.82 3.1 1.249 4.677 1.25zM17.5 13.9c-.3-.15-1.785-.88-2.087-.99-.3-.105-.52-.15-.74.15-.22.3-.85.99-1.04 1.2-.19.21-.38.24-.68.09-.3-.15-1.265-.465-2.41-1.485-.89-.79-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.135.3-.35.45-.52.15-.17.2-.28.3-.47.1-.19.05-.36-.02-.51-.07-.15-.74-1.785-1.015-2.445-.27-.65-.545-.56-.74-.57-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73s1.18 3.17 1.34 3.39c.17.22 2.32 3.54 5.62 4.97.785.34 1.395.54 1.87.69.79.25 1.51.21 2.08.13.635-.09 1.785-.73 2.035-1.43.25-.7.25-1.3.175-1.43-.075-.1-.275-.15-.575-.3z"/>
  </svg>
)

interface CounterProps {
  from: number
  to: number
  suffix?: string
}

const CountUp: React.FC<CounterProps> = ({ from, to, suffix = '' }) => {
  const [count, setCount] = useState(from)

  useEffect(() => {
    // Smooth countdown/count-up animation over 2 seconds
    const controls = animate(from, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate: (value) => {
        setCount(Math.floor(value))
      },
    })
    return () => controls.stop()
  }, [from, to])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

const Hero: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="about-us"
      className="relative h-screen min-h-[750px] flex items-center bg-brand-bg overflow-hidden pt-24"
    >
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,164,55,0.06),rgba(20,23,33,0))] pointer-events-none" />

      {/* Floating Glowing Ambient Orbs */}
      <div className="absolute top-[15%] left-[-15%] w-[60rem] h-[60rem] rounded-full bg-brand-gold/[0.04] blur-[130px] pointer-events-none animate-float-orb" />
      <div className="absolute bottom-[5%] right-[-10%] w-[70rem] h-[70rem] rounded-full bg-brand-gold/[0.03] blur-[150px] pointer-events-none animate-float-orb" style={{ animationDelay: '-7s' }} />

      {/* Abstract Architectural Diagonal Overlapping Bands (Reworked to use the downloaded WebP asset) */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[62%] pointer-events-none overflow-hidden select-none">
        <img
          src="/assets/about-banner-bg.webp"
          alt="BackDrops premium geometric bg"
          className="w-full h-full object-cover object-right opacity-70"
        />
        {/* Gradient Overlay to fade the image to the background color on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[140rem] mx-auto w-full px-6 md:px-12 lg:px-24 flex items-center">
        <div className="max-w-[95rem] w-full">
          
          {/* Main Title "BackDrops" (Liquid metallic gold gradient, matches screenshot) */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-urw font-extrabold text-[8.5rem] sm:text-[11rem] md:text-[13rem] lg:text-[14.5rem] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark leading-none mb-10"
          >
            BackDrops
          </motion.h1>

          {/* Subheading description (Fluid large text, matches screenshot) */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-circe font-light text-2xl md:text-3xl lg:text-[2.8rem] text-brand-text-muted leading-relaxed max-w-[80rem] mb-20"
          >
            Backdrops Exhibitions- BEX is an exhibition solutions partner creating impactful, precision-built brand environments through seamless design, production, and execution.
          </motion.p>

          {/* Statistics Block (Typographic list matching screenshot) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-12 max-w-[85rem] mt-16"
          >
            <div className="flex items-center gap-16 md:gap-24">
              {/* Stat 1 */}
              <div className="flex flex-col">
                <span className="font-urw font-bold text-[7.2rem] md:text-[8rem] text-brand-gold leading-none mb-3">
                  <CountUp from={0} to={600} suffix="+" />
                </span>
                <span className="font-circe font-light text-[2rem] text-brand-text-muted leading-tight">
                  completed projects
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col">
                <span className="font-urw font-bold text-[7.2rem] md:text-[8rem] text-brand-gold leading-none mb-3">
                  <CountUp from={0} to={20} suffix="+" />
                </span>
                <span className="font-circe font-light text-[2rem] text-brand-text-muted leading-tight">
                  years experience
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col">
                <span className="font-urw font-bold text-[7.2rem] md:text-[8rem] text-brand-gold leading-none mb-3">
                  <CountUp from={0} to={15} suffix="+" />
                </span>
                <span className="font-circe font-light text-[2rem] text-brand-text-muted leading-tight">
                  countries
                </span>
              </div>
            </div>

            {/* Chat Floating Button */}
            <div className="flex-shrink-0 self-end mb-2">
              <button 
                onClick={() => window.open('https://wa.me/971552291691', '_blank')}
                className="w-16 h-16 rounded-full bg-[#9E5330] hover:bg-[#b35e38] flex items-center justify-center text-brand-white shadow-[0_10px_25px_rgba(158,83,48,0.3)] hover:scale-110 transition-all duration-300 cursor-pointer"
                aria-label="Chat with us"
              >
                <WhatsAppIcon className="w-8 h-8" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating Sticky Sidebar (White background with vertical contacts) - vanishes when scrolled */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-[30%] z-50 bg-white py-20 px-6 flex flex-col gap-16 items-center shadow-[-5px_0_30px_rgba(0,0,0,0.18)] rounded-l-3xl border-y border-l border-gray-100 hidden md:flex w-28"
          >
            {/* Telephone */}
            <a href="tel:+971552291691" className="relative group flex items-center justify-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
                <Phone className="w-10 h-10" />
              </div>
              {/* Dot indicator */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/_backdrops.ae?igsh=dGlwbWpqazFybXd3" target="_blank" rel="noopener noreferrer" className="relative group flex items-center justify-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
                <InstagramIcon className="w-10 h-10" />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
            </a>

            {/* WhatsApp/Chat */}
            <a href="https://wa.me/971552291691" target="_blank" rel="noopener noreferrer" className="relative group flex items-center justify-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
                <WhatsAppIcon className="w-10 h-10" />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Vertical Text Overlay "ABOUT" */}
      <div className="absolute right-12 bottom-[10rem] text-[18rem] md:text-[22rem] lg:text-[26rem] font-urw font-black text-brand-white/[0.015] tracking-widest select-none rotate-90 origin-right translate-y-1/2 translate-x-[15rem] pointer-events-none hidden md:block">
        ABOUT
      </div>
    </section>
  )
}

export default Hero
