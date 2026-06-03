import React from 'react'

interface BexLogoProps {
  className?: string
  scale?: number
}

export const BexLogo: React.FC<BexLogoProps> = ({ className = '', scale = 1 }) => {
  return (
    <div 
      className={`flex flex-col items-center select-none ${className}`} 
      style={{ 
        transform: `scale(${scale})`, 
        transformOrigin: 'left center',
        display: 'inline-flex'
      }}
    >
      {/* High-fidelity custom SVG for BEX stylized letters */}
      <svg
        width="110"
        height="56"
        viewBox="0 0 110 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300"
      >
        <g>
          {/* 'B' letter in white */}
          <path
            d="M5 2h19c6.5 0 10.5 3 10.5 8.5 0 4-2.5 6.5-6 7.5 4.5 1 7.5 4.5 7.5 11 0 8.5-5 12.5-13.5 12.5H5V2zm8.5 7.5V18h9c2 0 3-1 3-2.5s-1-2.5-3-2.5h-9zm0 13.5v13.5H23c2.5 0 3.5-1 3.5-3s-1-3-3.5-3h-9.5z"
            fill="#FFFFFF"
          />
          {/* Subtle crescent visual cut separating B and E in gold */}
          <path
            d="M32 2c4.5 5.5 7 12.5 7 20s-2.5 14.5-7 20c4.5-4.5 7.5-11.5 7.5-20S36.5 7.5 32 2z"
            fill="#9E5330"
            opacity="0.15"
          />
          {/* Nesting 'E' in copper-gold */}
          <path
            d="M45 5h16v4.5H51v12h12v4.5H51V38h10v4.5H45V5z"
            fill="#9E5330"
          />
          {/* 'X' in copper-gold */}
          <path
            d="M66 2h9.5l9.5 20.5L94.5 2H104L89 27.5 104.5 47H95l-9.5-20-9.5 20H66.5l15.5-24-16-21z"
            fill="#9E5330"
          />
        </g>
      </svg>
      
      {/* Subtexts formatted to match screenshot branding */}
      <span className="font-sans font-bold text-[1.2rem] tracking-[0.35em] text-brand-white uppercase mt-1.5 leading-none text-center pl-[0.35em]">
        BACKDROPS
      </span>
      <span className="font-sans font-semibold text-[0.8rem] tracking-[0.2em] text-brand-gold uppercase mt-1 leading-none text-center pl-[0.2em]">
        -EXHIBITIONS-
      </span>
    </div>
  )
}

export default BexLogo
