import React from 'react';

interface BrandLogoProps {
  logoUrl?: string;
  className?: string;
}

export default function BrandLogo({ logoUrl = '', className = 'w-full h-full' }: BrandLogoProps) {
  // Sanitize the URL to check for present options
  const url = logoUrl.trim();
  const isOne = url.includes('logo_option_one.png');
  const isTwo = url.includes('logo_option_two.png');
  const isThree = url.includes('logo_option_three.png');

  if (isOne) {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={`${className} select-none`} 
        aria-label="Traditional Connection Logo Concept"
      >
        <defs>
          <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#311042" />
          </linearGradient>
        </defs>
        
        {/* Background rounded card */}
        <rect width="100%" height="100%" rx="24" fill="url(#indigoGrad)" />
        
        {/* Stylized Book outline in the background of the logo (Warm cream) */}
        <path 
          d="M 20 80 Q 50 72 80 80 L 80 45 Q 50 37 20 45 Z" 
          fill="none" 
          stroke="#FDF6E2" 
          strokeWidth="3.5" 
          strokeOpacity="0.25" 
        />
        <path 
          d="M 50 37 L 50 76" 
          stroke="#FDF6E2" 
          strokeWidth="2.5" 
          strokeOpacity="0.25" 
        />
        
        {/* Glowing orange star (children's potential) in top corner */}
        <path 
          d="M 22 18 L 24 23 L 29 23 L 25 26 L 27 31 L 22 28 L 17 31 L 19 26 L 15 23 L 20 23 Z" 
          fill="#F59E0B" 
          className="animate-pulse"
        />

        {/* ENLARGED central Ge'ez numeral ፪ (huge, bold, and unmissable) */}
        <text
          x="50"
          y="48"
          fill="#FDF6E2"
          fontSize="48"
          fontWeight="900"
          fontFamily="serif, Inter"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ textShadow: '1px 1.5px 3px rgba(0,0,0,0.4)' }}
        >
          ፪
        </text>
        
        {/* Additional decorative frame */}
        <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="#F55F0B" strokeWidth="1.5" strokeOpacity="0.1" />
      </svg>
    );
  }

  if (isTwo) {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={`${className} select-none`} 
        aria-label="Century of Brilliance Logo Concept"
      >
        <defs>
          <linearGradient id="slateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        
        {/* Background rounded card */}
        <rect width="100%" height="100%" rx="24" fill="url(#slateGrad)" />
        
        {/* Double elegant gold border lines */}
        <rect x="8" y="8" width="84" height="84" rx="16" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" strokeOpacity="0.85" />
        <rect x="13" y="13" width="74" height="74" rx="11" fill="none" stroke="url(#goldGrad)" strokeWidth="1" strokeOpacity="0.3" />

        {/* ENLARGED central Ge'ez numeral ፻ (symbolizing 100% excellence) */}
        <text
          x="50"
          y="49"
          fill="url(#goldGrad)"
          fontSize="48"
          fontWeight="900"
          fontFamily="serif, Inter"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.5)' }}
        >
          ፻
        </text>
      </svg>
    );
  }

  if (isThree) {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={`${className} select-none`} 
        aria-label="LinguKid Friendly Logo Concept"
      >
        <defs>
          <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#065f46" />
          </linearGradient>
          <linearGradient id="warmGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>
        
        {/* Background rounded card */}
        <rect width="100%" height="100%" rx="24" fill="url(#emeraldGrad)" />
        
        {/* Handcrafted ribbon accent behind letter */}
        <path d="M 50 12 L 24 35 L 24 55 Q 50 48 76 55 L 76 35 Z" fill="#b45309" fillOpacity="0.15" />

        {/* Playful dashed border */}
        <rect x="8" y="8" width="84" height="84" rx="16" fill="none" stroke="url(#warmGold)" strokeWidth="2" strokeDasharray="4,3" strokeOpacity="0.8" />

        {/* ENLARGED central Ge'ez letter ሀ (warm, bold, kid-friendly) */}
        <text
          x="51"
          y="49"
          fill="url(#warmGold)"
          fontSize="50"
          fontWeight="900"
          fontFamily="serif, Inter"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ textShadow: '1px 2px 3px rgba(0,0,0,0.3)' }}
        >
          ሀ
        </text>

        {/* Smart mascot glasses frame outline in top corner */}
        <ellipse cx="40" cy="22" rx="6" ry="4" stroke="url(#warmGold)" strokeWidth="1" fill="none" strokeOpacity="0.4" />
        <ellipse cx="60" cy="22" rx="6" ry="4" stroke="url(#warmGold)" strokeWidth="1" fill="none" strokeOpacity="0.4" />
        <line x1="46" y1="22" x2="54" y2="22" stroke="url(#warmGold)" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    );
  }

  // Fallback default: if user uploaded custom image, render the normal img tag
  return (
    <img 
      src={logoUrl || '/logo_option_one.png'} 
      alt="Academy Logo" 
      className={className}
      referrerPolicy="no-referrer"
      onError={(e) => {
        // Safe fallback to first concept if image fails
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}
