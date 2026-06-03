import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Box, Activity, ChevronLeft, ChevronRight } from 'lucide-react'

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

// We share the dataset definitions or import them. Since they are hardcoded in ServiceDetail, 
// let's define them in a shared manner or replicate the dataset. Replicating the dataset 
// ensures no structural modification to ServiceDetail is needed, making it safe and modular.
const PORTFOLIO_SERVICES_DATA: ServiceDetailData[] = [
  {
    title: "Exhibition Stand Production",
    image: "/assets/journey.png",
    p1: "For most companies, participation in the exhibition is a great way to demonstrate their products or services...",
    p2: "When participating in exhibitions abroad...",
    p3: "We help with the selection and rental...",
    portfolio: [
      { title: "BEX Exhibition Pavilion", area: "45 m²", details: ["Premium Layout", "Custom Joinery", "Backlit graphics"], image: "/assets/1-1024x768.jpeg" },
      { title: "Almaty Pavilion Stand", area: "28 m²", details: ["Area: 28 sq.m.", "Single Tier Open Layout", "Textured wall finishes"], image: "/assets/1-1-1024x768.jpeg" },
      { title: "Corporate Tech Expo Booth", area: "60 m²", details: ["Double Deck structure", "Integrated LED system", "Lounge area"], image: "/assets/1-3-1024x768.jpeg" },
      { title: "Automotive Exhibit Zone", area: "120 m²", details: ["Spacious Car layout", "High-power spotlights", "Branding arches"], image: "/assets/btd1wkac03853ntp8l0e3vox6v3dunyi-1024x768.jpg" },
      { title: "Eco-Friendly Brand Stand", area: "35 m²", details: ["Recycled Timber timber", "Live planter walls", "Organic styling"], image: "/assets/02-1024x768.jpg" },
      { title: "Telecom Solutions Zone", area: "50 m²", details: ["Glossy acrylic finishes", "Built-in tech bars", "Floating halo lights"], image: "/assets/1-8-1024x768.jpg" },
      { title: "Premium Retail Expo Booth", area: "40 m²", details: ["Curved wall contours", "Glass showcase displays", "Acoustic room"], image: "/assets/2_web-1024x768.jpg" },
      { title: "Aerospace Exhibition Pavilion", area: "150 m²", details: ["Cantilever steel frame", "Wide-angle LED arches", "VIP lounge tier"], image: "/assets/1_web-1-1024x768.jpg" },
      { title: "Real Estate Display Stand", area: "75 m²", details: ["Architectural model tables", "Touchscreen kiosk desks", "Modern finishes"], image: "/assets/showroom_retail_design.png" },
      { title: "Health & Pharma Stand", area: "30 m²", details: ["Clean medical aesthetic", "Custom display shelving", "Indirect lighting"], image: "/assets/workspace_meeting.png" }
    ]
  },
  {
    title: "Custom Fabrication & Joinery",
    image: "/assets/workspace_meeting.png",
    p1: "Our custom joinery division manufactures premium bespoke wooden structures...",
    p2: "Using advanced machinery alongside meticulous craftsmanship...",
    p3: "From design drawings to final gloss coat...",
    portfolio: [
      { title: "Luxury Reception Counters", area: "12 m²", details: ["Solid Oak Frame", "Corian Top finishing", "Under-glow lighting"], image: "/assets/1_web-1-1024x768.jpg" },
      { title: "Commercial Display Cabinets", area: "24 m²", details: ["Premium Glass styling", "Integrated Spotlighting", "Hidden lock features"], image: "/assets/2_web-1024x768.jpg" },
      { title: "Custom Wooden Archway", area: "18 m²", details: ["Laminated pine beams", "CNC precision carvings", "Eco-friendly varnishes"], image: "/assets/02-1024x768.jpg" },
      { title: "Interactive Media Counter", area: "10 m²", details: ["Built-in tablet mounts", "Under-glow LED tracks", "Cable routing tracks"], image: "/assets/btd1wkac03853ntp8l0e3vox6v3dunyi-1024x768.jpg" },
      { title: "Bespoke Exhibition Shelving", area: "20 m²", details: ["High-gloss lacquer coat", "Modular storage slots", "Branded side panels"], image: "/assets/1-8-1024x768.jpg" },
      { title: "Curved Fabricated Wall", area: "36 m²", details: ["Double bent plywood frame", "Seamless paint finishes", "Indirect lighting tracks"], image: "/assets/1-1024x768.jpeg" },
      { title: "Meeting Lounge Counter", area: "15 m²", details: ["Marbled vinyl counter", "Chrome footrests", "Built-in storage shelves"], image: "/assets/1-1-1024x768.jpeg" },
      { title: "VIP Bar Installation", area: "22 m²", details: ["Solid timber bar counters", "Glass storage back wall", "Warm accent spotlights"], image: "/assets/1-3-1024x768.jpeg" },
      { title: "Product Showcase Podiums", area: "8 m²", details: ["Rotating showcase tops", "Internal acrylic plaques", "Battery-operated LEDs"], image: "/assets/showroom_retail_design.png" },
      { title: "Corporate Boardroom Console", area: "14 m²", details: ["Walnut veneer coating", "Soft close drawers", "Power grommet cutouts"], image: "/assets/workspace_meeting.png" }
    ]
  },
  {
    title: "Event & Activation Builds",
    image: "/assets/hero-bg.png",
    p1: "Brand activations and events require fast, high-quality fabrication of stages...",
    p2: "We construct durable structures that align with structural certifications...",
    p3: "Our team handles full structural engineering...",
    portfolio: [
      { title: "Dubai Mall Brand Zone", area: "32 m²", details: ["Interactive photo tunnel", "High-gloss acrylic floor", "RGB accent lines"], image: "/assets/btd1wkac03853ntp8l0e3vox6v3dunyi-1024x768.jpg" },
      { title: "Corporate Stage Backdrop", area: "80 m²", details: ["80 sq.m stage area", "3D dimensional panels", "LED screen framing"], image: "/assets/02-1024x768.jpg" },
      { title: "Outdoor Concert Stage", area: "150 m²", details: ["Heavy-duty truss frames", "Weatherproof wood decks", "Line array speaker towers"], image: "/assets/journey.png" },
      { title: "Interactive Product Launch", area: "45 m²", details: ["Pneumatic reveal boxes", "Projection mapped walls", "Surround audio setups"], image: "/assets/hero-bg.png" },
      { title: "Pop-up Photo Booth", area: "12 m²", details: ["Neon sign backgrounds", "Custom props display", "Camera stand rings"], image: "/assets/1-8-1024x768.jpg" },
      { title: "Premium VIP Event Lounge", area: "60 m²", details: ["Plush leather seatings", "Faux gold divider panels", "Under-lit cocktail bars"], image: "/assets/2_web-1024x768.jpg" },
      { title: "Brand Activation Pavilion", area: "55 m²", details: ["Fabric ceiling sail structures", "Interactive touch grids", "Eco friendly timber logs"], image: "/assets/1_web-1-1024x768.jpg" },
      { title: "Exhibition Entrance Arch", area: "25 m²", details: ["Double deck truss frames", "High resolution banners", "Downlight safety grids"], image: "/assets/1-1024x768.jpeg" },
      { title: "Fashion Runway Stage", area: "90 m²", details: ["Tempered glass floors", "Bright white edge LEDs", "VIP media backdrops"], image: "/assets/1-1-1024x768.jpeg" },
      { title: "Outdoor Sport Activation", area: "70 m²", details: ["Synthetic turf lawns", "Weatherproof banners", "Integrated display flags"], image: "/assets/1-3-1024x768.jpeg" }
    ]
  },
  {
    title: "On-site Installation & Project Management",
    image: "/assets/journey.png",
    p1: "Ensuring exhibition stands and events are delivered on time requires strict project scheduling...",
    p2: "Our managers handle all authority submissions, hall permits...",
    p3: "We coordinate transport, safe unloading...",
    portfolio: [
      { title: "Trade Show Logistics", area: "200 m²", details: ["Full scale logistics plan", "Hoisting & Rigging safety", "Overnight assembly shifts"], image: "/assets/1-8-1024x768.jpg" },
      { title: "International Pavilion Build", area: "150 m²", details: ["Multi-exhibitor structure", "Shared meeting lounges", "Turnkey maintenance crew"], image: "/assets/1-1024x768.jpeg" },
      { title: "Overnight Mall Kiosk Setup", area: "16 m²", details: ["Strict load out limits", "Silent assembly power tools", "Rapid structural latching"], image: "/assets/2_web-1024x768.jpg" },
      { title: "Double Decker Stand Assembly", area: "90 m²", details: ["Steel structural checks", "Weight balance ratings", "Glass railing tests"], image: "/assets/1_web-1-1024x768.jpg" },
      { title: "Outdoor Exhibition Rigging", area: "120 m²", details: ["High-wind structural tests", "Concrete base anchoring", "Waterproof electrical ducts"], image: "/assets/journey.png" },
      { title: "Corporate Meeting Center Build", area: "85 m²", details: ["Fire retardant boards", "Door lock mechanism checks", "AC ventilation hooks"], image: "/assets/workspace_meeting.png" },
      { title: "Global Summit Stage Setup", area: "110 m²", details: ["Precision truss layout", "AV integration checks", "Safety railing brackets"], image: "/assets/hero-bg.png" },
      { title: "Retail Outlet Fit-out Setup", area: "48 m²", details: ["Mall safety certificates", "Out of hours delivery", "Custom floor protections"], image: "/assets/showroom_retail_design.png" },
      { title: "Exhibition Hall Clean-Up", area: "300 m²", details: ["Post-construction vacuum", "Graphic bubble scraping", "Final touch up polish"], image: "/assets/02-1024x768.jpg" },
      { title: "Dismantling & Storage Plan", area: "180 m²", details: ["Safe structural takedown", "Protective bubble wrap", "Container packing plans"], image: "/assets/btd1wkac03853ntp8l0e3vox6v3dunyi-1024x768.jpg" }
    ]
  },
  {
    title: "Mall & Retail Installations",
    image: "/assets/showroom_retail_design.png",
    p1: "Commercial retail environments demand outstanding craftsmanship and extreme safety compliance...",
    p2: "We construct stands strictly using non-combustible materials...",
    p3: "Our designs target immediate customer attraction...",
    portfolio: [
      { title: "Mall of the Emirates Kiosk", area: "15 m²", details: ["Glass display show counters", "Under-cabinet LED lighting", "Hidden storage compartments"], image: "/assets/2_web-1024x768.jpg" },
      { title: "Boutique Window Styling", area: "8 m²", details: ["Custom wall backdrops", "Suspended display grids", "Premium vinyl wraps"], image: "/assets/02-1024x768.jpg" },
      { title: "Luxury Perfume Kiosk", area: "18 m²", details: ["Marbled laminate pillars", "Acrylic bottle showcase", "Golden metal accents"], image: "/assets/1_web-1-1024x768.jpg" },
      { title: "Pop-up Fashion Corner", area: "24 m²", details: ["Mesh hanging display grids", "Velvet changing stalls", "Branded header signages"], image: "/assets/btd1wkac03853ntp8l0e3vox6v3dunyi-1024x768.jpg" },
      { title: "Department Store Counter", area: "10 m²", details: ["Integrated iPads setup", "Lockable cash drawers", "Frosted glass accents"], image: "/assets/1-8-1024x768.jpg" },
      { title: "Mall Central Plaza Display", area: "35 m²", details: ["Circular display stages", "Overhead truss rings", "Large resolution banner panels"], image: "/assets/1-1024x768.jpeg" },
      { title: "Jewelry Display Counter", area: "12 m²", details: ["Ultra clear glass cases", "Warm spot lighting", "Plush suede displays"], image: "/assets/1-1-1024x768.jpeg" },
      { title: "Cosmetics Promotion Zone", area: "20 m²", details: ["Backlit mirror desks", "Custom makeup shelves", "Acrylic storage displays"], image: "/assets/1-3-1024x768.jpeg" },
      { title: "Premium Retail Window", area: "6 m²", details: ["Fiberglass mannequin bases", "Matte painted back walls", "Spotlight focal tracks"], image: "/assets/showroom_retail_design.png" },
      { title: "Interactive Electronics Hub", area: "30 m²", details: ["Anti-theft device displays", "Branded acrylic signs", "Integrated power channels"], image: "/assets/workspace_meeting.png" }
    ]
  },
  {
    title: "Experiential Booth Engineering",
    image: "/assets/hero-bg.png",
    p1: "We engineer next-generation exhibition booths that blend physical carpentry with digital...",
    p2: "Our tech divisions integrate hidden wiring tracks, ventilation systems...",
    p3: "We coordinate with software designers to deliver immersive customer journeys...",
    portfolio: [
      { title: "Interactive LED Corridor", area: "40 m²", details: ["Seamless wall LED tiles", "Motion-responsive graphics", "Spatial audio setup"], image: "/assets/1-3-1024x768.jpeg" },
      { title: "Tech Brand Experience Zone", area: "50 m²", details: ["Touchscreen demo desks", "Gypsum curved arches", "Indirect linear glow styling"], image: "/assets/btd1wkac03853ntp8l0e3vox6v3dunyi-1024x768.jpg" },
      { title: "Projection Mapping Studio", area: "30 m²", details: ["Ultra short throw setup", "Special projection paints", "Precision mapping grids"], image: "/assets/02-1024x768.jpg" },
      { title: "VR Flight Simulator Hub", area: "25 m²", details: ["Rigid platform bounds", "Cable suspenders hooks", "LED sound responsive lights"], image: "/assets/1_web-1-1024x768.jpg" },
      { title: "Sensory Audio Dome", area: "20 m²", details: ["Acoustic wall felts", "Directional sound domes", "Soft dimming accent lights"], image: "/assets/2_web-1024x768.jpg" },
      { title: "Smart Mirror Display", area: "12 m²", details: ["Reflective display panels", "Motion capture cameras", "Backlit aluminum frame"], image: "/assets/1-8-1024x768.jpg" },
      { title: "Holofused Stand Counter", area: "15 m²", details: ["3D hologram fan mounts", "Frosted acrylic podium", "Cable management tracks"], image: "/assets/1-1024x768.jpeg" },
      { title: "Kinetic Light Installation", area: "45 m²", details: ["Motorized LED globes", "Synchronized controller", "Custom truss frame mounts"], image: "/assets/1-1-1024x768.jpeg" },
      { title: "Mobile App Activation Zone", area: "18 m²", details: ["Tablet stand pods", "QR display banners", "Soft neon sign backdrops"], image: "/assets/showroom_retail_design.png" },
      { title: "Gamified Brand Booth", area: "36 m²", details: ["Large TV wall mounts", "Wireless buzzer podiums", "Glossy custom counter"], image: "/assets/workspace_meeting.png" }
    ]
  },
  {
    title: "Office and Villa Interiors",
    image: "/assets/showroom_retail_design.png",
    p1: "We specialize in permanent luxury interior fit-outs for offices, corporate headquarters...",
    p2: "Our fit-out services cover custom partition walls, decorative ceilings...",
    p3: "We balance layout ergonomics with high-end finishes...",
    portfolio: [
      { title: "Luxury Headquarters Office", area: "180 m²", details: ["Custom executive rooms", "Glass partition panels", "Acoustic ceiling grids"], image: "/assets/1_web-1-1024x768.jpg" },
      { title: "Premium Boutique Showroom", area: "110 m²", details: ["Modern clothing displays", "Velvet seating lounges", "Clean plaster molding styling"], image: "/assets/showroom_retail_design.png" },
      { title: "Executive Meeting Room", area: "40 m²", details: ["Soundproof wall boards", "Bespoke conference desk", "Warm ceiling wood tracks"], image: "/assets/workspace_meeting.png" },
      { title: "Residential Villa Fit-out", area: "320 m²", details: ["Gypsum decorative ceiling", "Premium marble floors", "Indirect gold wall LEDs"], image: "/assets/02-1024x768.jpg" },
      { title: "Creative Agency Hub", area: "90 m²", details: ["Open layout workspaces", "Custom whiteboard walls", "Playful seating pods"], image: "/assets/btd1wkac03853ntp8l0e3vox6v3dunyi-1024x768.jpg" },
      { title: "Luxury Villa Walk-in Closet", area: "28 m²", details: ["Veneered wardrobe lines", "Under-shelf lighting tracks", "Glass showcase drawers"], image: "/assets/1-8-1024x768.jpg" },
      { title: "Corporate Lounge area", area: "65 m²", details: ["Integrated mini bar counters", "Soft acoustic wall felt", "Chrome lighting panels"], image: "/assets/2_web-1024x768.jpg" },
      { title: "Tech Startup HQ Office", area: "150 m²", details: ["Exposed ceiling layouts", "Color matching floors", "Dynamic custom signages"], image: "/assets/1-1024x768.jpeg" },
      { title: "Commercial Showroom Fit-out", area: "200 m²", details: ["High-power spotlights", "Custom mock wall bays", "Polished floor coverings"], image: "/assets/1-1-1024x768.jpeg" },
      { title: "High-end Boardroom Suite", area: "45 m²", details: ["Integrated TV video wall", "Acoustic door framing", "Hidden cable compartments"], image: "/assets/1-3-1024x768.jpeg" }
    ]
  },
  {
    title: "Graphics and Signage",
    image: "/assets/about-banner-bg.webp",
    p1: "Graphics and branding elements complete the premium look of stands and interiors...",
    p2: "We manufacture backlit fabric frames, dimensional 3D acrylic letters...",
    p3: "Our vinyl and graphic wrap installers guarantee bubble-free...",
    portfolio: [
      { title: "Exposition Lightbox Series", area: "30 m²", details: ["Dye-sublimation fabric print", "Slim profile aluminum frames", "Bright uniform LED panels"], image: "/assets/1-8-1024x768.jpg" },
      { title: "3D Neon Sign Installations", area: "5 m²", details: ["Laser-cut acrylic backing", "Low-voltage flexible neon-LED", "Invisible ceiling suspenders"], image: "/assets/1-1-1024x768.jpeg" },
      { title: "Backlit Corporate Logo", area: "8 m²", details: ["Stainless steel casings", "Warm gold halo LED lines", "Precise wall spacers setup"], image: "/assets/1-3-1024x768.jpeg" },
      { title: "Commercial Wall Wraps", area: "60 m²", details: ["Matte visual vinyl wrap", "Seamless wall application", "Anti scratch coatings"], image: "/assets/btd1wkac03853ntp8l0e3vox6v3dunyi-1024x768.jpg" },
      { title: "Exhibition Graphic Panels", area: "45 m²", details: ["High fidelity dye print", "Magnetic backing frames", "Fast mounting clips"], image: "/assets/02-1024x768.jpg" },
      { title: "Outdoor Acrylic Signage", area: "12 m²", details: ["UV-resistant materials", "Waterproof internal LEDs", "Heavy duty metal mounts"], image: "/assets/1_web-1-1024x768.jpg" },
      { title: "Frosted Glass Manifestation", area: "22 m²", details: ["Laser cut brand patterns", "Bubble free dry apply", "Privacy divider styling"], image: "/assets/2_web-1024x768.jpg" },
      { title: "Large Scale Banner Print", area: "120 m²", details: ["Reinforced vinyl borders", "Wind-outlet safety cuts", "Heavy duty mounting eyelets"], image: "/assets/1-1024x768.jpeg" },
      { title: "Retail Lightbox Displays", area: "15 m²", details: ["Fast graphic change tracks", "Low profile borders", "High brightness LEDs"], image: "/assets/showroom_retail_design.png" },
      { title: "3D Backlit Metallic Letters", area: "6 m²", details: ["Brushed brass contours", "Internal safety transformers", "Wall stencil template fit"], image: "/assets/workspace_meeting.png" }
    ]
  }
]

