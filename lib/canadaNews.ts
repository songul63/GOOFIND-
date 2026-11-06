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

/** Hourly 18:00 UTC 6 November 2026 source check — not shown on the homepage. */
export const BANNER_NEWS_VERIFIED_AT = '2026-11-06T18:00:00Z';

export const HOURLY_SOURCE_CHECK = {
  hour: '18:00 UTC 6 November 2026',
  latestExpressEntryRound: 453,
  expressEntryRoundCount: 454,
  eeJsonLastModified: 'Wed, 28 Oct 2026 13:37:19 GMT',
  eeJsonBytes: 742096,
  ftaConsultation: 'Closed (31 July–14 September 2026)',
  ftaInfoStatus: 'In negotiations (Notice of intent 21 September 2026, date-modified 2026-10-09)',
  relationsDateModified: '2026-10-06',
  jetcoPath: '2026-01-20 country_news HTTP 200 (25730); world-monde prefix HTTP 404 (11611)',
  categoryPage: 'skilled military recruits still listed; dedicated category URLs read timed out (0 bytes)',
  unusedCicHomepage: [
    '1182044',
    '1182174',
    '1182218',
    '1182142',
    '1182146',
    '1182188',
    '1182165',
    '1182160',
    '1182149',
    '1182123',
  ],
  urllib: {
    ftaConsult: 'first/extra/extra2/later HTTP 200 (23064)',
    ftaInfo: 'first/extra/extra2/later HTTP 200 (25990)',
    relations: 'first/extra/extra2/later HTTP 200 (28593)',
    jetco: 'first/extra/extra2/later HTTP 200 (25730)',
    eeJson: 'first/extra/extra2/later read timed out (0 bytes)',
    eeRounds: 'first/extra/extra2/later read timed out (0 bytes)',
    category: 'first/extra/extra2/later read timed out (0 bytes)',
    catDedicated:
      'skilled-military/french/researchers/medical-doctors/old-short urllib first/extra/extra2/later read timed out (0 bytes)',
    eeChanges: 'first/extra/extra2/later read timed out (0 bytes)',
    levels: 'urllib first/extra/extra2/later read timed out (0 bytes)',
    cicHome:
      'first HTTP 200 (182796); extra/extra2/later HTTP 200 (182662) Last-Modified Friday, 6 November 2026 at 17:48:23 GMT',
    cic1182123:
      'first read timed out (0 bytes); extra HTTP 200 (174127); extra2 HTTP 200 (174128); later HTTP 200 (173993) Last-Modified Friday, 6 November 2026 at 17:57:05 GMT',
    cic1182146:
      'first HTTP 200 (142029); extra HTTP 200 (142030); extra2 HTTP 200 (142029); later HTTP 200 (141896) Last-Modified Friday, 6 November 2026 at 17:53:39 GMT',
    cic1182142:
      'first HTTP 200 (145757); extra HTTP 200 (145756); extra2 HTTP 200 (145758); later HTTP 200 (145623) Last-Modified Friday, 6 November 2026 at 17:54:23 GMT',
    cic1182044:
      'first HTTP 200 (147551); extra HTTP 200 (147552); extra2/later HTTP 200 (147418) Last-Modified Friday, 6 November 2026 at 17:46:53 GMT',
  },
  wget: {
    ftaConsult: 'first HTTP 200 (23064)',
    ftaInfo: 'first HTTP 200 (25990)',
    relations: 'first HTTP 200 (28593)',
    jetco: 'first HTTP 200 (25730)',
    eeJson: 'first read timed out (0 bytes)',
    eeRounds: 'first read timed out (0 bytes)',
    category: 'first read timed out (0 bytes)',
    catDedicated: 'skilled-military/french/researchers/medical-doctors/old-short wget first read timed out (0 bytes)',
    eeChanges: 'first read timed out (0 bytes)',
    levels: 'first read timed out (0 bytes)',
    levelsSupp: 'first read timed out (0 bytes)',
    cicHome: 'first HTTP 200 (182796) Last-Modified Friday, 6 November 2026 at 17:48:23 GMT',
  },
  curlHttp2: {
    ftaConsult: 'first HTTP 200 (23064)',
    ftaInfo: 'first HTTP 200 (25990)',
    relations: 'first HTTP 200 (28593)',
    jetco: 'first HTTP 200 (25730)',
    eeJson: 'first HTTP 000 (0 bytes)',
    eeRounds: 'first HTTP 000 (0 bytes)',
    category: 'first HTTP 000 (0 bytes)',
    catDedicated: 'first HTTP 000 (0 bytes)',
    cicHome: 'first HTTP 200 (182795) Last-Modified Friday, 6 November 2026 at 17:48:23 GMT',
    cic1182044: 'first HTTP 200 (147552) Last-Modified Friday, 6 November 2026 at 17:46:53 GMT',
  },
  curlHttp11: {
    ftaConsult: 'first HTTP 200 (23064)',
    ftaInfo: 'first HTTP 200 (25990)',
    relations: 'first HTTP 200 (28593)',
    jetco: 'first HTTP 200 (25730)',
    eeJson: 'first HTTP 000 (0 bytes)',
    eeRounds: 'first HTTP 000 (0 bytes)',
    category: 'first HTTP 000 (0 bytes)',
    cicHome: 'first HTTP 200 (182795) Last-Modified Friday, 6 November 2026 at 17:48:23 GMT',
    cic1182044: 'first HTTP 200 (147552) Last-Modified Friday, 6 November 2026 at 17:46:53 GMT',
  },
} as const;

