import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XCircle, LogOut, Lock, RefreshCw, ArrowRight, UploadCloud, 
  Trash2, Plus, CheckCircle, X, Eye, EyeOff
} from 'lucide-react'

// Stand Interface
interface StandImage {
  url: string;
  publicId: string;
  _id?: string;
}

interface Stand {
  _id: string;
  typeOfStands: string[];
  typeOfEvents: string[];
  year: number;
  categories: string[];
  showName: string;
  standArea: number;
  location: string;
  client: string;
  images: StandImage[];
  listed?: boolean;
  createdAt: string;
}

// Multi-select options configuration
const STAND_TYPES = [
  { value: 'double decker stand', label: 'Double Decker Stand' },
  { value: 'corner stand', label: 'Corner Stand' },
  { value: 'peninsula stand', label: 'Peninsula Stand' },
  { value: 'island stand', label: 'Island Stand' },
  { value: 'custom / built stand', label: 'Custom / Built Stand' },
  { value: 'Inline/ linear stand', label: 'Inline / Linear Stand' },
  { value: 'Smart stands', label: 'Smart Stands' },
  { value: 'outdoor stands', label: 'Outdoor Stands' }
]

const EVENT_TYPES = [
  { value: 'trade shows and exhibition', label: 'Trade Shows & Exhibition' },
  { value: 'conference', label: 'Conference' },
  { value: 'forum', label: 'Forum' },
  { value: 'product launches', label: 'Product Launches' },
  { value: 'Festivals & concerts', label: 'Festivals & Concerts' },
  { value: 'brand activation', label: 'Brand Activation' },
  { value: 'sports events', label: 'Sports Events' },
  { value: 'corporate events', label: 'Corporate Events' },
  { value: 'congress', label: 'Congress' }
]

