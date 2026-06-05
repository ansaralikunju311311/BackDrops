import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Phone, ArrowUpRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import serv1 from '../assets/service/serv1.jpeg'
import serv2 from '../assets/service/serv2.jpeg'
import serv3 from '../assets/service/serv3.jpeg'
import serv4 from '../assets/service/serv4.jpeg'
import serv5 from '../assets/service/serv5.jpeg'
import serv6 from '../assets/service/serv6.jpeg'
import serv7 from '../assets/service/serv7.jpeg'
import serv8 from '../assets/service/serv8.jpeg'
import serv9 from '../assets/service/serv9.jpeg'
import serv10 from '../assets/service/serv10.jpeg'

export const serviceImages = [serv1, serv2, serv3, serv4, serv5, serv6, serv7, serv8, serv9, serv10]

// Direct SVG Icons matching the brand styles
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

interface RelatedCard {
  idx: number
  title: string
  image: string
  snippet: string
}

interface PortfolioProject {
  title: string
  area: string
  details: string[]
  image: string
  description?: string
  location?: string
  facility?: string
  materials?: string[]
}

export interface ServiceDetailData {
  title: string
  image: string
  p1: string
  p2: string
  p3: string
  related: RelatedCard[]
  portfolio: PortfolioProject[]
}

export const DETAIL_SERVICES_DATA: ServiceDetailData[] = [
  {
    title: "Exhibition Stand Production",
    image: serv1,
    p1: "For most companies, participation in the exhibition is a great way to demonstrate their products or services to interested visitors, find buyers or partners, and declare themselves.",
    p2: "When participating in exhibitions abroad, customers prefer to entrust all organizational issues related to the exhibition to us. We operate fully equipped joinery and electrical facilities to execute custom stand construction of any complexity.",
    p3: "We help with the selection and rental of exhibition space with the subsequent exclusive construction of exhibition stands according to the agreed design, matching all corporate guidelines.",
    related: [
      { idx: 1, title: "Custom Fabrication & Joinery", image: "/assets/workspace_meeting.png", snippet: "Order custom fabrication and wooden structures for your unique promotional needs." },
      { idx: 2, title: "Event & Activation Builds", image: "/assets/hero-bg.png", snippet: "Fabricating stages, photo zones, and brand activation booths for events." }
    ],
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
    image: serv2,
    p1: "Our custom joinery division manufactures premium bespoke wooden structures, display furniture, counter desks, and wall paneling that module stands cannot replicate.",
    p2: "Using advanced machinery alongside meticulous craftsmanship, we build details that enrich spatial aesthetics and reflect absolute class. We select top-tier raw materials to guarantee premium visual and structural outcomes.",
    p3: "From design drawings to final gloss coat, our carpentry workshops ensure a seamless and robust finish built to survive high-footfall event venues.",
    related: [
      { idx: 6, title: "Office and Villa Interiors", image: "/assets/showroom_retail_design.png", snippet: "High-end turnkey interior fit-outs for offices and luxury residences." },
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Exhibition stand construction from design to build-up." }
    ],
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
    image: serv3,
    p1: "Brand activations and events require fast, high-quality fabrication of stages, interactive photo zones, and promotional displays that capture attention instantly.",
    p2: "We construct durable structures that align with structural certifications and safety norms, designed specifically for rapid assembly and dismantling on site.",
    p3: "Our team handles full structural engineering, audio-visual layouts, dynamic lighting, and graphic wraps to provide an immersive brand experience.",
    related: [
      { idx: 5, title: "Experiential Booth Engineering", image: "/assets/hero-bg.png", snippet: "Integrating digital tech, LED screens, and sensors with physical structures." },
      { idx: 7, title: "Graphics and Signage", image: "/assets/about-banner-bg.webp", snippet: "In-house printing, dimensional logos, and lit signs." }
    ],
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
    image: serv4,
    p1: "Ensuring exhibition stands and events are delivered on time requires strict project scheduling, safety calculations, and round-the-clock shift management.",
    p2: "Our managers handle all authority submissions, hall permits, structural drawings, electricity request layouts, and safety compliance certificates.",
    p3: "We coordinate transport, safe unloading, structural hoisting, clean up, and visual styling to deliver a complete turnkey handover for stress-free launches.",
    related: [
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Custom stand fabrication and graphics application." },
      { idx: 4, title: "Mall & Retail Installations", image: "/assets/showroom_retail_design.png", snippet: "Window displays and promotional kiosks in shopping centers." }
    ],
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
    image: serv5,
    p1: "Commercial retail environments demand outstanding craftsmanship and extreme safety compliance. We design window displays, promotional kiosks, and temporary boutique stands.",
    p2: "We construct stands strictly using non-combustible materials, fire-rated electrical wiring, and stable structures that comply with premium shopping mall rules.",
    p3: "Our designs target immediate customer attraction, maximizing product placement utility and integrating structural premium aesthetic highlights.",
    related: [
      { idx: 6, title: "Office and Villa Interiors", image: "/assets/showroom_retail_design.png", snippet: "High-end interior commercial and residential fit-outs." },
      { idx: 7, title: "Graphics and Signage", image: "/assets/about-banner-bg.webp", snippet: "Illuminated signs and graphic prints." }
    ],
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
    image: serv6,
    p1: "We engineer next-generation exhibition booths that blend physical carpentry with digital technologies like interactive LED walls, projection mapping, and motion sensors.",
    p2: "Our tech divisions integrate hidden wiring tracks, ventilation systems, cooling fans, and sturdy steel reinforcement brackets for heavy LED panel mounts.",
    p3: "We coordinate with software designers to deliver immersive customer journeys, including sensory corridors, touch screens, and VR experiences.",
    related: [
      { idx: 2, title: "Event & Activation Builds", image: "/assets/hero-bg.png", snippet: "Stages and immersive installations for launches." },
      { idx: 7, title: "Graphics and Signage", image: "/assets/about-banner-bg.webp", snippet: "Large scale backlighting and branding sign designs." }
    ],
    portfolio: [
      { title: "Interactive LED Corridor", area: "40 m²", details: ["Seamless wall LED tiles", "Motion-responsive graphics", "Spatial audio setup"], image: "/assets/1-3-1024x768.jpeg" },
      { title: "Tech Brand Experience Zone", area: "50 m²", details: ["Touchscreen demo desks", "Gypsum curved arches", "Indirect linear glow styling"], image: "/assets/btd1wkac03853ntp8l0e3vox6v3dunyi-1024x768.jpg" },
      { title: "Projection Mapping Studio", area: "30 m²", details: ["Ultra short throw setup", "Special projection paints", "Precision mapping grids"], image: "/assets/02-1024x768.jpg" },
      { title: "VR Flight Simulator Hub", area: "25 m²", details: ["Rigid platform bounds", "Cable suspenders hooks", "LED sound responsive lights"], image: "/assets/1_web-1-1024x768.jpg" },
      { title: "Sensory Audio Dome", area: "20 m²", details: ["Acoustic wall felt", "Directional sound domes", "Soft dimming accent lights"], image: "/assets/2_web-1024x768.jpg" },
      { title: "Smart Mirror Display", area: "12 h", details: ["Reflective display panels", "Motion capture cameras", "Backlit aluminum frame"], image: "/assets/1-8-1024x768.jpg" },
      { title: "Holofused Stand Counter", area: "15 m²", details: ["3D hologram fan mounts", "Frosted acrylic podium", "Cable management tracks"], image: "/assets/1-1024x768.jpeg" },
      { title: "Kinetic Light Installation", area: "45 m²", details: ["Motorized LED globes", "Synchronized controller", "Custom truss frame mounts"], image: "/assets/1-1-1024x768.jpeg" },
      { title: "Mobile App Activation Zone", area: "18 m²", details: ["Tablet stand pods", "QR display banners", "Soft neon sign backdrops"], image: "/assets/showroom_retail_design.png" },
      { title: "Gamified Brand Booth", area: "36 m²", details: ["Large TV wall mounts", "Wireless buzzer podiums", "Glossy custom counter"], image: "/assets/workspace_meeting.png" }
    ]
  },
  {
    title: "Office and Villa Interiors",
    image: serv7,
    p1: "We specialize in permanent luxury interior fit-outs for offices, corporate headquarters, brand showrooms, boutiques, and high-end residential villas.",
    p2: "Our fit-out services cover custom partition walls, decorative ceilings, premium wood floors, double-glazed glass framing, and architectural layout plans.",
    p3: "We balance layout ergonomics with high-end finishes, creating workspaces that increase efficiency and private residences that project luxury and comfort.",
    related: [
      { idx: 1, title: "Custom Fabrication & Joinery", image: "/assets/workspace_meeting.png", snippet: "Bespoke woodwork and custom panel designs." },
      { idx: 4, title: "Mall & Retail Installations", image: "/assets/showroom_retail_design.png", snippet: "Malls window structures and promotional kiosk fabrication." }
    ],
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
    image: serv8,
    p1: "Graphics and branding elements complete the premium look of stands and interiors. We operate large-format print lines, vinyl cutting, and neon-styling divisions.",
    p2: "We manufacture backlit fabric frames, dimensional 3D acrylic letters, stainless steel signage, and custom lightboxes with strict color calibration and quality controls.",
    p3: "Our vinyl and graphic wrap installers guarantee bubble-free, seamless finishes on complex structures, and hidden electrical wire setups.",
    related: [
      { idx: 5, title: "Experiential Booth Engineering", image: "/assets/hero-bg.png", snippet: "Booths incorporating smart LED displays and digital backdrops." },
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Turnkey exhibition stand building and graphics panels installation." }
    ],
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
  },
  {
    title: "Furniture Rentals",
    image: serv9,
    p1: "Exhibition stand aesthetics are completed by the right choice of furniture. We provide an extensive range of premium event and exhibition furniture rentals across the UAE.",
    p2: "Our catalogue includes designer seating, bar stools, reception counters, display cabinets, meeting tables, and premium lounge setups designed to match your brand's color theme.",
    p3: "We manage complete logistics, delivery, visual placement, and post-event collection, ensuring that your stand looks immaculate and serves your visitors comfortably.",
    related: [
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Exhibition stand construction from design to build-up." },
      { idx: 1, title: "Custom Fabrication & Joinery", image: "/assets/workspace_meeting.png", snippet: "Order custom fabrication and wooden structures for your unique promotional needs." }
    ],
    portfolio: [
      { title: "VIP Bar & Stools Set", area: "15 m²", details: ["Premium bar stools", "Illuminated counters", "Sleek metallic accents"], image: "/assets/1-3-1024x768.jpeg" },
      { title: "Corporate Lounge Setup", area: "24 m²", details: ["Plush armchairs", "Tempered glass tables", "Custom brand color cushions"], image: "/assets/workspace_meeting.png" },
      { title: "Interactive Demo Desks", area: "10 m²", details: ["Built-in tablet brackets", "Internal cable management", "Under-counter storage"], image: "/assets/showroom_retail_design.png" }
    ]
  },
  {
    title: "Storage Facilities",
    image: serv10,
    p1: "Custom-built joinery exhibition stands represent a significant corporate investment. Instead of discarding them, we offer safe, secure storage facilities to preserve your assets.",
    p2: "Our Jebel Ali warehouse features managed storage spaces where stand components are carefully dismantled, catalogued, bubble-wrapped, and loaded into containers for future re-use.",
    p3: "We offer end-to-end multi-event asset management, helping you store, transport, refurbish, and reinstall your stands for subsequent trade shows, saving cost and reducing waste.",
    related: [
      { idx: 0, title: "Exhibition Stand Production", image: "/assets/journey.png", snippet: "Exhibition stand construction from design to build-up." },
      { idx: 3, title: "On-site Installation & Project Management", image: "/assets/journey.png", snippet: "Coordinating transport, permits, assembly, and dismantling." }
    ],
    portfolio: [
      { title: "Multi-Event Stand Storage", area: "120 m²", details: ["Safe warehouse storage", "Bubble-wrapped packaging", "Inventory database logs"], image: "/assets/1-1024x768.jpeg" },
      { title: "Expo Materials Log", area: "80 m²", details: ["Secure storage bays", "Dismantling supervision", "Refurbishment workshops"], image: "/assets/journey.png" }
    ]
  }
]

