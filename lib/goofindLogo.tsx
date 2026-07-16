import React from 'react';

/** App brand palette — mature blue-dominant */
export const BRAND_PRIMARY = '#2563EB';
export const BRAND_PRIMARY_DARK = '#1D4ED8';
export const BRAND_PRIMARY_DEEP = '#1E3A8A';
export const BRAND_PRIMARY_LIGHT = '#3B82F6';
export const BRAND_ACCENT = '#FF4500';

/** G: full letter. F body: blue. Accent: tiny orange cap on F bar only. */
export const GOOFIND_G_PATH =
  'M 51 17 A 33 33 0 1 0 51 83 L 51 57 L 22 57 L 22 47 L 51 47 L 51 33 A 23 23 0 0 1 35 21 Z';

export const GOOFIND_F_BODY_PATH =
  'M 54 17 L 81 17 L 81 29 L 65 29 L 65 83 L 54 83 Z M 54 45 L 68 45 L 68 55 L 54 55 Z';

/** Minimal orange accent — right cap of F crossbar */
export const GOOFIND_ACCENT_PATH = 'M 68 46 L 72.5 46 L 72.5 54 L 68 54 Z';

type GoofindLogoMarkProps = {
  className?: string;
  showShadow?: boolean;
};

function GoofindMarkDefs({ uid, showShadow }: { uid: string; showShadow: boolean }) {
  return (
    <defs>
      <linearGradient id={`${uid}-deep`} x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#172554" />
        <stop offset="45%" stopColor={BRAND_PRIMARY_DEEP} />
        <stop offset="100%" stopColor={BRAND_PRIMARY_DARK} />
      </linearGradient>
      <linearGradient id={`${uid}-blue`} x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={BRAND_PRIMARY_DEEP} />
        <stop offset="50%" stopColor={BRAND_PRIMARY_DARK} />
        <stop offset="100%" stopColor={BRAND_PRIMARY} />
      </linearGradient>
      {showShadow && (
        <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#172554" floodOpacity="0.22" />
        </filter>
      )}
    </defs>
  );
}

export function GoofindMarkPaths({
  uid,
  showShadow,
  gFill,
  fFill,
  accentFill,
}: {
  uid: string;
  showShadow: boolean;
  gFill?: string;
  fFill?: string;
  accentFill?: string;
}) {
  const filter = showShadow ? `url(#${uid}-shadow)` : undefined;
  const deep = gFill ?? `url(#${uid}-deep)`;
  const blue = fFill ?? `url(#${uid}-blue)`;
  const accent = accentFill ?? BRAND_ACCENT;

  return (
    <g filter={filter}>
      <path d={GOOFIND_G_PATH} fill={deep} fillRule="evenodd" />
      <path d={GOOFIND_F_BODY_PATH} fill={blue} fillRule="evenodd" />
      <path d={GOOFIND_ACCENT_PATH} fill={accent} />
    </g>
  );
}

