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
          'Global Affairs Canada’s consultation on a potential Canada–Türkiye free trade agreement is Closed. The TCE-Consultations page still lists the window as 31 July to 14 September 2026 and says a what-we-heard report has not yet been published (the /what-we-heard and /report paths remain unpublished). The official FTA info page (date-modified 2026-10-09) now shows Current status: In negotiations, after the government tabled a Notice of intent on September 21, 2026; negotiations were first announced in a 7 July joint statement. Official 2025 figures remain the latest on the relations page (dateModified is now 2026-10-06): two-way merchandise trade over $4.3 billion, Canadian direct investment stock in Türkiye of $3.3 billion, about 2,550 study permits for Turkish citizens, and agri-food among Canada’s leading exports. The relations page still describes the Canada–Türkiye JETCO forum; the documented 2026-01-20 JETCO country-news path returned urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200, wget first HTTP 200, curl HTTP/2 first HTTP 200, curl HTTP/1.1 first HTTP 200 this hour. Verified 22:00 UTC 30 October 2026 from international.canada.ca / www.international.gc.ca (consultation urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200; wget first HTTP 200; curl HTTP/2 and HTTP/1.1 first HTTP 200; FTA info urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200; wget first HTTP 200; curl HTTP/2 and HTTP/1.1 first HTTP 200; relations urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200; wget first HTTP 200; curl HTTP/2 and HTTP/1.1 first HTTP 200).',
        category: 'Economy',
        color: 'bg-primary-mid',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-express-entry-453',
        title: 'Express Entry #453: Transport occupations',
        desc: 'Official Oct 28, 2026 round: 150 invitations, CRS 477; Transport Occupations.',
        content:
          'IRCC’s official ee_rounds_123_en.json still lists #453 as the latest Express Entry round: Transport Occupations, 2026-Version 2, 150 invitations, CRS score of 477, drawn October 28, 2026 at 10:34:14 UTC (cut-off June 4, 2026 at 21:48:22 UTC). Previous latest #452 French-Language proficiency 2026-Version 2 remains in that file (5,000 / CRS 407, 27 Oct 2026). This hour urllib first/extra/extra2/later HTTP 200 for the official JSON (742096 bytes Last-Modified Wednesday, 28 October 2026 at 13:37:19 GMT, 454 round records). wget first HTTP 200 742096 bytes. curl HTTP/2 first HTTP 200 742096 bytes. curl HTTP/1.1 first HTTP 200 742096 bytes. Official rounds HTML this hour: urllib first HTTP 200 (142197 bytes) extra HTTP 200 extra2 HTTP 200 later HTTP 200 Last-Modified Friday, 30 October 2026 at 22:00:44 GMT. wget first HTTP 200 Last-Modified Friday, 30 October 2026 at 22:00:44 GMT. curl HTTP/2 first HTTP 200 Last-Modified Friday, 30 October 2026 at 22:00:44 GMT. curl HTTP/1.1 first HTTP 200 Last-Modified Friday, 30 October 2026 at 22:00:44 GMT. The canonical invitations URL is invitations.html?q=453. CIC 1081936 is now the dedicated homepage article for official round #453 (canada-selects-150-workers-for-permanent-residence-under-revamped-transport-category-1081936.html; article:published_time 2026-10-28T14:10:33+00:00; article:modified_time 2026-10-28T14:10:33+00:00; Last-Modified Friday, 30 October 2026 at 21:05:41 GMT urllib first/extra/extra2/later / wget first / curl HTTP/2 and HTTP/1.1 first; CIC homepage Last-Modified urllib first/extra/extra2/later Friday, 30 October 2026 at 21:25:49 GMT; wget first HTTP 200 Last-Modified Friday, 30 October 2026 at 21:25:49 GMT; curl HTTP/2 first HTTP 200 Last-Modified Friday, 30 October 2026 at 21:25:49 GMT; curl HTTP/1.1 first HTTP 200 Last-Modified Friday, 30 October 2026 at 21:25:49 GMT), with 1081876 remaining the dedicated homepage article for official round #452 (canada-invites-5000-francophones-to-apply-for-permanent-residence-1081876.html; article:published_time 2026-10-27T14:38:42+00:00; article:modified_time 2026-10-27T14:38:42+00:00; Last-Modified Friday, 30 October 2026 at 21:06:28 GMT urllib first) and 1081832 (#451 Provincial Nominee Program, 792 / CRS 761) also on the homepage. 1081461 (#450 French-Language proficiency, 5,000 / CRS 435) is NOT on the homepage. 1081344 (#449 Canadian Experience Class, 2,500 / CRS 519) is NOT on the homepage. 1081246 (#448 Provincial Nominee Program, 752 / CRS 772) is NOT on the homepage. 1080909 (#447 Trades Occupations, 3,500 / CRS 476) is NOT on the homepage. Unused homepage article 1082033 is a Newfoundland and Labrador provincial-immigration feature (205 workers; article:published_time 2026-10-29T20:42:50+00:00; article:modified_time 2026-10-30T13:35:05+00:00; Last-Modified Friday, 30 October 2026 at 21:04:52 GMT; urllib first/extra/extra2/later HTTP 200), not an Express Entry round; unused article 1081969 is a work-permit and study-permit extension wait-times feature (article:published_time 2026-10-29T18:39:50+00:00; article:modified_time 2026-10-29T18:39:50+00:00; Last-Modified Friday, 30 October 2026 at 21:06:59 GMT; urllib first/extra/extra2/later HTTP 200) and is NOT on the homepage this hour, not an Express Entry round; unused homepage article 1081995 is a Bill C-3 dual-citizenship feature (article:published_time 2026-10-29T13:38:40+00:00; article:modified_time 2026-10-29T13:38:40+00:00; Last-Modified Friday, 30 October 2026 at 21:06:30 GMT; urllib first HTTP 200, extra HTTP 200, extra2/later HTTP 200), not an Express Entry round; unused homepage article 1082000 is a study-permit tips feature for permanent residence (article:published_time 2026-10-28T21:00:43+00:00; article:modified_time 2026-10-28T21:17:08+00:00; Last-Modified Friday, 30 October 2026 at 21:00:48 GMT; urllib first/extra/extra2/later HTTP 200), not an Express Entry round; unused homepage article 1081956 is a Greater Boston citizenship-by-descent feature (article:published_time 2026-10-28T19:41:43+00:00; Last-Modified Friday, 30 October 2026 at 21:09:17 GMT; urllib first/extra/extra2/later HTTP 200), not an Express Entry round; unused homepage article 1081947 is a work-permit LMIA time-limit scrap (article:published_time 2026-10-28T17:11:39+00:00; article:modified_time 2026-10-29T14:26:24+00:00; Last-Modified Friday, 30 October 2026 at 21:01:47 GMT; urllib first HTTP 200, extra/extra2/later HTTP 200), not an Express Entry round; unused homepage article 1081957 is a Saskatchewan nominations feature (capped sectors nearly full; article:published_time 2026-10-30T15:13:39+00:00; Last-Modified Friday, 30 October 2026 at 21:09:13 GMT; urllib first/extra/extra2/later HTTP 200; on the homepage this hour), not an Express Entry round; unused homepage article 1082079 is an Archives of Ontario online-payment feature for records Americans need to prove Canadian citizenship (article:published_time 2026-10-30T19:31:10+00:00; article:modified_time 2026-10-30T19:31:10+00:00; Last-Modified Friday, 30 October 2026 at 21:25:09 GMT; urllib first/extra/extra2/later HTTP 200; on the homepage this hour), not an Express Entry round; unused homepage article 1082085 is a European student-exchange feature (canada-moves-to-expand-participation-in-european-student-exchange-program-1082085.html; article:published_time 2026-10-30T21:24:08+00:00; article:modified_time 2026-10-30T21:24:08+00:00; Last-Modified Friday, 30 October 2026 at 21:24:19 GMT; urllib first/extra/extra2/later HTTP 200; on the homepage this hour), not an Express Entry round; unused homepage article 1081930 is a work-permit extension for Haitian and Sudanese nationals (article:published_time 2026-10-27T23:44:17+00:00), not an Express Entry round; unused homepage article 1081923 is a British Columbia provincial nomination (cleaners, security staff, and entrepreneurs; article:published_time 2026-10-27T19:22:49+00:00), not an Express Entry round; unused homepage article 1081903 is a Minnesota citizenship-by-descent parish-records feature (article:published_time 2026-10-27T17:16:04+00:00), not a new Express Entry round; unused homepage article 1081904 is an IRCC CRS-score pool breakdown (article:published_time 2026-10-27T16:42:18+00:00), not a new Express Entry round; 1081864 is a citizenship-by-descent explainer (female ancestors); 1081857 is an Alberta provincial nomination (560 workers), not an Express Entry round; 1081659 is partner lending explainer content; 1081838 is a Manitoba provincial nomination; 1081823 and 1081816 are citizenship-by-descent explainers; 1081816 is NOT on the homepage this hour (urllib first/extra/extra2/later HTTP 200 Last-Modified Friday, 30 October 2026 at 21:02:09 GMT); 1081487 is the October 16 CRS/LMIA reform explainer. Earlier CIC articles 0980843, 0980374, and 0980361 remain published. Verified 22:00 UTC 30 October 2026 from canada.ca and www.cicnews.com.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
      },
      {
        id: 'fallback-military-category',
        title: 'Express Entry 2026: skilled military recruits',
        desc: 'FSMA: 10 years continuous service and a Forces offer in NOC 40042, 42102, or 43204.',
        content:
          'IRCC’s 2026 category-based selection page still lists skilled military recruits as an Express Entry category. A Foreign Skilled Military Applicant (FSMA) needs at least ten years of continuous service in a recognized foreign military, training aligned with NOC 40042, 42102, or 43204, and a Canadian Armed Forces job offer from the Canadian Forces Recruiting Group. Dedicated category URLs: skilled-military-recruits urllib first HTTP 404 this hour; wget first HTTP 404. french-language-proficiency, researchers, and medical-doctors urllib first HTTP 404 this hour; wget first HTTP 404. The old short path /express-entry/category-based-selection.html urllib first HTTP 404 this hour; wget first HTTP 404. Canonical page submit-profile/rounds-invitations/category-based-selection.html. Official category page urllib first HTTP 200 Last-Modified Friday, 30 October 2026 at 21:43:13 GMT (54762 bytes); extra HTTP 200 Last-Modified Friday, 30 October 2026 at 19:56:44 GMT (54761 bytes); extra2 HTTP 200 Last-Modified Friday, 30 October 2026 at 21:43:13 GMT (54762 bytes); later HTTP 200 Last-Modified Friday, 30 October 2026 at 19:56:44 GMT (54760 bytes); wget first HTTP 301 Last-Modified Friday, 30 October 2026 at 19:56:44 GMT 54761 bytes; curl HTTP/2 first HTTP 301 (0 bytes); curl HTTP/1.1 first HTTP 301 (0 bytes). The skilled-military category is unchanged. Verified 22:00 UTC 30 October 2026 from canada.ca.',
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
        'Global Affairs Canada’nın olası Kanada–Türkiye serbest ticaret anlaşması istişaresi Closed. TCE-Consultations sayfası pencereyi hâlâ 31 Temmuz–14 Eylül 2026 olarak gösteriyor; what-we-heard raporu henüz yayımlanmamış (/what-we-heard ve /report yolları yok). Resmi STA bilgi sayfası (date-modified 2026-10-09) Current status: In negotiations diyor; hükümet 21 Eylül 2026’da Notice of intent yayımladı. İlişkiler sayfasındaki (dateModified 2026-10-06) 2025 rakamları güncel: ikili mal ticareti 4,3 milyar dolardan fazla, Türkiye’deki Kanada doğrudan yatırımı 3,3 milyar dolar, Türk vatandaşlarına yaklaşık 2.550 öğrenim izni ve önde gelen ihracatlar arasında tarım-gıda. İlişkiler sayfası JETCO forumunu anlatıyor; belgelenen 2026-01-20 JETCO yolu bu saatte urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200, wget first HTTP 200, curl HTTP/2 first HTTP 200, curl HTTP/1.1 first HTTP 200 döndü. 30 Ekim 2026 22.00 UTC’te international.canada.ca / www.international.gc.ca üzerinden doğrulandı (istişare urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200; wget first HTTP 200; curl HTTP/2 and HTTP/1.1 first HTTP 200; STA bilgi urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200; wget first HTTP 200; curl HTTP/2 and HTTP/1.1 first HTTP 200; ilişkiler urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200; wget first HTTP 200; curl HTTP/2 and HTTP/1.1 first HTTP 200).',
      category: 'Ekonomi',
      color: 'bg-primary-mid',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-express-entry-453',
      title: 'Express Entry #453: Ulaştırma meslekleri',
      desc: '28 Ekim 2026 resmi tur: 150 davet, CRS 477; Transport Occupations.',
      content:
        'IRCC resmi ee_rounds_123_en.json hâlâ en son tur olarak #453’ü listeliyor: Transport Occupations, 2026-Version 2, 150 davet, 477 CRS, 28 Ekim 2026 10:34:14 UTC (kesim 4 Haziran 2026 21:48:22 UTC). Önceki #452 French-Language proficiency 2026-Version 2 dosyada duruyor (5.000 / CRS 407, 27 Ekim 2026). Bu saatte urllib first/extra/extra2/later resmi JSON için HTTP 200 (742096 bayt Last-Modified 28 Ekim 2026 Çarşamba 13.37.19 GMT, 454 tur kaydı). wget first HTTP 200. curl HTTP/2 first HTTP 200. curl HTTP/1.1 first HTTP 200. Resmi tur HTML’si bu saatte urllib first HTTP 200 extra HTTP 200 extra2 HTTP 200 later HTTP 200 Last-Modified 30 Ekim 2026 Cuma 22.00.44 GMT. wget first HTTP 200. curl HTTP/2 first HTTP 200. curl HTTP/1.1 first HTTP 200. Canonical davet URL’si invitations.html?q=453. CIC 1081936 artık resmi #453 turu için ayrı ana sayfa haberi (yayımlanma 2026-10-28T14:10:33+00:00; Last-Modified urllib first/extra/extra2/later / wget first / curl HTTP/2 and HTTP/1.1 first 30 Ekim 2026 Cuma 21.05.41 GMT); ana sayfa Last-Modified urllib first/extra/extra2/later / wget first 30 Ekim 2026 Cuma 21.25.49 GMT; curl HTTP/2 and HTTP/1.1 first 30 Ekim 2026 Cuma 21.25.49 GMT. 1081876 resmi #452 haberi ana sayfada kalıyor (yayımlanma 2026-10-27T14:38:42+00:00; Last-Modified 30 Ekim 2026 Cuma 21.06.28 GMT). 1081832 (#451 PNP) ana sayfada. 1081461 (#450 Fransızca yeterlilik) ana sayfada değil. 1081344 (#449 CEC) ana sayfada değil. 1081246 (#448 PNP) ana sayfada değil. 1080909 (#447 meslekler) ana sayfada değil. Kullanılmayan 1082033 Newfoundland and Labrador eyalet göçü haberi; 1081969 çalışma/öğrenim izni uzatma bekleme süreleri haberi ana sayfada değil; 1081995 Bill C-3 çifte vatandaşlık haberi; 1082000 öğrenim izni / kalıcı oturum ipuçları haberi; 1081956 Greater Boston vatandaşlık-soy haberi; 1081947 LMIA çalışma izni süre sınırı kaldırma haberi; 1081957 Saskatchewan adaylık haberi ana sayfada; 1082079 Ontario arşivleri çevrimiçi ödeme haberi ana sayfada; 1082085 Avrupa öğrenci değişimi haberi ana sayfada; 1081930 Haiti/Sudan çalışma izni uzatması; 1081923 British Columbia eyalet adaylığı; 1081903 Minnesota vatandaşlık-soy haberi; 1081904 CRS havuz dökümü; 1081864 vatandaşlık-soy açıklayıcısı; 1081857 Alberta eyalet adaylığı; 1081659 ortak içerik; 1081816 ana sayfada değil. 30 Ekim 2026 22.00 UTC’te canada.ca ve www.cicnews.com üzerinden doğrulandı.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
    },
    {
      id: 'fallback-military-category',
      title: 'Express Entry 2026: nitelikli askeri adaylar',
      desc: 'FSMA: 10 yıl kesintisiz hizmet ve NOC 40042, 42102 veya 43204’te Kuvvetler teklifi.',
      content:
        'IRCC’nin 2026 kategori bazlı seçim sayfası nitelikli askeri adayları (skilled military recruits) hâlâ bir Express Entry kategorisi olarak listeliyor. Foreign Skilled Military Applicant (FSMA) için tanınmış bir yabancı orduda en az 10 yıl kesintisiz hizmet, NOC 40042, 42102 veya 43204 ile uyumlu eğitim ve Canadian Forces Recruiting Group tarafından verilen bir Canadian Armed Forces iş teklifi gerekiyor. Ayrı kategori URL’leri: skilled-military-recruits urllib first HTTP 404 this hour; wget first HTTP 404. french-language-proficiency, researchers ve medical-doctors urllib first HTTP 404 this hour. Canonical sayfa submit-profile/rounds-invitations/category-based-selection.html. Resmi kategori sayfası urllib first HTTP 200 Last-Modified 30 Ekim 2026 Cuma 21.43.13 GMT (54762 bayt); extra HTTP 200 Last-Modified 30 Ekim 2026 Cuma 19.56.44 GMT (54761 bayt); extra2 HTTP 200; later HTTP 200; wget first HTTP 301; curl HTTP/2 first HTTP 301 (0 bytes); curl HTTP/1.1 first HTTP 301 (0 bytes). Askeri kategori değişmedi. 30 Ekim 2026 22.00 UTC’te canada.ca üzerinden doğrulandı.',
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
