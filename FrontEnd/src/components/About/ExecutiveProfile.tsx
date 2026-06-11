import React from 'react'
import { motion } from 'framer-motion'
import founderImg from '../../assets/founder.png'
import ac1Img from '../../assets/ac1.png'
import ac2Img from '../../assets/ac2.png'

const ExecutiveProfile: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-brand-bg relative overflow-hidden border-t border-brand-border/30">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-[30%] right-[-10%] w-[50rem] h-[50rem] rounded-full bg-brand-gold/[0.03] blur-[130px] pointer-events-none animate-float-orb" />
      <div className="absolute bottom-[10%] left-[-10%] w-[45rem] h-[45rem] rounded-full bg-brand-gold/[0.02] blur-[120px] pointer-events-none animate-float-orb" style={{ animationDelay: '-5s' }} />

      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Executive Photo */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-[42rem] aspect-[3/4] rounded-sm overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Photo */}
              <img
                src={founderImg}
                alt="Nebeel Aboobacker"
                className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 group-hover:scale-103 transition-all duration-700 select-none"
              />
              
              {/* Gold border frame overlay effect on hover */}
              <div className="absolute inset-0 border border-brand-gold/0 group-hover:border-brand-gold/30 transition-colors duration-500 pointer-events-none" />
              
              {/* Soft decorative shadow frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-brand-gold/15 pointer-events-none -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            </div>
          </motion.div>

          {/* Right Column: Bio & Message */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-10"
          >
            {/* Title / Header */}
            <div>
              <span className="font-circe font-semibold text-[2rem] md:text-[2.5rem] tracking-[0.2em] text-brand-gold block mb-2">
                Executive Profile
              </span>
              <h2 className="font-urw font-extrabold text-h2 text-white leading-tight tracking-wide">
                Nebeel Aboobacker
              </h2>
              <span className="font-circe font-semibold text-[2rem] md:text-[2.5rem] tracking-[0.2em] text-brand-gold mt-1 block">
                Founder & CEO
              </span>
            </div>

            {/* Biography Description */}
            <div className="space-y-6 text-[1.8rem] md:text-[2.3rem] font-circe font-light text-brand-text-muted leading-relaxed">
              <p>
                Nebeel Aboobacker is the Founder and CEO of BEX, a leading experiential solutions company specializing in exhibitions, interiors, branding, and turnkey project delivery across the UAE, GCC, and international markets.
              </p>
              <p>
                With over two decades of industry experience, he has successfully led the delivery of high-impact projects for multinational corporations, international agencies, government entities, and global brands. Recognized for his strategic leadership, client-focused approach, and commitment to excellence, Nebeel has built a reputation for transforming ideas into engaging environments and memorable brand experiences.
              </p>
              <p>
                Under his leadership, BEX has become a trusted partner known for creativity, precision, reliability, and seamless execution. By integrating innovation, technology, and design-driven thinking, he continues to deliver solutions that create meaningful engagement and measurable value for clients.
              </p>
              <p>
                Driven by a global vision, Nebeel is focused on expanding BEX's international presence and establishing the company as a preferred partner for brands and agencies worldwide. His mission is to create transformative experiences that inspire audiences, strengthen brands, and set new benchmarks for excellence across industries and markets.
              </p>
            </div>

            {/* Founder's Message Quote Block */}
            <div className="w-full bg-brand-dark-accent/30 border-l-[3px] border-brand-gold p-8 rounded-r-xs space-y-4 shadow-inner">
              <span className="font-urw font-bold text-[1.8rem] tracking-wider text-brand-gold block">
                Founder's Message
              </span>
              <p className="font-circe font-light text-[1.8rem] md:text-[2.3rem] text-white/90 italic leading-relaxed">
                "At BEX, we believe great experiences have the power to connect people, elevate brands, and create lasting impact. Our commitment is to deliver innovative solutions, exceptional quality, and meaningful value for our clients and partners worldwide. As we grow globally, we remain focused on pushing boundaries, embracing innovation, and creating experiences that inspire confidence, engagement, and success."
              </p>
            </div>

          </motion.div>

        </div>

        {/* Industry Recognition Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 pt-16 border-t border-brand-gold/10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            

             <span className="font-circe font-semibold text-[2rem] md:text-[2.5rem] tracking-[0.2em] text-brand-gold mt-1 block">
               Industry Recognition
              </span>
            <h3 className="font-urw font-extrabold text-h2 text-white leading-tight uppercase tracking-wide">
              Gulfood Innovation Awards 2018
            </h3>
            <p className="font-circe font-light text-[1.8rem] md:text-[2.3rem] text-brand-text-muted leading-relaxed">
              As Project Manager, Nebeel Aboobacker led the successful delivery and execution of the exhibition stand that earned the <strong className="text-white font-normal">Best Trade Stand (41–100 sqm)</strong> accolade at the Gulfood Innovation Awards 2018. This achievement highlights his ability to deliver exceptional exhibition environments that combine creativity, precision, and flawless execution.
            </p>
            <p className="font-circe font-light text-[1.8rem] md:text-[2.3rem] text-brand-text-muted leading-relaxed">
              The award stands as a testament to his dedication to excellence and his proven capability to manage high-profile projects that create lasting brand impact.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative group overflow-hidden rounded-sm border border-brand-gold/20 shadow-2xl flex-1">
              <img src={ac1Img} alt="Gulfood Award 1" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-colors duration-500 pointer-events-none" />
            </div>
            <div className="relative group overflow-hidden rounded-sm border border-brand-gold/20 shadow-2xl flex-1">
              <img src={ac2Img} alt="Gulfood Award 2" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-colors duration-500 pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  )
}

export default ExecutiveProfile
