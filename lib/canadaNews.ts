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
        desc: 'Global Affairs still lists the consultation as Open today.',
        content:
          'Today, September 14, 2026, is the last day to comment on a potential Canada–Türkiye free trade agreement. Global Affairs Canada still marks the consultation as Open (July 31–September 14). In 2025 two-way merchandise trade was over CA$4.3 billion (exports about CA$1.1 billion, imports about CA$3.2 billion). Canadian direct investment in Türkiye was CA$3.3 billion, up from CA$1 billion in 2022, while Türkiye’s FDI stock in Canada was CA$233 million. Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the talks on July 7. Turkish-Canadian businesses, including MSMEs, can still email TCE-consultations@international.gc.ca; the department says that input will inform Canada’s negotiating priorities.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-french',
        title: 'Express Entry 2026: French-language category',
        desc: 'NCLC 7 French remains a current IRCC invitation category.',
        content:
          'IRCC’s current Express Entry category-based rounds still include French-language proficiency. Candidates generally need French test results of at least NCLC 7 in all four abilities, plus eligibility for an Express Entry program. The 2026–2028 Immigration Levels Plan aims for 9% of permanent-resident admissions outside Quebec to be French-speaking in 2026, then 9.5% in 2027 and 10.5% in 2028. Healthcare, STEM, trades, education, and transport categories also continue. Turkish-community applicants with French should keep TEF or TCF results and Express Entry profiles current — IRCC publishes each round after it runs.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Turkish culture, food, and music in Toronto on Sept 20.',
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
      desc: 'Küresel İşler istişaresi bugün hâlâ Açık görünüyor.',
      content:
        'Bugün, 14 Eylül 2026, olası bir Kanada–Türkiye serbest ticaret anlaşması için görüş bildirmenin son günü. Küresel İşler Kanada sayfası istişareyi hâlâ Açık gösteriyor (31 Temmuz–14 Eylül). 2025’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı (ihracat yaklaşık 1,1 milyar, ithalat yaklaşık 3,2 milyar). Kanada’nın Türkiye’deki doğrudan yatırımı 2022’deki 1 milyar CA$’dan 3,3 milyar CA$’a çıktı; Türkiye’nin Kanada’daki doğrudan yatırımı 233 milyon CA$ idi. Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan müzakereleri 7 Temmuz’da duyurmuştu. Türk-Kanadalı işletmeler, KOBİ’ler dahil, görüşlerini hâlâ TCE-consultations@international.gc.ca adresine iletebilir; bakanlık bu katkının müzakere önceliklerini şekillendireceğini belirtiyor.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-french',
      title: 'Express Entry 2026: Fransızca kategori',
      desc: 'NCLC 7 Fransızca hâlâ güncel bir IRCC davet kategorisi.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları Fransızca yeterliliği kapsamaya devam ediyor. Adayların genellikle dört dil becerisinde en az NCLC 7 Fransızca sınav sonucu ve bir Express Entry programına uygunluk göstermesi gerekiyor. 2026–2028 Göçmenlik Seviyeleri Planı, Quebec dışı kalıcı oturum kabullerinin 2026’da %9’unun Fransızca konuşan olmasını hedefliyor; 2027’de %9,5 ve 2028’de %10,5. Sağlık, STEM, meslekler, eğitim ve ulaşım kategorileri de sürüyor. Fransızcası olan Türk toplumundaki adayların TEF veya TCF sonuçları ile Express Entry profillerini güncel tutması önerilir; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: '20 Eylül’de Sankofa Square’de Türk kültürü, yemek ve müzik.',
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
