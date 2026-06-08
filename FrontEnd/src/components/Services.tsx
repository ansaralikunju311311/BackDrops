import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react'

import serv1 from '../assets/service/serv1.jpeg'
import serv2 from '../assets/service/serv2.jpeg'
import serv3 from '../assets/service/serv3.jpeg'
import serv4 from '../assets/service/serv4.jpeg'
import serv5 from '../assets/service/serv5.jpeg'
import serv6 from '../assets/service/serv6.jpeg'
import serv7 from '../assets/service/serv7.jpeg'
import serv8 from '../assets/service/serv8.jpeg'
import serv9 from '../assets/service/serv9.jpeg'
import serv10 from '../assets/service/serv10.jpeg'

// Direct SVG Icons for matching brand styles
const InstagramIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C16.255 1.876 13.779 1.042 11.14 1.04 5.707 1.04 1.282 5.461 1.277 10.899c-.001 1.816.486 3.594 1.417 5.158l-.979 3.57 3.655-.959c1.506.82 3.1 1.249 4.677 1.25zM17.5 13.9c-.3-.15-1.785-.88-2.087-.99-.3-.105-.52-.15-.74.15-.22.3-.85.99-1.04 1.2-.19.21-.38.24-.68.09-.3-.15-1.265-.465-2.41-1.485-.89-.79-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.135.3-.35.45-.52.15-.17.2-.28.3-.47.1-.19.05-.36-.02-.51-.07-.15-.74-1.785-1.015-2.445-.27-.65-.545-.56-.74-.57-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73s1.18 3.17 1.34 3.39c.17.22 2.32 3.54 5.62 4.97.785.34 1.395.54 1.87.69.79.25 1.51.21 2.08.13.635-.09 1.785-.73 2.035-1.43.25-.7.25-1.3.175-1.43-.075-.1-.275-.15-.575-.3z"/>
  </svg>
)

interface ServiceData {
  title: string
  description: string
  image: string
}

const SERVICES_DATA: ServiceData[] = [
  {
    title: "Exhibition Stand Production",
    description: "We offer complete solutions for exhibition stand construction. From structural fabrication to on-site assembly, our team ensures your brand stands out with top-tier materials, precision joinery, and reliable execution.",
    image: serv1
  },
  {
    title: "Custom Fabrication & Joinery",
    description: "Our specialized in-house joinery workshop manufactures bespoke wooden structures, display counters, and interior styling elements. We combine traditional craftsmanship with modern technology to deliver premium finishes.",
    image: serv2
  },
  {
    title: "Event & Activation Builds",
    description: "We build immersive environments for product launches, brand activations, and corporate events. Our interactive installations engage visitors and create memorable, photogenic touchpoints for your audience.",
    image: serv3
  },
  {
    title: "On-site Installation & Project Management",
    description: "Our experienced project managers oversee all logistics, certifications, and local authority permits. We handle transportation and round-the-clock assembly, ensuring a stress-free launch for your event.",
    image: serv4
  },
  {
    title: "Mall & Retail Installations",
    description: "We create eye-catching window displays, promotional kiosks, and pop-up boutiques inside premium retail spaces. Compliant with strict shopping mall guidelines and safety standards.",
    image: serv5
  },
  {
    title: "Experiential Booth Engineering",
    description: "Blending technology with structure. We design and install interactive setups including integrated LED screens, smart lighting, sensory elements, and immersive media systems for cutting-edge booths.",
    image: serv6
  },
  {
    title: "Office and Villa Interiors",
    description: "Beyond temporary events, we specialize in high-end fitouts for office headquarters, showrooms, and luxury residences. Custom wall panels, premium flooring, and architectural design.",
    image: serv7
  },
  {
    title: "Graphics and Signage",
    description: "High-resolution large-format printing, 3D backlit signs, vinyl wraps, and custom branding elements. We handle complete printing, cutting, and finishing in-house for flawless quality control.",
    image: serv8
  },
  {
    title: "Furniture Rentals",
    description: "Premium event and exhibition furniture rentals. We provide high-end seating, modular counters, tables, showcase cabinets, bar stools, and custom lounge furniture to match your brand's style.",
    image: serv9
  },
  {
    title: "Storage Facilities",
    description: "Safe and secure warehouse storage facilities for exhibition materials and custom stands. We manage post-event dismantling, inventory tracking, protective wrapping, and storage for your next expo.",
    image: serv10
  }
]

