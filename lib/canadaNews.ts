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
        title: 'Canada–Türkiye FTA consultations closed',
        desc: 'Re-checked 22:00 UTC: consultation page still Closed (July 31–Sept 14); FTA info page still in negotiations.',
        content:
          'Global Affairs Canada’s consultation page still lists Current status: Closed for “Consulting Canadians on a potential free trade agreement with Türkiye.” The page says this consultation ran from July 31, 2026, to September 14, 2026, and that a report summarizing the feedback received from this consultation will be published. As of 22:00 UTC on 17 September 2026 that what-we-heard report has not yet been published. The consultation page’s dcterms.modified stamp is still 16 September 2026 and its footer dateModified remains 31 July 2026. The Canada–Türkiye FTA information page, date-modified 17 September 2026, still lists the agreement’s current status as In negotiations, and still uses past tense: “The Government of Canada conducted public consultations from July 31, 2026, to September 14, 2026.” On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement notes that in early June 2026 Trade Ministers Bolat and Sidhu issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions, and that closer economic cooperation will support growth, job creation, competitiveness and supply chains. In the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. GAC’s relations page records that in 2024 two-way merchandise trade was over $4.3 billion — Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion. Canada’s top 2024 imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in mining, fell from $1 billion in 2022 to $420 million in 2023. On December 31, 2024, there were 4,650 Turkish citizens holding valid study permits in Canada, a return to 2022 levels and a 23% decrease from 2023. A GAC country news release says Canada hosted the second Joint Economic and Trade Committee (JETCO) meeting in Ottawa on January 20, 2026, after the inaugural Istanbul meeting in 2019; the two countries discussed priority sectors including infrastructure, the green economy, energy and mining, aerospace and defence, and renewable energy technologies, and committed to continue exploring ways to improve air transportation links. Questions can still be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-senior-managers',
        title: 'Express Entry #444: senior managers with Canadian work',
        desc: 'Official Sep 16, 2026 round: 250 invitations, CRS 389; NOC 00012–00015 (TEER 0).',
        content:
          'IRCC’s official Express Entry rounds table and rounds JSON now list round #444 on September 16, 2026, as a category-based invitation for Senior managers with Canadian Work Experience, 2026-Version 1. The published results are 250 invitations issued, with a Comprehensive Ranking System (CRS) score of 389 for the lowest-ranked candidate invited. The ministerial instructions time the round at 12:44:28 UTC on September 16, 2026, and name the Federal Skilled Worker Program, the Canadian Experience Class and the Federal Skilled Trades Program. On February 18, 2026, Immigration Minister Lena Metlege Diab announced this as one of the new 2026 Express Entry categories for senior managers with Canadian work experience. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in Canada — the experience does not need to be continuous — in a single occupation listed as Senior managers - financial, communications and other business services (NOC 00012, TEER 0), Senior managers - health, education, social and community services and membership organizations (00013, TEER 0), Senior managers - trade, broadcasting and other services (00014, TEER 0), or Senior managers - construction, transportation, production and utilities (00015, TEER 0). If invited, you must submit your application within 60 days. Full details appear in each round’s instructions; IRCC publishes rounds after they run. As of 22:00 UTC on 17 September 2026 the official rounds JSON on canada.ca still publishes #444 as the latest round — the JSON file’s Last-Modified header remains 16 September 2026 at 13:53:31 GMT, and no newer round has been published. Also official on the same JSON: #443 on September 15 (Canadian Experience Class, 2,000 invitations, CRS 519), #442 on September 14 (Provincial Nominee Program, 576 invitations, CRS 734), #441 on September 4 (Healthcare and Social Services Occupations, 3,500 invitations, CRS 475), and #440 on September 3 (Physicians with Canadian Work Experience, 229 invitations, CRS 198).',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Free Turkish Culture, Art & Taste Festival this Sunday, 12 p.m.–8 p.m., with a book fair.',
        content:
          'Anatolia Fest: Turkish Culture, Art & Taste Festival returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. Re-checked at 22:00 UTC on 17 September 2026, Sankofa Square still lists the free, family-friendly festival with Turkish cuisine, traditional arts, live music and cultural performances, hands-on activities, and a Turkish book fair, sponsored by Turkish Airlines and GoTürkiye. After festivals in 2016 and 2017, anatoliafest.ca frames the long-awaited 3rd edition as a reunion — Turkish coffee and baklava, music, crafts and regional art. Host kutuphane.ca (Anatolia Fest Vol. 3) invites everyone to traditional music, dance, cuisine and arts from Türkiye in the heart of the city. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
        category: 'Community',
        color: 'bg-primary',
        link: 'https://www.anatoliafest.ca/',
      },
    ];
  }

  return [
    {
      id: 'fallback-trade',
      title: 'Kanada–Türkiye STA istişareleri kapandı',
      desc: '22.00 UTC yeniden kontrol: istişare sayfası hâlâ Closed (31 Temmuz–14 Eylül); STA bilgi sayfası hâlâ müzakerede.',
      content:
        'Küresel İşler Kanada’nın istişare sayfası, “Türkiye ile olası bir serbest ticaret anlaşması hakkında Kanadalılara danışma” için hâlâ Current status: Closed listeliyor. Sayfa, bu istişarenin 31 Temmuz 2026–14 Eylül 2026 tarihleri arasında yapıldığını ve alınan geri bildirimi özetleyen bir raporun yayımlanacağını belirtiyor. 17 Eylül 2026 22.00 UTC itibarıyla bu özet rapor henüz yayımlanmamış. İstişare sayfasının dcterms.modified damgası hâlâ 16 Eylül 2026 ve altbilgi dateModified alanı 31 Temmuz 2026 olarak kalıyor. Kanada–Türkiye STA bilgi sayfası, 17 Eylül 2026 tarihli date-modified damgasıyla anlaşmanın güncel durumunu hâlâ In negotiations / müzakerede olarak listeliyor ve geçmiş zaman kullanıyor: “The Government of Canada conducted public consultations from July 31, 2026, to September 14, 2026.” 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada, 2026’nın erken haziranında Ticaret Bakanları Bolat ve Sidhu’nun Ekonomik Ortaklık Ortak Bakanlar Açıklaması ile keşif görüşmelerini başlattığı; daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi. Önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. GAC ilişkiler sayfasına göre 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı — Kanada mal ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar. Kanada’nın 2024’te Türkiye’den başlıca ithalatı yassı haddelenmiş demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve ilaç ürünleri (107 milyon) oldu. Kanada’nın Türkiye’deki doğrudan yatırımları, ağırlıklı olarak madencilikte, 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. 31 Aralık 2024’te Kanada’da geçerli öğrenim izni bulunan 4.650 Türk vatandaşı vardı; bu, 2022 düzeyine dönüş ve 2023’e göre %23 azalmadır. GAC ülke haber bültenine göre Kanada, 2019’daki İstanbul’daki ilk toplantının ardından 20 Ocak 2026’da Ottawa’da ikinci Ortak Ekonomi ve Ticaret Komitesi (JETCO) toplantısına ev sahipliği yaptı; ülkeler altyapı, yeşil ekonomi, enerji ve madencilik, havacılık ve savunma ile yenilenebilir enerji teknolojileri gibi öncelikli sektörleri görüştü ve hava ulaşım bağlantılarını iyileştirme yollarını keşfetmeye devam etme taahhüdünde bulundu. Sorular hâlâ Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-senior-managers',
      title: 'Express Entry #444: Kanada deneyimli üst düzey yöneticiler',
      desc: '16 Eylül 2026 resmi tur: 250 davet, CRS 389; NOC 00012–00015 (TEER 0).',
      content:
        'IRCC’nin resmi Express Entry tur tablosu ve resmi tur JSON’u artık 16 Eylül 2026 tarihli #444 turunu Senior managers with Canadian Work Experience, 2026-Version 1 kategori bazlı daveti olarak listeliyor. Yayımlanan sonuçlar 250 davet ve en düşük davet alan aday için 389 CRS puanıdır. Bakanlık talimatları turu 16 Eylül 2026 12.44.28 UTC olarak zamanlıyor ve Federal Nitelikli İşçi Programı, Kanada Deneyim Sınıfı ile Federal Nitelikli Meslek Programı’nı adlandırıyor. 18 Şubat 2026’da Göçmenlik Bakanı Lena Metlege Diab bunu, Kanada’da çalışma deneyimi olan üst düzey yöneticiler için 2026’nın yeni Express Entry kategorilerinden biri olarak duyurdu. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde Kanada’da en az 12 ay tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız — deneyimin kesintisiz olması gerekmez — ve bu deneyim tek bir meslekte olmalıdır: finans, iletişim ve diğer iş hizmetlerinde üst düzey yöneticiler (NOC 00012, TEER 0), sağlık, eğitim, sosyal ve toplum hizmetleri ile üyelik kuruluşlarında üst düzey yöneticiler (00013, TEER 0), ticaret, yayıncılık ve diğer hizmetlerde üst düzey yöneticiler (00014, TEER 0) veya inşaat, ulaşım, üretim ve kamu hizmetlerinde üst düzey yöneticiler (00015, TEER 0). Davet edilirseniz başvurunuzu 60 gün içinde sunmalısınız. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır. 17 Eylül 2026 22.00 UTC itibarıyla resmi tur JSON’u canada.ca üzerinde hâlâ #444’ü en son tur olarak yayımlıyor; JSON dosyasının Last-Modified başlığı 16 Eylül 2026 13.53.31 GMT olarak kalıyor ve daha yeni bir tur yayımlanmamıştır. Aynı JSON’da resmi olarak #443 (15 Eylül, Kanada Deneyim Sınıfı, 2.000 davet, CRS 519), #442 (14 Eylül, Eyalet Aday Programı, 576 davet, CRS 734), #441 (4 Eylül, sağlık ve sosyal hizmet meslekleri, 3.500 davet, CRS 475) ve #440 (3 Eylül, Kanada deneyimli hekimler, 229 davet, CRS 198) de yer alıyor.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Ücretsiz Türk Kültürü, Sanat ve Tat Festivali bu Pazar 12.00–20.00; kitap fuarı da var.',
      content:
        'Anatolia Fest: Türk Kültürü, Sanat ve Tat Festivali bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. 17 Eylül 2026 22.00 UTC’te yeniden kontrol edildiğinde Sankofa Square hâlâ ücretsiz, aile dostu festivali Türk mutfağı, geleneksel sanatlar, canlı müzik ve kültürel gösteriler, uygulamalı etkinlikler ve Türk kitap fuarı olarak listeliyor; etkinliğin sponsorları Turkish Airlines ve GoTürkiye. 2016 ve 2017 festivallerinin ardından anatoliafest.ca uzun zamandır beklenen 3. edisyonu bir yeniden birleşme olarak anlatıyor — Türk kahvesi ve baklava, müzik, el sanatları ve yöresel sanat. Ev sahibi kutuphane.ca (Anatolia Fest Vol. 3) herkesi kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanata davet ediyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
