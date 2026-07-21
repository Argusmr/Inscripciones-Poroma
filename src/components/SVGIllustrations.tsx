import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Systems / Computer illustration
export const ComputerIcon: React.FC<IconProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Dibujo de una computadora y manos escribiendo"
  >
    {/* Computer Screen Background */}
    <rect x="25" y="20" width="110" height="75" rx="8" fill="#1E293B" stroke="#00A6A6" strokeWidth="4" />
    <rect x="32" y="27" width="96" height="61" rx="4" fill="#0F172A" />
    
    {/* Display code lines / graphic on screen */}
    <rect x="42" y="38" width="40" height="6" rx="3" fill="#FF7A00" />
    <rect x="86" y="38" width="30" height="6" rx="3" fill="#FFD43B" />
    <rect x="42" y="50" width="60" height="6" rx="3" fill="#198C4A" />
    <rect x="42" y="62" width="48" height="6" rx="3" fill="#00A6A6" />
    <circle cx="108" cy="65" r="8" fill="#FF7A00" opacity="0.8" />

    {/* Laptop Stand & Base */}
    <path d="M 70 95 L 90 95 L 95 110 L 65 110 Z" fill="#64748B" />
    <rect x="15" y="110" width="130" height="12" rx="4" fill="#334155" />
    
    {/* Keyboard Keys visual */}
    <rect x="25" y="113" width="110" height="6" rx="2" fill="#475569" />

    {/* Hands on Keyboard */}
    <path d="M 35 145 C 35 125 50 120 60 122" stroke="#F3A683" strokeWidth="10" strokeLinecap="round" />
    <path d="M 125 145 C 125 125 110 120 100 122" stroke="#F3A683" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

// 2. Gastronomy / Cooking illustration
export const CookingIcon: React.FC<IconProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Dibujo de una olla hirviendo con cuchara de cocina"
  >
    {/* Steam lines */}
    <path d="M 55 35 Q 60 20 50 10" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" />
    <path d="M 80 32 Q 85 15 75 8" stroke="#FFD43B" strokeWidth="4" strokeLinecap="round" />
    <path d="M 105 35 Q 110 20 100 10" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" />

    {/* Pot Lid Handles */}
    <rect x="65" y="38" width="30" height="8" rx="4" fill="#334155" />

    {/* Cooking Pot Body */}
    <path d="M 30 55 C 30 50 35 46 42 46 L 118 46 C 125 46 130 50 130 55 L 125 110 C 125 122 105 128 80 128 C 55 128 35 122 35 110 Z" fill="#198C4A" stroke="#123D2C" strokeWidth="4" />
    
    {/* Pot Handles */}
    <path d="M 18 65 C 10 65 10 80 28 80" stroke="#334155" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M 142 65 C 150 65 150 80 132 80" stroke="#334155" strokeWidth="6" strokeLinecap="round" fill="none" />

    {/* Pot Highlight Band */}
    <path d="M 33 60 L 127 60" stroke="#FFD43B" strokeWidth="4" opacity="0.8" />

    {/* Wooden Spoon held by hand */}
    <path d="M 125 25 L 75 85" stroke="#D97706" strokeWidth="8" strokeLinecap="round" />
    <ellipse cx="70" cy="90" rx="10" ry="14" transform="rotate(-30 70 90)" fill="#D97706" />

    {/* Hand holding spoon */}
    <path d="M 135 15 C 125 25 115 30 120 40" stroke="#F3A683" strokeWidth="12" strokeLinecap="round" />
  </svg>
);

// 3. Age 15+ illustration
export const Age15Icon: React.FC<IconProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Símbolo de 15 años o más"
  >
    {/* Background Badge Circle */}
    <circle cx="80" cy="80" r="70" fill="#FFF8E7" stroke="#198C4A" strokeWidth="6" />
    <circle cx="80" cy="80" r="60" fill="#00A6A6" opacity="0.15" />

    {/* Calendar / Badge background */}
    <rect x="35" y="35" width="90" height="90" rx="16" fill="#FFFFFF" stroke="#198C4A" strokeWidth="4" />
    <path d="M 35 35 L 125 35 L 125 60 L 35 60 Z" fill="#198C4A" />

    {/* Calendar Hanging Pins */}
    <circle cx="55" cy="47" r="4" fill="#FFD43B" />
    <circle cx="105" cy="47" r="4" fill="#FFD43B" />

    {/* "15+" Large Text */}
    <text x="80" y="105" fontMax="1" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="42" fill="#123D2C" textAnchor="middle">
      15+
    </text>
  </svg>
);

// 4. Carnet de Identidad (ID card) illustration
export const IDCardIcon: React.FC<IconProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Dibujo de documento de carnet de identidad"
  >
    {/* Card base */}
    <rect x="15" y="30" width="130" height="90" rx="10" fill="#FFFFFF" stroke="#198C4A" strokeWidth="5" />
    
    {/* Top Flag Band (Bolivian tricolor representation or green band) */}
    <path d="M 15 30 L 145 30 L 145 45 L 15 45 Z" fill="#198C4A" />
    <rect x="15" y="45" width="130" height="3" fill="#FFD43B" />

    {/* Photo Box */}
    <rect x="25" y="55" width="38" height="50" rx="4" fill="#ECEFF1" stroke="#94A3B8" strokeWidth="2" />
    {/* Person silhouette in photo */}
    <circle cx="44" cy="72" r="10" fill="#64748B" />
    <path d="M 30 100 C 30 88 58 88 58 100 Z" fill="#64748B" />

    {/* ID Lines */}
    <rect x="72" y="58" width="60" height="7" rx="3.5" fill="#123D2C" />
    <rect x="72" y="71" width="48" height="6" rx="3" fill="#00A6A6" />
    <rect x="72" y="82" width="54" height="6" rx="3" fill="#64748B" />
    
    {/* Stamp Seal */}
    <circle cx="120" cy="98" r="12" fill="#FF7A00" opacity="0.85" />
    <path d="M 115 98 L 120 103 L 126 94" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 5. Name / Person with Pencil illustration
