import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  ShieldCheck,
  Phone,
  MessageSquare,
  Users,
  MapPin,
  Search,
  Heart,
  Wrench,
  Camera,
  Trash2,
  CheckCircle2,
  Check,
  RotateCw,
  Building2,
  SendHorizontal,
  Link2,
  ChevronDown,
  X,
} from 'lucide-react';
import { Business, Review } from '../types';
import { CompanyMessageThread, CompanyOwnerMessagesHub } from './companyOwnerMessages';
import { BusinessSocialLinksBar, getActiveSocialLinks } from './businessSocialMedia';
import { openGoogleMapsPlace } from './geo';

export function ProfileStarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(1, Math.max(0, rating - star + 1));
        return (
          <div key={star} className="relative shrink-0" style={{ width: size, height: size }}>
            <Star size={size} strokeWidth={2.5} className="text-slate-200 fill-slate-100 absolute inset-0" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} strokeWidth={2.5} className="fill-amber-400 text-amber-500" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ReviewStarInput({
  value,
  onChange,
  size = 30,
  disabled = false,
}: {
  value: number;
  onChange: (rating: number) => void;
  size?: number;
  disabled?: boolean;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => setHover(0)}
      role="group"
      aria-label="Rating"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const active = (hover || value) >= star;
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => onChange(star)}
            onMouseEnter={() => !disabled && setHover(star)}
            className="p-1 rounded-lg transition-transform active:scale-90 disabled:opacity-40"
            aria-label={`${star} stars`}
          >
            <Star
              size={size}
              strokeWidth={2.5}
              className={active ? 'fill-amber-400 text-amber-500' : 'text-slate-200 fill-slate-100'}
            />
          </button>
        );
      })}
    </div>
  );
}

type ProfileUser = {
  id: string;
  name?: string;
  photoUrl?: string;
  email?: string;
};

export type BusinessProfileTemplateProps = {
  business: Business;
  lang: 'en' | 'tr';
  categoryLabel: string;
  activeImage: string;
  onImageChange: (url: string) => void;
  currentUser: ProfileUser | null;
  isOwner: boolean;
  isFavorite: boolean;
  isSubmittingReview: boolean;
  reviewSuccess: boolean;
  reviewImages: string[];
  onReviewImagesChange: (images: string[]) => void;
  onReviewImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitReview: (e: React.FormEvent<HTMLFormElement>) => void;
  reviewFileInputRef: React.RefObject<HTMLInputElement>;
  onCall: () => void;
  onMessage: () => void;
  onFavorite: () => void;
  onEdit: () => void;
  onOpenReviewerProfile: (userId: string, user: ProfileUser) => void;
  dbUsers: ProfileUser[];
  ownerIncomingThreads?: CompanyMessageThread[];
  ownerOutgoingThreads?: CompanyMessageThread[];
  onOpenCompanyThread?: (businessId: string, partnerId: string) => void;
  onOpenImageLightbox?: (images: string[], startIndex: number) => void;
  onLoginRequired?: () => void;
};

