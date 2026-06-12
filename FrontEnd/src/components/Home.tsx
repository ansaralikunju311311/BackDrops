import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import suImage from '../assets/su.jpeg'
import gulfoodVideo from '../assets/client/VID-20260609-WA0081.mp4'
import PhotoGallery from './PhotoGallery'
import adipecVideo from '../assets/video cases/ADIPEC 2025.mp4'
import gisecVideo from '../assets/video cases/GISEC 2025.mp4'


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

const localVideos = [
  {
    id: 'local_adipec_2025',
    title: 'ADIPEC 2025',
    duration: '01:00',
    uploadDate: '2026-06-11',
    localSrc: adipecVideo
  },
  {
    id: 'local_gisec_2025',
    title: 'GISEC 2025',
    duration: '01:00',
    uploadDate: '2026-06-11',
    localSrc: gisecVideo
  }
]


const getTimeAgo = (dateString: string) => {
  const uploadDate = new Date(dateString)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - uploadDate.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 30) return `${diffDays} days ago`
  
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths === 1) return '1 month ago'
  if (diffMonths < 12) return `${diffMonths} months ago`
  
  const diffYears = Math.floor(diffDays / 365)
  if (diffYears === 1) return '1 year ago'
  return `${diffYears} years ago`
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentClientPage, setCurrentClientPage] = useState(0)
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleCards, setVisibleCards] = useState(3)
  const [dynamicVideos, setDynamicVideos] = useState<any[]>([])
  

  const videos = [...localVideos, ...dynamicVideos]

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const res = await fetch(`${apiBaseUrl}/api/videocases`)
        const data = await res.json()
        if (res.ok && data.success) {
          const formatted = data.videocases.map((v: any) => ({
            id: v.youtubeId,
            title: v.title,
            duration: v.duration || '00:00',
            date: new Date(v.createdAt).toLocaleDateString()
          }))
          setDynamicVideos(formatted)
        }
      } catch (err) {
        console.error('Failed to fetch video cases', err)
      }
    }
    fetchVideos()
  }, [])

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
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-3 bg-brand-gold text-brand-bg font-urw font-bold px-14 py-6 rounded-full hover:bg-white transition-all duration-500 uppercase tracking-widest group cursor-pointer shadow-[0_10px_25px_rgba(196,121,86,0.5)] whitespace-nowrap"
          style={{ fontSize: '2rem' }}
          aria-label="Connect with us - contact form"
        >
          Connect With Us <span className="font-light text-[2.2rem] group-hover:translate-x-1 transition-transform duration-300">→</span>
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
            className="font-urw font-black text-white text-center uppercase leading-[0.92] tracking-tight mb-10"
            style={{ fontSize: 'clamp(4rem, 6vw, 8.5rem)' }}
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
              <p className="font-circe font-normal text-white/95 leading-relaxed tracking-wide" style={{ fontSize: 'clamp(1.6rem, 1.8vw, 2.2rem)' }}>
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
              <p className="font-circe font-normal text-white/95 leading-relaxed tracking-wide" style={{ fontSize: 'clamp(1.6rem, 1.8vw, 2.2rem)' }}>
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
              <span className="font-circe font-bold text-[1.6rem] md:text-[1.8rem] tracking-[0.3em] text-brand-gold uppercase mb-4 block">
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
              <span className="font-circe font-bold text-[1.6rem] md:text-[1.8rem] tracking-[0.3em] text-brand-gold uppercase mb-4 block">
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
          <div className="flex flex-col mb-16 gap-8">
            <div className="w-full">
              <h2 className="font-urw font-extrabold text-white tracking-wider leading-tight mb-8 xl:whitespace-nowrap">
                <span className="uppercase text-[3rem] md:text-[4rem] lg:text-[4.5rem]">The BEX experience</span>
              </h2>
              <div className="border-l-[3px] border-brand-gold pl-6 py-1">
                <p className="font-circe font-light italic text-[2.2rem] md:text-[2.6rem] text-brand-gold leading-relaxed">
                  "The perspectives of clients, agencies, and brands we proudly support."
                </p>
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

          {/* Elfsight Google Reviews */}
          <div className="relative overflow-hidden w-full flex justify-center mt-12 mb-20">
            <div className="w-full max-w-[120rem] px-4">
              <div className="elfsight-app-6d93ed80-acf9-4927-81d5-6a12cd9ae6fe" data-elfsight-app-lazy></div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1.8: Vision to Life Timeline Section */}
      <section className="py-36 bg-[#121214] relative z-10 border-t border-brand-white/5 overflow-hidden">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
          
          <h2 className="font-urw font-extrabold text-h2 text-white text-center leading-tight mb-4 uppercase tracking-wider max-w-[95rem] mx-auto">
            Bring your vision to life – start your project today!
          </h2>
          <h3 className="font-euclid text-center text-brand-gold text-[2.5rem] md:text-[3rem] font-bold tracking-wider mb-32 uppercase">
            The BEX method- From Vision to Reality
          </h3>

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
                    className="w-24 h-24 rounded-full border border-brand-gold/40 bg-[#16171d] flex items-center justify-center font-mono font-bold text-[1.8rem] z-10 transition-all duration-300 hover:border-brand-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-default text-brand-gold"
                  >
                    # {step.num}
                  </motion.div>
                  <p className="font-circe font-semibold text-white/90 mt-6 text-center leading-snug" style={{ fontSize: '1.9rem' }}>
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
            className="font-urw font-extrabold text-[3rem] md:text-[4rem] lg:text-[5rem] text-white uppercase tracking-wider leading-tight mb-12"
          >
            Brand environment installation
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
              <p className="font-circe font-normal text-white/85 hover:text-white leading-relaxed transition-colors duration-300 cursor-default text-[1.8rem] md:text-[2.3rem]">
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
              <p className="font-circe font-normal text-white/85 hover:text-white leading-relaxed transition-colors duration-300 cursor-default text-[1.8rem] md:text-[2.3rem]">
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
                SUSTAINABILITY AS A STANDARD
              </h2>
              <p className="font-circe font-normal text-white/85 leading-relaxed text-[1.8rem] md:text-[2.3rem]">
                At BEX, sustainability is embedded into every stage of project delivery—from design and manufacturing to logistics and execution. Through intelligent material selection, reusable exhibition systems, modular construction, efficient production planning, and asset lifecycle management, we help clients reduce waste, maximize resources, and enhance long-term value.
              </p>
              <p className="font-circe font-normal text-white/85 leading-relaxed text-[1.8rem] md:text-[2.3rem]">
                Supported by our in-house infrastructure and manufacturing capabilities, we deliver environmentally responsible solutions without compromising creativity, quality, or impact. The result is a smarter, more efficient approach to experiential execution, combining innovation, performance, cost efficiency, and sustainability to help brands build responsibly for the future.
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
             <p className="font-circe font-normal text-white leading-relaxed max-w-[70rem] mb-16 text-[1.8rem] md:text-[2.3rem]">
              Backed by our state-of-the-art production facility, skilled fabrication teams, and experiential engineering expertise, we deliver exceptional exhibition stands, branded environments, and immersive experiences with precision and confidence.
            </p>

            {/* Inquire Button */}
            <Link
              to="/contacts"
              className="font-euclid font-bold tracking-wider uppercase px-8 py-4 bg-brand-gold text-brand-white hover:bg-brand-gold-light transition-all duration-300 rounded-xs flex items-center gap-3 shadow-[0_10px_20px_rgba(158,83,48,0.15)] group"
              style={{ fontSize: '2rem' }}
            >
              Inquire Now <span className="font-light text-[2.2rem] group-hover:translate-x-1 transition-transform duration-300">+</span>
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
