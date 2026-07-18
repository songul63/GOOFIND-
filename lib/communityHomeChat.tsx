import React, { useEffect, useMemo, useRef } from 'react';
import { MessageSquare, MessagesSquare, Send, UserPlus } from 'lucide-react';
import { Community, CommunityMessage } from '../types';
import { formatChatPreviewText } from './chatImageUtils';

type CommunityHeaderActionsProps = {
  lang: 'en' | 'tr';
  isJoined: boolean;
  onJoin: () => void;
  onOpenChat: () => void;
  variant?: 'landing' | 'page';
  participationAllowed?: boolean;
  onParticipationBlocked?: () => void;
};

export function CommunityHeaderActions({
  lang,
  isJoined,
  onJoin,
  onOpenChat,
  variant = 'landing',
  participationAllowed = true,
  onParticipationBlocked,
}: CommunityHeaderActionsProps) {
  const isLanding = variant === 'landing';

  const joinBtnClass = isLanding
    ? 'px-2 sm:px-3 py-1 sm:py-1.5 bg-accent text-white rounded-md font-black text-[9px] sm:text-[10px] uppercase tracking-wide shadow-md shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap flex items-center gap-1 shrink-0'
    : 'px-3 py-1.5 bg-accent text-white rounded-lg font-black text-[10px] sm:text-[11px] uppercase tracking-wide shadow-md shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0';

  const chatBtnClass = isLanding
    ? 'px-2 sm:px-3 py-1 sm:py-1.5 bg-primary text-white rounded-md font-black text-[9px] sm:text-[10px] uppercase tracking-wide shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap flex items-center gap-1 shrink-0'
    : 'px-3 py-1.5 bg-primary text-white rounded-lg font-black text-[10px] sm:text-[11px] uppercase tracking-wide shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0';

  if (isJoined) {
    return (
      <button type="button" onClick={onOpenChat} className={chatBtnClass}>
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-light opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-light" />
        </span>
        <MessageSquare size={isLanding ? 12 : 14} strokeWidth={2.5} />
        {lang === 'en' ? 'Open Chat' : 'Sohbete Git'}
      </button>
    );
  }

  if (!participationAllowed) {
    return (
      <button
        type="button"
        onClick={onParticipationBlocked || onJoin}
        className={`${joinBtnClass} opacity-85`}
      >
        <UserPlus size={isLanding ? 12 : 14} strokeWidth={2.5} />
        {lang === 'en' ? 'Join' : 'Katıl'}
      </button>
    );
  }

  return (
    <button type="button" onClick={onJoin} className={joinBtnClass}>
      <UserPlus size={isLanding ? 12 : 14} strokeWidth={2.5} />
      {lang === 'en' ? 'Join' : 'Katıl'}
    </button>
  );
}

type CommunityHomeChatPanelProps = {
  lang: 'en' | 'tr';
  community: Community;
  messages: CommunityMessage[];
  currentUserId?: string;
  isJoined: boolean;
  isLoggedIn: boolean;
  isPreview?: boolean;
  onOpenFullChat: () => void;
  onJoin: () => void;
  onLogin: () => void;
  onSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  isUploadingImage?: boolean;
  participationAllowed?: boolean;
  onParticipationBlocked?: () => void;
};

