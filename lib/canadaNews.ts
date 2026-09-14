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
        title: 'Canada–Türkiye FTA now in negotiations',
        desc: '2024 two-way merchandise trade was over $4.3 billion.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, Canada and Türkiye announced the launch of talks toward a bilateral FTA. The Government of Canada is conducting public consultations from July 31, 2026, to September 14, 2026, seeking the views of Canadian businesses, industry associations, provinces and territories, and the public. GAC reports that in 2024 two-way merchandise trade was over $4.3 billion, with Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion. Canada’s top 2024 exports to Türkiye were lentils and chickpeas ($393 million), iron and steel waste and scrap ($167 million), and soybeans ($113 million); top imports were flat-rolled iron sheet products ($203 million), tugboats ($128 million), and pharmaceutical products ($107 million). Questions can be sent to Trade Negotiations Division (TCE) at TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-french',
        title: 'Express Entry 2026: French-language category',
        desc: 'NCLC 7 in all four abilities can open category rounds and CRS bonus points.',
        content:
          'IRCC’s current Express Entry category-based rounds include French-language proficiency. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you need French-language test results showing a minimum score of 7 in all four abilities on the Niveaux de compétence linguistique canadiens (NCLC). Candidates who score NCLC 7 or higher in all four French skills can also receive 25 additional Comprehensive Ranking System points if their English is CLB 4 or lower (or they did not take an English test), or 50 points if they scored CLB 5 or higher in all four English skills. IRCC reports French-speaking permanent-resident admissions outside Quebec reached 8.9% in 2025, exceeding the 8.5% target. The 2026–2028 Immigration Levels Plan sets targets of 9% (30,267 admissions) in 2026, 9.5% (31,825) in 2027, and 10.5% (35,175) in 2028, on a path toward a 12% target by 2029. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: '3rd edition this Sunday, 12 p.m.–8 p.m., with music, dance, and cuisine.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. The 3rd edition, hosted by kutuphane.ca after 2016 and 2017, is listed as a celebration of Turkish culture in the heart of the city: traditional music, dance, cuisine, and arts from Türkiye, plus Turkish coffee and baklava. Sankofa Square describes the day as a reunion of culture, heritage, and community. Follow @anatoliafestca or email info@anatoliafest.ca for updates; the Turkish-Canadian community and newcomers can meet neighbours, families, and local businesses in the square.',
        category: 'Community',
        color: 'bg-primary',
        link: 'https://www.anatoliafest.ca/',
      },
    ];
  }

  return [
    {
      id: 'fallback-trade',
      title: 'Kanada–Türkiye STA müzakereleri sürüyor',
      desc: '2024’te iki yönlü mal ticareti 4,3 milyar doların üzerindeydi.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da Kanada ve Türkiye ikili bir STA müzakeresini başlattı. Kanada hükümeti 31 Temmuz–14 Eylül 2026 tarihleri arasında Kanada işletmeleri, sanayi dernekleri, eyalet ve bölgeler ile kamuoyunun görüşlerini topluyor. GAC’ye göre 2024’te iki yönlü mal ticareti 4,3 milyar doların üzerindeydi; Kanada’nın ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolardı. 2024’te Türkiye’ye başlıca ihracat mercimek ve nohut (393 milyon dolar), demir-çelik hurdası (167 milyon) ve soya fasulyesi (113 milyon); başlıca ithalat yassı haddelenmiş demir sac (203 milyon), römorkörler (128 milyon) ve eczacılık ürünleri (107 milyon) oldu. Sorular TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-french',
      title: 'Express Entry 2026: Fransızca yeterlilik kategorisi',
      desc: 'Dört beceride NCLC 7, kategori turları ve CRS ek puanı açabilir.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları Fransızca dil yeterliliğini kapsıyor. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, Niveaux de compétence linguistique canadiens (NCLC) ölçeğinde dört becerinin tümünde en az 7 puan gösteren Fransızca sınav sonuçlarınız olmalıdır. Dört Fransızca becerisinde NCLC 7 veya üzeri alan adaylar, İngilizcesi CLB 4 veya altındaysa (ya da İngilizce sınavı yoksa) Kapsamlı Sıralama Sistemi’nde 25 ek puan, dört İngilizce becerisinde CLB 5 veya üzeri almışlarsa 50 ek puan da kazanabilir. IRCC, Quebec dışı Fransızca konuşan kalıcı oturum alımlarının 2025’te %8,9’a ulaştığını ve %8,5 hedefini aştığını bildiriyor. 2026–2028 Göçmenlik Seviyeleri Planı 2026’da %9 (30.267 alım), 2027’de %9,5 (31.825) ve 2028’de %10,5 (35.175) hedeflerini koyuyor; 2029’da %12 hedefine giden yol bu. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: '3. edisyon bu Pazar 12.00–20.00; müzik, dans ve mutfak.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. 2016 ve 2017’nin ardından kutuphane.ca’nın ev sahipliğindeki 3. edisyon, kentin kalbinde Türk kültürünü kutluyor: geleneksel müzik, dans, mutfak ve sanatın yanı sıra Türk kahvesi ve baklava. Sankofa Square günü kültür, miras ve toplum buluşması olarak tanımlıyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın; Türk-Kanada toplumu ile yeni gelenler meydanda komşu, aile ve yerel işletmelerle tanışabilir.',
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
