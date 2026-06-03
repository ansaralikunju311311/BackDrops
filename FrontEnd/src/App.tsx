import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/About/Hero'
import StaggeredFeatures from './components/About/StaggeredFeatures'
import Mission from './components/About/Mission'
import Certificates from './components/About/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'

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

      {/* Section 3 - Certificates Grid (Compliance, License) */}
      <Certificates />
    </>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-brand-bg font-sans antialiased text-brand-white overflow-hidden selection:bg-brand-gold selection:text-brand-dark">
        {/* Global Navigation Header */}
        <Header />

        {/* Main Sections */}
        <main>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/contacts" element={<Contact />} />
          </Routes>
        </main>

        {/* Global Footer with WhatsApp Widget */}
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
