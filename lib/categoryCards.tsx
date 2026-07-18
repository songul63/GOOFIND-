import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  Star,
  Bell,
  Check,
  ListFilter,
  ChevronsDown,
  ChevronLeft,
  ShieldCheck,
  Sparkles,
  Clock,
  MessageSquare,
  Calendar,
  MapPin,
  Megaphone,
} from 'lucide-react';
import { Business, CategoryType, Notification, NotificationCategory, Event } from '../types';
import { getIconHex, lightenHex, darkenHex } from './icon3d';
import {
  type CategoryCardStyle,
  COMPANY_CATEGORY_STYLES,
  ANNOUNCEMENT_CATEGORY_STYLES,
  ALL_CATEGORY_STYLE,
  COMPANY_ALL_CATEGORY_STYLE,
  ANNOUNCEMENT_ALL_CATEGORY_STYLE,
  getCategoryToneStyle,
} from './categoryStyles';
import { BusinessSocialLinksBar } from './businessSocialMedia';

type CategoryFlatIconProps = {
  style?: CategoryCardStyle;
  size?: number;
  boxSize?: number;
  variant?: 'filter' | 'badge' | 'inline';
  isSelected?: boolean;
  className?: string;
};

export function CategoryFlatIcon({
  style = ALL_CATEGORY_STYLE,
  size = 20,
  boxSize = 40,
  variant = 'filter',
  isSelected = false,
  className = '',
}: CategoryFlatIconProps) {
  const Icon = style.icon;
  const hex = getIconHex(style.textColor);
  const light = lightenHex(hex, 48);
  const mid = hex;
  const dark = darkenHex(hex, 22);
  const radius = variant === 'badge' ? Math.round(boxSize * 0.32) : Math.round(boxSize * 0.38);
  const iconStroke = variant === 'filter' ? (isSelected ? 2.35 : 2.1) : 2.15;
  const iconColor = variant === 'filter' && isSelected ? dark : mid;

  const iconNode = (
    <Icon
      size={size}
      strokeWidth={iconStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      absoluteStrokeWidth
      style={{
        color: iconColor,
        filter: `drop-shadow(0 0.5px 0 ${lightenHex(hex, 72)}cc)`,
      }}
      aria-hidden="true"
    />
  );

  if (variant === 'inline') {
    return (
      <Icon
        size={size}
        strokeWidth={2.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        absoluteStrokeWidth
        className={className}
        style={{ color: mid }}
        aria-hidden="true"
      />
    );
  }

  const surfaceStyle: React.CSSProperties =
    variant === 'badge'
      ? {
          width: boxSize,
          height: boxSize,
          borderRadius: radius,
          background: `linear-gradient(165deg, #ffffff 0%, ${light}42 55%, ${mid}16 100%)`,
          border: `1px solid ${mid}38`,
          boxShadow: [
            `0 3px 10px ${mid}22`,
            '0 1px 2px rgba(15,23,42,0.07)',
            'inset 0 1px 0 rgba(255,255,255,0.95)',
          ].join(', '),
        }
      : {
          width: boxSize,
          height: boxSize,
          borderRadius: radius,
          background: isSelected
            ? `linear-gradient(148deg, ${light}66 0%, ${mid}28 52%, ${darkenHex(hex, 8)}20 100%)`
            : `linear-gradient(165deg, #ffffff 0%, ${light}38 46%, ${mid}14 100%)`,
          border: `1.5px solid ${isSelected ? `${mid}70` : `${mid}34`}`,
          boxShadow: isSelected
            ? [
                `0 0 0 2.5px ${mid}16`,
                `0 8px 18px ${mid}30`,
                '0 2px 5px rgba(15,23,42,0.07)',
                'inset 0 1px 0 rgba(255,255,255,0.88)',
              ].join(', ')
            : [
                `0 4px 12px ${mid}1a`,
                '0 1px 3px rgba(15,23,42,0.05)',
                'inset 0 1px 0 rgba(255,255,255,0.92)',
              ].join(', '),
        };

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 transition-all duration-300 ${className}`}
      style={surfaceStyle}
      aria-hidden="true"
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          left: '14%',
          right: '14%',
          height: '36%',
          borderRadius: '999px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0) 100%)',
          opacity: variant === 'badge' ? 0.85 : 0.72,
        }}
      />
      <div
        className="relative z-10 flex items-center justify-center"
        style={{ transform: isSelected && variant === 'filter' ? 'scale(1.06)' : 'scale(1)' }}
      >
        {iconNode}
      </div>
    </div>
  );
}

type CategoryBadgeProps = {
  style?: CategoryCardStyle;
  label: string;
  className?: string;
};

export function CategoryBadge({ style = ALL_CATEGORY_STYLE, label, className = '' }: CategoryBadgeProps) {
  return (
    <span
      className={`text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${style.textColor} ${className}`}
      style={getCategoryToneStyle(style.textColor)}
    >
      {label}
    </span>
  );
}

type CategoryFilterCardProps = {
  label: string;
  style?: CategoryCardStyle;
  isSelected: boolean;
  onClick: () => void;
  variant?: 'scroll' | 'grid';
};

export function CategoryFilterCard({
  label,
  style = ALL_CATEGORY_STYLE,
  isSelected,
  onClick,
  variant = 'scroll',
}: CategoryFilterCardProps) {
  const iconBox = variant === 'scroll' ? 44 : 48;
  const iconSize = variant === 'scroll' ? 22 : 24;

  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`group flex flex-col items-center justify-center shrink-0 snap-start transition-all duration-300 outline-none gap-1 ${
        variant === 'scroll' ? 'min-w-[72px] sm:min-w-[84px] py-1 px-1' : 'w-full py-1.5'
      } ${isSelected ? 'scale-[1.06]' : 'opacity-85 hover:opacity-100'}`}
    >
      <CategoryFlatIcon
        style={style}
        size={iconSize}
        boxSize={iconBox}
        isSelected={isSelected}
      />
      <span
        className={`text-[9px] sm:text-[10px] font-black uppercase tracking-tight text-center leading-[1.15] px-0.5 line-clamp-2 -mt-0.5 ${style.textColor} ${
          isSelected ? 'underline decoration-2 underline-offset-[3px]' : ''
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}

type CategoryPillProps = {
  label: string;
  style?: CategoryCardStyle;
  isSelected: boolean;
  onClick: () => void;
  layout?: 'scroll' | 'grid';
  tone?: 'primary' | 'accent' | 'primary-soft';
};

/** Compact pill chips — directory / companies feel */
export function CategoryPill({
  label,
  style = ALL_CATEGORY_STYLE,
  isSelected,
  onClick,
  layout = 'scroll',
  tone = 'primary',
}: CategoryPillProps) {
  const isGrid = layout === 'grid';
  const isAnnouncement = tone === 'accent' && !isGrid;

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex items-center rounded-full border transition-all duration-200 outline-none ${
        isGrid
          ? 'w-full min-h-[3.25rem] flex-col justify-center gap-1 px-1.5 py-2'
          : isAnnouncement
            ? 'shrink-0 snap-start w-[5.85rem] sm:w-[6.5rem] flex-col justify-center gap-1 px-1.5 py-2 min-h-[3.5rem]'
            : 'shrink-0 snap-start min-w-[6.75rem] max-w-[6.75rem] justify-center gap-1.5 px-2 py-2'
      } ${
        isSelected
          ? tone === 'accent'
            ? 'bg-accent text-white border-accent shadow-md shadow-accent/25'
            : tone === 'primary-soft'
              ? 'bg-primary/32 text-primary border-primary shadow-sm shadow-primary/14'
              : 'bg-primary text-white border-primary shadow-md shadow-primary/25'
          : tone === 'primary-soft'
            ? 'bg-primary/22 text-primary border-primary hover:bg-primary/28 hover:border-primary'
            : 'bg-white/90 text-slate-600 border-slate-200/90 hover:border-primary/35 hover:bg-white'
      }`}
    >
      {!isSelected && (
        <CategoryFlatIcon style={style} size={13} boxSize={24} variant="badge" />
      )}
      <span
        className={`text-[8px] sm:text-[9px] font-black uppercase tracking-tight text-center leading-tight ${
          isGrid || isAnnouncement ? 'line-clamp-2' : 'truncate'
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}

type CategoryTabBarProps = {
  tabs: { id: string; label: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  embedded?: boolean;
};

/** Underline tab bar — classified bulletin / announcements feel */
export function CategoryTabBar({ tabs, selectedId, onSelect, embedded = false }: CategoryTabBarProps) {
  return (
    <div
      className={`announcements-tabs flex overflow-x-auto gap-0.5 pb-0 no-scrollbar snap-x rounded-xl px-1 ${
        embedded ? '' : ''
      }`}
    >
      {tabs.map((tab) => {
        const isSelected = selectedId === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            className={`shrink-0 snap-start px-3 sm:px-4 py-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wide whitespace-nowrap border-b-2 -mb-px transition-colors outline-none ${
              isSelected
                ? 'border-accent-vivid text-accent-vivid'
                : 'border-transparent text-slate-400 hover:text-primary/55'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

type AnnouncementMultiCategoryFilterProps = {
  categories: NotificationCategory[];
  categoryLabels: Record<string, string>;
  selected: NotificationCategory[];
  onChange: (next: NotificationCategory[]) => void;
  lang: 'en' | 'tr';
  compact?: boolean;
  inline?: boolean;
};

/** Collapsible multi-category filter — icon trigger, expand to pick, collapse after apply */
export function AnnouncementMultiCategoryFilter({
  categories,
  categoryLabels,
  selected,
  onChange,
  lang,
  compact = false,
  inline = false,
}: AnnouncementMultiCategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<NotificationCategory[]>([]);

  const openPanel = () => {
    setDraft([...selected]);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setDraft([]);
  };

  const toggleDraft = (cat: NotificationCategory) => {
    setDraft((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  const applyFilter = () => {
    onChange(draft);
    setIsOpen(false);
    setDraft([]);
  };

  const clearFilter = () => {
    onChange([]);
    setIsOpen(false);
    setDraft([]);
  };

  const handleTriggerClick = () => {
    if (isOpen) {
      closePanel();
    } else {
      openPanel();
    }
  };

  const activeCount = selected.length;

  const panelClassName = inline
    ? 'absolute left-0 top-full z-50 mt-2 w-[min(calc(100vw-2rem),420px)] max-h-[min(70vh,420px)] overflow-y-auto p-3 sm:p-4 rounded-xl border border-accent/20 bg-white shadow-xl shadow-accent/10 animate-in fade-in slide-in-from-top-1 duration-200'
    : 'absolute right-0 top-full z-50 mt-2 w-[min(calc(100vw-2rem),420px)] max-h-[min(70vh,420px)] overflow-y-auto p-3 sm:p-4 rounded-xl border border-accent/20 bg-white shadow-xl shadow-accent/10 animate-in fade-in slide-in-from-top-1 duration-200';

  return (
    <span className={inline ? 'relative inline align-middle ann-inline-filter' : 'relative inline-flex shrink-0'}>
      <button
        type="button"
        onClick={handleTriggerClick}
        title={lang === 'en' ? 'Filter categories' : 'Kategori filtrele'}
        aria-label={lang === 'en' ? 'Filter categories' : 'Kategori filtrele'}
        aria-expanded={isOpen}
        className={`relative inline-flex items-center justify-center transition-all duration-200 outline-none align-middle ${
          inline
            ? 'ann-inline-filter-btn w-6 h-6 min-w-6 min-h-6 p-0 ml-[2px] rounded-md border-0 leading-none'
            : `rounded-md border ${compact ? 'w-7 h-7 rounded-lg' : 'w-9 h-9 sm:w-10 sm:h-10 rounded-lg'}`
        } ${
          isOpen || activeCount > 0
            ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20'
            : inline
              ? 'bg-primary/10 text-primary hover:bg-primary/18'
              : 'bg-white/90 text-primary border-primary/25 hover:border-primary/40'
        }`}
      >
        <ListFilter
          size={inline ? 17 : compact ? 15 : 17}
          strokeWidth={inline ? 2.5 : 2.35}
          className={`${isOpen || activeCount > 0 ? 'text-white' : 'text-primary'} ${inline ? 'shrink-0' : ''}`}
        />
        {!isOpen && activeCount > 0 && (
          <span
            className={`absolute rounded-full bg-primary text-white font-black text-center border border-white shadow-sm ${
              inline
                ? '-top-1 -right-1 min-w-[10px] h-[10px] px-0 text-[7px] leading-[10px]'
                : '-top-1 -right-1 min-w-[14px] h-3.5 px-0.5 text-[8px] leading-[14px]'
            }`}
          >
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className={panelClassName}>
          <p className="text-[10px] font-black uppercase tracking-wider text-accent-vivid mb-2.5">
            {lang === 'en' ? 'Filter categories' : 'Kategori filtrele'}
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const style = ANNOUNCEMENT_CATEGORY_STYLES[cat] || ALL_CATEGORY_STYLE;
              const Icon = style.icon;
              const isOn = draft.includes(cat);
              const label = categoryLabels[cat] || cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleDraft(cat)}
                  aria-label={label}
                  aria-pressed={isOn}
                  className={`relative inline-flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200 outline-none shrink-0 ${
                    isOn
                      ? 'bg-accent border-accent shadow-md shadow-accent/25 text-white'
                      : 'bg-white border-accent/20 hover:border-accent/45 text-slate-600'
                  }`}
                >
                  {isOn ? (
                    <Icon size={14} strokeWidth={2.25} className="text-white shrink-0" aria-hidden="true" />
                  ) : (
                    <CategoryFlatIcon style={style} size={14} variant="inline" />
                  )}
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tight whitespace-nowrap">
                    {label}
                  </span>
                  {isOn && (
                    <Check size={12} strokeWidth={3} className="text-white shrink-0" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-accent/10">
            {draft.length > 0 && (
              <button
                type="button"
                onClick={clearFilter}
                className="px-3 py-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-400 hover:text-accent-vivid transition-colors"
              >
                {lang === 'en' ? 'Clear' : 'Temizle'}
              </button>
            )}
            <button
              type="button"
              onClick={applyFilter}
              disabled={draft.length === 0}
              className="px-4 py-1.5 rounded-lg bg-accent text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-md shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              {lang === 'en' ? 'Apply' : 'Uygula'}
            </button>
          </div>
        </div>
      )}
    </span>
  );
}

export function matchesAnnouncementCategoryFilter(
  category: NotificationCategory,
  singleFilter: NotificationCategory | 'All',
  multiFilter: NotificationCategory[],
): boolean {
  if (multiFilter.length > 0) {
    return multiFilter.includes(category);
  }
  return singleFilter === 'All' || category === singleFilter;
}

const FeaturedStarRating = ({ rating, size = 12 }: { rating: number; size?: number }) => (
  <div className="flex items-center space-x-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={`${star <= rating ? 'fill-accent text-accent-vivid' : 'text-slate-200 fill-slate-100'}`}
        strokeWidth={3}
      />
    ))}
  </div>
);

type CompanyCategoryExpandArrowProps = {
  isExpanded: boolean;
  onToggle: () => void;
  lang: 'en' | 'tr';
  className?: string;
};

/** Chevron toggle — under company category pills */
export function CompanyCategoryExpandArrow({
  isExpanded,
  onToggle,
  lang,
  className = '',
}: CompanyCategoryExpandArrowProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      title={
        isExpanded
          ? lang === 'en'
            ? 'Show fewer categories'
            : 'Daha az kategori göster'
          : lang === 'en'
            ? 'Show all categories'
            : 'Tüm kategorileri göster'
      }
      aria-label={
        isExpanded
          ? lang === 'en'
            ? 'Show fewer categories'
            : 'Daha az kategori göster'
          : lang === 'en'
            ? 'Show all categories'
            : 'Tüm kategorileri göster'
      }
      className={`w-full flex items-center justify-center h-6 -mt-1 outline-none group/expand ${className}`}
    >
      <ChevronsDown
        size={20}
        strokeWidth={2.75}
        className={`text-primary drop-shadow-sm transition-transform duration-300 group-hover/expand:scale-110 ${isExpanded ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

type CompanyCategoryFilterBarProps = {
  selected: CategoryType | 'All';
  onSelect: (category: CategoryType | 'All') => void;
  onAllSelect?: () => void;
  onCategorySelect?: (category: CategoryType) => void;
  categoryLabels: Record<string, string>;
  lang: 'en' | 'tr';
};

const COMPANY_CATEGORY_GRID_THRESHOLD = 8;

/** Company category pills — horizontal scroll (all categories) + optional expandable grid */
export function CompanyCategoryFilterBar({
  selected,
  onSelect,
  onAllSelect,
  onCategorySelect,
  categoryLabels,
  lang,
}: CompanyCategoryFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedCategories = Object.values(CategoryType).sort((a, b) => {
    const labelA = categoryLabels[a] || a;
    const labelB = categoryLabels[b] || b;
    return labelA.localeCompare(labelB, lang);
  });

  const hasManyCategories = sortedCategories.length > COMPANY_CATEGORY_GRID_THRESHOLD;
  const collapseCategories = () => setIsExpanded(false);

  return (
    <div className="relative mb-3 sm:mb-4 min-w-0 w-full max-w-full">
      {hasManyCategories && isExpanded && (
        <CompanyCategoryExpandArrow
          isExpanded
          onToggle={collapseCategories}
          lang={lang}
          className="mb-1.5"
        />
      )}
      <div
        className={
          isExpanded
            ? 'grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 px-0.5 animate-in fade-in slide-in-from-top-1 duration-200 w-full min-w-0'
            : 'flex w-full min-w-0 overflow-x-auto overflow-y-hidden gap-2 pb-1 pe-6 no-scrollbar px-0.5 snap-x snap-proximity scroll-smooth touch-pan-x overscroll-x-contain'
        }
      >
        <CategoryPill
          label={lang === 'en' ? 'ALL' : 'HEPSİ'}
          style={COMPANY_ALL_CATEGORY_STYLE}
          isSelected={selected === 'All'}
          onClick={() => (onAllSelect ? onAllSelect() : onSelect('All'))}
          layout={isExpanded ? 'grid' : 'scroll'}
          tone="primary-soft"
        />
        {sortedCategories.map((cat) => (
          <CategoryPill
            key={cat}
            label={categoryLabels[cat] || cat}
            style={COMPANY_CATEGORY_STYLES[cat] || ALL_CATEGORY_STYLE}
            isSelected={selected === cat}
            onClick={() => (onCategorySelect ? onCategorySelect(cat) : onSelect(cat))}
            layout={isExpanded ? 'grid' : 'scroll'}
          />
        ))}
      </div>
      {hasManyCategories && (
        <CompanyCategoryExpandArrow
          isExpanded={isExpanded}
          onToggle={() => (isExpanded ? collapseCategories() : setIsExpanded(true))}
          lang={lang}
          className="-mt-1.5"
        />
      )}
    </div>
  );
}

type AnnouncementCategoryFilterBarProps = {
  selected: NotificationCategory | 'All';
  onSelect: (category: NotificationCategory | 'All') => void;
  onAllSelect?: () => void;
  onCategorySelect?: (category: NotificationCategory) => void;
  categoryLabels: Record<string, string>;
  lang: 'en' | 'tr';
};

const ANNOUNCEMENT_CATEGORY_GRID_THRESHOLD = 8;

/** Announcement category pills — horizontal scroll (all categories) + optional expandable grid */
export function AnnouncementCategoryFilterBar({
  selected,
  onSelect,
  onAllSelect,
  onCategorySelect,
  categoryLabels,
  lang,
}: AnnouncementCategoryFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedCategories = Object.values(NotificationCategory).sort((a, b) => {
    const labelA = categoryLabels[a] || a;
    const labelB = categoryLabels[b] || b;
    return labelA.localeCompare(labelB, lang);
  });

  const hasManyCategories = sortedCategories.length > ANNOUNCEMENT_CATEGORY_GRID_THRESHOLD;
  const collapseCategories = () => setIsExpanded(false);
  const cardVariant = isExpanded ? 'grid' : 'scroll';

  return (
    <div className="relative mb-3 sm:mb-4 min-w-0 w-full max-w-full">
      {hasManyCategories && isExpanded && (
        <CompanyCategoryExpandArrow
          isExpanded
          onToggle={collapseCategories}
          lang={lang}
          className="mb-1.5"
        />
      )}
      <div
        className={`announcements-tabs rounded-xl px-1 pt-2 pb-2 min-h-[5.5rem] w-full min-w-0 ${
          isExpanded
            ? 'grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 animate-in fade-in slide-in-from-top-1 duration-200'
            : 'flex overflow-x-auto overflow-y-hidden gap-1.5 no-scrollbar snap-x snap-proximity scroll-smooth touch-pan-x overscroll-x-contain pe-6'
        }`}
      >
        <CategoryFilterCard
          label={lang === 'en' ? 'ALL' : 'HEPSİ'}
          style={ANNOUNCEMENT_ALL_CATEGORY_STYLE}
          isSelected={selected === 'All'}
          onClick={() => (onAllSelect ? onAllSelect() : onSelect('All'))}
          variant={cardVariant}
        />
        {sortedCategories.map((cat) => (
          <CategoryFilterCard
            key={cat}
            label={categoryLabels[cat] || cat}
            style={ANNOUNCEMENT_CATEGORY_STYLES[cat] || ALL_CATEGORY_STYLE}
            isSelected={selected === cat}
            onClick={() => (onCategorySelect ? onCategorySelect(cat) : onSelect(cat))}
            variant={cardVariant}
          />
        ))}
      </div>
      {hasManyCategories && (
        <CompanyCategoryExpandArrow
          isExpanded={isExpanded}
          onToggle={() => (isExpanded ? collapseCategories() : setIsExpanded(true))}
          lang={lang}
          className="mt-1"
        />
      )}
    </div>
  );
}

type CompanyCategoriesExplorerPageProps = {
  categoryLabels: Record<string, string>;
  lang: 'en' | 'tr';
  onSelectCategory: (category: CategoryType) => void;
  onBack: () => void;
  businessCount?: number;
};

/** Full-page grid of all company categories — opened from HEPSİ on home */
export function CompanyCategoriesExplorerPage({
  categoryLabels,
  lang,
  onSelectCategory,
  onBack,
  businessCount = 0,
}: CompanyCategoriesExplorerPageProps) {
  const sortedCategories = Object.values(CategoryType).sort((a, b) => {
    const labelA = categoryLabels[a] || a;
    const labelB = categoryLabels[b] || b;
    return labelA.localeCompare(labelB, lang);
  });

  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 rounded-[2rem] sm:rounded-[3rem] border border-primary/15 bg-gradient-to-br from-primary-soft via-white to-primary-soft/30 p-5 sm:p-8 md:p-10 shadow-sm shadow-primary/5 relative overflow-hidden">
      <div className="mb-6 sm:mb-8 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-primary/20 text-primary flex items-center justify-center shadow-sm hover:bg-primary/5 hover:border-primary/35 active:scale-95 transition-all outline-none"
            aria-label={lang === 'en' ? 'Back to home' : 'Ana sayfaya dön'}
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <div className="min-w-0">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tight-brand text-primary font-display italic leading-tight">
              {lang === 'en' ? 'All Industries' : 'Tüm Sektörler'}
            </h3>
            <p className="text-primary/70 text-[11px] sm:text-[13px] font-black uppercase tracking-brand mt-1">
              {lang === 'en' ? 'Choose a category to browse companies' : 'Şirketleri görmek için kategori seçin'}
            </p>
            {businessCount > 0 && (
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider mt-1">
                {businessCount} {lang === 'en' ? 'registered listings' : 'kayıtlı işletme'}
              </p>
            )}
          </div>
        </div>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25 shrink-0 self-start sm:self-center">
          <Building2 size={24} strokeWidth={2.5} />
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5 relative z-10">
        {sortedCategories.map((cat) => (
          <CategoryFilterCard
            key={cat}
            label={categoryLabels[cat] || cat}
            style={COMPANY_CATEGORY_STYLES[cat] || ALL_CATEGORY_STYLE}
            isSelected={false}
            onClick={() => onSelectCategory(cat)}
            variant="grid"
          />
        ))}
      </div>
    </section>
  );
}

function CompanyFeaturedCard({
  biz,
  lang,
  categoryLabels,
  onSelect,
  className = 'w-[142px] sm:w-[162px]',
}: {
  biz: Business;
  lang: 'en' | 'tr';
  categoryLabels: Record<string, string>;
  onSelect: (biz: Business) => void;
  className?: string;
}) {
  const categoryStyle = COMPANY_CATEGORY_STYLES[biz.category] || ALL_CATEGORY_STYLE;
  const categoryLabel = categoryLabels[biz.category] || biz.category;

  return (
    <motion.button
      type="button"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(biz)}
      className={`snap-start shrink-0 ${className} bg-white rounded-2xl border border-primary/10 shadow-sm hover:shadow-lg hover:border-primary/30 overflow-hidden text-left group outline-none transition-shadow duration-300`}
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
        <img
          src={biz.imageUrl || `https://source.unsplash.com/400x300/?${biz.category},business`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          alt={biz.name}
        />
        {biz.verified && (
          <span className="absolute top-1.5 left-1.5 flex items-center gap-0.5 bg-emerald-500 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full shadow-sm">
            <ShieldCheck size={9} strokeWidth={3} />
            {lang === 'en' ? 'OK' : 'ONAY'}
          </span>
        )}
        <div className="absolute bottom-1.5 right-1.5 pointer-events-none">
          <CategoryFlatIcon style={categoryStyle} size={12} boxSize={24} variant="badge" />
        </div>
      </div>
      <div className="p-2.5 border-t border-slate-50">
        <h4 className="font-black text-[10px] sm:text-[11px] uppercase tracking-tight text-slate-900 truncate group-hover:text-primary transition-colors">
          {biz.name}
        </h4>
        <div className="flex items-center gap-1 mt-1">
          <FeaturedStarRating rating={biz.rating} size={9} />
          <span className="text-[10px] font-black text-primary">{biz.rating}</span>
        </div>
        <BusinessSocialLinksBar
          links={biz.socialLinks}
          lang={lang}
          size="sm"
          className="mt-1.5"
          onLinkClick={(e) => e.stopPropagation()}
        />
        <p className={`text-[7px] sm:text-[8px] font-black uppercase tracking-tight truncate mt-1 ${categoryStyle.textColor}`}>
          {categoryLabel}
        </p>
      </div>
    </motion.button>
  );
}

type FeaturedCompaniesCarouselProps = {
  businesses: Business[];
  categoryFilter: CategoryType | 'All';
  lang: 'en' | 'tr';
  categoryLabels: Record<string, string>;
  onSelect: (biz: Business) => void;
};

/** Horizontal photo-card carousel — business directory showcase */
export function FeaturedCompaniesCarousel({
  businesses,
  categoryFilter,
  lang,
  categoryLabels,
  onSelect,
}: FeaturedCompaniesCarouselProps) {
  const PREVIEW_LIMIT = 8;
  const allFiltered = businesses
    .filter((b) => b && (categoryFilter === 'All' || b.category === categoryFilter))
    .sort((a, b) => {
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      return (b.rating || 0) - (a.rating || 0);
    });

  const preview = allFiltered.slice(0, PREVIEW_LIMIT);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3 px-0.5">
        <p className="text-[11px] sm:text-[12px] font-black uppercase tracking-wider text-primary flex items-center gap-1.5">
          <Sparkles size={14} className="text-primary" strokeWidth={2.5} />
          {lang === 'en' ? 'Featured Directory' : 'Öne Çıkan Rehber'}
        </p>
      </div>

      {allFiltered.length === 0 ? (
        <div className="bg-white/80 p-8 rounded-2xl border border-primary/10 text-center">
          <Building2 size={28} className="mx-auto text-primary/30 mb-2" strokeWidth={2} />
          <p className="text-[12px] font-bold text-slate-400">
            {lang === 'en' ? 'No companies in this category yet.' : 'Bu kategoride henüz şirket yok.'}
          </p>
        </div>
      ) : (
        <div className="relative group/carousel">
          <div className="flex gap-3 overflow-x-auto pb-2 pt-0.5 no-scrollbar snap-x px-0.5">
            {preview.map((biz) => (
              <CompanyFeaturedCard
                key={biz.id}
                biz={biz}
                lang={lang}
                categoryLabels={categoryLabels}
                onSelect={onSelect}
              />
            ))}
          </div>
          <div className="absolute right-0 top-8 bottom-2 w-8 bg-gradient-to-l from-primary-soft/90 to-transparent pointer-events-none" />
        </div>
      )}
    </div>
  );
}

type AnnouncementCategoryPageProps = {
  category: NotificationCategory;
  categoryLabels: Record<string, string>;
  lang: 'en' | 'tr';
  notifications: Notification[];
  contactLabel?: string;
  onSelect: (notif: Notification) => void;
  onBack: () => void;
  headerActions?: React.ReactNode;
};

type AnnouncementsListingsPageProps = {
  notifications: Notification[];
  categoryLabels: Record<string, string>;
  lang: 'en' | 'tr';
  onSelect: (notif: Notification) => void;
  onBack: () => void;
  headerActions?: React.ReactNode;
  category?: NotificationCategory;
};

/** Minimal listings page — HEPSİ or single category, listings only */
export function AnnouncementsListingsPage({
  notifications,
  categoryLabels,
  lang,
  onSelect,
  onBack,
  headerActions,
  category,
}: AnnouncementsListingsPageProps) {
  const items = notifications.filter(
    (n) => n && n.approved && (!category || n.category === category),
  );

  return (
    <section className="animate-in fade-in duration-300 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 w-10 h-10 rounded-xl bg-white border border-accent/15 text-accent-vivid flex items-center justify-center shadow-sm hover:bg-accent-soft/50 active:scale-95 transition-all outline-none"
          aria-label={lang === 'en' ? 'Back' : 'Geri'}
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
        {headerActions}
      </div>

      {items.length === 0 ? (
        <div className="bg-white/80 p-10 rounded-2xl border border-accent/10 text-center">
          <Bell size={28} className="mx-auto text-accent/35 mb-2" strokeWidth={2} />
          <p className="text-[13px] font-bold text-slate-400">
            {lang === 'en' ? 'No listings yet.' : 'Henüz ilan yok.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full">
          {items.map((notif) => {
            const categoryStyle = ANNOUNCEMENT_CATEGORY_STYLES[notif.category] || ALL_CATEGORY_STYLE;
            const categoryLabel = categoryLabels[notif.category] || notif.category;
            return (
              <AnnouncementListingCard
                key={notif.id}
                notif={notif}
                categoryStyle={categoryStyle}
                categoryLabel={categoryLabel}
                onSelect={onSelect}
                density="full"
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

/** @deprecated Use AnnouncementsListingsPage */
export function AnnouncementCategoryPage({
  category,
  notifications,
  categoryLabels,
  lang,
  onSelect,
  onBack,
  headerActions,
}: AnnouncementCategoryPageProps) {
  return (
    <AnnouncementsListingsPage
      notifications={notifications}
      categoryLabels={categoryLabels}
      lang={lang}
      onSelect={onSelect}
      onBack={onBack}
      headerActions={headerActions}
      category={category}
    />
  );
}

function getListingPreviewImages(notif: Notification): string[] {
  const urls: string[] = [];
  const add = (url?: string) => {
    const trimmed = url?.trim();
    if (trimmed && !urls.includes(trimmed)) urls.push(trimmed);
  };
  add(notif.imageUrl);
  notif.gallery?.forEach((item) => add(item));
  return urls;
}

type ListingPreviewMediaProps = {
  images: string[];
  categoryStyle: CategoryCardStyle;
};

function ListingPreviewMedia({ images, categoryStyle, size = 'compact' }: ListingPreviewMediaProps & { size?: 'compact' | 'large' }) {
  const mediaBoxClass =
    size === 'large'
      ? 'shrink-0 w-[88px] sm:w-[96px] h-[88px] sm:h-[96px] rounded-xl overflow-hidden border border-accent/10 bg-slate-100'
      : 'shrink-0 w-[72px] sm:w-[80px] h-[72px] sm:h-[80px] rounded-xl overflow-hidden border border-accent/10 bg-slate-100';

  if (images.length === 0) {
    return (
      <div className={`${mediaBoxClass} flex items-center justify-center bg-gradient-to-br from-accent-soft/80 to-primary-soft/60`}>
        <CategoryFlatIcon style={categoryStyle} size={20} boxSize={40} variant="badge" />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={mediaBoxClass}>
        <img
          src={images[0]}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          alt=""
        />
      </div>
    );
  }

  return (
    <div
      className={`${mediaBoxClass} relative`}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x overscroll-x-contain">
        {images.map((url, index) => (
          <div key={`${url}-${index}`} className="snap-center shrink-0 w-full min-w-full h-full basis-full">
            <img
              src={url}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              alt=""
              draggable={false}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5 pointer-events-none">
        {images.slice(0, 6).map((url, index) => (
          <span key={`${url}-dot-${index}`} className="w-1 h-1 rounded-full bg-white/90 shadow-sm" />
        ))}
      </div>
    </div>
  );
}

type AnnouncementListingCardProps = {
  notif: Notification;
  categoryStyle: CategoryCardStyle;
  categoryLabel: string;
  onSelect: (notif: Notification) => void;
  density?: 'preview' | 'full';
};

function AnnouncementListingCard({
  notif,
  categoryStyle,
  categoryLabel,
  onSelect,
  density = 'preview',
}: AnnouncementListingCardProps) {
  const previewImages = getListingPreviewImages(notif);
  const isFull = density === 'full';
  const mediaWidth = isFull ? 'w-[88px] sm:w-[96px]' : 'w-[72px] sm:w-[80px]';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(notif)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(notif);
        }
      }}
      className={`w-full bg-white rounded-2xl border border-accent/10 shadow-sm hover:shadow-md hover:border-accent/25 duration-300 transition-all text-left group outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-accent/40 ${
        isFull ? '' : 'snap-start shrink-0'
      }`}
    >
      <div className={isFull ? 'p-4' : 'p-3.5'}>
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="shrink-0 flex flex-col items-start gap-1.5">
            <p
              className={`block ${mediaWidth} text-[9px] sm:text-[10px] font-black uppercase tracking-wide px-1 py-0.5 rounded-md border leading-tight line-clamp-2 ${categoryStyle.textColor}`}
              style={getCategoryToneStyle(categoryStyle.textColor)}
            >
              {categoryLabel}
            </p>
            <ListingPreviewMedia
              images={previewImages}
              categoryStyle={categoryStyle}
              size={isFull ? 'large' : 'compact'}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h4
              className={`font-black text-slate-900 leading-snug group-hover:text-accent-vivid transition-colors mb-1.5 ${
                isFull
                  ? 'text-[15px] sm:text-[16px] line-clamp-3'
                  : 'text-[13px] sm:text-[14px] line-clamp-2'
              }`}
            >
              {notif.title}
            </h4>
            <p
              className={`text-slate-600 font-medium leading-relaxed whitespace-pre-line ${
                isFull
                  ? 'text-[13px] sm:text-[14px] line-clamp-6'
                  : 'text-[12px] sm:text-[13px] line-clamp-2'
              }`}
            >
              {notif.description}
            </p>
            {notif.price ? (
              <span className="inline-block mt-2.5 text-[11px] sm:text-[12px] font-black text-accent-vivid bg-accent-soft border border-accent/15 rounded-lg px-2 py-0.5">
                {notif.price}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

type AnnouncementsAllPageProps = Omit<AnnouncementsListingsPageProps, 'category'>;

/** Opened from HEPSİ — all listings */
export function AnnouncementsAllPage(props: AnnouncementsAllPageProps) {
  return <AnnouncementsListingsPage {...props} />;
}

type AnnouncementFeedListProps = {
  notifications: Notification[];
  categoryFilter: NotificationCategory | 'All';
  categoryFiltersMulti?: NotificationCategory[];
  onMultiCategoryFilterChange?: (next: NotificationCategory[]) => void;
  lang: 'en' | 'tr';
  categoryLabels: Record<string, string>;
  contactLabel: string;
  onSelect: (notif: Notification) => void;
  variant?: 'preview' | 'page';
};

/** Vertical classified feed — bulletin / marketplace feel */
export function AnnouncementFeedList({
  notifications,
  categoryFilter,
  categoryFiltersMulti = [],
  onMultiCategoryFilterChange,
  lang,
  categoryLabels,
  contactLabel,
  onSelect,
  variant = 'preview',
}: AnnouncementFeedListProps) {
  const isPage = variant === 'page';
  const items = notifications.filter(
    (n) =>
      n &&
      n.approved &&
      matchesAnnouncementCategoryFilter(n.category, categoryFilter, categoryFiltersMulti),
  );

  return (
    <div className="relative mt-4 group/ann-feed">
      <div className="relative mb-3 px-0.5 w-fit max-w-full">
        <div className="inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-black uppercase text-accent-vivid leading-none whitespace-nowrap">
          {isPage && (
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-vivid opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-vivid" />
            </span>
          )}
          <span className="inline leading-none whitespace-nowrap">
            <span className="inline">{lang === 'en' ? 'Live Listings' : 'Canlı İlanlar'}</span>
            {onMultiCategoryFilterChange && (
              <AnnouncementMultiCategoryFilter
                inline
                categories={Object.values(NotificationCategory)}
                categoryLabels={categoryLabels}
                selected={categoryFiltersMulti}
                onChange={onMultiCategoryFilterChange}
                lang={lang}
              />
            )}
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white/80 p-8 rounded-2xl border border-primary/10 text-center">
          <Bell size={28} className="mx-auto text-accent/35 mb-2" strokeWidth={2} />
          <p className="text-[12px] font-bold text-slate-400">
            {categoryFiltersMulti.length > 0
              ? lang === 'en'
                ? 'No listings for the selected categories.'
                : 'Seçili kategorilerde ilan bulunamadı.'
              : lang === 'en'
                ? 'No listings in this category.'
                : 'Bu kategoride ilan yok.'}
          </p>
        </div>
      ) : (
        <>
          <div
            className={`flex flex-col gap-2.5 w-full ${
              isPage
                ? 'pr-1 scroll-smooth max-h-none [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-primary-soft/40 [&::-webkit-scrollbar-thumb]:bg-accent/30 [&::-webkit-scrollbar-thumb]:rounded-full'
                : 'max-h-[min(390px,48vh)] overflow-y-auto snap-y snap-mandatory scroll-smooth pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-primary-soft/40 [&::-webkit-scrollbar-thumb]:bg-accent/30 [&::-webkit-scrollbar-thumb]:rounded-full'
            }`}
          >
            {items.map((notif) => {
              const categoryStyle = ANNOUNCEMENT_CATEGORY_STYLES[notif.category] || ALL_CATEGORY_STYLE;
              const categoryLabel = categoryLabels[notif.category] || notif.category;

              if (variant !== 'page') {
                return (
                  <AnnouncementListingCard
                    key={notif.id}
                    notif={notif}
                    categoryStyle={categoryStyle}
                    categoryLabel={categoryLabel}
                    onSelect={onSelect}
                    density="preview"
                  />
                );
              }

              return (
                <div
                  key={notif.id}
                  onClick={() => onSelect(notif)}
                  className="w-full bg-white p-3 rounded-xl border-l-[3px] border-l-primary border border-accent/10 shadow-sm hover:shadow-md hover:border-primary/20 duration-300 transition-all cursor-pointer flex items-center justify-between gap-3 text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {notif.imageUrl ? (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-accent/10 bg-slate-50 shrink-0">
                        <img
                          src={notif.imageUrl}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          alt=""
                        />
                      </div>
                    ) : (
                      <CategoryFlatIcon
                        style={categoryStyle}
                        size={20}
                        boxSize={40}
                        variant="badge"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <CategoryBadge style={categoryStyle} label={categoryLabel} />
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 flex items-center gap-0.5">
                          <Clock size={10} /> {notif.date}
                        </span>
                      </div>
                      <h4 className="font-black text-slate-800 text-[12px] sm:text-[13px] mb-0.5 uppercase tracking-tight group-hover:text-accent-vivid transition-colors truncate">
                        {notif.title}
                      </h4>
                      <p className="text-slate-500 text-[11px] sm:text-[12px] font-medium line-clamp-2 leading-normal">
                        {notif.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className="text-[11px] sm:text-[12px] font-black text-accent-vivid bg-accent-soft border border-accent/20 rounded-lg px-2 py-1 uppercase tracking-wide whitespace-nowrap">
                      {notif.price || contactLabel}
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-accent/10 border border-accent/15 text-accent-vivid group-hover:bg-accent group-hover:text-white rounded-lg transition-all text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                      <MessageSquare size={12} />
                      {lang === 'en' ? 'Chat' : 'Mesaj'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {isPage && (
            <div className="absolute bottom-0 left-0 right-1 h-10 bg-gradient-to-t from-primary-soft/50 via-accent-soft/20 to-transparent pointer-events-none" />
          )}
        </>
      )}
    </div>
  );
}

type EventFeedListProps = {
  events: Event[];
  lang: 'en' | 'tr';
  onSelect: (evt: Event) => void;
};

/** Vertical scrollable feed — mirrors Canlı İlanlar bulletin layout */
export function EventFeedList({ events, lang, onSelect }: EventFeedListProps) {
  const items = events.filter((e) => e && e.approved);

  return (
    <div className="relative mt-4 group/event-feed">
      <div className="flex items-center justify-between mb-3 px-0.5">
        <p className="text-[11px] sm:text-[12px] font-black uppercase tracking-wider text-primary inline-flex items-center gap-1">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          {lang === 'en' ? 'Upcoming Events' : 'Yaklaşan Etkinlikler'}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white/80 p-8 rounded-2xl border border-primary/10 text-center">
          <Calendar size={28} className="mx-auto text-primary/30 mb-2" strokeWidth={2} />
          <p className="text-[12px] font-bold text-slate-400">
            {lang === 'en' ? 'No events found.' : 'Etkinlik bulunamadı.'}
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 w-full max-h-[320px] overflow-y-auto pr-1 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-primary-soft/50 [&::-webkit-scrollbar-thumb]:bg-primary/35 [&::-webkit-scrollbar-thumb]:rounded-full">
            {items.map((evt) => (
              <div
                key={evt.id}
                onClick={() => onSelect(evt)}
                className="w-full bg-white p-3 rounded-xl border-l-[3px] border-l-primary border border-primary/10 shadow-sm hover:shadow-md hover:border-primary/25 duration-300 transition-all cursor-pointer flex items-center justify-between gap-3 text-left group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {evt.imageUrl ? (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-primary/10 bg-slate-50 shrink-0">
                      <img
                        src={evt.imageUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                      <Calendar size={22} className="text-primary" strokeWidth={2.5} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wide text-primary bg-primary/10 border border-primary/15 rounded-md px-1.5 py-0.5">
                        {lang === 'en' ? 'Event' : 'Etkinlik'}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 flex items-center gap-0.5">
                        <Clock size={10} /> {evt.date}
                      </span>
                    </div>
                    <h4 className="font-black text-slate-800 text-[12px] sm:text-[13px] mb-0.5 uppercase tracking-tight group-hover:text-primary transition-colors truncate">
                      {evt.title}
                    </h4>
                    <p className="text-slate-500 text-[11px] sm:text-[12px] font-medium line-clamp-1 leading-normal flex items-center gap-1">
                      <MapPin size={11} className="text-primary shrink-0" />
                      {evt.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="text-[11px] sm:text-[12px] font-black text-primary bg-primary-soft border border-primary/20 rounded-lg px-2 py-1 uppercase tracking-wide whitespace-nowrap">
                    {evt.date}
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 border border-primary/15 text-primary group-hover:bg-primary group-hover:text-white rounded-lg transition-all text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                    <Calendar size={12} />
                    {lang === 'en' ? 'Details' : 'Detay'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-1 h-10 bg-gradient-to-t from-white/90 via-white/30 to-transparent pointer-events-none" />
        </>
      )}
    </div>
  );
}

/** @deprecated Use FeaturedCompaniesCarousel — kept for backward compat */
export function FeaturedCompaniesScroll(props: FeaturedCompaniesCarouselProps & { scrollGroupClass?: string }) {
  return <FeaturedCompaniesCarousel {...props} />;
}
