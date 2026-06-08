import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, RefreshCw } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

const fetchStands = async ({ queryKey }: any) => {
  const [_, page, limit, typeOfStand, category, year, typeOfEvent] = queryKey
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('limit', limit.toString())
  if (typeOfStand && typeOfStand !== 'ALL') params.append('typeOfStand', typeOfStand)
  if (category && category !== 'ALL') params.append('category', category)
  if (year && year !== 'ALL') params.append('year', year)
  if (typeOfEvent && typeOfEvent !== 'ALL') params.append('typeOfEvent', typeOfEvent)

  const res = await fetch(`${apiBaseUrl}/api/stands?${params.toString()}`)
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch stands')
  }
  return data
}

const Portfolio: React.FC = () => {
  const navigate = useNavigate()
  
  // Filter States
  const [page, setPage] = useState(1)
  const [selectedType, setSelectedType] = useState('ALL')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedYear, setSelectedYear] = useState('ALL')
  const [selectedEvent, setSelectedEvent] = useState('ALL')

  // Query stands from backend via TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['stands', page, 9, selectedType, selectedCategory, selectedYear, selectedEvent],
    queryFn: fetchStands,
    placeholderData: (prev) => prev
  })

  // Scroll to top on query state changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page, selectedType, selectedCategory, selectedYear, selectedEvent])

  // Filter change handlers that reset page index
  const handleTypeChange = (val: string) => {
    setSelectedType(val)
    setPage(1)
  }

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val)
    setPage(1)
  }

  const handleYearChange = (val: string) => {
    setSelectedYear(val)
    setPage(1)
  }

  const handleEventChange = (val: string) => {
    setSelectedEvent(val)
    setPage(1)
  }

  const stands = data?.stands || []
  const totalCount = data?.pagination?.totalCount || 0

  // Map backend stands to UI card elements
  const mappedProjects = stands.map((stand: any) => ({
    title: stand.showName,
    area: `${stand.standArea} m²`,
    image: stand.images && stand.images.length > 0 ? stand.images[0].url : '',
    dbId: stand._id,
    exhibitionName: stand.showName,
    year: stand.year.toString(),
    location: stand.location,
    category: stand.categories && stand.categories.length > 0 ? stand.categories[0] : 'UAE projects',
    typeOfStand: stand.typeOfStands && stand.typeOfStands.length > 0 ? stand.typeOfStands[0] : 'custom / built stand'
  }))

  const getPageNumbers = () => {
    const totalPages = data?.pagination?.totalPages || 1
    const pages: (number | string)[] = []
    const range = 1
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - range && i <= page + range)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  }

  if (isLoading && !data) {
    return (
      <div className="bg-[#121214] text-brand-white min-h-screen flex items-center justify-center relative overflow-hidden select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh] bg-brand-gold/10 rounded-full blur-[100px]" />
        <div className="flex flex-col items-center gap-[2rem] z-10">
          <RefreshCw className="w-[4rem] h-[4rem] text-brand-gold animate-spin" />
          <p className="font-circe font-light text-[1.8rem] text-brand-text-muted tracking-widest uppercase">
            Loading Portfolio...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#121214] text-brand-white min-h-screen relative overflow-hidden select-none">
      
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 py-32 relative z-10">
        
        {/* Breadcrumb Path */}
        <nav className="font-circe font-light text-[1.4rem] sm:text-[1.6rem] text-brand-text-muted tracking-wide flex items-center gap-2 mb-16 text-left">
          <Link to="/" className="hover:text-brand-gold transition-colors duration-300">Home page</Link>
          <span className="opacity-40">/</span>
          <span className="text-white font-normal">Portfolio</span>
        </nav>

        {/* Page Title & Filters Row */}
        <div className="flex flex-col items-start gap-12 border-b border-brand-white/10 pb-12">
          
          {/* Header titles */}
          <div className="flex flex-col items-start gap-3 text-left">
            <h1 className="font-urw font-extrabold text-[5.5rem] sm:text-[7rem] md:text-[8.5rem] text-white uppercase leading-none tracking-wider">
              Portfolio
            </h1>
          </div>

          {/* Filters & Search Select Grid */}
          <div className="flex flex-wrap items-center gap-10 sm:gap-14 w-full">
            

            {/* Filter 1: Type of Stand */}
            <div className="relative border-b border-brand-white/20 pb-3.5 flex items-center min-w-[18rem]">
              <select
                id="filter-stand-type"
                className="appearance-none bg-transparent font-urw font-bold text-[1.6rem] text-white pr-8 py-1.5 outline-none cursor-pointer uppercase tracking-widest border-none w-full"
                value={selectedType}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                <option value="ALL">TYPE OF STAND</option>
                <option value="double decker stand">Double Decker Stand</option>
                <option value="corner stand">Corner Stand</option>
                <option value="peninsula stand">Peninsula Stand</option>
                <option value="island stand">Island Stand</option>
                <option value="custom / built stand">Custom / Built Stand</option>
                <option value="Inline/ linear stand">Inline / Linear Stand</option>
                <option value="Smart stands">Smart Stands</option>
                <option value="outdoor stands">Outdoor Stands</option>
              </select>
              <ChevronDown className="absolute right-0 w-5 h-5 text-brand-text-muted pointer-events-none" />
            </div>

            {/* Filter 2: Type of Event */}
            <div className="relative border-b border-brand-white/20 pb-3.5 flex items-center min-w-[20rem]">
              <select
                id="filter-event-type"
                className="appearance-none bg-transparent font-urw font-bold text-[1.6rem] text-white pr-8 py-1.5 outline-none cursor-pointer uppercase tracking-widest border-none w-full"
                value={selectedEvent}
                onChange={(e) => handleEventChange(e.target.value)}
              >
                <option value="ALL">TYPE OF EVENT</option>
                <option value="trade shows and exhibition">Trade Shows & Exhibitions</option>
                <option value="conference">Conferences</option>
                <option value="forum">Forums</option>
                <option value="product launches">Product Launches</option>
                <option value="Festivals & concerts">Festivals & Concerts</option>
                <option value="brand activation">Brand Activations</option>
                <option value="sports events">Sports Events</option>
                <option value="corporate events">Corporate Events</option>
                <option value="congress">Congresses</option>
              </select>
              <ChevronDown className="absolute right-0 w-5 h-5 text-brand-text-muted pointer-events-none" />
            </div>

            {/* Filter 3: Category */}
            <div className="relative border-b border-brand-white/20 pb-3.5 flex items-center min-w-[18rem]">
              <select
                id="filter-category"
                className="appearance-none bg-transparent font-urw font-bold text-[1.6rem] text-white pr-8 py-1.5 outline-none cursor-pointer uppercase tracking-widest border-none w-full"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="ALL">ALL CATEGORIES</option>
                <option value="UAE projects">UAE Projects</option>
                <option value="GCC projects">GCC Projects</option>
                <option value="International projects">International Projects</option>
              </select>
              <ChevronDown className="absolute right-0 w-5 h-5 text-brand-text-muted pointer-events-none" />
            </div>

            {/* Filter 4: Year */}
            <div className="relative border-b border-brand-white/20 pb-3.5 flex items-center min-w-[14rem]">
              <select
                id="filter-year"
                className="appearance-none bg-transparent font-urw font-bold text-[1.6rem] text-white pr-8 py-1.5 outline-none cursor-pointer uppercase tracking-widest border-none w-full"
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
              >
                <option value="ALL">ALL YEARS</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022_BELOW">2022 & below</option>
              </select>
              <ChevronDown className="absolute right-0 w-5 h-5 text-brand-text-muted pointer-events-none" />
            </div>

          </div>

        </div>

        {/* Portfolio Grid List */}
        {mappedProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
              {mappedProjects.map((project: any) => (
                <div
                  key={project.dbId}
                  onClick={() => navigate(`/portfolio/detail?dbId=${project.dbId}`)}
                  className="group relative aspect-[4/3] rounded-xs overflow-hidden border border-brand-white/10 bg-brand-dark-accent cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Image */}
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover filter brightness-[0.85] group-hover:brightness-95 group-hover:scale-105 transition-all duration-700 select-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-text-muted font-circe font-light text-[1.4rem]">
                      No Image Available
                    </div>
                  )}

                  {/* Info Overlay Panel: Black Bar (title & area) */}
                  <div className="absolute bottom-0 left-0 right-0 bg-brand-dark/80 backdrop-blur-xs px-6 py-4.5 flex justify-between items-center z-10 border-t border-brand-white/5 group-hover:bottom-[4.8rem] transition-all duration-500">
                    <span className="font-urw font-bold text-[1.8rem] text-white uppercase truncate max-w-[70%]">
                      {project.title}
                    </span>
                    <span className="font-urw font-bold text-[1.6rem] text-brand-gold shrink-0">
                      {project.area}
                    </span>
                  </div>

                  {/* Info Overlay Panel: Brand Gold Bar (year & location | event) */}
                  <div className="absolute -bottom-20 left-0 right-0 bg-[#9E5330] px-6 py-4 flex justify-between items-center z-10 group-hover:bottom-0 transition-all duration-500 shadow-md">
                    <span className="font-urw font-bold text-[1.4rem] text-white">
                      {project.year}
                    </span>
                    <span className="font-circe font-light text-[1.3rem] text-white truncate max-w-[75%]">
                      {project.location} | {project.exhibitionName}
                    </span>
                  </div>

                  {/* Hover Sheen effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {data?.pagination && data.pagination.totalPages >= 1 && mappedProjects.length > 0 && (
              <div className="flex items-center justify-center gap-6 mt-20 select-none">
                {/* Prev Button */}
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`px-6 py-3.5 rounded-sm border font-urw font-bold text-[1.4rem] tracking-wider uppercase transition-all duration-300 ${
                    page === 1
                      ? 'border-brand-white/10 text-brand-text-muted/40 cursor-not-allowed bg-transparent'
                      : 'border-brand-white/20 hover:border-brand-gold hover:bg-brand-gold/10 text-white cursor-pointer active:scale-95'
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center gap-3">
                  {getPageNumbers().map((pNum, idx) => {
                    if (pNum === '...') {
                      return (
                        <span key={`ell-${idx}`} className="w-12 h-12 flex items-center justify-center font-urw font-bold text-[1.4rem] text-brand-text-muted/60">
                          ...
                        </span>
                      )
                    }
                    return (
                      <button
                        key={pNum}
                        onClick={() => setPage(Number(pNum))}
                        className={`w-12 h-12 rounded-sm font-urw font-bold text-[1.4rem] flex items-center justify-center transition-all duration-300 cursor-pointer ${
                          page === pNum
                            ? 'bg-[#9E5330] text-white shadow-[0_5px_15px_rgba(158,83,48,0.3)]'
                            : 'border border-brand-white/10 text-brand-text-muted hover:border-brand-gold hover:text-white bg-white/[0.02]'
                        }`}
                      >
                        {pNum}
                      </button>
                    )
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                  disabled={page === data.pagination.totalPages}
                  className={`px-6 py-3.5 rounded-sm border font-urw font-bold text-[1.4rem] tracking-wider uppercase transition-all duration-300 ${
                    page === data.pagination.totalPages
                      ? 'border-brand-white/10 text-brand-text-muted/40 cursor-not-allowed bg-transparent'
                      : 'border-brand-white/20 hover:border-brand-gold hover:bg-brand-gold/10 text-white cursor-pointer active:scale-95'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-32 text-center">
            <p className="font-circe font-light text-[2.2rem] text-brand-text-muted">
              No portfolio projects found matching your selected criteria.
            </p>
          </div>
        )}

      </div>

    </div>
  )
}

export default Portfolio
