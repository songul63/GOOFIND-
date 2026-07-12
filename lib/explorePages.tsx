import React, { useMemo, useState } from 'react';
import { Calendar, ChevronRight, Clock, Compass, MapPin, Search } from 'lucide-react';
import type { Event, PlaceToVisit } from '../types';
import { PlaceCategory, PlaceCategoryFilterBar, PlaceCategoryBadge, matchesPlaceCategoryFilter, resolvePlaceCategory } from './placeCategories';

type Lang = 'en' | 'tr';

function CompactSearch({
  value,
  onChange,
  placeholder,
  className = '',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={2} />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 placeholder:text-slate-400 text-[13px] font-medium outline-none focus:bg-white focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all"
      />
    </div>
  );
}

type EventsExplorePageProps = {
  events: Event[];
  lang: Lang;
  onSelect: (evt: Event) => void;
};

export function EventsExplorePage({ events, lang, onSelect }: EventsExplorePageProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      if (!e?.approved) return false;
      if (!q) return true;
      return (
        (e.title || '').toLowerCase().includes(q) ||
        (e.description || '').toLowerCase().includes(q) ||
        (e.location || '').toLowerCase().includes(q)
      );
    });
  }, [events, query]);

  return (
    <div className="fixed inset-x-0 top-14 bottom-[3.75rem] z-40 flex flex-col overflow-hidden bg-slate-50">
      <div className="shrink-0 px-3 sm:px-4 py-2.5 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
            <Calendar size={16} strokeWidth={2.25} />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-[15px] font-bold text-slate-900 leading-tight">
              {lang === 'en' ? 'Events' : 'Etkinlikler'}
            </h1>
            <p className="text-[11px] text-slate-500 leading-none mt-0.5">
              {filtered.length} {lang === 'en' ? 'upcoming' : 'yaklaşan'}
            </p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-2">
          <CompactSearch
            value={query}
            onChange={setQuery}
            placeholder={lang === 'en' ? 'Search events...' : 'Etkinlik ara...'}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-2 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-1.5 pb-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar size={24} className="mx-auto text-slate-300 mb-2" />
              <p className="text-[12px] text-slate-400 font-medium">
                {lang === 'en' ? 'No events found' : 'Etkinlik bulunamadı'}
              </p>
            </div>
          ) : (
            filtered.map((evt) => (
              <button
                key={evt.id}
                type="button"
                onClick={() => onSelect(evt)}
                className="w-full text-left bg-white px-2.5 py-2 rounded-lg border border-slate-100 hover:border-primary/20 hover:bg-primary-soft/20 transition-colors group flex items-center gap-2.5"
              >
                {evt.imageUrl ? (
                  <div className="w-11 h-11 rounded-md overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={evt.imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-md bg-primary/8 flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-primary/70" strokeWidth={2} />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-slate-800 leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                    {evt.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-0.5 shrink-0">
                      <Clock size={10} className="text-slate-400" />
                      {evt.date}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="inline-flex items-center gap-0.5 min-w-0 truncate">
                      <MapPin size={10} className="text-slate-400 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-300 group-hover:text-primary shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

type PlacesExplorePageProps = {
  places: PlaceToVisit[];
  lang: Lang;
  selectedCategory: PlaceCategory | 'All';
  onCategoryChange: (cat: PlaceCategory | 'All') => void;
  onSelectPlace: (place: PlaceToVisit) => void;
  onOpenAllPlaces: () => void;
};

export function PlacesExplorePage({
  places,
  lang,
  selectedCategory,
  onCategoryChange,
  onSelectPlace,
  onOpenAllPlaces,
}: PlacesExplorePageProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return places.filter((p) => {
      if (!p || p.approved === false) return false;
      if (!matchesPlaceCategoryFilter(p, selectedCategory)) return false;
      if (!q) return true;
      return (
        (p.name || '').toLowerCase().includes(q) ||
        (p.province || '').toLowerCase().includes(q) ||
        (p.address || '').toLowerCase().includes(q)
      );
    });
  }, [places, selectedCategory, query]);

  return (
    <div className="fixed inset-x-0 top-14 bottom-[3.75rem] z-40 flex flex-col overflow-hidden bg-slate-50">
      <div className="shrink-0 bg-white border-b border-slate-100">
        <div className="px-3 sm:px-4 py-2.5 border-b border-primary/8 bg-primary-soft/40">
          <div className="max-w-3xl mx-auto flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
              <Compass size={16} strokeWidth={2.25} />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-[15px] font-bold text-slate-900 leading-tight">
                {lang === 'en' ? 'Places to Visit' : 'Gezilecek Yerler'}
              </h1>
              <p className="text-[11px] text-slate-500 leading-none mt-0.5">
                {filtered.length} {lang === 'en' ? 'destinations' : 'yer'}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenAllPlaces}
              className="shrink-0 text-[11px] font-semibold text-primary hover:text-primary-dark px-2 py-1 rounded-md hover:bg-white/70 transition-colors"
            >
              {lang === 'en' ? 'View all' : 'Tümü'}
            </button>
          </div>
          <div className="max-w-3xl mx-auto mt-2">
            <CompactSearch
              value={query}
              onChange={setQuery}
              placeholder={lang === 'en' ? 'Search places...' : 'Yer ara...'}
            />
          </div>
        </div>

        <div className="px-3 sm:px-4 py-2 max-w-3xl mx-auto">
          <PlaceCategoryFilterBar
            selected={selectedCategory}
            onSelect={onCategoryChange}
            lang={lang}
            className="[&_button]:!text-[8px] sm:[&_button]:!text-[9px] [&_button]:!px-2.5 [&_button]:!py-1"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-2 custom-scrollbar">
        <div className="max-w-3xl mx-auto grid grid-cols-3 sm:grid-cols-4 gap-2 pb-3">
          {filtered.map((place, idx) => {
            const placeCat = resolvePlaceCategory(place);
            return (
              <button
                key={place.id || idx}
                type="button"
                onClick={() => onSelectPlace(place)}
                className="group text-left rounded-lg overflow-hidden border border-slate-100 bg-white hover:border-primary/25 transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={place.img}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute top-1 left-1 right-1">
                    <PlaceCategoryBadge category={placeCat} lang={lang} className="!text-[8px] !px-1.5 !py-0.5 max-w-full truncate scale-90 origin-top-left" />
                  </div>
                </div>
                <div className="px-1.5 py-1.5">
                  <p className="text-[9px] font-semibold text-accent-vivid uppercase tracking-wide truncate leading-none">
                    {place.province}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-800 leading-tight line-clamp-2 mt-0.5 group-hover:text-primary transition-colors">
                    {place.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="max-w-3xl mx-auto py-12 text-center">
            <Compass size={24} className="mx-auto text-slate-300 mb-2" />
            <p className="text-[12px] text-slate-400 font-medium">
              {lang === 'en' ? 'No places found' : 'Yer bulunamadı'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
