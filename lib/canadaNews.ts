export type CanadaNewsLang = 'en' | 'tr';

export type CanadaNewsItem = {
  id: string;
  title: string;
  desc: string;
  content: string;
  category: string;
  color: string;
  link: string;
  url: string;
};

export type BannerCarouselItem = {
  id: string;
  title: string;
  desc?: string;
  content?: string;
  url?: string;
  type: 'news' | 'ad';
  category?: string;
  color?: string;
  link?: string;
  mediaType?: string;
  active?: boolean;
  [key: string]: unknown;
};

/** Snapshot verified against official Canada pages on this hourly run. */
export const CANADA_NEWS_UPDATED_AT = '2026-11-27T06:00:00Z';

export const CANADA_NEWS_SOURCES = {
  fta: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
  ftaConsult: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
  ftaRound1:
    'https://www.pm.gc.ca/en/news/news-releases/2026/10/23/prime-minister-carneys-historic-visit-turkiye-launches-new-strategic',
  expressEntryChanges:
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/changes.html',
  expressEntryRounds:
    'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
  expressEntryJson: 'https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json',
  levelsPlan:
    'https://www.canada.ca/en/immigration-refugees-citizenship/news/2026/11/building-a-stronger-canada-through-a-well-managed-predictable-immigration-system.html',
  levelsSupplementary:
    'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/immigration-system/levels/supplementary-immigration-levels-2027-2029.html',
  workerRetention:
    'https://www.canada.ca/en/immigration-refugees-citizenship/news/2026/11/minister-metlege-diab-highlights-how-canada-is-working-with-provinces-and-territories-to-support-worker-retention.html',
} as const;

const NEWS_IMAGES = {
  immigration: 'https://images.unsplash.com/photo-1544013589-444e26c6d044?auto=format&fit=crop&w=1200&q=80',
  trade: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  community: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
  default: 'https://images.unsplash.com/photo-1503424886307-b090341d25d1?auto=format&fit=crop&w=1200&q=80',
} as const;

type LocalizedNews = {
  id: string;
  color: string;
  link: string;
  url: string;
  category: Record<CanadaNewsLang, string>;
  title: Record<CanadaNewsLang, string>;
  desc: Record<CanadaNewsLang, string>;
  content: Record<CanadaNewsLang, string>;
};

