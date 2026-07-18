import React, { useMemo } from 'react';
import { Building2, MapPin, Megaphone, Sparkles, Users } from 'lucide-react';
import type { Business, Community, Event, Notification, PlaceToVisit } from '../types';
import {
  ALL_CANADIAN_REGIONS,
  filterCommunitiesByRegion,
  getCommunityRegion,
  regionButtonActiveClasses,
  regionLabel,
  resolveBusinessRegion,
  resolveEventRegion,
  resolveNotificationRegion,
  resolvePlaceRegion,
  type CanadianRegion,
} from './regions';
import type { AdminDashboardTab } from './adminDashboard';

export type AdminRegionFilter = 'ALL' | CanadianRegion;

export type AdminRegionStats = {
  region: CanadianRegion;
  businesses: number;
  pendingBusinesses: number;
  notifications: number;
  events: number;
  places: number;
  communities: number;
  users: number;
};

export type AdminRegionUser = {
  id: string;
  name?: string;
  email?: string;
  lastActive?: number;
  homeRegion?: CanadianRegion | null;
  joinedCommunityId?: string | null;
};

export function matchesAdminRegionFilter(
  region: CanadianRegion | null | undefined,
  filter: AdminRegionFilter,
): boolean {
  if (filter === 'ALL') return true;
  return region === filter;
}

export function computeAdminRegionStats(input: {
  businesses: Business[];
  notifications: Notification[];
  events: Event[];
  places: PlaceToVisit[];
  communities: Community[];
  users: AdminRegionUser[];
}): AdminRegionStats[] {
  return ALL_CANADIAN_REGIONS.map((region) => {
    const regionBusinesses = input.businesses.filter((b) => resolveBusinessRegion(b) === region);
    const regionNotifications = input.notifications.filter((n) => resolveNotificationRegion(n) === region);
    const regionEvents = input.events.filter((e) => resolveEventRegion(e) === region);
    const regionPlaces = input.places.filter((p) => resolvePlaceRegion(p) === region);
    const regionCommunities = input.communities.filter(
      (c) => c.id !== 'all' && getCommunityRegion(c) === region,
    );
    const regionUsers = input.users.filter((u) => u.homeRegion === region);

    return {
      region,
      businesses: regionBusinesses.length,
      pendingBusinesses: regionBusinesses.filter((b) => !b.verified).length,
      notifications: regionNotifications.length,
      events: regionEvents.length,
      places: regionPlaces.length,
      communities: regionCommunities.length,
      users: regionUsers.length,
    };
  });
}

export function filterBusinessesForAdmin(businesses: Business[], filter: AdminRegionFilter): Business[] {
  if (filter === 'ALL') return businesses;
  return businesses.filter((b) => resolveBusinessRegion(b) === filter);
}

export function filterNotificationsForAdmin(
  notifications: Notification[],
  filter: AdminRegionFilter,
): Notification[] {
  if (filter === 'ALL') return notifications;
  return notifications.filter((n) => resolveNotificationRegion(n) === filter);
}

export function filterEventsForAdmin(events: Event[], filter: AdminRegionFilter): Event[] {
  if (filter === 'ALL') return events;
  return events.filter((e) => resolveEventRegion(e) === filter);
}

export function filterPlacesForAdmin(places: PlaceToVisit[], filter: AdminRegionFilter): PlaceToVisit[] {
  if (filter === 'ALL') return places;
  return places.filter((p) => resolvePlaceRegion(p) === filter);
}

export function filterCommunitiesForAdmin(communities: Community[], filter: AdminRegionFilter): Community[] {
  if (filter === 'ALL') return communities.filter((c) => c.id !== 'all');
  return filterCommunitiesByRegion(communities, filter);
}

export function filterUsersForAdmin(users: AdminRegionUser[], filter: AdminRegionFilter): AdminRegionUser[] {
  if (filter === 'ALL') return users;
  return users.filter((u) => u.homeRegion === filter);
}

