import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Handshake, Settings, Network, CheckCircle2, Zap, Shield, Crown } from 'lucide-react'

const SAFFRON = '#F4A600'
const CENTER_COLOR = '#C0392B'

const features = [
  {
    icon: <Globe className="w-8 h-8 text-[#F4A600]" />,
    title: "Execution Partner",
    description: "Reliable on-ground execution across UAE, GCC, and internationally."
  },
  {
    icon: <Handshake className="w-8 h-8 text-[#F4A600]" />,
    title: "Built for Collaboration",
    description: "Integrating seamlessly with agencies and brand teams."
  },
  {
    icon: <Settings className="w-8 h-8 text-[#F4A600]" />,
    title: "End-to-End Capability",
    description: "From technical production to logistics and site management."
  },
  {
    icon: <Network className="w-8 h-8 text-[#F4A600]" />,
    title: "Global Standards",
    description: "Navigating local requirements with world-class standards."
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-[#F4A600]" />,
    title: "Precision Details",
    description: "Flawless execution delivered to the highest quality."
  },
  {
    icon: <Zap className="w-8 h-8 text-[#F4A600]" />,
    title: "Agile and Scalable",
    description: "Resources that scale to meet any project demand."
  },
  {
    icon: <Shield className="w-8 h-8 text-[#F4A600]" />,
    title: "Proven Reliability",
    description: "Consistently delivering on time and on budget."
  },
  {
    icon: <Crown className="w-8 h-8 text-[#F4A600]" />,
    title: "Experience Focus",
    description: "Creating environments that leave lasting impressions."
  }
]

const RADIUS = 330
const CIRCLE_R = 112

const WhyChooseBexInfographic: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Rotate wheel so the hovered circle comes to the top (−90° offset = 12 o'clock)
  const wheelRotation = -90 - activeIndex * 45

  return (
    <div className="py-16 bg-transparent relative overflow-hidden flex flex-col items-center justify-center min-h-[900px]">

      {/* Wrapper — scale for responsiveness */}
      <div
        className="relative mx-auto scale-[0.52] sm:scale-[0.65] md:scale-[0.80] lg:scale-100"
        style={{ width: 1000, height: 1000 }}
      >

        {/* ── CENTER CIRCLE (does NOT rotate) ── */}
        <div
          className="absolute z-20 rounded-full flex items-center justify-center"
          style={{
            width: 300,
            height: 300,
            left: 350,
            top: 350,
            backgroundColor: CENTER_COLOR,
            boxShadow: '0 15px 40px rgba(192,57,43,0.6)'
          }}
        >
          <div
            className="rounded-full flex flex-col items-center justify-center text-center border-2 border-[#C0392B]/40"
            style={{
              width: 282,
              height: 282,
              backgroundColor: '#0B0C10',
              boxShadow: 'inset 0 4px 15px rgba(0,0,0,0.5)'
            }}
          >
            <h3 className="font-urw font-extrabold text-[3.2rem] text-white uppercase leading-tight px-4 tracking-wide">
              Why Choose<br />BEX
            </h3>
            <p
              className="font-circe font-bold text-[1.6rem] mt-2 tracking-[0.2em] uppercase"
              style={{ color: SAFFRON }}
            >
              8 Core Values
            </p>
          </div>
        </div>

        {/* ── ROTATING WHEEL ── */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: wheelRotation }}
          transition={{ type: 'spring', stiffness: 18, damping: 22 }}
          style={{ transformOrigin: '500px 500px' }}
        >
          {features.map((feature, idx) => {
            const angleDeg = idx * 45      // fixed angle on the wheel
            const angleRad = (angleDeg * Math.PI) / 180
            const cx = 500 + RADIUS * Math.cos(angleRad)
            const cy = 500 + RADIUS * Math.sin(angleRad)
            const isActive = idx === activeIndex

            // Counter-rotate to keep content upright
            const counterRotate = -wheelRotation

            return (
              <g key={idx}>
                {/* Connecting line — only visible for the active (top) circle */}
                <div
                  key={`line-${idx}`}
                  className="absolute"
                  style={{
                    width: RADIUS - CIRCLE_R - 150,
                    height: 5,
                    backgroundColor: SAFFRON,
                    top: 500,
                    left: 500 + CIRCLE_R + 150,
                    transformOrigin: '0 50%',
                    transform: `rotate(${angleDeg}deg)`,
                    borderRadius: 3,
                    zIndex: 1,
                    opacity: isActive ? 1 : 0,
                    boxShadow: isActive ? '0 0 10px rgba(244,166,0,0.7)' : 'none',
                    transition: 'opacity 0.5s ease'
                  }}
                />

                {/* Outer feature circle */}
                <motion.div
                  onMouseEnter={() => setActiveIndex(idx)}
                  animate={{
                    rotate: counterRotate,
                    scale: isActive ? 1.08 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 18, damping: 22 }}
                  className="absolute rounded-full cursor-pointer flex items-center justify-center"
                  style={{
                    width: CIRCLE_R * 2,
                    height: CIRCLE_R * 2,
                    left: cx - CIRCLE_R,
                    top: cy - CIRCLE_R,
                    backgroundColor: SAFFRON,
                    zIndex: 10,
                    boxShadow: isActive
                      ? '0 0 32px rgba(244,166,0,0.65), 0 10px 28px rgba(244,166,0,0.3)'
                      : '0 10px 22px rgba(244,166,0,0.18)',
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Inner dark circle — content stays upright */}
                  <div
                    className="rounded-full flex flex-col items-center justify-center text-center border border-[#F4A600]/25"
                    style={{
                      width: CIRCLE_R * 2 - 14,
                      height: CIRCLE_R * 2 - 14,
                      backgroundColor: '#0B0C10',
                      padding: '1.2rem'
                    }}
                  >
                    <motion.div
                      className="mb-2"
                      animate={{ scale: isActive ? 1.3 : 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <motion.h4
                      className="font-urw font-bold uppercase text-white leading-tight mb-1.5"
                      animate={{ fontSize: isActive ? '1.6rem' : '1.35rem' }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    >
                      {feature.title}
                    </motion.h4>
                    <motion.p
                      className="font-circe font-light text-[#aaa] leading-snug"
                      animate={{ fontSize: isActive ? '1.35rem' : '1.15rem' }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              </g>
            )
          })}
        </motion.div>

      </div>
    </div>
  )
}

export default WhyChooseBexInfographic
