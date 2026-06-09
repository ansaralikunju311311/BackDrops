import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, ArrowUpRight, MessageSquare, Check, AlertCircle, X, ExternalLink } from 'lucide-react'
interface ValidationErrors {
  fullName?: string;
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  message?: string;
}
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    message: ''
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [activeInput, setActiveInput] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const serviceParam = params.get('service')
    if (serviceParam) {
      setFormData(prev => ({
        ...prev,
        message: `Hello, I am interested in your "${serviceParam}" services. Please contact me with more information.`
      }))
    }
  }, [])

  // Interactive states for right-side visual component
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [showQuickHelp, setShowQuickHelp] = useState(false)
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null)
  const [mapView, setMapView] = useState<'roadmap' | 'satellite'>('roadmap')

  const hotspots = [
    {
      id: 'dubai-hq',
      top: '28%',
      left: '32%',
      title: 'Dubai HQ Showroom',
      desc: 'Jebel Ali Industrial area 1, Warehouse 6'
    },
    {
      id: 'fabrication',
      top: '62%',
      left: '74%',
      title: 'Fabrication Center',
      desc: 'Advanced Backdrops Production'
    },
    {
      id: 'support-team',
      top: '48%',
      left: '45%',
      title: 'Design Hub',
      desc: 'Creative Consultations'
    }
  ]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const box = card.getBoundingClientRect()
    const x = e.clientX - box.left - box.width / 2
    const y = e.clientY - box.top - box.height / 2
    
    // Limits max tilt to ~12 degrees
    const factorX = 12 / (box.height / 2)
    const factorY = 12 / (box.width / 2)
    
    setRotateX(-y * factorX)
    setRotateY(x * factorY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const validateField = (name: string, value: string): string => {
    let error = ''
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required.'
        } else if (!/^[a-zA-Z\s]{2,50}$/.test(value.trim())) {
          error = 'Full name must be 2-50 characters (letters and spaces only).'
        }
        break
      case 'companyName':
        if (!value.trim()) {
          error = 'Company name is required.'
        } else if (value.trim().length < 2 || value.trim().length > 100) {
          error = 'Company name must be between 2 and 100 characters.'
        }
        break
      case 'email':
        if (!value.trim()) {
          error = 'Email address is required.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Please enter a valid email address (e.g. name@domain.com).'
        }
        break
      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Phone number is required.'
        } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(value.trim())) {
          error = 'Please enter a valid phone number (7-20 digits, spaces/hyphens allowed).'
        }
        break
      case 'message':
        if (!value.trim()) {
          error = 'Message is required.'
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters long.'
        } else if (value.trim().length > 1000) {
          error = 'Message cannot exceed 1000 characters.'
        }
        break
      default:
        break
    }
    return error
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear the error for this field as the user type, keeping UI clean
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setActiveInput(null)
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields strictly
    const newErrors: ValidationErrors = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        newErrors[key as keyof ValidationErrors] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
      
      // Scroll to first error field for accessibility
      const firstErrorField = Object.keys(newErrors)[0]
      const element = document.getElementsByName(firstErrorField)[0]
      if (element) {
        element.focus()
      }
      return
    }

    setIsSubmitting(true)
    
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: formData.message
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phoneNumber: '',
          message: ''
        })
        setErrors({})
        if (data.previewUrl) {
          console.log("Test email preview link (Ethereal):", data.previewUrl)
        }
      } else {
        setSubmitStatus('error')
        if (data.errors && Array.isArray(data.errors)) {
          // If backend returns detailed validation errors, map them to UI
          const backendErrors: ValidationErrors = {}
          data.errors.forEach((err: { field: string; message: string }) => {
            backendErrors[err.field as keyof ValidationErrors] = err.message
          })
          setErrors(backendErrors)
        }
      }
    } catch (error) {
      console.error("Form submit error:", error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  console.log("checking they proprlty",import.meta.env.VITE_API_URL);

  return (
    <>
      <section 
      id="contacts" 
      className="relative min-h-screen bg-brand-bg text-brand-white py-24 md:py-32 overflow-hidden"
    >
      {/* Background Premium Glassmorphic Polygonal Prism Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Large diagonal shadow shard */}
        <div 
          className="absolute top-0 right-0 w-[80%] h-[120%] bg-linear-to-bl from-brand-white/2 via-transparent to-transparent opacity-60 transform rotate-15 translate-x-[20%] translate-y-[-10%]"
          style={{
            clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 0% 100%)',
            backdropFilter: 'blur(8px)',
          }}
        />
        {/* Dark polygonal prism overlay 1 */}
        <div 
          className="absolute top-[-10%] right-[5%] w-[60%] h-[90%] bg-linear-to-b from-brand-dark-accent/25 to-brand-bg/50 border border-brand-white/3 transform skew-x-[-20deg] rotate-25"
          style={{
            boxShadow: 'inset 0 0 40px rgba(255,255,255,0.01), 0 30px 60px rgba(0,0,0,0.8)'
          }}
        />
        {/* Dark polygonal prism overlay 2 */}
        <div 
          className="absolute top-[20%] right-[15%] w-[45%] h-[75%] bg-linear-to-tr from-brand-dark-accent/40 via-brand-dark/20 to-transparent border-l border-brand-white/4 transform skew-x-[-15deg] rotate-15"
        />
      </div>

      <div className="max-w-560 mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Contact Us Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h1 className="font-urw font-black text-[4rem] md:text-[5.5rem] lg:text-[7rem] tracking-tight uppercase leading-[0.9] mb-8">
            Contact Us
          </h1>
        </motion.div>

        {/* UAE & India Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* UAE Column */}
            <div className="space-y-12">
              <h2 className="font-urw font-extrabold text-[3rem] md:text-[4rem] tracking-wider uppercase">
                UAE
              </h2>

              <div className="flex flex-col gap-8">
                {/* Address Row */}
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-gold group-hover:border-brand-gold/50 group-hover:bg-brand-white/2 transition-all duration-300 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="font-euclid font-bold text-[1.8rem] text-brand-gold block tracking-wide uppercase">
                      Address:
                    </span>
                    <p className="font-circe font-light text-[2.2rem] text-brand-text-muted leading-relaxed">
                      Backdrops Technical Services L.L.C<br />
                      Gate no.13, Warehouse no- 6<br />
                      Jebel Ali Industrial area 1<br />
                      Dubai- U.A.E
                    </p>
                  </div>
                </div>

                {/* Email Row */}
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-gold group-hover:border-brand-gold/50 group-hover:bg-brand-white/2 transition-all duration-300 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="font-euclid font-bold text-[1.8rem] text-brand-gold block tracking-wide uppercase">
                      E-mail:
                    </span>
                    <a 
                      href="mailto:info@bexdxb.com" 
                      className="font-circe font-light text-brand-text-muted hover:text-brand-gold block transition-colors duration-300"
                      style={{ fontSize: '2.5rem' }}
                    >
                      info@bexdxb.com
                    </a>
                  </div>
                </div>

                {/* Telephone Row */}
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-gold group-hover:border-brand-gold/50 group-hover:bg-brand-white/2 transition-all duration-300 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="font-euclid font-bold text-[1.8rem] text-brand-gold block tracking-wide uppercase">
                      Telephone:
                    </span>
                    <a 
                      href="tel:+971552291691" 
                      className="font-circe font-light text-brand-text-muted hover:text-brand-gold block transition-colors duration-300"
                      style={{ fontSize: '2.5rem' }}
                    >
                      +971 55 229 1691
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* India Column */}
            <div className="space-y-12">
              <h2 className="font-urw font-extrabold text-[3rem] md:text-[4rem] tracking-wider uppercase">
                India Address
              </h2>

              <div className="flex flex-col sm:flex-row gap-16 sm:gap-24">
                {/* Left Side: Address */}
                <div className="space-y-4">
                  <span className="font-euclid font-bold text-[1.8rem] text-brand-gold block tracking-wide uppercase">
                    CREO Construction Experts
                  </span>
                  <p className="font-circe font-light text-[2.2rem] text-brand-text-muted leading-relaxed">
                    Arullil Arcade<br />
                    Thrissur Dt.<br />
                    Kerala- INDIA
                  </p>
                </div>

                {/* Right Side: Contact */}
                <div className="space-y-4">
                  <span className="font-euclid font-bold text-[1.8rem] text-brand-gold block tracking-wide uppercase">
                    Contact
                  </span>
                  <a 
                    href="tel:00919188866924" 
                    className="font-circe font-light text-brand-text-muted hover:text-brand-gold block transition-colors duration-300"
                    style={{ fontSize: '2.2rem' }}
                  >
                    0091 9188866924
                  </a>
                  <a 
                    href="tel:00919605218618" 
                    className="font-circe font-light text-brand-text-muted hover:text-brand-gold block transition-colors duration-300"
                    style={{ fontSize: '2.2rem' }}
                  >
                    0091 9605 218618
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form + Side Image Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-12"
          >

            <form onSubmit={handleSubmit} className="space-y-14" noValidate>
              {/* Full Name */}
              <div className={`relative border-b transition-colors duration-300 pt-10 pb-4 ${
                errors.fullName 
                  ? 'border-red-500/40 focus-within:border-red-500' 
                  : 'border-brand-white/15 focus-within:border-brand-gold'
              }`}>
                <label 
                  className={`absolute left-0 text-[2rem] font-circe transition-all duration-300 pointer-events-none ${
                    activeInput === 'fullName' || formData.fullName
                      ? 'top-0 text-[2.2rem] text-brand-gold font-medium'
                      : 'top-8 text-brand-text-muted/70'
                  } ${errors.fullName ? 'text-red-400' : ''}`}
                >
                  Full name <span className="text-brand-gold">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onFocus={() => setActiveInput('fullName')}
                  onBlur={handleBlur}
                  required
                  style={{ fontSize: '3rem' }}
                  className="w-full bg-transparent border-none pt-2 text-brand-white focus:outline-none"
                />
                <AnimatePresence>
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-red-500 font-circe text-[1.6rem] mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" /> {errors.fullName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Company Name */}
              <div className={`relative border-b transition-colors duration-300 pt-10 pb-4 ${
                errors.companyName 
                  ? 'border-red-500/40 focus-within:border-red-500' 
                  : 'border-brand-white/15 focus-within:border-brand-gold'
              }`}>
                <label 
                  className={`absolute left-0 text-[2rem] font-circe transition-all duration-300 pointer-events-none ${
                    activeInput === 'companyName' || formData.companyName
                      ? 'top-0 text-[2.2rem] text-brand-gold font-medium'
                      : 'top-8 text-brand-text-muted/70'
                  } ${errors.companyName ? 'text-red-400' : ''}`}
                >
                  Company name <span className="text-brand-gold">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  onFocus={() => setActiveInput('companyName')}
                  onBlur={handleBlur}
                  required
                  style={{ fontSize: '3rem' }}
                  className="w-full bg-transparent border-none pt-2 text-brand-white focus:outline-none"
                />
                <AnimatePresence>
                  {errors.companyName && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-red-500 font-circe text-[1.6rem] mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" /> {errors.companyName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* E-mail */}
              <div className={`relative border-b transition-colors duration-300 pt-10 pb-4 ${
                errors.email 
                  ? 'border-red-500/40 focus-within:border-red-500' 
                  : 'border-brand-white/15 focus-within:border-brand-gold'
              }`}>
                <label 
                  className={`absolute left-0 text-[2rem] font-circe transition-all duration-300 pointer-events-none ${
                    activeInput === 'email' || formData.email
                      ? 'top-0 text-[2.2rem] text-brand-gold font-medium'
                      : 'top-8 text-brand-text-muted/70'
                  } ${errors.email ? 'text-red-400' : ''}`}
                >
                  E-mail <span className="text-brand-gold">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setActiveInput('email')}
                  onBlur={handleBlur}
                  required
                  style={{ fontSize: '3rem' }}
                  className="w-full bg-transparent border-none pt-2 text-brand-white focus:outline-none"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-red-500 font-circe text-[1.6rem] mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" /> {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone Number */}
              <div className={`relative border-b transition-colors duration-300 pt-10 pb-4 ${
                errors.phoneNumber 
                  ? 'border-red-500/40 focus-within:border-red-500' 
                  : 'border-brand-white/15 focus-within:border-brand-gold'
              }`}>
                <label 
                  className={`absolute left-0 text-[2rem] font-circe transition-all duration-300 pointer-events-none ${
                    activeInput === 'phoneNumber' || formData.phoneNumber
                      ? 'top-0 text-[2.2rem] text-brand-gold font-medium'
                      : 'top-8 text-brand-text-muted/70'
                  } ${errors.phoneNumber ? 'text-red-400' : ''}`}
                >
                  Phone number <span className="text-brand-gold">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  onFocus={() => setActiveInput('phoneNumber')}
                  onBlur={handleBlur}
                  required
                  style={{ fontSize: '3rem' }}
                  className="w-full bg-transparent border-none pt-2 text-brand-white focus:outline-none"
                />
                <AnimatePresence>
                  {errors.phoneNumber && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-red-500 font-circe text-[1.6rem] mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" /> {errors.phoneNumber}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div className={`relative border-b transition-colors duration-300 pt-10 pb-4 ${
                errors.message 
                  ? 'border-red-500/40 focus-within:border-red-500' 
                  : 'border-brand-white/15 focus-within:border-brand-gold'
              }`}>
                <label 
                  className={`absolute left-0 text-[2rem] font-circe transition-all duration-300 pointer-events-none ${
                    activeInput === 'message' || formData.message
                      ? 'top-0 text-[2.2rem] text-brand-gold font-medium'
                      : 'top-8 text-brand-text-muted/70'
                  } ${errors.message ? 'text-red-400' : ''}`}
                >
                  Message <span className="text-brand-gold">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setActiveInput('message')}
                  onBlur={handleBlur}
                  required
                  rows={2}
                  style={{ fontSize: '3rem' }}
                  className="w-full bg-transparent border-none pt-2 text-brand-white resize-none focus:outline-none"
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-red-500 font-circe text-[1.6rem] mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" /> {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Alert Panels */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/35 rounded-xs flex items-center gap-3 text-emerald-400"
                  >
                    <Check className="w-5 h-5 shrink-0" />
                    <span className="font-circe text-[1.8rem]">Thank you! Your message has been sent successfully.</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-rose-500/10 border border-rose-500/35 rounded-xs flex items-center gap-3 text-rose-400"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="font-circe text-[1.8rem]">Form submission failed. Please correct the highlighted errors.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-14 py-5 bg-brand-gold text-brand-white font-euclid font-bold text-[1.6rem] tracking-wider uppercase rounded-xs hover:bg-brand-gold-light transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(158,83,48,0.2)] hover:scale-[1.02] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? 'Sending...' : 'Send'}{' '}
                  <span className="text-[2rem] font-light transition-transform duration-300 group-hover:translate-x-1">+</span>
                </button>

                {/* Fill out the brief Button */}
                <a
                  href="#brief"
                  className="px-12 py-5 border border-brand-white/15 text-brand-white hover:border-brand-gold hover:text-brand-gold font-euclid font-bold text-[1.6rem] tracking-wider uppercase rounded-xs transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] cursor-pointer"
                >
                  Fill out the brief{' '}
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </form>
          </motion.div>

          {/* Right Column: Interactive Image Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative mt-12 lg:mt-0 flex justify-center lg:justify-end"
          >
            <motion.div 
              style={{ 
                perspective: 1000,
                transformStyle: 'preserve-3d'
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ 
                rotateX, 
                rotateY 
              }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 20,
                mass: 0.5
              }}
              className="relative w-full max-w-200 aspect-square z-10 select-none group"
            >
              
              {/* Backing Outline decorative Box 1 (Offset Top-Left) */}
              <div className="absolute -top-[5%] -left-[5%] w-[25%] h-[25%] border border-brand-white/15 pointer-events-none -z-10" />

              {/* Backing Outline decorative Box 2 (Offset Bottom-Right) */}
              <div className="absolute -bottom-[5%] -right-[5%] w-[25%] h-[25%] border border-brand-white/15 pointer-events-none -z-10" />

              {/* Backing Outline decorative Box 3 (Offset Top-Right) */}
              <div className="absolute -top-[5%] -right-[5%] w-[25%] h-[25%] border border-brand-gold/45 pointer-events-none -z-10" />

              {/* Backing Outline decorative Box 4 (Offset Bottom-Left) */}
              <div className="absolute -bottom-[5%] -left-[5%] w-[25%] h-[25%] border border-brand-white/15 pointer-events-none -z-10" />

              {/* Vertical line extending down bottom-left */}
              <div className="absolute left-[2%] -bottom-[15%] w-[1px] h-[25%] bg-brand-gold/40 pointer-events-none -z-10" />

              {/* Top-Left Stepped Box (Nested Solid Accent Square) */}
              <div className="absolute top-[2%] left-[2%] w-[8%] h-[8%] bg-brand-bg/95 border border-brand-white/10 flex items-center justify-center pointer-events-none z-20">
                <div className="w-[45%] h-[45%] bg-brand-gold shadow-[0_0_8px_rgba(212,163,89,0.5)]" />
              </div>

              {/* Bottom-Right Stepped Box (Nested Solid Accent Square) */}
              <div className="absolute bottom-[2%] right-[2%] w-[8%] h-[8%] bg-brand-bg/95 border border-brand-white/10 flex items-center justify-center pointer-events-none z-20">
                <div className="w-[45%] h-[45%] bg-brand-gold shadow-[0_0_8px_rgba(212,163,89,0.5)]" />
              </div>

              {/* Bottom-Left Stepped Box (Nested Larger Solid Accent Square) */}
              <div className="absolute bottom-[2%] left-[2%] w-[8%] h-[8%] bg-brand-bg/95 border border-brand-white/10 flex items-center justify-center pointer-events-none z-20">
                <div className="w-[65%] h-[65%] bg-brand-gold shadow-[0_0_8px_rgba(212,163,89,0.5)]" />
              </div>

              {/* Main Image */}
              <div 
                className="w-full h-full overflow-hidden border border-brand-white/5 shadow-2xl relative"
                style={{
                  clipPath: 'polygon(12% 0%, 88% 0%, 88% 12%, 100% 12%, 100% 88%, 88% 88%, 88% 100%, 12% 100%, 12% 88%, 0% 88%, 0% 12%, 12% 12%)'
                }}
              >
                <img 
                  src="/assets/workspace_meeting.png" 
                  alt="Workspace Meeting" 
                  className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700 hover:scale-[1.03]"
                />
                
                {/* Gradient overlay inside image bottom */}
                <div className="absolute inset-0 bg-linear-to-t from-brand-bg/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Pulsing Hotspots (Only visible when overlay is NOT open) */}
              {!showQuickHelp && hotspots.map((spot) => (
                <div
                  key={spot.id}
                  className="absolute z-20"
                  style={{ top: spot.top, left: spot.left }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setHoveredHotspot(spot.id)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowQuickHelp(true)
                    }}
                    className="relative w-8 h-8 flex items-center justify-center cursor-pointer group/spot"
                    aria-label={`View ${spot.title}`}
                  >
                    {/* Ring 1 - Ping pulse */}
                    <span className="absolute inset-0 rounded-full bg-brand-gold/60 animate-ping opacity-75" />
                    {/* Ring 2 - Steady translucent ring */}
                    <span className="absolute w-5 h-5 rounded-full bg-brand-gold/30 border border-brand-gold/50 scale-100 group-hover/spot:scale-125 transition-transform duration-300" />
                    {/* Core - solid gold dot */}
                    <span className="absolute w-2.5 h-2.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,163,89,0.8)]" />
                  </button>

                  {/* Glassmorphic Tooltip */}
                  <AnimatePresence>
                    {hoveredHotspot === spot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-brand-bg/90 backdrop-blur-md border border-brand-white/10 px-4 py-3 rounded-xs shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-none min-w-56 text-center select-none"
                      >
                        <span className="font-euclid font-bold text-[1.4rem] text-brand-gold block leading-tight mb-1">
                          {spot.title}
                        </span>
                        <span className="font-circe font-light text-[1.2rem] text-brand-text-muted">
                          {spot.desc}
                        </span>
                        {/* Tiny bottom pointing arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-brand-bg/90" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Floating Social Bar (Right edge vertical align) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-brand-white py-6 px-3 flex flex-col gap-6 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 transition-all duration-300 hover:scale-105 border border-black/5">
                <a 
                  href="https://www.youtube.com/@BackdropsDXB" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-dark hover:text-brand-gold transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/_backdrops.ae?igsh=dGlwbWpqazFybXd3" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-dark hover:text-brand-gold transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a 
                  href="https://wa.me/971552291691" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-dark hover:text-brand-gold transition-colors duration-300"
                  aria-label="Chat on WhatsApp"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C16.255 1.876 13.779 1.042 11.14 1.04 5.707 1.04 1.282 5.461 1.277 10.899c-.001 1.816.486 3.594 1.417 5.158l-.979 3.57 3.655-.959c1.506.82 3.1 1.249 4.677 1.25zM17.5 13.9c-.3-.15-1.785-.88-2.087-.99-.3-.105-.52-.15-.74.15-.22.3-.85.99-1.04 1.2-.19.21-.38.24-.68.09-.3-.15-1.265-.465-2.41-1.485-.89-.79-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.135.3-.35.45-.52.15-.17.2-.28.3-.47.1-.19.05-.36-.02-.51-.07-.15-.74-1.785-1.015-2.445-.27-.65-.545-.56-.74-.57-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73s1.18 3.17 1.34 3.39c.17.22 2.32 3.54 5.62 4.97.785.34 1.395.54 1.87.69.79.25 1.51.21 2.08.13.635-.09 1.785-.73 2.035-1.43.25-.7.25-1.3.175-1.43-.075-.1-.275-.15-.575-.3z"/>
                  </svg>
                </a>
              </div>

              {/* Quick Connect Glassmorphic Overlay */}
              <AnimatePresence>
                {showQuickHelp && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-brand-bg/95 backdrop-blur-md z-30 p-8 flex flex-col justify-between border border-brand-white/10 rounded-xs"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-white/10 pb-4">
                      <div>
                        <h4 className="font-urw font-extrabold text-[2.4rem] tracking-wider uppercase text-brand-gold">
                          Quick Connect
                        </h4>
                        <p className="font-circe font-light text-[1.4rem] text-brand-text-muted/80">
                          Get in touch with our team instantly
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowQuickHelp(false)
                        }}
                        className="w-10 h-10 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-text-muted hover:text-brand-gold hover:border-brand-gold/40 hover:bg-brand-white/5 transition-all duration-300 cursor-pointer"
                        aria-label="Close panel"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Action Cards List */}
                    <div className="flex-1 flex flex-col justify-center gap-4 py-6">
                      {/* WhatsApp */}
                      <a
                        href="https://wa.me/971552291691"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-xs border border-brand-white/5 bg-brand-white/2 hover:bg-brand-white/5 hover:border-brand-gold/30 hover:scale-[1.02] transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform duration-300">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C16.255 1.876 13.779 1.042 11.14 1.04 5.707 1.04 1.282 5.461 1.277 10.899c-.001 1.816.486 3.594 1.417 5.158l-.979 3.57 3.655-.959c1.506.82 3.1 1.249 4.677 1.25zM17.5 13.9c-.3-.15-1.785-.88-2.087-.99-.3-.105-.52-.15-.74.15-.22.3-.85.99-1.04 1.2-.19.21-.38.24-.68.09-.3-.15-1.265-.465-2.41-1.485-.89-.79-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.135.3-.35.45-.52.15-.17.2-.28.3-.47.1-.19.05-.36-.02-.51-.07-.15-.74-1.785-1.015-2.445-.27-.65-.545-.56-.74-.57-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73s1.18 3.17 1.34 3.39c.17.22 2.32 3.54 5.62 4.97.785.34 1.395.54 1.87.69.79.25 1.51.21 2.08.13.635-.09 1.785-.73 2.035-1.43.25-.7.25-1.3.175-1.43-.075-.1-.275-.15-.575-.3z"/>
                            </svg>
                          </div>
                          <div className="text-left">
                            <span className="font-euclid font-bold text-[1.6rem] text-brand-white block leading-tight">
                              WhatsApp Chat
                            </span>
                            <span className="font-circe font-light text-[1.3rem] text-brand-text-muted">
                              Message direct for quick updates
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-brand-text-muted group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </a>

                      {/* Phone Call */}
                      <a
                        href="tel:+971552291691"
                        className="flex items-center justify-between p-4 rounded-xs border border-brand-white/5 bg-brand-white/2 hover:bg-brand-white/5 hover:border-brand-gold/30 hover:scale-[1.02] transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-105 transition-transform duration-300">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <span className="font-euclid font-bold text-[1.6rem] text-brand-white block leading-tight">
                              Call Direct
                            </span>
                            <span className="font-circe font-light text-[1.3rem] text-brand-text-muted">
                              +971 55 229 1691
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-brand-text-muted group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </a>

                      {/* E-mail */}
                      <a
                        href="mailto:info@backdrops.ae"
                        className="flex items-center justify-between p-4 rounded-xs border border-brand-white/5 bg-brand-white/2 hover:bg-brand-white/5 hover:border-brand-gold/30 hover:scale-[1.02] transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform duration-300">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <span className="font-euclid font-bold text-[1.6rem] text-brand-white block leading-tight">
                              Email Info
                            </span>
                            <span className="font-circe font-light text-[1.3rem] text-brand-text-muted">
                              info@backdrops.ae
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-brand-text-muted group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </a>

                      {/* Google Maps Location */}
                      <a
                        href="https://maps.google.com/?q=Warehouse+6+Gate+13+Jebel+Ali+Industrial+area+1+Dubai+UAE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-xs border border-brand-white/5 bg-brand-white/2 hover:bg-brand-white/5 hover:border-brand-gold/30 hover:scale-[1.02] transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform duration-300">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <span className="font-euclid font-bold text-[1.6rem] text-brand-white block leading-tight">
                              Showroom Map
                            </span>
                            <span className="font-circe font-light text-[1.3rem] text-brand-text-muted">
                              Get directions to Jebel Ali Industrial area 1
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-brand-text-muted group-hover:text-brand-gold group-hover:scale-105 transition-all duration-300" />
                      </a>
                    </div>

                    {/* Footer */}
                    <div className="text-center border-t border-brand-white/5 pt-4">
                      <span className="font-circe font-light text-[1.2rem] text-brand-text-muted/60">
                        Typical response time: &lt; 15 minutes
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Circular Action Toggle Button (Bottom-Right corner overlay) */}
              <motion.button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowQuickHelp(prev => !prev)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -bottom-7 -right-7 w-16 h-16 bg-brand-gold hover:bg-brand-gold-light text-brand-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-40 group border-2 border-brand-bg"
                aria-label={showQuickHelp ? "Close panel" : "Quick Connect options"}
              >
                {showQuickHelp ? (
                  <X className="w-7 h-7" />
                ) : (
                  <MessageSquare className="w-7 h-7 transition-transform duration-300 group-hover:rotate-15" />
                )}
              </motion.button>
            </motion.div>
          </motion.div>


        </div>

      </div>
    </section>

    {/* Map Section */}
    <section className="relative bg-brand-bg text-brand-white pb-24 md:pb-32 overflow-hidden border-t border-brand-white/5">
      {/* Background shadow overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute bottom-0 right-0 w-[50%] h-[100%] bg-linear-to-tl from-brand-white/2 via-transparent to-transparent opacity-40 transform rotate-12 translate-x-[10%] translate-y-[20%]"
          style={{
            clipPath: 'polygon(0% 20%, 100% 0%, 100% 100%, 0% 100%)',
            backdropFilter: 'blur(4px)',
          }}
        />
      </div>

      {/* Header & Toggle Centered Container */}
      <div className="max-w-560 mx-auto px-6 md:px-12 lg:px-24 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-euclid font-bold text-[1.8rem] text-brand-gold uppercase tracking-wider block mb-2">
              Find Us
            </span>
            <h2 className="font-urw font-extrabold text-[3.5rem] md:text-[4.5rem] tracking-wider uppercase leading-none">
              Our Location
            </h2>
          </div>
          
          {/* View Toggle */}
          <div className="relative bg-brand-white/[0.03] border border-brand-white/10 p-1.5 rounded-full flex gap-2 shadow-lg z-20">
            <button
              type="button"
              onClick={() => setMapView('roadmap')}
              className={`relative px-8 py-3.5 rounded-full font-euclid font-bold text-[1.4rem] uppercase tracking-wider transition-colors duration-300 cursor-pointer z-10 ${
                mapView === 'roadmap' ? 'text-brand-dark font-extrabold' : 'text-brand-white/60 hover:text-brand-white'
              }`}
            >
              {mapView === 'roadmap' && (
                <motion.div
                  layoutId="activeMapTab"
                  className="absolute inset-0 bg-brand-gold rounded-full -z-10"
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                />
              )}
              Standard Map
            </button>
            <button
              type="button"
              onClick={() => setMapView('satellite')}
              className={`relative px-8 py-3.5 rounded-full font-euclid font-bold text-[1.4rem] uppercase tracking-wider transition-colors duration-300 cursor-pointer z-10 ${
                mapView === 'satellite' ? 'text-brand-dark font-extrabold' : 'text-brand-white/60 hover:text-brand-white'
              }`}
            >
              {mapView === 'satellite' && (
                <motion.div
                  layoutId="activeMapTab"
                  className="absolute inset-0 bg-brand-gold rounded-full -z-10"
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                />
              )}
              Satellite View
            </button>
          </div>
        </div>
      </div>

      {/* Full-width Map Frame */}
      <div className="relative w-full border-y border-brand-white/10 bg-brand-white/[0.01] shadow-[0_30px_60px_rgba(0,0,0,0.5)] group overflow-hidden z-10">
        <div className="absolute inset-0 bg-linear-to-tr from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-750 pointer-events-none z-10" />
        
        {/* Map Frame Container */}
        <div className="w-full h-[500px] md:h-[650px] overflow-hidden relative">
          <iframe
            title="Backdrops Location Map"
            src={
              mapView === 'roadmap'
                ? "https://maps.google.com/maps?q=Backdrops%20exhibition,%20Warehouse%20no-%206,%20Gate%20no.13%20-%20Jebel%20Ali%20Industrial%20area%201%20-%20Dubai%20-%20United%20Arab%20Emirates&t=m&z=15&ie=UTF8&iwloc=&output=embed"
                : "https://maps.google.com/maps?q=Backdrops%20exhibition,%20Warehouse%20no-%206,%20Gate%20no.13%20-%20Jebel%20Ali%20Industrial%20area%201%20-%20Dubai%20-%20United%20Arab%20Emirates&t=k&z=18&ie=UTF8&iwloc=&output=embed"
            }
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter grayscale-[15%] contrast-[105%] hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Floating Info Card (Compact Size on the Right Side) */}
        <div className="absolute bottom-12 right-6 left-6 md:left-auto md:right-[10%] lg:right-[16%] md:w-[38rem] bg-brand-bg/95 backdrop-blur-md border border-brand-white/10 p-6 md:p-8 rounded-xs shadow-2xl z-20 transition-transform duration-300 group-hover:translate-y-[-2px]">
          <span className="font-euclid font-bold text-[1.5rem] text-brand-gold uppercase tracking-wider block mb-2">
            Backdrops UAE Showroom & Exhibition
          </span>
          <p className="font-circe font-light text-[1.8rem] text-brand-text-muted leading-relaxed mb-6">
            Warehouse no- 6, Gate no.13<br />Jebel Ali Industrial area 1 - Dubai - United Arab Emirates
          </p>
          <a
            href="https://maps.google.com/?q=Backdrops+exhibition+Warehouse+no-+6+Gate+no.13+Jebel+Ali+Industrial+area+1+Dubai+United+Arab+Emirates"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-euclid font-bold text-[1.5rem] uppercase tracking-wider text-brand-gold hover:text-brand-white transition-colors duration-300 group/link cursor-pointer"
          >
            Get Directions
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
    </>
  )
}


export default Contact
