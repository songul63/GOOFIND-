import React, { useMemo, useState } from 'react';
import { Building2, Inbox, MessageSquare, Send } from 'lucide-react';
import { Business, BusinessMessage } from '../types';
import { formatChatPreviewText } from './chatImageUtils';

export type UserCompanyMessageThread = {
  key: string;
  businessId: string;
  businessName: string;
  businessImage?: string;
  partnerId: string;
  partnerName: string;
  lastMessage: string;
  timestamp: number;
};

export function buildUserIncomingCompanyThreads(
  messages: BusinessMessage[],
  myUserId: string,
  businesses: Business[],
  lang: 'en' | 'tr',
): UserCompanyMessageThread[] {
  const threads = messages
    .filter((m) => m.receiverId === myUserId && m.senderId !== myUserId)
    .reduce<Record<string, UserCompanyMessageThread>>((acc, msg) => {
      const biz = businesses.find((b) => b.id === msg.businessId);
      if (!biz) return acc;
      const key = `${msg.businessId}_${msg.senderId}`;
      const existing = acc[key];
      if (!existing || msg.timestamp > existing.timestamp) {
        acc[key] = {
          key,
          businessId: msg.businessId,
          businessName: biz.name,
          businessImage: biz.imageUrl,
          partnerId: msg.senderId,
          partnerName: msg.senderName || biz.name,
          lastMessage: formatChatPreviewText(msg.content, msg.type === 'image' || !!msg.imageUrl, lang),
          timestamp: msg.timestamp,
        };
      }
      return acc;
    }, {});

  return Object.values(threads).sort((a, b) => b.timestamp - a.timestamp);
}

export function buildUserOutgoingCompanyThreads(
  messages: BusinessMessage[],
  myUserId: string,
  businesses: Business[],
  lang: 'en' | 'tr',
): UserCompanyMessageThread[] {
  return buildOutgoingOnly(messages, myUserId, businesses, lang);
}

function buildOutgoingOnly(
  messages: BusinessMessage[],
  myUserId: string,
  businesses: Business[],
  lang: 'en' | 'tr',
): UserCompanyMessageThread[] {
  const threads = messages
    .filter((m) => m.senderId === myUserId)
    .reduce<Record<string, UserCompanyMessageThread>>((acc, msg) => {
      const biz = businesses.find((b) => b.id === msg.businessId);
      if (!biz) return acc;
      const key = `${msg.businessId}_${msg.receiverId}`;
      const existing = acc[key];
      if (!existing || msg.timestamp > existing.timestamp) {
        acc[key] = {
          key,
          businessId: msg.businessId,
          businessName: biz.name,
          businessImage: biz.imageUrl,
          partnerId: msg.receiverId,
          partnerName: biz.name,
          lastMessage: formatChatPreviewText(msg.content, msg.type === 'image' || !!msg.imageUrl, lang),
          timestamp: msg.timestamp,
        };
      }
      return acc;
    }, {});

  return Object.values(threads).sort((a, b) => b.timestamp - a.timestamp);
}

type UserCompanyMessagesInboxProps = {
  lang: 'en' | 'tr';
  incomingThreads: UserCompanyMessageThread[];
  outgoingThreads: UserCompanyMessageThread[];
  onOpenThread: (businessId: string, partnerId: string) => void;
  compact?: boolean;
};

