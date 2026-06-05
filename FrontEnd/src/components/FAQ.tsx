import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, HelpCircle, ArrowRight } from 'lucide-react'

interface FAQItem {
  id: string;
  number: string;
  question: string;
  shortAnswer: string;
  fullAnswer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    number: '01',
    question: 'What services does BEX offer?',
    shortAnswer: 'BEX delivers end-to-end solutions for exhibitions, events, interiors, fit-outs, signage, branding, AV systems, and custom fabrication under one roof.',
    fullAnswer: 'BEX delivers end-to-end solutions for exhibitions, events, interiors, fit-outs, signage, branding, audio-visual systems, digital experiences, custom fabrication, and asset management. From concept development to final execution, we provide everything under one roof.'
  },
  {
    id: '2',
    number: '02',
    question: 'Can BEX manage an entire project from design to completion?',
    shortAnswer: 'Yes. Our turnkey services cover consultation, design, 3D visualization, engineering, fabrication, production, logistics, installation, project management, and dismantling.',
    fullAnswer: 'Yes. Our turnkey services cover consultation, design, 3D visualization, engineering, fabrication, production, logistics, installation, project management, on-site support, dismantling, and post-project services.'
  },
  {
    id: '3',
    number: '03',
    question: 'What types of exhibition and event solutions do you provide?',
    shortAnswer: 'We design and build custom exhibition stands, modular displays, pavilions, event stages, conference setups, brand activation spaces, and roadshows.',
    fullAnswer: 'We design and build custom exhibition stands, modular displays, pavilions, event stages, conference setups, product launch environments, brand activation spaces, roadshows, and promotional displays tailored to your objectives.'
  },
  {
    id: '4',
    number: '04',
    question: 'Does BEX provide complete event management services?',
    shortAnswer: 'Absolutely. We manage event planning, venue branding, production, logistics, registration areas, AV systems, visitor experiences, and on-site execution.',
    fullAnswer: 'Absolutely. We manage event planning, concept creation, venue branding, production, logistics, supplier coordination, registration areas, AV systems, stage setups, visitor experiences, and on-site event execution.'
  },
  {
    id: '5',
    number: '05',
    question: 'What interior design and fit-out services do you offer?',
    shortAnswer: 'Our solutions include office fit-outs, retail stores, showrooms, commercial spaces, reception areas, customer experience centers, and hospitality environments.',
    fullAnswer: 'Our interior solutions include office fit-outs, retail stores, showrooms, commercial spaces, reception areas, customer experience centers, and hospitality environments. We combine functionality, aesthetics, and branding to create inspiring spaces.'
  },
  {
    id: '6',
    number: '06',
    question: 'Can BEX design offices that reflect our company culture and brand?',
    shortAnswer: 'Yes. We create workspaces that align with your company\'s values, workflow, brand identity, and future growth plans to boost productivity and engagement.',
    fullAnswer: 'Yes. We create workspaces that align with your company\'s values, workflow, brand identity, and future growth plans, resulting in productive and engaging environments for employees and visitors.'
  },
  {
    id: '7',
    number: '07',
    question: 'Do you design retail stores and showrooms?',
    shortAnswer: 'Yes. We create customer-focused retail and showroom environments that improve product visibility, enhance brand storytelling, and encourage customer engagement.',
    fullAnswer: 'Yes. We create customer-focused retail and showroom environments that improve product visibility, enhance brand storytelling, and encourage customer engagement through thoughtful layouts and display solutions.'
  },
  {
    id: '8',
    number: '08',
    question: 'What signage solutions does BEX provide?',
    shortAnswer: 'We design, manufacture, and install indoor/outdoor signage, illuminated signs, LED displays, wayfinding systems, retail branding, vehicle graphics, and digital signage.',
    fullAnswer: 'We design, manufacture, and install indoor and outdoor signage, illuminated signs, LED displays, wayfinding systems, retail branding, office branding, vehicle graphics, digital signage, and custom architectural signs.'
  },
  {
    id: '9',
    number: '09',
    question: 'What materials are used in your projects?',
    shortAnswer: 'We utilize high-quality materials including wood, MDF, plywood, acrylic, aluminum, steel, glass, composite panels, fabrics, modular systems, and premium graphics.',
    fullAnswer: 'We utilize high-quality materials including wood, MDF, plywood, acrylic, aluminum, steel, glass, composite panels, fabrics, modular systems, specialty finishes, and premium graphics materials selected to suit each project\'s requirements.'
  },
  {
    id: '10',
    number: '10',
    question: 'Do you offer sustainable and reusable solutions?',
    shortAnswer: 'Yes. We actively promote sustainability through reusable exhibition systems, recyclable materials, modular structures, and energy-efficient lighting.',
    fullAnswer: 'Yes. We actively promote sustainability through reusable exhibition systems, recyclable materials, modular structures, energy-efficient lighting, and environmentally responsible production methods.'
  },
  {
    id: '11',
    number: '11',
    question: 'What technology does BEX use in design and production?',
    shortAnswer: 'Our team utilizes advanced 3D rendering, CAD drafting, CNC machining, laser cutting, digital printing, engineering software, and project management tools.',
    fullAnswer: 'Our team utilizes advanced 3D rendering, CAD drafting, CNC machining, laser cutting, digital printing, engineering software, and project management technologies to ensure precision, efficiency, and quality.'
  },
  {
    id: '12',
    number: '12',
    question: 'Does BEX provide audio-visual and digital solutions?',
    shortAnswer: 'Absolutely. We offer LED video walls, digital signage, touchscreens, interactive kiosks, sound systems, projection systems, and multimedia integration.',
    fullAnswer: 'Absolutely. We offer LED video walls, digital signage, touchscreens, interactive kiosks, sound systems, projection systems, video conferencing solutions, presentation technologies, and multimedia integration.'
  },
  {
    id: '13',
    number: '13',
    question: 'Can technology be integrated into exhibitions, offices, and retail spaces?',
    shortAnswer: 'Yes. We incorporate smart technologies such as interactive displays, visitor engagement tools, digital directories, and smart meeting room solutions.',
    fullAnswer: 'Yes. We incorporate smart technologies such as interactive displays, visitor engagement tools, digital directories, smart meeting room solutions, QR-based experiences, and branded digital content platforms.'
  },
  {
    id: '14',
    number: '14',
    question: 'How does BEX ensure project quality?',
    shortAnswer: 'From material selection and engineering to fabrication, finishing, and installation, every project undergoes strict quality control procedures.',
    fullAnswer: 'Quality is embedded throughout our process. From material selection and engineering to fabrication, finishing, and installation, every project undergoes strict quality control procedures to ensure exceptional results.'
  },
  {
    id: '15',
    number: '15',
    question: 'How do you ensure projects are completed on time?',
    shortAnswer: 'Our experienced project managers oversee planning, scheduling, procurement, production, logistics, and installation to ensure milestones are met on time.',
    fullAnswer: 'Our experienced project managers oversee planning, scheduling, procurement, production, logistics, and installation, ensuring every milestone is delivered efficiently and within agreed timelines.'
  },
  {
    id: '16',
    number: '16',
    question: 'Does BEX undertake projects outside the UAE?',
    shortAnswer: 'Yes. We support clients across the UAE, GCC region, and international markets through effective project management and logistics coordination.',
    fullAnswer: 'Yes. We support clients across the UAE, GCC region, and international markets through effective project management, logistics coordination, and installation support.'
  },
  {
    id: '17',
    number: '17',
    question: 'Do you offer storage and asset management services?',
    shortAnswer: 'Yes. We provide secure storage facilities for exhibition stands, branding materials, furniture, promotional items, and event assets.',
    fullAnswer: 'Yes. We provide secure storage facilities for exhibition stands, branding materials, furniture, promotional items, graphics, and event assets, helping clients protect and reuse their investments.'
  },
  {
    id: '18',
    number: '18',
    question: 'Can existing exhibition stands and displays be refurbished or reused?',
    shortAnswer: 'Certainly. We can refurbish, rebrand, modify, upgrade, and reconfigure existing assets to suit new events and campaigns.',
    fullAnswer: 'Certainly. We can refurbish, rebrand, modify, upgrade, and reconfigure existing assets to suit new events, venues, campaigns, and business objectives, maximizing return on investment.'
  },
  {
    id: '19',
    number: '19',
    question: 'What makes BEX different from other service providers?',
    shortAnswer: 'BEX combines creativity, technical expertise, manufacturing capabilities, project management, AV integration, and event execution under one roof.',
    fullAnswer: 'BEX combines creativity, technical expertise, manufacturing capabilities, project management, AV integration, and event execution under one roof. This streamlined approach ensures consistency, efficiency, and exceptional client experiences.'
  },
  {
    id: '20',
    number: '20',
    question: 'Why should I choose BEX for my next project?',
    shortAnswer: 'Because we create experiences. Whether it\'s a stand, commercial interior, retail space, or event, we deliver solutions that strengthen brands.',
    fullAnswer: 'Because we do more than build spaces—we create experiences. Whether it\'s an exhibition stand, commercial interior, retail environment, signage project, event, or digital activation, BEX delivers innovative solutions that strengthen brands, engage audiences, and produce measurable results.'
  }
]

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null)

  // Filter FAQs based on search input
  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.fullAnswer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 3D Card tilt mouse logic matching Home.tsx video cases
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xc = rect.width / 2
    const yc = rect.height / 2
    const rotateX = (yc - y) / 12
    const rotateY = (x - xc) / 12
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

    const glow = card.querySelector('.card-glow') as HTMLDivElement
    if (glow) {
      const px = (x / rect.width) * 100
      const py = (y / rect.height) * 100
      glow.style.background = `radial-gradient(circle 130px at ${px}% ${py}%, rgba(196,121,86,0.18), transparent)`
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
    <section id="faq" className="min-h-screen pt-44 pb-36 bg-[#0B0C10] relative z-10 overflow-hidden">
      
      {/* Visual Design Element: Diagonal Shards / Light Beams matching screenshot */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-[10%] w-[45rem] h-[150%] bg-gradient-to-b from-white/[0.03] to-transparent skew-x-[-22deg] origin-top blur-[2px]" />
        <div className="absolute top-0 right-[35%] w-[18rem] h-[150%] bg-gradient-to-b from-white/[0.015] to-transparent skew-x-[-22deg] origin-top blur-[4px]" />
        <div className="absolute top-0 right-[-15%] w-[30rem] h-[150%] bg-gradient-to-b from-white/[0.02] to-transparent skew-x-[-22deg] origin-top blur-[1px]" />
        <div className="absolute left-[33%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute left-[66%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
      </div>

      {/* Decorative vertical "FAQ" text on the far right */}
      <div className="absolute right-6 top-[15%] text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-urw font-black text-brand-white/[0.012] tracking-[0.1em] select-none pointer-events-none uppercase writing-mode-vertical" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
        FAQ
      </div>

      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Header and Search Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20">
          <div>
            <span className="font-circe font-light text-[1.4rem] tracking-[0.3em] text-brand-gold uppercase mb-4 block">
              Support Center
            </span>
            <h2 className="font-urw font-extrabold text-[4.5rem] sm:text-[5.5rem] lg:text-[6.5rem] text-white uppercase tracking-wider leading-none mb-4">
              FAQ
            </h2>
            <p className="font-circe font-light text-[1.6rem] sm:text-[1.8rem] text-brand-text-muted">
              Answering frequently asked questions
            </p>
          </div>

          {/* Premium Search Box */}
          <div className="relative w-full lg:max-w-[40rem] bg-brand-dark-accent/20 border border-white/[0.08] px-6 py-4 rounded-xl flex items-center gap-4 focus-within:border-brand-gold/50 focus-within:shadow-[0_0_20px_rgba(158,83,48,0.15)] transition-all duration-300">
            <Search className="w-6 h-6 text-brand-text-muted shrink-0" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-white font-circe text-[1.6rem] placeholder-brand-text-muted/60 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-brand-text-muted hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* FAQs Grid */}
        <AnimatePresence mode="popLayout">
          {filteredFAQs.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
            >
              {filteredFAQs.map((faq) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={faq.id}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setSelectedFAQ(faq)}
                  className="group relative min-h-[22rem] sm:min-h-[24rem] p-8 rounded-2xl bg-brand-dark-accent/20 border border-white/[0.03] hover:border-brand-gold/30 overflow-hidden cursor-pointer flex flex-col justify-between"
                  style={{
                    transition: 'transform 0.1s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.2)'
                  }}
                >
                  {/* Card Glow Layer */}
                  <div className="card-glow absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10" />

                  {/* Watermark Number in Background */}
                  <div className="absolute right-8 top-4 font-urw font-black text-[10rem] sm:text-[12rem] text-white/[0.02] group-hover:text-brand-gold/[0.04] transition-colors duration-500 select-none pointer-events-none leading-none z-0">
                    {faq.number}
                  </div>

                  {/* Top corner Icon */}
                  <div className="relative z-10 w-10 h-10 rounded-lg bg-white/[0.02] border border-white/[0.05] group-hover:border-brand-gold/25 group-hover:bg-brand-gold/[0.05] flex items-center justify-center transition-all duration-300 shrink-0">
                    <HelpCircle className="w-5 h-5 text-brand-text-muted group-hover:text-brand-gold transition-colors duration-300" />
                  </div>

                  {/* Interactive content wrapper */}
                  <div className="relative z-10 flex flex-col justify-end mt-12 w-full">
                    {/* Question */}
                    <h3 className="font-urw font-bold text-[1.8rem] sm:text-[2rem] text-white leading-snug group-hover:text-brand-gold transition-all duration-300 transform group-hover:-translate-y-4">
                      {faq.question}
                    </h3>

                    {/* Short Answer (fades in on hover) */}
                    <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 group-hover:translate-y-0">
                      <p className="font-circe font-light text-[1.4rem] text-brand-text-muted leading-relaxed mb-4">
                        {faq.shortAnswer}
                      </p>

                      {/* Learn More Button */}
                      <span className="inline-flex items-center gap-2 font-euclid font-bold text-[1.2rem] uppercase tracking-wider text-brand-gold hover:text-brand-white transition-colors duration-300">
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-brand-dark-accent/10 border border-white/[0.03] rounded-2xl"
            >
              <HelpCircle className="w-16 h-16 text-brand-text-muted/40 mx-auto mb-6" />
              <p className="font-circe font-light text-[1.8rem] text-brand-text-muted">
                No questions match your search query "{searchQuery}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* FAQ Details Modal Overlay */}
      <AnimatePresence>
        {selectedFAQ && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedFAQ(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-6 pointer-events-auto"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[70rem] p-10 sm:p-12 rounded-3xl bg-[#121214] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Gold/Clay Accent Highlight Bar */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-brand-gold to-brand-gold-light" />
              
              {/* Massive background number watermark inside the modal */}
              <div className="absolute right-10 bottom-6 font-urw font-black text-[16rem] text-white/[0.015] select-none pointer-events-none leading-none z-0">
                {selectedFAQ.number}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedFAQ(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/[0.03] hover:bg-[#E51D1D] text-white flex items-center justify-center border border-white/10 hover:border-transparent hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10">
                {/* FAQ Category / Number Badge */}
                <div className="inline-flex items-center gap-2 bg-brand-gold/[0.08] border border-brand-gold/20 px-4 py-2 rounded-lg font-mono font-bold text-brand-gold-light text-[1.4rem] mb-8">
                  <span>Question #{selectedFAQ.number}</span>
                </div>

                {/* Question Text */}
                <h3 className="font-urw font-extrabold text-[2.6rem] sm:text-[3rem] text-white leading-tight mb-8">
                  {selectedFAQ.question}
                </h3>

                {/* Divider */}
                <div className="w-16 h-[2px] bg-brand-gold mb-8 animate-draw-line" />

                {/* Detailed Answer Text */}
                <p className="font-circe font-light text-[1.8rem] sm:text-[2rem] text-brand-text-muted leading-relaxed select-text">
                  {selectedFAQ.fullAnswer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default FAQ
