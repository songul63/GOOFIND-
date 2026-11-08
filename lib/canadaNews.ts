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
export const CANADA_NEWS_UPDATED_AT = '2026-11-08T14:00:00Z';

export const CANADA_NEWS_SOURCES = {
  fta: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
  ftaObjectives:
    'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/negotiations.aspx?lang=eng',
  ftaRound:
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
    id: 'canada-tr-fta-2026',
    color: 'bg-primary',
    link: CANADA_NEWS_SOURCES.fta,
    url: NEWS_IMAGES.trade,
    category: { en: 'Trade', tr: 'Ticaret' },
    title: {
      en: 'Canada–Türkiye FTA first round Nov 30',
      tr: 'Kanada–Türkiye STA ilk turu 30 Kasım',
    },
    desc: {
      en: 'Talks in Ankara through December 4.',
      tr: 'Müzakereler Ankara’da 4 Aralık’a kadar.',
    },
    content: {
      en: 'Global Affairs Canada still lists the Canada–Türkiye Free Trade Agreement as “in negotiations.” Talks were announced on July 7, 2026; public consultations ran July 31 to September 14; and a Notice of Intent was tabled on September 21. The Prime Minister’s Office confirmed the first negotiating round for November 30 to December 4, 2026 in Ankara. Two-way merchandise trade reached $4.3 billion in 2025. Canada’s published objectives include tariff cuts, services, investment, and temporary movement of business persons. No agreement is in force yet—Turkish-Canadian firms should follow the official FTA status page, not rumours of new immigration pathways.',
      tr: 'Global Affairs Canada, Kanada–Türkiye Serbest Ticaret Anlaşması’nı hâlâ “müzakereler sürüyor” olarak listeliyor. Müzakereler 7 Temmuz 2026’da duyuruldu; kamu istişareleri 31 Temmuz–14 Eylül arasında yapıldı; niyet bildirimi 21 Eylül’de sunuldu. Başbakanlık, ilk müzakere turunun 30 Kasım–4 Aralık 2026’da Ankara’da yapılacağını doğruladı. İkili mal ticareti 2025’te 4,3 milyar dolara ulaştı. Kanada’nın yayımlanan hedefleri arasında gümrük indirimleri, hizmetler, yatırım ve iş insanlarının geçici dolaşımı var. Anlaşma henüz yürürlükte değil—Türk-Kanadalı işletmeler yeni göçmenlik yolu söylentileri yerine resmî STA durum sayfasını izlemeli.',
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
      en: 'IRCC’s latest Express Entry round remains #453 on October 28, 2026: Transport Occupations (2026-Version 2), 150 invitations, lowest CRS 477. As of 14:00 UTC on November 8, no newer round is in the official JSON (Last-Modified 28 Oct 2026). On November 3, CRS scoring changed—including a new Labour Market Integration factor (up to 150 points) and job-offer points without an LMIA. Invitation rounds are still paused for up to two weeks while existing profiles are recalculated. Check your profile against the official Express Entry changes page rather than a temporary on-screen score.',
      tr: 'IRCC’nin son Express Entry turu hâlâ 28 Ekim 2026’daki #453: Ulaştırma meslekleri (2026-Sürüm 2), 150 davet, en düşük CRS 477. 8 Kasım 14:00 UTC itibarıyla resmî JSON’da daha yeni tur yok (Last-Modified 28 Ekim 2026). 3 Kasım’da CRS puanlaması değişti; yeni İşgücü Piyasası Entegrasyonu faktörü (en fazla 150 puan) ve LMIA’sız iş teklifi puanları eklendi. Mevcut profiller yeniden hesaplanırken davet turları en fazla iki hafta durdurulmuş durumda. Geçici ekran puanı yerine resmî Express Entry değişiklik sayfasını kontrol edin.',
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
      en: 'IRCC’s 2027–2029 Immigration Levels Plan, detailed in November 2026, holds permanent-resident admissions at 380,000 a year (range 352,500–422,000) and new temporary-resident arrivals at 370,000 (about 220,000 workers and 150,000 students). Economic admissions stay above 64%. A separate 2027 time-limited measure may transition up to 200,000 people already in Canada to permanent residence through worker and humanitarian cohorts. These are planned admissions, not an open application intake.',
      tr: 'IRCC’nin Kasım 2026’da ayrıntılandırdığı 2027–2029 Göçmenlik Seviyeleri Planı, daimi oturum kabullerini yılda 380.000’de (352.500–422.000 aralık) ve yeni geçici sakin girişlerini 370.000’de (yaklaşık 220.000 işçi, 150.000 öğrenci) tutuyor. Ekonomik kabuller %64’ün üzerinde kalacak. 2027’ye özgü ayrı bir geçici tedbirle halihazırda Kanada’daki 200.000 kişiye kadar işçi ve insani kohortlarla daimi oturuma geçiş işlenebilir. Bunlar planlanan kabullerdir; genel başvuru açılışı değildir.',
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
