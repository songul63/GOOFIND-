import React, { useId } from 'react';
import type { LucideIcon } from 'lucide-react';

export function getIconHex(colorClass: string): string {
  const match = colorClass.match(/#([0-9A-Fa-f]{6})/);
  return match ? `#${match[1]}` : '#2563EB';
}

export function lightenHex(hex: string, amount = 30): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function darkenHex(hex: string, amount = 40): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

const VARIANT_SCALE = {
  default: 1.5,
  compact: 1.3,
  badge: 1.35,
} as const;

type Icon3DProps = {
  icon: LucideIcon;
  size?: number;
  colorClass?: string;
  isSelected?: boolean;
  className?: string;
  variant?: 'default' | 'compact' | 'badge';
};

/** Native OS emoji — already rendered in 3D on iOS/Android */
type Emoji3DProps = {
  emoji: string;
  size?: number;
  className?: string;
  variant?: 'default' | 'compact' | 'badge';
};

export function Emoji3D({
  emoji,
  size = 36,
  className = '',
  variant = 'default',
}: Emoji3DProps) {
  const scale = VARIANT_SCALE[variant];
  const box = size * scale;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: box, height: box, perspective: '520px' }}
      aria-hidden="true"
    >
      {/* Ground contact shadow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '6%',
          left: '50%',
          width: '68%',
          height: '14%',
          transform: 'translateX(-50%) rotateX(72deg)',
          background: 'radial-gradient(ellipse, rgba(15,23,42,0.28) 0%, rgba(15,23,42,0.08) 45%, transparent 72%)',
          filter: 'blur(5px)',
        }}
      />

      {/* Soft ambient glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '78%',
          height: '78%',
          background: 'radial-gradient(circle at 50% 55%, rgba(255,255,255,0.55) 0%, transparent 68%)',
          filter: 'blur(6px)',
          opacity: 0.7,
        }}
      />

      {/* Emoji with premium depth stack */}
      <span
        className="relative z-10 leading-none emoji-3d-glyph"
        style={{
          fontSize: size,
          transform: 'translateZ(18px) rotateX(-14deg) rotateY(10deg) scale(1.08)',
          transformStyle: 'preserve-3d',
          filter: [
            'drop-shadow(0 1px 0 rgba(255,255,255,0.45))',
            'drop-shadow(0 3px 2px rgba(0,0,0,0.12))',
            'drop-shadow(0 8px 14px rgba(15,23,42,0.22))',
            'drop-shadow(0 16px 28px rgba(15,23,42,0.14))',
          ].join(' '),
        }}
      >
        {emoji}
      </span>

      {/* Specular highlight */}
      <div
        className="absolute z-20 pointer-events-none rounded-full"
        style={{
          top: '14%',
          left: '20%',
          width: '34%',
          height: '22%',
          background: 'radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.25) 40%, transparent 72%)',
          filter: 'blur(0.5px)',
          opacity: 0.75,
        }}
      />
    </div>
  );
}

type SectionHeaderIconProps = {
  emoji: string;
  accentHex?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

/** Premium 3D pedestal icon for section titles (Şirketler, Duyurular, etc.) */
export function SectionHeaderIcon({
  emoji,
  accentHex = '#2563EB',
  size = 'sm',
  className = '',
}: SectionHeaderIconProps) {
  const dimensions = {
    sm: { box: 46, emoji: 24 },
    md: { box: 58, emoji: 30 },
    lg: { box: 72, emoji: 36 },
  }[size];
  const light = lightenHex(accentHex, 48);
  const mid = accentHex;
  const dark = darkenHex(accentHex, 32);
  const deep = darkenHex(accentHex, 58);

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center -mt-0.5 sm:mt-0 ${className}`}
      style={{ width: dimensions.box, height: dimensions.box, perspective: '720px' }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-[-10%] rounded-[30%] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mid}35 0%, transparent 72%)`,
          filter: 'blur(9px)',
        }}
      />

      <div
        className="absolute inset-[6%] rounded-2xl sm:rounded-[1.15rem] pointer-events-none"
        style={{
          transform: 'rotateX(20deg) rotateY(-14deg)',
          transformStyle: 'preserve-3d',
          background: `linear-gradient(150deg, ${light} 0%, ${mid} 36%, ${dark} 70%, ${deep} 100%)`,
          boxShadow: [
            'inset 0 2px 5px rgba(255,255,255,0.5)',
            'inset 0 -4px 10px rgba(0,0,0,0.22)',
            `0 12px 28px ${mid}40`,
            '0 20px 40px rgba(15,23,42,0.2)',
          ].join(', '),
          border: `1px solid ${lightenHex(accentHex, 62)}aa`,
        }}
      />

      <div
        className="absolute inset-[8%] rounded-xl sm:rounded-2xl pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(155deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.14) 38%, transparent 62%)',
        }}
      />

      <div
        className="absolute left-[10%] right-[10%] bottom-[4%] h-[20%] rounded-b-2xl pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent, ${deep}77)`,
          transform: 'rotateX(58deg)',
          opacity: 0.75,
        }}
      />

      <div className="relative z-10 flex items-center justify-center" style={{ marginTop: '-6%' }}>
        <Emoji3D emoji={emoji} size={dimensions.emoji} variant="compact" />
      </div>
    </div>
  );
}