export function AdminRegionBadge({
  region,
  lang,
  compact = false,
}: {
  region: CanadianRegion;
  lang: 'en' | 'tr';
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg font-black uppercase tracking-wide text-white ${regionButtonActiveClasses(region)} ${
        compact ? 'px-1.5 py-0.5 text-[8px]' : 'px-2 py-1 text-[9px]'
      }`}
    >
      <MapPin size={compact ? 9 : 10} strokeWidth={2.5} />
      {region}
    </span>
  );
}

type AdminRegionFilterBarProps = {
  lang: 'en' | 'tr';
  filter: AdminRegionFilter;
  onChange: (filter: AdminRegionFilter) => void;
  className?: string;
};

export function AdminRegionFilterBar({ lang, filter, onChange, className = '' }: AdminRegionFilterBarProps) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-3 shadow-sm ${className}`}>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">
        {lang === 'en' ? 'Filter by province' : 'Eyalete göre filtrele'}
      </p>
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => onChange('ALL')}
          className={`px-3 py-2 rounded-xl font-black text-[10px] uppercase tracking-wide transition-all ${
            filter === 'ALL'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {lang === 'en' ? 'All Canada' : 'Tüm Kanada'}
        </button>
        {ALL_CANADIAN_REGIONS.map((region) => {
          const active = filter === region;
          return (
            <button
              key={region}
              type="button"
              onClick={() => onChange(region)}
              className={`px-2.5 py-2 rounded-xl font-black text-[10px] uppercase tracking-wide transition-all ${
                active
                  ? regionButtonActiveClasses(region)
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title={regionLabel(region, lang)}
            >
              {region}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type AdminRegionsPanelProps = {
  lang: 'en' | 'tr';
  stats: AdminRegionStats[];
  activeFilter: AdminRegionFilter;
  onSelectRegion: (region: CanadianRegion) => void;
  onNavigate: (tab: AdminDashboardTab) => void;
  onSyncCommunities?: () => void;
  isSyncing?: boolean;
};

export function AdminRegionsPanel({
  lang,
  stats,
  activeFilter,
  onSelectRegion,
  onNavigate,
  onSyncCommunities,
  isSyncing = false,
}: AdminRegionsPanelProps) {
  const totals = useMemo(
    () =>
      stats.reduce(
        (acc, row) => ({
          businesses: acc.businesses + row.businesses,
          notifications: acc.notifications + row.notifications,
          events: acc.events + row.events,
          places: acc.places + row.places,
          communities: acc.communities + row.communities,
          users: acc.users + row.users,
          pending: acc.pending + row.pendingBusinesses,
        }),
        { businesses: 0, notifications: 0, events: 0, places: 0, communities: 0, users: 0, pending: 0 },
      ),
    [stats],
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-slate-900 via-primary-mid to-primary rounded-[2.5rem] p-8 text-white shadow-2xl">
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-white/60 mb-2">
          {lang === 'en' ? 'Province Management' : 'Eyalet Yönetimi'}
        </p>
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-display italic">
          {lang === 'en' ? '10 Provinces Control' : '10 Eyalet Kontrolü'}
        </h3>
        <p className="text-sm text-white/75 font-medium mt-3 max-w-2xl">
          {lang === 'en'
            ? 'View counts per province, filter moderation and content tools, assign regions to users and communities.'
            : 'Eyalet bazında sayıları görün, moderasyon ve içerik araçlarını filtreleyin, kullanıcı ve topluluklara eyalet atayın.'}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { label: lang === 'en' ? 'Businesses' : 'İşletme', value: totals.businesses, icon: Building2 },
            { label: lang === 'en' ? 'Listings' : 'İlan', value: totals.notifications, icon: Megaphone },
            { label: lang === 'en' ? 'Events+Places' : 'Etkinlik+Gezi', value: totals.events + totals.places, icon: Sparkles },
            { label: lang === 'en' ? 'Users' : 'Kullanıcı', value: totals.users, icon: Users },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="bg-white/10 rounded-2xl border border-white/15 p-4">
                <Icon className="text-white/70 mb-2" size={18} />
                <p className="text-2xl font-black">{item.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{item.label}</p>
              </div>
            );
          })}
        </div>
        {onSyncCommunities && (
          <button
            type="button"
            disabled={isSyncing}
            onClick={onSyncCommunities}
            className="mt-6 px-5 py-3 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/90 disabled:opacity-60 transition-all"
          >
            {isSyncing
              ? lang === 'en'
                ? 'Syncing...'
                : 'Senkronize ediliyor...'
              : lang === 'en'
                ? 'Sync All Communities to Firestore'
                : 'Tüm Toplulukları Firestore\'a Senkronize Et'}
          </button>
        )}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {[
                  lang === 'en' ? 'Province' : 'Eyalet',
                  lang === 'en' ? 'Businesses' : 'İşletme',
                  lang === 'en' ? 'Pending' : 'Bekleyen',
                  lang === 'en' ? 'Listings' : 'İlan',
                  lang === 'en' ? 'Events' : 'Etkinlik',
                  lang === 'en' ? 'Places' : 'Gezi',
                  lang === 'en' ? 'Communities' : 'Topluluk',
                  lang === 'en' ? 'Users' : 'Kullanıcı',
                  lang === 'en' ? 'Actions' : 'İşlem',
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.map((row) => {
                const selected = activeFilter === row.region;
                return (
                  <tr
                    key={row.region}
                    className={`border-b border-slate-50 ${selected ? 'bg-primary/5' : 'hover:bg-slate-50/80'}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <AdminRegionBadge region={row.region} lang={lang} />
                        <span className="text-[10px] font-bold text-slate-500">{regionLabel(row.region, lang)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-black text-slate-800">{row.businesses}</td>
                    <td className="px-4 py-3">
                      {row.pendingBusinesses > 0 ? (
                        <span className="text-amber-600 font-black">{row.pendingBusinesses}</span>
                      ) : (
                        <span className="text-slate-300">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-black text-slate-800">{row.notifications}</td>
                    <td className="px-4 py-3 font-black text-slate-800">{row.events}</td>
                    <td className="px-4 py-3 font-black text-slate-800">{row.places}</td>
                    <td className="px-4 py-3 font-black text-slate-800">{row.communities}</td>
                    <td className="px-4 py-3 font-black text-slate-800">{row.users}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => onSelectRegion(row.region)}
                          className="px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wide hover:bg-primary hover:text-white transition-all"
                        >
                          {lang === 'en' ? 'Filter' : 'Filtrele'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectRegion(row.region);
                            onNavigate('moderation');
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-wide hover:bg-slate-200 transition-all"
                        >
                          {lang === 'en' ? 'Moderate' : 'Modere Et'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
