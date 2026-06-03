import React, { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'

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
            className="font-circe font-light text-2xl md:text-3xl lg:text-[3.2rem] text-brand-text-muted leading-relaxed max-w-[80rem] mb-20"
          >
            full-service event agency specializing in the creation <br className="hidden md:inline" />
            and management of unique exhibition projects
          </motion.p>

          {/* Statistics Block (Counters styled as glassmorphic cards for premium look) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[85rem]"
          >
            {/* Stat 1 */}
            <div className="flex flex-col bg-brand-dark-accent/30 border border-brand-white/5 backdrop-blur-md px-10 py-8 rounded-sm hover:border-brand-gold/30 hover:bg-brand-dark-accent/50 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_20px_40px_rgba(0,0,0,0.6)] group relative overflow-hidden">
              <div className="absolute inset-0 shimmer-sweep opacity-50 pointer-events-none" />
              <span className="font-urw font-extrabold text-[7.2rem] md:text-[8rem] text-brand-gold leading-none mb-2 group-hover:scale-105 transition-transform duration-300">
                <CountUp from={0} to={15} suffix="+" />
              </span>
              <span className="font-euclid font-bold text-[1.4rem] uppercase tracking-wider text-brand-text-muted">
                years experience
              </span>
            </div>
            
            {/* Stat 2 */}
            <div className="flex flex-col bg-brand-dark-accent/30 border border-brand-white/5 backdrop-blur-md px-10 py-8 rounded-sm hover:border-brand-gold/30 hover:bg-brand-dark-accent/50 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_20px_40px_rgba(0,0,0,0.6)] group relative overflow-hidden">
              <div className="absolute inset-0 shimmer-sweep opacity-50 pointer-events-none" />
              <span className="font-urw font-extrabold text-[7.2rem] md:text-[8rem] text-brand-gold leading-none mb-2 group-hover:scale-105 transition-transform duration-300">
                <CountUp from={0} to={20} suffix="+" />
              </span>
              <span className="font-euclid font-bold text-[1.4rem] uppercase tracking-wider text-brand-text-muted">
                countries
              </span>
            </div>
            
            {/* Stat 3 */}
            <div className="flex flex-col bg-brand-dark-accent/30 border border-brand-white/5 backdrop-blur-md px-10 py-8 rounded-sm hover:border-brand-gold/30 hover:bg-brand-dark-accent/50 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_20px_40px_rgba(0,0,0,0.6)] group relative overflow-hidden">
              <div className="absolute inset-0 shimmer-sweep opacity-50 pointer-events-none" />
              <span className="font-urw font-extrabold text-[7.2rem] md:text-[8rem] text-brand-gold leading-none mb-2 group-hover:scale-105 transition-transform duration-300">
                <CountUp from={0} to={500} suffix="+" />
              </span>
              <span className="font-euclid font-bold text-[1.4rem] uppercase tracking-wider text-brand-text-muted">
                completed projects
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Background Vertical Text Overlay "ABOUT" (Right side backdrop text from screenshot) */}
      <div className="absolute right-0 bottom-[10rem] text-[18rem] md:text-[22rem] lg:text-[26rem] font-urw font-black text-brand-white/[0.015] tracking-widest select-none rotate-90 origin-right translate-y-1/2 translate-x-[15rem] pointer-events-none hidden md:block">
        ABOUT
      </div>
    </section>
  )
}

export default Hero
