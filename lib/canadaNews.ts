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

/** Hourly 11:00 UTC 7 November 2026 source check — not shown on the homepage. */
export const BANNER_NEWS_VERIFIED_AT = '2026-11-07T11:00:00Z';

export const HOURLY_SOURCE_CHECK = {
  hour: '11:00 UTC 7 November 2026',
  latestExpressEntryRound: 453,
  expressEntryRoundCount: 454,
  eeJsonLastModified: 'Wed, 28 Oct 2026 13:37:19 GMT',
  eeJsonBytes: 742096,
  ftaConsultation: 'Closed (31 July–14 September 2026)',
  ftaInfoStatus: 'In negotiations (Notice of intent 21 September 2026, date-modified 2026-10-09)',
  relationsDateModified: '2026-10-06',
  jetcoPath:
    '2026-01-20 country_news urllib first/extra/extra2/later HTTP 200 (25730); wget first HTTP 200 (25730); curl HTTP/2 first HTTP 200 (25730); curl HTTP/1.1 first HTTP 200 (25730); world-monde prefix urllib first/extra/extra2 HTTP 404 (11611); later HTTP 000 (0 bytes); wget first HTTP 404 (0 bytes); curl HTTP/2 first HTTP 404 (11611); curl HTTP/1.1 first HTTP 404 (11611)',
  categoryPage:
    'skilled military recruits still listed; www submit-profile path wget follows 301 to rounds-invitations without submit-profile; old path wget follows 302 then 301; dedicated category URLs wget first HTTP 404 (0 bytes); urllib first/extra/extra2/later HTTP 404 (14979)',
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
  ],
  urllib: {
    ftaConsult: 'first/extra/extra2/later HTTP 200 (23064)',
    ftaInfo: 'first/extra/extra2/later HTTP 200 (25990)',
    relations: 'first/extra/extra2/later HTTP 200 (28593)',
    jetco: 'first/extra/extra2/later HTTP 200 (25730)',
    eeJson:
      'first/extra/extra2/later HTTP 200 (742096) Last-Modified Wednesday, 28 October 2026 at 13:37:19 GMT',
    eeRounds:
      'first/extra/extra2/later HTTP 200 (38570) Last-Modified Saturday, 7 November 2026 at 03:52:51 GMT',
    category:
      'www submit-profile first/extra HTTP 200 (54764) Last-Modified Saturday, 7 November 2026 at 03:39:53 GMT; extra2/later HTTP 200 (54764) Last-Modified Saturday, 7 November 2026 at 04:00:38 GMT; canonical first/extra/extra2/later HTTP 200 (54764) Last-Modified Saturday, 7 November 2026 at 04:00:38 GMT; old path first/extra/extra2 HTTP 200 (54764) Last-Modified Saturday, 7 November 2026 at 04:00:38 GMT; later HTTP 200 (54763) Last-Modified Saturday, 7 November 2026 at 04:00:38 GMT',
    catDedicated:
      'skilled-military/french/researchers/medical-doctors urllib first/extra/extra2/later HTTP 404 (14979); old-short dedicated path urllib first/extra/extra2/later HTTP 404 (14979)',
    eeChanges:
      'first/extra/extra2/later HTTP 200 (34806) Last-Modified Saturday, 7 November 2026 at 04:49:43 GMT',
    levels:
      'first/extra2/later HTTP 200 (55405) Last-Modified Saturday, 7 November 2026 at 03:49:40 GMT; extra HTTP 200 (55404) Last-Modified Saturday, 7 November 2026 at 03:49:40 GMT',
    levelsSupp:
      'publications-manuals first/extra/extra2/later HTTP 404 (14979); canonical supplementary-immigration-levels-2027-2029 first HTTP 200 (52076) Last-Modified Saturday, 7 November 2026 at 03:01:11 GMT; extra/extra2/later HTTP 200 (52077) Last-Modified Saturday, 7 November 2026 at 03:01:11 GMT',
    irccNewsLevels:
      'first/extra/extra2/later HTTP 200 (40635) Last-Modified Saturday, 7 November 2026 at 03:00:25 GMT',
    cicHome:
      'first HTTP 200 (183756) Last-Modified Saturday, 7 November 2026 at 10:06:01 GMT; extra/extra2/later HTTP 200 (183423) Last-Modified Saturday, 7 November 2026 at 11:06:33 GMT',
    cic1182320:
      '?p= first/later HTTP 404 (71559); extra HTTP 404 (71558); extra2 HTTP 404 (71560); canonical slug urllib first/extra/extra2/later HTTP 200 (137575) Last-Modified Saturday, 7 November 2026 at 10:08:18 GMT (ECE work-permit freeze exemption; unused)',
    cic1182312:
      '?p= first HTTP 404 (71559); extra/extra2/later HTTP 404 (71560); canonical slug urllib first/extra/extra2 HTTP 200 (136019) Last-Modified Saturday, 7 November 2026 at 10:07:40 GMT; later HTTP 200 (136018) Last-Modified Saturday, 7 November 2026 at 10:07:40 GMT (200,000 in-Canada PR pathways; unused)',
    cic1182266:
      '?p= first/extra2 HTTP 404 (71559); extra/later HTTP 404 (71560); canonical slug urllib first/extra/later HTTP 200 (151660) Last-Modified Saturday, 7 November 2026 at 09:07:39 GMT; extra2 HTTP 200 (151658) Last-Modified Saturday, 7 November 2026 at 09:07:39 GMT (Manitoba 488; unused)',
    cic1182123:
      '?p= first HTTP 404 (71560); extra HTTP 404 (71559); extra2/later HTTP 404 (71426); canonical slug urllib first/later HTTP 200 (174017) Last-Modified Saturday, 7 November 2026 at 09:10:04 GMT; extra/extra2 HTTP 200 (174151) Last-Modified Saturday, 7 November 2026 at 09:10:04 GMT',
    cic1182146:
      '?p= first HTTP 404 (71559); extra/extra2/later HTTP 404 (71560); canonical slug urllib first/later HTTP 200 (141944) Last-Modified Saturday, 7 November 2026 at 09:08:17 GMT; extra HTTP 200 (142077) Last-Modified Saturday, 7 November 2026 at 09:08:17 GMT; extra2 HTTP 200 (142079) Last-Modified Saturday, 7 November 2026 at 09:08:17 GMT',
    cic1182142:
      '?p= first/extra2/later HTTP 404 (71560); extra HTTP 404 (71559); canonical slug urllib first HTTP 200 (145842) Last-Modified Saturday, 7 November 2026 at 09:08:20 GMT; extra/later HTTP 200 (145841) Last-Modified Saturday, 7 November 2026 at 09:08:20 GMT; extra2 HTTP 200 (145843) Last-Modified Saturday, 7 November 2026 at 09:08:20 GMT (Newfoundland and Labrador, 75 selections; unused)',
    cic1182044:
      '?p= first/later HTTP 404 (71560); extra/extra2 HTTP 404 (71559); canonical slug urllib first/extra HTTP 200 (150067) Last-Modified Saturday, 7 November 2026 at 09:12:08 GMT; extra2 HTTP 200 (150066) Last-Modified Saturday, 7 November 2026 at 09:12:08 GMT; later HTTP 200 (149933) Last-Modified Saturday, 7 November 2026 at 09:12:08 GMT (622,000 combined headline; unused)',
    cic1182269:
      '?p= first/extra2/later HTTP 404 (71560); extra HTTP 404 (71559); canonical slug urllib first/extra HTTP 200 (152561) Last-Modified Saturday, 7 November 2026 at 09:05:38 GMT; extra2/later HTTP 200 (152560) Last-Modified Saturday, 7 November 2026 at 09:05:38 GMT (citizenship-by-descent / 2027 plan; unused)',
    cic1182231:
      '?p= first/extra/extra2/later HTTP 404 (71426); canonical slug urllib first/extra/extra2/later HTTP 200 (140240) Last-Modified Saturday, 7 November 2026 at 11:00:09 GMT (citizenship-by-descent paperwork; unused)',
  },
  wget: {
    ftaConsult: 'first HTTP 200 (23064)',
    ftaInfo: 'first HTTP 200 (25990)',
    relations: 'first HTTP 200 (28593)',
    jetco: 'first HTTP 200 (25730)',
    eeJson:
      'first HTTP 200 (742096 bytes Last-Modified Wednesday, 28 October 2026 at 13:37:19 GMT, 454 records with latest #453)',
    eeRounds:
      'first HTTP 200 (38570-byte body) Last-Modified Saturday, 7 November 2026 at 03:52:51 GMT (still Transport Occupations / 150 / CRS 477 in official JSON)',
    category:
      'canonical first HTTP 200 (54764-byte body after following the 301) Last-Modified Saturday, 7 November 2026 at 04:00:38 GMT; old path first HTTP 200 (54764-byte body after following the 302) Last-Modified Saturday, 7 November 2026 at 04:00:38 GMT',
    catDedicated: 'skilled-military/french/researchers/medical-doctors wget first HTTP 404 (0 bytes)',
    eeChanges: 'first HTTP 200 (34806) Last-Modified Saturday, 7 November 2026 at 04:49:43 GMT',
    levels: 'first HTTP 200 (55405) Last-Modified Saturday, 7 November 2026 at 03:49:40 GMT',
    levelsSupp:
      'publications-manuals first HTTP 404 (0 bytes); canonical supplementary-immigration-levels-2027-2029 first HTTP 200 (52076) Last-Modified Saturday, 7 November 2026 at 03:01:11 GMT',
    irccNewsLevels: 'first HTTP 200 (40635) Last-Modified Saturday, 7 November 2026 at 03:00:25 GMT',
    cicHome: 'first HTTP 200 (183289) Last-Modified Saturday, 7 November 2026 at 11:06:33 GMT',
  },
  curlHttp2: {
    ftaConsult: 'first HTTP 200 (23064)',
    ftaInfo: 'first HTTP 200 (25990)',
    relations: 'first HTTP 200 (28593)',
    jetco: 'first HTTP 200 (25730)',
    eeJson: 'first HTTP 000 (0 bytes)',
    eeRounds: 'first HTTP 000 (0 bytes)',
    category:
      'old path first HTTP 302 (0 bytes); canonical first HTTP 000 (0 bytes)',
    catDedicated: 'first HTTP 000 (0 bytes)',
    cicHome:
      'first/later HTTP 200 (183289) Last-Modified Saturday, 7 November 2026 at 11:06:33 GMT',
    cic1182044: 'first HTTP 200 (149933) Last-Modified Saturday, 7 November 2026 at 09:12:08 GMT',
  },
  curlHttp11: {
    ftaConsult: 'first HTTP 200 (23064)',
    ftaInfo: 'first HTTP 200 (25990)',
    relations: 'first HTTP 200 (28593)',
    jetco: 'first HTTP 200 (25730)',
    eeJson: 'first HTTP 000 (0 bytes)',
    eeRounds: 'first HTTP 000 (0 bytes)',
    category:
      'old path first HTTP 302 (0 bytes); canonical first HTTP 000 (0 bytes)',
    cicHome:
      'first/later HTTP 200 (183289) Last-Modified Saturday, 7 November 2026 at 11:06:33 GMT',
    cic1182044: 'first HTTP 200 (149933) Last-Modified Saturday, 7 November 2026 at 09:12:08 GMT',
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
