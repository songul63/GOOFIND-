
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  Search, 
  Grid,
  MapPin, 
  Compass,
  Bus,
  Info,
  Phone, 
  Plus, 
  Star, 
  Bell, 
  Home, 
  Heart,
  ShieldCheck,
  X,
  Globe,
  Clock,
  Tag,
  BadgePercent,
  Scissors,
  Baby,
  Shirt,
  Calculator,
  Truck,
  MessageSquareText,
  ShoppingBasket,
  Tv,
  FileText,
  Plane,
  Camera,
  Sparkles,
  Send,
  Megaphone,
  MessageSquare,
  Stethoscope,
  Scale,
  HardHat,
  Utensils,
  Shield,
  AlertTriangle,
  User,
  Car,
  ChevronRight,
  UserPlus,
  PenSquare,
  Upload,
  CheckCircle2,
  Briefcase,
  LayoutDashboard,
  Trash2,
  Calendar,
  CheckCircle,
  XCircle,
  PlusSquare,
  Image as ImageIcon,
  Edit2,
  Video,
  PlayCircle,
  ChevronLeft,
  RotateCw,
  Wrench,
  Check,
  LogOut,
  Lock,
  Mail,
  LogIn,
  ArrowRight,
  Share2,
  Bookmark,
  Newspaper,
  Printer,
  Users,
  MessageCircle,
  Hash,
  SendHorizontal,
  MessagesSquare,
  Smile,
  ImageIcon as LucideImageIcon,
  ShoppingBag,
  GraduationCap,
  Gavel,
  Construction,
  Gem,
  Cpu,
  Bed,
  Music,
  Monitor,
  Hotel,
  CarFront,
  Package,
  Banknote,
  Trophy,
  Smartphone,
  SprayCan,
  Languages,
  Warehouse,
  Ticket,
  Building2,
  Gift,
  HandHelping,
  HelpCircle,
  Apple,
  Eye,
  EyeOff,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  PhoneCall,
  PhoneOff,
  HeartOff,
  Mic,
  Sun,
  Moon,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Business, 
  Notification, 
  Event, 
  CategoryType, 
  NotificationCategory,
  TravelerRecommendation,
  MediaItem,
  BannerAd,
  ChatMessage,
  BusinessMessage,
  NotificationMessage,
  Community,
  CommunityMessage,
  Flyer,
  FlyerItem
} from './types';
import { Language, translations } from './translations';
import { db, auth, handleFirestoreError } from './lib/firebase';
import { resolveBusinessMediaForSave, DEFAULT_BUSINESS_IMAGE } from './lib/businessImageStorage';
import { compressChatImageFile, buildChatMessagePayload, formatChatPreviewText } from './lib/chatImageUtils';
import {
  ChatMessageBody,
  ChatMessageComposer,
} from './lib/ChatMessageMedia';
import {
  CategoryBadge,
  CategoryFlatIcon,
  CategoryPill,
  CategoryTabBar,
  FeaturedCompaniesCarousel,
  CompanyCategoryFilterBar,
  CompanyCategoriesExplorerPage,
  AnnouncementFeedList,
} from './lib/categoryCards';
import {
  ALL_CATEGORY_STYLE,
  COMPANY_ALL_CATEGORY_STYLE,
  ANNOUNCEMENT_ALL_CATEGORY_STYLE,
  COMPANY_CATEGORY_STYLES,
  ANNOUNCEMENT_CATEGORY_STYLES,
} from './lib/categoryStyles';
import { BusinessProfileTemplate } from './lib/BusinessProfileTemplate';
import { EventsExplorePage, PlacesExplorePage } from './lib/explorePages';
import { BusinessAddressMapPickerLoader } from './lib/BusinessAddressMapPickerLoader';
import type { BusinessLocationValue } from './lib/BusinessAddressMapPicker';
import { getMediaDevices, getNavigator, getPlatform, getUserAgent } from './lib/browserEnv';
import {
  buildOwnerIncomingThreads,
  buildOwnerOutgoingThreads,
} from './lib/companyOwnerMessages';
import {
  buildUserIncomingCompanyThreads,
  buildUserOutgoingCompanyThreads,
  UserCompanyMessagesInbox,
  UserCompanyMessagesQuickBox,
} from './lib/userCompanyMessages';
import {
  AnnouncementHeaderActions,
  buildIncomingAnnouncementThreads,
  buildOutgoingAnnouncementThreads,
  countUnreadAnnouncementMessages,
  UserAnnouncementMessagesInbox,
} from './lib/userAnnouncementMessages';
import { NearbyMapLoader } from './lib/NearbyMapLoader';
import { MapBrandMark } from './lib/mapBrandMark';
import {
  PlaceCategoryFilterBar,
  PlaceCategoryBadge,
  matchesPlaceCategoryFilter,
  resolvePlaceCategory,
  getPlaceCategoryLabel,
} from './lib/placeCategories';
import { PlaceCategory } from './types';
import { Emoji3D } from './lib/icon3d';
import { FONT_DISPLAY_QUOTED } from './lib/typography';
import { dialPhoneNumber, resolveUserPhone } from './lib/phoneCall';
import DeleteAccountPage from './DeleteAccountPage';
import { ScreenshotOptimizerModal } from './ScreenshotOptimizerModal';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc, 
  updateDoc, 
  setDoc,
  doc, 
  getDoc,
  getDocs, 
  writeBatch,
  limit,
  deleteDoc,
  where,
  or,
  arrayUnion
} from 'firebase/firestore';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  reload,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  User as FirebaseUser
} from 'firebase/auth';
import { INITIAL_BUSINESSES, INITIAL_NOTIFICATIONS, INITIAL_EVENTS, INITIAL_BANNERS, INITIAL_CHAT_MESSAGES, INITIAL_COMMUNITIES, INITIAL_FLYERS, INITIAL_PLACES } from './constants';
import { getLatestCanadaTurkishNews, summarizeWebsiteInfo, translatePlaceFields } from './geminiService';

// --- Reusable Components ---
const StyledG = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`inline-block shrink-0 ${className}`}
    style={{ width: '1.2em', height: '1.2em', verticalAlign: 'middle', display: 'inline-block' }}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes bounceBall1 {
        0% {
          transform: translate(90px, -20px) scale(0.3);
          opacity: 0;
        }
        15% {
          transform: translate(40px, -45px) scale(0.9);
          opacity: 1;
        }
        30% {
          transform: translate(16px, -28px) scale(1);
          opacity: 1;
        }
        45% {
          transform: translate(-3px, -44px) scale(0.95);
          opacity: 1;
        }
        60% {
          transform: translate(-18px, -28px) scale(1);
          opacity: 1;
        }
        75% {
          transform: translate(-12px, -15px) scale(0.92);
        }
        90% {
          transform: translate(-3px, 3px) scale(1.08);
        }
        100% {
          transform: translate(0px, 0px) scale(1);
          opacity: 1;
        }
      }
      @keyframes bounceBall2 {
        0% {
          transform: translate(110px, -10px) scale(0.3);
          opacity: 0;
        }
        20% {
          transform: translate(55px, -48px) scale(0.9);
          opacity: 1;
        }
        35% {
          transform: translate(31px, -28px) scale(1);
          opacity: 1;
        }
        50% {
          transform: translate(12px, -44px) scale(0.95);
          opacity: 1;
        }
        65% {
          transform: translate(-3px, -28px) scale(1);
          opacity: 1;
        }
        80% {
          transform: translate(3px, -15px) scale(0.92);
        }
        92% {
          transform: translate(2px, 2px) scale(1.08);
        }
        100% {
          transform: translate(0px, 0px) scale(1);
          opacity: 1;
        }
      }
      .ball-group-1 {
        transform-origin: 57px 52px;
        animation: bounceBall1 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        animation-delay: 0.1s;
        opacity: 0;
      }
      .ball-group-2 {
        transform-origin: 42px 52px;
        animation: bounceBall2 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        animation-delay: 0.35s;
        opacity: 0;
      }
    `}} />
    <defs>
      <filter id="logo-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="1.5" dy="2.8" stdDeviation="2.4" floodColor="#080c18" floodOpacity="0.25" />
      </filter>
      
      {/* Premium Vibrant Orange Gradient for the inside dots */}
      <linearGradient id="peachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF944D" />
        <stop offset="50%" stopColor="#FF4500" />
        <stop offset="100%" stopColor="#E63E00" />
      </linearGradient>

      {/* Premium Vibrant Royal Blue-Slate Brand Gradient */}
      <linearGradient id="blueGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1D4ED8" />
        <stop offset="45%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#93C5FD" />
      </linearGradient>

      {/* Glossy overlay for the spheres */}
      <linearGradient id="glossHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.75" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
    
    {/* 1. Large, Bold, Perfectly Geometric "G" Crescent that forms the outer body */}
    <path
      d="M 70,28 A 31,31 0 1,0 70,72 L 70,52"
      stroke="url(#blueGrad)"
      strokeWidth="11.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      filter="url(#logo-shadow)"
    />

    {/* 2. Bouncing Ball 1: Act as the first part of the crossbar of the G, representing the first "o" */}
    <g className="ball-group-1">
      <circle 
        cx="57" 
        cy="52" 
        r="7.5" 
        fill="url(#peachGrad)" 
        filter="url(#logo-shadow)" 
      />
      {/* 3D Highlight for Ball 1 */}
      <circle 
         cx="54.8" 
         cy="49.8" 
         r="3" 
         fill="url(#glossHighlight)" 
      />
    </g>

    {/* 3. Bouncing Ball 2: Acts as the inner tip of the crossbar of the G, representing the second "o" */}
    <g className="ball-group-2">
      <circle 
        cx="42" 
        cy="52" 
        r="6" 
        fill="url(#peachGrad)" 
        filter="url(#logo-shadow)" 
      />
      {/* 3D Highlight for Ball 2 */}
      <circle 
        cx="40.2" 
        cy="50.2" 
        r="2.4" 
        fill="url(#glossHighlight)" 
      />
    </g>
  </svg>
);

const StarRating = ({ rating, size = 12 }: { rating: number; size?: number }) => {
  return (
    <div className="flex items-center space-x-1">
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
};

const MapNavIcon = ({ active = false }: { active?: boolean }) => (
  <MapBrandMark size={22} active={active} className={active ? 'scale-105' : ''} />
);

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-xl", fullBleed = false, fullscreen = false }: { isOpen: boolean, onClose: () => void, title: string, children?: React.ReactNode, maxWidth?: string, fullBleed?: boolean, fullscreen?: boolean }) => {
  if (!isOpen) return null;
  return (
    <div className={`fixed inset-0 z-[1500] flex ${fullscreen ? 'p-0 items-stretch' : 'items-center justify-center p-4 sm:p-6'}`}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`bg-white w-full ${fullscreen ? 'h-full max-h-none max-w-none rounded-none border-0 shadow-none' : maxWidth} ${!fullscreen ? 'rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] border border-slate-100' : ''} relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col ${fullBleed && !fullscreen ? 'max-h-[92vh]' : ''}`}>
        {!fullBleed && (
          <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50 shrink-0">
            <h3 className="font-black text-base sm:text-xl text-slate-900 uppercase tracking-tighter truncate mr-4">{title}</h3>
            <button onClick={onClose} className="p-1.5 sm:p-2.5 hover:bg-slate-200/50 rounded-xl transition-all group shrink-0">
              <X size={22} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
            </button>
          </div>
        )}
        <div className={fullBleed ? 'flex-1 min-h-0 overflow-hidden' : 'p-4 sm:p-8 overflow-y-auto custom-scrollbar flex-1 max-h-[85vh]'}>
          {children}
        </div>
      </div>
    </div>
  );
};

const LogoIcon = ({ size = 60, className = "" }: { size?: number, className?: string }) => (
  <div className={`relative flex items-center justify-center bg-white border-2 border-slate-100 rounded-xl sm:rounded-2xl shadow-sm overflow-hidden ${className}`} style={{ width: size, height: size }}>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-light/5"></div>
    <StyledG className="relative z-10 w-4/5 h-4/5" />
  </div>
);

const LogoText = ({ size = "text-2xl", className = "", animateOo = true, dark = false }: { size?: string, className?: string, animateOo?: boolean, dark?: boolean }) => {
  const [keepAnimating, setKeepAnimating] = useState(true);

  useEffect(() => {
    if (!animateOo) return;
    const timer = setTimeout(() => {
      setKeepAnimating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [animateOo]);

  const shouldAnimate = animateOo && keepAnimating;

  return (
    <div className={`inline-flex items-center tracking-tight ${size} ${className}`}>
      <StyledG className="mr-[-0.15em] -translate-y-[0.02em]" />
      <span 
        className="font-black leading-none flex items-center"
        style={{ 
          fontFamily: FONT_DISPLAY_QUOTED,
          letterSpacing: '-0.04em'
        }}
      >
        <span className={`${dark ? 'text-white' : 'text-slate-900'} inline-flex items-center select-none`}>
          <motion.span 
            className="inline-block origin-bottom mr-[0.01em]" 
            animate={shouldAnimate ? {
              y: [0, -4, 0.1, -1, 0],
              scaleY: [0.96, 1.04, 0.98, 1, 1],
              scaleX: [1.05, 0.96, 1.02, 1, 1]
            } : {
              y: 0,
              scaleY: 1,
              scaleX: 1
            }}
            transition={shouldAnimate ? {
              duration: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.45, 0.75, 1]
            } : {
              type: "spring",
              stiffness: 60,
              damping: 15
            }}
          >
            o
          </motion.span>
          <motion.span 
            className="inline-block origin-bottom" 
            animate={shouldAnimate ? {
              y: [0, -4, 0.1, -1, 0],
              scaleY: [0.96, 1.04, 0.98, 1, 1],
              scaleX: [1.05, 0.96, 1.02, 1, 1]
            } : {
              y: 0,
              scaleY: 1,
              scaleX: 1
            }}
            transition={shouldAnimate ? {
              duration: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.45, 0.75, 1],
              delay: 0.15
            } : {
              type: "spring",
              stiffness: 60,
              damping: 15
            }}
          >
            o
          </motion.span>
        </span>
        <span className={`${dark ? 'text-white' : 'text-slate-900'} inline-flex items-baseline`}>f<span className="relative inline-flex items-baseline select-none" style={{ width: '0.27em' }}>ı<motion.span
              className="absolute rounded-full"
              style={{
                transformOrigin: 'center',
                top: '-0.14em',
                left: '10%',
                width: '0.24em',
                height: '0.24em',
                background: 'linear-gradient(135deg, #FFA347 0%, #FF6B00 50%, #E85D00 100%)',
                boxShadow: '1px 1.5px 2.5px rgba(8, 12, 24, 0.22)',
                display: 'inline-block'
              }}
              animate={shouldAnimate ? {
                x: ["4.51em", "2.255em", "1.271em", "0.492em", "-0.123em", "0.123em", "0.082em", "0em"],
                y: ["-0.41em", "-1.968em", "-1.148em", "-1.804em", "-1.148em", "-0.615em", "0.082em", "0em"],
                scale: [0.3, 0.9, 1, 0.95, 1, 0.92, 1.08, 1],
                opacity: [0, 1, 1, 1, 1, 1, 1, 1]
              } : {
                x: "0em",
                y: "0em",
                scale: 1,
                opacity: 1
              }}
              transition={shouldAnimate ? {
                duration: 1.8,
                ease: [0.25, 1, 0.5, 1],
                delay: 0.6,
                times: [0, 0.2, 0.35, 0.5, 0.65, 0.8, 0.92, 1]
              } : {
                type: "spring",
                stiffness: 60,
                damping: 15
              }}
            >
              {/* 3D Gloss Highlight */}
              <span 
                className="absolute rounded-full bg-white/80" 
                style={{
                  top: '15%',
                  left: '15%',
                  width: '35%',
                  height: '35%'
                }}
              />
            </motion.span></span>nd</span>
      </span>
    </div>
  );
};

const translateChatMessageContent = (content: string, language: Language): string => {
  if (language !== 'tr') return content;
  if (!content) return '';
  const trimmed = content.trim();
  if (trimmed === 'Welcome to Goofind Chat! How can I help you today?' || 
      trimmed === 'Hello! I am the administrator of Goofind. How can I help you today?' ||
      trimmed === 'Hello! How can I help you today?') {
    return "Merhaba! Bugün size nasıl yardımcı olabilirim?";
  }
  if (trimmed === 'Hello, I want to list my company but I have some questions about the categories.') {
    return "Merhaba, şirketimi listelemek istiyorum ama kategoriler hakkında bazı sorularım var.";
  }
  return content;
};

const parseBoldText = (text: string) => {
  if (!text) return '';
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} className="font-extrabold text-slate-950">{part}</strong>;
    }
    return part;
  });
};

const renderSimpleMarkdown = (text: string) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-4 font-sans text-slate-700">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;

        // Check if list item
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
          const content = trimmed.substring(2);
          return (
            <div key={i} className="flex gap-2 items-start pl-4 select-text">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
              <span className="font-semibold text-slate-600 text-sm leading-relaxed">
                {parseBoldText(content)}
              </span>
            </div>
          );
        }

        // Check if line starts with numbered list
        const matchNumbered = trimmed.match(/^(\d+)\.\s*(.*)$/);
        if (matchNumbered) {
          const num = matchNumbered[1];
          const content = matchNumbered[2];
          return (
            <div key={i} className="flex gap-2 items-start pl-4 select-text">
              <span className="font-black text-xs text-primary shrink-0 mt-0.5">{num}.</span>
              <span className="font-semibold text-slate-600 text-sm leading-relaxed">
                {parseBoldText(content)}
              </span>
            </div>
          );
        }

        // Check if heading
        if (trimmed.startsWith('#')) {
          const match = trimmed.match(/^(#+)\s*(.*)$/);
          if (match) {
            const level = match[1].length;
            const headingText = match[2];
            const sizeClass = level === 1 ? 'text-lg sm:text-xl' : level === 2 ? 'text-base sm:text-lg' : 'text-sm sm:text-base';
            return (
              <h4 key={i} className={`${sizeClass} font-black text-slate-900 tracking-tight mt-6 mb-2 select-text uppercase`}>
                {parseBoldText(headingText)}
              </h4>
            );
          }
        }

        return (
          <p key={i} className="text-sm sm:text-base font-medium leading-relaxed text-slate-600 text-justify select-text">
            {parseBoldText(line)}
          </p>
        );
      })}
    </div>
  );
};

const limitToTwoSentences = (text: string): string => {
  const trimmed = text.trim();
  if (!trimmed) return '';

  const sentences = trimmed.match(/[^.!?…]+[.!?…]+/g);
  if (sentences && sentences.length > 0) {
    return sentences.slice(0, 2).map((s) => s.trim()).join(' ').trim();
  }

  const paragraphs = trimmed.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length >= 2) {
    return paragraphs.slice(0, 2).join(' ').trim();
  }

  return trimmed.length > 180 ? `${trimmed.slice(0, 177).trim()}…` : trimmed;
};

const clampVisualExcerpt = (text: string, maxChars = 110): string => {
  const two = limitToTwoSentences(text);
  if (two.length <= maxChars) return two;
  return two.slice(0, maxChars).replace(/\s+\S*$/, '').trim();
};

const getNewsExcerpt = (desc?: string, content?: string, maxSentences = 2): string => {
  const parts = [content, desc].filter((s) => s && s.trim().length > 0) as string[];
  const raw = parts.join(' ').trim();
  if (!raw) return '';

  const sentences = raw.match(/[^.!?…]+[.!?…]+[\s]*/g);
  if (sentences && sentences.length > 0) {
    return limitToTwoSentences(sentences.slice(0, maxSentences).join(' ').trim());
  }

  return limitToTwoSentences(raw);
};

const generateNewsHeroSentences = (title: string, desc: string | undefined, language: 'tr' | 'en'): string[] => {
  const tLower = `${title} ${desc || ''}`.toLowerCase();

  if (language === 'tr') {
    if (tLower.includes('air') || tLower.includes('fly') || tLower.includes('uçuş') || tLower.includes('bilet') || tLower.includes('thy') || tLower.includes('pegasus') || tLower.includes('airlines') || tLower.includes('seyahat')) {
      return [
        'Kanada-Türkiye uçuş bağlantıları gurbetteki aileler için büyük önem taşır.',
        'Havayolları dönemsel kampanya ve erken rezervasyon fırsatları sunuyor.',
      ];
    }
    if (tLower.includes('market') || tLower.includes('gıda') || tLower.includes('grocery') || tLower.includes('taze') || tLower.includes('lezzet') || tLower.includes('istanbul') || tLower.includes('baklava') || tLower.includes('kasap') || tLower.includes('yemek') || tLower.includes('restoran')) {
      return [
        'Kanada\'daki Türk marketleri memleket lezzetlerini sofralarımıza taşır.',
        'Taze ürünler ve özel indirimler topluluğumuz için önemli fırsatlar sunuyor.',
      ];
    }
    if (tLower.includes('estate') || tLower.includes('emlak') || tLower.includes('ev') || tLower.includes('konut') || tLower.includes('kiralık') || tLower.includes('satılık') || tLower.includes('yatırım') || tLower.includes('housing') || tLower.includes('realty')) {
      return [
        'Kanada emlak piyasasında doğru bilgiyle hareket etmek çok önemlidir.',
        'Kiralama ve satın alma süreçlerinde güncel fırsatlar takip edilmelidir.',
      ];
    }
    if (tLower.includes('immig') || tLower.includes('göç') || tLower.includes('visa') || tLower.includes('vize') || tLower.includes('law') || tLower.includes('hukuk') || tLower.includes('legal')) {
      return [
        'Kanada göçmenlik ve vize gelişmeleri Türk toplumu için yakından takip ediliyor.',
        'Yeni planlar ve başvuru koşulları doğrudan etkiliyor.',
      ];
    }
    if (tLower.includes('festival') || tLower.includes('etkinlik') || tLower.includes('event') || tLower.includes('konser') || tLower.includes('kültür')) {
      return [
        'Kanada\'daki Türk toplumu etkinliklerle kültürel bağlarını güçlendiriyor.',
        'Konserler ve festivaller her yaştan katılımcıya açık.',
      ];
    }
    return [
      desc?.trim() || 'Kanada\'daki Türk toplumuna yönelik güncel duyurular burada paylaşılıyor.',
      'Yerel işletmeler ve kampanyalar Goofind üzerinden takip edilebilir.',
    ];
  }

  if (tLower.includes('air') || tLower.includes('fly') || tLower.includes('ticket') || tLower.includes('travel') || tLower.includes('thy') || tLower.includes('airline')) {
    return [
      'Flight connections between Canada and Turkiye remain essential for families across our community.',
      'Airlines regularly offer seasonal deals and early-booking discounts on popular routes.',
    ];
  }
  if (tLower.includes('market') || tLower.includes('food') || tLower.includes('grocery') || tLower.includes('baklava') || tLower.includes('istanbul') || tLower.includes('restaurant')) {
    return [
      'Turkish markets and restaurants across Canada bring familiar flavors closer to home.',
      'Fresh products, halal options, and weekly specials create valuable opportunities for our community.',
    ];
  }
  if (tLower.includes('real estate') || tLower.includes('housing') || tLower.includes('property') || tLower.includes('rent') || tLower.includes('investment')) {
    return [
      'Staying informed in Canada\'s housing market is a key step toward settling in with confidence.',
      'Rental, purchase, and mortgage updates can directly affect your next move.',
    ];
  }
  if (tLower.includes('immig') || tLower.includes('visa') || tLower.includes('law') || tLower.includes('legal')) {
    return [
      'Immigration and visa updates in Canada are closely followed by the Turkish community.',
      'New policies, application rules, and official announcements can change quickly.',
    ];
  }
  return [
    desc?.trim() || 'Latest announcements and opportunities for the Turkish community in Canada are shared here.',
    'Local businesses, campaigns, and community updates are easy to follow on Goofind.',
  ];
};

const getNewsHeroExcerpt = (
  title: string,
  desc?: string,
  content?: string,
  language: 'tr' | 'en' = 'tr'
): string => {
  const fromFields = getNewsExcerpt(desc, content, 2);
  const titleNorm = title.trim().toLowerCase();

  if (fromFields && fromFields.toLowerCase() !== titleNorm) {
    return clampVisualExcerpt(fromFields);
  }

  return clampVisualExcerpt(generateNewsHeroSentences(title, desc, language).join(' '));
};

const getBannerImageUrl = (title: string, desc: string = ''): string => {
  const text = `${title} ${desc}`.toLowerCase();
  
  if (text.includes('earthquake') || text.includes('deprem') || text.includes('yardım') || text.includes('afet') || text.includes('aid') || text.includes('relief') || text.includes('halk') || text.includes('sarsıntı')) {
    // Earthquake / humanitarian aid or community support
    return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80';
  }
  if (text.includes('air') || text.includes('fly') || text.includes('uçuş') || text.includes('bilet') || text.includes('thy') || text.includes('airlines') || text.includes('pegasus') || text.includes('travel') || text.includes('seyahat') || text.includes('ticket') || text.includes('uçak')) {
    // Flight / travel
    return 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&w=1200&q=80';
  }
  if (text.includes('market') || text.includes('gıda') || text.includes('grocery') || text.includes('taze') || text.includes('lezzet') || text.includes('istanbul') || text.includes('baklava') || text.includes('kasap') || text.includes('kebap') || text.includes('pide') || text.includes('food') || text.includes('restaurant') || text.includes('yemek') || text.includes('restoran')) {
    // Grocery / Turkish food
    return 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80';
  }
  if (text.includes('estate') || text.includes('emlak') || text.includes('ev') || text.includes('konut') || text.includes('kiralık') || text.includes('satılık') || text.includes('yatırım') || text.includes('housing') || text.includes('realty') || text.includes('broker') || text.includes('daire') || text.includes('condo') || text.includes('apartment')) {
    // Real estate
    return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80';
  }
  if (text.includes('law') || text.includes('avukat') || text.includes('hukuk') || text.includes('legal') || text.includes('göçmenlik') || text.includes('visa') || text.includes('vize') || text.includes('danışmanlık') || text.includes('court') || text.includes('noter') || text.includes('notary') || text.includes('solicitor')) {
    // Legal / Immigration
    return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80';
  }
  if (text.includes('finans') || text.includes('money') || text.includes('tax') || text.includes('muhasebe') || text.includes('maliye') || text.includes('parasal') || text.includes('accounting') || text.includes('kredi') || text.includes('loan')) {
    // Accounting / Finance
    return 'https://images.unsplash.com/photo-1554224155-169641357599?auto=format&fit=crop&w=1200&q=80';
  }
  if (text.includes('festival') || text.includes('etkinlik') || text.includes('event') || text.includes('konser') || text.includes('gathering') || text.includes('müzik') || text.includes('kültür') || text.includes('culture') || text.includes('toplantı')) {
    // Festival / Events
    return 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80';
  }
  if (text.includes('barber') || text.includes('berber') || text.includes('saç') || text.includes('kesim') || text.includes('kuaför') || text.includes('tıraş') || text.includes('güzellik') || text.includes('salon')) {
    // Barber / beauty
    return 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80';
  }

  // Fallback beautiful Canada/Turkish community ambient background
  return 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1200&q=80';
};

// --- HIGH DEFINITION 1280x720 CANVAS VIDEO RENDERER FOR REAL WEB EXPORT ---
const drawVideoFrameOnCanvas = (ctx: CanvasRenderingContext2D, time: number, w: number, h: number, currentLang: string) => {
  // 1. Draw professional dark material gradient background
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#090d16');
  grad.addColorStop(0.5, '#0f172a');
  grad.addColorStop(1, '#020617');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle background grid Lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  const gridSize = 80;
  for (let x = 0; x < w; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Draw ambient center light glow
  const centerGlow = ctx.createRadialGradient(w/2, h/2, 50, w/2, h/2, h*0.6);
  centerGlow.addColorStop(0, 'rgba(16, 185, 129, 0.12)'); // emerald-500
  centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = centerGlow;
  ctx.fillRect(0, 0, w, h);

  // Scene triggers based on a 15-second high-impact clip
  let scene = 1;
  if (time < 3) scene = 1;      // Scene 1 (0s - 3s)
  else if (time < 6) scene = 2; // Scene 2 (3s - 6s)
  else if (time < 9) scene = 3; // Scene 3 (6s - 9s)
  else if (time < 12) scene = 4;// Scene 4 (9s - 12s)
  else scene = 5;               // Scene 5 (12s - 15s)

  if (scene === 1) {
    // SCENE 1: Welcome Splash
    ctx.font = '85px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍁 🌙', w/2, h/2 - 130);

    ctx.font = 'italic 900 85px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
    ctx.shadowBlur = 30;
    ctx.fillText('GOOFIND', w/2, h/2 - 15);
    ctx.shadowBlur = 0;

    ctx.font = 'bold 26px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = '#10b981';
    const txt1 = currentLang === 'en' ? 'CANADA-TURKISH COMMUNITY HUB' : 'KANADA’DAKİ EN PARLAK TÜRK TOPLULUĞU';
    ctx.fillText(txt1, w/2, h/2 + 65);

    ctx.font = '500 19px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    const txt2 = currentLang === 'en' ? 'The all-in-one directory & community workspace' : 'Kanada’da ihtiyacınız olan her şey tek bir platformda';
    ctx.fillText(txt2, w/2, h/2 + 115);

  } else if (scene === 2) {
    // SCENE 2: Business & Experts Directories
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '70px Arial';
    ctx.fillText('🏪 🩺 ⚖️ 🍽️', w/2, h/2 - 165);

    ctx.font = 'bold 40px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText(currentLang === 'en' ? 'LOCAL BUSINESS DIRECTORY & EXTRAL' : 'GÜVENİLİR ESNAF VE UZMAN REHBERİ', w/2, h/2 - 85);

    // Business Cards
    const cardYStart = h/2 - 15;
    const cards = [
      { name: currentLang === 'en' ? '📍 Kebap & Turkish Dining Restaurant' : '📍 Kebap & Geleneksel Türk Lezzetleri', score: '★ 4.9', desc: currentLang === 'en' ? 'Authentic Turkish food, live events, book online' : 'Kanada genelindeki seçkin lezzet durakları, online rezervasyon' },
      { name: currentLang === 'en' ? '👨‍⚖️ Immigration Lawyers & Consultants' : '👨‍⚖️ Göçmenlik Avukatları ve Uzman Danışmanlar', score: '★ 5.0', desc: currentLang === 'en' ? 'Government registered immigration & visa services' : 'Federal onaylı vize ve göçmenlik danışmanlığı' }
    ];

    cards.forEach((card, idx) => {
      const cy = cardYStart + (idx * 115);
      // Card Box shadow/border
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.lineWidth = 2.5;

      const rx = w/2 - 380;
      const ry = cy;
      const rw = 760;
      const rh = 92;
      const radius = 16;
      ctx.beginPath();
      ctx.moveTo(rx + radius, ry);
      ctx.lineTo(rx + rw - radius, ry);
      ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + radius);
      ctx.lineTo(rx + rw, ry + rh - radius);
      ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - radius, ry + rh);
      ctx.lineTo(rx + radius, ry + rh);
      ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - radius);
      ctx.lineTo(rx, ry + radius);
      ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Card Details
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(card.name, rx + 25, cy + 32);

      ctx.fillStyle = '#fbbf24';
      ctx.textAlign = 'right';
      ctx.fillText(card.score, rx + rw - 25, cy + 32);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(card.desc, rx + 25, cy + 62);
    });

  } else if (scene === 3) {
    // SCENE 3: Flyers, Catalogues & active help assistance
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '70px Arial';
    ctx.fillText('📰 🎫 💬', w/2, h/2 - 165);

    ctx.font = 'bold 40px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(currentLang === 'en' ? 'WEEKLY FLYERS, DEALS & EVENTS' : 'AKTÜEL BROŞÜRLER, FIRSATLAR VE ETKİNLİKLER', w/2, h/2 - 85);

    // Dynamic Columns layouts
    const cols = [
      { title: currentLang === 'en' ? 'Weekly General Flyers' : 'Haftalık Market Broşürleri', val: currentLang === 'en' ? 'Best Turkish Grocery Flyers' : 'Tüm Türk marketlerinin güncel fiyat listeleri', sub: 'SAVE UP TO 35% MONTHLY' },
      { title: currentLang === 'en' ? 'Interactive AI Help Bot' : 'Yapay Zeka Destekli Canlı Asistan', val: currentLang === 'en' ? 'Ask community questions instantly' : '7/24 rehberlik, anlık soru sorma ve cevaplar', sub: 'REAL-TIME ASSISTANT' }
    ];

    cols.forEach((col, idx) => {
      const cx = idx === 0 ? w/2 - 380 : w/2 + 20;
      const cy = h/2 - 15;
      const cw = 360;
      const ch = 195;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = idx === 0 ? 'rgba(251, 191, 36, 0.4)' : 'rgba(16, 185, 129, 0.4)';
      ctx.lineWidth = 2.5;

      const radius = 18;
      ctx.beginPath();
      ctx.moveTo(cx + radius, cy);
      ctx.lineTo(cx + cw - radius, cy);
      ctx.quadraticCurveTo(cx + cw, cy, cx + cw, cy + radius);
      ctx.lineTo(cx + cw, cy + ch - radius);
      ctx.quadraticCurveTo(cx + cw, cy + ch, cx + cw - radius, cy + ch);
      ctx.lineTo(cx + radius, cy + ch);
      ctx.quadraticCurveTo(cx, cy + ch, cx, cy + ch - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.quadraticCurveTo(cx, cy, cx + radius, cy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = idx === 0 ? '#fbbf24' : '#34d399';
      ctx.font = 'bold 22px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(col.title, cx + cw/2, cy + 42);

      ctx.fillStyle = '#ffffff';
      ctx.font = '16px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(col.val, cx + cw/2, cy + 100);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.54)';
      ctx.font = 'bold 14px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(col.sub, cx + cw/2, cy + 152);
    });

  } else if (scene === 4) {
    // SCENE 4: Beautiful Canadian Travel, Immigration, and workspace Summaries
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '70px Arial';
    ctx.fillText('🏔️ 🌅 🚌', w/2, h/2 - 165);

    ctx.font = 'bold 40px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = '#60a5fa';
    ctx.fillText(currentLang === 'en' ? 'CANADIAN TRAVEL & LOCAL LIVING' : 'KANADA GEZİ REHBERİ, HABERLER VE GÖÇMENLİK', w/2, h/2 - 85);

    // Summary Box
    const rx = w/2 - 380;
    const ry = h/2 - 15;
    const rw = 760;
    const rh = 180;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
    ctx.lineWidth = 2.5;

    const radius = 18;
    ctx.beginPath();
    ctx.moveTo(rx + radius, ry);
    ctx.lineTo(rx + rw - radius, ry);
    ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + radius);
    ctx.lineTo(rx + rw, ry + rh - radius);
    ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - radius, ry + rh);
    ctx.lineTo(rx + radius, ry + rh);
    ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - radius);
    ctx.lineTo(rx, ry + radius);
    ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 19.5px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(currentLang === 'en' ? '🌲 Exclusive Travel Tips: Explore gorgeous parks and routes' : '🌲 Gezilecek Harikalar: Görülmesi gereken eşsiz doğa ve yol rotaları', rx + 35, ry + 44);
    ctx.fillText(currentLang === 'en' ? '📰 Verified Local Laws & Regulations: Clear structured summaries' : '📰 Göçmenlik & Yaşam Haberleri: İş dünyası ve yasal güncellemeler', rx + 35, ry + 94);
    ctx.fillText(currentLang === 'en' ? '🎫 Active events from Toronto, Ottawa, Vancouver to Calgary' : '🎫 Aktif Topluluk Bülteni: Kültürel festivaller, piknikler ve konserler', rx + 35, ry + 140);

  } else {
    // SCENE 5: Outro Splash
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Simulated beautiful white squircle App Logo Icon on Canvas
    const lx = w/2 - 45;
    const ly = h/2 - 195;
    const lw = 90;
    const lh = 90;
    ctx.fillStyle = '#ffffff';
    const rad = 24;
    ctx.beginPath();
    ctx.moveTo(lx + rad, ly);
    ctx.lineTo(lx + lw - rad, ly);
    ctx.quadraticCurveTo(lx + lw, ly, lx + lw, ly + rad);
    ctx.lineTo(lx + lw, ly + lh - rad);
    ctx.quadraticCurveTo(lx + lw, ly + lh, lx + lw - rad, ly + lh);
    ctx.lineTo(lx + rad, ly + lh);
    ctx.quadraticCurveTo(lx, ly + lh, lx, ly + lh - rad);
    ctx.lineTo(lx, ly + rad);
    ctx.quadraticCurveTo(lx, ly, lx + rad, ly);
    ctx.closePath();
    ctx.fill();

    // Elegant G inside
    ctx.font = '800 62px Georgia, serif';
    ctx.fillStyle = '#10b981';
    ctx.fillText('G', w/2, h/2 - 150);

    // Title
    ctx.font = '900 48px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('GOOFIND', w/2, h/2 - 35);

    // Subtitle
    ctx.font = '600 21px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(currentLang === 'en' ? 'Your Canadian Journey Starts Here' : 'Kanada’daki Yeni Dijital Eviniz ve Sosyal Ağınız', w/2, h/2 + 15);

    // Download CTAs look
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2.5;

    const b1x = w/2 - 220;
    const b2x = w/2 + 15;
    const by = h/2 + 60;
    const bw = 205;
    const bh = 56;
    const brad = 12;

    [b1x, b2x].forEach((bx, idx) => {
      ctx.beginPath();
      ctx.moveTo(bx + brad, by);
      ctx.lineTo(bx + bw - brad, by);
      ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + brad);
      ctx.lineTo(bx + bw, by + bh - brad);
      ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - brad, by + bh);
      ctx.lineTo(bx + brad, by + bh);
      ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - brad);
      ctx.lineTo(bx, by + brad);
      ctx.quadraticCurveTo(bx, by, bx + brad, by);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(idx === 0 ? 'GET IT ON Google Play' : 'Download on App Store', bx + bw/2, by + bh/2);
    });
  }

  // Draw elegant brand thin border framing the video
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, w - 14, h - 14);

  // Subtitle/Voiceover Banner
  ctx.fillStyle = 'rgba(5, 7, 12, 0.9)';
  ctx.fillRect(0, h - 105, w, 105);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, h - 105);
  ctx.lineTo(w, h - 105);
  ctx.stroke();

  // Draw Voiceover Text Subtitle centeralized
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fcd34d'; // Amber deep yellow
  ctx.font = 'extrabold 22px "Plus Jakarta Sans", system-ui, sans-serif';

  let currentSubtitle = '';
  if (scene === 1) {
    currentSubtitle = currentLang === 'en' 
      ? '“Welcome to Goofind, the ultimate community hub and directory for Canadian-Turkish life!”' 
      : '“Kanada’daki Türk toplumunun buluşma noktası ve en geniş kapsamlı rehberi Goofind’a hoş geldiniz!”';
  } else if (scene === 2) {
    currentSubtitle = currentLang === 'en' 
      ? '“Easily find verified local Turkish-owned businesses, doctors, lawyers, and specialists right in your city!”' 
      : '“Şehrinizdeki onaylı Türk işletmelerine, uzmanlara, Türk doktor ve avukatlara saniyeler içinde ulaşın.”';
  } else if (scene === 3) {
    currentSubtitle = currentLang === 'en' 
      ? '“Browse weekly flyers, track hot deals, keep up with community events, and chat in real-time with helpful support!”' 
      : '“Haftalık market broşürlerini inceleyin, en sıcak indirimleri takip edin ve topluluk asistanıyla canlı sohbet edin!”';
  } else if (scene === 4) {
    currentSubtitle = currentLang === 'en' 
      ? '“Discover breath-taking Canadian landscapes with customized travel tips and get verified immigration and local workspace news instantly.”' 
      : '“Kanada’nın görülmesi gereken harikalarını ulaşım ipuçlarıyla keşfedin, en güncel göçmenlik ve yaşam haberlerine anında ulaşın.”';
  } else {
    currentSubtitle = currentLang === 'en' 
      ? '“Your Canadian journey starts here. Download Goofind on Google Play today!”' 
      : '“Kanada’daki yolculuğunuz burada başlıyor. Goofind’ı hemen bugün Google Play’den indirin!”';
  }

  // Draw subtitles
  ctx.fillText(currentSubtitle, w/2, h - 52);
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('goofind_language');
      return (saved === 'en' || saved === 'tr') ? saved : 'tr';
    } catch {
      return 'tr';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('goofind_language', lang);
    } catch (e) {
      console.warn('Failed to save language to localStorage:', e);
    }
  }, [lang]);
  const [isApple, setIsApple] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState('07:15');
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Europe/Istanbul',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        const formatted = formatter.format(now);
        setTimeStr(formatted);
        const istanbulHour = parseInt(formatted.split(':')[0], 10);
        setIsNight(istanbulHour < 6 || istanbulHour >= 19);
      } catch {
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        setTimeStr(`${h}:${m}`);
        setIsNight(now.getHours() < 6 || now.getHours() >= 19);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const nav = getNavigator();
    if (!nav) return;
    const ua = getUserAgent();
    const platform = getPlatform();
    const checkApple = /iPhone|iPad|iPod|Macintosh|MacIntel|MacPPC|Mac68K/i.test(ua) || 
                       /iPhone|iPad|iPod|Mac/i.test(platform);
    setIsApple(checkApple);
  }, []);

  useEffect(() => {
    const handleQuota = () => {
      setIsQuotaExceeded(true);
      setBusinesses(prev => prev.length === 0 ? INITIAL_BUSINESSES : prev);
      setFlyers(prev => prev.length === 0 ? INITIAL_FLYERS : prev);
      setNotifications(prev => prev.length === 0 ? INITIAL_NOTIFICATIONS : prev);
      setEvents(prev => prev.length === 0 ? INITIAL_EVENTS : prev);
      setBanners(prev => prev.length === 0 ? INITIAL_BANNERS : prev);
      setChatMessages(prev => prev.length === 0 ? INITIAL_CHAT_MESSAGES : prev);
      setCommunities(prev => prev.length === 0 ? INITIAL_COMMUNITIES : prev);
      setPlaces(prev => prev.length === 0 ? INITIAL_PLACES : prev);
    };
    window.addEventListener('firestore-quota-exceeded', handleQuota);
    return () => window.removeEventListener('firestore-quota-exceeded', handleQuota);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All' | 'Landing' | 'Admin' | 'Announcements'>('Landing');
  const [homeNavSection, setHomeNavSection] = useState<'home' | 'events' | 'places'>('home');

  useEffect(() => {
    if (selectedCategory === 'Admin') {
      setLang('tr');
    }
  }, [selectedCategory]);

  const [selectedNotificationCategory, setSelectedNotificationCategory] = useState<NotificationCategory | 'All'>('All');
  const [selectedNotificationCategoriesMulti, setSelectedNotificationCategoriesMulti] = useState<NotificationCategory[]>([]);
  const [selectedCompanyCategory, setSelectedCompanyCategory] = useState<CategoryType | 'All'>('All');
  const [isNearbyMapOpen, setIsNearbyMapOpen] = useState(false);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  const [isQuotaBannerDismissed, setIsQuotaBannerDismissed] = useState(false);
  const [adminPostSearchQuery, setAdminPostSearchQuery] = useState('');
  
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [dbUsers, setDbUsers] = useState<any[]>([]);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [banners, setBanners] = useState<BannerAd[]>([]);
  const [includeLiveNews, setIncludeLiveNews] = useState<boolean>(true);
  const [isAddBannerOpen, setIsAddBannerOpen] = useState<boolean>(false);
  const [bannerTitle, setBannerTitle] = useState<string>('');
  const [bannerDesc, setBannerDesc] = useState<string>('');
  const [bannerContent, setBannerContent] = useState<string>('');
  const [bannerLink, setBannerLink] = useState<string>('');
  const [bannerUrl, setBannerUrl] = useState<string>('');
  const [bannerImageSelected, setBannerImageSelected] = useState<string | null>(null);
  const [isUploadingBannerImage, setIsUploadingBannerImage] = useState<boolean>(false);
  const bannerImageInputRef = useRef<HTMLInputElement>(null);
  
  // Event Management States
  const [selectedEventForModal, setSelectedEventForModal] = useState<Event | null>(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState<boolean>(false);
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventLocation, setEventLocation] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [eventOrganizer, setEventOrganizer] = useState<string>('');
  const [eventImageUrl, setEventImageUrl] = useState<string>('');
  const [eventImageSelected, setEventImageSelected] = useState<string | null>(null);
  const [isUploadingEventImg, setIsUploadingEventImg] = useState<boolean>(false);
  const eventImageInputRef = useRef<HTMLInputElement>(null);
  const [adminBannersTab, setAdminBannersTab] = useState<'active' | 'suggested'>('active');

  // Places to Visit Management States
  const [places, setPlaces] = useState<any[]>([]);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState<boolean>(false);
  const [placeName, setPlaceName] = useState<string>('');
  const [placeProvince, setPlaceProvince] = useState<string>('');
  const [placeAddress, setPlaceAddress] = useState<string>('');
  const [placeImgUrl, setPlaceImgUrl] = useState<string>('');
  const [placeImageSelected, setPlaceImageSelected] = useState<string | null>(null);
  const [isUploadingPlaceImg, setIsUploadingPlaceImg] = useState<boolean>(false);
  const [placeHowToGetEn, setPlaceHowToGetEn] = useState<string>('');
  const [placeHowToGetTr, setPlaceHowToGetTr] = useState<string>('');
  const [placeTipsEn, setPlaceTipsEn] = useState<string>('');
  const [placeTipsTr, setPlaceTipsTr] = useState<string>('');
  const [placePriceEn, setPlacePriceEn] = useState<string>('');
  const [placePriceTr, setPlacePriceTr] = useState<string>('');
  const [placeParkingEn, setPlaceParkingEn] = useState<string>('');
  const [placeParkingTr, setPlaceParkingTr] = useState<string>('');
  const [placeWebsiteUrl, setPlaceWebsiteUrl] = useState<string>('');
  const [placeGallery, setPlaceGallery] = useState<string[]>([]);
  const [isUploadingPlaceGallery, setIsUploadingPlaceGallery] = useState<boolean>(false);
  const [isTranslatingPlace, setIsTranslatingPlace] = useState<boolean>(false);
  const [activePlaceImage, setActivePlaceImage] = useState<string | null>(null);
  const placeImageInputRef = useRef<HTMLInputElement>(null);
  const placeGalleryInputRef = useRef<HTMLInputElement>(null);
  const [suggestedNews, setSuggestedNews] = useState<any[]>([]);
  const [isFetchingSuggestedNews, setIsFetchingSuggestedNews] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [notificationMessages, setNotificationMessages] = useState<NotificationMessage[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [communityMessages, setCommunityMessages] = useState<CommunityMessage[]>([]);
  const [selectedChatUserId, setSelectedChatUserId] = useState<string | null>(null);
  
  const [communityImageSelected, setCommunityImageSelected] = useState<string | null>(null);
  const [isUploadingCommunityImage, setIsUploadingCommunityImage] = useState<boolean>(false);
  const [userChatImageSelected, setUserChatImageSelected] = useState<string | null>(null);
  const [isUploadingUserChatImage, setIsUploadingUserChatImage] = useState<boolean>(false);
  const [adminChatImageSelected, setAdminChatImageSelected] = useState<string | null>(null);
  const [isUploadingAdminChatImage, setIsUploadingAdminChatImage] = useState<boolean>(false);
  const [businessChatImageSelected, setBusinessChatImageSelected] = useState<string | null>(null);
  const [isUploadingBusinessChatImage, setIsUploadingBusinessChatImage] = useState<boolean>(false);
  const [notifDetailImageSelected, setNotifDetailImageSelected] = useState<string | null>(null);
  const [isUploadingNotifDetailImage, setIsUploadingNotifDetailImage] = useState<boolean>(false);
  const [notifReplyImageSelected, setNotifReplyImageSelected] = useState<string | null>(null);
  const [isUploadingNotifReplyImage, setIsUploadingNotifReplyImage] = useState<boolean>(false);
  const [previewMessageImage, setPreviewMessageImage] = useState<string | null>(null);

  const userChatInputRef = useRef<HTMLInputElement>(null);
  const adminChatInputRef = useRef<HTMLInputElement>(null);
  const notifMessageInputRef = useRef<HTMLTextAreaElement>(null);
  const notifReplyInputRef = useRef<HTMLTextAreaElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Interactive Promo Video Simulator States
  const [videoSimPlaying, setVideoSimPlaying] = useState<boolean>(false);
  const [videoSimTime, setVideoSimTime] = useState<number>(0);
  const [isVideoRecording, setIsVideoRecording] = useState<boolean>(false);
  const [videoRecordProgress, setVideoRecordProgress] = useState<number>(0);
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState<boolean>(false);

  const startCanvasVideoRecording = useCallback(() => {
    if (isVideoRecording) return;
    setIsVideoRecording(true);
    setVideoRecordProgress(0);

    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      showToast('Canvas initialization failed', 'error');
      setIsVideoRecording(false);
      return;
    }

    // Capture Canvas stream at 30 fps
    const stream = (canvas as any).captureStream ? (canvas as any).captureStream(30) : (canvas as any).mozCaptureStream ? (canvas as any).mozCaptureStream(30) : null;
    if (!stream) {
      showToast('Your browser does not support canvas stream recording', 'error');
      setIsVideoRecording(false);
      return;
    }

    // Check supported formats
    let options = { mimeType: 'video/webm;codecs=vp9' };
    if (!(window as any).MediaRecorder || !(window as any).MediaRecorder.isTypeSupported || !(window as any).MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/webm;codecs=vp8' };
    }
    if (!(window as any).MediaRecorder || !(window as any).MediaRecorder.isTypeSupported || !(window as any).MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/webm' };
    }
    if (!(window as any).MediaRecorder || !(window as any).MediaRecorder.isTypeSupported || !(window as any).MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: '' };
    }

    let mediaRecorder: MediaRecorder;
    const chunks: Blob[] = [];

    try {
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (err: any) {
      console.warn("Failed with mimeType option, falling back:", err);
      try {
        mediaRecorder = new MediaRecorder(stream);
      } catch (err2) {
        showToast('Your browser does not support high-definition video recording', 'error');
        setIsVideoRecording(false);
        return;
      }
    }

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: mediaRecorder.mimeType || 'video/webm' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `goofind_promo_teaser_${lang}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsVideoRecording(false);
      setVideoRecordProgress(0);
      showToast(
        lang === 'en'
          ? 'Promo Teaser Video exported and downloaded successfully! Ready to upload to Youtube or Play Store!'
          : 'GooFind Tanıtım Teaser Videosu HD olarak başarıyla üretildi ve bilgisayarınıza indirildi!',
        'success'
      );
    };

    const totalDuration = 15; // 15s High Conversion Promo
    let recordedTime = 0;
    const fps = 30;
    const intervalMs = 1000 / fps;

    // Start recording
    mediaRecorder.start();

    const renderTimer = setInterval(() => {
      recordedTime += (1 / fps);
      const prog = Math.min(100, Math.round((recordedTime / totalDuration) * 100));
      setVideoRecordProgress(prog);

      // Render state on HD canvas
      drawVideoFrameOnCanvas(ctx, recordedTime, 1280, 720, lang);

      if (recordedTime >= totalDuration) {
        clearInterval(renderTimer);
        mediaRecorder.stop();
      }
    }, intervalMs);
  }, [lang, isVideoRecording]);

  useEffect(() => {
    let interval: any = null;
    if (videoSimPlaying) {
      interval = setInterval(() => {
        setVideoSimTime(prev => {
          if (prev >= 30) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [videoSimPlaying]);

  const videoSimActiveScene = useMemo(() => {
    if (videoSimTime < 5) return 1;
    if (videoSimTime < 12) return 2;
    if (videoSimTime < 20) return 3;
    if (videoSimTime < 26) return 4;
    return 5;
  }, [videoSimTime]);

  // Interactive Google Play Icon Generator States
  const [logoBgType, setLogoBgType] = useState<'white' | 'charcoal' | 'transparent' | 'gradient'>('white');
  const [logoIncludeText, setLogoIncludeText] = useState<boolean>(false);
  const [logoBorderRadius, setLogoBorderRadius] = useState<'squircle' | 'circle' | 'square'>('squircle');
  
  const [userRole, setUserRole] = useState<'guest' | 'user' | 'owner'>('guest');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    document.body.classList.remove('dark', 'theme-dark', 'theme-navy', 'theme-light');
  }, []);

  const [lastSeenChatTimestamp, setLastSeenChatTimestamp] = useState<number>(() => {
    try {
      const uId = currentUser?.id || 'guest';
      const stored = localStorage.getItem(`lastSeenChatTimestamp_${uId}`);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      const uId = currentUser?.id || 'guest';
      const stored = localStorage.getItem(`lastSeenChatTimestamp_${uId}`);
      setLastSeenChatTimestamp(stored ? parseInt(stored, 10) : 0);
    } catch {
      setLastSeenChatTimestamp(0);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (selectedCategory === 'Chat') {
      const now = Date.now();
      setLastSeenChatTimestamp(now);
      try {
        const uId = currentUser?.id || 'guest';
        localStorage.setItem(`lastSeenChatTimestamp_${uId}`, now.toString());
      } catch (e) {
        console.warn('Failed to save lastSeenChatTimestamp to localStorage:', e);
      }
    }
  }, [selectedCategory, chatMessages.length, currentUser?.id]);

  const unreadChatCount = useMemo(() => {
    return chatMessages.filter(
      (msg) => msg.senderRole === 'admin' && msg.timestamp > lastSeenChatTimestamp
    ).length;
  }, [chatMessages, lastSeenChatTimestamp]);
  
  const hasBusinessOwned = currentUser && businesses.some(b => b.ownerId === currentUser.id);

  const activeChats = useMemo(() => {
    const usersMap: Record<string, { id: string; name: string; lastMessage: string; timestamp: number }> = {};
    
    chatMessages.forEach(msg => {
      const uid = msg.userId || (msg.senderRole !== 'admin' ? msg.senderId : null);
      if (!uid) return;
      
      const isNewer = !usersMap[uid] || msg.timestamp > usersMap[uid].timestamp;
      if (isNewer) {
        usersMap[uid] = {
          id: uid,
          name: msg.senderRole !== 'admin' ? msg.senderName : (usersMap[uid]?.name || 'User ' + uid.substring(0, 4)),
          lastMessage: formatChatPreviewText(msg.content, msg.type === 'image' || !!msg.imageUrl, lang),
          timestamp: msg.timestamp
        };
      } else if (!usersMap[uid].name && msg.senderRole !== 'admin') {
        usersMap[uid].name = msg.senderName;
      }
    });
    
    return Object.values(usersMap).sort((a, b) => b.timestamp - a.timestamp);
  }, [chatMessages]);

  useEffect(() => {
    if (userRole === 'owner' && !selectedChatUserId && activeChats.length > 0) {
      setSelectedChatUserId(activeChats[0].id);
    }
  }, [userRole, activeChats, selectedChatUserId]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isNotifMessageModalOpen, setIsNotifMessageModalOpen] = useState(false);
  const [activeNotifMsgThread, setActiveNotifMsgThread] = useState<string | null>(null);

  const DEFAULT_CANADA_NEWS = useMemo(() => [
    {
      id: 1,
      title: lang === 'en' ? "2025-2027 Immigration Plan" : "2025-2027 Göçmenlik Planı",
      desc: lang === 'en' ? "Sustainable growth and housing focus." : "Sürdürülebilir büyüme ve konut odaklı.",
      content: lang === 'en' 
        ? "Canada is shifting its immigration strategy to prioritize sustainable growth. The new 2025-2027 plan focuses on aligning newcomer arrivals with infrastructure capacity, particularly housing and healthcare. Expect more targeted draws for skilled trades and healthcare professionals." 
        : "Kanada, göçmenlik stratejisini sürdürülebilir büyümeye öncelik verecek şekilde değiştiriyor. Yeni 2025-2027 planı, yeni gelenlerin sayısını konut ve sağlık altyapısı kapasitesiyle uyumlu hale getirmeyi hedefliyor. Teknik meslekler ve sağlık çalışanları için daha hedefli alımların yapılması bekleniyor.",
      category: "Immigration",
      color: "bg-primary"
    },
    {
      id: 2,
      title: lang === 'en' ? "Ontario Small Business Grants" : "Ontario Küçük İşletme Hibeleri",
      desc: lang === 'en' ? "New support for local entrepreneurs." : "Yerel girişimcilere yeni destek paketi.",
      content: lang === 'en'
        ? "Ontario has announced a new wave of grants for small businesses. Entrepreneurs in the tech, hospitality, and manufacturing sectors can apply for funding up to $25,000 for digital transformation and energy efficiency upgrades. Applications open next month."
        : "Ontario, küçük işletmeler için yeni bir hibe paketi duyurdu. Teknoloji, hizmet ve üretim sektörlerindeki girişimciler; dijital dönüşüm ve enerji verimliliği güncellemeleri için 25.000 dolara kadar fon başvurusunda bulunabilecek. Başvurular önümüzdeki ay başlıyor.",
      category: "Economy",
      color: "bg-primary-mid"
    },
    {
      id: 3,
      title: lang === 'en' ? "Toronto Community Events" : "Toronto Toplum Etkinlikleri",
      desc: lang === 'en' ? "Summer festivals and cultural meets." : "Yaz festivalleri ve kültürel buluşmalar.",
      content: lang === 'en'
        ? "The Toronto Turkish community is gearing up for a series of cultural festivals this summer. From food markets in Nathan Phillips Square to networking nights for newcomers, the calendar is packed. These events aim to foster unity and help newcomers integrate faster."
        : "Toronto Türk toplumu, bu yaz bir dizi kültürel festival için hazırlıklara başladı. Nathan Phillips Square'deki yemek pazarlarından yeni gelenler için ağ kurma gecelerine kadar takvim oldukça yoğun. Bu etkinlikler birliği güçlendirmeyi ve yeni gelenlerin entegrasyonunu hızlandırmayı amaçlıyor.",
      category: "Community",
      color: "bg-primary"
    }
  ], [lang]);
  const [showPostSuccess, setShowPostSuccess] = useState(false);
  const [businessImageUrlPreview, setBusinessImageUrlPreview] = useState('');
  const [businessFormLocation, setBusinessFormLocation] = useState<BusinessLocationValue>({ address: '' });
  const [noticeImages, setNoticeImages] = useState<string[]>([]);
  const [businessGallery, setBusinessGallery] = useState<string[]>([]);
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const businessFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const noticeFileInputRef = useRef<HTMLInputElement>(null);
  const userAvatarFileInputRef = useRef<HTMLInputElement>(null);
  const notifChatEndRef = useRef<HTMLDivElement>(null);
  const inboxChatEndRef = useRef<HTMLDivElement>(null);
  const communityChatEndRef = useRef<HTMLDivElement>(null);

  const handleNoticeImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    const currentCount = noticeImages.length;
    const remainingSlots = 10 - currentCount;

    if (remainingSlots <= 0) {
      showToast(lang === 'en' ? 'Maximum 10 images allowed' : 'En fazla 10 görsel ekleyebilirsiniz', 'error');
      e.target.value = '';
      return;
    }

    const filesToProcess = files.slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      showToast(lang === 'en' 
        ? `Only ${remainingSlots} more images could be added. The extra ${files.length - remainingSlots} images were skipped.` 
        : `Sadece ${remainingSlots} tane daha görsel eklenebildi. Fazladan seçilen ${files.length - remainingSlots} görsel atlandı.`, 'info');
    }

    // Reset value so the change event fires even if the same file is selected again
    e.target.value = '';

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1200;
          if (width > height) {
            if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
          } else {
            if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setNoticeImages(prev => [...prev, dataUrl].slice(0, 10));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleBusinessGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    const currentCount = businessGallery.length;
    const remainingSlots = 10 - currentCount;

    if (remainingSlots <= 0) {
      showToast(lang === 'en' ? 'Maximum 10 images allowed' : 'En fazla 10 görsel ekleyebilirsiniz', 'error');
      e.target.value = '';
      return;
    }

    const filesToProcess = files.slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      showToast(lang === 'en' 
        ? `Only ${remainingSlots} more images could be added. The extra ${files.length - remainingSlots} images were skipped.` 
        : `Sadece ${remainingSlots} tane daha görsel eklenebildi. Fazladan seçilen ${files.length - remainingSlots} görsel atlandı.`, 'info');
    }

    // Reset value so the change event fires even if the same file is selected again
    e.target.value = '';

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1200;
          if (width > height) {
            if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
          } else {
            if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setBusinessGallery(prev => [...prev, dataUrl].slice(0, 10));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const reviewFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setPreview: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Maksimum boyutları belirle (yükseklik veya genişlik 1200px)
          const MAX_SIZE = 1200;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Görseli JPEG formatında 0.7 kalitesinde sıkıştır
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          
          // Veritabanı sınırı için kontrol (Base64 uzunluğu 1.3 milyon karakterden az olmalı)
          if (dataUrl.length > 1000000) {
            showToast(lang === 'en' ? 'Image is still too large after compression. Please try a different one.' : 'Resim sıkıştırılmasına rağmen çok büyük. Lütfen başka bir görsel deneyin.', 'error');
            return;
          }
          
          setPreview(dataUrl);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const [showWelcome, setShowWelcome] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBusinessRegistrationModalOpen, setIsBusinessRegistrationModalOpen] = useState(false);
  const [showBusinessSuccess, setShowBusinessSuccess] = useState(false);
  const [isRegisteringBusiness, setIsRegisteringBusiness] = useState(false);
  const [isUpdatingBusiness, setIsUpdatingBusiness] = useState(false);
  const registerBusinessLockRef = useRef(false);
  const [isEditBusinessModalOpen, setIsEditBusinessModalOpen] = useState(false);
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{
    type: 'notification' | 'flyer' | 'event' | 'place' | 'banner';
    id: string;
    title: string;
  } | null>(null);

  const [isAllPlacesModalOpen, setIsAllPlacesModalOpen] = useState(false);
  const [placeModalSearchQuery, setPlaceModalSearchQuery] = useState('');
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState<PlaceCategory | 'All'>('All');
  const [placeCategory, setPlaceCategory] = useState<PlaceCategory>(PlaceCategory.CITY);

  const promptDelete = (type: 'notification' | 'flyer' | 'event' | 'place' | 'banner', id: string, title: string) => {
    setDeleteConfirmTarget({ type, id, title });
  };

  const executeDelete = (type: 'notification' | 'flyer' | 'event' | 'place' | 'banner', id: string) => {
    if (type === 'notification') {
      handleDeleteNotification(id, true);
    } else if (type === 'flyer') {
      handleDeleteFlyer(id, true);
    } else if (type === 'event') {
      handleDeleteEvent(id, true);
    } else if (type === 'place') {
      handleDeletePlace(id, true);
    } else if (type === 'banner') {
      handleDeleteBanner(id, true);
    }
  };
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const [activeBusinessImage, setActiveBusinessImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedBusiness) {
      setActiveBusinessImage(selectedBusiness.imageUrl);
    } else {
      setActiveBusinessImage(null);
    }
  }, [selectedBusiness]);

  // Sync selectedBusiness when businesses list updates
  useEffect(() => {
    if (selectedBusiness) {
      const updated = businesses.find(b => b.id === selectedBusiness.id);
      if (updated) setSelectedBusiness(updated);
    }
  }, [businesses, selectedBusiness]);
  const [isBusinessDetailModalOpen, setIsBusinessDetailModalOpen] = useState(false);
  const [selectedFlyer, setSelectedFlyer] = useState<Flyer | null>(null);
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState(false);
  const [isAddFlyerOpen, setIsAddFlyerOpen] = useState(false);
  const [newFlyerTitleTr, setNewFlyerTitleTr] = useState('');
  const [newFlyerTitleEn, setNewFlyerTitleEn] = useState('');
  const [newFlyerBadgeTr, setNewFlyerBadgeTr] = useState('');
  const [newFlyerBadgeEn, setNewFlyerBadgeEn] = useState('');
  const [newFlyerSavings, setNewFlyerSavings] = useState('');
  const [newFlyerDateRangeTr, setNewFlyerDateRangeTr] = useState('');
  const [newFlyerDateRangeEn, setNewFlyerDateRangeEn] = useState('');
  const [newFlyerThemeColor, setNewFlyerThemeColor] = useState('bg-red-600');
  const [newFlyerBadgeColor, setNewFlyerBadgeColor] = useState('bg-yellow-400 text-red-950');
  const [newFlyerImages, setNewFlyerImages] = useState<string[]>([]);
  const [newFlyerItems, setNewFlyerItems] = useState<any[]>([]);
  const [tempItemNameTr, setTempItemNameTr] = useState('');
  const [tempItemNameEn, setTempItemNameEn] = useState('');
  const [tempItemOldPrice, setTempItemOldPrice] = useState('');
  const [tempItemNewPrice, setTempItemNewPrice] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [businessChatMessages, setBusinessChatMessages] = useState<BusinessMessage[]>([]);
  const [isBusinessChatOpen, setIsBusinessChatOpen] = useState(false);
  const [activeBusinessChatPartnerId, setActiveBusinessChatPartnerId] = useState<string | null>(null);
  const [chatPartnerUser, setChatPartnerUser] = useState<any | null>(null);
  const [profileUser, setProfileUser] = useState<any | null>(null);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isEditingProfileDetails, setIsEditingProfileDetails] = useState(false);
  const [editNameInput, setEditNameInput] = useState('');
  const [editPhoneInput, setEditPhoneInput] = useState('');

  // Admin Editing States for Flyers, Events, Places, Banners & Notifications
  const [editingFlyer, setEditingFlyer] = useState<any | null>(null);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [editingPlace, setEditingPlace] = useState<any | null>(null);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);
  const [editingNotification, setEditingNotification] = useState<any | null>(null);
  const [isEditNotificationOpen, setIsEditNotificationOpen] = useState<boolean>(false);
  const [editNotifTitle, setEditNotifTitle] = useState<string>('');
  const [editNotifCategory, setEditNotifCategory] = useState<any>('Announcements');
  const [editNotifDescription, setEditNotifDescription] = useState<string>('');
  const [editNotifPrice, setEditNotifPrice] = useState<string>('');
  const [editNotifImages, setEditNotifImages] = useState<string[]>([]);

  const ownerCompanyIncomingThreads = useMemo(() => {
    if (!currentUser || !selectedBusiness || selectedBusiness.ownerId !== currentUser.id) return [];
    return buildOwnerIncomingThreads(
      businessChatMessages,
      selectedBusiness.id,
      currentUser.id,
      businesses,
      lang,
    );
  }, [businessChatMessages, selectedBusiness, currentUser, businesses, lang]);

  const ownerCompanyOutgoingThreads = useMemo(() => {
    if (!currentUser || !selectedBusiness || selectedBusiness.ownerId !== currentUser.id) return [];
    return buildOwnerOutgoingThreads(businessChatMessages, currentUser.id, businesses, lang);
  }, [businessChatMessages, selectedBusiness, currentUser, businesses, lang]);

  const userCompanyIncomingThreads = useMemo(() => {
    if (!currentUser || hasBusinessOwned) return [];
    return buildUserIncomingCompanyThreads(businessChatMessages, currentUser.id, businesses, lang);
  }, [businessChatMessages, currentUser, businesses, lang, hasBusinessOwned]);

  const userCompanyOutgoingThreads = useMemo(() => {
    if (!currentUser || hasBusinessOwned) return [];
    return buildUserOutgoingCompanyThreads(businessChatMessages, currentUser.id, businesses, lang);
  }, [businessChatMessages, currentUser, businesses, lang, hasBusinessOwned]);

  const userOwnAnnouncements = useMemo(() => {
    if (!currentUser) return [];
    return notifications.filter((n) => n.userId === currentUser.id && n.approved);
  }, [notifications, currentUser?.id]);

  const hasPostedAnnouncement = userOwnAnnouncements.length > 0;

  const incomingAnnouncementThreads = useMemo(() => {
    if (!currentUser) return [];
    return buildIncomingAnnouncementThreads(
      notificationMessages,
      currentUser.id,
      notifications,
      lang,
      dbUsers,
    );
  }, [notificationMessages, currentUser?.id, notifications, lang, dbUsers]);

  const outgoingAnnouncementThreads = useMemo(() => {
    if (!currentUser) return [];
    return buildOutgoingAnnouncementThreads(
      notificationMessages,
      currentUser.id,
      notifications,
      lang,
      dbUsers,
    );
  }, [notificationMessages, currentUser?.id, notifications, lang, dbUsers]);

  const unreadAnnouncementMessageCount = useMemo(() => {
    if (!currentUser) return 0;
    return countUnreadAnnouncementMessages(notificationMessages, currentUser.id);
  }, [notificationMessages, currentUser?.id]);

  const handleOpenAnnouncementMessages = useCallback(() => {
    setActiveNotifMsgThread(null);
    setIsNotifMessageModalOpen(true);
  }, []);

  const handleOpenNotifMsgThread = useCallback(
    (threadKey: string) => {
      setActiveNotifMsgThread(threadKey);
      const [notifId, otherId] = threadKey.split('_');
      notificationMessages
        .filter((m) => {
          const mOtherId = m.senderId === currentUser?.id ? m.receiverId : m.senderId;
          return m.notifId === notifId && mOtherId === otherId && m.receiverId === currentUser?.id && !m.read;
        })
        .forEach((m) => {
          void updateDoc(doc(db, 'notification_messages', m.id), { read: true });
        });
    },
    [notificationMessages, currentUser?.id],
  );

  const handleOpenCompanyMessageThread = useCallback(
    (businessId: string, partnerId: string) => {
      const biz = businesses.find((b) => b.id === businessId);
      if (!biz || !partnerId) return;
      setSelectedBusiness(biz);
      setActiveBusinessChatPartnerId(partnerId);
      setIsBusinessDetailModalOpen(false);
      setIsBusinessChatOpen(true);
    },
    [businesses],
  );

  // Google Play Console Screenshots Generator States
  const [ssPreset, setSsPreset] = useState<number>(1);
  const [ssMarketingSlogan, setSsMarketingSlogan] = useState<string>('');
  const [ssTheme, setSsTheme] = useState<string>('dark'); // 'dark', 'light', 'royal_gold', 'blue_steel'

  useEffect(() => {
    // Set default slogan when preset or language changes
    const getSsDefaultSlogan = (preset: number) => {
      if (lang === 'en') {
        switch(preset) {
          case 1: return "CANADA'S LARGEST TURKISH CORNER";
          case 2: return "FIND TRUSTED TURKISH BUSINESSES";
          case 3: return "FLYERS, BROCHURES & LOCAL OFFERS";
          case 4: return "EXPLORE BEAUTIFUL CANADIAN PLACES";
          default: return "CANADA-TURKISH COMMUNITY HUB";
        }
      } else {
        switch(preset) {
          case 1: return "KANADA'NIN EN BÜYÜK TÜRK REHBERİ";
          case 2: return "GÜVENİLİR YEREL ESNAFLARI BULUN";
          case 3: return "HAFTALIK İLANLAR VE BROŞÜRLER";
          case 4: return "KANADA'DA GEZİLECEK EN İYİ YERLER";
          default: return "KANADA TÜRK TOPLULUK MERKEZİ";
        }
      }
    };
    setSsMarketingSlogan(getSsDefaultSlogan(ssPreset));
  }, [ssPreset, lang]);



  useEffect(() => {
    if (activeBusinessChatPartnerId) {
      getDoc(doc(db, 'users', activeBusinessChatPartnerId))
        .then((snap) => {
          if (snap.exists()) {
            setChatPartnerUser({ id: snap.id, ...snap.data() });
          } else {
            const match = businessChatMessages.find(m => m.senderId === activeBusinessChatPartnerId);
            setChatPartnerUser({
              id: activeBusinessChatPartnerId,
              name: match ? match.senderName : (lang === 'en' ? 'Customer' : 'Müşteri'),
              email: '',
            });
          }
        })
        .catch((err) => {
          console.error("Error loading chat partner profile", err);
          const match = businessChatMessages.find(m => m.senderId === activeBusinessChatPartnerId);
          setChatPartnerUser({
            id: activeBusinessChatPartnerId,
            name: match ? match.senderName : (lang === 'en' ? 'Customer' : 'Müşteri'),
            email: '',
          });
        });
    } else {
      setChatPartnerUser(null);
    }
  }, [activeBusinessChatPartnerId, businessChatMessages, lang]);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [outgoingCall, setOutgoingCall] = useState<any>(null);
  const [activeCall, setActiveCall] = useState<any>(null);
  const [callTimer, setCallTimer] = useState<number>(0);
  const [callConnectionState, setCallConnectionState] = useState<string>('new');
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const addedCandidatesRef = useRef<Set<string>>(new Set());
  const iceBufferRef = useRef<string[]>([]);
  const settingRemoteDescriptionRef = useRef<string | null>(null);

  const processIceBuffer = useCallback((pc: RTCPeerConnection) => {
    const temp = [...iceBufferRef.current];
    iceBufferRef.current = [];
    temp.forEach(candStr => {
      if (!addedCandidatesRef.current.has(candStr)) {
        addedCandidatesRef.current.add(candStr);
        try {
          pc.addIceCandidate(new RTCIceCandidate(JSON.parse(candStr)))
            .catch(err => console.warn("Add ICE err from buffer:", err));
        } catch (e) {
          console.warn("Error parsing buffered candidate:", e);
        }
      }
    });
  }, []);

  const addRemoteCandidate = useCallback((pc: RTCPeerConnection, candStr: string) => {
    if (addedCandidatesRef.current.has(candStr)) return;
    if (pc.remoteDescription && pc.remoteDescription.type) {
      addedCandidatesRef.current.add(candStr);
      try {
        pc.addIceCandidate(new RTCIceCandidate(JSON.parse(candStr)))
          .catch(err => console.warn("Buffered ICE target apply error:", err));
      } catch (e) {
        console.warn("Error parsing/adding candidate:", e);
      }
      if (iceBufferRef.current.length > 0) {
        processIceBuffer(pc);
      }
    } else {
      if (!iceBufferRef.current.includes(candStr)) {
        iceBufferRef.current.push(candStr);
      }
    }
  }, [processIceBuffer]);

  const ringtoneCtxRef = useRef<AudioContext | null>(null);
  const ringtoneOscsRef = useRef<OscillatorNode[]>([]);
  const ringtoneIntervalRef = useRef<any>(null);

  const stopRingtones = () => {
    if (ringtoneIntervalRef.current) {
      clearInterval(ringtoneIntervalRef.current);
      ringtoneIntervalRef.current = null;
    }
    ringtoneOscsRef.current.forEach(osc => {
      try { osc.stop(); } catch (e) { void e; }
    });
    ringtoneOscsRef.current = [];
    if (ringtoneCtxRef.current) {
      if (ringtoneCtxRef.current.state !== 'closed') {
        ringtoneCtxRef.current.close().catch(e => console.warn(e));
      }
      ringtoneCtxRef.current = null;
    }
  };

  const startOutgoingRingtone = useCallback(() => {
    stopRingtones();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      ringtoneCtxRef.current = ctx;

      const playBeep = () => {
        if (ctx.state === 'suspended') {
          ctx.resume().catch(e => console.warn("Context resume failed:", e));
        }
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(425, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.12, ctx.currentTime + 1.25);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.3);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();
        ringtoneOscsRef.current.push(osc);
        
        setTimeout(() => {
          try { osc.stop(); } catch (e) { void e; }
          ringtoneOscsRef.current = ringtoneOscsRef.current.filter(o => o !== osc);
        }, 1500);
      };

      playBeep();
      ringtoneIntervalRef.current = setInterval(playBeep, 4000);
    } catch (err) {
      console.warn("Could not start outgoing ringtone:", err);
    }
  }, []);

  const startIncomingRingtone = useCallback(() => {
    stopRingtones();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      ringtoneCtxRef.current = ctx;

      const playBeep = () => {
        if (ctx.state === 'suspended') {
          ctx.resume().catch(e => console.warn("Context resume failed:", e));
        }
        
        const osc1 = ctx.createOscillator();
        const gainNode1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(554.37, ctx.currentTime);
        gainNode1.gain.setValueAtTime(0, ctx.currentTime);
        gainNode1.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
        gainNode1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc1.connect(gainNode1);
        gainNode1.connect(ctx.destination);
        osc1.start();
        ringtoneOscsRef.current.push(osc1);

        const osc1b = ctx.createOscillator();
        const gainNode1b = ctx.createGain();
        osc1b.frequency.setValueAtTime(659.25, ctx.currentTime);
        gainNode1b.gain.setValueAtTime(0, ctx.currentTime);
        gainNode1b.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
        gainNode1b.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc1b.connect(gainNode1b);
        gainNode1b.connect(ctx.destination);
        osc1b.start();
        ringtoneOscsRef.current.push(osc1b);

        setTimeout(() => {
          if (!ringtoneCtxRef.current) return;
          const osc2 = ctx.createOscillator();
          const gainNode2 = ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(554.37, ctx.currentTime);
          gainNode2.gain.setValueAtTime(0, ctx.currentTime);
          gainNode2.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
          gainNode2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
          osc2.connect(gainNode2);
          gainNode2.connect(ctx.destination);
          osc2.start();
          ringtoneOscsRef.current.push(osc2);

          const osc2b = ctx.createOscillator();
          const gainNode2b = ctx.createGain();
          osc2b.frequency.setValueAtTime(659.25, ctx.currentTime);
          gainNode2b.gain.setValueAtTime(0, ctx.currentTime);
          gainNode2b.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
          gainNode2b.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
          osc2b.connect(gainNode2b);
          gainNode2b.connect(ctx.destination);
          osc2b.start();
          ringtoneOscsRef.current.push(osc2b);

          setTimeout(() => {
            try { osc2.stop(); } catch (e) { void e; }
            try { osc2b.stop(); } catch (e) { void e; }
            ringtoneOscsRef.current = ringtoneOscsRef.current.filter(o => o !== osc2 && o !== osc2b);
          }, 500);
        }, 300);

        setTimeout(() => {
          try { osc1.stop(); } catch (e) { void e; }
          try { osc1b.stop(); } catch (e) { void e; }
          ringtoneOscsRef.current = ringtoneOscsRef.current.filter(o => o !== osc1 && o !== osc1b);
        }, 800);
      };

      playBeep();
      ringtoneIntervalRef.current = setInterval(playBeep, 3000);
    } catch (err) {
      console.warn("Could not start incoming ringtone:", err);
    }
  }, []);

  const activeCallStatus = activeCall?.status;
  const outgoingCallStatus = outgoingCall?.status;
  const incomingCallStatus = incomingCall?.status;
  const hasActiveCall = !!activeCall;
  const hasOutgoingCall = !!outgoingCall;
  const hasIncomingCall = !!incomingCall;

  useEffect(() => {
    if (hasActiveCall) {
      stopRingtones();
    } else if (hasOutgoingCall && outgoingCallStatus === 'ringing') {
      startOutgoingRingtone();
    } else if (hasIncomingCall && incomingCallStatus === 'ringing') {
      startIncomingRingtone();
    } else {
      stopRingtones();
    }
    return () => {
      stopRingtones();
    };
  }, [
    activeCallStatus,
    outgoingCallStatus,
    incomingCallStatus,
    hasActiveCall,
    hasOutgoingCall,
    hasIncomingCall,
    startIncomingRingtone,
    startOutgoingRingtone
  ]);
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot_password'>('login');
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showConfirmPasswordRegister, setShowConfirmPasswordRegister] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState<boolean>(false);

  useEffect(() => {
    if (selectedNews) {
      const hasRealLink = selectedNews.link && selectedNews.link !== '#' && selectedNews.link.trim() !== '';
      const finalLink = hasRealLink 
        ? selectedNews.link 
        : `https://www.google.com/search?q=${encodeURIComponent((selectedNews.title || '') + ' Canada')}`;

      setIsGeneratingSummary(true);
      setAiSummary(null);
      summarizeWebsiteInfo(finalLink, selectedNews.title, lang)
        .then(summary => {
          setAiSummary(summary);
          setIsGeneratingSummary(false);
        })
        .catch(err => {
          console.error('Error generating AI Website summary:', err);
          setIsGeneratingSummary(false);
        });
    } else {
      setAiSummary(null);
      setIsGeneratingSummary(false);
    }
  }, [selectedNews, lang]);

  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const [activeNotificationImage, setActiveNotificationImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedNotification) {
      setActiveNotificationImage(selectedNotification.imageUrl || (selectedNotification.gallery && selectedNotification.gallery[0]) || null);
    } else {
      setActiveNotificationImage(null);
    }
  }, [selectedNotification]);

  useEffect(() => {
    if (selectedPlace) {
      setActivePlaceImage(selectedPlace.img || (selectedPlace.gallery && selectedPlace.gallery[0]) || null);
    } else {
      setActivePlaceImage(null);
    }
  }, [selectedPlace]);

  // Deep image-inspect & zoom lightbox state definitions
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const lightboxImage = lightboxIndex >= 0 && lightboxIndex < lightboxImages.length ? lightboxImages[lightboxIndex] : null;

  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleNextImage = useCallback(() => {
    setLightboxIndex(prev => {
      if (prev < lightboxImages.length - 1) {
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
        setRotationAngle(0);
        return prev + 1;
      }
      setPanOffset({ x: 0, y: 0 });
      return prev;
    });
  }, [lightboxImages]);

  const handlePrevImage = useCallback(() => {
    setLightboxIndex(prev => {
      if (prev > 0) {
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
        setRotationAngle(0);
        return prev - 1;
      }
      setPanOffset({ x: 0, y: 0 });
      return prev;
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(-1);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setRotationAngle(0);
  }, []);

  // Global click listener to intercept any image zoom view and gather gallery context
  useEffect(() => {
    const handleGlobalImageClick = (e: MouseEvent) => {
      // If lightbox is already open, ignore
      if (lightboxIndex >= 0) return;

      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const imgTarget = target as HTMLImageElement;
        const src = imgTarget.src;
        if (!src) return;

        // Skip specific interactive buttons, tiny logos, or explicitly disabled ones
        if (
          src.includes('google.svg') || 
          imgTarget.classList.contains('no-lightbox') ||
          imgTarget.closest('.no-lightbox')
        ) {
          return;
        }

        // Get size
        const rect = imgTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Skip tiny layout graphics, avatars or tiny navigation icons (<44px)
        if (width > 0 && height > 0 && width < 44 && height < 44) {
          return;
        }

        // Open Lightbox
        e.preventDefault();
        e.stopPropagation();

        let galleryList: string[] = [src];
        let index = 0;

        // Context-aware automatic gallery discovery
        if (selectedBusiness) {
          const bizImages = [selectedBusiness.imageUrl, ...(selectedBusiness.gallery || [])].filter(Boolean);
          const foundIdx = bizImages.findIndex(img => img === src || src.endsWith(img));
          if (foundIdx !== -1) {
            galleryList = bizImages;
            index = foundIdx;
          }
        } else if (selectedNotification) {
          const notifImages = [
            activeNotificationImage || selectedNotification.imageUrl || (selectedNotification.gallery && selectedNotification.gallery[0]),
            ...(selectedNotification.gallery || [])
          ].filter(Boolean);
          const uniqueImages = Array.from(new Set(notifImages));
          const foundIdx = uniqueImages.findIndex(img => img === src || src.endsWith(img));
          if (foundIdx !== -1) {
            galleryList = uniqueImages;
            index = foundIdx;
          }
        }

        if (galleryList.length === 1) {
          const parentContainer = imgTarget.closest('.grid, .flex, .gallery-container, .post-container') || imgTarget.parentElement;
          if (parentContainer) {
            const siblingImgs = Array.from(parentContainer.querySelectorAll('img:not(.no-lightbox):not([src*="google.svg"])')) as HTMLImageElement[];
            if (siblingImgs.length > 1) {
              const urls = siblingImgs.map(el => el.src).filter(Boolean);
              const uniqueUrls = Array.from(new Set(urls));
              const foundIdx = uniqueUrls.indexOf(src);
              if (foundIdx !== -1) {
                galleryList = uniqueUrls;
                index = foundIdx;
              }
            }
          }
        }

        setLightboxImages(galleryList);
        setLightboxIndex(index);
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
        setRotationAngle(0);
      }
    };

    // Use capturing phase to intercept before parent button/card onClick intercepts
    document.addEventListener('click', handleGlobalImageClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalImageClick, true);
    };
  }, [lightboxIndex, selectedBusiness, selectedNotification, activeNotificationImage]);

  // Comprehensive active modal state check to prevent layout shift and double scrollbar bugs
  const isAnyModalOpen = !!(
    isAuthModalOpen ||
    isPostModalOpen ||
    isTermsModalOpen ||
    selectedNotification ||
    isNotifMessageModalOpen ||
    selectedNews ||
    isProfileOpen ||
    isBusinessRegistrationModalOpen ||
    isEditBusinessModalOpen ||
    isAddFlyerOpen ||
    isFlyerModalOpen ||
    isBusinessDetailModalOpen ||
    isBusinessChatOpen ||
    isUserProfileModalOpen ||
    isSearchOpen ||
    isNearbyMapOpen ||
    selectedPlace ||
    (lightboxIndex >= 0)
  );

  useEffect(() => {
    // Measure dynamic scrollbar width scroll offset on mount
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }, []);

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isAnyModalOpen]);

  // Escape key and Arrow keys hook for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        handlePrevImage();
      }
    };
    
    if (lightboxIndex >= 0) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, lightboxImages, handleNextImage, handlePrevImage, closeLightbox]);

  const handleWheel = (e: React.WheelEvent) => {
    const scaleFactor = 0.12;
    const nextZoom = zoomLevel + (e.deltaY < 0 ? scaleFactor : -scaleFactor);
    setZoomLevel(Math.min(Math.max(nextZoom, 0.5), 4));
  };

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [communityNews, setCommunityNews] = useState<any[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeDashboardTab, setActiveDashboardTab] = useState<'messages' | 'calls' | 'saved' | null>(null);
  const [isUserCompanyMessagesOpen, setIsUserCompanyMessagesOpen] = useState(false);
  const [callHistory, setCallHistory] = useState<any[]>(() => {
    const saved = localStorage.getItem('goofind_call_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        id: 'mock-1',
        businessId: '1',
        businessName: 'Anatolia Restaurant',
        categoryName: 'Dine-In / Türk Lokantası',
        timestamp: Date.now() - 3 * 3600000,
        type: 'outgoing'
      },
      {
        id: 'mock-2',
        businessId: '2',
        businessName: 'Pide 21',
        categoryName: 'Dine-In / Türk Lokantası',
        timestamp: Date.now() - 24 * 3600000,
        type: 'incoming',
        callerName: 'Pide 21'
      },
      {
        id: 'mock-3',
        businessId: '4',
        businessName: 'Dr. Selin Yilmaz - Family Medicine',
        categoryName: 'Health / Sağlık',
        timestamp: Date.now() - 48 * 3600000,
        type: 'missed',
        callerName: 'Dr. Selin Yildirim Office'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('goofind_call_history', JSON.stringify(callHistory));
  }, [callHistory]);

  const [micPermissionState, setMicPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'checking'>('checking');

  const checkMicPermission = async () => {
    const nav = getNavigator();
    if (!nav?.permissions?.query) {
      setMicPermissionState('prompt');
      return;
    }
    try {
      const result = await nav.permissions.query({ name: 'microphone' as PermissionName });
      setMicPermissionState(result.state);
      result.onchange = () => {
        setMicPermissionState(result.state);
      };
    } catch {
      setMicPermissionState('prompt');
    }
  };

  const requestMicPermission = async () => {
    const mediaDevices = getMediaDevices();
    if (!mediaDevices?.getUserMedia) {
      setMicPermissionState('prompt');
      showToast(
        lang === 'en' ? 'Phone calls open your dialer. Microphone is not required.' : 'Aramalar telefon uygulamanızı açar. Mikrofon gerekmez.',
        'info',
      );
      return;
    }
    try {
      setMicPermissionState('checking');
      const stream = await mediaDevices.getUserMedia({ 
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, 
        video: false 
      });
      stream.getTracks().forEach(track => {
        try { track.stop(); } catch (e) { console.warn("Track stop error:", e); }
      });
      setMicPermissionState('granted');
      showToast(lang === 'en' ? 'Microphone permission granted!' : 'Mikrofon izni başarıyla verildi!', 'success');
    } catch (err) {
      setMicPermissionState('denied');
      showToast(lang === 'en' ? 'Microphone permission denied. Please enable it in browser settings.' : 'Mikrofon izni reddedildi. Lütfen tarayıcı ayarlarından etkinleştirin.', 'error');
    }
  };

  useEffect(() => {
    if (currentUser) {
      checkMicPermission();
    }
  }, [currentUser, activeDashboardTab]);

  useEffect(() => {
    if (!incomingCall || localStreamRef.current) return;
    const mediaDevices = getMediaDevices();
    if (!mediaDevices?.getUserMedia) return;

    mediaDevices.getUserMedia({ 
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, 
      video: false 
    })
      .then(stream => {
        localStreamRef.current = stream;
        setMicPermissionState('granted');
        console.log("Microphone pre-acquired for incoming call.");
      })
      .catch(err => {
        console.warn("Unable to pre-acquire microphone stream:", err);
        setMicPermissionState('denied');
      });
  }, [incomingCall]);

  const handlePlaceCall = (biz: Business) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    if (biz.ownerId && biz.ownerId === currentUser.id) {
      showToast(lang === 'en' ? "You can't call your own business." : 'Kendi işletmenizi arayamazsınız.', 'info');
      return;
    }

    const phone = biz.phone?.trim();
    if (!phone || !dialPhoneNumber(phone)) {
      showToast(
        lang === 'en' ? 'No phone number available for this business.' : 'Bu işletme için telefon numarası bulunamadı.',
        'error',
      );
      return;
    }

    const callId = `call-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setCallHistory((prev) => [
      {
        id: callId,
        businessId: biz.id,
        businessName: biz.name,
        categoryName: biz.category || 'Category',
        timestamp: Date.now(),
        type: 'outgoing',
        callerName: currentUser.name || 'GooFind User',
      },
      ...prev,
    ]);
  };

  const cleanupCallLocally = useCallback(() => {
    stopRingtones();
    setCallConnectionState('new');
    settingRemoteDescriptionRef.current = null;
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        try { track.stop(); } catch (e) { console.warn("Track stop error:", e); }
      });
      localStreamRef.current = null;
    }
    if (pcRef.current) {
      try { pcRef.current.close(); } catch (e) { console.warn("PC close error:", e); }
      pcRef.current = null;
    }
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = null;
    }
    addedCandidatesRef.current.clear();
    iceBufferRef.current = [];
    setIncomingCall(null);
    setOutgoingCall(null);
    setActiveCall(null);
    setIsCalling(false);
  }, []);

  const handleEndCall = async () => {
    const activeCallId = outgoingCall?.id || activeCall?.id || incomingCall?.id;
    if (activeCallId) {
      try {
        const updateStatus = (incomingCall?.id && !activeCall) ? 'rejected' : 'ended';
        await updateDoc(doc(db, 'calls', activeCallId), { status: updateStatus });
      } catch (err) { console.error("Error ending call model:", err); }
    }
    cleanupCallLocally();
  };

  const handleAnswerCall = async () => {
    if (!incomingCall?.id) return;
    const rtcConfig = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
        { urls: 'stun:openrelay.metered.ca:80' },
        { urls: 'stun:openrelay.metered.ca:443' },
        { 
          urls: 'turn:openrelay.metered.ca:80', 
          username: 'openrelayproject', 
          credential: 'openrelayproject' 
        },
        { 
          urls: 'turn:openrelay.metered.ca:443', 
          username: 'openrelayproject', 
          credential: 'openrelayproject' 
        },
        { 
          urls: 'turn:openrelay.metered.ca:443?transport=tcp', 
          username: 'openrelayproject', 
          credential: 'openrelayproject' 
        },
        { 
          urls: 'turns:openrelay.metered.ca:443', 
          username: 'openrelayproject', 
          credential: 'openrelayproject' 
        },
        { 
          urls: 'turns:openrelay.metered.ca:443?transport=tcp', 
          username: 'openrelayproject', 
          credential: 'openrelayproject' 
        }
      ],
      iceCandidatePoolSize: 10
    };

    try {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.play().catch(() => {});
      }
      showToast(lang === 'en' ? 'Answering and connecting...' : 'Cevaplanıyor ve bağlanıyor...', 'info');
      let stream = localStreamRef.current;
      if (!stream) {
        const mediaDevices = getMediaDevices();
        if (mediaDevices?.getUserMedia) {
          stream = await mediaDevices.getUserMedia({ 
            audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, 
            video: false 
          });
          localStreamRef.current = stream;
        }
      }

      if (!stream) {
        showToast(lang === 'en' ? 'Microphone not available on this device.' : 'Bu cihazda mikrofon kullanılamıyor.', 'error');
        return;
      }

      if (!stream) {
        showToast(lang === 'en' ? 'Microphone not available on this device.' : 'Bu cihazda mikrofon kullanılamıyor.', 'error');
        return;
      }

      const pc = new RTCPeerConnection(rtcConfig);
      pcRef.current = pc;

      setCallConnectionState('connecting');

      pc.oniceconnectionstatechange = () => {
        console.log("WebRTC iceConnectionState (receiver):", pc.iceConnectionState);
        setCallConnectionState(pc.iceConnectionState);
      };

      pc.onconnectionstatechange = () => {
        console.log("WebRTC connectionState (receiver):", pc.connectionState);
      };

      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
      });

      pc.ontrack = (event) => {
        console.log("Receiver received track:", event.track.kind);
        if (remoteAudioRef.current) {
          let remoteStream = event.streams[0];
          if (!remoteStream && event.track) {
            console.log("No stream attached to responder ontrack; creating track-based MediaStream.");
            remoteStream = new MediaStream([event.track]);
          }
          if (remoteStream) {
            remoteAudioRef.current.srcObject = remoteStream;
            remoteAudioRef.current.play().catch(e => console.warn("Receiver autoplay sound promise rejection:", e));
          }
        }
      };

      const receiverCandQueue: string[] = [];
      let isAnswerSaved = false;

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          const candidateJson = JSON.stringify(event.candidate.toJSON());
          if (!isAnswerSaved) {
            receiverCandQueue.push(candidateJson);
            console.log("Receiver buffered candidate:", candidateJson);
          } else {
            console.log("Receiver sending candidate status active:", candidateJson);
            updateDoc(doc(db, 'calls', incomingCall.id), {
              receiverCandidates: arrayUnion(candidateJson)
            }).catch(err => console.error("Error setting responder candidate:", err));
          }
        }
      };

      if (incomingCall.offer) {
        await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
      }

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      await updateDoc(doc(db, 'calls', incomingCall.id), {
        status: 'answered',
        answer: { type: answer.type, sdp: answer.sdp }
      });
      isAnswerSaved = true;

      if (receiverCandQueue.length > 0) {
        console.log("Receiver flushing buffered candidates of size:", receiverCandQueue.length);
        await updateDoc(doc(db, 'calls', incomingCall.id), {
          receiverCandidates: arrayUnion(...receiverCandQueue)
        }).catch(err => console.error("Error flushing receiver candidate queue:", err));
      }

      if (incomingCall.callerCandidates) {
        incomingCall.callerCandidates.forEach((candStr: string) => {
          addRemoteCandidate(pc, candStr);
        });
      }
      processIceBuffer(pc);

      setActiveCall({ ...incomingCall, status: 'answered' });
      setIncomingCall(null);
    } catch (err) {
      console.error(err);
      showToast(lang === 'en' ? 'Microphone error on answering call' : 'Arama cevaplanırken mikrofon hatası oluştu', 'error');
    }
  };

  useEffect(() => {
    if (!currentUser?.id) {
      cleanupCallLocally();
      return;
    }

    const unsubCalls = onSnapshot(
      query(
        collection(db, 'calls'),
        or(where('callerId', '==', currentUser.id), where('receiverId', '==', currentUser.id))
      ),
      (snap) => {
        const list = snap.docs.map(doc => doc.data());
        const currentTrackingId = outgoingCall?.id || activeCall?.id || incomingCall?.id;
        
        if (currentTrackingId) {
          const session = list.find(c => c.id === currentTrackingId);
          if (!session) {
            cleanupCallLocally();
            return;
          }
          
          if (session.status === 'rejected' || session.status === 'ended') {
            cleanupCallLocally();
            return;
          }
          
          // If we are caller
          if (session.callerId === currentUser.id) {
            if (session.status === 'ringing') {
              setOutgoingCall(session);
              setIsCalling(true);
            } else if (session.status === 'answered') {
              setOutgoingCall(null);
              setActiveCall(session);
              setIsCalling(false);
              
              const pc = pcRef.current;
              if (pc && session.answer) {
                if (pc.signalingState === 'have-local-offer' && settingRemoteDescriptionRef.current !== session.id) {
                  settingRemoteDescriptionRef.current = session.id;
                  pc.setRemoteDescription(new RTCSessionDescription(session.answer))
                    .then(() => {
                      console.log("Remote SDP answer successfully set on caller.");
                      if (session.receiverCandidates) {
                        session.receiverCandidates.forEach((candStr: string) => {
                          addRemoteCandidate(pc, candStr);
                        });
                      }
                      processIceBuffer(pc);
                    })
                    .catch(err => {
                      console.error("Error setting WebRTC answer SDP:", err);
                      settingRemoteDescriptionRef.current = null;
                    });
                } else if (pc.remoteDescription && pc.remoteDescription.type && session.receiverCandidates) {
                  session.receiverCandidates.forEach((candStr: string) => {
                    addRemoteCandidate(pc, candStr);
                  });
                  processIceBuffer(pc);
                }
              }
            }
          }
          
          // If we are receiver
          if (session.receiverId === currentUser.id) {
            if (session.status === 'ringing') {
              setIncomingCall(session);
            } else if (session.status === 'answered') {
              setIncomingCall(null);
              setActiveCall(session);
              
              const pc = pcRef.current;
              if (pc && session.callerCandidates) {
                session.callerCandidates.forEach((candStr: string) => {
                  addRemoteCandidate(pc, candStr);
                });
                processIceBuffer(pc);
              }
            }
          }
        } else {
          // No current call under tracking. Let's see if there is any active incoming 'ringing' call.
          const ringingIncoming = list
            .filter(c => c.receiverId === currentUser.id && c.status === 'ringing')
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))[0];
            
          if (ringingIncoming) {
            setIncomingCall(ringingIncoming);
          } else {
            setIncomingCall(null);
          }
        }
      },
      (err) => {
        const lower = (err?.message || String(err)).toLowerCase();
        if (lower.includes('quota') || lower.includes('exceeded') || lower.includes('exhausted') || lower.includes('limit')) {
          setIsQuotaExceeded(true);
          console.warn("Firestore quota exceeded listening to call sessions.");
        } else {
          handleFirestoreError(err, 'list' as any, 'calls');
        }
      }
    );

    return () => {
      unsubCalls();
    };
  }, [currentUser?.id, activeCall?.id, outgoingCall?.id, incomingCall?.id, cleanupCallLocally, addRemoteCandidate, processIceBuffer]);

  useEffect(() => {
    let interval: any = null;
    if (activeCall) {
      setCallTimer(0);
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    } else {
      setCallTimer(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeCall]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleFavorite = async (bizId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    
    const newFavorites = favorites.includes(bizId) 
      ? favorites.filter(id => id !== bizId) 
      : [...favorites, bizId];
      
    setFavorites(newFavorites);

    try {
      await setDoc(doc(db, 'users', currentUser.id), {
        favorites: newFavorites
      }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, 'update', `users/${currentUser.id}`);
    }
  };

  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  useEffect(() => {
    if (selectedNotification) {
      setTimeout(() => {
        notifChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [notificationMessages, selectedNotification]);

  useEffect(() => {
    if (activeNotifMsgThread) {
      setTimeout(() => {
        inboxChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [notificationMessages, activeNotifMsgThread]);


  // --- Auth bootstrap (isolated so loading timeout is never reset by listener re-runs) ---
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(console.error);

    let loadingFinished = false;
    const finishLoading = () => {
      if (loadingFinished) return;
      loadingFinished = true;
      setIsLoading(false);
    };

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const emailLower = (user.email || '').toLowerCase();
        const isAdmin =
          emailLower === 'songululuca02@gmail.com' ||
          emailLower === 'admin@goofind.ca' ||
          emailLower === 'admin@admin.com';
        const userData = {
          id: user.uid,
          name: user.displayName || 'User',
          email: user.email || '',
          photoUrl:
            user.photoURL ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=random`,
          emailVerified: user.emailVerified,
          providerData: user.providerData,
        };
        setCurrentUser(userData);

        const presenceKey = `presence_${user.uid}`;
        const lastWriteTime = localStorage.getItem(presenceKey);
        const shouldUpdatePresence =
          !lastWriteTime || Date.now() - parseInt(lastWriteTime, 10) > 3600000;

        if (shouldUpdatePresence) {
          setDoc(
            doc(db, 'users', user.uid),
            {
              id: user.uid,
              name: userData.name,
              email: userData.email,
              photoUrl: userData.photoUrl,
              lastActive: Date.now(),
            },
            { merge: true },
          )
            .then(() => {
              localStorage.setItem(presenceKey, Date.now().toString());
            })
            .catch((err) => console.error('Error setting user document:', err));
        }

        setUserRole(isAdmin ? 'owner' : 'user');
        setShowWelcome(false);
      } else {
        setCurrentUser(null);
        setUserRole('guest');
      }

      finishLoading();
    });

    const safetyTimeout = setTimeout(() => {
      console.warn('Loading timed out, forcing app start.');
      finishLoading();
    }, 4000);

    return () => {
      clearTimeout(safetyTimeout);
      unsubAuth();
    };
  }, []);

  // --- Real-time Listeners ---
  useEffect(() => {
    const handleOnSnapshotError = (err: any, collectionName: string, fallbackData?: any[]) => {
      const errMsg = err?.message || String(err);
      const lower = errMsg.toLowerCase();
      if (lower.includes('quota') || lower.includes('exceeded') || lower.includes('exhausted') || lower.includes('limit')) {
        setIsQuotaExceeded(true);
        if (fallbackData) {
          if (collectionName === 'businesses') setBusinesses(fallbackData);
          else if (collectionName === 'flyers') setFlyers(fallbackData || []);
          else if (collectionName === 'notifications') setNotifications(fallbackData);
          else if (collectionName === 'events') setEvents(fallbackData);
          else if (collectionName === 'banners') setBanners(fallbackData);
          else if (collectionName === 'chat_messages') setChatMessages(fallbackData);
          else if (collectionName === 'communities') setCommunities(fallbackData);
        }
        console.warn(`Firestore quota check on '${collectionName}' caught: Reverting to localized fallback memory representation.`);
      } else {
        handleFirestoreError(err, 'list' as any, collectionName);
      }
    };

    const unsubBiz = onSnapshot(collection(db, 'businesses'), (snap) => {
      const data = snap.docs.map(doc => {
        const item = doc.data() || {};
        return {
          id: doc.id,
          name: item.name || '',
          description: item.description || '',
          category: item.category || 'All',
          ownerId: item.ownerId || '',
          imageUrl: item.imageUrl || '',
          rating: typeof item.rating === 'number' ? item.rating : 5,
          ratingCount: typeof item.ratingCount === 'number' ? item.ratingCount : 0,
          verified: !!item.verified,
          ...item
        } as Business;
      });
      setBusinesses(data);
    }, (err) => handleOnSnapshotError(err, 'businesses', INITIAL_BUSINESSES));

    const unsubNotif = onSnapshot(query(collection(db, 'notifications'), orderBy('createdAt', 'desc')), (snap) => {
      const data = snap.docs.map(doc => {
        const item = doc.data() || {};
        return {
          id: doc.id,
          title: item.title || '',
          description: item.description || '',
          category: item.category || 'All',
          approved: !!item.approved,
          ...item
        } as Notification;
      });
      setNotifications(data);
    }, (err) => handleOnSnapshotError(err, 'notifications', INITIAL_NOTIFICATIONS));

    const unsubEvents = onSnapshot(collection(db, 'events'), (snap) => {
      const data = snap.docs.map(doc => {
        const item = doc.data() || {};
        return {
          id: doc.id,
          title: item.title || '',
          description: item.description || '',
          approved: !!item.approved,
          ...item
        } as Event;
      });
      setEvents(data);
    }, (err) => handleOnSnapshotError(err, 'events', INITIAL_EVENTS));

    const unsubPlaces = onSnapshot(collection(db, 'places'), (snap) => {
      const data = snap.docs.map(doc => {
        const item = doc.data() || {};
        return {
          id: doc.id,
          name: item.name || '',
          province: item.province || '',
          img: item.img || item.imageUrl || '',
          address: item.address || '',
          howToGet: item.howToGet || '',
          howToGetTr: item.howToGetTr || '',
          tips: item.tips || '',
          tipsTr: item.tipsTr || '',
          price: item.price || '',
          priceTr: item.priceTr || '',
          parking: item.parking || '',
          parkingTr: item.parkingTr || '',
          approved: typeof item.approved === 'boolean' ? item.approved : true,
          ...item
        };
      });
      setPlaces(data.length === 0 ? INITIAL_PLACES : data);
    }, (err) => handleOnSnapshotError(err, 'places', INITIAL_PLACES));

    const unsubBanners = onSnapshot(collection(db, 'banners'), (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BannerAd));
      setBanners(data);
    }, (err) => handleOnSnapshotError(err, 'banners', INITIAL_BANNERS));

    const unsubBannersConfig = onSnapshot(doc(db, 'settings', 'banners_config'), (snap) => {
      if (snap.exists()) {
        const snapData = snap.data();
        if (typeof snapData.includeLiveNews === 'boolean') {
          setIncludeLiveNews(snapData.includeLiveNews);
        }
      }
    }, (err) => {
      console.warn("Error subscribing to settings/banners_config, using default:", err);
    });

    const currentUserEmailLower = (currentUser?.email || '').toLowerCase();
    const isAdminUser = currentUserEmailLower === 'songululuca02@gmail.com' || 
                        currentUserEmailLower === 'admin@goofind.ca' || 
                        currentUserEmailLower === 'admin@admin.com';

    let chatQuery;
    if (isAdminUser) {
      chatQuery = query(collection(db, 'chat_messages'));
    } else if (currentUser?.id) {
      chatQuery = query(collection(db, 'chat_messages'), where('userId', '==', currentUser.id));
    } else {
      chatQuery = query(collection(db, 'chat_messages'), where('userId', '==', 'guest-placeholder'));
    }

    const unsubChat = onSnapshot(chatQuery, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage))
        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      setChatMessages(data);
    }, (err) => handleOnSnapshotError(err, 'chat_messages', INITIAL_CHAT_MESSAGES));

    const unsubCommunities = onSnapshot(collection(db, 'communities'), (snap) => {
      const data = snap.docs.map(doc => {
        const item = doc.data() || {};
        return {
          id: doc.id,
          name: item.name || '',
          description: item.description || '',
          ...item
        } as Community;
      });
      setCommunities(data);
    }, (err) => handleOnSnapshotError(err, 'communities', INITIAL_COMMUNITIES));

    const unsubFlyers = onSnapshot(collection(db, 'flyers'), (snap) => {
      const data = snap.docs.map(doc => {
        const item = doc.data() || {};
        return {
          id: doc.id,
          titleTr: item.titleTr || '',
          titleEn: item.titleEn || '',
          badgeTr: item.badgeTr || '',
          badgeEn: item.badgeEn || '',
          dateRangeTr: item.dateRangeTr || '',
          dateRangeEn: item.dateRangeEn || '',
          ...item
        } as Flyer;
      });
      const sorted = data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setFlyers(sorted.length === 0 ? INITIAL_FLYERS : sorted);
    }, (err) => handleOnSnapshotError(err, 'flyers', INITIAL_FLYERS));

    const unsubDbUsers = onSnapshot(collection(db, 'users'), (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbUsers(data);
    }, (err) => {
      console.warn("Error subscribing to users collection:", err);
      setDbUsers([]);
    });

    // Business messages listener for current user
    let unsubBizMessages = () => {};
    let unsubNotifMessages = () => {};
    let unsubUserDoc = () => {};
    if (currentUser?.id) {
       unsubUserDoc = onSnapshot(doc(db, 'users', currentUser.id), (snap) => {
          if (snap.exists()) {
             const userData = snap.data();
             if (userData.favorites) {
                setFavorites(userData.favorites);
             }
             setCurrentUser((prev: any) => {
                if (!prev) return prev;
                return {
                   ...prev,
                   name: userData.name || prev.name,
                   photoUrl: userData.photoUrl || prev.photoUrl,
                   bio: userData.bio || prev.bio,
                   phone: userData.phone || prev.phone,
                   joinedCommunityId: userData.joinedCommunityId || null,
                   joinedCommunityAt: userData.joinedCommunityAt || null,
                   lastJoinedCommunityId: userData.lastJoinedCommunityId || null
                };
             });
          }
       }, (err) => handleOnSnapshotError(err, `users/${currentUser.id}`));

       // Secure listeners using server-side filters (sorting in memory to avoid index requirements)
       unsubBizMessages = onSnapshot(
         query(
           collection(db, 'business_messages'), 
           or(where('senderId', '==', currentUser.id), where('receiverId', '==', currentUser.id))
         ), 
         (snap) => {
           const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BusinessMessage))
             .sort((a, b) => a.timestamp - b.timestamp);
           setBusinessChatMessages(data);
         },
         (error) => handleOnSnapshotError(error, 'business_messages', [])
       );

       unsubNotifMessages = onSnapshot(
         query(
           collection(db, 'notification_messages'), 
           or(where('senderId', '==', currentUser.id), where('receiverId', '==', currentUser.id))
         ), 
         (snap) => {
           const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as NotificationMessage))
             .sort((a, b) => a.timestamp - b.timestamp);
           setNotificationMessages(data);
         },
         (error) => handleOnSnapshotError(error, 'notification_messages', [])
       );
    }

    return () => {
      unsubBiz();
      unsubNotif();
      unsubEvents();
      unsubBanners();
      unsubBannersConfig();
      unsubChat();
      unsubCommunities();
      unsubFlyers();
      unsubDbUsers();
      unsubBizMessages();
      unsubNotifMessages();
      unsubUserDoc();
    };
  }, [currentUser?.id, currentUser?.email]);

  useEffect(() => {
    if (selectedCommunity) {
      const unsub = onSnapshot(
        query(
          collection(db, `communities/${selectedCommunity.id}/messages`),
          orderBy('timestamp', 'asc'),
          limit(100)
        ),
        (snap) => {
          const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommunityMessage));
          setCommunityMessages(data);
        },
        (err) => {
          const lower = (err?.message || String(err)).toLowerCase();
          if (lower.includes('quota') || lower.includes('exceeded') || lower.includes('exhausted') || lower.includes('limit')) {
            setIsQuotaExceeded(true);
            setCommunityMessages([]);
            console.warn("Firestore quota exceeded listening to community messages.");
          } else {
            handleFirestoreError(err, 'list', `communities/${selectedCommunity.id}/messages`);
          }
        }
      );
      return () => unsub();
    } else {
      setCommunityMessages([]);
    }
  }, [selectedCommunity]);

  // --- Live News Fetching ---
  useEffect(() => {
    const fetchNews = async () => {
      setIsNewsLoading(true);
      const defaultNews = DEFAULT_CANADA_NEWS;
      try {
        const cacheKey = `canada_news_${lang}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < 4 * 60 * 60 * 1000) { // 4 hours cache
            setCommunityNews(data);
            setIsNewsLoading(false);
            return;
          }
        }

        const news = await getLatestCanadaTurkishNews(lang);
        if (news && news.length > 0) {
          const formattedNews = news.map((n: any, i: number) => ({
            ...n,
            id: `news-${Date.now()}-${i}`
          }));
          setCommunityNews(formattedNews);
          localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            data: formattedNews
          }));
        } else {
          setCommunityNews(defaultNews);
        }
      } catch (e) {
        console.error("Failed to fetch live news:", e);
        setCommunityNews(defaultNews);
      } finally {
        setIsNewsLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [lang, DEFAULT_CANADA_NEWS]);

  // --- Seeding Data (One-time check) ---
  useEffect(() => {
    const seedData = async () => {
      try {
        const bizSnap = await getDocs(query(collection(db, 'businesses'), limit(1)));
        if (bizSnap.empty) {
          const batch = writeBatch(db);
          INITIAL_BUSINESSES.forEach(b => {
            const newDoc = doc(collection(db, 'businesses'));
            const { id, ...data } = b;
            batch.set(newDoc, { ...data, verified: true, addedBy: 'admin' });
          });
          INITIAL_NOTIFICATIONS.forEach(n => {
            const newDoc = doc(collection(db, 'notifications'));
            const { id, ...data } = n;
            batch.set(newDoc, { ...data, approved: true });
          });
          INITIAL_EVENTS.forEach(e => {
            const newDoc = doc(collection(db, 'events'));
            const { id, ...data } = e;
            batch.set(newDoc, { ...data, approved: true });
          });
          INITIAL_BANNERS.forEach(b => {
            const newDoc = doc(collection(db, 'banners'));
            const { id, ...data } = b;
            batch.set(newDoc, { ...data, active: true });
          });
          INITIAL_CHAT_MESSAGES.forEach(m => {
            const newDoc = doc(collection(db, 'chat_messages'));
            const { id, ...data } = m;
            batch.set(newDoc, data);
          });
          INITIAL_COMMUNITIES.forEach(c => {
            const newDoc = doc(db, 'communities', c.id);
            const { id, ...data } = c;
            batch.set(newDoc, data);
          });
          INITIAL_FLYERS.forEach(f => {
            const newDoc = doc(collection(db, 'flyers'));
            const { id, ...data } = f;
            batch.set(newDoc, data);
          });
          INITIAL_PLACES.forEach(p => {
            const newDoc = doc(collection(db, 'places'));
            const { id, ...data } = p;
            batch.set(newDoc, { ...data, approved: true });
          });
          await batch.commit();
        }
      } catch (e) {
        console.warn('Seeding skipped or failed:', e);
      }
    };
    seedData();
  }, []);

  const activeBanners = useMemo(() => banners.filter(b => b.active), [banners]);
  
  const combinedBannerItems = useMemo(() => {
    return activeBanners.map(b => {
      const finalType = (b.type === 'news') ? 'news' : 'ad';
      return { ...b, type: finalType };
    });
  }, [activeBanners]);

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const t = translations[lang];

  useEffect(() => {
    if (combinedBannerItems.length > 0 && currentBannerIndex >= combinedBannerItems.length) {
      setCurrentBannerIndex(0);
    }
  }, [combinedBannerItems.length, currentBannerIndex]);

  useEffect(() => {
    if (selectedCategory === 'Landing' && combinedBannerItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex(prev => (prev + 1) % combinedBannerItems.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [selectedCategory, combinedBannerItems.length]);

   useEffect(() => {
    if (selectedCommunity) {
      setTimeout(() => {
        const el = document.getElementById('community-chat-room');
        if (el) {
          const yOffset = -80; 
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    }
  }, [selectedCommunity]);

  useEffect(() => {
    if (selectedCommunity) {
      setTimeout(() => {
        const container = document.getElementById('community-messages-container');
        if (container) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 200);
    }
  }, [communityMessages, selectedCommunity]);

  const forceRefresh = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('v', Date.now().toString());
    window.location.href = url.toString();
  };

  const resetHome = () => {
    setSelectedCategory('Landing');
    setSelectedCompanyCategory('All');
    setSelectedNotificationCategory('All');
    setSelectedNotificationCategoriesMulti([]);
    setSearchQuery('');
    setError(null);
    setIsNearbyMapOpen(false);
    setHomeNavSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHomeSection = (section: 'home' | 'events' | 'places') => {
    setSelectedCategory('Landing');
    setSelectedCompanyCategory('All');
    setSelectedNotificationCategory('All');
    setSelectedNotificationCategoriesMulti([]);
    setSearchQuery('');
    setError(null);
    setIsNearbyMapOpen(false);
    setHomeNavSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCompanyCategoriesPage = () => {
    setSelectedCategory('All');
    setSelectedCompanyCategory('All');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCompanyCategoryPage = (category: CategoryType) => {
    setSelectedCategory(category);
    setSelectedCompanyCategory(category);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSelectedCategory('Landing');
      setSelectedCommunity(null);
      setError(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChatImagePick = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setUploading: React.Dispatch<React.SetStateAction<boolean>>,
    setSelected: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const dataUrl = await compressChatImageFile(file);
      setSelected(dataUrl);
    } catch (err) {
      const msg = String((err as Error)?.message || err);
      if (msg.includes('image_too_large')) {
        showToast(
          lang === 'en'
            ? 'Image is still too large after compression. Please try a different one.'
            : 'Görsel sıkıştırılmasına rağmen çok büyük. Lütfen başka bir görsel deneyin.',
          'error',
        );
      } else {
        showToast(
          lang === 'en' ? 'Could not process image.' : 'Görsel işlenemedi.',
          'error',
        );
      }
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSendUserMessage = async () => {
    const content = userChatInputRef.current?.value.trim() || '';
    const imageUrl = userChatImageSelected;

    if (isUploadingUserChatImage) {
      showToast(
        lang === 'en' ? 'Please wait for the image to be processed.' : 'Lütfen görselin işlenmesini bekleyin.',
        'info',
      );
      return;
    }

    if ((!content && !imageUrl) || !currentUser) return;

    try {
      const payload = buildChatMessagePayload(content, imageUrl);
      const newMessage = {
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: userRole === 'owner' ? 'owner' : 'user',
        timestamp: Date.now(),
        userId: currentUser.id,
        ...payload,
      };
      await addDoc(collection(db, 'chat_messages'), newMessage);
      if (userChatInputRef.current) userChatInputRef.current.value = '';
      setUserChatImageSelected(null);
    } catch (e) {
      handleFirestoreError(e, 'create', 'chat_messages');
    }
  };

  const handleVerifyBusiness = async (bizId: string) => {
    if (userRole !== 'owner') return;

    // Optimistically update the state so changes are instantly reflected on screen
    setBusinesses(prev => prev.map(b => b.id === bizId ? { ...b, verified: true } : b));
    showToast(lang === 'en' ? 'Business verified!' : 'İşletme onaylandı!', 'success');

    try {
      await updateDoc(doc(db, 'businesses', bizId), {
        verified: true
      });
    } catch (err) {
      const errMsg = String(err?.message || err).toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('exceeded') || errMsg.includes('exhausted') || errMsg.includes('limit')) {
        setIsQuotaExceeded(true);
        console.warn("Firestore verify update failed due to quota limit. Reverted to local memory verification state.");
      } else {
        handleFirestoreError(err, 'update', `businesses/${bizId}`);
      }
    }
  };

  const handleUpdateNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotification) return;
    if (!editNotifTitle.trim()) {
      showToast(lang === 'en' ? 'Please enter a title' : 'Lütfen geçerli bir başlık girin', 'error');
      return;
    }

    const updatedNotif = {
      title: editNotifTitle.trim(),
      category: editNotifCategory,
      description: editNotifDescription.trim(),
      price: editNotifPrice.trim(),
      imageUrl: editNotifImages.length > 0 ? editNotifImages[0] : '',
      gallery: editNotifImages,
    };

    try {
      await updateDoc(doc(db, 'notifications', editingNotification.id), updatedNotif);
      setNotifications(prev => prev.map(n => n.id === editingNotification.id ? { ...n, ...updatedNotif } : n));
      showToast(lang === 'en' ? 'Post successfully updated!' : 'Duyuru/Gönderi başarıyla güncellendi!', 'success');
      setIsEditNotificationOpen(false);
      setEditingNotification(null);
    } catch (err) {
      handleFirestoreError(err, 'update', `notifications/${editingNotification.id}`);
    }
  };

  const handleDeleteNotification = async (notifId: string, skipConfirm = false) => {
    if (!skipConfirm && !window.confirm(lang === 'en' ? 'Are you sure you want to delete this announcement?' : 'Bu duyuruyu silmek istediğinizden emin misiniz?')) return;
    
    // Optimistic delete with rollback option
    const originalNotifs = [...notifications];
    setNotifications(prev => prev.filter(n => n.id !== notifId));
    
    try {
      await deleteDoc(doc(db, 'notifications', notifId));
      setSelectedNotification(null);
      showToast(lang === 'en' ? 'Announcement successfully deleted!' : 'Duyuru başarıyla silindi!', 'success');
    } catch (e) {
      setNotifications(originalNotifs);
      showToast(lang === 'en' ? 'Failed to delete announcement: Permission denied' : 'Duyuru silme başarısız: Yetkiniz bulunmuyor', 'error');
      handleFirestoreError(e, 'delete', `notifications/${notifId}`);
    }
  };

  const handleDeleteFlyer = async (flyerId: string, skipConfirm = false) => {
    if (!skipConfirm && !window.confirm(lang === 'en' ? 'Are you sure you want to delete this flyer?' : 'Bu flyer/broşürü silmek istediğinizden emin misiniz?')) return;
    
    // Optimistic delete with rollback option
    const originalFlyers = [...flyers];
    setFlyers(prev => prev.filter(f => f.id !== flyerId));
    
    try {
      await deleteDoc(doc(db, 'flyers', flyerId));
      showToast(lang === 'en' ? 'Flyer deleted successfully!' : 'Flyer başarıyla silindi!', 'success');
    } catch (e) {
      setFlyers(originalFlyers);
      showToast(lang === 'en' ? 'Failed to delete flyer: Permission denied' : 'Flyer silme başarısız: Yetkiniz bulunmuyor', 'error');
      handleFirestoreError(e, 'delete', `flyers/${flyerId}`);
    }
  };

  const handleFlyerImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1000; // Keep slightly smaller for fast document payload
          if (width > height) {
            if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
          } else {
            if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6); // 0.6 quality keeps it very light
          setNewFlyerImages(prev => [...prev, dataUrl]);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });

    e.target.value = ''; // Reset
  };

  const handleAddFlyerItem = () => {
    if (!tempItemNameTr.trim() || !tempItemNameEn.trim() || !tempItemNewPrice.trim()) {
      showToast(lang === 'en' ? 'Please fill out product name (TR/EN) and discounted price.' : 'Lütfen ürün adı (TR/EN) ve indirimli fiyat alanlarını doldurun.', 'error');
      return;
    }
    const newItem = {
      nameTr: tempItemNameTr,
      nameEn: tempItemNameEn,
      oldPrice: tempItemOldPrice || '-',
      newPrice: tempItemNewPrice
    };
    setNewFlyerItems(prev => [...prev, newItem]);
    
    // Clear temp states
    setTempItemNameTr('');
    setTempItemNameEn('');
    setTempItemOldPrice('');
    setTempItemNewPrice('');
  };

  const handleRemoveFlyerItem = (idx: number) => {
    setNewFlyerItems(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCreateFlyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlyerTitleTr.trim() || !newFlyerTitleEn.trim()) {
      showToast(lang === 'en' ? 'Please fill out flyer titles.' : 'Lütfen flyer başlıklarını doldurun.', 'error');
      return;
    }

    const flyerPayload = {
      titleTr: newFlyerTitleTr,
      titleEn: newFlyerTitleEn,
      badgeTr: newFlyerBadgeTr || (lang === 'tr' ? 'FIRSAT' : 'DEAL'),
      badgeEn: newFlyerBadgeEn || (lang === 'en' ? 'DEAL' : 'FIRSAT'),
      savings: newFlyerSavings || '30%',
      items: newFlyerItems,
      themeColor: newFlyerThemeColor,
      badgeColor: newFlyerBadgeColor,
      dateRangeTr: newFlyerDateRangeTr || 'Aktüel',
      dateRangeEn: newFlyerDateRangeEn || 'Live Now',
      images: newFlyerImages,
      createdAt: editingFlyer ? editingFlyer.createdAt : Date.now()
    };

    try {
      if (editingFlyer) {
        if (isQuotaExceeded) {
          setFlyers(prev => prev.map(f => f.id === editingFlyer.id ? { id: editingFlyer.id, ...flyerPayload } : f));
          showToast(lang === 'en' ? 'Updated locally due to database quota constraints.' : 'Kota sınırlaması nedeniyle yerel hafızada güncellendi.', 'success');
        } else {
          await updateDoc(doc(db, 'flyers', editingFlyer.id), flyerPayload);
          setFlyers(prev => prev.map(f => f.id === editingFlyer.id ? { id: editingFlyer.id, ...flyerPayload } : f));
          showToast(lang === 'en' ? 'Flyer successfully updated!' : 'Flyer başarıyla güncellendi!', 'success');
        }
      } else {
        if (isQuotaExceeded) {
          // Fallback local memory state update
          const tempId = `flyer_temp_${Date.now()}`;
          const finalFlyerObj = { id: tempId, ...flyerPayload };
          setFlyers(prev => [finalFlyerObj, ...prev]);
          showToast(lang === 'en' ? 'Added locally due to database quota constraints.' : 'Kota sınırlaması nedeniyle yerel hafızaya eklendi.', 'success');
        } else {
          const docRef = await addDoc(collection(db, 'flyers'), flyerPayload);
          const addedFlyer = { id: docRef.id, ...flyerPayload };
          // We'll update the state directly too (though standard realtime listener handles it, this ensures fast UI update)
          setFlyers(prev => {
            if (prev.some(f => f.id === addedFlyer.id)) return prev;
            return [addedFlyer, ...prev];
          });
          showToast(lang === 'en' ? 'Flyer successfully created!' : 'Flyer başarıyla oluşturuldu!', 'success');
        }
      }

      // Close modal & reset fields
      setIsAddFlyerOpen(false);
      setEditingFlyer(null);
      setNewFlyerTitleTr('');
      setNewFlyerTitleEn('');
      setNewFlyerBadgeTr('');
      setNewFlyerBadgeEn('');
      setNewFlyerSavings('');
      setNewFlyerDateRangeTr('');
      setNewFlyerDateRangeEn('');
      setNewFlyerThemeColor('bg-red-600');
      setNewFlyerBadgeColor('bg-yellow-400 text-red-950');
      setNewFlyerImages([]);
      setNewFlyerItems([]);
    } catch (err) {
      handleFirestoreError(err, editingFlyer ? 'update' : 'create', 'flyers');
    }
  };

  const handleApproveNotification = async (notifId: string) => {
    if (userRole !== 'owner') return;

    // Optimistically update the state so changes are instantly reflected on screen
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, approved: true } : n));
    showToast(lang === 'en' ? 'Announcement approved!' : 'Duyuru onaylandı!', 'success');

    try {
      await updateDoc(doc(db, 'notifications', notifId), {
        approved: true
      });
    } catch (err) {
      const errMsg = String(err?.message || err).toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('exceeded') || errMsg.includes('exhausted') || errMsg.includes('limit')) {
        setIsQuotaExceeded(true);
        console.warn("Firestore approve update failed due to quota limit. Reverted to local memory approval state.");
      } else {
        handleFirestoreError(err, 'update', `notifications/${notifId}`);
      }
    }
  };

  const handleSendAdminMessage = async () => {
    const content = adminChatInputRef.current?.value.trim() || '';
    const imageUrl = adminChatImageSelected;

    if (isUploadingAdminChatImage) {
      showToast(
        lang === 'en' ? 'Please wait for the image to be processed.' : 'Lütfen görselin işlenmesini bekleyin.',
        'info',
      );
      return;
    }

    if ((!content && !imageUrl) || !currentUser || !selectedChatUserId) return;

    try {
      const payload = buildChatMessagePayload(content, imageUrl);
      const newMessage = {
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: 'admin',
        timestamp: Date.now(),
        userId: selectedChatUserId,
        ...payload,
      };
      await addDoc(collection(db, 'chat_messages'), newMessage);
      if (adminChatInputRef.current) adminChatInputRef.current.value = '';
      setAdminChatImageSelected(null);
    } catch (e) {
      handleFirestoreError(e, 'create', 'chat_messages');
    }
  };
  
  const handleCommunityImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    void handleChatImagePick(e, setIsUploadingCommunityImage, setCommunityImageSelected);
  };

  const handleSendCommunityMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const input = form.elements.namedItem('message') as HTMLInputElement | null;
    const content = input ? input.value.trim() : '';

    if (isUploadingCommunityImage) {
      showToast(
        lang === 'en' 
          ? 'Please wait for the image to be processed.' 
          : 'Lütfen görselin yüklenmesini bekleyin.', 
        'info'
      );
      return;
    }
    
    if ((content || communityImageSelected) && currentUser && selectedCommunity) {
      if (currentUser.joinedCommunityId !== selectedCommunity.id) {
        showToast(
          lang === 'en' 
            ? 'You have not joined this community. Please join first.' 
            : 'Bu topluluğa katılmadınız. Lütfen önce katılın.',
          'error'
        );
        return;
      }

      const payload = buildChatMessagePayload(content, communityImageSelected);
      const newMessage: Omit<CommunityMessage, 'id'> = {
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderPhoto: currentUser.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=random`,
        timestamp: Date.now(),
        ...payload,
      };

      try {
        if (isQuotaExceeded) {
          const tempId = `msg_temp_${Date.now()}`;
          const finalMsg = { id: tempId, ...newMessage } as CommunityMessage;
          setCommunityMessages(prev => [...prev, finalMsg]);
          if (input) input.value = '';
          setCommunityImageSelected(null);
          showToast(
            lang === 'en' 
              ? 'Message posted locally (offline storage fallback)' 
              : 'Kota sınırı nedeniyle mesaj yerel olarak yayınlandı', 
            'success'
          );
          return;
        }

        await addDoc(collection(db, `communities/${selectedCommunity.id}/messages`), newMessage);
        if (input) input.value = '';
        setCommunityImageSelected(null);
      } catch (e) {
        const lower = String(e?.message || e).toLowerCase();
        if (lower.includes('quota') || lower.includes('exceeded') || lower.includes('exhausted') || lower.includes('limit')) {
          setIsQuotaExceeded(true);
          const tempId = `msg_temp_${Date.now()}`;
          const finalMsg = { id: tempId, ...newMessage } as CommunityMessage;
          setCommunityMessages(prev => [...prev, finalMsg]);
          if (input) input.value = '';
          setCommunityImageSelected(null);
        } else {
          handleFirestoreError(e, 'create', `communities/${selectedCommunity.id}/messages`);
        }
      }
    }
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingBannerImage(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_SIZE = 1200;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
          
          if (dataUrl.length > 1000000) {
            showToast(
              lang === 'en' 
                ? 'Banner image is still too large after compression. Please try a different one.' 
                : 'Banner görseli sıkıştırılmasına rağmen çok büyük. Lütfen başka bir görsel deneyin.', 
              'error'
            );
            setIsUploadingBannerImage(false);
            return;
          }
          
          setBannerImageSelected(dataUrl);
          setIsUploadingBannerImage(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEventImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingEventImg(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_SIZE = 1200;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
          
          if (dataUrl.length > 1000000) {
            showToast(
              lang === 'en' 
                ? 'Event image is too large. Please select another image.' 
                : 'Etkinlik görseli çok büyük. Lütfen başka bir görsel seçin.', 
              'error'
            );
            setIsUploadingEventImg(false);
            return;
          }
          
          setEventImageSelected(dataUrl);
          setIsUploadingEventImg(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingPlaceImg(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_SIZE = 1200;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
          
          if (dataUrl.length > 2500000) {
            showToast(
              lang === 'en' 
                ? 'Place image is too large. Please select another image.' 
                : 'Mekan görseli çok büyük. Lütfen başka bir görsel seçin.', 
              'error'
            );
            setIsUploadingPlaceImg(false);
            return;
          }
          
          setPlaceImageSelected(dataUrl);
          setIsUploadingPlaceImg(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    const remainingSlots = 50 - placeGallery.length;
    if (remainingSlots <= 0) {
      showToast(lang === 'en' ? 'Maximum 50 gallery images allowed' : 'Galeri için en fazla 50 görsel ekleyebilirsiniz', 'error');
      e.target.value = '';
      return;
    }

    const filesToProcess = files.slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      showToast(lang === 'en' 
        ? `Only ${remainingSlots} more images could be added. The extra ${files.length - remainingSlots} images were skipped.` 
        : `Sadece ${remainingSlots} adet daha görsel eklenebildi. Fazladan seçilen ${files.length - remainingSlots} görsel atlandı.`, 'info');
    }

    e.target.value = '';
    setIsUploadingPlaceGallery(true);

    let processedCount = 0;
    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 500;
          if (width > height) {
            if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
          } else {
            if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
          
          setPlaceGallery(prev => [...prev, dataUrl].slice(0, 50));
          processedCount++;
          if (processedCount === filesToProcess.length) {
            setIsUploadingPlaceGallery(false);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAutoTranslatePlaceFields = async () => {
    if (
      !placeHowToGetEn.trim() && !placeHowToGetTr.trim() &&
      !placeTipsEn.trim() && !placeTipsTr.trim() &&
      !placePriceEn.trim() && !placePriceTr.trim() &&
      !placeParkingEn.trim() && !placeParkingTr.trim()
    ) {
      showToast(
        lang === 'en' 
          ? 'Please enter text in at least one description field!' 
          : 'Lütfen önce açıklama alanlarından en az birine metin girin!',
        'info'
      );
      return;
    }

    setIsTranslatingPlace(true);
    try {
      const result = await translatePlaceFields({
        howToGetEn: placeHowToGetEn,
        howToGetTr: placeHowToGetTr,
        tipsEn: placeTipsEn,
        tipsTr: placeTipsTr,
        priceEn: placePriceEn,
        priceTr: placePriceTr,
        parkingEn: placeParkingEn,
        parkingTr: placeParkingTr,
      });

      if (result) {
        if (result.howToGetEn) setPlaceHowToGetEn(result.howToGetEn);
        if (result.howToGetTr) setPlaceHowToGetTr(result.howToGetTr);
        if (result.tipsEn) setPlaceTipsEn(result.tipsEn);
        if (result.tipsTr) setPlaceTipsTr(result.tipsTr);
        if (result.priceEn) setPlacePriceEn(result.priceEn);
        if (result.priceTr) setPlacePriceTr(result.priceTr);
        if (result.parkingEn) setPlaceParkingEn(result.parkingEn);
        if (result.parkingTr) setPlaceParkingTr(result.parkingTr);

        showToast(
          lang === 'en'
            ? 'Bilingual fields translated successfully with Gemini AI!'
            : 'İki dilli alanlar Gemini AI ile otomatik olarak çevrildi!',
          'success'
        );
      }
    } catch (err) {
      console.error(err);
      showToast(
        lang === 'en'
          ? 'Translation failed. Please try again or write manually.'
          : 'Çeviri başarısız oldu. Lütfen tekrar deneyin veya elle girin.',
        'error'
      );
    } finally {
      setIsTranslatingPlace(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) {
      showToast(lang === 'en' ? 'Please enter an event title' : 'Lütfen etkinlik başlığı girin', 'error');
      return;
    }
    if (!eventDate.trim()) {
      showToast(lang === 'en' ? 'Please enter event date' : 'Lütfen etkinlik tarihi seçin/girin', 'error');
      return;
    }
    if (!eventLocation.trim()) {
      showToast(lang === 'en' ? 'Please enter event location' : 'Lütfen etkinlik konumu girin', 'error');
      return;
    }

    let finalUrl = eventImageSelected || eventImageUrl.trim();
    let isAutoImage = false;
    if (!finalUrl) {
      finalUrl = getBannerImageUrl(eventTitle.trim(), eventDescription.trim() || 'festival');
      isAutoImage = true;
    }

    try {
      const newEvent: Omit<Event, 'id'> = {
        title: eventTitle.trim(),
        date: eventDate.trim(),
        location: eventLocation.trim(),
        description: eventDescription.trim(),
        organizer: eventOrganizer.trim() || (lang === 'en' ? 'Community Committee' : 'Topluluk Komitesi'),
        imageUrl: finalUrl,
        approved: true
      };

      if (editingEvent) {
        await updateDoc(doc(db, 'events', editingEvent.id), newEvent);
        showToast(lang === 'en' ? 'Event successfully updated!' : 'Etkinlik başarıyla güncellendi!', 'success');
      } else {
        await addDoc(collection(db, 'events'), newEvent);
        const successMsg = lang === 'en'
          ? (isAutoImage ? 'Event added with auto-topic visual!' : 'Event created successfully')
          : (isAutoImage ? 'Etkinlik otomatik konu görseli ile başarıyla eklendi!' : 'Etkinlik başarıyla oluşturuldu');
        showToast(successMsg, 'success');
      }
      
      setEventTitle('');
      setEventDate('');
      setEventLocation('');
      setEventDescription('');
      setEventOrganizer('');
      setEventImageUrl('');
      setEventImageSelected(null);
      setEditingEvent(null);
      setIsAddEventOpen(false);
    } catch (err) {
      handleFirestoreError(err, editingEvent ? 'update' : 'create', 'events');
    }
  };

  const handleDeleteEvent = async (eventId: string, skipConfirm = false) => {
    if (skipConfirm || window.confirm(lang === 'en' ? 'Are you sure you want to delete this event?' : 'Bu etkinliği silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'events', eventId));
        showToast(lang === 'en' ? 'Event deleted successfully' : 'Etkinlik başarıyla silindi', 'success');
      } catch (err) {
        showToast(lang === 'en' ? 'Failed to delete event: Permission denied' : 'Etkinlik silme başarısız: Yetkiniz bulunmuyor', 'error');
        handleFirestoreError(err, 'delete', `events/${eventId}`);
      }
    }
  };

  const handleToggleEventApproval = async (eventId: string, currentApproved: boolean) => {
    try {
      await updateDoc(doc(db, 'events', eventId), { approved: !currentApproved });
      showToast(
        lang === 'en' 
          ? `Event status updated successfully` 
          : `Etkinlik durumu başarıyla güncellendi`, 
        'success'
      );
    } catch (err) {
      handleFirestoreError(err, 'update', `events/${eventId}`);
    }
  };

  const handleCreatePlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeName.trim() || !placeProvince.trim()) {
      showToast(lang === 'en' ? 'Name and Province are required' : 'İsim ve Bölge alanları zorunludur', 'error');
      return;
    }

    let finalImg = placeImageSelected || placeImgUrl.trim();
    if (!finalImg) {
      finalImg = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=450&q=80';
    }

    try {
      const newPlace = {
        name: placeName.trim(),
        province: placeProvince.trim(),
        img: finalImg,
        address: placeAddress.trim(),
        howToGet: placeHowToGetEn.trim(),
        howToGetTr: placeHowToGetTr.trim(),
        tips: placeTipsEn.trim(),
        tipsTr: placeTipsTr.trim(),
        price: placePriceEn.trim(),
        priceTr: placePriceTr.trim(),
        parking: placeParkingEn.trim(),
        parkingTr: placeParkingTr.trim(),
        website: placeWebsiteUrl.trim() ? (/^https?:\/\//i.test(placeWebsiteUrl.trim()) ? placeWebsiteUrl.trim() : 'https://' + placeWebsiteUrl.trim()) : '',
        gallery: placeGallery,
        category: placeCategory,
        approved: true,
        createdAt: editingPlace ? editingPlace.createdAt : Date.now()
      };

      if (editingPlace) {
        await updateDoc(doc(db, 'places', editingPlace.id), newPlace);
        showToast(lang === 'en' ? 'Place successfully updated!' : 'Gezilecek yer başarıyla güncellendi!', 'success');
      } else {
        await addDoc(collection(db, 'places'), newPlace);
        showToast(lang === 'en' ? 'Place added successfully' : 'Gezilecek yer başarıyla eklendi', 'success');
      }
      
      // Clear states
      setPlaceName('');
      setPlaceProvince('');
      setPlaceAddress('');
      setPlaceImgUrl('');
      setPlaceImageSelected(null);
      setPlaceHowToGetEn('');
      setPlaceHowToGetTr('');
      setPlaceTipsEn('');
      setPlaceTipsTr('');
      setPlacePriceEn('');
      setPlacePriceTr('');
      setPlaceParkingEn('');
      setPlaceParkingTr('');
      setPlaceWebsiteUrl('');
      setPlaceGallery([]);
      setPlaceCategory(PlaceCategory.CITY);
      setEditingPlace(null);
      setIsAddPlaceOpen(false);
    } catch (err) {
      handleFirestoreError(err, editingPlace ? 'update' : 'create', 'places');
    }
  };

  const handleDeletePlace = async (placeId: string, skipConfirm = false) => {
    if (skipConfirm || window.confirm(lang === 'en' ? 'Are you sure you want to delete this place?' : 'Bu yeri silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'places', placeId));
        showToast(lang === 'en' ? 'Place deleted successfully' : 'Gezilecek yer başarıyla silindi', 'success');
      } catch (err) {
        showToast(lang === 'en' ? 'Failed to delete place: Permission denied' : 'Gezilecek yer silme başarısız: Yetkiniz bulunmuyor', 'error');
        handleFirestoreError(err, 'delete', `places/${placeId}`);
      }
    }
  };

  const handleTogglePlaceApproval = async (placeId: string, currentApproved: boolean) => {
    try {
      await updateDoc(doc(db, 'places', placeId), { approved: !currentApproved });
      showToast(
        lang === 'en' 
          ? `Status updated successfully` 
          : `Durum başarıyla güncellendi`, 
        'success'
      );
    } catch (err) {
      handleFirestoreError(err, 'update', `places/${placeId}`);
    }
  };

  const handleCreateBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle.trim()) {
      showToast(lang === 'en' ? 'Please enter a title' : 'Lütfen bir başlık girin', 'error');
      return;
    }

    let finalUrl = bannerImageSelected || bannerUrl.trim();
    let isAutoImage = false;
    if (!finalUrl) {
      finalUrl = getBannerImageUrl(bannerTitle.trim(), bannerDesc.trim());
      isAutoImage = true;
    }

    try {
      const newBanner: Omit<BannerAd, 'id'> & { mediaType?: string; desc?: string; content?: string } = {
        title: bannerTitle.trim(),
        desc: bannerDesc.trim(),
        content: bannerContent.trim(),
        url: finalUrl,
        type: editingBanner ? editingBanner.type : 'image',
        mediaType: 'image',
        link: bannerLink.trim() ? (bannerLink.trim() === '#' ? '#' : (/^https?:\/\//i.test(bannerLink.trim()) ? bannerLink.trim() : 'https://' + bannerLink.trim())) : '#',
        active: editingBanner ? editingBanner.active : true
      };

      if (editingBanner) {
        await updateDoc(doc(db, 'banners', editingBanner.id), newBanner);
        showToast(lang === 'en' ? 'Banner successfully updated!' : 'Banner başarıyla güncellendi!', 'success');
      } else {
        await addDoc(collection(db, 'banners'), newBanner);
        const successMsg = lang === 'en'
          ? (isAutoImage ? 'Banner added with auto-generated topic visual!' : 'Banner added successfully')
          : (isAutoImage ? 'Banner otomatik konu görseli atanamasıyla başarıyla eklendi!' : 'Banner başarıyla eklendi');
        showToast(successMsg, 'success');
      }
      
      setBannerTitle('');
      setBannerDesc('');
      setBannerContent('');
      setBannerLink('');
      setBannerUrl('');
      setBannerImageSelected(null);
      setEditingBanner(null);
      setIsAddBannerOpen(false);
    } catch (err) {
      handleFirestoreError(err, editingBanner ? 'update' : 'create', 'banners');
    }
  };

  const handleToggleBannerActive = async (bannerId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'banners', bannerId), {
        active: !currentStatus
      });
      showToast(lang === 'en' ? 'Banner status updated' : 'Banner durumu güncellendi', 'success');
    } catch (err) {
      handleFirestoreError(err, 'update', `banners/${bannerId}`);
    }
  };

  const handleDeleteBanner = async (bannerId: string, skipConfirm = false) => {
    if (!skipConfirm && !confirm(lang === 'en' ? 'Are you sure you want to delete this banner?' : 'Bu banner silinsin mi?')) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'banners', bannerId));
      showToast(lang === 'en' ? 'Banner deleted' : 'Banner silindi', 'success');
    } catch (err) {
      showToast(lang === 'en' ? 'Failed to delete banner: Permission denied' : 'Banner silme başarısız: Yetkiniz bulunmuyor', 'error');
      handleFirestoreError(err, 'delete', `banners/${bannerId}`);
    }
  };

  const handleToggleIncludeLiveNews = async (currentStatus: boolean) => {
    try {
      await setDoc(doc(db, 'settings', 'banners_config'), {
        includeLiveNews: !currentStatus
      }, { merge: true });
      showToast(
        lang === 'en' 
          ? `Live news is now ${!currentStatus ? 'included' : 'excluded'} in banners` 
          : `Gündem haberleri bannerda artık ${!currentStatus ? 'gösterilecek' : 'gösterilmeyecek'}`, 
        'success'
      );
    } catch (err) {
      handleFirestoreError(err, 'update', 'settings/banners_config');
    }
  };

  const getUnsplashImageForCategory = (category: string) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('immig') || cat.includes('göç')) {
      return 'https://images.unsplash.com/photo-1544013589-444e26c6d044?auto=format&fit=crop&w=1200&q=80'; // dynamic elegant landscape
    }
    if (cat.includes('econ') || cat.includes('fin') || cat.includes('ekon') || cat.includes('para') || cat.includes('is')) {
      return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'; // business/finance
    }
    if (cat.includes('comm') || cat.includes('topluluk') || cat.includes('cult') || cat.includes('kült')) {
      return 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80'; // community/people
    }
    return 'https://images.unsplash.com/photo-1503424886307-b090341d25d1?auto=format&fit=crop&w=1200&q=80'; // default toronto architecture
  };

  const handleFetchSuggestedNews = async () => {
    setIsFetchingSuggestedNews(true);
    try {
      const news = await getLatestCanadaTurkishNews(lang);
      if (news && news.length > 0) {
        setSuggestedNews(news);
        showToast(
          lang === 'en' 
            ? 'Latest Canada-Turkish news fetched successfully!' 
            : 'Kanada-Türk toplumu güncel haberleri başarıyla getirildi!', 
          'success'
        );
      } else {
        showToast(
          lang === 'en' 
            ? 'No news found, falling back to curated list...' 
            : 'Güncel haber bulunamadı, arşiv haberler yükleniyor...', 
          'info'
        );
        setSuggestedNews(DEFAULT_CANADA_NEWS);
      }
    } catch (err) {
      console.error("Error fetching admin suggested news:", err);
      showToast(lang === 'en' ? 'Error scanning news' : 'Haberler taranırken hata oluştu', 'error');
    } finally {
      setIsFetchingSuggestedNews(false);
    }
  };

  const handleApproveNewsItem = async (newsItem: any) => {
    try {
      const newBanner: Omit<BannerAd, 'id'> & { createdAt: number; mediaType?: string; desc?: string; content?: string } = {
        title: newsItem.title || '',
        desc: newsItem.desc || newsItem.category || '',
        content: newsItem.content || '',
        url: newsItem.url || getUnsplashImageForCategory(newsItem.category || ''),
        type: 'news',
        mediaType: 'image',
        link: newsItem.link || '#',
        active: true,
        createdAt: Date.now()
      };
      await addDoc(collection(db, 'banners'), newBanner);
      showToast(
        lang === 'en' 
          ? 'News approved and published to homepage banners!' 
          : 'Haber başarıyla onaylandı ve ana sayfa döngüsüne eklendi!', 
        'success'
      );
    } catch (err) {
      console.error("Error approving news item:", err);
      showToast(lang === 'en' ? 'Failed to approve news' : 'Haber onaylanamadı', 'error');
    }
  };

  const handleJoinCommunity = async (communityId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    // 2-month (60 days) community join / switch restriction
    const lastJoinedAt = currentUser.joinedCommunityAt;
    const lastJoinedId = currentUser.lastJoinedCommunityId;
    
    if (lastJoinedAt && lastJoinedId && lastJoinedId !== communityId) {
      const elapsed = Date.now() - lastJoinedAt;
      const TWO_MONTHS_MS = 60 * 24 * 60 * 60 * 1000; // 60 days
      if (elapsed < TWO_MONTHS_MS) {
        const remainingDays = Math.ceil((TWO_MONTHS_MS - elapsed) / (24 * 60 * 60 * 1000));
        showToast(
          lang === 'en'
            ? `You can join a different community only after 2 months. Remaining: ${remainingDays} days.`
            : `Farklı bir topluluğa ancak 2 ayda bir katılabilirsiniz. Kalan: ${remainingDays} gün.`,
          'error'
        );
        return;
      }
    }

    try {
      const now = Date.now();
      await setDoc(doc(db, 'users', currentUser.id), {
        joinedCommunityId: communityId,
        joinedCommunityAt: now,
        lastJoinedCommunityId: communityId
      }, { merge: true });
      
      setCurrentUser((prev: any) => prev ? { 
        ...prev, 
        joinedCommunityId: communityId,
        joinedCommunityAt: now,
        lastJoinedCommunityId: communityId 
      } : null);
      
      showToast(
        lang === 'en' 
          ? 'Successfully joined the community!' 
          : 'Topluluğa başarıyla katıldınız!', 
        'success'
      );
    } catch (e) {
      handleFirestoreError(e, 'update', 'users');
    }
  };

  const handleLeaveCommunity = async () => {
    if (!currentUser) return;
    try {
      await setDoc(doc(db, 'users', currentUser.id), {
        joinedCommunityId: null
      }, { merge: true });
      
      setCurrentUser((prev: any) => {
        if (!prev) return null;
        const copy = { ...prev };
        delete copy.joinedCommunityId;
        return copy;
      });

      showToast(
        lang === 'en' 
          ? 'Successfully left the community.' 
          : 'Topluluktan başarıyla ayrıldınız.', 
        'success'
      );
    } catch (e) {
      handleFirestoreError(e, 'update', 'users');
    }
  };

  const handleUpdateBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser || !editingBusiness || isUpdatingBusiness) return;

    const formData = new FormData(e.currentTarget);

    setIsUpdatingBusiness(true);
    try {
      const resolvedMedia = await resolveBusinessMediaForSave(
        currentUser.id,
        businessImageUrlPreview || editingBusiness.imageUrl,
        businessGallery,
        editingBusiness.imageUrl || DEFAULT_BUSINESS_IMAGE,
      );

      const updatedBusiness = {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        address: businessFormLocation.address.trim(),
        phone: formData.get('phone') as string,
        description: formData.get('description') as string,
        imageUrl: resolvedMedia.imageUrl,
        gallery: resolvedMedia.gallery,
        ...(typeof businessFormLocation.latitude === 'number' && typeof businessFormLocation.longitude === 'number'
          ? {
              latitude: businessFormLocation.latitude,
              longitude: businessFormLocation.longitude,
            }
          : {}),
      };

      await updateDoc(doc(db, 'businesses', editingBusiness.id), updatedBusiness);
      setBusinesses((prev) =>
        prev.map((biz) => (biz.id === editingBusiness.id ? { ...biz, ...updatedBusiness } : biz)),
      );
      setIsEditBusinessModalOpen(false);
      setEditingBusiness(null);
      setBusinessImageUrlPreview('');
      setBusinessGallery([]);

      if (selectedBusiness?.id === editingBusiness.id) {
        setSelectedBusiness({ ...selectedBusiness, ...updatedBusiness });
      }

      showToast(lang === 'en' ? 'Business updated successfully.' : 'İşletme başarıyla güncellendi.', 'success');
    } catch (err) {
      console.error('Business update failed', err);
      const errMsg = String((err as Error)?.message || err).toLowerCase();
      if (errMsg.includes('image_too_large')) {
        showToast(
          lang === 'en' ? 'One of the images is too large (max 5 MB).' : 'Görsellerden biri çok büyük (maks. 5 MB).',
          'error',
        );
      } else if (errMsg.includes('storage') || errMsg.includes('unauthorized')) {
        showToast(
          lang === 'en'
            ? 'Could not upload photos. Check your connection and try again.'
            : 'Fotoğraflar yüklenemedi. Bağlantınızı kontrol edip tekrar deneyin.',
          'error',
        );
      } else {
        handleFirestoreError(err, 'update', `businesses/${editingBusiness.id}`);
      }
    } finally {
      setIsUpdatingBusiness(false);
    }
  };

  const handleDeleteBusiness = async () => {
    if (!currentUser || !editingBusiness) return;
    try {
      await deleteDoc(doc(db, 'businesses', editingBusiness.id));
      showToast(lang === 'en' ? 'Business successfully deleted.' : 'İşletme başarıyla silindi.', 'success');
      setIsEditBusinessModalOpen(false);
      setEditingBusiness(null);
      setBusinessImageUrlPreview('');
      setBusinessGallery([]);
      setIsDeleteConfirming(false);
      
      if (selectedBusiness?.id === editingBusiness.id) {
        setSelectedBusiness(null);
        setIsBusinessDetailModalOpen(false);
      }
    } catch (err) {
      showToast(lang === 'en' ? 'Failed to delete business: Permission denied' : 'İşletme silme başarısız: Yetkiniz bulunmuyor', 'error');
      handleFirestoreError(err, 'delete', `businesses/${editingBusiness.id}`);
    }
  };

  const BUSINESS_AUTH_EXEMPT_EMAILS = new Set([
    'songululuca02@gmail.com',
    'admin@goofind.ca',
    'admin@admin.com',
  ]);

  const isBusinessAuthExempt = (
    email?: string | null,
    providerData?: FirebaseUser['providerData'],
    role: string = userRole,
  ) => {
    if (role === 'owner') return true;
    if (providerData?.some((p) => p.providerId === 'google.com')) return true;
    return !!email && BUSINESS_AUTH_EXEMPT_EMAILS.has(email.toLowerCase());
  };

  const syncCurrentUserFromAuth = (user: FirebaseUser) => {
    setCurrentUser({
      id: user.uid,
      name: user.displayName || 'User',
      email: user.email || '',
      photoUrl:
        user.photoURL ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=random`,
      emailVerified: user.emailVerified,
      providerData: user.providerData,
    });
  };

  const ensureFreshAuthVerification = async (): Promise<boolean> => {
    const user = auth.currentUser;
    if (!user) return false;

    if (isBusinessAuthExempt(user.email, user.providerData, userRole)) {
      return true;
    }

    try {
      await reload(user);
      await user.getIdToken(true);
      const refreshed = auth.currentUser;
      if (!refreshed) return false;
      syncCurrentUserFromAuth(refreshed);
      return refreshed.emailVerified;
    } catch (err) {
      console.warn('Could not refresh auth verification status', err);
      return user.emailVerified;
    }
  };

  const getFirebaseErrorCode = (err: unknown): string => {
    if (err && typeof err === 'object' && 'code' in err) {
      return String((err as { code?: string }).code || '');
    }
    return '';
  };

  const getBusinessSaveErrorMessage = (err: unknown): string => {
    const code = getFirebaseErrorCode(err);
    const rawMsg = String((err as Error)?.message || err);
    const errMsg = rawMsg.toLowerCase();

    if (code === 'permission-denied' || errMsg.includes('permission') || errMsg.includes('insufficient')) {
      return lang === 'en'
        ? 'Permission denied. Sign out, sign in again, then save.'
        : 'Yetki reddedildi. Çıkış yapıp tekrar giriş yapın ve kaydedin.';
    }
    if (code.startsWith('storage/') || errMsg.includes('storage')) {
      return lang === 'en'
        ? 'Photo upload failed. Your business info can still be saved — try again without photos.'
        : 'Fotoğraf yüklemesi başarısız. Fotoğrafsız kaydetmeyi deneyin.';
    }
    if (
      code === 'invalid-argument' ||
      errMsg.includes('undefined') ||
      errMsg.includes('size') ||
      errMsg.includes('maximum allowed') ||
      errMsg.includes('payload')
    ) {
      return lang === 'en'
        ? 'Data is too large or invalid. Try again with fewer or smaller photos.'
        : 'Veri çok büyük veya geçersiz. Daha az veya küçük fotoğrafla tekrar deneyin.';
    }
    if (code === 'unavailable' || errMsg.includes('network') || errMsg.includes('offline')) {
      return lang === 'en'
        ? 'Network error. Check your connection and try again.'
        : 'Bağlantı hatası. İnterneti kontrol edip tekrar deneyin.';
    }
    if (code) {
      return lang === 'en'
        ? `Could not save business (${code}). Please try again.`
        : `İşletme kaydedilemedi (${code}). Lütfen tekrar deneyin.`;
    }
    if (rawMsg && rawMsg !== '[object Object]') {
      return lang === 'en'
        ? `Could not save business: ${rawMsg}`
        : `İşletme kaydedilemedi: ${rawMsg}`;
    }
    return lang === 'en'
      ? 'Could not save business. Please try again.'
      : 'İşletme kaydedilemedi. Lütfen tekrar deneyin.';
  };

  const sanitizeBusinessPayloadForFirestore = <T extends {
    imageUrl?: string;
    gallery?: string[];
  }>(payload: T, options?: { stripAllImages?: boolean }) => {
    const stripAllImages = options?.stripAllImages ?? false;
    const imageUrl =
      !stripAllImages && payload.imageUrl?.startsWith('http') ? payload.imageUrl : DEFAULT_BUSINESS_IMAGE;
    const gallery = stripAllImages
      ? []
      : (payload.gallery || []).filter((url) => typeof url === 'string' && url.startsWith('http')).slice(0, 5);

    return {
      ...payload,
      imageUrl,
      gallery,
    };
  };

  const prepareFirestoreBusinessDoc = (payload: Record<string, unknown>) => {
    const cleaned = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined),
    ) as Record<string, unknown>;

    const sanitized = sanitizeBusinessPayloadForFirestore(cleaned as {
      imageUrl?: string;
      gallery?: string[];
    });

    return Object.fromEntries(
      Object.entries(sanitized).filter(([, value]) => value !== undefined),
    ) as Record<string, unknown>;
  };

  const refreshAuthSession = async (): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) return null;
    try {
      await reload(user);
      await user.getIdToken(true);
      syncCurrentUserFromAuth(auth.currentUser || user);
      return (auth.currentUser || user).uid;
    } catch (err) {
      console.warn('Could not refresh auth session before business save', err);
      return user.uid;
    }
  };

  const writeBusinessToFirestore = async (
    payload: Record<string, unknown>,
    options?: { stripAllImages?: boolean; retryOnPermissionDenied?: boolean },
  ) => {
    const prepared = prepareFirestoreBusinessDoc(
      options?.stripAllImages
        ? sanitizeBusinessPayloadForFirestore(payload, { stripAllImages: true })
        : payload,
    );

    const attemptWrite = async () => addDoc(collection(db, 'businesses'), prepared);

    try {
      return await attemptWrite();
    } catch (writeErr) {
      const code = getFirebaseErrorCode(writeErr);
      const errMsg = String((writeErr as Error)?.message || writeErr).toLowerCase();
      const looksTooLarge =
        code === 'invalid-argument' ||
        errMsg.includes('size') ||
        errMsg.includes('maximum allowed') ||
        errMsg.includes('payload');

      if (code === 'permission-denied' && options?.retryOnPermissionDenied !== false) {
        const refreshedOwnerId = await refreshAuthSession();
        if (refreshedOwnerId) {
          prepared.ownerId = refreshedOwnerId;
          try {
            return await attemptWrite();
          } catch (retryErr) {
            throw retryErr;
          }
        }
      }

      if (!looksTooLarge) throw writeErr;

      const minimal = prepareFirestoreBusinessDoc(
        sanitizeBusinessPayloadForFirestore(payload, { stripAllImages: true }),
      );
      const docRef = await addDoc(collection(db, 'businesses'), minimal);
      showToast(
        lang === 'en'
          ? 'Uploaded photos were too large. Your business was saved without photos.'
          : 'Yüklenen fotoğraflar çok büyüktü. İşletme fotoğrafsız kaydedildi.',
        'info',
      );
      return docRef;
    }
  };

  const handleRegisterBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerBusinessLockRef.current || isRegisteringBusiness) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!currentUser || !auth.currentUser) {
      showToast(lang === 'en' ? 'Please sign in to register a business.' : 'İşletme kaydetmek için giriş yapın.', 'error');
      return;
    }

    registerBusinessLockRef.current = true;
    setIsRegisteringBusiness(true);

    try {
      await refreshAuthSession();

      const canRegisterBusiness = await ensureFreshAuthVerification();
      if (!canRegisterBusiness && !auth.currentUser) {
        showToast(
          lang === 'en'
            ? 'Please sign in again before saving your business.'
            : 'Kaydetmeden önce tekrar giriş yapın.',
          'error',
        );
        return;
      }

      const address = businessFormLocation.address.trim();
      if (!address) {
        showToast(lang === 'en' ? 'Please enter and select an address.' : 'Lütfen adres girin ve listeden seçin.', 'error');
        return;
      }

      const finishBusinessRegistration = (businessWithId: Business) => {
        setBusinesses((prev) => {
          const exists = prev.some(
            (b) => b.id === businessWithId.id || (b.ownerId === businessWithId.ownerId && b.name === businessWithId.name),
          );
          if (exists) {
            return prev.map((b) => (b.ownerId === businessWithId.ownerId ? businessWithId : b));
          }
          return [businessWithId, ...prev];
        });

        setShowBusinessSuccess(true);
        setTimeout(() => {
          setIsBusinessRegistrationModalOpen(false);
          setShowBusinessSuccess(false);
          setBusinessImageUrlPreview('');
          setBusinessGallery([]);
          setBusinessFormLocation({ address: '' });
          setUserRole('owner');
        }, 2000);
      };

      const localExisting = businesses.find((b) => b.ownerId === currentUser.id);
      if (localExisting) {
        showToast(
          lang === 'en' ? 'Your business is already registered.' : 'İşletmeniz zaten kayıtlı.',
          'info',
        );
        finishBusinessRegistration(localExisting);
        return;
      }

      try {
        const ownedSnap = await getDocs(
          query(collection(db, 'businesses'), where('ownerId', '==', currentUser.id), limit(1)),
        );
        if (!ownedSnap.empty) {
          const existingDoc = ownedSnap.docs[0];
          const existingBusiness = { id: existingDoc.id, ...existingDoc.data() } as Business;
          showToast(
            lang === 'en' ? 'Your business is already registered.' : 'İşletmeniz zaten kayıtlı.',
            'info',
          );
          finishBusinessRegistration(existingBusiness);
          return;
        }
      } catch (lookupErr) {
        console.warn('Could not verify existing business before registration', lookupErr);
      }

      const ownerId = auth.currentUser?.uid || currentUser.id;
      if (!ownerId) {
        showToast(
          lang === 'en'
            ? 'Please sign in again before saving your business.'
            : 'Kaydetmeden önce tekrar giriş yapın.',
          'error',
        );
        return;
      }

      const newBusiness = {
        name: (formData.get('name') as string)?.trim(),
        category: formData.get('category') as CategoryType,
        address,
        phone: (formData.get('phone') as string)?.trim(),
        description: (formData.get('description') as string)?.trim() || '',
        imageUrl:
          businessImageUrlPreview ||
          (formData.get('imageUrl') as string) ||
          DEFAULT_BUSINESS_IMAGE,
        rating: 0,
        reviews: [],
        viewCount: 0,
        verified: false,
        addedBy: 'user' as const,
        ownerId,
        gallery: businessGallery,
        ...(typeof businessFormLocation.latitude === 'number' && typeof businessFormLocation.longitude === 'number'
          ? {
              latitude: businessFormLocation.latitude,
              longitude: businessFormLocation.longitude,
            }
          : {}),
      };

      if (!newBusiness.name) {
        showToast(lang === 'en' ? 'Business name is required.' : 'İşletme adı gerekli.', 'error');
        return;
      }

      if (!newBusiness.category) {
        showToast(lang === 'en' ? 'Please select an industry.' : 'Lütfen bir sektör seçin.', 'error');
        return;
      }

      const coverSource = businessImageUrlPreview || (formData.get('imageUrl') as string) || '';
      const hasPhotoUploads =
        coverSource.trim().startsWith('data:image/') ||
        businessGallery.some((item) => item.trim().startsWith('data:image/'));

      const businessToSave = {
        ...newBusiness,
        imageUrl: coverSource.trim().startsWith('http') ? coverSource.trim() : DEFAULT_BUSINESS_IMAGE,
        gallery: businessGallery.filter((url) => url.trim().startsWith('http')).slice(0, 5),
      };

      let docId = Math.random().toString(36).substring(2, 9);
      try {
        const docRef = await writeBusinessToFirestore(businessToSave);
        docId = docRef.id;

        if (hasPhotoUploads) {
          try {
            const resolvedMedia = await resolveBusinessMediaForSave(
              ownerId,
              coverSource,
              businessGallery,
              DEFAULT_BUSINESS_IMAGE,
            );
            if (
              resolvedMedia.imageUrl !== businessToSave.imageUrl ||
              resolvedMedia.gallery.length > 0
            ) {
              await updateDoc(doc(db, 'businesses', docId), {
                imageUrl: resolvedMedia.imageUrl,
                gallery: resolvedMedia.gallery,
              });
              businessToSave.imageUrl = resolvedMedia.imageUrl;
              businessToSave.gallery = resolvedMedia.gallery;
            }
            if (resolvedMedia.uploadFailed) {
              showToast(
                lang === 'en'
                  ? 'Business saved. Photos could not be uploaded yet — you can add them later.'
                  : 'İşletme kaydedildi. Fotoğraflar şimdilik yüklenemedi — sonra ekleyebilirsiniz.',
                'info',
              );
            }
          } catch (photoErr) {
            console.warn('Business saved, but photo upload failed', photoErr);
            showToast(
              lang === 'en'
                ? 'Business saved. Photos could not be uploaded — you can add them later.'
                : 'İşletme kaydedildi. Fotoğraflar yüklenemedi — sonra ekleyebilirsiniz.',
              'info',
            );
          }
        }
      } catch (writeErr: unknown) {
        const errMsg = String((writeErr as Error)?.message || writeErr).toLowerCase();
        const errCode = getFirebaseErrorCode(writeErr);
        if (errMsg.includes('quota') || errMsg.includes('exceeded') || errMsg.includes('exhausted') || errMsg.includes('limit')) {
          setIsQuotaExceeded(true);
          console.warn('Firestore write failed due to quota limit. Saving to local state for demo purposes.');
          showToast(
            lang === 'en'
              ? 'Database limit reached! Business saved to temporary local session memory.'
              : 'Veritabanı sınırı aşıldı! İşletme geçici yerel oturum belleğine kaydedildi.',
            'info',
          );
        } else {
          console.error('Business Firestore write failed', writeErr);
          showToast(getBusinessSaveErrorMessage(writeErr), 'error');
          return;
        }
      }

      finishBusinessRegistration({ id: docId, ...businessToSave });
    } catch (err) {
      console.error('Business registration failed', err);
      const code = getFirebaseErrorCode(err);
      if (code) console.error('Firebase error code:', code);
      showToast(getBusinessSaveErrorMessage(err), 'error');
    } finally {
      registerBusinessLockRef.current = false;
      setIsRegisteringBusiness(false);
    }
  };

  const handleAddReview = async (businessId: string, rating: number, comment: string, images?: string[]) => {
    if (!currentUser) return false;
    const business = businesses.find(b => b.id === businessId);
    if (!business) return false;

    const newReview: Review = {
      id: Math.random().toString(36).substring(2, 9),
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
      images: images || [],
      date: new Date().toISOString()
    };

    const reviews = Array.isArray(business.reviews) ? business.reviews : [];
    const updatedReviews = [...reviews, newReview];
    const newRating = Number((updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length).toFixed(1));

    try {
      await updateDoc(doc(db, 'businesses', businessId), {
        reviews: updatedReviews,
        rating: newRating
      });
      return true;
    } catch (err) {
      handleFirestoreError(err, 'update', `businesses/${businessId}`);
      return false;
    }
  };

  const handleUpdateProfilePicture = async (imageUrl: string) => {
    if (!currentUser?.id) return;
    setIsUploadingAvatar(true);
    try {
      await setDoc(doc(db, 'users', currentUser.id), {
        photoUrl: imageUrl,
        lastActive: Date.now()
      }, { merge: true });
      setIsEditingAvatar(false);
    } catch (err) {
      console.error("Error updating profile picture", err);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleUpdateProfileDetails = async (name: string, phone: string) => {
    if (!currentUser?.id) return;
    setLoading(true);
    try {
      if (auth.currentUser) {
         await updateProfile(auth.currentUser, { displayName: name });
      }
      await setDoc(doc(db, 'users', currentUser.id), {
        name,
        phone,
        lastActive: Date.now()
      }, { merge: true });

      setCurrentUser((prev: any) => prev ? {
        ...prev,
        name,
        phone
      } : null);

      setIsEditingProfileDetails(false);
      showToast(lang === 'en' ? 'Profile updated successfully!' : 'Profil başarıyla güncellendi!', 'success');
    } catch (err) {
      console.error("Error updating profile details", err);
      showToast(lang === 'en' ? 'Could not update profile' : 'Profil güncellenemedi', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUserProfile = async (userId: string, fallbackUser?: any) => {
    if (!userId) return;
    
    const initialProfile = fallbackUser || {
      id: userId,
      name: fallbackUser?.name || 'User',
      photoUrl: fallbackUser?.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackUser?.name || 'User')}&background=random`
    };
    
    setProfileUser(initialProfile);
    setIsUserProfileModalOpen(true);

    try {
      const userRef = doc(db, 'users', userId);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const fullData = { id: snap.id, ...snap.data() };
        if (!fullData.photoUrl && fullData.name) {
          fullData.photoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullData.name)}&background=random`;
        }
        setProfileUser(fullData);
      } else {
        const localMatch = dbUsers.find(u => u.id === userId);
        if (localMatch) {
          setProfileUser(localMatch);
        }
      }
    } catch (err) {
      console.warn("Could not fetch user profile details asynchronously", err);
    }
  };

  const handlePlaceUserCall = (targetUser: { id: string; name: string; photoUrl?: string | null; phone?: string | null }) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!targetUser.id) {
      showToast(lang === 'en' ? 'This user cannot be called.' : 'Bu kullanıcı aranamıyor.', 'error');
      return;
    }

    if (targetUser.id === currentUser.id) {
      showToast(lang === 'en' ? "You can't call yourself." : 'Kendinizi arayamazsınız.', 'info');
      return;
    }

    const phone = resolveUserPhone(targetUser, dbUsers);
    if (!phone || !dialPhoneNumber(phone)) {
      showToast(
        lang === 'en' ? 'No phone number available for this user.' : 'Bu kullanıcı için telefon numarası bulunamadı.',
        'error',
      );
      return;
    }

    const callId = `call_${currentUser.id}_${targetUser.id}_${Date.now()}`;
    setCallHistory((prev) => [
      {
        id: callId,
        businessId: 'general_call',
        businessName: targetUser.name || 'User',
        categoryName: lang === 'en' ? 'Direct Call' : 'Doğrudan Arama',
        timestamp: Date.now(),
        type: 'outgoing',
        callerName: currentUser.name || 'GooFind User',
      },
      ...prev,
    ]);
  };

  const handleProfileImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser?.id) return;
    
    setIsUploadingAvatar(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 150;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        handleUpdateProfilePicture(dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSendBusinessMessage = async (content: string, imageUrl?: string | null) => {
    if (!currentUser || !selectedBusiness) return;

    if (isUploadingBusinessChatImage) {
      showToast(
        lang === 'en' ? 'Please wait for the image to be processed.' : 'Lütfen görselin işlenmesini bekleyin.',
        'info',
      );
      return;
    }

    const payload = buildChatMessagePayload(content, imageUrl);
    if (!payload.content && payload.type !== 'image') return;

    const isOwner = currentUser.id === selectedBusiness.ownerId;
    const receiverId = isOwner ? activeBusinessChatPartnerId : selectedBusiness.ownerId;

    if (!receiverId) return;

    try {
      await addDoc(collection(db, 'business_messages'), {
        businessId: selectedBusiness.id,
        senderId: currentUser.id,
        senderName: currentUser.name,
        receiverId,
        timestamp: Date.now(),
        ...payload,
      });
      setBusinessChatImageSelected(null);
    } catch (err) {
      handleFirestoreError(err, 'create', 'business_messages');
    }
  };

  const handleSendNotificationMessage = async (
    notifId: string,
    receiverId: string,
    content: string,
    imageUrl?: string | null,
  ) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const payload = buildChatMessagePayload(content, imageUrl);
    if (!payload.content && payload.type !== 'image') return;

    try {
      await addDoc(collection(db, 'notification_messages'), {
        notifId,
        senderId: currentUser.id,
        senderName: currentUser.name || currentUser.email.split('@')[0],
        receiverId,
        timestamp: Date.now(),
        read: false,
        ...payload,
      });
    } catch (e) {
      handleFirestoreError(e, 'create', 'notification_messages');
    }
  };

  const toggleFavorite = handleToggleFavorite;

  const handleUserLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthModalOpen(false);
      setError(null);
    } catch (e: any) {
      if (e.code === 'auth/operation-not-allowed') {
        setError(lang === 'en' 
          ? 'Email/Password login is disabled. Since you are already signed in with Google, you don\'t need this step. Simply close this window.' 
          : 'E-posta/Şifre girişi kapalıdır. Google ile zaten giriş yaptığınız için bu adıma gerek yoktur. Bu pencereyi kapatabilirsiniz.');
      } else {
        setError(lang === 'en' ? 'Invalid email or password.' : 'E-posta veya şifre hatalı.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      setIsAuthModalOpen(false);
      setIsOwnerLoginOpen(false);
      setError(null);
    } catch (e: any) {
      const errorMessage = e.message || String(e);
      setError(errorMessage);
      if (errorMessage.includes('not-supported-in-this-environment') || errorMessage.includes('popup') || errorMessage.includes('restricted') || errorMessage.includes('user-agent')) {
        showToast(lang === 'en' 
          ? 'Google Login not supported in this phone environment. Please use Demo login or Email/Password.' 
          : 'Google Girişi bu telefonda desteklenmiyor. Lütfen Demo Giriş veya E-posta/Şifre kullanın.', 'error');
      } else {
        showToast(lang === 'en' ? `Google Sign-in: ${errorMessage}` : `Google Girişi: ${errorMessage}`, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReviewerLogin = async () => {
    setLoading(true);
    const email = 'demo@goofind.ca';
    const password = 'demo123456';
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthModalOpen(false);
      setError(null);
      showToast(lang === 'en' ? 'Logged in as Demo User!' : 'Demo olarak giriş yapıldı!', 'success');
    } catch (e: any) {
      // If the demo user doesn't exist yet, try creating it on the fly!
      if (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password') {
        try {
          const userCred = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(userCred.user, { displayName: 'Demo User' });
          setIsAuthModalOpen(false);
          setError(null);
          showToast(lang === 'en' ? 'Registered & Logged in as Demo User!' : 'Demo hesabı oluşturuldu ve giriş yapıldı!', 'success');
          return;
        } catch (signUpErr: any) {
          console.error("Demo user self-registration failed:", signUpErr);
        }
      }
      
      // Fallback: If Email/password auth throws operation-not-allowed or any other config error, use mock user session in-memory
      setCurrentUser({
        id: 'mock_demo_reviewer_id',
        name: 'Goofind Demo',
        email: 'demo@goofind.ca',
        emailVerified: true,
        providerData: []
      });
      setUserRole('user');
      setIsAuthModalOpen(false);
      setError(null);
      showToast(lang === 'en' ? 'Demo Mode Active: Logged in as Demo User!' : 'Simülatör Aktif: Demo olarak giriş yapıldı!', 'success');
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = (action: () => void) => {
    if (userRole === 'guest') {
      setAuthView('login');
      setIsAuthModalOpen(true);
      return;
    }
    
    // Strict email verification check
    const isGoogleUser = currentUser?.providerData?.some((p: any) => p.providerId === 'google.com');
    const isOwnerUser = userRole === 'owner';
    const isVerified = currentUser?.emailVerified;
    
    if (!isVerified && !isGoogleUser && !isOwnerUser) {
      showToast(
        lang === 'en' 
          ? 'Please verify your email address to perform this action. Check the banner at the top!' 
          : 'Lütfen bu işlemi yapmak için e-posta adresinizi doğrulayın. Yukarıdaki uyarı şeridine bakın!', 
        'error'
      );
      return;
    }
    
    action();
  };

  const CATEGORY_META: Record<string, { icon: any, color: string, bg: string }> = {
    [CategoryType.HEALTH]: { icon: Stethoscope, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.FOOD_DRINK]: { icon: Utensils, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.PRESS_MEDIA]: { icon: Newspaper, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.PRINT_GRAPHICS]: { icon: Printer, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.ASSOCIATION_FOUNDATION]: { icon: Users, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.ECOMMERCE]: { icon: ShoppingBag, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.EDUCATION_CONSULTANCY]: { icon: GraduationCap, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.DRIVING_SCHOOL]: { icon: Car, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.REAL_ESTATE]: { icon: Home, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.EVENTS_ORG]: { icon: Calendar, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.PHOTO_VIDEO]: { icon: Camera, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.CLOTHING_TEXTILE]: { icon: Shirt, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.LAW_IMMIGRATION]: { icon: Gavel, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.CONSTRUCTION_REPAIR]: { icon: Construction, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.BEAUTY_COSMETICS]: { icon: Sparkles, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.JEWELRY_DESIGN]: { icon: Gem, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.LOGISTICS_TRANSPORT]: { icon: Truck, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.MACHINERY_EQUIPMENT]: { icon: Cpu, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.FURNITURE_DECORATION]: { icon: Bed, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.ACCOUNTING_FINANCE]: { icon: Calculator, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.MUSIC_ART]: { icon: Music, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.NETWORK_COMPUTER]: { icon: Monitor, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.HOTEL_ACCOMMODATION]: { icon: Hotel, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.AUTOMOTIVE]: { icon: CarFront, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.PACKAGING]: { icon: Package, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.MONEY_TRANSFER]: { icon: Banknote, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.ADVERTISING_MARKETING]: { icon: Megaphone, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.INSURANCE]: { icon: ShieldCheck, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.SPORTS]: { icon: Trophy, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.TELECOM]: { icon: Smartphone, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.CLEANING_PEST]: { icon: SprayCan, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.TRANSLATION]: { icon: Languages, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.TAILOR_DRYCLEAN]: { icon: Scissors, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.WHOLESALE]: { icon: Warehouse, color: 'text-primary-light', bg: 'bg-primary/10' },
    [CategoryType.TOURISM_TRAVEL]: { icon: Plane, color: 'text-primary-light', bg: 'bg-primary/10' },
  };

  const NOTIFICATION_META: Record<string, { icon: any, color: string, bg: string }> = {
    [NotificationCategory.JOB_WANTED]: { icon: Briefcase, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.JOB_HIRING]: { icon: UserPlus, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.RENTAL]: { icon: Home, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.ROOMMATE]: { icon: Users, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.REAL_ESTATE_SALE]: { icon: Building2, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.FOR_SALE]: { icon: Tag, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.WANTED]: { icon: Search, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.FREE_DONATE]: { icon: Gift, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.CARS]: { icon: CarFront, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.CARPOOL]: { icon: MapPin, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.TUTORING]: { icon: GraduationCap, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.CHILDCARE]: { icon: Baby, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.REPAIR_MAINTENANCE]: { icon: Wrench, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.LOST_FOUND]: { icon: HelpCircle, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.NEWCOMER_HELP]: { icon: HandHelping, color: 'text-primary-light', bg: 'bg-primary/10' },
    [NotificationCategory.ANNOUNCEMENTS]: { icon: Bell, color: 'text-primary-light', bg: 'bg-primary/10' },
  };

  const COMMUNITY_CITIES: Record<string, string> = {
    'toronto': t.cities.toronto,
    'north-york': t.cities.northYork,
    'scarborough': t.cities.scarborough,
    'etobicoke': t.cities.etobicoke,
    'mississauga': t.cities.mississauga,
    'vaughan': t.cities.vaughan,
    'markham': t.cities.markham,
    'richmond-hill': t.cities.richmondHill,
    'brampton': t.cities.brampton,
    'oakville': t.cities.oakville,
  };

  const filteredBusinesses = businesses.filter(b => {
    if (!b) return false;
    const isInCategory = (selectedCategory === 'All' || b.category === selectedCategory);
    const isFavorite = selectedCategory === 'Favorites' && favorites.includes(b.id);
    const matchesSearch = (((b.name || '').toLowerCase().includes((searchQuery || '').toLowerCase())) || 
                          ((b.description || '').toLowerCase().includes((searchQuery || '').toLowerCase())));
    
    return (isInCategory || isFavorite) && matchesSearch;
  });

  const isAdminView = selectedCategory === 'Admin';
  const isHomeView = selectedCategory === 'Landing';
  const isHomeLandingView = isHomeView && homeNavSection === 'home';
  const isEventsPageView = isHomeView && homeNavSection === 'events';
  const isPlacesPageView = isHomeView && homeNavSection === 'places';
  const isFullScreenTabView = isEventsPageView || isPlacesPageView;

  const handleSendVerification = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        showToast(lang === 'en' ? 'Verification email sent!' : 'Doğrulama e-postası gönderildi!', 'success');
      } catch (e: any) {
        setError(e.message);
      }
    }
  };

  const checkVerificationStatus = async () => {
    if (auth.currentUser) {
      const verified = await ensureFreshAuthVerification();
      if (verified) {
        showToast(lang === 'en' ? 'Your email is verified!' : 'E-postanız doğrulandı!', 'success');
      } else {
        showToast(lang === 'en' ? 'Email still not verified.' : 'E-posta henüz doğrulanmadı.', 'info');
      }
      return verified;
    }
    return false;
  };

  const needsBusinessEmailVerification =
    !!currentUser &&
    !isBusinessAuthExempt(currentUser.email, currentUser.providerData, userRole) &&
    !currentUser.emailVerified;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-midnight z-[200] flex flex-col items-center justify-center p-8 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_75%)] pointer-events-none"></div>
        <div className="relative">
          <LogoText size="text-5xl sm:text-6.5xl" className="justify-center select-none" animateOo={true} />
        </div>
      </div>
    );
  }

  // --- Blocking Screen for Unverified Users ---
  const isUnverifiedEmailUser = currentUser && !currentUser.emailVerified && !currentUser.providerData?.some((p: any) => p.providerId === 'google.com') && userRole !== 'owner';

  if (isUnverifiedEmailUser) {
    return (
      <div className="fixed inset-0 bg-midnight z-[1000] flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(63,99,255,0.15)_0%,transparent_100%)] pointer-events-none"></div>
        <div className="w-full max-w-md bg-slate-900/60 border border-white/10 p-8 sm:p-10 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] space-y-8 backdrop-blur-md relative z-10">
          {/* Logo & Shield Header */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <LogoIcon size={86} />
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-midnight p-2 rounded-full ring-4 ring-midnight flex items-center justify-center">
                <Shield size={26} className="text-slate-950 animate-pulse" />
              </div>
            </div>
            <div className="space-y-1">
              <LogoText size="text-2xl" className="justify-center" />
              <p className="text-[14px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest leading-none">
                {lang === 'en' ? 'Canada Turkish Community Hub' : 'Kanada Türk Topluluk Merkezi'}
              </p>
            </div>
          </div>

          {/* Verification Text */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {lang === 'en' ? 'Email Verification Required' : 'E-posta Doğrulaması Gerekli'}
            </h2>
            <div className="text-xs sm:text-sm text-slate-350 font-medium leading-relaxed space-y-3">
              <p>
                {lang === 'en' 
                  ? 'We have sent a secure verification link to:' 
                  : 'Hesap güvenliğiniz için şu adrese bir doğrulama linki gönderdik:'}
              </p>
              
              <div className="flex items-center justify-center gap-2 font-black text-accent-vivid bg-amber-500/10 border-2 border-amber-500/30 my-4 py-3 px-5 rounded-2xl select-all break-all text-base sm:text-lg shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-300 hover:scale-[1.01]">
                <Mail size={20} className="shrink-0 text-accent-vivid" />
                <span>{currentUser.email}</span>
              </div>

              <p>
                {lang === 'en'
                  ? 'Please open your email app, check your Inbox and SPAM folder. You must verify your email to access Goofind.'
                  : 'Lütfen e-posta uygulamanızı açıp Gelen Kutunuzu ve SPAM (Gereksiz) klasörünüzü kontrol edin. Goofind\'a erişmek için e-postanızı onaylamalısınız.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <button 
              onClick={checkVerificationStatus}
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              <RotateCw size={20} className="animate-spin" style={{ animationDuration: '3s' }} />
              {lang === 'en' ? 'Check Status / Log In' : 'Durumu Kontrol Et / Giriş Yap'}
            </button>

            <button 
              onClick={handleSendVerification}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail size={20} className="text-slate-400" />
              {lang === 'en' ? 'Resend Email' : 'Doğrulama E-postasını Tekrar Gönder'}
            </button>

            <button 
              onClick={handleLogout}
              className="w-full bg-red-500/10 hover:bg-red-500/15 border border-red-500/10 text-red-400 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-[14px] transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut size={18} />
              {lang === 'en' ? 'Sign Out / Different Account' : 'Çıkış Yap / Başka Hesapla Kaydol'}
            </button>
          </div>
        </div>
      </div>
    );
  }


  // Public standalone pages routing for App Store requirements (Privacy Policy & Support/Contact / Account Deletion)
  const queryParams = new URL(window.location.href).searchParams;
  const activePage = queryParams.get('page') || 
                     (window.location.hash.includes('privacy') ? 'privacy' :
                      window.location.hash.includes('support') ? 'support' :
                      window.location.hash.includes('delete-account') ? 'delete-account' :
                      window.location.pathname.endsWith('/privacy') ? 'privacy' : 
                      window.location.pathname.endsWith('/support') ? 'support' :
                      window.location.pathname.endsWith('/delete-account') ? 'delete-account' : null);

  if (activePage === 'delete-account') {
    return (
      <DeleteAccountPage 
        lang={lang} 
        setLang={setLang} 
        currentUser={currentUser} 
        onBack={() => {
          window.location.href = window.location.pathname;
        }}
      />
    );
  }

  if (activePage === 'privacy') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-6 md:p-12 selection:bg-primary-mid/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <LogoIcon size={42} />
                <LogoText size="text-2xl" />
              </div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                Canada Turkish Community Hub & Directory
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setLang('tr')} 
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${lang === 'tr' ? 'bg-primary text-white' : 'bg-slate-200/60 text-slate-650 hover:bg-slate-200'}`}
              >
                Türkçe
              </button>
              <button 
                onClick={() => setLang('en')} 
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${lang === 'en' ? 'bg-primary text-white' : 'bg-slate-200/60 text-slate-650 hover:bg-slate-200'}`}
              >
                English
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
              {lang === 'en' ? 'Privacy Policy' : 'Gizlilik Politikası'}
            </h1>
            <p className="text-sm text-slate-500 font-bold">
              {lang === 'en' ? 'Last updated: June 13, 2026' : 'Son güncellenme tarihi: 13 Haziran 2026'}
            </p>
          </div>

          <div className="space-y-8 text-slate-700 leading-relaxed text-sm md:text-base font-medium text-left">
            <section className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 uppercase tracking-tight">
                {lang === 'en' ? '1. Introduction' : '1. Giriş'}
              </h2>
              <p className="text-slate-600 font-medium">
                {lang === 'en' 
                  ? 'Goofind is committed to protecting your privacy. This Privacy Policy details how we collect, process, and safeguard your data when utilizing our mobile and web applications to discover community announcements, business active listings, cultural events, and connection hubs.'
                  : 'Goofind olarak gizliliğinizi korumaya kararlıyız. Bu Gizlilik Politikası, Kanada Türk toplumu rehberimiz, ilanlarımız, etkinliklerimiz ve iletişim araçlarımızı kullanırken verilerinizi nasıl topladığımızı, işlediğimizi ve koruduğumuzu açıklar.'}
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 uppercase tracking-tight">
                {lang === 'en' ? '2. Data We Collect' : '2. Topladığımız Veriler'}
              </h2>
              <p className="text-slate-600 font-medium">
                {lang === 'en'
                  ? 'We collect minimal and purposeful information, which includes: name, registered email address, IP address, and voluntary details shared on listings (businesses, flyers, announcements) or direct community group chat messages. We do not sell or track your external browser activities.'
                  : 'Sadece platformun işleyişi için gerekli olan temel verileri topluyoruz: ad-soyad, kayıtlı e-posta adresi, IP adresi ve ilanlar (isletmeler, flyerlar, duyurular) ya da topluluk grup sohbetlerinde kendi rızanızla paylaştığınız detaylar. Harici tarayıcı etkinliklerinizi asla izlemiyoruz ve satmıyoruz.'}
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 uppercase tracking-tight">
                {lang === 'en' ? '3. Data Security' : '3. Veri Güvenliği'}
              </h2>
              <p className="text-slate-600 font-medium">
                {lang === 'en'
                  ? 'Your profile datasets are securely safeguarded under production Firestore encryption protocols. Secure Firebase Authentication handles authentication hashes so passwords remain hidden. Direct communication networks utilize SSL/TLS standards securely.'
                  : 'Profil bilgileriniz, Firestore şifreleme ve güvenlik kuralları altında güvenle korunmaktadır. Kimlik doğrulama işlemleri Firebase Authentication altyapısı ile şifrelenmiş olarak gerçekleşir, böylece şifreleriniz sisteme asla açık metin olarak kaydedilmez.'}
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 uppercase tracking-tight">
                {lang === 'en' ? '4. User Control & Account Deletion' : '4. Kullanıcı Hakları ve Hesap Silme'}
              </h2>
              <p className="text-slate-600 font-medium">
                {lang === 'en'
                  ? 'You maintain absolute ownership and control of your account settings. If you wish to delete your account or erase all historically shared listings/messages instantly, you can email us directly at songululuca02@gmail.com or submit a deletion request on our help center. All personal trace variables will be purged from our production databases within 3 business days.'
                  : 'Hesap ayarlarınız ve verileriniz üzerinde tam kontrole sahipsiniz. Hesabınızı kapatmak, paylaştığınız tüm ilan ve iletileri kalıcı olarak silmek isterseniz, songululuca02@gmail.com adresimize e-posta gönderebilir veya destek sayfamızdan talep oluşturabilirsiniz. Talebiniz 3 iş günü içinde işleme alınarak tüm verileriniz kalıcı olarak silinir.'}
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 uppercase tracking-tight">
                {lang === 'en' ? '5. Compliance & Contact' : '5. Mevzuat ve İletişim'}
              </h2>
              <p className="text-slate-600 font-medium">
                {lang === 'en'
                  ? 'This privacy contract is formulated to respect PIPEDA, GDPR, and global data transparency constraints. For question inquiries, contact us at songululuca02@gmail.com.'
                  : 'Bu gizlilik sözleşmesi, Kanada PIPEDA, Avrupa Birliği GDPR ve küresel veri koruma standartlarına uygun olarak tasarlanmıştır. Sorularınız için bizimle songululuca02@gmail.com adresinden iletişime geçebilirsiniz.'}
              </p>
            </section>
          </div>

          <div className="text-center pt-8 border-t border-slate-200 text-xs text-slate-400 font-semibold uppercase tracking-widest">
            © 2026 Goofind Corp. Canada. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }

  if (activePage === 'support') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-6 md:p-12 selection:bg-primary-mid/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <LogoIcon size={42} />
                <LogoText size="text-2xl" />
              </div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                Customer Support & Help Center
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setLang('tr')} 
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${lang === 'tr' ? 'bg-primary text-white' : 'bg-slate-200/60 text-slate-650 hover:bg-slate-200'}`}
              >
                Türkçe
              </button>
              <button 
                onClick={() => setLang('en')} 
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${lang === 'en' ? 'bg-primary text-white' : 'bg-slate-200/60 text-slate-650 hover:bg-slate-200'}`}
              >
                English
              </button>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
              {lang === 'en' ? 'Support & Help Center' : 'Destek ve Yardım Merkezi'}
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-semibold">
              {lang === 'en' 
                ? 'Welcome to the Goofind support page. Need assistance with listing your business, resetting your password, verifying your account, or reporting an issue? Our support squad is here to assist you!'
                : 'Goofind destek sayfasına hoş geldiniz. İşletmenizi eklemek, şifrenizi sıfırlamak, hesabınızı doğrulamak ya da teknik bir sorun bildirmek mi istiyorsunuz? Ekibimiz size yardımcı olmak için burada!'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                {lang === 'en' ? 'Contact Details' : 'İletişim Bilgileri'}
              </h2>
              <div className="space-y-4 text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                <p>
                  <strong>{lang === 'en' ? 'General Enquiries / Support:' : 'Genel Sorular / Destek:'}</strong><br />
                  <a href="mailto:songululuca02@gmail.com" className="text-primary font-bold hover:underline select-all">songululuca02@gmail.com</a>
                </p>
                <p>
                  <strong>{lang === 'en' ? 'Privacy / Account Deletion:' : 'Gizlilik / Hesap Silme:'}</strong><br />
                  <a href="mailto:songululuca02@gmail.com" className="text-primary font-bold hover:underline select-all">songululuca02@gmail.com</a>
                </p>
                <p>
                  <strong>{lang === 'en' ? 'Corporate Address:' : 'Şirket Adresi:'}</strong><br />
                  <span>Goofind Canada Inc., Toronto, ON, Canada</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                {lang === 'en' ? 'Frequently Asked' : 'Sıkça Sorulan Sorular'}
              </h2>
              <div className="space-y-4 text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">
                    {lang === 'en' ? 'How do I recover my password?' : 'Şifremi nasıl sıfırlarım?'}
                  </h4>
                  <p className="text-xs text-slate-650 font-medium">
                    {lang === 'en' 
                      ? 'Click the "Forgot Password?" option on the login window. Enter your email context to retrieve a safe reset email.' 
                      : 'Giriş ekranında "Şifremi Unuttum" seçeneğine tıklayın. E-postanızı girdikten sonra size sıfırlama bağlantısı gönderilecektir.'}
                  </p>
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">
                    {lang === 'en' ? 'How do I delete my account?' : 'Hesabımı nasıl silerim?'}
                  </h4>
                  <p className="text-xs text-slate-650 font-medium">
                    {lang === 'en' 
                      ? 'Simply submit an account erasure request to songululuca02@gmail.com, and we will purge all associated profile metrics.'
                      : 'songululuca02@gmail.com adresine hesap silme talebi gönderebilirsiniz, tüm verileriniz kalıcı olarak sistemden kaldırılacaktır.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-100/70 p-8 rounded-[2.5rem] border border-slate-250/10 text-center space-y-4">
            <h3 className="text-lg font-bold text-slate-900 uppercase leading-none">
              {lang === 'en' ? 'Submit an Inquiry' : 'Destek Talebi Gönder'}
            </h3>
            <p className="text-xs text-slate-500 font-semibold max-w-lg mx-auto leading-relaxed">
              {lang === 'en'
                ? 'Send your queries directly to our ticketing system, and our agents will respond to your email inbox within 3 business days.'
                : 'E-posta adresimiz aracılığıyla destek ekibimize doğrudan ulaşabilirsiniz, talepleriniz en geç 3 iş günü içinde yanıtlanır.'}
            </p>
            <a 
              href="mailto:songululuca02@gmail.com" 
              className="inline-flex bg-primary hover:bg-primary-mid text-white text-xs font-black uppercase tracking-widest py-3.5 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              {lang === 'en' ? 'Email songululuca02@gmail.com' : 'E-posta Gönder (songululuca02@gmail.com)'}
            </a>
          </div>

          <div className="text-center pt-8 border-t border-slate-200 text-xs text-slate-400 font-semibold uppercase tracking-widest">
            © 2026 Goofind Corp. Canada. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight font-sans antialiased text-slate-800 pb-20 overflow-x-hidden">
      {/* Quota Exceeded Banner */}
      {isQuotaExceeded && !isQuotaBannerDismissed && (
        <div className="bg-rose-950/90 border-b border-rose-500/30 text-white px-4 py-3 sticky top-0 z-[100] backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-rose-500/20 rounded-xl text-rose-300 border border-rose-500/30 mt-0.5 shrink-0">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-[14px] font-black uppercase tracking-widest text-rose-300 block mb-1">
                  {lang === 'en' ? 'SANDBOX DATABASE STATUS' : 'DENEME SÜRÜMÜ VERİTABANI DURUMU'}
                </span>
                <p className="text-xs sm:text-sm font-bold text-rose-100">
                  {lang === 'en' 
                    ? 'The sandbox database limits have been reached, but the app is fully functional in offline cache state!' 
                    : 'Deneme sürümü veritabanı sınırına ulaşıldı, ancak uygulama yerel bellek/çevrimdışı modda tam kapasite çalışıyor!'}
                </p>
                <p className="text-[15px] text-rose-200 mt-1 leading-relaxed">
                  {lang === 'en' 
                    ? 'Since you are previewing within AI Studio, you do not need to upgrade any GCP accounts. All edits, creations, flyers, announcements, business categories, chat options, and settings remain 100% active, saving instantly to your secure browse session. You can hide this notification below to continue.' 
                    : 'Yapay zeka stüdyosunda önizleme yaptığınız için herhangi bir GCP hesabı yükseltmesi yapmanıza gerek yoktur. Tüm eklemeler, düzenlemeler, flyerlar, kategoriler, sohbetler ve ayarlar %100 açık kalıp tarayıcı oturumunuza kaydedilir. Devam etmek için bu uyarıyı kapatabilirsiniz.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <button 
                onClick={() => setIsQuotaBannerDismissed(true)}
                className="bg-rose-600 hover:bg-rose-500 text-white font-black uppercase tracking-wider text-[14px] sm:text-xs px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 text-center block w-full md:w-auto shrink-0"
              >
                {lang === 'en' ? 'Close & Continue' : 'Kapat ve Devam Et'}
              </button>
              <a 
                href="https://firebase.google.com/pricing#cloud-firestore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-white/5 border border-white/20 text-slate-300 hover:text-white font-bold text-[14px] sm:text-xs px-4 py-2.5 rounded-xl transition-all text-center block w-full md:w-auto shrink-0 font-mono"
              >
                {lang === 'en' ? 'Pricing Info' : 'Tarife Bilgisi'}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Verification Banner */}
      {currentUser && !currentUser.emailVerified && !currentUser.providerData?.some((p: any) => p.providerId === 'google.com') && userRole !== 'owner' && (
        <div className="bg-primary/10 border-b border-primary-light/20 px-4 py-2 text-center sticky top-0 z-[60] backdrop-blur-md">
          <p className="text-[14px] sm:text-xs font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            {lang === 'en' 
              ? 'Please verify your email to unlock all features.' 
              : 'Tüm özellikleri açmak için lütfen e-postanızı doğrulayın.'}
            <button onClick={handleSendVerification} className="underline hover:text-primary-light ml-2">
              {lang === 'en' ? 'Resend Email' : 'Tekrar Gönder'}
            </button>
            <span className="mx-2">|</span>
            <button onClick={checkVerificationStatus} className="bg-primary text-white px-2 py-0.5 rounded-md hover:bg-primary-mid transition-colors">
              {lang === 'en' ? 'Check Status' : 'Durumu Kontrol Et'}
            </button>
          </p>
        </div>
      )}

      {/* Place Details Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlace(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-midnight w-full max-w-lg rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative z-10 border border-white/10"
            >
              <div className="h-56 relative">
                <img src={activePlaceImage || selectedPlace.img} alt={selectedPlace.name} className="w-full h-full object-cover transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
                <button 
                  onClick={() => setSelectedPlace(null)}
                  className="absolute top-6 right-6 bg-white/20 backdrop-blur-xl text-white p-2.5 rounded-2xl hover:bg-white/40 transition-all shadow-2xl"
                >
                  <X size={28} strokeWidth={3} />
                </button>
                <div className="absolute bottom-8 left-10 right-10">
                  <PlaceCategoryBadge
                    category={resolvePlaceCategory(selectedPlace)}
                    lang={lang}
                    className="mb-2"
                  />
                  <p className="text-[15px] font-black uppercase tracking-[0.3em] text-primary-light mb-2">{selectedPlace.province}</p>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-[0.9]">{selectedPlace.name}</h3>
                </div>
              </div>
              
              <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar bg-white/5">
                {/* Place Gallery Mini Thumbnails */}
                {selectedPlace.gallery && selectedPlace.gallery.length > 0 && (
                  <div className="flex gap-2.5 overflow-x-auto no-scrollbar snap-x pb-4 border-b border-white/5">
                    {[selectedPlace.img, ...selectedPlace.gallery].filter(Boolean).map((imgUrl, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePlaceImage(imgUrl)}
                        className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all shrink-0 snap-start active:scale-95 duration-200 ${
                          (activePlaceImage === imgUrl || (!activePlaceImage && index === 0))
                            ? 'border-primary shadow-lg scale-105'
                            : 'border-white/10 opacity-60 hover:opacity-100 cursor-pointer'
                        }`}
                      >
                        <img src={imgUrl} className="w-full h-full object-cover" alt="Gallery thumbnail" />
                      </button>
                    ))}
                  </div>
                )}
                <div className="space-y-6">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-primary/10 text-primary-light rounded-2xl flex items-center justify-center shrink-0 border border-primary-light/20 shadow-lg shadow-primary-light/5">
                      <MapPin size={30} />
                    </div>
                    <div>
                      <p className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1.5">{t.placeDetails.address}</p>
                      <p className="text-[19px] font-bold text-white leading-tight">{selectedPlace.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-primary/10 text-primary-light rounded-2xl flex items-center justify-center shrink-0 border border-primary-light/20 shadow-lg shadow-primary-light/5">
                      <Bus size={30} />
                    </div>
                    <div>
                      <p className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1.5">{t.placeDetails.howToGet}</p>
                      <p className="text-[19px] text-slate-300 leading-relaxed font-semibold">
                        {lang === 'tr' ? (selectedPlace.howToGetTr || selectedPlace.howToGet) : (selectedPlace.howToGet || selectedPlace.howToGetTr)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-primary/10 text-primary-light rounded-2xl flex items-center justify-center shrink-0 border border-primary-light/20 shadow-lg shadow-primary-light/5">
                      <Info size={30} />
                    </div>
                    <div>
                      <p className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1.5">{t.placeDetails.tips}</p>
                      <p className="text-[19px] text-slate-300 leading-relaxed font-semibold italic border-l-2 border-primary-light/30 pl-4 py-1">
                        {lang === 'tr' ? (selectedPlace.tipsTr || selectedPlace.tips) : (selectedPlace.tips || selectedPlace.tipsTr)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-2">
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                      <p className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{t.placeDetails.price}</p>
                      <p className="text-sm font-black text-primary-light uppercase tracking-widest">
                        {lang === 'tr' ? (selectedPlace.priceTr || selectedPlace.price) : (selectedPlace.price || selectedPlace.priceTr)}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                      <p className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{t.placeDetails.parking}</p>
                      <p className="text-sm font-black text-white uppercase tracking-widest">
                        {lang === 'tr' ? (selectedPlace.parkingTr || selectedPlace.parking) : (selectedPlace.parking || selectedPlace.parkingTr)}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedPlace.website && (
                  <a 
                    href={selectedPlace.website.startsWith('http') ? selectedPlace.website : `https://${selectedPlace.website}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-white/10 hover:bg-white/15 text-primary-light font-black uppercase tracking-widest py-5 rounded-[2rem] hover:text-white transition-all shadow-md active:scale-[0.98] mt-4 flex items-center justify-center gap-2 border border-white/10 cursor-pointer text-center text-xs"
                  >
                    <Globe size={18} className="animate-pulse text-primary-light" />
                    {lang === 'en' ? 'Visit Official Website' : 'Resmî Web Sitesini Ziyaret Et'}
                  </a>
                )}

                <button 
                  onClick={() => setSelectedPlace(null)}
                  className="w-full bg-primary text-white font-black uppercase tracking-widest py-5 rounded-[2rem] hover:bg-primary-mid transition-all shadow-2xl shadow-primary/20 active:scale-[0.98] cursor-pointer"
                >
                  {t.placeDetails.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Bottom-Triggered Search Modal 🌌 */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[120] flex items-start justify-center p-4 pt-[8vh] md:pt-[12vh]">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-white/95 backdrop-blur-xl w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(30,64,175,0.15)] relative z-10 border border-slate-200 flex flex-col max-h-[80vh]"
            >
              {/* Search input field */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
                <div className="flex-1 relative">
                  <Search size={28} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === 'tr' ? 'Keşfetmek, rehberde veya ilanlarda aramak için yazın...' : 'Type to explore businesses, events or guide...'}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl py-3.5 pl-12 pr-10 outline-none focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all font-semibold text-sm sm:text-base placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-sm font-black text-slate-500 hover:text-primary transition-colors cursor-pointer"
                >
                  {lang === 'tr' ? 'KAPAT' : 'CANCEL'}
                </button>
              </div>

              {/* Scrollable contents */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-none custom-scrollbar pb-12">
                {/* Search suggestion tags when query is empty */}
                {!searchQuery && (
                  <div className="space-y-4">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      {lang === 'tr' ? 'ÖNE ÇIKAN ARAMALAR' : 'POPULAR SEARCHES'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { tr: 'Restoranlar 🍽️', en: 'Restaurants 🍽️', query: 'Restoran' },
                        { tr: 'Hukuk & Avukat ⚖️', en: 'Lawyer & Legal ⚖️', query: 'Avukat' },
                        { tr: 'Ev / Emlak 🏠', en: 'Housing / Real Estate 🏠', query: 'Ev kiralama' },
                        { tr: 'Türk Marketleri 🛒', en: 'Turkish Markets 🛒', query: 'Market' },
                        { tr: 'Göçmenlik ✈️', en: 'Immigration Services ✈️', query: 'Göçmenlik' },
                        { tr: 'Etkinlikler 🎉', en: 'Events & Meetings 🎉', query: 'Etkinlik' },
                        { tr: 'Konsolosluk 🏛️', en: 'Consulate Office 🏛️', query: 'Konsolosluk' },
                      ].map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSearchQuery(tag.query)}
                          className="px-4 py-2 bg-slate-50 hover:bg-primary-soft/10 text-slate-600 hover:text-primary rounded-xl text-xs sm:text-sm font-semibold transition-all border border-slate-100 hover:border-primary-light/20 cursor-pointer"
                        >
                          {lang === 'tr' ? tag.tr : tag.en}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Instant Categorized Results */}
                {searchQuery && (
                  <div className="space-y-6">
                    {/* Businesses matching */}
                    {(() => {
                      const matches = businesses.filter(b => 
                        b && (
                          (b.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                          (b.description || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                          (b.category || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                          (b.province || '').toLowerCase().includes((searchQuery || '').toLowerCase())
                        )
                      );
                      if (matches.length === 0) return null;
                      return (
                        <div className="space-y-3">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {lang === 'tr' ? 'Rehber & İşletmeler' : 'Businesses & Directory'} ({matches.length})
                          </h4>
                          <div className="grid gap-2">
                            {matches.map(b => (
                              <div
                                key={b.id}
                                onClick={() => {
                                  setSelectedBusiness(b);
                                  setIsBusinessDetailModalOpen(true);
                                  setIsSearchOpen(false);
                                }}
                                className="flex items-center gap-4 bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl cursor-pointer transition-all border border-slate-100 group"
                              >
                                {(b.imageUrl || b.img) ? (
                                  <img src={b.imageUrl || b.img} alt={b.name} className="w-11 h-11 object-cover rounded-xl" />
                                ) : (
                                  <div className="w-11 h-11 bg-primary-mid/10 text-primary flex items-center justify-center rounded-xl font-bold">
                                    {(b.name || '?')[0]}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-[18px] text-slate-800 tracking-tight leading-tight group-hover:text-primary transition-colors truncate">
                                    {b.name}
                                  </p>
                                  {b.province && (
                                    <span className="inline-block text-[13px] font-black tracking-widest text-primary bg-primary/5 uppercase px-1.5 py-0.5 rounded-md mt-1">
                                      {b.province}
                                    </span>
                                  )}
                                  {b.description && (
                                    <p className="text-[15px] text-slate-500 truncate mt-1">
                                      {b.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Events matching */}
                    {(() => {
                      const matches = events.filter(e => 
                        e && (
                          (e.title || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                          (e.description || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                          (e.location || '').toLowerCase().includes((searchQuery || '').toLowerCase())
                        )
                      );
                      if (matches.length === 0) return null;
                      return (
                        <div className="space-y-3">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {lang === 'tr' ? 'Etkinlikler' : 'Events'} ({matches.length})
                          </h4>
                          <div className="grid gap-2">
                            {matches.map(e => (
                              <div
                                key={e.id}
                                onClick={() => {
                                  setSelectedCategory('All');
                                  // Scroll to the event or highlight it
                                  const el = document.getElementById(`event-card-${e.id}`);
                                  if (el) {
                                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  }
                                  setIsSearchOpen(false);
                                }}
                                className="flex items-center gap-4 bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl cursor-pointer transition-all border border-slate-100 group"
                              >
                                <div className="w-11 h-11 bg-primary-mid/10 text-primary flex flex-col items-center justify-center rounded-xl text-center leading-none">
                                  <span className="text-[14px] font-bold uppercase">ETK</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-[18px] text-slate-800 tracking-tight leading-tight group-hover:text-primary transition-colors truncate">
                                    {e.title}
                                  </p>
                                  {e.location && (
                                    <p className="text-[14px] text-slate-500 truncate mt-1">
                                      📍 {e.location}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Announcements matching */}
                    {(() => {
                      const matches = notifications.filter(n => 
                        n && (
                          (n.title || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                          (n.description || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                          (n.category || '').toLowerCase().includes((searchQuery || '').toLowerCase())
                        )
                      );
                      if (matches.length === 0) return null;
                      return (
                        <div className="space-y-3">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full" />
                            {lang === 'tr' ? 'Duyurular & İlanlar' : 'Announcements & Wanted'} ({matches.length})
                          </h4>
                          <div className="grid gap-2">
                            {matches.map(n => (
                              <div
                                key={n.id}
                                onClick={() => {
                                  setSelectedCategory('Announcements');
                                  setIsSearchOpen(false);
                                }}
                                className="flex items-center gap-4 bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl cursor-pointer transition-all border border-slate-100 group"
                              >
                                <div className="w-11 h-11 bg-primary/5 text-primary flex items-center justify-center rounded-xl">
                                  <Info size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-[18px] text-slate-800 tracking-tight leading-tight group-hover:text-primary transition-colors truncate">
                                    {n.title}
                                  </p>
                                  <p className="text-[14px] text-slate-500 truncate mt-1">
                                    {n.category} • {n.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Weekly Flyers / Blogs matching */}
                    {(() => {
                      const matches = (flyers || []).filter(f => 
                        f && (
                          (f.titleTr || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                          (f.titleEn || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                          (f.badgeTr || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                          (f.badgeEn || '').toLowerCase().includes((searchQuery || '').toLowerCase())
                        )
                      );
                      if (matches.length === 0) return null;
                      return (
                        <div className="space-y-3">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                            {lang === 'tr' ? 'Haftalık Broşür & Bloglar' : 'Weekly Flyers & Blogs'} ({matches.length})
                          </h4>
                          <div className="grid gap-2">
                            {matches.map(f => (
                              <div
                                key={f.id}
                                onClick={() => {
                                  setSelectedNews(f);
                                  setIsSearchOpen(false);
                                }}
                                className="flex items-center gap-4 bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl cursor-pointer transition-all border border-slate-100 group"
                              >
                                <div className="w-11 h-11 bg-primary/5 text-primary flex items-center justify-center rounded-xl">
                                  <Newspaper size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-[18px] text-slate-800 tracking-tight leading-tight group-hover:text-primary transition-colors truncate">
                                    {lang === 'tr' ? f.titleTr : f.titleEn}
                                  </p>
                                  <p className="text-[14px] text-slate-500 truncate mt-1">
                                    {lang === 'tr' ? f.dateRangeTr : f.dateRangeEn}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Communities matching */}
                    {(() => {
                      const matches = communities.filter(c => 
                        c && (
                          (c.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                          (c.description || '').toLowerCase().includes((searchQuery || '').toLowerCase())
                        )
                      );
                      if (matches.length === 0) return null;
                      return (
                        <div className="space-y-3">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            {lang === 'tr' ? 'Topluluk Odaları' : 'Community Rooms'} ({matches.length})
                          </h4>
                          <div className="grid gap-2">
                            {matches.map(c => (
                              <div
                                key={c.id}
                                onClick={() => {
                                  setSelectedCategory('Communities');
                                  setSelectedCommunity(c);
                                  setIsSearchOpen(false);
                                }}
                                className="flex items-center gap-4 bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl cursor-pointer transition-all border border-slate-100 group"
                              >
                                <div className="w-11 h-11 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl">
                                  <Users size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-[18px] text-slate-800 tracking-tight leading-tight group-hover:text-primary transition-colors truncate">
                                    {c.name}
                                  </p>
                                  <p className="text-[14px] text-slate-500 truncate mt-1">
                                    {c.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* No matches at all */}
                    {(() => {
                      const hasAnyMatch = 
                        (businesses || []).some(b => b && ((b.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || (b.description || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || (b.province || '').toLowerCase().includes((searchQuery || '').toLowerCase()))) ||
                        (events || []).some(e => e && ((e.title || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || (e.description || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || (e.location || '').toLowerCase().includes((searchQuery || '').toLowerCase()))) ||
                        (notifications || []).some(n => n && ((n.title || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || (n.description || '').toLowerCase().includes((searchQuery || '').toLowerCase()))) ||
                        (flyers || []).some(f => f && (
                          (f.titleTr || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                          (f.titleEn || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                          (f.badgeTr || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                          (f.badgeEn || '').toLowerCase().includes((searchQuery || '').toLowerCase())
                        )) ||
                        (communities || []).some(c => c && ((c.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || (c.description || '').toLowerCase().includes((searchQuery || '').toLowerCase())));

                      if (hasAnyMatch) return null;
                      return (
                        <div className="text-center py-10">
                          <p className="text-slate-400 font-medium font-sans">
                            {lang === 'tr' ? 'Sonuç bulunamadı...' : 'No results found...'}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      {(() => {
        const isHeaderTransparent = false;
        return (
          <header className={`${isHeaderTransparent ? 'absolute top-0 left-0 right-0 z-50 bg-transparent border-transparent text-white' : 'sticky top-0 z-50 backdrop-blur-md border-b bg-primary-soft/90 border-primary/15 text-slate-900 shadow-sm'} transition-all duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={resetHome}>
                  <LogoText size="text-xl sm:text-3xl" dark={isHeaderTransparent} />
                </div>

                <div className="flex flex-col items-center gap-1 shrink-0">
                  {currentUser ? (
                    <button
                      onClick={() => setIsProfileOpen(true)}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-primary/25 bg-primary-soft hover:border-primary/50 active:scale-95 transition-all flex items-center justify-center"
                      title={lang === 'tr' ? 'Profilim' : 'My Profile'}
                    >
                      {currentUser.photoUrl ? (
                        <img src={currentUser.photoUrl} className="w-full h-full object-cover" alt={currentUser.name} referrerPolicy="no-referrer" />
                      ) : (
                        <User size={16} className="text-primary" strokeWidth={2.5} />
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => { setAuthView('login'); setIsAuthModalOpen(true); }}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-primary/25 bg-primary-soft hover:border-primary/50 active:scale-95 transition-all flex items-center justify-center"
                      title={lang === 'tr' ? 'Giriş Yap' : 'Sign In'}
                    >
                      <User size={16} className="text-primary" strokeWidth={2.5} />
                    </button>
                  )}

                  <button
                    onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-primary/20 text-primary flex items-center justify-center hover:bg-primary-soft/40 active:scale-95 transition-all"
                    title={lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}
                  >
                    <Globe size={13} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          </header>
        );
      })()}

      {/* Hero Section — matches news detail page layout */}
      {isHomeLandingView && !isAdminView && (
          <section className="relative bg-[#EFF6FF] border-b border-slate-100 pt-4 pb-6 sm:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              {combinedBannerItems.length > 0 ? (
                <AnimatePresence mode="wait">
                  {combinedBannerItems.map((item: any, idx: number) => {
                    if (idx !== currentBannerIndex) return null;
                    const excerpt = getNewsHeroExcerpt(item.title, item.desc, item.content, lang);
                    const imageUrl = item.url || getBannerImageUrl(item.title, item.desc || '');
                    const categoryLabel = item.category || (item.type === 'news' ? (lang === 'en' ? 'News' : 'Haber') : (lang === 'en' ? 'Sponsor' : 'Sponsor'));

                    return (
                      <motion.article
                        key={item.id}
                        onClick={() => {
                          setSelectedNews({
                            title: item.title,
                            desc: item.desc || excerpt.split('.')[0] + '.',
                            content: item.content || excerpt,
                            category: categoryLabel,
                            url: imageUrl,
                            ...item
                          });
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35 }}
                        className="cursor-pointer group text-left font-sans"
                      >
                        <div className="relative w-full h-[200px] sm:h-[260px] md:h-[280px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100/80 shadow-md bg-slate-200">
                          {item.mediaType === 'video' ? (
                            <video
                              src={imageUrl}
                              className="absolute inset-0 w-full h-full object-cover brightness-[1.3] contrast-[1.05] saturate-[1.1]"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <img
                              src={imageUrl}
                              className="absolute inset-0 w-full h-full object-cover brightness-[1.3] contrast-[1.05] saturate-[1.1]"
                              alt={item.title}
                              referrerPolicy="no-referrer"
                            />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-white/10" />

                          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5 md:p-6 z-10">
                            <h2 className="text-sm sm:text-xl md:text-2xl font-black tracking-tighter text-white uppercase leading-[1.08] sm:leading-[1.1] line-clamp-1 sm:line-clamp-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                              {item.title}
                            </h2>

                            {excerpt && (
                              <div className="mt-1 sm:mt-2.5 flex items-end gap-0.5 sm:gap-1 min-w-0">
                                <p className="text-[14px] sm:text-xs md:text-sm font-medium text-white leading-[1.3] sm:leading-snug max-h-[2.6em] sm:max-h-none overflow-hidden flex-1 min-w-0 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                                  {excerpt.replace(/[.!?…]+\s*$/, '')}
                                </p>
                                <span className="inline-flex items-center gap-0.5 shrink-0 text-white text-[14px] sm:text-xs pb-px drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                                  ...
                                  <ArrowRight size={15} className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <div className="py-10 text-center italic text-slate-400 text-[14px] font-bold uppercase tracking-wider font-mono">
                  {lang === 'en' ? 'NO ACTIVE ANNOUNCEMENTS' : 'AKTİF DUYURU BULUNMADI'}
                </div>
              )}

              {combinedBannerItems.length > 0 && (
                <div className="mt-4 h-0.5 bg-slate-200 overflow-hidden rounded-full">
                  <motion.div
                    key={currentBannerIndex}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 8, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-primary via-primary-mid to-accent"
                  />
                </div>
              )}
            </div>
          </section>
      )}


      {isEventsPageView && (
        <EventsExplorePage
          events={events}
          lang={lang}
          onSelect={(evt) => setSelectedEventForModal(evt)}
        />
      )}

      {isPlacesPageView && (
        <PlacesExplorePage
          places={places}
          lang={lang}
          selectedCategory={selectedPlaceCategory}
          onCategoryChange={setSelectedPlaceCategory}
          onSelectPlace={(place) => setSelectedPlace(place)}
          onOpenAllPlaces={() => {
            setSelectedPlaceCategory('All');
            setIsAllPlacesModalOpen(true);
          }}
        />
      )}

      {!isFullScreenTabView && (
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isHomeLandingView ? 'pt-3 pb-8 sm:pt-4' : 'py-8 sm:py-12'}`}>
             {isAdminView ? (
          <div className="space-y-12 animate-in fade-in zoom-in duration-500">
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="w-1.5 h-10 bg-primary rounded-full" />
                 <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{t.sections.adminPanel}</h2>
               </div>
               <div className="flex px-4 py-2 bg-primary-mid/10 text-primary rounded-full text-xs font-black uppercase tracking-widest border border-primary/20 backdrop-blur-md">{lang === 'en' ? 'Super Admin Mode' : 'Süper Yönetici Modu'}</div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Chat Management */}
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[700px]">
                  <div className="bg-primary p-8 text-white flex items-center justify-between shrink-0">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                           <MessageCircle size={30} />
                        </div>
                        <div>
                           <h3 className="font-black text-lg tracking-tight uppercase">{lang === 'en' ? 'Support Desk (Concierge)' : 'Destek Masası (Asistan)'}</h3>
                           <p className="text-[13px] font-bold text-white/60 uppercase tracking-widest">{activeChats.length} {lang === 'en' ? 'Active Conversations' : 'Aktif Sohbet'}</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-1 min-h-0 overflow-hidden">
                     {/* LEFT COLUMN: ACTIVE CONVERSATIONS LIST */}
                     <div className="w-1/3 border-r border-slate-100 flex flex-col bg-slate-50/50">
                        <div className="p-4 border-b border-slate-100 bg-white shrink-0">
                           <span className="text-[14px] font-black uppercase tracking-wider text-slate-400">{lang === 'en' ? 'Conversations' : 'Mesajlaşmalar'}</span>
                        </div>
                        <div className="flex-1 overflow-y-auto divide-y divide-slate-100/50 custom-scrollbar">
                           {activeChats.length === 0 ? (
                              <div className="p-8 text-center text-xs text-slate-400 font-bold italic">{lang === 'en' ? 'No conversations yet' : 'Henüz mesajlaşma bulunmuyor'}</div>
                           ) : (
                              activeChats.map(chat => {
                                 const isSelected = selectedChatUserId === chat.id;
                                 return (
                                    <button
                                       key={chat.id}
                                       onClick={() => setSelectedChatUserId(chat.id)}
                                       className={`w-full text-left p-4 transition-all flex flex-col gap-1 cursor-pointer border-b border-slate-100/40 relative ${isSelected ? 'bg-primary/5 border-l-4 border-primary' : 'hover:bg-slate-100/60'}`}
                                    >
                                       <div className="flex items-center justify-between">
                                          <span className={`text-xs font-black truncate uppercase tracking-tight ${isSelected ? 'text-primary' : 'text-slate-800'}`}>{chat.name}</span>
                                          <span className="text-[12px] text-slate-400 font-mono shrink-0">{new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                       </div>
                                       <p className="text-[14px] text-slate-400 truncate pr-2 font-medium">{chat.lastMessage}</p>
                                    </button>
                                 );
                              })
                           )}
                        </div>
                     </div>

                     {/* RIGHT COLUMN: ACTIVE CONVERSATION DETAIL */}
                     <div className="flex-1 flex flex-col bg-slate-50 h-full min-w-0">
                        {selectedChatUserId ? (
                           <>
                              {/* Message bubble pane */}
                              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                                 {chatMessages
                                    .filter(msg => msg.userId === selectedChatUserId)
                                    .map(msg => (
                                       <div key={msg.id} className={`flex flex-col ${msg.senderRole === 'admin' ? 'items-end' : 'items-start'}`}>
                                          <div className="flex items-center gap-2 mb-2 px-1">
                                             <span className={`text-[13px] font-black uppercase tracking-widest ${msg.senderRole === 'admin' ? 'text-primary' : 'text-slate-400'}`}>{msg.senderName}</span>
                                             <span className="text-[13px] font-bold text-slate-400 font-mono">{new Date(msg.timestamp).toLocaleString()}</span>
                                          </div>
                                          <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium shadow-sm break-words whitespace-pre-wrap ${msg.senderRole === 'admin' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'}`}>
                                             <ChatMessageBody
                                               content={translateChatMessageContent(msg.content, lang)}
                                               imageUrl={msg.imageUrl}
                                               type={msg.type}
                                               onImagePreview={setPreviewMessageImage}
                                               isOnPrimaryBg={msg.senderRole === 'admin'}
                                               lang={lang}
                                             />
                                          </div>
                                       </div>
                                    ))}
                              </div>

                              {/* Input panel */}
                              <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                                 <ChatMessageComposer
                                   onSend={handleSendAdminMessage}
                                   onImagePick={(e) => void handleChatImagePick(e, setIsUploadingAdminChatImage, setAdminChatImageSelected)}
                                   selectedImage={adminChatImageSelected}
                                   onClearImage={() => setAdminChatImageSelected(null)}
                                   isUploadingImage={isUploadingAdminChatImage}
                                   lang={lang}
                                   inputRef={adminChatInputRef}
                                   placeholder={lang === 'en' ? 'Type admin response...' : 'Yönetici yanıtı yazın...'}
                                 />
                              </div>
                           </>
                        ) : (
                           <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
                              <MessageSquare size={54} className="text-slate-300 mb-4 stroke-2" />
                              <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest">{lang === 'en' ? 'No Conversation Selected' : 'Sohbet Seçilmedi'}</h4>
                              <p className="text-xs text-slate-400 max-w-xs mt-2">{lang === 'en' ? 'Select an active user chat from the conversation panel to start messaging.' : 'Mesajlaşmaya başlamak için konuşma panelinden aktif bir kullanıcı seçin.'}</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Sidebar Stats / Moderation */}
            <div className="space-y-8">
               <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200/80 shadow-xl text-left">
                   <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8 border-b border-slate-100 pb-4">{lang === 'en' ? 'Moderation Center' : 'Moderasyon Merkezi'}</h4>
                   <div className="space-y-10">
                    {/* Businesses needing verification */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Business Verification' : 'İşletme Onayları'}</h5>
                        <div className="bg-amber-100 text-accent-vivid text-[12px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                          {(businesses || []).filter(b => b && !b.verified).length} {lang === 'en' ? 'Pending' : 'Bekleyen'}
                        </div>
                      </div>
                      <div className="space-y-3">
                        {((businesses || []).filter(b => b && !b.verified)).length === 0 ? (
                          <div className="text-[14px] font-bold text-slate-300 italic py-2 text-center">{lang === 'en' ? 'All businesses verified' : 'Tüm işletmeler onaylı'}</div>
                        ) : (
                          (businesses || []).filter(b => b && !b.verified).slice(0, 5).map(biz => (
                            <div 
                              key={biz.id} 
                              onClick={() => {
                                setSelectedBusiness(biz);
                                setIsBusinessDetailModalOpen(true);
                              }}
                              className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group cursor-pointer hover:bg-slate-100/80 transition-all hover:border-slate-200"
                            >
                              <div className="flex items-center justify-between gap-3 text-left">
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-black text-slate-900 group-hover:text-primary truncate uppercase tracking-tight transition-colors">{biz.name}</p>
                                  <p className="text-[13px] font-bold text-slate-400 truncate uppercase mt-0.5">{biz.category}</p>
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleVerifyBusiness(biz.id);
                                  }}
                                  className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20 hover:scale-110 active:scale-95 transition-all shrink-0"
                                >
                                  <Check size={20} strokeWidth={3} />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Management and Removal of Posts */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-[14px] font-black text-slate-400 uppercase tracking-widest">
                          {lang === 'en' ? 'Manage Posts' : 'Gönderi / Duyuru Yönetimi'}
                        </h5>
                        <div className="bg-rose-100 text-rose-600 text-[12px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                          {notifications.length} {lang === 'en' ? 'Total' : 'Toplam'}
                        </div>
                      </div>

                      {/* Search Bar for Admin */}
                      <div className="mb-4">
                        <input
                          type="text"
                          placeholder={lang === 'en' ? 'Search announcements...' : 'Duyurularda ara...'}
                          value={adminPostSearchQuery}
                          onChange={(e) => setAdminPostSearchQuery(e.target.value)}
                          className="w-full text-[14px] font-bold bg-slate-50 border border-slate-100 placeholder:text-slate-400 text-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-rose-200 transition-all shadow-inner"
                        />
                      </div>

                      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                        {(() => {
                          const filtered = (notifications || []).filter(n => 
                            n && (
                              (n.title || '').toLowerCase().includes((adminPostSearchQuery || '').toLowerCase()) || 
                              ((n.category || '').toLowerCase().includes((adminPostSearchQuery || '').toLowerCase())) ||
                              ((n.description || '').toLowerCase().includes((adminPostSearchQuery || '').toLowerCase()))
                            )
                          );
                          
                          if (filtered.length === 0) {
                            return (
                              <div className="text-[14px] font-bold text-slate-300 italic py-4 text-center">
                                {lang === 'en' ? 'No posts found' : 'Duyuru bulunamadı'}
                              </div>
                            );
                          }
                          
                          return filtered.slice(0, 30).map(notif => (
                            <div key={notif.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-slate-200 transition-all">
                              <div className="flex items-center justify-between gap-3 text-left">
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{notif.title}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider bg-slate-200/50 px-1.5 py-0.5 rounded">
                                      {notif.category}
                                    </span>
                                    {notif.price && (
                                      <span className="text-[12px] font-mono font-black text-primary">
                                        {notif.price}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button 
                                    onClick={() => {
                                      setEditingNotification(notif);
                                      setEditNotifTitle(notif.title || '');
                                      setEditNotifCategory(notif.category || 'Announcements');
                                      setEditNotifDescription(notif.description || '');
                                      setEditNotifPrice(notif.price || '');
                                      setEditNotifImages(notif.gallery || (notif.imageUrl ? [notif.imageUrl] : []));
                                      setIsEditNotificationOpen(true);
                                    }}
                                    className="w-8 h-8 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-lg flex items-center justify-center shadow-md shadow-primary/10 hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0"
                                    title={lang === 'en' ? 'Edit' : 'Düzenle'}
                                  >
                                    <Edit2 size={17} strokeWidth={2.5} />
                                  </button>
                                  <button 
                                    onClick={() => promptDelete('notification', notif.id, notif.title || '')}
                                    className="w-8 h-8 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg flex items-center justify-center shadow-lg shadow-rose-500/5 hover:scale-110 active:scale-95 transition-all shrink-0"
                                    title={lang === 'en' ? 'Delete' : 'Sil'}
                                  >
                                    <Trash2 size={18} strokeWidth={2.5} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>

                   </div>{/* Close Moderation inner space-y-10 container */}
                </div>{/* Close Moderation Center card */}
              </div>{/* Close Sidebar Stats / Moderation column */}
            </div>{/* Close main Admin grid */}

            {/* --- HEAVY MANAGERS PANELS ROW 1: Flyers & Events --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
               {/* Flyer/Brochure Management Card */}
               <div className="bg-white rounded-[3rem] border border-slate-200/80 shadow-xl p-6 sm:p-8 md:p-10 text-left">
                  <div className="flex items-center justify-between mb-6 text-left">
                     <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                        {lang === 'en' ? 'Manage Flyers & Brochures' : 'Haftalık Broşür & İlan Yönetimi'}
                     </h5>
                        <button 
                          onClick={() => {
                            setEditingFlyer(null);
                            setNewFlyerTitleTr('');
                            setNewFlyerTitleEn('');
                            setNewFlyerBadgeTr('');
                            setNewFlyerBadgeEn('');
                            setNewFlyerSavings('');
                            setNewFlyerDateRangeTr('');
                            setNewFlyerDateRangeEn('');
                            setNewFlyerThemeColor('bg-red-600');
                            setNewFlyerBadgeColor('bg-yellow-400 text-red-950');
                            setNewFlyerImages([]);
                            setNewFlyerItems([]);
                            setIsAddFlyerOpen(true);
                          }}
                          className="bg-primary hover:bg-primary/90 text-white text-[13px] font-black uppercase px-3 py-1.5 rounded-xl tracking-widest flex items-center gap-1 hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/10"
                        >
                          <Plus size={14} strokeWidth={3} />
                          {lang === 'en' ? 'Add Flyer' : 'Flyer Ekle'}
                        </button>
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {flyers.length === 0 ? (
                          <div className="text-[14px] font-bold text-slate-400 italic py-4 text-center">
                            {lang === 'en' ? 'No flyers found' : 'Flyer bulunamadı'}
                          </div>
                        ) : (
                          flyers.map(flyer => (
                            <div key={flyer.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-slate-200 transition-all text-left">
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{lang === 'tr' ? flyer.titleTr : flyer.titleEn}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[12px] font-black uppercase tracking-wider bg-slate-200/50 px-1.5 py-0.5 rounded text-slate-500`}>
                                      {lang === 'tr' ? flyer.badgeTr : flyer.badgeEn}
                                    </span>
                                    <span className="text-[12px] font-mono text-red-500 font-bold">
                                      {flyer.images?.length || 0} {lang === 'en' ? 'images' : 'görsel'}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button 
                                    onClick={() => {
                                      setEditingFlyer(flyer);
                                      setNewFlyerTitleTr(flyer.titleTr || '');
                                      setNewFlyerTitleEn(flyer.titleEn || '');
                                      setNewFlyerBadgeTr(flyer.badgeTr || '');
                                      setNewFlyerBadgeEn(flyer.badgeEn || '');
                                      setNewFlyerSavings(flyer.savings || '');
                                      setNewFlyerDateRangeTr(flyer.dateRangeTr || '');
                                      setNewFlyerDateRangeEn(flyer.dateRangeEn || '');
                                      setNewFlyerThemeColor(flyer.themeColor || 'bg-red-600');
                                      setNewFlyerBadgeColor(flyer.badgeColor || 'bg-yellow-400 text-red-950');
                                      setNewFlyerImages(flyer.images || []);
                                      setNewFlyerItems(flyer.items || []);
                                      setIsAddFlyerOpen(true);
                                    }}
                                    className="w-8 h-8 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-lg flex items-center justify-center shadow-md shadow-primary/10 hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0"
                                    title={lang === 'en' ? 'Edit' : 'Düzenle'}
                                  >
                                    <Edit2 size={17} strokeWidth={2.5} />
                                  </button>
                                  <button 
                                    onClick={() => promptDelete('flyer', flyer.id, lang === 'tr' ? flyer.titleTr : flyer.titleEn)}
                                    className="w-8 h-8 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg flex items-center justify-center shadow-lg shadow-rose-500/5 hover:scale-110 active:scale-95 transition-all shrink-0"
                                    title={lang === 'en' ? 'Delete' : 'Sil'}
                                  >
                                    <Trash2 size={18} strokeWidth={2.5} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                  </div>{/* Close Flyer/Brochure Card */}

                  {/* Event Management Card */}
                  <div className="bg-white rounded-[3rem] border border-slate-200/80 shadow-xl p-6 sm:p-8 md:p-10 text-left">
                     <div className="flex items-center justify-between mb-6 text-left">
                        <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                           <span className="w-2.5 h-2.5 rounded-full bg-primary/50 animate-pulse"></span>
                           {lang === 'en' ? 'Manage Events' : 'Etkinlik Yönetimi'}
                        </h5>
                        <button 
                          onClick={() => {
                            setEditingEvent(null);
                            setEventTitle('');
                            setEventDate('');
                            setEventLocation('');
                            setEventDescription('');
                            setEventOrganizer('');
                            setEventImageUrl('');
                            setEventImageSelected(null);
                            setIsAddEventOpen(true);
                          }}
                          className="bg-primary hover:bg-primary/90 text-white text-[13px] font-black uppercase px-3 py-1.5 rounded-xl tracking-widest flex items-center gap-1 hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/10 cursor-pointer shrink-0"
                        >
                          <Plus size={14} strokeWidth={3} />
                          {lang === 'en' ? 'Add Event' : 'Etkinlik Ekle'}
                        </button>
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {events.length === 0 ? (
                          <div className="text-[14px] font-bold text-slate-400 italic py-4 text-center">
                            {lang === 'en' ? 'No events found' : 'Etkinlik bulunamadı'}
                          </div>
                        ) : (
                          events.map(evt => (
                            <div key={evt.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-slate-200 transition-all text-left">
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{evt.title}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider bg-slate-200/50 px-1.5 py-0.5 rounded">
                                      {evt.date}
                                    </span>
                                    <span className="text-[12px] font-bold text-slate-400 truncate max-w-[120px]">
                                      {evt.location}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleToggleEventApproval(evt.id, evt.approved)}
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0 border cursor-pointer ${
                                      evt.approved 
                                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100' 
                                        : 'bg-amber-50 border-amber-100 text-accent-vivid hover:bg-amber-100'
                                    }`}
                                    title={evt.approved ? (lang === 'en' ? 'Approved - Click to Unapproved' : 'Onaylı - Kaldırmak İçin Tıkla') : (lang === 'en' ? 'Pending - Click to Approve' : 'Onay Bekliyor - Onaylamak İçin Tıkla')}
                                  >
                                    <CheckCircle2 size={17} strokeWidth={2.5} />
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setEditingEvent(evt);
                                      setEventTitle(evt.title || '');
                                      setEventDate(evt.date || '');
                                      setEventLocation(evt.location || '');
                                      setEventDescription(evt.description || '');
                                      setEventOrganizer(evt.organizer || '');
                                      setEventImageUrl(evt.imageUrl || '');
                                      setEventImageSelected(evt.imageUrl || null);
                                      setIsAddEventOpen(true);
                                    }}
                                    className="w-7 h-7 bg-primary/5 hover:bg-primary/50 text-primary hover:text-white rounded-lg flex items-center justify-center shadow-md shadow-primary/10 hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0"
                                    title={lang === 'en' ? 'Edit' : 'Düzenle'}
                                  >
                                    <Edit2 size={16} strokeWidth={2.5} />
                                  </button>
                                  <button 
                                    onClick={() => promptDelete('event', evt.id, evt.title || '')}
                                    className="w-8 h-8 bg-rose-50 text-rose-550 hover:bg-rose-500 hover:text-white rounded-lg flex items-center justify-center shadow-md shadow-rose-500/5 hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0 text-rose-500"
                                    title={lang === 'en' ? 'Delete' : 'Sil'}
                                  >
                                    <Trash2 size={17} strokeWidth={2.5} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                  </div>{/* Close Event Management Card */}
                </div>{/* Close HEAVY MANAGERS PANELS ROW 1 grid row */}

                {/* --- HEAVY MANAGERS PANELS ROW 2: Places & Banners --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                  {/* Places to Visit Management Card */}
                  <div className="bg-white rounded-[3rem] border border-slate-200/80 shadow-2xl p-6 sm:p-8 md:p-10 text-left">
                     <div className="flex items-center justify-between mb-6 text-left">
                        <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                           <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                           {lang === 'en' ? 'Manage Places to Visit' : 'Gezilecek Yerler Rehberi'}
                        </h5>
                        <button 
                          onClick={() => {
                            setEditingPlace(null);
                            setPlaceName('');
                            setPlaceProvince('');
                            setPlaceAddress('');
                            setPlaceImgUrl('');
                            setPlaceImageSelected(null);
                            setPlaceHowToGetEn('');
                            setPlaceHowToGetTr('');
                            setPlaceTipsEn('');
                            setPlaceTipsTr('');
                            setPlacePriceEn('');
                            setPlacePriceTr('');
                            setPlaceParkingEn('');
                            setPlaceParkingTr('');
                            setPlaceWebsiteUrl('');
                            setPlaceGallery([]);
                            setPlaceCategory(PlaceCategory.CITY);
                            setIsAddPlaceOpen(true);
                          }}
                          className="bg-primary hover:bg-primary/90 text-white text-[13px] font-black uppercase px-3 py-1.5 rounded-xl tracking-widest flex items-center gap-1 hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/10 cursor-pointer shrink-0"
                        >
                          <Plus size={14} strokeWidth={3} />
                          {lang === 'en' ? 'Add Place' : 'Yeni Yer Ekle'}
                        </button>
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {places.length === 0 ? (
                          <div className="text-[14px] font-bold text-slate-400 italic py-4 text-center">
                            {lang === 'en' ? 'No places found' : 'Gezilecek yer bulunamadı'}
                          </div>
                        ) : (
                          places.map(place => (
                            <div key={place.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 group hover:border-slate-200 transition-all text-left">
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                  {place.img && (
                                    <img src={place.img} alt={place.name} className="w-10 h-10 object-cover rounded-xl border border-slate-200 shrink-0" />
                                  )}
                                  <div className="min-w-0">
                                    <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{place.name}</p>
                                    <p className="text-[12px] font-black text-slate-400 uppercase tracking-wider">{place.province}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    onClick={() => handleTogglePlaceApproval(place.id, place.approved)}
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0 border cursor-pointer ${
                                      place.approved 
                                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100' 
                                        : 'bg-amber-50 border-amber-100 text-accent-vivid hover:bg-amber-100'
                                    }`}
                                    title={place.approved ? (lang === 'en' ? 'Approved - Live' : 'Onaylı - Yayında') : (lang === 'en' ? 'Pending - Hidden' : 'Askıda - Gizli')}
                                  >
                                    <CheckCircle2 size={17} strokeWidth={2.5} />
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setEditingPlace(place);
                                      setPlaceName(place.name || '');
                                      setPlaceProvince(place.province || '');
                                      setPlaceAddress(place.address || '');
                                      setPlaceImgUrl(place.img || '');
                                      setPlaceImageSelected(place.img || null);
                                      setPlaceHowToGetEn(place.howToGet || '');
                                      setPlaceHowToGetTr(place.howToGetTr || '');
                                      setPlaceTipsEn(place.tips || '');
                                      setPlaceTipsTr(place.tipsTr || '');
                                      setPlacePriceEn(place.price || '');
                                      setPlacePriceTr(place.priceTr || '');
                                      setPlaceParkingEn(place.parking || '');
                                      setPlaceParkingTr(place.parkingTr || '');
                                      setPlaceWebsiteUrl(place.website || '');
                                      setPlaceGallery(place.gallery || []);
                                      setPlaceCategory(resolvePlaceCategory(place));
                                      setIsAddPlaceOpen(true);
                                    }}
                                    className="w-7 h-7 bg-primary/5 hover:bg-primary/50 text-primary hover:text-white rounded-lg flex items-center justify-center shadow-md shadow-primary/10 hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0"
                                    title={lang === 'en' ? 'Edit' : 'Düzenle'}
                                  >
                                    <Edit2 size={16} strokeWidth={2.5} />
                                  </button>
                                  <button 
                                    onClick={() => promptDelete('place', place.id, place.name || '')}
                                    className="w-8 h-8 bg-rose-50 text-rose-550 hover:bg-rose-500 hover:text-white rounded-lg flex items-center justify-center shadow-md shadow-rose-500/5 hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0 text-rose-550"
                                    title={lang === 'en' ? 'Delete' : 'Sil'}
                                  >
                                    <Trash2 size={17} strokeWidth={2.5} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                  </div>{/* Close Places to Visit Management Card */}

                  {/* Banners & Announcement Ads Management Card */}
                  <div className="bg-white rounded-[3rem] border border-slate-200/80 shadow-2xl p-6 sm:p-8 md:p-10 animate-in fade-in duration-300 text-left">
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div>
                           <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
                              {lang === 'en' ? 'Manage Banners & News' : 'Banner & Haber Yönetimi'}
                           </h5>
                          <p className="text-[13px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">
                            {lang === 'en' ? 'Promote ads or approve AI news' : 'Reklam yayınlayın veya yapay zeka haberlerini onaylayın'}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            type="button"
                            onClick={() => {
                              setEditingBanner(null);
                              setBannerTitle('');
                              setBannerDesc('');
                              setBannerContent('');
                              setBannerLink('');
                              setBannerUrl('');
                              setBannerImageSelected(null);
                              setIsAddBannerOpen(true);
                            }}
                            className="bg-primary hover:bg-primary/95 text-white text-[13px] font-black uppercase px-3 py-2 rounded-xl tracking-widest flex items-center gap-1 hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/10 cursor-pointer shrink-0"
                          >
                            <Plus size={14} strokeWidth={3} />
                            {lang === 'en' ? 'Create Banner' : 'Yeni Reklam Oluştur'}
                          </button>
                        </div>
                      </div>

                      {/* Cool Slide Tabs Header */}
                      <div className="flex bg-slate-100 p-1 rounded-2xl mb-4">
                        <button
                          type="button"
                          onClick={() => setAdminBannersTab('active')}
                          className={`flex-1 py-2.5 text-center rounded-xl font-black uppercase text-[9.5px] tracking-widest transition-all ${adminBannersTab === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          {lang === 'en' ? 'Active Ads / News' : 'Sistemdeki Reklam & Haberler'} ({banners.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAdminBannersTab('suggested');
                            if (suggestedNews.length === 0) {
                              handleFetchSuggestedNews();
                            }
                          }}
                          className={`flex-1 py-2.5 text-center rounded-xl font-black uppercase text-[9.5px] tracking-widest transition-all flex items-center justify-center gap-1.5 ${adminBannersTab === 'suggested' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          <Sparkles size={15} className={adminBannersTab === 'suggested' ? 'animate-pulse' : ''} />
                          {lang === 'en' ? 'AI Turkish News' : 'Yapay Zeka Haber Önerileri'}
                        </button>
                      </div>

                      {/* Tab 1: Active ads/news */}
                      {adminBannersTab === 'active' && (
                        <div className="space-y-4">
                          {/* Banner list */}
                          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                            {banners.length === 0 ? (
                              <div className="text-[14px] font-bold text-slate-400 italic py-8 text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                {lang === 'en' ? 'No banners or ads active. Click create above.' : 'Aktif reklam veya haber bulunmuyor. Yeni reklam oluşturun.'}
                              </div>
                            ) : (
                              banners.map(banner => (
                                <div key={banner.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 group hover:border-slate-200 transition-all text-left flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-3 min-w-0">
                                    {banner.url && (
                                      <div className="w-11 h-11 bg-white rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                                        <img src={banner.url} className="w-full h-full object-cover" alt="Banner" />
                                      </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[15px] font-black text-slate-900 truncate uppercase tracking-tight">{banner.title}</p>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        <span className={`text-[12px] font-black uppercase px-1.5 py-0.5 rounded ${banner.type === 'news' ? 'bg-primary/5 border border-primary/10 text-primary' : 'bg-amber-50 border border-amber-100 text-accent-vivid'}`}>
                                          {banner.type === 'news' ? (lang === 'en' ? 'Approved News' : 'Onaylı Gündem') : (lang === 'en' ? 'Sponsor / Ad' : 'Sponsor / Reklam')}
                                        </span>
                                        <span className="text-[13px] font-bold text-slate-400 truncate">
                                          {banner.link && banner.link !== '#' ? banner.link : (lang === 'en' ? 'No Destination Link' : 'Yönlendirme Bağlantısı Yok')}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => handleToggleBannerActive(banner.id, banner.active)}
                                      className={`w-9 h-5 rounded-full transition-all flex items-center p-0.5 cursor-pointer ${banner.active ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                      title={banner.active ? (lang === 'en' ? 'Active' : 'Aktif') : (lang === 'en' ? 'Inactive' : 'Pasif')}
                                    >
                                      <span className={`w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform duration-200 ${banner.active ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </button>
                                    
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        setEditingBanner(banner);
                                        setBannerTitle(banner.title || '');
                                        setBannerDesc(banner.desc || '');
                                        setBannerContent(banner.content || '');
                                        setBannerLink(banner.link || '#');
                                        setBannerUrl(banner.url || '');
                                        setBannerImageSelected(banner.url || null);
                                        setIsAddBannerOpen(true);
                                      }}
                                      className="w-7 h-7 bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-lg flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95"
                                      title={lang === 'en' ? 'Edit' : 'Düzenle'}
                                    >
                                      <Edit2 size={15} strokeWidth={2.5} />
                                    </button>

                                    <button 
                                      type="button"
                                      onClick={() => promptDelete('banner', banner.id, banner.title || '')}
                                      className="w-7 h-7 bg-rose-50 hover:bg-rose-500 text-rose-550 hover:text-white rounded-lg flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95 text-rose-500"
                                      title={lang === 'en' ? 'Delete' : 'Sil'}
                                    >
                                      <Trash2 size={15} strokeWidth={2.5} />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {/* Tab 2: AI Suggested live news */}
                      {adminBannersTab === 'suggested' && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          <div className="bg-gradient-to-r from-primary/8 via-primary-mid/8 to-white border border-slate-150 p-4 rounded-2xl">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-primary/50/10 text-primary rounded-xl">
                                <Sparkles size={20} className="animate-pulse" />
                              </div>
                              <div className="text-left">
                                <h6 className="text-[15px] font-black text-slate-800 uppercase tracking-wide">
                                  {lang === 'en' ? 'Live AI News feed scanner' : 'Yapay Zeka ile Kanada Gündem Tarayıcısı'}
                                </h6>
                                <p className="text-[14px] font-bold text-slate-500 leading-normal mt-1">
                                  {lang === 'en' 
                                    ? 'Constantly scan the internet using Gemini to discover latest updates for the Turkish community in Canada. Approved headlines instantly render as visual highlights on the homepage.'
                                    : 'Kanada ve Türk toplumu hakkındaki en güncel göçmenlik, etkinlik ve iş ilanları haberlerini Gemini ile anlık sorgulayın, inceleyin ve tek tıkla ana sayfa manşetine taşıyın.'}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              disabled={isFetchingSuggestedNews}
                              onClick={handleFetchSuggestedNews}
                              className="w-full mt-4 bg-primary hover:bg-primary-dark disabled:bg-slate-200 disabled:text-slate-400 bg-primary text-white py-3.5 rounded-xl font-black uppercase text-[9.5px] tracking-widest transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <RotateCw size={16} className={isFetchingSuggestedNews ? 'animate-spin' : ''} />
                              {isFetchingSuggestedNews 
                                ? (lang === 'en' ? 'Scanning Canada Web Content...' : 'Kanada Gündemi Taranıyor...') 
                                : (lang === 'en' ? 'Scan & Refresh Live Turkish News' : 'Gündem Haberlerini Gemini ile Yenile')}
                            </button>
                          </div>

                          {/* Suggested News List */}
                          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                            {isFetchingSuggestedNews ? (
                              <div className="py-12 flex flex-col items-center justify-center gap-3">
                                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                <p className="text-[14px] font-black text-slate-400 uppercase tracking-wider animate-pulse">
                                  {lang === 'en' ? 'AI is sourcing Turkish events...' : 'Yapay Zeka Kanada Gündemini Araştırıyor...'}
                                </p>
                              </div>
                            ) : suggestedNews.length === 0 ? (
                              <div className="text-[10.5px] font-black text-slate-400 italic py-8 text-center bg-slate-50 border border-slate-100 border-dashed rounded-2xl">
                                {lang === 'en' ? 'Click scanner button above to pull live news feed.' : 'Canlı gündem akışını getirmek için yukarıdaki yenileme butonuna tıklayın.'}
                              </div>
                            ) : (
                              suggestedNews.map((newsItem, index) => {
                                // Check if this title is already approved (already exists in banners collection)
                                const isAlreadyApproved = banners.some(b => b.title.trim().toLowerCase() === (newsItem.title || '').trim().toLowerCase());
                                
                                return (
                                  <div key={index} className="bg-white p-4 rounded-3xl border border-slate-150/75 shadow-sm hover:border-slate-300 transition-all text-left flex flex-col gap-3">
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="space-y-1">
                                        <span className="text-[12px] font-black uppercase tracking-wider px-2 py-0.5 bg-primary/5 border border-primary/10 text-primary rounded-md">
                                          {newsItem.category || (lang === 'en' ? 'General' : 'Genel Gündem')}
                                        </span>
                                        <h4 className="text-[11.5px] font-black text-slate-800 leading-tight tracking-tight uppercase pt-1">
                                          {newsItem.title}
                                        </h4>
                                        <p className="text-[14px] font-medium text-slate-500 leading-normal line-clamp-2">
                                          {newsItem.desc}
                                        </p>
                                      </div>
                                    </div>

                                    {/* News Meta Detail Panel for the reading */}
                                    {newsItem.content && (
                                      <div className="bg-slate-50 p-3 rounded-2xl text-[9.5px] font-bold text-slate-500 leading-relaxed border border-slate-100 max-h-[100px] overflow-y-auto custom-scrollbar">
                                        <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest block mb-1">DETAY / OKUMA PARÇASI:</span>
                                        {newsItem.content}
                                      </div>
                                    )}

                                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                                      <span className="text-[12px] font-mono font-black text-slate-400 uppercase">
                                        {lang === 'en' ? 'Sourced via Gemini AI' : 'Gemini AI ile Derlendi'}
                                      </span>
                                      
                                      <button
                                        type="button"
                                        disabled={isAlreadyApproved}
                                        onClick={() => handleApproveNewsItem(newsItem)}
                                        className={`px-4 py-2 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all cursor-pointer select-none flex items-center gap-1 hover:scale-103 active:scale-97 ${isAlreadyApproved ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10'}`}
                                      >
                                        {isAlreadyApproved ? <CheckCircle2 size={15} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={3} />}
                                        {isAlreadyApproved ? (lang === 'en' ? 'Approved & Live' : 'Onaylandı & Yayında') : (lang === 'en' ? 'Approve & Publish' : 'Onayla ve Yayınla')}
                                      </button>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      )}

                  </div>{/* Close Banners & Announcement Ads Card */}
                </div>{/* Close HEAVY MANAGERS PANELS ROW 2 grid-cols-2 row */}

                {/* --- GOOGLE PLAY CONSOLE ASSETS & MARKETING DETAILS --- */}
                <div className="bg-white rounded-[3rem] border border-slate-200/80 shadow-2xl overflow-hidden p-6 sm:p-8 md:p-10 animate-in fade-in duration-300 border-dashed mt-12 text-left">
                       <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-100 pb-6 mb-8 gap-4">
                         <div>
                           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                             <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                               <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                 <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M17.5,12A5.5,5.5 0 1,1 12,6.5A5.5,5.5 0 0,1 17.5,12M13,9H11V11H9V13H11V15H13V13H15V11H13V9Z" />
                               </svg>
                             </span>
                             {lang === 'en' ? 'Google Play Store Assets Hub' : 'Google Play Store Varlık ve Tanıtım Merkezi'}
                           </h3>
                           <p className="text-[14px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">
                             {lang === 'en' ? 'Download compliant app store elements and copy metadata' : 'Play Store kurallarına uygun uygulama ikonunu indirin ve tanıtım yazılarını kopyalayın'}
                           </p>
                         </div>
                         
                         <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl shrink-0">
                           <span className="text-[13px] font-black uppercase text-slate-400 px-2">Dil / Lang:</span>
                           <button 
                             type="button"
                             onClick={() => setLang('en')}
                             className={`px-3 py-1.5 text-[13px] font-black uppercase tracking-wider rounded-xl transition-all ${lang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                           >
                             English
                           </button>
                           <button 
                             type="button"
                             onClick={() => setLang('tr')}
                             className={`px-3 py-1.5 text-[13px] font-black uppercase tracking-wider rounded-xl transition-all ${lang === 'tr' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                           >
                             Türkçe
                           </button>
                         </div>
                       </div>

                       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                         {/* Left side: App icon renderer and exporter */}
                         <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* Card 1: Dynamic App Icon & GooFind Brand Customizer */}
                            <div className="flex flex-col items-center p-6 bg-slate-50 border border-slate-150 rounded-[2rem] relative overflow-hidden w-full animate-in fade-in duration-300" id="interactive-brand-studio-admin">
                              <div className="absolute top-4 left-4 bg-primary-mid/10 text-primary border border-primary/20 text-[12px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest z-10">
                                {lang === 'en' ? 'INTERACTIVE PLAY CONSOLE STUDIO' : 'İNTERAKTİF MARKA & LOGO STÜDYOSU'}
                              </div>
                              
                              {/* Live SVG Vector Canvas */}
                              <div className="w-44 h-44 bg-slate-900/5 rounded-3xl flex items-center justify-center shadow-inner mt-8 mb-4 relative overflow-hidden animate-in zoom-in-95 duration-500">
                                <svg 
                                  id="adminPlayConsoleSvgIcon" 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 512 512" 
                                  className="w-36 h-36 transition-all duration-350 select-none drop-shadow-md"
                                  style={{
                                    borderRadius: logoBorderRadius === 'circle' ? '50%' : logoBorderRadius === 'squircle' ? '22%' : '0'
                                  }}
                                >
                                  {/* Copper & Steel-blue Gradient definitions */}
                                  <defs>
                                    <linearGradient id="adminRoseGold" x1="0%" y1="100%" x2="100%" y2="0%">
                                      <stop offset="0%" stopColor="#8C442A" />
                                      <stop offset="25%" stopColor="#C47953" />
                                      <stop offset="50%" stopColor="#ECA985" />
                                      <stop offset="75%" stopColor="#D58861" />
                                      <stop offset="100%" stopColor="#703017" />
                                    </linearGradient>
                                    <linearGradient id="adminSteelBlue" x1="0%" y1="100%" x2="100%" y2="0%">
                                      <stop offset="0%" stopColor="#122535" />
                                      <stop offset="30%" stopColor="#2E4F69" />
                                      <stop offset="60%" stopColor="#537B9A" />
                                      <stop offset="85%" stopColor="#8AB1CE" />
                                      <stop offset="100%" stopColor="#0F1F2B" />
                                    </linearGradient>
                                    <radialGradient id="adminWallTexture" cx="80%" cy="20%" r="95%">
                                      <stop offset="0%" stopColor="#FAF7F2" />
                                      <stop offset="60%" stopColor="#EEECE6" />
                                      <stop offset="100%" stopColor="#D6D3C9" />
                                    </radialGradient>
                                    <filter id="adminLogoShadow" x="-25%" y="-25%" width="150%" height="150%">
                                      <feDropShadow dx="-10" dy="12" stdDeviation="10" floodColor="#181512" floodOpacity="0.38" />
                                    </filter>
                                  </defs>

                                  {/* Interactive Background fill */}
                                  {logoBgType === 'white' && <rect width="512" height="512" fill="url(#adminWallTexture)" />}
                                  {logoBgType === 'charcoal' && <rect width="512" height="512" fill="#111319" />}
                                  {logoBgType === 'transparent' && <rect width="512" height="512" fill="none" />}
                                  {logoBgType === 'gradient' && (
                                    <rect width="512" height="512" fill="url(#adminSteelBlue)" />
                                  )}

                                  {/* Logo Group */}
                                  <g 
                                    transform={logoIncludeText ? "translate(0, -35) scale(0.85)" : "translate(0, 0)"} 
                                    transform-origin="256 256"
                                    filter="url(#adminLogoShadow)"
                                    className="transition-all duration-300"
                                  >
                                    {/* 1. Copper Outer Left Segment */}
                                    <g>
                                      <path 
                                        d="M 296.4 105.3 A 156 156 0 1 0 407.7 292 L 370.5 292 A 120 120 0 1 1 287.1 140.1 Z" 
                                        fill={logoBgType === 'gradient' ? '#FFFFFF' : 'url(#adminRoseGold)'} 
                                        style={{ opacity: logoBgType === 'gradient' ? 0.9 : 1 }}
                                      />
                                      {logoBgType !== 'gradient' && (
                                        <>
                                          <path 
                                            d="M 296.4 105.3 A 156 156 0 1 0 407.7 292 L 370.5 292 A 120 120 0 1 1 287.1 140.1 Z" 
                                            fill="none"
                                            stroke="rgba(12, 10, 8, 0.55)"
                                            strokeWidth="1.2"
                                            transform="translate(1.2, 1.5)"
                                          />
                                          <path 
                                            d="M 296.4 105.3 A 156 156 0 1 0 407.7 292 L 370.5 292 A 120 120 0 1 1 287.1 140.1 Z" 
                                            fill="none"
                                            stroke="rgba(255, 235, 225, 0.65)"
                                            strokeWidth="1.2"
                                            transform="translate(-1.2, -1.5)"
                                          />
                                        </>
                                      )}
                                    </g>
                                    
                                    {/* 2. Steel-Blue Outer Top-Right Segment */}
                                    <g>
                                      <path 
                                        d="M 296.4 105.3 A 156 156 0 0 1 407.7 220 L 370.5 220 A 120 120 0 0 0 287.1 140.1 Z" 
                                        fill={logoBgType === 'gradient' ? 'url(#adminRoseGold)' : 'url(#adminSteelBlue)'} 
                                      />
                                      {logoBgType !== 'gradient' && (
                                        <>
                                          <path 
                                            d="M 296.4 105.3 A 156 156 0 0 1 407.7 220 L 370.5 220 A 120 120 0 0 0 287.1 140.1 Z" 
                                            fill="none"
                                            stroke="rgba(5, 12, 22, 0.6)"
                                            strokeWidth="1.2"
                                            transform="translate(1.2, 1.5)"
                                          />
                                          <path 
                                            d="M 296.4 105.3 A 156 156 0 0 1 407.7 220 L 370.5 220 A 120 120 0 0 0 287.1 140.1 Z" 
                                            fill="none"
                                            stroke="rgba(230, 245, 255, 0.55)"
                                            strokeWidth="1.2"
                                            transform="translate(-1.2, -1.5)"
                                          />
                                        </>
                                      )}
                                    </g>

                                    {/* 3. Steel-Blue Inner Left Segment */}
                                    <g>
                                      <path 
                                        d="M 279.3 169.1 A 90 90 0 0 0 232.7 342.9 L 242.0 308.2 A 54 54 0 0 1 270.0 203.8 Z" 
                                        fill={logoBgType === 'gradient' ? 'url(#adminRoseGold)' : 'url(#adminSteelBlue)'} 
                                      />
                                      {logoBgType !== 'gradient' && (
                                        <>
                                          <path 
                                            d="M 279.3 169.1 A 90 90 0 0 0 232.7 342.9 L 242.0 308.2 A 54 54 0 0 1 270.0 203.8 Z" 
                                            fill="none"
                                            stroke="rgba(5, 12, 22, 0.6)"
                                            strokeWidth="1.2"
                                            transform="translate(1.2, 1.5)"
                                          />
                                          <path 
                                            d="M 279.3 169.1 A 90 90 0 0 0 232.7 342.9 L 242.0 308.2 A 54 54 0 0 1 270.0 203.8 Z" 
                                            fill="none"
                                            stroke="rgba(230, 245, 255, 0.55)"
                                            strokeWidth="1.2"
                                            transform="translate(-1.2, -1.5)"
                                          />
                                        </>
                                      )}
                                    </g>

                                    {/* 4. Copper Inner Right Segment */}
                                    <g>
                                      <path 
                                        d="M 232.7 342.9 A 90 90 0 0 1 279.3 169.1 L 270.0 203.8 A 54 54 0 0 0 242.0 308.2 Z" 
                                        fill={logoBgType === 'gradient' ? '#FFFFFF' : 'url(#adminRoseGold)'} 
                                        style={{ opacity: logoBgType === 'gradient' ? 0.9 : 1 }}
                                      />
                                      {logoBgType !== 'gradient' && (
                                        <>
                                          <path 
                                            d="M 232.7 342.9 A 90 90 0 0 1 279.3 169.1 L 270.0 203.8 A 54 54 0 0 0 242.0 308.2 Z" 
                                            fill="none"
                                            stroke="rgba(12, 10, 8, 0.55)"
                                            strokeWidth="1.2"
                                            transform="translate(1.2, 1.5)"
                                          />
                                          <path 
                                            d="M 232.7 342.9 A 90 90 0 0 1 279.3 169.1 L 270.0 203.8 A 54 54 0 0 0 242.0 308.2 Z" 
                                            fill="none"
                                            stroke="rgba(255, 235, 225, 0.65)"
                                            strokeWidth="1.2"
                                            transform="translate(-1.2, -1.5)"
                                          />
                                        </>
                                      )}
                                    </g>

                                    {/* 5. G-Bar Center Hook Segment */}
                                    <g>
                                      <path 
                                        d="M 242 220 L 370 220 L 370 256 L 274 256 L 274 292 L 238 292 L 238 256 Z" 
                                        fill={logoBgType === 'gradient' ? 'url(#adminRoseGold)' : 'url(#adminSteelBlue)'} 
                                      />
                                      {logoBgType !== 'gradient' && (
                                        <>
                                          <path 
                                            d="M 242 220 L 370 220 L 370 256 L 274 256 L 274 292 L 238 292 L 238 256 Z" 
                                            fill="none"
                                            stroke="rgba(5, 12, 22, 0.6)"
                                            strokeWidth="1.2"
                                            transform="translate(1.2, 1.5)"
                                          />
                                          <path 
                                            d="M 242 220 L 370 220 L 370 256 L 274 256 L 274 292 L 238 292 L 238 256 Z" 
                                            fill="none"
                                            stroke="rgba(230, 245, 255, 0.55)"
                                            strokeWidth="1.2"
                                            transform="translate(-1.2, -1.5)"
                                          />
                                        </>
                                      )}
                                    </g>
                                  </g>

                                  {/* Logo text - Brand signature */}
                                  {logoIncludeText && (
                                    <g>
                                      {logoBgType !== 'gradient' && (
                                        <>
                                          <text 
                                            x="256" 
                                            y="442" 
                                            textAnchor="middle" 
                                            fontFamily="Georgia, Cambria, 'Times New Roman', serif" 
                                            fontWeight="800" 
                                            fontSize="54" 
                                            fill="rgba(12, 10, 8, 0.6)" 
                                            letterSpacing="1"
                                            transform="translate(1.2, 1.5)"
                                          >
                                            GooFind
                                          </text>
                                          <text 
                                            x="256" 
                                            y="442" 
                                            textAnchor="middle" 
                                            fontFamily="Georgia, Cambria, 'Times New Roman', serif" 
                                            fontWeight="800" 
                                            fontSize="54" 
                                            fill="rgba(255, 235, 225, 0.5)" 
                                            letterSpacing="1"
                                            transform="translate(-1.2, -1.5)"
                                          >
                                            GooFind
                                          </text>
                                        </>
                                      )}
                                      <text 
                                        x="256" 
                                        y="442" 
                                        textAnchor="middle" 
                                        fontFamily="Georgia, Cambria, 'Times New Roman', serif" 
                                        fontWeight="800" 
                                        fontSize="54" 
                                        fill={logoBgType === 'charcoal' ? '#FFFFFF' : logoBgType === 'gradient' ? '#FFFFFF' : 'url(#adminRoseGold)'} 
                                        letterSpacing="1"
                                        filter="url(#adminLogoShadow)"
                                      >
                                        GooFind
                                      </text>
                                    </g>
                                  )}
                                </svg>
                              </div>

                              <p className="text-[14px] font-bold text-slate-500 text-center uppercase tracking-wide leading-relaxed max-w-xs mb-4">
                                {lang === 'en' 
                                  ? 'Perfect 1:1 format required by Google Play Console. Customize materials and shapes below.'
                                  : 'Google Play Console tarafından aranan kusursuz 512x512px formatında hazırlanan, özelleştirilebilir canlı marka ikonu.'}
                              </p>

                              {/* Live Customizer Options */}
                              <div className="w-full space-y-4 mb-5 border-t border-b border-slate-200/60 py-4 text-left">
                                {/* Option 1: Backplate color */}
                                <div className="space-y-1.5">
                                  <label className="text-[13px] font-black text-slate-400 uppercase tracking-widest block">
                                    {lang === 'en' ? 'Backplate Material / Color' : 'Arka Plan Rengi ve Malzemesi'}
                                  </label>
                                  <div className="grid grid-cols-4 gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setLogoBgType('white')}
                                      className={`p-1.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${logoBgType === 'white' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      <div className="w-3.5 h-3.5 rounded-md bg-[#F4F3EF] border border-slate-300"></div>
                                      <span className="text-[7.5px] font-black text-slate-650 uppercase truncate leading-none">{lang === 'en' ? 'White' : 'Beyaz'}</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setLogoBgType('charcoal')}
                                      className={`p-1.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${logoBgType === 'charcoal' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      <div className="w-3.5 h-3.5 rounded-md bg-[#111319] border border-slate-700"></div>
                                      <span className="text-[7.5px] font-black text-slate-650 uppercase truncate leading-none">{lang === 'en' ? 'Charcoal' : 'Siyah'}</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setLogoBgType('gradient')}
                                      className={`p-1.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${logoBgType === 'gradient' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      <div className="w-3.5 h-3.5 rounded-md bg-gradient-to-br from-[#7DA3BE] to-[#1B2F3D]"></div>
                                      <span className="text-[7.5px] font-black text-slate-650 uppercase truncate leading-none">{lang === 'en' ? 'Gradient' : 'Degrade'}</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setLogoBgType('transparent')}
                                      className={`p-1.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${logoBgType === 'transparent' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      <div className="w-3.5 h-3.5 rounded-md border border-dashed border-slate-300 bg-slate-55 flex items-center justify-center text-[11px] text-slate-400 font-bold select-none leading-none">X</div>
                                      <span className="text-[7.5px] font-black text-slate-650 uppercase truncate leading-none">{lang === 'en' ? 'Transparent' : 'Şeffaf'}</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Option 2: Corner Shape */}
                                <div className="space-y-1.5">
                                  <label className="text-[13px] font-black text-slate-400 uppercase tracking-widest block">
                                    {lang === 'en' ? 'Play Store Corner Shape / Ratio' : 'İkon Köşe Yapısı Yuvarlaklığı'}
                                  </label>
                                  <div className="grid grid-cols-3 gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setLogoBorderRadius('squircle')}
                                      className={`py-1.5 px-2 rounded-xl border flex items-center justify-center gap-1 cursor-pointer transition-all ${logoBorderRadius === 'squircle' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      <span className="text-[12px] font-black text-slate-700 uppercase leading-none">{lang === 'en' ? 'Squircle' : 'Süper Oval'}</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setLogoBorderRadius('circle')}
                                      className={`py-1.5 px-2 rounded-xl border flex items-center justify-center gap-1 cursor-pointer transition-all ${logoBorderRadius === 'circle' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      <span className="text-[12px] font-black text-slate-700 uppercase leading-none">{lang === 'en' ? 'Circle' : 'Daire'}</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setLogoBorderRadius('square')}
                                      className={`py-1.5 px-2 rounded-xl border flex items-center justify-center gap-1 cursor-pointer transition-all ${logoBorderRadius === 'square' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      <span className="text-[12px] font-black text-slate-700 uppercase leading-none">{lang === 'en' ? 'Square' : 'Kare'}</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Option 3: Version layout */}
                                <div className="space-y-1.5">
                                  <label className="text-[13px] font-black text-slate-400 uppercase tracking-widest block">
                                    {lang === 'en' ? 'Design Style Version' : 'Tabela ve İsim Versiyonu'}
                                  </label>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setLogoIncludeText(false)}
                                      className={`py-1.5 px-2 rounded-xl border flex items-center justify-center gap-1 cursor-pointer transition-all ${!logoIncludeText ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      <span className="text-[12px] font-black text-slate-700 uppercase leading-none">
                                        {lang === 'en' ? 'Logo Only' : 'Sadece İkon'}
                                      </span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setLogoIncludeText(true)}
                                      className={`py-1.5 px-2 rounded-xl border flex items-center justify-center gap-1 cursor-pointer transition-all ${logoIncludeText ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      <span className="text-[12px] font-black text-slate-700 uppercase leading-none">
                                        {lang === 'en' ? 'Logo + Text' : 'Tabelalı Sürüm'}
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Export / Download Buttons with active triggers */}
                              <div className="w-full space-y-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const svgEl = document.getElementById('adminPlayConsoleSvgIcon');
                                    if (!svgEl) return;
                                    
                                    const svgString = new XMLSerializer().serializeToString(svgEl);
                                    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                                    const DOMURL = window.URL || window.webkitURL || window;
                                    const url = DOMURL.createObjectURL(svgBlob);
                                    
                                    const img = new Image();
                                    img.onload = () => {
                                      const canvas = document.createElement('canvas');
                                      canvas.width = 512;
                                      canvas.height = 512;
                                      const ctx = canvas.getContext('2d');
                                      if (ctx) {
                                        ctx.clearRect(0, 0, 512, 512);
                                        ctx.drawImage(img, 0, 0, 512, 512);
                                        const pngData = canvas.toDataURL('image/png');
                                        
                                        const downloadLink = document.createElement('a');
                                        downloadLink.href = pngData;
                                        downloadLink.download = 'goofind_play_console_icon.png';
                                        document.body.appendChild(downloadLink);
                                        downloadLink.click();
                                        document.body.removeChild(downloadLink);
                                      }
                                      DOMURL.revokeObjectURL(url);
                                      showToast(
                                        lang === 'en' 
                                          ? 'App Icon PNG (512x512) downloaded successfully!' 
                                          : 'Uygulama İkonu PNG (512x512) başarıyla indirildi!', 
                                        'success'
                                      );
                                    };
                                    img.src = url;
                                  }}
                                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-5 rounded-xl font-black uppercase text-[13px] tracking-widest transition-all shadow-md shadow-emerald-500/10 hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 border-none"
                                >
                                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-3.5-3.5M12 15l3.5-3.5m-7.9 5.5A9 9 0 1121 16.5" />
                                  </svg>
                                  {lang === 'en' ? 'Download App Icon (PNG)' : 'Uygulama İkonunu İndir (PNG)'}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    const svgEl = document.getElementById('adminPlayConsoleSvgIcon');
                                    if (!svgEl) return;
                                    const svgString = new XMLSerializer().serializeToString(svgEl);
                                    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                                    const DOMURL = window.URL || window.webkitURL || window;
                                    const url = DOMURL.createObjectURL(svgBlob);
                                    const downloadLink = document.createElement('a');
                                    downloadLink.href = url;
                                    downloadLink.download = 'goofind_app_icon.svg';
                                    document.body.appendChild(downloadLink);
                                    downloadLink.click();
                                    document.body.removeChild(downloadLink);
                                    DOMURL.revokeObjectURL(url);
                                    showToast(lang === 'en' ? 'Vector SVG App Icon downloaded!' : 'Vektörel SVG Uygulama İkonu indirildi!', 'success');
                                  }}
                                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-5 rounded-xl font-black uppercase text-[13px] tracking-widest transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 border-none"
                                >
                                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                  {lang === 'en' ? 'Download Vector SVG' : 'Vektörel SVG İndir'}
                                </button>
                              </div>
                            </div>

                            {/* Card 2: Feature Graphic (1024x500) */}
                            <div className="flex flex-col items-center p-6 bg-slate-50 border border-slate-150 rounded-[2rem] relative overflow-hidden">
                              <div className="absolute top-4 left-4 bg-primary/50/10 text-primary border border-primary/20 text-[12px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                                1024 x 500 PX COMPLIANT
                              </div>
                              
                              {/* Feature Graphic preview container */}
                              <div className="w-full aspect-[1024/500] bg-slate-950 rounded-xl flex items-center justify-center shadow-inner mt-6 mb-4 relative overflow-hidden group animate-in zoom-in-95 duration-500">
                                <img 
                                  src="/goofind_feature_graphic.png" 
                                  alt="Goofind Play Store Feature Graphic" 
                                  className="w-full h-full object-cover select-none transition-all duration-300 group-hover:scale-105" 
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between px-3 pb-2">
                                  <span className="bg-slate-900/60 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[12px] font-mono tracking-wide">
                                    goofind_feature_graphic.png
                                  </span>
                                  <span className="bg-emerald-600/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[12px] font-mono tracking-wide">
                                    goofind_feature_graphic.jpg
                                  </span>
                                </div>
                              </div>

                              <p className="text-[14px] font-bold text-slate-500 text-center uppercase tracking-wide leading-relaxed max-w-xs mb-4">
                                {lang === 'en' 
                                  ? 'Official Play Store promotional graphic designed with Turkey-Canada hybrid elements & gold details.'
                                  : 'Google Play Store tanıtımlarında öne çıkarılacak, Türk-Kanada sentezi ve altın detaylı resmi özel görsel.'}
                              </p>

                              <div className="w-full bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-4 text-left">
                                <h5 className="text-[14px] font-black text-accent-vivid uppercase tracking-widest mb-1 flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                  </svg>
                                  {lang === 'en' ? 'Google Play Console PNG Error?' : 'Play Console "Geçersiz Görsel (INVALID)" Hatası mı Alıyorsunuz?'}
                                </h5>
                                <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                                  {lang === 'en'
                                    ? 'Google Play Console can reject PNGs due to its strict transparent/alpha channel check flags. To fix this instantly, please download and upload the JPEG (.jpg) format. Play Store accepts both formats!'
                                    : 'Google Play Console, bazı PNG dosyalarını gereksiz şeffaflık/alpha kanalı kontrolü nedeniyle reddedebilir. Bu "INVALID" veya "Geçersiz" hatasını saniyeler içinde çözmek için lütfen yanındaki JPEG (.jpg) formatını indirin. Play Store iki formatı da kabul eder.'}
                                </p>
                              </div>

                              <div className="w-full space-y-2">
                                {/* JPEG Download Button */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    try {
                                      const link = document.createElement('a');
                                      link.href = '/goofind_feature_graphic.jpg';
                                      link.download = 'goofind_feature_graphic.jpg';
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                      showToast(
                                        lang === 'en' ? 'Feature Graphic JPEG (.jpg) downloaded successfully!' : 'Feature Graphic JPEG (.jpg - Sorunsuz) başarıyla indirildi!',
                                        'success'
                                      );
                                    } catch (err) {
                                      console.error(err);
                                      showToast(lang === 'en' ? 'Please open app in a new tab to download.' : 'İndirme başarısız oldu. Lütfen uygulamayı yeni sekmede açıp deneyin.', 'error');
                                    }
                                  }}
                                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-5 rounded-xl font-black uppercase text-[13px] tracking-widest transition-all shadow-md shadow-emerald-500/10 hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 border-none hover:opacity-90"
                                >
                                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  </svg>
                                  {lang === 'en' ? 'Download Feature Graphic (JPEG - RECOMMENDED)' : 'Feature Graphic İndir (JPEG - KESİN ÇÖZÜM)'}
                                </button>

                                {/* PNG Download Button */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    try {
                                      const link = document.createElement('a');
                                      link.href = '/goofind_feature_graphic.png';
                                      link.download = 'goofind_feature_graphic.png';
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                      showToast(
                                        lang === 'en' ? 'Feature Graphic PNG downloaded!' : 'Feature Graphic PNG indirildi!',
                                        'success'
                                      );
                                    } catch (err) {
                                      console.error(err);
                                      showToast(lang === 'en' ? 'Please open app in a new tab to download.' : 'İndirme başarısız oldu. Lütfen uygulamayı yeni sekmede açıp deneyin.', 'error');
                                    }
                                  }}
                                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-5 rounded-xl font-black uppercase text-[13px] tracking-widest transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 border-none hover:opacity-90"
                                >
                                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                  {lang === 'en' ? 'Download Feature Graphic (PNG)' : 'Feature Graphic İndir (PNG)'}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Right side: Google Play Store Meta (Title, short desc, full desc) */}
                          <div className="lg:col-span-7 space-y-6 text-left">
                           {/* Meta Title */}
                           <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative">
                             <div className="flex items-center justify-between mb-2">
                               <span className="text-[14px] font-black text-primary uppercase tracking-widest">
                                 {lang === 'en' ? 'App Title (Google Play Store)' : 'Uygulama İsmi (Google Play Store)'}
                               </span>
                               <span className="text-[13px] font-mono font-bold text-slate-400">
                                 {lang === 'en' ? '29 / 30 Chars' : '28 / 30 Karakter'}
                               </span>
                             </div>
                             <div className="bg-white px-4 py-3 rounded-xl border border-slate-200/80 flex items-center justify-between font-bold text-sm text-slate-900 shadow-sm">
                               <span>{lang === 'en' ? 'Goofind: Canada-Turkish Hub' : 'Goofind: Kanada-Türk Rehberi'}</span>
                               <button
                                 type="button"
                                 onClick={() => {
                                   navigator.clipboard.writeText(lang === 'en' ? 'Goofind: Canada-Turkish Hub' : 'Goofind: Kanada-Türk Rehberi');
                                   showToast(lang === 'en' ? 'Copied app title!' : 'Uygulama ismi kopyalandı!', 'success');
                                 }}
                                 className="p-1 px-2.5 text-[13px] font-black uppercase tracking-wider bg-slate-50 border border-slate-400 text-slate-600 rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer shadow-xs active:scale-95 text-xs text-center border-none"
                               >
                                 {lang === 'en' ? 'Copy Name' : 'İsmi Kopyala'}
                               </button>
                             </div>
                           </div>

                           {/* Short Description */}
                           <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative">
                             <div className="flex items-center justify-between mb-2">
                               <span className="text-[14px] font-black text-primary uppercase tracking-widest">
                                 {lang === 'en' ? 'Short Description (Google Play Store)' : 'Kısa Tanıtım (Google Play Store)'}
                               </span>
                               <span className="text-[13px] font-mono font-bold text-slate-400">
                                 {lang === 'en' ? '76 / 80 Chars' : '78 / 80 Karakter'}
                               </span>
                             </div>
                             <div className="bg-white px-4 py-3.5 rounded-xl border border-slate-200/80 flex items-start justify-between font-bold text-xs text-slate-700 leading-normal shadow-sm">
                               <span className="max-w-[85%]">
                                 {lang === 'en' 
                                   ? 'Canadian-Turkish community, local businesses, yellow pages, and classifieds.'
                                   : 'Kanada\'daki Türk toplumu, yerel işletmeler, ilanlar, fırsatlar ve her şey.'}
                               </span>
                               <button
                                 type="button"
                                 onClick={() => {
                                   navigator.clipboard.writeText(
                                     lang === 'en' 
                                       ? 'Canadian-Turkish community, local businesses, yellow pages, and classifieds.'
                                       : 'Kanada\'daki Türk toplumu, yerel işletmeler, ilanlar, fırsatlar ve her şey.'
                                   );
                                   showToast(lang === 'en' ? 'Copied short description!' : 'Kısa başlık kopyalandı!', 'success');
                                 }}
                                 className="p-1 px-2.5 text-[13px] font-black uppercase tracking-wider bg-slate-50 border border-slate-400 text-slate-600 rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ml-4 border-none text-xs text-center"
                               >
                                 {lang === 'en' ? 'Copy' : 'Kopyala'}
                               </button>
                             </div>
                           </div>

                           {/* Full Description */}
                           <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative">
                             <div className="flex items-center justify-between mb-2">
                               <span className="text-[14px] font-black text-primary uppercase tracking-widest">
                                 {lang === 'en' ? 'Full Description (Google Play Store Copy)' : 'Tam Tanıtım Metni (Google Play Store Kopyası)'}
                               </span>
                               <span className="text-[13px] font-mono font-bold text-slate-400">
                                 {lang === 'en' ? 'Compliant & Multi-functional' : 'Kurallara Tam Uyumlu'}
                               </span>
                             </div>
                             
                             <div className="bg-white p-6 rounded-2xl border border-slate-200/80 text-xs text-slate-600 font-bold leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar select-all relative group shadow-inner">
                               {lang === 'en' ? (
                                 <div className="space-y-4 whitespace-pre-wrap">
{`Discover, connect, and thrive with Goofind, the ultimate business directory and community hub for the Canadian-Turkish community in Canada! 🇨🇦🇹🇷

Whether you are seeking reliable local businesses, exploring local flyers and promotions, looking for exciting community events, or researching beautiful places to visit across Canada, Goofind is your comprehensive companion.

Key Features of Goofind:
- Verified Business Directory: Access a trusted list of Turkish-owned and Turkish-serving services, shops, lawyers, restaurants, and specialists near you. 
- Real-Time Messaging & Concierge Support: Chat directly with business owners or query admin assistants in real-time.
- Local Weekly Flyers: Stay updated with the latest community discounts and flyer savings.
- Community Events calendar: Never miss Turkish cultural gatherings, local meetups, or immigration workshops.
- Gezilecek Yerler (Places to Visit Guide): Discover must-see Canadian landmarks, parks, and attractions with transportation details and insider tips.
- AI-Powered Sourced News: Get instant immigration, workspace, and community news summaries verified safely.

Join thousands of users in Canada living, supporting, and building local networks together. Download Goofind today!`}
                                 </div>
                               ) : (
                                 <div className="space-y-4 whitespace-pre-wrap">
{`Kanada'daki Türk-Kanada toplumunun en geniş kapsamlı rehberi ve topluluk merkezi Goofind'a hoş geldiniz! 🇨🇦🇹🇷

Güvenilir yerel işletmeleri keşfetmek, haftalık broşür ve indirim ilanlarına göz atmak, en güncel kültürel ve eğitici topluluk etkinliklerini takip etmek veya Kanada'nın preventilasyonun ötesinde gezilecek eşsiz yerlerini keşfetmek artık tek bir uygulamada elinizin altında!

Goofind Öne Çıkan Özellikler:
- Onaylı Yerel İşletme Rehberi: Çevrenizdeki Türk işletmelerine, uzmanlara, restoranlara, avukatlara ve hizmet sağlayıcılara anında ulaşın.
- Canlı Destek ve Mesajlaşma (Asistan): İşletme sahipleriyle veya sistem asistanlarıyla anında sohbet edin ve bilgi alın.
- Haftalık İndirim Broşürleri (Flyer): Toplum genelindeki haftalık fırsatlar ve alışveriş broşürlerinden ilk siz haberdar olun.
- Kültürel Etkinlik Takvimi: Türk kültür festivallerini, göçmenlik seminerlerini ve yerel buluşmaları kaçırmayın.
- Gezilecek Yerler Rehberi: Kanada'nın milli parklarını, tarihi yerlerini veya görülmesi gereken doğa harikalarını; ulaşım rehberleri ve ipuçlarıyla keşfedin.
- Yapay Zeka Destekli Güncel Gündem: Göçmenlik, çalışma hayatı ve toplumu ilgilendiren Kanada haberlerini anlık takip edin.

Kanada genelinde binlerce kullanıcıyla bir araya gelin, yerel bağlarınızı güçlendirin. Goofind'ı bugün indirin!`}
                                 </div>
                               )}
                             </div>

                             <div className="mt-4 flex justify-end">
                               <button
                                 type="button"
                                 onClick={() => {
                                   const textToCopy = lang === 'en' 
                                     ? `Discover, connect, and thrive with Goofind, the ultimate business directory and community hub for the Canadian-Turkish community in Canada! 🇨🇦🇹🇷\n\nWhether you are seeking reliable local businesses, exploring local flyers and promotions, looking for exciting community events, or researching beautiful places to visit across Canada, Goofind is your comprehensive companion.\n\nKey Features of Goofind:\n- Verified Business Directory: Access a trusted list of Turkish-owned and Turkish-serving services, shops, lawyers, restaurants, and specialists near you. \n- Real-Time Messaging & Concierge Support: Chat directly with business owners or query admin assistants in real-time.\n- Local Weekly Flyers: Stay updated with the latest community discounts and flyer savings.\n- Community Events calendar: Never miss Turkish cultural gatherings, local meetups, or immigration workshops.\n- Gezilecek Yerler (Places to Visit Guide): Discover must-see Canadian landmarks, parks, and attractions with transportation details and insider tips.\n- AI-Powered Sourced News: Get instant immigration, workspace, and community news summaries verified safely.\n\nJoin thousands of users in Canada living, supporting, and building local networks together. Download Goofind today!`
                                     : `Kanada'daki Türk-Kanada toplumunun en geniş kapsamlı rehberi ve topluluk merkezi Goofind'a hoş geldiniz! 🇨🇦🇹🇷\n\nGüvenilir yerel işletmeleri keşfetmek, haftalık broşür ve indirim ilanlarına göz atmak, en güncel kültürel ve eğitici topluluk etkinliklerini takip etmek veya Kanada'nın milli parklarını, tarihi yerlerini ve görülmesi gereken harikalarını; ulaşım rehberleri ve ipuçlarıyla keşfetmek artık tek bir uygulamada elinizin altında!\n\nGoofind Öne Çıkan Özellikler:\n- Onaylı Yerel İşletme Rehberi: Çevrenizdeki Türk işletmelerine, uzmanlara, restoranlara, avukatlara ve hizmet sağlayıcılara anında ulaşın.\n- Canlı Destek ve Mesajlaşma (Asistan): İşletme sahipleriyle veya sistem asistanlarıyla anında sohbet edin ve bilgi alın.\n- Haftalık İndirim Broşürleri (Flyer): Toplum genelindeki haftalık fırsatlar ve alışveriş broşürlerinden ilk siz haberdar olun.\n- Kültürel Etkinlik Takvimi: Türk kültür festivallerini, göçmenlik seminerlerini ve yerel buluşmaları kaçırmayın.\n- Gezilecek Yerler Rehberi: Kanada'nın milli parklarını, tarihi yerlerini ve görülmesi gereken harikalarını; ulaşım rehberleri ve ipuçlarıyla keşfedin.\n- Yapay Zeka Destekli Güncel Gündem: Göçmenlik, çalışma hayatı ve toplumu ilgilendiren Kanada haberlerini anlık takip edin.\n\nKanada genelinde binlerce kullanıcıyla bir araya gelin, yerel bağlarınızı güçlendirin. Goofind'ı bugün indirin!`;
                                   navigator.clipboard.writeText(textToCopy);
                                   showToast(lang === 'en' ? 'Copied full listing description!' : 'Tanıtım yazısı başarıyla kopyalandı!', 'success');
                                 }}
                                 className="flex items-center gap-1.5 px-6 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-103 active:scale-97 transition-all cursor-pointer border-none"
                               >
                                 <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 112-2h2a2 2 0 012 2" />
                                 </svg>
                                 {lang === 'en' ? 'Copy Full Description' : 'TÜM AÇIKLAMAYI KOPYALA'}
                               </button>
                             </div>
                           </div>

                           {/* YouTube Promo Video Info Card */}
                           <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative mt-6">
                             <div className="flex items-center justify-between mb-2">
                               <span className="text-[14px] font-black text-primary uppercase tracking-widest">
                                 {lang === 'en' ? 'Promo Video URL (Google Play Store)' : 'Tanıtım Videosu URL (Google Play Store)'}
                               </span>
                               <span className="text-[14px] font-bold text-red-600 flex items-center gap-1.5 uppercase tracking-wider animate-pulse">
                                 <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/>
                                 </svg>
                                 YouTube Only
                               </span>
                             </div>

                             <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4">
                               <p className="text-xs font-bold text-slate-700 leading-relaxed">
                                 {lang === 'en'
                                   ? 'Google Play Console requires a standard desktop YouTube watch URL. Shorts (shorts/) or shortened links (youtu.be) may trigger an "INVALID URL" error. Use the compatible link below to bypass it instantly:'
                                   : 'Google Play Console, Mağaza Girişi tanıtım videosu için sadece standart masaüstü YouTube "watch" bağlantılarını kabul eder. Shorts (shorts/) ve mobil paylaşım (youtu.be) bağlantıları geçersiz ("INVALID URL") hatası verir. Bu sorunu anında çözmek için aşağıdaki tam uyumlu linki kopyalayıp kullanın:'}
                               </p>

                               <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-2.5">
                                 <div className="text-[14px] font-black text-slate-500 uppercase tracking-widest">
                                   {lang === 'en' ? 'Compatible Google Play Input Video URL:' : 'Play Console Uyumlu YouTube Giriş Linki:'}
                                 </div>
                                 <div className="flex items-center gap-2">
                                   <input
                                     type="text"
                                     readOnly
                                     value="https://www.youtube.com/watch?v=kYv_C2-bXz0"
                                     className="bg-white px-3 py-2.5 rounded-lg border border-slate-200/60 font-mono text-xs text-slate-800 font-black flex-1 focus:outline-none select-all"
                                   />
                                   <button
                                     type="button"
                                     onClick={() => {
                                        navigator.clipboard.writeText('https://www.youtube.com/watch?v=kYv_C2-bXz0');
                                        showToast(
                                          lang === 'en' ? 'Copied video URL!' : 'Video linki başarıyla kopyalandı!',
                                          'success'
                                        );
                                     }}
                                     className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-[14px] uppercase tracking-widest rounded-lg flex items-center gap-2 shrink-0 cursor-pointer border-none shadow-sm shadow-red-500/10 active:scale-95 transition-all text-xs text-center justify-center font-sans"
                                   >
                                     {lang === 'en' ? 'Copy URL' : 'Linki Kopyala'}
                                   </button>
                                 </div>
                                </div>

                               <div className="space-y-2 pt-2 border-t border-slate-100">
                                 <h6 className="text-[14px] font-black text-slate-800 uppercase tracking-wider">
                                   {lang === 'en' ? 'Play Console Video Requirements:' : 'Önemli Play Store Video Kuralları:'}
                                 </h6>
                                 <ul className="text-[14px] text-slate-500 space-y-1.5 pl-4 list-disc font-medium leading-relaxed font-sans">
                                   <li>
                                     <strong>{lang === 'en' ? 'Format Rules:' : 'Bağlantı Yapısı:'}</strong>{' '}
                                     {lang === 'en'
                                       ? 'Always copy the full URL from your browser address bar containing "youtube.com/watch?v=VIDEO_ID".'
                                       : 'Her zaman tarayıcınızdan kopyaladığınız, içinde "youtube.com/watch?v=VİDEO_KODU" geçen tam linki girin.'}
                                   </li>
                                   <li>
                                     <strong>{lang === 'en' ? 'YouTube Shorts Check:' : 'Shorts Kısıtlaması:'}</strong>{' '}
                                     {lang === 'en'
                                        ? 'Do not use vertical Shorts videos. Google Play lists videos horizontally and disables portrait/Shorts references.'
                                        : 'Dikey Shorts videosu kullanmayın. Play Store tanıtımları yatay listelendiği için dikey shorts linklerini geçersiz sayar.'}
                                   </li>
                                   <li>
                                     <strong>{lang === 'en' ? 'Public / Unlisted status:' : 'Herkese Açık / Liste Dışı:'}</strong>{' '}
                                     {lang === 'en'
                                       ? 'Make sure the video is configured as Public or Unlisted, never Private.'
                                       : 'Videonun YouTube ayarlarında "Herkese Açık" veya "Liste Dışı" olduğundan emin olun. Gizli videolar yüklenemez.'}
                                   </li>
                                   <li>
                                     <strong>{lang === 'en' ? 'Ad Monetization & Kids Policies:' : 'Reklamsızlık & Çocuk Politikası:'}</strong>{' '}
                                     {lang === 'en'
                                       ? 'Ads must be completely turned off on this video for ideal play store listing display. Also, do not flag it as age-restricted or made for children.'
                                       : 'Videonun sorunsuz yayınlanması için YouTube\'da videodan para kazanma (reklamlar) kapalı olmalı, yaş kısıtlaması veya çocuklara özel ayarı bulunmamalıdır.'}
                                   </li>
                                 </ul>
                                </div>
                              </div>
                            </div>

                            {/* Goofind Promo Video Storyboard & Script Builder */}
                            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative mt-6 text-left">
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-[14px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                  {lang === 'en' ? 'Promo Video Creator Studio' : 'Goofind Tanıtım Videosu Yapım Atölyesi'}
                                </span>
                                <span className="bg-emerald-500/10 text-emerald-700 text-[12px] font-mono font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                                  {lang === 'en' ? '30-Sec App Store Teaser' : '30 Saniyelik Hazır Senaryo'}
                                </span>
                              </div>

                              <div className="space-y-4">
                                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                                  {lang === 'en'
                                    ? 'Yes! This video must specifically introduce and promote Goofind: Canada-Turkish Hub. To make this extremely easy for you, we have prepared a professional, scene-by-scene visual storyboard and timed voiceover script. You can use CapCut, Canva, or any AI video tool to create it in 5 minutes!'
                                    : 'Evet! Bu video, Google Play Store\'da yayınlanmak üzere Goofind uygulamasını ve onun sunduğu özellikleri Kanada-Türk toplumuna tanıtan hareketli bir video olacaktır. Sizin için sahne sahne görsel yönetim planını, saniye zamanlamalarını ve kopyalanabilir seslendirme metinlerini hazırladık:'}
                                </p>

                                {/* Storyboard Scenes Timeline */}
                                <div className="space-y-3.5 pt-2">
                                  {/* Scene 1 */}
                                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-[14px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                                        <span className="w-2.5 h-2.5 rounded-full bg-primary flex items-center justify-center text-[11px] text-white">1</span>
                                        {lang === 'en' ? 'Scene 1: Introduction (0s - 5s)' : 'Sahne 1: Giriş ve Hoş Geldiniz (0s - 5s)'}
                                      </span>
                                      <span className="text-[13px] font-mono text-slate-400 font-bold">5 Secs</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-600 font-sans">
                                      <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                                        <strong className="text-[13px] text-slate-400 uppercase tracking-wider block mb-1">{lang === 'en' ? '👁️ Visual Idea' : '👁️ Görsel Detay'}</strong>
                                        {lang === 'en' 
                                          ? 'Fast graphic montage showing the Canadian maple leaf morphing beautifully with the Turkish crescent, ending on a glowing Goofind App Icon.'
                                          : 'Kanada akçaağaç yaprağının Türk hilali ile bütünleştiği şık bir animasyon ve ekranda parlayan Goofind logosu belirir.'}
                                      </div>
                                      <div className="bg-primary/5 p-2.5 rounded-lg border border-primary/10 relative">
                                        <strong className="text-[13px] text-primary uppercase tracking-wider block mb-1">{lang === 'en' ? '🎙️ Voiceover (Script)' : '🎙️ Seslendirme Metni'}</strong>
                                        <p className="italic font-bold text-slate-800">
                                          {lang === 'en'
                                            ? '“Welcome to Goofind, the ultimate community hub and directory for Canadian-Turkish life!”'
                                            : '“Kanada’daki Türk toplumunun buluşma noktası ve en geniş kapsamlı rehberi Goofind’a hoş geldiniz!”'}
                                        </p>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            navigator.clipboard.writeText(lang === 'en' ? 'Welcome to Goofind, the ultimate community hub and directory for Canadian-Turkish life!' : 'Kanada’daki Türk toplumunun buluşma noktası ve en geniş kapsamlı rehberi Goofind’a hoş geldiniz!');
                                            showToast(lang === 'en' ? 'Copied script 1!' : 'Seslendirme 1 kopyalandı!', 'success');
                                          }}
                                          className="absolute right-2 top-2 p-1 text-[12px] font-black uppercase text-primary border-none bg-transparent cursor-pointer hover:underline"
                                        >
                                          {lang === 'en' ? 'Copy' : 'Kopyala'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Scene 2 */}
                                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-[14px] font-black text-accent-vivid uppercase tracking-widest flex items-center gap-1">
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex items-center justify-center text-[11px] text-white">2</span>
                                        {lang === 'en' ? 'Scene 2: Yellow Pages & Local Shops (5s - 12s)' : 'Sahne 2: Esnaf ve Hizmet Rehberi (5s - 12s)'}
                                      </span>
                                      <span className="text-[13px] font-mono text-slate-400 font-bold">7 Secs</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-600 font-sans">
                                      <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                                        <strong className="text-[13px] text-slate-400 uppercase tracking-wider block mb-1">{lang === 'en' ? '👁️ Visual Idea' : '👁️ Görsel Detay'}</strong>
                                        {lang === 'en'
                                          ? 'Mockup transitions showing the directory screen: zooming into Turkish restaurants, immigration lawyers, driving instructors, doctors, and specialists.'
                                          : 'Uygulamadaki işletme rehberi ekranı hızlıca akar; Türk restoranları, avukatlar, göçmenlik danışmanları ve uzmanların listesi gösterilir.'}
                                      </div>
                                      <div className="bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10 relative">
                                        <strong className="text-[13px] text-accent-vivid uppercase tracking-wider block mb-1">{lang === 'en' ? '🎙️ Voiceover (Script)' : '🎙️ Seslendirme Metni'}</strong>
                                        <p className="italic font-bold text-slate-800">
                                          {lang === 'en'
                                            ? '“Easily find verified local Turkish-owned businesses, doctors, lawyers, and specialists right in your city!”'
                                            : '“Şehrinizdeki onaylı Türk işletmelerine, uzmanlara, Türk doktor ve avukatlara saniyeler içinde ulaşın.”'}
                                        </p>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            navigator.clipboard.writeText(lang === 'en' ? 'Easily find verified local Turkish-owned businesses, doctors, lawyers, and specialists right in your city!' : 'Şehrinizdeki onaylı Türk işletmelerine, uzmanlara, Türk doktor ve avukatlara saniyeler içinde ulaşın.');
                                            showToast(lang === 'en' ? 'Copied script 2!' : 'Seslendirme 2 kopyalandı!', 'success');
                                          }}
                                          className="absolute right-2 top-2 p-1 text-[12px] font-black uppercase text-accent-vivid border-none bg-transparent cursor-pointer hover:underline"
                                        >
                                          {lang === 'en' ? 'Copy' : 'Kopyala'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Scene 3 */}
                                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500"></div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-[14px] font-black text-teal-600 uppercase tracking-widest flex items-center gap-1">
                                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500 flex items-center justify-center text-[11px] text-white">3</span>
                                        {lang === 'en' ? 'Scene 3: Flyers, Events & Community (12s - 20s)' : 'Sahne 3: Fırsatlar, Broşürler ve Topluluk (12s - 20s)'}
                                      </span>
                                      <span className="text-[13px] font-mono text-slate-400 font-bold">8 Secs</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-600 font-sans">
                                      <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                                        <strong className="text-[13px] text-slate-400 uppercase tracking-wider block mb-1">{lang === 'en' ? '👁️ Visual Idea' : '👁️ Görsel Detay'}</strong>
                                        {lang === 'en'
                                          ? 'A glowing showcase of Weekly Flyers with active discounts. Fast chat window sliding in with a helpful support assistant.'
                                          : 'Uygulamadaki haftalık broşürlerin (Flyers) ve indirimlerin canlı görüntüsü akar. Hemen ardından mesajlaşma ve canlı yardım asistanı gösterilir.'}
                                      </div>
                                      <div className="bg-teal-500/5 p-2.5 rounded-lg border border-teal-500/10 relative">
                                        <strong className="text-[13px] text-teal-700 uppercase tracking-wider block mb-1">{lang === 'en' ? '🎙️ Voiceover (Script)' : '🎙️ Seslendirme Metni'}</strong>
                                        <p className="italic font-bold text-slate-800">
                                          {lang === 'en'
                                            ? '“Browse weekly flyers, track hot deals, keep up with community events, and chat in real-time with helpful support!”'
                                            : '“Haftalık market broşürlerini inceleyin, en sıcak indirimleri takip edin ve topluluk asistanıyla canlı sohbet edin!”'}
                                        </p>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            navigator.clipboard.writeText(lang === 'en' ? 'Browse weekly flyers, track hot deals, keep up with community events, and chat in real-time with helpful support!' : 'Haftalık market broşürlerini inceleyin, en sıcak indirimleri takip edin ve topluluk asistanıyla canlı sohbet edin!');
                                            showToast(lang === 'en' ? 'Copied script 3!' : 'Seslendirme 3 kopyalandı!', 'success');
                                          }}
                                          className="absolute right-2 top-2 p-1 text-[12px] font-black uppercase text-teal-700 border-none bg-transparent cursor-pointer hover:underline"
                                        >
                                          {lang === 'en' ? 'Copy' : 'Kopyala'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Scene 4 */}
                                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-[14px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-1">
                                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500 flex items-center justify-center text-[11px] text-white">4</span>
                                        {lang === 'en' ? 'Scene 4: Travel Guides & News Hub (20s - 26s)' : 'Sahne 4: Gezilecek Yerler ve Kanada Gündemi (20s - 26s)'}
                                      </span>
                                      <span className="text-[13px] font-mono text-slate-400 font-bold">6 Secs</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-600 font-sans">
                                      <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                                        <strong className="text-[13px] text-slate-400 uppercase tracking-wider block mb-1">{lang === 'en' ? '👁️ Visual Idea' : '👁️ Görsel Detay'}</strong>
                                        {lang === 'en'
                                          ? 'Mockup showing the travel layout: images of Canadian National Parks, travel tips, and real-time summarized community news cards.'
                                          : 'Gezilecek yerler sayfası açılır: Kanada milli parkları, ulaşım ipuçları ve yapay zeka destekli güncel Kanada göçmenlik/çalışma haberleri gelir.'}
                                      </div>
                                      <div className="bg-purple-500/5 p-2.5 rounded-lg border border-purple-500/10 relative">
                                        <strong className="text-[13px] text-purple-700 uppercase tracking-wider block mb-1">{lang === 'en' ? '🎙️ Voiceover (Script)' : '🎙️ Seslendirme Metni'}</strong>
                                        <p className="italic font-bold text-slate-800">
                                          {lang === 'en'
                                            ? '“Discover breath-taking Canadian landscapes with customized travel tips and get verified immigration and local workspace news instantly.”'
                                            : '“Kanada’nın görülmesi gereken harikalarını ulaşım ipuçlarıyla keşfedin, en güncel göçmenlik ve yaşam haberlerine anında ulaşın.”'}
                                        </p>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            navigator.clipboard.writeText(lang === 'en' ? 'Discover breath-taking Canadian landscapes with customized travel tips and get verified immigration and local workspace news instantly.' : 'Kanada’nın görülmesi gereken harikalarını ulaşım ipuçlarıyla keşfedin, en güncel göçmenlik ve yaşam haberlerine anında ulaşın.');
                                            showToast(lang === 'en' ? 'Copied script 4!' : 'Seslendirme 4 kopyalandı!', 'success');
                                          }}
                                          className="absolute right-2 top-2 p-1 text-[12px] font-black uppercase text-purple-700 border-none bg-transparent cursor-pointer hover:underline"
                                        >
                                          {lang === 'en' ? 'Copy' : 'Kopyala'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Scene 5 */}
                                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-[14px] font-black text-red-600 uppercase tracking-widest flex items-center gap-1">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 flex items-center justify-center text-[11px] text-white">5</span>
                                        {lang === 'en' ? 'Scene 5: Ending / Outro (26s - 30s)' : 'Sahne 5: Kapanış ve Aksiyona Çağrı (26s - 30s)'}
                                      </span>
                                      <span className="text-[13px] font-mono text-slate-400 font-bold">4 Secs</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-600 font-sans">
                                      <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                                        <strong className="text-[13px] text-slate-400 uppercase tracking-wider block mb-1">{lang === 'en' ? '👁️ Visual Idea' : '👁️ Görsel Detay'}</strong>
                                        {lang === 'en'
                                          ? 'A high-contrast beautiful splash showing both Android & iOS Play download buttons, the official app icon, and the premium feature graphic glowing.'
                                          : 'Ekranda Türk ve Kanada bayraklı lüks Goofind uygulama logosu ile birlikte Google Play ve App Store indir butonları parlayarak ekrana gelir.'}
                                      </div>
                                      <div className="bg-red-500/5 p-2.5 rounded-lg border border-red-500/10 relative">
                                        <strong className="text-[13px] text-red-700 uppercase tracking-wider block mb-1">{lang === 'en' ? '🎙️ Voiceover (Script)' : '🎙️ Seslendirme Metni'}</strong>
                                        <p className="italic font-bold text-slate-800">
                                          {lang === 'en'
                                            ? '“Your Canadian journey starts here. Download Goofind on Google Play today!”'
                                            : '“Kanada’daki yolculuğunuz burada başlıyor. Goofind’ı hemen bugün Google Play’den indirin!”'}
                                        </p>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            navigator.clipboard.writeText(lang === 'en' ? 'Your Canadian journey starts here. Download Goofind on Google Play today!' : 'Kanada’daki yolculuğunuz burada başlıyor. Goofind’ı hemen bugün Google Play’den indirin!');
                                            showToast(lang === 'en' ? 'Copied script 5!' : 'Seslendirme 5 kopyalandı!', 'success');
                                          }}
                                          className="absolute right-2 top-2 p-1 text-[12px] font-black uppercase text-red-700 border-none bg-transparent cursor-pointer hover:underline"
                                        >
                                          {lang === 'en' ? 'Copy' : 'Kopyala'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Step-by-Step Quick Action Production Instructions */}
                                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4.5 mt-2 text-xs">
                                  <h5 className="text-[14px] font-black text-emerald-800 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    {lang === 'en' ? 'How to build and launch inside 5 minutes:' : '5 Dakikada Profesyonel Tanıtım Videosu Nasıl Hazırlanır?'}
                                  </h5>
                                  <ul className="text-[14px] text-slate-600 font-medium space-y-2.5 leading-relaxed list-decimal pl-4">
                                    <li>
                                      <strong>{lang === 'en' ? 'Step 1: Text-to-Speech' : 'Adım 1: Seslendirmeyi Üretin'}</strong> —{' '}
                                      {lang === 'en'
                                        ? 'Copy all 5 scenes scripts and paste them into a free high-quality AI voice over tool such as ElevenLabs, Narakeet, or CapCut TTS. Keep the tone warm, friendly, and dynamic.'
                                        : 'Yukarıda kopyalayabileceğiniz 5 sahnenin seslendirme metinlerini sırasıyla ElevenLabs, CapCut veya ücretsiz bir yapay zeka ses okuyucuya (TTS) yükleyin. Enerjik, Türk veya İngilizce bir ses tonu seçin.'}
                                    </li>
                                    <li>
                                      <strong>{lang === 'en' ? 'Step 2: Assemble in Canva or CapCut' : 'Adım 2: Canva veya CapCut\'ta Birleştirin'}</strong> —{' '}
                                      {lang === 'en'
                                        ? 'Create a horizontal video (16:9 / 1920x1080). Import the Voiceover, drop some upbeat, copyright-free instrumental music in the background, and add simple screenshots of the application matching each scene.'
                                        : 'Yatay bir video şablonu açın (1920x1080 yatay). Seslendirmeyi ve arkaya telifsiz, canlandırıcı hafif bir fon müziği ekleyin. Goofind uygulamasından aldığınız ekran görüntülerini (İşletmeler, Broşürler, Gezilecek Yerler sayfaları) seslerin üzerine yerleştirin.'}
                                    </li>
                                    <li>
                                      <strong>{lang === 'en' ? 'Step 3: Export & Upload to YouTube' : 'Adım 3: Dışa Aktarın ve YouTube\'a Yükleyin'}</strong> —{' '}
                                      {lang === 'en'
                                        ? 'Export the final video as an MP4, upload to your YouTube channel as Public or Unlisted, and use the Google Play compatible URL to publish your store listing!'
                                        : 'Hazırladığınız videoyu MP4 olarak kaydedip kendi YouTube kanalınıza "Herkese Açık" ya da "Liste Dışı" seçeneğiyle yükleyin. Linki de yukarıdaki kutucuktan kopyaladığınız formatta Play Store\'a ekleyin ve anında yayınlayın!'}
                                    </li>
                                  </ul>
                                </div>

                                {/* --- INTERACTIVE GOOFIND PROMO VIDEO PREVIEW SIMULATOR --- */}
                                <div className="mt-6 border-t border-slate-200/60 pt-6">
                                  <h4 className="text-[15px] font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                                    {lang === 'en' ? 'Interactive Promo Video Preview Player (30s Concept)' : 'Tanıtım Videosu Saniye Saniye Önizleme Simülatörü (30sn)'}
                                  </h4>
                                  <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-4">
                                    {lang === 'en'
                                      ? 'Experience the official Goofind teaser video concept before production! You can now watch the preview below, download the voiceover script, or instantly generate and export the real HD Teaser Video (.webm file) using our browser-based recording studio below! Note: WebM files can be uploaded directly to YouTube or converted to MP4 in seconds using CapCut or standard tools.'
                                      : 'Hazırladığınız resmi Goofind tanıtım videosu konseptini canlı olarak aşağıda izleyin. Dilerseniz senaryoyu indirebilir veya yeni geliştirdiğimiz tarayıcı içi video stüdyosu sayesinde HD Tanıtım Videosunu (.webm dosyası) bilgisayarınıza anında ürettirip indirebilirsiniz! İndireceğiniz yüksek kaliteli video dosyasını doğrudan YouTube\'a yükleyebilir veya CapCut gibi araçlarda saniyeler içinde MP4 formatına dönüştürebilirsiniz.'}
                                  </p>

                                  {/* Simulated Horizontal Video Player Screen (16:9 Aspect Ratio) */}
                                  <div className="relative aspect-[16/9] w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between group">
                                    
                                    {/* Video Recording Status Modal Overlay */}
                                    {isVideoRecording && (
                                      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center select-none">
                                        <div className="w-14 h-14 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin mb-4 shadow-lg shadow-emerald-500/20"></div>
                                        <h4 className="text-white text-xs sm:text-sm font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                                          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                                          {lang === 'en' ? 'RECORDING & GENERATING HD TEASER VIDEO...' : 'HD TANITIM VİDEOSU STÜDYODA ÜRETİLİYOR...'}
                                        </h4>
                                        <p className="text-slate-400 text-[14px] sm:text-xs max-w-sm mb-4 leading-relaxed font-sans font-medium">
                                          {lang === 'en' 
                                            ? 'Please keep this browser window active. We are drawing gorgeous 1280x720 frames at 30 FPS and recording your customized teaser!'
                                            : 'Lütfen tarayıcı pencerenizi değiştirmeyin veya kapatmayın. Sizin için arka planda saniyede 30 kare (30 FPS) hızında 1280x720 HD sahneleri saniye saniye çizerek kaydediyoruz!'}
                                        </p>
                                        <div className="w-full max-w-xs bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/60 p-[1px]">
                                          <div 
                                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-100"
                                            style={{ width: `${videoRecordProgress}%` }}
                                          ></div>
                                        </div>
                                        <span className="text-[14px] font-mono font-black text-emerald-400 mt-2.5">
                                          {videoRecordProgress}% {lang === 'en' ? 'COMPLETED' : 'TAMAMLANDI'}
                                        </span>
                                      </div>
                                    )}
                                    {/* App Header/Watermark inside video */}
                                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                                      <div className="bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-850 flex items-center gap-1.5 scale-90 sm:scale-100 origin-top-left">
                                        <div className="w-4 h-4 bg-white rounded flex items-center justify-center">
                                          <StyledG className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-[13px] font-black text-white uppercase tracking-wider font-sans">Goofind Teaser</span>
                                      </div>
                                      <div className="bg-red-650 text-white text-[12px] font-bold uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1">
                                        <span className="w-1.2 h-1.2 rounded-full bg-white animate-ping"></span>
                                        LIVE CONCEPT
                                      </div>
                                    </div>

                                    {/* Video Content dynamic render */}
                                    <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                                      {/* Scenic Background & Visuals depend on videoSimActiveScene */}
                                      {videoSimActiveScene === 1 && (
                                        <motion.div 
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="flex flex-col items-center text-center space-y-3 z-0"
                                        >
                                          <div className="flex items-center gap-2">
                                            <span className="text-4xl animate-bounce">🍁</span>
                                            <span className="text-4xl">🌙</span>
                                          </div>
                                          <h3 className="text-white text-base sm:text-2xl font-black uppercase tracking-widest italic font-display">
                                            GOOFIND
                                          </h3>
                                          <p className="text-emerald-400 font-mono text-[13px] sm:text-xs tracking-wider uppercase font-black">
                                            {lang === 'en' ? 'CANADA-TURKISH COMMUNITY HUB' : 'KANADA-TÜRK REHBERİ & PAYLAŞIM MERKEZİ'}
                                          </p>
                                        </motion.div>
                                      )}

                                      {videoSimActiveScene === 2 && (
                                        <motion.div 
                                          initial={{ opacity: 0, scale: 1.1 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="flex flex-col items-center text-center space-y-3 z-0 w-full max-w-sm"
                                        >
                                          <span className="text-3xl">🏪 🩺 ⚖️ 🍽️</span>
                                          <h3 className="text-emerald-400 text-sm sm:text-lg font-black uppercase tracking-wider leading-none">
                                            {lang === 'en' ? 'LOCAL BUSINESS DIRECTORY' : 'ESNAF VE UZMAN REHBERİ'}
                                          </h3>
                                          <div className="w-full bg-white/10 rounded-xl p-2 border border-white/10 text-left space-y-1.5">
                                            <div className="bg-white/20 h-5 rounded px-2 flex items-center justify-between text-[12px] sm:text-[14px] text-white font-bold">
                                              <span>📍 Kebap & Turkish Dining</span>
                                              <span className="text-emerald-300">★ 4.9</span>
                                            </div>
                                            <div className="bg-white/10 h-5 rounded px-2 flex items-center justify-between text-[12px] sm:text-[14px] text-white/70">
                                              <span>👨‍⚖️ Immigration Lawyers</span>
                                              <span>★ 5.0</span>
                                            </div>
                                          </div>
                                        </motion.div>
                                      )}

                                      {videoSimActiveScene === 3 && (
                                        <motion.div 
                                          initial={{ opacity: 0, y: 15 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          className="flex flex-col items-center text-center space-y-3 z-0 w-full max-w-md"
                                        >
                                          <span className="text-3xl">📰 💬 🎫</span>
                                          <h3 className="text-accent-vivid text-sm sm:text-lg font-black uppercase tracking-wider leading-none">
                                            {lang === 'en' ? 'WEEKLY FLYERS & DEALS' : 'FIRSAT BROŞÜRLERİ & SOHBET'}
                                          </h3>
                                          <div className="flex gap-2 w-full justify-center">
                                            <div className="bg-white/10 p-2 rounded-xl border border-white/5 text-center flex-1">
                                              <span className="text-[14px] font-black text-white block uppercase">Flyers</span>
                                              <span className="text-red-400 text-[15px] font-black">%25 OFF</span>
                                            </div>
                                            <div className="bg-white/10 p-2 rounded-xl border border-white/5 text-center flex-1">
                                              <span className="text-[14px] font-black text-white block uppercase">Events</span>
                                              <span className="text-emerald-400 text-[14px] font-bold">Live Picnic</span>
                                            </div>
                                          </div>
                                        </motion.div>
                                      )}

                                      {videoSimActiveScene === 4 && (
                                        <motion.div 
                                          initial={{ opacity: 0, scale: 0.95 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="flex flex-col items-center text-center space-y-3.5 z-0"
                                        >
                                          <span className="text-3xl">🏔️ 🏞️ 🚌</span>
                                          <h3 className="text-primary-light text-sm sm:text-lg font-black uppercase tracking-wider leading-none">
                                            {lang === 'en' ? 'GEZİLECEK YERLER & NEWS' : 'GEZİLECEK YERLER VE KANADA HABERLERİ'}
                                          </h3>
                                          <p className="text-white/80 font-medium text-[13px] sm:text-[15px] max-w-xs leading-relaxed">
                                            {lang === 'en' ? 'Explore gorgeous parks with local travel tips and immigration guide summaries.' : 'Kanada parklarını keşfedin, seyahat planları ve göçmenlik haberleri özetlerine anında ulaşın.'}
                                          </p>
                                        </motion.div>
                                      )}

                                      {videoSimActiveScene === 5 && (
                                        <motion.div 
                                          initial={{ opacity: 0, scale: 1.2 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="flex flex-col items-center text-center space-y-4 z-0"
                                        >
                                          <div className="relative flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-xl shadow-primary/30">
                                            <StyledG className="w-10 h-10" />
                                          </div>
                                          <div className="space-y-1">
                                            <h3 className="text-white text-base sm:text-xl font-black uppercase tracking-widest animate-pulse">
                                              GOOFIND
                                            </h3>
                                            <p className="text-slate-400 font-bold text-[12px] sm:text-[14px] uppercase tracking-widest">
                                              {lang === 'en' ? 'YOUR CANADIAN JOURNEY STARTS HERE' : 'KANADA’DAKİ REHBERİNİZ VE MERKEZİNİZ'}
                                            </p>
                                          </div>
                                          <div className="flex gap-2 justify-center">
                                            <span className="bg-slate-905 border border-slate-800 text-white rounded px-2.5 py-0.5 text-[12px] font-mono font-black select-none">
                                              Google Play
                                            </span>
                                            <span className="bg-slate-905 border border-slate-800 text-white rounded px-2.5 py-0.5 text-[12px] font-mono font-black select-none">
                                              App Store
                                            </span>
                                          </div>
                                        </motion.div>
                                      )}
                                    </div>

                                    {/* Real-time Subtitle Block Overlay */}
                                    <div className="px-6 pb-3 pt-4 bg-gradient-to-t from-black via-black/90 to-transparent border-t border-white/5 z-10 text-center select-none shrink-0 min-h-[60px] flex items-center justify-center">
                                      <p className="text-accent-vivid text-[14px] sm:text-xs md:text-sm font-extrabold max-w-xl mx-auto leading-normal uppercase tracking-wider font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                                        {videoSimActiveScene === 1 && (lang === 'en' ? '“Welcome to Goofind, the ultimate community hub and directory for Canadian-Turkish life!”' : '“Kanada’daki Türk toplumunun buluşma noktası ve en geniş kapsamlı rehberi Goofind’a hoş geldiniz!”')}
                                        {videoSimActiveScene === 2 && (lang === 'en' ? '“Easily find verified local Turkish-owned businesses, doctors, lawyers, and specialists right in your city!”' : '“Şehrinizdeki onaylı Türk işletmelerine, uzmanlara, Türk doktor ve avukatlara saniyeler içinde ulaşın.”')}
                                        {videoSimActiveScene === 3 && (lang === 'en' ? '“Browse weekly flyers, track hot deals, keep up with community events, and chat in real-time with helpful support!”' : '“Haftalık market broşürlerini inceleyin, en sıcak indirimleri takip edin ve topluluk asistanıyla canlı sohbet edin!”')}
                                        {videoSimActiveScene === 4 && (lang === 'en' ? '“Discover breath-taking Canadian landscapes with customized travel tips and get verified immigration and local workspace news instantly.”' : '“Kanada’nın görülmesi gereken harikalarını ulaşım ipuçlarıyla keşfedin, en güncel göçmenlik ve yaşam haberlerine anında ulaşın.”')}
                                        {videoSimActiveScene === 5 && (lang === 'en' ? '“Your Canadian journey starts here. Download Goofind on Google Play today!”' : '“Kanada’daki yolculuğunuz burada başlıyor. Goofind’ı hemen bugün Google Play’den indirin!”')}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Progress bar and timeline controls */}
                                  <div className="mt-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-left">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span className="text-[14px] font-mono text-slate-400 font-bold">TIME:</span>
                                        <span className="bg-slate-105 px-2.5 py-0.5 rounded font-mono text-xs text-slate-800 font-black tracking-wider">
                                          00:{videoSimTime < 10 ? `0${videoSimTime}` : videoSimTime} / 00:30
                                        </span>
                                        {videoSimPlaying && (
                                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-100 text-red-600 rounded text-[13px] font-black uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                                            PLAYING
                                          </span>
                                        )}
                                      </div>

                                      <div className="text-[14px] font-black text-right uppercase tracking-widest text-primary">
                                        {lang === 'en' ? `Scene ${videoSimActiveScene} Active` : `Sahne ${videoSimActiveScene} Aktif`}
                                      </div>
                                    </div>

                                    {/* 30-Sec Timeline Progress Bar */}
                                    <div className="relative w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
                                      <div 
                                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-accent via-accent-mid to-primary rounded-full transition-all duration-300 shadow-sm"
                                        style={{ width: `${(videoSimTime / 30) * 100}%` }}
                                      ></div>
                                      
                                      {/* Interactive Scene Markers */}
                                      <button 
                                        type="button"
                                        onClick={() => setVideoSimTime(0)}
                                        className="absolute left-0 top-0 bottom-0 w-2.5 bg-white/20 hover:bg-white/50 border-r border-slate-300 cursor-pointer text-[11px] font-mono text-slate-600 font-bold px-1 py-1 origin-left"
                                        title="Scene 1"
                                      >1</button>
                                      <button 
                                        type="button"
                                        onClick={() => setVideoSimTime(5)}
                                        className="absolute left-[16.6%] top-0 bottom-0 w-2.5 bg-white/20 hover:bg-white/50 border-r border-slate-300 cursor-pointer text-[11px] font-mono text-slate-600 font-bold px-1 py-1"
                                        title="Scene 2"
                                      >2</button>
                                      <button 
                                        type="button"
                                        onClick={() => setVideoSimTime(12)}
                                        className="absolute left-[40%] top-0 bottom-0 w-2.5 bg-white/20 hover:bg-white/50 border-r border-slate-300 cursor-pointer text-[11px] font-mono text-slate-600 font-bold px-1 py-1"
                                        title="Scene 3"
                                      >3</button>
                                      <button 
                                        type="button"
                                        onClick={() => setVideoSimTime(20)}
                                        className="absolute left-[66.6%] top-0 bottom-0 w-2.5 bg-white/20 hover:bg-white/50 border-r border-slate-300 cursor-pointer text-[11px] font-mono text-slate-600 font-bold px-1 py-1"
                                        title="Scene 4"
                                      >4</button>
                                      <button 
                                        type="button"
                                        onClick={() => setVideoSimTime(26)}
                                        className="absolute left-[86.6%] top-0 bottom-0 w-2.5 bg-white/20 hover:bg-white/50 border-r border-slate-300 cursor-pointer text-[11px] font-mono text-slate-600 font-bold px-1 py-1"
                                        title="Scene 5"
                                      >5</button>
                                    </div>

                                    {/* Action buttons inside timeline */}
                                    <div className="flex flex-wrap items-center gap-2">
                                      {/* Play / Pause */}
                                      <button
                                        type="button"
                                        onClick={() => setVideoSimPlaying(!videoSimPlaying)}
                                        className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-black text-[14px] uppercase tracking-widest rounded-lg flex items-center gap-1.5 cursor-pointer border-none shadow-sm active:scale-95 transition-all w-full sm:w-auto text-center justify-center`}
                                      >
                                        {videoSimPlaying ? (
                                          <>
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                            </svg>
                                            {lang === 'en' ? 'Pause' : 'Durdur'}
                                          </>
                                        ) : (
                                          <>
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                              <path d="M8 5v14l11-7z"/>
                                            </svg>
                                            {lang === 'en' ? 'Play Concept Previews' : 'Simülatörü Oynat'}
                                          </>
                                        )}
                                      </button>

                                      {/* Reset / Stop */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setVideoSimPlaying(false);
                                          setVideoSimTime(0);
                                        }}
                                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-[14px] uppercase tracking-widest rounded-lg cursor-pointer border-none active:scale-95 transition-all flex items-center gap-1.5 text-center justify-center font-sans"
                                      >
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M6 6h12v12H6V6z"/>
                                        </svg>
                                        {lang === 'en' ? 'Reset' : 'Sıfırla'}
                                      </button>

                                      {/* Download Actual Video (WebM) */}
                                      <button
                                        type="button"
                                        onClick={startCanvasVideoRecording}
                                        disabled={isVideoRecording}
                                        className={`px-3.5 py-2 text-white font-black text-[14px] uppercase tracking-widest rounded-lg cursor-pointer border-none active:scale-95 transition-all flex items-center gap-1.5 text-center justify-center font-sans shadow-md ${
                                          isVideoRecording 
                                            ? 'bg-slate-400 cursor-not-allowed shadow-none' 
                                            : 'bg-gradient-to-r from-accent-dark via-accent to-accent-mid hover:brightness-110 shadow-red-500/10'
                                        }`}
                                      >
                                        <svg className="w-3.5 h-3.5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                        </svg>
                                        {lang === 'en' ? 'Generate & Export Real HD Video (WebM)' : 'HD Tanıtım Videosunu Üret & İndir (WebM)'}
                                      </button>

                                      {/* Download Video Script (TXT) */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const scriptContent = `
GOOFIND OFFICIAL PROMO VIDEO STORYBOARD & VOICE-OVER SCRIPT (30s CONCEPT)
========================================================================

SCENE 1: Welcome & Intro (0s - 5s)
------------------------------------------------------------------------
[Visual Idea]: A modern cinematic entry displaying the bold elegant Goofind brand signature over clean background with warm Canada & Turkish animated icons.
[Voice-over Script (EN)]: "Welcome to Goofind, the ultimate community hub and directory for Canadian-Turkish life!"
[Voice-over Script (TR)]: "Kanada’daki Türk toplumunun buluşma noktası ve en geniş kapsamlı rehberi Goofind’a hoş geldiniz!"

SCENE 2: Premium Business & Experts Directory (5s - 12s)
------------------------------------------------------------------------
[Visual Idea]: Smooth scrolling list of verified local businesses, restaurants, lawyers, and Turkish doctors with active star ratings & map dots.
[Voice-over Script (EN)]: "Easily find verified local Turkish-owned businesses, doctors, lawyers, and specialists right in your city!"
[Voice-over Script (TR)]: "Şehrinizdeki onaylı Türk işletmelerine, uzmanlara, Türk doktor ve avukatlara saniyeler içinde ulaşın."

SCENE 3: Flyers, Events & Community Active Chat (12s - 20s)
------------------------------------------------------------------------
[Visual Idea]: A glowing layout of current weekly supermarket discounts & community picnics. Shows instant messaging with the support assistant.
[Voice-over Script (EN)]: "Browse weekly flyers, track hot deals, keep up with community events, and chat in real-time with helpful support!"
[Voice-over Script (TR)]: "Haftalık market broşürlerini inceleyin, en sıcak indirimleri takip edin ve topluluk asistanıyla canlı sohbet edin!"

SCENE 4: Personalized National Travel & Workspace News (20s - 26s)
------------------------------------------------------------------------
[Visual Idea]: Gorgeous Canadian national parks and destination guides combined with real-time summarized local laws and immigration guidelines.
[Voice-over Script (EN)]: "Discover breath-taking Canadian landscapes with customized travel tips and get verified immigration and local workspace news instantly."
[Voice-over Script (TR)]: "Kanada’nın görülmesi gereken harikalarını ulaşım ipuçlarıyla keşfedin, en güncel göçmenlik ve yaşam haberlerine anında ulaşın."

SCENE 5: Beautiful Outro & Calls to Action (26s - 30s)
------------------------------------------------------------------------
[Visual Idea]: Gleaming app insignia flanked by "Available on Google Play & iOS App Store" download links.
[Voice-over Script (EN)]: "Your Canadian journey starts here. Download Goofind on Google Play today!"
[Voice-over Script (TR)]: "Kanada’daki yolculuğunuz burada başlıyor. Goofind’ı hemen bugün Google Play’den indirin!"

========================================================================
Designed with ❤️ for Goofind App Store Listings.
`;
                                          const blob = new Blob([scriptContent.trim()], { type: "text/plain;charset=utf-8" });
                                          const url = URL.createObjectURL(blob);
                                          const link = document.createElement("a");
                                          link.href = url;
                                          link.download = "goofind_promo_video_storyboard_script.txt";
                                          document.body.appendChild(link);
                                          link.click();
                                          document.body.removeChild(link);
                                          URL.revokeObjectURL(url);
                                          showToast(
                                            lang === 'en' 
                                              ? 'Video Script & Storyboard downloaded as TXT file!' 
                                              : 'Tanıtım videosu senaryo ve storyboard dosyası bilgisayarınıza İndirildi!', 
                                            'success'
                                          );
                                        }}
                                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[14px] uppercase tracking-widest rounded-lg cursor-pointer border-none active:scale-95 transition-all flex items-center gap-1.5 text-center justify-center font-sans shadow-md shadow-emerald-500/10"
                                      >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                        </svg>
                                        {lang === 'en' ? 'Download Video Script (TXT)' : 'Senaryoyu Bilgisayara İndir (TXT)'}
                                      </button>

                                      {/* Step Navigation Links */}
                                      <div className="flex gap-1.5 items-center sm:ml-auto w-full sm:w-auto overflow-x-auto py-1 sm:py-0">
                                        <button 
                                          type="button" 
                                          onClick={() => setVideoSimTime(0)}
                                          className={`px-2 py-1 rounded text-[12px] font-black uppercase transition-all tracking-wider border-none cursor-pointer ${videoSimActiveScene === 1 ? 'bg-primary text-white font-extrabold' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                        >
                                          Part 1 (0s)
                                        </button>
                                        <button 
                                          type="button" 
                                          onClick={() => setVideoSimTime(5)}
                                          className={`px-2 py-1 rounded text-[12px] font-black uppercase transition-all tracking-wider border-none cursor-pointer ${videoSimActiveScene === 2 ? 'bg-primary text-white font-extrabold' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                        >
                                          Part 2 (5s)
                                        </button>
                                        <button 
                                          type="button" 
                                          onClick={() => setVideoSimTime(12)}
                                          className={`px-2 py-1 rounded text-[12px] font-black uppercase transition-all tracking-wider border-none cursor-pointer ${videoSimActiveScene === 3 ? 'bg-primary text-white font-extrabold' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                        >
                                          Part 3 (12s)
                                        </button>
                                        <button 
                                          type="button" 
                                          onClick={() => setVideoSimTime(20)}
                                          className={`px-2 py-1 rounded text-[12px] font-black uppercase transition-all tracking-wider border-none cursor-pointer ${videoSimActiveScene === 4 ? 'bg-primary text-white font-extrabold' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                        >
                                          Part 4 (20s)
                                        </button>
                                        <button 
                                          type="button" 
                                          onClick={() => setVideoSimTime(26)}
                                          className={`px-2 py-1 rounded text-[12px] font-black uppercase transition-all tracking-wider border-none cursor-pointer ${videoSimActiveScene === 5 ? 'bg-primary text-white font-extrabold' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                        >
                                          Part 5 (26s)
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* --- GOOFIND BRAND IDENTITY & APP ICON STUDIO (512x512) --- */}
                                <div className="mt-8 border-t border-slate-200/60 pt-8" id="brand-icon-studio">
                                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                    <div>
                                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                                        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                                        {lang === 'en' ? 'Google Play Console Brand Icon Studio' : 'Google Play Console Marka İkonu & Logo Stüdyosu'}
                                      </h4>
                                      <p className="text-[15px] text-slate-500 font-medium mt-1">
                                        {lang === 'en'
                                          ? 'Generate, preview, customize, and export your official 512x512 px store assets directly.'
                                          : 'Yüklediğiniz kurumsal fotoğraf baz alınarak hazırlanan orijinal GooFind logosunu özelleştirin, önizleyin ve indirin.'}
                                      </p>
                                    </div>
                                    <span className="bg-amber-100 text-accent-vivid text-[13px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                                      {lang === 'en' ? 'Official 512x512 Asset Ready' : '512x512 PX Play Uyumlu'}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                                    {/* Column 1: Live Interactive SVG Canvas (512x512 Representation) */}
                                    <div className="lg:col-span-5 flex flex-col items-center justify-center">
                                      <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-square rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-100 p-2 flex items-center justify-center">
                                        {/* High Fidelity SVG Vector Render */}
                                        <svg 
                                          id="playConsoleSvgIcon" 
                                          xmlns="http://www.w3.org/2000/svg" 
                                          viewBox="0 0 512 512" 
                                          className="w-full h-full transition-all duration-350 select-none shadow-inner"
                                          style={{
                                            borderRadius: logoBorderRadius === 'circle' ? '50%' : logoBorderRadius === 'squircle' ? '22%' : '0'
                                          }}
                                        >
                                          {/* Copper & Steel-blue Gradient definitions */}
                                          <defs>
                                            <linearGradient id="roseGold" x1="0%" y1="100%" x2="100%" y2="0%">
                                              <stop offset="0%" stopColor="#8C442A" />
                                              <stop offset="25%" stopColor="#C47953" />
                                              <stop offset="50%" stopColor="#ECA985" />
                                              <stop offset="75%" stopColor="#D58861" />
                                              <stop offset="100%" stopColor="#703017" />
                                            </linearGradient>
                                            <linearGradient id="steelBlue" x1="0%" y1="100%" x2="100%" y2="0%">
                                              <stop offset="0%" stopColor="#122535" />
                                              <stop offset="30%" stopColor="#2E4F69" />
                                              <stop offset="60%" stopColor="#537B9A" />
                                              <stop offset="85%" stopColor="#8AB1CE" />
                                              <stop offset="100%" stopColor="#0F1F2B" />
                                            </linearGradient>
                                            <radialGradient id="wallTexture" cx="80%" cy="20%" r="95%">
                                              <stop offset="0%" stopColor="#FAF7F2" />
                                              <stop offset="60%" stopColor="#EEECE6" />
                                              <stop offset="100%" stopColor="#D6D3C9" />
                                            </radialGradient>
                                            <filter id="logoShadow" x="-25%" y="-25%" width="150%" height="150%">
                                              <feDropShadow dx="-10" dy="12" stdDeviation="10" floodColor="#181512" floodOpacity="0.38" />
                                            </filter>
                                          </defs>

                                          {/* Interactive Background fill */}
                                          {logoBgType === 'white' && <rect width="512" height="512" fill="url(#wallTexture)" />}
                                          {logoBgType === 'charcoal' && <rect width="512" height="512" fill="#111319" />}
                                          {logoBgType === 'transparent' && <rect width="512" height="512" fill="none" />}
                                          {logoBgType === 'gradient' && (
                                            <rect width="512" height="512" fill="url(#steelBlue)" />
                                          )}

                                          {/* Logo Group */}
                                          <g 
                                            transform={logoIncludeText ? "translate(0, -35) scale(0.85)" : "translate(0, 0)"} 
                                            transform-origin="256 256"
                                            filter="url(#logoShadow)"
                                            className="transition-all duration-300"
                                          >
                                            {/* 1. Copper Outer Left Segment (270-degree crescent) */}
                                            <g>
                                              <path 
                                                d="M 296.4 105.3 A 156 156 0 1 0 407.7 292 L 370.5 292 A 120 120 0 1 1 287.1 140.1 Z" 
                                                fill={logoBgType === 'gradient' ? '#FFFFFF' : 'url(#roseGold)'} 
                                                style={{ opacity: logoBgType === 'gradient' ? 0.9 : 1 }}
                                              />
                                              {logoBgType !== 'gradient' && (
                                                <>
                                                  {/* Thin dark micro-bevel boundary */}
                                                  <path 
                                                    d="M 296.4 105.3 A 156 156 0 1 0 407.7 292 L 370.5 292 A 120 120 0 1 1 287.1 140.1 Z" 
                                                    fill="none"
                                                    stroke="rgba(12, 10, 8, 0.55)"
                                                    strokeWidth="1.2"
                                                    transform="translate(1.2, 1.5)"
                                                  />
                                                  {/* Soft metallic highlight line */}
                                                  <path 
                                                    d="M 296.4 105.3 A 156 156 0 1 0 407.7 292 L 370.5 292 A 120 120 0 1 1 287.1 140.1 Z" 
                                                    fill="none"
                                                    stroke="rgba(255, 235, 225, 0.65)"
                                                    strokeWidth="1.2"
                                                    transform="translate(-1.2, -1.5)"
                                                  />
                                                </>
                                              )}
                                            </g>
                                            
                                            {/* 2. Steel-Blue Outer Top-Right Segment */}
                                            <g>
                                              <path 
                                                d="M 296.4 105.3 A 156 156 0 0 1 407.7 220 L 370.5 220 A 120 120 0 0 0 287.1 140.1 Z" 
                                                fill={logoBgType === 'gradient' ? 'url(#roseGold)' : 'url(#steelBlue)'} 
                                              />
                                              {logoBgType !== 'gradient' && (
                                                <>
                                                  {/* Thin dark micro-bevel boundary */}
                                                  <path 
                                                    d="M 296.4 105.3 A 156 156 0 0 1 407.7 220 L 370.5 220 A 120 120 0 0 0 287.1 140.1 Z" 
                                                    fill="none"
                                                    stroke="rgba(5, 12, 22, 0.6)"
                                                    strokeWidth="1.2"
                                                    transform="translate(1.2, 1.5)"
                                                  />
                                                  {/* Soft metallic highlight line */}
                                                  <path 
                                                    d="M 296.4 105.3 A 156 156 0 0 1 407.7 220 L 370.5 220 A 120 120 0 0 0 287.1 140.1 Z" 
                                                    fill="none"
                                                    stroke="rgba(230, 245, 255, 0.55)"
                                                    strokeWidth="1.2"
                                                    transform="translate(-1.2, -1.5)"
                                                  />
                                                </>
                                              )}
                                            </g>

                                            {/* 3. Steel-Blue Inner Left Segment (180-degree half ring) */}
                                            <g>
                                              <path 
                                                d="M 279.3 169.1 A 90 90 0 0 0 232.7 342.9 L 242.0 308.2 A 54 54 0 0 1 270.0 203.8 Z" 
                                                fill={logoBgType === 'gradient' ? 'url(#roseGold)' : 'url(#steelBlue)'} 
                                              />
                                              {logoBgType !== 'gradient' && (
                                                <>
                                                  {/* Thin dark micro-bevel boundary */}
                                                  <path 
                                                    d="M 279.3 169.1 A 90 90 0 0 0 232.7 342.9 L 242.0 308.2 A 54 54 0 0 1 270.0 203.8 Z" 
                                                    fill="none"
                                                    stroke="rgba(5, 12, 22, 0.6)"
                                                    strokeWidth="1.2"
                                                    transform="translate(1.2, 1.5)"
                                                  />
                                                  {/* Soft metallic highlight line */}
                                                  <path 
                                                    d="M 279.3 169.1 A 90 90 0 0 0 232.7 342.9 L 242.0 308.2 A 54 54 0 0 1 270.0 203.8 Z" 
                                                    fill="none"
                                                    stroke="rgba(230, 245, 255, 0.55)"
                                                    strokeWidth="1.2"
                                                    transform="translate(-1.2, -1.5)"
                                                  />
                                                </>
                                              )}
                                            </g>

                                            {/* 4. Copper Inner Right Segment */}
                                            <g>
                                              <path 
                                                d="M 232.7 342.9 A 90 90 0 0 1 279.3 169.1 L 270.0 203.8 A 54 54 0 0 0 242.0 308.2 Z" 
                                                fill={logoBgType === 'gradient' ? '#FFFFFF' : 'url(#roseGold)'} 
                                                style={{ opacity: logoBgType === 'gradient' ? 0.9 : 1 }}
                                              />
                                              {logoBgType !== 'gradient' && (
                                                <>
                                                  {/* Thin dark micro-bevel boundary */}
                                                  <path 
                                                    d="M 232.7 342.9 A 90 90 0 0 1 279.3 169.1 L 270.0 203.8 A 54 54 0 0 0 242.0 308.2 Z" 
                                                    fill="none"
                                                    stroke="rgba(12, 10, 8, 0.55)"
                                                    strokeWidth="1.2"
                                                    transform="translate(1.2, 1.5)"
                                                  />
                                                  {/* Soft metallic highlight line */}
                                                  <path 
                                                    d="M 232.7 342.9 A 90 90 0 0 1 279.3 169.1 L 270.0 203.8 A 54 54 0 0 0 242.0 308.2 Z" 
                                                    fill="none"
                                                    stroke="rgba(255, 235, 225, 0.65)"
                                                    strokeWidth="1.2"
                                                    transform="translate(-1.2, -1.5)"
                                                  />
                                                </>
                                              )}
                                            </g>

                                            {/* 5. G-Bar Center Hook Segment (Steel Blue) */}
                                            <g>
                                              <path 
                                                d="M 242 220 L 370 220 L 370 256 L 274 256 L 274 292 L 238 292 L 238 256 Z" 
                                                fill={logoBgType === 'gradient' ? 'url(#roseGold)' : 'url(#steelBlue)'} 
                                              />
                                              {logoBgType !== 'gradient' && (
                                                <>
                                                  {/* Thin dark micro-bevel boundary */}
                                                  <path 
                                                    d="M 242 220 L 370 220 L 370 256 L 274 256 L 274 292 L 238 292 L 238 256 Z" 
                                                    fill="none"
                                                    stroke="rgba(5, 12, 22, 0.6)"
                                                    strokeWidth="1.2"
                                                    transform="translate(1.2, 1.5)"
                                                  />
                                                  {/* Soft metallic highlight line */}
                                                  <path 
                                                    d="M 242 220 L 370 220 L 370 256 L 274 256 L 274 292 L 238 292 L 238 256 Z" 
                                                    fill="none"
                                                    stroke="rgba(230, 245, 255, 0.55)"
                                                    strokeWidth="1.2"
                                                    transform="translate(-1.2, -1.5)"
                                                  />
                                                </>
                                              )}
                                            </g>
                                          </g>

                                          {/* Logo text - Brand signature */}
                                          {logoIncludeText && (
                                            <g>
                                              {logoBgType !== 'gradient' && (
                                                <>
                                                  {/* Crisp dark background depth layer */}
                                                  <text 
                                                    x="256" 
                                                    y="442" 
                                                    textAnchor="middle" 
                                                    fontFamily="Georgia, Cambria, 'Times New Roman', serif" 
                                                    fontWeight="800" 
                                                    fontSize="54" 
                                                    fill="rgba(12, 10, 8, 0.6)" 
                                                    letterSpacing="1"
                                                    transform="translate(1.2, 1.5)"
                                                  >
                                                    GooFind
                                                  </text>
                                                  {/* Soft highlight reflection layer */}
                                                  <text 
                                                    x="256" 
                                                    y="442" 
                                                    textAnchor="middle" 
                                                    fontFamily="Georgia, Cambria, 'Times New Roman', serif" 
                                                    fontWeight="800" 
                                                    fontSize="54" 
                                                    fill="rgba(255, 235, 225, 0.5)" 
                                                    letterSpacing="1"
                                                    transform="translate(-1.2, -1.5)"
                                                  >
                                                    GooFind
                                                  </text>
                                                </>
                                              )}
                                              <text 
                                                x="256" 
                                                y="442" 
                                                textAnchor="middle" 
                                                fontFamily="Georgia, Cambria, 'Times New Roman', serif" 
                                                fontWeight="800" 
                                                fontSize="54" 
                                                fill={logoBgType === 'charcoal' ? '#FFFFFF' : logoBgType === 'gradient' ? '#FFFFFF' : 'url(#roseGold)'} 
                                                letterSpacing="1"
                                                filter="url(#logoShadow)"
                                              >
                                                GooFind
                                              </text>
                                            </g>
                                          )}
                                        </svg>
                                      </div>
                                      
                                      <p className="text-[14px] font-mono text-slate-400 font-bold mt-3 text-center">
                                        {lang === 'en' ? 'LIVE CANVAS PREVIEW (HTML5 SVG)' : 'HAZIR CANLI MATRİS (HTML5 SVG)'}
                                      </p>
                                    </div>

                                    {/* Column 2: Interactive Controls & Live Customizer */}
                                    <div className="lg:col-span-7 space-y-5 text-left">
                                      {/* Background Options */}
                                      <div className="space-y-2">
                                        <label className="text-[14px] font-black text-slate-700 uppercase tracking-widest block">
                                          {lang === 'en' ? '1. Background Style / Color' : '1. Arka Plan Stili ve Rengi'}
                                        </label>
                                        <div className="grid grid-cols-4 gap-2">
                                          <button
                                            type="button"
                                            onClick={() => setLogoBgType('white')}
                                            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${logoBgType === 'white' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                          >
                                            <div className="w-5 h-5 rounded-md bg-[#F4F3EF] border border-slate-350"></div>
                                            <span className="text-[13px] font-black text-slate-700 uppercase">{lang === 'en' ? 'Warm White' : 'Ofis Duvarı'}</span>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setLogoBgType('charcoal')}
                                            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${logoBgType === 'charcoal' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                          >
                                            <div className="w-5 h-5 rounded-md bg-[#111319] border border-slate-750"></div>
                                            <span className="text-[13px] font-black text-slate-700 uppercase">{lang === 'en' ? 'Charcoal' : 'Gece Siyahı'}</span>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setLogoBgType('gradient')}
                                            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${logoBgType === 'gradient' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                          >
                                            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#7DA3BE] to-[#1B2F3D]"></div>
                                            <span className="text-[13px] font-black text-slate-700 uppercase">{lang === 'en' ? 'Gradient' : 'Degrade'}</span>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setLogoBgType('transparent')}
                                            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${logoBgType === 'transparent' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                          >
                                            <div className="w-5 h-5 rounded-md border border-dashed border-slate-300 bg-linear-to-br from-slate-100 to-white flex items-center justify-center text-[11px] text-slate-400 font-bold select-none font-mono">X</div>
                                            <span className="text-[13px] font-black text-slate-700 uppercase">{lang === 'en' ? 'Transparent' : 'Şeffaf'}</span>
                                          </button>
                                        </div>
                                      </div>

                                      {/* Border Shape Options */}
                                      <div className="space-y-2">
                                        <label className="text-[14px] font-black text-slate-700 uppercase tracking-widest block">
                                          {lang === 'en' ? '2. Corner Shape (Border Radius)' : '2. Köşe Yapısı (Köşe Yuvarlaklığı)'}
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                          <button
                                            type="button"
                                            onClick={() => setLogoBorderRadius('squircle')}
                                            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${logoBorderRadius === 'squircle' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                          >
                                            <span className="text-[14px] font-black text-slate-700 uppercase">{lang === 'en' ? 'Standard Squircle' : 'Süper Oval'}</span>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setLogoBorderRadius('circle')}
                                            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${logoBorderRadius === 'circle' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                          >
                                            <span className="text-[14px] font-black text-slate-700 uppercase">{lang === 'en' ? 'Circle' : 'Daire'}</span>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setLogoBorderRadius('square')}
                                            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${logoBorderRadius === 'square' ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                          >
                                            <span className="text-[14px] font-black text-slate-700 uppercase">{lang === 'en' ? 'Square' : 'Kare'}</span>
                                          </button>
                                        </div>
                                      </div>

                                      {/* Layout Design / Text Options */}
                                      <div className="space-y-2">
                                        <label className="text-[14px] font-black text-slate-700 uppercase tracking-widest block">
                                          {lang === 'en' ? '3. Design Type / Layout' : '3. Tasarım Versiyonu'}
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                          <button
                                            type="button"
                                            onClick={() => setLogoIncludeText(false)}
                                            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${!logoIncludeText ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                          >
                                            <span className="text-[14px] font-black text-slate-700 uppercase">
                                              {lang === 'en' ? 'Logo Only (Play Store Icon)' : 'Sadece İkon (Google Play Store)'}
                                            </span>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setLogoIncludeText(true)}
                                            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${logoIncludeText ? 'bg-primary/5 border-primary shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                          >
                                            <span className="text-[14px] font-black text-slate-700 uppercase">
                                              {lang === 'en' ? 'Logo + Text (Full Signature)' : 'Tabelalı Logo (Sosyal Medya/Ofis)'}
                                            </span>
                                          </button>
                                        </div>
                                      </div>

                                      {/* Fast download actions with visual triggers */}
                                      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
                                        {/* Download PNG (Plays console friendly) */}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const svgEl = document.getElementById('playConsoleSvgIcon');
                                            if (!svgEl) return;
                                            
                                            // Render SVG to standard Image canvas in Browser
                                            const svgString = new XMLSerializer().serializeToString(svgEl);
                                            const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                                            const DOMURL = window.URL || window.webkitURL || window;
                                            const url = DOMURL.createObjectURL(svgBlob);
                                            
                                            const img = new Image();
                                            img.onload = () => {
                                              const canvas = document.createElement('canvas');
                                              canvas.width = 512;
                                              canvas.height = 512;
                                              const ctx = canvas.getContext('2d');
                                              if (ctx) {
                                                ctx.clearRect(0, 0, 512, 512);
                                                ctx.drawImage(img, 0, 0, 512, 512);
                                                const pngData = canvas.toDataURL('image/png');
                                                
                                                const downloadLink = document.createElement('a');
                                                downloadLink.href = pngData;
                                                downloadLink.download = 'goofind_play_console_icon.png';
                                                document.body.appendChild(downloadLink);
                                                downloadLink.click();
                                                document.body.removeChild(downloadLink);
                                              }
                                              DOMURL.revokeObjectURL(url);
                                              showToast(lang === 'en' ? 'PNG (512x512 px) exported successfully!' : 'PNG Mağaza Seçeneği (512x512) başarıyla indirildi!', 'success');
                                            };
                                            img.src = url;
                                          }}
                                          className="flex-1 px-5 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-black text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 cursor-pointer border-none shadow-md shadow-amber-900/10 active:scale-97 transition-all leading-none"
                                        >
                                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                          </svg>
                                          {lang === 'en' ? 'Download Google Play Icon (PNG)' : 'Uygulama İkonu İndir (PNG - 512x512)'}
                                        </button>

                                        {/* Download Raw SVG vector */}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const svgEl = document.getElementById('playConsoleSvgIcon');
                                            if (!svgEl) return;
                                            const svgString = new XMLSerializer().serializeToString(svgEl);
                                            const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                                            const DOMURL = window.URL || window.webkitURL || window;
                                            const url = DOMURL.createObjectURL(svgBlob);
                                            const downloadLink = document.createElement('a');
                                            downloadLink.href = url;
                                            downloadLink.download = 'goofind_brand_vector.svg';
                                            document.body.appendChild(downloadLink);
                                            downloadLink.click();
                                            document.body.removeChild(downloadLink);
                                            DOMURL.revokeObjectURL(url);
                                            showToast(lang === 'en' ? 'Vector SVG downloaded successfully!' : 'Vektörel SVG Logo başarıyla indirildi!', 'success');
                                          }}
                                          className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 cursor-pointer border-none transition-all active:scale-97"
                                        >
                                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                          </svg>
                                          SVG
                                        </button>
                                      </div>

                                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/50">
                                        <h5 className="text-[14px] font-black text-accent-vivid uppercase tracking-wider mb-1 flex items-center gap-1">
                                          💡 {lang === 'en' ? 'Official Tip for Play Store Upload:' : 'Play Console Yükleme İpucu:'}
                                        </h5>
                                        <p className="text-[14px] text-accent-vivid leading-relaxed font-sans font-medium">
                                          {lang === 'en'
                                            ? 'When uploading this icon to Google Play Console (under Store Presence > Main Store Listing), select the Warm White or Charcoal/Gradient option and download as PNG. Play Console automatically applies squircle borders! For complete transparent overlays, select the Transparent canvas option.'
                                            : 'Bu ikonu Google Play Console mağaza girişine yüklerken Ofis Duvarı veya Gece Siyahı / Degrade şablonunu seçip PNG olarak indirin. Play Console köşe yuvarlaklıklarını kendisi otomatik de uygulayabilir. Arka plansız şeffaf bir ikon isterseniz Şeffaf seçeneğini seçin.'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* --- STATE-OF-THE-ART GOOGLE PLAY PHONE SCREENSHOTS GENERATOR (1080x1920 HD) --- */}
                                <div className="mt-12 border-t border-slate-200/60 pt-10" id="screenshots-studio">
                                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                                    <div>
                                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                                        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                                        {lang === 'en' ? 'Professional Google Play Screenshots Designer' : 'Google Play Profesyonel Ekran Görüntüsü Hazırlama Stüdyosu'}
                                      </h4>
                                      <p className="text-[15px] text-slate-500 font-medium mt-1">
                                        {lang === 'en'
                                          ? 'Generate 1080x1920 HD phone mockups with dynamic marketing slogans and devices to fulfill store listing requirements instantly!'
                                          : 'Google Play Store kurallarına tam uyumlu, en az 1080px çözünürlükte, pazarlama etiketli ve cihaz çerçeveli 4 adet dikey ekran görüntüsü tasarlayın ve indirin.'}
                                      </p>
                                    </div>
                                    <span className="bg-gradient-to-r from-primary to-primary text-white text-[13px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-primary/10">
                                      {lang === 'en' ? '9:16 HD Pro - 1080x1920 PX' : '9:16 HD - 1080x1920 PX PNG'}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                                    {/* Left Column: Real-time interactive canvas mockup */}
                                    <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100">
                                      <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-between">
                                        
                                        {/* Mockup Slogan display on screen */}
                                        <div className="absolute top-8 inset-x-4 text-center z-10 px-2">
                                          <p className="text-[14px] font-black text-slate-400 tracking-widest uppercase mb-0.5">GooFind</p>
                                          <h5 className="text-[15px] font-black tracking-tight text-white uppercase leading-tight select-none">
                                            {ssMarketingSlogan || (lang === 'en' ? 'YOUR SLOGAN HERE' : 'SLOGANINIZ BURADA')}
                                          </h5>
                                        </div>

                                        {/* Phone Bezel Mockup Frame */}
                                        <div className="w-[85%] aspect-[9/16] border-[8px] border-slate-800 rounded-3xl mt-20 mb-4 shadow-inner bg-slate-950 overflow-hidden relative flex flex-col justify-between">
                                          {/* Dynamic Island */}
                                          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-20"></div>

                                          {/* Mockup screen UI */}
                                          <div className="flex-1 bg-slate-900 flex flex-col pt-5 p-2.5">
                                            {/* Header */}
                                            <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5 mb-2 shrink-0">
                                              <span className="text-[11px] text-accent-vivid font-extrabold uppercase">GooFind</span>
                                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                                            </div>

                                            {/* Dynamic Content representation */}
                                            {ssPreset === 1 && (
                                              <div className="flex-1 flex flex-col gap-2 justify-center py-2">
                                                <div className="bg-slate-800 p-2 rounded-xl border border-slate-700/50 text-center">
                                                  <div className="w-5 h-5 bg-gradient-to-tr from-amber-500 to-red-500 rounded-lg mx-auto flex items-center justify-center font-bold text-[13px] text-white">🍁</div>
                                                  <p className="text-[13px] font-black text-white uppercase mt-1 leading-none">Kanada-Türk Hub</p>
                                                  <p className="text-[10px] text-slate-400 mt-0.5 leading-none">14,500+ Member</p>
                                                </div>
                                                <div className="bg-slate-800/50 p-1.5 rounded-lg text-left">
                                                  <div className="h-1 w-12 bg-slate-600 rounded"></div>
                                                  <div className="h-0.5 w-18 bg-slate-700 rounded mt-1"></div>
                                                </div>
                                              </div>
                                            )}

                                            {ssPreset === 2 && (
                                              <div className="flex-1 flex flex-col gap-1.5 justify-center py-2">
                                                <p className="text-[11px] font-bold text-slate-400 leading-none mr-auto">Firma Rehberi</p>
                                                <div className="bg-slate-800 p-2 rounded-lg border border-slate-700/50 flex items-center gap-1 text-left">
                                                  <div className="w-4 h-4 bg-amber-500 text-[12px] rounded flex items-center justify-center font-bold text-white">⭐</div>
                                                  <div className="min-w-0">
                                                    <p className="text-[11px] font-black text-white truncate leading-none">Istanbul Market</p>
                                                    <p className="text-[9px] text-slate-400 mt-0.5 leading-none">Mississauga • ⭐⭐⭐⭐⭐</p>
                                                  </div>
                                                </div>
                                                <div className="bg-slate-800 p-1 rounded-lg border border-slate-700/50 h-6"></div>
                                              </div>
                                            )}

                                            {ssPreset === 3 && (
                                              <div className="flex-1 flex flex-col gap-1.5 justify-center py-1.5">
                                                <p className="text-[11px] font-bold text-red-400 leading-none mr-auto">Haftalık Broşürler</p>
                                                <div className="bg-slate-800 p-2 rounded-lg border border-slate-700/50 flex flex-col gap-1 text-center">
                                                  <span className="bg-red-600 text-white text-[9px] px-1 py-0.5 rounded uppercase font-black tracking-widest block mx-auto w-fit leading-none">%20 TASARRUF</span>
                                                  <p className="text-[7.5px] font-bold text-white leading-none">Gıda & İndirim Kataloğu</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-1">
                                                  <div className="bg-slate-800/60 h-4 rounded"></div>
                                                  <div className="bg-slate-800/60 h-4 rounded"></div>
                                                </div>
                                              </div>
                                            )}

                                            {ssPreset === 4 && (
                                              <div className="flex-1 flex flex-col gap-1.5 justify-center py-1.5">
                                                <p className="text-[11px] font-bold text-emerald-400 leading-none mr-auto">Gezilecek Yerler</p>
                                                <div className="bg-slate-800 p-1.5 rounded-lg border border-slate-700/50 text-left">
                                                  <div className="bg-slate-700 h-10 rounded-md relative overflow-hidden flex items-center justify-center">
                                                    <span className="text-[16px]">🏞️</span>
                                                  </div>
                                                  <p className="text-[11px] font-black text-white truncate mt-1 leading-none">Niagara Şelaleleri</p>
                                                  <p className="text-[9px] text-slate-400 mt-0.5 leading-none">Ücretsiz Giriş • Ontario</p>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>

                                        {/* Bottom active preset pill indicators */}
                                        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1">
                                          {[1, 2, 3, 4].map((i) => (
                                            <span key={i} className={`h-1.5 rounded-full transition-all ${ssPreset === i ? 'w-4 bg-primary' : 'w-1.5 bg-slate-700'}`}></span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right Column: Customization Controls & Download Trigger */}
                                    <div className="lg:col-span-7 flex flex-col gap-6 text-left justify-between">
                                      <div className="space-y-5">
                                        
                                        {/* State Preset choice buttons */}
                                        <div>
                                          <label className="text-[14px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                                            {lang === 'en' ? 'Select Screen Content Mockup:' : 'Ekran İntibak Sahneleri Seçimi:'}
                                          </label>
                                          <div className="grid grid-cols-2 gap-2">
                                            {[
                                              { id: 1, titleTr: "Ana Sayfa / Keşfet Hub", titleEn: "Home Hub", icon: "🏠" },
                                              { id: 2, titleTr: "Firma & Esnaf Rehberi", titleEn: "Business Directory", icon: "💼" },
                                              { id: 3, titleTr: "Broşürler & Fırsatlar", titleEn: "Flyers & Savings", icon: "🏷️" },
                                              { id: 4, titleTr: "Gezilecek Yerler", titleEn: "Places to Visit", icon: "🏞️" },
                                            ].map((preset) => (
                                              <button
                                                key={preset.id}
                                                type="button"
                                                onClick={() => setSsPreset(preset.id)}
                                                className={`px-4 py-3 border rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${ssPreset === preset.id ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}`}
                                              >
                                                <span>{preset.icon}</span>
                                                <span className="truncate">{lang === 'tr' ? preset.titleTr : preset.titleEn}</span>
                                              </button>
                                            ))}
                                          </div>
                                        </div>

                                        {/* Background preset choices */}
                                        <div>
                                          <label className="text-[14px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                                            {lang === 'en' ? 'Select Store Background Theme:' : 'Arka Plan Tasarım Rengi (Mağaza Şablonu):'}
                                          </label>
                                          <div className="flex flex-wrap gap-2">
                                            {[
                                              { id: 'dark', themeName: 'Deep Cobalt', colorClass: 'bg-slate-950 border-slate-700 text-white' },
                                              { id: 'light', themeName: 'Snow White', colorClass: 'bg-white border-slate-200 text-slate-800' },
                                              { id: 'crimson_sunset', themeName: 'Crimson Sunset', colorClass: 'bg-rose-950 border-rose-800 text-rose-200' },
                                              { id: 'blue_steel', themeName: 'Steel Blue', colorClass: 'bg-cyan-950 border-cyan-800 text-cyan-200' },
                                            ].map((theme) => (
                                              <button
                                                key={theme.id}
                                                type="button"
                                                onClick={() => setSsTheme(theme.id)}
                                                className={`px-3 py-2.5 border rounded-lg text-[14px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${ssTheme === theme.id ? 'ring-2 ring-primary border-primary scale-103 shadow-lg' : 'opacity-80 hover:opacity-100'} ${theme.colorClass}`}
                                              >
                                                <span className="w-2.5 h-2.5 rounded-full border border-current bg-current"></span>
                                                {theme.themeName}
                                              </button>
                                            ))}
                                          </div>
                                        </div>

                                        {/* Slogan details input field */}
                                        <div>
                                          <label className="text-[14px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                                            {lang === 'en' ? 'Customize Screen Marketing Slogan:' : 'Ekran Üstü Pazarlama Metnini Düzenleyin (Özelleştirilebilir):'}
                                          </label>
                                          <div className="relative">
                                            <input
                                              type="text"
                                              maxLength={80}
                                              value={ssMarketingSlogan}
                                              onChange={(e) => setSsMarketingSlogan(e.target.value)}
                                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-slate-800 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white pr-16"
                                              placeholder={lang === 'en' ? 'TYPE YOUR AWESOME APP STORE SLOGAN...' : 'HARİKA PAZARLAMA SLOGANINIZI YAZIN...'}
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] font-mono text-slate-400 font-bold">
                                              {ssMarketingSlogan.length}/80
                                            </span>
                                          </div>
                                        </div>

                                      </div>

                                      {/* Download screenshot button */}
                                      <div className="pt-4 space-y-4">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            // Hidden Canvas render system
                                            const canvas = document.createElement('canvas');
                                            canvas.width = 1080;
                                            canvas.height = 1920;
                                            const ctx = canvas.getContext('2d');
                                            if (!ctx) return;

                                            // Draw premium high contrast backdrop gradients
                                            const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
                                            if (ssTheme === 'dark') {
                                              gradient.addColorStop(0, '#0d1527');
                                              gradient.addColorStop(1, '#030408');
                                            } else if (ssTheme === 'light') {
                                              gradient.addColorStop(0, '#f8fafc');
                                              gradient.addColorStop(1, '#e2e8f0');
                                            } else if (ssTheme === 'crimson_sunset') {
                                              gradient.addColorStop(0, '#2c0408');
                                              gradient.addColorStop(1, '#050102');
                                            } else if (ssTheme === 'blue_steel') {
                                              gradient.addColorStop(0, '#021822');
                                              gradient.addColorStop(1, '#010508');
                                            }
                                            ctx.fillStyle = gradient;
                                            ctx.fillRect(0, 0, 1080, 1920);

                                            // Drawing decorative circle vectors
                                            ctx.globalAlpha = 0.05;
                                            ctx.fillStyle = '#ffffff';
                                            ctx.beginPath();
                                            ctx.arc(540, 150, 400, 0, Math.PI * 2);
                                            ctx.fill();
                                            ctx.beginPath();
                                            ctx.arc(900, 1200, 350, 0, Math.PI * 2);
                                            ctx.fill();
                                            ctx.globalAlpha = 1.0;

                                            // Draw customized APP logomark watermark softly
                                            ctx.save();
                                            ctx.translate(540, 1000);
                                            ctx.globalAlpha = ssTheme === 'light' ? 0.03 : 0.06;
                                            ctx.fillStyle = '#f59e0b';
                                            ctx.beginPath();
                                            ctx.arc(0, 0, 180, 0, Math.PI * 2);
                                            ctx.fill();
                                            ctx.restore();

                                            // Setup text elements colors
                                            const textPrimaryColor = ssTheme === 'light' ? '#0f172a' : '#ffffff';

                                            // Draw Upper Brand Banner
                                            ctx.fillStyle = textPrimaryColor;
                                            ctx.font = 'black 34px sans-serif';
                                            ctx.textAlign = 'center';
                                            ctx.fillText('GooFind App For Canada', 540, 110);

                                            ctx.fillStyle = '#f59e0b';
                                            ctx.font = 'bold 18px sans-serif';
                                            ctx.fillText('▲ OFFICIAL PLAY STORE PROMO GRAPHIC ▲', 540, 150);

                                            // Draw Slogan text (marketing label) with wrap support
                                            ctx.fillStyle = textPrimaryColor;
                                            ctx.font = 'black 46px sans-serif';
                                            ctx.shadowColor = ssTheme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.6)';
                                            ctx.shadowBlur = 12;

                                            const words = (ssMarketingSlogan || '').toUpperCase().split(' ');
                                            let currentLine = '';
                                            const lines: string[] = [];
                                            const maxLineWidth = 920;

                                            for (let n = 0; n < words.length; n++) {
                                              const testLine = currentLine + words[n] + ' ';
                                              const metrics = ctx.measureText(testLine);
                                              if (metrics.width > maxLineWidth && n > 0) {
                                                lines.push(currentLine);
                                                currentLine = words[n] + ' ';
                                              } else {
                                                currentLine = testLine;
                                              }
                                            }
                                            lines.push(currentLine);

                                            const startTextY = lines.length > 1 ? 220 : 250;
                                            for (let i = 0; i < lines.length; i++) {
                                              ctx.fillText(lines[i], 540, startTextY + (i * 65));
                                            }

                                            // Clean shadow values
                                            ctx.shadowColor = 'transparent';
                                            ctx.shadowBlur = 0;

                                            // Draw Smartphone Bezel Frame (outer width 580, height 1200)
                                            const phoneWidth = 600;
                                            const phoneHeight = 1220;
                                            const phoneX = 540 - (phoneWidth / 2);
                                            const phoneY = 1920 - phoneHeight - 90;

                                            // Draw heavy glass smartphone screen reflection / container
                                            ctx.save();
                                            ctx.beginPath();
                                            ctx.lineWidth = 20;
                                            ctx.strokeStyle = '#1e293b';
                                            ctx.lineJoin = 'round';
                                            const cornerRadius = 70;
                                            if (ctx.roundRect) {
                                              ctx.roundRect(phoneX, phoneY, phoneWidth, phoneHeight, cornerRadius);
                                            } else {
                                              ctx.rect(phoneX, phoneY, phoneWidth, phoneHeight);
                                            }
                                            ctx.stroke();

                                            // Fill smartphone screen background
                                            ctx.fillStyle = '#0f172a';
                                            ctx.fill();
                                            ctx.clip(); // Clip all inner graphics inside the smartphone screen!

                                            // Inner status header inside telephone (Top Bar)
                                            ctx.fillStyle = '#0c1220';
                                            ctx.fillRect(phoneX, phoneY, phoneWidth, 65);

                                            // Signal icons inside smartphone
                                            ctx.fillStyle = '#ffffff';
                                            ctx.font = 'bold 16px sans-serif';
                                            ctx.textAlign = 'left';
                                            ctx.fillText('12:00', phoneX + 45, phoneY + 42);

                                            ctx.textAlign = 'right';
                                            ctx.fillText('🔋 5G', phoneX + phoneWidth - 45, phoneY + 42);

                                            // Draw luxury Dynamic Island notch on top
                                            ctx.fillStyle = '#030712';
                                            ctx.beginPath();
                                            if (ctx.roundRect) {
                                              ctx.roundRect(540 - 85, phoneY + 16, 170, 36, 18);
                                            } else {
                                              ctx.rect(540 - 85, phoneY + 16, 170, 36);
                                            }
                                            ctx.fill();

                                            // Draw app mockups UI (High Fidelity Render)
                                            const innerUIY = phoneY + 65;
                                            const innerUIH = phoneHeight - 65;

                                            if (ssPreset === 1) {
                                              // Home screen mockup UI
                                              const uiGrad = ctx.createLinearGradient(0, innerUIY, 0, innerUIY + innerUIH);
                                              uiGrad.addColorStop(0, '#111827');
                                              uiGrad.addColorStop(1, '#1f2937');
                                              ctx.fillStyle = uiGrad;
                                              ctx.fillRect(phoneX, innerUIY, phoneWidth, innerUIH);

                                              ctx.fillStyle = '#1e293b';
                                              ctx.fillRect(phoneX, innerUIY, phoneWidth, 90);

                                              ctx.fillStyle = '#f59e0b';
                                              ctx.font = 'black 32px sans-serif';
                                              ctx.textAlign = 'center';
                                              ctx.fillText('🍁 GOOFIND', 540, innerUIY + 55);

                                              ctx.fillStyle = '#2563eb';
                                              ctx.beginPath();
                                              if (ctx.roundRect) {
                                                ctx.roundRect(phoneX + 40, innerUIY + 130, phoneWidth - 80, 420, 24);
                                              } else {
                                                ctx.rect(phoneX + 40, innerUIY + 130, phoneWidth - 80, 420);
                                              }
                                              ctx.fill();

                                              ctx.fillStyle = '#ffffff';
                                              ctx.textAlign = 'left';
                                              ctx.font = 'black 34px sans-serif';
                                              ctx.fillText('TORONTO TURKISH', phoneX + 75, innerUIY + 230);
                                              ctx.fillText('KÜLTÜR FESTİVALİ', phoneX + 75, innerUIY + 285);

                                              ctx.fillStyle = '#fef08a';
                                              ctx.font = 'bold 22px sans-serif';
                                              ctx.fillText('YENİ BAŞLADI • KATILIM ÜCRETSİZDİR', phoneX + 75, innerUIY + 345);

                                              ctx.fillStyle = '#ffffff';
                                              ctx.font = 'normal 19px sans-serif';
                                              ctx.fillText('Detaylı yol tarifi, otopark bilgileri ve stand', phoneX + 75, innerUIY + 410);
                                              ctx.fillText('listesini görmek için tıklayın.', phoneX + 75, innerUIY + 445);

                                              ctx.fillStyle = '#374151';
                                              ctx.beginPath();
                                              if (ctx.roundRect) {
                                                ctx.roundRect(phoneX + 40, innerUIY + 590, phoneWidth - 80, 120, 20);
                                              } else {
                                                ctx.rect(phoneX + 40, innerUIY + 590, phoneWidth - 80, 120);
                                              }
                                              ctx.fill();

                                              ctx.fillStyle = '#34d399';
                                              ctx.font = 'bold 28px sans-serif';
                                              ctx.fillText('● 14,500+ AKTİF ÜYE', phoneX + 75, innerUIY + 660);

                                              ctx.fillStyle = '#e5e7eb';
                                              ctx.font = 'normal 18px sans-serif';
                                              ctx.fillText('Kanada\'daki en geniş akredite Türk platformu.', phoneX + 270, innerUIY + 660);

                                              ctx.fillStyle = '#1e293b';
                                              ctx.beginPath();
                                              if (ctx.roundRect) {
                                                ctx.roundRect(phoneX + 40, innerUIY + 750, phoneWidth - 80, 95, 20);
                                              } else {
                                                ctx.rect(phoneX + 40, innerUIY + 750, phoneWidth - 80, 95);
                                              }
                                              ctx.fill();

                                              ctx.fillStyle = '#9ca3af';
                                              ctx.font = 'bold 22px sans-serif';
                                              ctx.fillText('🔍 Firma, etkinlik veya haber arayın...', phoneX + 80, innerUIY + 808);

                                              ctx.fillStyle = '#e5e7eb';
                                              ctx.font = 'bold 20px sans-serif';
                                              ctx.textAlign = 'center';
                                              const circleX1 = phoneX + 110;
                                              const circleX2 = phoneX + 250;
                                              const circleX3 = phoneX + 390;
                                              const circleX4 = phoneX + 530;
                                              const catY = innerUIY + 980;

                                              const drawCatCircle = (cx: number, label: string, emoji: string) => {
                                                ctx.fillStyle = '#374151';
                                                ctx.beginPath();
                                                ctx.arc(cx, catY, 42, 0, Math.PI * 2);
                                                ctx.fill();
                                                ctx.fillStyle = '#ffffff';
                                                ctx.font = '36px sans-serif';
                                                ctx.fillText(emoji, cx, catY + 12);
                                                ctx.fillStyle = '#e5e7eb';
                                                ctx.font = 'bold 16px sans-serif';
                                                ctx.fillText(label, cx, catY + 78);
                                              };

                                              drawCatCircle(circleX1, 'Restoran', '🍔');
                                              drawCatCircle(circleX2, 'Danışman', '👔');
                                              drawCatCircle(circleX3, 'İlanlar', '🏷️');
                                              drawCatCircle(circleX4, 'Gezi', '🏞️');

                                            } else if (ssPreset === 2) {
                                              ctx.fillStyle = '#0f172a';
                                              ctx.fillRect(phoneX, innerUIY, phoneWidth, innerUIH);

                                              ctx.fillStyle = '#1e293b';
                                              ctx.fillRect(phoneX, innerUIY, phoneWidth, 90);

                                              ctx.fillStyle = '#38bdf8';
                                              ctx.font = 'black 26px sans-serif';
                                              ctx.textAlign = 'center';
                                              ctx.fillText('FİRMA VE ESNAF REHBERİ', 540, innerUIY + 55);

                                              ctx.fillStyle = '#1e293b';
                                              ctx.beginPath();
                                              if (ctx.roundRect) {
                                                ctx.roundRect(phoneX + 45, innerUIY + 115, 150, 48, 12);
                                              } else {
                                                ctx.rect(phoneX + 45, innerUIY + 115, 150, 48);
                                              }
                                              ctx.fill();
                                              ctx.fillStyle = '#38bdf8';
                                              ctx.font = 'bold 16px sans-serif';
                                              ctx.fillText('⚡ Restoranlar', phoneX + 120, innerUIY + 145);

                                              ctx.fillStyle = '#334155';
                                              ctx.beginPath();
                                              if (ctx.roundRect) {
                                                ctx.roundRect(phoneX + 215, innerUIY + 115, 160, 48, 12);
                                              } else {
                                                ctx.rect(phoneX + 215, innerUIY + 115, 160, 48);
                                              }
                                              ctx.fill();
                                              ctx.fillStyle = '#ffffff';
                                              ctx.fillText('Avukat / Hukuk', phoneX + 295, innerUIY + 145);

                                              ctx.fillStyle = '#334155';
                                              ctx.beginPath();
                                              if (ctx.roundRect) {
                                                ctx.roundRect(phoneX + 395, innerUIY + 115, 150, 48, 12);
                                              } else {
                                                ctx.rect(phoneX + 395, innerUIY + 115, 150, 48);
                                              }
                                              ctx.fill();
                                              ctx.fillText('Marketler', phoneX + 470, innerUIY + 145);

                                              const drawBusinessCard = (by: number, title: string, subtitle: string, starRating: string, category: string, initialLetter: string) => {
                                                ctx.fillStyle = '#1e293b';
                                                ctx.beginPath();
                                                if (ctx.roundRect) {
                                                  ctx.roundRect(phoneX + 40, by, phoneWidth - 80, 230, 24);
                                                } else {
                                                  ctx.rect(phoneX + 40, by, phoneWidth - 80, 230);
                                                }
                                                ctx.fill();

                                                ctx.fillStyle = '#f59e0b';
                                                ctx.beginPath();
                                                if (ctx.roundRect) {
                                                  ctx.roundRect(phoneX + 70, by + 40, 90, 90, 18);
                                                } else {
                                                  ctx.rect(phoneX + 70, by + 40, 90, 90);
                                                }
                                                ctx.fill();
                                                ctx.fillStyle = '#ffffff';
                                                ctx.font = 'black 48px sans-serif';
                                                ctx.textAlign = 'center';
                                                ctx.fillText(initialLetter, phoneX + 115, by + 104);

                                                ctx.textAlign = 'left';
                                                ctx.fillStyle = '#ffffff';
                                                ctx.font = 'black 28px sans-serif';
                                                ctx.fillText(title, phoneX + 185, by + 70);

                                                ctx.fillStyle = '#94a3b8';
                                                ctx.font = 'medium 17px sans-serif';
                                                ctx.fillText(subtitle, phoneX + 185, by + 110);

                                                ctx.fillStyle = '#f59e0b';
                                                ctx.font = 'bold 18px sans-serif';
                                                ctx.fillText(starRating, phoneX + 185, by + 145);

                                                ctx.fillStyle = '#ef4444';
                                                ctx.beginPath();
                                                if (ctx.roundRect) {
                                                  ctx.roundRect(phoneX + 185, by + 165, 180, 36, 10);
                                                } else {
                                                  ctx.rect(phoneX + 185, by + 165, 180, 36);
                                                }
                                                ctx.fill();

                                                ctx.fillStyle = '#ffffff';
                                                ctx.font = 'bold 14px sans-serif';
                                                ctx.fillText('✓ GÜVENİLİR FİRMA', phoneX + 205, by + 188);

                                                ctx.fillStyle = '#e2e8f0';
                                                ctx.font = 'bold 15px sans-serif';
                                                ctx.textAlign = 'right';
                                                ctx.fillText(category, phoneX + phoneWidth - 75, by + 70);
                                              };

                                              drawBusinessCard(innerUIY + 195, 'ISTANBUL TURK MARKET', 'Mississauga • Gıda & Şarküteri', '⭐⭐⭐⭐⭐ 5.0 (42)', 'MARKET', '🛒');
                                              drawBusinessCard(innerUIY + 455, 'KUZEY AVUKATLIK BÜROSU', 'Toronto • Göçmenlik ve Danışma', '⭐⭐⭐⭐⭐ 4.9 (18)', 'AVUKAT', '⚖️');
                                              drawBusinessCard(innerUIY + 715, 'ANADOLU COFFEE & GRILL', 'North York • Kafeterya ve Yemek', '⭐⭐⭐⭐ 4.7 (79)', 'RESTORAN', '🔥');

                                            } else if (ssPreset === 3) {
                                              ctx.fillStyle = '#111827';
                                              ctx.fillRect(phoneX, innerUIY, phoneWidth, innerUIH);

                                              ctx.fillStyle = '#1e293b';
                                              ctx.fillRect(phoneX, innerUIY, phoneWidth, 90);

                                              ctx.fillStyle = '#ef4444';
                                              ctx.font = 'black 26px sans-serif';
                                              ctx.textAlign = 'center';
                                              ctx.fillText('HAFTALIK BROŞÜR & İLANLAR', 540, innerUIY + 55);

                                              const drawFlyerCard = (fy: number, store: string, reduction: string, period: string, colorClass: string) => {
                                                ctx.fillStyle = '#1f2937';
                                                ctx.beginPath();
                                                if (ctx.roundRect) {
                                                  ctx.roundRect(phoneX + 40, fy, phoneWidth - 80, 240, 24);
                                                } else {
                                                  ctx.rect(phoneX + 40, fy, phoneWidth - 80, 240);
                                                }
                                                ctx.fill();

                                                ctx.fillStyle = colorClass;
                                                ctx.beginPath();
                                                if (ctx.roundRect) {
                                                  ctx.roundRect(phoneX + 65, fy + 35, 120, 170, 18);
                                                } else {
                                                  ctx.rect(phoneX + 65, fy + 35, 120, 170);
                                                }
                                                ctx.fill();

                                                ctx.fillStyle = '#ffffff';
                                                ctx.textAlign = 'center';
                                                ctx.font = 'black 48px sans-serif';
                                                ctx.fillText('%', phoneX + 125, fy + 140);

                                                ctx.textAlign = 'left';
                                                ctx.fillStyle = '#34d399';
                                                ctx.font = 'bold 18px sans-serif';
                                                ctx.fillText('★ SÜPER KAMPANYA', phoneX + 210, fy + 65);

                                                ctx.fillStyle = '#ffffff';
                                                ctx.font = 'black 30px sans-serif';
                                                ctx.fillText(store, phoneX + 210, fy + 105);

                                                ctx.fillStyle = '#fca5a5';
                                                ctx.font = 'bold 22px sans-serif';
                                                ctx.fillText(reduction, phoneX + 210, fy + 155);

                                                ctx.fillStyle = '#9ca3af';
                                                ctx.font = 'medium 15px sans-serif';
                                                ctx.fillText('⏱️ İlan Koşulları: ' + period, phoneX + 210, fy + 195);
                                              };

                                              drawFlyerCard(innerUIY + 140, 'MARCHE ADONIS DEALS', '%15-%20 ET İNDİRİMİ', '01 Haz - 08 Haz', '#dc2626');
                                              drawFlyerCard(innerUIY + 410, 'AMBASSADOR FOOD DIRECT', 'SEBZELERDE DEV TASARRUF', '28 May - 05 Haz', '#059669');
                                              drawFlyerCard(innerUIY + 680, 'TORONTO MEAT MARKET', 'HELAL HELVA & SUCUKLAR', 'Hafta Sonu Özel', '#d97706');

                                            } else if (ssPreset === 4) {
                                              ctx.fillStyle = '#090d16';
                                              ctx.fillRect(phoneX, innerUIY, phoneWidth, innerUIH);

                                              ctx.fillStyle = '#1e293b';
                                              ctx.fillRect(phoneX, innerUIY, phoneWidth, 90);

                                              ctx.fillStyle = '#10b981';
                                              ctx.font = 'black 26px sans-serif';
                                              ctx.textAlign = 'center';
                                              ctx.fillText('KANADA GEZİ VE REHBER AKIŞI', 540, innerUIY + 55);

                                              ctx.fillStyle = '#1e293b';
                                              ctx.beginPath();
                                              if (ctx.roundRect) {
                                                ctx.roundRect(phoneX + 40, innerUIY + 140, phoneWidth - 80, 770, 28);
                                              } else {
                                                ctx.rect(phoneX + 40, innerUIY + 140, phoneWidth - 80, 770);
                                              }
                                              ctx.fill();

                                              ctx.fillStyle = '#0d1e34';
                                              ctx.beginPath();
                                              if (ctx.roundRect) {
                                                ctx.roundRect(phoneX + 70, innerUIY + 175, phoneWidth - 140, 360, 20);
                                              } else {
                                                ctx.rect(phoneX + 70, innerUIY + 175, phoneWidth - 140, 360);
                                              }
                                              ctx.fill();

                                              ctx.fillStyle = '#f97316';
                                              ctx.beginPath();
                                              ctx.arc(540, innerUIY + 440, 110, 0, Math.PI * 2);
                                              ctx.fill();

                                              ctx.fillStyle = '#0284c7';
                                              ctx.fillRect(phoneX + 70, innerUIY + 430, phoneWidth - 140, 105);

                                              ctx.fillStyle = '#ffffff';
                                              ctx.textAlign = 'center';
                                              ctx.font = 'black 22px sans-serif';
                                              ctx.fillText('🏞️ Niagara Falls Scenic View Card', 540, innerUIY + 300);

                                              ctx.textAlign = 'left';
                                              ctx.fillStyle = '#ffffff';
                                              ctx.font = 'black 34px sans-serif';
                                              ctx.fillText('NİAGARA ŞELALELERİ', phoneX + 80, innerUIY + 590);

                                              ctx.fillStyle = '#10b981';
                                              ctx.font = 'bold 18px sans-serif';
                                              ctx.fillText('Ontario • Doğa Harikası • En Popüler Yer', phoneX + 80, innerUIY + 635);

                                              ctx.fillStyle = '#cbd5e1';
                                              ctx.font = 'normal 18px sans-serif';
                                              ctx.fillText('🚗 Ulaşım: Toronto\'dan 1.5 saat sürüş mesafesinde', phoneX + 80, innerUIY + 695);
                                              ctx.fillText('🅿️ Otopark: Çevrede ücretli/ücretsiz seçenekler var', phoneX + 80, innerUIY + 740);
                                              ctx.fillText('💡 İpucu: Akşam yapılan ışıklandırma şovlarını kaçırmayın!', phoneX + 80, innerUIY + 785);

                                              ctx.fillStyle = '#065f46';
                                              ctx.beginPath();
                                              if (ctx.roundRect) {
                                                ctx.roundRect(phoneX + 80, innerUIY + 825, 230, 42, 10);
                                              } else {
                                                ctx.rect(phoneX + 80, innerUIY + 825, 230, 42);
                                              }
                                              ctx.fill();

                                              ctx.fillStyle = '#ffffff';
                                              ctx.font = 'bold 16px sans-serif';
                                              ctx.fillText('GİRİŞ: ÜCRETSİZ', phoneX + 115, innerUIY + 851);
                                            }

                                            ctx.restore();

                                            const pngData = canvas.toDataURL('image/png');
                                            const downloadLink = document.createElement('a');
                                            downloadLink.href = pngData;
                                            downloadLink.download = `goofind_screenshot_hd300_preset${ssPreset}.png`;
                                            document.body.appendChild(downloadLink);
                                            downloadLink.click();
                                            document.body.removeChild(downloadLink);
                                            
                                            showToast(
                                              lang === 'en'
                                                ? `Screenshot Preset #${ssPreset} (1080x1920 PX PNG) downloaded successfully!`
                                                : `GooFind Ekran Görüntüsü Şablonu #${ssPreset} (1080x1920 PX PNG) başarıyla üretildi ve indirildi!`,
                                              'success'
                                            );
                                          }}
                                          className="w-full py-4.5 bg-gradient-to-r from-accent to-accent-dark hover:from-primary-dark hover:to-primary-dark text-white font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3.5 cursor-pointer border-none shadow-xl shadow-primary/10 hover:scale-101 active:scale-98 transition-all"
                                        >
                                          <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                          </svg>
                                          {lang === 'en'
                                            ? 'Generate & Download Play Store Screenshot (PNG)'
                                            : 'Play Store Ekran Görüntüsünü Üret ve İndir (PNG - 1080x1920)'}
                                        </button>

                                        <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200/60">
                                          <h5 className="text-[14px] font-black text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                            💡 {lang === 'en' ? 'Google Play Promotion Compliance Verification:' : 'Google Play Tanıtım ve Uyumluluk Doğrulaması:'}
                                          </h5>
                                          <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
                                            {lang === 'en'
                                              ? 'All generated assets comply strictly with Google Play Promotion guidelines. They feature device framing and marketing titles, are formatted as lossless PNGs, and measure exactly 1080x1920 pixels (9:16 aspect ratio). Download at least 4 screenshots to satisfy eligibility for Home & Store promotions!'
                                              : 'Üretilen tüm ekran görüntüleri Google Play Konsol standartlarına %100 uyumludur. Cihaz çerçeveleri ve üzerinde başlıklar barındırırlar. Kayıpsız PNG formatında ve tam 1080x1920 piksel çözünürlüktedirler. Mağaza ön plana çıkma (Promotion Eligibility) kuralları gereği, buradaki 4 farklı şablonun her birini sırayla indirip mağaza konsolunuza eklemeniz tavsiye edilir!'}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
        ) : (
          <div className="pb-32">
            {isHomeView ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="home-sections"
              >
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 bg-white border border-primary/15 rounded-lg text-left hover:border-primary/30 hover:bg-primary-soft/30 transition-all active:scale-[0.99] shadow-sm"
                  >
                    <Search size={16} className="text-primary shrink-0" strokeWidth={2.5} />
                    <span className="text-[13px] font-semibold text-slate-400 truncate">
                      {t.hero.searchPlaceholder}
                    </span>
                  </button>

                {/* --- COMPANIES: Directory zone (blue) --- */}
                <section className="animate-in fade-in duration-1000 relative rounded-[1.75rem] sm:rounded-[2.25rem] border border-primary/15 bg-gradient-to-br from-primary-soft via-white to-primary-soft/30 p-4 sm:p-6 shadow-sm shadow-primary/5">
                  <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-primary/10">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25 shrink-0">
                          <Building2 size={22} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h3 className="text-base sm:text-xl font-black tracking-tight-brand text-primary uppercase leading-none font-display italic">
                            {t.sections.companies}
                          </h3>
                        </div>
                      </div>
                      {!currentUser ? (
                        <motion.button 
                          onClick={() => { setAuthView('register'); setIsAuthModalOpen(true); }}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary text-white rounded-md font-black text-[9px] sm:text-[10px] uppercase tracking-wide shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap flex items-center gap-1 shrink-0"
                        >
                          <UserPlus size={12} strokeWidth={3} />
                          {lang === 'en' ? 'Add' : 'Ekle'}
                        </motion.button>
                      ) : (
                        <div className="flex items-center gap-2 shrink-0">
                          {!hasBusinessOwned && (
                            <UserCompanyMessagesQuickBox
                              lang={lang}
                              incomingCount={userCompanyIncomingThreads.length}
                              outgoingCount={userCompanyOutgoingThreads.length}
                              isOpen={isUserCompanyMessagesOpen}
                              onToggle={() => setIsUserCompanyMessagesOpen((prev) => !prev)}
                            />
                          )}
                          <motion.button 
                            onClick={() => {
                              if (hasBusinessOwned) {
                                const myBiz = businesses.find(b => b.ownerId === currentUser.id);
                                if (myBiz) {
                                  setSelectedBusiness(myBiz);
                                  setIsBusinessDetailModalOpen(true);
                                }
                              } else {
                                checkAuth(() => {
                                  setBusinessFormLocation({ address: '' });
                                  setIsBusinessRegistrationModalOpen(true);
                                });
                              }
                            }}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary text-white rounded-md font-black text-[9px] sm:text-[10px] uppercase tracking-wide shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap flex items-center gap-1 shrink-0"
                          >
                            {hasBusinessOwned ? <Building2 size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
                            {hasBusinessOwned 
                              ? (lang === 'en' ? 'Company' : 'Şirketim')
                              : (lang === 'en' ? 'Add' : 'Ekle')}
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>

                  {currentUser && !hasBusinessOwned && isUserCompanyMessagesOpen && (
                    <div className="mb-4 sm:mb-6 animate-in slide-in-from-top-2 duration-300">
                      <UserCompanyMessagesInbox
                        lang={lang}
                        incomingThreads={userCompanyIncomingThreads}
                        outgoingThreads={userCompanyOutgoingThreads}
                        onOpenThread={(businessId, partnerId) => {
                          handleOpenCompanyMessageThread(businessId, partnerId);
                          setIsUserCompanyMessagesOpen(false);
                        }}
                        compact
                      />
                    </div>
                  )}

                  <CompanyCategoryFilterBar
                    selected={selectedCompanyCategory}
                    onSelect={setSelectedCompanyCategory}
                    onAllSelect={openCompanyCategoriesPage}
                    onCategorySelect={openCompanyCategoryPage}
                    categoryLabels={t.categories}
                    lang={lang}
                  />

                  <FeaturedCompaniesCarousel
                    businesses={businesses}
                    categoryFilter={selectedCompanyCategory}
                    lang={lang}
                    categoryLabels={t.categories}
                    onSelect={(biz) => {
                      setSelectedBusiness(biz);
                      setIsBusinessDetailModalOpen(true);
                    }}
                  />
                </section>
                </div>

                {/* --- ANNOUNCEMENTS: warm orange panel + light blue harmony --- */}
                <section className="announcements-zone animate-in fade-in duration-1000 delay-100 relative rounded-[1.75rem] sm:rounded-[2.25rem] p-4 sm:p-6">
                  <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-accent/12 relative">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20 shrink-0">
                          <Megaphone size={22} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h3 className="text-base sm:text-xl font-black tracking-tight-brand text-accent-vivid uppercase leading-none font-display italic">
                            {t.sections.announcements}
                          </h3>
                        </div>
                      </div>
                      <AnnouncementHeaderActions
                        lang={lang}
                        unreadMessageCount={unreadAnnouncementMessageCount}
                        hasOwnListings={hasPostedAnnouncement}
                        onPostListing={() => checkAuth(() => setIsPostModalOpen(true))}
                        onOpenMyAds={() => checkAuth(handleOpenAnnouncementMessages)}
                        variant="landing"
                      />
                    </div>
                  </div>

                  <CategoryTabBar
                    tabs={[
                      { id: 'All', label: lang === 'en' ? 'ALL' : 'HEPSİ' },
                      ...Object.values(NotificationCategory).map((cat) => ({
                        id: cat,
                        label: t.categories[cat] || cat,
                      })),
                    ]}
                    selectedId={selectedNotificationCategory}
                    onSelect={(id) => {
                      setSelectedNotificationCategoriesMulti([]);
                      setSelectedNotificationCategory(id as NotificationCategory | 'All');
                    }}
                  />

                  <AnnouncementFeedList
                    notifications={notifications}
                    categoryFilter={selectedNotificationCategory}
                    categoryFiltersMulti={selectedNotificationCategoriesMulti}
                    onMultiCategoryFilterChange={setSelectedNotificationCategoriesMulti}
                    lang={lang}
                    categoryLabels={t.categories}
                    contactLabel={t.labels.contact}
                    onSelect={(notif) => setSelectedNotification(notif)}
                  />
                </section>

                {/* City Communities Section */}
                <section className="rounded-[1.75rem] sm:rounded-[2.25rem] border border-primary/10 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="flex flex-row items-center justify-between mb-4 sm:mb-5 gap-2 sm:gap-4 w-full">
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                       <div className="p-1.5 sm:p-2.5 bg-accent rounded-lg shadow-xl shadow-accent/20 shrink-0">
                         <Users className="text-white w-3.5 h-3.5 sm:w-5 sm:h-5" size={26} />
                       </div>
                       <div className="text-left min-w-0">
                         <h2 className="text-xs sm:text-xl font-black tracking-tight-brand text-primary uppercase leading-none font-display italic truncate">
                           {lang === 'en' ? 'Join Community' : 'Topluluğa Katıl'}
                         </h2>
                         <p className="text-[10px] sm:text-[11px] font-bold text-accent-vivid uppercase tracking-widest mt-0.5 truncate">
                           {lang === 'en' ? 'city community conversation' : 'Şehir Topluluk Sohbeti'}
                         </p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                      {currentUser?.joinedCommunityId && (
                        (() => {
                          const myCommObj = communities.find(c => c.id === currentUser.joinedCommunityId) || INITIAL_COMMUNITIES.find(c => c.id === currentUser.joinedCommunityId);
                          return myCommObj ? (
                            <button 
                              onClick={() => {
                                setSelectedCategory('Communities');
                                setSelectedCommunity(myCommObj);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-black text-white bg-emerald-600 hover:bg-emerald-500 uppercase tracking-wide rounded-md hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md shadow-emerald-500/20 flex items-center gap-1 group cursor-pointer shrink-0"
                            >
                              <span className="relative flex h-1.5 w-1.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-200"></span>
                              </span>
                              <span>{lang === 'en' ? 'Community' : 'Topluluğum'}</span>
                            </button>
                          ) : null;
                        })()
                      )}
                      <button 
                        onClick={() => setSelectedCategory('Communities')}
                        className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-wide hover:text-primary/70 transition-colors cursor-pointer shrink-0"
                      >
                        {t.buttons.viewAll}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 overflow-x-auto pb-2 pt-0.5 px-0.5 no-scrollbar snap-x">
                    {INITIAL_COMMUNITIES.map(community => (
                      <motion.div 
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        key={community.id}
                        onClick={() => { 
                          setSelectedCategory('Communities'); 
                          if (community.id !== 'all') {
                            const foundComm = communities.find(c => c.id === community.id) || community;
                            setSelectedCommunity(foundComm);
                          } else {
                            setSelectedCommunity(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' }); 
                          }
                        }}
                        className={`
                          snap-start shrink-0 w-[132px] sm:w-[148px] rounded-2xl border shadow-sm hover:shadow-lg overflow-hidden cursor-pointer group transition-all duration-300
                          ${community.id === 'all' 
                            ? 'bg-gradient-to-br from-primary via-primary-mid to-primary-dark border-primary/20 shadow-primary/10' 
                            : 'bg-white border-primary/10 hover:border-primary/30'
                          }
                        `}
                      >
                        <div className={`aspect-[4/3] relative overflow-hidden ${community.id === 'all' ? 'bg-white/10' : 'bg-slate-100'}`}>
                          {community.id === 'all' ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <Users className="text-white w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
                            </div>
                          ) : (
                            <img
                              src={community.imageUrl}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              alt={community.name}
                            />
                          )}
                          <div className={`absolute bottom-1.5 right-1.5 p-1 rounded-lg shadow-sm ${community.id === 'all' ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-white/90 text-primary'}`}>
                            <MessagesSquare size={12} strokeWidth={2.5} />
                          </div>
                        </div>
                        <div className={`p-2.5 border-t ${community.id === 'all' ? 'border-white/15' : 'border-slate-50'}`}>
                          <h3 className={`font-black text-[10px] sm:text-[11px] uppercase tracking-tight truncate leading-none transition-colors ${community.id === 'all' ? 'text-white' : 'text-slate-900 group-hover:text-primary'}`}>
                            {community.id === 'all' ? (lang === 'en' ? 'ALL CITIES' : 'TÜM ŞEHİRLER') : community.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            <span className={`w-1 h-1 rounded-full animate-pulse shrink-0 ${community.id === 'all' ? 'bg-accent' : 'bg-primary'}`} />
                            <p className={`text-[9px] font-black uppercase tracking-wider truncate ${community.id === 'all' ? 'text-white/75' : 'text-primary'}`}>
                              {community.memberCount}+ {lang === 'en' ? 'Members' : 'Üye'}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </motion.div>
            ) : (
              /* BUSINESS DIRECTORY / SEARCH RESULTS VIEW */
              <div className="animate-in fade-in duration-500">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 pb-4 border-b border-slate-100">
                  <button onClick={resetHome} className="hover:scale-105 transition-transform flex items-center">
                    <LogoText size="text-2xl" />
                  </button>
                  <ChevronRight size={18} />
                  <span className="text-slate-900 uppercase tracking-widest font-black">
                    {selectedCategory === 'All' ? (t.categories as any).All : (t.categories[selectedCategory as keyof typeof t.categories] || selectedCategory)}
                  </span>
                </div>

                {selectedCategory === 'Announcements' && (
                  <section className="announcements-zone animate-in fade-in slide-in-from-bottom-4 duration-700 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-10 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 relative z-10 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20 ring-1 ring-primary/15 shrink-0">
                          <Megaphone size={26} strokeWidth={2.5} />
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-black tracking-tight-brand text-accent-vivid uppercase leading-none font-display italic">
                            {t.sections.announcements}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-wider mt-2">
                            {(notifications || []).filter((n) => n?.approved).length}{' '}
                            {lang === 'en' ? 'live posts' : 'aktif ilan'}
                          </p>
                        </div>
                      </div>
                      <AnnouncementHeaderActions
                        lang={lang}
                        unreadMessageCount={unreadAnnouncementMessageCount}
                        hasOwnListings={hasPostedAnnouncement}
                        onPostListing={() => checkAuth(() => setIsPostModalOpen(true))}
                        onOpenMyAds={() => checkAuth(handleOpenAnnouncementMessages)}
                        variant="page"
                      />
                    </div>

                    <CategoryTabBar
                      tabs={[
                        { id: 'All', label: lang === 'en' ? 'ALL' : 'HEPSİ' },
                        ...Object.values(NotificationCategory).map((cat) => ({
                          id: cat,
                          label: t.categories[cat] || cat,
                        })),
                      ]}
                      selectedId={selectedNotificationCategory}
                      onSelect={(id) => {
                        setSelectedNotificationCategoriesMulti([]);
                        setSelectedNotificationCategory(id as NotificationCategory | 'All');
                      }}
                    />

                    <AnnouncementFeedList
                      notifications={(notifications || []).filter(
                        (n) =>
                          n &&
                          n.approved &&
                          (!searchQuery.trim() ||
                            (n.title || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                            (n.description || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                            (n.category || '').toLowerCase().includes((searchQuery || '').toLowerCase())),
                      )}
                      categoryFilter={selectedNotificationCategory}
                      categoryFiltersMulti={selectedNotificationCategoriesMulti}
                      onMultiCategoryFilterChange={setSelectedNotificationCategoriesMulti}
                      lang={lang}
                      categoryLabels={t.categories}
                      contactLabel={t.labels.contact}
                      onSelect={(notif) => setSelectedNotification(notif)}
                    />
                  </section>
                )}

                {selectedCategory === 'All' && (
                  <div className="space-y-16">
                    {/* --- SEARCH RESULTS VIEW FOR BOTH COMPANIES AND MEMBERS (WITHOUT COMPANIES) --- */}
                    {searchQuery.trim() !== '' && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white -mx-4 px-4 sm:-mx-8 sm:px-8 py-10 rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden text-left">
                        <div className="flex items-center gap-3.5">
                          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                            <Search size={28} className="text-primary animate-pulse" />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight leading-none italic font-display">
                              {lang === 'en' ? 'Search Results' : 'Arama Sonuçları'}
                            </h3>
                            <p className="text-slate-400 text-[13px] font-black uppercase tracking-widest mt-1.5 font-sans">
                              {lang === 'en' ? `Matches for "${searchQuery}"` : `"${searchQuery}" için arama sonuçları`}
                            </p>
                          </div>
                        </div>

                        {/* Sub-Section 1: Businesses */}
                        <div className="space-y-4">
                          <h4 className="text-[14px] font-black uppercase tracking-[0.25em] text-accent-vivid border-b border-accent/25 pb-2 flex items-center gap-2">
                            <Building2 size={16} />
                            {lang === 'en' ? 'Businesses & Listings' : 'Sektör Firmaları & Şirketler'} ({filteredBusinesses.length})
                          </h4>
                          {filteredBusinesses.length === 0 ? (
                            <p className="text-[15px] font-bold text-slate-400 italic py-2">
                              {lang === 'en' ? 'No matching registered companies found.' : 'Eşleşen kayıtlı firma bulunamadı.'}
                            </p>
                          ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                              {filteredBusinesses.map(biz => (
                                <div 
                                  key={biz.id} 
                                  onClick={() => {
                                    setSelectedBusiness(biz);
                                    setIsBusinessDetailModalOpen(true);
                                  }}
                                  className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col h-full text-left relative cursor-pointer active:scale-[0.98] overflow-hidden group"
                                >
                                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 flex flex-col gap-1 sm:gap-2">
                                     {biz.verified && (
                                       <div className="bg-emerald-500 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest shadow-md flex items-center gap-0.5">
                                         <ShieldCheck size={10} />
                                         <span>{lang === 'en' ? 'Verified' : 'Onaylı'}</span>
                                       </div>
                                     )}
                                  </div>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleFavorite(biz.id);
                                    }}
                                    className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${favorites.includes(biz.id) ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-white/80 backdrop-blur-md text-slate-400 hover:text-primary active:scale-90 shadow-sm'}`}
                                  >
                                    <Heart size={favorites.includes(biz.id) ? 10 : 12} fill={favorites.includes(biz.id) ? "currentColor" : "none"} strokeWidth={3} />
                                  </button>
                                  <div className="aspect-[4/3] overflow-hidden relative bg-slate-50">
                                      <div className="absolute bottom-1.5 left-1.5 z-10 pointer-events-none">
                                        <CategoryFlatIcon
                                          style={COMPANY_CATEGORY_STYLES[biz.category] || ALL_CATEGORY_STYLE}
                                          size={19}
                                          boxSize={38}
                                          variant="badge"
                                        />
                                      </div>
                                      <img 
                                        src={biz.imageUrl || `https://source.unsplash.com/400x300/?${biz.category},business`} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        referrerPolicy="no-referrer"
                                      />
                                  </div>
                                  <div className="p-2 sm:p-3 flex flex-col flex-1 relative">
                                      <h4 className="text-[14px] sm:text-xs font-black text-slate-900 mb-0.5 line-clamp-1 uppercase tracking-tight transition-colors">{biz.name}</h4>
                                      <p className={`text-[8px] sm:text-[9px] font-black uppercase tracking-tight line-clamp-1 mb-1.5 ${(COMPANY_CATEGORY_STYLES[biz.category] || ALL_CATEGORY_STYLE).textColor}`}>
                                        {t.categories[biz.category as keyof typeof t.categories] || biz.category}
                                      </p>
                                      <div className="flex items-center gap-1 mb-2">
                                          <StarRating rating={biz.rating} size={12} />
                                          <span className="text-[11px] sm:text-[12px] font-black text-primary/80 ml-0.5 uppercase tracking-tighter">{biz.rating}</span>
                                      </div>
                                      <div className="mt-auto pt-1.5 sm:pt-2 border-t border-slate-50">
                                         <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-slate-400 font-black text-[11px] sm:text-[12px] uppercase tracking-widest truncate max-w-[80%]">
                                               <MapPin size={12} className="text-accent-vivid shrink-0" />
                                               <span className="truncate">{biz.address || biz.location || (lang === 'en' ? 'Remote' : 'Uzaktan')}</span>
                                            </div>
                                            <ChevronRight size={14} className="text-slate-300 shrink-0" />
                                         </div>
                                      </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Sub-Section 2: Users/Members */}
                        <div className="space-y-4 pt-6 border-t border-slate-100">
                          <h4 className="text-[14px] font-black uppercase tracking-[0.25em] text-primary border-b border-primary/10 pb-2 flex items-center gap-2">
                            <Users size={16} />
                            {lang === 'en' ? 'Hub Members & Profiles' : 'Topluluk Üyeleri & Profiller'} ({
                              dbUsers.filter(user => {
                                if (!user) return false;
                                if (currentUser && user.id === currentUser.id) return false;
                                return (user.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                                       (user.email || '').toLowerCase().includes((searchQuery || '').toLowerCase());
                              }).length
                            })
                          </h4>
                          {dbUsers.filter(user => {
                            if (!user) return false;
                            if (currentUser && user.id === currentUser.id) return false;
                            return (user.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                                   (user.email || '').toLowerCase().includes((searchQuery || '').toLowerCase());
                          }).length === 0 ? (
                            <p className="text-[15px] font-bold text-slate-400 italic py-2">
                              {lang === 'en' ? 'No matching community members found.' : 'Eşleşen topluluk üyesi bulunamadı.'}
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {dbUsers
                                .filter(user => {
                                  if (!user) return false;
                                  if (currentUser && user.id === currentUser.id) return false;
                                  return (user.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                                         (user.email || '').toLowerCase().includes((searchQuery || '').toLowerCase());
                                })
                                .map(user => {
                                  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random`;
                                  return (
                                    <div 
                                      key={user.id} 
                                      onClick={() => handleOpenUserProfile(user.id, user)}
                                      className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 hover:border-primary/10 hover:bg-white hover:shadow-md duration-300 flex items-center justify-between text-left group gap-4 cursor-pointer"
                                    >
                                      <div className="flex items-center gap-3.5 min-w-0">
                                        <div className="w-11 h-11 rounded-xl overflow-hidden border border-white shrink-0 shadow-sm bg-white">
                                          <img 
                                            src={user.photoUrl || placeholderAvatar} 
                                            className="w-full h-full object-cover" 
                                            alt={user.name} 
                                            referrerPolicy="no-referrer" 
                                          />
                                        </div>
                                        <div className="min-w-0">
                                          <p className="text-xs font-black text-slate-800 uppercase tracking-tight truncate group-hover:text-primary transition-colors">
                                            {user.name || (lang === 'en' ? 'Canada Member' : 'Topluluk Üyesi')}
                                          </p>
                                          <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest truncate mt-0.5">
                                            {user.city || (lang === 'en' ? 'Canada Registered' : 'Kanada Kayıtlı')}
                                          </p>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-2 shrink-0">
                                         <button 
                                           onClick={(e) => {
                                             e.stopPropagation();
                                             handlePlaceUserCall(user);
                                           }}
                                           className="w-9 h-9 bg-primary text-white hover:bg-primary-mid rounded-xl flex items-center justify-center shadow-lg shadow-primary/10 hover:scale-105 active:scale-95 transition-all text-sm shrink-0"
                                           title={lang === 'en' ? 'Call Member' : 'Üyeyi Ara'}
                                         >
                                            <Phone size={18} />
                                         </button>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* --- ALL COMPANY CATEGORIES PAGE --- */}
                    {searchQuery.trim() === '' && (
                      <CompanyCategoriesExplorerPage
                        categoryLabels={t.categories}
                        lang={lang}
                        businessCount={(businesses || []).length}
                        onBack={resetHome}
                        onSelectCategory={(cat) => {
                          setSelectedCategory(cat);
                          setSelectedCompanyCategory(cat);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    )}
                  </div>
                )}

                {/* NEW VIEWS */}
                {selectedCategory === 'Communities' && (
                  <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                          <Users size={30} />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">
                            {selectedCommunity ? selectedCommunity.name : t.sections.communities}
                          </h2>
                          <p className="text-[14px] font-black text-gray-400 uppercase tracking-widest">
                            {selectedCommunity ? t.sections.chatRoom : t.sections.joinCommunity}
                          </p>
                        </div>
                      </div>
                      {selectedCommunity && (
                        <button 
                          onClick={() => setSelectedCommunity(null)}
                          className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full font-black text-[14px] uppercase tracking-widest transition-all"
                        >
                          {t.buttons.back}
                        </button>
                      )}
                    </div>

                    {!selectedCommunity ? (
                      /* Compact Community Grid */
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                        {INITIAL_COMMUNITIES.filter(c => c && c.id !== 'all').filter(c => c && (
                          !searchQuery.trim() ||
                          (c.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                          ((c.description || '').toLowerCase().includes((searchQuery || '').toLowerCase()))
                        )).map(community => {
                          const isJoined = currentUser?.joinedCommunityId === community.id;
                          const hasJoinedAny = !!currentUser?.joinedCommunityId;

                          return (
                            <div 
                              key={community.id}
                              onClick={() => setSelectedCommunity(community)}
                              className={`bg-white/80 backdrop-blur-sm rounded-[2rem] border p-4 flex flex-col gap-3 hover:shadow-xl transition-all cursor-pointer group shadow-sm active:scale-95 ${
                                isJoined ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-emerald-100 hover:border-emerald-200'
                              }`}
                            >
                              <div className="flex items-center gap-4 text-left overflow-hidden">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-gray-100 shrink-0">
                                   <img src={community.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={community.name} />
                                </div>
                                <div className="min-w-0 flex-1">
                                   <div className="flex items-start justify-between gap-1 mb-1">
                                     <h3 className="font-black text-gray-900 uppercase tracking-tight leading-none truncate flex-1">{community.name}</h3>
                                     {isJoined && (
                                       <span className="shrink-0 text-[12px] font-black tracking-widest text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md uppercase">
                                         {lang === 'en' ? 'Joined' : 'Katıldın'}
                                       </span>
                                     )}
                                   </div>
                                   <p className="text-[14px] font-black text-gray-400 uppercase tracking-widest mb-1">{community.memberCount}+ {t.sections.members || 'participants'}</p>
                                </div>
                              </div>
                              {isJoined ? (
                                <button className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-black text-[14px] uppercase tracking-widest hover:bg-emerald-700 transition-all shrink-0 shadow-lg shadow-emerald-100">
                                  {lang === 'en' ? 'Enter Chat (Joined)' : 'Sohbete Gir (Katıldın)'}
                                </button>
                              ) : hasJoinedAny ? (
                                <button className="w-full py-2.5 bg-slate-100 text-slate-500 rounded-xl font-black text-[14px] uppercase tracking-widest hover:bg-slate-200 transition-all shrink-0">
                                  {lang === 'en' ? 'View (Read-Only)' : 'Görüntüle (Sadece Oku)'}
                                </button>
                              ) : (
                                <button className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-black text-[14px] uppercase tracking-widest hover:bg-emerald-700 transition-all shrink-0 shadow-lg shadow-emerald-100">
                                  {lang === 'en' ? 'View & Join' : 'Gör ve Katıl'}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Community Chat Room */
                      <div id="community-chat-room" className="bg-white rounded-[3.5rem] border border-gray-100 shadow-2xl overflow-hidden flex flex-col h-[650px] md:h-[750px] text-left animate-in zoom-in-95 duration-300">
                        {/* Chat Header */}
                        <div className="bg-primary p-6 md:p-8 text-white flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                              <img src={selectedCommunity.imageUrl} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h3 className="font-black text-xl tracking-tight uppercase leading-none mb-1">{selectedCommunity.name} Community</h3>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-[13px] font-black text-primary-foreground/70 uppercase tracking-widest leading-none">{selectedCommunity.memberCount / 10 | 0} {t.sections.online}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {currentUser && (
                              currentUser.joinedCommunityId === selectedCommunity.id ? (
                                <span className="text-[14px] sm:text-xs font-black tracking-widest text-emerald-400 bg-white/10 border border-white/10 uppercase px-3 py-1.5 rounded-xl">
                                  {lang === 'en' ? '★ Joined' : '★ Katıldınız'}
                                </span>
                              ) : (
                                <span className="text-[14px] sm:text-xs font-black tracking-widest text-slate-300 bg-white/5 border border-white/5 uppercase px-3 py-1.5 rounded-xl">
                                  {lang === 'en' ? '👁👁 Read Only' : '👁👁 Sadece Oku'}
                                </span>
                              )
                            )}
                            <div className="hidden md:flex p-3 bg-white/10 rounded-2xl hover:bg-white/20 cursor-pointer transition-all border border-white/5"><Info size={22} /></div>
                          </div>
                        </div>

                        {/* Messages Area */}
                        <div id="community-messages-container" className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-slate-50/50 custom-scrollbar">
                          {communityMessages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 animate-bounce">
                                 <MessagesSquare className="text-slate-200" size={38} />
                               </div>
                               <div>
                                 <h4 className="font-black text-slate-400 uppercase tracking-widest text-sm">No messages yet</h4>
                                 <p className="text-[14px] font-bold text-slate-300 uppercase tracking-widest mt-1">Be the first to start the conversation!</p>
                               </div>
                            </div>
                          ) : (
                            communityMessages.map((msg) => {
                              const isMe = msg.senderId === currentUser?.id;
                              
                              return (
                                <div key={msg.id} className={`flex items-start gap-3 w-full mt-4 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                  {/* Profile Photo at the beginning of each message */}
                                  <div 
                                    onClick={() => handleOpenUserProfile(msg.senderId, { id: msg.senderId, name: msg.senderName, photoUrl: msg.senderPhoto })}
                                    className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 shadow-sm shrink-0 select-none bg-white cursor-pointer hover:opacity-80 active:scale-95 transition-all"
                                    id={`community-msg-profile-${msg.id}`}
                                  >
                                    <img 
                                      src={msg.senderPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.senderName || 'W')}&background=random`} 
                                      className="w-full h-full object-cover" 
                                      alt={msg.senderName} 
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  
                                  {/* Message Body and Details */}
                                  <div className={`flex flex-col max-w-[80%] sm:max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                                    <span 
                                      onClick={() => handleOpenUserProfile(msg.senderId, { id: msg.senderId, name: msg.senderName, photoUrl: msg.senderPhoto })}
                                      className="text-[14px] font-black text-slate-500 uppercase tracking-tight mb-1 px-1 cursor-pointer hover:text-primary transition-colors"
                                      id={`community-msg-uid-${msg.id}`}
                                    >
                                      {isMe ? (lang === 'en' ? 'You' : 'Siz') : msg.senderName}
                                    </span>
                                    <div className={`
                                      group relative p-4 shadow-sm transition-all max-w-full break-words overflow-hidden
                                      ${isMe 
                                        ? 'bg-primary text-white rounded-3xl rounded-tr-none' 
                                        : 'bg-white text-slate-800 rounded-3xl rounded-tl-none border border-slate-100'
                                      }
                                    `}>
                                      {msg.type === 'image' && msg.imageUrl && (
                                        <div 
                                          onClick={() => setPreviewMessageImage(msg.imageUrl || null)}
                                          className="mb-2 max-w-xs overflow-hidden rounded-2xl border border-black/5 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer shadow-sm relative group/img"
                                        >
                                          <img 
                                            src={msg.imageUrl} 
                                            alt="Attached Image" 
                                            className="w-full h-auto object-cover max-h-64 sm:max-h-72" 
                                            referrerPolicy="no-referrer"
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
                                            <span className="opacity-0 group-hover/img:opacity-100 bg-black/50 text-white text-[14px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm transition-all scale-95 group-hover/img:scale-100">
                                              {lang === 'en' ? '🔍 View Image' : '🔍 Büyüt'}
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                      {msg.content && (
                                        <div className="text-sm md:text-[19px] font-bold leading-relaxed break-words whitespace-pre-wrap [word-break:break-word]">{msg.content}</div>
                                      )}
                                      <div className={`mt-2 text-[12px] font-black uppercase tracking-widest opacity-40 ${isMe ? 'text-right' : 'text-left'}`}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                          <div ref={communityChatEndRef} />
                        </div>

                        {/* Chat Input */}
                        <div className="p-6 md:p-8 bg-white border-t border-slate-100 shrink-0">
                          {!currentUser ? (
                             <div className="text-center p-4 bg-slate-50 rounded-3xl border border-slate-100">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                   {lang === 'en' ? 'Please log in to participate in the community' : 'Topluluğa katılmak için lütfen giriş yapın'}
                                </p>
                                <button 
                                  onClick={() => setIsAuthModalOpen(true)}
                                  className="mt-3 px-8 py-2 bg-primary text-white rounded-full font-black text-[14px] uppercase tracking-widest shadow-lg shadow-primary/20"
                                >
                                   {t.auth.signIn}
                                </button>
                             </div>
                          ) : currentUser.joinedCommunityId === selectedCommunity.id ? (
                            <div className="space-y-4">
                              <ChatMessageComposer
                                asForm
                                onSubmit={handleSendCommunityMessage}
                                onSend={() => {}}
                                onImagePick={handleCommunityImageChange}
                                selectedImage={communityImageSelected}
                                onClearImage={() => setCommunityImageSelected(null)}
                                isUploadingImage={isUploadingCommunityImage}
                                lang={lang}
                                inputName="message"
                                placeholder={t.sections.typeMessage}
                                leftSlot={(
                                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shadow-sm shrink-0 select-none">
                                    <img
                                      src={currentUser?.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'User')}&background=random`}
                                      className="w-full h-full object-cover"
                                      alt="My Profile"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                )}
                              />
                            </div>
                          ) : (
                            <div className="w-full">
                              <button 
                                onClick={() => handleJoinCommunity(selectedCommunity.id)}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-3xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                              >
                                {currentUser.joinedCommunityId ? (
                                  <>
                                    <Sparkles size={18} className="animate-pulse shrink-0" />
                                    <span>
                                      {lang === 'en' ? 'Switch to this Community' : 'Bu Topluluğa Geç'}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Users size={18} className="shrink-0" />
                                    <span>
                                      {lang === 'en' ? 'Join Community' : 'Topluluğa Katıl'}
                                    </span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* --- FAVORITES --- */}
                {selectedCategory === 'Favorites' && favorites.length === 0 && (
                  <div className="text-center py-32 px-10 bg-white border border-slate-100 rounded-[4rem] shadow-sm animate-in zoom-in duration-700 relative overflow-hidden">
                    <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-primary-light shadow-sm border border-primary-light/20">
                      <Heart size={54} className="animate-pulse" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">{t.bottomNav.favorites}</h2>
                    <p className="text-slate-400 text-sm font-black uppercase tracking-[0.2em] leading-loose max-w-xs mx-auto opacity-60">
                      {lang === 'en' ? 'Your preferred companies will materialize here shortly.' : 'Favori eklediğiniz firmalar burada toplanacak.'}
                    </p>
                  </div>
                )}

                {selectedCategory === 'Favorites' && favorites.length > 0 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-8">
                       <div className="w-12 h-12 bg-primary-mid/10 rounded-2xl flex items-center justify-center text-primary">
                          <Heart size={30} fill="currentColor" />
                       </div>
                       <div>
                          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{t.bottomNav.favorites}</h2>
                          <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{favorites.length} {lang === 'en' ? 'Companies Saved' : 'Şirket Kaydedildi'}</p>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 bg-white -mx-4 px-4 sm:-mx-8 sm:px-8 py-8 md:py-12 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-sm">
                      {filteredBusinesses.map(biz => (
                        <div 
                          key={biz.id} 
                          onClick={() => {
                            setSelectedBusiness(biz);
                            setIsBusinessDetailModalOpen(true);
                          }}
                          className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col h-full text-left relative cursor-pointer active:scale-[0.98] overflow-hidden group"
                        >
                          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 flex flex-col gap-1 sm:gap-2">
                             {biz.verified && (
                               <div className="bg-emerald-500 text-white text-[10px] sm:text-[11px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest shadow-md flex items-center gap-0.5 sm:gap-1">
                                 <ShieldCheck size={12} />
                                 <span>{lang === 'en' ? 'Verified' : 'Onaylı'}</span>
                               </div>
                             )}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(biz.id);
                            }}
                            className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${favorites.includes(biz.id) ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-white/80 backdrop-blur-md text-slate-400 hover:text-primary active:scale-90 shadow-sm'}`}
                          >
                            <Heart size={favorites.includes(biz.id) ? 10 : 12} fill={favorites.includes(biz.id) ? "currentColor" : "none"} strokeWidth={3} />
                          </button>
                          <div className="aspect-[4/3] overflow-hidden relative bg-slate-50">
                              <div className="absolute bottom-1.5 left-1.5 z-10 pointer-events-none">
                                <CategoryFlatIcon
                                  style={COMPANY_CATEGORY_STYLES[biz.category] || ALL_CATEGORY_STYLE}
                                  size={19}
                                  boxSize={38}
                                  variant="badge"
                                />
                              </div>
                              <img 
                                src={biz.imageUrl || `https://source.unsplash.com/400x300/?${biz.category},business`} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                referrerPolicy="no-referrer"
                              />
                          </div>
                          <div className="p-2 sm:p-3 flex flex-col flex-1 relative">
                              <h4 className="text-[14px] sm:text-xs font-black text-slate-900 mb-0.5 line-clamp-1 uppercase tracking-tight transition-colors">{biz.name}</h4>
                              <p className={`text-[8px] sm:text-[9px] font-black uppercase tracking-tight line-clamp-1 mb-1.5 ${(COMPANY_CATEGORY_STYLES[biz.category] || ALL_CATEGORY_STYLE).textColor}`}>
                                {t.categories[biz.category as keyof typeof t.categories] || biz.category}
                              </p>
                              <div className="flex items-center gap-1 mb-2">
                                  <StarRating rating={biz.rating} size={12} />
                                  <span className="text-[11px] sm:text-[12px] font-black text-primary/80 ml-0.5 uppercase tracking-tighter">{biz.rating}</span>
                              </div>
                              <div className="mt-auto pt-1.5 sm:pt-2 border-t border-slate-50">
                                 <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-slate-400 font-black text-[11px] sm:text-[12px] uppercase tracking-widest truncate max-w-[80%]">
                                       <MapPin size={12} className="text-accent-vivid shrink-0" />
                                       <span className="truncate">{biz.address || biz.location || (lang === 'en' ? 'Remote' : 'Uzaktan')}</span>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 shrink-0" />
                                 </div>
                              </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- BLOG (CAMPAIGNS) --- */}
                {selectedCategory === 'Blog' && (
                  <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-8 sm:p-12 rounded-[3.5rem] border border-slate-100 shadow-xl">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center shadow-sm border border-primary-light/20 overflow-hidden">
                          <Emoji3D emoji="🏷️" size={44} />
                        </div>
                        <div>
                          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-3">{t.bottomNav.blog}</h2>
                          <div className="flex items-center gap-3">
                             <div className="px-3 py-1 bg-accent text-white text-[13px] font-black uppercase tracking-widest rounded-full">Weekly Exclusive</div>
                             <p className="text-slate-400 text-[14px] font-black uppercase tracking-widest opacity-60">Curated community narratives</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <button className="px-8 py-3 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all whitespace-nowrap">Latest Edition</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {flyers.map((flyer, idx) => (
                          <div key={flyer.id || idx} className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-xl overflow-hidden group hover:shadow-2xl hover:border-slate-200 transition-all duration-500 flex flex-col relative h-full">
                             {/* Upper Red/Colored Accent with Flyer Banner */}
                             <div className={`${flyer.themeColor || 'bg-red-600'} text-white p-6 relative overflow-hidden shrink-0`}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/15 rounded-full translate-x-8 -translate-y-8 rotate-45 transform pointer-events-none" />
                                {flyer.images && flyer.images.length > 0 && (
                                   <div className="absolute inset-0 opacity-20 pointer-events-none">
                                      <img src={flyer.images[0]} className="w-full h-full object-cover filter blur-[2px]" alt="backdrop" />
                                   </div>
                                )}
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                   <span className={`px-2.5 py-1 ${flyer.badgeColor || 'bg-yellow-400 text-red-950'} text-[12px] font-black uppercase tracking-widest rounded-md shadow-sm`}>
                                      {lang === 'tr' ? flyer.badgeTr : flyer.badgeEn}
                                   </span>
                                   <span className="text-[14px] font-bold text-white/90 font-mono">
                                      {lang === 'tr' ? flyer.dateRangeTr : flyer.dateRangeEn}
                                   </span>
                                </div>
                                <h3 className="text-lg font-black tracking-tight leading-tight uppercase font-display max-w-[80%] relative z-10">
                                   {lang === 'tr' ? flyer.titleTr : flyer.titleEn}
                                </h3>
                                
                                {/* Flash Starburst tag on top right */}
                                <div className="absolute right-3 bottom-3 bg-yellow-400 text-slate-950 border border-white/20 rounded-full w-12 h-12 flex flex-col items-center justify-center rotate-12 shadow-[0_6px_16px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.6)] animate-pulse z-10 overflow-hidden">
                                   <Emoji3D emoji="🔥" size={18} variant="compact" className="-mb-0.5" />
                                   <span className="text-[11px] leading-none font-black uppercase">{lang === 'tr' ? 'İNDİRİM' : 'SAVE'}</span>
                                   <span className="text-[15px] leading-none font-extrabold">{flyer.savings || '%30'}</span>
                                </div>
                             </div>

                             {/* Flyer Products Inside */}
                             <div className="p-6 flex-1 bg-gradient-to-b from-slate-50 to-white flex flex-col justify-between">
                                <div className="space-y-4">
                                   {flyer.items && flyer.items.slice(0, 3).map((item, itemIdx) => (
                                      <div key={itemIdx} className="flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:scale-[1.02] transition-transform">
                                         <div className="max-w-[70%]">
                                            <p className="text-xs font-bold text-slate-800 line-clamp-1">{lang === 'tr' ? item.nameTr : item.nameEn}</p>
                                            <span className="text-[12px] font-extrabold text-red-500 uppercase tracking-widest">{lang === 'tr' ? 'İNDİRİMLİ ÜRÜN' : 'SALES ITEM'}</span>
                                         </div>
                                         <div className="text-right shrink-0">
                                            <p className="text-[13px] line-through text-slate-400 font-bold leading-none">{item.oldPrice}</p>
                                            <p className="text-sm font-extrabold text-red-600 leading-tight">{item.newPrice}</p>
                                         </div>
                                      </div>
                                   ))}
                                   {(!flyer.items || flyer.items.length === 0) && (
                                      <div className="py-8 text-center text-slate-300 text-[15px] font-black uppercase tracking-wider">
                                         {lang === 'tr' ? 'KAMPANYALI ÜRÜN İÇERİĞİ' : 'SPECIAL DEAL ARCHIVE'}
                                      </div>
                                   )}
                                </div>

                                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                                   <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                                      <span className="text-[13px] font-black uppercase tracking-widest text-slate-400 font-mono">
                                         {lang === 'tr' ? 'AKTÜEL KATALOG' : 'LIVE CATALOGUE'}
                                      </span>
                                   </div>
                                   <button 
                                      onClick={() => {
                                         setSelectedFlyer(flyer);
                                         setCurrentImageIndex(0);
                                         setIsFlyerModalOpen(true);
                                      }}
                                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[13px] font-black uppercase tracking-widest hover:bg-accent transition-colors"
                                   >
                                      {lang === 'tr' ? "Flyer'ı İncele" : 'View Flyer'}
                                   </button>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>

                    <div className="text-center py-20 px-10 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                      <p className="text-slate-400 text-sm font-black uppercase tracking-[0.2em] leading-loose max-w-xs mx-auto opacity-60">
                        {lang === 'en' ? 'More curated community narratives arriving precisely soon.' : 'Daha fazla özel topluluk hikayesi yakında burada yayınlanacak.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* --- SUPPORT CHAT --- */}
                {selectedCategory === 'Chat' && (
                  <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-[3.5rem] shadow-xl overflow-hidden animate-in slide-in-from-bottom-12 duration-700 flex flex-col h-[700px] relative">
                    <div className="bg-primary p-8 md:p-10 text-white relative shrink-0 overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-12 -translate-y-12 blur-2xl"></div>
                      <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-[1.5rem] flex items-center justify-center shadow-lg border border-white/30">
                          <MessageSquareText size={38} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-black leading-tight tracking-tighter uppercase">{lang === 'en' ? 'Concierge' : 'Destek'}</h2>
                          <div className="flex items-center gap-2.5 mt-1.5">
                            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-glow"></div>
                            <p className="text-white/80 text-[15px] font-black uppercase tracking-[0.25em]">{lang === 'en' ? 'HELP CENTER' : 'DESTEK MERKEZİ'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!currentUser ? (
                      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
                        <Lock size={54} className="text-slate-300 mb-4 stroke-2" />
                        <h4 className="text-base font-black uppercase text-slate-700 tracking-wider">
                          {lang === 'en' ? 'Authentication Required' : 'Giriş Yapılması Gerekiyor'}
                        </h4>
                        <p className="text-xs text-slate-400 max-w-sm mt-2 mb-6 leading-relaxed">
                          {lang === 'en' 
                            ? 'To start a private and secure live chat with the admin team, please log in or create an account.' 
                            : 'Yöneticilerle özel ve güvenli bir canlı sohbet başlatmak için lütfen giriş yapın veya bir hesap oluşturun.'}
                        </p>
                        <button
                          onClick={() => setIsAuthModalOpen(true)}
                          className="px-8 py-3.5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/25 hover:bg-primary/95 transition-all active:scale-95 cursor-pointer"
                        >
                          {lang === 'en' ? 'Login or Register' : 'Giriş Yap / Üye Ol'}
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-6 custom-scrollbar bg-slate-50">
                          {chatMessages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 py-12">
                              <MessageSquare size={42} className="text-slate-300 mb-2 stroke-2" />
                              <p className="text-xs font-bold italic">
                                {lang === 'en' ? 'No messages yet. Send a message to start!' : 'Henüz mesaj yok. Başlamak için bir mesaj gönderin!'}
                              </p>
                            </div>
                          ) : (
                            chatMessages.map((msg) => (
                              <div key={msg.id} className={`flex flex-col ${msg.senderRole === 'admin' ? 'items-start' : 'items-end'}`}>
                                <div className={`max-w-[85%] p-5 rounded-[2rem] text-[19px] font-medium shadow-sm leading-relaxed break-words whitespace-pre-wrap ${msg.senderRole === 'admin' ? 'bg-primary text-white rounded-tl-none' : 'bg-white text-slate-800 rounded-tr-none border border-slate-100'}`}>
                                  <ChatMessageBody
                                    content={translateChatMessageContent(msg.content, lang)}
                                    imageUrl={msg.imageUrl}
                                    type={msg.type}
                                    onImagePreview={setPreviewMessageImage}
                                    isOnPrimaryBg={msg.senderRole === 'admin'}
                                    lang={lang}
                                    textClassName="text-[19px] font-medium leading-relaxed break-words whitespace-pre-wrap"
                                  />
                                </div>
                                <span className="text-[14px] font-black text-slate-400 mt-3 uppercase tracking-widest opacity-60">
                                  {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="p-8 bg-white border-t border-slate-100 shrink-0">
                          <ChatMessageComposer
                            onSend={handleSendUserMessage}
                            onImagePick={(e) => void handleChatImagePick(e, setIsUploadingUserChatImage, setUserChatImageSelected)}
                            selectedImage={userChatImageSelected}
                            onClearImage={() => setUserChatImageSelected(null)}
                            isUploadingImage={isUploadingUserChatImage}
                            lang={lang}
                            inputRef={userChatInputRef}
                            placeholder={lang === 'en' ? 'Type your message...' : 'Mesajınızı yazın...'}
                          />
                          <p className="text-[14px] font-black text-center text-slate-400 mt-5 uppercase tracking-[0.3em] opacity-40">{t.bottomNav.chatHint}</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                {![ 'All', 'Favorites', 'Blog', 'Chat', 'Announcements'].includes(selectedCategory) && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 bg-white -mx-4 px-4 sm:-mx-8 sm:px-8 py-8 md:py-12 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-sm">
                    {filteredBusinesses.map(biz => (
                      <div 
                        key={biz.id} 
                        onClick={() => {
                          setSelectedBusiness(biz);
                          setIsBusinessDetailModalOpen(true);
                        }}
                        className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col h-full text-left relative cursor-pointer active:scale-[0.98] overflow-hidden group"
                      >
                        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 flex flex-col gap-1 sm:gap-2">
                           {biz.verified && (
                             <div className="bg-emerald-500 text-white text-[10px] sm:text-[11px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest shadow-md flex items-center gap-0.5 sm:gap-1">
                               <ShieldCheck size={12} />
                               <span>{lang === 'en' ? 'Verified' : 'Onaylı'}</span>
                             </div>
                           )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(biz.id);
                          }}
                          className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${favorites.includes(biz.id) ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-white/80 backdrop-blur-md text-slate-400 hover:text-primary active:scale-90 shadow-sm'}`}
                        >
                          <Heart size={favorites.includes(biz.id) ? 10 : 12} fill={favorites.includes(biz.id) ? "currentColor" : "none"} strokeWidth={3} />
                        </button>
                        <div className="aspect-[4/3] overflow-hidden relative bg-slate-50">
                            <div className="absolute bottom-1.5 left-1.5 z-10 pointer-events-none">
                              <CategoryFlatIcon
                                style={COMPANY_CATEGORY_STYLES[biz.category] || ALL_CATEGORY_STYLE}
                                size={19}
                                boxSize={38}
                                variant="badge"
                              />
                            </div>
                            <img 
                              src={biz.imageUrl || `https://source.unsplash.com/400x300/?${biz.category},business`} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                              referrerPolicy="no-referrer"
                            />
                        </div>
                        <div className="p-2 sm:p-3 flex flex-col flex-1 relative">
                            <h4 className="text-[14px] sm:text-xs font-black text-slate-900 mb-0.5 line-clamp-1 uppercase tracking-tight transition-colors">{biz.name}</h4>
                            <p className={`text-[8px] sm:text-[9px] font-black uppercase tracking-tight line-clamp-1 mb-1.5 ${(COMPANY_CATEGORY_STYLES[biz.category] || ALL_CATEGORY_STYLE).textColor}`}>
                              {t.categories[biz.category as keyof typeof t.categories] || biz.category}
                            </p>
                            <div className="flex items-center gap-1 mb-2">
                                <StarRating rating={biz.rating} size={12} />
                                <span className="text-[11px] sm:text-[12px] font-black text-primary/80 ml-0.5 uppercase tracking-tighter">{biz.rating}</span>
                            </div>
                            <div className="mt-auto pt-1.5 sm:pt-2 border-t border-slate-50">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1 text-slate-400 font-black text-[11px] sm:text-[12px] uppercase tracking-widest truncate max-w-[80%]">
                                    <MapPin size={12} className="text-accent-vivid shrink-0" />
                                    <span className="truncate">{biz.address || biz.location || (lang === 'en' ? 'Remote' : 'Uzaktan')}</span>
                                  </div>
                                  <ChevronRight size={14} className="text-slate-300 shrink-0" />
                                </div>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
      )}

      <Modal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        title=""
        maxWidth="max-w-md"
      >
        <div className="p-1 space-y-6">
          {/* Main Brand Header */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <LogoIcon size={58} />
            </div>
            <LogoText size="text-xl" className="justify-center" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1.5">
              {lang === 'en' ? 'Canada Turkish Community Hub' : 'Kanada Türk Topluluk Merkezi'}
            </p>
          </div>

          {/* Elegant Segmented Tab Controller */}
          {authView !== 'forgot_password' && (
            <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-xs mx-auto shadow-inner border border-slate-200/40">
              <button
                type="button"
                onClick={() => { setAuthView('login'); setError(null); }}
                className={`flex-1 py-2.5 text-center text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                  authView === 'login'
                    ? 'bg-white text-primary shadow-sm scale-100'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {lang === 'en' ? 'Sign In' : 'Giriş Yap'}
              </button>
              <button
                type="button"
                onClick={() => { setAuthView('register'); setError(null); }}
                className={`flex-1 py-2.5 text-center text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                  authView === 'register'
                    ? 'bg-white text-primary shadow-sm scale-100'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {lang === 'en' ? 'Sign Up' : 'Kayıt Ol'}
              </button>
            </div>
          )}

          {/* Conditional Form Render helper */}
          {authView === 'login' ? (
            /* SIGN IN FORM */
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                handleUserLogin(e as any);
              }} 
              className="space-y-4 animate-in fade-in duration-200"
            >
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 ml-1">
                  <Mail size={18} className="text-slate-400" />
                  {lang === 'en' ? 'E-mail' : 'E-posta'}
                </label>
                <input required name="email" type="email" autoComplete="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none font-medium text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-350" placeholder="example@email.com" />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 ml-1">
                  <Lock size={18} className="text-slate-400" />
                  {lang === 'en' ? 'Password' : 'Şifre'}
                </label>
                <div className="relative">
                  <input 
                    required 
                    name="password" 
                    type={showPasswordLogin ? "text" : "password"} 
                    autoComplete="current-password" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-5 pr-12 py-3.5 outline-none font-medium text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-350" 
                    placeholder="••••••••" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  >
                    {showPasswordLogin ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-[15px] font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[15px] shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <RotateCw className="animate-spin" size={20} /> : <LogIn size={20} />}
                {lang === 'en' ? 'Sign In' : 'Giriş Yap'}
              </button>

              <div className="text-center">
                <button 
                  type="button" 
                  onClick={() => { setAuthView('forgot_password'); setError(null); }}
                  className="text-xs font-bold text-slate-400 hover:text-primary transition-colors underline decoration-slate-200 decoration-2 underline-offset-4"
                >
                  {lang === 'en' ? 'Forgot Password?' : 'Şifremi Unuttum'}
                </button>
              </div>
            </form>
          ) : authView === 'forgot_password' ? (
            /* FORGOT PASSWORD FORM */
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email') as string;
                setLoading(true);
                setError(null);
                try {
                  await sendPasswordResetEmail(auth, email);
                  showToast(
                    lang === 'en'
                      ? 'Secure link sent to reset your password. Please check your inbox and SPAM folder!'
                      : 'Şifrenizi sıfırlamanız için güvenli bağlantı e-postası gönderildi. Lütfen gelen kutunuzu ve SPAM klasörünü kontrol edin!',
                    'success'
                  );
                  setAuthView('login');
                } catch (err: any) {
                  setError(err.message || String(err));
                } finally {
                  setLoading(false);
                }
              }}
              className="space-y-4 animate-in fade-in duration-200"
            >
              <div className="text-center pb-2">
                <h3 className="text-sm font-bold text-slate-800">
                  {lang === 'en' ? 'Reset Password' : 'Şifreyi Sıfırla'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'en' 
                    ? 'Enter your registered email address below, and we will send you a password reset link.' 
                    : 'Kayıtlı e-posta adresinizi girin, şifrenizi sıfırlamanız için size bir bağlantı gönderelim.'}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 ml-1">
                  <Mail size={18} className="text-slate-400" />
                  {lang === 'en' ? 'E-mail' : 'E-posta'}
                </label>
                <input 
                  required 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none font-medium text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-350" 
                  placeholder="example@email.com" 
                />
              </div>

              {error && <p className="text-[15px] font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[15px] shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <RotateCw className="animate-spin" size={20} /> : <Mail size={20} />}
                {lang === 'en' ? 'Send Reset Link' : 'Sıfırlama Bağlantısı Gönder'}
              </button>

              <div className="text-center pt-2">
                <button 
                  type="button" 
                  onClick={() => { setAuthView('login'); setError(null); }}
                  className="text-xs font-bold text-slate-400 hover:text-primary transition-colors underline decoration-slate-200 decoration-2 underline-offset-4"
                >
                  {lang === 'en' ? 'Back to Sign In' : 'Giriş Yap Ekranına Dön'}
                </button>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name') as string;
                const email = formData.get('email') as string;
                const password = formData.get('password') as string;
                const confirmPassword = formData.get('confirmPassword') as string;
                
                if (password !== confirmPassword) {
                  setError(lang === 'en' ? 'Passwords do not match' : 'Şifreler eşleşmiyor');
                  return;
                }

                setLoading(true);
                try {
                  const userCred = await createUserWithEmailAndPassword(auth, email, password);
                  await updateProfile(userCred.user, { displayName: name });
                  
                  // Persist user record to Firestore DB immediately to guarantee existence in queries
                  const finalPhotoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
                  await setDoc(doc(db, 'users', userCred.user.uid), {
                    id: userCred.user.uid,
                    name: name,
                    email: email,
                    photoUrl: finalPhotoUrl,
                    lastActive: Date.now()
                  }, { merge: true });

                  setCurrentUser((prev: any) => prev ? {
                    ...prev,
                    name: name,
                    photoUrl: finalPhotoUrl
                  } : null);
                  
                  // Send secure email verification link
                  try {
                    await sendEmailVerification(userCred.user);
                    showToast(
                      lang === 'en' 
                        ? 'Secure verification email sent! Please check your inbox and SPAM folder to verify your account.' 
                        : 'Güvenli e-posta doğrulama linki gönderildi! Hesabınızı onaylamak için lütfen gelen kutusunu ve SPAM klasörünü kontrol edin.', 
                      'success'
                    );
                  } catch (verificationError: any) {
                    console.warn("Could not send verification email:", verificationError);
                    showToast(
                      lang === 'en' 
                        ? 'Registered successfully! Proceeding without verification mail constraint.' 
                        : 'Kayıt başarılı! E-posta doğrulama engeli olmadan girişe devam ediliyor.', 
                      'info'
                    );
                  }
                  
                  setIsAuthModalOpen(false);
                  setError(null);
                } catch (err: any) {
                  setError(err.message || String(err));
                } finally {
                  setLoading(false);
                }
              }} 
              className="space-y-4 animate-in fade-in duration-200"
            >
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 ml-1">
                  <User size={18} className="text-slate-400" />
                  {lang === 'en' ? 'Full Name' : 'Ad Soyad'}
                </label>
                <input required name="name" type="text" autoComplete="name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none font-medium text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-350" placeholder={lang === 'en' ? 'Your Name' : 'Adınız Soyadınız'} />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 ml-1">
                  <Mail size={18} className="text-slate-400" />
                  {lang === 'en' ? 'E-mail' : 'E-posta'}
                </label>
                <input required name="email" type="email" autoComplete="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none font-medium text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-350" placeholder="example@email.com" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 ml-1">
                    <Lock size={18} className="text-slate-400" />
                    {lang === 'en' ? 'Password' : 'Şifre'}
                  </label>
                  <div className="relative">
                    <input 
                      required 
                      name="password" 
                      type={showPasswordRegister ? "text" : "password"} 
                      autoComplete="new-password" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3.5 outline-none font-medium text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-350" 
                      placeholder="••••••••" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordRegister(!showPasswordRegister)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    >
                      {showPasswordRegister ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 ml-1">
                    <Lock size={18} className="text-slate-400" />
                    {lang === 'en' ? 'Confirm' : 'Onay'}
                  </label>
                  <div className="relative">
                    <input 
                      required 
                      name="confirmPassword" 
                      type={showConfirmPasswordRegister ? "text" : "password"} 
                      autoComplete="new-password" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3.5 outline-none font-medium text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-350" 
                      placeholder="••••••••" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPasswordRegister(!showConfirmPasswordRegister)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    >
                      {showConfirmPasswordRegister ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {error && <p className="text-[15px] font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[15px] shadow-lg shadow-accent/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <RotateCw className="animate-spin" size={20} /> : <UserPlus size={20} />}
                {lang === 'en' ? 'Create Account' : 'Kayıt Ol'}
              </button>
            </form>
          )}

          {/* Social Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-slate-100"></div>
            <div className="text-[14px] font-black text-slate-300 uppercase tracking-widest">{lang === 'en' ? 'OR' : 'VEYA'}</div>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-3">
            {isApple ? (
              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-black text-white hover:bg-slate-900 py-3.5 rounded-2xl font-black uppercase tracking-[0.2em] text-[14px] shadow-sm transition-all active:scale-95 flex items-center justify-center gap-4 relative group"
              >
                <Apple size={22} className="absolute left-6 text-white" />
                {lang === 'en' ? 'Continue with Apple' : 'Apple ile giriş yap'}
              </button>
            ) : (
              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-slate-200 text-slate-700 py-3.5 rounded-2xl font-black uppercase tracking-[0.2em] text-[14px] shadow-sm hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-4 relative group"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 absolute left-6" alt="Google" />
                {lang === 'en' ? 'Continue with Google' : 'Google ile devam et'}
              </button>
            )}
            
            <p className="text-[14px] text-slate-400 font-medium text-center mt-3 uppercase tracking-widest">
              {lang === 'en' ? 'By proceeding, you agree to our ' : 'Devam ederek '}
              <button type="button" onClick={() => setIsTermsModalOpen(true)} className="text-primary font-black hover:underline transition-colors">{lang === 'en' ? 'Terms' : 'Kullanım Koşulları'}</button>
              {lang === 'en' ? ' and ' : ' ve '}
              <button type="button" onClick={() => setIsTermsModalOpen(true)} className="text-primary font-black hover:underline transition-colors">{lang === 'en' ? 'Privacy Policy' : 'Gizlilik Politikası'}</button>
              {lang === 'en' ? '.' : '\'nı kabul etmiş olursunuz.'}
            </p>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={isPostModalOpen} 
        onClose={() => {
          setIsPostModalOpen(false);
          setNoticeImages([]);
        }} 
        title={t.buttons.postNotice}
      >
        {showPostSuccess ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
               <Check size={46} strokeWidth={4} />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">{lang === 'en' ? 'Success!' : 'Başarılı!'}</h3>
              <p className="text-sm font-bold text-slate-500 mt-2">
                {lang === 'en' ? 'Your announcement has been posted.' : 'Duyurunuz başarıyla paylaşıldı.'}
              </p>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            if (!currentUser) return;
            
            try {
              const newNotif = {
                title: formData.get('title') as string,
                category: formData.get('category') as NotificationCategory,
                description: formData.get('description') as string,
                price: formData.get('price') as string,
                imageUrl: noticeImages.length > 0 ? noticeImages[0] : '',
                gallery: noticeImages,
                date: new Date().toISOString().split('T')[0],
                createdAt: Date.now(),
                userId: currentUser.id,
                approved: true // Auto-approved by default (no post verification needed)
              };
              
              let docId = Math.random().toString(36).substring(2, 9);
              try {
                const docRef = await addDoc(collection(db, 'notifications'), newNotif);
                docId = docRef.id;
              } catch (writeErr: any) {
                const errMsg = String(writeErr?.message || writeErr).toLowerCase();
                if (errMsg.includes('quota') || errMsg.includes('exceeded') || errMsg.includes('exhausted') || errMsg.includes('limit')) {
                  setIsQuotaExceeded(true);
                  console.warn("Firestore write for notifications failed due to quota limit. Saving to local state for demo purposes.");
                } else {
                  throw writeErr;
                }
              }

              // Optimistically append to local state
              const notifWithId: Notification = { id: docId, ...newNotif } as any;
              setNotifications(prev => {
                const exists = prev.some(n => n.id === docId || (n.title === newNotif.title && n.userId === newNotif.id));
                if (exists) return prev;
                return [notifWithId, ...prev];
              });

              setShowPostSuccess(true);
              setTimeout(() => {
                setIsPostModalOpen(false);
                setShowPostSuccess(false);
                setNoticeImages([]);
              }, 2000);
            } catch (e) {
              handleFirestoreError(e, 'create', 'notifications');
            }
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Service Classification' : 'Hizmet Sınıflandırması'}</label>
            <select name="category" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all appearance-none cursor-pointer">
               {Object.values(NotificationCategory).map(cat => (
                 <option key={cat} value={cat} className="bg-white">{t.categories[cat] || cat}</option>
               ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Presentation Title' : 'Başlık'}</label>
            <input required name="title" type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" placeholder={lang === 'en' ? 'Ex: Premium Room in Downtown' : 'Örn: Şehir Merkezinde Lüks Oda'} />
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Core Description' : 'Detaylı Açıklama'}</label>
            <textarea required name="description" rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" placeholder={lang === 'en' ? 'Elaborate on the offer...' : 'İlan detaylarını buraya giriniz...'} />
          </div>
          <div className="grid grid-cols-1 gap-6">
             <div className="space-y-2">
                <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Valuation' : 'Fiyat'}</label>
                <input name="price" type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" placeholder="$500+" />
             </div>
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Visual Evidence (Max 10)' : 'Görsel Kanıt (En Fazla 10)'}</label>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="file" 
                  multiple
                  ref={noticeFileInputRef} 
                  onChange={handleNoticeImagesUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  type="button"
                  onClick={() => noticeFileInputRef.current?.click()}
                  className="py-4 bg-primary-mid/10 text-primary hover:bg-primary/20 rounded-2xl transition-all flex items-center justify-center gap-2 font-black text-[14px] uppercase tracking-widest"
                >
                  <Upload size={20} />
                  {lang === 'en' ? 'Upload Photos' : 'Fotoğraf Yükle'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const randomImg = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?auto=format&fit=crop&w=800&q=80`;
                    setNoticeImages(prev => [...prev, randomImg].slice(0, 10));
                  }}
                  className="py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-all flex items-center justify-center gap-2 font-black text-[14px] uppercase tracking-widest"
                >
                  <ImageIcon size={20} />
                  {lang === 'en' ? 'Random' : 'Rastgele'}
                </button>
              </div>
            </div>

            {noticeImages.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-4">
                {noticeImages.map((url, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-100 group">
                    <img src={url} className="w-full h-full object-cover" alt={`Preview ${idx + 1}`} />
                    <button 
                      type="button"
                      onClick={() => setNoticeImages(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="w-full bg-accent text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-accent/90 shadow-accent/20 transition-all active:scale-95">
            {lang === 'en' ? 'Submit for Verification' : 'Onaya Gönder'}
          </button>
        </form>
        )}
      </Modal>

      <Modal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} title={t.buttons.terms}>
        <div className="space-y-8 text-sm max-h-[70vh] overflow-y-auto px-2 custom-scrollbar">
          {lang === 'en' ? (
            <div className="space-y-8 text-slate-500 leading-relaxed font-semibold">
              <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="font-black text-slate-900 uppercase tracking-[0.2em] mb-4 text-[14px] flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  1. Acceptable Use Protocol
                </h4>
                <p>Users are strictly prohibited from disseminating content that is hateful, harassing, offensive, or otherwise illicit. Goofind serves as an elite infrastructure for the Turkish diaspora; respectful engagement is the mandatory baseline for all interactions.</p>
              </section>
              <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="font-black text-slate-900 uppercase tracking-[0.2em] mb-4 text-[14px] flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  2. Liability & Governance
                </h4>
                <p>Goofind operates as a directory and communication hub. We maintain zero liability for the quality of services facilitated or the outcome of private transactions. Users are self-sovereign and engage with listed services at their exclusive discretion.</p>
              </section>
              <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="font-black text-slate-900 uppercase tracking-[0.2em] mb-4 text-[14px] flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  3. Dynamic Moderation
                </h4>
                <p>Management reserves the absolute right to terminate any content (narratives, advertisements, listings) that deviates from our community excellence standards without prior notification.</p>
              </section>
            </div>
          ) : (
            <div className="space-y-8 text-slate-500 leading-relaxed font-semibold">
              <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="font-black text-slate-900 uppercase tracking-[0.2em] mb-4 text-[14px] flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  1. Kabul Edilebilir Kullanım
                </h4>
                <p>Kullanıcılar nefret söylemi, taciz edici veya yasa dışı içerik paylaşamaz. Goofind, Kanada Türk toplumu için yüksek standartlı bir platformdur; profesyonel ve saygılı iletişim zorunludur.</p>
              </section>
              <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="font-black text-slate-900 uppercase tracking-[0.2em] mb-4 text-[14px] flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  2. Sorumluluk Reddi
                </h4>
                <p>Goofind bir rehber ve iletişim merkezidir. Listelenen hizmetlerin kalitesinden veya kullanıcılar arasındaki ticari ilişkilerden sorumlu tutulamaz. Tüm işlemler katılımcıların kendi sorumluluğundadır.</p>
              </section>
              <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="font-black text-slate-900 uppercase tracking-[0.2em] mb-4 text-[14px] flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  3. İçerik Denetimi
                </h4>
                <p>Topluluk standartlarımıza uymayan veya yanıltıcı görünen her türlü içeriği önceden haber vermeksizin platformdan kaldırma hakkımızı saklı tutarız.</p>
              </section>
            </div>
          )}
          <div className="sticky bottom-0 bg-white pt-6 pb-2 border-t border-slate-100">
            <button 
              onClick={() => { setTermsAccepted(true); setIsTermsModalOpen(false); }}
              className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[14px] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95"
            >
              {lang === 'en' ? 'Protocol Accepted' : 'Anladım ve Kabul Ediyorum'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!selectedNotification} onClose={() => setSelectedNotification(null)} title="">
        <div className="text-left">
          {selectedNotification?.gallery && selectedNotification.gallery.length > 0 ? (
            <div className="space-y-4 mb-6">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative group">
                <img 
                  src={activeNotificationImage || selectedNotification?.imageUrl || selectedNotification.gallery[0]} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                  id="main-notice-image"
                />
              </div>
              {selectedNotification.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {selectedNotification.gallery.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => {
                        setActiveNotificationImage(img);
                      }}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-slate-50 ${
                        (activeNotificationImage === img || (!activeNotificationImage && idx === 0))
                          ? 'border-primary scale-[1.03] shadow-sm' 
                          : 'border-transparent hover:border-slate-300'
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover no-lightbox" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : selectedNotification?.imageUrl && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-slate-100 bg-slate-50">
              <img src={selectedNotification.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          )}
          <div className="flex items-center gap-3 mb-4">
             <div className="px-3 py-1 bg-primary-mid/10 text-primary rounded-lg text-[14px] font-black uppercase tracking-widest">
               {t.categories[selectedNotification?.category] || selectedNotification?.category}
             </div>
             <span className="text-[14px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-tighter">
               <Clock size={16} /> {selectedNotification?.date}
             </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter leading-tight italic font-display">
            {selectedNotification?.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed mb-8 whitespace-pre-wrap">
            {selectedNotification?.description}
          </p>
          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
             <div>
                <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Price / Rate' : 'Fiyat / Oran'}</p>
                <p className="text-2xl font-black text-primary tracking-tighter">{selectedNotification?.price || (lang === 'en' ? 'Negotiable' : 'Pazarlığa Açık')}</p>
             </div>
          </div>

          {/* Announcement Poster User Profile Card */}
          {selectedNotification?.userId && (
            (() => {
              const notifOwner = dbUsers.find(u => u && u.id === selectedNotification.userId) || {
                id: selectedNotification.userId,
                name: selectedNotification.userName || (lang === 'en' ? 'Verified Member' : 'Doğrulanmış Üye'),
                photoUrl: selectedNotification.userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedNotification.userName || 'User')}&background=random`
              };
              return (
                <div 
                  onClick={() => {
                    handleOpenUserProfile(notifOwner.id, notifOwner);
                  }}
                  className="mt-6 flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 border border-primary/10 hover:border-primary/20 rounded-[1.5rem] cursor-pointer transition-all duration-300 group"
                  title={lang === 'en' ? 'Click to view profile' : 'Profilini görmek için tıklayın'}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white border border-slate-150 flex items-center justify-center font-black text-primary text-sm shadow-sm shrink-0">
                      {notifOwner.photoUrl ? (
                        <img src={notifOwner.photoUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <span>{notifOwner.name ? notifOwner.name.charAt(0).toUpperCase() : 'U'}</span>
                      )}
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {lang === 'en' ? 'Announcer Profile' : 'İlan Sahibi Profili'}
                      </p>
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight truncate leading-tight group-hover:text-primary transition-colors">
                        {notifOwner.name}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="px-3.5 py-1.5 bg-white group-hover:bg-primary border border-slate-200 group-hover:border-primary text-slate-600 group-hover:text-white font-black text-[13px] uppercase tracking-widest rounded-xl transition-all shadow-sm">
                    {lang === 'en' ? 'View Profile' : 'Profili Gör'}
                  </div>
                </div>
              );
            })()
          )}

          {currentUser && selectedNotification?.userId !== currentUser.id && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-primary rounded-full" />
                <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-widest">{lang === 'en' ? 'Direct Message' : 'Doğrudan Mesaj'}</h4>
              </div>

              {notificationMessages.filter(m => m.notifId === selectedNotification?.id && (m.senderId === currentUser.id || m.receiverId === currentUser.id)).length > 0 && (
                <div className="max-h-48 overflow-y-auto no-scrollbar space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
                  {notificationMessages
                    .filter(m => m.notifId === selectedNotification?.id && (m.senderId === currentUser.id || m.receiverId === currentUser.id))
                    .sort((a, b) => a.timestamp - b.timestamp)
                    .map(msg => {
                      const isMe = msg.senderId === currentUser.id;
                     const senderFromDb = dbUsers.find(u => u && u.id === msg.senderId);
                     const senderPhoto = senderFromDb?.photoUrl || (isMe ? currentUser?.photoUrl : null);
                      const senderUser = msg.senderId === currentUser?.id 
                        ? currentUser 
                        : (dbUsers.find(u => u.id === msg.senderId) || {
                            id: msg.senderId,
                            name: msg.senderName || 'User',
                            photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.senderName || 'User')}&background=random`,
                            email: ''
                          });
                      return (
                        <div key={msg.id} className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                          {/* Sender Profile Avatar Button */}
                          <button
                            type="button"
                            onClick={() => {
                              handleOpenUserProfile(msg.senderId, senderUser);
                            }}
                            title={lang === 'en' ? 'Click to view profile' : 'Profilini görmek için tıklayın'}
                            className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-black text-[14px] border shadow-sm transition-all hover:scale-110 active:scale-95 overflow-hidden cursor-pointer ${
                              isMe 
                                ? 'bg-primary-mid/10 border-primary/20 text-primary hover:border-primary/50' 
                                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-400'
                            }`}
                          >
                            {senderUser.photoUrl ? (
                              <img src={senderUser.photoUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <span>{senderUser.name ? senderUser.name.charAt(0).toUpperCase() : 'U'}</span>
                            )}
                          </button>
                          
                          <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                            <div className={`p-3 rounded-2xl text-[15px] font-bold shadow-sm ${isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}`}>
                              <ChatMessageBody
                                content={msg.content}
                                imageUrl={msg.imageUrl}
                                type={msg.type}
                                onImagePreview={setPreviewMessageImage}
                                isOnPrimaryBg={isMe}
                                lang={lang}
                                textClassName="text-[15px] font-bold leading-relaxed break-words whitespace-pre-wrap"
                              />
                            </div>
                            <span className="text-[12px] font-black text-slate-300 mt-1 uppercase tracking-wider">
                              {senderUser.name} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  <div ref={notifChatEndRef} />
                </div>
              )}

              <ChatMessageComposer
                mode="textarea"
                onSend={async () => {
                  const content = notifMessageInputRef.current?.value.trim() || '';
                  if (!content && !notifDetailImageSelected) return;
                  await handleSendNotificationMessage(
                    selectedNotification!.id,
                    selectedNotification!.userId,
                    content,
                    notifDetailImageSelected,
                  );
                  if (notifMessageInputRef.current) notifMessageInputRef.current.value = '';
                  setNotifDetailImageSelected(null);
                }}
                onImagePick={(e) => void handleChatImagePick(e, setIsUploadingNotifDetailImage, setNotifDetailImageSelected)}
                selectedImage={notifDetailImageSelected}
                onClearImage={() => setNotifDetailImageSelected(null)}
                isUploadingImage={isUploadingNotifDetailImage}
                lang={lang}
                inputRef={notifMessageInputRef}
                placeholder={lang === 'en' ? 'What do you want to ask?' : 'Neyi sormak istersiniz?'}
              />
            </div>
          )}

          {currentUser && (selectedNotification?.userId === currentUser.id || userRole === 'owner') && (
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => promptDelete('notification', selectedNotification.id, selectedNotification.title || '')}
                className="flex items-center gap-2 px-5 py-2.5 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-black text-[14px] uppercase tracking-widest border border-dashed border-rose-200 hover:border-rose-300 transition-all active:scale-95 shadow-sm"
              >
                <Trash2 size={18} strokeWidth={3} />
                {lang === 'en' ? 'Remove Post' : 'İlanı Kaldır'}
              </button>
            </div>
          )}
        </div>
      </Modal>

      <Modal 
        isOpen={isNotifMessageModalOpen} 
        onClose={() => {
          setIsNotifMessageModalOpen(false);
          setActiveNotifMsgThread(null);
        }} 
        title={lang === 'en' ? 'My Ads' : 'İlanlarım'}
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar pb-6 px-1">
           <UserAnnouncementMessagesInbox
             lang={lang}
             incomingThreads={incomingAnnouncementThreads}
             outgoingThreads={outgoingAnnouncementThreads}
             activeThreadKey={activeNotifMsgThread}
             onOpenThread={handleOpenNotifMsgThread}
           />

           {activeNotifMsgThread && (
             <div className="mt-8 pt-8 border-t border-slate-100 space-y-6 animate-in slide-in-from-bottom duration-300">
               <div className="flex flex-col space-y-4 max-h-[300px] overflow-y-auto px-2 no-scrollbar py-2">
                  {notificationMessages
                    .filter(m => {
                      const otherId = m.senderId === currentUser?.id ? m.receiverId : m.senderId;
                      return `${m.notifId}_${otherId}` === activeNotifMsgThread;
                    })
                    .sort((a, b) => a.timestamp - b.timestamp)
                    .map(msg => {
                      const isMe = msg.senderId === currentUser?.id;
                      const senderUser = msg.senderId === currentUser?.id 
                        ? currentUser 
                        : (dbUsers.find(u => u.id === msg.senderId) || {
                            id: msg.senderId,
                            name: msg.senderName || 'User',
                            photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.senderName || 'User')}&background=random`,
                            email: ''
                          });
                      return (
                        <div key={msg.id} className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : 'flex-row'} w-full animate-in fade-in duration-300`}>
                          {/* Sender Profile Avatar Button */}
                          <button
                            type="button"
                            onClick={() => {
                              handleOpenUserProfile(msg.senderId, senderUser);
                            }}
                            title={lang === 'en' ? 'Click to view profile' : 'Profilini görmek için tıklayın'}
                            className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-black text-[14px] border shadow-sm transition-all hover:scale-110 active:scale-95 overflow-hidden cursor-pointer ${
                              isMe 
                                ? 'bg-primary-mid/10 border-primary/20 text-primary hover:border-primary/50' 
                                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-400'
                            }`}
                          >
                            {senderUser.photoUrl ? (
                              <img src={senderUser.photoUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <span>{senderUser.name ? senderUser.name.charAt(0).toUpperCase() : 'U'}</span>
                            )}
                          </button>

                          <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                            <div className={`p-4 rounded-2xl text-sm font-bold shadow-sm ${isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                              <ChatMessageBody
                                content={msg.content}
                                imageUrl={msg.imageUrl}
                                type={msg.type}
                                onImagePreview={setPreviewMessageImage}
                                isOnPrimaryBg={isMe}
                                lang={lang}
                                textClassName="text-sm font-bold leading-relaxed break-words whitespace-pre-wrap"
                              />
                            </div>
                            <span className="text-[12px] font-black text-slate-400 mt-1 uppercase tracking-wider">
                              {senderUser.name} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  }
                  <div ref={inboxChatEndRef} />
               </div>

               <ChatMessageComposer
                 mode="textarea"
                 onSend={() => {
                   const [notifId, otherId] = activeNotifMsgThread.split('_');
                   const content = notifReplyInputRef.current?.value.trim() || '';
                   if (!content && !notifReplyImageSelected) return;
                   void handleSendNotificationMessage(notifId, otherId, content, notifReplyImageSelected);
                   if (notifReplyInputRef.current) notifReplyInputRef.current.value = '';
                   setNotifReplyImageSelected(null);
                 }}
                 onImagePick={(e) => void handleChatImagePick(e, setIsUploadingNotifReplyImage, setNotifReplyImageSelected)}
                 selectedImage={notifReplyImageSelected}
                 onClearImage={() => setNotifReplyImageSelected(null)}
                 isUploadingImage={isUploadingNotifReplyImage}
                 lang={lang}
                 inputRef={notifReplyInputRef}
                 placeholder={lang === 'en' ? 'Type your response...' : 'Cevabınızı yazın...'}
               />
             </div>
           )}
        </div>
      </Modal>

      <Modal isOpen={!!selectedNews} onClose={() => setSelectedNews(null)} title="">
        <div className="space-y-8 max-h-[75vh] overflow-y-auto pr-3 custom-scrollbar text-left font-sans">
          {/* Featured Ad or News Image for general visual information context */}
          {selectedNews?.url && (
            <div className="w-full rounded-3xl overflow-hidden border border-slate-100/80 shadow-md bg-slate-100 relative">
              {selectedNews.mediaType === 'video' ? (
                <video src={selectedNews.url} className="w-full aspect-[16/9] object-cover" autoPlay muted loop playsInline />
              ) : (
                <img src={selectedNews.url} className="w-full aspect-[16/9] object-cover block" alt={selectedNews.title} />
              )}
            </div>
          )}

          <h3 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-[1.05] group">
            {selectedNews?.title}
          </h3>

          <div className="w-20 h-1.5 bg-primary rounded-full" />

          {selectedNews?.desc && selectedNews.desc !== selectedNews.title && (
            <div className="text-xl font-bold text-slate-500 leading-tight italic opacity-90 border-l-4 border-primary/30 pl-8 py-2">
              "{selectedNews?.desc}"
            </div>
          )}

          <div className="text-slate-600 font-medium leading-relaxed space-y-6 text-base text-justify">
            {isGeneratingSummary ? (
              <div className="flex flex-col items-center justify-center py-16 gap-5 bg-primary/5 border border-primary/10 rounded-[2rem] p-6 text-center select-none shadow-sm w-full">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-glow" />
                  </div>
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <p className="text-[14px] font-black uppercase tracking-[0.3em] text-primary">
                    {lang === 'en' ? 'AI SYNTHESIS RUNNING' : 'YAPAY ZEKA ANALİZİ AKTİF'}
                  </p>
                  <p className="text-xs text-slate-500 font-bold leading-normal">
                    {lang === 'en' ? 'Sourcing & summarizing website details directly from the live webpage URL...' : 'İlgili web sitesi inceleniyor, hizmetler ve güncel kampanyalar taranarak özetleniyor...'}
                  </p>
                </div>
              </div>
            ) : aiSummary ? (
              <div className="bg-gradient-to-br from-primary/5 via-primary/5 to-white p-6 rounded-[2rem] border border-primary/10 relative shadow-sm text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/50/10 text-primary text-[13px] font-black uppercase tracking-widest rounded-xl mb-4 select-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/50"></span>
                  </span>
                  {lang === 'en' ? 'Sourced Website Overview' : 'Doğrulanmış Web Özeti'}
                </span>
                {renderSimpleMarkdown(aiSummary)}
              </div>
            ) : (
              (() => {
                const content = selectedNews?.content || '';
                const desc = selectedNews?.desc || '';
                const title = selectedNews?.title || '';
                
                // If there is custom detailed content, render it
                if (content.trim().length > 0) {
                  return content.split('\n').filter((p: string) => p.trim() !== '').map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ));
                }
                
                // If we only have some short subtitle, but not full content, generate highly professional informative general info based on keywords
                const tLower = title.toLowerCase();
                if (lang === 'tr') {
                  if (tLower.includes('air') || tLower.includes('fly') || tLower.includes('uçuş') || tLower.includes('bilet') || tLower.includes('thy') || tLower.includes('pegasus') || tLower.includes('airlines')) {
                    return (
                      <>
                        <p>Kanada ile Türkiye arasındaki doğrudan ve aktarmalı seyahat rotaları, buradaki vatandaşlarımızın aile bağlarını koruması ve anavatana kolayca ulaşabilmesi açısından büyük bir öneme sahiptir.</p>
                        <p>Genellikle Toronto, Montreal ve Vancouver çıkışlı uçuşlarda havayolları dönemsel kampanyalar ve erken rezervasyon indirimleri sunmaktadır. Seyahat süreçlerindeki bagaj limitleri, ek evcil hayvan taşıma kuralları ve son dakika bilet değişikliği politikaları seyahatinizin konforunu doğrudan etkiler.</p>
                        <p>Eğer uçuş saatleri, bilet fiyatları veya güncel rezervasyon detayları hakkında daha derinlemesine araştırma yapmak ve resmi uçuş tablolarını kontrol etmek isterseniz, aşağıdaki yönlendirme bağlantısını kullanarak resmi kanallara kolayca ulaşabilirsiniz.</p>
                      </>
                    );
                  }
                  if (tLower.includes('market') || tLower.includes('gıda') || tLower.includes('grocery') || tLower.includes('taze') || tLower.includes('lezzet') || tLower.includes('istanbul') || tLower.includes('baklava') || tLower.includes('kasap')) {
                    return (
                      <>
                        <p>Kanada'da Türk mutfak kültürünü yaşatmak ve memleketimizin seçkin lezzetlerine erişmek, gurbetteki Türk toplumu için bir prestij ve huzur kaynağıdır.</p>
                        <p>Geleneksel peynir çeşitleri, helal sertifikalı et ürünleri, taze demlenmiş Türk çayı, taze simit ve meşhur Türk tatlıları yerel esnaflarımız ve Türk marketleri sayesinde sofralarımıza kadar ulaşmaktadır. Gıda güvenliği standartlarına uygun ithalat yapan bu işletmelerimiz aynı zamanda toplumsal buluşma noktalarımız haline gelmiştir.</p>
                        <p>İlgili işletmenin güncel çalışma saatlerini incelemek, adrese teslim paket servis imkanlarını kontrol etmek veya bu haftaya özel indirimli ürün broşürlerine göz atmak istiyorsanız lütfen en alttaki bağlantı butonuna tıklayın.</p>
                      </>
                    );
                  }
                  if (tLower.includes('real estate') || tLower.includes('emlak') || tLower.includes('ev') || tLower.includes('konut') || tLower.includes('kiralık') || tLower.includes('satılık') || tLower.includes('yatırım') || tLower.includes('housing') || tLower.includes('realty')) {
                    return (
                      <>
                        <p>Kanada genelinde ve özellikle Ontario, British Columbia veya Alberta eyaletlerinde gayrimenkul yatırımı yapmak veya kiralık ev bulmak, başarılı bir adaptasyon sürecinin en kritik aşamasıdır.</p>
                        <p>Kanada emlak piyasası, mortgage (konut kredisi) faiz oranları, kiralama sözleşmelerindeki kiracı hakları gibi konularda doğru ve güncel bilgi sahibi olmak sizi büyük mali kayıplardan korur. Profesyonel emlak danışmanlarından ve lisanslı brokerlardan destek alarak bütçenize en uygun seçenekleri belirleyebilirsiniz.</p>
                        <p>Güncel satılık/kiralık ilan listelerini incelemek, evlerin iç mekan görsellerine göz atmak veya bölge bazlı fiyat hareketlerini detaylıca öğrenmek için resmi web portalını ziyaret edebilirsiniz.</p>
                      </>
                    );
                  }
                  
                  // Fallback for general Turkish
                  return (
                    <>
                      <p>{desc || 'Sponsorumuz ve topluluk ortağımız tarafından sağlanan bu içerik, Kanada genelindeki Türk toplumuna yönelik duyuru, kampanya veya hizmetleri içermektedir.'}</p>
                      <p>Kanada Türk Topluluk Merkezi (Canada-Turkish Community Hub) olarak, yerel işletmelerle olan dayanışmamızı her adımda büyütüyoruz. Doğru bilgi kaynağına erişmek ve topluluğumuzun sunduğu entegrasyon çözümlerinden zahmetsizce haberdar olmak için platformumuzu düzenli olarak takip edebilirsiniz.</p>
                      <p>Bu fırsatın kullanım koşulları, katılım detayları veya hizmet randevuları hakkında daha detaylı bilgiye doğrudan ulaşmak isterseniz aşağıdaki "Web Sitesine Git" butonunu kullanabilirsiniz.</p>
                    </>
                  );
                } else {
                  // English content generator
                  if (tLower.includes('air') || tLower.includes('fly') || tLower.includes('ticket') || tLower.includes('travel') || tLower.includes('thy') || tLower.includes('airline') || tLower.includes('airlines')) {
                    return (
                      <>
                        <p>In-flight services and direct flight connections between major Canadian cities and Turkiye play a fundamental role in keeping our community and cultural ties highly active.</p>
                        <p>Airlines frequently launch special campaigns, student discount options, and extra baggage allowances during peak seasons like summer and New Year. Navigating these rules carefully ensures a smooth, stress-free travel experience for you and your family.</p>
                        <p>To view official flight tables, calculate mileage program perks, or process safe reservations directly on the verified booking portal, utilize the "Visit Website" button located below.</p>
                      </>
                    );
                  }
                  if (tLower.includes('market') || tLower.includes('food') || tLower.includes('grocery') || tLower.includes('baklava') || tLower.includes('istanbul') || tLower.includes('kasap')) {
                    return (
                      <>
                        <p>Promoting culinary heritage and getting easy access to certified Halal ingredients remains a top priority for Turkish expats living across Canada.</p>
                        <p>From quality olive oils and traditional breakfast delights to fresh Turkish tea and sweets, our local markets make grocery shopping nostalgic and enjoyable. These stores also act as small social focal points that bridge cultures.</p>
                        <p>If you'd like to check current working hours, home-delivery parameters, or examine this week's special deals flyer, click on the action link below.</p>
                      </>
                    );
                  }
                  if (tLower.includes('real estate') || tLower.includes('emlak') || tLower.includes('house') || tLower.includes('rent') || tLower.includes('investment') || tLower.includes('housing') || tLower.includes('property') || tLower.includes('realty')) {
                    return (
                      <>
                        <p>Finding a comfortable home or investing in Canada's real estate market (e.g., Ontario, BC, Quebec) constitutes a foundational pillar of settling down smoothly.</p>
                        <p>Understanding local tenant protection acts, credit histories (credit score rules), and mortgage structures will give you tremendous confidence. Licensed realtors offer reliable guidance tailored to your specific budget constraints.</p>
                        <p>To inspect active property listings, photo catalogs, or arrange dynamic open-house tours with local advisors, feel free to visit their certified homepage below.</p>
                      </>
                    );
                  }
                  
                  // Fallback for general English
                  return (
                    <>
                      <p>{desc || 'This sponsored advertisement or community highlight is published to bring valuable Turkish-oriented services, immigration guides, or unique deals to our members in Canada.'}</p>
                      <p>At the Canada-Turkish Community Hub, we strive to simplify access to high-quality localized resources. We maintain absolute transparency to link residents with authorized service providers securely.</p>
                      <p>To obtain complete specifications, schedule quick face-to-face appointments, or apply directly on the merchant's dedicated landing page, please press the button below.</p>
                    </>
                  );
                }
              })()
            )}

            {/* Visit Website / Reference Link */}
            {(() => {
              const hasRealLink = selectedNews?.link && selectedNews.link !== '#' && selectedNews.link.trim() !== '';
              const finalLink = hasRealLink 
                ? selectedNews.link 
                : `https://www.google.com/search?q=${encodeURIComponent((selectedNews?.title || '') + ' Canada')}`;
              
              return (
                <div className="mt-8 p-5 bg-primary/5 border border-primary/10 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-black uppercase text-primary tracking-widest font-mono">
                      {hasRealLink 
                        ? (lang === 'en' ? 'OFFICIAL REFERENCE LINK' : 'RESMİ BAĞLANTI / ADRES')
                        : (lang === 'en' ? 'VERIFIED SEARCH PATH' : 'DOĞRULANMIŞ ARAMA BAĞLANTISI')
                      }
                    </p>
                    <p className="text-xs font-bold text-slate-600 mt-1 truncate max-w-[280px] sm:max-w-[450px]">
                      {finalLink}
                    </p>
                  </div>
                  <a
                    href={finalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary/95 text-white text-[9.5px] font-black uppercase px-5 py-3 rounded-xl tracking-widest inline-flex items-center gap-1.5 hover:scale-103 active:scale-97 transition-all shadow-md shadow-primary/10 text-center shrink-0 self-start sm:self-center cursor-pointer select-none"
                  >
                    <ExternalLink size={15} strokeWidth={3} />
                    {lang === 'en' ? 'Visit Website' : 'Web Sitesine Git'}
                  </a>
                </div>
              );
            })()}
          </div>

          <div className="pt-10 mt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-[1.25rem] flex items-center justify-center shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                <LogoIcon size={30} className="relative z-10" />
              </div>
              <div>
                <p className="text-[15px] font-black uppercase tracking-widest text-slate-900">Goofind Intelligence</p>
                <p className="text-[13px] font-bold text-accent-vivid uppercase tracking-widest">{lang === 'en' ? 'AUTHENTICATED SOURCE' : 'DOĞRULANMIŞ KAYNAK'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <button className="w-12 h-12 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-xl border border-slate-100 transition-all"><Share2 size={26} /></button>
               <button className="w-12 h-12 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-xl border border-slate-100 transition-all"><Bookmark size={26} /></button>
            </div>
          </div>
        </div>
      </Modal>

      {/* --- WELCOME / ONBOARDING SCREEN --- */}
      <AnimatePresence>
        {showWelcome && !currentUser && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center text-center">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <LogoText size="text-6xl sm:text-7xl" />
              </motion.div>

              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter"
              >
                {lang === 'en' ? 'Welcome to Canada Hub' : 'Kanada Rehberine Hoş Geldiniz'}
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-500 text-sm sm:text-base font-medium mb-12"
              >
                {lang === 'en' ? 'The ultimate platform for the Canadian-Turkish community.' : 'Kanada\'daki Türk toplumu için en kapsamlı platform.'}
              </motion.p>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full space-y-4"
              >
                {isApple ? (
                  <button 
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl"
                  >
                    <Apple size={22} className="text-white" />
                    {lang === 'en' ? 'Continue with Apple' : 'Apple ile giriş yap'}
                  </button>
                ) : (
                  <button 
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-primary/30 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-slate-200/50"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                    {lang === 'en' ? 'Continue with Google' : 'Google ile devam et'}
                  </button>
                )}

                <div className="flex items-center gap-4 py-4">
                  <div className="flex-1 h-px bg-slate-100"></div>
                  <span className="text-[14px] font-black text-slate-300 uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-slate-100"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      setAuthView('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                  >
                    {lang === 'en' ? 'Sign In' : 'Giriş Yap'}
                  </button>
                  <button 
                    onClick={() => {
                      setAuthView('register');
                      setIsAuthModalOpen(true);
                    }}
                    className="py-5 bg-accent text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-accent/20 hover:scale-[1.02] transition-all"
                  >
                    {lang === 'en' ? 'Sign Up' : 'Kayıt Ol'}
                  </button>
                </div>
              </motion.div>

              {/* Guest button at the bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12"
              >
                <button 
                  onClick={() => setShowWelcome(false)}
                  className="py-3 px-6 text-slate-400 font-black uppercase tracking-[0.3em] text-[14px] hover:text-primary transition-all border border-slate-100 rounded-full hover:bg-slate-50 active:scale-95 transition-all"
                >
                  {lang === 'en' ? 'Continue as Guest' : 'Misafir Olarak Devam Et'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- COMMUNITY IMAGE FULLSCREEN VIEWER --- */}
      {previewMessageImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[3000] flex items-center justify-center p-4 select-none no-lightbox"
          onClick={() => setPreviewMessageImage(null)}
        >
          <button
            type="button"
            className="fixed top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-[3010] w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center justify-center transition-all shadow-lg border border-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewMessageImage(null);
            }}
            aria-label={lang === 'tr' ? 'Kapat' : 'Close'}
          >
            <X size={24} strokeWidth={2.5} />
          </button>
          <img
            src={previewMessageImage}
            className="max-w-[92vw] max-h-[85vh] object-contain"
            alt=""
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* --- PROFILE / DASHBOARD MODAL --- */}
      <Modal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        title={lang === 'en' ? 'My Dashboard' : 'Kontrol Panelim'}
      >
        <div className="space-y-8">
          {/* User Profile Header */}
          <div className="bg-slate-50 rounded-[2.5rem] border border-slate-100 p-4 sm:p-6 space-y-4">
             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                {/* Profile Picture Container with Edit Overlay */}
                <div 
                  onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                  className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-black shadow-lg overflow-hidden shrink-0 relative group cursor-pointer border-2 border-white ring-4 ring-slate-100 transition-all hover:scale-105"
                >
                   {currentUser?.photoUrl ? (
                      <img src={currentUser.photoUrl} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" referrerPolicy="no-referrer" />
                   ) : (
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                   )}
                   {/* Hover edit camera overlay */}
                   <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                     <Camera size={26} className="text-white scale-75 group-hover:scale-100 transition-transform duration-200" />
                     <span className="text-[11px] font-black uppercase tracking-widest text-slate-100 mt-1 leading-none">
                       {lang === 'en' ? 'Modify' : 'Değiştir'}
                     </span>
                   </div>
                </div>

                <div className="flex-1 w-full">
                   <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
                     {isEditingProfileDetails ? (
                        <div className="space-y-3 mt-1 text-left w-full">
                           <div>
                              <label className="text-[13px] font-black uppercase text-slate-400 tracking-wider">
                                {lang === 'en' ? 'Full Name' : 'Ad Soyad'}
                              </label>
                              <input 
                                type="text"
                                value={editNameInput}
                                onChange={(e) => setEditNameInput(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none text-slate-850 font-bold"
                              />
                           </div>
                           <div className="flex gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => handleUpdateProfileDetails(editNameInput, currentUser?.phone || "")}
                                className="px-3.5 py-1.5 bg-primary hover:bg-primary/95 text-white font-black text-[14px] uppercase tracking-wider rounded-xl transition-all"
                              >
                                 {lang === 'en' ? 'Save' : 'Kaydet'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsEditingProfileDetails(false)}
                                className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-600 font-black text-[14px] uppercase tracking-wider rounded-xl transition-all"
                              >
                                 {lang === 'en' ? 'Cancel' : 'İptal'}
                              </button>
                           </div>
                        </div>
                     ) : (
                        <div className="min-w-0 w-full text-left font-sans">
                           <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tighter leading-tight mb-1 break-words">
                             {currentUser?.name}
                           </h3>
                           <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest break-all">
                             {currentUser?.email}
                           </p>
                        </div>
                     )}

                     <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                       <button
                         type="button"
                         onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                         className={`px-3 py-1.5 rounded-xl border text-[13px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-1 shrink-0 ${
                           isEditingAvatar 
                             ? 'bg-slate-900 border-slate-900 text-white' 
                             : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                         }`}
                       >
                         <Camera size={14} />
                         {lang === 'en' ? 'Photo' : 'Fotoğraf'}
                       </button>

                       {!isEditingProfileDetails && (
                         <button
                           type="button"
                           onClick={() => {
                             setEditNameInput(currentUser?.name || '');
                             setIsEditingProfileDetails(true);
                           }}
                           className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-[13px] font-black text-slate-700 uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                         >
                           <Edit2 size={14} />
                           {lang === 'en' ? 'Edit Details' : 'Profil Düzenle'}
                         </button>
                       )}
                     </div>
                   </div>

                   <div className="mt-4 sm:mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-200/80 shadow-sm">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[12px] font-black text-slate-500 uppercase tracking-widest">
                           {lang === 'en' ? 'Active Member' : 'Aktif Üye'}
                         </span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-200/80 shadow-sm">
                         <span className="text-[12px] font-black text-primary uppercase tracking-widest">
                           Hub ID:
                         </span>
                         <span className="text-[12px] font-mono text-slate-400 font-bold select-all leading-none">
                           {currentUser?.id?.substring(0, 8)}...
                         </span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Expandable Photo Customizer Frame */}
             {isEditingAvatar && (
                <div className="bg-white border border-slate-100 rounded-3xl p-4 space-y-3 animate-in fade-in slide-in-from-top-3 duration-300">
                   <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-[13px] font-black text-slate-400 uppercase tracking-wider">
                         {lang === 'en' ? 'Profile Photo' : 'Profil Fotoğrafı'}
                      </span>
                      <button 
                        type="button"
                        onClick={() => setIsEditingAvatar(false)}
                        className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase cursor-pointer"
                      >
                         ✕
                      </button>
                   </div>

                   <button
                     type="button"
                     onClick={() => userAvatarFileInputRef.current?.click()}
                     disabled={isUploadingAvatar}
                     className="w-full flex items-center justify-center gap-2 border border-dashed border-slate-250 hover:border-primary/50 hover:bg-primary/5 rounded-2xl p-5 text-center transition-all group cursor-pointer bg-slate-50/50"
                   >
                     <Upload size={22} className="text-slate-400 group-hover:text-primary transition-colors duration-200 shrink-0" />
                     <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors duration-200">
                       {isUploadingAvatar ? (lang === 'en' ? 'Processing...' : 'Yükleniyor...') : (lang === 'en' ? 'Choose File' : 'Dosya Seç')}
                     </span>
                   </button>
                   <input 
                     type="file" 
                     ref={userAvatarFileInputRef} 
                     onChange={handleProfileImageFileChange} 
                     accept="image/*" 
                     className="hidden" 
                   />
                </div>
             )}
          </div>

          {/* Quick Stats (Interactive Boxes) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
             <button 
               onClick={() => setActiveDashboardTab(activeDashboardTab === 'messages' ? null : 'messages')}
               className={`p-2.5 sm:p-4 rounded-xl sm:rounded-[1.5rem] border text-center transition-all ${
                 activeDashboardTab === 'messages' 
                   ? 'bg-primary-mid/10 border-primary ring-2 ring-primary/20 scale-95 shadow-inner' 
                   : 'bg-primary/5 border-primary/10 hover:bg-primary/10 hover:scale-[1.02]'
               }`}
             >
                <p className="text-lg sm:text-xl font-black text-primary leading-none mb-1">
                  {hasBusinessOwned
                    ? businessChatMessages.length
                    : userCompanyIncomingThreads.length + userCompanyOutgoingThreads.length}
                </p>
                <p className="text-[12px] font-black text-slate-500 uppercase tracking-widest leading-none">{lang === 'en' ? 'Messages' : 'Mesajlar'}</p>
             </button>

             <button 
               onClick={() => setActiveDashboardTab(activeDashboardTab === 'calls' ? null : 'calls')}
               className={`p-2.5 sm:p-4 rounded-xl sm:rounded-[1.5rem] border text-center transition-all ${
                 activeDashboardTab === 'calls' 
                   ? 'bg-accent/10 border-accent ring-2 ring-accent/20 scale-95 shadow-inner' 
                   : 'bg-accent/5 border-accent/10 hover:bg-accent/10 hover:scale-[1.02]'
               }`}
             >
                <p className="text-lg sm:text-xl font-black text-accent-vivid leading-none mb-1">{callHistory.length}</p>
                <p className="text-[12px] font-black text-slate-500 uppercase tracking-widest leading-none">{lang === 'en' ? 'Calls' : 'Aramalar'}</p>
             </button>

             <button 
               onClick={() => setActiveDashboardTab(activeDashboardTab === 'saved' ? null : 'saved')}
               className={`p-2.5 sm:p-4 rounded-xl sm:rounded-[1.5rem] border text-center transition-all ${
                 activeDashboardTab === 'saved' 
                   ? 'bg-orange-100/50 border-orange-500 ring-2 ring-orange-500/20 scale-95 shadow-inner' 
                   : 'bg-orange-50 border-orange-100 hover:bg-orange-100/50 hover:scale-[1.02]'
               }`}
             >
                <p className="text-lg sm:text-xl font-black text-accent-vivid leading-none mb-1">{favorites.length}</p>
                <p className="text-[12px] font-black text-slate-500 uppercase tracking-widest leading-none">{lang === 'en' ? 'Saved' : 'Kaydedilen'}</p>
             </button>
          </div>

          {/* Expandable Tabs Detail Panel */}
          <AnimatePresence mode="wait">
            {activeDashboardTab && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                   <div className="flex items-center justify-between font-black uppercase tracking-widest text-[13px] text-slate-400">
                      <span>
                        {activeDashboardTab === 'messages' && (
                          hasBusinessOwned
                            ? (lang === 'en' ? 'Detailed Messages' : 'Detaylı Mesajlar')
                            : (lang === 'en' ? 'Company Messages' : 'Şirket Mesajları')
                        )}
                        {activeDashboardTab === 'calls' && (lang === 'en' ? 'Detailed Calls' : 'Arama Detayları')}
                        {activeDashboardTab === 'saved' && (lang === 'en' ? 'Saved Businesses' : 'Kaydedilen Şirketler')}
                      </span>
                      <button 
                        onClick={() => setActiveDashboardTab(null)}
                        className="hover:text-primary transition-colors text-[13px]"
                      >
                        {lang === 'en' ? '[Close]' : '[Kapat]'}
                      </button>
                   </div>

                   {/* Messages Panel */}
                   {activeDashboardTab === 'messages' && (
                     <div className="space-y-3 max-h-[35vh] overflow-y-auto no-scrollbar">
                        {!hasBusinessOwned ? (
                          <UserCompanyMessagesInbox
                            lang={lang}
                            incomingThreads={userCompanyIncomingThreads}
                            outgoingThreads={userCompanyOutgoingThreads}
                            onOpenThread={(businessId, partnerId) => {
                              handleOpenCompanyMessageThread(businessId, partnerId);
                              setIsProfileOpen(false);
                              setActiveDashboardTab(null);
                            }}
                            compact
                          />
                        ) : businessChatMessages.length === 0 ? (
                           <div className="text-center py-6 text-slate-400">
                              <MessageSquare className="mx-auto mb-2 text-slate-300" size={30} />
                              <p className="text-[14px] uppercase font-black tracking-wider">{lang === 'en' ? 'No messages found' : 'Mesaj bulunamadı'}</p>
                           </div>
                        ) : (
                           <div className="space-y-2">
                              {/* Direct Business Chats */}
                              {Object.values(
                                businessChatMessages.reduce((acc: any, msg) => {
                                  const otherId = msg.senderId === currentUser?.id ? msg.receiverId : msg.senderId;
                                  const key = `${msg.businessId}_${otherId}`;
                                  const partnerName = msg.senderId === currentUser?.id ? (lang === 'en' ? 'Customer' : 'Müşteri') : msg.senderName;

                                  if (!acc[key]) {
                                    acc[key] = {
                                      key,
                                      businessId: msg.businessId,
                                      otherId,
                                      otherName: partnerName,
                                      lastMsg: formatChatPreviewText(msg.content, msg.type === 'image' || !!msg.imageUrl, lang),
                                      timestamp: msg.timestamp,
                                    };
                                  } else {
                                    acc[key].lastMsg = formatChatPreviewText(msg.content, msg.type === 'image' || !!msg.imageUrl, lang);
                                    acc[key].timestamp = Math.max(acc[key].timestamp, msg.timestamp);
                                    if (msg.senderId !== currentUser?.id) {
                                      acc[key].otherName = msg.senderName;
                                    }
                                  }
                                  return acc;
                                }, {})
                              ).map((thread: any) => {
                                const biz = businesses.find(b => b.id === thread.businessId);
                                if (!biz) return null;
                                const isOwner = currentUser?.id === biz.ownerId;
                                return (
                                  <button
                                    key={thread.key}
                                    onClick={() => {
                                      setSelectedBusiness(biz);
                                      setActiveBusinessChatPartnerId(thread.otherId);
                                      setIsProfileOpen(false);
                                      setIsBusinessChatOpen(true);
                                    }}
                                    className="w-full flex items-center justify-between p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-100 transition-all text-left"
                                  >
                                     <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                           <img src={biz.imageUrl} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                           <p className="text-xs font-black text-slate-800 uppercase tracking-tight">
                                             {isOwner ? `${biz.name} - ${thread.otherName}` : biz.name}
                                           </p>
                                           <p className="text-[14px] text-slate-500 font-medium line-clamp-1">{thread.lastMsg}</p>
                                        </div>
                                     </div>
                                     <div className="text-right shrink-0">
                                        <p className="text-[12px] font-black text-primary uppercase tracking-widest">{lang === 'en' ? 'CHAT' : 'SOHBET'}</p>
                                        <p className="text-[12px] font-bold text-slate-400">{new Date(thread.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                     </div>
                                  </button>
                                );
                              })}

                           </div>
                        )}
                     </div>
                   )}

                   {/* Calls Panel */}
                   {activeDashboardTab === 'calls' && (
                     <div className="space-y-3 max-h-[25vh] overflow-y-auto no-scrollbar">
                        <div className="flex justify-between items-center mb-1">
                           <span className="text-[12px] font-black text-slate-400 uppercase tracking-wider">
                             {lang === 'en' ? 'Recent Call Logs' : 'Son Arama Kayıtları'}</span></div>{micPermissionState !== 'granted' && (<div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs my-2 text-slate-800"><div className="flex items-start gap-2.5 text-left"><div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${micPermissionState === 'granted' ? 'bg-emerald-50 text-emerald-600' : micPermissionState === 'denied' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-accent-vivid'}`}><Mic size={22} className={micPermissionState === 'checking' ? 'animate-pulse' : ''} /></div><div className="flex flex-col"><h4 className="text-xs font-black uppercase tracking-tight text-slate-800">{lang === 'en' ? 'Microphone Connection Status' : 'Mikrofon Bağlantı Durumu'}</h4><p className="text-[14px] text-slate-500 font-medium leading-normal mt-0.5">{micPermissionState === 'granted' && (lang === 'en' ? 'Authorized. Calls will run seamlessly!' : 'İzin Verildi. Sesli aramalar pürüzsüz çalışacaktır!')}{micPermissionState === 'denied' && (lang === 'en' ? 'Permission blocked. Please enable mic in browser settings.' : 'İzin Engellendi. Lütfen tarayıcı ayarlarından mikrofona izin verin.')}{micPermissionState === 'prompt' && (lang === 'en' ? 'Unconfigured. Tap to authorize microphone ahead of time!' : 'Yapılandırılmadı. Aramaları yanıtlayabilmek için önceden mikrofon izni verin!')}{micPermissionState === 'checking' && (lang === 'en' ? 'Reading browser diagnostics...' : 'Tarayıcı kontrolleri yapılıyor...')}</p></div></div>{micPermissionState !== 'granted' && (<button onClick={requestMicPermission} disabled={micPermissionState === 'checking'} className="px-3.5 py-1.5 bg-gradient-to-tr from-primary to-accent text-white rounded-xl text-[13px] font-black uppercase tracking-wider hover:opacity-95 active:scale-95 transition-all self-start sm:self-auto shadow-xs shrink-0 cursor-pointer">{lang === 'en' ? 'Allow Microphone' : 'Mikrofon İzni Ver'}</button>)}</div>)}<div className="flex justify-between items-center mb-1"><span className="hidden">
                           </span>
                           <button 
                             onClick={() => {
                               showToast(lang === 'en' ? 'Triggering mock call alert in 2s...' : '2 saniye içinde arama simülasyonu...', 'info');
                               setTimeout(() => {
                                 const anyBiz = businesses[0] || { name: 'Support Agent', id: 'support' };
                                 setIsCalling(true);
                                 setSelectedBusiness(anyBiz as any);
                                 const incomingLog = {
                                   id: `call-incoming-${Date.now()}`,
                                   businessId: anyBiz.id,
                                   businessName: anyBiz.name,
                                   categoryName: (anyBiz as any).category || 'Customer support',
                                   timestamp: Date.now(),
                                   type: 'incoming',
                                   callerName: anyBiz.name
                                 };
                                 setCallHistory(prev => [incomingLog, ...prev]);
                               }, 2000);
                             }}
                             className="text-[12px] font-black text-accent-vivid uppercase bg-accent/10 px-2 py-1 rounded hover:bg-accent/20 transition-all font-mono"
                           >
                             {lang === 'en' ? 'Simulate Incoming Call' : 'Arama Simüle Et'}
                           </button>
                        </div>

                        {callHistory.length === 0 ? (
                           <div className="text-center py-6 text-slate-400">
                              <Phone className="mx-auto mb-2 text-slate-300 animate-pulse" size={30} />
                              <p className="text-[14px] uppercase font-black tracking-wider">{lang === 'en' ? 'No recent call history' : 'Arama kaydı yok'}</p>
                           </div>
                        ) : (
                           <div className="space-y-1.5">
                              {callHistory.map((log: any) => {
                                const biz = businesses.find(b => b.id === log.businessId);
                                return (
                                  <div 
                                    key={log.id} 
                                    className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100"
                                  >
                                     <div className="flex items-center gap-3">
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                          log.type === 'incoming' ? 'bg-emerald-50 text-emerald-500' :
                                          log.type === 'missed' ? 'bg-rose-50 text-rose-500' : 'bg-primary/5 text-primary'
                                        }`}>
                                           {log.type === 'incoming' && <PhoneIncoming size={18} />}
                                           {log.type === 'missed' && <PhoneMissed size={18} />}
                                           {log.type === 'outgoing' && <PhoneOutgoing size={18} />}
                                        </div>
                                        <div>
                                           <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{log.businessName}</p>
                                           <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{log.categoryName || 'Goofind Phone'}</p>
                                        </div>
                                     </div>
                                     <div className="flex items-center gap-3">
                                        <div className="text-right shrink-0">
                                          <p className={`text-[12px] font-black uppercase ${
                                             log.type === 'incoming' ? 'text-emerald-500' :
                                             log.type === 'missed' ? 'text-rose-500' : 'text-primary'
                                          }`}>
                                             {log.type === 'incoming' && (lang === 'en' ? 'Incoming' : 'Gelen')}
                                             {log.type === 'missed' && (lang === 'en' ? 'Missed' : 'Cevapsız')}
                                             {log.type === 'outgoing' && (lang === 'en' ? 'Outgoing' : 'Giden')}
                                          </p>
                                          <p className="text-[12px] font-bold text-slate-400">
                                             {new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                          </p>
                                        </div>
                                        {biz && (
                                          <button 
                                            onClick={() => {
                                              setSelectedBusiness(biz);
                                              setIsProfileOpen(false);
                                              handlePlaceCall(biz);
                                            }}
                                            className="w-7 h-7 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100"
                                            title={lang === 'en' ? 'Call Again' : 'Tekrar Ara'}
                                          >
                                             <PhoneCall size={16} />
                                          </button>
                                        )}
                                     </div>
                                  </div>
                                );
                              })}
                           </div>
                        )}
                     </div>
                   )}

                   {/* Saved Panel */}
                   {activeDashboardTab === 'saved' && (
                     <div className="space-y-3 max-h-[25vh] overflow-y-auto no-scrollbar">
                        {favorites.length === 0 ? (
                           <div className="text-center py-6 text-slate-400">
                              <Heart className="mx-auto mb-2 text-slate-300" size={30} />
                              <p className="text-[14px] uppercase font-black tracking-wider">{lang === 'en' ? 'No saved items found' : 'Kaydedilen şirket yok'}</p>
                           </div>
                        ) : (
                           <div className="space-y-1.5">
                              {favorites.map(favId => {
                                const biz = businesses.find(b => b.id === favId);
                                if (!biz) return null;
                                return (
                                  <div 
                                    key={favId} 
                                    className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100"
                                  >
                                     <div 
                                        onClick={() => {
                                          setSelectedBusiness(biz);
                                          setIsProfileOpen(false);
                                          setIsBusinessDetailModalOpen(true);
                                        }}
                                        className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
                                     >
                                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                                           <img src={biz.imageUrl} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="min-w-0">
                                           <p className="text-xs font-black text-slate-800 uppercase tracking-tight truncate">{biz.name}</p>
                                           <p className="text-[12px] font-black text-primary uppercase tracking-widest">{biz.category}</p>
                                        </div>
                                     </div>
                                     <div className="flex items-center gap-1.5 shrink-0">
                                        <button 
                                          onClick={() => {
                                            setSelectedBusiness(biz);
                                            setIsProfileOpen(false);
                                            handlePlaceCall(biz);
                                          }}
                                          className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 text-primary border border-slate-100 flex items-center justify-center transition-all"
                                          title={lang === 'en' ? 'Call' : 'Ara'}
                                        >
                                           <Phone size={14} />
                                        </button>
                                        <button 
                                          onClick={() => {
                                            setSelectedBusiness(biz);
                                            setActiveBusinessChatPartnerId(biz.ownerId || null);
                                            setIsProfileOpen(false);
                                            setIsBusinessChatOpen(true);
                                          }}
                                          className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 text-accent-vivid border border-slate-100 flex items-center justify-center transition-all"
                                          title={lang === 'en' ? 'Chat' : 'Sohbet Başlat'}
                                        >
                                           <MessageSquareText size={14} />
                                        </button>
                                        <button 
                                          onClick={() => handleToggleFavorite(biz.id)}
                                          className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 flex items-center justify-center transition-all"
                                          title={lang === 'en' ? 'Remove' : 'Kaldır'}
                                        >
                                           <HeartOff size={14} />
                                        </button>
                                     </div>
                                  </div>
                                );
                              })}
                           </div>
                        )}
                     </div>
                   )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Actions */}
          <div className="space-y-3">
             <button 
               onClick={() => {
                 setIsProfileOpen(false);
                 setSelectedCategory('Favorites');
               }}
               className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group"
             >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-orange-50 text-accent-vivid rounded-xl flex items-center justify-center">
                      <Heart size={26} />
                   </div>
                   <div className="text-left">
                      <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{lang === 'en' ? 'My Folder' : 'Klasörüm'}</p>
                      <p className="text-sm font-bold text-slate-800">{lang === 'en' ? 'Favorite Businesses' : 'Favori Şirketlerim'}</p>
                   </div>
                </div>
                <ChevronRight size={22} className="text-slate-300 group-hover:text-primary transition-transform group-hover:translate-x-1" />
             </button>

             {/* My Companies Section */}
             <div className="space-y-3">
                <div className="flex items-center justify-between px-2">
                   <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'My Companies' : 'Şirketlerim'}</p>
                   <button 
                     onClick={() => {
                       checkAuth(() => {
                         setIsProfileOpen(false);
                         setBusinessFormLocation({ address: '' });
                         setIsBusinessRegistrationModalOpen(true);
                       });
                     }}
                     className="text-[14px] font-black text-primary uppercase tracking-widest hover:underline"
                   >
                     {lang === 'en' ? '+ Register New' : '+ Yeni Kaydet'}
                   </button>
                </div>
                {(businesses || []).filter(b => b && b.ownerId === currentUser?.id).length > 0 ? (
                  (businesses || []).filter(b => b && b.ownerId === currentUser?.id).map(myBiz => (
                    <button 
                      key={myBiz.id}
                      onClick={() => {
                        setSelectedBusiness(myBiz);
                        setIsBusinessDetailModalOpen(true);
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group"
                    >
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm bg-slate-100">
                             <img src={myBiz.imageUrl} className="w-full h-full object-cover" />
                          </div>
                          <div className="text-left">
                             <p className="text-sm font-bold text-slate-800">{myBiz.name}</p>
                             <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{myBiz.category}</p>
                          </div>
                       </div>
                       <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </button>
                  ))
                ) : (
                  <button 
                    onClick={() => {
                      checkAuth(() => {
                        setBusinessFormLocation({ address: '' });
                        setIsBusinessRegistrationModalOpen(true);
                        setIsProfileOpen(false);
                      });
                    }}
                    className="w-full flex flex-col items-center justify-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl group hover:border-primary/50 transition-all"
                  >
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <Building2 className="text-slate-400 group-hover:text-primary transition-colors" />
                     </div>
                     <p className="text-sm font-bold text-slate-800 mb-1">{lang === 'en' ? 'Register Your First Business' : 'İlk İşletmenizi Kaydedin'}</p>
                     <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Get verified in minutes' : 'Dakikalar içinde onaylanın'}</p>
                  </button>
                )}
             </div>

             {userRole === 'owner' && (
               <button 
                 onClick={() => {
                   setIsProfileOpen(false);
                   setSelectedCategory('Admin');
                 }}
                 className="w-full flex items-center justify-between p-5 bg-primary text-white rounded-2xl hover:scale-[1.02] transition-all group shadow-lg shadow-primary/20 mb-3"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <ShieldCheck size={26} />
                     </div>
                     <div className="text-left">
                        <p className="text-[14px] font-black text-white/60 uppercase tracking-widest mb-0.5">{lang === 'en' ? 'System Control' : 'Sistem Kontrolü'}</p>
                        <p className="text-sm font-black uppercase tracking-tight">{lang === 'en' ? 'Admin Panel' : 'Admin Paneli'}</p>
                     </div>
                  </div>
                  <ChevronRight size={22} className="text-white/40 group-hover:translate-x-1 transition-transform" />
               </button>
             )}

             <button 
               onClick={() => {
                 setIsProfileOpen(false);
                 // Open support chat directly
                 setSelectedCategory('Chat');
               }}
               className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group"
             >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-accent/5 text-accent-vivid rounded-xl flex items-center justify-center">
                      <Bell size={26} />
                   </div>
                   <div className="text-left">
                      <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{lang === 'en' ? 'History' : 'Geçmiş'}</p>
                      <p className="text-sm font-bold text-slate-800">{lang === 'en' ? 'Notifications & Calls' : 'Bildirimler ve Aramalar'}</p>
                   </div>
                </div>
                <ChevronRight size={22} className="text-slate-300 group-hover:text-primary transition-transform group-hover:translate-x-1" />
             </button>
          </div>

          <div className="pt-4">
             <button 
               onClick={() => {
                 auth.signOut();
                 setUserRole('guest');
                 setIsProfileOpen(false);
                 setShowWelcome(true);
               }}
               className="w-full py-4 text-red-500 font-black uppercase tracking-[0.2em] text-[14px] rounded-2xl border border-red-100 hover:bg-red-50 transition-all"
             >
               {lang === 'en' ? 'Secure Logout' : 'Güvenli Çıkış'}
             </button>
          </div>
        </div>
      </Modal>
      <Modal 
        isOpen={isBusinessRegistrationModalOpen} 
        onClose={() => {
          setIsBusinessRegistrationModalOpen(false);
          setBusinessImageUrlPreview('');
          setBusinessGallery([]);
          setBusinessFormLocation({ address: '' });
        }} 
        title={lang === 'en' ? 'Register Your Business' : 'İşletmenizi Kaydedin'}
      >
        {showBusinessSuccess ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
               <Check size={46} strokeWidth={4} />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">{lang === 'en' ? 'Registration Complete!' : 'Kayıt Tamamlandı!'}</h3>
              <p className="text-sm font-bold text-slate-500 mt-2">
                {lang === 'en' ? 'Welcome to the business community.' : 'İşletme topluluğuna hoş geldiniz.'}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegisterBusiness} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="reg-biz-name" className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Business Name' : 'İşletme Adı'}</label>
            <input required id="reg-biz-name" name="name" autoComplete="organization" type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" placeholder="Ex: Goofind Cafe" />
          </div>
          <div className="space-y-2">
            <label htmlFor="reg-biz-category" className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Industry' : 'Sektör'}</label>
            <select id="reg-biz-category" name="category" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all appearance-none cursor-pointer">
               {Object.values(CategoryType).map(cat => (
                 <option key={cat} value={cat} className="bg-white">{t.categories[cat as keyof typeof t.categories] || cat}</option>
               ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Location / Address' : 'Konum / Adres'}</label>
            <BusinessAddressMapPickerLoader
              lang={lang}
              value={businessFormLocation}
              onChange={setBusinessFormLocation}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="reg-biz-phone" className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Contact Phone' : 'İletişim Telefonu'}</label>
            <input required id="reg-biz-phone" name="phone" autoComplete="tel" type="tel" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" placeholder="+1 (416) ..." />
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Company Bio (Optional)' : 'Şirket Açıklaması (İsteğe Bağlı)'}</label>
            <textarea name="description" rows={3} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" placeholder="Tell us about your business..." />
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Cover Image' : 'Kapak Görseli'}</label>
            <div className="flex flex-col gap-2">
              <input 
                name="imageUrl" 
                type="text" 
                value={businessImageUrlPreview}
                onChange={(e) => setBusinessImageUrlPreview(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" 
                placeholder={lang === 'en' ? 'Paste image URL here...' : 'Görsel URL\'sini buraya yapıştırın...'} 
              />
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="file" 
                  ref={businessFileInputRef} 
                  onChange={(e) => handleImageUpload(e, setBusinessImageUrlPreview)} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  type="button"
                  onClick={() => businessFileInputRef.current?.click()}
                  className="py-4 bg-primary-mid/10 text-primary hover:bg-primary/20 rounded-2xl transition-all flex items-center justify-center gap-2 font-black text-[14px] uppercase tracking-widest"
                >
                  <Upload size={20} />
                  {lang === 'en' ? 'Upload' : 'Yükle'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const randomImg = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?auto=format&fit=crop&w=800&q=80`;
                    setBusinessImageUrlPreview(randomImg);
                  }}
                  className="py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-all flex items-center justify-center gap-2 font-black text-[14px] uppercase tracking-widest"
                >
                  <ImageIcon size={20} />
                  {lang === 'en' ? 'Random' : 'Rastgele'}
                </button>
              </div>
            </div>
            {businessImageUrlPreview && (
              <div className="mt-4 aspect-video rounded-2xl overflow-hidden border border-slate-100 shadow-inner block relative">
                <img src={businessImageUrlPreview} className="w-full h-full object-cover" alt="Preview" />
                <button 
                  type="button"
                  onClick={() => setBusinessImageUrlPreview('')}
                  className="absolute top-2 right-2 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all"
                >
                  <X size={26} />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">
                {lang === 'en' ? 'Photo Gallery (Max 10)' : 'Fotoğraf Galerisi (Maks 10)'}
              </label>
              <span className="text-[14px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-full">
                {businessGallery.length} / 10
              </span>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {businessGallery.map((url, index) => (
                <div key={index} className="aspect-square rounded-xl overflow-hidden relative border border-slate-100 group">
                  <img src={url} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setBusinessGallery(prev => prev.filter((_, i) => i !== index))}
                    className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              
              {businessGallery.length < 10 && (
                <button 
                  type="button"
                  onClick={() => galleryFileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all gap-1"
                >
                  <Plus size={26} />
                  <span className="text-[12px] font-black uppercase">{lang === 'en' ? 'Add' : 'Ekle'}</span>
                </button>
              )}
            </div>
            
            <input 
              type="file" 
              multiple
              ref={galleryFileInputRef} 
              onChange={handleBusinessGalleryUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          {needsBusinessEmailVerification && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 space-y-3">
              <p className="text-[12px] font-bold text-amber-900 leading-relaxed">
                {lang === 'en'
                  ? 'Before saving, verify your email. Open the verification link in your inbox, then tap Check Status below.'
                  : 'Kaydetmeden önce e-postanızı doğrulayın. Gelen kutunuzdaki doğrulama linkine tıklayın, sonra alttaki Durumu Kontrol Et butonuna basın.'}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void handleSendVerification()}
                  className="px-4 py-2 rounded-xl bg-white border border-amber-200 text-amber-900 text-[11px] font-black uppercase tracking-widest"
                >
                  {lang === 'en' ? 'Resend Email' : 'Tekrar Gönder'}
                </button>
                <button
                  type="button"
                  onClick={() => void checkVerificationStatus()}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white text-[11px] font-black uppercase tracking-widest"
                >
                  {lang === 'en' ? 'Check Status' : 'Durumu Kontrol Et'}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isRegisteringBusiness}
            className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-primary/90 shadow-primary/20 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {isRegisteringBusiness && <Loader2 size={16} className="animate-spin" />}
            {isRegisteringBusiness
              ? (lang === 'en' ? 'Uploading & saving...' : 'Yükleniyor ve kaydediliyor...')
              : (lang === 'en' ? 'Register Business' : 'İşletmeyi Kaydet')}
          </button>
        </form>
        )}
      </Modal>

      <Modal 
        isOpen={isEditBusinessModalOpen} 
        onClose={() => {
          setIsEditBusinessModalOpen(false);
          setEditingBusiness(null);
          setBusinessImageUrlPreview('');
          setBusinessGallery([]);
          setBusinessFormLocation({ address: '' });
          setIsDeleteConfirming(false);
        }} 
        title={lang === 'en' ? 'Update Business Information' : 'İşletmeyi Güncelle'}
      >
        <form onSubmit={handleUpdateBusiness} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="edit-biz-name" className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Business Name' : 'İşletme Adı'}</label>
            <input required id="edit-biz-name" name="name" autoComplete="organization" type="text" defaultValue={editingBusiness?.name} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" />
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-biz-category" className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Industry' : 'Sektör'}</label>
            <select id="edit-biz-category" name="category" required defaultValue={editingBusiness?.category} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all appearance-none cursor-pointer">
               {Object.values(CategoryType).map(cat => (
                 <option key={cat} value={cat} className="bg-white">{t.categories[cat as keyof typeof t.categories] || cat}</option>
               ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Location / Address' : 'Konum / Adres'}</label>
            <BusinessAddressMapPickerLoader
              lang={lang}
              value={businessFormLocation}
              onChange={setBusinessFormLocation}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-biz-phone" className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Contact Phone' : 'İletişim Telefonu'}</label>
            <input required id="edit-biz-phone" name="phone" autoComplete="tel" type="tel" defaultValue={editingBusiness?.phone} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" />
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Company Bio (Optional)' : 'Şirket Açıklaması (İsteğe Bağlı)'}</label>
            <textarea name="description" rows={3} defaultValue={editingBusiness?.description} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" />
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Cover Image' : 'Kapak Görseli'}</label>
            <div className="flex flex-col gap-2">
              <input 
                name="imageUrl" 
                type="text" 
                value={businessImageUrlPreview}
                onChange={(e) => setBusinessImageUrlPreview(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" 
              />
              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button"
                  onClick={() => businessFileInputRef.current?.click()}
                  className="py-4 bg-primary-mid/10 text-primary hover:bg-primary/20 rounded-2xl transition-all flex items-center justify-center gap-2 font-black text-[14px] uppercase tracking-widest"
                >
                  <Upload size={20} />
                  {lang === 'en' ? 'Upload' : 'Yükle'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const randomImg = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?auto=format&fit=crop&w=800&q=80`;
                    setBusinessImageUrlPreview(randomImg);
                  }}
                  className="py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-all flex items-center justify-center gap-2 font-black text-[14px] uppercase tracking-widest"
                >
                  <ImageIcon size={20} />
                  {lang === 'en' ? 'Random' : 'Rastgele'}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">
                {lang === 'en' ? 'Photo Gallery (Max 10)' : 'Fotoğraf Galerisi (Maks 10)'}
              </label>
              <span className="text-[14px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-full">
                {businessGallery.length} / 10
              </span>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {businessGallery.map((url, index) => (
                <div key={index} className="aspect-square rounded-xl overflow-hidden relative border border-slate-100 group">
                  <img src={url} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setBusinessGallery(prev => prev.filter((_, i) => i !== index))}
                    className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              
              {businessGallery.length < 10 && (
                <button 
                  type="button"
                  onClick={() => galleryFileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all gap-1"
                >
                  <Plus size={26} />
                  <span className="text-[12px] font-black uppercase">{lang === 'en' ? 'Add' : 'Ekle'}</span>
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdatingBusiness}
            className="w-full bg-accent text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-accent/90 shadow-accent/20 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUpdatingBusiness && <Loader2 size={16} className="animate-spin" />}
            {isUpdatingBusiness
              ? (lang === 'en' ? 'Uploading & saving...' : 'Yükleniyor ve kaydediliyor...')
              : (lang === 'en' ? 'Save Changes' : 'Değişiklikleri Kaydet')}
          </button>

          <div className="mt-6 border-t border-slate-100 pt-6 space-y-4">
            {!isDeleteConfirming ? (
              <button
                type="button"
                onClick={() => setIsDeleteConfirming(true)}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 py-4 rounded-2xl font-bold uppercase tracking-wider text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Trash2 size={20} />
                {lang === 'en' ? 'Delete Business' : 'İşletmeyi Sil'}
              </button>
            ) : (
              <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="text-xs font-semibold text-rose-700 leading-relaxed">
                  {lang === 'en' 
                    ? 'Are you absolutely sure you want to delete your business? This action is permanent and cannot be undone.' 
                    : 'İşletmenizi silmek istediğinizden kesinlikle emin misiniz? Bu işlem kalıcıdır ve geri alınamaz.'}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleDeleteBusiness}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-red-500/10"
                  >
                    <Trash2 size={18} />
                    {lang === 'en' ? 'Yes, Delete' : 'Evet, Sil'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDeleteConfirming(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
                  >
                    {lang === 'en' ? 'Cancel' : 'İptal Et'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </Modal>

      {/* --- GENERIC DELETION CONFIRMATION MODAL --- */}
      <Modal
        isOpen={deleteConfirmTarget !== null}
        onClose={() => setDeleteConfirmTarget(null)}
        title={lang === 'en' ? 'Confirm Deletion' : 'Silme İşlemini Onayla'}
        maxWidth="max-w-md"
      >
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
            <Trash2 size={34} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-base font-black text-slate-800 uppercase tracking-tight font-sans">
              {lang === 'en' ? 'Are you absolutely sure?' : 'Kesinlikle emin misiniz?'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto font-medium">
              {lang === 'en' 
                ? `You are about to delete "${deleteConfirmTarget?.title}". This action is permanent and cannot be undone.`
                : `"${deleteConfirmTarget?.title}" ögesini silmek üzeresiniz. Bu işlem kalıcıdır ve geri alınamaz.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                if (deleteConfirmTarget) {
                  executeDelete(deleteConfirmTarget.type, deleteConfirmTarget.id);
                  setDeleteConfirmTarget(null);
                }
              }}
              className="bg-red-600 hover:bg-red-750 text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-red-500/10 cursor-pointer"
            >
              <Trash2 size={18} />
              {lang === 'en' ? 'Yes, Delete' : 'Evet, Sil'}
            </button>
            <button
              type="button"
              onClick={() => setDeleteConfirmTarget(null)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
            >
              {lang === 'en' ? 'Cancel' : 'İptal Et'}
            </button>
          </div>
        </div>
      </Modal>

      {/* --- ALL PLACES TO VISIT MODAL --- */}
      <Modal
        isOpen={isAllPlacesModalOpen}
        onClose={() => {
          setIsAllPlacesModalOpen(false);
          setPlaceModalSearchQuery('');
        }}
        title={lang === 'en' ? 'All Places to Visit' : 'Tüm Gezilecek Yerler'}
        maxWidth="max-w-5xl"
      >
        <div className="space-y-6 text-left py-2 font-sans px-2">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-4 border-b border-slate-100">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              {lang === 'en' 
                ? `${places.filter(p => p && p.approved !== false).length} Places Available` 
                : `${places.filter(p => p && p.approved !== false).length} Harika Mekan Listeleniyor`}
            </p>
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={placeModalSearchQuery}
                onChange={(e) => setPlaceModalSearchQuery(e.target.value)}
                placeholder={lang === 'en' ? 'Search places...' : 'Mekanlarda ara...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-primary/40 focus:bg-white"
              />
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <PlaceCategoryFilterBar
            selected={selectedPlaceCategory}
            onSelect={setSelectedPlaceCategory}
            lang={lang}
            className="pb-2"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-h-[55vh] overflow-y-auto pr-1.5 custom-scrollbar">
            {places
              .filter(p => {
                const isApproved = p && p.approved !== false;
                if (!isApproved) return false;
                if (!matchesPlaceCategoryFilter(p, selectedPlaceCategory)) return false;
                if (!placeModalSearchQuery.trim()) return true;
                const matchQuery = placeModalSearchQuery.trim().toLowerCase();
                return (p.name || '').toLowerCase().includes(matchQuery) ||
                       (p.province || '').toLowerCase().includes(matchQuery) ||
                       (p.address || '').toLowerCase().includes(matchQuery);
              })
              .map((place, idx) => {
                const placeCat = resolvePlaceCategory(place);
                return (
                <div 
                  key={place.id || idx} 
                  onClick={() => {
                    setSelectedPlace(place);
                    setIsAllPlacesModalOpen(false);
                    setPlaceModalSearchQuery('');
                  }} 
                  className="group cursor-pointer relative aspect-[3.5/4.5] rounded-3xl overflow-hidden shadow-md hover:shadow-primary/10 border border-slate-150 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <img src={place.img} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 right-2.5">
                    <PlaceCategoryBadge category={placeCat} lang={lang} className="text-[8px] sm:text-[9px]" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[12px] font-black uppercase tracking-wider text-accent-vivid mb-0.5">{place.province}</p>
                    <h4 className="text-xs sm:text-sm font-black uppercase truncate leading-tight text-primary font-display">{place.name}</h4>
                  </div>
                </div>
              )})}
          </div>
        </div>
      </Modal>

      {/* --- EDIT NOTIFICATION MODAL --- */}
      <Modal
        isOpen={isEditNotificationOpen}
        onClose={() => {
          setIsEditNotificationOpen(false);
          setEditingNotification(null);
        }}
        title={lang === 'en' ? 'Edit Announcement / Post' : 'İlan / Gönderiyi Düzenle'}
      >
        <form onSubmit={handleUpdateNotification} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Title' : 'Başlık'}</label>
            <input required type="text" value={editNotifTitle} onChange={(e) => setEditNotifTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" />
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Category' : 'Kategori'}</label>
            <select value={editNotifCategory} onChange={(e) => setEditNotifCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all cursor-pointer">
              <option value="Announcements">{lang === 'en' ? 'Announcements' : 'Duyurular'}</option>
              <option value="Jobs">{lang === 'en' ? 'Jobs' : 'İş İlanları'}</option>
              <option value="Housing">{lang === 'en' ? 'Housing' : 'Emlak / Konut'}</option>
              <option value="Services">{lang === 'en' ? 'Services' : 'Hizmetler'}</option>
              <option value="Sales">{lang === 'en' ? 'Sales / Marketplace' : 'İkinci El / Satılık'}</option>
              <option value="Socials">{lang === 'en' ? 'Socials & Chats' : 'Sosyal & Sohbet'}</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Description' : 'Açıklama'}</label>
            <textarea rows={4} value={editNotifDescription} onChange={(e) => setEditNotifDescription(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300"></textarea>
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Price (Optional)' : 'Fiyat (İsteğe Bağlı)'}</label>
            <input type="text" value={editNotifPrice} onChange={(e) => setEditNotifPrice(e.target.value)} placeholder="e.g. $500 or Free" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300" />
          </div>

          <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-primary/90 transition-all active:scale-95 mt-4">
            {lang === 'en' ? 'Save Changes' : 'Değişiklikleri Kaydet'}
          </button>
        </form>
      </Modal>

      {/* --- ADD FLYER MODAL --- */}
      <Modal
        isOpen={isAddFlyerOpen}
        onClose={() => setIsAddFlyerOpen(false)}
        title={editingFlyer ? (lang === 'en' ? 'Edit Flyer Catalog' : 'Flyer / Broşür Düzenle') : (lang === 'en' ? 'Add New Flyer Catalog' : 'Yeni Flyer / Broşür Ekle')}
      >
        <form onSubmit={handleCreateFlyer} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
          
          {/* General Information */}
          <div className="space-y-4">
             <div className="border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'General Info' : 'Genel Bilgiler'}</h4>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{lang === 'en' ? 'Title (TR)' : 'Başlık (Türkçe)'} *</label>
                   <input 
                      type="text" 
                      required 
                      value={newFlyerTitleTr} 
                      onChange={e => setNewFlyerTitleTr(e.target.value)}
                      placeholder="e.g. Süpermarket & Gıda Fırsatları"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all uppercase"
                   />
                </div>
                <div>
                   <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{lang === 'en' ? 'Title (EN) *' : 'Başlık (İngilizce) *'}</label>
                   <input 
                      type="text" 
                      required 
                      value={newFlyerTitleEn} 
                      onChange={e => setNewFlyerTitleEn(e.target.value)}
                      placeholder="e.g. Supermarket & Turkish Grocery"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all uppercase"
                   />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{lang === 'en' ? 'Badge (TR)' : 'Rozet (Türkçe)'}</label>
                   <input 
                      type="text" 
                      value={newFlyerBadgeTr} 
                      onChange={e => setNewFlyerBadgeTr(e.target.value)}
                      placeholder="e.g. HAFTALIK AKTÜEL"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all uppercase"
                   />
                </div>
                <div>
                   <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{lang === 'en' ? 'Badge (EN)' : 'Rozet (İngilizce)'}</label>
                   <input 
                      type="text" 
                      value={newFlyerBadgeEn} 
                      onChange={e => setNewFlyerBadgeEn(e.target.value)}
                      placeholder="e.g. WEEKLY DEALS"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all uppercase"
                   />
                </div>
             </div>

             <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                   <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{lang === 'en' ? 'Savings %' : 'İndirim Oranı %'}</label>
                   <input 
                      type="text" 
                      value={newFlyerSavings} 
                      onChange={e => setNewFlyerSavings(e.target.value)}
                      placeholder="e.g. 35%"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                   />
                </div>
                <div className="col-span-1">
                   <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{lang === 'en' ? 'Valid (TR)' : 'Geçerlilik (TR)'}</label>
                   <input 
                      type="text" 
                      value={newFlyerDateRangeTr} 
                      onChange={e => setNewFlyerDateRangeTr(e.target.value)}
                      placeholder="e.g. 25 May - 31 May"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                   />
                </div>
                <div className="col-span-1">
                   <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{lang === 'en' ? 'Valid (EN)' : 'Geçerlilik (EN)'}</label>
                   <input 
                      type="text" 
                      value={newFlyerDateRangeEn} 
                      onChange={e => setNewFlyerDateRangeEn(e.target.value)}
                      placeholder="e.g. May 25 - May 31"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                   />
                </div>
             </div>
          </div>

          {/* Theme customizers */}
          <div className="space-y-4">
             <div className="border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Theming and Styling' : 'Tema ve Renkler'}</h4>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{lang === 'en' ? 'Theme Accent' : 'Tema Vurgusu'}</label>
                  <select 
                     value={newFlyerThemeColor} 
                     onChange={e => setNewFlyerThemeColor(e.target.value)}
                     className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                  >
                     <option value="bg-red-600">Red (Cherry)</option>
                     <option value="bg-amber-500">Amber (Gold)</option>
                     <option value="bg-emerald-600">Emerald (Mint)</option>
                     <option value="bg-primary">Indigo (Classic)</option>
                     <option value="bg-slate-800">Slate (Obsidian)</option>
                     <option value="bg-rose-600">Rose (Pink Accent)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{lang === 'en' ? 'Badge Palette' : 'Rozet Rengi'}</label>
                  <select 
                     value={newFlyerBadgeColor} 
                     onChange={e => setNewFlyerBadgeColor(e.target.value)}
                     className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                  >
                     <option value="bg-yellow-400 text-red-950">Yellow bg, Dark red text</option>
                     <option value="bg-red-600 text-white">Red bg, White text</option>
                     <option value="bg-yellow-300 text-emerald-950">Yellow bg, Dark green text</option>
                     <option value="bg-slate-200 text-slate-800">Gray bg, Dark text</option>
                  </select>
                </div>
             </div>
          </div>

          {/* Multiphoto Sliding Flyer Pages Upload (VE ADMIN SAYFASINDA EKLEMEK ICIN HERBIR MARKET ICIN KAYDIRMALI FOTOGRAFLAR YUKLYECEK SEKILDE DUZENLENSIN) */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Flyer Pages (Sliding Carousel Gallery)' : 'Katalog Sayfaları (Kaydırmalı Fotoğraflar)'} *</h4>
            </div>
            
            <p className="text-[14px] font-semibold text-slate-500 leading-relaxed italic">
               {lang === 'en' 
                 ? 'You can upload multiple high-quality photos for this flyer catalog. Users will be able to slide/swipe through them.' 
                 : 'Bu katalog için birden fazla yüksek kaliteli fotoğraf yükleyin. Ziyaretçiler bu fotoğraflar arasında kaydırarak geçiş yapabilecektir.'}
            </p>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {newFlyerImages.map((base64Url, index) => (
                <div key={index} className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-slate-100 group shadow-sm bg-slate-900 flex items-center justify-center">
                  <img src={base64Url} className="w-full h-full object-contain" />
                  <button 
                    type="button"
                    onClick={() => setNewFlyerImages(prev => prev.filter((_, i) => i !== index))}
                    className="absolute inset-0 bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95 duration-200"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="absolute top-1.5 left-1.5 bg-black/50 text-white font-mono text-[11px] font-bold px-1 rounded">
                     {index + 1}
                  </div>
                </div>
              ))}
              
              <label 
                className="aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all gap-1 cursor-pointer bg-slate-50 hover:bg-slate-100"
              >
                <Plus size={30} />
                <span className="text-[7.5px] font-black uppercase text-center tracking-widest">{lang === 'en' ? 'Add Page' : 'Sayfa Ekle'}</span>
                <input 
                   type="file" 
                   multiple 
                   accept="image/*" 
                   className="hidden" 
                   onChange={handleFlyerImagesUpload} 
                />
              </label>
            </div>
          </div>

          {/* Structured Discounted items builder */}
          <div className="space-y-4">
             <div className="border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Featured Items & Deals' : 'Öne Çıkan Kampanyalı Ürünler'}</h4>
             </div>
             
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                <p className="text-[13px] font-black tracking-widest text-slate-400 uppercase">{lang === 'en' ? 'Add Product to Deal Sheet' : 'Kataloga İndirimli Ürün Ekle'}</p>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <input 
                         type="text" 
                         value={tempItemNameTr} 
                         onChange={e => setTempItemNameTr(e.target.value)}
                         placeholder={lang === 'en' ? 'Product Name (TR)' : 'Ürün Adı (Türkçe)'}
                         className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[15px] font-medium"
                      />
                   </div>
                   <div>
                      <input 
                         type="text" 
                         value={tempItemNameEn} 
                         onChange={e => setTempItemNameEn(e.target.value)}
                         placeholder={lang === 'en' ? 'Product Name (EN)' : 'Ürün Adı (İngilizce)'}
                         className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[15px] font-medium"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-3 items-end">
                   <div>
                      <label className="text-[12px] font-black text-slate-400 tracking-wider block mb-1 uppercase">{lang === 'en' ? 'Old Price' : 'Eski Fiyat'}</label>
                      <input 
                         type="text" 
                         value={tempItemOldPrice} 
                         onChange={e => setTempItemOldPrice(e.target.value)}
                         placeholder="e.g. $18.99"
                         className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[15px]"
                      />
                   </div>
                   <div>
                      <label className="text-[12px] font-black text-slate-400 tracking-wider block mb-1 uppercase">{lang === 'en' ? 'New Price *' : 'İndirimli Fiyat *'}</label>
                      <input 
                         type="text" 
                         value={tempItemNewPrice} 
                         onChange={e => setTempItemNewPrice(e.target.value)}
                         placeholder="e.g. $12.99"
                         className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[15px] font-extrabold text-red-500"
                      />
                   </div>
                   <div>
                      <button 
                         type="button" 
                         onClick={handleAddFlyerItem}
                         className="w-full bg-slate-900 text-white rounded-xl py-2 font-black text-[14px] uppercase tracking-widest hover:bg-accent transition-colors shadow-md shadow-slate-900/10 flex items-center justify-center gap-1"
                      >
                         <Plus size={16} strokeWidth={3} />
                         {lang === 'en' ? 'Add' : 'Ekle'}
                      </button>
                   </div>
                </div>
             </div>

             {/* Added Products Table/Grid view inside the creation panel */}
             <div className="space-y-2">
                {newFlyerItems.length === 0 ? (
                   <p className="text-[14px] text-slate-400 font-bold italic py-2 text-center bg-slate-50/50 rounded-xl border border-slate-100">
                      {lang === 'en' ? 'No featured products added yet' : 'Henüz kampanyalı ürün eklenmedi'}
                   </p>
                ) : (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[180px] overflow-y-auto pr-1">
                      {newFlyerItems.map((item, index) => (
                         <div key={index} className="flex justify-between items-center bg-white border border-slate-100 rounded-xl p-3 shadow-sm group">
                            <div className="min-w-0 flex-1">
                               <p className="text-xs font-black text-slate-800 truncate">{lang === 'tr' ? item.nameTr : item.nameEn}</p>
                               <p className="text-[12px] font-mono text-slate-400">
                                  {lang === 'en' ? 'Old Price' : 'Eski'}: <span className="line-through">{item.oldPrice}</span>
                               </p>
                            </div>
                            <div className="text-right shrink-0 flex items-center gap-2">
                               <span className="text-xs font-black text-red-600 font-mono pr-2">{item.newPrice}</span>
                               <button 
                                  type="button" 
                                  onClick={() => handleRemoveFlyerItem(index)}
                                  className="w-6 h-6 bg-rose-50 text-rose-500 rounded hover:bg-rose-500 hover:text-white flex items-center justify-center transition-colors"
                               >
                                  <Trash2 size={16} />
                               </button>
                            </div>
                         </div>
                      ))}
                   </div>
                )}
             </div>
          </div>

          <button 
             type="submit" 
             disabled={newFlyerImages.length === 0}
             className="w-full bg-accent disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-accent/90 shadow-accent/20 transition-all active:scale-95 duration-200"
          >
             {editingFlyer ? (lang === 'en' ? 'Save Changes' : 'Değişiklikleri Kaydet') : (lang === 'en' ? 'Launch Flyer' : 'Flyerı Yayına Al')}
          </button>
        </form>
      </Modal>

      {/* --- ADD BANNER MODAL --- */}
      <Modal
        isOpen={isAddBannerOpen}
        onClose={() => {
          setIsAddBannerOpen(false);
          setBannerTitle('');
          setBannerDesc('');
          setBannerContent('');
          setBannerLink('');
          setBannerUrl('');
          setBannerImageSelected(null);
        }}
        title={editingBanner ? (lang === 'en' ? 'Edit Banner Ad' : 'Reklam Bannerını Düzenle') : (lang === 'en' ? 'Create New Banner Ad' : 'Yeni Reklam Bannerı Oluştur')}
      >
        <form onSubmit={handleCreateBanner} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar text-left font-sans">
          
          {/* Banner Title */}
          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5 animate-pulse">
              {lang === 'en' ? 'Banner Title *' : 'Banner Başlığı / Kampanya Konusu *'}
            </label>
            <input 
              type="text" 
              required 
              value={bannerTitle} 
              onChange={e => setBannerTitle(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. Toronto Market - 20% off all spices!' : 'Örn. Toronto Market - Tüm baharatlarda %20 indirim!'}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
            />
          </div>

          {/* Banner Short Subtitle */}
          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {lang === 'en' ? 'Campaign Subtitle / Summary (Optional)' : 'Kampanya Alt Başlığı / Kısa Özet (İsteğe Bağlı)'}
            </label>
            <input 
              type="text" 
              value={bannerDesc} 
              onChange={e => setBannerDesc(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. Best quality saffron, cumin and sumac freshly packaged.' : 'Örn. Taze paketlenmiş birinci kalite safran, kimyon ve sumak çeşitleri.'}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
            />
          </div>

          {/* Banner Detailed Information / Terms / Content */}
          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {lang === 'en' ? 'Detailed Content / Campaign Information (Optional)' : 'Detaylı Bilgilendirme / Kampanya Detayları (İsteğe Bağlı)'}
            </label>
            <textarea 
              value={bannerContent} 
              onChange={e => setBannerContent(e.target.value)}
              placeholder={lang === 'en' ? 'Provide more details or guidelines about this offer.' : 'Kampanya veya duyuru ile ilgili derinlemesine açıklama ve katılım şartlarını yazın.'}
              rows={4}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
            />
          </div>

          {/* Banner Redirect Link */}
          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {lang === 'en' ? 'Target Redirect URL (Optional)' : 'Hedef Yönlendirme Bağlantısı (İsteğe Bağlı)'}
            </label>
            <input 
              type="text" 
              value={bannerLink} 
              onChange={e => setBannerLink(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. https://www.torontomarket.com/sale' : 'Örn. https://www.torontomarket.com/kampanya_adresi'}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
            />
            <p className="text-[13px] font-bold text-slate-400 mt-1 uppercase leading-normal">
              {lang === 'en' ? 'If left empty, clicking the banner will do nothing.' : 'Boş bırakılırsa tıklandığında herhangi bir yönlendirme yapılmaz.'}
            </p>
          </div>

          {/* Banner Media choice: File Upload OR URL string */}
          <div className="space-y-3.5">
            <div className="border-b border-slate-100 pb-2">
              <h4 className="text-[14px] font-black text-slate-400 uppercase tracking-widest">
                {lang === 'en' ? 'Banner Media Content' : 'Banner Görsel İçeriği'}
              </h4>
            </div>

            {/* Drag & drop or click file input */}
            <div className="space-y-3">
              <label className="block text-[13px] font-black text-slate-400 uppercase tracking-widest">
                {lang === 'en' ? 'Option A: Upload Banner Graphic (Recommended)' : 'Seçenek A: Banner Görseli Yükle (Önerilen)'}
              </label>
              
              {bannerImageSelected ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-150 shadow-md">
                  <img src={bannerImageSelected} className="w-full h-full object-cover" alt="Banner visual preview" />
                  <button 
                    type="button"
                    onClick={() => setBannerImageSelected(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-600/95 text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400 gap-1.5 px-4 text-center">
                      <Plus size={26} strokeWidth={2.5} />
                      <p className="text-[13px] font-black uppercase tracking-wider">
                        {isUploadingBannerImage ? (lang === 'en' ? 'Compressing graphic...' : 'Görsel sıkıştırılıyor...') : (lang === 'en' ? 'Upload Banner Image (JPG/PNG)' : 'Banner Tasarımı Yükle')}
                      </p>
                      <p className="text-[12px] font-medium text-slate-400">{lang === 'en' ? 'Autocompressed down to Web Safe dimensions' : 'Dosya boyutu otomatik optimize edilecektir'}</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      disabled={isUploadingBannerImage}
                      onChange={handleBannerImageChange}
                      ref={bannerImageInputRef}
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-[12px] font-black text-slate-200 uppercase tracking-widest">{lang === 'en' ? 'OR' : 'VEYA'}</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <div>
              <label className="block text-[13px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'Option B: External Image Web Address' : 'Seçenek B: İnternet Üzerindeki Görsel Bağlantısı'}
              </label>
              <input 
                type="url" 
                value={bannerUrl} 
                onChange={e => {
                  setBannerUrl(e.target.value);
                  if (e.target.value.trim()) setBannerImageSelected(null);
                }}
                disabled={!!bannerImageSelected}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-slate-50 disabled:bg-slate-100 disabled:opacity-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>

            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-[12px] font-black text-slate-200 uppercase tracking-widest">{lang === 'en' ? 'OR' : 'VEYA'}</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 via-primary/5 to-white p-4 rounded-xl border border-primary/10 text-left">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/50/10 text-primary text-[12px] font-black uppercase tracking-widest rounded-lg mb-2">
                {lang === 'en' ? 'AUTOMATIC THEME MATCHING' : 'OTOMATİK KONU EŞLEŞTİRME'}
              </span>
              <p className="text-[14px] font-black text-slate-700 leading-normal">
                {lang === 'en' ? 'Option C: Auto-generated Dynamic Topic Background' : 'Seçenek C: Yapay Zeka ile Otomatik Konu Görseli'}
              </p>
              <p className="text-[13px] text-slate-500 font-semibold mt-1 leading-normal">
                {lang === 'en' ? 'If left empty, our system will analyze key fields and pair a gorgeous topic-matched, high-resolution Unsplash photo background instantly!' : 'Görsel yüklemezseniz, sistemimiz kampanya başlığınızdaki anahtar kelimeleri analiz ederek en uygun, mükemmel çözünürlüklü Unsplash görselini arka plan olarak anında eşleştirecektir!'}
              </p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isUploadingBannerImage}
            className="w-full bg-primary disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-4 text-center rounded-2xl font-black uppercase tracking-widest text-[9.5px] shadow-lg shadow-primary/10 hover:bg-primary/95 transition-all active:scale-98 duration-150 cursor-pointer"
          >
            {isUploadingBannerImage ? (lang === 'en' ? 'Uploading Image...' : 'Görsel Hazırlanıyor...') : (editingBanner ? (lang === 'en' ? 'Save Changes' : 'Değişiklikleri Kaydet') : (lang === 'en' ? 'Add Active Banner' : 'Bannerı Yayına Al'))}
          </button>
        </form>
      </Modal>

      {/* --- ADD EVENT MODAL --- */}
      <Modal
        isOpen={isAddEventOpen}
        onClose={() => {
          setIsAddEventOpen(false);
          setEventTitle('');
          setEventDate('');
          setEventLocation('');
          setEventDescription('');
          setEventOrganizer('');
          setEventImageUrl('');
          setEventImageSelected(null);
        }}
        title={editingEvent ? (lang === 'en' ? 'Edit Event' : 'Etkinliği Düzenle') : (lang === 'en' ? 'Create New Event' : 'Yeni Topluluk Etkinliği Oluştur')}
      >
        <form onSubmit={handleCreateEvent} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar text-left font-sans">
          
          {/* Event Title */}
          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {lang === 'en' ? 'Event Title *' : 'Etkinlik Başlığı *'}
            </label>
            <input 
              type="text" 
              required 
              value={eventTitle} 
              onChange={e => setEventTitle(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. Toronto Turkish Day Picnic' : 'Örn. Toronto Türk Günü Pikniği'}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none animate-none"
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {lang === 'en' ? 'Event Date *' : 'Etkinlik Tarihi / Zamanı *'}
            </label>
            <input 
              type="text" 
              required 
              value={eventDate} 
              onChange={e => setEventDate(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. 2026-07-20 or June 15, 2026' : 'Örn. 2026-07-20 veya 15 Haziran 2026'}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
            />
          </div>

          {/* Event Location */}
          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {lang === 'en' ? 'Event Location *' : 'Etkinlik Konumu / Adresi *'}
            </label>
            <input 
              type="text" 
              required 
              value={eventLocation} 
              onChange={e => setEventLocation(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. High Park Area 3, Toronto' : 'Örn. High Park Bölge 3, Toronto'}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
            />
          </div>

          {/* Event Organizer */}
          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {lang === 'en' ? 'Organizer Name' : 'Etkinlik Düzenleyicisi / Sponsoru'}
            </label>
            <input 
              type="text" 
              value={eventOrganizer} 
              onChange={e => setEventOrganizer(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. Turkish Canadian Society' : 'Örn. Kanada Türk Derneği'}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
            />
          </div>

          {/* Event Description */}
          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {lang === 'en' ? 'Event Description / Program Details' : 'Etkinlik Açıklaması / Program Detayları'}
            </label>
            <textarea 
              rows={4}
              value={eventDescription} 
              onChange={e => setEventDescription(e.target.value)}
              placeholder={lang === 'en' ? 'Describe activities, food programs, timings...' : 'Piknik aktiviteleri, yemek ikramları, turlar, saat detayları...'}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
            />
          </div>

          {/* Event Image Attachment Option */}
          <div className="space-y-4">
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1">
              {lang === 'en' ? 'Event Banner Image (Option A: Upload)' : 'Etkinlik Banner Görseli (Seçenek A: Yükle)'}
            </label>
            
            <div className="flex items-center justify-center w-full bg-white rounded-2xl">
              {eventImageSelected ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-150 shadow-md w-full">
                  <img src={eventImageSelected} className="w-full h-full object-cover" alt="Event visual preview" />
                  <button 
                    type="button"
                    onClick={() => setEventImageSelected(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-dashed-none bg-red-650 bg-red-600/95 text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all w-full">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400 gap-1.5 px-4 text-center">
                    <Plus size={26} strokeWidth={2.5} />
                    <p className="text-[13px] font-black uppercase tracking-wider">
                      {isUploadingEventImg ? (lang === 'en' ? 'Compressing graphic...' : 'Görsel sıkıştırılıyor...') : (lang === 'en' ? 'Upload Event Poster (JPG/PNG)' : 'Afiş / Görsel Dosyası Yükle')}
                    </p>
                    <p className="text-[12px] font-medium text-slate-400">{lang === 'en' ? 'Autocompressed down to Web Safe dimensions' : 'Dosya boyutu otomatik optimize edilecektir'}</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    disabled={isUploadingEventImg}
                    onChange={handleEventImageChange}
                    ref={eventImageInputRef}
                  />
                </label>
              )}
            </div>

            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-[12px] font-black text-slate-200 uppercase tracking-widest">{lang === 'en' ? 'OR' : 'VEYA'}</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            {/* URL Input */}
            <div>
              <label className="block text-[13px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'Event Banner (Option B: Image Web Address)' : 'Etkinlik Afişi (Seçenek B: İnternet Üzerindeki Görsel Adresi)'}
              </label>
              <input 
                type="url" 
                value={eventImageUrl} 
                onChange={e => {
                  setEventImageUrl(e.target.value);
                  if (e.target.value.trim()) setEventImageSelected(null);
                }}
                disabled={!!eventImageSelected}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-slate-50 disabled:bg-slate-100 disabled:opacity-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>

            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-[12px] font-black text-slate-200 uppercase tracking-widest">{lang === 'en' ? 'OR' : 'VEYA'}</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            {/* Auto matching notification block */}
            <div className="bg-gradient-to-br from-primary/5 via-primary/5 to-white p-4 rounded-xl border border-primary/10 text-left">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/55 bg-primary/50/10 text-primary text-[12px] font-black uppercase tracking-widest rounded-lg mb-2 text-primary-dark">
                {lang === 'en' ? 'AUTOMATIC THEME MATCHING' : 'OTOMATİK KONU EŞLEŞTİRME'}
              </span>
              <p className="text-[14px] font-black text-slate-700 leading-normal">
                {lang === 'en' ? 'Option C: Auto-generated Dynamic Topic Background' : 'Seçenek C: Yapay Zeka ile Otomatik Konu Görseli'}
              </p>
              <p className="text-[13px] text-slate-500 font-semibold mt-1 leading-normal">
                {lang === 'en' ? 'If left empty, our system will analyze key fields and pair a gorgeous topic-matched, high-resolution Unsplash photo background instantly!' : 'Görsel yüklemezseniz, sistemimiz etkinlik başlığı ve açıklamanızdaki anahtar kelimeleri analiz ederek en uygun, mükemmel çözünürlüklü Unsplash görselini arka plan olarak anında eşleştirecektir!'}
              </p>
            </div>
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            disabled={isUploadingEventImg}
            className="w-full bg-primary disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-4 text-center rounded-2xl font-black uppercase tracking-widest text-[9.5px] shadow-lg shadow-primary/10 hover:bg-primary/95 transition-all active:scale-98 duration-150 cursor-pointer text-white"
          >
            {isUploadingEventImg ? (lang === 'en' ? 'Uploading Image...' : 'Görsel Hazırlanıyor...') : (editingEvent ? (lang === 'en' ? 'Save Changes' : 'Değişiklikleri Kaydet') : (lang === 'en' ? 'Add Active Event' : 'Etkinliği Yayına Al'))}
          </button>
        </form>
      </Modal>

      {/* --- ADD PLACE MODAL --- */}
      <Modal
        isOpen={isAddPlaceOpen}
        onClose={() => {
          setIsAddPlaceOpen(false);
          setPlaceName('');
          setPlaceProvince('');
          setPlaceAddress('');
          setPlaceImgUrl('');
          setPlaceImageSelected(null);
          setPlaceHowToGetEn('');
          setPlaceHowToGetTr('');
          setPlaceTipsEn('');
          setPlaceTipsTr('');
          setPlacePriceEn('');
          setPlacePriceTr('');
          setPlaceParkingEn('');
          setPlaceParkingTr('');
          setPlaceWebsiteUrl('');
          setPlaceGallery([]);
          setPlaceCategory(PlaceCategory.CITY);
        }}
        title={editingPlace ? (lang === 'en' ? 'Edit Place to Visit' : 'Gezilecek Yeri Düzenle') : (lang === 'en' ? 'Add New Place to Visit' : 'Yeni Gezilecek Yer Ekle')}
      >
        <form onSubmit={handleCreatePlace} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar text-left font-sans">
          {/* Grid for Name & Province */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'Place Name *' : 'Yer/Mekan Adı *'}
              </label>
              <input 
                type="text" 
                required 
                value={placeName} 
                onChange={e => setPlaceName(e.target.value)}
                placeholder={lang === 'en' ? 'e.g. Banff National Park' : 'Örn. Banff Ulusal Parkı'}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'Province *' : 'Eyalet / Bölge *'}
              </label>
              <input 
                type="text" 
                required 
                value={placeProvince} 
                onChange={e => setPlaceProvince(e.target.value)}
                placeholder={lang === 'en' ? 'e.g. Alberta' : 'Örn. Alberta'}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {lang === 'en' ? 'Category *' : 'Kategori *'}
            </label>
            <select
              required
              value={placeCategory}
              onChange={(e) => setPlaceCategory(e.target.value as PlaceCategory)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none cursor-pointer"
            >
              {Object.values(PlaceCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {getPlaceCategoryLabel(cat as PlaceCategory, lang)}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {lang === 'en' ? 'Address' : 'Adres'}
            </label>
            <input 
              type="text" 
              value={placeAddress} 
              onChange={e => setPlaceAddress(e.target.value)}
              placeholder="224 Banff Ave, Banff, AB"
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
            />
          </div>

          {/* Website Link (Web Adresi) */}
          <div>
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {lang === 'en' ? 'Official Web Address / Website (URL)' : 'Resmî Web Sitesi / Bağlantı Adresi (URL)'}
            </label>
            <input 
              type="text" 
              value={placeWebsiteUrl} 
              onChange={e => setPlaceWebsiteUrl(e.target.value)}
              placeholder="www.example.com"
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
            />
          </div>

          {/* AI Helper Banner / Button */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/15 text-emerald-700 text-[12px] font-black uppercase tracking-widest rounded-md">
                ✨ Gemini AI Translation
              </span>
              <p className="text-[14px] font-black text-slate-700">
                {lang === 'en' ? 'Bilingual Field Auto-Translator' : 'İki Dilli Alanları Otomatik Çevir'}
              </p>
              <p className="text-[13px] text-slate-500 leading-normal font-medium">
                {lang === 'en' 
                  ? 'Fill fields in either language (EN or TR), and Gemini will automatically translate the rest instantly!' 
                  : 'Alanları dilediğiniz bir dilde doldurun (Sadece Türkçe veya İngilizce), Gemini eksik olan tüm çevirileri anında tamamlasın!'}
              </p>
            </div>
            <button
              type="button"
              disabled={isTranslatingPlace}
              onClick={handleAutoTranslatePlaceFields}
              className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-97 text-white text-[14px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-emerald-500/10 cursor-pointer shrink-0 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-xs"
            >
              {isTranslatingPlace ? (lang === 'en' ? 'Translating...' : 'Çevriliyor...') : (lang === 'en' ? 'Auto-Translate with AI' : 'Yapay Zeka ile Çevir')}
            </button>
          </div>

          {/* Bilingual Support: How To Get */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'How To Get there (EN)' : 'Nasıl Gidilir (İngilizce)'}
              </label>
              <textarea 
                rows={2}
                value={placeHowToGetEn} 
                onChange={e => setPlaceHowToGetEn(e.target.value)}
                placeholder="e.g. Take Highway 1 West from Calgary for 1.5 hours."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'How To Get there (TR)' : 'Nasıl Gidilir (Türkçe)'}
              </label>
              <textarea 
                rows={2}
                value={placeHowToGetTr} 
                onChange={e => setPlaceHowToGetTr(e.target.value)}
                placeholder="Örn. Calgary'den Highway 1 West yönünde 1.5 saat sürün."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
              />
            </div>
          </div>

          {/* Bilingual Support: Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'Travel Tips (EN)' : 'Seyahat İpuçları (İngilizce)'}
              </label>
              <textarea 
                rows={2}
                value={placeTipsEn} 
                onChange={e => setPlaceTipsEn(e.target.value)}
                placeholder="e.g. Go early in the morning to find parking near the lake."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'Travel Tips (TR)' : 'Seyahat İpuçları (Türkçe)'}
              </label>
              <textarea 
                rows={2}
                value={placeTipsTr} 
                onChange={e => setPlaceTipsTr(e.target.value)}
                placeholder="Örn. Göl kenarında park bulmak için sabah erken saatlerde gidin."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
              />
            </div>
          </div>

          {/* Bilingual Support: Pricing & Parking */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'Price (EN)' : 'Giriş Ücreti (EN)'}
              </label>
              <input 
                type="text" 
                value={placePriceEn} 
                onChange={e => setPlacePriceEn(e.target.value)}
                placeholder="e.g. National Park Pass Required ($22/day)"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'Price (TR)' : 'Giriş Ücreti (TR)'}
              </label>
              <input 
                type="text" 
                value={placePriceTr} 
                onChange={e => setPlacePriceTr(e.target.value)}
                placeholder="Örn. Ulusal Park Kartı Gerekli (Günlük $22)"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'Parking (EN)' : 'Otopark Bilgisi (EN)'}
              </label>
              <input 
                type="text" 
                value={placeParkingEn} 
                onChange={e => setPlaceParkingEn(e.target.value)}
                placeholder="e.g. Free parking in main lots"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'Parking (TR)' : 'Otopark Bilgisi (TR)'}
              </label>
              <input 
                type="text" 
                value={placeParkingTr} 
                onChange={e => setPlaceParkingTr(e.target.value)}
                placeholder="Örn. Ana otoparklarda ücretsiz park yeri mevcuttur"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>
          </div>

          {/* Place Image Upload */}
          <div className="space-y-4">
            <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest mb-1">
              {lang === 'en' ? 'Place Image (Option A: Upload Image File)' : 'Yer Görseli (Seçenek A: Görsel Dosyası Yükle)'}
            </label>
            
            <div className="flex items-center justify-center w-full bg-white rounded-2xl">
              {placeImageSelected ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-150 shadow-md w-full">
                  <img src={placeImageSelected} className="w-full h-full object-cover" alt="Place visual preview" />
                  <button 
                    type="button"
                    onClick={() => setPlaceImageSelected(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-dashed-none bg-red-650 bg-red-600/95 text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all w-full">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400 gap-1.5 px-4 text-center">
                    <Plus size={26} strokeWidth={2.5} />
                    <p className="text-[13px] font-black uppercase tracking-wider">
                      {isUploadingPlaceImg ? (lang === 'en' ? 'Compressing graphic...' : 'Görsel sıkıştırılıyor...') : (lang === 'en' ? 'Upload Place Image (JPG/PNG)' : 'Görsel Dosyası Yükle')}
                    </p>
                    <p className="text-[12px] font-medium text-slate-400">{lang === 'en' ? 'Autocompressed to save storage space' : 'Dosya boyutu otomatik optimize edilecektir'}</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    disabled={isUploadingPlaceImg}
                    onChange={handlePlaceImageChange}
                    ref={placeImageInputRef}
                  />
                </label>
              )}
            </div>

            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-[12px] font-black text-slate-200 uppercase tracking-widest">{lang === 'en' ? 'OR' : 'VEYA'}</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            {/* Image URL Input */}
            <div>
              <label className="block text-[13px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                {lang === 'en' ? 'Place Image (Option B: Image Web Address)' : 'Yer Görseli (Seçenek B: İnternet Üzerindeki Görsel Adresi)'}
              </label>
              <input 
                type="url" 
                value={placeImgUrl} 
                onChange={e => {
                  setPlaceImgUrl(e.target.value);
                  if (e.target.value.trim()) setPlaceImageSelected(null);
                }}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>
          </div>

          {/* Gezilecek Yer Resmi Galerisi (En fazla 50 Görsel) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <label className="block text-[14px] font-black text-slate-400 uppercase tracking-widest leading-none">
                {lang === 'en' ? 'Place Photo Gallery (Up to 50 Photos)' : 'Yere Ait Fotoğraf Galerisi (En Fazla 50 Fotoğraf)'}
              </label>
              <span className="text-[13px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                {placeGallery.length} / 50
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <input 
                type="file" 
                multiple
                ref={placeGalleryInputRef} 
                onChange={handlePlaceGalleryUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <button 
                type="button"
                disabled={isUploadingPlaceGallery}
                onClick={() => placeGalleryInputRef.current?.click()}
                className="w-full py-4 bg-primary-mid/10 text-primary hover:bg-primary/15 disabled:bg-slate-100 disabled:text-slate-400 rounded-xl transition-all flex items-center justify-center gap-2 font-black text-[14px] uppercase tracking-widest cursor-pointer border border-primary/20"
              >
                <Plus size={18} strokeWidth={3} />
                {isUploadingPlaceGallery ? (lang === 'en' ? 'Processing Images...' : 'Görseller İşleniyor...') : (lang === 'en' ? 'Upload Gallery Photos (Multiple Allowed)' : 'Galeriye Çoklu Fotoğraf Yükle')}
              </button>
              <p className="text-[12px] font-medium text-slate-400 leading-normal text-left">
                {lang === 'en' ? 'Select up to 50 photos. Images are automatically compressed to fit cloud storage securely.' : 'Cihazınızdan tek seferde en fazla 50 fotoğraf seçebilirsiniz. Görseller saklama alanı için otomatik optimize edilecektir.'}
              </p>
            </div>

            {placeGallery.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-2 bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100 max-h-[220px] overflow-y-auto custom-scrollbar">
                {placeGallery.map((imgBase64, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-slate-150 group">
                    <img src={imgBase64} className="w-full h-full object-cover" alt="Gallery preview" />
                    <button 
                      type="button"
                      onClick={() => setPlaceGallery(prev => prev.filter((_, idx) => idx !== index))}
                      className="absolute inset-0 bg-red-650/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            disabled={isUploadingPlaceImg || isUploadingPlaceGallery}
            className="w-full bg-primary disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-4 text-center rounded-2xl font-black uppercase tracking-widest text-[9.5px] shadow-lg shadow-primary/10 hover:bg-primary/95 transition-all active:scale-98 duration-150 cursor-pointer text-white"
          >
            {isUploadingPlaceImg || isUploadingPlaceGallery ? (lang === 'en' ? 'Processing...' : 'Hazırlanıyor...') : (editingPlace ? (lang === 'en' ? 'Save Changes' : 'Değişiklikleri Kaydet') : (lang === 'en' ? 'Add Active Place' : 'Mekanı Kaydet ve Yayınla'))}
          </button>
        </form>
      </Modal>

      {/* --- EVENT DETAIL MODAL --- */}
      <Modal
        isOpen={!!selectedEventForModal}
        onClose={() => setSelectedEventForModal(null)}
        title={selectedEventForModal?.title || (lang === 'en' ? 'Event Details' : 'Etkinlik Detayı')}
        maxWidth="max-w-2xl"
      >
        {selectedEventForModal && (
          <div className="space-y-6 text-left">
            {selectedEventForModal.imageUrl && (
              <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                <img src={selectedEventForModal.imageUrl} className="w-full h-full object-cover" alt={selectedEventForModal.title} />
              </div>
            )}
            
            <div className="space-y-4 font-sans text-left">
              <div className="flex flex-wrap gap-2.5 justify-start text-left">
                <span className="px-3 py-1.5 bg-primary-mid/10 text-primary text-[14px] font-black uppercase tracking-widest rounded-xl border border-primary/10 font-bold">
                  {selectedEventForModal.date}
                </span>
                <span className="px-3 py-1.5 bg-primary/5 text-primary text-[14px] font-black uppercase tracking-widest rounded-xl border border-primary/10 flex items-center gap-1 font-bold">
                  <MapPin size={14} /> {selectedEventForModal.location}
                </span>
              </div>

              {selectedEventForModal.organizer && (
                <div className="text-[15px] font-black uppercase tracking-widest text-slate-400 text-left">
                  {lang === 'en' ? 'Organized by:' : 'Düzenleyen:'}{' '}
                  <span className="text-slate-800 font-extrabold">{selectedEventForModal.organizer}</span>
                </div>
              )}

              <div className="text-slate-705 text-sm font-semibold leading-relaxed whitespace-pre-line p-5 bg-slate-50 border border-slate-100 rounded-3xl text-left bg-emerald-50/5 text-slate-800">
                {selectedEventForModal.description}
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedEventForModal(null)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-250 text-slate-700 text-xs font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer hover:bg-slate-200"
              >
                {lang === 'en' ? 'Close' : 'Kapat'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* --- FLYER DETAIL MODAL --- */}
      <Modal
        isOpen={isFlyerModalOpen}
        onClose={() => setIsFlyerModalOpen(false)}
        title={lang === 'tr' ? (selectedFlyer?.titleTr || 'Flyer Detayı') : (selectedFlyer?.titleEn || 'Flyer Details')}
      >
        {selectedFlyer && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Sliding Carousel of Images */}
            {selectedFlyer.images && selectedFlyer.images.length > 0 ? (
              <div className="relative aspect-[4/3] sm:aspect-video rounded-[2rem] overflow-hidden shadow-lg bg-slate-900 group">
                <img 
                  src={selectedFlyer.images[currentImageIndex]} 
                  className="w-full h-full object-contain transition-all duration-500" 
                  alt={lang === 'tr' ? selectedFlyer.titleTr : selectedFlyer.titleEn}
                />
                
                {/* Prev Arrow */}
                {selectedFlyer.images.length > 1 && (
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev === 0 ? selectedFlyer.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-md hover:scale-105 active:scale-95 transition-all text-lg font-bold"
                  >
                    ‹
                  </button>
                )}

                {/* Next Arrow */}
                {selectedFlyer.images.length > 1 && (
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev === selectedFlyer.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-md hover:scale-105 active:scale-95 transition-all text-lg font-bold"
                  >
                    ›
                  </button>
                )}

                {/* Image counter indicator */}
                <div className="absolute top-4 right-4 bg-black/50 text-white text-[14px] font-black tracking-widest px-3 py-1.5 rounded-full font-mono select-none">
                  {currentImageIndex + 1} / {selectedFlyer.images.length}
                </div>

                {/* Dot Indicators */}
                {selectedFlyer.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedFlyer.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-[4/3] sm:aspect-video rounded-[2rem] bg-slate-100 flex items-center justify-center">
                 <Newspaper size={54} className="text-slate-300" />
              </div>
            )}

            {/* Flyer Metadata Block */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
               <div>
                  <span className={`px-2.5 py-1 ${selectedFlyer.badgeColor || 'bg-yellow-400 text-red-950'} text-[13px] font-black uppercase tracking-widest rounded-md shadow-sm`}>
                     {lang === 'tr' ? selectedFlyer.badgeTr : selectedFlyer.badgeEn}
                  </span>
                  <p className="text-slate-400 text-[14px] font-bold mt-3 uppercase tracking-wider font-mono">
                     {lang === 'tr' ? 'GEÇERLİLİK SÜRESİ' : 'VALIDITY RANGE'}: <span className="text-slate-700 font-extrabold">{lang === 'tr' ? selectedFlyer.dateRangeTr : selectedFlyer.dateRangeEn}</span>
                  </p>
               </div>
               
               <div className="bg-red-50 text-red-600 font-mono font-black text-xs px-3 py-1.5 rounded-full border border-red-100 flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  {lang === 'tr' ? `%${selectedFlyer.savings} VARAN İNDİRİMLER` : `UP TO ${selectedFlyer.savings} SAVINGS`}
               </div>
            </div>

            {/* Special Products & Offers */}
            {selectedFlyer.items && selectedFlyer.items.length > 0 && (
              <div className="space-y-4">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{lang === 'tr' ? 'Seçili Kampanyalı Ürünler' : 'Featured Deals'}</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedFlyer.items.map((item, itemIdx) => (
                       <div key={itemIdx} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                          <div className="max-w-[70%]">
                             <p className="text-xs font-extrabold text-slate-800">{lang === 'tr' ? item.nameTr : item.nameEn}</p>
                             <span className="text-[12px] font-extrabold text-accent-vivid uppercase tracking-widest leading-none">{lang === 'tr' ? 'SÜPER FİYAT' : 'HOT PRICE'}</span>
                          </div>
                          <div className="text-right shrink-0">
                             <p className="text-[14px] line-through text-slate-400 font-bold leading-none">{item.oldPrice}</p>
                             <p className="text-sm font-black text-red-600 font-mono leading-tight">{item.newPrice}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* --- NEARBY MAP --- */}
      <Modal
        isOpen={isNearbyMapOpen}
        onClose={() => setIsNearbyMapOpen(false)}
        title=""
        maxWidth="max-w-full"
        fullBleed
        fullscreen
      >
        <NearbyMapLoader
          lang={lang}
          businesses={businesses || []}
          events={(events || []).filter((e) => e?.approved !== false)}
          places={(places || []).filter((p) => p?.approved !== false)}
          notifications={(notifications || []).filter((n) => n?.approved)}
          onClose={() => setIsNearbyMapOpen(false)}
          onSelectBusiness={(biz) => {
            setSelectedBusiness(biz);
            setIsBusinessDetailModalOpen(true);
            setIsNearbyMapOpen(false);
          }}
          onSelectEvent={(evt) => {
            setSelectedEventForModal(evt);
            setIsNearbyMapOpen(false);
          }}
          onSelectPlace={(place) => {
            setSelectedPlace(place);
            setIsNearbyMapOpen(false);
          }}
          onSelectAnnouncement={(notif) => {
            setSelectedNotification(notif);
            setIsNearbyMapOpen(false);
          }}
        />
      </Modal>

      {/* --- BUSINESS DETAIL MODAL --- */}
      <Modal 
        isOpen={isBusinessDetailModalOpen} 
        onClose={() => setIsBusinessDetailModalOpen(false)} 
        title={selectedBusiness?.name || 'Details'}
        maxWidth="max-w-2xl"
      >
        {selectedBusiness && (
          <BusinessProfileTemplate
            business={selectedBusiness}
            lang={lang}
            categoryLabel={t.categories[selectedBusiness.category as keyof typeof t.categories] || selectedBusiness.category}
            activeImage={activeBusinessImage}
            onImageChange={setActiveBusinessImage}
            currentUser={currentUser}
            isOwner={currentUser?.id === selectedBusiness.ownerId || userRole === 'owner'}
            isFavorite={favorites.includes(selectedBusiness.id)}
            isSubmittingReview={isSubmittingReview}
            reviewSuccess={reviewSuccess}
            reviewImages={reviewImages}
            onReviewImagesChange={setReviewImages}
            onReviewImageUpload={(e) => handleImageUpload(e, (url) => setReviewImages((prev) => [...prev.slice(-2), url]))}
            reviewFileInputRef={reviewFileInputRef}
            onSubmitReview={async (e) => {
              e.preventDefault();
              if (isSubmittingReview) return;
              const formData = new FormData(e.currentTarget);
              const rating = Number(formData.get('rating'));
              const comment = formData.get('comment') as string;
              if (rating && comment) {
                setIsSubmittingReview(true);
                const success = await handleAddReview(selectedBusiness.id, rating, comment, reviewImages);
                setIsSubmittingReview(false);
                if (success) {
                  setReviewSuccess(true);
                  e.currentTarget.reset();
                  setReviewImages([]);
                  setTimeout(() => setReviewSuccess(false), 3000);
                }
              }
            }}
            onCall={() => handlePlaceCall(selectedBusiness)}
            onMessage={() => {
              if (!currentUser) setIsAuthModalOpen(true);
              else if (currentUser.id === selectedBusiness.ownerId) {
                const firstIncoming = ownerCompanyIncomingThreads[0];
                const firstOutgoing = ownerCompanyOutgoingThreads[0];
                if (firstIncoming) {
                  handleOpenCompanyMessageThread(firstIncoming.businessId, firstIncoming.partnerId);
                } else if (firstOutgoing) {
                  handleOpenCompanyMessageThread(firstOutgoing.businessId, firstOutgoing.partnerId);
                } else {
                  showToast(
                    lang === 'en'
                      ? 'No company messages yet. They will appear here when someone writes to you.'
                      : 'Henüz şirket mesajı yok. Size yazıldığında burada görünecek.',
                    'info',
                  );
                }
              } else {
                setActiveBusinessChatPartnerId(selectedBusiness.ownerId || null);
                setIsBusinessChatOpen(true);
              }
            }}
            onFavorite={() => {
              if (!currentUser) setIsAuthModalOpen(true);
              else handleToggleFavorite(selectedBusiness.id);
            }}
            onEdit={() => {
              setEditingBusiness(selectedBusiness);
              setBusinessFormLocation({
                address: selectedBusiness.address || '',
                latitude: selectedBusiness.latitude,
                longitude: selectedBusiness.longitude,
              });
              setBusinessImageUrlPreview(selectedBusiness.imageUrl);
              setBusinessGallery(selectedBusiness.gallery || []);
              setIsEditBusinessModalOpen(true);
              setIsBusinessDetailModalOpen(false);
            }}
            onOpenReviewerProfile={handleOpenUserProfile}
            dbUsers={dbUsers}
            ownerIncomingThreads={
              currentUser?.id === selectedBusiness.ownerId ? ownerCompanyIncomingThreads : undefined
            }
            ownerOutgoingThreads={
              currentUser?.id === selectedBusiness.ownerId ? ownerCompanyOutgoingThreads : undefined
            }
            onOpenCompanyThread={
              currentUser?.id === selectedBusiness.ownerId ? handleOpenCompanyMessageThread : undefined
            }
          />
        )}
      </Modal>

      {/* --- BUSINESS CHAT MODAL --- */}
      <Modal 
        isOpen={isBusinessChatOpen} 
        onClose={() => setIsBusinessChatOpen(false)} 
        title={selectedBusiness ? (lang === 'en' ? 'Group Messaging' : 'Grup Mesajlaşması') : 'Chat'}
      >
        {selectedBusiness && currentUser && (
          <div className="flex flex-col h-[540px] text-left">
             {/* Dynamic Chat Header Showing Parties and Profiles */}
             <div className="bg-slate-50 border border-slate-100 rounded-[1.5rem] p-3 mb-4 flex items-center justify-between shadow-sm shrink-0">
               {/* Left: Customer/User */}
               <button
                 type="button"
                 onClick={() => {
                   if (currentUser && currentUser.id === selectedBusiness.ownerId && chatPartnerUser) {
                     handleOpenUserProfile(chatPartnerUser.id, chatPartnerUser);
                   } else if (currentUser) {
                     handleOpenUserProfile(currentUser.id, currentUser);
                   }
                 }}
                 className="flex-1 flex items-center gap-2 px-2.5 py-1.5 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100 text-left cursor-pointer group"
               >
                 <div className="w-9 h-9 rounded-full bg-primary-mid/10 flex items-center justify-center text-primary font-black text-xs shrink-0 border border-primary/20 overflow-hidden">
                   {currentUser && currentUser.id === selectedBusiness.ownerId ? (
                     chatPartnerUser?.photoUrl ? (
                       <img src={chatPartnerUser.photoUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                     ) : (
                       chatPartnerUser?.name ? chatPartnerUser.name.charAt(0).toUpperCase() : 'C'
                     )
                   ) : (
                     currentUser?.photoUrl ? (
                       <img src={currentUser.photoUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                     ) : (
                       currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'
                     )
                   )}
                 </div>
                 <div className="min-w-0">
                   <p className="text-[13px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                     {lang === 'en' ? 'Customer' : 'Müşteri'}
                   </p>
                   <p className="text-xs font-black text-slate-800 uppercase tracking-tight truncate group-hover:text-primary transition-colors">
                     {currentUser && currentUser.id === selectedBusiness.ownerId ? (
                       chatPartnerUser?.name || (lang === 'en' ? 'Loading...' : 'Yükleniyor...')
                     ) : (
                       currentUser?.name || 'You'
                     )}
                   </p>
                   <p className="text-[14px] text-primary font-bold leading-none mt-0.5 group-hover:underline">
                     {lang === 'en' ? 'View Profile' : 'Profili Gör'}
                   </p>
                 </div>
               </button>

               {/* Middle Banner Connector */}
               <div className="flex flex-col items-center justify-center px-2 text-slate-300">
                 <div className="flex items-center gap-0.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <div className="text-[12px] font-black tracking-widest text-emerald-600 uppercase">ACTIVE</div>
                 </div>
                 <div className="flex items-center gap-1 mt-1">
                   <div className="h-[1px] w-3 bg-slate-200" />
                   <MessageSquareText size={14} className="text-slate-400" />
                   <div className="h-[1px] w-3 bg-slate-200" />
                 </div>
               </div>

               {/* Right: Company/Business */}
               <button
                 type="button"
                 onClick={() => {
                   setIsBusinessDetailModalOpen(true);
                 }}
                 className="flex-1 flex items-center gap-2 px-2.5 py-1.5 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100 text-right justify-end cursor-pointer group"
               >
                 <div className="min-w-0">
                   <p className="text-[13px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                     {lang === 'en' ? 'Company' : 'Şirket'}
                   </p>
                   <p className="text-xs font-black text-slate-800 uppercase tracking-tight truncate group-hover:text-primary transition-colors">
                     {selectedBusiness.name}
                   </p>
                   <p className="text-[14px] text-primary font-bold leading-none mt-0.5 group-hover:underline">
                     {lang === 'en' ? 'View Details' : 'Detayları Gör'}
                   </p>
                 </div>
                 <div className="w-9 h-9 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 shadow-sm flex items-center justify-center">
                   {selectedBusiness.imageUrl ? (
                     <img src={selectedBusiness.imageUrl} className="w-full h-full object-cover" />
                   ) : (
                     <span className="text-[14px] font-black text-primary">BIZ</span>
                   )}
                 </div>
               </button>
             </div>

             <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {businessChatMessages
                  .filter(m => {
                    if (m.businessId !== selectedBusiness.id) return false;
                    if (!activeBusinessChatPartnerId) return true;
                    return m.senderId === activeBusinessChatPartnerId || m.receiverId === activeBusinessChatPartnerId;
                  })
                  .map((msg) => {
                    const isMe = msg.senderId === currentUser.id;
                    const senderFromDb = dbUsers.find(u => u && u.id === msg.senderId);
                    const senderPhoto = senderFromDb?.photoUrl || (isMe ? currentUser?.photoUrl : null);
                    
                    const avatarLetter = isMe 
                      ? (currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U')
                      : (currentUser.id === selectedBusiness.ownerId 
                          ? (chatPartnerUser?.name ? chatPartnerUser.name.charAt(0).toUpperCase() : 'C')
                          : (selectedBusiness.name ? selectedBusiness.name.charAt(0).toUpperCase() : 'B')
                        );
                    
                    const handleAvatarClick = () => {
                      if (isMe) {
                        handleOpenUserProfile(currentUser.id, currentUser);
                      } else {
                        if (chatPartnerUser) {
                          handleOpenUserProfile(chatPartnerUser.id, chatPartnerUser);
                        } else {
                          // Fallback to active business owner details if chatPartnerUser is not fully loaded yet
                          const ownerFromDb = dbUsers.find(u => u && u.id === selectedBusiness.ownerId);
                          const ownerFallback = {
                            id: selectedBusiness.ownerId || 'unknown_owner',
                            name: ownerFromDb?.name || selectedBusiness.ownerName || 'Business Owner',
                            photoUrl: ownerFromDb?.photoUrl || selectedBusiness.ownerPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedBusiness.ownerName || 'Business Owner')}&background=random`,
                            email: ownerFromDb?.email || selectedBusiness.ownerEmail || ''
                          };
                          handleOpenUserProfile(ownerFallback.id, ownerFallback);
                        }
                      }
                    };

                    return (
                      <div key={msg.id} className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : 'flex-row'} mb-1`}>
                        {/* Profile Avatar Button */}
                        <button
                          type="button"
                          onClick={handleAvatarClick}
                          title={lang === 'en' ? 'Click to view profile' : 'Profilini görmek için tıklayın'}
                          className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-black text-[14px] border shadow-sm transition-all hover:scale-110 active:scale-95 ${
                            isMe 
                              ? 'bg-primary-mid/10 border-primary/20 text-primary hover:border-primary/50' 
                              : (currentUser.id === selectedBusiness.ownerId 
                                  ? 'bg-primary-mid/10 border-primary/20 text-primary hover:border-primary/50' 
                                  : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-400'
                                )
                          } overflow-hidden cursor-pointer`}
                        >
                          {senderPhoto ? (
                            <img src={senderPhoto} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : !isMe && currentUser.id !== selectedBusiness.ownerId && selectedBusiness.imageUrl ? (
                            <img src={selectedBusiness.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            avatarLetter
                          )}
                        </button>

                        {/* Content Area */}
                        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                          {!isMe && (
                            <span className="text-[13px] font-black text-slate-400 mb-1 tracking-widest uppercase truncate max-w-full">
                              {msg.senderName}
                            </span>
                          )}
                          <div className={`p-3.5 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'}`}>
                            <ChatMessageBody
                              content={msg.content}
                              imageUrl={msg.imageUrl}
                              type={msg.type}
                              onImagePreview={setPreviewMessageImage}
                              isOnPrimaryBg={isMe}
                              lang={lang}
                            />
                          </div>
                          <span className="text-[12px] font-black text-slate-400 mt-1 uppercase tracking-widest opacity-60">
                             {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
             </div>
             <ChatMessageComposer
               asForm
               onSubmit={(e) => {
                 e.preventDefault();
                 const form = e.currentTarget;
                 const input = form.elements.namedItem('message') as HTMLInputElement | null;
                 const content = input?.value.trim() || '';
                 if (content || businessChatImageSelected) {
                   void handleSendBusinessMessage(content, businessChatImageSelected);
                   if (input) input.value = '';
                 }
               }}
               onSend={() => {}}
               onImagePick={(e) => void handleChatImagePick(e, setIsUploadingBusinessChatImage, setBusinessChatImageSelected)}
               selectedImage={businessChatImageSelected}
               onClearImage={() => setBusinessChatImageSelected(null)}
               isUploadingImage={isUploadingBusinessChatImage}
               lang={lang}
               inputName="message"
               placeholder={t.sections.typeMessage}
               className="pt-4"
             />
          </div>
        )}
      </Modal>

      {/* --- USER PROFILE DETAIL MODAL --- */}
      <Modal
        isOpen={isUserProfileModalOpen}
        onClose={() => setIsUserProfileModalOpen(false)}
        title={lang === 'en' ? 'User Profile Information' : 'Kullanıcı Profil Bilgileri'}
        maxWidth="max-w-md"
      >
        {profileUser && (() => {
          const ownedBusinesses = (businesses || []).filter(b => b && b.ownerId === profileUser.id);
          return (
            <div className="flex flex-col items-center text-center space-y-6 py-2 animate-in fade-in duration-300">
              {/* User Avatar */}
              <div className="w-20 h-20 rounded-full bg-primary-mid/10 border-4 border-white shadow-xl flex items-center justify-center text-primary text-3xl font-black relative overflow-hidden">
                {profileUser.photoUrl ? (
                  <img src={profileUser.photoUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <>
                    {profileUser.name ? profileUser.name.charAt(0).toUpperCase() : 'U'}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                  </>
                )}
              </div>

              {/* User Identity Details */}
              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                  {profileUser.name}
                </h4>
                <p className="text-xs font-black text-primary uppercase tracking-widest px-3 py-1 bg-primary/5 rounded-full inline-block">
                  {lang === 'en' ? 'Verified Hub Member' : 'Doğrulanmış Bölge Üyesi'}
                </p>
              </div>

              {/* Profile Information Fields */}
              <div className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] p-5 text-left space-y-4">
                <div>
                  <p className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'E-mail Address' : 'E-posta Adresi'}</p>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5 break-all">
                    {profileUser.email || (lang === 'en' ? 'Confidential / Hidden' : 'Gizli / Belirtilmemiş')}
                  </p>
                </div>

                <div>
                  <p className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Unique Member ID' : 'Benzersiz Üye Kimliği'}</p>
                  <p className="text-[14px] font-mono text-slate-500 mt-0.5 break-all select-all">{profileUser.id}</p>
                </div>

                <div>
                  <p className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Community Verification' : 'Topluluk Doğrulaması'}</p>
                  <span className="inline-flex items-center gap-1.5 text-[14px] uppercase font-black text-emerald-600 mt-1 bg-emerald-50 py-1 px-2.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {lang === 'en' ? 'Active Citizen User' : 'Aktif Vatandaş Kullanıcı'}
                  </span>
                </div>
              </div>

              {/* Owned Businesses & Companies */}
              {ownedBusinesses.length > 0 && (
                <div className="w-full space-y-3 pt-2 text-left">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-[14px] font-black text-slate-400 uppercase tracking-wider">
                      {lang === 'en' ? 'Owned Businesses & Companies' : 'Sahip Olduğu Şirketler & Girişimler'}
                    </span>
                  </div>
                  
                  <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                    {ownedBusinesses.map((biz) => (
                      <div 
                        key={biz.id}
                        onClick={() => {
                          setIsUserProfileModalOpen(false);
                          setIsBusinessChatOpen(false);
                          setSelectedBusiness(biz);
                          setIsBusinessDetailModalOpen(true);
                        }}
                        className="group relative bg-slate-50 border border-slate-100 hover:border-primary/30 hover:bg-slate-100/50 cursor-pointer rounded-2xl p-3 flex gap-3 hover:shadow-sm transition-all duration-300 text-left"
                      >
                        {/* Business Image banner */}
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-150">
                          {biz.imageUrl ? (
                            <img src={biz.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 animate-fade-in" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary text-base font-black uppercase">
                              {biz.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        
                        {/* Details text */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h5 className="font-black text-xs text-slate-900 uppercase tracking-tight truncate leading-tight group-hover:text-primary transition-colors">
                              {biz.name}
                            </h5>
                            <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                              {biz.category}
                            </p>
                            <p className="text-[14px] text-slate-500 mt-0.5 line-clamp-1">
                              {biz.description}
                            </p>
                          </div>
                          
                          <div className="mt-1.5 flex items-center justify-between gap-1.5 pt-1.5 border-t border-slate-100">
                            {/* Rating */}
                            <div className="flex items-center gap-1">
                              <span className="text-accent-vivid font-black text-[13px]">★</span>
                              <span className="text-[13px] font-bold text-slate-600">
                                {biz.rating ? biz.rating.toFixed(1) : '5.0'}
                              </span>
                            </div>
                            
                            {/* View Details clickable button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsUserProfileModalOpen(false);
                                setIsBusinessChatOpen(false);
                                setSelectedBusiness(biz);
                                setIsBusinessDetailModalOpen(true);
                              }}
                              className="px-2 py-0.5 bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 rounded-lg text-[12px] font-black uppercase tracking-widest text-slate-600 hover:text-primary transition-all active:scale-95 cursor-pointer"
                            >
                              {lang === 'en' ? 'Open Details' : 'Detayları Aç'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Calling & Connection Actions (Arama Butonları) */}
              <div className="w-full space-y-2.5">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-1 text-left">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[14px] font-black text-slate-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Direct Actions & Calling' : 'Doğrudan İşlemler & Arama'}
                  </span>
                </div>

                <div className="w-full">
                  {/* WebRTC In-App Direct Call */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsUserProfileModalOpen(false);
                      handlePlaceUserCall(profileUser);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:bg-primary/95 hover:scale-[1.01] transition-all cursor-pointer active:scale-95 text-center leading-none"
                  >
                     <PhoneCall size={18} className="animate-pulse" />
                     <span>{lang === 'en' ? 'Call' : 'Ara'}</span>
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsUserProfileModalOpen(false)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95"
              >
                {lang === 'en' ? 'Dismiss' : 'Kapat'}
              </button>
            </div>
          );
        })()}
      </Modal>

      {/* Remote Audio Player for WebRTC calls with inline playback and layout presence (non-zero size and minimal opacity to bypass mobile audio suspension) */}
      <audio 
        ref={remoteAudioRef} 
        autoPlay 
        playsInline 
        controls={false} 
        muted={false}
        className="absolute -top-40 -left-40 w-10 h-10 opacity-[0.01] pointer-events-none select-none overflow-hidden" 
      />

      {/* --- CALLING SYSTEM UI --- */}
      <AnimatePresence>
        {/* 1. Outgoing Call Overlay */}
        {isCalling && outgoingCall && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[2000] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-between p-6 sm:p-12 text-white animate-in fade-in overflow-y-auto"
          >
             <div className="text-center mt-4 sm:mt-8 w-full px-4 max-w-lg">
                <span className="text-[14px] font-black uppercase tracking-[0.4em] text-accent-vivid animate-pulse">
                  {lang === 'en' ? 'SECURE OUTGOING CALL' : 'GÜVENLİ DIŞ ARAMA'}
                </span>
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mt-4 mb-2 break-words leading-tight">
                  {lang === 'en' ? 'Calling...' : 'Aranıyor...'}
                </h3>
                <p className="text-lg sm:text-2xl font-medium text-slate-300 break-words mt-2">{outgoingCall.businessName}</p>
             </div>

             <div className="relative flex items-center justify-center my-12">
                <div className="absolute w-44 h-44 bg-accent/10 rounded-full animate-ping duration-1000" />
                <div className="absolute w-56 h-56 bg-primary-mid/10 rounded-full animate-pulse duration-2000" />
                <div className="w-32 h-32 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center relative border border-white/20 shadow-[0_0_50px_rgba(249,115,22,0.3)]">
                   <Phone size={50} className="text-white animate-bounce" />
                </div>
             </div>

             <div className="flex flex-col items-center gap-4 mb-8 w-full max-w-sm">
                {/* Simulation Button to let the user test call connection and active state without another device active */}
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await updateDoc(doc(db, 'calls', outgoingCall.id), { status: 'answered' });
                      showToast(
                        lang === 'en' 
                          ? 'Call answered (Simulation active)' 
                          : 'Arama cevaplandı (Simülasyon aktif)', 
                        'success'
                      );
                    } catch (secErr) {
                      console.warn("Could not write answer state, bypass to local active call:", secErr);
                      setActiveCall({ ...outgoingCall, status: 'answered' });
                      setOutgoingCall(null);
                      setIsCalling(false);
                    }
                  }}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-[14px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-md hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall size={16} className="animate-pulse" />
                  <span>{lang === 'en' ? 'Answer (Simulate)' : 'Cevapla (Simüle Et)'}</span>
                </button>

                <button 
                  onClick={handleEndCall}
                  className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all active:scale-90 mt-2"
                >
                  <X size={34} />
                </button>
                <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">
                  {lang === 'en' ? 'Cancel Call' : 'Aramayı İptal Et'}
                </span>
             </div>
          </motion.div>
        )}

        {/* 2. Incoming Call Overlay */}
        {incomingCall && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[2000] bg-primary/98 backdrop-blur-xl flex flex-col items-center justify-between p-6 sm:p-12 text-white animate-in fade-in overflow-y-auto"
          >
             <div className="text-center mt-4 sm:mt-8 w-full px-4 max-w-lg">
                <span className="text-[13px] sm:text-[14px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] bg-white/10 px-3 sm:px-4 py-1.5 rounded-full text-white animate-pulse">
                  🔔 {lang === 'en' ? 'INCOMING GOOFIND CALL' : 'GELEN GOOFIND ARAMASI'}
                </span>
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mt-6 mb-2 text-white break-words leading-tight">
                  {incomingCall.callerName}
                </h3>
                <p className="text-base sm:text-xl font-medium text-accent-vivid break-words mt-2">
                  {lang === 'en' ? 'Regarding' : 'Hakkında'}: {incomingCall.businessName}
                </p>
             </div>

             <div className="relative flex items-center justify-center my-12">
                <div className="absolute w-44 h-44 bg-white/10 rounded-full animate-ping duration-1000" />
                <div className="absolute w-60 h-60 bg-accent/20 rounded-full animate-ping duration-1500" />
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center relative shadow-2xl">
                   <PhoneCall size={50} className="text-primary animate-bounce" />
                </div>
             </div>

             <div className="flex flex-col items-center gap-6 mb-8 w-full max-w-md">
                <div className="flex justify-center items-center gap-12 w-full">
                   <div className="flex flex-col items-center gap-3">
                      <button 
                        onClick={handleEndCall}
                        className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90"
                      >
                        <X size={38} />
                      </button>
                      <span className="text-xs font-bold text-white/80 shrink-0">
                        {lang === 'en' ? 'Reject' : 'Reddet'}
                      </span>
                   </div>

                   <div className="flex flex-col items-center gap-3">
                      <button 
                        onClick={handleAnswerCall}
                        className="w-20 h-20 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 animate-pulse"
                      >
                        <Phone size={38} />
                      </button>
                      <span className="text-xs font-bold text-white/80 shrink-0">
                        {lang === 'en' ? 'Answer' : 'Cevapla'}
                      </span>
                   </div>
                </div>

                <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center shadow-lg transform translate-y-2 animate-pulse mt-4">
                   <p className="text-[14px] sm:text-xs text-white/95 font-semibold leading-relaxed">
                      💡 {lang === 'en' ? 'Answering requires microphone access. Please click "Allow" when the browser asks for permission!' : 'Sesli görüşme için mikrofon gereklidir. Aramayı yanıtladığınızda çıkacak tarayıcı uyarısından "İzin Ver" tuşuna basınız!'}
                   </p>
                </div>
             </div>
          </motion.div>
        )}

        {/* 3. Connected Active Call Overlay */}
        {activeCall && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[2000] bg-slate-900/98 backdrop-blur-xl flex flex-col items-center justify-between p-6 sm:p-12 text-white animate-in fade-in overflow-y-auto"
          >
             <div className="text-center mt-4 sm:mt-8 w-full px-4 max-w-lg">
                <span className="text-[13px] sm:text-[14px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-emerald-400 font-mono tracking-widest flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  {lang === 'en' ? 'SECURE CONNECTION ACTIVE' : 'GÜVENLİ GÖRÜŞME AKTİF'}
                </span>
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mt-4 mb-2 break-words leading-tight">
                  {currentUser?.id === activeCall.callerId ? activeCall.businessName : activeCall.callerName}
                </h3>
                <div className="text-xl sm:text-2xl font-mono text-emerald-400 font-black mt-4 tracking-wider">
                  {formatTimer(callTimer)}
                </div>
             </div>

             <div className="flex items-end justify-center gap-1.5 h-32 my-12">
               {[...Array(12)].map((_, i) => {
                  const randomHeight = [24, 48, 16, 64, 32, 72, 40, 80, 20, 56, 44, 36][i];
                  return (
                    <motion.div 
                      key={i}
                      animate={{ height: [12, randomHeight, 12] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.8 + i * 0.05, 
                        ease: "easeInOut" 
                      }}
                      className="w-2.5 bg-gradient-to-t from-primary to-accent rounded-full" 
                    />
                  );
               })}
             </div>

             {/* WebRTC Diagnostics & Guidelines */}
             <div className="w-full max-w-sm mx-auto my-4 bg-slate-950/60 border border-white/5 rounded-2xl p-5 text-center shadow-lg">
                <p className="text-[14px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                  {lang === 'en' ? 'Connection Status' : 'Bağlantı Durumu'}
                </p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${
                    callConnectionState === 'connected' || callConnectionState === 'completed'
                      ? 'bg-emerald-500 animate-pulse'
                      : callConnectionState === 'failed' || callConnectionState === 'disconnected'
                      ? 'bg-red-500'
                      : 'bg-amber-400 animate-ping'
                  }`} />
                  <span className="font-mono text-xs uppercase tracking-widest font-black text-white">
                    {callConnectionState}
                  </span>
                </div>

                {/* State explanations */}
                <div className="text-xs text-slate-300 leading-relaxed text-center space-y-2">
                  {(callConnectionState === 'connected' || callConnectionState === 'completed') ? (
                    <p className="text-emerald-400 font-semibold text-[15px]">
                      {lang === 'en' 
                        ? '✓ Connection established! You should hear each other.' 
                        : '✓ Ses bağlantısı kuruldu! Karşı taraf ile konuşabilirsiniz.'}
                    </p>
                  ) : (callConnectionState === 'failed' || callConnectionState === 'disconnected') ? (
                    <div className="text-red-400 space-y-1 text-left bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-[15px] leading-relaxed">
                      <p className="font-bold">⚠️ {lang === 'en' ? 'Connection Error:' : 'Bağlantı Hatası:'}</p>
                      <p className="text-slate-300 font-medium text-[14px]">
                        {lang === 'en'
                          ? 'Usually caused by browser permission restrictions or running inside the preview iframe.'
                          : 'Genellikle tarayıcı izin kısıtlamaları veya uygulamanın bir önizleme çerçevesi (iFrame) içinde çalışmasından kaynaklanır.'}
                      </p>
                      <p className="text-emerald-400 font-medium text-[14px]">
                        💡 {lang === 'en'
                          ? 'Solution: Click the "Open in New Tab" button in the top-right corner to allow microphone permissions!'
                          : 'Çözüm: Sağ üst köşedeki "Yeni Sekmede Aç" butonuna basarak uygulamayı doğrudan tarayıcıda açın ve mikrofon iznini onaylayın!'}
                      </p>
                    </div>
                  ) : (
                    <div className="text-[15px] text-slate-200 text-left bg-slate-900/80 p-3 rounded-lg border border-white/5 space-y-1.5">
                      <p className="font-semibold text-accent-vivid">
                        ℹ️ {lang === 'en' ? 'Direct connection is being negotiated...' : 'Doğrudan bağlantı kurulmaya çalışılıyor...'}
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[14px]">
                        <li>
                          {lang === 'en' 
                            ? 'Please ensure both parties allow microphone access.' 
                            : 'Her iki tarafın da mikrofon izni verdiğinden emin olun.'}
                        </li>
                        <li>
                          {lang === 'en' 
                            ? 'Ensure you are both using the app in a Secure context (New Tab/Yeni Sekme).' 
                            : 'Görüntüleyici kısıtlamalarını aşmak için sağ üstten "Yeni Sekmede Aç" butonunu kullanın.'}
                        </li>
                        <li>
                          {lang === 'en'
                            ? 'If stuck checking, your cellular operators may be blocking peer-to-peer media traffic.'
                            : 'Bağlantı "checking" durumunda kalıyorsa, şebekeniz doğrudan peer-to-peer veri iletimini engelliyor olabilir.'}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
             </div>

             <div className="flex flex-col items-center gap-6 mb-8 w-full max-w-sm">
                <button 
                  onClick={handleEndCall}
                  className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-3xl hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all active:scale-90"
                >
                  <X size={42} />
                </button>
                <span className="text-xs font-bold text-slate-400 shrink-0 capitalize">
                  {lang === 'en' ? 'End Call' : 'Aramayı Sonlandır'}
                </span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isFullScreenTabView && (
      <footer className="bg-white border-t border-slate-100 pt-16 pb-32 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary">
            <div className="flex flex-col items-center gap-6 mb-12">
               <LogoText size="text-3xl md:text-6xl" />
               <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                 <a href="?page=support" className="text-[14px] font-black text-slate-400 hover:text-accent-vivid-vivid uppercase tracking-widest transition-colors font-mono">
                   {lang === 'en' ? 'Support / Contact' : 'Destek / İletişim'}
                 </a>
                 <a href="?page=privacy" className="text-[14px] font-black text-slate-400 hover:text-accent-vivid-vivid uppercase tracking-widest transition-colors font-mono">
                   {lang === 'en' ? 'Privacy Policy' : 'Gizlilik Politikası'}
                 </a>
                 <button onClick={() => setIsTermsModalOpen(true)} className="text-[14px] font-black text-slate-400 hover:text-accent-vivid-vivid uppercase tracking-widest transition-colors font-mono cursor-pointer">
                   {lang === 'en' ? 'Terms & Conditions' : 'Kullanım Koşulları'}
                 </button>
                 <a href="?page=delete-account" className="text-[14px] font-extrabold text-red-500 hover:text-red-650 uppercase tracking-widest transition-colors font-mono">
                   🚨 {lang === 'en' ? 'Delete Account Request' : 'Hesap Silme Talebi'}
                 </a>
              </div>
           </div>
           <div className="w-full h-px bg-slate-50 mb-8" />
           <p className="text-[14px] font-black text-slate-300 uppercase tracking-widest">© 2026 Goofind Canada. All Rights Reserved.</p>
        </div>
      </footer>
      )}

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-2 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:min-w-[19rem] sm:max-w-[22rem] px-1.5 py-1.5 z-[60] flex justify-between items-center rounded-2xl border border-white/15 select-none"
        style={{
          background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 55%, #60A5FA 100%)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 6px 24px rgba(29,78,216,0.35)',
        }}
      >
        <button 
          onClick={resetHome} 
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[2.4rem] px-0.5 transition-all active:scale-95 ${
            isHomeView && homeNavSection === 'home' && !isNearbyMapOpen ? 'text-white drop-shadow-md' : 'text-white/50 hover:text-white/80'
          }`}
          aria-label={t.bottomNav.home}
        >
          <Home size={20} strokeWidth={isHomeView && homeNavSection === 'home' && !isNearbyMapOpen ? 2.5 : 2} />
          <span className="text-[6px] sm:text-[7px] font-bold uppercase tracking-[0.1em] text-white/90 leading-none">
            {lang === 'tr' ? 'Ana' : 'Home'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => scrollToHomeSection('events')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[2.4rem] px-0.5 transition-all active:scale-95 ${
            isHomeView && homeNavSection === 'events' && !isNearbyMapOpen ? 'text-white drop-shadow-md' : 'text-white/50 hover:text-white/80'
          }`}
          aria-label={t.bottomNav.events}
        >
          <Calendar size={20} strokeWidth={isHomeView && homeNavSection === 'events' && !isNearbyMapOpen ? 2.5 : 2} />
          <span className="text-[6px] sm:text-[7px] font-bold uppercase tracking-[0.1em] text-white/90 leading-none">
            {t.bottomNav.events}
          </span>
        </button>

        <button
          type="button"
          onClick={() => scrollToHomeSection('places')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[2.4rem] px-0.5 transition-all active:scale-95 ${
            isHomeView && homeNavSection === 'places' && !isNearbyMapOpen ? 'text-white drop-shadow-md' : 'text-white/50 hover:text-white/80'
          }`}
          aria-label={lang === 'tr' ? 'Gezi' : t.bottomNav.places}
        >
          <Compass size={20} strokeWidth={isHomeView && homeNavSection === 'places' && !isNearbyMapOpen ? 2.5 : 2} />
          <span className="text-[6px] sm:text-[7px] font-bold uppercase tracking-[0.1em] text-white/90 leading-none">
            {lang === 'tr' ? 'Gezi' : t.bottomNav.places}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setIsNearbyMapOpen(true)}
          className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[2.4rem] px-0.5 transition-all active:scale-95 ${
            isNearbyMapOpen ? 'text-white drop-shadow-md' : 'text-white/50 hover:text-white/80'
          }`}
          aria-label={lang === 'tr' ? 'Harita' : 'Map'}
          title={lang === 'tr' ? 'Haritada yakınımdakiler' : 'Nearby on map'}
        >
          <MapNavIcon active={isNearbyMapOpen} />
          <span className="text-[6px] sm:text-[7px] font-bold uppercase tracking-[0.1em] text-white/90 leading-none">
            {lang === 'tr' ? 'Harita' : 'Map'}
          </span>
        </button>
      </nav>

      {/* Floating Action Button for Chat with Admin */}
      <motion.button
        id="admin-chat-fab"
        initial={{ scale: 0, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setSelectedCategory('Chat');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-[4.5rem] sm:bottom-[4.75rem] right-4 sm:right-6 z-[55] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 border border-white/20 hover:bg-primary-mid transition-all cursor-pointer group"
        aria-label="Chat with Admin"
      >
        {/* Subtle pulsing background ring */}
        <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping duration-3000 pointer-events-none group-hover:bg-primary/30" />
        
        {/* Hover Tooltip - Extremely clear for first-time visitors */}
        <span className="absolute right-full mr-3.5 px-3 py-1.5 bg-slate-900/95 text-white text-[15px] font-black uppercase tracking-wider rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg border border-white/10 hidden sm:block">
          {lang === 'tr' ? 'Yöneticiye Yaz' : 'Message Admin'}
        </span>

        {/* High-clarity composition icon: Message bubble of chat with lines */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Message bubble with written text lines */}
            <MessageSquareText size={36} className="sm:w-8.5 sm:h-8.5 drop-shadow-sm fill-white text-primary stroke-[1.8]" />
          </div>
          
          {unreadChatCount > 0 ? (
            <div className="absolute -top-3 -right-3 bg-rose-600 border-2 border-primary text-white font-black text-[13px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center animate-bounce shadow-md px-1 select-none">
              {unreadChatCount}
            </div>
          ) : (
            /* Support status active dot indicator (green pulsing circle) */
            <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-primary rounded-full animate-pulse shadow-md" />
          )}
        </div>
      </motion.button>

      {/* Elegant Native Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{ x: '-50%' }}
            className={`fixed bottom-28 left-1/2 z-[2000] px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border backdrop-blur-md max-w-[90%] md:max-w-md ${
              toast.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : toast.type === 'error' 
                ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                : 'bg-primary-mid/10 border-primary/20 text-primary-light'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={22} className="shrink-0" />
            ) : toast.type === 'error' ? (
              <XCircle size={22} className="shrink-0 animate-bounce" />
            ) : (
              <HelpCircle size={22} className="shrink-0 animate-pulse" />
            )}
            <span className="text-xs font-black uppercase tracking-wider text-center">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {lightboxIndex >= 0 && lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] bg-black/95 flex flex-col items-center justify-center select-none no-lightbox"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="fixed top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-[3010] w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center justify-center transition-all shadow-lg border border-white/20"
              aria-label={lang === 'tr' ? 'Kapat' : 'Close'}
            >
              <X size={24} strokeWidth={2.5} />
            </button>

            {lightboxImages.length > 1 && (
              <div className="fixed top-[max(1rem,env(safe-area-inset-top))] left-[max(1rem,env(safe-area-inset-left))] z-[3010] px-2.5 py-1 rounded-full bg-black/50 text-white text-[11px] font-bold">
                {lightboxIndex + 1} / {lightboxImages.length}
              </div>
            )}

            <div
              className="relative w-full h-full flex items-center justify-center px-2 py-14"
              onClick={(e) => e.stopPropagation()}
              onWheel={handleWheel}
            >
              {lightboxImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  disabled={lightboxIndex === 0}
                  className="absolute left-2 z-[3010] w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center transition-all disabled:opacity-20 active:scale-90"
                  aria-label={lang === 'tr' ? 'Önceki' : 'Previous'}
                >
                  <ChevronLeft size={24} strokeWidth={2.5} />
                </button>
              )}

              {lightboxImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  disabled={lightboxIndex === lightboxImages.length - 1}
                  className="absolute right-2 z-[3010] w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center transition-all disabled:opacity-20 active:scale-90"
                  aria-label={lang === 'tr' ? 'Sonraki' : 'Next'}
                >
                  <ChevronRight size={24} strokeWidth={2.5} />
                </button>
              )}

              <motion.img
                key={lightboxIndex}
                src={lightboxImage}
                alt=""
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className={`max-w-[92vw] max-h-[80vh] object-contain select-none ${
                  zoomLevel === 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-all-scroll'
                }`}
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                }}
                draggable={false}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                  setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
                }}
                onMouseMove={(e) => {
                  if (!isDragging) return;
                  if (zoomLevel === 1) {
                    setPanOffset({ x: e.clientX - dragStart.x, y: 0 });
                  } else {
                    setPanOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
                  }
                }}
                onMouseUp={() => {
                  if (!isDragging) return;
                  setIsDragging(false);
                  if (zoomLevel === 1) {
                    if (panOffset.x < -68) handleNextImage();
                    else if (panOffset.x > 68) handlePrevImage();
                    else setPanOffset({ x: 0, y: 0 });
                  }
                }}
                onMouseLeave={() => {
                  if (isDragging) {
                    setIsDragging(false);
                    setPanOffset({ x: 0, y: 0 });
                  }
                }}
                onTouchStart={(e) => {
                  if (e.touches.length === 1) {
                    setIsDragging(true);
                    const touch = e.touches[0];
                    setDragStart({ x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y });
                  }
                }}
                onTouchMove={(e) => {
                  if (!isDragging || e.touches.length !== 1) return;
                  const touch = e.touches[0];
                  if (zoomLevel === 1) {
                    setPanOffset({ x: touch.clientX - dragStart.x, y: 0 });
                  } else {
                    setPanOffset({
                      x: touch.clientX - dragStart.x,
                      y: touch.clientY - dragStart.y,
                    });
                  }
                }}
                onTouchEnd={() => {
                  if (!isDragging) return;
                  setIsDragging(false);
                  if (zoomLevel === 1) {
                    if (panOffset.x < -58) handleNextImage();
                    else if (panOffset.x > 58) handlePrevImage();
                    else setPanOffset({ x: 0, y: 0 });
                  }
                }}
                onDoubleClick={() => {
                  if (zoomLevel > 1) {
                    setZoomLevel(1);
                    setPanOffset({ x: 0, y: 0 });
                  } else {
                    setZoomLevel(2);
                  }
                }}
              />
            </div>

            {lightboxImages.length > 1 && (
              <div
                className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[3010] flex gap-1.5 items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {lightboxImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setLightboxIndex(idx);
                      setZoomLevel(1);
                      setPanOffset({ x: 0, y: 0 });
                      setRotationAngle(0);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      idx === lightboxIndex ? 'w-5 bg-white' : 'w-2 bg-white/35'
                    }`}
                    aria-label={lang === 'tr' ? `Fotoğraf ${idx + 1}` : `Photo ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ScreenshotOptimizerModal 
        isOpen={isScreenshotModalOpen} 
        onClose={() => setIsScreenshotModalOpen(false)} 
        lang={lang} 
      />
    </div>
  );
};

export default App;
