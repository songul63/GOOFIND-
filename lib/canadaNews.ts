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
        desc: 'Technical teams are scoping the deal after the July 7 launch.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. That followed a June 2026 Joint Ministerial Statement by Trade Ministers Ömer Bolat and Maninder Sidhu opening exploratory discussions. In the coming months, technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. The Government of Canada invited public comments from July 31 to September 14, 2026, to inform those talks. In 2025, two-way merchandise trade reached over CA$4.3 billion (Canadian exports about $1.1 billion; imports from Türkiye about $3.2 billion). Canadian direct investment in Türkiye was $3.3 billion in 2025; Türkiye’s FDI stock in Canada was $233 million.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-physicians',
        title: 'Express Entry 2026: physicians with Canadian experience',
        desc: 'Family doctors and specialists who have practised in Canada may be invited.',
        content:
          'IRCC’s current Express Entry category-based rounds include a 2026 category for physicians with Canadian work experience. To be eligible, you must qualify for an Express Entry program and have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time) in Canada in a single listed occupation — the experience does not need to be continuous. The occupations are specialists in clinical and laboratory medicine (NOC 31100), specialists in surgery (31101), and general practitioners and family physicians (31102). IRCC’s medical-doctors pathway notes that if you are invited, you generally have 60 days to apply for permanent residence. Turkish-community physicians already practising in Canada should keep NOC codes and Express Entry profiles current — IRCC publishes each round after it runs.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: '3rd edition this Sunday, 12 p.m.–8 p.m. at 1 Dundas Street East.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto (formerly Yonge-Dundas Square). After editions in 2016 and 2017, the 3rd edition is hosted by kutuphane.ca as a reunion of Turkish coffee, baklava, crafts, music, and regional art. The free cultural festival is open to the Turkish-Canadian community and to newcomers looking to meet neighbours, families, and local businesses.',
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
      desc: 'Teknik ekipler, 7 Temmuz’daki başlangıcın ardından kapsamı belirliyor.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasını müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başladığını duyurdu. Bunun öncesinde Ticaret Bakanları Ömer Bolat ve Maninder Sidhu, Haziran 2026’da keşif görüşmelerine dair Ortak Bakanlar Bildirisi yayımlamıştı. Önümüzdeki aylarda teknik ekipler anlaşmanın kapsamını ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kanada hükümeti, bu müzakereleri bilgilendirmek için 31 Temmuz–14 Eylül 2026 arasında kamu görüşü topladı. 2025’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı (Kanada ihracatı yaklaşık 1,1 milyar $; Türkiye’den ithalat yaklaşık 3,2 milyar $). Kanada’nın Türkiye’deki doğrudan yatırımı 2025’te 3,3 milyar $; Türkiye’nin Kanada’daki DYY stoku 233 milyon $ oldu.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-physicians',
      title: 'Express Entry 2026: Kanada deneyimli hekimler',
      desc: 'Kanada’da çalışmış aile hekimleri ve uzmanlar davet edilebilir.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları, 2026’da Kanada iş deneyimine sahip hekimler kategorisini kapsıyor. Uygun olmak için bir Express Entry programına hak kazanmanız ve son üç yılda Kanada’da listelenen tek bir meslekte en az 12 ay tam zamanlı (veya eşdeğer yarı zamanlı) deneyim biriktirmeniz gerekiyor; deneyimin kesintisiz olması şart değil. Meslekler klinik ve laboratuvar tıbbı uzmanları (NOC 31100), cerrahi uzmanları (31101) ile pratisyen hekimler ve aile hekimleridir (31102). IRCC’nin hekim yolu, davet alırsanız daimi oturum başvurusunu genellikle 60 gün içinde vermeniz gerektiğini belirtiyor. Kanada’da halihazırda çalışan Türk toplumundaki hekimlerin NOC kodları ve Express Entry profillerini güncel tutması önerilir; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: '3. edisyon bu Pazar 12.00–20.00, 1 Dundas Street East.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde (eski Yonge-Dundas Square) geri dönüyor. 2016 ve 2017 edisyonlarının ardından 3. edisyona kutuphane.ca ev sahipliği yapıyor; Türk kahvesi, baklava, el sanatları, müzik ve yöresel sanat bir araya geliyor. Ücretsiz kültür festivali Türk-Kanada toplumu ile komşu, aile ve yerel işletmelerle tanışmak isteyen yeni gelenlere açık.',
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
