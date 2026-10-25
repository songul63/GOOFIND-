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
        id: 'fallback-fta',
        title: 'Canada–Türkiye FTA consultations closed',
        desc: 'Public comments closed 14 September; negotiations are underway after a 21 September notice of intent.',
        content:
          'Global Affairs Canada’s consultation on a potential Canada–Türkiye free trade agreement is Closed. The TCE-Consultations page still lists the window as 31 July to 14 September 2026 and says a what-we-heard report has not yet been published (the /what-we-heard and /report paths remain unpublished). The official FTA info page (date-modified 2026-10-09) now shows Current status: In negotiations, after the government tabled a Notice of intent on September 21, 2026; negotiations were first announced in a 7 July joint statement. Official 2025 figures remain the latest on the relations page (dateModified is now 2026-10-06): two-way merchandise trade over $4.3 billion, Canadian direct investment stock in Türkiye of $3.3 billion, about 2,550 study permits for Turkish citizens, and agri-food among Canada’s leading exports. The relations page still describes the Canada–Türkiye JETCO forum; the documented 2026-01-20 JETCO country-news path is unpublished. Verified 08:00 UTC 25 October 2026 from international.canada.ca / www.international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary-mid',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-express-entry-450',
        title: 'Express Entry #450: French-language proficiency',
        desc: 'Official Oct 16, 2026 round: 5,000 invitations, CRS 435; French-Language proficiency 2026-Version 2.',
        content:
          'IRCC’s official ee_rounds_123_en.json still lists #450 as the latest Express Entry round: French-Language proficiency 2026-Version 2, 5,000 invitations, CRS score of 435, drawn October 16, 2026 at 10:25:13 UTC (cut-off October 06, 2026 at 21:31:22 UTC). The rounds table now starts with October 16 French-Language proficiency 5,000 invitations / CRS 435. The JSON has 451 round records (693170 bytes; Last-Modified Friday, 16 October 2026 at 13:27:07 GMT). The official rounds HTML Last-Modified is now Saturday, 24 October 2026 at 18:25:37 GMT (changed from 18:48:46 GMT; official JSON still latest #450). The canonical invitations URL is invitations.html?q=450. CIC News still lists a dedicated homepage article for official round #450 (1081461; article:published_time 2026-10-16T13:50:05+00:00; article:modified_time 2026-10-16T14:01:46+00:00; Last-Modified Sunday, 25 October 2026 at 06:06:14 GMT; CIC homepage Last-Modified Sunday, 25 October 2026 at 06:03:16 GMT urllib first / later / retry / wget / curl HTTP/2 and HTTP/1.1), with 1081344 (#449 Canadian Experience Class, 2,500 / CRS 519) and 1081246 (#448 Provincial Nominee Program, 752 / CRS 772) also on the homepage. 1080909 (#447 Trades Occupations, 3,500 / CRS 476) is NOT on the homepage. Earlier CIC articles 0980843, 0980374, and 0980361 remain published. Verified 08:00 UTC 25 October 2026 from canada.ca and www.cicnews.com.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
      },
      {
        id: 'fallback-military-category',
        title: 'Express Entry 2026: skilled military recruits',
        desc: 'FSMA: 10 years’ continuous service and a CAF offer in NOC 40042, 42102 or 43204.',
        content:
          'IRCC’s 2026 category-based selection page still lists skilled military recruits as an Express Entry category. To be eligible as a Foreign Skilled Military Applicant (FSMA) you must be serving in a recognized foreign military with a minimum of ten years of continuous service, have training aligned with National Occupational Classification 40042 (Commissioned officers of the Canadian Armed Forces), 42102 (Specialized members), or 43204 (Operations members), and have an offer of arranged employment with the Canadian Armed Forces made by the Canadian Forces Recruiting Group. Other 2026 categories still include French-language proficiency, healthcare and social services, STEM, trades, education, transport, physicians with Canadian work experience, senior managers, and researchers. Dedicated category URLs under category-based-selection/{skilled-military-recruits,french-language-proficiency,researchers,medical-doctors}.html remain unpublished; the canonical page is submit-profile/rounds-invitations/category-based-selection.html (it 301s to /express-entry/rounds-invitations/category-based-selection.html). The old short path /express-entry/category-based-selection.html is 404. The official category page Last-Modified is now Saturday, 24 October 2026 at 18:44:03 GMT (page refresh; skilled-military category unchanged). Verified 08:00 UTC 25 October 2026 from canada.ca.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations/category-based-selection.html',
      },
    ];
  }

  return [
    {
      id: 'fallback-fta',
      title: 'Kanada–Türkiye STA istişareleri kapandı',
      desc: 'Kamu görüşleri 14 Eylül’de kapandı; 21 Eylül niyet bildiriminin ardından müzakereler sürüyor.',
      content:
        'Global Affairs Canada’nın olası Kanada–Türkiye serbest ticaret anlaşması istişaresi Closed. TCE-Consultations sayfası pencereyi hâlâ 31 Temmuz–14 Eylül 2026 olarak gösteriyor; what-we-heard raporu henüz yayımlanmamış (/what-we-heard ve /report yolları yok). Resmi STA bilgi sayfası (date-modified 2026-10-09) Current status: In negotiations diyor; hükümet 21 Eylül 2026’da Notice of intent yayımladı. İlişkiler sayfasındaki (dateModified 2026-10-06) 2025 rakamları güncel: ikili mal ticareti 4,3 milyar dolardan fazla, Türkiye’deki Kanada doğrudan yatırımı 3,3 milyar dolar, Türk vatandaşlarına yaklaşık 2.550 öğrenim izni ve önde gelen ihracatlar arasında tarım-gıda. İlişkiler sayfası JETCO forumunu anlatıyor; belgelenen 2026-01-20 JETCO yolu yayımlanmamış. 25 Ekim 2026 08.00 UTC’te international.canada.ca / www.international.gc.ca üzerinden doğrulandı.',
      category: 'Ekonomi',
      color: 'bg-primary-mid',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-express-entry-450',
      title: 'Express Entry #450: Fransızca yeterlilik',
      desc: '16 Ekim 2026 resmi tur: 5.000 davet, CRS 435; French-Language proficiency 2026-Version 2.',
      content:
        'IRCC resmi ee_rounds_123_en.json hâlâ en son tur olarak #450’yi listeliyor: French-Language proficiency 2026-Version 2, 5.000 davet, 435 CRS, 16 Ekim 2026 10:25:13 UTC. JSON’da 451 tur kaydı var (693170 bayt; Last-Modified 16 Ekim 2026 Cuma 13.27.07 GMT). Resmi turlar HTML Last-Modified artık 24 Ekim 2026 Cumartesi 18.25.37 GMT (18.48.46 GMT’ten değişti; resmi JSON hâlâ #450). Canonical davet URL’si invitations.html?q=450. CIC News hâlâ resmi #450 turu için 1081461 ana sayfa haberini gösteriyor; 1081344 (#449 CEC) ve 1081246 (#448 PNP) da ana sayfada. 1080909 (#447 meslekler) ana sayfada değil. 25 Ekim 2026 08.00 UTC’te canada.ca ve www.cicnews.com üzerinden doğrulandı.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
    },
    {
      id: 'fallback-military-category',
      title: 'Express Entry 2026: nitelikli askeri adaylar',
      desc: 'FSMA: 10 yıl kesintisiz hizmet ve NOC 40042, 42102 veya 43204’te Kuvvetler teklifi.',
      content:
        'IRCC’nin 2026 kategori bazlı seçim sayfası nitelikli askeri adayları (skilled military recruits) hâlâ bir Express Entry kategorisi olarak listeliyor. Foreign Skilled Military Applicant (FSMA) için tanınmış bir yabancı orduda en az 10 yıl kesintisiz hizmet, NOC 40042, 42102 veya 43204 ile uyumlu eğitim ve Canadian Forces Recruiting Group tarafından verilen bir Canadian Armed Forces iş teklifi gerekiyor. Ayrı kategori URL’leri yayımlanmamış; canonical sayfa submit-profile/rounds-invitations/category-based-selection.html. Resmi kategori sayfası Last-Modified artık 24 Ekim 2026 Cumartesi 18.44.03 GMT (sayfa yenilemesi; askeri kategori değişmedi). 25 Ekim 2026 08.00 UTC’te canada.ca üzerinden doğrulandı.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations/category-based-selection.html',
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

type StoredBanner = BannerAd & {
  desc?: string;
  content?: string;
  category?: string;
  mediaType?: 'image' | 'video';
};

export function mapStoredBannerToCarouselItem(banner: BannerAd): BannerCarouselItem {
  const stored = banner as StoredBanner;
  const isNews = stored.type === 'news';
  return {
    id: stored.id,
    title: stored.title || '',
    desc: stored.desc || '',
    content: stored.content || '',
    category: stored.category || (isNews ? 'News' : 'Sponsor'),
    url: stored.url || '',
    type: isNews ? 'news' : 'ad',
    mediaType: stored.mediaType || (stored.type === 'video' ? 'video' : 'image'),
    link: stored.link || '#',
    active: stored.active !== false,
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
