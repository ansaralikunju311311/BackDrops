import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Phone, ArrowUpRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'

import serv1 from '../assets/service/serv1.jpeg'
import serv2 from '../assets/service/serv2.jpeg'
import serv3 from '../assets/service/serv3.png'
import serv5 from '../assets/service/serv5.png'
import serv6 from '../assets/service/serv6.jpeg'
import serv7 from '../assets/service/serv7.png'
import serv8 from '../assets/service/serv8.jpeg'
import serv9 from '../assets/service/serv9.jpeg'
import serv10 from '../assets/service/serv10.jpeg'
import serv11 from '../assets/service/serv11.jpeg'
import serv12 from '../assets/service/serv12.png'
import serv13 from '../assets/service/serv13.png'

export const serviceImages = [serv1, serv2, serv3, serv5, serv6, serv7, serv8, serv9, serv10, serv11, serv12, serv13]

// Direct SVG Icons matching the brand styles
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

const FacebookIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

interface RelatedCard {
  idx: number
  title: string
  image: string
  snippet: string
}

interface PortfolioProject {
  title: string
  area: string
  details: string[]
  image: string
  description?: string
  location?: string
  facility?: string
  materials?: string[]
  isDb?: boolean
  dbId?: string
  category?: string
  categories?: string[]
  originalIdx?: number
}

export interface ServiceDetailData {
  title: string
  image: string
  p1: string
  p2: string
  p3: string
  related: RelatedCard[]
  portfolio?: PortfolioProject[]
}

