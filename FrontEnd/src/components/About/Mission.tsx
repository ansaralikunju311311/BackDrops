import React from 'react'
import { motion } from 'framer-motion'

const Mission: React.FC = () => {
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-center">
        <div className="flex items-center gap-12 md:gap-20">
          
          {/* Left Text (Right-aligned) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[48rem] text-right"
          >
            <p className="font-circe font-light text-[2.4rem] md:text-[2.8rem] text-brand-text-muted leading-relaxed">
              present your company and products at the event as effectively as possible
            </p>
          </motion.div>

          {/* Center Divider with Orange Node */}
          <div className="flex flex-col items-center h-48 relative justify-between">
            {/* Top Line */}
            <div className="w-[1.5px] bg-brand-white/10 flex-grow" />
            
            {/* Orange Square Node */}
            <div className="w-4 h-4 bg-[#9E5330] border border-brand-bg my-3 shadow-[0_0_10px_rgba(158,83,48,0.5)]" />
            
            {/* Bottom short Line */}
            <div className="w-[1.5px] bg-brand-white/10 h-6" />
          </div>

          {/* Right Text (Left-aligned, Stacked) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col text-left"
          >
            <h2 className="font-urw font-extrabold text-[5rem] md:text-[6rem] leading-[1.05] text-brand-white tracking-wide">
              Our<br />
              Main<br />
              Mission
            </h2>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Mission
