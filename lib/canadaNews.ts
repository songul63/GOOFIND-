import { BannerAd } from '../types';

export type CanadaNewsItem = {
  id?: string | number;
  title: string;
  desc?: string;
  content?: string;
  category?: string;
  link?: string;
  url?: string;
  color?: string;
};

export type BannerCarouselItem = {
  id: string;
  title: string;
  desc: string;
  content: string;
  category: string;
  url: string;
  type: 'news' | 'ad';
  mediaType: 'image' | 'video';
  link: string;
  active: boolean;
  isLiveNews?: boolean;
};

const DEFAULT_NEWS_IMAGE =
  'https://images.unsplash.com/photo-1503424886307-b090341d25d1?auto=format&fit=crop&w=1200&q=80';

const CATEGORY_IMAGES: { match: string[]; url: string }[] = [
  {
    match: ['immig', 'göç', 'visa', 'vize'],
    url: 'https://images.unsplash.com/photo-1544013589-444e26c6d044?auto=format&fit=crop&w=1200&q=80',
  },
  {
    match: ['econ', 'fin', 'ekon', 'para', 'grant', 'hibe', 'business', 'iş'],
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
  {
    match: ['comm', 'topluluk', 'cult', 'kült', 'event', 'etkinlik', 'festival'],
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
  },
];

export function imageForNewsCategory(category?: string): string {
  const cat = (category || '').toLowerCase();
  const found = CATEGORY_IMAGES.find((entry) => entry.match.some((token) => cat.includes(token)));
  return found?.url || DEFAULT_NEWS_IMAGE;
}

export function getDefaultCanadaNews(lang: 'en' | 'tr'): CanadaNewsItem[] {
  if (lang === 'en') {
    return [
      {
        id: 'fallback-trade',
        title: 'Last day: Canada–Türkiye FTA comments',
        desc: 'Email or mail still accepted while the page says Open.',
        content:
          'Today, September 14, 2026, is still the last day to comment on a potential Canada–Türkiye free trade agreement. Global Affairs Canada marks the consultation Open through today (July 31–September 14) and still accepts comments by email to TCE-consultations@international.gc.ca or by mail to the Trade Negotiations Division, 111 Sussex Drive, Ottawa. It is asking for views from the Canadian public, MSMEs, industry associations, labour unions, Indigenous Peoples, and students on goods, services, labour rights, and environmental protection. In 2025 two-way merchandise trade was over CA$4.3 billion. That input, the department says, will inform Canada’s FTA negotiations with Türkiye.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-trades',
        title: 'Express Entry 2026: trade occupations',
        desc: 'Electricians, plumbers, and carpenters remain eligible.',
        content:
          'IRCC’s current Express Entry category-based rounds still include trade occupations. Eligible candidates generally need at least 12 months of full-time experience (or equal part-time) in the past three years in a single listed occupation — in Canada or abroad; the experience does not need to be continuous. The current list includes electricians, industrial electricians, plumbers, carpenters, welders, HVAC mechanics, construction managers, machinists, and butchers (retail and wholesale). IRCC has said trades such as carpenters, plumbers, and machinists, including construction work that can help with housing, remain a 2026 labour-shortage priority. Turkish-community applicants in these fields should keep NOC codes and Express Entry profiles current — IRCC publishes each round after it runs.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Sunday 12 p.m.–8 p.m.: Turkish coffee, baklava, and music.',
        content:
          'Anatolia Fest’s 3rd edition is this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square (formerly Yonge-Dundas Square) in downtown Toronto. Hosted by kutuphane.ca, the free cultural festival brings Turkish coffee, baklava, crafts, music, and regional art. It is a reunion for the Turkish-Canadian community and a welcoming day for newcomers looking to meet neighbours, families, and local businesses.',
        category: 'Community',
        color: 'bg-primary',
        link: 'https://www.anatoliafest.ca/',
      },
    ];
  }

  return [
    {
      id: 'fallback-trade',
      title: 'Son gün: Kanada–Türkiye STA görüşleri',
      desc: 'Sayfa Açık olduğu sürece e-posta veya mektup hâlâ kabul ediliyor.',
      content:
        'Bugün, 14 Eylül 2026, olası bir Kanada–Türkiye serbest ticaret anlaşması için görüş bildirmenin hâlâ son günü. Küresel İşler Kanada istişareyi bugüne kadar Açık gösteriyor (31 Temmuz–14 Eylül) ve yorumları TCE-consultations@international.gc.ca adresine e-posta veya Ticaret Müzakereleri Birimi, 111 Sussex Drive, Ottawa adresine mektupla kabul ediyor. Bakanlık Kanada kamuoyu, KOBİ’ler, sektör birlikleri, sendikalar, Yerli halklar ve öğrencilerden mal, hizmet, çalışma hakları ve çevre koruması üzerine görüş istiyor. 2025’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı. Bakanlık bu katkının Türkiye ile STA müzakerelerini şekillendireceğini belirtiyor.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-trades',
      title: 'Express Entry 2026: nitelikli meslekler',
      desc: 'Elektrikçiler, tesisatçılar ve marangozlar hâlâ uygun.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları nitelikli meslek (trades) kategorisini kapsamaya devam ediyor. Adayların genellikle son üç yılda listelenen tek bir meslekte, Kanada’da veya yurt dışında, en az 12 ay tam zamanlı (veya eşdeğer yarı zamanlı) deneyim göstermesi gerekiyor; deneyimin kesintisiz olması şart değil. Güncel listede elektrikçiler, endüstriyel elektrikçiler, tesisatçılar, marangozlar, kaynakçılar, ısıtma-soğutma (HVAC) teknisyenleri, inşaat yöneticileri, makinistler ve kasaplar (perakende ve toptan) yer alıyor. IRCC, marangoz, tesisatçı ve makinist gibi mesleklerin — konuta katkı sağlayabilecek inşaat işleri dahil — 2026 iş gücü açığı öncelikleri arasında olduğunu belirtti. Bu alanlardaki Türk toplumundaki adayların NOC kodları ve Express Entry profillerini güncel tutması önerilir; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Pazar 12.00–20.00: Türk kahvesi, baklava ve müzik.',
      content:
        'Anatolia Fest’in 3. edisyonu bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de (eski Yonge-Dundas Square) düzenleniyor. kutuphane.ca’nın ev sahipliğindeki ücretsiz kültür festivali Türk kahvesi, baklava, el sanatları, müzik ve yöresel sanatı bir araya getiriyor. Türk-Kanada toplumu için bir buluşma; komşu, aile ve yerel işletmelerle tanışmak isteyen yeni gelenler için de açık bir gün.',
      category: 'Topluluk',
      color: 'bg-primary',
      link: 'https://www.anatoliafest.ca/',
    },
  ];
}

function normalizeTitle(title?: string): string {
  return (title || '').trim().toLowerCase();
}

export function mapNewsToBannerItem(
  news: CanadaNewsItem,
  index: number,
  lang: 'en' | 'tr',
  imageFallback: (title: string, desc?: string) => string,
): BannerCarouselItem {
  const title = news.title?.trim() || (lang === 'en' ? 'Canada update' : 'Kanada gündemi');
  const desc = (news.desc || '').trim();
  return {
    id: String(news.id ?? `live-news-${index}`),
    title,
    desc,
    content: (news.content || '').trim(),
    category: news.category || (lang === 'en' ? 'News' : 'Haber'),
    url: news.url || imageForNewsCategory(news.category) || imageFallback(title, desc),
    type: 'news',
    mediaType: 'image',
    link: news.link || '#',
    active: true,
    isLiveNews: true,
  };
}

export function mapStoredBannerToCarouselItem(banner: BannerAd): BannerCarouselItem {
  const isNews = banner.type === 'news';
  return {
    id: banner.id,
    title: banner.title || '',
    desc: banner.desc || '',
    content: banner.content || '',
    category: banner.category || (isNews ? 'News' : 'Sponsor'),
    url: banner.url || '',
    type: isNews ? 'news' : 'ad',
    mediaType: banner.mediaType || (banner.type === 'video' ? 'video' : 'image'),
    link: banner.link || '#',
    active: banner.active !== false,
    isLiveNews: false,
  };
}

/** Homepage hero: live Canada news first, then approved ads/news, de-duplicated by title. */
export function combineBannerItems(
  activeBanners: BannerAd[],
  liveNews: CanadaNewsItem[],
  includeLiveNews: boolean,
  lang: 'en' | 'tr',
  imageFallback: (title: string, desc?: string) => string,
): BannerCarouselItem[] {
  const stored = activeBanners.map(mapStoredBannerToCarouselItem);
  if (!includeLiveNews) return stored;

  const existingTitles = new Set(stored.map((item) => normalizeTitle(item.title)).filter(Boolean));
  const source = liveNews.length > 0 ? liveNews : getDefaultCanadaNews(lang);

  const liveItems = source
    .filter((item) => item?.title && !existingTitles.has(normalizeTitle(item.title)))
    .slice(0, 3)
    .map((item, index) => mapNewsToBannerItem(item, index, lang, imageFallback));

  return [...liveItems, ...stored];
}
