import React from 'react';
import { PlaceCategory } from '../types';

export { PlaceCategory };

export const PLACE_CATEGORY_ORDER: PlaceCategory[] = [
  PlaceCategory.FAMILY,
  PlaceCategory.NATURE,
  PlaceCategory.HERITAGE,
  PlaceCategory.CULTURE,
  PlaceCategory.CITY,
  PlaceCategory.ADVENTURE,
];

type PlaceCategoryMeta = {
  emoji: string;
  tr: string;
  en: string;
  pillActive: string;
  pillIdle: string;
  badge: string;
};

export const PLACE_CATEGORY_META: Record<PlaceCategory, PlaceCategoryMeta> = {
  [PlaceCategory.FAMILY]: {
    emoji: '👨‍👩‍👧',
    tr: 'Ailece Keşif',
    en: 'Family Discoveries',
    pillActive: 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/25',
    pillIdle: 'bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300',
    badge: 'bg-amber-500/90 text-white',
  },
  [PlaceCategory.NATURE]: {
    emoji: '🌲',
    tr: 'Doğa & Manzara',
    en: 'Nature & Scenery',
    pillActive: 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/25',
    pillIdle: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300',
    badge: 'bg-emerald-600/90 text-white',
  },
  [PlaceCategory.HERITAGE]: {
    emoji: '🏛️',
    tr: 'Tarih & Miras',
    en: 'History & Heritage',
    pillActive: 'bg-stone-600 text-white border-stone-600 shadow-md shadow-stone-500/25',
    pillIdle: 'bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-300',
    badge: 'bg-stone-600/90 text-white',
  },
  [PlaceCategory.CULTURE]: {
    emoji: '🎭',
    tr: 'Kültür & Müzeler',
    en: 'Culture & Museums',
    pillActive: 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/25',
    pillIdle: 'bg-violet-50 text-violet-700 border-violet-200 hover:border-violet-300',
    badge: 'bg-violet-600/90 text-white',
  },
  [PlaceCategory.CITY]: {
    emoji: '🌆',
    tr: 'Şehir Rotaları',
    en: 'City Explorations',
    pillActive: 'bg-primary text-white border-primary shadow-md shadow-primary/25',
    pillIdle: 'bg-primary/10 text-primary border-primary/20 hover:border-primary/35',
    badge: 'bg-primary/90 text-white',
  },
  [PlaceCategory.ADVENTURE]: {
    emoji: '🎢',
    tr: 'Macera & Eğlence',
    en: 'Adventure & Thrills',
    pillActive: 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/25',
    pillIdle: 'bg-rose-50 text-rose-700 border-rose-200 hover:border-rose-300',
    badge: 'bg-rose-500/90 text-white',
  },
};

export function resolvePlaceCategory(place: { category?: string; name?: string }): PlaceCategory {
  if (place.category && Object.values(PlaceCategory).includes(place.category as PlaceCategory)) {
    return place.category as PlaceCategory;
  }
  const name = (place.name || '').toLowerCase();
  if (name.includes('museum') || name.includes('müze') || name.includes('gallery')) return PlaceCategory.CULTURE;
  if (name.includes('falls') || name.includes('park') || name.includes('island')) return PlaceCategory.NATURE;
  if (name.includes('loma') || name.includes('castle') || name.includes('fort')) return PlaceCategory.HERITAGE;
  if (name.includes('tower') || name.includes('district')) return PlaceCategory.CITY;
  return PlaceCategory.CITY;
}

export function getPlaceCategoryLabel(category: PlaceCategory, lang: 'en' | 'tr'): string {
  return lang === 'en' ? PLACE_CATEGORY_META[category].en : PLACE_CATEGORY_META[category].tr;
}

export function matchesPlaceCategoryFilter(
  place: { category?: string; name?: string },
  filter: PlaceCategory | 'All',
): boolean {
  if (filter === 'All') return true;
  return resolvePlaceCategory(place) === filter;
}

type PlaceCategoryFilterBarProps = {
  selected: PlaceCategory | 'All';
  onSelect: (category: PlaceCategory | 'All') => void;
  lang: 'en' | 'tr';
  className?: string;
};

export function PlaceCategoryFilterBar({ selected, onSelect, lang, className = '' }: PlaceCategoryFilterBarProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-1 pt-0.5 px-0.5 no-scrollbar snap-x ${className}`}>
      <button
        type="button"
        onClick={() => onSelect('All')}
        className={`snap-start shrink-0 px-3 py-1.5 rounded-full border text-[9px] sm:text-[10px] font-black uppercase tracking-wide transition-all outline-none ${
          selected === 'All'
            ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
            : 'bg-white text-slate-600 border-slate-200 hover:border-primary/30'
        }`}
      >
        {lang === 'en' ? 'All' : 'Hepsi'}
      </button>
      {PLACE_CATEGORY_ORDER.map((cat) => {
        const meta = PLACE_CATEGORY_META[cat];
        const isActive = selected === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className={`snap-start shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] sm:text-[10px] font-black uppercase tracking-wide transition-all outline-none ${
              isActive ? meta.pillActive : meta.pillIdle
            }`}
          >
            <span className="text-sm leading-none" aria-hidden="true">{meta.emoji}</span>
            <span className="whitespace-nowrap">{lang === 'en' ? meta.en : meta.tr}</span>
          </button>
        );
      })}
    </div>
  );
}

export function PlaceCategoryBadge({
  category,
  lang,
  className = '',
}: {
  category: PlaceCategory;
  lang: 'en' | 'tr';
  className?: string;
}) {
  const meta = PLACE_CATEGORY_META[category];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wide shadow-sm ${meta.badge} ${className}`}
    >
      <span aria-hidden="true">{meta.emoji}</span>
      {lang === 'en' ? meta.en : meta.tr}
    </span>
  );
}
