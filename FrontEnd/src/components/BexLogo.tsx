import React from 'react'
import logoImg from '../assets/logo.png'

interface BexLogoProps {
  className?: string
  scale?: number
}

export const BexLogo: React.FC<BexLogoProps> = ({ className = '', scale = 1 }) => {
  return (
    <div 
      className={`select-none ${className}`} 
      style={{ 
        transform: `scale(${scale})`, 
        transformOrigin: 'left center',
        display: 'inline-flex',
        alignItems: 'center'
      }}
    >
      <img 
        src={logoImg} 
        alt="BEX Logo" 
        className="h-16 w-auto object-contain transition-colors duration-300"
      />
    </div>
  )
}

export default BexLogo
