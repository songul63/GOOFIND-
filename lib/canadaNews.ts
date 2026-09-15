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
        desc: 'July 7 NATO launch; JETCO Ottawa Jan 20; 2024 top imports iron sheet, tugboats and pharma.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. In early June 2026, Trade Ministers Bolat and Sidhu issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions. In the coming months, technical teams from both countries will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. On January 20, 2026, Canada hosted the second JETCO meeting in Ottawa, co-chaired by Rob Stewart and Mustafa Tuzcu, after the inaugural 2019 session in Istanbul; officials highlighted priority sectors including infrastructure, the green economy, energy and mining, aerospace and defence, and renewable energy, and committed to exploring improved air transportation links. GAC’s relations page reports that in 2024 two-way merchandise trade was over $4.3 billion, with Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion. Canada’s top 2024 imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in the mining sector, fell from $1 billion in 2022 to $420 million in 2023. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-stem',
        title: 'Express Entry 2026: trade occupations',
        desc: 'Carpenters, plumbers, electricians, welders and HVAC mechanics need 12 months in one eligible NOC.',
        content:
          'IRCC’s current Express Entry category-based rounds include trade occupations. On February 18, 2026, Immigration Minister Lena Metlege Diab said IRCC would continue inviting candidates with trades experience such as carpenters, plumbers and machinists, as part of categories aimed at long-term labour shortages including construction occupations that help address housing needs. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list — in Canada or abroad. This experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 trades list includes construction managers (NOC 70010, TEER 0), home building and renovation managers (70011, TEER 0), construction estimators (22303, TEER 2), machinists and machining and tooling inspectors (72100, TEER 2), sheet metal workers (72102, TEER 2), welders and related machine operators (72106, TEER 2), electricians except industrial and power system (72200, TEER 2), industrial electricians (72201, TEER 2), plumbers (72300, TEER 2), gas fitters (72302, TEER 2), carpenters (72310, TEER 2), cabinetmakers (72311, TEER 2), bricklayers (72320, TEER 2), construction millwrights and industrial mechanics (72400, TEER 2), heavy-duty equipment mechanics (72401, TEER 2), heating, refrigeration and air conditioning mechanics (72402, TEER 2), electrical mechanics (72422, TEER 2), concrete finishers (73100, TEER 3), roofers and shinglers (73110, TEER 3), painters and decorators except interior decorators (73112, TEER 3), floor covering installers (73113, TEER 3), and butchers — retail and wholesale (63201, TEER 3). Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Turkish culture, art and taste this Sunday, 12 p.m.–8 p.m. at 1 Dundas Street East.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. After the 2016 and 2017 festivals, anatoliafest.ca frames the long-awaited 3rd edition as a reunion — Toronto’s celebration of Turkish heritage through culture, art and taste — with Turkish coffee and baklava, music, crafts, and regional art. kutuphane.ca, the festival host, invites everyone to Anatolia Fest Vol. 3: traditional music, dance, cuisine, and arts from Türkiye in the heart of the city. Sankofa Square lists the free, family-friendly gathering with cultural performances that bring stories to life. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: '7 Temmuz NATO lansmanı; 20 Ocak JETCO Ottawa; 2024 başlıca ithalat demir sac, römorkör ve ilaç.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. 2026 Haziran başında Ticaret Bakanları Bolat ve Sidhu, keşif görüşmelerini başlatan Ekonomik Ortaklık Ortak Bakanlar Bildirisini yayımladı. Önümüzdeki aylarda her iki ülkenin teknik ekipleri anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. 20 Ocak 2026’da Kanada, 2019 İstanbul’daki ilk oturumun ardından Ottawa’da ikinci JETCO toplantısına ev sahipliği yaptı; eş başkanlar Rob Stewart ve Mustafa Tuzcu altyapı, yeşil ekonomi, enerji-madencilik, havacılık-savunma ve yenilenebilir enerji öncelik sektörlerini vurguladı ve hava ulaşım bağlantılarının iyileştirilmesini keşfetmeyi taahhüt etti. GAC ilişkiler sayfasına göre 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı; Kanada mal ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar oldu. 2024’te Türkiye’den başlıca ithalat yassı haddelenmiş demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve eczacılık ürünleri (107 milyon) idi. Kanada’nın Türkiye’deki doğrudan yatırımları, çoğunlukla madencilik sektöründe, 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-stem',
      title: 'Express Entry 2026: ticaret meslekleri',
      desc: 'Marangoz, tesisatçı, elektrikçi, kaynakçı ve HVAC tamircileri için tek NOC’ta 12 ay.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları ticaret mesleklerini kapsıyor. 18 Şubat 2026’da Göçmenlik Bakanı Lena Metlege Diab, marangoz, tesisatçı ve makinist gibi meslek deneyimi olan adayları davet etmeye devam edeceğini duyurdu; bu kategoriler konut ihtiyacına yardımcı inşaat meslekleri dahil uzun vadeli işgücü açıklarını hedefiyor. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da veya yurt dışında, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 ticaret listesinde inşaat yöneticileri (NOC 70010, TEER 0), ev inşaatı ve yenileme yöneticileri (70011, TEER 0), inşaat maliyet tahmincileri (22303, TEER 2), makinistler (72100, TEER 2), sac metal işçileri (72102, TEER 2), kaynakçılar (72106, TEER 2), elektrikçiler (endüstriyel ve güç sistemi hariç) (72200, TEER 2), endüstriyel elektrikçiler (72201, TEER 2), tesisatçılar (72300, TEER 2), gaz tesisatçıları (72302, TEER 2), marangozlar (72310, TEER 2), mobilyacılar (72311, TEER 2), duvarcılar (72320, TEER 2), değirmenci ve endüstriyel mekanikçiler (72400, TEER 2), ağır iş makineleri tamircileri (72401, TEER 2), ısıtma, soğutma ve klima (HVAC) tamircileri (72402, TEER 2), elektrik tamircileri (72422, TEER 2), beton bitiriciler (73100, TEER 3), çatı ustaları (73110, TEER 3), boyacı ve dekoratörler (iç dekoratörler hariç) (73112, TEER 3), zemin kaplama montajcıları (73113, TEER 3) ile perakende ve toptan kasaplar (63201, TEER 3) yer alıyor. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Türk kültürü, sanat ve tat bu Pazar 12.00–20.00; 1 Dundas Street East.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. 2016 ve 2017 festivallerinin ardından anatoliafest.ca uzun zamandır beklenen 3. edisyonu bir yeniden birleşme — Toronto’nun kültür, sanat ve tat yoluyla Türk mirasını kutlaması — olarak anlatıyor; Türk kahvesi ve baklava, müzik, el sanatları ve yöresel sanat yer alıyor. Festivalin ev sahibi kutuphane.ca herkesi Anatolia Fest Vol. 3’e, kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanata davet ediyor. Sankofa Square ücretsiz, aile dostu buluşmayı hikâyeleri hayata geçiren kültürel gösterilerle listeliyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
