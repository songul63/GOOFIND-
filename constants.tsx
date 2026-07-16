
import { CategoryType, Business, NotificationCategory, Notification, Event, TravelerRecommendation, BannerAd, ChatMessage, Community, Flyer, PlaceCategory } from './types';
import { COMMUNITY_COVER_IMAGES } from './lib/communityCoverImages';

const RAW_COMMUNITIES: Community[] = [
  {
    id: 'all',
    name: 'ALL',
    slug: 'all',
    description: 'All Turkish communities in Canada.',
    memberCount: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'toronto',
    name: 'Toronto',
    slug: 'toronto',
    description: 'Central Toronto community hub for all neighborhoods.',
    memberCount: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1510253401511-370c97800c0f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'north-york',
    name: 'North York',
    slug: 'north-york',
    description: 'Connect with the vibrant Turkish community in North York.',
    memberCount: 840,
    imageUrl: 'https://images.unsplash.com/photo-1549247413-4315f606a4bc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mississauga',
    name: 'Mississauga',
    slug: 'mississauga',
    description: 'Peel Region community and networking hub.',
    memberCount: 980,
    imageUrl: 'https://images.unsplash.com/photo-1551322019-335606d2003c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'brampton',
    name: 'Brampton',
    slug: 'brampton',
    description: 'Turkish community group in Brampton area.',
    memberCount: 380,
    imageUrl: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'richmond-hill',
    name: 'Richmond Hill',
    slug: 'richmond-hill',
    description: 'York Region connection for Richmond Hill residents.',
    memberCount: 520,
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'markham',
    name: 'Markham',
    slug: 'markham',
    description: 'Markham and surrounding York Region community.',
    memberCount: 440,
    imageUrl: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'oakville',
    name: 'Oakville',
    slug: 'oakville',
    description: 'Oakville Turkish network for residents and families.',
    memberCount: 290,
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'burlington',
    name: 'Burlington',
    slug: 'burlington',
    description: 'Burlington area community hub.',
    memberCount: 260,
    imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'hamilton',
    name: 'Hamilton',
    slug: 'hamilton',
    description: 'Hamilton and Dundas region Turkish hub.',
    memberCount: 410,
    imageUrl: 'https://images.unsplash.com/photo-1447933630983-ca4467f56bc9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'vaughan',
    name: 'Vaughan',
    slug: 'vaughan',
    description: 'Vaughan and Woodbridge connection.',
    memberCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'aurora',
    name: 'Aurora',
    slug: 'aurora',
    description: 'Aurora Turkish community in York Region.',
    memberCount: 220,
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'oshawa',
    name: 'Oshawa',
    slug: 'oshawa',
    description: 'Durham Region connection for Oshawa residents.',
    memberCount: 190,
    imageUrl: 'https://images.unsplash.com/photo-1441260037373-ca546f393843?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'london',
    name: 'London',
    slug: 'london-on',
    description: 'London Ontario community for news and events.',
    memberCount: 340,
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'niagara',
    name: 'Niagara Falls',
    slug: 'niagara',
    description: 'Niagara Region Turkish residents group.',
    memberCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1490682143124-b7327386962b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'guelph',
    name: 'Guelph',
    slug: 'guelph',
    description: 'Guelph and surrounding area network.',
    memberCount: 150,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'barrie',
    name: 'Barrie',
    slug: 'barrie',
    description: 'Barrie and Simcoe County connection.',
    memberCount: 180,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'waterloo',
    name: 'Waterloo',
    slug: 'waterloo',
    description: 'Waterloo city Turkish community hub.',
    memberCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'king',
    name: 'King',
    slug: 'king',
    description: 'King Township Turkish community in York Region.',
    memberCount: 140,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'stouffville',
    name: 'Stouffville',
    slug: 'stouffville',
    description: 'Whitchurch-Stouffville area Turkish network.',
    memberCount: 165,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'newmarket',
    name: 'Newmarket',
    slug: 'newmarket',
    description: 'Newmarket Turkish community in York Region.',
    memberCount: 230,
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ajax',
    name: 'Ajax',
    slug: 'ajax',
    description: 'Ajax Durham Region Turkish community hub.',
    memberCount: 195,
    imageUrl: 'https://images.unsplash.com/photo-1441260037373-ca546f393843?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pickering',
    name: 'Pickering',
    slug: 'pickering',
    description: 'Pickering area Turkish residents group.',
    memberCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'whitby',
    name: 'Whitby',
    slug: 'whitby',
    description: 'Whitby Durham Region Turkish community.',
    memberCount: 185,
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'kitchener',
    name: 'Kitchener',
    slug: 'kitchener',
    description: 'Kitchener Turkish community in Waterloo Region.',
    memberCount: 275,
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'cambridge',
    name: 'Cambridge',
    slug: 'cambridge',
    description: 'Cambridge area Turkish network and events.',
    memberCount: 200,
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'brantford',
    name: 'Brantford',
    slug: 'brantford',
    description: 'Brantford Turkish community connection.',
    memberCount: 155,
    imageUrl: 'https://images.unsplash.com/photo-1447933630983-ca4467f56bc9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'st-catharines',
    name: 'St. Catharines',
    slug: 'st-catharines',
    description: 'St. Catharines Niagara Region Turkish hub.',
    memberCount: 240,
    imageUrl: 'https://images.unsplash.com/photo-1490682143124-b7327386962b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'milton',
    name: 'Milton',
    slug: 'milton',
    description: 'Milton Halton Region Turkish community.',
    memberCount: 220,
    imageUrl: 'https://images.unsplash.com/photo-1551322019-335606d2003c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'caledon',
    name: 'Caledon',
    slug: 'caledon',
    description: 'Caledon Peel Region Turkish residents group.',
    memberCount: 130,
    imageUrl: 'https://images.unsplash.com/photo-1503424886307-b090341d25d1?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'peterborough',
    name: 'Peterborough',
    slug: 'peterborough',
    description: 'Peterborough area Turkish community hub.',
    memberCount: 145,
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'dufferin-county',
    name: 'Dufferin County',
    slug: 'dufferin-county',
    description: 'Dufferin County Turkish community network.',
    memberCount: 120,
    imageUrl: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'georgina',
    name: 'Georgina',
    slug: 'georgina',
    description: 'Georgina Lake Simcoe Turkish community.',
    memberCount: 135,
    imageUrl: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'east-gwillimbury',
    name: 'East Gwillimbury',
    slug: 'east-gwillimbury',
    description: 'East Gwillimbury York Region Turkish network.',
    memberCount: 125,
    imageUrl: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=400&q=80'
  }
];

