import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import BexLogo from './BexLogo'
import HexagonTimeline from './HexagonTimeline'
import BexPurpose from './About/BexPurpose'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  const isAboutPage = location.pathname === '/about-us'

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
      url: 'https://www.linkedin.com/in/nebeel-backer-7009b42b1/',
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
    <footer className="text-brand-white pt-16 pb-12 relative overflow-hidden border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] z-20" id="footer" style={{ backgroundColor: '#000000' }}>
      


      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* About Content — always visible on About page */}
        {isAboutPage && (
          <div className="border-t border-brand-white/10 py-12">
            <div className="flex flex-col text-left select-text font-circe font-light text-[1.8rem] md:text-[2.3rem] text-white leading-relaxed space-y-12 max-w-[120rem] mx-auto">

              {/* Our Mission */}
              <div className="space-y-4">
                <h3 className="font-urw font-bold text-[3rem] text-white tracking-wide uppercase">
                  Our Mission
                </h3>
                <p className="font-semibold text-white">
                  To be the most trusted execution partner for experiential projects worldwide.
                </p>
                <p className="text-white">
                  We exist to help agencies, brands, and event professionals bring bold ideas to life through seamless execution, technical expertise, and unwavering commitment to quality. By combining creativity, craftsmanship, and operational excellence, we deliver environments and experiences that create meaningful connections between brands and their audiences.
                </p>
              </div>

              {/* BEX CORE VALUES */}
              <div className="mt-16 -mx-6 md:-mx-12 lg:-mx-24">
                <HexagonTimeline />
              </div>

              {/* THE BEX PURPOSE */}
              <div className="mt-4 mb-24 -mx-6 md:-mx-12 lg:-mx-24">
                <BexPurpose />
              </div>


            </div>
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
          <nav className="flex flex-wrap lg:flex-nowrap justify-center gap-x-6 xl:gap-x-10 gap-y-4 whitespace-nowrap">
            {['Services', 'Portfolio', 'Articles', 'Contacts', 'FAQ'].map((link) => {
              const path = `/${link.toLowerCase()}`

              return (
                <Link
                  key={link}
                  to={path}
                  className="font-euclid text-white hover:text-brand-gold transition-colors duration-300 relative py-2 group"
                  style={{ fontSize: '2.2rem', fontWeight: 400, letterSpacing: '0.05em' }}
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
              className="font-euclid font-bold tracking-wider uppercase px-8 py-4 bg-brand-gold text-brand-white hover:bg-brand-gold-light transition-all duration-300 rounded-sm flex items-center gap-3 shadow-[0_15px_30px_rgba(212,175,55,0.15)] hover:shadow-[0_20px_40px_rgba(196,121,86,0.3)] group"
              style={{ fontSize: '2.2rem' }}
            >
              Send Request <span className="font-light text-[2.4rem] group-hover:translate-x-1 transition-transform duration-300">+</span>
            </Link>
          </div>

        </div>
         {/* Bottom Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 border-t border-brand-white/10 pt-16 mb-16">

          {/* UAE Address */}
          <div className="md:col-span-3">
            <span className="font-urw font-extrabold tracking-wider text-brand-white block mb-4 uppercase" style={{ fontSize: '1.8rem' }}>
              UAE Address
            </span>
            <p className="font-circe text-white leading-relaxed" style={{ fontSize: '1.6rem', fontWeight: 400 }}>
              Backdrops Technical Services L.L.C<br />
              Gate no.13, Warehouse no- 6<br />
              Jebel Ali Industrial area 1<br />
              Dubai- U.A.E
            </p>
          </div>

          {/* Contact UAE */}
          <div className="md:col-span-2">
            <span className="font-urw font-extrabold tracking-wider text-brand-white block mb-4 uppercase" style={{ fontSize: '1.8rem' }}>
              Contact 
            </span>
            <a
              href="tel:00971552291691"
              className="font-circe text-white hover:text-brand-gold block mb-2 transition-colors duration-300"
              style={{ fontSize: '1.6rem', fontWeight: 400 }}
            >
              +971 55 2291691
            </a>
            <a
              href="tel:+971507613437"
              className="font-circe text-white hover:text-brand-gold block mb-2 transition-colors duration-300"
              style={{ fontSize: '1.6rem', fontWeight: 400 }}
            >
              +971 50 7613437
            </a>
            <a
              href="mailto:info@bexdxb.com"
              className="font-circe text-white hover:text-brand-gold block transition-colors duration-300"
              style={{ fontSize: '1.6rem', fontWeight: 400 }}
            >
              info@bexdxb.com
            </a>
          </div>

          {/* India Address */}
          <div className="md:col-span-3">
            <span className="font-urw font-extrabold tracking-wider text-brand-white block mb-4 uppercase" style={{ fontSize: '1.8rem' }}>
              India Address
            </span>
            <p className="font-circe text-white leading-relaxed" style={{ fontSize: '1.6rem', fontWeight: 400 }}>
              CREO Construction Experts<br />
              Arullil Arcade<br />
              Thrissur Dt.<br />
              Kerala- INDIA
            </p>
            <Link 
              to="/services/detail?id=9"
              className="mt-6 flex items-center gap-3 text-brand-gold hover:text-white transition-colors duration-300 group/link inline-flex"
            >
              <span className="font-euclid font-bold uppercase tracking-wider text-[1.3rem]">Explore CREO</span>
              <div className="w-8 h-8 rounded-full bg-[#E51D1D] flex items-center justify-center group-hover/link:bg-[#c81717] transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </Link>
          </div>

          {/* Contact India */}
          <div className="md:col-span-2">
            <span className="font-urw font-extrabold tracking-wider text-brand-white block mb-4 uppercase" style={{ fontSize: '1.8rem' }}>
              Contact 
            </span>
            <a
              href="tel:+919188866924"
              className="font-circe text-white hover:text-brand-gold block mb-2 transition-colors duration-300"
              style={{ fontSize: '1.6rem', fontWeight: 400 }}
            >
              +91 9188 866924
            </a>
            <a
              href="tel:+919605218618"
              className="font-circe text-white hover:text-brand-gold block transition-colors duration-300"
              style={{ fontSize: '1.6rem', fontWeight: 400 }}
            >
              +91 9605 218618
            </a>
          </div>

          {/* Legal Policy Links */}
          <div className="flex flex-col gap-2 md:col-span-2 md:items-end">
            <Link
              to="/privacy-policy"
              className="font-euclid font-normal text-white hover:text-brand-gold transition-colors duration-300"
              style={{ fontSize: '1.8rem' }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="font-euclid font-normal text-white hover:text-brand-gold transition-colors duration-300"
              style={{ fontSize: '1.8rem' }}
            >
              Terms &amp; Conditions
            </Link>
          </div>

        </div>



        {/* Copy Line & Socials */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-white border-t border-brand-white/5 pt-12 gap-6" style={{ fontSize: '1.8rem', fontWeight: 400 }}>
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
