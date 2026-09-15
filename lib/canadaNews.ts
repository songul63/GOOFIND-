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
        desc: 'July 7 NATO launch followed June exploratory talks; 2024 top imports iron sheet, tugboats and pharma.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. The Prime Minister’s Office joint statement notes that in early June 2026 Trade Ministers Bolat and Sidhu issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions, and that closer economic cooperation will support growth, job creation, competitiveness and supply chains. In the coming months, technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. GAC’s relations page records diplomatic ties from Türkiye’s 1944 Ottawa embassy and Canada’s 1947 first ambassador, and a Turkish diaspora of over 65,000 concentrated in Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary and Edmonton. In 2024 two-way merchandise trade was over $4.3 billion, with Canadian exports of $1.3 billion and imports from Türkiye of $3.1 billion. Canada’s top 2024 imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in the mining sector, fell from $1 billion in 2022 to $420 million in 2023. On December 31, 2024, 4,650 Turkish citizens held valid study permits in Canada — a return to 2022 levels and a 23% decrease from 2023. Opportunity sectors include agriculture, energy, information and communication technologies, life sciences, transportation, cleantech, mining, education and infrastructure. Canada hosted the second Canada–Türkiye Joint Economic and Trade Committee (JETCO) meeting in Ottawa on January 20, 2026, following the inaugural 2019 meeting in Istanbul; officials highlighted priority sectors including infrastructure, the green economy, energy and mining, aerospace and defence, and renewable energy, and committed to exploring air transportation links. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-physicians',
        title: 'Express Entry 2026: physicians with Canadian experience',
        desc: 'GPs, surgeons and specialists need 12 months in Canada; 5,000 extra PNP spaces for licensed doctors.',
        content:
          'IRCC’s current Express Entry category-based rounds include physicians with Canadian work experience. On December 8, 2025 in Toronto, Immigration Minister Lena Metlege Diab and Parliamentary Secretary Maggie Chi announced a new Express Entry category for international doctors with at least one year of Canadian work experience in an eligible occupation, gained within the last three years. That announcement also reserved 5,000 federal admission spaces for provinces and territories to nominate licensed doctors with job offers — in addition to annual Provincial Nominee Program allocations — with expedited 14-day work-permit processing so nominees can work while awaiting permanent residence. On February 18, 2026, Minister Diab confirmed the 2026 categories, including the new category for foreign medical doctors with Canadian work experience, and said the first round for those doctors would be in the coming days. Her speaking notes said providing a clear pathway to permanent residence helps keep doctors in Canada and supports better access to care. IRCC’s 2026 consultations page groups the physicians category under attracting and retaining talent. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list — in Canada. This experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 physician list is specialists in clinical and laboratory medicine (NOC 31100, TEER 1), specialists in surgery (31101, TEER 1), and general practitioners and family physicians (31102, TEER 1). IRCC’s medical-doctors pathway page notes that invited candidates must submit their permanent-residence application within 60 days. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Free Turkish Culture, Art & Taste Festival this Sunday, 12 p.m.–8 p.m., with a book fair.',
        content:
          'Anatolia Fest: Turkish Culture, Art & Taste Festival returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. Sankofa Square lists the free, family-friendly festival with Turkish cuisine, traditional arts, live music and cultural performances, hands-on activities, and a Turkish book fair, sponsored by Turkish Airlines and GoTürkiye. kutuphane.ca, the festival host, frames Anatolia Fest Vol. 3 as traditional music, dance, cuisine, and arts from Türkiye in the heart of the city. After the 2016 and 2017 festivals, anatoliafest.ca describes the 3rd edition as a reunion and a bridge reconnecting the community with traditions from Türkiye, including Turkish coffee, baklava, crafts, and regional art. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: '7 Temmuz NATO başlangıcı Haziran’daki keşif görüşmelerinin ardından geldi; 2024 başlıca ithalat demir sac, römorkör ve ilaç.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Başbakanlık ortak açıklamasına göre 2026 Haziran’ının başında Ticaret Bakanları Bolat ve Sidhu Ekonomik Ortaklık Ortak Bakanlar Açıklaması yayımlayarak keşif görüşmelerini başlattı; daha yakın ekonomik iş birliği büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyecek. Önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfası diplomatik bağları Türkiye’nin 1944 Ottawa büyükelciliği ve Kanada’nın 1947’deki ilk büyükelçisinden başlatır; 65.000’den fazla kişilik Türk diasporası Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary ve Edmonton’da yoğunlaşır. 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı; Kanada ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar oldu. 2024’te Türkiye’den başlıca Kanada ithalatı yassı haddelenmiş demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve eczacılık ürünleri (107 milyon) idi. Çoğunluğu madencilikte olan Kanada’nın Türkiye’deki doğrudan yatırım stoku 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. 31 Aralık 2024’te Kanada’da geçerli öğrenim izni bulunan 4.650 Türk vatandaşı vardı; bu 2022 düzeyine dönüş ve 2023’e göre %23 azalma demektir. Fırsat sektörleri tarım, enerji, bilgi ve iletişim teknolojileri, yaşam bilimleri, ulaşım, temiz teknoloji, madencilik, eğitim ve altyapıyı kapsar. Kanada, 20 Ocak 2026’da Ottawa’da ikinci Kanada–Türkiye JETCO toplantısına ev sahipliği yaptı; ilk toplantı 2019’da İstanbul’da yapılmıştı. Yetkililer altyapı, yeşil ekonomi, enerji ve madencilik, havacılık ve savunma ile yenilenebilir enerji önceliklerini vurguladı ve hava ulaşım bağlantılarını keşfetmeye devam etme taahhüdünde bulundu. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-physicians',
      title: 'Express Entry 2026: Kanada deneyimli hekimler',
      desc: 'Aile hekimleri, cerrahlar ve uzmanlar için Kanada’da 12 ay; lisanslı hekimlere 5.000 ek PNP kotası.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları Kanada iş deneyimli hekimleri kapsıyor. 8 Aralık 2025’te Toronto’da Göçmenlik Bakanı Lena Metlege Diab ve Parlamento Sekreteri Maggie Chi, son üç yılda uygun bir meslekte en az bir yıl Kanada iş deneyimi olan uluslararası hekimler için yeni bir Express Entry kategorisi duyurdu. Aynı açıklamada eyalet ve bölgelerin iş teklifli lisanslı hekimleri aday göstermesi için yıllık Eyalet Aday Programı kotalarına ek 5.000 federal kabul kotası ayrıldı; aday gösterilen hekimler kalıcı oturum beklerken çalışabilsin diye 14 günlük hızlandırılmış çalışma izni işlemesi uygulanacak. 18 Şubat 2026’da Bakan Diab 2026 kategorilerini, Kanada iş deneyimli yabancı tıp hekimleri için yeni kategoriyi de kapsayacak şekilde teyit etti ve bu hekimler için ilk turun önümüzdeki günlerde olacağını söyledi. Konuşma notlarında kalıcı oturuma net bir yolun hekimleri Kanada’da tutmaya ve bakıma erişimi desteklemeye yardımcı olacağını belirtti. IRCC’nin 2026 istişare sayfası hekim kategorisini yetenek çekme ve elde tutma başlığı altında grupluyor. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 hekim listesinde klinik ve laboratuvar tıbbı uzmanları (NOC 31100, TEER 1), cerrahi uzmanları (31101, TEER 1) ve pratisyen hekimler ile aile hekimleri (31102, TEER 1) yer alıyor. IRCC’nin tıp hekimleri sayfasına göre davet alan adayların kalıcı oturum başvurusunu 60 gün içinde sunması gerekir. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Ücretsiz Türk Kültürü, Sanat ve Tat Festivali bu Pazar 12.00–20.00; kitap fuarı da var.',
      content:
        'Anatolia Fest: Türk Kültürü, Sanat ve Tat Festivali bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. Sankofa Square ücretsiz, aile dostu festivali Türk mutfağı, geleneksel sanatlar, canlı müzik ve kültürel gösteriler, uygulamalı etkinlikler ve Türk kitap fuarı olarak listeliyor; etkinliğin sponsorları Turkish Airlines ve GoTürkiye. Festivalin ev sahibi kutuphane.ca, Anatolia Fest Vol. 3’ü kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanat olarak tanımlıyor. 2016 ve 2017 festivallerinin ardından anatoliafest.ca 3. edisyonu bir yeniden birleşme ve toplumun Türkiye’den gelen geleneklerle — Türk kahvesi, baklava, el sanatları ve yöresel sanat — köprü kurması olarak anlatıyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
