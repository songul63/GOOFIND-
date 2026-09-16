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
        desc: 'July 7 NATO Summit launch; early June exploratory talks; 2024 top exports lentils, steel scrap and soybeans.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement recalled that in early June 2026 Trade Ministers Bolat and Sidhu issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions, and said closer economic cooperation will support growth, job creation, competitiveness and supply chains. In the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. GAC’s relations page records diplomatic ties from Türkiye’s 1944 Ottawa embassy and Canada’s 1947 first ambassador, and a Turkish diaspora of over 65,000 concentrated in Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary and Edmonton. In 2024 two-way merchandise trade was over $4.3 billion — Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion. Canada’s top 2024 exports to Türkiye were lentils and chickpeas ($393 million), iron and steel waste and scrap ($167 million), and soybeans ($113 million). Türkiye and Canada’s Armed Forces have a longstanding NATO cooperation, including the Kosovo Force (KFOR) and the NATO Mission in Iraq. Opportunities exist particularly in agriculture, energy, information and communication technologies, life sciences, transportation, cleantech, mining, education and infrastructure. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-stem',
        title: 'Express Entry 2026: STEM occupations',
        desc: 'Cybersecurity and engineers need 12 months in one eligible NOC; 5,942 STEM ITAs in 2025, 5.8% of invitations.',
        content:
          'IRCC’s current Express Entry category-based rounds include Science, Technology, Engineering and Math (STEM) occupations, listed among the 2026 categories that help address long-term labour shortages. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list — in Canada or abroad. This experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 STEM list includes architecture and science managers (NOC 20011, TEER 0), cybersecurity specialists (21220, TEER 1), civil engineers (21300, TEER 1), mechanical engineers (21301, TEER 1), electrical and electronics engineers (21310, TEER 1), industrial and manufacturing engineers (21321, TEER 1), geological engineers (21331, TEER 1), civil engineering technologists and technicians (22300, TEER 2), mechanical engineering technologists and technicians (22301, TEER 2), electrical and electronics engineering technologists and technicians (22310, TEER 2), and insurance agents and brokers (63100, TEER 3). IRCC’s 2026 consultations page reports that in 2025, 5,942 STEM category-eligible candidates received an invitation to apply (50% already in Canada; average CRS 479, range 379–698), accounting for 5.8% of Express Entry invitations excluding Provincial Nominee Program rounds — down from 24,084 invitations (28.7%) in 2023 and 13,749 (18.4%) in 2024. Public consultations on economic priorities and categories for 2027 ran from August 4 to September 1, 2026; the department is considering a continued focus on addressing long-term labour shortages, including in STEM. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
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
      desc: '7 Temmuz NATO Zirvesi lansmanı; Haziran başı keşif görüşmeleri; 2024’te başlıca ihracat mercimek, hurda çelik ve soya.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada, 2026’nın başında Haziran’da Ticaret Bakanları Bolat ve Sidhu’nun Ekonomik Ortaklık Ortak Bakanlar Bildirisi’yle keşif görüşmelerini başlattığı hatırlatıldı; daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi. Önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfası diplomatik bağları Türkiye’nin 1944 Ottawa büyükelçiliği ve Kanada’nın 1947’deki ilk büyükelçisinden başlatır; 65.000’den fazla kişilik Türk diasporası Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary ve Edmonton’da yoğunlaşır. 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı — Kanada mal ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar. Kanada’nın 2024’te Türkiye’ye başlıca ihracatı mercimek ve nohut (393 milyon dolar), demir ve çelik atık ve hurdası (167 milyon) ve soya fasulyesi (113 milyon) oldu. Türkiye ve Kanada silahlı kuvvetlerinin NATO ittifakı çerçevesinde uzun süredir iş birliği vardır; Kosova Gücü (KFOR) ve Irak’taki NATO Misyonu buna örnektir. Fırsatlar özellikle tarım, enerji, BİT, yaşam bilimleri, ulaşım, temiz teknoloji, madencilik, eğitim ve altyapı sektörlerinde. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-stem',
      title: 'Express Entry 2026: STEM meslekleri',
      desc: 'Siber güvenlik ve mühendisler için tek NOC’ta 12 ay; 2025’te 5.942 STEM daveti, davetlerin %5,8’i.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları Bilim, Teknoloji, Mühendislik ve Matematik (STEM) mesleklerini kapsıyor; 2026’da uzun vadeli işgücü açıklarını gidermeye yardımcı kategoriler arasında listelendi. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da veya yurt dışında, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 STEM listesinde mimarlık ve bilim yöneticileri (NOC 20011, TEER 0), siber güvenlik uzmanları (21220, TEER 1), inşaat mühendisleri (21300, TEER 1), makine mühendisleri (21301, TEER 1), elektrik ve elektronik mühendisleri (21310, TEER 1), endüstri ve imalat mühendisleri (21321, TEER 1), jeoloji mühendisleri (21331, TEER 1), inşaat mühendisliği teknolog ve teknisyenleri (22300, TEER 2), makine mühendisliği teknolog ve teknisyenleri (22301, TEER 2), elektrik ve elektronik mühendisliği teknolog ve teknisyenleri (22310, TEER 2) ile sigorta acenteleri ve brokerleri (63100, TEER 3) yer alıyor. IRCC’nin 2026 istişare sayfasına göre 2025’te STEM kategorisine uygun 5.942 aday davet aldı (yüzde 50’si zaten Kanada’daydı; ortalama CRS 479, aralık 379–698); bu, Eyalet Aday Programı turları hariç Express Entry davetlerinin %5,8’ini oluşturdu — 2023’teki 24.084 davetten (%28,7) ve 2024’teki 13.749 davetten (%18,4) düşüş. 2027 ekonomik öncelikleri ve kategorilerine ilişkin kamu istişareleri 4 Ağustos–1 Eylül 2026 tarihleri arasında yapıldı; bakanlık STEM dahil uzun vadeli işgücü açıklarına odaklanmayı sürdürmeyi değerlendiriyor. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
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
