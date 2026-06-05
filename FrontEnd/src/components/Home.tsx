import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.85,
    rotate: -5
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    }
  }
}

const clientLogos = [
  { name: 'Dubai Investments', src: '/assets/client/Dubai Investments.webp' },
  { name: 'F5 Networks', src: '/assets/client/F5_logo.webp' },
  { name: 'Hisense', src: '/assets/client/Logo-Hisense-500x281.webp' },
  { name: 'SAP', src: '/assets/client/SAP-Logo-500x281.webp' },
  { name: 'Dell', src: '/assets/client/dell-logo-blue-background-m5g3hq4wj7t162jt-2.webp' },
  { name: 'Dubai Health Authority', src: '/assets/client/dubai-health-authority-logo-png_seeklogo-372291.webp' },
  { name: 'Elm', src: '/assets/client/elm-logo-png_seeklogo-398917.webp' },
  { name: 'Enchanteur', src: '/assets/client/enchanteur-logo-png_seeklogo-383633.webp' },
  { name: 'Grundfos', src: '/assets/client/grundfos-logo.webp' },
  { name: 'Panasonic', src: '/assets/client/panasonic-logo-png-transparent-300x169.webp' },
  { name: 'Sergas', src: '/assets/client/sergas.webp' },
  { name: 'Wilhelmsen Ships Service', src: '/assets/client/wilhemsen_ships_service-1.webp' },
  { name: 'Sri Lanka Tourism', src: '/assets/client/862-8621430_wonder-of-asia-sri-lanka-tourism-logo-2015.webp' },
  { name: 'Commscope', src: '/assets/client/co3940c6c6-commscope-logo-commscope-logos.webp' },
  { name: 'Client 1443542210', src: '/assets/client/1443542210-738.webp' },
  { name: 'Client 1466226', src: '/assets/client/1466226_logo_1573456585_n.webp' },
  { name: 'Client 777a817a', src: '/assets/client/777a817a1178a9d0064.webp' },
  { name: 'Client c0dc49f', src: '/assets/client/c0dc49f0d93ab16d9713a0b5caf0058a.webp' },
  { name: 'Client screenshot', src: '/assets/client/screen-shot-2013-09-05-at-12-11-47.webp' },
  { name: 'Client untitled', src: '/assets/client/untitled-1_132.webp' },
]

const videos = [
  {
    id: 'aNXF6TICgmM',
    title: 'Our projects at Blockchain Life 2023',
    duration: '01:18',
    date: '2 years ago'
  },
  {
    id: 'duG8mTTTMaQ',
    title: 'Exhibition booths at Blockchain-2023 by BackDrops',
    duration: '00:30',
    date: '1 year ago'
  },
  {
    id: 't3crG9hLY_s',
    title: 'Premium Double-Decker Exhibition Pavilion',
    duration: '00:25',
    date: '1 year ago'
  },
  {
    id: '3uB5Ni0L35w',
    title: 'Dubai Mall Luxury Retail Booth Build',
    duration: '00:15',
    date: '2 years ago'
  }
]

