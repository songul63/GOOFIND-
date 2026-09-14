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
        desc: 'Talks aim at growth, jobs, and supply chains after the July launch.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, Prime Minister Mark Carney and President Recep Tayyip Erdoğan launched talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement said closer economic cooperation will support economic growth, job creation, competitiveness, and stronger supply chains. That followed the June 8, 2026 Joint Statement on Economic Partnership by Canada’s Minister of International Trade Maninder Sidhu and Türkiye’s Minister of Trade Ömer Bolat, which launched exploratory discussions and welcomed the recent expansion of the Air Transport Agreement. In 2025, two-way merchandise trade reached over CA$4.3 billion, with Canadian exports about CA$1.1 billion and imports from Türkiye about CA$3.2 billion; the stock of Canadian direct investment in Türkiye was $3.3 billion.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-researchers',
        title: 'Express Entry 2026: researchers with Canadian experience',
        desc: 'NOC 41200 and 41201 academics with 12 months in Canada may be invited.',
        content:
          'IRCC’s current Express Entry category-based rounds include a 2026 category for researchers with Canadian work experience. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time) in Canada in a single listed occupation — the experience does not need to be continuous. The 2021 NOC codes are university professors and lecturers (41200) and post-secondary teaching and research assistants (41201), both TEER 1. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Kutuphane.ca hosts Turkish coffee, baklava, music, and crafts this Sunday.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. After editions in 2016 and 2017, kutuphane.ca is hosting the 3rd edition as a reunion of Turkish coffee and baklava, music, crafts, and regional art. Sankofa Square lists the free festival from 12 p.m. to 8 p.m.; follow @anatoliafestca for updates. The Turkish-Canadian community and newcomers can meet neighbours, families, and local businesses in the square.',
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
      desc: 'Müzakereler büyüme, istihdam ve tedarik zincirlerini hedefliyor.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresini başlattı. Liderlerin ortak açıklamasına göre daha yakın ekonomik iş birliği büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyecek. Bunun öncesinde, 8 Haziran 2026’da Kanada Uluslararası Ticaret Bakanı Maninder Sidhu ile Türkiye Ticaret Bakanı Ömer Bolat’ın Ekonomik Ortaklık Ortak Açıklaması keşif görüşmelerini başlattı ve Hava Taşımacılığı Anlaşması’nın genişlemesini memnuniyetle karşıladı. 2025’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı; Kanada ihracatı yaklaşık 1,1 milyar CA$, Türkiye’den ithalat yaklaşık 3,2 milyar CA$ oldu; Kanada’nın Türkiye’deki doğrudan yatırımı 3,3 milyar dolardı.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-researchers',
      title: 'Express Entry 2026: Kanada deneyimli araştırmacılar',
      desc: 'Kanada’da 12 ay çalışmış NOC 41200 ve 41201 akademisyenler davet edilebilir.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları, 2026’da Kanada iş deneyimine sahip araştırmacılar kategorisini kapsıyor. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yılda Kanada’da listelenen tek bir meslekte en az 12 ay tam zamanlı (veya eşdeğer yarı zamanlı) deneyim biriktirmeniz gerekir; deneyimin kesintisiz olması şart değildir. 2021 NOC kodları üniversite profesörleri ve öğretim görevlileri (41200) ile yükseköğretim öğretim ve araştırma asistanlarıdır (41201); her ikisi de TEER 1’dir. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Kutuphane.ca bu Pazar Türk kahvesi, baklava, müzik ve el sanatlarıyla ev sahipliği yapıyor.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. 2016 ve 2017 edisyonlarının ardından kutuphane.ca, 3. edisyona Türk kahvesi ve baklava, müzik, el sanatları ve yöresel sanatlarla bir buluşma olarak ev sahipliği yapıyor. Sankofa Square ücretsiz festivali 12.00–20.00 olarak listeliyor; güncellemeler için @anatoliafestca hesabını takip edin. Türk-Kanada toplumu ile yeni gelenler meydanda komşu, aile ve yerel işletmelerle tanışabilir.',
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
