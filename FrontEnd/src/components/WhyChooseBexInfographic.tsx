import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Handshake, Settings, Network, CheckCircle2, Zap, Shield, Crown } from 'lucide-react'

const SAFFRON = '#F4A600'
const CENTER_COLOR = '#C0392B'
const DARK = '#0B0C10'

const features = [
  { icon: Globe,        title: "Execution Partner",      description: "Reliable on-ground execution across UAE, GCC, and internationally." },
  { icon: Handshake,    title: "Built for Collaboration", description: "Integrating seamlessly with agencies and brand teams." },
  { icon: Settings,     title: "End-to-End Capability",  description: "From technical production to logistics and site management." },
  { icon: Network,      title: "Global Standards",       description: "Navigating local requirements with world-class standards." },
  { icon: CheckCircle2, title: "Precision Details",      description: "Flawless execution delivered to the highest quality." },
  { icon: Zap,          title: "Agile and Scalable",     description: "Resources that scale to meet any project demand." },
  { icon: Shield,       title: "Proven Reliability",     description: "Consistently delivering on time and on budget." },
  { icon: Crown,        title: "Experience Focus",       description: "Creating environments that leave lasting impressions." }
]

// All layout values are % of the square container
const ORBIT  = 33   // orbit radius  (% from centre)
const OUTER  = 11   // outer circle half-width (%)
const CENTER = 15   // centre circle half-width (%)

const WhyChooseBexInfographic: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const wheelRotation = -90 - activeIndex * 45

  return (
    <div className="py-12 bg-transparent w-full">

      {/* ─────────── DESKTOP / TABLET wheel ─────────── */}
      <div className="hidden sm:flex justify-center items-center">
        <div
          className="relative"
          style={{ width: 'min(88vw, 860px)', aspectRatio: '1 / 1' }}
        >


          {/* ── Centre circle (static, never rotates) ── */}
          <div
            className="absolute rounded-full"
            style={{
              width: `${CENTER * 2}%`, height: `${CENTER * 2}%`,
              left: `${50 - CENTER}%`, top: `${50 - CENTER}%`,
              backgroundColor: CENTER_COLOR,
              boxShadow: '0 0 4vw rgba(192,57,43,0.55)',
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
                className="font-urw font-extrabold uppercase text-white leading-tight px-2"
                style={{ fontSize: 'clamp(12px, 3.2vw, 30px)' }}
              >
                Why Choose<br />BEX
              </h3>
              <p
                className="font-circe font-bold uppercase tracking-widest mt-1"
                style={{ fontSize: 'clamp(7px, 1.4vw, 13px)', color: SAFFRON }}
              >
                8 Core Values
              </p>
            </div>
          </div>

          {/* ── Rotating wheel ── */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: wheelRotation }}
            transition={{ type: 'spring', stiffness: 18, damping: 22 }}
            style={{ transformOrigin: '50% 50%' }}
          >
            {features.map((feature, idx) => {
              const angleDeg = idx * 45
              const angleRad = (angleDeg * Math.PI) / 180
              const cx = 50 + ORBIT * Math.cos(angleRad)   // % from left
              const cy = 50 + ORBIT * Math.sin(angleRad)   // % from top
              const isActive   = idx === activeIndex
              const counterRot = -wheelRotation             // keeps content upright

              const Icon = feature.icon

              return (
                <div key={idx}>


                  {/* Outer feature circle */}
                  <motion.div
                    onMouseEnter={() => setActiveIndex(idx)}
                    animate={{ rotate: counterRot, scale: isActive ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 18, damping: 22 }}
                    className="absolute rounded-full cursor-pointer flex items-center justify-center"
                    style={{
                      width:  `${OUTER * 2}%`,
                      height: `${OUTER * 2}%`,
                      left:   `${cx - OUTER}%`,
                      top:    `${cy - OUTER}%`,
                      backgroundColor: SAFFRON,
                      zIndex: 10,
                      boxShadow: isActive
                        ? `0 0 3vw rgba(244,166,0,0.65), 0 1vw 2vw rgba(244,166,0,0.3)`
                        : `0 0.5vw 1.5vw rgba(244,166,0,0.2)`,
                      transformOrigin: 'center center'
                    }}
                  >
                    {/* Inner dark circle */}
                    <div
                      className="absolute rounded-full flex flex-col items-center justify-center text-center overflow-hidden"
                      style={{
                        inset: '3%',
                        backgroundColor: DARK,
                        border: '1px solid rgba(244,166,0,0.25)',
                        padding: '6%'
                      }}
                    >
                      <motion.div
                        animate={{ scale: isActive ? 1.3 : 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                        style={{ marginBottom: '6%', flexShrink: 0 }}
                      >
                        <Icon
                          style={{ width: 'clamp(14px, 2.2vw, 28px)', height: 'clamp(14px, 2.2vw, 28px)', color: SAFFRON }}
                        />
                      </motion.div>

                      <motion.h4
                        className="font-urw font-bold uppercase text-white leading-tight"
                        animate={{ fontSize: isActive ? 'clamp(10px, 1.9vw, 17px)' : 'clamp(9px, 1.55vw, 14px)' }}
                        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                        style={{ marginBottom: '4%' }}
                      >
                        {feature.title}
                      </motion.h4>

                      <motion.p
                        className="font-circe font-light text-[#aaa] leading-snug"
                        animate={{ fontSize: isActive ? 'clamp(8px, 1.5vw, 13px)' : 'clamp(7px, 1.2vw, 11px)' }}
                        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* ─────────── MOBILE grid ─────────── */}
      <div className="sm:hidden grid grid-cols-2 gap-3 px-4">
        {features.map((feature, idx) => {
          const isActive = activeIndex === idx
          const Icon = feature.icon
          return (
            <motion.div
              key={idx}
              onTouchStart={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              animate={{ scale: isActive ? 1.03 : 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer"
              style={{
                backgroundColor: DARK,
                border: `2px solid ${isActive ? SAFFRON : 'rgba(244,166,0,0.2)'}`,
                boxShadow: isActive ? `0 0 20px rgba(244,166,0,0.3)` : 'none'
              }}
            >
              <Icon style={{ width: 28, height: 28, color: SAFFRON, marginBottom: 8 }} />
              <h4 className="font-urw font-bold text-[1.3rem] uppercase text-white leading-tight mb-1">
                {feature.title}
              </h4>
              <p className="font-circe font-light text-[1.1rem] text-[#aaa] leading-snug">
                {feature.description}
              </p>
            </motion.div>
          )
        })}
      </div>

    </div>
  )
}

export default WhyChooseBexInfographic
