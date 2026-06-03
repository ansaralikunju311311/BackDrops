import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Clock, Layers, Workflow, Hammer, Award, Truck } from 'lucide-react'

const StaggeredFeatures: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const cards = [
    {
      num: "# 01",
      icon: <Palette className="w-6 h-6 transition-transform duration-300" />,
      title: "Creative Design Team",
      isGold: true,
      align: "top"
    },
    {
      num: "# 02",
      icon: <Clock className="w-6 h-6 transition-transform duration-300" />,
      title: "Reliable Project Delivery",
      isGold: true,
      align: "bottom"
    },
    {
      num: "# 03",
      icon: <Layers className="w-6 h-6 transition-transform duration-300" />,
      title: "Custom Exhibition Stands",
      isGold: false,
      align: "top"
    },
    {
      num: "# 04",
      icon: <Workflow className="w-6 h-6 transition-transform duration-300" />,
      title: "End-to-End Event Solutions",
      isGold: true,
      align: "bottom"
    },
    {
      num: "# 05",
      icon: <Hammer className="w-6 h-6 transition-transform duration-300" />,
      title: "In-House Fabrication",
      isGold: false,
      align: "top"
    },
    {
      num: "# 06",
      icon: <Award className="w-6 h-6 transition-transform duration-300" />,
      title: "International Work Standards",
      isGold: true,
      align: "bottom"
    },
    {
      num: "# 07",
      icon: <Truck className="w-6 h-6 transition-transform duration-300" />,
      title: "Global Logistics & Dismantling",
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
          <h2 className="font-urw font-extrabold text-[4.5rem] md:text-[6rem] text-brand-white uppercase tracking-wider leading-tight">
            By Choosing BackDrops, You Get
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
          {/* Main Horizontal Timeline Line with light pulse animation */}
          <div className="absolute top-[28rem] left-0 right-0 h-[2px] timeline-pulse-line hidden lg:block" />

          {/* Desktop Timeline Layout */}
          <div className="hidden lg:flex justify-between items-center relative h-[56rem] w-full gap-6">
            {cards.map((card, idx) => {
              const isTop = card.align === "top"
              const isHovered = hoveredIdx === idx

              return (
                <div
                  key={idx}
                  className="relative flex flex-col items-center flex-1 h-full justify-between"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  
                  {/* Vertical Connection Line (Glows gold on card hover) */}
                  {isTop ? (
                    <div className={`absolute top-[21rem] bottom-[28rem] w-[2px] transition-all duration-500 origin-bottom ${
                      isHovered
                        ? 'bg-gradient-to-b from-brand-gold to-brand-gold-dark shadow-[0_0_8px_rgba(212,175,55,0.8)] scale-y-105'
                        : 'bg-gradient-to-b from-transparent to-brand-white/10'
                    }`} />
                  ) : (
                    <div className={`absolute top-[28rem] bottom-[21rem] w-[2px] transition-all duration-500 origin-top ${
                      isHovered
                        ? 'bg-gradient-to-t from-brand-gold to-brand-gold-dark shadow-[0_0_8px_rgba(212,175,55,0.8)] scale-y-105'
                        : 'bg-gradient-to-t from-transparent to-brand-white/10'
                    }`} />
                  )}

                  {/* Connecting Node Dot (Pulsing ring at intersection points) */}
                  <div className={`absolute top-[27.2rem] w-5 h-5 rounded-full transition-all duration-500 z-10 ${
                    isHovered
                      ? 'bg-brand-gold border-4 border-[#0B0C10] scale-135 shadow-[0_0_15px_rgba(212,175,55,1)]'
                      : 'bg-brand-white/20 border-2 border-[#0B0C10] scale-100'
                  }`} />

                  {/* Card Element */}
                  <motion.div
                    variants={cardVariants(isTop)}
                    whileHover={{ y: isTop ? -8 : 8 }}
                    className={`absolute w-full h-[21rem] p-8 flex flex-col justify-between rounded-sm cursor-default transition-all duration-300 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.7)] overflow-hidden border group ${
                      isTop ? 'top-0' : 'bottom-0'
                    } ${
                      card.isGold
                        ? 'bg-gradient-to-br from-brand-gold-light via-brand-gold to-brand-gold-dark border-brand-gold-light/20 text-brand-dark hover:shadow-[0_20px_45px_-10px_rgba(212,175,55,0.35)]'
                        : 'bg-gradient-to-br from-brand-dark-accent/80 via-[#0e1017] to-brand-bg/90 border-brand-white/5 hover:border-brand-gold/35 hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.8)]'
                    }`}
                  >
                    {/* Shimmer Sweep Effect overlay */}
                    <div className="absolute inset-0 shimmer-sweep opacity-40 pointer-events-none" />

                    {/* Top: Icon & Number */}
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 flex items-center justify-center rounded-full border transition-all duration-300 ${
                        card.isGold
                          ? 'bg-brand-dark/5 border-brand-dark/10 text-brand-dark group-hover:bg-brand-dark/10 group-hover:scale-110'
                          : 'bg-brand-white/[0.03] border-brand-white/10 text-brand-gold group-hover:bg-brand-gold/15 group-hover:scale-110'
                      }`}>
                        {card.icon}
                      </div>
                      <span className={`font-euclid font-bold text-[1.4rem] tracking-wider ${
                        card.isGold ? 'text-brand-dark/50' : 'text-brand-text-muted'
                      }`}>
                        {card.num}
                      </span>
                    </div>

                    {/* Bottom: Title */}
                    <h3 className={`font-urw font-extrabold text-[1.8rem] xl:text-[2rem] leading-tight tracking-tight ${
                      card.isGold ? 'text-brand-dark' : 'text-brand-white'
                    }`}>
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
                className={`h-[21rem] p-8 flex flex-col justify-between rounded-sm border transition-all duration-300 relative overflow-hidden group ${
                  card.isGold
                    ? 'bg-gradient-to-br from-brand-gold-light via-brand-gold to-brand-gold-dark border-brand-gold-light/20 text-brand-dark'
                    : 'bg-gradient-to-br from-brand-dark-accent/80 via-[#0e1017] to-brand-bg/90 border-brand-white/5'
                }`}
              >
                <div className="absolute inset-0 shimmer-sweep opacity-30 pointer-events-none" />
                {/* Top: Icon & Number */}
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-full border ${
                    card.isGold
                      ? 'bg-brand-dark/5 border-brand-dark/10 text-brand-dark'
                      : 'bg-brand-white/[0.03] border-brand-white/10 text-brand-gold'
                  }`}>
                    {card.icon}
                  </div>
                  <span className={`font-euclid font-bold text-[1.4rem] ${
                    card.isGold ? 'text-brand-dark/50' : 'text-brand-text-muted'
                  }`}>
                    {card.num}
                  </span>
                </div>

                {/* Bottom: Title */}
                <h3 className="font-urw font-extrabold text-[2.2rem] leading-tight tracking-tight">
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