const Services: React.FC = () => {
  const location = useLocation()
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const scrollRef = useRef<HTMLDivElement>(null)

  // Smooth scroll to header below the fixed navbar
  const scrollToHeader = () => {
    const headerEl = document.getElementById('our-services-header')
    if (headerEl) {
      const navbarHeight = 120 // height of fixed navbar in px
      const elementPosition = headerEl.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navbarHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    // Read the "?id=X" from URL query string
    const queryParams = new URLSearchParams(location.search)
    const idParam = queryParams.get('id')
    if (idParam !== null) {
      const idx = parseInt(idParam, 10)
      if (!isNaN(idx) && idx >= 0 && idx < SERVICES_DATA.length) {
        setActiveIdx(idx)
        // Scroll smoothly to top on query change
        setTimeout(scrollToHeader, 50)
      }
    }
  }, [location])

  // 1. Auto-scroll timer hook (advances every 6 seconds; resets on manual change)
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActiveIdx((prev) => (prev === SERVICES_DATA.length - 1 ? 0 : prev + 1))
    }, 6000)
    return () => clearInterval(timer)
  }, [activeIdx])

  // 2. Center the active card in the horizontal catalogue when activeIdx changes
  useEffect(() => {
    if (scrollRef.current) {
      const activeCard = scrollRef.current.children[activeIdx] as HTMLElement
      if (activeCard) {
        const containerWidth = scrollRef.current.clientWidth
        const cardOffset = activeCard.offsetLeft
        const cardWidth = activeCard.clientWidth
        const scrollTarget = cardOffset - (containerWidth / 2) + (cardWidth / 2)
        
        scrollRef.current.scrollTo({
          left: scrollTarget,
          behavior: 'smooth'
        })
      }
    }
  }, [activeIdx])

  const handlePrev = () => {
    setDirection(-1)
    setActiveIdx((prev) => (prev === 0 ? SERVICES_DATA.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setActiveIdx((prev) => (prev === SERVICES_DATA.length - 1 ? 0 : prev + 1))
  }

  const scrollList = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340 // approximation of card size + gap
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Slide transition configuration - Very slow, premium cinematic ease curve
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 1.2 }, // Custom easeOutExpo
        opacity: { duration: 1.0 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0,
      transition: {
        x: { type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 1.2 },
        opacity: { duration: 0.8 }
      }
    })
  }

  return (
    <section className="relative min-h-screen pt-36 pb-32 bg-brand-bg overflow-hidden flex flex-col justify-start">
      {/* 1. Geometric overlapping prism/diagonal panels in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Ambient background grid and glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,164,55,0.04),rgba(20,23,33,0))]" />
        
        {/* Prism Overlapping Panels */}
        <div className="absolute top-0 right-[25%] bottom-0 w-[45rem] bg-gradient-to-r from-white/[0.005] to-white/[0.025] border-l border-white/[0.03] -skew-x-[22deg] origin-top transform-gpu animate-pulse-slow" />
        <div className="absolute top-0 right-[42%] bottom-0 w-[25rem] bg-gradient-to-l from-white/[0.008] to-transparent border-r border-white/[0.02] -skew-x-[12deg] origin-top transform-gpu" />
        <div className="absolute top-0 right-[55%] bottom-0 w-[35rem] bg-gradient-to-r from-white/[0.015] to-white/[0.002] border-l border-white/[0.04] -skew-x-[32deg] origin-top transform-gpu" />
        
        {/* Glow orb */}
        <div className="absolute top-[20%] right-[-10%] w-[50rem] h-[50rem] rounded-full bg-brand-gold/[0.025] blur-[120px] animate-float-orb" />
      </div>

      {/* 2. Giant vertical background text overlay "SERVICES" */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 translate-x-[42%] rotate-90 text-[18rem] md:text-[23rem] lg:text-[26rem] font-urw font-black text-brand-white/[0.01] tracking-widest select-none pointer-events-none z-0">
        SERVICES
      </div>

      <div className="relative z-10 max-w-[140rem] mx-auto w-full px-6 md:px-12 lg:px-24">
        
        {/* Header container for scrolling target */}
        <div id="our-services-header" className="flex justify-between items-baseline mb-16 border-b border-brand-white/5 pb-8">
          <h1 className="font-urw font-bold text-[5rem] sm:text-[6rem] lg:text-[7.2rem] text-white tracking-wide uppercase leading-none">
            Our services
          </h1>
          <div className="text-right hidden sm:block">
            <span className="font-urw font-bold text-[2rem] tracking-[0.25em] text-white block uppercase">
              BEX —
            </span>
            <span className="font-circe font-light text-[1.4rem] tracking-[0.2em] text-brand-text-muted block mt-1 uppercase">
              Premium Execution Partner
            </span>
          </div>
        </div>

        {/* Top: Active Service Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-32">
          
          {/* Left Column: Vertical dot indicators + Carousel Image with offset borders */}
          <div className="lg:col-span-6 flex flex-row items-center justify-center lg:justify-start w-full">
            {/* Dots */}
            <div className="flex flex-col gap-6 mr-8 md:mr-12 shrink-0">
              {SERVICES_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIdx ? 1 : -1)
                    setActiveIdx(idx)
                  }}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 relative cursor-pointer ${
                    idx === activeIdx
                      ? 'bg-brand-gold scale-125 shadow-[0_0_12px_rgba(158,83,48,0.9)]'
                      : 'bg-white/25 hover:bg-white/50 scale-100'
                  }`}
                  aria-label={`Go to service slide ${idx + 1}`}
                >
                  {idx === activeIdx && (
                    <span className="absolute -inset-1.5 rounded-full border border-brand-gold/60 animate-ping pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

            {/* Image container with overlapping border highlights */}
            <div className="relative w-[34rem] sm:w-[45rem] lg:w-[48rem] aspect-square shrink-0">
              {/* Back offset border (White/grey) */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-brand-white/10 rounded-sm pointer-events-none z-0" />
              
              {/* Front offset border (Gold/red accent) */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-brand-gold/45 rounded-sm pointer-events-none z-0" />

              {/* Main Image Viewport wrapped in detail link */}
              <Link to={`/services/detail?id=${activeIdx}`} className="w-full h-full relative overflow-hidden rounded-sm z-10 bg-brand-dark-accent border border-brand-white/5 block group/img">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.img
                    key={activeIdx}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    src={SERVICES_DATA[activeIdx].image}
                    alt={SERVICES_DATA[activeIdx].title}
                    className="w-full h-full object-cover select-none group-hover/img:scale-105 transition-transform duration-700"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/40 via-transparent to-transparent pointer-events-none" />
              </Link>
            </div>
          </div>

          {/* Right Column: Carousel Controls + Dynamic Service Details */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left w-full h-full z-10">
            {/* Prev/Next buttons */}
            <div className="flex gap-5 mb-8 lg:mb-12">
              <button
                onClick={handlePrev}
                className="w-16 h-16 rounded-full border border-brand-white/20 hover:border-brand-gold hover:bg-brand-gold/15 text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={handleNext}
                className="w-16 h-16 rounded-full border border-brand-white/20 hover:border-brand-gold hover:bg-brand-gold/15 text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
                aria-label="Next service"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </div>

            {/* Dynamic text details with animation */}
            <div className="min-h-[26rem] flex flex-col justify-start">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIdx}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  <h2 className="font-urw font-extrabold text-[3.8rem] sm:text-[4.5rem] lg:text-[5.2rem] text-white leading-tight tracking-wide">
                    {SERVICES_DATA[activeIdx].title}
                  </h2>
                  <p className="font-circe font-light text-[2rem] lg:text-[2.2rem] text-brand-text-muted leading-relaxed max-w-[62rem]">
                    {SERVICES_DATA[activeIdx].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Link to Service Details Page */}
            <div className="mt-8 lg:mt-12">
              <Link
                to={`/services/detail?id=${activeIdx}`}
                className="inline-flex font-euclid font-bold tracking-wider uppercase text-brand-gold hover:text-white transition-colors duration-300 items-center gap-3 group/btn"
                style={{ fontSize: '2.2rem' }}
              >
                <span>Read more</span>
                <span className="font-light group-hover:translate-x-1.5 transition-transform duration-300" style={{ fontSize: '2.6rem' }}>»</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom: Horizontal Scroll View of All Services */}
        <div className="border-t border-brand-white/5 pt-16 mt-12">
          {/* Scroll Header Controls */}
          <div className="flex justify-between items-end mb-10">
            <div className="flex flex-col gap-2">
              <span className="font-circe font-light text-[1.4rem] tracking-[0.25em] text-brand-gold uppercase">Explore Categories</span>
              <h2 className="font-urw font-bold text-[3rem] sm:text-[3.8rem] text-white uppercase tracking-wider">Our Service Catalogue</h2>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => scrollList('left')}
                className="w-14 h-14 rounded-full border border-brand-white/20 hover:border-brand-gold hover:bg-brand-gold/15 text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scrollList('right')}
                className="w-14 h-14 rounded-full border border-brand-white/20 hover:border-brand-gold hover:bg-brand-gold/15 text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory scroll-smooth pt-4"
          >
            {SERVICES_DATA.map((service, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIdx ? 1 : -1)
                  setActiveIdx(idx)
                  scrollToHeader()
                }}
                className={`flex-shrink-0 w-[24rem] sm:w-[28rem] cursor-pointer group transition-all duration-500 ease-out snap-start hover:-translate-y-4 hover:scale-[1.03] ${
                  idx === activeIdx 
                    ? 'opacity-100 scale-102 shadow-[0_20px_40px_rgba(158,83,48,0.25)]' 
                    : 'opacity-50 hover:opacity-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.65)]'
                }`}
              >
                {/* Card Image */}
                <div className={`relative aspect-[3/4] mb-5 overflow-hidden rounded-sm border transition-all duration-500 ${
                  idx === activeIdx ? 'border-brand-gold shadow-[0_0_15px_rgba(158,83,48,0.3)]' : 'border-brand-white/10 group-hover:border-brand-gold/60'
                }`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700 select-none"
                  />
                  {idx === activeIdx && (
                    <div className="absolute inset-0 border-2 border-brand-gold pointer-events-none" />
                  )}
                  {/* Diagonal reflection flare effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out pointer-events-none" />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/20 to-transparent pointer-events-none group-hover:opacity-40 transition-opacity duration-300" />
                </div>
                
                {/* Title and expanding underline container */}
                <div className="relative overflow-hidden pr-2">
                  <h3 className="font-urw font-bold text-[1.9rem] sm:text-[2.1rem] text-white leading-tight mt-1 group-hover:text-brand-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <div className="w-16 h-[2px] bg-brand-gold mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Floating Sticky Contact Sidebar (matching Home page Hero) */}
      <div className="fixed right-0 top-[30%] z-50 bg-white py-20 px-6 flex flex-col gap-16 items-center shadow-[-5px_0_30px_rgba(0,0,0,0.18)] rounded-l-3xl border-y border-l border-gray-100 hidden md:flex w-28">
        {/* Telephone */}
        <a href="tel:+971552291691" className="relative group flex items-center justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
            <Phone className="w-10 h-10" />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/_backdrops.ae?igsh=dGlwbWpqazFybXd3" target="_blank" rel="noopener noreferrer" className="relative group flex items-center justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
            <InstagramIcon className="w-10 h-10" />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
        </a>

        {/* WhatsApp */}
        <a href="https://wa.me/971552291691" target="_blank" rel="noopener noreferrer" className="relative group flex items-center justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
            <WhatsAppIcon className="w-10 h-10" />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
        </a>
      </div>
    </section>
  )
}

export default Services

