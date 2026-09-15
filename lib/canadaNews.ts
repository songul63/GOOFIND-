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
        desc: 'June Sidhu–Bolat exploratory talks led to the July 7 launch; Anand and Fidan discussed energy and defence in Ottawa.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On June 8, 2026, International Trade Minister Maninder Sidhu and Türkiye’s Trade Minister issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions toward a comprehensive FTA and welcoming the recent expansion of the Air Transport Agreement, which they said strengthens connectivity and opens new opportunities for travellers, businesses and exporters. On June 26 in Ottawa, Foreign Affairs Minister Anita Anand met Türkiye’s Foreign Minister Hakan Fidan to explore increased economic engagement in energy, defence, aerospace and mining; Anand also delivered a letter from Energy and Natural Resources Minister Tim Hodgson to Türkiye’s Energy Minister Alparslan Bayraktar on deepening energy-security collaboration. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement said closer economic cooperation will support growth, job creation, competitiveness and supply chains, and that in the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. The Prime Minister’s July 7 readout cited bilateral trade of $4.3 billion in 2025 and said the leaders expressed interest in deepening partnerships in defence, critical minerals, energy and advanced technologies, including aerospace. GAC’s relations page reports that in 2024 two-way merchandise trade was over CA$4.3 billion — Canadian exports $1.3 billion and imports from Türkiye $3.1 billion — and Canada’s top 2024 exports to Türkiye were lentils and chickpeas ($393 million), iron and steel waste and scrap ($167 million), and soybeans ($113 million). Canada welcomes a Turkish diaspora of over 65,000, concentrated in Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary and Edmonton. The same page notes that Canada’s and Türkiye’s armed forces cooperate in NATO operations such as the Kosovo Force (KFOR) and the NATO Mission in Iraq. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-military',
        title: 'Express Entry 2026: skilled military recruits',
        desc: 'FSMA with 10 years’ service need a CAF offer of at least 3 years in NOC 40042, 42102 or 43204.',
        content:
          'IRCC’s current Express Entry category-based rounds include skilled military recruits, a 2026 category announced on February 18, 2026 by Immigration Minister Lena Metlege Diab for highly skilled foreign military applicants recruited by the Canadian Armed Forces in key roles such as military doctors, nurses and pilots. IRCC’s 2026 consultations on category-based selection list the category under attracting and retaining talent as skilled military recruits who have a job offer from the Canadian Armed Forces. Diab’s speaking notes said eligible recruits with a CAF job offer — including doctors, nurses and pilots — can be invited to apply for permanent residence, will be subject to the same security and all military requirements, and that the category supports the government’s commitment to strengthen the armed forces, defend sovereignty and keep Canadians safe, as well as Canada’s Defence Industrial Strategy by adding workers critical to sovereignty and security. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must be a Foreign Skilled Military Applicant (FSMA): an eligible foreign national serving in a recognized foreign military with at least ten years of continuous service, and with work experience and training aligned with commissioned officers of the Canadian Armed Forces (NOC 40042, TEER 0), specialized members (42102, TEER 2), or operations members (43204, TEER 3). You must have an offer of arranged employment made by the Canadian Forces Recruiting Group for continuous full-time work in Canada lasting at least three years in one of those occupations, and at least a two-year post-secondary credential (with an educational credential assessment if completed outside Canada). Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Turkish Culture, Art & Taste this Sunday, 12 p.m.–8 p.m.; book fair, baklava and live music.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. After the 2016 and 2017 festivals, anatoliafest.ca frames the long-awaited 3rd edition as Toronto’s celebration of Turkish heritage — culture, art and taste — with a Turkish book fair and support from Turkish Airlines and GoTürkiye. Sankofa Square lists a free, family-friendly gathering with Turkish coffee and baklava, traditional crafts and art, and music and cultural performances that bring stories to life. Host kutuphane.ca (Anatolia Fest Vol. 3) invites everyone to traditional music, dance, cuisine and arts from Türkiye in the heart of the city. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: 'Haziran’daki Sidhu–Bolat keşif görüşmeleri 7 Temmuz lansmanına uzandı; Anand Ottawa’da Fidan ile enerji ve savunmayı görüştü.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 8 Haziran 2026’da Uluslararası Ticaret Bakanı Maninder Sidhu ve Türkiye Ticaret Bakanı, kapsamlı bir STA’ya yönelik keşif görüşmelerini başlatan ve Hava Ulaşım Anlaşması’nın yakın zamandaki genişlemesini memnuniyetle karşılayan Ekonomik Ortaklık Ortak Bakanlar Bildirisini yayımladı; bakanlar genişlemenin bağlantıyı güçlendirdiğini ve yolcular, işletmeler ve ihracatçılar için yeni fırsatlar açtığını belirtti. 26 Haziran’da Ottawa’da Dışişleri Bakanı Anita Anand, Türkiye Dışişleri Bakanı Hakan Fidan ile enerji, savunma, havacılık ve madencilikte ekonomik iş birliğini görüştü; Anand ayrıca Enerji ve Doğal Kaynaklar Bakanı Tim Hodgson’ın, enerji güvenliği iş birliğini derinleştirmeye ilişkin mektubunu Türkiye Enerji Bakanı Alparslan Bayraktar’a iletti. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi; önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. Başbakanlığın 7 Temmuz özetinde 2025’te ikili ticaretin 4,3 milyar dolar olduğu aktarıldı ve liderlerin savunma, kritik mineraller, enerji ve havacılık dahil ileri teknolojilerde ortaklığı derinleştirmek istediği kaydedildi. GAC ilişkiler sayfasına göre 2024’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı — Kanada ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar — ve 2024’te Türkiye’ye başlıca ihracat mercimek ve nohut (393 milyon dolar), demir-çelik hurdası (167 milyon) ve soya fasulyesi (113 milyon) oldu. Kanada, çoğunluğu Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary ve Edmonton’da yaşayan 65.000’den fazla kişilik Türk diasporasını karşılıyor. Aynı sayfa, Kanada ve Türkiye silahlı kuvvetlerinin Kosova Gücü (KFOR) ve Irak’taki NATO Misyonu gibi NATO harekâtlarında iş birliği yaptığını belirtiyor. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-military',
      title: 'Express Entry 2026: nitelikli askeri adaylar',
      desc: '10 yıllık hizmeti olan FSMA’ların NOC 40042, 42102 veya 43204’te en az 3 yıllık CAF teklifi gerekir.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları, Göçmenlik Bakanı Lena Metlege Diab’ın 18 Şubat 2026’da Kanada Silahlı Kuvvetleri tarafından askeri hekim, hemşire ve pilot gibi kilit roller için işe alınan yüksek nitelikli yabancı askeri adaylar için duyurduğu 2026 kategorisi olan nitelikli askeri adayları kapsıyor. IRCC’nin 2026 kategori bazlı seçim istişareleri, kategoriyi yetenek çekme ve elde tutma başlığı altında Kanada Silahlı Kuvvetleri’nden iş teklifi olan nitelikli askeri adaylar olarak listeliyor. Diab’ın konuşma notlarında CAF iş teklifi olan uygun adayların — hekim, hemşire ve pilotlar dahil — kalıcı oturuma davet edilebileceği, aynı güvenlik ve tüm askeri şartlara tabi olacakları ve kategorinin silahlı kuvvetleri güçlendirme, egemenliği savunma ve Kanadalıları güvende tutma taahhüdünü ile Savunma Sanayii Stratejisi’ni egemenlik ve güvenlik için kritik işçiler ekleyerek desteklediği belirtildi. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride Yabancı Nitelikli Askeri Aday (FSMA) olmalısınız: tanınmış bir yabancı orduda görev yapan, kesintisiz en az on yıl hizmeti olan ve Kanada Silahlı Kuvvetleri subayları (NOC 40042, TEER 0), uzman üyeler (42102, TEER 2) veya harekât üyeleri (43204, TEER 3) meslekleriyle uyumlu deneyim ve eğitime sahip uygun bir yabancı uyruklu. Kanada Kuvvetleri İşe Alım Grubu’ndan bu mesleklerden birinde Kanada’da en az üç yıl sürecek kesintisiz tam zamanlı iş için düzenlenmiş istihdam teklifiniz ve en az iki yıllık yükseköğretim belgeniz (Kanada dışında tamamlandıysa eğitim belgesi değerlendirmesi) olmalıdır. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Türk kültürü, sanat ve lezzet bu Pazar 12.00–20.00; kitap fuarı, baklava ve canlı müzik.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. 2016 ve 2017 festivallerinin ardından anatoliafest.ca uzun zamandır beklenen 3. edisyonu Toronto’nun Türk mirası — kültür, sanat ve lezzet — kutlaması olarak anlatıyor; Türk kitap fuarı ile Turkish Airlines ve GoTürkiye desteği yer alıyor. Sankofa Square ücretsiz, aile dostu buluşmayı Türk kahvesi ve baklava, geleneksel el sanatları ve sanat ile hikâyeleri hayata geçiren müzik ve kültürel gösterilerle listeliyor. Ev sahibi kutuphane.ca (Anatolia Fest Vol. 3) herkesi kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanata davet ediyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
