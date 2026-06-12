import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ArrowUpRight, Calendar, User, Tag } from 'lucide-react'
import { ARTICLES_DATA, Article } from '../data/articlesData'

const ArticleDetail: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [article, setArticle] = useState<Article | null>(null)
  const [otherArticles, setOtherArticles] = useState<Article[]>([])

  useEffect(() => {
    // Read active ID from query params
    const queryParams = new URLSearchParams(location.search)
    const idParam = queryParams.get('id')
    let activeId = 0
    if (idParam !== null) {
      const idx = parseInt(idParam, 10)
      if (!isNaN(idx) && idx >= 0 && idx < ARTICLES_DATA.length) {
        activeId = idx
      }
    }

    const current = ARTICLES_DATA.find(a => a.id === activeId) || ARTICLES_DATA[0]
    setArticle(current)

    // Filter out the active article for the sidebar
    const others = ARTICLES_DATA.filter(a => a.id !== current.id)
    setOtherArticles(others)

    // Scroll window smoothly to the top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  if (!article) return null

  return (
    <div className="bg-brand-bg text-brand-white min-h-screen relative overflow-hidden select-none">
      {/* Decorative vertical grid lines (Architectural layout) */}
      <div className="absolute left-[33%] top-0 bottom-0 w-[1px] bg-white/[0.04] z-10 pointer-events-none hidden md:block" />
      <div className="absolute left-[66%] top-0 bottom-0 w-[1px] bg-white/[0.04] z-10 pointer-events-none hidden md:block" />

      {/* Split-Screen Hero Banner */}
      <section className="relative pt-16 lg:pt-0 lg:h-[75vh] lg:min-h-[580px] grid grid-cols-1 lg:grid-cols-2 bg-brand-dark border-b border-white/5">
        {/* Left Side: Article Image */}
        <div className="relative h-[35rem] lg:h-full w-full overflow-hidden bg-brand-dark-accent">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover select-none"
          />
          {/* Overlapping Border Divider Gradient */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none hidden lg:block" />
        </div>

        {/* Right Side: Breadcrumbs and Title Info */}
        <div className="relative h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16 text-left select-none">
          {/* Breadcrumbs */}
          <nav className="font-circe font-light text-[1.5rem] text-white tracking-wide flex items-center gap-2.5 mb-8">
            <Link to="/" className="hover:text-brand-gold transition-colors duration-300">Home page</Link>
            <span className="opacity-40">/</span>
            <Link to="/articles" className="hover:text-brand-gold transition-colors duration-300">Articles</Link>
            <span className="opacity-40">/</span>
            <span className="text-white font-normal truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Article Info Badges */}
          <div className="flex flex-wrap items-center gap-6 font-circe font-light text-[1.4rem] text-white uppercase tracking-wider mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-gold" />
              <span>{article.date}</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-brand-gold" />
              <span>{article.author}</span>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="font-urw font-extrabold text-[4rem] sm:text-[5rem] lg:text-[5.8rem] text-white leading-tight tracking-wide mb-8 uppercase">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="font-circe font-light text-[1.8rem] sm:text-[2rem] text-brand-gold leading-relaxed">
            {article.subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-brand-bg relative z-10">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Full Reading Body */}
            <div className="lg:col-span-8 flex flex-col text-left">
              {article.blocks.map((block, idx) => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <p key={idx} className="font-circe font-light text-[2rem] sm:text-[2.2rem] leading-relaxed text-white mb-8">
                        {block.text}
                      </p>
                    )
                  case 'subheading':
                    return (
                      <h2 key={idx} className="font-urw font-bold text-[3rem] sm:text-[3.5rem] text-white uppercase tracking-wider mt-12 mb-8 border-b border-white/5 pb-3">
                        {block.text}
                      </h2>
                    )
                  case 'list':
                    return (
                      <div key={idx} className="flex flex-col gap-6 my-8">
                        {block.listItems?.map((item, lIdx) => (
                          <div key={lIdx} className="bg-brand-dark-accent/10 border border-white/5 p-8 rounded-sm">
                            <h3 className="font-urw font-bold text-[2rem] sm:text-[2.2rem] text-brand-gold uppercase tracking-wider mb-2">
                              {item.title}
                            </h3>
                            <p className="font-circe font-light text-[1.8rem] text-white leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )
                  case 'checklist':
                    return (
                      <div key={idx} className="flex flex-col gap-4 my-8 bg-brand-dark-accent/20 border border-brand-white/5 p-8 rounded-sm">
                        {block.items?.map((item, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-4">
                            <span className="text-brand-gold font-bold text-[2.2rem] leading-none">✔</span>
                            <span className="font-circe font-medium text-[1.8rem] sm:text-[2rem] text-white/90">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                  case 'takeaway':
                    return (
                      <div key={idx} className="border-l-4 border-brand-gold bg-brand-dark-accent/40 px-8 py-8 rounded-r-xs my-12">
                        <span className="font-urw font-black text-brand-gold text-[1.4rem] uppercase tracking-[0.25em] block mb-3">Key Takeaway</span>
                        <p className="font-circe font-light italic text-[2.1rem] sm:text-[2.3rem] leading-relaxed text-white">
                          "{block.text}"
                        </p>
                      </div>
                    )
                  case 'question':
                    return (
                      <div key={idx} className="mt-12 mb-6">
                        <h4 className="font-urw font-bold text-[2.2rem] sm:text-[2.5rem] text-brand-gold uppercase tracking-wider leading-snug">
                          {block.text}
                        </h4>
                      </div>
                    )
                  case 'tags':
                    return (
                      <div key={idx} className="flex flex-wrap gap-3 mt-12 border-t border-white/5 pt-8">
                        {block.items?.map((tag, tIdx) => (
                          <span key={tIdx} className="font-mono text-[1.5rem] text-brand-gold hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1 bg-brand-dark-accent/30 px-4 py-1.5 border border-white/5 rounded-xs">
                            <Tag className="w-4 h-4" />
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )
                  default:
                    return null
                }
              })}

              {/* Back Button */}
              <div className="mt-16 pt-8 border-t border-white/5">
                <Link
                  to="/articles"
                  className="inline-flex items-center gap-3 font-euclid font-bold text-[1.6rem] tracking-wider uppercase text-brand-gold hover:text-white transition-colors duration-300"
                >
                  <ChevronLeft className="w-5 h-5" /> Back to Articles
                </Link>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-12 lg:sticky lg:top-36 text-left">
              {/* Other Articles Category */}
              {otherArticles.length > 0 && (
                <div className="border-t border-white/10 pt-6">
                  <span className="font-circe font-light text-[1.4rem] tracking-[0.25em] text-brand-gold uppercase block mb-1">More news</span>
                  <h3 className="font-urw font-bold text-[2.6rem] text-white uppercase tracking-wider mb-8">Other Articles</h3>
                  
                  <div className="flex flex-col gap-8 w-full">
                    {otherArticles.map((oth) => (
                      <Link
                        key={oth.id}
                        to={`/articles/detail?id=${oth.id}`}
                        className="flex gap-5 p-4 rounded-sm bg-brand-dark-accent/40 border border-brand-white/5 hover:border-brand-gold/60 transition-all duration-300 group shadow-md"
                      >
                        {/* Thumbnail Image */}
                        <div className="w-28 h-20 shrink-0 overflow-hidden rounded-xs border border-brand-white/5">
                          <img
                            src={oth.image}
                            alt={oth.title}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                          />
                        </div>

                        {/* Meta details */}
                        <div className="flex flex-col justify-between py-0.5">
                          <div>
                            <h4 className="font-urw font-bold text-[1.5rem] text-white group-hover:text-brand-gold transition-colors duration-300 leading-snug line-clamp-2">
                              {oth.title}
                            </h4>
                          </div>
                          <span className="font-euclid font-bold text-[1.2rem] tracking-wider uppercase text-brand-gold group-hover:text-white transition-colors duration-300 flex items-center gap-1 mt-2">
                            Read Article <ArrowUpRight className="w-4 h-4 text-[#E51D1D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Call To Action Box */}
              <div className="bg-gradient-to-br from-[#1d0a0a] via-brand-dark-accent/40 to-brand-bg border border-white/5 p-8 rounded-sm text-center relative overflow-hidden shadow-lg mt-4">
                <div className="absolute right-0 top-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
                <span className="font-circe font-light text-[1.4rem] tracking-[0.3em] text-brand-gold uppercase block mb-4">Start Your Build</span>
                <h4 className="font-urw font-extrabold text-[2.6rem] text-white uppercase tracking-wider mb-6 leading-tight">
                  Ready to exhibit your brand?
                </h4>
                <p className="font-circe font-light text-[1.5rem] text-white leading-relaxed mb-8">
                  Get in touch with our expert designers and joinery workshop to create custom exhibition stands that command attention.
                </p>
                <button
                  onClick={() => navigate('/contacts')}
                  className="bg-brand-gold hover:bg-brand-gold-light text-white font-urw font-bold tracking-widest uppercase py-5 px-8 rounded-xs shadow-[0_10px_20px_rgba(196,121,86,0.25)] hover:scale-[1.02] transition-all duration-300 w-full cursor-pointer"
                  style={{fontSize:'2rem'}}
                >
                  Send Inquiry +
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default ArticleDetail
