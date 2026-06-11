import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import suImage from '../assets/su.png'
import gulfoodVideo from '../assets/client/VID-20260609-WA0081.mp4'
import PhotoGallery from './PhotoGallery'

// import gal1 from '../assets/service/serv1.jpeg'
// import gal2 from '../assets/service/serv2.jpeg'
// import gal3 from '../assets/service/serv3.jpeg'
// import gal4 from '../assets/service/serv5.png'
// import gal5 from '../assets/service/serv6.jpeg'
// import gal6 from '../assets/service/serv7.png'
// import gal7 from '../assets/service/serv8.jpeg'
// import gal8 from '../assets/service/serv9.jpeg'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
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
  { name: 'Client C1', src: '/assets/client/c1.jpeg' },
  { name: 'Client C2', src: '/assets/client/c2.jpeg' },
  { name: 'Client C3', src: '/assets/client/c3.jpeg' },
  { name: 'Client C4', src: '/assets/client/c4.jpeg' },
  { name: 'Client C5', src: '/assets/client/c5.jpeg' },
  // { name: 'Client Logo 1', src: '/assets/client/1443542210-738.webp' },
  // { name: 'Client Logo 2', src: '/assets/client/1466226_logo_1573456585_n.webp' },
  // { name: 'Client Logo 3', src: '/assets/client/777a817a1178a9d0064.webp' },
  // { name: 'Sri Lanka Tourism', src: '/assets/client/862-8621430_wonder-of-asia-sri-lanka-tourism-logo-2015.webp' },
  { name: 'Dell Technologies', src: '/assets/client/Dell_Technologies-Logo.wine.png' },
  // { name: 'Dubai Investments', src: '/assets/client/Dubai Investments.webp' },
  // { name: 'F5', src: '/assets/client/F5_logo.webp' },
  { name: 'Logo Alternative', src: '/assets/client/Logo Alternative.png' },
  // { name: 'Hisense', src: '/assets/client/Logo-Hisense-500x281.webp' },
  // { name: 'SAP', src: '/assets/client/SAP-Logo-500x281.webp' },
  // { name: 'Client Logo 4', src: '/assets/client/c0dc49f0d93ab16d9713a0b5caf0058a.webp' },
  // { name: 'CommScope', src: '/assets/client/co3940c6c6-commscope-logo-commscope-logos.webp' },
  // { name: 'Dell', src: '/assets/client/dell-logo-blue-background-m5g3hq4wj7t162jt-2.webp' },
  // { name: 'Dubai Health Authority', src: '/assets/client/dubai-health-authority-logo-png_seeklogo-372291.webp' },
  // { name: 'ELM', src: '/assets/client/elm-logo-png_seeklogo-398917.webp' },
  // { name: 'Enchanteur', src: '/assets/client/enchanteur-logo-png_seeklogo-383633.webp' },
  // { name: 'Grundfos', src: '/assets/client/grundfos-logo.webp' },
  { name: 'Client Logos', src: '/assets/client/id2mCLrrRr_logos.jpeg' },
  { name: 'Client Logos', src: '/assets/client/id6lJPbJc2_logos.png' },
  { name: 'Client Logos', src: '/assets/client/id8D7VFAIt_logos.png' },
  { name: 'Client Logos', src: '/assets/client/id9myCKeCr_logos.png' },
  { name: 'Client Logo', src: '/assets/client/idAhgvGFlc_1781029053827.png' },
  { name: 'Client Logo', src: '/assets/client/idAsIoklku_1781031320147.png' },
  { name: 'Client Logo', src: '/assets/client/idCePolbiX_1781029976205.png' },
  { name: 'Client Logos', src: '/assets/client/idDFJqrQwg_logos.png' },
  { name: 'Client Logos', src: '/assets/client/idHqm7gw6l_logos.png' },
  { name: 'Client Logo', src: '/assets/client/idJ0ATxSA1_1781028665568.png' },
  { name: 'Client Logos', src: '/assets/client/idLi6wNdPe_logos.png' },
  { name: 'Client Logo', src: '/assets/client/idMs3AzW9b_1781030854121.png' },
  { name: 'Client Logo', src: '/assets/client/idOf910Br8_1781029651101.png' },
  { name: 'Client Logos', src: '/assets/client/idOlhVxWeD_logos.png' },
  { name: 'Client Logo', src: '/assets/client/idPkSJbR1j_1781028613669.png' },
  { name: 'Client Logos', src: '/assets/client/idW3HQKWBw_logos.png' },
  { name: 'Client Logo', src: '/assets/client/idZKkT0mgF_1781030379961.png' },
  { name: 'Client Logo', src: '/assets/client/idZR30M6bs_1781028912452.png' },
  { name: 'Client Logo', src: '/assets/client/ida_OlvRKy_1781028475058.png' },
  { name: 'Client Logo', src: '/assets/client/idbDH0_ixr_1781029819054.png' },
  { name: 'Client Logos', src: '/assets/client/idcYWEjDmf_logos.jpeg' },
  { name: 'Client Logos', src: '/assets/client/idfO4iItHC_logos.jpeg' },
  { name: 'Client Logos', src: '/assets/client/idfjwVQYC5_logos.jpeg' },
  { name: 'Client Logos', src: '/assets/client/idgIxko3EY_logos.png' },
  { name: 'Client Logos', src: '/assets/client/idlTKhEpOH_logos.png' },
  { name: 'Client Logo', src: '/assets/client/idnYSB7mQe_1781029287299.png' },
  { name: 'Client Logo', src: '/assets/client/idnhSG0vF4_1781029889588.png' },
  { name: 'Client Logos', src: '/assets/client/idpZUdTfwn_logos.png' },
  { name: 'Client Logos', src: '/assets/client/idw62OUZou_logos.jpeg' },
  { name: 'Client Logos', src: '/assets/client/idxIr5E38h_logos.png' },
  { name: 'Client Logos', src: '/assets/client/idzyTq2GcQ_logos.png' },
  { name: 'J5Create', src: '/assets/client/j5create_logo.jpg' },
  // { name: 'Panasonic', src: '/assets/client/panasonic-logo-png-transparent-300x169.webp' },
  // { name: 'Client Logo 5', src: '/assets/client/screen-shot-2013-09-05-at-12-11-47.webp' },
  // { name: 'Sergas', src: '/assets/client/sergas.webp' },
  // { name: 'Client Logo 6', src: '/assets/client/untitled-1_132.webp' },
  // { name: 'Wilhelmsen Ships Service', src: '/assets/client/wilhemsen_ships_service-1.webp' },
]

