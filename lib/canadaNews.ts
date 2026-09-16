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
        desc: 'July 7 launch; JETCO Ottawa 20 Jan 2026; 2024 top imports iron sheet, tugboats and pharma.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement said closer economic cooperation will support growth, job creation, competitiveness and supply chains, and that in the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. GAC’s relations page reports that in 2024 two-way merchandise trade was over $4.3 billion — Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion — and Canada’s top 2024 imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in the mining sector, fell from $1 billion in 2022 to $420 million in 2023. On December 31, 2024, there were 4,650 Turkish citizens holding valid study permits in Canada, a return to 2022 levels and a 23% decrease from 2023. Opportunities exist particularly in agriculture, energy, information and communication technologies, life sciences, transportation, cleantech, mining, education and infrastructure. The first Joint Economic and Trade Committee (JETCO) meeting was held in Istanbul in 2019; Canada hosted the second meeting in Ottawa on January 20, 2026, where both sides underscored cooperation in priority sectors including infrastructure, the green economy, energy and mining, aerospace and defence, and renewable energy technologies. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-transport',
        title: 'Express Entry 2026: transport occupations',
        desc: 'Pilots, aircraft mechanics and inspectors need 12 months in one eligible NOC; category sunsetted in 2025, back in 2026.',
        content:
          'IRCC’s current Express Entry category-based rounds include transport occupations, listed among the 2026 categories that help address long-term labour shortages. On February 18, 2026, Minister Lena Metlege Diab announced that Canada will invite candidates with work experience in transport occupations, including pilots, aircraft mechanics and inspectors. Her speaking notes said strengthening these sectors helps move goods across the country and to new markets—supporting trade, supply chains, and economic resilience. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list — in Canada or abroad. This experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 transport list is aircraft mechanics and aircraft inspectors (NOC 72404, TEER 2), air pilots, flight engineers and flying instructors (72600, TEER 2), aircraft instrument, electrical and avionics mechanics, technicians and inspectors (22313, TEER 2), and automotive service technicians, truck and bus mechanics, and mechanical repairers (72410, TEER 2). IRCC’s 2024–2025 report to Parliament says the transport category that had been in place in 2024 was sunsetted in 2025 to provide more immigration space for Canadian Experience Class invitations; it is back on the 2026 list. IRCC’s 2026 consultations page reports that in 2024, 1,340 transport category-eligible candidates received an invitation to apply (75% already in Canada; average CRS 465, range 336–768), accounting for 1.8% of Express Entry invitations excluding Provincial Nominee Program rounds — compared with 2,033 invitations (2.4%) in 2023. No 2025 transport-category invitations are reported because the category was not in place that year. Public consultations on economic priorities and categories for 2027 ran from August 4 to September 1, 2026; the department is considering a continued focus on addressing long-term labour shortages, including in transport. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'This Sunday, 12 p.m.–8 p.m.; 3rd edition with Turkish coffee, baklava, music, dance and crafts.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. After festivals in 2016 and 2017, anatoliafest.ca frames the long-awaited 3rd edition as a reunion — Turkish coffee and baklava, music, crafts and regional art. Host kutuphane.ca (Anatolia Fest Vol. 3) invites everyone to traditional music, dance, cuisine and arts from Türkiye in the heart of the city. Sankofa Square lists the gathering as a celebration of Turkish culture, heritage and community. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: '7 Temmuz lansmanı; 20 Ocak 2026 Ottawa JETCO; 2024’te başlıca ithalat sac, römorkör ve ilaç.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi; önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfasına göre 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı — Kanada mal ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar — ve 2024’te Türkiye’den başlıca ithalat yassı haddelenmiş demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve eczacılık ürünleri (107 milyon) oldu. Kanada’nın Türkiye’deki doğrudan yatırımları, çoğunlukla madencilik sektöründe, 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. 31 Aralık 2024’te Kanada’da geçerli öğrenim izni bulunan 4.650 Türk vatandaşı vardı; bu, 2022 düzeyine dönüş ve 2023’e göre %23 azalmadır. Fırsatlar özellikle tarım, enerji, BİT, yaşam bilimleri, ulaşım, temiz teknoloji, madencilik, eğitim ve altyapı sektörlerinde. İlk Ortak Ekonomi ve Ticaret Komitesi (JETCO) toplantısı 2019’da İstanbul’da yapıldı; Kanada ikinci toplantıyı 20 Ocak 2026’da Ottawa’da ağırladı ve taraflar altyapı, yeşil ekonomi, enerji ve madencilik, havacılık-uzay ve savunma ile yenilenebilir enerji teknolojileri öncelikli sektörlerinde iş birliğini vurguladı. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-transport',
      title: 'Express Entry 2026: ulaşım meslekleri',
      desc: 'Pilotlar, uçak teknisyenleri ve denetçiler için tek NOC’ta 12 ay; 2025’te durdurulan kategori 2026 listesinde.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları ulaşım mesleklerini kapsıyor; 2026’da uzun vadeli işgücü açıklarını gidermeye yardımcı kategoriler arasında listelendi. 18 Şubat 2026’da Bakan Lena Metlege Diab, Kanada’nın pilotlar, uçak teknisyenleri ve denetçiler dahil ulaşım mesleklerinde deneyimi olan adayları davet edeceğini duyurdu. Konuşma notlarında bu sektörlerin güçlendirilmesinin malların ülke içinde ve yeni pazarlara taşınmasına yardımcı olduğu, ticareti, tedarik zincirlerini ve ekonomik dayanıklılığı desteklediği belirtildi. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da veya yurt dışında, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 ulaşım listesinde uçak teknisyenleri ve uçak denetçileri (NOC 72404, TEER 2), hava pilotları, uçuş mühendisleri ve uçuş eğitmenleri (72600, TEER 2), uçak alet, elektrik ve aviyonik teknisyenleri, teknikerleri ve denetçileri (22313, TEER 2) ile otomotiv servis teknisyenleri, kamyon ve otobüs tamircileri ve mekanik onarımcılar (72410, TEER 2) yer alıyor. IRCC’nin 2024–2025 Parlamento raporuna göre 2024’te yürürlükte olan ulaşım kategorisi, Kanada Deneyim Sınıfı davetlerine daha fazla yer açmak için 2025’te durduruldu; kategori 2026 listesinde yeniden yer alıyor. IRCC’nin 2026 istişare sayfasına göre 2024’te ulaşım kategorisine uygun 1.340 aday davet aldı (yüzde 75’i zaten Kanada’daydı; ortalama CRS 465, aralık 336–768); bu, Eyalet Aday Programı turları hariç Express Entry davetlerinin %1,8’ini oluşturdu — 2023’teki 2.033 davete (%2,4) kıyasla. 2025’te bu kategori olmadığı için ulaşım daveti bildirilmedi. 2027 ekonomik öncelikleri ve kategorilerine ilişkin kamu istişareleri 4 Ağustos–1 Eylül 2026 tarihleri arasında yapıldı; bakanlık ulaşım dahil uzun vadeli işgücü açıklarına odaklanmayı sürdürmeyi değerlendiriyor. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Bu Pazar 12.00–20.00; 3. edisyon — Türk kahvesi, baklava, müzik, dans ve el sanatları.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. 2016 ve 2017 festivallerinin ardından anatoliafest.ca uzun zamandır beklenen 3. edisyonu bir yeniden birleşme olarak anlatıyor — Türk kahvesi ve baklava, müzik, el sanatları ve yöresel sanat. Ev sahibi kutuphane.ca (Anatolia Fest Vol. 3) herkesi kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanata davet ediyor. Sankofa Square buluşmayı Türk kültürü, mirası ve topluluğunun kutlanması olarak listeliyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
