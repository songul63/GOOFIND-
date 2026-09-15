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
        desc: 'June 8 exploratory talks and Air Transport expansion; July 7 launch; 2024 top exports lentils, scrap and soy.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On June 8, 2026, in Ottawa, International Trade Minister Maninder Sidhu and Türkiye’s Minister of Trade agreed to launch exploratory discussions toward a free trade agreement and welcomed the recent expansion of the bilateral Air Transport Agreement, which they said strengthens connectivity and opens new opportunities for travellers, businesses and exporters. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement said closer economic cooperation will support growth, job creation, competitiveness and supply chains, and that in the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. GAC’s relations page notes longstanding diplomatic relations: Türkiye opened an embassy in Ottawa in 1944, and Canada appointed its first ambassador to Türkiye in 1947. Canada welcomes a vibrant Turkish diaspora community of over 65,000, concentrated in Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary and Edmonton. The same page reports that in 2024 two-way merchandise trade was over CA$4.3 billion — Canadian exports $1.3 billion and imports from Türkiye $3.1 billion — and Canada’s top 2024 exports to Türkiye were lentils and chickpeas ($393 million), iron and steel waste and scrap ($167 million), and soybeans ($113 million). The first Joint Economic and Trade Committee (JETCO) meeting was held in Istanbul in 2019; Canada hosted the second meeting in Ottawa on January 20, 2026, where the two countries discussed cooperation in infrastructure, the green economy, energy and mining, aerospace and defence, and renewable energy technologies, and committed to continue exploring ways to improve air transportation links. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-healthcare',
        title: 'Express Entry 2026: healthcare and social services',
        desc: '12 months in one eligible NOC; 19,200 health-category ITAs in 2025, 18.6% of Express Entry invitations.',
        content:
          'IRCC’s current Express Entry category-based rounds include healthcare and social services occupations, listed in February 2026 among the categories that help address long-term labour shortages. On February 18, 2026, Immigration Minister Lena Metlege Diab announced that IRCC will continue holding invitation rounds for this category — such as nurse practitioners, dentists, pharmacists, psychologists and chiropractors — and her speaking notes said a first round for doctors would be followed by a separate round for other health care and social services professionals. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list — in Canada or abroad. This experience does not need to be continuous, and it does not have to be your primary occupation. Occupations on the 2026 list include general practitioners and family physicians (NOC 31102, TEER 1), registered nurses and registered psychiatric nurses (31301, TEER 1), nurse practitioners (31302, TEER 1), licensed practical nurses (32101, TEER 2), pharmacists (31120, TEER 1), dentists (31110, TEER 1), psychologists (31200, TEER 1), chiropractors (31201, TEER 1), occupational therapists (31203, TEER 1), paramedical occupations (32102, TEER 2), social workers (41300, TEER 1), social and community service workers (42201, TEER 2), and nurse aides, orderlies and patient service associates (33102, TEER 3). IRCC’s 2026 consultations page reports that in 2025, 19,200 health-care category-eligible candidates received an invitation to apply (57% already in Canada; average CRS 476, range 379–630), accounting for 18.6% of Express Entry invitations excluding Provincial Nominee Program rounds — up from 8,180 invitations (9.7%) in 2023 and 11,967 (16.0%) in 2024. Public consultations on economic priorities and categories for 2027 ran from August 4 to September 1, 2026; the department is considering a continued focus on addressing long-term labour shortages, including in health care. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'This Sunday, 12 p.m.–8 p.m.; free Turkish Culture, Art & Taste with a book fair, baklava and live music.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. Sankofa Square lists Anatolia Fest: Turkish Culture, Art & Taste Festival as a free, family-friendly gathering with Turkish cuisine, traditional arts, live music and cultural performances, hands-on activities and a Turkish book fair, sponsored by Turkish Airlines and GoTürkiye. After festivals in 2016 and 2017, anatoliafest.ca frames the long-awaited 3rd edition as a reunion — Turkish coffee and baklava, music, crafts and regional art. Host kutuphane.ca (Anatolia Fest Vol. 3) invites everyone to traditional music, dance, cuisine and arts from Türkiye in the heart of the city. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: '8 Haziran keşif görüşmeleri ve Hava Ulaştırma genişlemesi; 7 Temmuz’da resmi başlatma; 2024’te mercimek, hurda ve soya.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 8 Haziran 2026’da Ottawa’da Uluslararası Ticaret Bakanı Maninder Sidhu ve Türkiye Ticaret Bakanı serbest ticaret anlaşmasına yönelik keşif görüşmelerini başlatmayı kararlaştırdı ve ikili Hava Ulaştırma Anlaşması’nın yakın zamandaki genişlemesini memnuniyetle karşıladı; bakanlar bunun bağlantıyı güçlendirdiğini ve yolcular, işletmeler ve ihracatçılar için yeni fırsatlar açtığını belirtti. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi; önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfası köklü diplomatik bağları kaydediyor: Türkiye 1944’te Ottawa’da büyükelçilik açtı, Kanada 1947’de Türkiye’ye ilk büyükelçisini atadı. Kanada, çoğunluğu Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary ve Edmonton’da yaşayan 65.000’den fazla kişilik canlı bir Türk diasporasını karşılıyor. Aynı sayfaya göre 2024’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı — Kanada ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar — ve 2024’te Türkiye’ye başlıca ihracat mercimek ve nohut (393 milyon dolar), demir-çelik hurdası (167 milyon) ve soya fasulyesi (113 milyon) oldu. İlk Ortak Ekonomi ve Ticaret Komitesi (JETCO) toplantısı 2019’da İstanbul’da yapıldı; Kanada ikinci toplantıyı 20 Ocak 2026’da Ottawa’da ağırladı — ülkeler altyapı, yeşil ekonomi, enerji ve madencilik, havacılık-savunma ve yenilenebilir enerji teknolojilerinde iş birliğini görüştü ve hava ulaşım bağlantılarını iyileştirme yollarını araştırmaya devam etmeyi taahhüt etti. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-healthcare',
      title: 'Express Entry 2026: sağlık ve sosyal hizmetler',
      desc: 'Tek uygun NOC’ta 12 ay; 2025’te 19.200 sağlık kategorisi daveti, Express Entry davetlerinin %18,6’sı.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları sağlık ve sosyal hizmet mesleklerini kapsıyor; Şubat 2026’da uzun vadeli işgücü açıklarını gidermeye yardımcı kategoriler arasında listelendi. 18 Şubat 2026’da Göçmenlik Bakanı Lena Metlege Diab, IRCC’nin bu kategoride — örneğin hemşire pratisyenler, diş hekimleri, eczacılar, psikologlar ve kayropraktörler — davet turlarına devam edeceğini duyurdu; konuşma notlarında hekimlere yönelik ilk turun ardından diğer sağlık ve sosyal hizmet meslekleri için ayrı bir tur yapılacağı belirtildi. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da veya yurt dışında, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 listesinde pratisyen hekimler ve aile hekimleri (NOC 31102, TEER 1), kayıtlı hemşireler ve kayıtlı psikiyatri hemşireleri (31301, TEER 1), hemşire pratisyenler (31302, TEER 1), lisanslı pratisyen hemşireler (32101, TEER 2), eczacılar (31120, TEER 1), diş hekimleri (31110, TEER 1), psikologlar (31200, TEER 1), kayropraktörler (31201, TEER 1), iş uğraşı terapistleri (31203, TEER 1), paramedikal meslekler (32102, TEER 2), sosyal çalışmacılar (41300, TEER 1), sosyal ve toplum hizmeti çalışanları (42201, TEER 2) ile hemşire yardımcıları, hasta bakıcılar ve hasta hizmeti görevlileri (33102, TEER 3) yer alıyor. IRCC’nin 2026 istişare sayfasına göre 2025’te sağlık kategorisine uygun 19.200 aday davet aldı (yüzde 57’si zaten Kanada’daydı; ortalama CRS 476, aralık 379–630); bu, Eyalet Aday Programı turları hariç Express Entry davetlerinin %18,6’sını oluşturdu — 2023’teki 8.180 davetten (%9,7) ve 2024’teki 11.967 davetten (%16,0) artış. 2027 ekonomik öncelikleri ve kategorilerine ilişkin kamu istişareleri 4 Ağustos–1 Eylül 2026 tarihleri arasında yapıldı; bakanlık sağlık dahil uzun vadeli işgücü açıklarına odaklanmayı sürdürmeyi değerlendiriyor. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Bu Pazar 12.00–20.00; ücretsiz Türk kültürü, sanat ve lezzet — kitap fuarı, baklava ve canlı müzik.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. Sankofa Square, Anatolia Fest: Türk Kültürü, Sanat ve Lezzet Festivali’ni Türk mutfağı, geleneksel sanatlar, canlı müzik ve kültürel gösteriler, etkileşimli etkinlikler ve Türk kitap fuarı ile ücretsiz, aile dostu bir buluşma olarak listeliyor; sponsorlar Turkish Airlines ve GoTürkiye. 2016 ve 2017 festivallerinin ardından anatoliafest.ca uzun zamandır beklenen 3. edisyonu bir yeniden birleşme olarak anlatıyor — Türk kahvesi ve baklava, müzik, el sanatları ve yöresel sanat. Ev sahibi kutuphane.ca (Anatolia Fest Vol. 3) herkesi kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanata davet ediyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