export function UserCompanyMessagesInbox({
  lang,
  incomingThreads,
  outgoingThreads,
  onOpenThread,
  compact = false,
}: UserCompanyMessagesInboxProps) {
  const [activeBox, setActiveBox] = useState<'incoming' | 'outgoing'>('incoming');
  const threads = activeBox === 'incoming' ? incomingThreads : outgoingThreads;

  const labels = useMemo(
    () => ({
      title: lang === 'en' ? 'Company Messages' : 'Şirket Mesajları',
      incoming: lang === 'en' ? 'From Companies' : 'Şirketlerden',
      incomingHint:
        lang === 'en' ? 'Replies and messages from businesses.' : 'İşletmelerden gelen yanıtlar ve mesajlar.',
      outgoing: lang === 'en' ? 'To Companies' : 'Yazdıklarım',
      outgoingHint:
        lang === 'en' ? 'Messages you sent to businesses.' : 'İşletmelere gönderdiğiniz mesajlar.',
      emptyIncoming:
        lang === 'en' ? 'No messages from companies yet.' : 'Henüz şirketten mesaj yok.',
      emptyOutgoing:
        lang === 'en' ? 'You have not messaged any company yet.' : 'Henüz bir işletmeye mesaj göndermediniz.',
      open: lang === 'en' ? 'Open' : 'Aç',
    }),
    [lang],
  );

  return (
    <div
      className={`rounded-2xl border border-primary/15 bg-gradient-to-br from-primary-soft/60 via-white to-accent-soft/40 overflow-hidden ${
        compact ? 'shadow-sm' : ''
      }`}
    >
      <div className={`px-4 border-b border-primary/10 ${compact ? 'py-2.5' : 'pt-4 pb-3'}`}>
        <p className="text-[11px] font-black uppercase tracking-wider text-primary flex items-center gap-2">
          <MessageSquare size={14} strokeWidth={2.5} />
          {labels.title}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3">
        <button
          type="button"
          onClick={() => setActiveBox('incoming')}
          className={`rounded-xl p-3 text-left border transition-all active:scale-[0.98] ${
            activeBox === 'incoming'
              ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
              : 'bg-white border-primary/15 hover:border-primary/30'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Inbox size={16} strokeWidth={2.5} className={activeBox === 'incoming' ? 'text-white' : 'text-primary'} />
            <span className={`text-[10px] font-black uppercase tracking-wide ${activeBox === 'incoming' ? 'text-white' : 'text-primary'}`}>
              {labels.incoming}
            </span>
            {incomingThreads.length > 0 && (
              <span className={`ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full ${activeBox === 'incoming' ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
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
              ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
              : 'bg-white border-accent/15 hover:border-accent/30'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Send size={16} strokeWidth={2.5} className={activeBox === 'outgoing' ? 'text-white' : 'text-accent-vivid'} />
            <span className={`text-[10px] font-black uppercase tracking-wide ${activeBox === 'outgoing' ? 'text-white' : 'text-accent-vivid'}`}>
              {labels.outgoing}
            </span>
            {outgoingThreads.length > 0 && (
              <span className={`ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full ${activeBox === 'outgoing' ? 'bg-white/20 text-white' : 'bg-accent/10 text-accent-vivid'}`}>
                {outgoingThreads.length}
              </span>
            )}
          </div>
          <p className={`text-[10px] font-medium leading-snug ${activeBox === 'outgoing' ? 'text-white/85' : 'text-slate-500'}`}>
            {labels.outgoingHint}
          </p>
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="max-h-[220px] overflow-y-auto space-y-2 pr-0.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-primary/25 [&::-webkit-scrollbar-thumb]:rounded-full">
          {threads.length === 0 ? (
            <div className="text-center py-8 px-3 rounded-xl bg-white/70 border border-slate-100">
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
                onClick={() => onOpenThread(thread.businessId, thread.partnerId)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 hover:border-primary/25 hover:shadow-sm transition-all text-left active:scale-[0.99]"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  {thread.businessImage ? (
                    <img src={thread.businessImage} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary">
                      <Building2 size={18} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight truncate">
                    {thread.businessName}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate">
                    {activeBox === 'incoming' ? thread.partnerName : labels.outgoing}
                  </p>
                  <p className="text-[12px] text-slate-500 font-medium line-clamp-1 mt-0.5">{thread.lastMessage}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-[9px] font-black uppercase tracking-wider text-primary">{labels.open}</span>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                    {new Date(thread.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

type UserCompanyMessagesQuickBoxProps = {
  lang: 'en' | 'tr';
  incomingCount: number;
  outgoingCount: number;
  isOpen: boolean;
  onToggle: () => void;
};

export function UserCompanyMessagesQuickBox({
  lang,
  incomingCount,
  outgoingCount,
  isOpen,
  onToggle,
}: UserCompanyMessagesQuickBoxProps) {
  const total = incomingCount + outgoingCount;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`min-w-[108px] sm:min-w-[128px] px-3 sm:px-4 py-2 rounded-lg border text-left transition-all active:scale-95 shrink-0 ${
        isOpen
          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
          : 'bg-white text-slate-800 border-primary/20 hover:border-primary/40 hover:bg-primary-soft/40'
      }`}
    >
      <div className="flex items-center gap-1.5">
        <MessageSquare size={14} strokeWidth={2.5} className={isOpen ? 'text-white' : 'text-primary'} />
        <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest ${isOpen ? 'text-white' : 'text-primary'}`}>
          {lang === 'en' ? 'Messages' : 'Mesajlar'}
        </span>
        {total > 0 && (
          <span className={`ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full ${isOpen ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
            {total}
          </span>
        )}
      </div>
      <p className={`text-[9px] sm:text-[10px] font-bold mt-1 leading-tight ${isOpen ? 'text-white/80' : 'text-slate-500'}`}>
        {incomingCount} {lang === 'en' ? 'in' : 'gelen'} · {outgoingCount} {lang === 'en' ? 'out' : 'giden'}
      </p>
    </button>
  );
}