const videos = [
  {
    id: 'aNXF6TICgmM',
    title: 'ADIS 2026',
    duration: '01:18',
    date: '2 years ago'
  },
  {
    id: 'duG8mTTTMaQ',
    title: 'Beauty World 2024',
    duration: '00:30',
    date: '1 year ago'
  },
  {
    id: 't3crG9hLY_s',
    title: 'Gaming Expo 2025',
    duration: '00:25',
    date: '1 year ago'
  },
  {
    id: '3uB5Ni0L35w',
    title: 'Beauty World 2024',
    duration: '00:15',
    date: '2 years ago'
  }
]

const googleReviews = [
  {
    name: 'Ahmed Al Mansoori',
    avatar: 'AM',
    rating: 5,
    date: '2 months ago',
    text: 'Absolutely outstanding work by the BackDrops / BEX team! Our exhibition booth at GITEX was beyond expectations — premium build quality, immaculate finishes, and delivered on time. The team was professional throughout and handled every detail with care.',
    location: 'Dubai, UAE'
  },
  {
    name: 'Sarah Mitchell',
    avatar: 'SM',
    rating: 5,
    date: '3 months ago',
    text: 'We partnered with BEX for our international trade show in Singapore and the result was spectacular. From concept to installation, the process was seamless. Their attention to detail and quality of materials is unmatched in the industry.',
    location: 'London, UK'
  },
  {
    name: 'Carlos Mendes',
    avatar: 'CM',
    rating: 5,
    date: '4 months ago',
    text: 'Exceptional service and craftsmanship. BEX built our luxury retail booth for Dubai Mall and it perfectly captured our brand identity. The 3D visualizations they provided during the design phase made approval easy and the final result matched exactly.',
    location: 'Lisbon, Portugal'
  },
  {
    name: 'Fatima Al Rashidi',
    avatar: 'FR',
    rating: 5,
    date: '5 months ago',
    text: 'BEX delivered our double-decker pavilion for the World Blockchain Summit flawlessly. The scale of the project was massive but their project management was impeccable. Every deadline was met and the quality was world-class.',
    location: 'Riyadh, Saudi Arabia'
  },
  {
    name: 'David Chen',
    avatar: 'DC',
    rating: 5,
    date: '6 months ago',
    text: 'Outstanding exhibition stand design and build for our tech product launch. The team at BEX understood our vision immediately and translated it into a stunning physical space. Multiple visitors asked who built our booth — the answer is always BEX.',
    location: 'Singapore'
  },
  {
    name: 'Maria Gonzalez',
    avatar: 'MG',
    rating: 5,
    date: '7 months ago',
    text: 'We have worked with BEX across three exhibitions this year and consistency is their hallmark. Premium materials, expert craftsmanship, and a team that genuinely cares about the outcome. They are our go-to exhibition partner without question.',
    location: 'Madrid, Spain'
  },
]

