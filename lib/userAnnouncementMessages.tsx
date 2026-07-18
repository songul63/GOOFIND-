import React, { useMemo, useState } from 'react';
import { Inbox, Megaphone, MessageSquare, PenSquare, Send } from 'lucide-react';
import { Notification, NotificationMessage } from '../types';
import { formatChatPreviewText } from './chatImageUtils';

export type UserAnnouncementMessageThread = {
  key: string;
  notifId: string;
  notifTitle: string;
  notifImageUrl?: string;
  partnerId: string;
  partnerName: string;
  lastMessage: string;
  timestamp: number;
  unread: boolean;
};

function buildThreadsForBox(
  messages: NotificationMessage[],
  myUserId: string,
  notifications: Notification[],
  lang: 'en' | 'tr',
  box: 'incoming' | 'outgoing',
  users: { id: string; name?: string }[] = [],
): UserAnnouncementMessageThread[] {
  const notifOwner = new Map(notifications.map((n) => [n.id, n.userId]));
  const userNameById = new Map(users.map((u) => [u.id, u.name]));

  const threads = messages.reduce<Record<string, UserAnnouncementMessageThread>>((acc, msg) => {
    const ownerId = notifOwner.get(msg.notifId);
    if (!ownerId) return acc;

    const isOwnListing = ownerId === myUserId;
    const inIncomingBox = box === 'incoming' && isOwnListing;
    const inOutgoingBox = box === 'outgoing' && !isOwnListing;
    if (!inIncomingBox && !inOutgoingBox) return acc;

    const iAmInvolved = msg.senderId === myUserId || msg.receiverId === myUserId;
    if (!iAmInvolved) return acc;

    const otherId = msg.senderId === myUserId ? msg.receiverId : msg.senderId;
    const key = `${msg.notifId}_${otherId}`;
    const notif = notifications.find((n) => n.id === msg.notifId);
    const partnerName =
      msg.senderId === myUserId
        ? userNameById.get(otherId) || (lang === 'en' ? 'Listing owner' : 'İlan sahibi')
        : msg.senderName || userNameById.get(otherId) || (lang === 'en' ? 'User' : 'Kullanıcı');

    const existing = acc[key];
    const preview = formatChatPreviewText(msg.content, msg.type === 'image' || !!msg.imageUrl, lang);
    const isUnread = msg.receiverId === myUserId && !msg.read;

    if (!existing || msg.timestamp > existing.timestamp) {
      acc[key] = {
        key,
        notifId: msg.notifId,
        notifTitle: notif?.title || (lang === 'en' ? 'Listing' : 'İlan'),
        notifImageUrl: notif?.imageUrl,
        partnerId: otherId,
        partnerName,
        lastMessage: preview,
        timestamp: msg.timestamp,
        unread: isUnread || (existing?.unread ?? false),
      };
    } else if (isUnread) {
      existing.unread = true;
    }

    return acc;
  }, {});

  return Object.values(threads).sort((a, b) => b.timestamp - a.timestamp);
}

export function buildIncomingAnnouncementThreads(
  messages: NotificationMessage[],
  myUserId: string,
  notifications: Notification[],
  lang: 'en' | 'tr',
  users: { id: string; name?: string }[] = [],
): UserAnnouncementMessageThread[] {
  if (!myUserId) return [];
  return buildThreadsForBox(messages, myUserId, notifications, lang, 'incoming', users);
}

export function buildOutgoingAnnouncementThreads(
  messages: NotificationMessage[],
  myUserId: string,
  notifications: Notification[],
  lang: 'en' | 'tr',
  users: { id: string; name?: string }[] = [],
): UserAnnouncementMessageThread[] {
  if (!myUserId) return [];
  return buildThreadsForBox(messages, myUserId, notifications, lang, 'outgoing', users);
}

export function countUnreadIncomingAnnouncementMessages(
  messages: NotificationMessage[],
  myUserId: string,
  notifications: Notification[],
): number {
  const ownNotifIds = new Set(
    notifications.filter((n) => n.userId === myUserId).map((n) => n.id),
  );
  return messages.filter(
    (m) => m.receiverId === myUserId && !m.read && ownNotifIds.has(m.notifId),
  ).length;
}

