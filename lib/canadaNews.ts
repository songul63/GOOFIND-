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
        desc: 'JETCO met in Ottawa in January; 2024 top imports were iron sheet, tugboats and pharmaceuticals.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement said closer economic cooperation will support growth, job creation, competitiveness and supply chains, and that in the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. Diplomatic relations date to 1944, when Türkiye opened an embassy in Ottawa, and 1947, when Canada appointed its first ambassador to Türkiye. GAC’s relations page reports that in 2024 two-way merchandise trade was over CA$4.3 billion — Canadian exports $1.3 billion and imports from Türkiye $3.1 billion — and Canada’s top 2024 imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in mining, fell from $1 billion in 2022 to $420 million in 2023. On December 31, 2024 there were 4,650 Turkish citizens holding valid study permits in Canada, a return to 2022 levels and a 23% decrease from 2023. GAC says opportunities exist in agriculture, energy, ICT, life sciences, transportation, cleantech, mining, education and infrastructure. Canada hosted the second Canada–Türkiye Joint Economic and Trade Committee (JETCO) meeting in Ottawa on January 20, 2026, after the inaugural meeting in Istanbul in 2019; the two countries discussed priority sectors including infrastructure, the green economy, energy and mining, aerospace and defence, and renewable energy, and committed to keep exploring air transportation links. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-researchers',
        title: 'Express Entry 2026: researchers with Canadian experience',
        desc: 'Professors and research assistants (NOC 41200 and 41201) need 12 months in Canada in one eligible occupation.',
        content:
          'IRCC’s current Express Entry category-based rounds include researchers with Canadian work experience, a 2026 category announced on February 18, 2026 by Immigration Minister Lena Metlege Diab alongside senior managers with Canadian work experience. Diab’s speaking notes said the new categories recognize that in certain occupations, many years of experience are required to make meaningful contributions, and that a clear path to permanent residence supports broader federal efforts to drive innovation and growth — including a $1.7 billion Innovation, Science and Economic Development Canada initiative announced in December to attract world-leading researchers. IRCC’s March 23, 2026 CIMM briefing on talent attraction names that program the Canada Global Impact+ Research Talent Initiative, an investment of up to $1.7 billion over 12 years to attract and support more than 1,000 leading international and expatriate researchers. Diab’s CIMM opening statement said prioritizing researchers supports Canada’s national strategy for world-leading research and innovation. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list — in Canada. This experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 researchers list is university professors and lecturers (NOC 41200, TEER 1) and post-secondary teaching and research assistants (NOC 41201, TEER 1). Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Culture, art and taste this Sunday, 12 p.m.–8 p.m.; music, dance, cuisine and arts.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. After the 2016 and 2017 festivals, anatoliafest.ca frames the long-awaited 3rd edition as a reunion and Toronto’s celebration of Turkish heritage — culture, art and taste. Sankofa Square’s calendar lists Turkish coffee and baklava, traditional crafts and art, and music and cultural performances that bring stories to life. Host kutuphane.ca (Anatolia Fest Vol. 3) invites everyone to traditional music, dance, cuisine and arts from Türkiye in the heart of the city. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: 'JETCO Ocak’ta Ottawa’da toplandı; 2024’ün başlıca ithalatı sac demir, römorkör ve ilaç.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada, daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi; önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. Diplomatik ilişkiler 1944’te Türkiye’nin Ottawa’da büyükelçilik açması ve 1947’de Kanada’nın Türkiye’ye ilk büyükelçisini atamasıyla başladı. GAC ilişkiler sayfasına göre 2024’te iki yönlü mal ticareti 4,3 milyar CA$’ı aştı — Kanada ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar — ve 2024’te Türkiye’den başlıca ithalat yassı haddelenmiş demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve eczacılık ürünleri (107 milyon) oldu. Çoğunluğu madencilikte olan Kanada’nın Türkiye’deki doğrudan yatırımı 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. 31 Aralık 2024’te Kanada’da geçerli öğrenim izni bulunan 4.650 Türk vatandaşı vardı; bu 2022 düzeyine dönüş ve 2023’e göre %23 azalma anlamına geliyor. GAC tarım, enerji, BİT, yaşam bilimleri, ulaşım, temiz teknoloji, madencilik, eğitim ve altyapıda fırsatlar olduğunu belirtiyor. Kanada, 2019 İstanbul’daki ilk toplantının ardından 20 Ocak 2026’da Ottawa’da ikinci Kanada–Türkiye Ortak Ekonomi ve Ticaret Komitesi (JETCO) toplantısına ev sahipliği yaptı; altyapı, yeşil ekonomi, enerji ve madencilik, havacılık ve savunma ile yenilenebilir enerji öncelikli sektörler arasında yer aldı ve hava ulaşım bağlantılarının araştırılmasına devam edileceği teyit edildi. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-researchers',
      title: 'Express Entry 2026: Kanada deneyimli araştırmacılar',
      desc: 'Profesör ve araştırma asistanları (NOC 41200 ve 41201) için Kanada’da tek meslekte 12 ay deneyim gerekir.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları, Göçmenlik Bakanı Lena Metlege Diab’ın 18 Şubat 2026’da Kanada iş deneyimli üst düzey yöneticilerle birlikte duyurduğu 2026 kategorisi olan Kanada iş deneyimli araştırmacıları kapsıyor. Diab’ın konuşma notlarında yeni kategorilerin, bazı mesleklerde anlamlı katkı için çok yıllık deneyim gerektiğini kabul ettiği ve kalıcı oturuma açık bir yolun inovasyon ve büyümeyi destekleyen federal çabaları — Aralık’ta dünya çapında önde gelen araştırmacıları Kanada’ya çekmek için duyurulan 1,7 milyar dolarlık ISED girişimini de — desteklediği belirtildi. IRCC’nin 23 Mart 2026 CIMM yetenek çekme brifingi programı Canada Global Impact+ Research Talent Initiative olarak adlandırıyor: 12 yılda 1,7 milyar dolara kadar yatırımla 1.000’den fazla önde gelen uluslararası ve gurbetçi araştırmacıyı çekmeyi ve desteklemeyi hedefliyor. Diab’ın CIMM açılış konuşmasında araştırmacılara öncelik vermenin Kanada’nın dünya çapında önde gelen araştırma ve inovasyon ulusal stratejisini desteklediği kaydedildi. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 araştırmacı listesinde üniversite profesörleri ve öğretim görevlileri (NOC 41200, TEER 1) ile yükseköğretim öğretim ve araştırma asistanları (NOC 41201, TEER 1) yer alıyor. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Kültür, sanat ve lezzet bu Pazar 12.00–20.00; müzik, dans, mutfak ve sanat.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. 2016 ve 2017 festivallerinin ardından anatoliafest.ca uzun zamandır beklenen 3. edisyonu bir yeniden birleşme ve Toronto’nun Türk mirası — kültür, sanat ve lezzet — kutlaması olarak anlatıyor. Sankofa Square takvimi Türk kahvesi ve baklava, geleneksel el sanatları ve sanat ile hikâyeleri hayata geçiren müzik ve kültürel gösterileri listeliyor. Ev sahibi kutuphane.ca (Anatolia Fest Vol. 3) herkesi kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanata davet ediyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
