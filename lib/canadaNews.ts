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
        id: 'fallback-immigration',
        title: 'IRCC 2025–2027 Immigration Levels',
        desc: 'Housing-aligned arrivals and targeted draws continue.',
        content:
          'Canada’s 2025–2027 Immigration Levels Plan remains the main roadmap for newcomer intake. IRCC is keeping permanent-resident targets aligned with housing and public-service capacity, with more emphasis on in-Canada pathways, French-speaking candidates, and workers in health care, construction, and skilled trades. Turkish newcomers should watch Express Entry and provincial nominee updates closely, because category-based draws can change from round to round.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/news/2024/10/government-of-canada-reduces-immigration.html',
      },
      {
        id: 'fallback-express-entry',
        title: 'Express Entry: Health and Trades Draws',
        desc: 'Category-based rounds still prioritize in-demand jobs.',
        content:
          'Express Entry continues to use category-based selection alongside Comprehensive Ranking System (CRS) score rounds. Health care, trades, and French-language proficiency have been recurring priorities. Applicants in the Turkish community who work in nursing, early childhood education, construction, or skilled trades should keep language tests, educational credential assessments, and provincial nominee profiles current.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html',
      },
      {
        id: 'fallback-community',
        title: 'Turkish Community Fall Calendar',
        desc: 'Cultural nights, newcomer meetups, and food events.',
        content:
          'Turkish associations across Toronto, Montreal, Calgary, and Vancouver are publishing fall programs: cultural nights, Turkish language classes, newcomer orientation, and weekend food markets. These gatherings remain one of the fastest ways for families to find housing leads, job referrals, and weekend plans. Check local association pages and Goofind community rooms for dates in your province.',
        category: 'Community',
        color: 'bg-primary',
        link: 'https://www.google.com/search?q=Turkish+community+events+Canada',
      },
    ];
  }

  return [
    {
      id: 'fallback-immigration',
      title: 'IRCC 2025–2027 Göçmenlik Planı',
      desc: 'Konut kapasitesine uyumlu alımlar ve hedefli çekilişler sürüyor.',
      content:
        'Kanada’nın 2025–2027 Göçmenlik Seviyeleri Planı, yeni gelen alımının ana çerçevesi olmaya devam ediyor. IRCC kalıcı oturum hedeflerini konut ve kamu hizmeti kapasitesiyle dengelemeyi sürdürüyor; Kanada içi geçişler, Fransızca konuşan adaylar ile sağlık, inşaat ve nitelikli meslek çalışanlarına daha fazla ağırlık veriliyor. Türk toplumundaki adayların Express Entry ve eyalet aday programı duyurularını yakından izlemesi önemli; kategori bazlı çekilişler turdan tura değişebiliyor.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/news/2024/10/government-of-canada-reduces-immigration.html',
    },
    {
      id: 'fallback-express-entry',
      title: 'Express Entry: Sağlık ve Meslek Çekilişleri',
      desc: 'Kategori bazlı turlarda aranan meslekler öne çıkıyor.',
      content:
        'Express Entry, CRS puanına dayalı turlara ek olarak kategori bazlı seçimi kullanmaya devam ediyor. Sağlık, nitelikli meslekler ve Fransızca yeterlilik tekrarlayan öncelikler arasında. Hemşirelik, okul öncesi eğitim, inşaat veya nitelikli mesleklerde çalışan Türk toplumundaki adayların dil sınavı, eğitim denkliği ve eyalet aday profillerini güncel tutması önerilir.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html',
    },
    {
      id: 'fallback-community',
      title: 'Türk Toplumu Güz Takvimi',
      desc: 'Kültür geceleri, yeni gelen buluşmaları ve yemek etkinlikleri.',
      content:
        'Toronto, Montreal, Calgary ve Vancouver’daki Türk dernekleri güz programlarını yayımlıyor: kültür geceleri, Türkçe kursları, yeni gelen oryantasyonu ve hafta sonu yemek pazarları. Bu buluşmalar konut, iş ve sosyal çevre arayan aileler için hâlâ en hızlı kaynaklardan biri. Tarihler için yerel dernek sayfalarını ve Goofind topluluk odalarını takip edin.',
      category: 'Topluluk',
      color: 'bg-primary',
      link: 'https://www.google.com/search?q=Kanada+T%C3%BCrk+toplumu+etkinlikleri',
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
