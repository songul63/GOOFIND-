import React from 'react';

type MapBrandMarkProps = {
  size?: number;
  active?: boolean;
  className?: string;
};

export function MapBrandMark({ size = 44, active = false, className = '' }: MapBrandMarkProps) {
  const uid = React.useId().replace(/:/g, '');

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 transition-all duration-200 ${className}`}
      style={{
        width: size,
        height: size,
        filter: active
          ? 'drop-shadow(0 4px 14px rgba(198,40,40,0.55))'
          : 'drop-shadow(0 2px 8px rgba(139,0,0,0.35))',
      }}
    >
      <svg
        viewBox="0 0 64 80"
        width={size * 0.88}
        height={size}
        aria-hidden
        role="img"
      >
        <defs>
          <linearGradient id={`${uid}-pin`} x1="18%" y1="4%" x2="82%" y2="96%">
            <stop offset="0%" stopColor="#EF5350" />
            <stop offset="42%" stopColor="#D32F2F" />
            <stop offset="100%" stopColor="#7B0000" />
          </linearGradient>
          <linearGradient id={`${uid}-ring`} x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#B71C1C" />
          </linearGradient>
        </defs>

        {/* Target / ripple base */}
        <ellipse cx="32" cy="76.5" rx="21" ry="4.8" fill={`url(#${uid}-pin)`} opacity="0.28" />
        <ellipse cx="32" cy="73.8" rx="14.5" ry="3.4" fill={`url(#${uid}-pin)`} opacity="0.48" />
        <ellipse cx="32" cy="71.6" rx="9" ry="2.3" fill={`url(#${uid}-pin)`} opacity="0.78" />

        {/* Main pin body with center ring */}
        <path
          fill={`url(#${uid}-pin)`}
          fillRule="evenodd"
          d="M32 4
             C18.2 4 8 14.4 8 26.8
             C8 35.6 19.8 54.2 27.4 64.8
             L32 70.2
             L36.6 64.8
             C44.2 54.2 56 35.6 56 26.8
             C56 14.4 45.8 4 32 4 Z
             M32 16.5
             a10.5 10.5 0 1 0 0.01 0 Z"
        />

        {/* Inner ring highlight */}
        <circle
          cx="32"
          cy="26.8"
          r="10.5"
          fill="none"
          stroke={`url(#${uid}-ring)`}
          strokeWidth="2.2"
          opacity="0.55"
        />

        {active && (
          <circle
            cx="32"
            cy="26.8"
            r="14"
            fill="none"
            stroke="#FF8A80"
            strokeWidth="1.5"
            opacity="0.65"
          />
        )}
      </svg>
    </div>
  );
}
