import React from 'react'
import Header from './components/Header'
import Hero from './components/About/Hero'
import StaggeredFeatures from './components/About/StaggeredFeatures'
import Mission from './components/About/Mission'
import Certificates from './components/About/Certificates'
import Footer from './components/Footer'

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-brand-bg font-sans antialiased text-brand-white overflow-hidden selection:bg-brand-gold selection:text-brand-dark">
      {/* Global Navigation Header */}
      <Header />

      {/* Main Sections */}
      <main>
        {/* Section 1 - Hero with inline counters */}
        <Hero />

        {/* Section 2 - Staggered Advantages Timeline ("By choosing BackDrops, you get") */}
        <StaggeredFeatures />

        {/* Section 2.5 - Our Main Mission */}
        <Mission />

        {/* Section 3 - Certificates Grid (ISO, License, IFES Badge) */}
        <Certificates />
      </main>

      {/* Global Footer with WhatsApp Widget */}
      <Footer />
    </div>
  )
}

export default App