export const INITIAL_COMMUNITIES: Community[] = RAW_COMMUNITIES.map((community) => ({
  ...community,
  imageUrl: COMMUNITY_COVER_IMAGES[community.id] || community.imageUrl,
}));

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    senderId: 'admin_1',
    senderName: 'Admin',
    senderRole: 'admin',
    content: 'Hello! How can I help you today?',
    timestamp: Date.now() - 3600000
  },
  {
    id: 'm2',
    senderId: 'u1',
    senderName: 'Mehmet',
    senderRole: 'user',
    content: 'Hello, I want to list my company but I have some questions about the categories.',
    timestamp: Date.now() - 1800000
  }
];

export const INITIAL_BUSINESSES: Business[] = [
  // --- RESTAURANTS ---
  {
    id: '1',
    name: 'Anatolia Restaurant',
    category: CategoryType.FOOD_DRINK,
    address: '5112 Dundas St W, Etobicoke, ON M9A 1C2',
    phone: '(416) 231-1187',
    description: 'Traditional Turkish cuisine in a warm, low-key setting with kilims and patterned tiles.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: [],
    viewCount: 1250,
    verified: true,
    addedBy: 'admin'
  },
  {
    id: 'r2',
    name: 'Pide 21',
    category: CategoryType.FOOD_DRINK,
    address: '1720 Eglinton Ave E, North York, ON M4A 1J7',
    phone: '(416) 759-7433',
    description: 'The best authentic Turkish Pide and Lahmacun experience in Toronto.',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: [],
    viewCount: 920,
    verified: true,
    addedBy: 'admin'
  },
  {
    id: 'r3',
    name: 'Mustafa Turkish Kitchen',
    category: CategoryType.FOOD_DRINK,
    address: '866 Wilson Ave, North York, ON M3K 1E5',
    phone: '(416) 631-0300',
    description: 'Specializing in wood-fire grilled kebabs and fresh pide.',
    imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: [],
    viewCount: 1100,
    verified: true,
    addedBy: 'admin'
  },

  // --- HEALTHCARE ---
  {
    id: '2',
    name: 'Dr. Selin Yilmaz - Family Medicine',
    category: CategoryType.HEALTH,
    address: '123 Medical Dr, North York, ON M2N 5N5',
    phone: '(416) 555-0101',
    description: 'Bilingual family physician dedicated to serving the Turkish-Canadian community.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71f1e59816?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: [],
    viewCount: 840,
    verified: true,
    addedBy: 'admin'
  },

  // --- LEGAL ---
  {
    id: 'l1',
    name: 'Cihan Legal Services',
    category: CategoryType.LAW_IMMIGRATION,
    address: '100 Adelaide St W, Toronto, ON M5H 1S3',
    phone: '(416) 555-2233',
    description: 'Specializing in immigration law, business law, and civil litigation.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: [],
    viewCount: 450,
    verified: true,
    addedBy: 'admin'
  },

  // --- GROCERY ---
  {
    id: 'g1',
    name: 'Marche Istanbul',
    category: CategoryType.WHOLESALE,
    address: '3220 Dufferin St, North York, ON M6A 2T3',
    phone: '(416) 782-3555',
    description: 'Your premium source for Turkish groceries, dairy, and freshly baked goods.',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: [],
    viewCount: 2200,
    verified: true,
    addedBy: 'admin'
  },
  {
    id: 'g2',
    name: 'Vatan Grocery',
    category: CategoryType.WHOLESALE,
    address: '111 Corporate Dr, Scarborough, ON M1H 3H9',
    phone: '(416) 290-0033',
    description: 'Authentic Turkish products, halva, olives, and premium tea brands.',
    imageUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: [],
    viewCount: 1500,
    verified: true,
    addedBy: 'admin'
  },

  // --- LOGISTICS ---
  {
    id: 'log1',
    name: 'Maple Leaf Moving & Storage',
    category: CategoryType.LOGISTICS_TRANSPORT,
    address: 'Served: GTA & Beyond',
    phone: '(647) 555-7788',
    description: 'Professional moving services with a dedicated Turkish team. Residential and commercial.',
    imageUrl: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: [],
    viewCount: 680,
    verified: true,
    addedBy: 'admin'
  },

  // --- SERVICES ---
  {
    id: '7',
    name: 'Golden Scissors Barber',
    category: CategoryType.BEAUTY_COSMETICS,
    address: '456 Queen St W, Toronto, ON M5V 2A8',
    phone: '(416) 555-4321',
    description: 'Master Turkish barbers specializing in traditional straight-razor shaves.',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: [],
    viewCount: 310,
    verified: true,
    addedBy: 'admin'
  },
  {
    id: '8',
    name: 'Silk Road Tailors',
    category: CategoryType.TAILOR_DRYCLEAN,
    address: '789 Bloor St W, Toronto, ON M6G 1L6',
    phone: '(416) 555-8899',
    description: 'Expert alterations and custom tailoring with Istanbul heritage.',
    imageUrl: 'https://images.unsplash.com/photo-1520033100230-0370f1a94183?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: [],
    viewCount: 180,
    verified: true,
    addedBy: 'user'
  },

  // --- REAL ESTATE ---
  {
    id: 're1',
    name: 'Aydin Real Estate Group',
    category: CategoryType.REAL_ESTATE,
    address: 'Mississauga, ON',
    phone: '(905) 555-1234',
    description: 'Helping Turkish families find their dream home in Ontario for over 15 years.',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: [],
    viewCount: 950,
    verified: true,
    addedBy: 'admin'
  },

  // --- ACCOUNTING ---
  {
    id: 'acc1',
    name: 'Yildiz Tax & Accounting',
    category: CategoryType.ACCOUNTING_FINANCE,
    address: 'Richmond Hill, ON',
    phone: '(416) 555-9900',
    description: 'Personal and corporate tax services, bookkeeping, and business consulting.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-169641357599?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: [],
    viewCount: 320,
    verified: true,
    addedBy: 'admin'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Looking for Waitstaff',
    category: NotificationCategory.JOB_HIRING,
    description: 'Busy Turkish cafe in Toronto needs experienced waitstaff. Must speak Turkish and English.',
    contactInfo: 'hr@turkishcafe.ca',
    date: '2023-11-20',
    createdAt: Date.now() - 100000,
    userId: 'u1',
    approved: true
  },
  {
    id: 'n2',
    title: '2BR Apartment for Rent in Toronto',
    category: NotificationCategory.RENTAL,
    description: 'Clean, spacious 2BR near Metro. $1800/month. Perfect for new immigrants.',
    price: '$1800',
    contactInfo: '416-555-0123',
    date: '2023-11-21',
    createdAt: Date.now() - 50000,
    userId: 'u2',
    approved: true
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Toronto Turkish Festival',
    date: '2024-07-15',
    location: 'Nathan Phillips Square, Toronto',
    description: 'Join us for a weekend of Turkish food, music, and dance in the heart of Toronto.',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    organizer: 'Turkish Culture Society',
    approved: true
  },
  {
    id: 'e2',
    title: 'Business Networking Night',
    date: '2024-12-05',
    location: 'Downtown Toronto',
    description: 'An evening for Turkish entrepreneurs in GTA to connect and collaborate.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    organizer: 'Turkish Canadian Chamber of Commerce',
    approved: true
  },
  {
    id: 'e3',
    title: 'Turkish Movie Night',
    date: '2024-11-15',
    location: 'North York Central Library',
    description: 'Come watch a classic Turkish film with the community. Popcorn and tea will be provided.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    organizer: 'Turkish Arts Center',
    approved: true
  },
  {
    id: 'e4',
    title: 'Children\'s Day Celebration',
    date: '2025-04-23',
    location: 'High Park, Toronto',
    description: 'Celebrating International Children\'s Day with games, music, and workshops for kids.',
    imageUrl: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=800&q=80',
    organizer: 'Turkish Community Federation',
    approved: true
  },
  {
    id: 'e5',
    title: 'Turkish Breakfast Meetup',
    date: '2024-10-20',
    location: 'Mississauga Lakeside Park',
    description: 'A casual morning gathering for a traditional Turkish breakfast by the lake.',
    imageUrl: 'https://images.unsplash.com/photo-1598514538064-f7a1ec85140e?auto=format&fit=crop&w=800&q=80',
    organizer: 'Peel Turkish Network',
    approved: true
  },
  {
    id: 'e6',
    title: 'Turkish Language Workshop',
    date: '2024-11-30',
    location: 'University of Guelph',
    description: 'A beginner-friendly workshop for those wanting to learn or improve their Turkish language skills.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    organizer: 'Guelph Turkish Student Association',
    approved: true
  },
  {
    id: 'e7',
    title: 'Youth Soccer Tournament',
    date: '2025-06-12',
    location: 'L\'Amoreaux Sports Complex, Scarborough',
    description: 'Community soccer tournament for youth ages 12-18. Medals and trophies for winners!',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    organizer: 'Scarborough Turkish Sports Club',
    approved: true
  },
  {
    id: 'e8',
    title: 'Turkish Folk Dance Class',
    date: '2024-10-25',
    location: 'Vaughan Community Centre',
    description: 'Learn the basics of traditional Turkish folk dances. All levels welcome.',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    organizer: 'Vaughan Turkish Arts Heritage',
    approved: true
  },
  {
    id: 'e9',
    title: 'Newcomer Orientation Seminar',
    date: '2024-11-05',
    location: 'Online via Zoom',
    description: 'Everything you need to know about life in Ontario: Housing, healthcare, and employment.',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
    organizer: 'Turkish Canadian Support Services',
    approved: true
  }
];

