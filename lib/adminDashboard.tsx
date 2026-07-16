import React, { useMemo, useState } from 'react';
import {
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  LayoutDashboard,
  Megaphone,
  MessageCircle,
  Shield,
  Sparkles,
  Trash2,
  Users,
  Wrench,
} from 'lucide-react';
import { Business, Community, Notification } from '../types';

export type AdminDashboardTab =
  | 'overview'
  | 'support'
  | 'moderation'
  | 'content'
  | 'users'
  | 'communities'
  | 'tools';

export type DeletionRequest = {
  id: string;
  email: string;
  reason?: string;
  deleteOptions?: string[];
  status: 'pending' | 'processed' | 'rejected';
  createdAt?: { seconds?: number } | number;
};

type AdminTabBarProps = {
  lang: 'en' | 'tr';
  activeTab: AdminDashboardTab;
  onChange: (tab: AdminDashboardTab) => void;
  counts: {
    pendingBusinesses: number;
    pendingDeletions: number;
    activeChats: number;
    totalUsers: number;
  };
};

const TAB_CONFIG: { id: AdminDashboardTab; icon: React.ElementType }[] = [
  { id: 'overview', icon: LayoutDashboard },
  { id: 'support', icon: MessageCircle },
  { id: 'moderation', icon: Shield },
  { id: 'content', icon: Megaphone },
  { id: 'users', icon: Users },
  { id: 'communities', icon: Users },
  { id: 'tools', icon: Wrench },
];

