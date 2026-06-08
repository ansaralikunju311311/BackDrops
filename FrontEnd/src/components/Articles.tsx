import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ARTICLES_DATA } from '../data/articlesData'

const Articles: React.FC = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(ARTICLES_DATA.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedArticles = ARTICLES_DATA.slice(startIndex, endIndex)

  // Smooth scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  return (
    <div className="bg-brand-bg text-brand-white min-h-screen relative overflow-hidden select-none pt-16 pb-32">
      {/* Decorative vertical grid lines (Architectural layout) */}
      <div className="absolute left-[33%] top-0 bottom-0 w-[1px] bg-white/[0.04] z-10 pointer-events-none hidden md:block" />
      <div className="absolute left-[66%] top-0 bottom-0 w-[1px] bg-white/[0.04] z-10 pointer-events-none hidden md:block" />

      {/* Slanted translucent sheet background for the top-right decoration */}
      <div className="absolute right-0 top-0 h-[80vh] w-[45%] bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none transform -skew-x-12 origin-top z-0" />
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[70vh] h-[70vh] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 relative z-20">
        {/* Page Title */}
        <div className="text-left mb-24">
          <nav className="font-circe font-light text-[1.5rem] text-brand-text-muted tracking-wide flex items-center gap-2.5 mb-6">
            <Link to="/" className="hover:text-brand-gold transition-colors duration-300">Home page</Link>
            <span className="opacity-40">/</span>
            <span className="text-white font-normal">Articles</span>
          </nav>
          
          <h1 className="font-urw font-extrabold text-[6rem] sm:text-[7.5rem] lg:text-[9rem] text-white uppercase tracking-wider leading-none">
            Articles
          </h1>
          <div className="w-24 h-[2px] bg-brand-gold mt-6 animate-draw-line" />
        </div>

        {/* Articles List */}
        <div className="flex flex-col gap-24">
          {paginatedArticles.map((article, index) => {
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative group grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-b border-white/5 pb-20 last:border-b-0 last:pb-0"
              >
                {/* Diagonal overlay highlights on hover (sleek geometric glow) */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0" />

                {/* Left Side: Article Image */}
                <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-sm overflow-hidden border border-white/5 group-hover:border-brand-gold/40 transition-colors duration-500 z-10">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover brightness-[0.75] group-hover:brightness-90 group-hover:scale-105 transition-all duration-700 select-none"
                  />
                  {/* Subtle graphic sheen flare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                </div>

                {/* Right Side: Article Text content */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full text-left relative z-10">
                  <div>
                    {/* Date and Author */}
                    <div className="flex items-center gap-4 font-circe font-light text-[1.4rem] text-brand-text-muted mb-4 uppercase tracking-wider">
                      <span>{article.date}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      <span>{article.author}</span>
                    </div>

                    {/* Title */}
                    <Link
                      to={`/articles/detail?id=${article.id}`}
                      className="inline-block font-urw font-extrabold text-[3.2rem] sm:text-[4rem] lg:text-[4.8rem] text-white uppercase leading-tight tracking-wider hover:text-brand-gold transition-colors duration-300 mb-6"
                    >
                      {article.title}
                    </Link>

                    {/* Subtitle / Intro */}
                    <p className="font-circe font-light text-[1.8rem] sm:text-[2rem] text-brand-gold font-medium mb-4 leading-normal">
                      {article.subtitle}
                    </p>

                    {/* Snippet / Excerpt */}
                    <p className="font-circe font-light text-[1.6rem] sm:text-[1.8rem] text-brand-text-muted leading-relaxed mb-8 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => navigate(`/articles/detail?id=${article.id}`)}
                      className="bg-brand-dark-accent/60 hover:bg-brand-gold hover:text-white transition-all duration-300 font-euclid font-bold tracking-wider text-[1.4rem] uppercase py-4 px-8 border border-white/5 hover:border-brand-gold rounded-xs cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.35)] flex items-center gap-3 group/btn hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                    >
                      Learn More
                      <span className="text-brand-gold group-hover/btn:text-white transition-colors duration-300 font-light">+</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-28 relative z-20">
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 ${
                currentPage === 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-brand-gold hover:border-brand-gold hover:scale-105 active:scale-95 cursor-pointer shadow-lg'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1
              const isActive = currentPage === pageNum
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-16 h-16 rounded-full font-euclid font-bold text-[1.8rem] transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-brand-gold border-brand-gold text-white shadow-[0_5px_15px_rgba(158,83,48,0.3)] hover:scale-105'
                      : 'bg-brand-dark-accent/40 border-white/10 text-brand-white/80 hover:border-brand-gold hover:text-brand-gold hover:scale-105'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 ${
                currentPage === totalPages
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-brand-gold hover:border-brand-gold hover:scale-105 active:scale-95 cursor-pointer shadow-lg'
              }`}
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Articles
