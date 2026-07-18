import {
  Globe,
  Stethoscope,
  Utensils,
  Newspaper,
  Printer,
  Users,
  ShoppingBag,
  GraduationCap,
  Car,
  Home,
  Calendar,
  Camera,
  Shirt,
  Gavel,
  Construction,
  Sparkles,
  Gem,
  Truck,
  Cpu,
  Bed,
  Calculator,
  Music,
  Monitor,
  Hotel,
  CarFront,
  Package,
  Banknote,
  Megaphone,
  ShieldCheck,
  Trophy,
  Smartphone,
  SprayCan,
  Languages,
  Scissors,
  Warehouse,
  Plane,
  Briefcase,
  UserPlus,
  Building2,
  Tag,
  Search,
  Gift,
  MapPin,
  Baby,
  Wrench,
  HelpCircle,
  HandHelping,
  Bell,
  BookOpen,
  PawPrint,
  HeartHandshake,
  Stamp,
  type LucideIcon,
} from 'lucide-react';
import { CategoryType, NotificationCategory } from '../types';
import { getIconHex } from './icon3d';

export type CategoryCardStyle = {
  emoji: string;
  icon: LucideIcon;
  textColor: string;
};

const withStyle = (emoji: string, icon: LucideIcon, textColor: string): CategoryCardStyle => ({
  emoji,
  icon,
  textColor,
});

export const COMPANY_CATEGORY_STYLES: Record<string, CategoryCardStyle> = {
  [CategoryType.HEALTH]: withStyle('🏥', Stethoscope, 'text-[#C62828]'),
  [CategoryType.FOOD_DRINK]: withStyle('🍔', Utensils, 'text-[#E65100]'),
  [CategoryType.PRESS_MEDIA]: withStyle('📰', Newspaper, 'text-[#37474F]'),
  [CategoryType.PRINT_GRAPHICS]: withStyle('🖨️', Printer, 'text-[#4527A0]'),
  [CategoryType.ASSOCIATION_FOUNDATION]: withStyle('🤝', Users, 'text-[#F9A825]'),
  [CategoryType.ECOMMERCE]: withStyle('🛒', ShoppingBag, 'text-[#2E7D32]'),
  [CategoryType.EDUCATION_CONSULTANCY]: withStyle('📚', GraduationCap, 'text-[#283593]'),
  [CategoryType.DRIVING_SCHOOL]: withStyle('🚗', Car, 'text-[#1565C0]'),
  [CategoryType.REAL_ESTATE]: withStyle('🏠', Home, 'text-[#6A1B9A]'),
  [CategoryType.EVENTS_ORG]: withStyle('🎉', Calendar, 'text-[#AD1457]'),
  [CategoryType.PHOTO_VIDEO]: withStyle('📷', Camera, 'text-[#37474F]'),
  [CategoryType.CLOTHING_TEXTILE]: withStyle('👕', Shirt, 'text-[#0277BD]'),
  [CategoryType.LAW_IMMIGRATION]: withStyle('💼', Gavel, 'text-[#5D4037]'),
  [CategoryType.CONSTRUCTION_REPAIR]: withStyle('🔨', Construction, 'text-[#EF6C00]'),
  [CategoryType.BEAUTY_COSMETICS]: withStyle('💄', Sparkles, 'text-[#D81B60]'),
  [CategoryType.JEWELRY_DESIGN]: withStyle('💎', Gem, 'text-[#0288D1]'),
  [CategoryType.LOGISTICS_TRANSPORT]: withStyle('🚚', Truck, 'text-[#F57C00]'),
  [CategoryType.MACHINERY_EQUIPMENT]: withStyle('⚙️', Cpu, 'text-[#546E7A]'),
  [CategoryType.FURNITURE_DECORATION]: withStyle('🛋️', Bed, 'text-[#8D6E63]'),
  [CategoryType.ACCOUNTING_FINANCE]: withStyle('💰', Calculator, 'text-[#F9A825]'),
  [CategoryType.MUSIC_ART]: withStyle('🎵', Music, 'text-[#6A1B9A]'),
  [CategoryType.NETWORK_COMPUTER]: withStyle('💻', Monitor, 'text-[#37474F]'),
  [CategoryType.HOTEL_ACCOMMODATION]: withStyle('🏨', Hotel, 'text-[#C62828]'),
  [CategoryType.AUTOMOTIVE]: withStyle('🚙', CarFront, 'text-[#1565C0]'),
  [CategoryType.PACKAGING]: withStyle('📦', Package, 'text-[#8D6E63]'),
  [CategoryType.MONEY_TRANSFER]: withStyle('💸', Banknote, 'text-[#2E7D32]'),
  [CategoryType.ADVERTISING_MARKETING]: withStyle('📣', Megaphone, 'text-[#E65100]'),
  [CategoryType.INSURANCE]: withStyle('🛡️', ShieldCheck, 'text-[#1565C0]'),
  [CategoryType.SPORTS]: withStyle('⚽', Trophy, 'text-[#1B5E20]'),
  [CategoryType.TELECOM]: withStyle('📱', Smartphone, 'text-[#37474F]'),
  [CategoryType.CLEANING_PEST]: withStyle('🧹', SprayCan, 'text-[#8D6E63]'),
  [CategoryType.TRANSLATION]: withStyle('🌐', Languages, 'text-[#1565C0]'),
  [CategoryType.TAILOR_DRYCLEAN]: withStyle('✂️', Scissors, 'text-[#546E7A]'),
  [CategoryType.WHOLESALE]: withStyle('🏭', Warehouse, 'text-[#78909C]'),
  [CategoryType.TOURISM_TRAVEL]: withStyle('✈️', Plane, 'text-[#0288D1]'),
};