export function getDefaultCanadaNews(lang: 'en' | 'tr'): CanadaNewsItem[] {
  if (lang === 'en') {
    return [
      {
        id: 'fallback-fta',
        title: 'Canada–Türkiye FTA consultations closed',
        desc: 'Public comments closed 14 September; negotiations are underway after a 21 September notice of intent.',
        content:
          'Global Affairs Canada’s consultation on a potential Canada–Türkiye free trade agreement is Closed. The window ran from 31 July to 14 September 2026, and a what-we-heard report has not yet been published (the /what-we-heard and /report paths remain unpublished). The official FTA info page (date-modified 2026-10-09) shows Current status: In negotiations, after the government tabled a Notice of intent on September 21, 2026; negotiations were first announced in a 7 July joint statement. Official 2025 figures remain the latest on the relations page (dateModified 2026-10-06): two-way merchandise trade over $4.3 billion, Canadian direct investment stock in Türkiye of $3.3 billion, about 2,550 study permits for Turkish citizens, and agri-food among Canada’s leading exports. The relations page still describes the Canada–Türkiye JETCO forum.',
        category: 'Economy',
        color: 'bg-primary-mid',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-express-entry-453',
        title: 'Express Entry rounds paused after #453',
        desc: 'IRCC paused invitations on 3 November while CRS recalculates; last round remains Transport 150 / CRS 477.',
        content:
          'IRCC’s official ee_rounds_123_en.json still lists #453 as the latest Express Entry round: Transport Occupations, 2026-Version 2, 150 invitations, CRS score of 477, drawn October 28, 2026 at 10:34:14 UTC (cut-off June 4, 2026 at 21:48:22 UTC). Previous latest #452 French-Language proficiency 2026-Version 2 remains in that file (5,000 / CRS 407, 27 Oct 2026). The standing official JSON lists 454 round records. As of November 3, 2026, IRCC is changing Comprehensive Ranking System points and says it will pause invitation rounds for up to two weeks while existing profiles are recalculated under the new Labour Market Integration factor (maximum 150 points). The canonical invitations URL is invitations.html?q=453.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/changes.html',
      },
      {
        id: 'fallback-levels-2027',
        title: '2027–2029 plan holds 380,000 permanent residents',
        desc: 'Official levels stay at 380,000 PRs and 370,000 new temporary residents a year.',
        content:
          'IRCC’s 2027–2029 Immigration Levels Plan (date-modified 2026-11-05) keeps permanent resident admissions at 380,000 for each of the next three years and stabilizes new temporary-resident arrivals at 370,000 a year (220,000 workers and 150,000 students). About 64% of the permanent-resident target is economic immigration. French-speaking admissions outside Quebec are set at 9.5% in 2027, 10.5% in 2028, and 12% in 2029. CIC News still headlines a combined “up to 622,000” figure that mixes the plan’s high range with Budget 2026 in-Canada transition measures; the official levels pages remain 380,000 / 370,000.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/immigration-system/levels.html',
      },
    ];
  }

  return [
    {
      id: 'fallback-fta',
      title: 'Kanada–Türkiye STA istişareleri kapandı',
      desc: 'Kamu görüşleri 14 Eylül’de kapandı; 21 Eylül niyet bildiriminin ardından müzakereler sürüyor.',
      content:
        'Global Affairs Canada’nın olası Kanada–Türkiye serbest ticaret anlaşması istişaresi Closed. Pencere 31 Temmuz–14 Eylül 2026; what-we-heard raporu henüz yayımlanmamış (/what-we-heard ve /report yolları yok). Resmi STA bilgi sayfası (date-modified 2026-10-09) Current status: In negotiations diyor; hükümet 21 Eylül 2026’da Notice of intent yayımladı, müzakereler 7 Temmuz ortak açıklamasında duyurulmuştu. İlişkiler sayfasındaki (dateModified 2026-10-06) 2025 rakamları güncel: ikili mal ticareti 4,3 milyar dolardan fazla, Türkiye’deki Kanada doğrudan yatırımı 3,3 milyar dolar, Türk vatandaşlarına yaklaşık 2.550 öğrenim izni ve önde gelen ihracatlar arasında tarım-gıda. İlişkiler sayfası JETCO forumunu anlatıyor.',
      category: 'Ekonomi',
      color: 'bg-primary-mid',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-express-entry-453',
      title: 'Express Entry turları #453 sonrası durdu',
      desc: 'IRCC 3 Kasım’da davetleri durdurdu; son tur hâlâ Ulaştırma 150 / CRS 477.',
      content:
        'IRCC resmi ee_rounds_123_en.json hâlâ en son tur olarak #453’ü listeliyor: Transport Occupations, 2026-Version 2, 150 davet, 477 CRS, 28 Ekim 2026 10:34:14 UTC (kesim 4 Haziran 2026 21:48:22 UTC). Önceki #452 French-Language proficiency 2026-Version 2 dosyada duruyor (5.000 / CRS 407, 27 Ekim 2026). Resmi JSON 454 tur kaydı içeriyor. 3 Kasım 2026 itibarıyla IRCC Comprehensive Ranking System puanlarını değiştiriyor ve mevcut profiller yeni Labour Market Integration faktörüne (en fazla 150 puan) göre yeniden hesaplanırken davet turlarını iki haftaya kadar durduracağını söylüyor. Canonical davet URL’si invitations.html?q=453.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/changes.html',
    },
    {
      id: 'fallback-levels-2027',
      title: '2027–2029 planı 380.000 daimi ikamet hedefinde',
      desc: 'Resmi plan yılda 380.000 daimi ikamet ve 370.000 yeni geçici sakin hedefliyor.',
      content:
        'IRCC’nin 2027–2029 Göçmenlik Seviyeleri Planı (date-modified 2026-11-05) önümüzdeki üç yıl için daimi ikamet kabullerini 380.000’de tutuyor ve yeni geçici sakin gelişlerini yılda 370.000’de sabitliyor (220.000 işçi ve 150.000 öğrenci). Daimi ikamet hedefinin yaklaşık %64’ü ekonomik göç. Quebec dışı Fransızca konuşan kabuller 2027’de %9,5, 2028’de %10,5 ve 2029’da %12. CIC News hâlâ planın üst bandını Bütçe 2026 geçiş tedbirleriyle birleştiren “622.000’e kadar” manşetini kullanıyor; resmi sayfalar 380.000 / 370.000.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/immigration-system/levels.html',
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
  type?: BannerAd['type'] | 'news';
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

/** Homepage hero: curated Canada news first, then extra live items, then approved ads/news. */
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
  const curated = getDefaultCanadaNews(lang)
    .filter((item) => item?.title && !existingTitles.has(normalizeTitle(item.title)))
    .slice(0, 3)
    .map((item, index) => mapNewsToBannerItem(item, index, lang, imageFallback));

  curated.forEach((item) => existingTitles.add(normalizeTitle(item.title)));

  const extraLive = (liveNews || [])
    .filter((item) => item?.title && !existingTitles.has(normalizeTitle(item.title)))
    .slice(0, 2)
    .map((item, index) => mapNewsToBannerItem(item, 100 + index, lang, imageFallback));

  return [...curated, ...extraLive, ...stored];
}