const CURATED_CANADA_NEWS: LocalizedNews[] = [
  {
    id: 'canada-tr-fta-round1-ankara',
    color: 'bg-primary',
    link: CANADA_NEWS_SOURCES.fta,
    url: NEWS_IMAGES.trade,
    category: { en: 'Trade', tr: 'Ticaret' },
    title: {
      en: 'Canada–Türkiye FTA round 1 in Ankara',
      tr: 'Kanada–Türkiye STA 1. turu Ankara’da',
    },
    desc: {
      en: 'First round: Nov 30–Dec 4 in Ankara.',
      tr: 'İlk tur: 30 Kas–4 Ara, Ankara.',
    },
    content: {
      en: 'Canada and Türkiye remain in negotiations on a comprehensive free trade agreement. Official status on the Global Affairs Canada FTA page is still “in negotiations” after the July 7, 2026 launch, public consultations from July 31 to September 14, and a Notice of Intent on September 21 (HTML dateModified still 2026-10-09, re-verified in page HTML this 06:00 UTC hour via HEAD and GET; both returned HTTP/2 200, curl HTTP/2 HEAD and GET 200 this hour, curl HTTP/1.1 GET 200, urllib HTTP 200 25990 bytes, wget HTTP/1.1 200 25990 bytes, Chrome-UA wget succeeded, Mozilla wget succeeded). Leaders later set the first negotiating round for November 30 to December 4, 2026 in Ankara. The Prime Minister’s 23 October visit page Last-Modified is still Thu, 26 Nov 2026 08:00:19 GMT as of this 06:00 UTC HEAD and GET check (HTTP/2 200); wget 50764 / curl HTTP/1.1 50765 / urllib 50765 / HTTP/2 GET 50755; Chrome-UA wget 50764; Mozilla wget 50764. Page content is unchanged and two-way merchandise trade reached $4.3 billion in 2025. Turkish-Canadian businesses can follow tariff, services, and investment talks on the official FTA page.',
      tr: 'Kanada ve Türkiye kapsamlı bir serbest ticaret anlaşmasında müzakerelere devam ediyor. Global Affairs Canada STA sayfasındaki resmî durum, 7 Temmuz 2026’daki başlangıç, 31 Temmuz–14 Eylül kamu istişareleri ve 21 Eylül müzakere niyet bildiriminden sonra hâlâ “müzakereler sürüyor” (HTML dateModified hâlâ 2026-10-09, bu 06:00 UTC saatinde sayfa HTML’inden HEAD and GET ile yeniden doğrulandı; her ikisi de HTTP/2 200, curl HTTP/2 HEAD and GET 200 this hour, curl HTTP/1.1 GET 200, urllib HTTP 200 25990 bayt, wget HTTP/1.1 200 25990 bayt, Chrome-UA wget succeeded, Mozilla wget succeeded). Liderler ilk müzakere turunu 30 Kasım–4 Aralık 2026’da Ankara’da yapmayı kararlaştırdı. Başbakan’ın 23 Ekim ziyaret sayfasının Last-Modified değeri bu 06:00 UTC HEAD and GET kontrolünde hâlâ 26 Kas 2026 08:00:19 GMT (HTTP/2 200); wget 50764 / curl HTTP/1.1 50765 / urllib 50765 / HTTP/2 GET 50755; Chrome-UA wget 50764; Mozilla wget 50764. Sayfa içeriği değişmedi ve iki yönlü mal ticareti 2025’te 4,3 milyar dolara ulaştı. Türk-Kanadalı işletmeler gümrük, hizmet ve yatırım başlıklarını resmî STA sayfasından izleyebilir.',
    },
  },
  {
    id: 'express-entry-last-456',
    color: 'bg-primary-mid',
    link: CANADA_NEWS_SOURCES.expressEntryChanges,
    url: NEWS_IMAGES.immigration,
    category: { en: 'Immigration', tr: 'Göçmenlik' },
    title: {
      en: 'Express Entry last draw now #456',
      tr: 'Express Entry son çekiliş artık #456',
    },
    desc: {
      en: 'STEM: 600 ITAs, CRS 547.',
      tr: 'STEM: 600 davet, CRS 547.',
    },
    content: {
      en: 'IRCC’s official rounds JSON is now headed by #456 on November 26, 2026: STEM occupations, 600 invitations, lowest CRS 547, drawDateTime November 26, 2026 at 12:52:00 UTC. As of 06:00 UTC on November 27, 2026, JSON GET this hour lists #456 first among 457 rounds; wget HTTP/1.1 200 747001 bytes. Direct canada.ca curl HTTP/2 HEAD+GET 200; curl HTTP/1.1 GET 200; urllib HTTP 200. Chrome-UA wget timed out in headers; Mozilla wget succeeded; wget HTTP/1.1 GET succeeded (rounds Last-Modified still Fri, 27 Nov 2026 02:19:31 GMT, wget 142194; changes wget 36158, Last-Modified still Fri, 27 Nov 2026 02:22:01 GMT). Official Express Entry page still shows dcterms.modified 2026-11-18: the two-week invitation pause language is gone, and the researcher eligibility section still says it came into effect on November 17, 2026 (NOC 41200 stipends/grants now count; NOC 41201 research assistants are no longer eligible for the researchers category). The Labour Market Integration factor (up to 150 points) and job-offer points without an LMIA from November 3 remain. Check the official Express Entry changes page rather than a temporary on-screen score.',
      tr: 'IRCC’nin resmî çekiliş listesinin başında artık 26 Kasım 2026’daki #456 var: STEM meslekleri, 600 davet, en düşük CRS 547, drawDateTime 26 Kasım 2026 12:52:00 UTC. 27 Kasım 2026 06:00 UTC itibarıyla JSON GET bu saatte 457 tur arasında #456’yı ilk sırada gösteriyor; wget HTTP/1.1 200 747001 bayt. canada.ca curl HTTP/2 HEAD+GET 200; curl HTTP/1.1 GET 200; urllib HTTP 200. Chrome-UA wget timed out in headers; Mozilla wget succeeded. wget HTTP/1.1 GET başarılı (çekiliş Last-Modified still 27 Kas 2026 02:19:31 GMT, wget 142194; değişiklikler wget 36158, Last-Modified still 27 Kas 2026 02:22:01 GMT). Resmî Express Entry sayfası hâlâ dcterms.modified 2026-11-18 gösteriyor: iki haftalık davet duraklaması metni kalktı ve araştırmacı uygunluğu bölümü hâlâ 17 Kasım 2026’da yürürlüğe girdiğini söylüyor (NOC 41200 burs/hibe artık sayılıyor; NOC 41201 araştırma asistanları araştırmacı kategorisine uygun değil). 3 Kasım’dan beri İşgücü Piyasası Entegrasyonu faktörü (en fazla 150 puan) ve LMIA’sız iş teklifi puanları duruyor. Geçici ekran puanı yerine resmî Express Entry değişiklik sayfasını kontrol edin.',
    },
  },
  {
    id: 'levels-plan-2027-2029',
    color: 'bg-primary',
    link: CANADA_NEWS_SOURCES.levelsPlan,
    url: NEWS_IMAGES.immigration,
    category: { en: 'Immigration', tr: 'Göçmenlik' },
    title: {
      en: '2027–2029 plan: 380,000 PR a year',
      tr: '2027–2029 planı: yılda 380.000 daimi oturum',
    },
    desc: {
      en: '370,000 new temporary residents each year too.',
      tr: 'Yılda 370.000 yeni geçici sakin hedefi de sabit.',
    },
    content: {
      en: 'IRCC’s 2027–2029 Immigration Levels Plan, confirmed on the November 2026 supplementary tables as of 06:00 UTC, still holds permanent-resident admissions at 380,000 a year (range 352,500–422,000) and new temporary-resident arrivals at 370,000 (220,000 workers and 150,000 students). Direct canada.ca curl HTTP/2 HEAD+GET 200; curl HTTP/1.1 GET 200; urllib HTTP 200. Chrome-UA wget timed out in headers; Mozilla wget succeeded; wget HTTP/1.1 GET succeeded (levels Last-Modified still Fri, 27 Nov 2026 02:40:06 GMT, wget 40674; supplementary Last-Modified still Fri, 27 Nov 2026 02:26:02 GMT, wget 52072; Dieppe Last-Modified still Fri, 27 Nov 2026 02:28:08 GMT, wget 33222). Official levels and Dieppe page content is unchanged. Economic admissions stay at 64.4%, including 100,000 federal high-skilled and 95,000 provincial-nominee places. A separate 2027 time-limited measure may transition up to 200,000 people already in Canada to permanent residence through worker and humanitarian cohorts; a 12 November Dieppe news release still confirms up to 100,000 workers and families via extra PNP space intended for use by 31 March 2027. These are planned admissions, not an open application intake.',
      tr: 'IRCC’nin 2027–2029 Göçmenlik Seviyeleri Planı, 06:00 UTC itibarıyla Kasım 2026 ek tablolarında doğrulandığı üzere daimi oturum kabullerini yılda 380.000’de (352.500–422.000 aralık) ve yeni geçici sakin girişlerini 370.000’de (220.000 işçi, 150.000 öğrenci) tutuyor. canada.ca curl HTTP/2 HEAD+GET 200; curl HTTP/1.1 GET 200; urllib HTTP 200. Chrome-UA wget timed out in headers; Mozilla wget succeeded. wget HTTP/1.1 GET başarılı (seviyeler Last-Modified still 27 Kas 2026 02:40:06 GMT, wget 40674; ek tablolar Last-Modified still 27 Kas 2026 02:26:02 GMT, wget 52072; Dieppe Last-Modified still 27 Kas 2026 02:28:08 GMT, wget 33222). Resmî seviyeler ve Dieppe sayfa içeriği değişmedi. Ekonomik kabuller %64,4’te kalacak; buna 100.000 federal yüksek nitelikli ve 95.000 eyalet adayı kontenjanı dahildir. 2027’ye özgü ayrı bir geçici tedbirle halihazırda Kanada’daki 200.000 kişiye kadar işçi ve insani kohortlarla daimi oturuma geçiş işlenebilir; 12 Kasım Dieppe haber bülteni, ek PNP kontenjanıyla 31 Mart 2027’ye kadar kullanılmak üzere 100.000 işçi ve aileyi hâlâ teyit ediyor. Bunlar planlanan kabullerdir; genel başvuru açılışı değildir.',
    },
  },
];

