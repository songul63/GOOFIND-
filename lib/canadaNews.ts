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
        desc: 'Carney and Erdoğan launched talks; comments still Open today.',
        content:
          'Today, September 14, 2026, is still the last day to comment on a potential Canada–Türkiye free trade agreement. On July 7, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of negotiations toward a comprehensive, modern, and mutually beneficial FTA. Global Affairs Canada is collecting views through a Canada Gazette notice until today (July 31–September 14) and still lists the consultation as Open. Email TCE-consultations@international.gc.ca, or write the Trade Negotiations Division at 111 Sussex Drive, Ottawa. Topics include tariff and non-tariff barriers, sanitary and phytosanitary measures, trade in services, labour rights, and environmental protection — input the department says will inform Canada’s FTA negotiations with Türkiye.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-education',
        title: 'Express Entry 2026: education occupations',
        desc: 'Teachers, ECEs, and teacher assistants remain eligible.',
        content:
          'IRCC’s current Express Entry category-based rounds still include education occupations. Eligible candidates generally need at least 12 months of full-time experience (or equal part-time) in the past three years in a single listed occupation — in Canada or abroad; the experience does not need to be continuous. The current list is secondary school teachers (NOC 41220), elementary school and kindergarten teachers (41221), early childhood educators and assistants (42202), instructors of persons with disabilities (42203), and elementary and secondary school teacher assistants (43100). IRCC has kept education among 2026 labour-shortage priorities. Turkish-community applicants in these fields should keep NOC codes and Express Entry profiles current — IRCC publishes each round after it runs.',
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
      title: 'Son gün: Kanada–Türkiye STA görüşleri',
      desc: 'Carney ve Erdoğan müzakereleri başlattı; istişare bugün hâlâ Açık.',
      content:
        'Bugün, 14 Eylül 2026, olası bir Kanada–Türkiye serbest ticaret anlaşması için görüş bildirmenin hâlâ son günü. 7 Temmuz’da Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başladığını duyurdu. Küresel İşler Kanada, Canada Gazette ilanı üzerinden görüşleri bugüne kadar (31 Temmuz–14 Eylül) topluyor ve istişareyi hâlâ Açık gösteriyor. TCE-consultations@international.gc.ca adresine e-posta gönderin veya Ticaret Müzakereleri Birimi, 111 Sussex Drive, Ottawa adresine yazın. Konular arasında tarife ve tarife dışı engeller, sağlık ve bitki sağlığı (SPS) önlemleri, hizmet ticareti, çalışma hakları ve çevre koruması yer alıyor; bakanlık bu katkının Türkiye ile STA müzakerelerini şekillendireceğini belirtiyor.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-education',
      title: 'Express Entry 2026: eğitim meslekleri',
      desc: 'Öğretmenler, okul öncesi eğitimciler ve yardımcıları hâlâ uygun.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları eğitim meslekleri kategorisini kapsamaya devam ediyor. Adayların genellikle son üç yılda listelenen tek bir meslekte, Kanada’da veya yurt dışında, en az 12 ay tam zamanlı (veya eşdeğer yarı zamanlı) deneyim göstermesi gerekiyor; deneyimin kesintisiz olması şart değil. Güncel listede ortaokul/lise öğretmenleri (NOC 41220), ilkokul ve anaokulu öğretmenleri (41221), okul öncesi eğitimciler ve yardımcıları (42202), engelli bireylere eğitmenler (42203) ile ilkokul ve ortaöğretim öğretmen yardımcıları (43100) yer alıyor. IRCC eğitimi 2026 iş gücü açığı öncelikleri arasında tutuyor. Bu alanlardaki Türk toplumundaki adayların NOC kodları ve Express Entry profillerini güncel tutması önerilir; turlar gerçekleştikten sonra yayımlanır.',
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
