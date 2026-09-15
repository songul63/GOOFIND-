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
        desc: 'June Sidhu–Bolat and Anand–Fidan meetings led to the July 7 launch; 2024 Canadian exports were $1.3 billion.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement recalled that on June 8, 2026 Trade Ministers Sidhu and Bolat issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions and welcoming the recent expansion of the Air Transport Agreement, and said closer economic cooperation will support growth, job creation, competitiveness and supply chains. The Prime Minister’s July 7 readout said the leaders expressed interest in deepening partnerships in defence, critical minerals, energy, and advanced technologies, including aerospace. On June 26 in Ottawa, Foreign Minister Anita Anand and Türkiye’s Foreign Minister Hakan Fidan explored increased economic engagement in energy, defence, aerospace and mining. In the coming months, technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. GAC’s relations page reports that in 2024 two-way merchandise trade was over CA$4.3 billion — Canadian exports $1.3 billion and imports from Türkiye $3.1 billion — and Canada’s top exports to Türkiye were lentils and chickpeas ($393 million), iron and steel waste and scrap ($167 million), and soybeans ($113 million). Canada welcomes a Turkish diaspora of over 65,000, concentrated in Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary and Edmonton. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-senior-managers',
        title: 'Express Entry 2026: senior managers with Canadian experience',
        desc: 'Executives in NOC 00012–00015 need 12 months in Canada in one eligible occupation.',
        content:
          'IRCC’s current Express Entry category-based rounds include senior managers with Canadian work experience, a 2026 category announced on February 18, 2026 by Immigration Minister Lena Metlege Diab alongside researchers with Canadian work experience. Diab’s speaking notes said the new categories recognize that in certain occupations, many years of experience are required to make meaningful contributions. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list — in Canada. This experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 senior-manager list is senior managers in financial, communications and other business services (NOC 00012, TEER 0); health, education, social and community services and membership organizations (00013, TEER 0); trade, broadcasting and other services (00014, TEER 0); and construction, transportation, production and utilities (00015, TEER 0). Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: '3rd edition this Sunday, 12 p.m.–8 p.m.; Turkish coffee, baklava, music and crafts.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. After the 2016 and 2017 festivals, anatoliafest.ca frames the long-awaited 3rd edition as a reunion and a bridge reconnecting the community with traditions from Türkiye. Sankofa Square’s calendar lists Turkish coffee and baklava, traditional crafts and art, and music and cultural performances that bring stories to life. Host kutuphane.ca (Anatolia Fest Vol. 3) invites everyone to traditional music, dance, cuisine and arts from Türkiye in the heart of the city. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: 'Haziran Sidhu–Bolat ve Anand–Fidan görüşmeleri 7 Temmuz’daki başlangıca yol açtı; 2024 Kanada ihracatı 1,3 milyar dolar.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada, 8 Haziran 2026’da Ticaret Bakanları Sidhu ve Bolat’ın keşif görüşmelerini başlatan ve Hava Taşımacılığı Anlaşması’nın yakın zamandaki genişlemesini karşılayan Ekonomik Ortaklık Ortak Bakanlar Bildirisini yayımladığı anımsatıldı; daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi. Başbakanın 7 Temmuz özetinde liderlerin savunma, kritik mineraller, enerji ve havacılık dahil ileri teknolojilerde ortaklığı derinleştirmek istediği kaydedildi. 26 Haziran’da Ottawa’da Dışişleri Bakanı Anita Anand ile Türkiye Dışişleri Bakanı Hakan Fidan enerji, savunma, havacılık ve madencilikte ekonomik iş birliğini ele aldı. Önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfasına göre 2024’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı — Kanada ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar — ve Türkiye’ye başlıca ihracat mercimek ve nohut (393 milyon dolar), demir-çelik hurdası (167 milyon) ve soya fasulyesi (113 milyon) oldu. Kanada, çoğunluğu Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary ve Edmonton’da yaşayan 65.000’den fazla kişilik Türk diasporasını karşılıyor. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-senior-managers',
      title: 'Express Entry 2026: Kanada deneyimli üst düzey yöneticiler',
      desc: 'NOC 00012–00015 yöneticileri için Kanada’da tek meslekte 12 ay deneyim gerekir.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları, Göçmenlik Bakanı Lena Metlege Diab’ın 18 Şubat 2026’da Kanada iş deneyimli araştırmacılarla birlikte duyurduğu 2026 kategorisi olan Kanada iş deneyimli üst düzey yöneticileri kapsıyor. Diab’ın konuşma notlarında yeni kategorilerin, bazı mesleklerde anlamlı katkı için çok yıllık deneyim gerektiğini kabul ettiği belirtildi. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 üst düzey yönetici listesinde finans, iletişim ve diğer iş hizmetlerinde üst düzey yöneticiler (NOC 00012, TEER 0); sağlık, eğitim, sosyal ve toplum hizmetleri ile üyelik kuruluşlarında üst düzey yöneticiler (00013, TEER 0); ticaret, yayıncılık ve diğer hizmetlerde üst düzey yöneticiler (00014, TEER 0); inşaat, ulaşım, üretim ve kamu hizmetlerinde üst düzey yöneticiler (00015, TEER 0) yer alıyor. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: '3. edisyon bu Pazar 12.00–20.00; Türk kahvesi, baklava, müzik ve el sanatları.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. 2016 ve 2017 festivallerinin ardından anatoliafest.ca uzun zamandır beklenen 3. edisyonu bir yeniden birleşme ve toplumun Türkiye’den gelen geleneklerle köprü kurması olarak anlatıyor. Sankofa Square takvimi Türk kahvesi ve baklava, geleneksel el sanatları ve sanat ile hikâyeleri hayata geçiren müzik ve kültürel gösterileri listeliyor. Ev sahibi kutuphane.ca (Anatolia Fest Vol. 3) herkesi kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanata davet ediyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