const ServiceDetail: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeIdx, setActiveIdx] = useState(0)
  const portfolioScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Read active ID from query params
    const queryParams = new URLSearchParams(location.search)
    const idParam = queryParams.get('id')
    if (idParam !== null) {
      const idx = parseInt(idParam, 10)
      if (!isNaN(idx) && idx >= 0 && idx < DETAIL_SERVICES_DATA.length) {
        setActiveIdx(idx)
      }
    }
    // Scroll window smoothly to the top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  // 1. Auto-scroll portfolio carousel list at a time interval
  useEffect(() => {
    const scrollContainer = portfolioScrollRef.current
    if (!scrollContainer) return

    const interval = setInterval(() => {
      const cardWidth = 390 // Card width + gap
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth
      
      if (scrollContainer.scrollLeft >= maxScrollLeft - 15) {
        scrollContainer.scrollTo({
          left: 0,
          behavior: 'smooth'
        })
      } else {
        scrollContainer.scrollBy({
          left: cardWidth,
          behavior: 'smooth'
        })
      }
    }, 4500)

    return () => clearInterval(interval)
  }, [activeIdx])

  const service = DETAIL_SERVICES_DATA[activeIdx]

  const handlePortfolioScroll = (direction: 'left' | 'right') => {
    if (portfolioScrollRef.current) {
      const scrollAmount = 350
      portfolioScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleSendRequest = () => {
    navigate(`/contacts?service=${encodeURIComponent(service.title)}`)
  }

  return (
    <div className="bg-brand-bg text-brand-white min-h-screen">
      
      {/* SECTION 1: Split-Screen Hero Banner */}
      <section className="relative lg:h-[80vh] lg:min-h-[620px] grid grid-cols-1 lg:grid-cols-2 bg-white">
        
        {/* Left Side: Service Image */}
        <div className="relative h-[45rem] lg:h-full w-full overflow-hidden bg-brand-dark-accent">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover select-none"
          />
          {/* Overlapping Border Divider Gradient */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/10 to-transparent pointer-events-none hidden lg:block" />
        </div>

        {/* Right Side: Breadcrumbs and Large Title (White Background) */}
        <div className="relative h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16 text-left select-none">
          {/* Breadcrumbs */}
          <nav className="font-circe font-light text-[1.5rem] text-brand-text-muted tracking-wide flex items-center gap-2.5 mb-8">
            <Link to="/" className="hover:text-brand-gold transition-colors duration-300">Home page</Link>
            <span className="opacity-40">/</span>
            <Link to="/services" className="hover:text-brand-gold transition-colors duration-300">Services</Link>
            <span className="opacity-40">/</span>
            <span className="text-brand-dark/80 font-normal">{service.title}</span>
          </nav>

          {/* Service Title */}
          <h1 className="font-urw font-extrabold text-[4.5rem] sm:text-[5.5rem] lg:text-[6.5rem] text-brand-dark leading-tight tracking-wide mb-12">
            {service.title}
          </h1>

          {/* Call to Action Button */}
          <button
            onClick={handleSendRequest}
            className="block bg-[#E51D1D] hover:bg-[#c81717] text-white font-urw font-bold text-[1.8rem] tracking-wider uppercase px-12 py-6 rounded-sm shadow-[0_15px_30px_rgba(229,29,29,0.35)] hover:scale-105 transition-all duration-300 cursor-pointer w-max"
          >
            Send Request <span className="font-light ml-2 text-[2rem] inline-block hover:translate-x-0.5 transition-transform">+</span>
          </button>

          {/* Bottom Right Label: BEX */}
          <div className="absolute right-12 bottom-12 text-right hidden sm:block">
            <span className="font-urw font-bold text-[2rem] tracking-[0.25em] text-brand-dark block uppercase">
              BEX —
            </span>
            <span className="font-circe font-light text-[1.3rem] tracking-[0.2em] text-brand-text-muted block mt-1 uppercase">
              Full Service Agency
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Content Column + Sidebar */}
      <section className="py-32 bg-brand-bg relative z-10 border-t border-brand-white/5">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Detailed Service Text */}
            <div className="lg:col-span-8 flex flex-col gap-10 text-left">
              <p className="font-circe font-light text-[2.1rem] sm:text-[2.3rem] leading-relaxed text-brand-white/80">
                {service.p1}
              </p>
              <p className="font-circe font-light text-[2.1rem] sm:text-[2.3rem] leading-relaxed text-brand-text-muted">
                {service.p2}
              </p>
              <p className="font-circe font-light text-[2.1rem] sm:text-[2.3rem] leading-relaxed text-brand-text-muted">
                {service.p3}
              </p>
            </div>

            {/* Right Column: Other Related Services Card Sidebar */}
            <div className="lg:col-span-4 flex flex-col items-start text-left w-full lg:sticky lg:top-36">
              {/* Heading */}
              <div className="w-full border-t border-brand-white/10 pt-6 mb-10">
                <span className="font-circe font-light text-[1.4rem] tracking-[0.25em] text-brand-gold uppercase block mb-1">Explore categories</span>
                <h3 className="font-urw font-bold text-[2.8rem] text-white uppercase tracking-wider">Related Services</h3>
              </div>

              {/* Related Cards List */}
              <div className="flex flex-col gap-8 w-full">
                {service.related.map((rel) => (
                  <Link
                    key={rel.idx}
                    to={`/services/detail?id=${rel.idx}`}
                    className="flex gap-6 p-5 rounded-sm bg-brand-dark-accent/40 border border-brand-white/5 hover:border-brand-gold/60 transition-all duration-300 group shadow-md"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-32 h-24 sm:w-36 sm:h-28 shrink-0 overflow-hidden rounded-xs border border-brand-white/5">
                      <img
                        src={serviceImages[rel.idx]}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                    </div>

                    {/* Meta details */}
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-urw font-bold text-[1.6rem] sm:text-[1.8rem] text-white group-hover:text-brand-gold transition-colors duration-300 leading-snug">
                          {rel.title}
                        </h4>
                        <p className="font-circe font-light text-[1.3rem] text-brand-text-muted leading-snug mt-2 line-clamp-2">
                          {rel.snippet}
                        </p>
                      </div>
                      <span className="font-euclid font-bold text-[1.2rem] tracking-wider uppercase text-brand-gold group-hover:text-white transition-colors duration-300 flex items-center gap-1.5 mt-2">
                        Learn more <ArrowUpRight className="w-4 h-4 text-[#E51D1D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Portfolio Category Items Showcase */}
      <section className="py-32 bg-brand-bg/50 border-t border-brand-white/5 relative z-10">
        <div className="max-w-[140rem] mx-auto px-6 md:px-12 lg:px-24">
          
          {/* Scroll Header Controls */}
          <div className="flex justify-between items-end mb-16 select-none">
            <div className="flex flex-col gap-2 text-left">
              <span className="font-circe font-light text-[1.4rem] tracking-[0.25em] text-brand-gold uppercase">Showcase</span>
              <h2 className="font-urw font-bold text-[4.5rem] sm:text-[5.5rem] text-white uppercase tracking-wider leading-none">Portfolio</h2>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => handlePortfolioScroll('left')}
                className="w-14 h-14 rounded-full border border-brand-white/20 hover:border-brand-gold hover:bg-brand-gold/15 text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => handlePortfolioScroll('right')}
                className="w-14 h-14 rounded-full border border-brand-white/20 hover:border-brand-gold hover:bg-brand-gold/15 text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Container */}
          <div
            ref={portfolioScrollRef}
            className="flex gap-10 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory scroll-smooth pt-4"
          >
            {service.portfolio.map((project, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/portfolio/detail?serviceId=${activeIdx}&projectId=${idx}`)}
                className="flex-shrink-0 w-[28rem] sm:w-[36rem] cursor-pointer group transition-all duration-500 ease-out snap-start hover:-translate-y-4 hover:scale-[1.02]"
              >
                {/* Project Image */}
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-sm border border-brand-white/10 group-hover:border-brand-gold/60 transition-all duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-108 transition-all duration-700 select-none"
                  />
                  {/* Dimension square badge */}
                  <div className="absolute bottom-5 left-5 bg-brand-dark/85 backdrop-blur-md border border-brand-white/10 px-5 py-3 rounded-xs font-urw font-bold text-[1.5rem] tracking-wide text-white select-none">
                    {project.area}
                  </div>
                  {/* Sheen flare hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                </div>
                
                {/* Specifications & Title */}
                <div className="flex justify-between items-start text-left">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-urw font-bold text-[2rem] sm:text-[2.3rem] text-white leading-tight mt-1 group-hover:text-brand-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    {/* Checklist spec tags */}
                    <div className="flex flex-col gap-1 mt-3">
                      {project.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 font-circe font-light text-[1.4rem] text-brand-text-muted leading-tight">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details Navigation Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/portfolio/detail?serviceId=${activeIdx}&projectId=${idx}`);
                    }}
                    className="shrink-0 bg-[#E51D1D] hover:bg-[#c81717] text-white font-urw font-bold text-[1.3rem] tracking-wider uppercase px-6 py-3.5 rounded-sm transition-all duration-300 ease-out shadow-[0_5px_15px_rgba(229,29,29,0.25)] hover:scale-105 pointer-events-auto cursor-pointer flex items-center gap-1.5"
                    aria-label="View project details"
                  >
                    Details <ArrowUpRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Floating Sticky Contact Sidebar (matching Home page Hero) */}
      <div className="fixed right-0 top-[30%] z-50 bg-white py-20 px-6 flex flex-col gap-16 items-center shadow-[-5px_0_30px_rgba(0,0,0,0.18)] rounded-l-3xl border-y border-l border-gray-100 hidden md:flex w-28">
        {/* Telephone */}
        <a href="tel:+971552291691" className="relative group flex items-center justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
            <Phone className="w-10 h-10" />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/_backdrops.ae?igsh=dGlwbWpqazFybXd3" target="_blank" rel="noopener noreferrer" className="relative group flex items-center justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
            <InstagramIcon className="w-10 h-10" />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
        </a>

        {/* WhatsApp */}
        <a href="https://wa.me/971552291691" target="_blank" rel="noopener noreferrer" className="relative group flex items-center justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:bg-gray-50 transition-all duration-300">
            <WhatsAppIcon className="w-10 h-10" />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9E5330] rounded-full border-2 border-white" />
        </a>
      </div>

    </div>
  )
}

export default ServiceDetail
