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
        desc: 'NATO Summit launch July 7; technical teams preparing the first round; consultations closed Sept 14.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. In early June 2026, Trade Ministers Bolat and Sidhu issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions. In the coming months, technical teams from both countries will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations seeking the views of Canadian businesses, industry associations, provinces and territories, and the public ran from July 31 to September 14, 2026. GAC’s relations page reports that in 2024 two-way merchandise trade was over CA$4.3 billion, with Canadian exports of $1.3 billion and imports from Türkiye of $3.1 billion. Canada’s top 2024 imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in mining, fell from $1 billion in 2022 to $420 million in 2023. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-stem',
        title: 'Express Entry 2026: trade occupations',
        desc: 'Electricians, plumbers, carpenters, welders and HVAC mechanics need 12 months in one eligible NOC.',
        content:
          'IRCC’s current Express Entry category-based rounds include trade occupations. In February 2026 IRCC said it would continue inviting candidates with trades experience such as carpenters, plumbers and machinists, as part of categories aimed at long-term labour shortages including construction occupations that help address housing needs. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list, in Canada or abroad — this experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 trades list includes construction managers (NOC 70010), home building and renovation managers (70011), construction estimators (22303), machinists and machining and tooling inspectors (72100), sheet metal workers (72102), welders and related machine operators (72106), electricians except industrial and power system (72200), industrial electricians (72201), plumbers (72300), gas fitters (72302), carpenters (72310), cabinetmakers (72311), bricklayers (72320), construction millwrights and industrial mechanics (72400), heavy-duty equipment mechanics (72401), heating, refrigeration and air conditioning mechanics (72402), and butchers — retail and wholesale (63201). Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: '3rd edition this Sunday, 12 p.m.–8 p.m.: music, dance, cuisine and crafts.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. kutuphane.ca, the festival host, lists the 3rd edition as a celebration of traditional music, dance, cuisine, and arts from Türkiye in the heart of the city. Sankofa Square describes Turkish coffee and baklava, traditional crafts and art, and music and cultural performances. After the 2016 and 2017 festivals, the comeback is framed as a reunion and a bridge reconnecting the community with traditions from Türkiye. Follow @anatoliafestca or email info@anatoliafest.ca for updates; the Turkish-Canadian community and newcomers can meet neighbours, families, and local businesses in the square.',
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
      desc: '7 Temmuz NATO Zirvesi’nde başlatıldı; teknik ekipler ilk turu hazırlıyor; istişareler kapandı.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. 2026 Haziran başında Ticaret Bakanları Bolat ve Sidhu, keşif görüşmelerini başlatan Ekonomik Ortaklık Ortak Bakanlar Bildirisini yayımladı. Önümüzdeki aylarda her iki ülkenin teknik ekipleri anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kanada işletmeleri, sanayi birlikleri, eyalet ve bölgeler ile kamuoyunun görüşlerini toplayan istişareler 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfasına göre 2024’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı; Kanada ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar oldu. 2024’te Türkiye’den başlıca ithalat yassı haddelenmiş demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve eczacılık ürünleri (107 milyon) idi. Türkiye’deki Kanada doğrudan yatırımı, çoğunlukla madencilikte, 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-stem',
      title: 'Express Entry 2026: ticaret meslekleri',
      desc: 'Elektrikçiler, tesisatçılar, marangozlar, kaynakçılar ve HVAC tamircileri için tek NOC’ta 12 ay.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları ticaret mesleklerini kapsıyor. Şubat 2026’da IRCC, marangoz, tesisatçı ve makinist gibi meslek deneyimi olan adayları davet etmeye devam edeceğini duyurdu; bu kategoriler konut ihtiyacına yardımcı inşaat meslekleri dahil uzun vadeli işgücü açıklarını hedefiyor. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da veya yurt dışında, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 ticaret listesinde inşaat yöneticileri (NOC 70010), ev inşaatı ve yenileme yöneticileri (70011), inşaat maliyet tahmincileri (22303), makinistler (72100), sac metal işçileri (72102), kaynakçılar (72106), elektrikçiler (endüstriyel ve güç sistemi hariç) (72200), endüstriyel elektrikçiler (72201), tesisatçılar (72300), gaz tesisatçıları (72302), marangozlar (72310), mobilyacılar (72311), duvarcılar (72320), değirmenci ve endüstriyel mekanikçiler (72400), ağır iş makineleri tamircileri (72401), ısıtma, soğutma ve klima (HVAC) tamircileri (72402) ile perakende ve toptan kasaplar (63201) yer alıyor. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: '3. edisyon bu Pazar 12.00–20.00; müzik, dans, mutfak ve el sanatları.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. Festivalin ev sahibi kutuphane.ca, 3. edisyonu kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanatın kutlaması olarak listeliyor. Sankofa Square Türk kahvesi ve baklava, geleneksel el sanatları ve sanat ile müzik ve kültürel gösteriler duyuruyor. 2016 ve 2017 festivallerinin ardından dönüş, bir yeniden birleşme ve toplumun Türkiye’den gelen geleneklerle köprü kurması olarak tanımlanıyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın; Türk-Kanada toplumu ile yeni gelenler meydanda komşu, aile ve yerel işletmelerle tanışabilir.',
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