const AdminPortal: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  
  // Stand management states
  const [stands, setStands] = useState<Stand[]>([])
  const [standsLoading, setStandsLoading] = useState(false)
  const [standsError, setStandsError] = useState<string | null>(null)

  // Form states (multi-select arrays)
  const [typeOfStands, setTypeOfStands] = useState<string[]>([])
  const [typeOfEvents, setTypeOfEvents] = useState<string[]>([])
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [categories, setCategories] = useState('')
  const [showName, setShowName] = useState('')
  const [standArea, setStandArea] = useState('')
  const [location, setLocation] = useState('')
  const [client, setClient] = useState('')
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  // Filter stands based on search query
  const filteredStands = stands.filter((stand) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase().trim()
    const fieldsToSearch = [
      stand.showName,
      stand.client,
      stand.location,
      stand.year?.toString(),
      stand.standArea?.toString(),
      ...(stand.typeOfStands || []),
      ...(stand.categories || []),
      ...(stand.typeOfEvents || [])
    ]
    return fieldsToSearch.some(field => field && field.toLowerCase().includes(query))
  })

  // Fetch stands from DB
  const fetchStands = async (customToken?: string) => {
    const token = customToken || localStorage.getItem('backdrops_admin_token')
    if (!token) return

    setStandsLoading(true)
    setStandsError(null)

    try {
      const res = await fetch(`${apiBaseUrl}/api/stands`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStands(data.stands)
      } else {
        setStandsError(data.error || 'Failed to fetch stands.')
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setStandsError('Failed to load stands. Server connection error.')
    } finally {
      setStandsLoading(false)
    }
  }

  // Check auth status on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('backdrops_admin_token')
      if (!token) {
        setAuthChecking(false)
        return
      }

      try {
        const res = await fetch(`${apiBaseUrl}/api/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.json()
        if (res.ok && data.success) {
          setIsAuthenticated(true)
          fetchStands(token)
        } else {
          localStorage.removeItem('backdrops_admin_token')
        }
      } catch (err) {
        console.error('Verify error:', err)
      } finally {
        setAuthChecking(false)
      }
    }

    verifyToken()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    setLoginError(null)

    try {
      const res = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        localStorage.setItem('backdrops_admin_token', data.token)
        setIsAuthenticated(true)
        setEmail('')
        setPassword('')
        fetchStands(data.token)
      } else {
        setLoginError(data.error || 'Invalid credentials.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setLoginError('Server connection failed.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('backdrops_admin_token')
    setIsAuthenticated(false)
    setStands([])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const imageFiles = filesArray.filter(file => file.type.startsWith('image/'))
      
      setSelectedFiles(prev => [...prev, ...imageFiles])
      
      const newPreviews = imageFiles.map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...newPreviews])
    }
  }

  const handleRemoveFile = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index])
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const toggleStandType = (val: string) => {
    setTypeOfStands(prev => 
      prev.includes(val) 
        ? prev.filter(item => item !== val) 
        : [...prev, val]
    )
  }

  const toggleEventType = (val: string) => {
    setTypeOfEvents(prev => 
      prev.includes(val) 
        ? prev.filter(item => item !== val) 
        : [...prev, val]
    )
  }

  const handleDeleteStand = async (id: string) => {
    const token = localStorage.getItem('backdrops_admin_token')
    if (!token) return

    if (!window.confirm('Are you sure you want to delete this stand? This will also delete its images from Cloudinary.')) {
      return
    }

    setDeletingId(id)

    try {
      const res = await fetch(`${apiBaseUrl}/api/stands/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStands(prev => prev.filter(s => s._id !== id))
      } else {
        alert(data.error || 'Failed to delete stand.')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete stand due to a network error.')
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleListed = async (id: string) => {
    const token = localStorage.getItem('backdrops_admin_token')
    if (!token) return

    setTogglingId(id)

    try {
      const res = await fetch(`${apiBaseUrl}/api/stands/${id}/toggle-listed`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStands(prev => prev.map(s => {
          if (s._id === id) {
            return { ...s, listed: data.stand.listed }
          }
          return s
        }))
      } else {
        alert(data.error || 'Failed to toggle stand listing status.')
      }
    } catch (err) {
      console.error('Toggle status error:', err)
      alert('Failed to toggle status due to a network error.')
    } finally {
      setTogglingId(null)
    }
  }


  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('backdrops_admin_token')
    if (!token) return

    setUploadError(null)
    setUploadSuccess(null)

    // Strict Field Validations
    if (!showName || showName.trim().length < 3 || showName.trim().length > 100) {
      setUploadError('Show Name must be between 3 and 100 characters.')
      return
    }

    if (!client || client.trim().length < 2 || client.trim().length > 100) {
      setUploadError('Client Name must be between 2 and 100 characters.')
      return
    }

    if (typeOfStands.length === 0) {
      setUploadError('Please select at least one Type of Stand.')
      return
    }

    const validStandValues = STAND_TYPES.map(t => t.value)
    const hasInvalidStand = typeOfStands.some(val => !validStandValues.includes(val))
    if (hasInvalidStand) {
      setUploadError('One or more selected Stand Types are invalid.')
      return
    }

    if (typeOfEvents.length === 0) {
      setUploadError('Please select at least one Type of Event.')
      return
    }

    const validEventValues = EVENT_TYPES.map(e => e.value)
    const hasInvalidEvent = typeOfEvents.some(val => !validEventValues.includes(val))
    if (hasInvalidEvent) {
      setUploadError('One or more selected Event Types are invalid.')
      return
    }

    const parsedYear = parseInt(year, 10)
    const currentYear = new Date().getFullYear()
    if (isNaN(parsedYear) || parsedYear < 2000 || parsedYear > currentYear + 10) {
      setUploadError(`Year must be a valid number between 2000 and ${currentYear + 10}.`)
      return
    }

    const parsedArea = parseFloat(standArea)
    if (isNaN(parsedArea) || parsedArea <= 0 || parsedArea > 100000) {
      setUploadError('Stand Area must be a positive number greater than 0 sqm.')
      return
    }

    if (!location || location.trim().length < 3 || location.trim().length > 200) {
      setUploadError('Location must be between 3 and 200 characters.')
      return
    }

    const validCategories = ['UAE projects', 'GCC projects', 'International projects']
    if (!categories || !validCategories.includes(categories)) {
      setUploadError('Please select a valid Category (UAE, GCC, or International Projects).')
      return
    }

    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one image.')
      return
    }

    // Validate file types (JPEG/PNG/WEBP only, no size limit restriction)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    for (const file of selectedFiles) {
      if (!allowedTypes.includes(file.type)) {
        setUploadError(`File "${file.name}" is not a supported format. Supported formats: JPG, JPEG, PNG, WEBP.`);
        return
      }
    }

    setIsUploading(true)

    const formData = new FormData()
    formData.append('typeOfStands', typeOfStands.join(','))
    formData.append('typeOfEvents', typeOfEvents.join(','))
    formData.append('year', year)
    formData.append('categories', categories)
    formData.append('showName', showName)
    formData.append('standArea', standArea)
    formData.append('location', location)
    formData.append('client', client)

    selectedFiles.forEach(file => {
      formData.append('images', file)
    })

    try {
      const res = await fetch(`${apiBaseUrl}/api/stands`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setUploadSuccess('Stand uploaded and saved successfully!')
        
        // Reset form
        setTypeOfStands([])
        setTypeOfEvents([])
        setYear(new Date().getFullYear().toString())
        setCategories('')
        setShowName('')
        setStandArea('')
        setLocation('')
        setClient('')
        
        // Revoke previews to prevent memory leak
        imagePreviews.forEach(url => URL.revokeObjectURL(url))
        setSelectedFiles([])
        setImagePreviews([])
        
        // Refresh stand list
        fetchStands(token)
      } else {
        setUploadError(data.error || 'Failed to upload stand data.')
      }
    } catch (err) {
      console.error('Upload error:', err)
      setUploadError('Failed to upload stand. Server connection failed.')
    } finally {
      setIsUploading(false)
    }
  }

  // Render Spinner during verification
  if (authChecking) {
    return (
      <div className="bg-brand-bg text-brand-white min-h-screen flex items-center justify-center relative overflow-hidden select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh] bg-brand-gold/10 rounded-full blur-[100px]" />
        <div className="flex flex-col items-center gap-[2rem] z-10">
          <RefreshCw className="w-[4rem] h-[4rem] text-brand-gold animate-spin" />
          <p className="font-circe font-light text-[1.8rem] text-brand-text-muted tracking-widest uppercase">
            Verifying Authentication...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-brand-bg text-brand-white min-h-screen relative overflow-hidden select-none pt-[12rem] pb-[8rem]">
      {/* Background aesthetics */}
      <div className="absolute left-[33%] top-0 bottom-0 w-[1px] bg-white/[0.03] z-10 pointer-events-none hidden md:block" />
      <div className="absolute left-[66%] top-0 bottom-0 w-[1px] bg-white/[0.03] z-10 pointer-events-none hidden md:block" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[70vh] h-[70vh] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[140rem] mx-auto px-6 md:px-12 relative z-20">
        
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            // ================= LOGIN VIEW =================
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center min-h-[60vh] pt-[4rem]"
            >
              <div className="glass-panel w-full max-w-[50rem] rounded-lg p-[4rem] border border-white/5 shadow-2xl relative">
                {/* Decorative gold dot */}
                <div className="absolute -top-[1.5rem] -left-[1.5rem] w-[3rem] h-[3rem] bg-brand-bg border border-white/10 flex items-center justify-center rounded-xs">
                  <div className="w-[1rem] h-[1rem] bg-brand-gold shadow-[0_0_8px_rgba(158,83,48,0.8)]" />
                </div>
                
                <div className="text-center mb-[3rem]">
                  <div className="inline-flex items-center justify-center w-[6rem] h-[6rem] rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-[1.5rem]">
                    <Lock className="w-[2.4rem] h-[2.4rem]" />
                  </div>
                  <h1 className="font-urw font-extrabold text-[3rem] text-white uppercase tracking-wider">
                    Admin Portal
                  </h1>
                  <p className="font-circe font-light text-[1.6rem] text-brand-text-muted mt-2">
                    Enter credentials to access configuration
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-[2.5rem]">
                  {/* Email Input */}
                  <div className="space-y-[0.8rem]">
                    <label className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@backdrops.ae"
                      className="w-full bg-brand-dark/50 border border-brand-border rounded-xs px-[1.5rem] py-[1.2rem] text-[1.8rem] text-white focus:border-brand-gold focus:outline-none transition-colors duration-300 placeholder:text-white/20"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="space-y-[0.8rem]">
                    <label className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider block">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-brand-dark/50 border border-brand-border rounded-xs px-[1.5rem] py-[1.2rem] text-[1.8rem] text-white focus:border-brand-gold focus:outline-none transition-colors duration-300 placeholder:text-white/20"
                    />
                  </div>

                  {/* Error display */}
                  <AnimatePresence>
                    {loginError && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="p-[1.2rem] bg-rose-500/10 border border-rose-500/25 rounded-xs flex items-center gap-3 text-rose-400"
                      >
                        <XCircle className="w-5 h-5 shrink-0" />
                        <span className="font-circe text-[1.4rem]">{loginError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-[1.4rem] bg-brand-gold text-white font-euclid font-bold text-[1.6rem] tracking-wider uppercase rounded-xs hover:bg-brand-gold-light transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(158,83,48,0.2)] hover:scale-[1.02] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verifying...' : 'Sign In'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            // ================= DASHBOARD VIEW =================
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="space-y-[4rem]"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5 pb-[3rem]">
                <div>
                  <nav className="font-circe font-light text-[1.5rem] text-brand-text-muted tracking-wide flex items-center gap-2.5 mb-2">
                    <span>Backdrops Admin Control</span>
                    <span className="opacity-40">/</span>
                    <span className="text-white font-normal">Management Console</span>
                  </nav>
                  <h1 className="font-urw font-extrabold text-[4rem] sm:text-[5.5rem] text-white uppercase tracking-wider leading-none">
                    Project Manager
                  </h1>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-brand-dark-accent/60 hover:bg-brand-gold hover:text-white transition-all duration-300 font-euclid font-bold tracking-wider text-[1.4rem] uppercase py-4 px-[2rem] border border-white/5 hover:border-brand-gold rounded-xs cursor-pointer flex items-center gap-3 shadow-lg group/logout"
                >
                  <LogOut className="w-5 h-5 group-hover/logout:translate-x-0.5 transition-transform" />
                  Sign Out
                </button>
              </div>

              {/* Main Content: Stand Upload Form */}
              <div className="glass-panel rounded-lg p-[3rem] md:p-[4rem] border border-white/5 relative overflow-hidden shadow-2xl">
                <h2 className="font-urw font-extrabold text-[2.4rem] text-brand-gold uppercase tracking-wider mb-[3rem] flex items-center gap-3">
                  <Plus className="w-8 h-8" />
                  Add New Stand Project
                </h2>

                <form onSubmit={handleUploadSubmit} className="space-y-[3rem]">
                  {/* Grid Layout for Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[4rem] gap-y-[2.5rem]">
                    {/* Left Column */}
                    <div className="space-y-[2.5rem]">
                      {/* Show Name */}
                      <div className="space-y-[0.8rem]">
                        <label className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider block font-semibold">
                          Show Name
                        </label>
                        <input
                          type="text"
                          required
                          value={showName}
                          onChange={(e) => setShowName(e.target.value)}
                          placeholder="e.g. Gitex Global 2026"
                          className="w-full bg-brand-dark/50 border border-brand-border rounded-xs px-[1.5rem] py-[1.2rem] text-[1.8rem] text-white focus:border-brand-gold focus:outline-none transition-colors duration-300 placeholder:text-white/10"
                        />
                      </div>

                      {/* Client */}
                      <div className="space-y-[0.8rem]">
                        <label className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider block font-semibold">
                          Client Name
                        </label>
                        <input
                          type="text"
                          required
                          value={client}
                          onChange={(e) => setClient(e.target.value)}
                          placeholder="e.g. Google Cloud"
                          className="w-full bg-brand-dark/50 border border-brand-border rounded-xs px-[1.5rem] py-[1.2rem] text-[1.8rem] text-white focus:border-brand-gold focus:outline-none transition-colors duration-300 placeholder:text-white/10"
                        />
                      </div>

                      {/* Type of Stands - Multi-Select Pills */}
                      <div className="space-y-[1.2rem]">
                        <label className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider block font-semibold">
                          Type of Stands <span className="text-brand-gold text-[1.1rem] lowercase font-normal">(select one or more - minimum 1 required)</span>
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {STAND_TYPES.map((type) => {
                            const isSelected = typeOfStands.includes(type.value)
                            return (
                              <button
                                key={type.value}
                                type="button"
                                onClick={() => toggleStandType(type.value)}
                                className={`px-4 py-2 text-[1.6rem] font-circe rounded-sm border transition-all duration-300 cursor-pointer ${
                                  isSelected
                                    ? 'bg-brand-gold text-white border-brand-gold shadow-[0_4px_12px_rgba(158,83,48,0.2)] font-semibold'
                                    : 'bg-brand-dark/20 text-brand-text-muted border-white/5 hover:border-brand-gold/30 hover:text-white'
                                }`}
                              >
                                {type.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Type of Events - Multi-Select Pills */}
                      <div className="space-y-[1.2rem]">
                        <label className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider block font-semibold">
                          Type of Events <span className="text-brand-gold text-[1.1rem] lowercase font-normal">(select one or more - minimum 1 required)</span>
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {EVENT_TYPES.map((type) => {
                            const isSelected = typeOfEvents.includes(type.value)
                            return (
                              <button
                                key={type.value}
                                type="button"
                                onClick={() => toggleEventType(type.value)}
                                className={`px-4 py-2 text-[1.6rem] font-circe rounded-sm border transition-all duration-300 cursor-pointer ${
                                  isSelected
                                    ? 'bg-brand-gold text-white border-brand-gold shadow-[0_4px_12px_rgba(158,83,48,0.2)] font-semibold'
                                    : 'bg-brand-dark/20 text-brand-text-muted border-white/5 hover:border-brand-gold/30 hover:text-white'
                                }`}
                              >
                                {type.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-[2.5rem]">
                      {/* Year */}
                      <div className="space-y-[0.8rem]">
                        <label className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider block font-semibold">
                          Year
                        </label>
                        <input
                          type="number"
                          required
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          placeholder="e.g. 2026"
                          className="w-full bg-brand-dark/50 border border-brand-border rounded-xs px-[1.5rem] py-[1.2rem] text-[1.8rem] text-white focus:border-brand-gold focus:outline-none transition-colors duration-300 placeholder:text-white/10"
                        />
                      </div>

                      {/* Stand Area */}
                      <div className="space-y-[0.8rem]">
                        <label className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider block font-semibold">
                          Stand Area (sqm)
                        </label>
                        <input
                          type="number"
                          step="any"
                          required
                          value={standArea}
                          onChange={(e) => setStandArea(e.target.value)}
                          placeholder="e.g. 54"
                          className="w-full bg-brand-dark/50 border border-brand-border rounded-xs px-[1.5rem] py-[1.2rem] text-[1.8rem] text-white focus:border-brand-gold focus:outline-none transition-colors duration-300 placeholder:text-white/10"
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-[0.8rem]">
                        <label className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider block font-semibold">
                          Location
                        </label>
                        <input
                          type="text"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. DWTC, Dubai, UAE"
                          className="w-full bg-brand-dark/50 border border-brand-border rounded-xs px-[1.5rem] py-[1.2rem] text-[1.8rem] text-white focus:border-brand-gold focus:outline-none transition-colors duration-300 placeholder:text-white/10"
                        />
                      </div>

                      {/* Categories */}
                      <div className="space-y-[0.8rem]">
                        <label className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider block font-semibold">
                          Categories
                        </label>
                        <select
                          required
                          value={categories}
                          onChange={(e) => setCategories(e.target.value)}
                          className="w-full bg-brand-dark/50 border border-brand-border rounded-xs px-[1.5rem] py-[1.2rem] text-[1.8rem] text-white focus:border-brand-gold focus:outline-none transition-colors duration-300 [&>option]:bg-brand-bg [&>option]:text-white cursor-pointer"
                        >
                          <option value="" disabled>Select category</option>
                          <option value="UAE projects">UAE Projects</option>
                          <option value="GCC projects">GCC Projects</option>
                          <option value="International projects">International Projects</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Image Upload Area */}
                  <div className="space-y-[1.2rem]">
                    <label className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider block font-bold">
                      Select Project Images
                    </label>
                    <div className="border border-dashed border-white/20 hover:border-brand-gold/50 rounded-lg p-[3rem] text-center cursor-pointer transition-colors duration-300 relative bg-brand-dark/20 group">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                        <UploadCloud className="w-[4.8rem] h-[4.8rem] text-brand-text-muted group-hover:text-brand-gold transition-colors duration-300" />
                        <p className="font-euclid text-[1.6rem] text-white font-semibold">
                          Drag & Drop or Click to browse images
                        </p>
                        <p className="font-circe text-[1.3rem] text-brand-text-muted">
                          Supports PNG, JPG, JPEG, WEBP.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="space-y-4">
                      <p className="font-circe text-[1.4rem] text-brand-text-muted uppercase tracking-wider">
                        Image Previews ({imagePreviews.length})
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {imagePreviews.map((previewUrl, idx) => (
                          <div key={idx} className="relative aspect-video rounded-md overflow-hidden border border-white/10 group shadow-md">
                            <img src={previewUrl} alt={`preview ${idx}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(idx)}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                              <span className="font-mono text-[1rem] text-white">Image {idx + 1}</span>
                            </div>
                          </div>
                        ))}
                        
                        {/* Dynamic Add More images card */}
                        <div className="relative aspect-video rounded-md overflow-hidden border border-dashed border-white/20 hover:border-brand-gold/50 bg-brand-dark/10 hover:bg-brand-dark/25 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <Plus className="w-8 h-8 text-brand-text-muted group-hover:text-brand-gold transition-colors duration-300" />
                          <span className="font-circe text-[1.2rem] text-brand-text-muted group-hover:text-white transition-colors duration-300 mt-1">Add More</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status Alerts */}
                  <AnimatePresence>
                    {uploadError && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="p-[1.5rem] bg-rose-500/10 border border-rose-500/25 rounded-xs flex items-center gap-3 text-rose-400"
                      >
                        <XCircle className="w-6 h-6 shrink-0" />
                        <span className="font-circe text-[1.5rem]">{uploadError}</span>
                      </motion.div>
                    )}

                    {uploadSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="p-[1.5rem] bg-emerald-500/10 border border-emerald-500/25 rounded-xs flex items-center gap-3 text-emerald-400"
                      >
                        <CheckCircle className="w-6 h-6 shrink-0" />
                        <span className="font-circe text-[1.5rem]">{uploadSuccess}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form Submission Button */}
                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="py-[1.4rem] px-[4rem] bg-brand-gold text-white font-euclid font-bold text-[1.5rem] tracking-wider uppercase rounded-xs hover:bg-brand-gold-light transition-all duration-300 flex items-center gap-3 shadow-[0_10px_20px_rgba(158,83,48,0.2)] hover:scale-[1.02] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Uploading Stand Data...
                        </>
                      ) : (
                        <>
                          Upload Stand
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Stands Gallery Management */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 gap-4">
                  <h2 className="font-urw font-extrabold text-[2.4rem] text-white uppercase tracking-wider">
                    Manage Existing Stands
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                    {/* Search Input Box */}
                    <div className="relative border border-white/10 bg-white/[0.02] rounded-xs px-4 py-2 flex items-center min-w-[24rem] w-full md:w-auto focus-within:border-brand-gold transition-colors duration-300">
                      <input
                        type="text"
                        placeholder="Search stands..."
                        className="bg-transparent font-circe text-[1.6rem] text-white outline-none placeholder:text-brand-text-muted/40 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <span className="bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-mono text-[1.4rem] py-1 px-3 rounded-full shrink-0">
                      {filteredStands.length} / {stands.length} Total
                    </span>
                  </div>
                </div>

                {standsLoading ? (
                  <div className="flex flex-col items-center justify-center py-[5rem] space-y-4">
                    <RefreshCw className="w-[3rem] h-[3rem] text-brand-gold animate-spin" />
                    <p className="font-circe text-brand-text-muted text-[1.6rem]">Loading projects...</p>
                  </div>
                ) : standsError ? (
                  <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-md text-rose-400 text-center font-circe text-[1.6rem]">
                    {standsError}
                  </div>
                ) : stands.length === 0 ? (
                  <div className="text-center py-[6rem] border border-dashed border-white/5 rounded-lg text-brand-text-muted font-circe text-[1.6rem] bg-brand-dark/10">
                    No stands have been uploaded yet. Fill in the form above to add your first project.
                  </div>
                ) : filteredStands.length === 0 ? (
                  <div className="text-center py-[6rem] border border-dashed border-white/5 rounded-lg text-brand-text-muted font-circe text-[1.6rem] bg-brand-dark/10">
                    No stands match your search query. Try searching for a different keyword.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStands.map((stand) => (
                      <div key={stand._id} className="glass-panel border border-white/5 rounded-lg overflow-hidden flex flex-col h-full hover:border-white/10 transition-colors duration-300 shadow-lg group">
                        {/* Stand Card Thumbnail */}
                        <div className="aspect-video w-full overflow-hidden bg-brand-dark relative">
                          {stand.images && stand.images.length > 0 ? (
                            <img
                              src={stand.images[0].url}
                              alt={stand.showName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-brand-text-muted">
                              No Image Available
                            </div>
                          )}
                          
                          {/* Listed / Unlisted Badge */}
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className={`flex items-center gap-1.5 font-mono text-[1.1rem] py-1 px-2.5 rounded font-bold uppercase ${
                              stand.listed !== false 
                                ? 'bg-emerald-500/90 text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)]' 
                                : 'bg-zinc-600/90 text-zinc-300 line-through'
                            }`}>
                              {stand.listed !== false ? (
                                <>
                                  <Eye className="w-3.5 h-3.5" />
                                  Listed
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3.5 h-3.5" />
                                  Unlisted
                                </>
                              )}
                            </span>
                          </div>

                          <div className="absolute top-3 right-3 bg-brand-bg/85 border border-white/10 font-mono text-[1.2rem] py-1 px-2.5 rounded text-white font-bold">
                            {stand.year}
                          </div>
                        </div>

                        {/* Stand Metadata Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                          <div className="space-y-4 text-left">
                            <div>
                              <p className="font-circe text-[1.2rem] text-brand-gold uppercase tracking-widest font-semibold">
                                {stand.client}
                              </p>
                              <h3 className="font-urw font-extrabold text-[2rem] text-white uppercase tracking-wide truncate">
                                {stand.showName}
                              </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5 text-[1.4rem] font-circe text-brand-text-muted">
                              <div className="flex flex-col">
                                <span className="text-[1.1rem] uppercase tracking-wider opacity-60">Stands Type</span>
                                <span className="text-white font-medium truncate">
                                  {stand.typeOfStands && Array.isArray(stand.typeOfStands) ? stand.typeOfStands.join(', ') : stand.typeOfStands}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[1.1rem] uppercase tracking-wider opacity-60">Area</span>
                                <span className="text-white font-medium">{stand.standArea} sqm</span>
                              </div>
                              <div className="flex flex-col col-span-2">
                                <span className="text-[1.1rem] uppercase tracking-wider opacity-60">Location</span>
                                <span className="text-white font-medium truncate">{stand.location}</span>
                              </div>
                            </div>

                            {/* Categories tags */}
                            {stand.categories && stand.categories.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-2">
                                {stand.categories.map((cat, i) => (
                                  <span key={i} className="text-[1.1rem] bg-white/5 border border-white/10 text-brand-text-muted py-0.5 px-2 rounded-sm font-circe">
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                            <div className="flex gap-2">
                              {/* Toggle Listed/Unlisted Button */}
                              <button
                                onClick={() => handleToggleListed(stand._id)}
                                disabled={togglingId === stand._id}
                                className={`p-2.5 rounded-sm border transition-all duration-300 flex items-center justify-center gap-2 text-[1.3rem] font-bold uppercase tracking-wider cursor-pointer font-semibold ${
                                  stand.listed !== false
                                    ? 'border-white/10 hover:border-amber-500 hover:text-amber-500 text-zinc-400'
                                    : 'border-white/10 hover:border-emerald-500 hover:text-emerald-500 text-zinc-400'
                                }`}
                                title={stand.listed !== false ? "Click to Unlist" : "Click to List"}
                              >
                                {togglingId === stand._id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : stand.listed !== false ? (
                                  <>
                                    <EyeOff className="w-4 h-4" />
                                    Unlist
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-4 h-4" />
                                    List
                                  </>
                                )}
                              </button>

                              {/* Delete Button */}
                              <button
                                onClick={() => handleDeleteStand(stand._id)}
                                disabled={deletingId === stand._id}
                                className="p-2.5 border border-white/10 hover:border-red-500 hover:text-red-500 text-zinc-400 rounded-sm transition-all duration-300 flex items-center justify-center cursor-pointer"
                                title="Delete Stand"
                              >
                                {deletingId === stand._id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>

                            <button
                              onClick={() => navigate(`/portfolio/detail?dbId=${stand._id}`)}
                              className="text-brand-gold hover:text-white hover:bg-brand-gold border border-brand-gold/20 hover:border-brand-gold px-4 py-2.5 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 text-[1.3rem] font-bold uppercase tracking-wider cursor-pointer font-semibold"
                              title="View details"
                            >
                              View Details
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

export default AdminPortal
