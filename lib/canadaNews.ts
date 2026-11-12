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
export const CANADA_NEWS_UPDATED_AT = '2026-11-12T21:00:00Z';

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
      en: 'Canada and Türkiye remain in negotiations on a comprehensive free trade agreement. Official status on the Global Affairs Canada FTA page is still “in negotiations” after the July 7, 2026 launch, public consultations from July 31 to September 14, and a Notice of Intent on September 21 (HTML dateModified still 2026-10-09, re-verified in page HTML this 21:00 UTC hour via HEAD and GET; both returned HTTP/2 200). Leaders later set the first negotiating round for November 30 to December 4, 2026 in Ankara. The Prime Minister’s 23 October visit page Last-Modified is still 12 Nov 07:51 GMT as of this 21:00 UTC HEAD and GET check (HTTP/2 200); two-way merchandise trade reached $4.3 billion in 2025. Turkish-Canadian businesses can follow tariff, services, and investment talks on the official FTA page.',
      tr: 'Kanada ve Türkiye kapsamlı bir serbest ticaret anlaşmasında müzakerelere devam ediyor. Global Affairs Canada STA sayfasındaki resmî durum, 7 Temmuz 2026’daki başlangıç, 31 Temmuz–14 Eylül kamu istişareleri ve 21 Eylül müzakere niyet bildiriminden sonra hâlâ “müzakereler sürüyor” (HTML dateModified hâlâ 2026-10-09, bu 21:00 UTC saatinde sayfa HTML’inden HEAD and GET ile yeniden doğrulandı; her ikisi de HTTP/2 200). Liderler ilk müzakere turunu 30 Kasım–4 Aralık 2026’da Ankara’da yapmayı kararlaştırdı. Başbakan’ın 23 Ekim ziyaret sayfasının Last-Modified değeri bu 21:00 UTC HEAD and GET kontrolünde hâlâ 12 Kas 07:51 GMT (HTTP/2 200); iki yönlü mal ticareti 2025’te 4,3 milyar dolara ulaştı. Türk-Kanadalı işletmeler gümrük, hizmet ve yatırım başlıklarını resmî STA sayfasından izleyebilir.',
    },
  },
  {
    id: 'express-entry-pause-453',
    color: 'bg-primary-mid',
    link: CANADA_NEWS_SOURCES.expressEntryChanges,
    url: NEWS_IMAGES.immigration,
    category: { en: 'Immigration', tr: 'Göçmenlik' },
    title: {
      en: 'Express Entry rounds paused after #453',
      tr: 'Express Entry çekilişleri #453 sonrası durdu',
    },
    desc: {
      en: 'Last draw: Transport, 150 ITAs, CRS 477.',
      tr: 'Son çekiliş: Ulaştırma, 150 davet, CRS 477.',
    },
    content: {
      en: 'IRCC’s official rounds JSON is still headed by #453 on October 28, 2026: Transport Occupations (2026-Version 2), 150 invitations, lowest CRS 477, drawDateTime October 28, 2026 at 10:34:14 UTC. As of 21:00 UTC on November 12, 2026, no November round has been published (JSON GET this hour still lists #453 first among 454 rounds). Direct canada.ca HEAD and GET this hour returned HTTP/2 INTERNAL_ERROR, then HTTP/1.1 GET timed out, so Last-Modified could not be re-read; official page content was still retrieved and is unchanged. The Express Entry changes page still says invitation rounds remain paused for up to two weeks from November 3 while CRS scores are recalculated under the new Labour Market Integration factor (up to 150 points) and job-offer points without an LMIA. Check the official Express Entry changes page rather than a temporary on-screen score.',
      tr: 'IRCC’nin resmî çekiliş listesinin başında hâlâ 28 Ekim 2026’daki #453 var: Ulaştırma meslekleri (2026-Sürüm 2), 150 davet, en düşük CRS 477, drawDateTime 28 Ekim 2026 10:34:14 UTC. 12 Kasım 2026 21:00 UTC itibarıyla Kasım turu yayımlanmadı (JSON GET bu saatte 454 tur arasında hâlâ #453’ü ilk sırada gösteriyor). canada.ca HEAD and GET bu saatte HTTP/2 INTERNAL_ERROR verdi, ardından HTTP/1.1 GET timed out; Last-Modified yeniden okunamadı, resmî sayfa içeriği yine alındı ve değişmedi. Express Entry değişiklik sayfası, 3 Kasım’dan bu yana davet turlarının, yeni İşgücü Piyasası Entegrasyonu faktörü (en fazla 150 puan) ve LMIA’sız iş teklifi puanları için CRS yeniden hesaplanırken en fazla iki hafta durdurulduğunu belirtmeye devam ediyor. Geçici ekran puanı yerine resmî Express Entry değişiklik sayfasını kontrol edin.',
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
      en: 'IRCC’s 2027–2029 Immigration Levels Plan, confirmed on the November 2026 supplementary tables as of 21:00 UTC, still holds permanent-resident admissions at 380,000 a year (range 352,500–422,000) and new temporary-resident arrivals at 370,000 (220,000 workers and 150,000 students). Direct canada.ca HEAD and GET this hour returned HTTP/2 INTERNAL_ERROR, then HTTP/1.1 GET timed out, so Last-Modified could not be re-read; official news and supplementary page content was still retrieved and is unchanged. Economic admissions stay at 64.4%, including 100,000 federal high-skilled and 95,000 provincial-nominee places. A separate 2027 time-limited measure may transition up to 200,000 people already in Canada to permanent residence through worker and humanitarian cohorts; a 12 November Dieppe news release still confirms up to 100,000 workers and families via extra PNP space intended for use by 31 March 2027. These are planned admissions, not an open application intake.',
      tr: 'IRCC’nin 2027–2029 Göçmenlik Seviyeleri Planı, 21:00 UTC itibarıyla Kasım 2026 ek tablolarında doğrulandığı üzere daimi oturum kabullerini yılda 380.000’de (352.500–422.000 aralık) ve yeni geçici sakin girişlerini 370.000’de (220.000 işçi, 150.000 öğrenci) tutuyor. canada.ca HEAD and GET bu saatte HTTP/2 INTERNAL_ERROR verdi, ardından HTTP/1.1 GET timed out; Last-Modified yeniden okunamadı, resmî haber ve ek tablo içeriği yine alındı ve değişmedi. Ekonomik kabuller %64,4’te kalacak; buna 100.000 federal yüksek nitelikli ve 95.000 eyalet adayı kontenjanı dahildir. 2027’ye özgü ayrı bir geçici tedbirle halihazırda Kanada’daki 200.000 kişiye kadar işçi ve insani kohortlarla daimi oturuma geçiş işlenebilir; 12 Kasım Dieppe haber bülteni, ek PNP kontenjanıyla 31 Mart 2027’ye kadar kullanılmak üzere 100.000 işçi ve aileyi hâlâ teyit ediyor. Bunlar planlanan kabullerdir; genel başvuru açılışı değildir.',
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
