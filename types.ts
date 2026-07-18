
export enum CategoryType {
  HEALTH = 'Health',
  FOOD_DRINK = 'Food & Drink',
  PRESS_MEDIA = 'Press & Media',
  PRINT_GRAPHICS = 'Printing & Graphics',
  ASSOCIATION_FOUNDATION = 'Association & Foundation',
  ECOMMERCE = 'E-Commerce',
  EDUCATION_CONSULTANCY = 'Education & Consultancy',
  DRIVING_SCHOOL = 'Driving School',
  REAL_ESTATE = 'Real Estate',
  EVENTS_ORG = 'Events & Organization',
  PHOTO_VIDEO = 'Photo & Video',
  CLOTHING_TEXTILE = 'Clothing & Textile',
  LAW_IMMIGRATION = 'Law & Immigration',
  CONSTRUCTION_REPAIR = 'Construction & Repair',
  BEAUTY_COSMETICS = 'Beauty & Cosmetics',
  JEWELRY_DESIGN = 'Jewelry Design',
  LOGISTICS_TRANSPORT = 'Logistics & Transport',
  MACHINERY_EQUIPMENT = 'Machinery & Equipment',
  FURNITURE_DECORATION = 'Furniture & Decoration',
  ACCOUNTING_FINANCE = 'Accounting & Finance',
  MUSIC_ART = 'Music & Art',
  NETWORK_COMPUTER = 'Network & Computer',
  HOTEL_ACCOMMODATION = 'Hotel & Accommodation',
  AUTOMOTIVE = 'Automotive',
  PACKAGING = 'Packaging',
  MONEY_TRANSFER = 'Money Transfer',
  ADVERTISING_MARKETING = 'Advertising',
  INSURANCE = 'Insurance',
  SPORTS = 'Sports',
  TELECOM = 'Telecom',
  CLEANING_PEST = 'Cleaning',
  TRANSLATION = 'Translation',
  TAILOR_DRYCLEAN = 'Tailor',
  WHOLESALE = 'Wholesale',
  TOURISM_TRAVEL = 'Tourism',
}

export enum NotificationCategory {
  JOB_WANTED = 'Job Wanted',
  JOB_HIRING = 'Job Hiring',
  RENTAL = 'Rental',
  ROOMMATE = 'Roommate',
  REAL_ESTATE_SALE = 'Real Estate Sale',
  FOR_SALE = 'For Sale',
  WANTED = 'Wanted',
  FREE_DONATE = 'Free & Donate',
  CARS = 'Cars',
  CARPOOL = 'Carpool',
  TUTORING = 'Tutoring',
  CHILDCARE = 'Childcare',
  REPAIR_MAINTENANCE = 'Repair & Maintenance',
  LOST_FOUND = 'Lost & Found',
  NEWCOMER_HELP = 'Newcomer Help',
  ANNOUNCEMENTS = 'Announcements',
  SECOND_HAND = 'Second Hand',
  EDUCATION_LESSONS = 'Education & Lessons',
  MOM_BABY_KIDS = 'Mom, Baby & Kids',
  PETS = 'Pets',
  MUTUAL_AID = 'Mutual Aid & Support',
  TRAVEL_VISA = 'Travel & Visa',
  IMMIGRATION = 'Immigration',
}

export type CanadianRegion =
  | 'ON'
  | 'QC'
  | 'AB'
  | 'BC'
  | 'MB'
  | 'SK'
  | 'NS'
  | 'NB'
  | 'NL'
  | 'PE';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

export interface Business {
  id: string;
  ownerId?: string;
  name: string;
  category: CategoryType;
  address: string;
  phone: string;
  description: string;
  imageUrl: string;
  gallery?: string[];
  rating: number;
  reviews: Review[];
  viewCount: number;
  verified: boolean;
  addedBy: 'user' | 'admin';
  latitude?: number;
  longitude?: number;
  region?: CanadianRegion;
  province?: string;
  socialLinks?: import('./lib/businessSocialMedia').BusinessSocialLinks;
}

export interface BusinessMessage {
  id: string;
  businessId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  receiverId: string;
  type?: 'text' | 'image';
  imageUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  category: NotificationCategory;
  description: string;
  price?: string;
  contactInfo?: string;
  imageUrl?: string;
  gallery?: string[];
  date: string;
  createdAt: number;
  userId: string;
  approved: boolean;
  location?: string;
  latitude?: number;
  longitude?: number;
  region?: CanadianRegion;
}

export interface BannerAd {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  link: string;
  active: boolean;
}

export interface AdminBroadcast {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  organizer: string;
  approved: boolean;
  latitude?: number;
  longitude?: number;
  region?: CanadianRegion;
}

export interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

export enum PlaceCategory {
  FAMILY = 'Family',
  NATURE = 'Nature',
  HERITAGE = 'Heritage',
  CULTURE = 'Culture',
  CITY = 'City',
  ADVENTURE = 'Adventure',
}

export interface PlaceToVisit {
  id?: string;
  name: string;
  province: string;
  img: string;
  address?: string;
  howToGet?: string;
  howToGetTr?: string;
  tips?: string;
  tipsTr?: string;
  price?: string;
  priceTr?: string;
  parking?: string;
  parkingTr?: string;
  website?: string;
  gallery?: string[];
  category?: PlaceCategory;
  approved?: boolean;
  createdAt?: number;
  region?: CanadianRegion;
}

export interface TravelerRecommendation {
  id: string;
  title: string;
  userName: string;
  description: string;
  media: MediaItem[];
  location: string;
  date: string;
  approved: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'user' | 'admin' | 'owner';
  content: string;
  timestamp: number;
  userId?: string;
  type?: 'text' | 'image';
  imageUrl?: string;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  memberCount: number;
  imageUrl?: string;
  region?: CanadianRegion;
}

export interface CommunityMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string;
  content: string;
  timestamp: number;
  type: 'text' | 'image';
  imageUrl?: string;
}

export interface NotificationMessage {
  id: string;
  notifId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: number;
  read: boolean;
  type?: 'text' | 'image';
  imageUrl?: string;
}

export interface FlyerItem {
  nameTr: string;
  nameEn: string;
  oldPrice: string;
  newPrice: string;
}

export interface Flyer {
  id: string;
  titleTr: string;
  titleEn: string;
  badgeTr: string;
  badgeEn: string;
  savings: string;
  items: FlyerItem[];
  themeColor: string;
  badgeColor: string;
  dateRangeTr: string;
  dateRangeEn: string;
  images: string[];
  createdAt: number;
}