const PortfolioDetail: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [serviceId, setServiceId] = useState(0)
  const [projectId, setProjectId] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const sId = parseInt(params.get('serviceId') || '0', 10)
    const pId = parseInt(params.get('projectId') || '0', 10)

    if (!isNaN(sId) && sId >= 0 && sId < PORTFOLIO_SERVICES_DATA.length) {
      setServiceId(sId)
    }
    if (!isNaN(pId) && pId >= 0 && pId < PORTFOLIO_SERVICES_DATA[sId].portfolio.length) {
      setProjectId(pId)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  const service = PORTFOLIO_SERVICES_DATA[serviceId]
  const project = service.portfolio[projectId]

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

  // Dynamic Event Year
  const getExYear = () => {
    const years = ["2022", "2023", "2024", "2025", "2026"]
    const hash = project.title.charCodeAt(0) + project.title.length
    return years[hash % years.length]
  }

  // Dynamic Event Location
  const getExLocation = () => {
    return "Dubai, UAE"
  }

  // Get gallery thumbnails from other portfolio items in the same category
  const getGalleryThumbnails = () => {
    const list = service.portfolio
    const leftIdx = (projectId + 1) % list.length
    const rightIdx = (projectId + 2) % list.length
    return [list[leftIdx].image, list[rightIdx].image]
  }

  const handlePrev = () => {
    const total = service.portfolio.length
    const prevId = (projectId - 1 + total) % total
    navigate(`/portfolio/detail?serviceId=${serviceId}&projectId=${prevId}`)
  }

  const handleNext = () => {
    const total = service.portfolio.length
    const nextId = (projectId + 1) % total
    navigate(`/portfolio/detail?serviceId=${serviceId}&projectId=${nextId}`)
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
          <Link to={`/services/detail?id=${serviceId}`} className="hover:text-brand-gold transition-colors duration-300">{service.title}</Link>
          <span className="opacity-40">/</span>
          <span className="text-white font-normal">{project.title}</span>
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* stand information classification list */}
            <div className="w-full text-left flex flex-col gap-8 mt-4">
              <div>
                <h4 className="font-urw font-bold text-[1.8rem] text-brand-white/90 uppercase tracking-wide mb-3">Type of stand:</h4>
                <ul className="flex flex-col gap-2">
                  {getTypeOfStand().map((item, idx) => (
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
                  {getTypeOfEvent().map((item, idx) => (
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
                {project.title}
              </h1>

              {/* Vertical list of key specs with clean, minimalist white/grey icons */}
              <div className="flex flex-col gap-6 text-left mb-12">
                
                {/* Event Spec */}
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 flex items-center justify-center text-brand-text-muted">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="font-circe font-light text-[1.7rem] text-brand-white/80">{getExExhibition()}</span>
                </div>

                {/* Location Spec */}
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 flex items-center justify-center text-brand-text-muted">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="font-circe font-light text-[1.7rem] text-brand-white/80">{getExLocation()}</span>
                </div>

                {/* Year Spec */}
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 flex items-center justify-center text-brand-text-muted">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="font-circe font-light text-[1.7rem] text-brand-white/80">{getExYear()}</span>
                </div>

                {/* Area Spec */}
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 flex items-center justify-center text-brand-text-muted">
                    <Box className="w-6 h-6" />
                  </div>
                  <span className="font-circe font-light text-[1.7rem] text-brand-white/80">
                    Building area: <span className="font-urw font-bold text-[2rem] text-white ml-1">{project.area}</span>
                  </span>
                </div>

              </div>

            </div>

            {/* Gallery Thumbnail Preview Images */}
            <div className="grid grid-cols-2 gap-6 max-w-[500px]">
              {getGalleryThumbnails().map((thumb, idx) => (
                <div key={idx} className="aspect-[4/3] overflow-hidden rounded-xs border border-brand-white/10 shadow-lg">
                  <img
                    src={thumb}
                    alt={`Detail view ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-108 cursor-pointer select-none"
                  />
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
