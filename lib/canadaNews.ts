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

/** Hourly 05:00 UTC 8 November 2026 source check — not shown on the homepage. */
export const BANNER_NEWS_VERIFIED_AT = '2026-11-08T05:00:00Z';

export const HOURLY_SOURCE_CHECK = {
  hour: '05:00 UTC 8 November 2026',
  latestExpressEntryRound: 453,
  expressEntryRoundCount: 454,
  eeJsonLastModified: 'Wed, 28 Oct 2026 13:37:19 GMT',
  eeJsonBytes: 742096,
  ftaConsultation: 'Closed (31 July–14 September 2026)',
  ftaInfoStatus: 'In negotiations (Notice of intent 21 September 2026, date-modified 2026-10-09)',
  relationsDateModified: '2026-10-06',
  jetcoPath:
    '2026-01-20 country_news urllib first/extra/extra2/later HTTP 200 (25730); wget first HTTP 200 (25730); curl HTTP/2 first HTTP 200 (25730); curl HTTP/1.1 first HTTP 200 (25730); world-monde prefix urllib first/extra/extra2/later HTTP 404 (11611); wget first HTTP 404 (0 bytes); curl HTTP/2 first HTTP 404 (11611); curl HTTP/1.1 first HTTP 404 (11611)',
  categoryPage:
    'www.canada.ca reachable this hour (Akamai 23.196.195.140); old eligibility/categories.html urllib first/extra/extra2/later HTTP 404 (14979); guessed /express-entry/category.html first/extra/extra2/later HTTP 404 (14979); skilled-military first/extra/extra2/later HTTP 404 (14979); www submit-profile urllib first/extra/extra2 HTTP 200 (31287) Last-Modified Sunday, 8 November 2026 at 00:24:58 GMT later HTTP 200 (31286) Last-Modified Sunday, 8 November 2026 at 00:24:58 GMT; wget first HTTP 200 (31287) Last-Modified Sunday, 8 November 2026 at 00:24:58 GMT; pause after 3 November CRS recalculation remains in effect; live official EE JSON 742096 / 454 records / latest #453 Transport Occupations / 150 / CRS 477 Last-Modified Wednesday, 28 October 2026 at 13:37:19 GMT',
  unusedCicHomepage: [
    '1182320',
    '1182312',
    '1182266',
    '1182269',
    '1182044',
    '1182174',
    '1182218',
    '1182142',
    '1182146',
    '1182160',
    '1182149',
    '1182123',
    '1182231',
    '1182134',
    '1182116',
    '1182108',
    '1182055',
  ],
  urllib: {
    ftaConsult: 'first/extra/extra2/later HTTP 200 (23064)',
    ftaInfo: 'first/extra/extra2/later HTTP 200 (25990)',
    relations: 'first/extra/extra2/later HTTP 200 (28593)',
    jetco: 'first/extra/extra2/later HTTP 200 (25730)',
    eeJson:
      'first/extra/extra2/later HTTP 200 (742096) Last-Modified Wednesday, 28 October 2026 at 13:37:19 GMT',
    eeRounds:
      'first/extra HTTP 200 (142199) extra2 HTTP 200 (142198) later HTTP 200 (142199) Last-Modified Saturday, 7 November 2026 at 23:03:22 GMT',
    category:
      'old path first/extra/extra2/later HTTP 404 (14979); guessed /express-entry/category.html first/extra/extra2/later HTTP 404 (14979); www submit-profile first/extra/extra2 HTTP 200 (31287) Last-Modified Sunday, 8 November 2026 at 00:24:58 GMT later HTTP 200 (31286) Last-Modified Sunday, 8 November 2026 at 00:24:58 GMT',
    catDedicated: 'skilled-military first/extra/extra2/later HTTP 404 (14979)',
    eeChanges:
      'first/extra/extra2/later HTTP 200 (34806) Last-Modified Saturday, 7 November 2026 at 23:28:12 GMT',
    levels:
      'first/extra/extra2/later HTTP 200 (55405) Last-Modified Sunday, 8 November 2026 at 00:11:16 GMT',
    levelsSupp:
      'publications-manuals first/extra/extra2/later HTTP 404 (14979); canonical supplementary-immigration-levels-2027-2029 first/extra/extra2/later HTTP 200 (52077) Last-Modified Saturday, 7 November 2026 at 23:57:08 GMT',
    irccNewsLevels:
      'guessed notices path first/extra/extra2/later HTTP 404 (14979); official news/2026/11/building-a-stronger-canada-through-a-well-managed-predictable-immigration-system.html first/extra/extra2/later HTTP 200 (40636) Last-Modified Sunday, 8 November 2026 at 00:22:06 GMT',
    cicHome:
      'first/extra HTTP 200 (183424) extra2 HTTP 200 (183422) later HTTP 200 (183424) Last-Modified Sunday, 8 November 2026 at 03:18:18 GMT',
    cic1182320:
      '?p= first HTTP 404 (71560); extra/extra2/later HTTP 404 (71559); canonical slug urllib first HTTP 200 (137612) extra HTTP 200 (137611) extra2 HTTP 200 (137612) later HTTP 200 (137611) Last-Modified Sunday, 8 November 2026 at 03:17:55 GMT (ECE work-permit freeze exemption; unused; still 03:17:55 GMT)',
    cic1182312:
      '?p= first HTTP 404 (71560); extra/extra2 HTTP 404 (71559); later HTTP 404 (71560); canonical slug urllib first HTTP 200 (133880) extra/extra2 HTTP 200 (133882) later HTTP 200 (133880) Last-Modified Sunday, 8 November 2026 at 03:32:28 GMT (200,000 in-Canada PR pathways; unused; Last-Modified moved from 03:17:51 GMT)',
    cic1182266:
      '?p= first HTTP 404 (71559); extra HTTP 404 (71560); extra2 HTTP 404 (71559); later HTTP 404 (71560); canonical slug urllib first HTTP 200 (151695) extra/extra2 HTTP 200 (151694) later HTTP 200 (151695) Last-Modified Sunday, 8 November 2026 at 03:15:34 GMT (Manitoba 488; unused; still 03:15:34 GMT)',
    cic1182123:
      '?p= first HTTP 404 (71559); extra HTTP 404 (71560); extra2/later HTTP 404 (71561); canonical slug urllib first HTTP 200 (174124) extra/extra2/later HTTP 200 (174125) Last-Modified Sunday, 8 November 2026 at 03:19:28 GMT (citizenship-by-descent lawyer guide; unused; still 03:19:28 GMT)',
    cic1182146:
      '?p= first/extra/extra2 HTTP 404 (71559); later HTTP 404 (71560); canonical slug urllib first HTTP 200 (142115) extra HTTP 200 (142116) extra2 HTTP 200 (142115) later HTTP 200 (142116) Last-Modified Sunday, 8 November 2026 at 03:13:54 GMT (high-wage CRS calculator; unused; still 03:13:54 GMT)',
    cic1182142:
      '?p= first/extra HTTP 404 (71560); extra2 HTTP 404 (71558); later HTTP 404 (71559); canonical slug urllib first/extra HTTP 200 (145881) extra2 HTTP 200 (145882) later HTTP 200 (145881) Last-Modified Sunday, 8 November 2026 at 03:24:20 GMT (Newfoundland and Labrador, 75 selections; unused; still 03:24:20 GMT)',
    cic1182044:
      '?p= first HTTP 404 (71560); extra/extra2 HTTP 404 (71559); later HTTP 404 (71560); canonical slug urllib first HTTP 200 (150167) extra HTTP 200 (150169) extra2 HTTP 200 (150168) later HTTP 200 (150167) Last-Modified Sunday, 8 November 2026 at 03:12:27 GMT (622,000 combined headline; unused; Last-Modified moved from 03:11:26 GMT)',
    cic1182269:
      '?p= first HTTP 404 (71560); extra/extra2 HTTP 404 (71559); later HTTP 404 (71560); canonical slug urllib first/extra HTTP 200 (152663) extra2 HTTP 200 (152661) later HTTP 200 (152662) Last-Modified Sunday, 8 November 2026 at 03:11:54 GMT (citizenship-by-descent / 2027 plan; unused; still 03:11:54 GMT)',
    cic1182231:
      '?p= first/extra/extra2 HTTP 404 (71560); later HTTP 404 (71561); canonical slug urllib first HTTP 200 (139945) extra HTTP 200 (139946) extra2/later HTTP 200 (139945) Last-Modified Sunday, 8 November 2026 at 03:16:09 GMT (citizenship-by-descent paperwork; unused; still 03:16:09 GMT)',
    cic1182108:
      '?p= first/extra HTTP 404 (71560); extra2/later HTTP 404 (71561); canonical slug urllib first/extra/extra2/later HTTP 200 (138008) Last-Modified Sunday, 8 November 2026 at 03:12:51 GMT (Thunder Bay 150 regional PR spaces; unused; Last-Modified moved from 03:12:50 GMT)',
    cic1182055:
      '?p= first HTTP 404 (71559); extra HTTP 404 (71561); extra2/later HTTP 404 (71560); canonical slug urllib first/extra HTTP 200 (153104) extra2 HTTP 200 (153103) later HTTP 200 (153104) Last-Modified Sunday, 8 November 2026 at 03:11:32 GMT (BC largest 2026 draw; unused; still 03:11:32 GMT)',
  },
  wget: {
    ftaConsult: 'first HTTP 200 (23064)',
    ftaInfo: 'first HTTP 200 (25990)',
    relations: 'first HTTP 200 (28593)',
    jetco: 'first HTTP 200 (25730)',
    eeJson:
      'first HTTP 200 (742096) Last-Modified Wednesday, 28 October 2026 at 13:37:19 GMT (454 records with latest #453 Transport Occupations / 150 / CRS 477)',
    eeRounds:
      'first HTTP 200 (142199) Last-Modified Saturday, 7 November 2026 at 23:03:22 GMT',
    category:
      'old path eligibility/categories.html first HTTP 404 (0 bytes); guessed /express-entry/category.html first HTTP 404 (0 bytes); www submit-profile path first HTTP 200 (31287) Last-Modified Sunday, 8 November 2026 at 00:24:58 GMT',
    catDedicated: 'skilled-military wget first HTTP 404 (0 bytes)',
    eeChanges:
      'first HTTP 200 (34806) Last-Modified Saturday, 7 November 2026 at 23:28:12 GMT',
    levels:
      'first HTTP 200 (55405) Last-Modified Sunday, 8 November 2026 at 00:11:16 GMT',
    levelsSupp:
      'publications-manuals first HTTP 404 (0 bytes); canonical supplementary-immigration-levels-2027-2029 first HTTP 200 (52077) Last-Modified Saturday, 7 November 2026 at 23:57:08 GMT',
    irccNewsLevels:
      'guessed notices path first HTTP 404 (0 bytes); official news/2026/11 path first HTTP 200 (40636) Last-Modified Sunday, 8 November 2026 at 00:22:06 GMT',
    cicHome: 'first HTTP 200 (183424) Last-Modified Sunday, 8 November 2026 at 03:18:18 GMT',
  },
  curlHttp2: {
    ftaConsult: 'first HTTP 200 (23064)',
    ftaInfo: 'first HTTP 200 (25990)',
    relations: 'first HTTP 0 timeout after connect (0 bytes)',
    jetco: 'first HTTP 200 (25730)',
    eeJson:
      'first HTTP 200 (742096) Last-Modified Wednesday, 28 October 2026 at 13:37:19 GMT',
    eeRounds:
      'first HTTP 200 (142190) Last-Modified Saturday, 7 November 2026 at 23:03:22 GMT',
    category: 'old path first HTTP 404 (14979)',
    catDedicated: 'first HTTP 404 (14979) on related IRCC category paths',
    cicHome: 'first HTTP 200 (183424) Last-Modified Sunday, 8 November 2026 at 03:18:18 GMT',
    cic1182044: 'first HTTP 200 (150169) Last-Modified Sunday, 8 November 2026 at 03:12:27 GMT',
  },
  curlHttp11: {
    ftaConsult: 'first HTTP 200 (23064)',
    ftaInfo: 'first HTTP 200 (25990)',
    relations: 'first HTTP 200 (28593)',
    jetco: 'first HTTP 200 (25730)',
    eeJson:
      'first HTTP 200 (742096) Last-Modified Wednesday, 28 October 2026 at 13:37:19 GMT',
    eeRounds:
      'first HTTP 200 (142199) Last-Modified Saturday, 7 November 2026 at 23:03:22 GMT',
    category: 'old path first HTTP 404 (14979)',
    cicHome: 'first HTTP 200 (183423) Last-Modified Sunday, 8 November 2026 at 03:18:18 GMT',
    cic1182044: 'first HTTP 200 (150169) Last-Modified Sunday, 8 November 2026 at 03:12:27 GMT',
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
