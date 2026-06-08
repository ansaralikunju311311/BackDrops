import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Handshake, Settings, Network, CheckCircle2, Zap, Shield, Crown } from 'lucide-react'

const WHITE       = '#FFFFFF'
const CENTER_COLOR = '#C0392B'
const DARK        = '#0B0C10'
const ICON_COLOR  = '#F4A600'

const features = [
  {
    icon: Globe,
    title: 'Your Execution Partner, Anywhere',
    description: 'We provide reliable on-ground execution support for agencies and brands across the UAE, GCC, and international markets, ensuring concepts are delivered exactly as envisioned.'
  },
  {
    icon: Handshake,
    title: 'Built for Collaboration',
    description: 'We integrate seamlessly with creative agencies, event organizers, designers, and brand teams, acting as a trusted extension of your project team.'
  },
  {
    icon: Settings,
    title: 'End-to-End Delivery Capability',
    description: 'From technical development and production to logistics, installation, site management, and dismantling, we manage every stage of execution with complete accountability.'
  },
  {
    icon: Network,
    title: 'Global Standards, Local Expertise',
    description: 'Our international experience combined with deep regional knowledge allows us to navigate local requirements while maintaining world-class execution standards.'
  },
  {
    icon: CheckCircle2,
    title: 'Precision in Every Detail',
    description: 'We understand that exceptional experiences are built on flawless execution. Every element is carefully planned, coordinated, and delivered to the highest quality standards.'
  },
  {
    icon: Zap,
    title: 'Agile and Scalable Solutions',
    description: "Whether it's a single activation, a major exhibition pavilion, a corporate interior project, or a multi-country rollout, our resources and expertise scale to meet project demands."
  },
  {
    icon: Shield,
    title: 'Proven Reliability',
    description: 'Our clients trust us because we consistently deliver on time, on budget, and to specification even under the most demanding project conditions.'
  },
  {
    icon: Crown,
    title: 'Focused on Experience',
    description: "We don't simply build structures; we create environments that strengthen brands, engage audiences, and leave lasting impressions."
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

  const wheelRotation = -90 - activeIndex * 45

  const handleMouseEnter = (idx: number) => {
    setHoveredIndex(idx)
    setActiveIndex(idx)
  }
  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }
  const handleClick = (idx: number) => {
    setClickedIndex(prev => prev === idx ? null : idx)
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
              className="absolute rounded-full flex flex-col items-center justify-center text-center"
              style={{
                inset: '3%',
                backgroundColor: DARK,
                border: '2px solid rgba(192,57,43,0.4)'
              }}
            >
              <h3
                className="font-urw font-extrabold uppercase text-white leading-tight px-1"
                style={{ fontSize: 'clamp(11px, 2.8vw, 26px)' }}
              >
                Why Choose<br />BEX
              </h3>
              <p
                className="font-circe font-bold uppercase tracking-widest mt-1"
                style={{ fontSize: 'clamp(6px, 1.2vw, 11px)', color: WHITE, opacity: 0.6 }}
              >
                8 Core Values
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
              const angleDeg   = idx * 45
              const angleRad   = (angleDeg * Math.PI) / 180
              const cx         = 50 + ORBIT * Math.cos(angleRad)
              const cy         = 50 + ORBIT * Math.sin(angleRad)
              const isHovered  = hoveredIndex === idx
              const isClicked  = clickedIndex === idx
              const counterRot = -wheelRotation
              const Icon       = feature.icon

              // Scale: only zoom on hover or click
              const scale = (isHovered || isClicked) ? 1.14 : 1

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
                    zIndex:          10,
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
                          style={{ fontSize: 'clamp(8px, 1.45vw, 13px)', marginBottom: '3%' }}
                        >
                          {feature.title}
                        </motion.h4>
                      )}
                    </AnimatePresence>

                    {/* Description — revealed only on click */}
                    <AnimatePresence>
                      {isClicked && (
                        <motion.p
                          key="desc"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ ...EASE_SLOW, delay: 0.1 }}
                          className="font-circe font-light leading-snug"
                          style={{ fontSize: 'clamp(6px, 1.1vw, 10px)', color: '#aaa' }}
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
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
              <Icon style={{ width: 26, height: 26, color: ICON_COLOR, marginBottom: 8 }} />
              <h4 className="font-urw font-bold text-[1.2rem] uppercase text-white leading-tight mb-1">
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
                    className="font-circe font-light text-[1rem] text-[#aaa] leading-snug"
                  >
                    {feature.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

    </div>
  )
}

export default WhyChooseBexInfographic