export function AdminTabBar({ lang, activeTab, onChange, counts }: AdminTabBarProps) {
  const labels: Record<AdminDashboardTab, { en: string; tr: string }> = {
    overview: { en: 'Overview', tr: 'Genel Bakış' },
    support: { en: 'Support', tr: 'Destek' },
    moderation: { en: 'Moderation', tr: 'Moderasyon' },
    content: { en: 'Content', tr: 'İçerik' },
    users: { en: 'Users', tr: 'Kullanıcılar' },
    communities: { en: 'Communities', tr: 'Topluluklar' },
    tools: { en: 'Store Tools', tr: 'Mağaza Araçları' },
  };

  const badges: Partial<Record<AdminDashboardTab, number>> = {
    support: counts.activeChats,
    moderation: counts.pendingBusinesses,
    users: counts.pendingDeletions,
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-1 px-1">
      {TAB_CONFIG.map(({ id, icon: Icon }) => {
        const active = activeTab === id;
        const badge = badges[id];
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border ${
              active
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                : 'bg-white text-slate-500 border-slate-200 hover:border-primary/30 hover:text-primary'
            }`}
          >
            <Icon size={14} strokeWidth={2.5} />
            {lang === 'en' ? labels[id].en : labels[id].tr}
            {badge != null && badge > 0 && (
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                  active ? 'bg-white/20 text-white' : 'bg-amber-100 text-accent-vivid'
                }`}
              >
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

type AdminOverviewProps = {
  lang: 'en' | 'tr';
  stats: {
    businesses: number;
    pendingBusinesses: number;
    notifications: number;
    events: number;
    places: number;
    flyers: number;
    banners: number;
    communities: number;
    users: number;
    activeChats: number;
    pendingDeletions: number;
  };
  onNavigate: (tab: AdminDashboardTab) => void;
};

export function AdminOverviewPanel({ lang, stats, onNavigate }: AdminOverviewProps) {
  const cards = useMemo(
    () => [
      {
        tab: 'moderation' as const,
        label: lang === 'en' ? 'Businesses' : 'İşletmeler',
        value: stats.businesses,
        hint:
          stats.pendingBusinesses > 0
            ? `${stats.pendingBusinesses} ${lang === 'en' ? 'pending' : 'onay bekliyor'}`
            : lang === 'en'
              ? 'All verified'
              : 'Hepsi onaylı',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        icon: Building2,
      },
      {
        tab: 'moderation' as const,
        label: lang === 'en' ? 'Listings / Ads' : 'İlanlar',
        value: stats.notifications,
        hint: lang === 'en' ? 'Community posts' : 'Topluluk ilanları',
        color: 'text-accent-vivid bg-accent-soft border-accent/20',
        icon: Megaphone,
      },
      {
        tab: 'content' as const,
        label: lang === 'en' ? 'Events & Places' : 'Etkinlik & Gezi',
        value: stats.events + stats.places,
        hint: `${stats.events} + ${stats.places}`,
        color: 'text-primary bg-primary-mid/10 border-primary/15',
        icon: Sparkles,
      },
      {
        tab: 'support' as const,
        label: lang === 'en' ? 'Support Chats' : 'Destek Sohbetleri',
        value: stats.activeChats,
        hint: lang === 'en' ? 'Active threads' : 'Aktif konuşma',
        color: 'text-sky-700 bg-sky-50 border-sky-100',
        icon: MessageCircle,
      },
      {
        tab: 'users' as const,
        label: lang === 'en' ? 'Users' : 'Kullanıcılar',
        value: stats.users,
        hint:
          stats.pendingDeletions > 0
            ? `${stats.pendingDeletions} ${lang === 'en' ? 'deletion requests' : 'silme talebi'}`
            : lang === 'en'
              ? 'Registered'
              : 'Kayıtlı',
        color: 'text-violet-700 bg-violet-50 border-violet-100',
        icon: Users,
      },
      {
        tab: 'communities' as const,
        label: lang === 'en' ? 'Communities' : 'Topluluklar',
        value: stats.communities,
        hint: lang === 'en' ? 'City groups' : 'Şehir grupları',
        color: 'text-rose-700 bg-rose-50 border-rose-100',
        icon: Users,
      },
    ],
    [lang, stats],
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-primary via-primary-mid to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-primary/25 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-white/60 mb-2">
              {lang === 'en' ? 'Goofind Control Center' : 'Goofind Yönetim Merkezi'}
            </p>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-display italic">
              {lang === 'en' ? 'Application Dashboard' : 'Uygulama Kontrol Paneli'}
            </h3>
            <p className="text-sm text-white/75 font-medium mt-3 max-w-xl">
              {lang === 'en'
                ? 'Manage businesses, listings, content, users, communities and support from one place.'
                : 'İşletmeler, ilanlar, içerik, kullanıcılar, topluluklar ve destek mesajlarını tek yerden yönetin.'}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-5 py-4 bg-white/10 rounded-2xl border border-white/15 text-center">
              <BarChart3 className="mx-auto mb-1 text-white/80" size={22} />
              <p className="text-2xl font-black">{stats.flyers + stats.banners}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                {lang === 'en' ? 'Promo Items' : 'Promosyon'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.label}
              type="button"
              onClick={() => onNavigate(card.tab)}
              className={`text-left p-5 rounded-[1.75rem] border shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all ${card.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon size={20} strokeWidth={2.5} />
                <span className="text-2xl font-black">{card.value}</span>
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest">{card.label}</p>
              <p className="text-[10px] font-bold mt-1 opacity-80">{card.hint}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

type AdminAllBusinessesPanelProps = {
  lang: 'en' | 'tr';
  businesses: Business[];
  search: string;
  onSearchChange: (v: string) => void;
  onSelect: (biz: Business) => void;
  onVerify: (id: string) => void;
  onDelete: (id: string, name: string) => void;
};

export function AdminAllBusinessesPanel({
  lang,
  businesses,
  search,
  onSearchChange,
  onSelect,
  onVerify,
  onDelete,
}: AdminAllBusinessesPanelProps) {
  const filtered = businesses.filter(
    (b) =>
      (b.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.category || '').toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-xl text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary">
          {lang === 'en' ? 'All Businesses' : 'Tüm İşletmeler'}
        </h4>
        <span className="text-[11px] font-black uppercase text-slate-400">
          {filtered.length} / {businesses.length}
        </span>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={lang === 'en' ? 'Search businesses...' : 'İşletme ara...'}
        className="w-full mb-4 text-sm font-bold bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:border-primary/30"
      />
      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
        {filtered.length === 0 ? (
          <p className="text-sm text-slate-400 italic text-center py-6">
            {lang === 'en' ? 'No businesses found' : 'İşletme bulunamadı'}
          </p>
        ) : (
          filtered.map((biz) => (
            <div
              key={biz.id}
              className="flex items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all"
            >
              <button type="button" onClick={() => onSelect(biz)} className="min-w-0 flex-1 text-left">
                <p className="text-xs font-black uppercase truncate text-slate-900">{biz.name}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">{biz.category}</p>
              </button>
              <div className="flex items-center gap-1.5 shrink-0">
                {!biz.verified && (
                  <button
                    type="button"
                    onClick={() => onVerify(biz.id)}
                    className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center"
                    title={lang === 'en' ? 'Verify' : 'Onayla'}
                  >
                    <Check size={18} strokeWidth={3} />
                  </button>
                )}
                {biz.verified && (
                  <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    {lang === 'en' ? 'Live' : 'Yayında'}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onDelete(biz.id, biz.name)}
                  className="w-8 h-8 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg flex items-center justify-center"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

type AdminUsersPanelProps = {
  lang: 'en' | 'tr';
  users: { id: string; name?: string; email?: string; lastActive?: number }[];
  deletionRequests: DeletionRequest[];
  search: string;
  onSearchChange: (v: string) => void;
  onProcessDeletion: (id: string, status: 'processed' | 'rejected') => void;
};

export function AdminUsersPanel({
  lang,
  users,
  deletionRequests,
  search,
  onSearchChange,
  onProcessDeletion,
}: AdminUsersPanelProps) {
  const filteredUsers = users.filter(
    (u) =>
      (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(search.toLowerCase()),
  );
  const pending = deletionRequests.filter((r) => r.status === 'pending');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-300">
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-violet-600 mb-4">
          {lang === 'en' ? 'Registered Users' : 'Kayıtlı Kullanıcılar'}
        </h4>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={lang === 'en' ? 'Search by name or email...' : 'İsim veya e-posta ara...'}
          className="w-full mb-4 text-sm font-bold bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:border-violet-200"
        />
        <div className="space-y-2 max-h-[420px] overflow-y-auto custom-scrollbar">
          {filteredUsers.length === 0 ? (
            <p className="text-sm text-slate-400 italic text-center py-8">
              {lang === 'en' ? 'No users loaded' : 'Kullanıcı bulunamadı'}
            </p>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm font-black text-slate-900">{user.name || 'User'}</p>
                <p className="text-xs font-bold text-slate-500 mt-0.5">{user.email || user.id}</p>
                {user.lastActive && (
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">
                    {lang === 'en' ? 'Last active' : 'Son aktif'}:{' '}
                    {new Date(user.lastActive).toLocaleString()}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">
            {lang === 'en' ? 'Account Deletion Requests' : 'Hesap Silme Talepleri'}
          </h4>
          {pending.length > 0 && (
            <span className="text-[10px] font-black uppercase bg-rose-100 text-rose-600 px-2 py-1 rounded-full">
              {pending.length} {lang === 'en' ? 'pending' : 'bekliyor'}
            </span>
          )}
        </div>
        <div className="space-y-3 max-h-[480px] overflow-y-auto custom-scrollbar">
          {deletionRequests.length === 0 ? (
            <p className="text-sm text-slate-400 italic text-center py-8">
              {lang === 'en' ? 'No deletion requests' : 'Silme talebi yok'}
            </p>
          ) : (
            deletionRequests.map((req) => {
              const created =
                typeof req.createdAt === 'number'
                  ? req.createdAt
                  : req.createdAt?.seconds
                    ? req.createdAt.seconds * 1000
                    : null;
              return (
                <div
                  key={req.id}
                  className={`p-4 rounded-2xl border ${
                    req.status === 'pending'
                      ? 'bg-amber-50/50 border-amber-100'
                      : 'bg-slate-50 border-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-black text-slate-900 truncate">{req.email}</p>
                      {req.reason && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{req.reason}</p>
                      )}
                      {req.deleteOptions && req.deleteOptions.length > 0 && (
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">
                          {req.deleteOptions.join(', ')}
                        </p>
                      )}
                      {created && (
                        <p className="text-[10px] text-slate-400 mt-1">
                          {new Date(created).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg shrink-0 ${
                        req.status === 'pending'
                          ? 'bg-amber-100 text-accent-vivid'
                          : req.status === 'processed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  {req.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => onProcessDeletion(req.id, 'processed')}
                        className="flex-1 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors"
                      >
                        {lang === 'en' ? 'Mark Processed' : 'İşlendi'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onProcessDeletion(req.id, 'rejected')}
                        className="flex-1 py-2 bg-slate-200 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-300 transition-colors"
                      >
                        {lang === 'en' ? 'Reject' : 'Reddet'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

type AdminCommunitiesPanelProps = {
  lang: 'en' | 'tr';
  communities: Community[];
};

export function AdminCommunitiesPanel({ lang, communities }: AdminCommunitiesPanelProps) {
  return (
    <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl animate-in fade-in duration-300">
      <h4 className="text-sm font-black uppercase tracking-[0.2em] text-rose-600 mb-6">
        {lang === 'en' ? 'Community' : 'Topluluk'}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {communities.length === 0 ? (
          <p className="text-slate-400 italic col-span-full text-center py-10">
            {lang === 'en' ? 'No communities configured' : 'Topluluk bulunamadı'}
          </p>
        ) : (
          communities.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-rose-100 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-black">
                    {(c.name || '?').charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-900 truncate">{c.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">/{c.slug}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">{c.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400">
                  {c.memberCount || 0} {lang === 'en' ? 'members' : 'üye'}
                </span>
                <CheckCircle2 size={16} className="text-emerald-500" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
