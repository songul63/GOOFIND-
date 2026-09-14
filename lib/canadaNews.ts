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
        desc: 'Global Affairs consultations close today, September 14.',
        content:
          'Today, September 14, 2026, is the last day to comment on a potential Canada–Türkiye free trade agreement. Global Affairs Canada has listed the consultation as open from July 31 through September 14. Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the talks on July 7, 2026. Two-way merchandise trade was over CA$4.3 billion in 2025. Turkish-Canadian entrepreneurs and families can still send views to TCE-consultations@international.gc.ca; the department says that input will inform Canada’s negotiating priorities.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-express-entry',
        title: 'Express Entry 2026: Health, STEM, French',
        desc: 'IRCC is inviting candidates across 10 economic categories.',
        content:
          'IRCC’s current Express Entry category-based rounds cover French-language proficiency, healthcare and social services, STEM, trades, education, and transport, plus physicians, researchers, and senior managers with Canadian work experience, and skilled military recruits. Category rounds invite people already in the pool who meet the Minister’s economic-goal criteria and then rank by CRS. French-language invitations require NCLC 7 in all four abilities. Turkish-community applicants in nursing, construction, early childhood education, engineering, or with French should keep language tests, educational credential assessments, and profiles current — rounds are posted after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
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
      title: 'Son gün: Kanada–Türkiye STA görüşleri',
      desc: 'Küresel İşler istişaresi bugün, 14 Eylül’de kapanıyor.',
      content:
        'Bugün, 14 Eylül 2026, olası bir Kanada–Türkiye serbest ticaret anlaşması için görüş bildirmenin son günü. Küresel İşler Kanada istişareyi 31 Temmuz–14 Eylül arasında açık gösteriyor. Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan müzakereleri 7 Temmuz 2026’da duyurmuştu. 2025’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı. Türk-Kanadalı girişimci ve aileler görüşlerini hâlâ TCE-consultations@international.gc.ca adresine iletebilir; bakanlık bu katkının müzakere önceliklerini şekillendireceğini belirtiyor.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-express-entry',
      title: 'Express Entry 2026: Sağlık, STEM, Fransızca',
      desc: 'IRCC 10 ekonomik kategoride aday davet ediyor.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları Fransızca yeterlilik, sağlık ve sosyal hizmetler, STEM, meslekler, eğitim ve ulaşımı; Kanada iş deneyimli hekim, araştırmacı ve üst düzey yöneticileri; nitelikli askeri adayları kapsıyor. Kategori turları havuzdaki, bakanlığın ekonomik hedef ölçütlerini karşılayan adayları CRS sırasıyla davet eder. Fransızca davetler dört dil becerisinde NCLC 7 ister. Hemşirelik, inşaat, okul öncesi eğitim, mühendislik veya Fransızcası olan Türk toplumundaki adayların dil sınavı, eğitim denkliği ve profillerini güncel tutması önerilir; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
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
