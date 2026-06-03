import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ShieldCheck, Settings, Award, Briefcase, Sliders, Heart } from 'lucide-react'

const StaggeredFeatures: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const cards = [
    {
      num: "# 01",
      icon: <MessageSquare className="w-6 h-6 transition-transform duration-300" />,
      title: "Professional multilingual team",
      isGold: false,
      align: "top"
    },
    {
      num: "# 02",
      icon: <ShieldCheck className="w-6 h-6 transition-transform duration-300" />,
      title: "High responsibility for results",
      isGold: true,
      align: "bottom"
    },
    {
      num: "# 03",
      icon: <Settings className="w-6 h-6 transition-transform duration-300" />,
      title: "Individual and careful approach to each client",
      isGold: false,
      align: "top"
    },
    {
      num: "# 04",
      icon: <Award className="w-6 h-6 transition-transform duration-300" />,
      title: "Reliable network of partner companies around the world",
      isGold: true,
      align: "bottom"
    },
    {
      num: "# 05",
      icon: <Briefcase className="w-6 h-6 transition-transform duration-300" />,
      title: "International manufacturing capabilities",
      isGold: false,
      align: "top"
    },
    {
      num: "# 06",
      icon: <Sliders className="w-6 h-6 transition-transform duration-300" />,
      title: "Management at the level of international standards",
      isGold: true,
      align: "bottom"
    },
    {
      num: "# 07",
      icon: <Heart className="w-6 h-6 transition-transform duration-300" />,
      title: "High-quality installation and decoration of the stand",
      isGold: false,
      align: "top"
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
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Heading */}
        <div className="mb-24 relative">
          <h2 className="font-urw font-extrabold text-[4.5rem] md:text-[5.5rem] text-brand-white uppercase tracking-wider leading-tight">
            By choosing BackDrops, you get
          </h2>
          <div className="w-24 h-[2px] bg-brand-gold mt-6" />
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
          <div className="absolute top-[26rem] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none hidden lg:block" />

          {/* Desktop Timeline Layout (7 Columns, Staggered Top/Bottom alignment) */}
          <div className="hidden lg:grid grid-cols-7 gap-6 relative h-[52rem] w-full">
            {cards.map((card, idx) => {
              const isTop = card.align === "top"
              const isHovered = hoveredIdx === idx

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
                    className={`w-full h-[24rem] p-8 flex flex-col justify-between rounded-sm cursor-default transition-all duration-300 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.7)] overflow-hidden border group ${
                      card.isGold
                        ? 'bg-[#9E5330] border-[#9E5330]/20 text-white hover:shadow-[0_20px_45px_-10px_rgba(158,83,48,0.4)]'
                        : 'bg-brand-dark-accent/80 border-brand-white/5 hover:border-brand-gold/35 hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.8)] text-white'
                    }`}
                  >
                    {/* Shimmer Sweep Effect overlay */}
                    <div className="absolute inset-0 shimmer-sweep opacity-20 pointer-events-none" />

                    {/* Top: Icon & Number */}
                    <div className="flex items-center justify-between">
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

                    {/* Bottom: Title */}
                    <h3 className="font-circe font-light text-[2.2rem] xl:text-[2.4rem] leading-snug tracking-normal text-white">
                      {card.title}
                    </h3>
                  </motion.div>
                </div>
              )
            })}
          </div>

          {/* Mobile & Tablet Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:hidden">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants(true)}
                whileHover={{ scale: 1.03 }}
                className={`h-[22rem] p-8 flex flex-col justify-between rounded-sm border transition-all duration-300 relative overflow-hidden group ${
                  card.isGold
                    ? 'bg-[#9E5330] border-[#9E5330]/20 text-white'
                    : 'bg-brand-dark-accent/80 border-brand-white/5 text-white'
                }`}
              >
                <div className="absolute inset-0 shimmer-sweep opacity-20 pointer-events-none" />
                {/* Top: Icon & Number */}
                <div className="flex items-center justify-between">
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

                {/* Bottom: Title */}
                <h3 className="font-circe font-light text-[2.4rem] leading-tight tracking-tight text-white">
                  {card.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default StaggeredFeatures
