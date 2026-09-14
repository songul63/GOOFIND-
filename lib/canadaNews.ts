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
        desc: 'Technical teams are defining the first round after the July 7 launch.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. In early June, Trade Ministers Bolat and Sidhu issued a Joint Ministerial Statement on Economic Partnership and launched exploratory discussions. The leaders said closer cooperation will support growth, job creation, competitiveness, and supply chains; technical teams from both countries will define the scope and ambition of the agreement and prepare the first negotiation round. GAC reports that in 2024 Canada’s top imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million), and pharmaceutical products ($107 million). Canada also welcomes a Turkish diaspora of over 65,000. Public consultations ran from July 31 to September 14, 2026. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-healthcare',
        title: 'Express Entry 2026: Healthcare and social services',
        desc: 'GPs, nurses, pharmacists, and social workers need 12 months in one eligible NOC.',
        content:
          'IRCC’s current Express Entry category-based rounds include healthcare and social services occupations. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list — this experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 list includes general practitioners and family physicians (NOC 31102), registered nurses and registered psychiatric nurses (31301), nurse practitioners (31302), pharmacists (31120), dentists (31110), psychologists (31200), physiotherapists (31202), social workers (41300), social and community service workers (42201), and nurse aides, orderlies and patient service associates (33102). IRCC’s February 2026 announcement also highlighted nurse practitioners, dentists, pharmacists, psychologists, and chiropractors as examples in this category. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: '3rd edition this Sunday, 12 p.m.–8 p.m. at 1 Dundas Street East.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. The 3rd edition, hosted by kutuphane.ca after 2016 and 2017, is a reunion of Turkish culture, heritage, and community: traditional music, dance, cuisine, crafts, Turkish coffee, and baklava. Sankofa Square lists the day as a celebration in the heart of the city. Follow @anatoliafestca or email info@anatoliafest.ca for updates; the Turkish-Canadian community and newcomers can meet neighbours, families, and local businesses in the square.',
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
      desc: 'Teknik ekipler 7 Temmuz lansmanının ardından ilk turu hazırlıyor.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yararlı bir STA müzakeresini başlattı. Haziran başında Ticaret Bakanları Bolat ve Sidhu Ekonomik Ortaklık Ortak Bakanlar Bildirisi’ni yayımlayıp keşif görüşmelerini başlattı. Liderler daha yakın işbirliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceğini; her iki ülkenin teknik ekiplerinin anlaşmanın kapsamını ve hedefini belirleyip ilk müzakere turunu hazırlayacağını belirtti. GAC’ye göre 2024’te Türkiye’den başlıca ithalat yassı haddelenmiş demir sac (203 milyon dolar), römorkörler (128 milyon) ve eczacılık ürünleri (107 milyon) oldu. Kanada 65.000’den fazla kişilik bir Türk diasporasını da ağırlıyor. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-healthcare',
      title: 'Express Entry 2026: Sağlık ve sosyal hizmet meslekleri',
      desc: 'Aile hekimi, hemşire, eczacı ve sosyal çalışmacılar için tek NOC’ta 12 ay.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları sağlık ve sosyal hizmet mesleklerini kapsıyor. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 listesinde aile hekimleri (NOC 31102), kayıtlı hemşireler ve psikiyatri hemşireleri (31301), hemşire pratisyenler (31302), eczacılar (31120), diş hekimleri (31110), psikologlar (31200), fizyoterapistler (31202), sosyal çalışmacılar (41300), sosyal ve toplum hizmeti çalışanları (42201) ile bakıcılar, hasta bakıcılar ve hasta hizmetleri görevlileri (33102) yer alıyor. IRCC’nin Şubat 2026 duyurusu bu kategoride hemşire pratisyen, diş hekimi, eczacı, psikolog ve kayropraktör örneklerini de öne çıkardı. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: '3. edisyon bu Pazar 12.00–20.00; 1 Dundas Street East.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. 2016 ve 2017’nin ardından kutuphane.ca’nın ev sahipliğindeki 3. edisyon, Türk kültürü, mirası ve toplumunun buluşması: geleneksel müzik, dans, mutfak, el sanatları, Türk kahvesi ve baklava. Sankofa Square günü kentin kalbinde bir kutlama olarak listeliyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın; Türk-Kanada toplumu ile yeni gelenler meydanda komşu, aile ve yerel işletmelerle tanışabilir.',
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
