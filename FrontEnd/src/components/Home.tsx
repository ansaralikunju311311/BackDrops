import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

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

const Home: React.FC = () => {
  const navigate = useNavigate()

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

    </div>
  )
}

export default Home
