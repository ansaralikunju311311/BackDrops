import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ShieldCheck, Settings, Award, Briefcase, Sliders, Heart } from 'lucide-react'

const StaggeredFeatures: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const cards = [
    {
      num: "# 01",
      icon: <Sliders className="w-6 h-6 transition-transform duration-300" />,
      title: "Execution-First Mindset",
      description: "We understand agency timelines, last-minute changes, and the need for perfection under pressure.",
      isGold: false,
      align: "top"
    },
    {
      num: "# 02",
      icon: <Settings className="w-6 h-6 transition-transform duration-300" />,
      title: "Production Strength",
      description: "With an in-house team and production capability, we ensure quality control, flexibility, and faster turnaround.",
      isGold: true,
      align: "bottom"
    },
    {
      num: "# 03",
      icon: <Award className="w-6 h-6 transition-transform duration-300" />,
      title: "Creative Compatibility",
      description: "We respect your creative vision and enhance it with practical, buildable solutions—without compromising design intent.",
      isGold: false,
      align: "top"
    },
    {
      num: "# 04",
      icon: <ShieldCheck className="w-6 h-6 transition-transform duration-300" />,
      title: "Reliability Under Pressure",
      description: "Tight deadlines, complex builds, or high-stakes events—we deliver with consistency and professionalism.",
      isGold: true,
      align: "bottom"
    },
    {
      num: "# 05",
      icon: <Briefcase className="w-6 h-6 transition-transform duration-300" />,
      title: "Market Advantage",
      description: "Deep understanding and knowledge of Middle East exhibition landscape and regulations",
      isGold: false,
      align: "top"
    },
    {
      num: "# 06",
      icon: <Heart className="w-6 h-6 transition-transform duration-300" />,
      title: "Collaborative Approach",
      description: "We don’t position ourselves as vendors, but as extension of your team.",
      isGold: true,
      align: "bottom"
    }
  ]

  // Container variants for staggered entry animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const cardVariants = (isTop: boolean) => ({
    hidden: {
      opacity: 0,
      y: isTop ? -30 : 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 15,
        duration: 0.8
      }
    }
  })

  return (
    <section className="py-32 bg-brand-bg relative overflow-hidden border-t border-brand-border/30">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,164,55,0.06),rgba(20,23,33,0))] pointer-events-none" />

      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Heading */}
        <div className="mb-24 relative">
          <h2 className="font-urw font-extrabold text-[4.5rem] md:text-[5.5rem] text-brand-white uppercase tracking-wider leading-tight">
            Why agencies choose us
          </h2>
          <div className="w-24 h-[2px] bg-[#9E5330] mt-6" />
        </div>

        {/* Timeline wrapper */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Main Horizontal Timeline Line in silver/white */}
          <div className="absolute top-[26rem] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none hidden xl:block" />

          {/* Desktop Timeline Layout (6 Columns, Staggered Top/Bottom alignment) */}
          <div className="hidden xl:grid grid-cols-6 gap-6 relative h-[52rem] w-full">
            {cards.map((card, idx) => {
              const isTop = card.align === "top"
              const isHovered = hoveredIdx === idx
              const isExpanded = expandedIdx === idx

              const toggleExpand = (e: React.MouseEvent) => {
                e.stopPropagation()
                setExpandedIdx(isExpanded ? null : idx)
              }

              return (
                <div
                  key={idx}
                  className={`flex flex-col h-full relative ${isTop ? 'justify-start' : 'justify-end'}`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Vertical Connection Line */}
                  {isTop ? (
                    <div className={`absolute top-[24rem] bottom-[26rem] left-1/2 w-[1.5px] transition-all duration-300 pointer-events-none origin-bottom ${
                      isHovered ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] scale-y-105' : 'bg-white/15'
                    }`} />
                  ) : (
                    <div className={`absolute top-[26rem] bottom-[24rem] left-1/2 w-[1.5px] transition-all duration-300 pointer-events-none origin-top ${
                      isHovered ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] scale-y-105' : 'bg-white/15'
                    }`} />
                  )}

                  {/* Connecting Node Dot */}
                  <div className={`absolute top-[25.2rem] left-[calc(50%-8px)] w-4 h-4 rounded-full transition-all duration-300 z-10 pointer-events-none border-2 border-[#0B0C10] ${
                    isHovered ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,1)] scale-125' : 'bg-white/30'
                  }`} />

                  {/* Card Element */}
                  <motion.div
                    variants={cardVariants(isTop)}
                    whileHover={{ y: isTop ? -8 : 8 }}
                    onClick={toggleExpand}
                    className={`w-full min-h-[24rem] h-auto p-8 flex flex-col justify-between rounded-sm cursor-pointer transition-all duration-300 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.7)] overflow-hidden border group relative ${
                      card.isGold
                        ? 'bg-[#9E5330] border-[#9E5330]/20 text-white hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.15),_0_20px_45px_-10px_rgba(158,83,48,0.4)]'
                        : 'bg-brand-dark-accent/80 border-brand-white/5 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.15),_0_20px_45px_-10px_rgba(0,0,0,0.8)] text-white'
                    }`}
                  >
                    {/* Top glowing white line expanding on hover */}
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none" />

                    {/* Radial background glow on hover */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Diagonal light beam sweep reflection on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                    {/* Shimmer Sweep Effect overlay */}
                    <div className="absolute inset-0 shimmer-sweep opacity-10 pointer-events-none" />

                    {/* Top: Icon & Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 ${
                        card.isGold
                          ? 'bg-white/10 border-white/20 text-white group-hover:scale-110'
                          : 'bg-brand-white/[0.03] border-brand-white/10 text-brand-gold group-hover:scale-110'
                      }`}>
                        {card.icon}
                      </div>
                      <span className={`font-circe font-light text-[1.8rem] ${
                        card.isGold ? 'text-white/60' : 'text-brand-text-muted'
                      }`}>
                        {card.num}
                      </span>
                    </div>

                    {/* Bottom: Title & Expander */}
                    <div className="flex flex-col gap-4 mt-auto">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-circe font-light text-[2.2rem] xl:text-[2.4rem] leading-snug tracking-normal text-white">
                          {card.title}
                        </h3>
                        <motion.span 
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-[1.2rem] transition-colors duration-200 ${
                            card.isGold ? 'border-white/30 text-white group-hover:bg-white/10' : 'border-brand-gold/30 text-brand-gold group-hover:bg-brand-gold/10'
                          }`}
                        >
                          ▼
                        </motion.span>
                      </div>
                      
                      <motion.div
                        initial={false}
                        animate={{ 
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className={`font-circe font-light text-[1.6rem] leading-relaxed mt-2 ${
                          card.isGold ? 'text-white/80' : 'text-brand-text-muted'
                        }`}>
                          {card.description}
                        </p>
                      </motion.div>

                      {/* Clickable Hint Indicator */}
                      <span className={`text-[1.2rem] tracking-wider uppercase font-circe font-semibold mt-1 transition-opacity duration-300 opacity-30 group-hover:opacity-75 flex items-center gap-1.5 ${
                        card.isGold ? 'text-white' : 'text-brand-gold'
                      }`}>
                        {isExpanded ? 'Click to collapse' : 'Click to expand'}
                      </span>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>

          {/* Mobile & Tablet Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 xl:hidden">
            {cards.map((card, idx) => {
              const isExpanded = expandedIdx === idx
              const toggleExpand = (e: React.MouseEvent) => {
                e.stopPropagation()
                setExpandedIdx(isExpanded ? null : idx)
              }

              return (
                <motion.div
                  key={idx}
                  variants={cardVariants(true)}
                  whileHover={{ scale: 1.03 }}
                  onClick={toggleExpand}
                  className={`min-h-[22rem] h-auto p-8 flex flex-col justify-between rounded-sm border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    card.isGold
                      ? 'bg-[#9E5330] border-[#9E5330]/20 text-white hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                      : 'bg-brand-dark-accent/80 border-brand-white/5 text-white hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                  }`}
                >
                  {/* Top glowing white line expanding on hover */}
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none" />

                  {/* Radial background glow on hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Diagonal light beam sweep reflection on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                  <div className="absolute inset-0 shimmer-sweep opacity-10 pointer-events-none" />
                  
                  {/* Top: Icon & Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border ${
                      card.isGold
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-brand-white/[0.03] border-brand-white/10 text-brand-gold'
                    }`}>
                      {card.icon}
                    </div>
                    <span className={`font-circe font-light text-[1.8rem] ${
                      card.isGold ? 'text-white/60' : 'text-brand-text-muted'
                    }`}>
                      {card.num}
                    </span>
                  </div>

                  {/* Bottom: Title & Expander */}
                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-circe font-light text-[2.4rem] leading-tight tracking-tight text-white">
                        {card.title}
                      </h3>
                      <motion.span 
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-[1.2rem] transition-colors duration-200 ${
                          card.isGold ? 'border-white/30 text-white group-hover:bg-white/10' : 'border-brand-gold/30 text-brand-gold group-hover:bg-brand-gold/10'
                        }`}
                      >
                        ▼
                      </motion.span>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className={`font-circe font-light text-[1.6rem] leading-relaxed mt-2 ${
                        card.isGold ? 'text-white/80' : 'text-brand-text-muted'
                      }`}>
                        {card.description}
                      </p>
                    </motion.div>

                    {/* Clickable Hint Indicator */}
                    <span className={`text-[1.2rem] tracking-wider uppercase font-circe font-semibold mt-1 transition-opacity duration-300 opacity-30 group-hover:opacity-75 flex items-center gap-1.5 ${
                      card.isGold ? 'text-white' : 'text-brand-gold'
                    }`}>
                      {isExpanded ? 'Click to collapse' : 'Click to expand'}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default StaggeredFeatures
