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
          'Global Affairs Canada’s consultation on a potential Canada–Türkiye free trade agreement is Closed. The TCE-Consultations page still lists the window as 31 July to 14 September 2026 and says a what-we-heard report has not yet been published (the /what-we-heard and /report paths remain unpublished). The official FTA info page (date-modified 2026-10-09) now shows Current status: In negotiations, after the government tabled a Notice of intent on September 21, 2026; negotiations were first announced in a 7 July joint statement. Official 2025 figures remain the latest on the relations page (dateModified is now 2026-10-06): two-way merchandise trade over $4.3 billion, Canadian direct investment stock in Türkiye of $3.3 billion, about 2,550 study permits for Turkish citizens, and agri-food among Canada’s leading exports. The relations page still describes the Canada–Türkiye JETCO forum; the documented 2026-01-20 JETCO country-news path is unpublished. Verified 20:00 UTC 27 October 2026 from international.canada.ca / www.international.gc.ca (urllib first/extra HTTP 200; extra2 timed out on FTA info; wget first HTTP 200; curl HTTP/2 and HTTP/1.1 first HTTP 200).',
        category: 'Economy',
        color: 'bg-primary-mid',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-express-entry-452',
        title: 'Express Entry #452: French-language proficiency',
        desc: 'Official Oct 27, 2026 round: 5,000 invitations, CRS 407; French-language proficiency.',
        content:
          'IRCC’s official ee_rounds_123_en.json now lists #452 as the latest Express Entry round: French-Language proficiency 2026-Version 2, 5,000 invitations, CRS score of 407, drawn October 27, 2026 at 10:17:26 UTC (cut-off July 13, 2026 at 19:22:00 UTC). This hour canada.ca urllib first/extra/extra2/later timed out on IRCC JSON / rounds / category / invitations (60s); wget first timed out in headers (0 bytes); curl HTTP/2 first INTERNAL_ERROR / http_code=000 (err 2); curl HTTP/1.1 first timed out / http_code=000. WebFetch retrieved the official JSON with 453 round records, latest #452. Official rounds HTML this hour is the slimmer JS-driven template that loads ee_rounds_123_en.json (WebFetch retrieved the JS-driven table; urllib/wget/curl did not retrieve the raw HTML). The canonical invitations URL is invitations.html?q=452. CIC News now lists a dedicated homepage article for official round #452 (1081876; article:published_time 2026-10-27T14:38:42+00:00; article:modified_time 2026-10-27T14:38:42+00:00; Last-Modified Tuesday, 27 October 2026 at 19:12:50 GMT urllib first/extra/extra2 / later / wget first / curl HTTP/2 and HTTP/1.1 first; CIC homepage Last-Modified Tuesday, 27 October 2026 at 19:28:55 GMT urllib first/extra/extra2 / later / wget first / curl HTTP/2 and HTTP/1.1 first), with 1081832 (#451 Provincial Nominee Program, 792 / CRS 761) also on the homepage. 1081461 (#450 French-Language proficiency, 5,000 / CRS 435) is NOT on the homepage. 1081344 (#449 Canadian Experience Class, 2,500 / CRS 519) is NOT on the homepage. 1081246 (#448 Provincial Nominee Program, 752 / CRS 772) is NOT on the homepage. 1080909 (#447 Trades Occupations, 3,500 / CRS 476) is NOT on the homepage. Unused homepage article 1081923 is a British Columbia provincial nomination (cleaners, security staff, and entrepreneurs; article:published_time 2026-10-27T19:22:49+00:00), not an Express Entry round; unused homepage article 1081903 is a Minnesota citizenship-by-descent parish-records feature (article:published_time 2026-10-27T17:16:04+00:00), not a new Express Entry round; unused homepage article 1081904 is an IRCC CRS-score pool breakdown (article:published_time 2026-10-27T16:42:18+00:00), not a new Express Entry round; 1081864 is a citizenship-by-descent explainer (female ancestors); 1081857 is an Alberta provincial nomination (560 workers), not an Express Entry round; 1081659 is partner lending explainer content; 1081838 is a Manitoba provincial nomination; 1081823 and 1081816 are citizenship-by-descent explainers; 1081487 is the October 16 CRS/LMIA reform explainer. Earlier CIC articles 0980843, 0980374, and 0980361 remain published. Verified 20:00 UTC 27 October 2026 from canada.ca and www.cicnews.com.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
      },
      {
        id: 'fallback-military-category',
        title: 'Express Entry 2026: skilled military recruits',
        desc: 'FSMA: 10 years’ continuous service and a CAF offer in NOC 40042, 42102 or 43204.',
        content:
          'IRCC’s 2026 category-based selection page still lists skilled military recruits as an Express Entry category. To be eligible as a Foreign Skilled Military Applicant (FSMA) you must be serving in a recognized foreign military with a minimum of ten years of continuous service, have training aligned with National Occupational Classification 40042 (Commissioned officers of the Canadian Armed Forces), 42102 (Specialized members), or 43204 (Operations members), and have an offer of arranged employment with the Canadian Armed Forces made by the Canadian Forces Recruiting Group. Other 2026 categories still include French-language proficiency, healthcare and social services, STEM, trades, education, transport, physicians with Canadian work experience, senior managers, and researchers. Dedicated category URLs under category-based-selection/{skilled-military-recruits,french-language-proficiency,researchers,medical-doctors}.html remain unpublished (urllib first timed out this hour). The canonical page is submit-profile/rounds-invitations/category-based-selection.html (it 301s to /express-entry/rounds-invitations/category-based-selection.html). The old short path /express-entry/category-based-selection.html is HTTP 404. Official category page urllib first/extra/extra2/later timed out; wget first timed out; curl HTTP/2 first INTERNAL_ERROR; curl HTTP/1.1 first timed out; WebFetch retrieved the official category page with the skilled-military category unchanged. Verified 20:00 UTC 27 October 2026 from canada.ca.',
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
        'Global Affairs Canada’nın olası Kanada–Türkiye serbest ticaret anlaşması istişaresi Closed. TCE-Consultations sayfası pencereyi hâlâ 31 Temmuz–14 Eylül 2026 olarak gösteriyor; what-we-heard raporu henüz yayımlanmamış (/what-we-heard ve /report yolları yok). Resmi STA bilgi sayfası (date-modified 2026-10-09) Current status: In negotiations diyor; hükümet 21 Eylül 2026’da Notice of intent yayımladı. İlişkiler sayfasındaki (dateModified 2026-10-06) 2025 rakamları güncel: ikili mal ticareti 4,3 milyar dolardan fazla, Türkiye’deki Kanada doğrudan yatırımı 3,3 milyar dolar, Türk vatandaşlarına yaklaşık 2.550 öğrenim izni ve önde gelen ihracatlar arasında tarım-gıda. İlişkiler sayfası JETCO forumunu anlatıyor; belgelenen 2026-01-20 JETCO yolu yayımlanmamış. 27 Ekim 2026 20.00 UTC’te international.canada.ca / www.international.gc.ca üzerinden doğrulandı (urllib first/extra HTTP 200; extra2 timed out; wget first HTTP 200; curl HTTP/2 and HTTP/1.1 first HTTP 200).',
      category: 'Ekonomi',
      color: 'bg-primary-mid',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-express-entry-452',
      title: 'Express Entry #452: Fransızca yeterlilik',
      desc: '27 Ekim 2026 resmi tur: 5.000 davet, CRS 407; French-language proficiency.',
      content:
        'IRCC resmi ee_rounds_123_en.json artık en son tur olarak #452’yi listeliyor: French-Language proficiency 2026-Version 2, 5.000 davet, 407 CRS, 27 Ekim 2026 10:17:26 UTC (kesim 13 Temmuz 2026 19:22:00 UTC). Bu saatte canada.ca urllib first/extra/extra2/later IRCC JSON / tur / kategori için zaman aşımına uğradı; wget first zaman aşımı; curl HTTP/2 first INTERNAL_ERROR; curl HTTP/1.1 first zaman aşımı. WebFetch resmi JSON’da 453 tur kaydı ve en son #452’yi doğruladı. Resmi tur HTML’si bu saatte daha ince JS şablonu (WebFetch). Canonical davet URL’si invitations.html?q=452. CIC News resmi #452 turu için 1081876 ana sayfa haberini gösteriyor (yayımlanma 2026-10-27T14:38:42+00:00; Last-Modified urllib first/extra/extra2 / later / wget / curl HTTP/2 and HTTP/1.1 first 27 Ekim 2026 Salı 19.12.50 GMT); ana sayfa Last-Modified urllib first/extra/extra2 / later / wget / curl HTTP/2 and HTTP/1.1 first 27 Ekim 2026 Salı 19.28.55 GMT. 1081832 (#451 PNP) ana sayfada. 1081461 (#450 Fransızca yeterlilik) ana sayfada değil. 1081344 (#449 CEC) ana sayfada değil. 1081246 (#448 PNP) ana sayfada değil. 1080909 (#447 meslekler) ana sayfada değil. Kullanılmayan 1081923 British Columbia eyalet adaylığı; 1081903 Minnesota vatandaşlık-soy haberi; 1081904 CRS havuz dökümü; 1081864 vatandaşlık-soy açıklayıcısı; 1081857 Alberta eyalet adaylığı; 1081659 ortak içerik. 27 Ekim 2026 20.00 UTC’te canada.ca ve www.cicnews.com üzerinden doğrulandı.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
    },
    {
      id: 'fallback-military-category',
      title: 'Express Entry 2026: nitelikli askeri adaylar',
      desc: 'FSMA: 10 yıl kesintisiz hizmet ve NOC 40042, 42102 veya 43204’te Kuvvetler teklifi.',
      content:
        'IRCC’nin 2026 kategori bazlı seçim sayfası nitelikli askeri adayları (skilled military recruits) hâlâ bir Express Entry kategorisi olarak listeliyor. Foreign Skilled Military Applicant (FSMA) için tanınmış bir yabancı orduda en az 10 yıl kesintisiz hizmet, NOC 40042, 42102 veya 43204 ile uyumlu eğitim ve Canadian Forces Recruiting Group tarafından verilen bir Canadian Armed Forces iş teklifi gerekiyor. Ayrı kategori URL’leri bu saatte urllib first zaman aşımı; canonical sayfa submit-profile/rounds-invitations/category-based-selection.html. Resmi kategori sayfası urllib/wget/curl bu saatte alınamadı; WebFetch resmi sayfayı aldı ve askeri kategori değişmedi. 27 Ekim 2026 20.00 UTC’te canada.ca üzerinden doğrulandı.',
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
