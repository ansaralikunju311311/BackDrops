import React from 'react'
import logoImg from '../assets/fixedlogo.png'

interface BexLogoProps {
  className?: string
  scale?: number
}

export const BexLogo: React.FC<BexLogoProps> = ({ className = '', scale = 1 }) => {
  return (
    <div 
      className={`select-none transition-transform duration-500 ease-out ${className}`} 
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
        className="h-24 md:h-36 lg:h-52 w-auto object-contain transition-all duration-300"
      />
    </div>
  )
}

export default BexLogo