export const DETAIL_SERVICES_DATA: ServiceDetailData[] = [
  {
    title: "Exhibition Stand Production",
    image: serv1,
    p1: "Exhibitions provide powerful opportunities for brands to showcase their products and services, engage decision-makers, strengthen industry relationships, and create meaningful business growth. At BEX, we ensure that every exhibition presence is strategically designed and flawlessly executed to maximize visibility, engagement, and return on investment.",
    p2: "As a trusted execution partner, we manage the entire exhibition journey — from venue coordination and space acquisition support to the design, fabrication, installation, and dismantling of custom exhibition environments.",
    p3: "Supported by our advanced manufacturing facility, skilled production teams, and comprehensive in-house capabilities, we deliver bespoke exhibition stands of any scale or complexity. Every stand is meticulously crafted to reflect your brand identity, align with corporate guidelines, and create a distinctive presence that captures attention and drives results.",
    related: [
      { idx: 1, title: "Custom Fabrication & Joinery", image: "/assets/workspace_meeting.png", snippet: "Order custom fabrication and wooden structures for your unique promotional needs." },
      { idx: 2, title: "Event & Activation Builds", image: "/assets/hero-bg.png", snippet: "Fabricating stages, photo zones, and brand activation booths for events." }
    ]
  },
  {
    title: "Custom Fabrication & Joinery",
    image: serv2,
    p1: "Our custom fabrication and joinery division specializes in the creation of bespoke architectural elements, premium display furniture, reception counters, feature walls, and branded environments tailored to the unique requirements of each project. Designed and manufactured to exact specifications, our solutions deliver a level of craftsmanship, flexibility, and visual sophistication that standard modular systems cannot achieve.",
    p2: "Operating from a modern production facility equipped with advanced manufacturing technology, we combine precision engineering with expert craftsmanship to produce exceptional results. From material selection and technical detailing to fabrication and final finishing, every component is meticulously crafted to achieve superior quality, durability, and aesthetic excellence.",
    p3: "Whether for exhibitions, interiors, retail environments, or experiential spaces, our bespoke joinery solutions are built to perform, impress, and endure.",
    related: [
      { idx: 5, title: "Office and Villa Interiors", image: "/assets/showroom_retail_design.png", snippet: "High-end turnkey interior fit-outs for offices and luxury residences." },
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Exhibition stand construction from design to build-up." }
    ]
  },
  {
    title: "Event & Activation Builds",
    image: serv3,
    p1: "Brand activations and events require fast, high-quality fabrication of stages, interactive photo zones, and promotional displays that capture attention instantly.",
    p2: "We construct durable structures that align with structural certifications and safety norms, designed specifically for rapid assembly and dismantling on site.",
    p3: "Our team handles full structural engineering, audio-visual layouts, dynamic lighting, and graphic wraps to provide an immersive brand experience.",
    related: [
      { idx: 4, title: "Experiential Booth Engineering", image: "/assets/hero-bg.png", snippet: "Integrating digital tech, LED screens, and sensors with physical structures." },
      { idx: 6, title: "Graphics and Signage", image: "/assets/about-banner-bg.webp", snippet: "In-house printing, dimensional logos, and lit signs." }
    ]
  },
  {
    title: "Mall & Retail Installations",
    image: serv5,
    p1: "Commercial retail environments demand outstanding craftsmanship and extreme safety compliance. We design window displays, promotional kiosks, and temporary boutique stands.",
    p2: "We construct stands strictly using non-combustible materials, fire-rated electrical wiring, and stable structures that comply with premium shopping mall rules.",
    p3: "Our designs target immediate customer attraction, maximizing product placement utility and integrating structural premium aesthetic highlights.",
    related: [
      { idx: 5, title: "Office and Villa Interiors", image: "/assets/showroom_retail_design.png", snippet: "High-end interior commercial and residential fit-outs." },
      { idx: 6, title: "Graphics and Signage", image: "/assets/about-banner-bg.webp", snippet: "Illuminated signs and graphic prints." }
    ]
  },
  {
    title: "Experiential Booth Engineering",
    image: serv6,
    p1: "We engineer next-generation exhibition booths that blend physical carpentry with digital technologies like interactive LED walls, projection mapping, and motion sensors.",
    p2: "Our tech divisions integrate hidden wiring tracks, ventilation systems, cooling fans, and sturdy steel reinforcement brackets for heavy LED panel mounts.",
    p3: "We coordinate with software designers to deliver immersive customer journeys, including sensory corridors, touch screens, and VR experiences.",
    related: [
      { idx: 2, title: "Event & Activation Builds", image: "/assets/hero-bg.png", snippet: "Stages and immersive installations for launches." },
      { idx: 6, title: "Graphics and Signage", image: "/assets/about-banner-bg.webp", snippet: "Large scale backlighting and branding sign designs." }
    ]
  },
  {
    title: "Office and Villa Interiors",
    image: serv7,
    p1: "We specialize in permanent luxury interior fit-outs for offices, corporate headquarters, brand showrooms, boutiques, and high-end residential villas.",
    p2: "Our fit-out services cover custom partition walls, decorative ceilings, premium wood floors, double-glazed glass framing, and architectural layout plans.",
    p3: "We balance layout ergonomics with high-end finishes, creating workspaces that increase efficiency and private residences that project luxury and comfort.",
    related: [
      { idx: 1, title: "Custom Fabrication & Joinery", image: "/assets/workspace_meeting.png", snippet: "Bespoke woodwork and custom panel designs." },
      { idx: 3, title: "Mall & Retail Installations", image: "/assets/showroom_retail_design.png", snippet: "Malls window structures and promotional kiosk fabrication." }
    ]
  },
  {
    title: "Graphics and Signage",
    image: serv8,
    p1: "Graphics and branding elements complete the premium look of stands and interiors. We operate large-format print lines, vinyl cutting, and neon-styling divisions.",
    p2: "We manufacture backlit fabric frames, dimensional 3D acrylic letters, stainless steel signage, and custom lightboxes with strict color calibration and quality controls.",
    p3: "Our vinyl and graphic wrap installers guarantee bubble-free, seamless finishes on complex structures, and hidden electrical wire setups.",
    related: [
      { idx: 4, title: "Experiential Booth Engineering", image: "/assets/hero-bg.png", snippet: "Booths incorporating smart LED displays and digital backdrops." },
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Turnkey exhibition stand building and graphics panels installation." }
    ]
  },
  {
    title: "Furniture Rentals",
    image: serv9,
    p1: "Exhibition stand aesthetics are completed by the right choice of furniture. We provide an extensive range of premium event and exhibition furniture rentals across the UAE.",
    p2: "Our catalogue includes designer seating, bar stools, reception counters, display cabinets, meeting tables, and premium lounge setups designed to match your brand's color theme.",
    p3: "We manage complete logistics, delivery, visual placement, and post-event collection, ensuring that your stand looks immaculate and serves your visitors comfortably.",
    related: [
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Exhibition stand construction from design to build-up." },
      { idx: 1, title: "Custom Fabrication & Joinery", image: "/assets/workspace_meeting.png", snippet: "Order custom fabrication and wooden structures for your unique promotional needs." }
    ]
  },
  {
    title: "Storage Facilities",
    image: serv10,
    p1: "Custom-built joinery exhibition stands represent a significant corporate investment. Instead of discarding them, we offer safe, secure storage facilities to preserve your assets.",
    p2: "Our Jebel Ali warehouse features managed storage spaces where stand components are carefully dismantled, catalogued, bubble-wrapped, and loaded into containers for future re-use.",
    p3: "We offer end-to-end multi-event asset management, helping you store, transport, refurbish, and reinstall your stands for subsequent trade shows, saving cost and reducing waste.",
    related: [
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Exhibition stand construction from design to build-up." },
      { idx: 9, title: "Turnkey Architectural Projects", image: "/assets/journey.png", snippet: "Coordinating transport, permits, assembly, and dismantling." }
    ]
  },
  {
    title: "Turnkey Architectural Projects",
    image: serv11,
    p1: "Through our sister company in India, CREO Construction Experts, BEX extends its capabilities beyond experiential environments to deliver complete turnkey architectural and construction solutions.",
    p2: "From concept development and design coordination to construction, fit-out, and final handover, we provide seamless project delivery tailored to modern business and commercial requirements.",
    p3: "Inspired by industry best practices in design-build and turnkey construction, our approach emphasizes quality, efficiency, innovation, and accountability throughout every stage of the project lifecycle.",
    related: [
      { idx: 5, title: "Office and Villa Interiors", image: "/assets/showroom_retail_design.png", snippet: "High-end interior fit-outs for offices, showrooms and luxury residences." },
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Full project management, permits, assembly, and handover." }
    ]
  },
  {
    title: "Shell Scheme Upgradation",
    image: serv12,
    p1: "Transform standard exhibition shell schemes into impactful branded environments that attract attention and enhance visitor engagement.",
    p2: "BEX upgrades basic exhibition spaces with custom graphics, premium finishes, integrated lighting, display solutions, product showcases, digital elements, and functional layouts tailored to your brand objectives.",
    p3: "Our team manages the complete process—from design enhancement and production to installation and dismantling—ensuring your shell scheme delivers a professional, distinctive, and high-quality presence on the show floor while maximizing both visual appeal and visitor experience.",
    related: [
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Full exhibition stand fabrication and branded environment creation." },
      { idx: 6, title: "Graphics and Signage", image: "/assets/about-banner-bg.webp", snippet: "Custom graphics, large-format prints, and signage solutions." }
    ]
  },
  {
    title: "Corporate Branding Materials",
    image: serv13,
    p1: "Elevate your brand beyond the event floor with premium merchandise, executive gifting solutions, and high-quality printed materials designed to create lasting impressions and strengthen brand affinity. From bespoke corporate gifts and promotional products to luxury packaging, marketing collateral, and branded assets, we deliver carefully curated solutions that reflect the quality, values, and professionalism of your brand.",
    p2: "At BEX, we manage the entire journey — from concept development and product sourcing to customization, production, quality assurance, and fulfillment. Leveraging trusted supplier networks, premium materials, and meticulous attention to detail, we ensure every item embodies excellence and consistency.",
    p3: "Whether supporting exhibitions, corporate events, product launches, client engagement initiatives, or internal brand programs, our merchandise and print solutions are crafted to enhance visibility, reinforce messaging, and create memorable brand experiences long after the interaction ends.",
    related: [
      { idx: 6, title: "Graphics and Signage", image: "/assets/about-banner-bg.webp", snippet: "Large-format prints, dimensional logos, and custom branding elements." },
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Complete exhibition stand design, fabrication, and installation." }
    ]
  }
]

