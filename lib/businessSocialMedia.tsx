import React from 'react';
import { Globe, Link2 } from 'lucide-react';

export type SocialMediaPlatform =
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'x'
  | 'youtube'
  | 'linkedin'
  | 'website';

export type BusinessSocialLinks = Partial<Record<SocialMediaPlatform, string>>;

export const SOCIAL_MEDIA_PLATFORMS: Array<{
  id: SocialMediaPlatform;
  labelEn: string;
  labelTr: string;
  placeholderEn: string;
  placeholderTr: string;
  brandColor: string;
}> = [
  {
    id: 'instagram',
    labelEn: 'Instagram',
    labelTr: 'Instagram',
    placeholderEn: '@username or instagram.com/...',
    placeholderTr: '@kullaniciadi veya instagram.com/...',
    brandColor: '#E4405F',
  },
  {
    id: 'facebook',
    labelEn: 'Facebook',
    labelTr: 'Facebook',
    placeholderEn: 'facebook.com/yourpage',
    placeholderTr: 'facebook.com/sayfaniz',
    brandColor: '#1877F2',
  },
  {
    id: 'tiktok',
    labelEn: 'TikTok',
    labelTr: 'TikTok',
    placeholderEn: '@username or tiktok.com/@...',
    placeholderTr: '@kullaniciadi veya tiktok.com/@...',
    brandColor: '#010101',
  },
  {
    id: 'x',
    labelEn: 'X (Twitter)',
    labelTr: 'X (Twitter)',
    placeholderEn: '@username or x.com/...',
    placeholderTr: '@kullaniciadi veya x.com/...',
    brandColor: '#0F1419',
  },
  {
    id: 'youtube',
    labelEn: 'YouTube',
    labelTr: 'YouTube',
    placeholderEn: 'youtube.com/@channel',
    placeholderTr: 'youtube.com/@kanal',
    brandColor: '#FF0000',
  },
  {
    id: 'linkedin',
    labelEn: 'LinkedIn',
    labelTr: 'LinkedIn',
    placeholderEn: 'linkedin.com/company/...',
    placeholderTr: 'linkedin.com/company/...',
    brandColor: '#0A66C2',
  },
  {
    id: 'website',
    labelEn: 'Website',
    labelTr: 'Web Sitesi',
    placeholderEn: 'www.yoursite.com',
    placeholderTr: 'www.siteniz.com',
    brandColor: '#2563EB',
  },
];

function stripAt(value: string): string {
  return value.replace(/^@+/, '').trim();
}

function ensureHttps(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url.replace(/^\/+/, '')}`;
}

export function normalizeSocialUrl(platform: SocialMediaPlatform, raw: string): string | undefined {
  const value = raw.trim();
  if (!value) return undefined;

  if (/^https?:\/\//i.test(value) || value.includes('.com/') || value.includes('.ca/')) {
    try {
      return new URL(ensureHttps(value)).toString();
    } catch {
      return undefined;
    }
  }

  const handle = stripAt(value);
  if (!handle) return undefined;

  switch (platform) {
    case 'instagram':
      return `https://www.instagram.com/${handle}/`;
    case 'facebook':
      return `https://www.facebook.com/${handle}`;
    case 'tiktok':
      return `https://www.tiktok.com/@${handle}`;
    case 'x':
      return `https://x.com/${handle}`;
    case 'youtube':
      return handle.startsWith('@')
        ? `https://www.youtube.com/${handle}`
        : `https://www.youtube.com/@${handle}`;
    case 'linkedin':
      return `https://www.linkedin.com/company/${handle}`;
    case 'website':
      return ensureHttps(handle);
    default:
      return undefined;
  }
}

export function sanitizeBusinessSocialLinks(input?: BusinessSocialLinks | null): BusinessSocialLinks {
  if (!input) return {};
  const cleaned: BusinessSocialLinks = {};
  for (const field of SOCIAL_MEDIA_PLATFORMS) {
    const normalized = normalizeSocialUrl(field.id, input[field.id] || '');
    if (normalized) cleaned[field.id] = normalized;
  }
  return cleaned;
}

export function parseBusinessSocialLinksFromForm(formData: FormData): BusinessSocialLinks {
  const draft: BusinessSocialLinks = {};
  for (const field of SOCIAL_MEDIA_PLATFORMS) {
    const value = (formData.get(`social_${field.id}`) as string | null)?.trim();
    if (value) draft[field.id] = value;
  }
  return sanitizeBusinessSocialLinks(draft);
}

