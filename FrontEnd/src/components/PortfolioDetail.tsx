import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Box, Activity, ChevronLeft, ChevronRight, Briefcase, RefreshCw } from 'lucide-react'
import { DETAIL_SERVICES_DATA } from './ServiceDetail'

interface PortfolioProject {
  title: string
  area: string
  details: string[]
  image: string
}

interface ServiceDetailData {
  title: string
  image: string
  p1: string
  p2: string
  p3: string
  portfolio: PortfolioProject[]
}

const PORTFOLIO_SERVICES_DATA: ServiceDetailData[] = DETAIL_SERVICES_DATA

const PortfolioDetail: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [serviceId, setServiceId] = useState(0)
  const [projectId, setProjectId] = useState(0)

  // Database stands states
  const [dbStand, setDbStand] = useState<any | null>(null)
  const [dbStands, setDbStands] = useState<any[]>([])
  const [loadingDb, setLoadingDb] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    setSelectedImage(null) // Reset interactive image state
    const params = new URLSearchParams(location.search)
    const dbId = params.get('dbId')
    const sId = parseInt(params.get('serviceId') || '0', 10)
    const pId = parseInt(params.get('projectId') || '0', 10)

    if (dbId) {
      setLoadingDb(true)
      const fetchDbData = async () => {
        try {
          // Fetch current stand
          const resSingle = await fetch(`${apiBaseUrl}/api/stands/${dbId}`)
          const dataSingle = await resSingle.json()
          if (resSingle.ok && dataSingle.success) {
            setDbStand(dataSingle.stand)
          }

          // Fetch all stands for navigation cycling
          const resAll = await fetch(`${apiBaseUrl}/api/stands?limit=100`)
          const dataAll = await resAll.json()
          if (resAll.ok && dataAll.success) {
            setDbStands(dataAll.stands)
          }
        } catch (err) {
          console.error("Error fetching db stand details:", err)
        } finally {
          setLoadingDb(false)
        }
      }
      fetchDbData()
    } else {
      setDbStand(null)
      if (!isNaN(sId) && sId >= 0 && sId < PORTFOLIO_SERVICES_DATA.length) {
        setServiceId(sId)
      }
      if (!isNaN(pId) && pId >= 0 && pId < PORTFOLIO_SERVICES_DATA[sId].portfolio.length) {
        setProjectId(pId)
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  const service = PORTFOLIO_SERVICES_DATA[serviceId]
  const project = service.portfolio[projectId]

  const isDb = !!dbStand

  // Resolve stand values (static vs database)
  const currentTitle = isDb ? dbStand.showName : project.title
  const currentArea = isDb ? `${dbStand.standArea} m²` : project.area
  const currentImage = isDb && dbStand.images && dbStand.images.length > 0 ? dbStand.images[0].url : (isDb ? '' : project.image)
  const mainImageToShow = selectedImage || currentImage
  
  // Dynamic details generator for type of stand
  const getTypeOfStand = () => {
    const areaVal = parseInt(project.area, 10)
    if (isNaN(areaVal) || areaVal < 30) {
      return [
        "Linear exhibition stand",
        "Bespoke joinery counters",
        "Standard brand shells"
      ]
    } else if (areaVal < 80) {
      return [
        "The Peninsula exhibition stand",
        "Interactive display stand",
        "Exclusive exhibition stands"
      ]
    } else {
      return [
        "Island exhibition pavilion",
        "Double deck stand structure",
        "VIP lounge rooms integration"
      ]
    }
  }

  const currentTypeOfStands = isDb ? dbStand.typeOfStands : getTypeOfStand()

  // Dynamic event type resolver
  const getTypeOfEvent = () => {
    if (serviceId === 0) return ["Conference"]
    if (serviceId === 1) return ["Trade Exhibition"]
    if (serviceId === 2) return ["Brand Activation Build"]
    if (serviceId === 3) return ["On-site Logistics & Management"]
    if (serviceId === 4) return ["Mall Promo Installation"]
    if (serviceId === 5) return [" experiential Tech Activation"]
    if (serviceId === 6) return ["Corporate Fit-out"]
    return ["Marketing Signage Campaign"]
  }

  const currentTypeOfEvents = isDb ? dbStand.typeOfEvents : getTypeOfEvent()

  // Dynamic Exhibition Name
  const getExExhibition = () => {
    const exhibitions = [
      "Future Blockchain",
      "Arab Health Summit",
      "GITEX Global Tech Week",
      "Gulfood Exhibition Dubai",
      "Index Interior Design Expo",
      "Big 5 Construction Forum",
      "Dubai International Boat Show",
      "Automechanika Dubai"
    ]
    const hash = project.title.charCodeAt(0) + project.title.charCodeAt(project.title.length - 1)
    return exhibitions[hash % exhibitions.length]
  }

  const currentExhibitionName = isDb ? dbStand.showName : getExExhibition()

  // Dynamic Event Year
  const getExYear = () => {
    const years = ["2022", "2023", "2024", "2025", "2026"]
    const hash = project.title.charCodeAt(0) + project.title.length
    return years[hash % years.length]
  }

  const currentExYear = isDb ? dbStand.year.toString() : getExYear()

  // Dynamic Event Location
  const getExLocation = () => {
    return "Dubai, UAE"
  }

  const currentExLocation = isDb ? dbStand.location : getExLocation()

  // Get gallery thumbnails
  const getGalleryThumbnails = () => {
    if (isDb && dbStand.images && dbStand.images.length > 1) {
      // Show all uploaded images except the main one currently shown
      const activeMain = selectedImage || dbStand.images[0].url
      return dbStand.images
        .map((img: any) => img.url)
        .filter((url: string) => url !== activeMain)
    } else if (isDb && dbStands.length > 1) {
      // If only one uploaded, show other stand photos
      const currentIdx = dbStands.findIndex(s => s._id === dbStand._id)
      const leftIdx = (currentIdx + 1) % dbStands.length
      const rightIdx = (currentIdx + 2) % dbStands.length
      
      const leftUrl = dbStands[leftIdx]?.images?.[0]?.url || ''
      const rightUrl = dbStands[rightIdx]?.images?.[0]?.url || ''
      return [leftUrl, rightUrl].filter(Boolean)
    } else {
      const list = service.portfolio
      const leftIdx = (projectId + 1) % list.length
      const rightIdx = (projectId + 2) % list.length
      return [list[leftIdx].image, list[rightIdx].image]
    }
  }

  const handleThumbnailClick = (thumbUrl: string) => {
    // If it's one of the current stand's images, switch main image
    if (isDb && dbStand.images && dbStand.images.some((img: any) => img.url === thumbUrl)) {
      setSelectedImage(thumbUrl)
    } else {
      // Otherwise, it's a fallback project thumbnail, so navigate to it!
      if (isDb) {
        const targetStand = dbStands.find(s => s.images?.[0]?.url === thumbUrl)
        if (targetStand) {
          navigate(`/portfolio/detail?dbId=${targetStand._id}`)
        }
      } else {
        const targetIdx = service.portfolio.findIndex(p => p.image === thumbUrl)
        if (targetIdx !== -1) {
          navigate(`/portfolio/detail?serviceId=${serviceId}&projectId=${targetIdx}`)
        }
      }
    }
  }

  const handlePrev = () => {
    if (isDb && dbStands.length > 0) {
      const idx = dbStands.findIndex(s => s._id === dbStand._id)
      if (idx !== -1) {
        const total = dbStands.length
        const prevIdx = (idx - 1 + total) % total
        navigate(`/portfolio/detail?dbId=${dbStands[prevIdx]._id}`)
      }
    } else {
      const total = service.portfolio.length
      const prevId = (projectId - 1 + total) % total
      navigate(`/portfolio/detail?serviceId=${serviceId}&projectId=${prevId}`)
    }
  }

  const handleNext = () => {
    if (isDb && dbStands.length > 0) {
      const idx = dbStands.findIndex(s => s._id === dbStand._id)
      if (idx !== -1) {
        const total = dbStands.length
        const nextIdx = (idx + 1) % total
        navigate(`/portfolio/detail?dbId=${dbStands[nextIdx]._id}`)
      }
    } else {
      const total = service.portfolio.length
      const nextId = (projectId + 1) % total
      navigate(`/portfolio/detail?serviceId=${serviceId}&projectId=${nextId}`)
    }
  }

  if (loadingDb) {
    return (
      <div className="bg-[#121214] text-brand-white min-h-screen flex items-center justify-center relative overflow-hidden select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh] bg-brand-gold/10 rounded-full blur-[100px]" />
        <div className="flex flex-col items-center gap-[2rem] z-10">
          <RefreshCw className="w-[4rem] h-[4rem] text-brand-gold animate-spin" />
          <p className="font-circe font-light text-[1.8rem] text-brand-text-muted tracking-widest uppercase">
            Loading Project Details...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#121214] text-brand-white min-h-screen relative overflow-hidden select-none">
      
      {/* 1. Large Translucent Rotated Background Title */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 rotate-90 origin-center text-white/[0.02] uppercase tracking-[0.18em] font-urw font-extrabold text-[12rem] sm:text-[18rem] md:text-[24rem] pointer-events-none select-none hidden lg:block z-0">
        Portfolio
      </div>

      {/* Main Container */}
      <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24 py-32 relative z-10">
        
        {/* Breadcrumb Path */}
        <nav className="font-circe font-light text-[1.4rem] sm:text-[1.6rem] text-brand-text-muted tracking-wide flex items-center gap-2 mb-16 text-left">
          <Link to="/" className="hover:text-brand-gold transition-colors duration-300">Home page</Link>
          <span className="opacity-40">/</span>
          {isDb ? (
            <Link to={`/services/detail?id=0`} className="hover:text-brand-gold transition-colors duration-300">Exhibition Stand Production</Link>
          ) : (
            <Link to={`/services/detail?id=${serviceId}`} className="hover:text-brand-gold transition-colors duration-300">{service.title}</Link>
          )}
          <span className="opacity-40">/</span>
          <span className="text-white font-normal">{currentTitle}</span>
        </nav>

        {/* 2-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-24">
          
          {/* Left Column: Overlapping Frame and Double Border behind the Image */}
          <div className="lg:col-span-6 flex flex-col items-start gap-12 w-full">
            
            {/* Image Container with Double Outline Frames */}
            <div className="relative w-full max-w-[550px] aspect-[4/3] rounded-xs select-none">
              
              {/* Back offset thin white outline box */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-brand-white/10 pointer-events-none -z-10" />
              
              {/* Back offset thin red outline box */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#E51D1D]/35 pointer-events-none -z-10" />

              {/* Main Image */}
              <div className="w-full h-full overflow-hidden rounded-xs border border-brand-white/15 bg-brand-dark-accent">
                {mainImageToShow ? (
                  <img
                    src={mainImageToShow}
                    alt={currentTitle}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-text-muted">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            {/* stand information classification list */}
            <div className="w-full text-left flex flex-col gap-8 mt-4">
              <div>
                <h4 className="font-urw font-bold text-[1.8rem] text-brand-white/90 uppercase tracking-wide mb-3">Type of stand:</h4>
                <ul className="flex flex-col gap-2">
                  {currentTypeOfStands.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 font-circe font-light text-[1.5rem] text-brand-text-muted">
                      <span className="w-2.5 h-2.5 bg-[#E51D1D] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-urw font-bold text-[1.8rem] text-brand-white/90 uppercase tracking-wide mb-3">Type of event:</h4>
                <ul className="flex flex-col gap-2">
                  {currentTypeOfEvents.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 font-circe font-light text-[1.5rem] text-brand-text-muted">
                      <span className="w-2.5 h-2.5 bg-[#E51D1D] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column: Title, Specifications & Thumbnails Grid */}
          <div className="lg:col-span-6 text-left flex flex-col justify-between h-full">
            
            {/* Title & Specifications Info */}
            <div className="mb-12">
              
              {/* Title */}
              <h1 className="font-urw font-extrabold text-[4.5rem] sm:text-[5.5rem] text-white leading-tight tracking-wide mb-10">
                {currentTitle}
              </h1>

              {/* Vertical list of key specs with clean, minimalist white/grey icons */}
              <div className="flex flex-col gap-6 text-left mb-12">
                
                {/* Event Spec */}
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 flex items-center justify-center text-brand-text-muted">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="font-circe font-light text-[1.7rem] text-brand-white/80">{currentExhibitionName}</span>
                </div>

                {/* Location Spec */}
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 flex items-center justify-center text-brand-text-muted">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="font-circe font-light text-[1.7rem] text-brand-white/80">{currentExLocation}</span>
                </div>

                {/* Year Spec */}
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 flex items-center justify-center text-brand-text-muted">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="font-circe font-light text-[1.7rem] text-brand-white/80">{currentExYear}</span>
                </div>

                {/* Area Spec */}
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 flex items-center justify-center text-brand-text-muted">
                    <Box className="w-6 h-6" />
                  </div>
                  <span className="font-circe font-light text-[1.7rem] text-brand-white/80">
                    Building area: <span className="font-urw font-bold text-[2rem] text-white ml-1">{currentArea}</span>
                  </span>
                </div>

                {/* Client Spec */}
                {isDb && dbStand.client && (
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 flex items-center justify-center text-brand-text-muted">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <span className="font-circe font-light text-[1.7rem] text-brand-white/80">
                      Client: <span className="text-white font-medium ml-1">{dbStand.client}</span>
                    </span>
                  </div>
                )}

              </div>

            </div>

            {/* Gallery Thumbnail Preview Images */}
            <div className="grid grid-cols-2 gap-6 max-w-[500px]">
              {getGalleryThumbnails().map((thumb, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleThumbnailClick(thumb)}
                  className="aspect-[4/3] overflow-hidden rounded-xs border border-brand-white/10 shadow-lg bg-brand-dark-accent cursor-pointer"
                >
                  {thumb && (
                    <img
                      src={thumb}
                      alt={`Detail view ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-108 select-none"
                    />
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* 3. Bottom Previous/Next cycling navigation row */}
        <div className="border-t border-brand-white/10 pt-10 flex justify-between items-center w-full select-none">
          
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="flex items-center gap-3 font-urw font-bold text-[1.6rem] text-brand-text-muted hover:text-white uppercase tracking-wider transition-colors duration-300 cursor-pointer group/prev"
          >
            <div className="w-12 h-12 rounded-full border border-brand-white/20 hover:border-brand-gold bg-brand-white/5 flex items-center justify-center transition-all duration-300 group-hover/prev:scale-105">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span>Previous project</span>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="flex items-center gap-3 font-urw font-bold text-[1.6rem] text-brand-text-muted hover:text-white uppercase tracking-wider transition-colors duration-300 cursor-pointer group/next"
          >
            <span>Next project</span>
            <div className="w-12 h-12 rounded-full border border-brand-white/20 hover:border-brand-gold bg-brand-white/5 flex items-center justify-center transition-all duration-300 group-hover/next:scale-105">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>

        </div>

      </div>

    </div>
  )
}

export default PortfolioDetail