const Home: React.FC = () => {
  const navigate = useNavigate()
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentClientPage, setCurrentClientPage] = useState(0)
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleCards, setVisibleCards] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      if (width < 768) {
        setVisibleCards(1)
      } else if (width < 1024) {
        setVisibleCards(2)
      } else {
        setVisibleCards(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const logosPerPage = isMobile ? 4 : 6
  const totalClientPages = Math.ceil(clientLogos.length / logosPerPage)
  const maxVideoIndex = videos.length - visibleCards

  useEffect(() => {
    if (currentClientPage >= totalClientPages && totalClientPages > 0) {
      setCurrentClientPage(totalClientPages - 1)
    }
  }, [totalClientPages, currentClientPage])

  useEffect(() => {
    if (currentVideoIndex > maxVideoIndex && maxVideoIndex >= 0) {
      setCurrentVideoIndex(maxVideoIndex)
    }
  }, [maxVideoIndex, currentVideoIndex])

  const nextVideo = () => {
    if (currentVideoIndex < maxVideoIndex) {
      setCurrentVideoIndex(prev => prev + 1)
    }
  }

  const prevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xc = rect.width / 2
    const yc = rect.height / 2
    const rotateX = (yc - y) / 12
    const rotateY = (x - xc) / 12
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
    
    const glow = card.querySelector('.card-glow') as HTMLDivElement
    if (glow) {
      const px = (x / rect.width) * 100
      const py = (y / rect.height) * 100
      glow.style.background = `radial-gradient(circle 120px at ${px}% ${py}%, rgba(196,121,86,0.15), transparent)`
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    const glow = card.querySelector('.card-glow') as HTMLDivElement
    if (glow) {
      glow.style.background = 'transparent'
    }
  }

  return (
    <div className="bg-[#121214] text-brand-white min-h-screen relative overflow-hidden select-none">
      
      {/* SECTION 1: Full-Screen Background Video Hero */}
      <section className="relative h-screen w-full overflow-hidden bg-brand-bg flex items-center justify-center">
        
        {/* Full-Screen Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
        >
          <source src="/assets/company_name_chnage_to_the_Bac.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-[#121214] z-10 pointer-events-none" />

        {/* Decorative Grid Lines Overlay (Architectural Look) */}
        <div className="absolute left-[33%] top-0 bottom-0 w-[1px] bg-white/[0.06] z-15 pointer-events-none hidden md:block" />
        <div className="absolute left-[66%] top-0 bottom-0 w-[1px] bg-white/[0.06] z-15 pointer-events-none hidden md:block" />

        {/* Overlapping Thin Circle Outline */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[70vh] sm:w-[80vh] sm:h-[80vh] max-w-[850px] max-h-[850px] border border-white/[0.06] rounded-full pointer-events-none z-15 animate-[pulse_6s_infinite_ease-in-out]" />

        {/* Centered Massive Title text */}
        <div className="relative z-20 text-center max-w-[120rem] px-6 select-none pointer-events-none">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-urw font-extrabold text-[8rem] sm:text-[12rem] md:text-[15rem] lg:text-[19rem] text-white uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex flex-wrap justify-center gap-x-[3vw]"
          >
            {["WE", "CREATE"].map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, charIndex) => {
                  const globalIndex = wordIndex * 3 + charIndex
                  return (
                    <motion.span
                      key={charIndex}
                      variants={letterVariants}
                      animate={{
                        y: [0, -12, 0],
                        rotate: [0, wordIndex === 0 ? -1.5 : 1.5, 0],
                      }}
                      transition={{
                        y: {
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: globalIndex * 0.15,
                        },
                        rotate: {
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: globalIndex * 0.15,
                        }
                      }}
                      whileHover={{
                        y: -20,
                        scale: 1.1,
                        color: "#C47956",
                        textShadow: "0px 0px 30px rgba(196,121,86,0.7)",
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      className="inline-block cursor-default select-none pointer-events-auto origin-bottom mr-[0.15em] last:mr-0"
                    >
                      {char}
                    </motion.span>
                  )
                })}
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Floating Red Tab Button (Right Edge matching crop) */}
        <button
          onClick={() => navigate('/contacts')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-[#E51D1D] hover:bg-[#c81717] text-white font-urw font-bold text-[1.3rem] sm:text-[1.5rem] tracking-widest uppercase py-7 px-8 sm:px-9 rounded-l-sm hover:pl-11 transition-all duration-500 ease-out cursor-pointer shadow-[0_10px_30px_rgba(229,29,29,0.35)] flex items-center justify-center whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          aria-label="Open contact request form"
        >
          Send Request +
        </button>

        {/* Animated Scroll Down indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 select-none pointer-events-none opacity-50">
          <span className="font-circe font-light text-[1.2rem] uppercase tracking-[0.25em] text-white">Scroll Down</span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-white to-transparent animate-bounce" />
        </div>

      </section>

      {/* SECTION 1.5: Video Cases Slider Section */}
      <section className="py-36 bg-[#101012] relative z-10 border-t border-brand-white/5 overflow-hidden">
        {/* Faint Architectural Background lines */}
        <div className="absolute left-[33%] top-0 bottom-0 w-[1px] bg-white/[0.04] pointer-events-none hidden md:block" />
        <div className="absolute left-[66%] top-0 bottom-0 w-[1px] bg-white/[0.04] pointer-events-none hidden md:block" />
        
        {/* Faint YOUTUBE label behind */}
        <div className="absolute left-6 bottom-[10%] text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-urw font-black text-brand-white/[0.015] tracking-[0.1em] select-none pointer-events-none uppercase">
          YOUTUBE
        </div>

        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2.8fr] gap-16 items-center">
            
            {/* Left Column: Heading and Controls */}
            <div className="flex flex-col justify-center h-full">
              <span className="font-circe font-light text-[1.4rem] tracking-[0.3em] text-brand-gold uppercase mb-4 block">
                Portfolio Clips
              </span>
              <h2 className="font-urw font-extrabold text-[4rem] sm:text-[5rem] lg:text-[6rem] text-white uppercase tracking-wider leading-tight mb-8">
                Video cases
              </h2>
              <p className="font-circe font-light text-[1.6rem] sm:text-[1.8rem] text-brand-text-muted leading-relaxed max-w-[32rem] mb-12">
                Creative solutions for exhibition projects
              </p>

              {/* Slider Controls */}
              <div className="flex items-center gap-6">
                <button
                  onClick={prevVideo}
                  disabled={currentVideoIndex === 0}
                  className={`w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 ${
                    currentVideoIndex === 0 
                      ? 'opacity-30 cursor-not-allowed' 
                      : 'hover:bg-brand-gold hover:border-brand-gold hover:scale-105 active:scale-95 cursor-pointer shadow-[0_5px_15px_rgba(158,83,48,0.15)]'
                  }`}
                  aria-label="Previous video"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextVideo}
                  disabled={currentVideoIndex >= maxVideoIndex}
                  className={`w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 ${
                    currentVideoIndex >= maxVideoIndex 
                      ? 'opacity-30 cursor-not-allowed' 
                      : 'hover:bg-brand-gold hover:border-brand-gold hover:scale-105 active:scale-95 cursor-pointer shadow-[0_5px_15px_rgba(158,83,48,0.15)]'
                  }`}
                  aria-label="Next video"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </div>

            {/* Right Column: Sliding Video Cards */}
            <div className="overflow-hidden relative -mx-4 px-4 py-8">
              {/* Pagination Dots at top right */}
              <div className="absolute top-0 right-4 flex items-center gap-2">
                {Array.from({ length: maxVideoIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentVideoIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      currentVideoIndex === i ? 'bg-[#E51D1D] w-6' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <motion.div
                animate={{ x: `-${currentVideoIndex * (100 / visibleCards)}%` }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="flex gap-8"
                style={{ width: `${videos.length * (100 / visibleCards)}%` }}
              >
                {videos.map((vid) => (
                  <div 
                    key={vid.id} 
                    className="w-full relative group cursor-pointer rounded-2xl p-5 bg-brand-dark-accent/20 border border-white/[0.03] hover:border-brand-gold/30 overflow-hidden"
                    style={{ 
                      flex: `0 0 ${
                        visibleCards === 1 
                          ? '100%' 
                          : visibleCards === 2 
                            ? 'calc(50% - 16px)' 
                            : 'calc(33.333% - 16px)'
                      }`,
                      transition: 'transform 0.1s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out',
                      boxShadow: '0 4px 30px rgba(0,0,0,0.2)'
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setSelectedVideoId(vid.id)}
                  >
                    {/* Card Glow Layer */}
                    <div className="card-glow absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                    
                    {/* Thumbnail Wrapper */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-brand-dark-accent border border-white/5 mb-6 z-10">
                      <img 
                        src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`} 
                        alt={vid.title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out brightness-[0.75] group-hover:brightness-90 group-hover:scale-102"
                      />
                      {/* YouTube-style Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 flex items-center justify-center transition-all duration-300 ease-out z-20 group-hover:scale-110">
                          <svg className="w-16 h-11 text-[#E51D1D] group-hover:text-[#ff2424] transition-all duration-300 filter drop-shadow-[0_4px_12px_rgba(229,29,29,0.45)]" viewBox="0 0 68 48" fill="currentColor">
                            <path d="M66.52 7.74c-.78-2.93-3.09-5.24-6.02-6.02C55.21 1 34 1 34 1S12.79 1 7.5 2.72c-2.93.78-5.24 3.09-6.02 6.02C0 13.02 0 24 0 24s0 10.98 1.48 16.26c.78 2.93 3.09 5.24 6.02 6.02C12.79 47 34 47 34 47s21.21 0 26.5-1.72c2.93-.78 5.24-3.09 6.02-6.02C68 34.98 68 24 68 24s0-10.98-1.48-16.26z" />
                            <polygon points="27 33 45 24 27 15" fill="white" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-col gap-2 relative z-10 px-1">
                      <div className="flex gap-4 items-start">
                        {/* Duration Badge */}
                        <div className="bg-[#1e1f26] px-3 py-1.5 text-white/80 font-mono text-[1.2rem] rounded border border-white/[0.06] flex-shrink-0 mt-0.5">
                          {vid.duration}
                        </div>
                        {/* Title */}
                        <h3 className="font-urw font-bold text-[1.6rem] text-white leading-snug group-hover:text-brand-gold transition-colors duration-300 line-clamp-2 min-h-[4.4rem]">
                          {vid.title}
                        </h3>
                      </div>
                      {/* Date (Indented to align with title text) */}
                      <span className="font-circe font-light text-[1.3rem] text-brand-text-muted ml-[5.2rem]">
                        {vid.date}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1.6: Our Clients Slider Section */}
      <section className="py-28 bg-[#121214] relative z-10 border-t border-brand-white/5 overflow-hidden">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="font-circe font-light text-[1.4rem] tracking-[0.3em] text-brand-gold uppercase mb-4 block">
                Partnerships
              </span>
              <h2 className="font-urw font-extrabold text-[4rem] sm:text-[5rem] lg:text-[6rem] text-white uppercase tracking-wider leading-none">
                Our clients
              </h2>
            </div>
          </div>

          {/* Client Logos Scrolling Marquee */}
          <div className="relative w-full overflow-hidden py-10">
            {/* Soft Edge Blurs */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#121214] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#121214] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex gap-10">
              {/* Track 1: First set of 20 logos */}
              {clientLogos.map((logo, index) => (
                <motion.div
                  key={`logo-1-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="w-[20rem] h-32 flex-shrink-0 flex items-center justify-center bg-brand-dark-accent/40 hover:bg-brand-dark-accent/65 rounded-xl border border-white/[0.08] hover:border-brand-gold/50 px-6 py-4 transition-all duration-300 group cursor-pointer hover:shadow-[0_10px_25px_rgba(158,83,48,0.2)]"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain opacity-85 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                  />
                </motion.div>
              ))}
              
              {/* Track 2: Duplicate set of 20 logos for seamless looping */}
              {clientLogos.map((logo, index) => (
                <motion.div
                  key={`logo-2-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="w-[20rem] h-32 flex-shrink-0 flex items-center justify-center bg-brand-dark-accent/40 hover:bg-brand-dark-accent/65 rounded-xl border border-white/[0.08] hover:border-brand-gold/50 px-6 py-4 transition-all duration-300 group cursor-pointer hover:shadow-[0_10px_25px_rgba(158,83,48,0.2)]"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain opacity-85 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1.7: Worldwide Projects Section */}
      <section className="py-36 bg-[#101012] relative z-10 border-t border-brand-white/5 overflow-hidden">
        {/* World Map SVG background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity bg-center bg-no-repeat bg-cover z-0"
          style={{ backgroundImage: `url('/assets/construction-img.svg')` }}
        />

        {/* Faint WORLDWIDE label behind */}
        <div className="absolute right-6 top-[15%] text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-urw font-black text-brand-white/[0.012] tracking-[0.1em] select-none pointer-events-none uppercase">
          WORLDWIDE
        </div>

        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr] gap-20 items-center">
            
            {/* Left Column: Stat Cards */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              {/* Card 1: 600+ Projects */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl border border-white/[0.08] bg-gradient-to-tr from-[#2d0808] via-[#15161b] to-[#121215] flex flex-col items-center justify-center p-6 shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#E51D1D]/30 hover:shadow-[0_15px_30px_rgba(229,29,29,0.15)] transition-all duration-300"
              >
                <span className="font-urw font-black text-[5rem] sm:text-[6rem] text-white leading-none mb-4">
                  600+
                </span>
                <span className="font-circe font-light tracking-[0.25em] text-[1.4rem] uppercase text-white/70">
                  projects
                </span>
              </motion.div>

              {/* Card 2: 15+ Countries */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl border border-white/[0.08] bg-gradient-to-tr from-[#2d0808] via-[#15161b] to-[#121215] flex flex-col items-center justify-center p-6 shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#E51D1D]/30 hover:shadow-[0_15px_30px_rgba(229,29,29,0.15)] transition-all duration-300"
              >
                <span className="font-urw font-black text-[5rem] sm:text-[6rem] text-white leading-none mb-4">
                  15+
                </span>
                <span className="font-circe font-light tracking-[0.25em] text-[1.4rem] uppercase text-white/70">
                  countries
                </span>
              </motion.div>
            </div>

            {/* Right Column: Title and Content */}
            <div className="flex flex-col">
              <h2 className="font-urw font-extrabold text-[4rem] sm:text-[5rem] lg:text-[6rem] text-white uppercase tracking-wider leading-tight mb-10">
                Worldwide projects
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <p className="font-circe font-light text-[1.6rem] text-brand-text-muted leading-relaxed">
                  BackDrops offers exhibition related services all around the world. We have stand construction experience in more than 15 different countries, and this list of worldwide cooperation is expanding every year.
                </p>
                <p className="font-circe font-light text-[1.6rem] text-brand-text-muted leading-relaxed">
                  Our team has competence and experience to implement your project globally.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1.8: Vision to Life Timeline Section */}
      <section className="py-36 bg-[#121214] relative z-10 border-t border-brand-white/5 overflow-hidden">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
          
          <h2 className="font-urw font-extrabold text-[3.2rem] sm:text-[4rem] lg:text-[4.8rem] text-white text-center leading-tight mb-28 uppercase tracking-wider max-w-[95rem] mx-auto">
            Bring your vision to life – start your project today!
          </h2>

          {/* Timeline Nodes */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4 relative max-w-[125rem] mx-auto">
            {[
              { num: '01', title: 'Filling out brief' },
              { num: '02', title: 'Creating design and concept' },
              { num: '03', title: 'Production' },
              { num: '04', title: 'Installation' },
              { num: '05', title: 'Completed project presentation' },
              { num: '06', title: 'Support during the event' },
              { num: '07', title: 'Dismantling' }
            ].map((step, idx, arr) => (
              <React.Fragment key={step.num}>
                {/* Step Node */}
                <div className="flex flex-col items-center w-full lg:max-w-[15rem] relative">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="w-24 h-24 rounded-full border border-white/[0.08] bg-[#16171d] flex items-center justify-center font-mono font-bold text-[1.6rem] text-white/90 z-10 transition-all duration-300 hover:border-[#E51D1D] hover:text-[#E51D1D] hover:shadow-[0_0_25px_rgba(229,29,29,0.35)] cursor-default"
                  >
                    # {step.num}
                  </motion.div>
                  <p className="font-circe font-light text-[1.4rem] sm:text-[1.5rem] text-brand-text-muted mt-6 text-center leading-relaxed">
                    {step.title}
                  </p>
                </div>

                {/* Connecting dots */}
                {idx < arr.length - 1 && (
                  <>
                    {/* Desktop Dots */}
                    <div className="hidden lg:flex items-center text-white/20 text-3xl font-bold tracking-[0.3em] h-24 flex-shrink-0 z-0">
                      ...
                    </div>
                    {/* Mobile Line */}
                    <div className="lg:hidden w-[1px] h-10 border-l border-dashed border-white/20 my-4" />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 1.9: Installing Exhibit Booths Section */}
      <section className="py-36 bg-[#101012] relative z-10 border-t border-brand-white/5 overflow-hidden">
        {/* Faint Architectural Background lines */}
        <div className="absolute left-[33%] top-0 bottom-0 w-[1px] bg-white/[0.04] pointer-events-none hidden md:block" />
        <div className="absolute left-[66%] top-0 bottom-0 w-[1px] bg-white/[0.04] pointer-events-none hidden md:block" />

        {/* Faint INSTALL label behind */}
        <div className="absolute right-6 bottom-[10%] text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-urw font-black text-brand-white/[0.015] tracking-[0.1em] select-none pointer-events-none uppercase">
          INSTALL
        </div>

        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-urw font-extrabold text-[4rem] sm:text-[5rem] lg:text-[6rem] text-white uppercase tracking-wider leading-tight mb-12"
          >
            Installing exhibit booths
          </motion.h2>

          {/* Booth Image Wrapper with 3D Mouse Tilt and Radial Glow Spotlight */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-brand-dark-accent/10 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.4)] group cursor-pointer"
            style={{
              transition: 'transform 0.1s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out',
            }}
          >
            {/* Card Glow Layer */}
            <div className="card-glow absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-20" />
            
            <img 
              src="/assets/car.jpeg" 
              alt="Installing exhibit booths"
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] z-10"
            />
          </motion.div>

          {/* Descriptions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-10"
            >
              <p className="font-circe font-light text-[1.6rem] text-brand-text-muted hover:text-white leading-relaxed transition-colors duration-300 cursor-default">
                Layout of any expo booth is the dominant factor of a display as a whole, a cornerstone of shaping positive company image, services provided and produce in the eye of a potential client.
              </p>
              <p className="font-circe font-light text-[1.6rem] text-brand-text-muted hover:text-white leading-relaxed transition-colors duration-300 cursor-default">
                Project designing and visualising using three dimensional modeling helps to work out all the aspects in detail, take into account peculiar features of corporate identity and a client's expectations, make all the necessary adjustments and at the same time do not exceed budget limitations.
              </p>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-10"
            >
              <p className="font-circe font-light text-[1.6rem] text-brand-text-muted hover:text-white leading-relaxed transition-colors duration-300 cursor-default">
                Due to our highly qualified staff and all the necessary state-of-the-art equipment the processes of manufacturing followed by installation of a display are fulfilled in the shortest possible time and are of superior quality.
              </p>
              <p className="font-circe font-light text-[1.6rem] text-brand-text-muted hover:text-white leading-relaxed transition-colors duration-300 cursor-default">
                We offer not only exclusive expo booths production of any complexity but also multimedia equipment, furniture, writing software, professional creation of audio-visual content.
              </p>
              <p className="font-circe font-light text-[1.6rem] text-brand-text-muted hover:text-white leading-relaxed transition-colors duration-300 cursor-default">
                Throughout the years we have been successfully implementing projects in the expo sector, delivering world-class exhibition spaces that captivate and command attention globally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Contact CTA Section */}
      <section className="py-36 bg-[#121214] relative z-10 border-t border-brand-white/5 select-none">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 text-center">
          
          <div className="max-w-[90rem] mx-auto flex flex-col items-center">
            
            {/* Tagline */}
            <span className="font-circe font-light text-[1.4rem] tracking-[0.3em] text-brand-gold uppercase mb-6 block animate-pulse">
              Create Your Vision
            </span>
            {/* Heading Statement */}
            <h2 className="font-urw font-extrabold text-[4.2rem] sm:text-[5.5rem] lg:text-[6.5rem] text-white uppercase tracking-wider leading-tight mb-12">
              CREATING PROJECTS THAT COMMAND ATTENTION
            </h2>

            {/* Description */}
            <p className="font-circe font-light text-[1.8rem] sm:text-[2rem] text-brand-text-muted leading-relaxed max-w-[70rem] mb-16">
              Our Dubai joinery workshop and experiential tech engineering teams stand ready to bring your brand pavilion, bespoke boutique window, or event stage setup to absolute life.
            </p>

            {/* Inquire Button */}
            <Link
              to="/contacts"
              className="bg-[#E51D1D] hover:bg-[#c81717] text-white font-urw font-bold text-[1.7rem] tracking-widest uppercase px-16 py-6.5 rounded-sm shadow-[0_15px_30px_rgba(229,29,29,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-3.5"
            >
              Inquire Now <span className="font-light text-2xl animate-bounce-right">+</span>
            </Link>

          </div>

        </div>
      </section>

      {/* SECTION 1.7: YouTube Video Modal Overlay */}
      <AnimatePresence>
        {selectedVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-6 pointer-events-auto"
            onClick={() => setSelectedVideoId(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[100rem] aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedVideoId(null)}
                className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Responsive YouTube Embed */}
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&rel=0`}
                title="YouTube Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Home
