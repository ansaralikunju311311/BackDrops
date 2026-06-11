import React from 'react'
import { motion } from 'framer-motion'

// Vite dynamic import for all images in the phtogallery directory
const modules = import.meta.glob('../assets/phtogallery/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' })
const photos = Object.values(modules) as string[]

const PhotoGallery: React.FC = () => {
  return (
    <section className="py-28 bg-[#0d0d0f] relative z-10 border-t border-brand-white/5 overflow-hidden">
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-circe font-bold text-[1.6rem] tracking-[0.3em] text-brand-gold uppercase mb-4 block drop-shadow-md">
              The BEX showcase
            </span>
            <h2 
              className="font-urw font-black text-white uppercase tracking-wider leading-none drop-shadow-xl"
              style={{ fontSize: 'clamp(4.5rem, 6vw, 7rem)' }}
            >
              Photo Gallery
            </h2>
          </div>
        </div>

        {/* Marquee Gallery */}
        <div className="relative w-full overflow-hidden py-10">
          {/* Soft Edge Blurs */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0d0d0f] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0d0d0f] to-transparent z-20 pointer-events-none" />

          {/* Marquee track container. The hover triggers pause thanks to the animate-marquee class hover state in index.css */}
          <div className="animate-marquee flex gap-10 group">
            {/* Track 1: First set of photos */}
            {photos.map((src, index) => (
              <motion.div
                key={`photo-1-${index}`}
                whileHover={{ scale: 1.15, zIndex: 30 }}
                className="w-[30rem] h-[22rem] flex-shrink-0 flex items-center justify-center rounded-2xl border border-white/5 overflow-hidden hover:border-brand-gold/50 transition-all duration-500 cursor-pointer hover:shadow-[0_20px_50px_rgba(158,83,48,0.3)] relative bg-brand-dark-accent"
              >
                <img
                  src={src}
                  alt={`Gallery Photo ${index + 1}`}
                  className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
            
            {/* Track 2: Duplicate set for seamless looping */}
            {photos.map((src, index) => (
              <motion.div
                key={`photo-2-${index}`}
                whileHover={{ scale: 1.15, zIndex: 30 }}
                className="w-[30rem] h-[22rem] flex-shrink-0 flex items-center justify-center rounded-2xl border border-white/5 overflow-hidden hover:border-brand-gold/50 transition-all duration-500 cursor-pointer hover:shadow-[0_20px_50px_rgba(158,83,48,0.3)] relative bg-brand-dark-accent"
              >
                <img
                  src={src}
                  alt={`Gallery Photo ${index + 1}`}
                  className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default PhotoGallery
