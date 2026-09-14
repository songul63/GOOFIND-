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
        title: 'Canada–Türkiye FTA: Comment by Sept 14',
        desc: 'Global Affairs is consulting Canadians on a potential trade deal.',
        content:
          'On July 7, 2026, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced negotiations toward a comprehensive Canada–Türkiye free trade agreement. Global Affairs Canada is inviting the public, businesses, and community groups to comment from July 31 through September 14, 2026. Two-way merchandise trade was over CA$4.3 billion in 2025. Turkish-Canadian entrepreneurs and families can send views to TCE-consultations@international.gc.ca; the department says that input will inform Canada’s negotiating priorities.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-immigration',
        title: 'IRCC 2026: 9% Francophone PR Outside Quebec',
        desc: 'French-speaking admissions are set at 30,267 this year.',
        content:
          'Canada’s 2026–2028 Immigration Levels Plan keeps overall permanent-resident admissions at 380,000 a year and sets French-speaking PR admissions outside Quebec at 9% in 2026 (30,267 people), 9.5% in 2027, and 10.5% in 2028, toward a 12% goal by 2029. Temporary-resident arrival targets fall to 385,000 in 2026. Express Entry and French-speaking streams remain core routes in this plan. Turkish-community applicants with French or in-Canada work experience should keep language tests and profiles current.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/corporate-initiatives/levels/supplementary-immigration-levels-2026-2028.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest Returns Sept 20 in Toronto',
        desc: 'Turkish culture, food, and music at Sankofa Square.',
        content:
          'Anatolia Fest’s 3rd edition is Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square (formerly Yonge-Dundas Square) in downtown Toronto. Hosted by kutuphane.ca, the free cultural festival brings Turkish coffee, baklava, crafts, music, and regional art. It is a reunion for the Turkish-Canadian community and a welcoming day for newcomers looking to meet neighbours, families, and local businesses.',
        category: 'Community',
        color: 'bg-primary',
        link: 'https://www.anatoliafest.ca/',
      },
    ];
  }

  return [
    {
      id: 'fallback-trade',
      title: 'Kanada–Türkiye STA: 14 Eylül’e kadar görüş bildirin',
      desc: 'Küresel İşler, olası bir serbest ticaret anlaşması için görüş topluyor.',
      content:
        '7 Temmuz 2026’da Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan, kapsamlı bir Kanada–Türkiye serbest ticaret anlaşması müzakerelerinin başladığını duyurdu. Küresel İşler Kanada, 31 Temmuz–14 Eylül 2026 arasında kamu, işletme ve toplum kuruluşlarından görüş bekliyor. 2025’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı. Türk-Kanadalı girişimci ve aileler görüşlerini TCE-consultations@international.gc.ca adresine iletebilir; bakanlık bu katkının müzakere önceliklerini şekillendireceğini belirtiyor.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-immigration',
      title: 'IRCC 2026: Quebec dışı %9 Fransızca PR hedefi',
      desc: 'Bu yıl Fransızca konuşan alım 30.267 kişi olarak planlandı.',
      content:
        'Kanada’nın 2026–2028 Göçmenlik Seviyeleri Planı kalıcı oturumu yılda 380.000’de tutuyor ve Quebec dışı Fransızca konuşan kalıcı oturum alımlarını 2026’da %9 (30.267 kişi), 2027’de %9,5 ve 2028’de %10,5 olarak belirliyor; 2029’da %12 hedefi var. Yeni geçici sakin hedefi 2026’da 385.000’e iniyor. Express Entry ve Fransızca konuşan akışlar bu plandaki ana yollar arasında. Fransızcası veya Kanada iş deneyimi olan Türk toplumundaki adayların dil sınavı ve profillerini güncel tutması önerilir.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/corporate-initiatives/levels/supplementary-immigration-levels-2026-2028.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest 20 Eylül’de Toronto’da',
      desc: 'Sankofa Square’de Türk kültürü, yemek ve müzik.',
      content:
        'Anatolia Fest’in 3. edisyonu 20 Eylül 2026 Pazar günü 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de (eski Yonge-Dundas Square) düzenleniyor. kutuphane.ca’nın ev sahipliğindeki ücretsiz kültür festivali Türk kahvesi, baklava, el sanatları, müzik ve yöresel sanatı bir araya getiriyor. Türk-Kanada toplumu için bir buluşma; komşu, aile ve yerel işletmelerle tanışmak isteyen yeni gelenler için de açık bir gün.',
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