export function Icon3D({
  icon: Icon,
  size = 32,
  colorClass = 'text-[#2563EB]',
  isSelected = false,
  className = '',
  variant = 'default',
}: Icon3DProps) {
  const gradientId = useId().replace(/:/g, '');
  const hex = isSelected ? '#ffffff' : getIconHex(colorClass);
  const highlight = isSelected ? '#f8fafc' : lightenHex(hex, 42);
  const mid = isSelected ? '#e2e8f0' : hex;
  const shade = isSelected ? '#cbd5e1' : darkenHex(hex, 28);
  const deep = isSelected ? '#94a3b8' : darkenHex(hex, 55);
  const core = isSelected ? '#64748b' : darkenHex(hex, 78);

  const scale = VARIANT_SCALE[variant];
  const box = size * scale;
  const pedestal = variant === 'compact' ? 0.72 : variant === 'badge' ? 0.8 : 0.76;

  const extrusionLayers = [
    { y: 5, color: core, opacity: 0.22 },
    { y: 4, color: deep, opacity: 0.34 },
    { y: 3, color: shade, opacity: 0.48 },
    { y: 2, color: mid, opacity: 0.62 },
    { y: 1, color: highlight, opacity: 0.78 },
  ];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: box, height: box, perspective: '520px' }}
      aria-hidden="true"
    >
      {/* Contact shadow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '4%',
          left: '50%',
          width: `${pedestal * 88}%`,
          height: '16%',
          transform: 'translateX(-50%) rotateX(74deg)',
          background: isSelected
            ? 'radial-gradient(ellipse, rgba(37,99,235,0.35) 0%, transparent 70%)'
            : `radial-gradient(ellipse, ${deep}55 0%, ${deep}18 42%, transparent 72%)`,
          filter: 'blur(5px)',
        }}
      />

      {/* Isometric pedestal */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: `${pedestal * 100}%`,
          height: `${pedestal * 100}%`,
          bottom: '10%',
          borderRadius: '28%',
          transform: 'rotateX(62deg) translateZ(-6px)',
          transformStyle: 'preserve-3d',
          background: isSelected
            ? 'linear-gradient(155deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 38%, rgba(30,64,175,0.28) 100%)'
            : `linear-gradient(155deg, ${lightenHex(hex, 55)}ee 0%, ${highlight}cc 22%, ${mid}99 48%, ${shade}bb 72%, ${deep}dd 100%)`,
          boxShadow: isSelected
            ? 'inset 0 2px 4px rgba(255,255,255,0.55), inset 0 -3px 6px rgba(30,64,175,0.25), 0 10px 22px rgba(30,64,175,0.28)'
            : `inset 0 2px 5px rgba(255,255,255,0.65), inset 0 -4px 8px ${deep}44, 0 8px 18px ${hex}33, 0 14px 28px rgba(15,23,42,0.14)`,
          border: isSelected ? '1px solid rgba(255,255,255,0.35)' : `1px solid ${highlight}88`,
        }}
      />

      {/* Pedestal rim / side depth */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: `${pedestal * 94}%`,
          height: `${pedestal * 18}%`,
          bottom: '7%',
          left: '3%',
          borderRadius: '50%',
          transform: 'rotateX(72deg)',
          background: isSelected
            ? `linear-gradient(180deg, ${shade}55, transparent)`
            : `linear-gradient(180deg, ${deep}88, ${core}44, transparent)`,
          filter: 'blur(1px)',
          opacity: 0.85,
        }}
      />

      {/* Volumetric icon stack */}
      <div
        className="relative z-10 transition-transform duration-500 group-hover:scale-[1.06]"
        style={{
          transform: 'rotateX(-16deg) rotateY(14deg) translateY(-6px) translateZ(14px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {extrusionLayers.map((layer, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              transform: `translateY(${layer.y}px) translateZ(${-layer.y}px)`,
              opacity: layer.opacity,
              color: layer.color,
            }}
          >
            <Icon size={size} strokeWidth={variant === 'badge' ? 2.5 : 2.2} fill={`${layer.color}30`} />
          </div>
        ))}

        {/* Main lit surface */}
        <div
          className="relative flex items-center justify-center"
          style={{
            color: mid,
            filter: [
              `drop-shadow(0 1px 0 ${highlight})`,
              `drop-shadow(0 2px 0 ${shade})`,
              `drop-shadow(0 4px 6px ${deep}66)`,
              'drop-shadow(0 10px 16px rgba(15,23,42,0.2))',
            ].join(' '),
          }}
        >
          <Icon
            size={size}
            strokeWidth={variant === 'badge' ? 2.5 : 2.2}
            fill={`url(#${gradientId})`}
            style={{
              stroke: mid,
            }}
          />
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={highlight} stopOpacity="0.55" />
                <stop offset="45%" stopColor={mid} stopOpacity="0.38" />
                <stop offset="100%" stopColor={shade} stopOpacity="0.52" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Top-left specular */}
      <div
        className="absolute z-20 pointer-events-none rounded-full"
        style={{
          top: '12%',
          left: '18%',
          width: '36%',
          height: '24%',
          background: 'radial-gradient(ellipse at 35% 35%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 38%, transparent 72%)',
          opacity: isSelected ? 0.55 : 0.82,
        }}
      />

      {/* Rim light bottom-right */}
      <div
        className="absolute z-20 pointer-events-none rounded-full"
        style={{
          bottom: '22%',
          right: '14%',
          width: '28%',
          height: '18%',
          background: `radial-gradient(ellipse, ${highlight}55, transparent 72%)`,
          opacity: 0.45,
          filter: 'blur(1px)',
        }}
      />
    </div>
  );
}