export function CommunityHomeChatPanel({
  lang,
  community,
  messages,
  currentUserId,
  isJoined,
  isLoggedIn,
  isPreview = false,
  onOpenFullChat,
  onJoin,
  onLogin,
  onSendMessage,
  isUploadingImage = false,
  participationAllowed = true,
  onParticipationBlocked,
}: CommunityHomeChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const recentMessages = useMemo(() => messages.slice(-8), [messages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [recentMessages.length]);

  const labels = useMemo(
    () => ({
      live: lang === 'en' ? 'Live group chat' : 'Canlı grup sohbeti',
      preview:
        lang === 'en'
          ? `Preview from ${community.name} — join your city to participate`
          : `${community.name} önizlemesi — katılın ve kendi şehrinizde yazın`,
      empty: lang === 'en' ? 'No messages yet. Start the conversation!' : 'Henüz mesaj yok. İlk mesajı sen yaz!',
      readOnly: lang === 'en' ? 'Join to send messages' : 'Mesaj göndermek için katılın',
      readOnlyBrowse:
        lang === 'en'
          ? 'Read-only browse — join only in your home province'
          : 'Salt okunur gezinti — yalnızca ana eyaletinizde katılabilirsiniz',
      login: lang === 'en' ? 'Log in to join' : 'Katılmak için giriş yapın',
      placeholder: lang === 'en' ? 'Write to the group...' : 'Gruba yaz...',
      you: lang === 'en' ? 'You' : 'Siz',
    }),
    [lang, community.name],
  );

  return (
    <div className="mt-4 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary-soft/50 via-white to-accent-soft/30 overflow-hidden shadow-sm">
      {isPreview && !isJoined && (
        <div className="px-3 sm:px-4 py-2 bg-accent-soft/80 border-b border-accent/15">
          <p className="text-[9px] sm:text-[10px] font-black text-accent-vivid uppercase tracking-wide text-center leading-snug">
            {labels.preview}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-b border-primary/10 bg-white/60">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-primary/15 shrink-0">
            {community.imageUrl ? (
              <img src={community.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full bg-primary-soft flex items-center justify-center text-primary">
                <MessagesSquare size={16} />
              </div>
            )}
          </div>
          <div className="min-w-0 text-left">
            <p className="text-[11px] sm:text-xs font-black text-primary uppercase tracking-tight truncate">{community.name}</p>
            <p className="text-[9px] font-bold text-accent-vivid uppercase tracking-widest">{labels.live}</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="max-h-52 sm:max-h-60 overflow-y-auto px-3 sm:px-4 py-3 space-y-2.5 custom-scrollbar">
        {recentMessages.length === 0 ? (
          <div className="py-6 text-center">
            <MessagesSquare className="mx-auto text-slate-200 mb-2" size={28} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels.empty}</p>
          </div>
        ) : (
          recentMessages.map((msg) => {
            const isMe = msg.senderId === currentUserId;
            const preview = formatChatPreviewText(msg.content, msg.type === 'image' || !!msg.imageUrl, lang);
            return (
              <button
                key={msg.id}
                type="button"
                onClick={onOpenFullChat}
                className={`w-full flex items-start gap-2.5 text-left rounded-xl px-2.5 py-2 transition-colors hover:bg-white/80 active:scale-[0.99] ${
                  isMe ? 'bg-primary/5' : 'bg-white/70'
                }`}
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-100 shrink-0 bg-white">
                  <img
                    src={msg.senderPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.senderName || 'U')}&background=random`}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-tight truncate">
                      {isMe ? labels.you : msg.senderName}
                    </p>
                    <span className="text-[9px] font-bold text-slate-400 shrink-0">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-600 font-medium line-clamp-2 leading-snug mt-0.5">{preview}</p>
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="px-3 sm:px-4 py-3 border-t border-primary/10 bg-white/70">
        {!isLoggedIn ? (
          <button
            type="button"
            onClick={onLogin}
            className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors"
          >
            {labels.login}
          </button>
        ) : isJoined ? (
          <form onSubmit={onSendMessage} className="flex items-center gap-2">
            <input
              name="message"
              type="text"
              disabled={isUploadingImage}
              placeholder={labels.placeholder}
              className="flex-1 min-w-0 bg-white border border-slate-100 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-primary transition-colors placeholder:text-slate-300"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isUploadingImage}
              className="p-2.5 bg-primary text-white rounded-xl shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              <Send size={16} strokeWidth={2.5} />
            </button>
          </form>
        ) : !participationAllowed ? (
          <button
            type="button"
            onClick={onParticipationBlocked || onJoin}
            className="w-full py-2.5 rounded-xl bg-amber-50 text-amber-900 font-black text-[10px] uppercase tracking-widest text-center border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            {lang === 'en' ? 'Join' : 'Katıl'}
          </button>
        ) : (
          <button
            type="button"
            onClick={onJoin}
            className="w-full py-2.5 rounded-xl bg-accent text-white font-black text-[10px] uppercase tracking-widest shadow-md shadow-accent/20 hover:bg-accent-dark transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus size={14} strokeWidth={2.5} />
            {labels.readOnly}
          </button>
        )}
      </div>
    </div>
  );
}
