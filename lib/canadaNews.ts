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
        desc: 'June exploratory talks led to the July 7 launch; consultations closed Sept 14. Ministers also welcomed expanded air links.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. In early June 2026, Trade Ministers Ömer Bolat and Maninder Sidhu issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions; that statement also welcomed the recent expansion of the Air Transport Agreement to strengthen connectivity for travellers, businesses and exporters. In the coming months, technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. GAC’s relations page reports that in 2024 two-way merchandise trade was over CA$4.3 billion, and Canada’s top imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in the mining sector, fell from $1 billion in 2022 to $420 million in 2023. Canada hosted the second Canada–Türkiye JETCO meeting in Ottawa on January 20, 2026, co-chaired by Deputy Ministers Rob Stewart and Mustafa Tuzcu, following the inaugural 2019 meeting in Istanbul. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-transport',
        title: 'Express Entry 2026: transport occupations',
        desc: 'Pilots, aircraft mechanics, avionics technicians and vehicle mechanics need 12 months in one eligible NOC.',
        content:
          'IRCC’s current Express Entry category-based rounds include transport occupations. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list, in Canada or abroad — this experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 transport list is aircraft mechanics and aircraft inspectors (NOC 72404, TEER 2), air pilots, flight engineers and flying instructors (72600, TEER 2), aircraft instrument, electrical and avionics mechanics, technicians and inspectors (22313, TEER 2), and automotive service technicians, truck and bus mechanics, and mechanical repairers (72410, TEER 2). On February 18, 2026, Immigration Minister Lena Metlege Diab announced the category, highlighting pilots, aircraft mechanics and inspectors among 2026 labour-shortage priorities to support trade, supply chains and economic resilience. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Turkish Culture, Art & Taste Festival this Sunday, 12 p.m.–8 p.m.; free and family-friendly.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. Sankofa Square lists the free, family-friendly Turkish Culture, Art & Taste Festival with Turkish cuisine, traditional arts, live music and cultural performances, hands-on activities, and a Turkish book fair, sponsored by Turkish Airlines and GoTürkiye. kutuphane.ca, the festival host, frames the 3rd edition as traditional music, dance, cuisine, and arts from Türkiye in the heart of the city. After the 2016 and 2017 festivals, anatoliafest.ca describes the comeback as a reunion and a bridge reconnecting the community with traditions from Türkiye, including Turkish coffee, baklava, crafts, and regional art. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: 'Haziran’daki keşif görüşmeleri 7 Temmuz’daki resmi başlangıca yol açtı; istişareler kapandı. Bakanlar hava bağlantısının genişletilmesini de karşıladı.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. 2026 Haziran başında Ticaret Bakanları Ömer Bolat ve Maninder Sidhu Ekonomik Ortaklık Ortak Bakanlar Açıklaması yayımlayarak keşif görüşmelerini başlattı; açıklamada yolcular, işletmeler ve ihracatçılar için bağlantıyı güçlendiren Hava Ulaştırma Anlaşması’nın yakın zamandaki genişlemesi de memnuniyetle karşılandı. Önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfasına göre 2024’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı; Türkiye’den başlıca ithalat yassı haddelenmiş demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve eczacılık ürünleri (107 milyon) oldu. Çoğunluğu madencilikte olan Kanada’nın Türkiye’deki doğrudan yatırım stoku 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. Kanada, 20 Ocak 2026’da Ottawa’da ikinci Kanada–Türkiye JETCO toplantısına ev sahipliği yaptı; eş başkanlar Bakan Yardımcıları Rob Stewart ve Mustafa Tuzcu idi (ilk toplantı 2019’da İstanbul’da yapılmıştı). Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-transport',
      title: 'Express Entry 2026: ulaşım meslekleri',
      desc: 'Pilotlar, uçak mekanikçileri, aviyonik teknisyenleri ve araç tamircileri için tek NOC’ta 12 ay.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları ulaşım mesleklerini kapsıyor. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da veya yurt dışında, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 ulaşım listesinde uçak mekanikçileri ve uçak müfettişleri (NOC 72404, TEER 2), hava pilotları, uçuş mühendisleri ve uçuş eğitmenleri (72600, TEER 2), uçak alet, elektrik ve aviyonik mekanikçileri, teknisyenleri ve müfettişleri (22313, TEER 2) ile otomotiv servis teknisyenleri, kamyon ve otobüs tamircileri ve mekanik tamirciler (72410, TEER 2) yer alıyor. 18 Şubat 2026’da Göçmenlik Bakanı Lena Metlege Diab kategoriyi duyururken pilotlar, uçak mekanikçileri ve müfettişlerini ticaret, tedarik zincirleri ve ekonomik dayanıklılık için 2026 iş gücü açığı öncelikleri arasında vurguladı. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Türk Kültürü, Sanat ve Tat Festivali bu Pazar 12.00–20.00; ücretsiz ve aile dostu.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. Sankofa Square ücretsiz, aile dostu Türk Kültürü, Sanat ve Tat Festivali’ni Türk mutfağı, geleneksel sanatlar, canlı müzik ve kültürel gösteriler, uygulamalı etkinlikler ve Türk kitap fuarı olarak listeliyor; etkinliğin sponsorları Turkish Airlines ve GoTürkiye. Festivalin ev sahibi kutuphane.ca, 3. edisyonu kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanatın kutlaması olarak tanımlıyor. 2016 ve 2017 festivallerinin ardından anatoliafest.ca dönüşü bir yeniden birleşme ve toplumun Türkiye’den gelen geleneklerle köprü kurması olarak anlatıyor; Türk kahvesi, baklava, el sanatları ve yöresel sanat da programda. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
