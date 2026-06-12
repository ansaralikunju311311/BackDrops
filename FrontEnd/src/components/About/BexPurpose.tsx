import React from 'react'
import { motion } from 'framer-motion'

const BexPurpose: React.FC = () => {
  return (
    <section className="py-24 relative z-10 overflow-hidden border-t border-white/10 bg-[#0A0A0C] shadow-[0_-20px_40px_rgba(255,255,255,0.04)]">
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 w-full justify-center">
          
          {/* Left Text (Heading) - centered on mobile, right-aligned on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col text-center md:text-right order-1 md:order-1 max-w-[48rem]"
          >
            <h2 className="font-urw font-normal text-[4rem] md:text-[5rem] lg:text-h1 leading-[1.05] text-brand-white tracking-wide whitespace-nowrap">
              BEX Purpose
            </h2>
          </motion.div>

          {/* Center Divider with Orange Node - adapts horizontally/vertically */}
          <div className="flex flex-row md:flex-col items-center w-full md:w-auto h-auto md:h-48 justify-center md:justify-between order-2">
            {/* Left/Top Line */}
            <div className="h-[1.5px] md:h-auto w-16 md:w-[1.5px] bg-brand-white/10 flex-grow" />
            
            {/* Orange Square Node */}
            <div className="w-4 h-4 bg-[#9E5330] border border-[#000000] mx-4 md:my-3 shadow-[0_0_10px_rgba(158,83,48,0.5)] flex-shrink-0" />
            
            {/* Right/Bottom Line */}
            <div className="h-[1.5px] md:h-6 w-16 md:w-[1.5px] bg-brand-white/10" />
          </div>

          {/* Right Text (Description) - centered on mobile, left-aligned on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[75rem] text-center md:text-left order-3 md:order-3"
          >
            <p className="font-circe font-bold text-[2.2rem] md:text-[2.8rem] text-[#9E5330] leading-snug italic max-w-[55rem] md:max-w-[60rem]">
             "Empowering visionary brands through innovation, leadership, and world-class execution—creating experiences that perform, inspire, and endure."
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default BexPurpose
