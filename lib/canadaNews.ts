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
        desc: 'July 7 NATO Summit launch; 2024 top imports flat-rolled iron, tugboats and pharmaceuticals; JETCO Ottawa in January.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement said closer economic cooperation will support growth, job creation, competitiveness and supply chains, and that in the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. GAC’s relations page reports that in 2024 two-way merchandise trade was over $4.3 billion — Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion. Canada’s top 2024 imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in the mining sector, fell from $1 billion in 2022 to $420 million in 2023. On December 31, 2024, there were 4,650 Turkish citizens holding valid study permits in Canada, a return to 2022 levels and a 23% decrease from 2023. Canada and Türkiye held the first Joint Economic and Trade Committee (JETCO) meeting in Istanbul in 2019 and the second in Ottawa on January 20, 2026; GAC’s JETCO readout lists priority sectors including infrastructure, the green economy, energy and mining, aerospace and defence, and renewable energy technologies, and a commitment to continue exploring ways to improve air transportation links. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-trades',
        title: 'Express Entry 2026: trade occupations',
        desc: 'Carpenters, plumbers and machinists need 12 months in one eligible NOC; 4,589 trades ITAs in 2025, 4.4% of invitations.',
        content:
          'IRCC’s current Express Entry category-based rounds include trade occupations, listed among the 2026 categories that help address long-term labour shortages, including construction occupations that help address housing needs. On February 18, 2026, Immigration Minister Lena Metlege Diab said IRCC would continue inviting candidates with trades experience such as carpenters, plumbers and machinists. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list — in Canada or abroad. This experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 trades list includes construction estimators (NOC 22303, TEER 2), construction managers (70010, TEER 0), home building and renovation managers (70011, TEER 0), machinists and machining and tooling inspectors (72100, TEER 2), sheet metal workers (72102, TEER 2), welders and related machine operators (72106, TEER 2), electricians except industrial and power system (72200, TEER 2), industrial electricians (72201, TEER 2), plumbers (72300, TEER 2), gas fitters (72302, TEER 2), carpenters (72310, TEER 2), cabinetmakers (72311, TEER 2), bricklayers (72320, TEER 2), construction millwrights and industrial mechanics (72400, TEER 2), heavy-duty equipment mechanics (72401, TEER 2), heating, refrigeration and air conditioning mechanics (72402, TEER 2), electrical mechanics (72422, TEER 2), water well drillers (72501, TEER 2), other technical trades and related occupations (72999, TEER 2), concrete finishers (73100, TEER 3), roofers and shinglers (73110, TEER 3), painters and decorators except interior decorators (73112, TEER 3), floor covering installers (73113, TEER 3), contractors and supervisors, oil and gas drilling and services (82021, TEER 2), and butchers — retail and wholesale (63201, TEER 3). IRCC’s 2026 consultations page reports that in 2025, 4,589 trades category-eligible candidates received an invitation to apply (78% already in Canada; average CRS 499, range 379–636), accounting for 4.4% of Express Entry invitations excluding Provincial Nominee Program rounds — compared with 2,855 invitations (3.4%) in 2023 and 3,884 (5.2%) in 2024. Public consultations on economic priorities and categories for 2027 ran from August 4 to September 1, 2026; the department is considering a continued focus on addressing long-term labour shortages, including in trades. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Free Turkish Culture, Art & Taste Festival this Sunday, 12 p.m.–8 p.m., with a book fair.',
        content:
          'Anatolia Fest: Turkish Culture, Art & Taste Festival returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. Sankofa Square lists the free, family-friendly festival with Turkish cuisine, traditional arts, live music and cultural performances, hands-on activities, and a Turkish book fair, sponsored by Turkish Airlines and GoTürkiye. After festivals in 2016 and 2017, anatoliafest.ca frames the long-awaited 3rd edition as a reunion — Turkish coffee and baklava, music, crafts and regional art. Host kutuphane.ca (Anatolia Fest Vol. 3) invites everyone to traditional music, dance, cuisine and arts from Türkiye in the heart of the city. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: '7 Temmuz NATO Zirvesi lansmanı; 2024’te başlıca ithalat yassı demir, römorkör ve ilaç; Ocak’ta Ottawa JETCO.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi; önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfasına göre 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı — Kanada mal ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar. Kanada’nın 2024’te Türkiye’den başlıca ithalatı yassı demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve eczacılık ürünleri (107 milyon) oldu. Çoğunluğu madencilikte olan Kanada’nın Türkiye’deki doğrudan yatırımı 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. 31 Aralık 2024’te Kanada’da geçerli öğrenim izni bulunan 4.650 Türk vatandaşı vardı; bu 2022 düzeyine dönüş ve 2023’e göre yüzde 23 azalmadır. Kanada ve Türkiye 2019’da İstanbul’da ilk Ortak Ekonomi ve Ticaret Komitesi (JETCO) toplantısını, 20 Ocak 2026’da Ottawa’da ikincisini yaptı; GAC’nin JETCO özeti altyapı, yeşil ekonomi, enerji ve madencilik, havacılık-savunma ve yenilenebilir enerji teknolojilerini öncelikli sektörler olarak listeler ve hava ulaşımı bağlantılarını iyileştirmenin yollarını araştırmaya devam etme taahhüdünü kaydeder. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-trades',
      title: 'Express Entry 2026: ticaret meslekleri',
      desc: 'Marangoz, tesisatçı ve makinistler için tek NOC’ta 12 ay; 2025’te 4.589 ticaret daveti, davetlerin %4,4’ü.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları ticaret mesleklerini kapsıyor; 2026’da uzun vadeli işgücü açıklarını, konut ihtiyacına yardımcı inşaat meslekleri dahil, gidermeye yardımcı kategoriler arasında listelendi. 18 Şubat 2026’da Göçmenlik Bakanı Lena Metlege Diab, marangoz, tesisatçı ve makinist gibi meslek deneyimi olan adayları davet etmeye devam edeceğini duyurdu. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da veya yurt dışında, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 ticaret listesinde inşaat maliyet tahmincileri (NOC 22303, TEER 2), inşaat yöneticileri (70010, TEER 0), ev inşaatı ve yenileme yöneticileri (70011, TEER 0), makinistler (72100, TEER 2), sac metal işçileri (72102, TEER 2), kaynakçılar (72106, TEER 2), elektrikçiler (endüstriyel ve güç sistemi hariç) (72200, TEER 2), endüstriyel elektrikçiler (72201, TEER 2), tesisatçılar (72300, TEER 2), gaz tesisatçıları (72302, TEER 2), marangozlar (72310, TEER 2), mobilyacılar (72311, TEER 2), duvarcılar (72320, TEER 2), değirmenci ve endüstriyel mekanikçiler (72400, TEER 2), ağır iş makineleri tamircileri (72401, TEER 2), ısıtma, soğutma ve klima (HVAC) tamircileri (72402, TEER 2), elektrik tamircileri (72422, TEER 2), su kuyusu sondajcıları (72501, TEER 2), diğer teknik meslekler (72999, TEER 2), beton bitiriciler (73100, TEER 3), çatı ustaları (73110, TEER 3), boyacı ve dekoratörler (iç dekoratörler hariç) (73112, TEER 3), zemin kaplama montajcıları (73113, TEER 3), petrol ve gaz sondaj ve hizmet yüklenici ve denetçileri (82021, TEER 2) ile perakende ve toptan kasaplar (63201, TEER 3) yer alıyor. IRCC’nin 2026 istişare sayfasına göre 2025’te ticaret kategorisine uygun 4.589 aday davet aldı (yüzde 78’i zaten Kanada’daydı; ortalama CRS 499, aralık 379–636); bu, Eyalet Aday Programı turları hariç Express Entry davetlerinin %4,4’ünü oluşturdu — 2023’te 2.855 davet (%3,4) ve 2024’te 3.884 davet (%5,2) ile karşılaştırıldığında. 2027 ekonomik öncelikleri ve kategorilerine ilişkin kamu istişareleri 4 Ağustos–1 Eylül 2026 tarihleri arasında yapıldı; bakanlık ticaret meslekleri dahil uzun vadeli işgücü açıklarına odaklanmayı sürdürmeyi değerlendiriyor. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Ücretsiz Türk Kültürü, Sanat ve Tat Festivali bu Pazar 12.00–20.00; kitap fuarı da var.',
      content:
        'Anatolia Fest: Türk Kültürü, Sanat ve Tat Festivali bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. Sankofa Square ücretsiz, aile dostu festivali Türk mutfağı, geleneksel sanatlar, canlı müzik ve kültürel gösteriler, uygulamalı etkinlikler ve Türk kitap fuarı olarak listeliyor; etkinliğin sponsorları Turkish Airlines ve GoTürkiye. 2016 ve 2017 festivallerinin ardından anatoliafest.ca uzun zamandır beklenen 3. edisyonu bir yeniden birleşme olarak anlatıyor — Türk kahvesi ve baklava, müzik, el sanatları ve yöresel sanat. Ev sahibi kutuphane.ca (Anatolia Fest Vol. 3) herkesi kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanata davet ediyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