export const PersonNameIcon: React.FC<IconProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Dibujo de una persona con lápiz para escribir su nombre"
  >
    {/* Person Avatar */}
    <circle cx="60" cy="50" r="26" fill="#F3A683" stroke="#123D2C" strokeWidth="4" />
    <path d="M 25 125 C 25 90 95 90 95 125 Z" fill="#198C4A" stroke="#123D2C" strokeWidth="4" />

    {/* Large Pencil */}
    <g transform="translate(70, 40) rotate(25)">
      <rect x="0" y="0" width="22" height="75" rx="3" fill="#FFD43B" stroke="#B45309" strokeWidth="2" />
      <path d="M 0 75 L 11 98 L 22 75 Z" fill="#F5C29B" stroke="#B45309" strokeWidth="2" />
      <path d="M 7 90 L 11 98 L 15 90 Z" fill="#1E293B" />
      <rect x="0" y="-12" width="22" height="12" rx="2" fill="#FF7A00" />
    </g>
  </svg>
);

// 6. Cellphone illustration
export const PhoneIcon: React.FC<IconProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Dibujo de un teléfono celular"
  >
    {/* Phone Frame */}
    <rect x="45" y="15" width="70" height="130" rx="14" fill="#1E293B" stroke="#123D2C" strokeWidth="4" />
    {/* Screen */}
    <rect x="52" y="28" width="56" height="102" rx="6" fill="#FFF8E7" />
    
    {/* Speaker top */}
    <rect x="70" y="20" width="20" height="4" rx="2" fill="#64748B" />

    {/* Screen content: Large +591 & Keypad hint */}
    <rect x="58" y="38" width="44" height="20" rx="4" fill="#198C4A" />
    <text x="80" y="52" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="11" fill="#FFFFFF" textAnchor="middle">
      +591
    </text>

    {/* Keypad dots representation */}
    <circle cx="65" cy="72" r="5" fill="#FF7A00" />
    <circle cx="80" cy="72" r="5" fill="#FF7A00" />
    <circle cx="95" cy="72" r="5" fill="#FF7A00" />

    <circle cx="65" cy="88" r="5" fill="#FF7A00" />
    <circle cx="80" cy="88" r="5" fill="#FF7A00" />
    <circle cx="95" cy="88" r="5" fill="#FF7A00" />

    <circle cx="65" cy="104" r="5" fill="#FF7A00" />
    <circle cx="80" cy="104" r="5" fill="#FF7A00" />
    <circle cx="95" cy="104" r="5" fill="#FF7A00" />

    {/* Call green button */}
    <circle cx="80" cy="120" r="6" fill="#198C4A" />
  </svg>
);

// 7. Community illustration (houses, pathway, hills)
export const CommunityIcon: React.FC<IconProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Dibujo de una comunidad rural con casas y montañas"
  >
    {/* Background Hills */}
    <path d="M 0 110 Q 40 60 90 90 Q 130 50 160 100 L 160 160 L 0 160 Z" fill="#A7F3D0" />
    <path d="M 0 120 Q 70 80 160 125 L 160 160 L 0 160 Z" fill="#198C4A" />

    {/* Sun */}
    <circle cx="125" cy="38" r="16" fill="#FFD43B" />

    {/* House 1 (Left) */}
    <rect x="25" y="95" width="36" height="30" fill="#FFFFFF" stroke="#123D2C" strokeWidth="3" />
    <polygon points="20,95 43,72 66,95" fill="#FF7A00" stroke="#123D2C" strokeWidth="3" />
    <rect x="38" y="108" width="10" height="17" fill="#8B5CF6" />

    {/* House 2 (Right) */}
    <rect x="95" y="90" width="42" height="35" fill="#FFFFFF" stroke="#123D2C" strokeWidth="3" />
    <polygon points="90,90 116,65 142,90" fill="#C62828" stroke="#123D2C" strokeWidth="3" />
    <rect x="110" y="105" width="12" height="20" fill="#198C4A" />

    {/* Winding rural path */}
    <path d="M 75 160 Q 80 135 60 120 Q 50 110 55 100" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

// Animated Hand Pointer Icon for choice selection guidance
export const HandPointerIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`animate-pointing-hand ${className}`}
    aria-hidden="true"
  >
    {/* Index finger pointing up/forward */}
    <path
      d="M 22 8 C 22 5 26 5 26 8 L 26 22 L 29 22 C 31 22 33 24 33 26 L 33 32 C 33 38 28 42 22 42 L 17 42 C 12 42 8 38 8 33 L 8 26 C 8 24 10 22 12 22 L 16 22 L 16 16 C 16 14 18 14 19 15 L 22 22 Z"
      fill="#FFD43B"
      stroke="#123D2C"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);
