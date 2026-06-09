import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from './components/Header'
import Hero from './components/About/Hero'
import StaggeredFeatures from './components/About/StaggeredFeatures'
import Mission from './components/About/Mission'
import ExecutiveProfile from './components/About/ExecutiveProfile'
import Certificates from './components/About/Certificates'
import Contact from './components/Contact'
import Services from './components/Services'
import ServiceDetail from './components/ServiceDetail'
import PortfolioDetail from './components/PortfolioDetail'
import Portfolio from './components/Portfolio'
import Home from './components/Home'
import Footer from './components/Footer'
import FAQ from './components/FAQ'
import Articles from './components/Articles'
import ArticleDetail from './components/ArticleDetail'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsConditions from './components/TermsConditions'
import AdminPortal from './components/Admin/AdminPortal'

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const HomeView: React.FC = () => {
  return (
    <>
      {/* Section 1 - Hero with inline counters */}
      <Hero />

      {/* Section 2 - Staggered Advantages Timeline ("By choosing BackDrops, you get") */}
      <StaggeredFeatures />

      {/* Section 2.5 - Our Main Mission */}
      <Mission />

      {/* Section 2.8 - Executive Profile Section */}
      <ExecutiveProfile />

      {/* Section 3 - Certificates Grid (Compliance, License) */}
      <Certificates />
    </>
  )
}

const queryClient = new QueryClient()

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

const GlobalSidebar: React.FC = () => (
  <div className="fixed right-0 top-[30%] z-50 bg-white py-20 px-6 flex-col gap-12 items-center shadow-[-5px_0_30px_rgba(0,0,0,0.18)] rounded-l-3xl border-y border-l border-gray-100 hidden md:flex w-28">
    {/* Telephone */}
    <a href="tel:+971552291691" className="relative group flex items-center justify-center">
      <div className="w-24 h-24 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      </div>
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
    </a>

    {/* Instagram */}
    <a href="https://www.instagram.com/_backdrops.ae?igsh=dGlwbWpqazFybXd3" target="_blank" rel="noopener noreferrer" className="relative group flex items-center justify-center">
      <div className="w-24 h-24 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
        <InstagramIcon className="w-12 h-12" />
      </div>
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
    </a>

    {/* WhatsApp */}
    <a href="https://wa.me/971552291691" target="_blank" rel="noopener noreferrer" className="relative group flex items-center justify-center">
      <div className="w-24 h-24 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
        <WhatsAppIcon className="w-12 h-12" />
      </div>
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
    </a>
  </div>
)

const AppContent: React.FC = () => {
  const location = useLocation()
  const isAdminPage = location.pathname.toLowerCase() === '/admin'

  return (
    <div className="relative min-h-screen bg-brand-bg font-sans antialiased text-brand-white overflow-hidden selection:bg-brand-gold selection:text-brand-dark">
      {/* Global Navigation Header */}
      {!isAdminPage && <Header />}

      {/* Global Sticky Sidebar — Phone, Instagram, WhatsApp */}
      {!isAdminPage && <GlobalSidebar />}

      {/* Main Sections */}
      <main className={!isAdminPage ? "pt-[75px]" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<HomeView />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/detail" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/detail" element={<PortfolioDetail />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/detail" element={<ArticleDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/admin" element={<AdminPortal />} />
        </Routes>
      </main>

      {/* Global Footer */}
      {!isAdminPage && <Footer />}
    </div>
  )
}

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
