import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// Dynamic interactive Certificate Card wrapper with 3D-tilt
interface CardProps {
  cert: { num: string; title: string; link: string }
  idx: number
  CertificateSVG: React.FC
}

const CertificateCard: React.FC<CardProps> = ({ cert, idx, CertificateSVG }) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    // Calculate rotation degree (max 10 degrees tilt)
    const factor = 10
    setRotateX(-y / rect.height * factor)
    setRotateY(x / rect.width * factor)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: idx * 0.15 }}
      className="flex items-stretch group"
      style={{ perspective: 1000 }}
    >
      {/* Main Card (Left Block - silver-white metallic gradient) */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
          transition: isHovered ? 'transform 0.05s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="bg-gradient-to-br from-brand-white via-[#F5F6FA] to-[#ECEEF5] border border-brand-white/80 p-10 flex-grow rounded-l-sm flex flex-col items-center justify-between gap-12 min-h-[44rem] shadow-xl group-hover:shadow-[0_25px_50px_-15px_rgba(212,175,55,0.22)] transition-shadow duration-300 relative overflow-hidden"
      >
        {/* Shimmer sweep reflection on card hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer-sweep_3.5s_infinite_linear] pointer-events-none" />

        {/* Visual Certificate Illustration */}
        <div className="flex-grow flex items-center justify-center">
          <CertificateSVG />
        </div>
        
        {/* Title */}
        <div className="w-full relative z-10">
          <span className="font-euclid font-bold text-[1.4rem] text-[#888888] mb-2 block">
            {cert.num}
          </span>
          <h3 className="font-urw font-bold text-[2.2rem] text-brand-dark leading-tight tracking-tight">
            {cert.title}
          </h3>
        </div>
      </div>

      {/* Action Button (Right Block) */}
      <a
        href={cert.link}
        className="bg-brand-gold hover:bg-brand-white text-brand-dark px-8 flex items-center justify-center rounded-r-sm transition-all duration-300 border-l border-brand-bg/5 hover:shadow-[5px_25px_50px_-15px_rgba(212,175,55,0.22)]"
        aria-label="View Certificate"
      >
        <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform duration-300" strokeWidth={2.5} />
      </a>

    </motion.div>
  )
}

const Certificates: React.FC = () => {
  const certs = [
    {
      num: "# 01",
      title: "Certificate of compliance ISO 9001:2015",
      link: "#"
    },
    {
      num: "# 02",
      title: "Business License in UAE",
      link: "#"
    },
    {
      num: "# 03",
      title: "IFES membership badge",
      link: "#"
    }
  ]

  // Beautiful SVG representing a certificate document
  const CertificateSVG = () => (
    <svg
      className="w-48 h-64 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2 bg-brand-white p-4 border-2 border-brand-gold/25 rounded-xs"
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Decorative Border */}
      <rect x="3" y="3" width="94" height="134" rx="2" fill="white" stroke="#D4AF37" strokeWidth="1.5" />
      <rect x="6" y="6" width="88" height="128" rx="1" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 1" />
      
      {/* Heading Details */}
      <path d="M35 25 H65" stroke="#141721" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 32 H58" stroke="#141721" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Text lines */}
      <path d="M20 50 H80" stroke="#A0A5B5" strokeWidth="1" />
      <path d="M20 60 H80" stroke="#A0A5B5" strokeWidth="1" />
      <path d="M25 70 H75" stroke="#A0A5B5" strokeWidth="1" />
      <path d="M30 80 H70" stroke="#A0A5B5" strokeWidth="1" strokeDasharray="3 1" />
      <path d="M20 90 H80" stroke="#A0A5B5" strokeWidth="1" />
      
      {/* Gold Seal / Badge (animated floating ribbon) */}
      <g className="animate-float-badge origin-center">
        <circle cx="50" cy="112" r="10" fill="#D4AF37" opacity="0.9" />
        <polygon points="50,112 46,128 54,128" fill="#D4AF37" />
        <polygon points="50,112 43,124 57,124" fill="#D4AF37" />
        <circle cx="50" cy="112" r="6" fill="white" />
      </g>
    </svg>
  )

  return (
    <section className="py-32 bg-brand-bg relative overflow-hidden border-t border-brand-border/30">
      {/* Floating Glowing Ambient Orbs for depth */}
      <div className="absolute top-[20%] right-[-15%] w-[50rem] h-[50rem] rounded-full bg-brand-gold/[0.03] blur-[120px] pointer-events-none animate-float-orb" />
      
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Title */}
        <div className="mb-24 relative">
          <h2 className="font-urw font-extrabold text-[4.5rem] md:text-[6rem] text-brand-white tracking-wide">
            Certificates
          </h2>
          <div className="w-24 h-[2px] bg-brand-gold mt-6" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {certs.map((cert, idx) => (
            <CertificateCard
              key={idx}
              cert={cert}
              idx={idx}
              CertificateSVG={CertificateSVG}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Certificates