const Home: React.FC = () => {
  const navigate = useNavigate()
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentClientPage, setCurrentClientPage] = useState(0)
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleCards, setVisibleCards] = useState(3)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const reviewsPerPage = isMobile ? 1 : 3
  const maxReviewIndex = Math.ceil(googleReviews.length / reviewsPerPage) - 1

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
            {["WE", "BUILD", "EXPERIENCES"].map((word, wordIndex) => (
              <motion.span 
                key={wordIndex} 
                variants={letterVariants}
                className="inline-block whitespace-nowrap"
              >
                {Array.from(word).map((char, charIndex) => {
                  return (
                    <motion.span
                      key={charIndex}
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
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Connect With Us — Bottom Tab */}
        <button
          onClick={() => navigate('/contacts')}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 bg-brand-gold hover:bg-white text-white hover:text-brand-dark font-urw font-bold text-[2rem] sm:text-[2.4rem] tracking-[0.25em] uppercase px-16 py-5 rounded-sm hover:scale-105 transition-all duration-400 ease-out cursor-pointer shadow-[0_8px_28px_rgba(196,121,86,0.5)] flex items-center gap-4 whitespace-nowrap"
          aria-label="Connect with us - contact form"
        >
          Connect With Us <span className="font-light" style={{fontSize:'2.8rem', lineHeight: '1'}}>→</span>
        </button>

        {/* Animated Scroll Down indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 select-none pointer-events-none opacity-50">
          <span className="font-circe font-light text-[1.2rem] uppercase tracking-[0.25em] text-white">Scroll Down</span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-white to-transparent animate-bounce" />
        </div>

      </section>

      {/* SECTION 1.5: Worldwide Projects Section */}
      <section className="py-24 bg-[#0d0d0f] relative z-10 border-t border-brand-white/5 overflow-hidden">
        {/* Subtle dark texture overlay */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 60% at 60% 50%, rgba(229,29,29,0.04) 0%, transparent 70%)`,
          }}
        />

        {/* Faint WORLDWIDE ghost text behind */}
        <div className="absolute left-0 bottom-[-2%] text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[26rem] font-urw font-black text-brand-white/[0.018] tracking-[0.05em] select-none pointer-events-none uppercase leading-none">
          WORLDWIDE
        </div>


        <div className="max-w-[140rem] mx-auto px-6 md:px-16 lg:px-28 relative z-10">

          {/* Large Bold Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-urw font-black text-white uppercase leading-[0.92] tracking-tight mb-10"
            style={{ fontSize: 'clamp(5rem, 9vw, 11rem)' }}
          >
            WORLDWIDE PROJECTS
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-[1px] bg-white/10 mb-16"
          />

          {/* Two Key Points */}
          <div className="flex flex-col gap-10 mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex items-start gap-7"
            >
              <span className="w-4 h-4 rounded-full bg-brand-gold flex-shrink-0 mt-3" />
              <p className="font-circe font-semibold text-white/95 leading-relaxed" style={{ fontSize: 'clamp(2rem, 2.4vw, 2.8rem)' }}>
                BEX delivers exhibition, experiential, and interior projects across international markets, providing agencies and brands with a trusted execution partner wherever they need to activate their presence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex items-start gap-7"
            >
              <span className="w-4 h-4 rounded-full bg-brand-gold flex-shrink-0 mt-3" />
              <p className="font-circe font-semibold text-white/95 leading-relaxed" style={{ fontSize: 'clamp(2rem, 2.4vw, 2.8rem)' }}>
                Combining global standards with local expertise, our team manages every stage of project delivery — from production and logistics to installation and on-site execution — ensuring consistency, quality, and reliability across borders.
              </p>
            </motion.div>
          </div>

          {/* Orange Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="font-circe font-bold text-brand-gold text-center w-full mt-8"
            style={{ fontSize: 'clamp(1.7rem, 2vw, 2.2rem)' }}
          >
            Wherever your vision goes, BEX is ready to build it.
          </motion.p>

        </div>
      </section>

      {/* SECTION 1.6: Video Cases Slider Section */}
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
              <h2 className="font-urw font-extrabold text-h1 text-white uppercase tracking-wider leading-tight mb-8">
                Video cases
              </h2>
              <p className="font-circe font-normal text-white/80 leading-relaxed max-w-[32rem] mb-12" style={{ fontSize: '1.8rem' }}>
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
                animate={{ x: `calc(-${currentVideoIndex} * (100% + 2rem) / ${visibleCards})` }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="flex gap-8 w-full"
              >
                {videos.map((vid) => (
                  <div 
                    key={vid.id} 
                    className="relative group cursor-pointer rounded-2xl p-5 bg-brand-dark-accent/20 border border-white/[0.03] hover:border-brand-gold/30 overflow-hidden"
                    style={{ 
                      flex: '0 0 auto',
                      width: `calc((100% - ${(visibleCards - 1) * 2}rem) / ${visibleCards})`,
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
                      {vid.localSrc ? (
                        <video 
                          src={vid.localSrc}
                          className="w-full h-full object-cover transition-all duration-700 ease-out brightness-[0.75] group-hover:brightness-90 group-hover:scale-102"
                          preload="metadata"
                        />
                      ) : (
                        <img 
                          src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`} 
                          alt={vid.title}
                          className="w-full h-full object-cover transition-all duration-700 ease-out brightness-[0.75] group-hover:brightness-90 group-hover:scale-102"
                        />
                      )}
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

      {/* SECTION: Project Gallery */}
      <PhotoGallery />

      {/* SECTION 1.6: Our Clients Slider Section */}
      <section className="py-28 bg-[#121214] relative z-10 border-t border-brand-white/5 overflow-hidden">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="font-circe font-light text-[1.4rem] tracking-[0.3em] text-brand-gold uppercase mb-4 block">
                Partnerships
              </span>
              <h2 className="font-urw font-extrabold text-h1 text-white uppercase tracking-wider leading-none">
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
                  className="w-[20rem] h-32 flex-shrink-0 flex items-center justify-center bg-[rgb(158,83,48)] rounded-xl border border-transparent hover:border-brand-gold/50 px-6 py-4 transition-all duration-300 group cursor-pointer hover:shadow-[0_10px_25px_rgba(158,83,48,0.4)]"
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
                  className="w-[20rem] h-32 flex-shrink-0 flex items-center justify-center bg-[rgb(158,83,48)] rounded-xl border border-transparent hover:border-brand-gold/50 px-6 py-4 transition-all duration-300 group cursor-pointer hover:shadow-[0_10px_25px_rgba(158,83,48,0.4)]"
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

      {/* SECTION 1.65: Google Reviews Section */}
      <section className="py-36 bg-[#0d0d0f] relative z-10 border-t border-brand-white/5 overflow-hidden">
        {/* Faint radial glow */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(66,133,244,0.04) 0%, transparent 70%)`,
          }}
        />

        {/* Faint ghost text */}
        <div className="absolute right-0 bottom-[-4%] text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-urw font-black text-brand-white/[0.012] tracking-[0.1em] select-none pointer-events-none uppercase">
          REVIEWS
        </div>

        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">

          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="font-circe font-bold text-[2rem] tracking-[0.2em] text-brand-gold uppercase mb-4 block">
                What Clients Say
              </span>
              <h2 className="font-urw font-extrabold text-h2 text-white uppercase tracking-wider leading-none">
                Google Reviews
              </h2>
            </div>

            {/* Google Rating Badge */}
            <div className="flex items-center gap-6 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-8 py-5 self-start md:self-auto">
              {/* Google G Logo SVG */}
              <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-urw font-black text-white text-[2.8rem] leading-none">5.0</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="#FBBC05">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="font-circe text-white/50 text-[1.3rem]">Based on Google reviews</span>
              </div>
            </div>
          </div>

          {/* Featured Video Review */}
          <div className="mb-20">
            <div 
              className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden bg-brand-dark-accent border border-white/10 group cursor-pointer shadow-2xl"
              onClick={() => setSelectedVideoId('local_gulfood2026')}
            >
              <video 
                src={gulfoodVideo}
                className="w-full h-full object-cover transition-all duration-700 ease-out brightness-[0.75] group-hover:brightness-90 group-hover:scale-102"
                preload="metadata"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-black/40 border-2 border-white/80 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ease-out z-20 group-hover:scale-110 group-hover:bg-brand-gold group-hover:border-transparent shadow-xl">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="font-urw font-bold text-white text-[2rem] drop-shadow-md">GULFOOD 2026 - Client Review</h3>
              </div>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `calc(-${currentReviewIndex} * (100% + 0px))` }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              className="flex gap-8"
            >
              {Array.from({ length: maxReviewIndex + 1 }).map((_, pageIdx) => (
                <div
                  key={pageIdx}
                  className="flex gap-8 flex-shrink-0"
                  style={{ width: '100%' }}
                >
                  {googleReviews.slice(pageIdx * reviewsPerPage, (pageIdx + 1) * reviewsPerPage).map((review, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="flex-1 bg-white/[0.03] border border-white/[0.08] hover:border-[#4285F4]/30 rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300 hover:bg-white/[0.05] hover:shadow-[0_10px_40px_rgba(66,133,244,0.08)] group cursor-default"
                    >
                      {/* Top Row: Avatar + Name + Google icon */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          {/* Avatar Circle */}
                          <div className="w-14 h-14 rounded-full flex items-center justify-center font-urw font-bold text-[1.5rem] text-white flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, #4285F4, #34A853)`,
                            }}
                          >
                            {review.avatar}
                          </div>
                          <div>
                            <p className="font-urw font-bold text-white text-[1.6rem] leading-tight group-hover:text-[#4285F4] transition-colors duration-300">{review.name}</p>
                            <p className="font-circe text-white/40 text-[1.3rem]">{review.location}</p>
                          </div>
                        </div>
                        {/* Small Google G */}
                        <svg className="w-7 h-7 flex-shrink-0 opacity-60" viewBox="0 0 48 48">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                          <path fill="none" d="M0 0h48v48H0z"/>
                        </svg>
                      </div>

                      {/* Stars + Date */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="#FBBC05">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="font-circe text-white/35 text-[1.2rem]">{review.date}</span>
                      </div>

                      {/* Review Text */}
                      <p className="font-circe font-normal text-white/80 group-hover:text-white leading-relaxed transition-colors duration-300 flex-1" style={{ fontSize: '1.6rem' }}>
                        "{review.text}"
                      </p>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={() => setCurrentReviewIndex(prev => Math.max(0, prev - 1))}
              disabled={currentReviewIndex === 0}
              className={`w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 ${
                currentReviewIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-[#4285F4] hover:border-[#4285F4] hover:scale-105 active:scale-95 cursor-pointer'
              }`}
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="flex gap-3">
              {Array.from({ length: maxReviewIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentReviewIndex(i)}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    currentReviewIndex === i ? 'bg-[#4285F4] w-8' : 'bg-white/20 hover:bg-white/40 w-3'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentReviewIndex(prev => Math.min(maxReviewIndex, prev + 1))}
              disabled={currentReviewIndex === maxReviewIndex}
              className={`w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 ${
                currentReviewIndex === maxReviewIndex
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-[#4285F4] hover:border-[#4285F4] hover:scale-105 active:scale-95 cursor-pointer'
              }`}
              aria-label="Next reviews"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

        </div>
      </section>


      {/* SECTION 1.8: Vision to Life Timeline Section */}
      <section className="py-36 bg-[#121214] relative z-10 border-t border-brand-white/5 overflow-hidden">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
          
          <h2 className="font-urw font-extrabold text-h2 text-white text-center leading-tight mb-16 uppercase tracking-wider max-w-[95rem] mx-auto">
            Bring your vision to life – start your project today!
          </h2>

          {/* Timeline Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-16 relative max-w-[130rem] mx-auto px-4">
            {[
              { num: '01', title: 'Client Briefing & Requirement Gathering' },
              { num: '02', title: 'Concept Development & Strategy' },
              { num: '03', title: 'Design Development (3D & Visualization)' },
              { num: '04', title: 'Technical Drawings & Engineering' },
              { num: '05', title: 'Production & Fabrication' },
              { num: '06', title: 'Mock-Up Presentation & Approval' },
              { num: '07', title: 'Logistics & Transportation' },
              { num: '08', title: 'On-Site Installation (Build-Up)' },
              { num: '09', title: 'Pre-Event Testing & Handover' },
              { num: '10', title: 'Event On-Site Support' },
              { num: '11', title: 'Dismantling & Post-Event Closure' },
              { num: '12', title: 'Post-Event Review & Reporting' }
            ].map((step) => (
                <div key={step.num} className="flex flex-col items-center w-full relative px-2">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="w-20 h-20 rounded-full border border-[#E51D1D]/30 bg-[#16171d] flex items-center justify-center font-mono font-bold text-[1.4rem] z-10 transition-all duration-300 hover:border-[#E51D1D] hover:shadow-[0_0_25px_rgba(229,29,29,0.35)] cursor-default"
                    style={{ color: '#E51D1D' }}
                  >
                    # {step.num}
                  </motion.div>
                  <p className="font-circe font-semibold text-white/90 mt-5 text-center leading-snug" style={{ fontSize: '1.8rem' }}>
                    {step.title}
                  </p>
                </div>
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
            className="font-urw font-extrabold text-h1 text-white uppercase tracking-wider leading-tight mb-12"
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
              <p className="font-circe font-normal text-white/85 hover:text-white leading-relaxed transition-colors duration-300 cursor-default" style={{ fontSize: '1.8rem' }}>
                The layout and installation of an expo booth form the backbone of a successful exhibition presence, shaping how visitors perceive and engage with a brand. A well-planned layout ensures clear visibility, seamless visitor flow, and strategic placement of key elements such as product displays, reception areas, and interactive zones, all aligned with the brand’s objectives. Through advanced planning and 3D visualization, every detail is refined to deliver a space that is both functional and visually impactful.
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
              <p className="font-circe font-normal text-white/85 hover:text-white leading-relaxed transition-colors duration-300 cursor-default" style={{ fontSize: '2.3rem' }}>
                At BEX, we combine design precision with expert installation to bring exhibition stands to life with accuracy, efficiency, and quality. From concept development to on-site execution, our teams ensure every booth is built to exact specifications, integrating branding, lighting, and multimedia elements seamlessly. The result is a powerful, immersive exhibition environment that attracts attention, engages audiences, and delivers lasting brand impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 1.95: Sustainability Section */}
      <section className="py-36 bg-[#0d0d0f] relative z-10 border-t border-brand-white/5 overflow-hidden">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-brand-dark-accent/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] group cursor-pointer"
              style={{
                transition: 'transform 0.1s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out',
              }}
            >
              <div className="card-glow absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-20" />
              <img 
                src={suImage} 
                alt="Sustainability"
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] z-10"
              />
            </motion.div>

            {/* Right Column: Text */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              <h2 className="font-urw font-extrabold text-h2 text-white uppercase tracking-wider leading-tight mb-4">
                SUSTAINABILITY AS A STANDARD, NOT AN AFTERTHOUGHT
              </h2>
              <p className="font-circe font-normal text-white/85 leading-relaxed" style={{ fontSize: '1.8rem' }}>
                At BEX, sustainability is not a separate initiative, it is integrated into the way we design, manufacture, manage, and deliver projects. We believe that exceptional brand experiences should create lasting impact for audiences, not unnecessary impact on the environment.
              </p>
              <p className="font-circe font-normal text-white/85 leading-relaxed" style={{ fontSize: '1.8rem' }}>
                What differentiates BEX is our commitment to responsible execution. Through intelligent material selection, reusable exhibition systems, modular construction techniques, efficient production planning, optimized logistics, and asset lifecycle management, we help clients reduce waste, maximize resource utilization, and improve long-term project value.
              </p>
              <p className="font-circe font-normal text-white/85 leading-relaxed" style={{ fontSize: '1.8rem' }}>
                Our in-house infrastructure and manufacturing capabilities enable greater control over materials, production processes, and quality standards, allowing us to deliver sustainable solutions without compromising creativity, functionality, or visual impact. By extending the life of exhibition assets, minimizing material wastage, and adopting efficient operational practices, we support brands and agencies seeking more responsible ways to engage their audiences.
              </p>
              <p className="font-circe font-normal text-white/85 leading-relaxed" style={{ fontSize: '1.8rem' }}>
                The result is a smarter approach to experiential delivery—one that balances innovation, performance, cost efficiency, and environmental responsibility. For BEX, sustainability is more than a commitment; it is a competitive advantage that helps our clients build for today while preparing for tomorrow.
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
            <span className="font-circe font-bold text-[2.2rem] tracking-[0.18em] text-brand-gold uppercase mb-8 block">
              Create Your Vision
            </span>
            {/* Heading Statement */}
            <h2 className="font-urw font-extrabold text-h1 text-white uppercase tracking-wider leading-tight mb-12">
              <span className="whitespace-nowrap">Experiences Built to Engage.</span><br />
              Engineered to Perform.
            </h2>

            {/* Description */}
             <p className="font-circe font-normal text-white/85 leading-relaxed max-w-[70rem] mb-16" style={{ fontSize: '2.0rem' }}>
              Backed by our state-of-the-art production facility, skilled fabrication teams, and experiential engineering expertise, we deliver exceptional exhibition stands, branded environments, and immersive experiences with precision and confidence.
            </p>

            {/* Inquire Button */}
            <Link
              to="/contacts"
              className="bg-brand-gold hover:bg-white text-white hover:text-brand-dark font-urw font-bold text-[1.7rem] tracking-widest uppercase px-16 py-6.5 rounded-sm shadow-[0_15px_30px_rgba(196,121,86,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-3.5"
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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-6 pointer-events-auto"
            onClick={() => setSelectedVideoId(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedVideoId(null)}
              className="absolute top-6 right-6 z-[110] w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[100rem] aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                if (selectedVideoId === 'local_gulfood2026') {
                  return (
                    <video 
                      src={gulfoodVideo}
                      controls
                      autoPlay
                      className="w-full h-full outline-none"
                    />
                  );
                }
                const selectedVideo = videos.find(v => v.id === selectedVideoId);
                if (selectedVideo?.localSrc) {
                  return (
                    <video 
                      src={selectedVideo.localSrc}
                      controls
                      autoPlay
                      className="w-full h-full outline-none"
                    />
                  );
                }
                return (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&rel=0`}
                    title="YouTube Video Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Home