export const ANNOUNCEMENT_CATEGORY_STYLES: Record<string, CategoryCardStyle> = {
  [NotificationCategory.JOB_WANTED]: withStyle('👤', Briefcase, 'text-[#5D4037]'),
  [NotificationCategory.JOB_HIRING]: withStyle('📋', UserPlus, 'text-[#8D6E63]'),
  [NotificationCategory.RENTAL]: withStyle('🔑', Home, 'text-[#F9A825]'),
  [NotificationCategory.ROOMMATE]: withStyle('👥', Users, 'text-[#5D4037]'),
  [NotificationCategory.REAL_ESTATE_SALE]: withStyle('🏢', Building2, 'text-[#78909C]'),
  [NotificationCategory.FOR_SALE]: withStyle('🏷️', Tag, 'text-[#C62828]'),
  [NotificationCategory.WANTED]: withStyle('🔍', Search, 'text-[#8D6E63]'),
  [NotificationCategory.FREE_DONATE]: withStyle('🎁', Gift, 'text-[#C62828]'),
  [NotificationCategory.CARS]: withStyle('🚗', CarFront, 'text-[#1565C0]'),
  [NotificationCategory.CARPOOL]: withStyle('🚘', MapPin, 'text-[#1565C0]'),
  [NotificationCategory.TUTORING]: withStyle('📝', GraduationCap, 'text-[#F9A825]'),
  [NotificationCategory.CHILDCARE]: withStyle('👶', Baby, 'text-[#F9A825]'),
  [NotificationCategory.REPAIR_MAINTENANCE]: withStyle('🔧', Wrench, 'text-[#78909C]'),
  [NotificationCategory.LOST_FOUND]: withStyle('❓', HelpCircle, 'text-[#C62828]'),
  [NotificationCategory.NEWCOMER_HELP]: withStyle('🤝', HandHelping, 'text-[#F9A825]'),
  [NotificationCategory.ANNOUNCEMENTS]: withStyle('📢', Bell, 'text-[#F9A825]'),
  [NotificationCategory.SECOND_HAND]: withStyle('♻️', ShoppingBag, 'text-[#2E7D32]'),
  [NotificationCategory.EDUCATION_LESSONS]: withStyle('📚', BookOpen, 'text-[#283593]'),
  [NotificationCategory.MOM_BABY_KIDS]: withStyle('🍼', Baby, 'text-[#EC407A]'),
  [NotificationCategory.PETS]: withStyle('🐾', PawPrint, 'text-[#6D4C41]'),
  [NotificationCategory.MUTUAL_AID]: withStyle('💛', HeartHandshake, 'text-[#F9A825]'),
  [NotificationCategory.TRAVEL_VISA]: withStyle('✈️', Plane, 'text-[#0288D1]'),
  [NotificationCategory.IMMIGRATION]: withStyle('🛂', Stamp, 'text-[#5D4037]'),
};

export const ALL_CATEGORY_STYLE: CategoryCardStyle = {
  emoji: '🌍',
  icon: Globe,
  textColor: 'text-[#1565C0]',
};

export const COMPANY_ALL_CATEGORY_STYLE: CategoryCardStyle = {
  emoji: '🏢',
  icon: Building2,
  textColor: 'text-primary',
};

export const ANNOUNCEMENT_ALL_CATEGORY_STYLE: CategoryCardStyle = {
  emoji: '📢',
  icon: Megaphone,
  textColor: 'text-[#FF3A00]',
};

export function getCategoryToneStyle(textColor: string) {
  const hex = getIconHex(textColor);
  return {
    color: hex,
    backgroundColor: `${hex}14`,
    borderColor: `${hex}28`,
  };
}
