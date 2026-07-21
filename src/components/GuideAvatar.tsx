import React from 'react';

interface GuideAvatarProps {
  message: string;
  className?: string;
}

export const GuideAvatar: React.FC<GuideAvatarProps> = ({ message, className = '' }) => {
  return (
    <div className={`flex items-start gap-3 bg-white p-3.5 rounded-2xl border-2 border-[#198C4A]/30 shadow-sm ${className}`}>
      {/* Adult Facilitator Avatar SVG */}
      <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFF8E7] border-2 border-[#198C4A] overflow-hidden flex items-center justify-center shadow-inner">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          role="img"
          aria-label="Facilitador Educador del CEA"
        >
          {/* Background */}
          <rect width="100" height="100" fill="#E8F4EC" />

          {/* Shoulders / Adult shirt & green jacket */}
          <path d="M 10 98 C 10 68 30 60 50 60 C 70 60 90 68 90 98 Z" fill="#123D2C" />
          <path d="M 22 98 L 38 68 L 50 82 L 62 68 L 78 98 Z" fill="#198C4A" />
          
          {/* White inner shirt / collar */}
          <polygon points="50,60 42,75 58,75" fill="#FFFFFF" />
          <polygon points="50,82 46,72 54,72" fill="#E2E8F0" />

          {/* Neck */}
          <rect x="43" y="45" width="14" height="18" fill="#D99B82" />
          {/* Neck shadow */}
          <path d="M 43 53 C 48 57 52 57 57 53 L 57 60 L 43 60 Z" fill="#C5856C" />

          {/* Adult Face */}
          <path d="M 28 32 C 28 18 36 12 50 12 C 64 12 72 18 72 32 C 72 48 64 54 50 54 C 36 54 28 48 28 32 Z" fill="#EAA890" />

          {/* Neat Adult Hair (Dark styled hair with side part) */}
          <path d="M 27 30 C 26 18 34 10 50 10 C 66 10 74 18 73 30 C 70 20 62 13 48 13 C 35 13 29 20 27 30 Z" fill="#1E293B" />
          <path d="M 27 30 C 27 22 36 15 48 18 C 60 21 72 20 73 28 C 71 22 65 14 50 14 C 36 14 29 21 27 30 Z" fill="#0F172A" />

          {/* Ears */}
          <ellipse cx="28" cy="35" rx="3.5" ry="6" fill="#EAA890" />
          <ellipse cx="72" cy="35" rx="3.5" ry="6" fill="#EAA890" />

          {/* Eyes (Realistic adult eyes) */}
          <ellipse cx="40" cy="33" rx="3" ry="3.5" fill="#FFFFFF" />
          <ellipse cx="60" cy="33" rx="3" ry="3.5" fill="#FFFFFF" />
          <circle cx="40" cy="33" r="2" fill="#1E293B" />
          <circle cx="60" cy="33" r="2" fill="#1E293B" />

          {/* Eyebrows */}
          <path d="M 35 27 Q 40 25 45 27" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M 55 27 Q 60 25 65 27" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

          {/* Nose */}
          <path d="M 50 35 L 48 40 L 51 40" fill="none" stroke="#C5856C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Warm professional smile */}
          <path d="M 42 45 Q 50 51 58 45" fill="none" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 text-[#123D2C] relative bg-[#FFF8E7] p-2.5 sm:p-3 rounded-2xl border-2 border-[#198C4A]/40 text-sm sm:text-base font-medium leading-snug">
        {/* Pointer triangle */}
        <div className="absolute top-4 -left-2.5 w-0 h-0 border-t-8 border-t-transparent border-r-[10px] border-r-[#198C4A]/40 border-b-8 border-b-transparent"></div>
        <div className="absolute top-[18px] -left-1.5 w-0 h-0 border-t-6 border-t-transparent border-r-[8px] border-r-[#FFF8E7] border-b-6 border-b-transparent"></div>
        <p className="font-bold text-[#123D2C]">
          {message}
        </p>
      </div>
    </div>
  );
};
