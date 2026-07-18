import React from 'react';
import { MapPin } from 'lucide-react';
import {
  ALL_CANADIAN_REGIONS,
  regionButtonActiveClasses,
  type CanadianRegion,
} from './regions';

type RegionSwitcherProps = {
  selected: CanadianRegion;
  onSelect: (region: CanadianRegion) => void;
  lang: 'en' | 'tr';
  variant?: 'header' | 'hero' | 'signup' | 'profile';
  className?: string;
};

export function RegionSwitcher({ selected, onSelect, lang, variant = 'hero', className = '' }: RegionSwitcherProps) {
  const isHeader = variant === 'header';
  const isSignup = variant === 'signup';
  const isProfile = variant === 'profile';

  return (
    <div className={className}>
      {(isSignup || isProfile) && (
        <p className="text-xs font-bold text-slate-700 mb-2 ml-1">
          {lang === 'en' ? 'Permanent Home Province' : 'Kalıcı Ana Eyalet'}
        </p>
      )}
      <div
        className={`gap-1.5 rounded-xl border bg-white/90 p-1.5 shadow-sm ${
          isHeader
            ? 'inline-flex flex-wrap max-w-[11rem] border-primary/15'
            : `grid grid-cols-5 border-primary/20 shadow-md ${isSignup || isProfile ? 'w-full' : ''}`
        }`}
        role="tablist"
        aria-label={lang === 'en' ? (isHeader ? 'Browse provinces' : 'Select province') : (isHeader ? 'Eyaletleri gez' : 'Eyalet seçin')}
      >
        {ALL_CANADIAN_REGIONS.map((region) => {
          const isActive = selected === region;
          return (
            <button
              key={region}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(region)}
              className={`flex items-center justify-center gap-1 rounded-lg font-black uppercase tracking-wide transition-all ${
                isHeader
                  ? 'px-2 py-1 text-[9px] sm:text-[10px] min-w-[2rem]'
                  : isSignup || isProfile
                    ? 'px-3 py-3 text-xs sm:text-sm'
                    : 'px-3 sm:px-4 py-2 text-[10px] sm:text-xs'
              } ${
                isActive
                  ? regionButtonActiveClasses(region)
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {!isHeader && (
                <MapPin size={isSignup || isProfile ? 15 : 13} strokeWidth={2.5} />
              )}
              {region}
            </button>
          );
        })}
      </div>
      {isSignup && (
        <p className="text-[11px] font-medium text-slate-500 mt-2 ml-1">
          {lang === 'en'
            ? 'This is your permanent home province. Use the menu beside the logo to browse other provinces.'
            : 'Bu kalıcı ana eyaletinizdir. Diğer eyaletleri gezmek için logonun yanındaki menüyü kullanın.'}
        </p>
      )}
    </div>
  );
}