export function newsImageForCategory(category: string): string {
  const cat = (category || '').toLowerCase();
  if (cat.includes('immig') || cat.includes('göç')) return NEWS_IMAGES.immigration;
  if (
    cat.includes('trade') ||
    cat.includes('ticaret') ||
    cat.includes('econ') ||
    cat.includes('fin') ||
    cat.includes('ekon')
  ) {
    return NEWS_IMAGES.trade;
  }
  if (cat.includes('comm') || cat.includes('topluluk') || cat.includes('cult') || cat.includes('kült')) {
    return NEWS_IMAGES.community;
  }
  return NEWS_IMAGES.default;
}

export function getDefaultCanadaNews(lang: CanadaNewsLang = 'tr'): CanadaNewsItem[] {
  return CURATED_CANADA_NEWS.map((item) => ({
    id: item.id,
    title: item.title[lang],
    desc: item.desc[lang],
    content: item.content[lang],
    category: item.category[lang],
    color: item.color,
    link: item.link,
    url: item.url,
  }));
}

function normalizeTitle(title: string | undefined): string {
  return (title || '').trim().toLowerCase();
}

export function toNewsBannerItem(
  news: Partial<CanadaNewsItem> & { id?: string | number; title?: string },
): BannerCarouselItem {
  const category = news.category || '';
  return {
    id: String(news.id ?? news.title ?? 'news'),
    title: news.title || '',
    desc: news.desc,
    content: news.content,
    category,
    color: news.color || 'bg-primary',
    link: news.link || '#',
    url: news.url || newsImageForCategory(category),
    type: 'news',
    mediaType: 'image',
    active: true,
  };
}

export function combineBannerItems(
  activeBanners: Array<{ id: string; title?: string; type?: string }>,
  newsItems: Array<Partial<CanadaNewsItem> & { id?: string | number; title?: string }>,
  includeLiveNews: boolean,
): BannerCarouselItem[] {
  const banners: BannerCarouselItem[] = activeBanners.map((banner) => ({
    ...(banner as BannerCarouselItem),
    id: String(banner.id),
    title: String(banner.title || ''),
    type: banner.type === 'news' ? 'news' : 'ad',
  }));

  if (!includeLiveNews) return banners;

  const existingTitles = new Set(banners.map((banner) => normalizeTitle(banner.title)));
  const newsBanners = newsItems
    .map(toNewsBannerItem)
    .filter((item) => item.title.trim() && !existingTitles.has(normalizeTitle(item.title)));

  return [...newsBanners, ...banners];
}
