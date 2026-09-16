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
        desc: 'July 7 NATO Summit launch; 2024 top imports iron sheet, tugboats and pharma; JETCO met in Ottawa.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement recalled that in early June 2026 Trade Ministers Bolat and Sidhu issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions, and said closer economic cooperation will support growth, job creation, competitiveness and supply chains. In the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. GAC’s relations page reports that in 2024 two-way merchandise trade was over $4.3 billion — Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion. Canada’s top 2024 imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in the mining sector, fell from $1 billion in 2022 to $420 million in 2023. On December 31, 2024, there were 4,650 Turkish citizens holding valid study permits in Canada, a return to 2022 levels and a 23% decrease from 2023. Canada and Türkiye held the first Joint Economic and Trade Committee (JETCO) meeting in Istanbul in 2019; the second meeting, in Ottawa on January 20, 2026, highlighted priority sectors including infrastructure, the green economy, energy and mining, aerospace and defence, and renewable energy technologies, and committed to continue exploring ways to improve air transportation links. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-healthcare',
        title: 'Express Entry 2026: healthcare and social services',
        desc: '12 months in an eligible NOC; 19,200 health-category ITAs in 2025, 18.6% of Express Entry invitations.',
        content:
          'IRCC’s current Express Entry category-based rounds include healthcare and social services occupations, listed in February 2026 among the categories helping address long-term labour shortages. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list, in Canada or abroad. This experience does not need to be continuous, and it does not have to be your primary occupation. Occupations on the current list include general practitioners and family physicians (NOC 31102, TEER 1), registered nurses and registered psychiatric nurses (31301, TEER 1), nurse practitioners (31302, TEER 1), licensed practical nurses (32101, TEER 2), pharmacists (31120, TEER 1), dentists (31110, TEER 1), psychologists (31200, TEER 1), chiropractors (31201, TEER 1), occupational therapists (31203, TEER 1), paramedical occupations (32102, TEER 2), social workers (41300, TEER 1), social and community service workers (42201, TEER 2), and nurse aides, orderlies and patient service associates (33102, TEER 3). On February 18, 2026, Immigration Minister Lena Metlege Diab announced that IRCC will continue holding invitation rounds for health care and social services, such as nurse practitioners, dentists, pharmacists, psychologists and chiropractors. Her speaking notes said that in the coming days IRCC would issue a first round for doctors and a separate round for other health care and social services professionals. IRCC’s 2026 consultations page reports that in 2025, 19,200 health-care category-eligible candidates received an invitation to apply (57% already in Canada; average CRS 476, range 379–630), accounting for 18.6% of Express Entry invitations excluding Provincial Nominee Program rounds — up from 8,180 invitations (9.7%) in 2023 and 11,967 (16.0%) in 2024. Public consultations on economic priorities and categories for 2027 ran from August 4 to September 1, 2026; the department is considering a continued focus on addressing long-term labour shortages, including in health care. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
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
      desc: '7 Temmuz NATO Zirvesi lansmanı; 2024’te başlıca ithalat demir sac, römorkör ve ilaç; JETCO Ottawa’da toplandı.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada, 2026’nın başında Haziran’da Ticaret Bakanları Bolat ve Sidhu’nun Ekonomik Ortaklık Ortak Bakanlar Bildirisi’yle keşif görüşmelerini başlattığı hatırlatıldı; daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi. Önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfası 2024’te iki yönlü mal ticaretinin 4,3 milyar doları aştığını — Kanada mal ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar — bildiriyor. Kanada’nın 2024’te Türkiye’den başlıca ithalatı yassı haddelenmiş demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve eczacılık ürünleri (107 milyon) oldu. Çoğunluğu madencilik sektöründe olan Kanada’nın Türkiye’deki doğrudan yatırım stoku 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. 31 Aralık 2024 itibarıyla Kanada’da geçerli öğrenim izni bulunan 4.650 Türk vatandaşı vardı; bu, 2022 düzeyine dönüş ve 2023’e göre %23 azalma anlamına geliyor. Kanada ve Türkiye ilk Ortak Ekonomi ve Ticaret Komitesi (JETCO) toplantısını 2019’da İstanbul’da yaptı; 20 Ocak 2026’daki Ottawa’daki ikinci toplantı altyapı, yeşil ekonomi, enerji ve madencilik, havacılık-savunma ve yenilenebilir enerji teknolojileri gibi öncelikli sektörleri öne çıkardı ve hava ulaşım bağlantılarını iyileştirme yollarını araştırmaya devam etme taahhüdünü yeniledi. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-healthcare',
      title: 'Express Entry 2026: sağlık ve sosyal hizmet meslekleri',
      desc: 'Uygun bir NOC’ta 12 ay; 2025’te 19.200 sağlık kategorisi daveti, Express Entry davetlerinin %18,6’sı.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları sağlık ve sosyal hizmet mesleklerini kapsıyor; Şubat 2026’da uzun vadeli işgücü açıklarını gidermeye yardımcı kategoriler arasında listelendi. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da veya yurt dışında, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. Güncel listede pratisyen hekimler ve aile hekimleri (NOC 31102, TEER 1), kayıtlı hemşireler ve kayıtlı psikiyatri hemşireleri (31301, TEER 1), hemşire pratisyenler (31302, TEER 1), lisanslı pratik hemşireler (32101, TEER 2), eczacılar (31120, TEER 1), diş hekimleri (31110, TEER 1), psikologlar (31200, TEER 1), kayropraktörler (31201, TEER 1), uğraşı terapistleri (31203, TEER 1), paramedikal meslekler (32102, TEER 2), sosyal hizmet uzmanları (41300, TEER 1), sosyal ve toplum hizmeti çalışanları (42201, TEER 2) ile hemşire yardımcıları, hasta bakıcılar ve hasta hizmeti görevlileri (33102, TEER 3) yer alıyor. 18 Şubat 2026’da Göçmenlik Bakanı Lena Metlege Diab, IRCC’nin hemşire pratisyenler, diş hekimleri, eczacılar, psikologlar ve kayropraktörler gibi sağlık ve sosyal hizmetlerde davet turlarını sürdüreceğini duyurdu. Konuşma notlarında önümüzdeki günlerde hekimler için ilk tur ile diğer sağlık ve sosyal hizmet meslekleri için ayrı bir tur yapılacağını belirtti. IRCC’nin 2026 istişare sayfasına göre 2025’te sağlık kategorisine uygun 19.200 aday davet aldı (yüzde 57’si zaten Kanada’daydı; ortalama CRS 476, aralık 379–630); bu, Eyalet Aday Programı turları hariç Express Entry davetlerinin %18,6’sını oluşturdu — 2023’teki 8.180 davetten (%9,7) ve 2024’teki 11.967 davetten (%16,0) artış. 2027 ekonomik öncelikleri ve kategorilerine ilişkin kamu istişareleri 4 Ağustos–1 Eylül 2026 tarihleri arasında yapıldı; bakanlık sağlık dahil uzun vadeli işgücü açıklarına odaklanmayı sürdürmeyi değerlendiriyor. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
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
