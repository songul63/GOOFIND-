import type { BannerAd } from '../types';

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
        title: 'IRCC 2026–2028 Immigration Levels',
        desc: 'Permanent-resident targets hold at 380,000 a year.',
        content:
          'Canada’s 2026–2028 Immigration Levels Plan keeps overall permanent-resident admissions at 380,000 each year (range 350,000–420,000). IRCC is stabilizing intake while shifting toward economic immigration — about 63% of 2026 admissions, rising to 64% in 2027 and 2028 — and in-Canada pathways for people already working here. Temporary-resident arrival targets are 385,000 in 2026, then 370,000 in 2027–2028. Turkish newcomers should watch Express Entry, provincial nominee, and French-speaking streams, which remain the main routes inside this plan.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/corporate-initiatives/levels/supplementary-immigration-levels-2026-2028.html',
      },
      {
        id: 'fallback-express-entry',
        title: 'Express Entry 2026: Doctors, Trades, French',
        desc: 'Category-based draws target health, trades, and French skills.',
        content:
          'IRCC’s 2026 Express Entry categories include physicians, researchers, and senior managers with Canadian work experience, plus transport occupations and skilled military recruits. Rounds also continue for French-language proficiency, health care and social services, and skilled trades. Turkish-community applicants in nursing, construction, early childhood education, or trades should keep language tests, educational credential assessments, and profiles current — invitation rounds are announced after they run, not on a public calendar.',
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
      id: 'fallback-immigration',
      title: 'IRCC 2026–2028 Göçmenlik Planı',
      desc: 'Kalıcı oturum hedefi yılda 380.000 kişide sabit.',
      content:
        'Kanada’nın 2026–2028 Göçmenlik Seviyeleri Planı, kalıcı oturum alımlarını her yıl 380.000’de (350.000–420.000 aralığı) tutuyor. IRCC alımı istikrara alırken ekonomik göçmenliğe kayıyor — 2026 alımlarının yaklaşık %63’ü, 2027 ve 2028’de %64’ü — ve halihazırda çalışanlar için Kanada içi geçişlere ağırlık veriyor. Geçici sakin hedefi 2026’da 385.000, 2027–2028’de 370.000. Türk toplumundaki adayların Express Entry, eyalet aday programı ve Fransızca konuşan akışları izlemesi önemli; planın ana yolları bunlar.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/corporate-initiatives/levels/supplementary-immigration-levels-2026-2028.html',
    },
    {
      id: 'fallback-express-entry',
      title: 'Express Entry 2026: Hekim, Meslek, Fransızca',
      desc: 'Kategori bazlı turlarda sağlık, meslekler ve Fransızca öne çıkıyor.',
      content:
        'IRCC’nin 2026 Express Entry kategorileri arasında Kanada iş deneyimli hekimler, araştırmacılar ve üst düzey yöneticiler ile ulaşım meslekleri ve nitelikli askeri adaylar yer alıyor. Fransızca yeterlilik, sağlık ve sosyal hizmetler ile nitelikli meslek turları da sürüyor. Hemşirelik, inşaat, okul öncesi eğitim veya nitelikli mesleklerdeki Türk toplumundaki adayların dil sınavı, eğitim denkliği ve profillerini güncel tutması önerilir; davet turları önceden yayımlanan bir takvime göre değil, gerçekleştikten sonra duyuruluyor.',
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
