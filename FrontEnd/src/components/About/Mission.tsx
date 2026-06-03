import React from 'react'
import { motion } from 'framer-motion'

const Mission: React.FC = () => {
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 w-full justify-center">
          
          {/* Left Text (Description) - centered on mobile, right-aligned on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[48rem] text-center md:text-right order-3 md:order-1"
          >
            <p className="font-circe font-light text-[2.2rem] md:text-[2.8rem] text-brand-text-muted leading-relaxed">
             The future we're Building
             To become the go-to execution partner 
             for leading agencies,knwon for 
             delivering experiences that are not
             "just built -- but remembered"
            </p>
          </motion.div>

          {/* Center Divider with Orange Node - adapts horizontally/vertically */}
          <div className="flex flex-row md:flex-col items-center w-full md:w-auto h-auto md:h-48 justify-center md:justify-between order-2">
            {/* Left/Top Line */}
            <div className="h-[1.5px] md:h-auto w-16 md:w-[1.5px] bg-brand-white/10 flex-grow" />
            
            {/* Orange Square Node */}
            <div className="w-4 h-4 bg-[#9E5330] border border-brand-bg mx-4 md:my-3 shadow-[0_0_10px_rgba(158,83,48,0.5)] flex-shrink-0" />
            
            {/* Right/Bottom Line */}
            <div className="h-[1.5px] md:h-6 w-16 md:w-[1.5px] bg-brand-white/10" />
          </div>

          {/* Right Text (Heading) - centered on mobile, left-aligned on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col text-center md:text-left order-1 md:order-3"
          >
            <h2 className="font-urw font-extrabold text-[4.2rem] md:text-[6rem] leading-[1.05] text-brand-white tracking-wide whitespace-nowrap md:whitespace-normal">
              Our<span className="hidden md:inline"><br /></span> Main<span className="hidden md:inline"><br /></span> Mission
            </h2>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Mission