export function countUnreadAnnouncementMessages(
  messages: NotificationMessage[],
  myUserId: string,
): number {
  if (!myUserId) return 0;
  return messages.filter((m) => m.receiverId === myUserId && !m.read).length;
}

type UserAnnouncementMessagesInboxProps = {
  lang: 'en' | 'tr';
  incomingThreads: UserAnnouncementMessageThread[];
  outgoingThreads: UserAnnouncementMessageThread[];
  activeThreadKey: string | null;
  onOpenThread: (threadKey: string) => void;
  onPostListing?: () => void;
  compact?: boolean;
};

export function UserAnnouncementMessagesInbox({
  lang,
  incomingThreads,
  outgoingThreads,
  activeThreadKey,
  onOpenThread,
  onPostListing,
  compact = false,
}: UserAnnouncementMessagesInboxProps) {
  const [activeBox, setActiveBox] = useState<'incoming' | 'outgoing'>('incoming');
  const threads = activeBox === 'incoming' ? incomingThreads : outgoingThreads;

  const labels = useMemo(
    () => ({
      incoming: lang === 'en' ? 'On My Listings' : 'İlanıma Gelen Mesajlar',
      incomingHint:
        lang === 'en'
          ? 'Replies and questions about your own posts.'
          : 'Kendi ilanınıza gelen tüm mesajlar.',
      outgoing: lang === 'en' ? 'Other Listings' : 'Başka İlanlara Yazdıklarım',
      outgoingHint:
        lang === 'en'
          ? 'Messages you sent on someone else\'s post.'
          : 'Başkalarının ilanlarına yazdığınız mesajlar.',
      emptyIncoming:
        lang === 'en' ? 'No messages on your listings yet.' : 'İlanlarınıza henüz mesaj gelmedi.',
      emptyOutgoing:
        lang === 'en' ? 'You have not messaged any listing yet.' : 'Henüz başka bir ilana mesaj yazmadınız.',
      open: lang === 'en' ? 'Open' : 'Aç',
    }),
    [lang],
  );

  return (
    <div
      className={`rounded-2xl border border-accent/15 bg-gradient-to-br from-accent-soft/50 via-white to-primary-soft/30 overflow-hidden ${
        compact ? 'shadow-sm' : ''
      }`}
    >
      {onPostListing && (
        <div className="p-3 pb-0">
          <button
            type="button"
            onClick={onPostListing}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-md shadow-accent/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <PenSquare size={16} strokeWidth={2.5} />
            {lang === 'en' ? 'Post Listing' : 'İlan Ver'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 p-3">
        <button
          type="button"
          onClick={() => setActiveBox('incoming')}
          className={`rounded-xl p-3 text-left border transition-all active:scale-[0.98] ${
            activeBox === 'incoming'
              ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
              : 'bg-white border-accent/15 hover:border-accent/30'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Inbox size={16} strokeWidth={2.5} className={activeBox === 'incoming' ? 'text-white' : 'text-accent-vivid'} />
            <span
              className={`text-[10px] font-black uppercase tracking-wide ${activeBox === 'incoming' ? 'text-white' : 'text-accent-vivid'}`}
            >
              {labels.incoming}
            </span>
            {incomingThreads.length > 0 && (
              <span
                className={`ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full ${activeBox === 'incoming' ? 'bg-white/20 text-white' : 'bg-accent/10 text-accent-vivid'}`}
              >
                {incomingThreads.length}
              </span>
            )}
          </div>
          <p className={`text-[10px] font-medium leading-snug ${activeBox === 'incoming' ? 'text-white/85' : 'text-slate-500'}`}>
            {labels.incomingHint}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveBox('outgoing')}
          className={`rounded-xl p-3 text-left border transition-all active:scale-[0.98] ${
            activeBox === 'outgoing'
              ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
              : 'bg-white border-primary/15 hover:border-primary/30'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Send size={16} strokeWidth={2.5} className={activeBox === 'outgoing' ? 'text-white' : 'text-primary'} />
            <span
              className={`text-[10px] font-black uppercase tracking-wide ${activeBox === 'outgoing' ? 'text-white' : 'text-primary'}`}
            >
              {labels.outgoing}
            </span>
            {outgoingThreads.length > 0 && (
              <span
                className={`ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full ${activeBox === 'outgoing' ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}
              >
                {outgoingThreads.length}
              </span>
            )}
          </div>
          <p className={`text-[10px] font-medium leading-snug ${activeBox === 'outgoing' ? 'text-white/85' : 'text-slate-500'}`}>
            {labels.outgoingHint}
          </p>
        </button>
      </div>

      <div className={`px-3 ${compact ? 'pb-3' : 'pb-4'}`}>
        <div className="max-h-[280px] overflow-y-auto space-y-2 pr-0.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-accent/25 [&::-webkit-scrollbar-thumb]:rounded-full">
          {threads.length === 0 ? (
            <div className="text-center py-10 px-3 rounded-xl bg-white/70 border border-slate-100">
              <MessageSquare size={22} className="mx-auto text-slate-300 mb-2" />
              <p className="text-[11px] font-bold text-slate-400">
                {activeBox === 'incoming' ? labels.emptyIncoming : labels.emptyOutgoing}
              </p>
            </div>
          ) : (
            threads.map((thread) => (
              <button
                key={thread.key}
                type="button"
                onClick={() => onOpenThread(thread.key)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left active:scale-[0.99] ${
                  activeThreadKey === thread.key
                    ? 'bg-primary/5 border-primary ring-2 ring-primary/10'
                    : 'bg-white border-slate-100 hover:border-accent/25 hover:shadow-sm'
                }`}
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  {thread.notifImageUrl ? (
                    <img src={thread.notifImageUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-accent-vivid">
                      <Megaphone size={18} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight truncate">{thread.notifTitle}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate">{thread.partnerName}</p>
                  <p className="text-[12px] text-slate-500 font-medium line-clamp-1 mt-0.5">{thread.lastMessage}</p>
                </div>
                <div className="shrink-0 text-right flex flex-col items-end gap-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-accent-vivid">{labels.open}</span>
                  <p className="text-[10px] font-bold text-slate-400">
                    {new Date(thread.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {thread.unread && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

type AnnouncementHeaderActionsProps = {
  lang: 'en' | 'tr';
  unreadMessageCount: number;
  hasOwnListings: boolean;
  onPostListing: () => void;
  onOpenMyAds: () => void;
  variant?: 'landing' | 'page';
  canParticipate?: boolean;
  onParticipationBlocked?: () => void;
};

export function AnnouncementHeaderActions({
  lang,
  unreadMessageCount,
  hasOwnListings,
  onPostListing,
  onOpenMyAds,
  variant = 'landing',
  canParticipate = true,
  onParticipationBlocked,
}: AnnouncementHeaderActionsProps) {
  const isLanding = variant === 'landing';

  const postBtnClass = isLanding
    ? 'px-2 sm:px-3 py-1 sm:py-1.5 bg-accent text-white rounded-md font-black text-[9px] sm:text-[10px] uppercase tracking-wide shadow-md shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap flex items-center gap-1 shrink-0'
    : 'px-3 py-1.5 bg-accent text-white rounded-lg font-black text-[10px] sm:text-[11px] uppercase tracking-wide shadow-md shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0';

  const myAdsBtnClass = isLanding
    ? 'px-2 sm:px-3 py-1 sm:py-1.5 bg-primary text-white rounded-md font-black text-[9px] sm:text-[10px] uppercase tracking-wide shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap flex items-center gap-1 shrink-0'
    : 'px-3 py-1.5 bg-primary text-white rounded-lg font-black text-[10px] sm:text-[11px] uppercase tracking-wide shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0';

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
      {!hasOwnListings && (
        <button
          type="button"
          onClick={onPostListing}
          className={`${postBtnClass}${canParticipate ? '' : ' opacity-85'}`}
        >
          <PenSquare size={isLanding ? 12 : 14} strokeWidth={2.5} />
          {lang === 'en' ? 'Post Ad' : 'İlan Ver'}
        </button>
      )}
      {hasOwnListings && (
        <button type="button" onClick={onOpenMyAds} className={myAdsBtnClass}>
          <MessageSquare size={isLanding ? 12 : 14} strokeWidth={2.5} />
          {lang === 'en' ? 'My Ads' : 'İlanlarım'}
          {unreadMessageCount > 0 && (
            <span className="bg-white text-primary text-[8px] font-black px-1 py-px rounded-full min-w-[14px] text-center leading-tight">
              {unreadMessageCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
