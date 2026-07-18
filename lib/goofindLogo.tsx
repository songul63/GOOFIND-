import React from 'react';

export const BRAND_PRIMARY = '#2563EB';
export const BRAND_PRIMARY_DARK = '#1D4ED8';
export const BRAND_PRIMARY_DEEP = '#1E3A8A';
export const BRAND_PRIMARY_LIGHT = '#3B82F6';
export const BRAND_ACCENT = '#FF4500';

/** @deprecated Use BRAND_PRIMARY */
export const BRAND_MARK_BLUE = BRAND_PRIMARY;
export const BRAND_MARK_BLUE_DARK = BRAND_PRIMARY_DARK;
export const BRAND_MARK_ORANGE = BRAND_ACCENT;
export const BRAND_MARK_ORANGE_DARK = '#E03E00';

export const GOOFIND_MARK_SRC = '/goofind-mark.png';

/** Legacy path exports — kept for any external references */
export const GOOFIND_G_PATH = '';
export const GOOFIND_F_BODY_PATH = '';
export const GOOFIND_ACCENT_PATH = '';
export const GOOFIND_ORANGE_UNDER_PATH = '';
export const GOOFIND_ORANGE_MAIN_PATH = '';
export const GOOFIND_ORANGE_OVER_PATH = '';
export const GOOFIND_ORANGE_BR_PATH = '';
export const GOOFIND_ORANGE_GAP_PATH = '';
export const GOOFIND_BLUE_PATH = '';

export function goofindMarkSvgString({
  size = 512,
}: {
  blue?: string;
  orange?: string;
  background?: string;
  size?: number;
} = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">
  <image href="${GOOFIND_MARK_SRC}" width="100" height="100" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
}

type GoofindLogoMarkProps = {
  className?: string;
  showShadow?: boolean;
  vivid?: boolean;
};

export function GoofindMarkPaths() {
  return (
    <image
      href={GOOFIND_MARK_SRC}
      x="0"
      y="0"
      width="100"
      height="100"
      preserveAspectRatio="xMidYMid meet"
    />
  );
}

export function GoofindLogoMark({ className = '', showShadow = false }: GoofindLogoMarkProps) {
  return (
    <img
      src={GOOFIND_MARK_SRC}
      alt=""
      role="img"
      aria-label="GooFind"
      draggable={false}
      className={`block shrink-0 aspect-square select-none object-contain ${className}`}
      style={
        showShadow ? { filter: 'drop-shadow(0 1px 2px rgba(15, 23, 42, 0.12))' } : undefined
      }
    />
  );
}

/** Header bubble “G” — same 3D style as oofınd letters */
export function GoofindHeaderGMark({
  className = '',
  prominent = true,
}: {
  className?: string;
  prominent?: boolean;
}) {
  const layers: BubbleLayer[] = ['body', 'glint'];

  return (
    <span
      className={[
        'goofind-bubble-wordmark',
        prominent ? 'goofind-bubble-wordmark--prominent' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ fontFamily: BUBBLE_FONT }}
      aria-hidden
    >
      {layers.map((layer) => (
        <span
          key={layer}
          className={`goofind-bubble-wordmark__${layer}`}
          aria-hidden={layer !== 'body'}
        >
          G
        </span>
      ))}
    </span>
  );
}

/** @deprecated Use GoofindHeaderGMark in header, GoofindLogoMark elsewhere */
export function GoofindLetterMark({ className = '' }: { className?: string }) {
  return <GoofindHeaderGMark className={className} prominent />;
}

export const StyledG = GoofindLogoMark;

const WORDMARK_FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const BUBBLE_FONT = "'Fredoka', 'Plus Jakarta Sans', system-ui, sans-serif";

type BubbleLayer = 'body' | 'glint';

function GoofindBubbleLetters({
  layer,
  withLeadingG,
}: {
  layer: BubbleLayer;
  withLeadingG: boolean;
}) {
  const showDot = layer === 'body';

  return (
    <>
      {withLeadingG ? 'G' : null}
      oo
      <span className="goofind-bubble-f">f</span>
      <span
        className={`goofind-bubble-i-wrap${showDot ? '' : ' goofind-bubble-i-wrap--ghost'}`}
        aria-hidden={!showDot}
      >
        {showDot ? (
          <>
            <span aria-hidden className="goofind-bubble-i-stem" />
            <span aria-hidden className="goofind-bubble-dot" />
          </>
        ) : (
          <span>ı</span>
        )}
      </span>
      nd
    </>
  );
}

