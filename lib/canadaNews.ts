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
        desc: 'Re-checked 09:00 UTC: FTA info page still date-modified 17 Sep and uses past tense; consultation page still Closed.',
        content:
          'Global Affairs Canada’s Canada–Türkiye FTA information page is still date-modified 17 September 2026 and still lists Current status: In negotiations. The consultations section now uses past tense: “The Government of Canada conducted public consultations from July 31, 2026, to September 14, 2026,” and says a report summarizing the feedback received from this consultation will be published. The consultation page still lists Current status: Closed for “Consulting Canadians on a potential free trade agreement with Türkiye.” That page says this consultation ran from July 31, 2026, to September 14, 2026; its dcterms.modified stamp is still 16 September 2026, and the footer dateModified remains 31 July 2026. As of 09:00 UTC on 21 September 2026 that what-we-heard report has not yet been published (consultation /report 404; /what-we-heard 404 both tries). On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement notes that in early June 2026 Trade Ministers Bolat and Sidhu issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions, and that closer economic cooperation will support growth, job creation, competitiveness and supply chains. In the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Prefer GAC’s relations-page 2024 figures over the consultation page’s 2025 merchandise and FDI lines: in 2024 two-way merchandise trade was over $4.3 billion — Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion. Canada’s top 2024 imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in mining, fell from $1 billion in 2022 to $420 million in 2023. On December 31, 2024, there were 4,650 Turkish citizens holding valid study permits in Canada, a return to 2022 levels and a 23% decrease from 2023. A GAC country news release says Canada hosted the second Joint Economic and Trade Committee (JETCO) meeting in Ottawa on January 20, 2026, after the inaugural Istanbul meeting in 2019; the two countries discussed priority sectors including infrastructure, the green economy, energy and mining, aerospace and defence, and renewable energy technologies, and committed to continue exploring ways to improve air transportation links. Questions can still be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-senior-managers',
        title: 'Express Entry #444: senior managers with Canadian work',
        desc: 'Official Sep 16, 2026 round still latest: 250 invitations, CRS 389; NOC 00012–00015 (TEER 0).',
        content:
          'IRCC’s official Express Entry rounds table and official rounds JSON still list round #444 on September 16, 2026, as a category-based invitation for Senior managers with Canadian Work Experience, 2026-Version 1. The published results are 250 invitations issued, with a Comprehensive Ranking System (CRS) score of 389 for the lowest-ranked candidate invited. The ministerial instructions time the round at 12:44:28 UTC on September 16, 2026, and name the Federal Skilled Worker Program, the Canadian Experience Class and the Federal Skilled Trades Program. On February 18, 2026, Immigration Minister Lena Metlege Diab announced this as one of the new 2026 Express Entry categories for senior managers with Canadian work experience. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in Canada — the experience does not need to be continuous — in a single occupation listed as Senior managers - financial, communications and other business services (NOC 00012, TEER 0), Senior managers - health, education, social and community services and membership organizations (00013, TEER 0), Senior managers - trade, broadcasting and other services (00014, TEER 0), or Senior managers - construction, transportation, production and utilities (00015, TEER 0). If invited, you must submit your application within 60 days. Full details appear in each round’s instructions; IRCC publishes rounds after they run. This hour official ee_rounds_123_en.json and the official Express Entry rounds HTML page succeeded over Python urllib on first try (HTTP 200). urllib retries this hour timed out after 25 seconds. curl HTTP/2 failed (HTTP/2 stream INTERNAL_ERROR, 0 bytes) and curl HTTP/1.1 timed out after 25 seconds (0 bytes). Last hour those official files succeeded over Python urllib on first try (HTTP 200); last hour urllib retries timed out after 25 seconds; last hour curl HTTP/2 failed (HTTP/2 stream INTERNAL_ERROR, 0 bytes) and curl HTTP/1.1 timed out after 25 seconds (0 bytes). The last confirmed successful official fetch is now 09:00 UTC on 21 September 2026 (previous successful official fetch was 08:00 UTC). The official JSON Last-Modified stamp remains Wednesday, 16 September 2026 at 13:53:31 GMT, and the latest listed round is still #444. The official Express Entry rounds HTML Last-Modified stamp this hour remains Monday, 21 September 2026 at 02:43:32 GMT (same as last hour), with no September 17, 18, 19, 20 or 21 draw added. CIC News homepage Last-Modified this hour remains Monday, 21 September 2026 at 03:50:09 GMT after three consistent fetches (same as last hour) and still lists “Canada invites 250 senior managers to apply for permanent residence” as the latest Express Entry story, with no round after #444. CIC homepage “445” hits this hour are the 0980445 Bill C-3 article id and SVG path numbers — not an Express Entry #445. The CIC homepage lead this hour is a citizenship-by-descent story — not Express Entry and not used as a banner item. CIC also lists a Newfoundland and Labrador PNP story (62 workers), a Prince Edward Island PNP 195-candidate story and a British Columbia PNP story (33 workers); do not use as banner items. The CIC senior-managers article HTTP Last-Modified this hour remains Monday, 21 September 2026 at 02:54:45 GMT on the canonical 0980361 URL after three consistent fetches (same as last hour); article:published_time and article:modified_time remain 2026-09-16T14:43:48+00:00, and its table still starts at September 16 senior managers 389/250 with no September 17, 18, 19, 20 or 21 draw. As of 09:00 UTC on 21 September 2026 no #445 has been published. Last confirmed official round remains #444 from this hour’s official JSON (Last-Modified Wednesday, 16 September 2026 at 13:53:31 GMT). Also previously official on the same JSON: #443 September 15 Canadian Experience Class 2,000 invitations / CRS 519; #442 September 14 Provincial Nominee Program 576 / 734; #441 September 4 Healthcare and Social Services Occupations 3,500 / 475; #440 September 3 Physicians with Canadian Work Experience 229 / 198.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
      },
      {
        id: 'fallback-researchers',
        title: 'Express Entry 2026: researchers with Canadian work',
        desc: 'NOC 41200/41201 TEER 1: 12 months in Canada in the past 3 years.',
        content:
          'IRCC’s Express Entry category-based selection page still lists researchers with Canadian work experience as a 2026 category. Re-checked at 09:00 UTC on 21 September 2026, that page’s dcterms.modified stamp remains 22 June 2026. The category page was fetched HTTP 200 this hour on first try (HTTP Last-Modified Monday, 21 September 2026 at 03:40:11 GMT, same as last hour); urllib retries this hour timed out after 25 seconds. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in Canada — the experience does not need to be continuous — in a single occupation listed as University professors and lecturers (NOC 41200, TEER 1) or Post-secondary teaching and research assistants (41201, TEER 1). If invited, you must submit your application within 60 days. Full details appear in each round’s instructions; IRCC publishes rounds after they run. The dedicated researchers category page returned 404 this hour (the dedicated medical-doctors and skilled-military pages also still 404), so this item uses the category-based selection page as the source. On February 18, 2026, Immigration Minister Lena Metlege Diab announced researchers with Canadian work experience as one of the new 2026 Express Entry categories; that news release fetched HTTP 200 on first try this hour (HTTP Last-Modified Monday, 21 September 2026 at 03:57:01 GMT, same as last hour; dcterms.modified 18 February 2026). urllib retries this hour timed out after 25 seconds. As of 09:00 UTC on 21 September 2026 the official rounds JSON still has no researcher invitation this cycle; the latest official round remains #444 for senior managers.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations/category-based-selection.html',
      },
    ];
  }

  return [
    {
      id: 'fallback-trade',
      title: 'Kanada–Türkiye STA istişareleri kapandı',
      desc: '09.00 UTC yeniden kontrol: STA bilgi sayfası hâlâ 17 Eylül tarihli ve geçmiş zaman; istişare sayfası hâlâ Closed.',
      content:
        'Global Affairs Canada’nın Kanada–Türkiye STA bilgi sayfası hâlâ 17 Eylül 2026 tarihli (date-modified) ve hâlâ Current status: In negotiations listeliyor. İstişareler bölümü artık geçmiş zaman kullanıyor: “The Government of Canada conducted public consultations from July 31, 2026, to September 14, 2026,” ve alınan geri bildirimi özetleyen bir raporun yayımlanacağını belirtiyor. İstişare sayfası, “Türkiye ile olası bir serbest ticaret anlaşması hakkında Kanadalılara danışma” için hâlâ Current status: Closed listeliyor. Sayfa, bu istişarenin 31 Temmuz 2026–14 Eylül 2026 tarihleri arasında yapıldığını söylüyor; dcterms.modified damgası hâlâ 16 Eylül 2026 ve alt bilgi dateModified 31 Temmuz 2026 olarak kalıyor. 21 Eylül 2026 09.00 UTC itibarıyla bu özet (what-we-heard) rapor henüz yayımlanmamış (istişare /report 404; /what-we-heard her iki denemede 404). 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada, 2026’nın erken haziranında Ticaret Bakanları Bolat ve Sidhu’nun Ekonomik Ortaklık Ortak Bakanlar Açıklaması ile keşif görüşmelerini başlattığı; daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi. Önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. İstişare sayfasındaki 2025 mal ticareti ve DYY satırları yerine GAC ilişkiler sayfasının 2024 rakamlarını kullanın: 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı — Kanada mal ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar. Kanada’nın 2024’te Türkiye’den başlıca ithalatı yassı haddelenmiş demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve ilaç ürünleri (107 milyon) oldu. Kanada’nın Türkiye’deki doğrudan yatırımları, ağırlıklı olarak madencilikte, 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. 31 Aralık 2024’te Kanada’da geçerli öğrenim izni bulunan 4.650 Türk vatandaşı vardı; bu, 2022 düzeyine dönüş ve 2023’e göre %23 azalmadır. GAC ülke haber bültenine göre Kanada, 2019’daki İstanbul’daki ilk toplantının ardından 20 Ocak 2026’da Ottawa’da ikinci Ortak Ekonomi ve Ticaret Komitesi (JETCO) toplantısına ev sahipliği yaptı; ülkeler altyapı, yeşil ekonomi, enerji ve madencilik, havacılık ve savunma ile yenilenebilir enerji teknolojileri gibi öncelikli sektörleri görüştü ve hava ulaşım bağlantılarını iyileştirme yollarını keşfetmeye devam etme taahhüdünde bulundu. Sorular hâlâ Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-senior-managers',
      title: 'Express Entry #444: Kanada deneyimli üst düzey yöneticiler',
      desc: '16 Eylül 2026 resmi tur hâlâ en son: 250 davet, CRS 389; NOC 00012–00015 (TEER 0).',
      content:
        'IRCC’nin resmi Express Entry tur tablosu ve resmi tur JSON’u hâlâ 16 Eylül 2026, #444 turunu Senior managers with Canadian Work Experience, 2026-Version 1 kategori bazlı daveti olarak listeliyor. Yayımlanan sonuçlar 250 davet ve en düşük davet alan aday için 389 CRS puanıdır. Bakanlık talimatları turu 16 Eylül 2026 12.44.28 UTC olarak zamanlıyor ve Federal Nitelikli İşçi Programı, Kanada Deneyim Sınıfı ile Federal Nitelikli Meslek Programı’nı adlandırıyor. 18 Şubat 2026’da Göçmenlik Bakanı Lena Metlege Diab bunu, Kanada’da çalışma deneyimi olan üst düzey yöneticiler için 2026’nın yeni Express Entry kategorilerinden biri olarak duyurdu. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde Kanada’da en az 12 ay tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız — deneyimin kesintisiz olması gerekmez — ve bu deneyim tek bir meslekte olmalıdır: finans, iletişim ve diğer iş hizmetlerinde üst düzey yöneticiler (NOC 00012, TEER 0), sağlık, eğitim, sosyal ve toplum hizmetleri ile üyelik kuruluşlarında üst düzey yöneticiler (00013, TEER 0), ticaret, yayıncılık ve diğer hizmetlerde üst düzey yöneticiler (00014, TEER 0) veya inşaat, ulaşım, üretim ve kamu hizmetlerinde üst düzey yöneticiler (00015, TEER 0). Davet edilirseniz başvurunuzu 60 gün içinde sunmalısınız. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır. Bu saatte resmi ee_rounds_123_en.json ve resmi Express Entry tur HTML sayfası Python urllib ile ilk denemede başarılı oldu (HTTP 200). urllib yeniden denemeleri bu saatte 25 saniye sonra zaman aşımına uğradı. curl HTTP/2 başarısız oldu (HTTP/2 akışı INTERNAL_ERROR, 0 bayt) ve curl HTTP/1.1 25 saniye sonra zaman aşımına uğradı (0 bayt). Geçen saat bu resmi dosyalar Python urllib ile ilk denemede başarılı olmuştu (HTTP 200); geçen saat urllib yeniden denemeleri 25 saniye sonra zaman aşımına uğradı; geçen saat curl HTTP/2 başarısız oldu (HTTP/2 akışı INTERNAL_ERROR, 0 bayt) ve curl HTTP/1.1 25 saniye sonra zaman aşımına uğradı (0 bayt). Son teyit edilen başarılı resmi indirme artık 21 Eylül 2026 09.00 UTC (önceki başarılı resmi indirme 08.00 UTC idi). Resmi JSON Last-Modified damgası hâlâ 16 Eylül 2026 Çarşamba 13.53.31 GMT ve listelenen en son tur hâlâ #444. Resmi Express Entry tur HTML Last-Modified damgası bu saatte hâlâ 21 Eylül 2026 Pazartesi 02.43.32 GMT (geçen saatle aynı) ve 17, 18, 19, 20 veya 21 Eylül turu eklenmemiş. CIC News ana sayfasının Last-Modified damgası bu saatte hâlâ 21 Eylül 2026 Pazartesi 03.50.09 GMT (üç tutarlı indirme; geçen saatle aynı) ve hâlâ “Canada invites 250 senior managers to apply for permanent residence” başlığını en son Express Entry haberi olarak listeliyor; #444’ten sonra tur yok. CIC ana sayfasındaki “445” eşleşmeleri bu saatte 0980445 Bill C-3 yazı kimliği ve SVG yol sayılarıdır — Express Entry #445 değildir. CIC ana sayfasının bu saatteki manşeti bir vatandaşlık-soy (citizenship-by-descent) haberi — Express Entry değil ve banner maddesi olarak kullanılmadı. CIC ayrıca bir Newfoundland and Labrador PNP haberi (62 işçi), bir Prince Edward Island PNP 195 aday haberi ve bir British Columbia PNP haberi (33 işçi) listeliyor; banner maddesi olarak kullanılmadı. CIC üst düzey yöneticiler yazısının HTTP Last-Modified damgası bu saatte hâlâ 21 Eylül 2026 Pazartesi 02.54.45 GMT (kanonik 0980361 URL; üç tutarlı indirme; geçen saatle aynı); article:published_time ve article:modified_time hâlâ 2026-09-16T14:43:48+00:00 ve tablosu hâlâ 16 Eylül üst düzey yöneticiler 389/250 ile başlıyor, 17, 18, 19, 20 veya 21 Eylül turu yok. 21 Eylül 2026 09.00 UTC itibarıyla #445 yayımlanmamıştır. Son teyit edilen resmi tur, bu saatin resmi JSON’undaki #444 olarak kalıyor (Last-Modified 16 Eylül 2026 Çarşamba 13.53.31 GMT). Aynı JSON’da resmi olarak ayrıca: #443 15 Eylül Kanada Deneyim Sınıfı 2.000 davet / CRS 519; #442 14 Eylül Eyalet Aday Programı 576 / 734; #441 4 Eylül sağlık ve sosyal hizmet meslekleri 3.500 / 475; #440 3 Eylül Kanada deneyimli hekimler 229 / 198.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
    },
    {
      id: 'fallback-researchers',
      title: 'Express Entry 2026: Kanada deneyimli araştırmacılar',
      desc: 'NOC 41200/41201 TEER 1: son 3 yılda Kanada’da 12 ay deneyim.',
      content:
        'IRCC’nin Express Entry kategori bazlı seçim sayfası Kanada’da çalışma deneyimi olan araştırmacıları hâlâ 2026 kategorisi olarak listeliyor. 21 Eylül 2026 09.00 UTC’te yeniden kontrol edildiğinde sayfanın dcterms.modified damgası hâlâ 22 Haziran 2026. Kategori sayfası bu saatte ilk denemede HTTP 200 ile alındı (HTTP Last-Modified 21 Eylül 2026 Pazartesi 03.40.11 GMT, geçen saatle aynı); urllib yeniden denemeleri bu saatte 25 saniye sonra zaman aşımına uğradı. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde Kanada’da en az 12 ay tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız — deneyimin kesintisiz olması gerekmez — ve bu deneyim tek bir meslekte olmalıdır: üniversite profesörleri ve öğretim görevlileri (NOC 41200, TEER 1) veya yükseköğretim öğretim ve araştırma asistanları (41201, TEER 1). Davet edilirseniz başvurunuzu 60 gün içinde sunmalısınız. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır. Ayrı araştırmacılar kategori sayfası bu saatte 404 verdiği için (ayrı hekim ve nitelikli askeri aday sayfaları da hâlâ 404) kaynak olarak kategori bazlı seçim sayfası kullanıldı. 18 Şubat 2026’da Göçmenlik Bakanı Lena Metlege Diab, Kanada deneyimli araştırmacıları 2026’nın yeni Express Entry kategorilerinden biri olarak duyurdu; o haber bülteni bu saatte ilk denemede HTTP 200 ile alındı (HTTP Last-Modified 21 Eylül 2026 Pazartesi 03.57.01 GMT, geçen saatle aynı; dcterms.modified 18 Şubat 2026). urllib yeniden denemeleri bu saatte 25 saniye sonra zaman aşımına uğradı. 21 Eylül 2026 09.00 UTC itibarıyla resmi tur JSON’unda bu döngüde araştırmacı daveti yoktur; en son resmi tur hâlâ üst düzey yöneticiler için #444’tür.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations/category-based-selection.html',
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