export function BusinessProfileTemplate({
  business,
  lang,
  categoryLabel: _categoryLabel,
  activeImage,
  onImageChange,
  currentUser,
  isOwner,
  isFavorite,
  isSubmittingReview,
  reviewSuccess,
  reviewImages,
  onReviewImagesChange,
  onReviewImageUpload,
  onSubmitReview,
  reviewFileInputRef,
  onCall,
  onMessage,
  onFavorite,
  onEdit,
  onOpenReviewerProfile,
  dbUsers,
  ownerIncomingThreads = [],
  ownerOutgoingThreads = [],
  onOpenCompanyThread,
  onOpenImageLightbox,
  onLoginRequired,
}: BusinessProfileTemplateProps) {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [reviewSearchQuery, setReviewSearchQuery] = useState('');
  const [draftRating, setDraftRating] = useState(5);
  const [slideIndex, setSlideIndex] = useState(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const reviewsPanelRef = useRef<HTMLDivElement>(null);
  const reviewCount = business.reviews?.length ?? 0;
  const hasPhone = Boolean(business.phone?.trim());

  const allImages = useMemo(() => {
    const imgs = [business.imageUrl, ...(business.gallery || [])].filter(Boolean);
    return Array.from(new Set(imgs));
  }, [business.imageUrl, business.gallery]);

  const businessOwner = useMemo((): ProfileUser | null => {
    const ownerId = business.ownerId;
    if (!ownerId) return null;
    const fromDb = dbUsers.find((u) => u?.id === ownerId);
    if (fromDb) return fromDb;
    const extended = business as Business & { ownerName?: string; ownerPhoto?: string };
    const name = extended.ownerName || (lang === 'en' ? 'Business Owner' : 'İşletme Sahibi');
    return {
      id: ownerId,
      name,
      photoUrl:
        extended.ownerPhoto ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    };
  }, [business, dbUsers, lang]);

  const currentImage = allImages[slideIndex] || business.imageUrl;
  const hasMultipleImages = allImages.length > 1;

  useEffect(() => {
    const idx = allImages.indexOf(activeImage);
    if (idx >= 0) setSlideIndex(idx);
  }, [activeImage, allImages]);

  const goToSlide = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= allImages.length) return;
      setSlideIndex(idx);
      onImageChange(allImages[idx]);
    },
    [allImages, onImageChange],
  );

  const openLightbox = useCallback(() => {
    if (allImages.length === 0) return;
    onOpenImageLightbox?.(allImages, slideIndex);
  }, [allImages, slideIndex, onOpenImageLightbox]);

  const openReviewsSection = useCallback(() => {
    setReviewsOpen(true);
    requestAnimationFrame(() => {
      reviewsPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const handleReviewFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isOwner) return;
      if (!currentUser) {
        onLoginRequired?.();
        return;
      }
      onSubmitReview(e);
    },
    [currentUser, isOwner, onLoginRequired, onSubmitReview],
  );

  const openOwnerProfile = useCallback(
    (e: React.MouseEvent | React.PointerEvent) => {
      e.stopPropagation();
      if (!businessOwner) return;
      onOpenReviewerProfile(businessOwner.id, businessOwner);
    },
    [businessOwner, onOpenReviewerProfile],
  );

  const handleHeroPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    pointerStart.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleHeroPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const start = pointerStart.current;
      pointerStart.current = null;
      if (!start) return;

      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;

      if (hasMultipleImages && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        if (dx < 0) goToSlide(slideIndex + 1);
        else goToSlide(slideIndex - 1);
        return;
      }

      if (Math.abs(dx) > 14 || Math.abs(dy) > 14) return;

      openLightbox();
    },
    [goToSlide, hasMultipleImages, openLightbox, slideIndex],
  );

  const filteredReviews = useMemo(() => {
    const q = reviewSearchQuery.trim().toLowerCase();
    if (!q) return business.reviews || [];
    return (business.reviews || []).filter(
      (r) =>
        (r.comment || '').toLowerCase().includes(q) ||
        (r.userName || '').toLowerCase().includes(q),
    );
  }, [business.reviews, reviewSearchQuery]);

  const resolveReviewer = (r: Review): ProfileUser =>
    dbUsers.find((u) => u && u.id === r.userId) || {
      id: r.userId,
      name: r.userName || (lang === 'en' ? 'Member' : 'Üye'),
      photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.userName || 'Member')}&background=random`,
    };

  const openAddressInMaps = () => {
    openGoogleMapsPlace({
      address: business.address,
      lat: business.latitude,
      lng: business.longitude,
    });
  };

  return (
    <div className="space-y-0 animate-in fade-in duration-500 -m-4 sm:-m-8">
      {/* Hero — kaydırmalı kapak galerisi */}
      <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden touch-manipulation select-none">
        <div
          className="absolute inset-0 z-0 cursor-zoom-in"
          onPointerDown={handleHeroPointerDown}
          onPointerUp={handleHeroPointerUp}
          onPointerCancel={() => {
            pointerStart.current = null;
          }}
        >
          <img
            src={currentImage}
            className="w-full h-full object-cover no-lightbox pointer-events-none select-none"
            alt={business.name}
            referrerPolicy="no-referrer"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/25 to-transparent pointer-events-none" />
        </div>

        {hasMultipleImages && (
          <p className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 text-[10px] font-black text-white tracking-wider pointer-events-none z-10">
            {slideIndex + 1}/{allImages.length}
          </p>
        )}

        {business.verified && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-emerald-500/90 text-white rounded-full text-[9px] font-black uppercase tracking-widest pointer-events-none">
            <ShieldCheck size={12} strokeWidth={2.5} />
            {lang === 'en' ? 'Verified' : 'Onaylı'}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-5 pointer-events-none">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 max-w-full">
              {!isOwner && businessOwner && (
                <button
                  type="button"
                  onClick={openOwnerProfile}
                  onPointerDown={(e) => e.stopPropagation()}
                  title={lang === 'en' ? 'View owner profile' : 'Sahibin profilini gör'}
                  aria-label={lang === 'en' ? 'View owner profile' : 'Sahibin profilini gör'}
                  className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl overflow-hidden border-2 border-white/90 shadow-lg hover:scale-105 active:scale-95 transition-all -translate-y-px"
                >
                  {businessOwner.photoUrl ? (
                    <img
                      src={businessOwner.photoUrl}
                      className="w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                      alt=""
                    />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center bg-primary text-white text-sm font-black">
                      {(businessOwner.name || '?').charAt(0).toUpperCase()}
                    </span>
                  )}
                </button>
              )}
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight leading-tight font-display italic drop-shadow-md truncate min-w-0 pointer-events-none">
                {business.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openReviewsSection();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="pointer-events-auto inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 hover:bg-white/25 active:scale-[0.98] transition-all"
              aria-expanded={reviewsOpen}
            >
              <span className="text-sm font-black text-amber-300">{business.rating.toFixed(1)}</span>
              <span className="text-[10px] font-bold text-white/75">
                · {reviewCount} {lang === 'en' ? 'reviews' : 'yorum'}
              </span>
              <ChevronDown
                size={16}
                className={`text-white/80 transition-transform ${reviewsOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Yorum paneli — görselden açılır */}
      <AnimatePresence>
        {reviewsOpen && (
          <motion.div
            ref={reviewsPanelRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-slate-100 bg-white"
          >
            <div className="px-4 sm:px-8 py-4 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  {lang === 'en' ? 'Reviews' : 'Yorumlar'}
                </h3>
                <button
                  type="button"
                  onClick={() => setReviewsOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  aria-label={lang === 'en' ? 'Close reviews' : 'Yorumları kapat'}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-4 sm:p-5 bg-primary/5 rounded-2xl border border-primary/15 space-y-4">
                <div>
                  <p className="text-[11px] font-black text-primary uppercase tracking-wider mb-3">
                    {lang === 'en' ? 'Rate this business' : 'Bu işletmeyi değerlendirin'}
                  </p>
                  {isOwner ? (
                    <p className="text-sm font-semibold text-slate-500">
                      {lang === 'en'
                        ? 'You cannot review your own business.'
                        : 'Kendi işletmenize yorum yapamazsınız.'}
                    </p>
                  ) : (
                    <>
                      <ReviewStarInput value={draftRating} onChange={setDraftRating} />
                      <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide">
                        {draftRating}/5{' '}
                        {lang === 'en' ? 'stars selected' : 'yıldız seçildi'}
                      </p>
                    </>
                  )}
                </div>

                {!isOwner && (
                  <form onSubmit={handleReviewFormSubmit} className="space-y-3">
                    <input type="hidden" name="rating" value={draftRating} readOnly />

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase">
                        {lang === 'en' ? 'Photos (optional)' : 'Fotoğraf (isteğe bağlı)'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase">
                          {reviewImages.length} / 3
                        </span>
                        {currentUser && reviewImages.length < 3 && (
                          <button
                            type="button"
                            onClick={() => reviewFileInputRef.current?.click()}
                            className="p-2 bg-white text-primary rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors"
                          >
                            <Camera size={18} />
                          </button>
                        )}
                      </div>
                    </div>

                    {currentUser && (
                      <input
                        type="file"
                        ref={reviewFileInputRef}
                        hidden
                        accept="image/*"
                        onChange={onReviewImageUpload}
                      />
                    )}

                    {reviewImages.length > 0 && (
                      <div className="flex gap-2">
                        {reviewImages.map((img, i) => (
                          <div key={i} className="w-14 h-14 rounded-lg overflow-hidden relative group">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                            <button
                              type="button"
                              onClick={() => onReviewImagesChange(reviewImages.filter((_, idx) => idx !== i))}
                              className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <textarea
                      name="comment"
                      required={Boolean(currentUser)}
                      disabled={!currentUser}
                      placeholder={
                        currentUser
                          ? lang === 'en'
                            ? 'Share your experience with this business...'
                            : 'Bu işletme hakkındaki deneyiminizi paylaşın...'
                          : lang === 'en'
                            ? 'Sign in to write a review...'
                            : 'Yorum yazmak için giriş yapın...'
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-primary min-h-[88px] placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-400"
                    />

                    <AnimatePresence>
                      {reviewSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-emerald-500 text-white p-3 rounded-xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-wider"
                        >
                          <CheckCircle2 size={18} />
                          {lang === 'en' ? 'Review submitted!' : 'Yorum gönderildi!'}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={isSubmittingReview || reviewSuccess}
                      className={`w-full py-3.5 rounded-xl font-black text-[12px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 ${
                        reviewSuccess
                          ? 'bg-slate-100 text-slate-400'
                          : 'bg-primary text-white shadow-lg shadow-primary/20'
                      }`}
                    >
                      {isSubmittingReview ? (
                        <>
                          <RotateCw size={18} className="animate-spin" />
                          {lang === 'en' ? 'Submitting...' : 'Gönderiliyor...'}
                        </>
                      ) : reviewSuccess ? (
                        <>
                          <Check size={18} />
                          {lang === 'en' ? 'Done' : 'Tamam'}
                        </>
                      ) : currentUser ? (
                        <>
                          <SendHorizontal size={16} />
                          {lang === 'en' ? 'Submit Review' : 'Yorumu Gönder'}
                        </>
                      ) : (
                        <>
                          <SendHorizontal size={16} />
                          {lang === 'en' ? 'Sign in to review' : 'Yorum için giriş yap'}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {reviewCount > 3 && (
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={reviewSearchQuery}
                    onChange={(e) => setReviewSearchQuery(e.target.value)}
                    placeholder={lang === 'en' ? 'Search reviews...' : 'Yorumlarda ara...'}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 outline-none focus:border-primary/40"
                  />
                </div>
              )}

              <div className="space-y-3 max-h-[min(50vh,420px)] overflow-y-auto">
                {filteredReviews.length === 0 ? (
                  <p className="text-center py-6 text-[12px] font-black text-slate-300 uppercase tracking-widest">
                    {reviewSearchQuery.trim()
                      ? lang === 'en'
                        ? 'No matching reviews'
                        : 'Eşleşen yorum yok'
                      : lang === 'en'
                        ? 'No reviews yet — be the first!'
                        : 'Henüz yorum yok — ilk siz yazın!'}
                  </p>
                ) : (
                  filteredReviews.map((r) => {
                    const reviewer = resolveReviewer(r);
                    return (
                      <div
                        key={r.id}
                        className="p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <button
                            type="button"
                            onClick={() => onOpenReviewerProfile(reviewer.id, reviewer)}
                            className="flex items-center gap-2 group text-left outline-none"
                          >
                            <div className="w-8 h-8 rounded-xl overflow-hidden bg-primary/10 border border-primary/15 shrink-0">
                              {reviewer.photoUrl ? (
                                <img src={reviewer.photoUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                              ) : (
                                <span className="w-full h-full flex items-center justify-center text-xs font-black text-primary">
                                  {(reviewer.name || 'M').charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-black text-slate-800 group-hover:text-primary uppercase tracking-tight transition-colors">
                              {r.userName}
                            </span>
                          </button>
                          <div className="flex items-center gap-1.5">
                            <ProfileStarRating rating={r.rating} size={11} />
                            <span className="text-[11px] font-black text-amber-600">{r.rating}</span>
                          </div>
                        </div>
                        <p className="text-[14px] font-medium text-slate-600 leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
                        {r.images && r.images.length > 0 && (
                          <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
                            {r.images.map((img, idx) => (
                              <div key={idx} className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-slate-100">
                                <img src={img} className="w-full h-full object-cover" alt="" />
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="text-[10px] font-bold text-slate-300 uppercase mt-2">
                          {new Date(r.date).toLocaleDateString(lang === 'en' ? 'en-CA' : 'tr-TR')}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 sm:px-8 pt-5 pb-8 space-y-5 bg-white">
        {/* Hızlı işlemler */}
        <div className="flex items-center justify-center gap-3">
          {hasPhone && (
            <button
              type="button"
              onClick={onCall}
              className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all"
              title={lang === 'en' ? 'Call' : 'Ara'}
              aria-label={lang === 'en' ? 'Call' : 'Ara'}
            >
              <Phone size={22} strokeWidth={2.5} />
            </button>
          )}
          <button
            type="button"
            onClick={onMessage}
            className="flex flex-col items-center justify-center gap-1 min-w-[88px] px-4 py-3 rounded-2xl bg-accent/8 border border-accent/20 hover:bg-accent/12 transition-all active:scale-95"
          >
            <div className="relative">
              <MessageSquare size={22} className="text-accent-vivid" strokeWidth={2.5} />
              <Users size={11} className="absolute -bottom-1 -right-1.5 text-accent-vivid bg-white rounded-full p-0.5" strokeWidth={2.5} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-accent-vivid text-center leading-tight">
              {isOwner
                ? lang === 'en'
                  ? 'Messages'
                  : 'Mesajlar'
                : lang === 'en'
                  ? 'Message'
                  : 'Mesaj'}
            </span>
          </button>
          <button
            type="button"
            onClick={onFavorite}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all active:scale-95 ${
              isFavorite
                ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                : 'bg-slate-50 border-slate-200 text-primary hover:border-primary/30'
            }`}
            title={lang === 'en' ? 'Save' : 'Kaydet'}
            aria-label={lang === 'en' ? 'Save' : 'Kaydet'}
          >
            <Heart size={22} className={isFavorite ? 'fill-white' : ''} strokeWidth={2.5} />
          </button>
        </div>

        {isOwner && onOpenCompanyThread ? (
          <CompanyOwnerMessagesHub
            lang={lang}
            incomingThreads={ownerIncomingThreads}
            outgoingThreads={ownerOutgoingThreads}
            onOpenThread={onOpenCompanyThread}
          />
        ) : (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-accent-soft via-white to-primary-soft/40 border border-accent/15">
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 shadow-md shadow-accent/20">
              <Users size={20} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-wider text-accent-vivid">
                {lang === 'en' ? 'Messaging via Goofind' : 'Goofind Üzerinden Mesajlaşma'}
              </p>
              <p className="text-[12px] sm:text-[13px] font-medium text-slate-600 mt-1 leading-relaxed">
                {lang === 'en'
                  ? 'Contact the business owner directly through our secure messaging.'
                  : 'İşletme sahibiyle güvenli mesajlaşma üzerinden doğrudan iletişime geçin.'}
              </p>
            </div>
          </div>
        )}

        {/* İşletme bilgileri */}
        <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Building2 size={14} />
            {lang === 'en' ? 'Business Info' : 'İşletme Bilgileri'}
          </h3>

          {business.address?.trim() && (
            <button
              type="button"
              onClick={openAddressInMaps}
              className="w-full flex items-start gap-3 text-left rounded-xl p-2 -m-2 hover:bg-white/80 active:bg-white transition-colors group"
            >
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                <MapPin size={18} strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {lang === 'en' ? 'Address · Open in Maps' : 'Adres · Haritada aç'}
                </p>
                <p className="text-sm font-bold text-slate-800 mt-0.5 group-hover:text-primary transition-colors">
                  {business.address}
                </p>
              </div>
            </button>
          )}

          {getActiveSocialLinks(business.socialLinks).length > 0 && (
            <div className="flex items-start gap-3 pt-1">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                <Link2 size={18} strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {lang === 'en' ? 'Social Media' : 'Sosyal Medya'}
                </p>
                <BusinessSocialLinksBar links={business.socialLinks} lang={lang} className="mt-2" />
              </div>
            </div>
          )}

          {business.description && (
            <div className="pt-2 border-t border-slate-200/80">
              <p className="text-sm font-medium text-slate-600 leading-relaxed italic border-l-2 border-primary/25 pl-3">
                {business.description}
              </p>
            </div>
          )}
        </div>

        {isOwner && (
          <button
            type="button"
            onClick={onEdit}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
          >
            <Wrench size={18} strokeWidth={2.5} />
            {lang === 'en' ? 'Edit Business Profile' : 'İşletme Profilini Düzenle'}
          </button>
        )}
      </div>
    </div>
  );
}