const fetchAllStands = async () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const res = await fetch(`${apiBaseUrl}/api/stands?limit=100`)
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch stands')
  }
  return data.stands || []
}

const ServiceDetail: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeIdx, setActiveIdx] = useState(0)
  const portfolioScrollRef = useRef<HTMLDivElement>(null)

  const { data: dbStands = [] } = useQuery({
    queryKey: ['allStands'],
    queryFn: fetchAllStands
  })

  useEffect(() => {
    // Read active ID from query params
    const queryParams = new URLSearchParams(location.search)
    const idParam = queryParams.get('id')
    if (idParam !== null) {
      const idx = parseInt(idParam, 10)
      if (!isNaN(idx) && idx >= 0 && idx < DETAIL_SERVICES_DATA.length) {
        setActiveIdx(idx)
      }
    }
    // Scroll window smoothly to the top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  // 1. Auto-scroll portfolio carousel list at a time interval
  useEffect(() => {
    const scrollContainer = portfolioScrollRef.current
    if (!scrollContainer) return

    const interval = setInterval(() => {
      const cardWidth = 390 // Card width + gap
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth
      
      if (scrollContainer.scrollLeft >= maxScrollLeft - 15) {
        scrollContainer.scrollTo({
          left: 0,
          behavior: 'smooth'
        })
      } else {
        scrollContainer.scrollBy({
          left: cardWidth,
          behavior: 'smooth'
        })
      }
    }, 4500)

    return () => clearInterval(interval)
  }, [activeIdx, dbStands])

  const service = DETAIL_SERVICES_DATA[activeIdx]

  // Map database stands to the portfolio structure for ALL active index pages
  const filteredStands = (() => {
    switch (activeIdx) {
      case 0: // Exhibition Stand Production
        return dbStands
      case 1: // Custom Fabrication & Joinery
        return dbStands.filter((stand: any) => 
          stand.typeOfStands?.some((t: string) => t.toLowerCase().includes('custom'))
        )
      case 2: // Event & Activation Builds
        return dbStands.filter((stand: any) => 
          stand.typeOfEvents?.some((e: string) => 
            ['activation', 'launch', 'festival', 'concert', 'sports', 'corporate'].some((kw: string) => 
              e.toLowerCase().includes(kw)
            )
          )
        )
      case 3: // Mall & Retail Installations
        return dbStands.filter((stand: any) => 
          ['mall', 'retail', 'shop', 'boutique'].some((kw: string) => 
            stand.location?.toLowerCase().includes(kw) || 
            stand.showName?.toLowerCase().includes(kw)
          )
        )
      case 4: // Experiential Booth Engineering
        return dbStands.filter((stand: any) => 
          stand.typeOfStands?.some((t: string) => 
            ['smart', 'double decker'].some((kw: string) => 
              t.toLowerCase().includes(kw)
            )
          )
        )
      case 5: // Office and Villa Interiors
        return dbStands.filter((stand: any) => 
          ['office', 'villa', 'showroom', 'residential', 'interior', 'fitout', 'fit-out'].some((kw: string) => 
            stand.location?.toLowerCase().includes(kw) || 
            stand.showName?.toLowerCase().includes(kw) ||
            stand.client?.toLowerCase().includes(kw)
          )
        )
      case 9: // Turnkey Architectural Projects
        return dbStands
      case 10: // Shell Scheme Upgradation
        return dbStands
      default:
        return dbStands
    }
  })()

  // Fallback to all dbStands if no specific matches found, ensuring screen is never empty
  const finalStandsToUse = filteredStands.length > 0 ? filteredStands : dbStands

  const combinedPortfolio = finalStandsToUse.map((stand: any) => ({
    title: stand.showName,
    area: `${stand.standArea} m²`,
    details: [
      `Client: ${stand.client}`,
      `Location: ${stand.location}`,
      ...(stand.typeOfStands || [])
    ].slice(0, 3),
    image: stand.images && stand.images.length > 0 ? stand.images[0].url : '',
    dbId: stand._id,
    isDb: true,
    originalIdx: 0
  }))

  const handlePortfolioScroll = (direction: 'left' | 'right') => {
    if (portfolioScrollRef.current) {
      const scrollAmount = 350
      portfolioScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleSendRequest = () => {
    navigate(`/contacts?service=${encodeURIComponent(service.title)}`)
  }

  return (
    <div className="bg-brand-bg text-brand-white min-h-screen">
      
      {/* SECTION 1: Split-Screen Hero Banner */}
      <section className="relative lg:h-[80vh] lg:min-h-[620px] grid grid-cols-1 lg:grid-cols-2 bg-white">
        
        {/* Left Side: Service Image */}
        <div className="relative h-[45rem] lg:h-full w-full overflow-hidden bg-brand-dark-accent">
          <img
            src={service.image}
            alt={service.title}
            className={`w-full h-full select-none ${
              activeIdx === 9
                ? 'object-contain'
                : 'object-cover'
            }`}
          />
          {/* Overlapping Border Divider Gradient */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/10 to-transparent pointer-events-none hidden lg:block" />
        </div>

        {/* Right Side: Breadcrumbs and Large Title (White Background) */}
        <div className="relative h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16 text-left select-none">
          {/* Breadcrumbs */}
          <nav className="font-circe font-light text-[1.5rem] text-brand-text-muted tracking-wide flex items-center gap-2.5 mb-8">
            <Link to="/" className="hover:text-brand-gold transition-colors duration-300">Home page</Link>
            <span className="opacity-40">/</span>
            <Link to="/services" className="hover:text-brand-gold transition-colors duration-300">Services</Link>
            <span className="opacity-40">/</span>
            <span className="text-brand-dark/80 font-normal">{service.title}</span>
          </nav>

          {/* Service Title */}
          <h1 className="font-urw font-extrabold text-[4.5rem] sm:text-[5.5rem] lg:text-[6.5rem] text-brand-dark leading-tight tracking-wide mb-12">
            {service.title}
          </h1>

          {/* Call to Action Button */}
          <button
            onClick={handleSendRequest}
            className="block bg-[#E51D1D] hover:bg-[#c81717] text-white font-urw font-bold text-[1.8rem] tracking-wider uppercase px-12 py-6 rounded-sm shadow-[0_15px_30px_rgba(229,29,29,0.35)] hover:scale-105 transition-all duration-300 cursor-pointer w-max"
          >
            Send Request <span className="font-light ml-2 text-[2rem] inline-block hover:translate-x-0.5 transition-transform">+</span>
          </button>

          {/* Bottom Right Label: BEX + CREO badge for Turnkey */}
          <div className="absolute right-12 bottom-12 text-right hidden sm:block">
            <span className="font-urw font-bold text-[2rem] tracking-[0.25em] text-brand-dark block uppercase">
              BEX —
            </span>
            <span className="font-circe font-light text-[1.3rem] tracking-[0.2em] text-brand-text-muted block mt-1 uppercase">
              Premium Execution Partner
            </span>
          </div>

          {/* CREO Sister Company Badge — only for Turnkey Architectural Projects */}
          {/* {activeIdx === 9 && (
            <div className="mt-10 flex items-center gap-4 p-5 rounded-sm bg-white/5 border border-brand-gold/30 backdrop-blur-sm w-max">
              {/* CREO Square icon mark */}
              {/* <div className="w-12 h-12 border-2 border-brand-gold flex items-center justify-center shrink-0">
                <span className="font-urw font-black text-[1.6rem] text-brand-gold leading-none">C</span>
              </div>
              <div className="text-left">
                <span className="font-urw font-extrabold text-[1.9rem] tracking-[0.12em] text-brand-dark uppercase leading-none block">
                  CREO
                </span>
                <span className="font-circe font-light text-[1.15rem] tracking-[0.18em] text-brand-text-muted uppercase block mt-0.5">
                  Construction Experts
                </span>
              </div>
              <div className="w-px h-10 bg-brand-gold/30 mx-2" />
              <span className="font-circe font-light text-[1.15rem] text-brand-text-muted italic leading-snug max-w-[16rem]">
                Sister company · India
              </span>
            </div>
          )} */ }
        </div>
      </section>

      {/* SECTION 2: Content Column + Sidebar */}
      <section className="py-32 bg-brand-bg relative z-10 border-t border-brand-white/5">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Detailed Service Text */}
            <div className="lg:col-span-8 flex flex-col gap-10 text-left">
              <p className="font-circe font-light text-[2.1rem] sm:text-[2.3rem] leading-relaxed text-brand-white/80">
                {service.p1}
              </p>
              <p className="font-circe font-light text-[2.1rem] sm:text-[2.3rem] leading-relaxed text-brand-text-muted">
                {service.p2}
              </p>
              <p className="font-circe font-light text-[2.1rem] sm:text-[2.3rem] leading-relaxed text-brand-text-muted">
                {service.p3}
              </p>
              
              {/* Special Social Links for Turnkey Architectural Projects (id = 9) */}
              {activeIdx === 9 && (
                <div className="mt-6 border-t border-brand-white/10 pt-6">
                  <span className="font-urw font-bold text-[2.2rem] text-brand-white uppercase tracking-wider block mb-6">
                    Connect With Us
                  </span>
                  <div className="flex gap-6">
                    <a 
                      href="https://www.instagram.com/creo_designs?igsh=MTdneWcwbjA2ZGMzbg==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-brand-text-muted hover:text-brand-gold transition-colors duration-300 group"
                    >
                      <div className="w-14 h-14 rounded-full border border-brand-white/10 group-hover:border-brand-gold/60 flex items-center justify-center bg-brand-white/5 transition-all duration-300">
                        <InstagramIcon className="w-6 h-6" />
                      </div>
                      <span className="font-euclid font-bold text-[1.6rem] tracking-wider uppercase">Instagram</span>
                    </a>
                    
                    <a 
                      href="https://www.facebook.com/share/15sF5vchXnp/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-brand-text-muted hover:text-brand-gold transition-colors duration-300 group"
                    >
                      <div className="w-14 h-14 rounded-full border border-brand-white/10 group-hover:border-brand-gold/60 flex items-center justify-center bg-brand-white/5 transition-all duration-300">
                        <FacebookIcon className="w-6 h-6" />
                      </div>
                      <span className="font-euclid font-bold text-[1.6rem] tracking-wider uppercase">Facebook</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Other Related Services Card Sidebar */}
            <div className="lg:col-span-4 flex flex-col items-start text-left w-full lg:sticky lg:top-36">
              {/* Heading */}
              <div className="w-full border-t border-brand-white/10 pt-6 mb-10">
                <span className="font-circe font-light text-[1.4rem] tracking-[0.25em] text-brand-gold uppercase block mb-1">Explore categories</span>
                <h3 className="font-urw font-bold text-[2.8rem] text-white uppercase tracking-wider">Related Services</h3>
              </div>

              {/* Related Cards List */}
              <div className="flex flex-col gap-8 w-full">
                {service.related.map((rel) => (
                  <Link
                    key={rel.idx}
                    to={`/services/detail?id=${rel.idx}`}
                    className="flex gap-6 p-5 rounded-sm bg-brand-dark-accent/40 border border-brand-white/5 hover:border-brand-gold/60 transition-all duration-300 group shadow-md"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-32 h-24 sm:w-36 sm:h-28 shrink-0 overflow-hidden rounded-xs border border-brand-white/5">
                      <img
                        src={serviceImages[rel.idx]}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                    </div>

                    {/* Meta details */}
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-urw font-bold text-[1.6rem] sm:text-[1.8rem] text-white group-hover:text-brand-gold transition-colors duration-300 leading-snug">
                          {rel.title}
                        </h4>
                        <p className="font-circe font-light text-[1.3rem] text-brand-text-muted leading-snug mt-2 line-clamp-2">
                          {rel.snippet}
                        </p>
                      </div>
                      <span className="font-euclid font-bold text-[1.2rem] tracking-wider uppercase text-brand-gold group-hover:text-white transition-colors duration-300 flex items-center gap-1.5 mt-2">
                        Learn more <ArrowUpRight className="w-4 h-4 text-[#E51D1D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Portfolio Category Items Showcase */}
      <section className="py-32 bg-brand-bg/50 border-t border-brand-white/5 relative z-10">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
          
          {/* Scroll Header Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 select-none">
            <div className="flex flex-col gap-2 text-left">
              <span className="font-circe font-light text-[1.4rem] tracking-[0.25em] text-brand-gold uppercase">Showcase</span>
              <h2 className="font-urw font-bold text-[4.5rem] sm:text-[5.5rem] text-white uppercase tracking-wider leading-none">Portfolio</h2>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => handlePortfolioScroll('left')}
                className="w-14 h-14 rounded-full border border-brand-white/20 hover:border-brand-gold hover:bg-brand-gold/15 text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => handlePortfolioScroll('right')}
                className="w-14 h-14 rounded-full border border-brand-white/20 hover:border-brand-gold hover:bg-brand-gold/15 text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Container */}
          <div
            ref={portfolioScrollRef}
            className="flex gap-10 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory scroll-smooth pt-4"
          >
            {combinedPortfolio.map((project, idx) => (
              <div
                key={project.isDb ? project.dbId : `static-${project.originalIdx}`}
                onClick={() => {
                  if (project.isDb && project.dbId) {
                    navigate(`/portfolio/detail?dbId=${project.dbId}`)
                  } else {
                    navigate(`/portfolio/detail?serviceId=${activeIdx}&projectId=${project.originalIdx}`)
                  }
                }}
                className="flex-shrink-0 w-[28rem] sm:w-[36rem] cursor-pointer group transition-all duration-500 ease-out snap-start hover:-translate-y-4 hover:scale-[1.02]"
              >
                {/* Project Image */}
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-sm border border-brand-white/10 group-hover:border-brand-gold/60 transition-all duration-500">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-108 transition-all duration-700 select-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-dark-accent text-brand-text-muted font-circe font-light text-[1.4rem]">
                      No Image
                    </div>
                  )}
                  {/* Dimension square badge */}
                  <div className="absolute bottom-5 left-5 bg-brand-dark/85 backdrop-blur-md border border-brand-white/10 px-5 py-3 rounded-xs font-urw font-bold text-[1.5rem] tracking-wide text-white select-none">
                    {project.area}
                  </div>
                  {/* Sheen flare hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                </div>
                
                {/* Specifications & Title */}
                <div className="flex justify-between items-start text-left">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-urw font-bold text-[2rem] sm:text-[2.3rem] text-white leading-tight mt-1 group-hover:text-brand-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    {/* Checklist spec tags */}
                    <div className="flex flex-col gap-1 mt-3">
                      {project.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 font-circe font-light text-[1.4rem] text-brand-text-muted leading-tight">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details Navigation Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (project.isDb && project.dbId) {
                        navigate(`/portfolio/detail?dbId=${project.dbId}`)
                      } else {
                        navigate(`/portfolio/detail?serviceId=${activeIdx}&projectId=${project.originalIdx}`)
                      }
                    }}
                    className="shrink-0 bg-[#E51D1D] hover:bg-[#c81717] text-white font-urw font-bold text-[1.3rem] tracking-wider uppercase px-6 py-3.5 rounded-sm transition-all duration-300 ease-out shadow-[0_5px_15px_rgba(229,29,29,0.25)] hover:scale-105 pointer-events-auto cursor-pointer flex items-center gap-1.5"
                    aria-label="View project details"
                  >
                    Details <ArrowUpRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



    </div>
  )
}

export default ServiceDetail