export const INITIAL_TRAVELER_RECOMMENDATIONS: TravelerRecommendation[] = [
  {
    id: 'tr1',
    title: 'The Stunning Niagara Falls',
    userName: 'Emre Can',
    description: 'Breathtaking views, especially during sunset. A must-visit for everyone in Ontario.',
    media: [{ url: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=800&q=80', type: 'image' }],
    location: 'Niagara Falls, ON',
    date: '2024-05-10',
    approved: true
  },
  {
    id: 'tr2',
    title: 'Old Quebec City Charm',
    userName: 'Ayşe Yılmaz',
    description: 'Felt like I was in Europe! The cobblestone streets and historical architecture are magical.',
    media: [{ url: 'https://images.unsplash.com/photo-1598282361091-a1d227419139?auto=format&fit=crop&w=800&q=80', type: 'image' }],
    location: 'Quebec City, QC',
    date: '2024-03-22',
    approved: true
  }
];

export const INITIAL_BANNERS: BannerAd[] = [
  {
    id: 'b1',
    title: 'Turkish Airlines - Special Offers',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    link: 'https://turkishairlines.com',
    active: true
  },
  {
    id: 'b2',
    title: 'Istanbul Market - Fresh Daily',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    link: '#',
    active: true
  },
  {
    id: 'b3',
    title: 'Real Estate Opportunities 2024',
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    link: '#',
    active: true
  }
];

export const INITIAL_FLYERS: Flyer[] = [
  {
    id: 'f1',
    titleTr: "Süpermarket & Gıda Fırsatları",
    titleEn: "Supermarket & Turkish Grocery Deals",
    badgeTr: "HAFTALIK AKTÜEL",
    badgeEn: "WEEKLY DEALS",
    savings: "35%",
    items: [
      { nameTr: "Çaykur Rize Turist Çayı (1kg)", nameEn: "Caykur Black Rize Tea (1kg)", oldPrice: "$18.99", newPrice: "$12.99" },
      { nameTr: "Sera Siyah Zeytin L-Boy (900g)", nameEn: "Sera Black Olives L-Size (900g)", oldPrice: "$14.50", newPrice: "$9.99" },
      { nameTr: "Tadım Bol Tuzlu Ayçekirdeği", nameEn: "Tadim Salted Sunflower Seeds", oldPrice: "$4.99", newPrice: "$3.49" }
    ],
    themeColor: "bg-red-600",
    badgeColor: "bg-yellow-400 text-red-950",
    dateRangeTr: "25 May - 31 May",
    dateRangeEn: "May 25 - May 31",
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=600"
    ],
    createdAt: 1716624000
  },
  {
    id: 'f2',
    titleTr: "Ev, Tekstil & Mutfak Kampanyası",
    titleEn: "Home, Textile & Kitchen Specials",
    badgeTr: "BÜYÜK FIRSAT",
    badgeEn: "HOT OFFER",
    savings: "40%",
    items: [
      { nameTr: "Paşabahçe İnce Belli Çay Seti", nameEn: "Pasabahce 12pc Tea Glass Set", oldPrice: "$29.99", newPrice: "$17.99" },
      { nameTr: "Saray Halı Anadolu Desen Yolluk", nameEn: "Anatolian Traditional Runner Rug", oldPrice: "$89.00", newPrice: "$54.00" },
      { nameTr: "Arzum Türk Kahvesi Makinesi", nameEn: "Arzum Turkish Coffee Maker", oldPrice: "$149.00", newPrice: "$99.00" }
    ],
    themeColor: "bg-amber-500",
    badgeColor: "bg-red-600 text-white",
    dateRangeTr: "25 May - 05 Haz",
    dateRangeEn: "May 25 - Jun 05",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600"
    ],
    createdAt: 1716624001
  },
  {
    id: 'f3',
    titleTr: "Yerel Esnaf & Hizmet Flyer'ı",
    titleEn: "Local Services & Business Booklet",
    badgeTr: "İŞ BİRLİĞİ",
    badgeEn: "PARTNERSHIP",
    savings: "25%",
    items: [
      { nameTr: "Erkek Saç Kesimi & Sakal (Berber)", nameEn: "Men's Barber Haircut & Shave", oldPrice: "$45.00", newPrice: "$30.00" },
      { nameTr: "Havaalanı Özel VIP Transfer", nameEn: "Toronto Airport VIP Shuttle", oldPrice: "$120.00", newPrice: "$95.00" },
      { nameTr: "Göçmenlik Danışmanlık Seansı", nameEn: "Immigration Consulting Session", oldPrice: "$150.00", newPrice: "$110.00" }
    ],
    themeColor: "bg-emerald-600",
    badgeColor: "bg-yellow-300 text-emerald-950",
    dateRangeTr: "Özel Tarife",
    dateRangeEn: "Special Rates",
    images: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1585747860715-2da37e73522b?auto=format&fit=crop&q=80&w=600"
    ],
    createdAt: 1716624002
  }
];

