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

const AppContent: React.FC = () => {
  const location = useLocation()
  const isAdminPage = location.pathname.toLowerCase() === '/admin'

  return (
    <div className="relative min-h-screen bg-brand-bg font-sans antialiased text-brand-white overflow-hidden selection:bg-brand-gold selection:text-brand-dark">
      {/* Global Navigation Header */}
      {!isAdminPage && <Header />}

      {/* Main Sections */}
      <main className={!isAdminPage ? "pt-[155px]" : ""}>
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

      {/* Global Footer with WhatsApp Widget */}
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