export function GoofindLogoMark({ className = '', showShadow = true }: GoofindLogoMarkProps) {
  const uid = React.useId().replace(/:/g, '');

  return (
    <svg
      viewBox="12 8 76 88"
      className={`inline-block shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="GooFind"
      role="img"
    >
      <GoofindMarkDefs uid={uid} showShadow={showShadow} />
      <GoofindMarkPaths uid={uid} showShadow={showShadow} />
    </svg>
  );
}

export const StyledG = GoofindLogoMark;

const WORDMARK_FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

const wordmarkStyle = (dark: boolean): React.CSSProperties =>
  dark
    ? { fontFamily: WORDMARK_FONT, fontWeight: 700, letterSpacing: '-0.03em', color: '#F8FAFC' }
    : { fontFamily: WORDMARK_FONT, fontWeight: 700, letterSpacing: '-0.03em', color: BRAND_PRIMARY_DEEP };

export function GoofindWordmark({
  dark = false,
  className = '',
}: {
  dark?: boolean;
  className?: string;
}) {
  const dotColor = dark ? '#FF944D' : BRAND_ACCENT;

  return (
    <span
      className={`leading-none select-none inline-flex items-baseline ${className}`}
      style={wordmarkStyle(dark)}
    >
      GooF
      <span className="relative inline-block w-[0.3em]">
        <span className="inline-block">ı</span>
        <span
          aria-hidden
          className="absolute rounded-full"
          style={{
            top: '-0.38em',
            left: '18%',
            width: '0.24em',
            height: '0.24em',
            backgroundColor: dotColor,
          }}
        />
      </span>
      nd
    </span>
  );
}

export function LogoIcon({ size = 60, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        background: '#FFFFFF',
        boxShadow: '0 1px 4px rgba(30, 58, 138, 0.1)',
        border: '1px solid rgba(30, 58, 138, 0.08)',
      }}
    >
      <GoofindLogoMark className="w-[70%] h-[70%]" showShadow={false} />
    </div>
  );
}

export function LogoText({
  size = 'text-2xl',
  className = '',
  animateOo = false,
  dark = false,
  stacked = false,
  showMark = true,
}: {
  size?: string;
  className?: string;
  animateOo?: boolean;
  dark?: boolean;
  stacked?: boolean;
  showMark?: boolean;
}) {
  const markSize = stacked ? 'w-[4.25rem] h-[4.25rem] sm:w-[4.75rem] sm:h-[4.75rem]' : 'w-[1.08em] h-[1.08em]';
  const layoutClass = stacked ? 'flex-col gap-2.5' : 'flex-row items-center gap-[0.3em]';

  return (
    <div
      className={`inline-flex ${layoutClass} ${size} ${className} ${animateOo ? 'animate-in fade-in zoom-in-95 duration-700' : ''}`}
    >
      {showMark && <GoofindLogoMark className={`${markSize} shrink-0`} />}
      <GoofindWordmark dark={dark} />
    </div>
  );
}

export function GoofindAppIconSvg({ includeText = false }: { includeText?: boolean }) {
  const uid = 'goofind-app-icon';

  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${uid}-deep`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#172554" />
          <stop offset="45%" stopColor={BRAND_PRIMARY_DEEP} />
          <stop offset="100%" stopColor={BRAND_PRIMARY_DARK} />
        </linearGradient>
        <linearGradient id={`${uid}-blue`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={BRAND_PRIMARY_DEEP} />
          <stop offset="50%" stopColor={BRAND_PRIMARY_DARK} />
          <stop offset="100%" stopColor={BRAND_PRIMARY} />
        </linearGradient>
        <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#172554" floodOpacity="0.2" />
        </filter>
      </defs>
      <rect width="512" height="512" rx="112" fill="#FFFFFF" />
      <rect x="4" y="4" width="504" height="504" rx="110" fill="none" stroke="#E2E8F0" strokeWidth="2" />
      <g
        transform={includeText ? 'translate(256 232) scale(3.2)' : 'translate(256 256) scale(3.4)'}
        transformOrigin="0 0"
        filter={`url(#${uid}-shadow)`}
      >
        <g transform="translate(-50 -50)">
          <GoofindMarkPaths uid={uid} showShadow={false} />
        </g>
      </g>
      {includeText && (
        <>
          <text
            x="256"
            y="438"
            textAnchor="middle"
            fontFamily={WORDMARK_FONT}
            fontWeight="700"
            fontSize="48"
            fill={BRAND_PRIMARY_DEEP}
            letterSpacing="-2"
          >
            GooFınd
          </text>
          <circle cx="281" cy="422" r="4.2" fill={BRAND_ACCENT} />
        </>
      )}
    </svg>
  );
}

export function GoofindAdminMark({
  logoBgType,
  primaryGradientId = 'adminRoseGold',
}: {
  logoBgType: 'white' | 'charcoal' | 'transparent' | 'gradient';
  primaryGradientId?: string;
}) {
  const uid = 'admin-gf-mark';
  const onDark = logoBgType === 'charcoal' || logoBgType === 'gradient';
  const gFill = onDark ? '#F8FAFC' : `url(#${primaryGradientId})`;
  const fFill = onDark ? '#E2E8F0' : `url(#${primaryGradientId})`;
  const accentFill = onDark ? BRAND_ACCENT : BRAND_ACCENT;

  return (
    <g transform="translate(156 156) scale(2)">
      <GoofindMarkDefs uid={uid} showShadow={false} />
      <GoofindMarkPaths
        uid={uid}
        showShadow={false}
        gFill={gFill}
        fFill={fFill}
        accentFill={accentFill}
      />
    </g>
  );
}
