import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface CertificateProps {
  cert: { num: string; title: string; link: string }
  idx: number
}

const CertificateCard: React.FC<CertificateProps> = ({ cert, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: idx * 0.15 }}
      className="flex items-end gap-6 flex-1"
    >
      {/* Grey Card on Left */}
      <div className="bg-[#ECEEF2] flex-grow rounded-sm py-12 px-8 flex flex-col items-center justify-center min-h-[30rem] lg:min-h-[34rem] relative overflow-hidden group">
        
        {/* Shimmer sweep reflection on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer-sweep_3.5s_infinite_linear] pointer-events-none" />

        {/* Visual Certificate Illustration (White page, mint/cyan text representation) */}
        <div className="bg-white w-44 h-56 rounded-xs p-6 shadow-md border border-gray-100 flex flex-col gap-3.5 relative transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-1">
          {/* Header Line representation */}
          <div className="h-2 w-16 bg-[#98E2DB] rounded-full mt-2" />
          
          {/* Horizontal body line representations */}
          <div className="h-2.5 w-full bg-[#E5F7F5] rounded-full mt-2" />
          <div className="h-2.5 w-5/6 bg-[#E5F7F5] rounded-full" />
          <div className="h-2.5 w-11/12 bg-[#E5F7F5] rounded-full" />
          
          {/* Mint Circle Seal */}
          <div className="absolute bottom-6 right-6 w-7 h-7 rounded-full bg-[#98E2DB] opacity-90 shadow-sm" />
        </div>
        
        {/* Label Strip Overlay */}
        <div className="absolute bottom-8 left-6 right-6 bg-white/70 backdrop-blur-md border border-white/50 py-3.5 px-4 rounded-xs shadow-[0_4px_20px_-5px_rgba(0,0,0,0.15)] flex items-center justify-center">
          <span className="font-circe font-bold text-[2rem] text-[#141721] text-center leading-tight">
            {cert.title}
          </span>
        </div>
      </div>

      {/* Control Block on Right */}
      <div className="flex flex-col justify-between h-[30rem] lg:h-[34rem] py-2 shrink-0">
        {/* Number */}
        <span className="font-circe font-light text-[2.2rem] text-brand-text-muted">
          {cert.num}
        </span>
        
        {/* Action Button */}
        <a
          href={cert.link}
          className="w-14 h-14 bg-[#9E5330] hover:bg-[#b35e38] text-white flex items-center justify-center rounded-sm transition-all duration-300 shadow-[0_5px_15px_rgba(158,83,48,0.2)] hover:scale-110 cursor-pointer"
          aria-label={`View ${cert.title}`}
        >
          <ArrowUpRight className="w-7 h-7" strokeWidth={2.5} />
        </a>
      </div>
    </motion.div>
  )
}

const Certificates: React.FC = () => {
  const certs = [
    {
      num: "# 01",
      title: "Certificate of compliance",
      link: "#"
    },
    {
      num: "# 02",
      title: "Business License in UAE",
      link: "#"
    }
  ]

  return (
    <section className="py-32 bg-brand-bg relative overflow-hidden border-t border-brand-border/30">
      {/* Floating Glowing Ambient Orbs for depth */}
      <div className="absolute top-[20%] right-[-15%] w-[50rem] h-[50rem] rounded-full bg-brand-gold/[0.03] blur-[120px] pointer-events-none animate-float-orb" />
      
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Title */}
        <div className="mb-24 relative">
          <h2 className="font-urw font-extrabold text-[4.5rem] md:text-[5.5rem] text-brand-white uppercase tracking-wider">
            Certificates
          </h2>
          <div className="w-24 h-[2px] bg-brand-gold mt-6" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-[95rem]">
          {certs.map((cert, idx) => (
            <CertificateCard
              key={idx}
              cert={cert}
              idx={idx}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Certificates