export function GoofindWordmark({
  dark: _dark = false,
  className = '',
  withLeadingG = true,
  dotColor: _dotColor = BRAND_PRIMARY,
  prominent = false,
}: {
  dark?: boolean;
  className?: string;
  /** When false, only "oofınd" — the mark beside it stands for G */
  withLeadingG?: boolean;
  dotColor?: string;
  prominent?: boolean;
}) {
  const layers: BubbleLayer[] = ['body', 'glint'];

  return (
    <span
      className={[
        'goofind-bubble-wordmark',
        prominent ? 'goofind-bubble-wordmark--prominent' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ fontFamily: BUBBLE_FONT }}
    >
      {layers.map((layer) => (
        <span
          key={layer}
          className={`goofind-bubble-wordmark__${layer}`}
          aria-hidden={layer !== 'body'}
        >
          <GoofindBubbleLetters layer={layer} withLeadingG={withLeadingG} />
        </span>
      ))}
    </span>
  );
}

export function LogoIcon({ size = 60, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <GoofindLogoMark className="w-full h-full" />
    </div>
  );
}

/** Splash — logo centered, Goofind anchored to bottom center */
export function LogoSplash({ tagline = 'Kanada Türk Topluluğu' }: { tagline?: string }) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-white text-slate-900">
      <div className="flex flex-1 items-center justify-center px-8">
        <GoofindLogoMark className="w-[7.5rem] h-[7.5rem] sm:w-[9rem] sm:h-[9rem] animate-in fade-in zoom-in-95 duration-700" />
      </div>
      <div className="shrink-0 flex flex-col items-center gap-2.5 pb-10 sm:pb-14 px-6 text-center animate-in fade-in duration-700 delay-150">
        <GoofindWordmark
          withLeadingG
          dotColor={BRAND_PRIMARY}
          prominent
          className="text-3xl sm:text-4xl"
        />
        {tagline && (
          <p className="m-0 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500">
            {tagline}
          </p>
        )}
      </div>
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
  tagline,
  variant = 'default',
}: {
  size?: string;
  className?: string;
  animateOo?: boolean;
  dark?: boolean;
  stacked?: boolean;
  showMark?: boolean;
  tagline?: string;
  variant?: 'default' | 'header';
}) {
  const animateClass = animateOo ? 'animate-in fade-in zoom-in-95 duration-700' : '';
  const prominent = variant === 'header';
  const wordmark = (
    <GoofindWordmark
      dark={dark}
      withLeadingG={stacked ? true : !showMark}
      dotColor={BRAND_PRIMARY}
      prominent={prominent}
      className="whitespace-nowrap leading-none"
    />
  );

  if (showMark && !stacked && !tagline) {
    const markClass = prominent
      ? 'shrink-0 -mr-[0.04em] translate-y-[0.01em]'
      : 'shrink-0 -mr-[0.1em] translate-y-[0.02em] h-[1em] w-[1em]';

    return (
      <div
        className={`inline-flex shrink-0 min-w-max items-baseline gap-0 ${size} ${className} ${animateClass}`}
        aria-label="Goofind"
      >
        {prominent ? (
          <GoofindHeaderGMark className={markClass} prominent />
        ) : (
          <GoofindLogoMark className={markClass} />
        )}
        {wordmark}
      </div>
    );
  }

  const markSize = stacked
    ? 'w-[4.75rem] h-[4.75rem] sm:w-[5.25rem] sm:h-[5.25rem]'
    : prominent
      ? 'w-[1.48em] h-[1.48em] translate-y-[0.05em]'
      : 'w-[1.05em] h-[1.05em] translate-y-[0.05em]';
  const layoutClass = stacked ? 'flex-col gap-2.5 items-center' : 'flex-row items-baseline gap-0';

  return (
    <div className={`inline-flex shrink-0 min-w-max ${layoutClass} ${size} ${className} ${animateClass}`}>
      {showMark && <GoofindLogoMark className={`${markSize} shrink-0`} />}
      <div className={`flex shrink-0 flex-col ${stacked ? 'items-center gap-1.5' : 'gap-1'}`}>
        {wordmark}
        {tagline && (
          <p
            className={`m-0 whitespace-nowrap font-semibold uppercase leading-none ${
              stacked ? 'text-sm sm:text-base tracking-[0.2em]' : 'text-[11px] sm:text-xs tracking-[0.18em]'
            } ${dark ? 'text-slate-300' : 'text-slate-500'}`}
          >
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
}

export function GoofindAppIconSvg({ includeText = false }: { includeText?: boolean }) {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="112" fill="#FFFFFF" />
      <image href={GOOFIND_MARK_SRC} x="96" y="96" width="320" height="320" preserveAspectRatio="xMidYMid meet" />
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
}: {
  logoBgType: 'white' | 'charcoal' | 'transparent' | 'gradient';
  primaryGradientId?: string;
}) {
  const onDark = logoBgType === 'charcoal' || logoBgType === 'gradient';

  return (
    <g transform="translate(156 156) scale(2)">
      {(logoBgType === 'white' || logoBgType === 'transparent') && !onDark && (
        <rect width="100" height="100" fill="#FFFFFF" rx="18" />
      )}
      <image href={GOOFIND_MARK_SRC} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" />
    </g>
  );
}
