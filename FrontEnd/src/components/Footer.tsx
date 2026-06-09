import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import BexLogo from './BexLogo'
import WhyChooseBexInfographic from './WhyChooseBexInfographic'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  const isAboutPage = location.pathname === '/about-us'
  const [isDividerHovered, setIsDividerHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_backdrops.ae?igsh=dGlwbWpqazFybXd3',
      icon: (
        <svg className="fill-current" viewBox="0 0 24 24" style={{ width: '2.5rem', height: '2.5rem' }}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg className="fill-current" viewBox="0 0 24 24" style={{ width: '2.5rem', height: '2.5rem' }}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'http://www.youtube.com/@BackdropsDXB',
      icon: (
        <svg className="fill-current" viewBox="0 0 24 24" style={{ width: '2.5rem', height: '2.5rem' }}>
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    }
  ]

  return (
    <footer className="text-brand-white pt-16 pb-12 relative overflow-hidden" id="footer" style={{ backgroundColor: '#000000' }}>
      


      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Collapsible About Content */}
        <AnimatePresence initial={false}>
          {isAboutPage && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-brand-white/10"
            >
              <div className="flex flex-col text-left py-12 select-text font-circe font-light text-[2rem] text-brand-text-muted leading-relaxed space-y-12 max-w-[120rem] mx-auto">
                {/* Intro block */}
                <div className="space-y-6">
                  <p>
                    <strong className="text-white font-bold">BEX</strong> is an international experiential execution partner specializing in the delivery of exhibitions, brand experiences, events, interiors, retail environments, and turnkey project solutions.
                  </p>
                  <p>
                    We collaborate with agencies, brands, event organizers, designers, and creative teams to transform ambitious concepts into exceptional real-world experiences. From exhibition stands and experiential activations to commercial interiors and branded environments, we provide the expertise, infrastructure, and execution capabilities required to bring ideas to life—anywhere they need to happen.
                  </p>
                  <p>
                    With a strong network of partners, skilled production teams, and proven project management systems, BEX delivers projects across the UAE, GCC, and international markets. Our role goes beyond construction and installation; we become an extension of our clients' teams, ensuring every detail is executed with precision, consistency, and excellence.
                  </p>
                  <p>
                    Whether supporting a global agency, an international brand, or a local organizer, we are committed to delivering experiences that engage audiences, elevate brands, and exceed expectations.
                  </p>
                </div>

                {/* Our Mission */}
                <div className="space-y-4">
                  <h3 className="font-urw font-bold text-[3rem] text-white tracking-wide uppercase">
                    Our Mission
                  </h3>
                  <p className="font-semibold text-white">
                    To be the most trusted execution partner for experiential projects worldwide.
                  </p>
                  <p>
                    We exist to help agencies, brands, and event professionals bring bold ideas to life through seamless execution, technical expertise, and unwavering commitment to quality. By combining creativity, craftsmanship, and operational excellence, we deliver environments and experiences that create meaningful connections between brands and their audiences.
                  </p>
                </div>

                {/* Why Choose BEX? */}
                <div className="space-y-8">
                  <h3 className="font-urw font-bold text-[3rem] text-white tracking-wide uppercase">
                    Why Choose BEX?
                  </h3>
                  
                  <WhyChooseBexInfographic />

                  <p className="pt-6 border-t border-brand-white/10 italic text-[2rem] text-brand-gold font-medium">
                    At BEX, we believe great ideas deserve exceptional execution. That is why agencies and brands trust us as their partner in delivering memorable experiences across borders, cultures, and markets.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Divider Line with Center Button (LEARN MORE + / —) */}
        {isAboutPage && (
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
        )}

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
                  className="font-euclid text-brand-white/70 hover:text-brand-gold transition-colors duration-300 relative py-2 group"
                  style={{ fontSize: '1.8rem', fontWeight: 400, letterSpacing: '0.05em' }}
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
          
          {/* Column 1 & 2: UAE Address & Contact */}
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-16 sm:gap-24">
            {/* Address */}
            <div>
              <span className="font-urw font-extrabold tracking-wider text-brand-white block mb-4 uppercase" style={{ fontSize: '1.8rem' }}>
                UAE Address
              </span>
              <p className="font-circe text-brand-text-muted leading-relaxed" style={{ fontSize: '1.6rem', fontWeight: 400 }}>
                Backdrops Technical Services L.L.C<br />
                Gate no.13, Warehouse no- 6<br />
                Jebel Ali Industrial area 1<br />
                Dubai- U.A.E
              </p>
            </div>
            
            {/* Contact */}
            <div>
              <span className="font-urw font-extrabold tracking-wider text-brand-white block mb-4 uppercase" style={{ fontSize: '1.8rem' }}>
                Contact
              </span>
              <a
                href="tel:00971552291691"
                className="font-circe text-brand-text-muted hover:text-brand-gold block mb-2 transition-colors duration-300"
                style={{ fontSize: '1.6rem', fontWeight: 400 }}
              >
                0097155 2291691
              </a>
              <a
                href="mailto:info@bexdxb.com"
                className="font-circe text-brand-text-muted hover:text-brand-gold block transition-colors duration-300"
                style={{ fontSize: '1.6rem', fontWeight: 400 }}
              >
                info@bexdxb.com
              </a>
            </div>
          </div>

          {/* Column 3: Legal Policy Links */}
          <div className="flex flex-col gap-2 md:items-end">
            <Link
              to="/privacy-policy"
              className="font-euclid font-normal text-brand-text-muted hover:text-brand-gold transition-colors duration-300"
              style={{ fontSize: '1.8rem' }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="font-euclid font-normal text-brand-text-muted hover:text-brand-gold transition-colors duration-300"
              style={{ fontSize: '1.8rem' }}
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Copy Line & Socials */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-brand-text-muted border-t border-brand-white/5 pt-12 gap-6" style={{ fontSize: '1.8rem', fontWeight: 400 }}>
          <p>&copy; {currentYear} BEX Backdrops. All rights reserved.</p>
          
          {/* Social Badges */}
          <div className="flex items-center gap-4">
            {socials.map((soc, idx) => (
              <a
                key={idx}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand-white/10 bg-brand-white/[0.02] flex items-center justify-center hover:border-brand-gold/50 hover:bg-brand-white/[0.05] hover:text-brand-gold hover:scale-110 transition-all duration-300"
                style={{ width: '5rem', height: '5rem' }}
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
