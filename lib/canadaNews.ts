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
        desc: 'Technical teams are scoping the first round after the Ankara launch.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. The leaders said that in the coming months, technical teams from both countries will define the scope and ambition of the agreement and prepare for the first round of negotiations. Questions and comments can be sent to Global Affairs Canada’s Trade Negotiations Division (TCE) at 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca. In 2025, the stock of FDI from Türkiye in Canada was $233 million, making Türkiye the 24th largest European source of FDI in Canada and the 54th globally; Canadian direct investment in Türkiye was $3.3 billion, up from $1 billion in 2022.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-military',
        title: 'Express Entry 2026: skilled military recruits',
        desc: 'CAF job offers for officers and specialized members can lead to invitations.',
        content:
          'IRCC’s current Express Entry category-based rounds include a 2026 category for skilled military recruits who have a job offer from the Canadian Armed Forces. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must be a Foreign Skilled Military Applicant serving in a recognized foreign military with at least ten years of continuous service, with work experience and training aligned with commissioned officers of the Canadian Armed Forces (NOC 40042, TEER 0), specialized members (42102, TEER 2), or operations members (43204, TEER 3). You must have an offer of arranged employment from the Canadian Forces Recruiting Group for continuous full-time work in Canada lasting at least three years in one of those occupations, and at least a two-year post-secondary credential (with an educational credential assessment if completed outside Canada). Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Sankofa Square lists the 3rd edition this Sunday from noon to 8 p.m.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. Sankofa Square lists the 3rd edition as a reunion celebrating Turkish culture, heritage, and community, with Turkish coffee and baklava, traditional crafts and art, and music and cultural performances. After editions in 2016 and 2017, kutuphane.ca is hosting the comeback; follow @anatoliafestca or email info@anatoliafest.ca for updates. The Turkish-Canadian community and newcomers can meet neighbours, families, and local businesses in the square.',
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
      desc: 'Teknik ekipler Ankara’daki başlangıcın ardından ilk turu hazırlıyor.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresini başlattı. Liderlere göre önümüzdeki aylarda her iki ülkenin teknik ekipleri anlaşmanın kapsamını ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Soru ve görüşler Küresel İşler Kanada Ticaret Müzakereleri Bölümü’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 adresine veya TCE-Consultations@international.gc.ca adresine gönderilebilir. 2025’te Türkiye’nin Kanada’daki doğrudan yatırım stoku 233 milyon dolardı ve Türkiye Avrupa’dan Kanada’ya 24., küresel olarak 54. kaynak oldu; Kanada’nın Türkiye’deki doğrudan yatırımı 2022’deki 1 milyar dolardan 3,3 milyar dolara yükseldi.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-military',
      title: 'Express Entry 2026: nitelikli askeri adaylar',
      desc: 'Kuvvetlerden iş teklifi alan subay ve uzman personel davet edilebilir.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları, Kanada Silahlı Kuvvetleri’nden iş teklifi olan nitelikli askeri adaylar kategorisini kapsıyor. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, tanınmış bir yabancı orduda en az on yıl kesintisiz hizmet veren Yabancı Nitelikli Askeri Aday olmanız ve deneyiminizin Kanada Silahlı Kuvvetleri’nin görevli subayları (NOC 40042, TEER 0), uzman üyeleri (42102, TEER 2) veya harekât üyeleri (43204, TEER 3) meslekleriyle uyumlu olması gerekir. Kanada Kuvvetleri İşe Alım Grubu’ndan Kanada’da en az üç yıl sürecek kesintisiz tam zamanlı bir istihdam teklifiniz ve en az iki yıllık yükseköğretim belgeniz olmalıdır (Kanada dışında tamamlandıysa eğitim belgesi değerlendirmesi gerekir). Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Sankofa Square 3. edisyonu bu Pazar 12.00–20.00 olarak listeliyor.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. Sankofa Square 3. edisyonu Türk kültürü, mirası ve toplumu için bir buluşma olarak listeliyor; Türk kahvesi ve baklava, geleneksel el sanatları ve sanat ile müzik ve kültürel gösteriler yer alıyor. 2016 ve 2017 edisyonlarının ardından kutuphane.ca bu dönüşe ev sahipliği yapıyor; güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın. Türk-Kanada toplumu ile yeni gelenler meydanda komşu, aile ve yerel işletmelerle tanışabilir.',
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
