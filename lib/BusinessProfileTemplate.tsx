import React, { useMemo, useState } from 'react';
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
} from 'lucide-react';
import { Business, Review } from '../types';
import { CategoryFlatIcon } from './categoryCards';
import { COMPANY_CATEGORY_STYLES, ALL_CATEGORY_STYLE } from './categoryStyles';
import { CompanyMessageThread, CompanyOwnerMessagesHub } from './companyOwnerMessages';

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
};

export function BusinessProfileTemplate({
  business,
  lang,
  categoryLabel,
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
}: BusinessProfileTemplateProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const categoryStyle = COMPANY_CATEGORY_STYLES[business.category] || ALL_CATEGORY_STYLE;
  const reviewCount = business.reviews?.length ?? 0;
  const heroImage = activeImage || business.imageUrl;

  const filteredReviews = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return business.reviews || [];
    return (business.reviews || []).filter(
      (r) =>
        (r.comment || '').toLowerCase().includes(q) ||
        (r.userName || '').toLowerCase().includes(q),
    );
  }, [business.reviews, searchQuery]);

  const resolveReviewer = (r: Review): ProfileUser =>
    dbUsers.find((u) => u && u.id === r.userId) || {
      id: r.userId,
      name: r.userName || (lang === 'en' ? 'Member' : 'Üye'),
      photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.userName || 'Member')}&background=random`,
    };

  return (
    <div className="space-y-0 animate-in fade-in duration-500 -m-4 sm:-m-8">
      {/* Hero */}
      <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden">
        <img src={heroImage} className="w-full h-full object-cover" alt={business.name} referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/35 to-slate-900/10" />
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 shadow-lg">
            <CategoryFlatIcon style={categoryStyle} size={14} boxSize={26} variant="badge" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-700">
              {categoryLabel}
            </span>
          </div>
          {business.verified && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg">
              <ShieldCheck size={13} strokeWidth={2.5} />
              {lang === 'en' ? 'Verified' : 'Onaylı'}
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="flex items-end gap-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white/80 shadow-xl shrink-0 bg-white">
              <img src={business.imageUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
            </div>
            <div className="min-w-0 flex-1 pb-0.5">
              <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight leading-tight font-display italic truncate drop-shadow-md">
                {business.name}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <ProfileStarRating rating={business.rating} size={13} />
                <span className="text-sm font-black text-amber-400">{business.rating.toFixed(1)}</span>
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
                  · {reviewCount} {lang === 'en' ? 'reviews' : 'yorum'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 pt-5 pb-8 space-y-5 bg-white">
        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onCall}
            className="flex flex-col items-center justify-center gap-1.5 p-3 sm:p-4 rounded-2xl bg-primary/5 border border-primary/15 hover:bg-primary/10 hover:border-primary/25 transition-all active:scale-95 group"
          >
            <Phone size={22} className="text-primary group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary">
              {lang === 'en' ? 'Call' : 'Ara'}
            </span>
          </button>
          <button
            type="button"
            onClick={onMessage}
            className="flex flex-col items-center justify-center gap-1.5 p-3 sm:p-4 rounded-2xl bg-accent/8 border border-accent/20 hover:bg-accent/12 hover:border-accent/35 transition-all active:scale-95 group relative"
          >
            <div className="relative">
              <MessageSquare size={22} className="text-accent-vivid group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <Users size={11} className="absolute -bottom-1 -right-1.5 text-accent-vivid bg-white rounded-full p-0.5" strokeWidth={2.5} />
            </div>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-accent-vivid text-center leading-tight">
              {isOwner
                ? lang === 'en'
                  ? 'Messages'
                  : 'Mesajlar'
                : lang === 'en'
                  ? 'Group Chat'
                  : 'Grup Mesajı'}
            </span>
          </button>
          <button
            type="button"
            onClick={onFavorite}
            className={`flex flex-col items-center justify-center gap-1.5 p-3 sm:p-4 rounded-2xl border transition-all active:scale-95 group ${
              isFavorite
                ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                : 'bg-slate-50 border-slate-200 hover:border-primary/30 hover:bg-primary/5'
            }`}
          >
            <Heart
              size={22}
              className={`group-hover:scale-110 transition-transform ${isFavorite ? 'fill-white' : 'text-primary'}`}
              strokeWidth={2.5}
            />
            <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${isFavorite ? 'text-white' : 'text-slate-600'}`}>
              {lang === 'en' ? 'Save' : 'Kaydet'}
            </span>
          </button>
        </div>

        {/* Owner company inbox / Outbound hub */}
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
                  ? 'Contact the business owner directly through our secure group messaging. Fast, safe, and within the community.'
                  : 'İşletme sahibiyle güvenli grup mesajlaşması üzerinden doğrudan iletişime geçin. Hızlı, güvenli ve topluluk içinde.'}
              </p>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={2.5} />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search reviews & info...' : 'Yorum ve bilgi ara...'}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 outline-none focus:border-primary/40 focus:bg-white transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Rating summary */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="p-3 sm:p-4 rounded-2xl bg-amber-50 border border-amber-100 text-center">
            <p className="text-xl sm:text-2xl font-black text-amber-600 leading-none">{business.rating.toFixed(1)}</p>
            <ProfileStarRating rating={business.rating} size={11} />
            <p className="text-[8px] sm:text-[9px] font-black text-amber-700/70 uppercase tracking-wider mt-1.5">
              {lang === 'en' ? 'Rating' : 'Puan'}
            </p>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-primary-soft border border-primary/10 text-center">
            <p className="text-xl sm:text-2xl font-black text-primary leading-none">{reviewCount}</p>
            <p className="text-[8px] sm:text-[9px] font-black text-primary/70 uppercase tracking-wider mt-2">
              {lang === 'en' ? 'Reviews' : 'Yorum'}
            </p>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center flex flex-col items-center justify-center">
            <ShieldCheck size={22} className={business.verified ? 'text-emerald-600' : 'text-slate-300'} strokeWidth={2.5} />
            <p className="text-[8px] sm:text-[9px] font-black text-emerald-700/70 uppercase tracking-wider mt-1">
              {business.verified ? (lang === 'en' ? 'Verified' : 'Onaylı') : lang === 'en' ? 'Pending' : 'Bekliyor'}
            </p>
          </div>
        </div>

        {/* Contact & about */}
        <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Building2 size={14} />
            {lang === 'en' ? 'Business Info' : 'İşletme Bilgileri'}
          </h3>
          {(!searchQuery.trim() || business.address.toLowerCase().includes(searchQuery.toLowerCase())) && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                <MapPin size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Address' : 'Adres'}</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{business.address}</p>
              </div>
            </div>
          )}
          {(!searchQuery.trim() || business.phone.toLowerCase().includes(searchQuery.toLowerCase())) && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                <Phone size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Phone' : 'Telefon'}</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{business.phone}</p>
              </div>
            </div>
          )}
          {business.description &&
            (!searchQuery.trim() || business.description.toLowerCase().includes(searchQuery.toLowerCase())) && (
              <div className="pt-2 border-t border-slate-200/80">
                <p className="text-sm font-medium text-slate-600 leading-relaxed italic border-l-2 border-primary/25 pl-3">
                  {business.description}
                </p>
              </div>
            )}
        </div>

        {/* Gallery */}
        {business.gallery && business.gallery.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
              {lang === 'en' ? 'Gallery' : 'Galeri'}
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar snap-x">
              {business.gallery.map((url, idx) => (
                <motion.button
                  key={idx}
                  type="button"
                  onClick={() => onImageChange(url)}
                  whileTap={{ scale: 0.97 }}
                  className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden snap-start border-2 transition-all ${
                    heroImage === url ? 'border-primary shadow-lg scale-[1.03]' : 'border-transparent hover:border-slate-300'
                  }`}
                >
                  <img src={url} className="w-full h-full object-cover no-lightbox" alt="" />
                </motion.button>
              ))}
            </div>
          </div>
        )}

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

        {/* Reviews */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
              {lang === 'en' ? 'Customer Reviews' : 'Müşteri Yorumları'}
            </h3>
            {searchQuery.trim() && (
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {filteredReviews.length} / {reviewCount}
              </span>
            )}
          </div>

          {currentUser && (
            <form onSubmit={onSubmitReview} className="p-4 sm:p-5 bg-primary/5 rounded-2xl border border-primary/10 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-black text-primary uppercase tracking-wider">
                    {lang === 'en' ? 'Your rating' : 'Puanınız'}
                  </span>
                  <select
                    name="rating"
                    required
                    className="bg-white border border-primary/20 rounded-lg px-2 py-1.5 text-sm font-black text-slate-900 outline-none"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} {lang === 'en' ? 'Stars' : 'Yıldız'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase">{reviewImages.length} / 3</span>
                  {reviewImages.length < 3 && (
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
              <input type="file" ref={reviewFileInputRef} hidden accept="image/*" onChange={onReviewImageUpload} />
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
                required
                placeholder={lang === 'en' ? 'Share your experience with this business...' : 'Bu işletme hakkındaki deneyiminizi paylaşın...'}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-primary min-h-[88px] placeholder:text-slate-400"
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
                  reviewSuccess ? 'bg-slate-100 text-slate-400' : 'bg-primary text-white shadow-lg shadow-primary/20'
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
                ) : (
                  <>
                    <SendHorizontal size={16} />
                    {lang === 'en' ? 'Submit Review' : 'Yorumu Gönder'}
                  </>
                )}
              </button>
            </form>
          )}

          <div className="space-y-3">
            {filteredReviews.length === 0 ? (
              <p className="text-center py-8 text-[12px] font-black text-slate-300 uppercase tracking-widest">
                {searchQuery.trim()
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
                    className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/10 transition-all"
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
                    <p className="text-[14px] font-medium text-slate-600 leading-relaxed">"{r.comment}"</p>
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
      </div>
    </div>
  );
}