export function getActiveSocialLinks(links?: BusinessSocialLinks | null) {
  return SOCIAL_MEDIA_PLATFORMS.map((field) => {
    const url = links?.[field.id];
    return url ? { ...field, url } : null;
  }).filter((item): item is (typeof SOCIAL_MEDIA_PLATFORMS)[number] & { url: string } => item !== null);
}

function SocialBrandIcon({ platform, size = 16 }: { platform: SocialMediaPlatform; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true as const };
  switch (platform) {
    case 'instagram':
      return (
        <svg {...common}>
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.2-1.5 1.5-1.5H16.7V5.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H8v3h2.3v8h3.2z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...common}>
          <path d="M16.5 3c.4 2.2 1.8 3.9 3.8 4.2v3.1c-1.4 0-2.7-.4-3.8-1.1v7.4c0 3.7-3 6.4-6.7 6.1-3.2-.3-5.7-3-5.7-6.2 0-3.5 2.8-6.3 6.3-6.3.6 0 1.2.1 1.7.3v3.4c-.5-.2-1.1-.3-1.7-.3-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9V3h3.2z" />
        </svg>
      );
    case 'x':
      return (
        <svg {...common}>
          <path d="M4 3h4.3l3.5 4.8L15.8 3H20l-6.2 7.1L20.5 21h-4.3l-3.9-5.3-4.2 5.3H4.5l6.7-7.7L4 3zm4.8 2.2 8.9 11.6h1.8L10.6 5.2H8.8z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...common}>
          <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.6.6a2.8 2.8 0 0 0-2 2A29.4 29.4 0 0 0 2 12a29.4 29.4 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.8.6 7.6.6 7.6.6s5.8 0 7.6-.6a2.8 2.8 0 0 0 2-2 29.4 29.4 0 0 0 .4-4.8 29.4 29.4 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common}>
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.06h4.56V23H.22V8.06zM8.67 8.06h4.37v2.03h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7V23h-4.56v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.61-2.38 3.27V23H8.67V8.06z" />
        </svg>
      );
    case 'website':
      return <Globe size={size} strokeWidth={2.5} />;
    default:
      return <Link2 size={size} strokeWidth={2.5} />;
  }
}

type BusinessSocialLinksFormProps = {
  lang: 'en' | 'tr';
  value: BusinessSocialLinks;
  onChange: (next: BusinessSocialLinks) => void;
};

export function BusinessSocialLinksForm({ lang, value, onChange }: BusinessSocialLinksFormProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest">
          {lang === 'en' ? 'Social Media (Optional)' : 'Sosyal Medya (İsteğe Bağlı)'}
        </p>
        <p className="text-[12px] font-semibold text-slate-500 mt-1">
          {lang === 'en'
            ? 'Add the accounts you use. Only filled platforms will appear on your profile.'
            : 'Kullandığınız hesapları ekleyin. Sadece doldurduklarınız profilinizde görünür.'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SOCIAL_MEDIA_PLATFORMS.map((field) => (
          <label key={field.id} className="block space-y-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-white"
                style={{ backgroundColor: field.brandColor }}
              >
                <SocialBrandIcon platform={field.id} size={13} />
              </span>
              {lang === 'en' ? field.labelEn : field.labelTr}
            </span>
            <input
              name={`social_${field.id}`}
              type="text"
              value={value[field.id] || ''}
              onChange={(e) => onChange({ ...value, [field.id]: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 outline-none font-semibold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300"
              placeholder={lang === 'en' ? field.placeholderEn : field.placeholderTr}
              autoComplete="off"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

type BusinessSocialLinksBarProps = {
  links?: BusinessSocialLinks | null;
  lang?: 'en' | 'tr';
  size?: 'sm' | 'md';
  className?: string;
  onLinkClick?: (event: React.MouseEvent) => void;
};

export function BusinessSocialLinksBar({
  links,
  lang = 'en',
  size = 'md',
  className = '',
  onLinkClick,
}: BusinessSocialLinksBarProps) {
  const active = getActiveSocialLinks(links);
  if (active.length === 0) return null;

  const buttonSize = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9';
  const iconSize = size === 'sm' ? 13 : 16;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {active.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          title={lang === 'en' ? item.labelEn : item.labelTr}
          onClick={onLinkClick}
          className={`${buttonSize} rounded-xl text-white inline-flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform`}
          style={{ backgroundColor: item.brandColor }}
        >
          <SocialBrandIcon platform={item.id} size={iconSize} />
        </a>
      ))}
    </div>
  );
}
