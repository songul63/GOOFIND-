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
        title: 'Canada–Türkiye FTA now in negotiations',
        desc: 'July 7 launch; public comments ran to 14 September.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement as in negotiations. On July 7, 2026, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. The Government of Canada invited public comments from July 31 to September 14, 2026, to inform those talks. In 2025, two-way merchandise trade reached over CA$4.3 billion (Canadian exports about $1.1 billion; imports from Türkiye about $3.2 billion). Canadian direct investment in Türkiye was $3.3 billion in 2025, up from $1 billion in 2022; Türkiye’s FDI stock in Canada was $233 million — the 24th-largest European source and 54th globally. The Trade Negotiations Division remains at 111 Sussex Drive, Ottawa (TCE-consultations@international.gc.ca).',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-transport',
        title: 'Express Entry 2026: transport occupations',
        desc: 'Pilots, aircraft mechanics, and vehicle technicians remain eligible.',
        content:
          'IRCC’s current Express Entry category-based rounds include transport occupations. Eligible candidates generally need at least 12 months of full-time experience (or equal part-time) in the past three years in a single listed occupation — in Canada or abroad; the experience does not need to be continuous. The current list is aircraft mechanics and aircraft inspectors (NOC 72404), air pilots, flight engineers and flying instructors (72600), aircraft instrument, electrical and avionics mechanics, technicians and inspectors (22313), and automotive service technicians, truck and bus mechanics, and mechanical repairers (72410). IRCC’s February 2026 announcement highlighted pilots, aircraft mechanics, and inspectors among 2026 labour-shortage priorities. Turkish-community applicants in these fields should keep NOC codes and Express Entry profiles current — IRCC publishes each round after it runs.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Sunday 12 p.m.–8 p.m. at 1 Dundas Street East, Toronto.',
        content:
          'Anatolia Fest’s 3rd edition is this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto (formerly Yonge-Dundas Square). Hosted by kutuphane.ca, the free cultural festival brings Turkish coffee, baklava, crafts, music, and regional art. It is a reunion for the Turkish-Canadian community and a welcoming day for newcomers looking to meet neighbours, families, and local businesses.',
        category: 'Community',
        color: 'bg-primary',
        link: 'https://www.anatoliafest.ca/',
      },
    ];
  }

  return [
    {
      id: 'fallback-trade',
      title: 'Kanada–Türkiye STA müzakereleri sürüyor',
      desc: '7 Temmuz’da başladı; kamu görüşleri 14 Eylül’e kadardı.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasını müzakerede olarak listeliyor. 7 Temmuz 2026’da Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başladığını duyurdu. Kanada hükümeti, bu müzakereleri bilgilendirmek için 31 Temmuz–14 Eylül 2026 arasında kamu görüşü topladı. 2025’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı (Kanada ihracatı yaklaşık 1,1 milyar $; Türkiye’den ithalat yaklaşık 3,2 milyar $). Kanada’nın Türkiye’deki doğrudan yatırımı 2025’te 3,3 milyar $ oldu (2022’de 1 milyar $); Türkiye’nin Kanada’daki DYY stoku 233 milyon $ — Avrupa’da 24., dünyada 54. kaynak. Ticaret Müzakereleri Birimi hâlâ 111 Sussex Drive, Ottawa adresinde (TCE-consultations@international.gc.ca).',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-transport',
      title: 'Express Entry 2026: ulaşım meslekleri',
      desc: 'Pilotlar, uçak teknisyenleri ve araç tamircileri hâlâ uygun.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları ulaşım meslekleri kategorisini kapsıyor. Adayların genellikle son üç yılda listelenen tek bir meslekte, Kanada’da veya yurt dışında, en az 12 ay tam zamanlı (veya eşdeğer yarı zamanlı) deneyim göstermesi gerekiyor; deneyimin kesintisiz olması şart değil. Güncel listede uçak mekanikçileri ve uçak müfettişleri (NOC 72404), hava pilotları, uçuş mühendisleri ve uçuş eğitmenleri (72600), uçak alet, elektrik ve aviyonik mekanikçileri, teknisyenleri ve müfettişleri (22313) ile otomotiv servis teknisyenleri, kamyon ve otobüs tamircileri ve mekanik tamirciler (72410) yer alıyor. IRCC’nin Şubat 2026 duyurusu pilotlar, uçak mekanikçileri ve müfettişlerini 2026 iş gücü açığı öncelikleri arasında vurguladı. Bu alanlardaki Türk toplumundaki adayların NOC kodları ve Express Entry profillerini güncel tutması önerilir; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Pazar 12.00–20.00, 1 Dundas Street East, Toronto.',
      content:
        'Anatolia Fest’in 3. edisyonu bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde (eski Yonge-Dundas Square) düzenleniyor. kutuphane.ca’nın ev sahipliğindeki ücretsiz kültür festivali Türk kahvesi, baklava, el sanatları, müzik ve yöresel sanatı bir araya getiriyor. Türk-Kanada toplumu için bir buluşma; komşu, aile ve yerel işletmelerle tanışmak isteyen yeni gelenler için de açık bir gün.',
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
