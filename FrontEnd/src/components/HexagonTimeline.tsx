import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Handshake, Zap, Shield, Settings, Globe, X } from 'lucide-react';

const values = [
  {
    num: '01',
    icon: CheckCircle2,
    title: 'Precision',
    desc: 'Delivering excellence in every detail.'
  },
  {
    num: '02',
    icon: Handshake,
    title: 'Partnership',
    desc: 'Growing through trust and collaboration.'
  },
  {
    num: '03',
    icon: Zap,
    title: 'Innovation',
    desc: 'Transforming ideas into impactful experiences.'
  },
  {
    num: '04',
    icon: Shield,
    title: 'Integrity',
    desc: 'Acting with accountability and transparency.'
  },
  {
    num: '05',
    icon: Settings,
    title: 'Capability',
    desc: 'Executing with world-class resources and expertise.'
  },
  {
    num: '06',
    icon: Globe,
    title: 'Sustainability',
    desc: 'Building smarter for a better future.'
  }
];

const HexagonTimeline: React.FC = () => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  return (
    <section className="bg-transparent py-24 md:py-32 overflow-hidden w-full relative">
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Section */}
        <div className="text-center mb-24 md:mb-32">
          <span className="font-circe font-bold text-[1.4rem] tracking-[0.2em] text-[rgb(158,83,48)] uppercase mb-4 block">
            Our Philosophy
          </span>
          <h2 className="font-urw font-extrabold text-[3.5rem] md:text-[5rem] text-[rgb(158,83,48)] uppercase tracking-wider leading-tight">
            BEX Core Values
          </h2>
        </div>

        {/* Desktop Zig-Zag Timeline (Hidden on Mobile) */}
        <div className="hidden lg:block relative w-full h-[500px]">
          
          {/* Main Horizontal Timeline Axis */}
          <div className="absolute top-1/2 left-[5%] right-[5%] h-[2px] bg-white/20 -translate-y-1/2" />
          
          <div className="flex justify-between items-center w-full h-full relative z-10 px-8">
            {values.map((item, index) => {
              const isTop = index % 2 === 0;
              const Icon = item.icon;
              
              return (
                <motion.div 
                  key={item.num}
                  initial={{ opacity: 0, y: isTop ? -30 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col items-center w-[16%] ${isTop ? 'justify-end mb-[250px]' : 'justify-start mt-[250px]'}`}
                >
                  
                  {/* Vertical Connector Line */}
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '80px' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    className={`absolute w-[2px] bg-gradient-to-b from-white/40 to-transparent ${isTop ? 'bottom-[-80px]' : 'top-[-80px] bg-gradient-to-t'}`}
                  />

                  {/* Dot on Axis */}
                  <div className={`absolute w-4 h-4 rounded-full bg-white border-4 border-[#000000] shadow-sm ${isTop ? 'bottom-[-88px]' : 'top-[-88px]'}`} />

                  {/* Content Container (Title + Desc) */}
                  <div className={`text-center relative z-30 ${isTop ? 'mb-10' : 'mt-10 order-last'}`}>
                    <h3 className="font-urw font-bold text-[rgb(158,83,48)] uppercase tracking-widest mb-2" style={{ fontSize: '2.4rem' }}>
                      {item.title}
                    </h3>
                    <p className="font-circe text-white/80 font-medium leading-snug px-4" style={{ fontSize: '2.0rem' }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Hexagon Wrapper */}
                  <motion.div 
                    whileHover={{ y: isTop ? -4 : 4, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => setClickedIndex(index)}
                    className="relative w-[120px] h-[138px] group cursor-pointer flex items-center justify-center filter drop-shadow-[0_15px_20px_rgba(158,83,48,0.15)] z-20"
                  >
                    {/* SVG Hexagon Polygon */}
                    <svg viewBox="0 0 100 115.47" className="absolute inset-0 w-full h-full drop-shadow-md">
                      <polygon 
                        points="50 0, 100 28.86, 100 86.6, 50 115.47, 0 86.6, 0 28.86" 
                        fill="rgb(158,83,48)"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                        className="transition-colors duration-500 group-hover:fill-[rgb(178,103,68)]"
                      />
                    </svg>
                    
                    {/* Inner White Circle */}
                    <div className="relative z-10 w-[65px] h-[65px] bg-white rounded-full flex items-center justify-center shadow-inner group-hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-shadow duration-300">
                      <Icon className="w-8 h-8 text-[rgb(158,83,48)] group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Step Number Badge */}
                    <div className={`absolute ${isTop ? 'top-[-15px]' : 'bottom-[-15px]'} left-1/2 -translate-x-1/2 bg-white text-[rgb(158,83,48)] font-mono font-bold text-[1.2rem] px-3 py-1 rounded-full border border-[rgb(158,83,48)]/20 shadow-sm z-20`}>
                      {item.num}
                    </div>
                  </motion.div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="block lg:hidden relative border-l-2 border-white/20 ml-8 pl-12 space-y-24">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col"
              >
                {/* Horizontal connector line to the main vertical axis */}
                <div className="absolute left-[-48px] top-[50px] w-[32px] h-[2px] bg-gradient-to-r from-transparent to-white/40" />
                {/* Dot on Axis */}
                <div className="absolute left-[-55px] top-[43px] w-4 h-4 rounded-full bg-white border-4 border-[#000000] shadow-sm" />

                <div 
                  className="flex flex-col sm:flex-row gap-8 items-start sm:items-center cursor-pointer"
                  onClick={() => setClickedIndex(index)}
                >
                  {/* Hexagon Wrapper */}
                  <div className="relative w-[90px] h-[104px] flex-shrink-0 flex items-center justify-center filter drop-shadow-[0_10px_15px_rgba(158,83,48,0.15)]">
                    <svg viewBox="0 0 100 115.47" className="absolute inset-0 w-full h-full">
                      <polygon 
                        points="50 0, 100 28.86, 100 86.6, 50 115.47, 0 86.6, 0 28.86" 
                        fill="rgb(158,83,48)"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="relative z-10 w-[45px] h-[45px] bg-white rounded-full flex items-center justify-center shadow-inner">
                      <Icon className="w-5 h-5 text-[rgb(158,83,48)]" />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-white text-[rgb(158,83,48)] font-mono font-bold text-[1rem] px-2 py-0.5 rounded-full border border-[rgb(158,83,48)]/20 shadow-sm z-20">
                      {item.num}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-urw font-bold text-[rgb(158,83,48)] uppercase tracking-widest mb-2" style={{ fontSize: '2.8rem' }}>
                      {item.title}
                    </h3>
                    <p className="font-circe text-white/80 font-medium leading-relaxed" style={{ fontSize: '2.4rem' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ─────────── MODAL POPUP for details ─────────── */}
      <AnimatePresence>
        {clickedIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setClickedIndex(null)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
              style={{
                backgroundColor: '#0B0C10',
                border: '1px solid rgba(158, 83, 48, 0.3)',
                boxShadow: '0 0 40px rgba(158, 83, 48, 0.2)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setClickedIndex(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Close details"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border border-white/5 flex items-center justify-center mb-8 shadow-inner">
                {React.createElement(values[clickedIndex].icon, { 
                  style: { width: '40px', height: '40px', color: 'rgb(158,83,48)' } 
                })}
              </div>

              <h3 className="font-urw font-extrabold uppercase text-white tracking-wider text-[2.5rem] sm:text-[3.5rem] leading-tight mb-6">
                {values[clickedIndex].title}
              </h3>

              <div className="w-16 h-1 bg-[rgb(158,83,48)] mx-auto mb-8 rounded-full opacity-80" />

              <p className="font-circe font-light text-white/80 text-[1.8rem] sm:text-[2.2rem] leading-relaxed max-w-3xl">
                {values[clickedIndex].desc}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default HexagonTimeline;