export const INITIAL_PLACES = [
  { 
    id: 'p1',
    name: 'CN Tower', 
    province: 'Toronto, ON', 
    img: 'https://images.unsplash.com/photo-1551322019-335606d2003c?auto=format&fit=crop&w=400&q=80',
    address: '290 Bremner Blvd, Toronto, ON M5V 3L9',
    howToGet: 'Take the TTC to Union Station, follow signs for SkyWalk.',
    howToGetTr: 'TTC ile Union Station durağına gelin, SkyWalk tabelalarını takip edin.',
    tips: 'Book ahead! Avoid weekends for shorter lines. Bring a camera.',
    tipsTr: 'Önceden rezervasyon yapın! Hafta sonlarından kaçının. Kamera getirmeyi unutmayın.',
    price: 'Starting from $45',
    priceTr: '45$\'dan başlayan fiyatlarla',
    parking: 'Paid underground parking available nearby.',
    parkingTr: 'Yakınlarda ücretli yer altı otoparkı mevcut.',
    category: PlaceCategory.CITY,
  },
  { 
    id: 'p2',
    name: 'Niagara Falls', 
    province: 'Niagara, ON', 
    img: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=400&q=80',
    address: 'Niagara Falls, ON L2G 3Y9',
    howToGet: 'GO Train/Bus from Union Station or a 1.5-hour drive.',
    howToGetTr: 'Union Station\'dan GO Treni/Otobüsü veya 1.5 saatlik sürüş mesafesi.',
    tips: 'Bring a raincoat or waterproof poncho. Night lighting is beautiful.',
    tipsTr: 'Yağmurluk veya su geçirmez panço getirin. Gece ışıklandırması muhteşemdir.',
    price: 'Viewing is free, attractions cost extra',
    priceTr: 'İzlemek ücretsiz, etkinlikler ücretlidir',
    parking: 'Expensive lots near the falls. Cheaper lots further away.',
    parkingTr: 'Şelale yakınındaki otoparklar pahalıdır. Uzaklarda daha ucuz yerler var.',
    category: PlaceCategory.NATURE,
  },
  { 
    id: 'p3',
    name: 'Distillery District', 
    province: 'Toronto, ON', 
    img: 'https://images.unsplash.com/photo-1549247413-4315f606a4bc?auto=format&fit=crop&w=400&q=80',
    address: '55 Mill St, Toronto, ON M5A 3C4',
    howToGet: 'TTC Streetcar 504 King east to Parliament.',
    howToGetTr: 'Doğu yönüne giden TTC King 504 tramvayı ile Parliament durağı.',
    tips: 'Great for photography. Many galleries and boutiques.',
    tipsTr: 'Fotoğrafçılık için harika. Birçok galeri ve butik bulunuyor.',
    price: 'Free entry to district',
    priceTr: 'Giriş ücretsiz',
    parking: 'Paid street parking and lots available nearby.',
    parkingTr: 'Yakınlarda ücretli yol üstü park yerleri ve otoparklar mevcut.',
    category: PlaceCategory.CULTURE,
  },
  { 
    id: 'p4',
    name: 'Casa Loma', 
    province: 'Toronto, ON', 
    img: 'https://images.unsplash.com/photo-1579224422204-749e75558102?auto=format&fit=crop&w=400&q=80',
    address: '1 Austin Terrace, Toronto, ON M5R 1X8',
    howToGet: 'Short walk from Dupont Subway Station.',
    howToGetTr: 'Dupont Metro durağından kısa bir yürüyüş mesafesinde.',
    tips: 'Explore the tunnels and secret passages.',
    tipsTr: 'Tünelleri ve gizli geçitleri keşfedin.',
    price: 'Around $30',
    priceTr: 'Yaklaşık 30$',
    parking: 'On-site paid parking available.',
    parkingTr: 'Alan içinde ücretli otopark mevcut.',
    category: PlaceCategory.HERITAGE,
  },
  { 
    id: 'p5',
    name: 'Toronto Islands', 
    province: 'Toronto, ON', 
    img: 'https://images.unsplash.com/photo-1510253401511-370c97800c0f?auto=format&fit=crop&w=400&q=80',
    address: 'Jack Layton Ferry Terminal, Toronto, ON',
    howToGet: 'Ferry from Jack Layton Terminal at the foot of Bay St.',
    howToGetTr: 'Bay St. sonundaki Jack Layton Terminali\'nden feribot ile.',
    tips: 'Great skyline views. Rent a bike on the island.',
    tipsTr: 'Harika şehir silüeti manzarası. Adada bir bisiklet kiralayın.',
    price: 'Ferry ticket: ~$9 round trip',
    priceTr: 'Feribot bileti: ~9$ gidiş-dönüş',
    parking: 'No cars on island. Park near harborfront.',
    parkingTr: 'Adada araba yasak. Harborfront yakınlarına park edin.',
    category: PlaceCategory.FAMILY,
  },
  { 
    id: 'p6',
    name: 'Royal Ontario Museum', 
    province: 'Toronto, ON', 
    img: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=400&q=80',
    address: '100 Queens Park, Toronto, ON M5S 2C6',
    howToGet: 'Saint George or Museum Subway Stations.',
    howToGetTr: 'Saint George veya Museum Metro durakları.',
    tips: 'Check for free admission nights (third Tuesday).',
    tipsTr: 'Ücretsiz giriş gecelerini takip edin (üçüncü Salı).',
    price: 'Around $23',
    priceTr: 'Yaklaşık 23$',
    parking: 'Nearby paid lots and street parking.',
    parkingTr: 'Yakınlarda ücretli otoparklar ve yol üstü park yerleri.',
    category: PlaceCategory.CULTURE,
  }
];

