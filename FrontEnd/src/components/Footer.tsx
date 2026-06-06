import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import BexLogo from './BexLogo'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const [isDividerHovered, setIsDividerHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_backdrops.ae?igsh=dGlwbWpqazFybXd3',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'http://www.youtube.com/@BackdropsDXB',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    }
  ]

  return (
    <footer className="bg-brand-bg text-brand-white pt-16 pb-12 relative overflow-hidden" id="footer">
      
      {/* WhatsApp Floating Widget with Pulsing Green Rings */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
        {/* Pulsing rings at different delay intervals */}
        <div className="absolute w-20 h-20 rounded-full bg-[#25D366] animate-pulse-ring pointer-events-none" style={{ animationDelay: '0s' }} />
        <div className="absolute w-24 h-24 rounded-full bg-[#25D366] animate-pulse-ring pointer-events-none" style={{ animationDelay: '0.8s' }} />
        
        <a
          href="https://wa.me/971552291691"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20ba5a] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group cursor-pointer"
          aria-label="Contact on WhatsApp"
        >
          <svg className="w-9 h-9 text-brand-white fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C16.255 1.876 13.779 1.042 11.14 1.04 5.707 1.04 1.282 5.461 1.277 10.899c-.001 1.816.486 3.594 1.417 5.158l-.979 3.57 3.655-.959c1.506.82 3.1 1.249 4.677 1.25zM17.5 13.9c-.3-.15-1.785-.88-2.087-.99-.3-.105-.52-.15-.74.15-.22.3-.85.99-1.04 1.2-.19.21-.38.24-.68.09-.3-.15-1.265-.465-2.41-1.485-.89-.79-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.135.3-.35.45-.52.15-.17.2-.28.3-.47.1-.19.05-.36-.02-.51-.07-.15-.74-1.785-1.015-2.445-.27-.65-.545-.56-.74-.57-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73s1.18 3.17 1.34 3.39c.17.22 2.32 3.54 5.62 4.97.785.34 1.395.54 1.87.69.79.25 1.51.21 2.08.13.635-.09 1.785-.73 2.035-1.43.25-.7.25-1.3.175-1.43-.075-.1-.275-.15-.575-.3z"/>
          </svg>
        </a>
      </div>

      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Collapsible About Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-brand-white/10"
            >
              <div className="flex flex-col text-left py-12 select-text font-circe font-light text-[2rem] text-brand-text-muted leading-relaxed space-y-10 max-w-[120rem] mx-auto">
                {/* Intro block */}
                <p>
                  <strong className="text-white font-bold">BackDrops</strong> is a full-service event agency specializing in the creation and management of temporary construction projects. Since 2019, we have been providing a wide range of services for the production of exclusive exhibition stands, using innovative technologies and following trends in the exhibition industry. Our team has successful experience working not only with UAE projects, but also with foreign projects in more than 15 countries around the world. Thanks to the competencies of our specialists, we are improving every year, expanding our capabilities and expanding the list of countries in which we implement our projects.
                </p>

                {/* The main mission */}
                <div className="space-y-4">
                  <h3 className="font-urw font-bold text-[3rem] text-white tracking-wide">
                    The main mission
                  </h3>
                  <p>
                    To help clients effectively and efficiently present their company and products at the event. Our company’s guiding principle is to ensure that every project we create meets your individual needs. Our team responsibly accompanies you at every stage of implementation, which allows you to comprehensively control this process.
                  </p>
                </div>

                {/* Why choose us? */}
                <div className="space-y-4">
                  <h3 className="font-urw font-bold text-[3rem] text-white tracking-wide">
                    Why choose us?
                  </h3>
                  <p>
                    We have many years of experience in creating and implementing projects for various types of events.
                  </p>
                  <p>
                    By choosing our company, you get high-quality construction, work with a professional team of our specialists, strict adherence to deadlines and the opportunity to successfully present your company at the event. We are also ready to help you achieve your business goals. Our team of highly qualified specialists is always happy to implement your ideas and create a stand that will reflect the main concept of your company. The key to a successful exhibition event is well-planned work and responsibility for the result, which you will receive by choosing BackDrops.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Divider Line with Center Button (LEARN MORE + / —) */}
        <div className="relative flex items-center justify-center mb-24 mt-8">
          <div className={`absolute left-0 w-[calc(50%-12rem)] h-[1px] transition-all duration-500 origin-right ${
            isDividerHovered ? 'bg-gradient-to-r from-transparent to-brand-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'bg-brand-white/10'
          }`} />
          <div className={`absolute right-0 w-[calc(50%-12rem)] h-[1px] transition-all duration-500 origin-left ${
            isDividerHovered ? 'bg-gradient-to-l from-transparent to-brand-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'bg-brand-white/10'
          }`} />
          <button
            onMouseEnter={() => setIsDividerHovered(true)}
            onMouseLeave={() => setIsDividerHovered(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative z-10 px-12 py-5 bg-brand-bg border border-brand-white/10 hover:border-brand-gold hover:text-brand-gold transition-all duration-300 font-euclid font-bold text-[1.8rem] uppercase tracking-wider flex items-center gap-3 rounded-xs cursor-pointer hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] group"
          >
            Learn More <span className="text-brand-gold font-light transition-transform duration-300">{isExpanded ? '—' : '+'}</span>
          </button>
        </div>

        {/* Row 2: Logo, Navigation, and Action Button (SEND REQUEST +) */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-24">
          
          {/* Logo on the left */}
          {/* Logo on the left */}
          <Link to="/" className="flex items-center group py-1">
            <BexLogo scale={0.95} />
          </Link>

          {/* Navigation in the center */}
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {['Services', 'Portfolio', 'Articles', 'Contacts', 'FAQ'].map((link) => {
              const path = `/${link.toLowerCase()}`

              return (
                <Link
                  key={link}
                  to={path}
                  className="font-euclid font-bold text-[2.1rem] uppercase tracking-wider text-brand-white/70 hover:text-brand-gold transition-colors duration-300 relative py-2 group"
                >
                  {link}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              )
            })}
          </nav>

          {/* Gold button on the right */}
          <div>
            <Link
              to="/contacts"
              className="font-euclid font-bold text-[1.6rem] tracking-wider uppercase px-12 py-5 bg-brand-gold text-brand-dark hover:bg-brand-white hover:text-brand-dark transition-all duration-300 rounded-sm flex items-center gap-3 shadow-[0_15px_30px_rgba(212,175,55,0.15)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] group"
            >
              Send Request <span className="font-light text-xl group-hover:translate-x-1 transition-transform duration-300">+</span>
            </Link>
          </div>

        </div>
         {/* Bottom Details Grid (Structured) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-brand-white/10 pt-16 mb-16">
          
          {/* Column 1: Office Address info */}
          <div className="space-y-6">
            <div>
              <span className="font-urw font-extrabold text-[2.2rem] md:text-[2.4rem] tracking-wider text-brand-white block mb-2">
                Backdrops Technical Services L.L.C
              </span>
              <p className="font-circe font-light text-[1.8rem] text-brand-text-muted leading-relaxed">
                Warehouse no- 6, Gate no.13<br />
                Jebel Ali Industrial area 1<br />
                Dubai - U.A.E
              </p>
              <a
                href="tel:+971552291691"
                className="font-circe font-light text-[1.8rem] text-brand-gold hover:text-brand-white block mt-2 transition-colors duration-300"
              >
                +971 55 229 1691
              </a>
            </div>
            <div className="pt-6 border-t border-brand-white/10">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="font-urw font-extrabold text-[2.2rem] md:text-[2.4rem] tracking-wider text-brand-white">
                  CREO Construction Experts
                </span>
                <a
                  href="https://www.instagram.com/creo_designs?igsh=Nno4YWgxdWx4M3Jw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-text-muted hover:text-[#d4af37] transition-all duration-300 hover:scale-110 flex items-center justify-center w-10 h-10 rounded-full bg-brand-white/5 hover:bg-brand-white/10 flex-shrink-0"
                  aria-label="Creo Designs Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
              <p className="font-circe font-light text-[1.8rem] text-brand-text-muted leading-relaxed">
                Arullil Arcade, Pazhuvil<br />
                Near Chazhur panchayath office<br />
                Thrissur Dt., Kerala - INDIA
              </p>
              <a
                href="tel:+919605218618"
                className="font-circe font-light text-[1.8rem] text-brand-gold hover:text-brand-white block mt-2 transition-colors duration-300"
              >
                +91 9605 218618
              </a>
            </div>
          </div>

          {/* Column 2: Contacts info */}
          <div>
            <span className="font-urw font-extrabold text-[2.2rem] md:text-[2.4rem] tracking-wider text-brand-white block mb-4">
              Contacts
            </span>
            <a
              href="tel:+971552291691"
              className="font-circe font-light text-[1.8rem] md:text-[2rem] text-brand-white hover:text-brand-gold block mb-2 transition-colors duration-300"
            >
              +971 55 229 1691
            </a>
            <a
              href="tel:+919605218618"
              className="font-circe font-light text-[1.8rem] md:text-[2rem] text-brand-white hover:text-brand-gold block mb-2 transition-colors duration-300"
            >
              +91 9605 218618
            </a>
            <a
              href="mailto:info@backdrops.ae"
              className="font-circe font-light text-[1.8rem] md:text-[2rem] text-brand-white hover:text-brand-gold block transition-colors duration-300"
            >
              info@backdrops.ae
            </a>
          </div>

          {/* Column 3: Legal Policy Links */}
          <div className="flex flex-col gap-2 md:items-end">
            <Link
              to="/privacy-policy"
              className="font-euclid font-normal text-[1.8rem] md:text-[2rem] text-brand-text-muted hover:text-brand-gold transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="font-euclid font-normal text-[1.8rem] md:text-[2rem] text-brand-text-muted hover:text-brand-gold transition-colors duration-300"
            >
              Terms & Conditions
            </Link>
          </div>

        </div>

        {/* Copy Line & Socials */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-brand-text-muted text-[2rem] border-t border-brand-white/5 pt-12 gap-6">
          <p>&copy; {currentYear} BEX Backdrops. All rights reserved.</p>
          
          {/* Social Badges */}
          <div className="flex items-center gap-4">
            {socials.map((soc, idx) => (
              <a
                key={idx}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-brand-white/10 bg-brand-white/[0.02] flex items-center justify-center hover:border-brand-gold/50 hover:bg-brand-white/[0.05] hover:text-brand-gold hover:scale-110 transition-all duration-300"
                aria-label={soc.name}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
