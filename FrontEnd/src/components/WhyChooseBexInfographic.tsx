import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Handshake, Settings, Network, CheckCircle2, Zap, Shield, Crown } from 'lucide-react'

const WHITE       = '#FFFFFF'
const CENTER_COLOR = '#C0392B'
const DARK        = '#0B0C10'
const ICON_COLOR  = '#F4A600'

const features = [
  {
    icon: CheckCircle2,
    title: 'Precision',
    description: 'Delivering excellence in every detail.'
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description: 'Growing through trust and collaboration.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Transforming ideas into impactful experiences.'
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Acting with accountability and transparency.'
  },
  {
    icon: Settings,
    title: 'Capability',
    description: 'Executing with world-class resources and expertise.'
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'Building smarter for a better future.'
  }
]

// Layout values as % of the square container
const ORBIT  = 34   // orbit radius  (% from centre)
const OUTER  = 10.5 // outer circle half-width (%)
const CENTER = 14   // centre circle half-width (%)

const SPRING_SLOW  = { type: 'spring' as const, stiffness: 10,  damping: 26 }
const SPRING_MED   = { type: 'spring' as const, stiffness: 60,  damping: 22 }
const EASE_SLOW    = { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }

const WhyChooseBexInfographic: React.FC = () => {
  // activeIndex  → drives wheel rotation (updated on hover)
  // clickedIndex → drives description visibility (updated on click)
  const [activeIndex,  setActiveIndex]  = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  // Auto-rotate the wheel every 4 seconds for continuous motion, unless interacting
  useEffect(() => {
    if (hoveredIndex !== null || clickedIndex !== null) return
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [hoveredIndex, clickedIndex, features.length])

  const wheelRotation = -90 - activeIndex * 60

  const handleMouseEnter = (idx: number) => {
    setHoveredIndex(idx)
    // Removed setActiveIndex(idx) so the wheel doesn't rotate away from the cursor on hover
  }
  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }
  const handleClick = (idx: number) => {
    setClickedIndex(prev => prev === idx ? null : idx)
    setHoveredIndex(null) // Ensure hover is cleared when opening/closing modal
  }

  return (
    <div className="w-full py-12 flex flex-col items-center justify-center">

      {/* ─────────── DESKTOP / TABLET wheel ─────────── */}
      <div className="hidden sm:block w-full">
        <div
          className="relative mx-auto"
          style={{ width: 'min(82vw, 760px)', aspectRatio: '1 / 1' }}
        >
          {/* ── Centre circle (static) ── */}
          <div
            className="absolute rounded-full"
            style={{
              width:  `${CENTER * 2}%`,
              height: `${CENTER * 2}%`,
              left:   `${50 - CENTER}%`,
              top:    `${50 - CENTER}%`,
              backgroundColor: CENTER_COLOR,
              boxShadow: '0 0 3vw rgba(192,57,43,0.5)',
              zIndex: 20
            }}
          >
            <div
              className="absolute rounded-full flex flex-col items-center justify-center text-center p-4"
              style={{
                inset: '3%',
                backgroundColor: DARK,
                border: '2px solid rgba(192,57,43,0.4)'
              }}
            >
              <p
                className="font-urw font-bold uppercase tracking-widest text-white mb-1"
                style={{ fontSize: 'clamp(12px, 2vw, 20px)' }}
              >
                BEX<br/>Core Values
              </p>
            </div>
          </div>

          {/* ── Rotating wheel ── */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: wheelRotation }}
            transition={SPRING_SLOW}
            style={{ transformOrigin: '50% 50%' }}
          >
            {features.map((feature, idx) => {
              const angleDeg   = idx * 60
              const angleRad   = (angleDeg * Math.PI) / 180
              const cx         = 50 + ORBIT * Math.cos(angleRad)
              const cy         = 50 + ORBIT * Math.sin(angleRad)
              const isHovered  = hoveredIndex === idx
              const isClicked  = clickedIndex === idx
              const counterRot = -wheelRotation
              const Icon       = feature.icon

              // Scale: slight zoom on hover or click, no massive pop-out
              const scale = (isHovered || isClicked) ? 1.15 : 1

              return (
                <motion.div
                  key={idx}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(idx)}
                  // counter-rotate so content stays upright; also apply scale
                  animate={{ rotate: counterRot, scale }}
                  transition={SPRING_SLOW}
                  className="absolute rounded-full cursor-pointer flex items-center justify-center"
                  style={{
                    width:           `${OUTER * 2}%`,
                    height:          `${OUTER * 2}%`,
                    left:            `${cx - OUTER}%`,
                    top:             `${cy - OUTER}%`,
                    backgroundColor: WHITE,
                    zIndex:          isClicked ? 50 : isHovered ? 40 : 10,
                    boxShadow:       (isHovered || isClicked)
                      ? '0 0 2.5vw rgba(255,255,255,0.55), 0 0.8vw 2vw rgba(255,255,255,0.25)'
                      : '0 0.4vw 1.2vw rgba(255,255,255,0.12)',
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Inner dark circle */}
                  <div
                    className="absolute rounded-full flex flex-col items-center justify-center text-center overflow-hidden"
                    style={{
                      inset:           '3%',
                      backgroundColor: DARK,
                      border:          `1px solid rgba(255,255,255,${(isHovered || isClicked) ? '0.2' : '0.08'})`,
                      padding:         '7%',
                      transition:      'border-color 0.5s ease'
                    }}
                  >
                    {/* Icon — always visible */}
                    <motion.div
                      animate={{ scale: (isHovered || isClicked) ? 1.2 : 1 }}
                      transition={SPRING_MED}
                      style={{ flexShrink: 0, marginBottom: (isHovered || isClicked) ? '5%' : 0 }}
                    >
                      <Icon style={{
                        width:  'clamp(12px, 2vw, 24px)',
                        height: 'clamp(12px, 2vw, 24px)',
                        color:  ICON_COLOR,
                        transition: 'all 0.5s ease'
                      }} />
                    </motion.div>

                    {/* Title — revealed on hover */}
                    <AnimatePresence>
                      {(isHovered || isClicked) && (
                        <motion.h4
                          key="title"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={EASE_SLOW}
                          className="font-urw font-bold uppercase text-white leading-tight"
                          style={{ fontSize: 'clamp(9px, 1.6vw, 15px)', marginBottom: '3%' }}
                        >
                          {feature.title}
                        </motion.h4>
                      )}
                    </AnimatePresence>

                    {/* Description is now displayed in the center circle for desktop */}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* ─────────── MOBILE grid ─────────── */}
      <div className="sm:hidden grid grid-cols-2 gap-3 px-4 w-full">
        {features.map((feature, idx) => {
          const isActive = clickedIndex === idx
          const Icon = feature.icon
          return (
            <motion.div
              key={idx}
              onClick={() => handleClick(idx)}
              animate={{ scale: isActive ? 1.03 : 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer"
              style={{
                backgroundColor: DARK,
                border:     `2px solid ${isActive ? WHITE : 'rgba(255,255,255,0.12)'}`,
                boxShadow:  isActive ? '0 0 18px rgba(255,255,255,0.15)' : 'none',
                transition: 'border-color 0.5s ease, box-shadow 0.5s ease'
              }}
            >
              <Icon style={{ width: 28, height: 28, color: ICON_COLOR, marginBottom: 10 }} />
              <h4 className="font-urw font-bold text-[1.5rem] uppercase text-white leading-tight mb-2">
                {feature.title}
              </h4>
              <AnimatePresence>
                {isActive && (
                  <motion.p
                    key="mdesc"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="font-circe font-light text-[1.3rem] text-[#aaa] leading-snug"
                  >
                    {feature.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* ─────────── MODAL POPUP for details ─────────── */}
      <AnimatePresence>
        {clickedIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => {
                setClickedIndex(null)
                setHoveredIndex(null)
              }}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
              style={{
                backgroundColor: DARK,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 40px rgba(192, 57, 43, 0.2)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setClickedIndex(null)
                  setHoveredIndex(null)
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Close details"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center justify-center mb-8 shadow-inner">
                {React.createElement(features[clickedIndex].icon, { 
                  style: { width: '40px', height: '40px', color: ICON_COLOR } 
                })}
              </div>

              <h3 className="font-urw font-extrabold uppercase text-white tracking-wider text-[2.5rem] sm:text-[3.5rem] leading-tight mb-6">
                {features[clickedIndex].title}
              </h3>

              <div className="w-16 h-1 bg-brand-gold mx-auto mb-8 rounded-full opacity-50" />

              <p className="font-circe font-light text-brand-text-muted text-[1.8rem] sm:text-[2.2rem] leading-relaxed max-w-3xl">
                {features[clickedIndex].description}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default WhyChooseBexInfographic
