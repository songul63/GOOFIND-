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
        desc: 'Re-checked 22:00 UTC: FTA info page still date-modified 17 Sep and uses past tense; consultation page still Closed.',
        content:
          'Global Affairs Canada’s Canada–Türkiye FTA information page is still date-modified 17 September 2026 and still lists Current status: In negotiations. The consultations section now uses past tense: “The Government of Canada conducted public consultations from July 31, 2026, to September 14, 2026,” and says a report summarizing the feedback received from this consultation will be published. The consultation page still lists Current status: Closed for “Consulting Canadians on a potential free trade agreement with Türkiye.” That page says this consultation ran from July 31, 2026, to September 14, 2026; its dcterms.modified stamp is still 16 September 2026, and the footer dateModified remains 31 July 2026. As of 22:00 UTC on 25 September 2026 that what-we-heard report has not yet been published (consultation /report first try SSL handshake timed out; later 404; retry 404; /what-we-heard first try 404; later 404; retry 404). On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement notes that in early June 2026 Trade Ministers Bolat and Sidhu issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions, and that closer economic cooperation will support growth, job creation, competitiveness and supply chains. In the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Prefer GAC’s relations-page 2024 figures over the consultation page’s 2025 merchandise and FDI lines: in 2024 two-way merchandise trade was over $4.3 billion — Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion. Canada’s top 2024 imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in mining, fell from $1 billion in 2022 to $420 million in 2023. On December 31, 2024, there were 4,650 Turkish citizens holding valid study permits in Canada, a return to 2022 levels and a 23% decrease from 2023. The relations page dateModified remains 2025-09-19 and still only names Istanbul 2019 JETCO (Ottawa appears only as embassy/diaspora, not the 2026 JETCO); first try this hour HTTP 200; a later fetch HTTP 200; retry HTTP 200. The FTA info page first try this hour HTTP 200; a later fetch HTTP 200; retry HTTP 200. A GAC country news release says Canada hosted the second Joint Economic and Trade Committee (JETCO) meeting in Ottawa on January 20, 2026, after the inaugural Istanbul meeting in 2019; the two countries discussed priority sectors including infrastructure, the green economy, energy and mining, aerospace and defence, and renewable energy technologies, and committed to continue exploring ways to improve air transportation links. The JETCO page first try this hour HTTP 200; a later fetch HTTP 200; retry HTTP 200. Questions can still be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-senior-managers',
        title: 'Express Entry #444: senior managers with Canadian work',
        desc: 'Official Sep 16, 2026 round still latest: 250 invitations, CRS 389; NOC 00012–00015 (TEER 0).',
        content:
          'IRCC’s official Express Entry rounds table and official rounds JSON still list round #444 on September 16, 2026, as a category-based invitation for Senior managers with Canadian Work Experience, 2026-Version 1. The published results are 250 invitations issued, with a Comprehensive Ranking System (CRS) score of 389 for the lowest-ranked candidate invited. The ministerial instructions time the round at 12:44:28 UTC on September 16, 2026, and name the Federal Skilled Worker Program, the Canadian Experience Class and the Federal Skilled Trades Program. On February 18, 2026, Immigration Minister Lena Metlege Diab announced this as one of the new 2026 Express Entry categories for senior managers with Canadian work experience. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in Canada — the experience does not need to be continuous — in a single occupation listed as Senior managers - financial, communications and other business services (NOC 00012, TEER 0), Senior managers - health, education, social and community services and membership organizations (00013, TEER 0), Senior managers - trade, broadcasting and other services (00014, TEER 0), or Senior managers - construction, transportation, production and utilities (00015, TEER 0). If invited, you must submit your application within 60 days. Full details appear in each round’s instructions; IRCC publishes rounds after they run. This hour official ee_rounds_123_en.json and the official Express Entry rounds HTML page succeeded over Python urllib on first try (HTTP 200). Later official JSON and HTML re-fetches this hour also succeeded (HTTP 200). A retry also succeeded (HTTP 200). curl HTTP/2 failed this hour (INTERNAL_ERROR, 0 bytes) and curl HTTP/1.1 timed out after 25 seconds (0 bytes). Last hour those official files timed out over Python urllib on first try (TimeoutError). Last hour later official JSON and HTML re-fetches also timed out (TimeoutError). Last hour a retry also timed out (TimeoutError). Last hour curl HTTP/2 failed (INTERNAL_ERROR, 0 bytes) and curl HTTP/1.1 timed out after 25 seconds (0 bytes). The last confirmed successful official fetch is now 22:00 UTC on 25 September 2026. The official JSON Last-Modified stamp remains Wednesday, 16 September 2026 at 13:53:31 GMT, and the latest listed round is still #444. The official Express Entry rounds HTML Last-Modified stamp this hour is Friday, 25 September 2026 at 22:07:04 GMT on first try and Friday, 25 September 2026 at 22:14:04 GMT later. Official HTML this hour is still a JSON-driven table shell rather than a new Express Entry #445 (that JSON listed 445 round records; latest drawNumber remains 444). Later official JSON and category-page re-fetches this hour succeeded (HTTP 200); retry also succeeded (HTTP 200). The official category-based selection page first try this hour HTTP 200 Last-Modified Friday, 25 September 2026 at 18:49:15 GMT; a later fetch HTTP 200 Last-Modified Friday, 25 September 2026 at 18:49:15 GMT; retry HTTP 200 Last-Modified Friday, 25 September 2026 at 21:05:27 GMT. It lists French-language proficiency, researchers, physicians, senior managers and skilled military recruits. CIC News homepage Last-Modified this hour is Friday, 25 September 2026 at 20:59:20 GMT on first try. Later homepage fetches this hour returned Last-Modified Friday, 25 September 2026 at 20:59:20 GMT. The homepage still lists “Canada invites 250 senior managers to apply for permanent residence” as the latest Express Entry story, with no round after #444. CIC homepage “445” hits this hour are SVG path numbers — not an Express Entry #445. The 0980445 Bill C-3 article is not on the homepage this hour. The CIC homepage this hour still surfaces a citizenship-by-descent story and a letter-of-explanation story for citizenship-by-descent applications — not Express Entry and not used as a banner item. The temporary-residence timelines story is not on the homepage this hour. This hour the homepage also lists a political-discontent / Americans-seeking-Canadian-citizenship story — not used as a banner item. This hour the homepage also lists a British Columbia entrepreneurs provincial-nomination story — not used as a banner item. This hour the homepage also lists a when-to-hire-an-immigration-lawyer story — not used as a banner item. This hour the homepage also lists a proof-of-citizenship-finalizations-slowed-in-July story — not used as a banner item. The Manitoba 508 local-graduates provincial-immigration story is not on the homepage this hour. This hour the homepage also lists a Temporary Foreign Worker Program wait-times story — not used as a banner item. This hour the homepage also lists a story that Canada lifts the temporary halt on removals to Bahrain, Kuwait, Qatar and the UAE — not used as a banner item. This hour the homepage also lists a 100,000 British children / Canadian-ancestor story — not used as a banner item. This hour the homepage also lists a story that a Canadian law quietly turned generations of upstate New Yorkers into dual citizens — not used as a banner item. CIC also lists a Newfoundland and Labrador PNP story (62 workers), a Prince Edward Island PNP 195-candidate story, a British Columbia PNP story (33 workers), a story on expanding foreign workers’ authorization to study without a permit, and a story on trimming the Global Talent Stream partner list; do not use as banner items. The Newfoundland and Labrador 36-foreign-national PNP story is not on the homepage this hour. This hour the homepage also lists a Manitoba 417 STEM-workers provincial-nomination story — not used as a banner item. The study-permit funds-hike story is not on the homepage this hour. CIC this hour also lists a story on Express Entry candidate scores, a 2,000-invitation Canadian Experience Class story, a Newfoundland and Labrador 54% provincial-immigration boost story, and a Fall 2026 permanent-residence webinar — those are not a newer official round and are not used as banner items. The CIC senior-managers article first try this hour HTTP 200 Last-Modified Friday, 25 September 2026 at 20:38:48 GMT on the canonical 0980361 URL; later fetch HTTP 200 Last-Modified Friday, 25 September 2026 at 20:38:48 GMT; article:published_time and article:modified_time remain 2026-09-16T14:43:48+00:00, and its table still starts at September 16 senior managers 389/250 with no September 17, 18, 19, 20, 21, 22, 23, 24 or 25 draw. As of 22:00 UTC on 25 September 2026 no #445 has been published. The last confirmed official JSON still has no newer physicians invitation after #440 September 3 (229 invitations / CRS 198), no researcher invitation this cycle, no newer French-language invitation after #437 August 19 (5,000 / 382), and no skilled-military invitation this cycle. Also previously official on the same JSON: #443 September 15 Canadian Experience Class 2,000 invitations / CRS 519; #442 September 14 Provincial Nominee Program 576 / 734; #441 September 4 Healthcare and Social Services Occupations 3,500 / 475.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
      },
      {
        id: 'fallback-ai-climate',
        title: 'Toronto: AI for Climate talk Sept 27',
        desc: 'Sunday 27 Sep 2026, 09:00 at Turkish Community Heritage Centre, 200 Eglinton Ave W.',
        content:
          'The Federation of Canadian Turkish Associations lists a sourced upcoming community talk, AI for Climate, on Sunday 27 September 2026 at 09:00 at the Turkish Community Heritage Centre of Canada, 200 Eglinton Ave W, Toronto, ON M4R 1A7. Re-checked at 22:00 UTC on 25 September 2026, the official English event page https://www.turkishfederation.ca/etkinlik/ai-for-climate returned HTTP 200 on first try and later, and the Turkish page https://www.turkishfederation.ca/etkinlik/cevre-icin-yapay-zeka also returned HTTP 200 on first try and later. Both pages agree on the date, 09:00 start, physical / education format, RSVP, and the Eglinton address. Ceren Zeytinoğlu Atıcı, Project Lead of the Global AI Alliance for Climate Action — a joint initiative of the Toronto-based Vector Institute and the Turkish Informatics Foundation — will discuss how AI models can be translated into practical climate solutions in energy efficiency, disaster prediction and biodiversity protection, and will highlight work with Pale Blue AI, which she co-founded in Canada, and Clean AI. Do not restore Anatolia Fest as upcoming (it was Sunday 20 September 2026; anatoliafest.ca returned HTTP 200 this hour but the listing is still 20 Sep). Turkish Canadian Society Republic Ball pages remain inconsistent this hour (`/event/republic-ball/` redirects to the homepage; `/republic-ball-101st/` lists Saturday 26 Oct 2026 at Hilton Metrotown Crystal Ballroom with leftover Fairmont Hotel Vancouver Pacific Ballroom / 100th-anniversary copy; `/republic-ball-103rd/` first try this hour HTTP 200 and later HTTP 200, listing Saturday 24 Oct 2026 6:30 PM at Croatian Cultural Centre, Vancouver, with the same leftover Fairmont copy) — do not use until the venue is consistent.',
        category: 'Community',
        color: 'bg-primary',
        link: 'https://www.turkishfederation.ca/etkinlik/ai-for-climate',
      },
    ];
  }

  return [
    {
      id: 'fallback-trade',
      title: 'Kanada–Türkiye STA istişareleri kapandı',
        desc: '22.00 UTC yeniden kontrol: STA bilgi sayfası hâlâ 17 Eylül tarihli ve geçmiş zaman; istişare sayfası hâlâ Closed.',
      content:
        'Global Affairs Canada’nın Kanada–Türkiye STA bilgi sayfası hâlâ 17 Eylül 2026 tarihli (date-modified) ve hâlâ Current status: In negotiations listeliyor. İstişareler bölümü artık geçmiş zaman kullanıyor: “The Government of Canada conducted public consultations from July 31, 2026, to September 14, 2026,” ve alınan geri bildirimi özetleyen bir raporun yayımlanacağını belirtiyor. İstişare sayfası, “Türkiye ile olası bir serbest ticaret anlaşması hakkında Kanadalılara danışma” için hâlâ Current status: Closed listeliyor. Sayfa, bu istişarenin 31 Temmuz 2026–14 Eylül 2026 tarihleri arasında yapıldığını söylüyor; dcterms.modified damgası hâlâ 16 Eylül 2026 ve alt bilgi dateModified 31 Temmuz 2026 olarak kalıyor. 25 Eylül 2026 22.00 UTC itibarıyla bu özet (what-we-heard) rapor henüz yayımlanmamış (istişare /report ilk denemede SSL el sıkışmasında zaman aşımına uğradı; sonraki 404; yeniden deneme 404; /what-we-heard ilk denemede 404; sonraki 404; yeniden deneme 404). 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada, 2026’nın erken haziranında Ticaret Bakanları Bolat ve Sidhu’nun Ekonomik Ortaklık Ortak Bakanlar Açıklaması ile keşif görüşmelerini başlattığı; daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi. Önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. İstişare sayfasındaki 2025 mal ticareti ve DYY satırları yerine GAC ilişkiler sayfasının 2024 rakamlarını kullanın: 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı — Kanada mal ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar. Kanada’nın 2024’te Türkiye’den başlıca ithalatı yassı haddelenmiş demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve ilaç ürünleri (107 milyon) oldu. Kanada’nın Türkiye’deki doğrudan yatırımları, ağırlıklı olarak madencilikte, 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. 31 Aralık 2024’te Kanada’da geçerli öğrenim izni bulunan 4.650 Türk vatandaşı vardı; bu, 2022 düzeyine dönüş ve 2023’e göre %23 azalmadır. İlişkiler sayfasının dateModified damgası hâlâ 2025-09-19 ve hâlâ yalnızca İstanbul 2019 JETCO’yu adlandırıyor (Ottawa yalnızca büyükelçilik/diaspora olarak geçiyor, 2026 JETCO olarak değil); ilk deneme bu saatte HTTP 200 verdi; sonraki bir indirme HTTP 200 verdi; yeniden deneme HTTP 200 verdi. STA bilgi sayfası bu saatte ilk denemede HTTP 200 verdi; sonraki bir indirme HTTP 200 verdi; yeniden deneme HTTP 200 verdi. GAC ülke haber bültenine göre Kanada, 2019’daki İstanbul’daki ilk toplantının ardından 20 Ocak 2026’da Ottawa’da ikinci Ortak Ekonomi ve Ticaret Komitesi (JETCO) toplantısına ev sahipliği yaptı; ülkeler altyapı, yeşil ekonomi, enerji ve madencilik, havacılık ve savunma ile yenilenebilir enerji teknolojileri gibi öncelikli sektörleri görüştü ve hava ulaşım bağlantılarını iyileştirme yollarını keşfetmeye devam etme taahhüdünde bulundu. JETCO sayfasında bu saatte ilk deneme HTTP 200 verdi; sonraki bir JETCO indirmesi HTTP 200 verdi; yeniden deneme HTTP 200 verdi. Sorular hâlâ Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-senior-managers',
      title: 'Express Entry #444: Kanada deneyimli üst düzey yöneticiler',
      desc: '16 Eylül 2026 resmi tur hâlâ en son: 250 davet, CRS 389; NOC 00012–00015 (TEER 0).',
      content:
        'IRCC’nin resmi Express Entry tur tablosu ve resmi tur JSON’u hâlâ 16 Eylül 2026, #444 turunu Senior managers with Canadian Work Experience, 2026-Version 1 kategori bazlı daveti olarak listeliyor. Yayımlanan sonuçlar 250 davet ve en düşük davet alan aday için 389 CRS puanıdır. Bakanlık talimatları turu 16 Eylül 2026 12.44.28 UTC olarak zamanlıyor ve Federal Nitelikli İşçi Programı, Kanada Deneyim Sınıfı ile Federal Nitelikli Meslek Programı’nı adlandırıyor. 18 Şubat 2026’da Göçmenlik Bakanı Lena Metlege Diab bunu, Kanada’da çalışma deneyimi olan üst düzey yöneticiler için 2026’nın yeni Express Entry kategorilerinden biri olarak duyurdu. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde Kanada’da en az 12 ay tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız — deneyimin kesintisiz olması gerekmez — ve bu deneyim tek bir meslekte olmalıdır: finans, iletişim ve diğer iş hizmetlerinde üst düzey yöneticiler (NOC 00012, TEER 0), sağlık, eğitim, sosyal ve toplum hizmetleri ile üyelik kuruluşlarında üst düzey yöneticiler (00013, TEER 0), ticaret, yayıncılık ve diğer hizmetlerde üst düzey yöneticiler (00014, TEER 0) veya inşaat, ulaşım, üretim ve kamu hizmetlerinde üst düzey yöneticiler (00015, TEER 0). Davet edilirseniz başvurunuzu 60 gün içinde sunmalısınız. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır. Bu saatte resmi ee_rounds_123_en.json ve resmi Express Entry tur HTML sayfası Python urllib ile ilk denemede başarılı oldu (HTTP 200). Sonraki resmi JSON ve HTML yeniden indirmeleri bu saatte de başarılı oldu (HTTP 200). Yeniden deneme de başarılı oldu (HTTP 200). curl HTTP/2 bu saatte başarısız oldu (INTERNAL_ERROR, 0 bayt) ve curl HTTP/1.1 25 saniye sonra zaman aşımına uğradı (0 bayt). Geçen saat bu resmi dosyalar Python urllib ile ilk denemede zaman aşımına uğramıştı (TimeoutError). Geçen saat sonraki resmi JSON ve HTML yeniden indirmeleri de zaman aşımına uğramıştı (TimeoutError). Geçen saat yeniden deneme de zaman aşımına uğramıştı (TimeoutError). Geçen saat curl HTTP/2 başarısız olmuştu (INTERNAL_ERROR, 0 bayt) ve curl HTTP/1.1 25 saniye sonra zaman aşımına uğramıştı (0 bayt). Son teyit edilen başarılı resmi indirme artık 25 Eylül 2026 22.00 UTC. Resmi JSON Last-Modified damgası hâlâ 16 Eylül 2026 Çarşamba 13.53.31 GMT ve listelenen en son tur hâlâ #444. Resmi Express Entry tur HTML Last-Modified damgası bu saatte ilk denemede 25 Eylül 2026 Cuma 22.07.04 GMT ve sonraki indirmede 25 Eylül 2026 Cuma 22.14.04 GMT. Resmi HTML bu saatte yeni bir Express Entry #445 değildir; JSON sürümlü tablo kabuğu olarak kalır (o JSON 445 tur kaydı listeliyor; en son drawNumber hâlâ 444). Sonraki resmi JSON ve kategori sayfası yeniden indirmeleri bu saatte başarılı oldu (HTTP 200); yeniden deneme de başarılı oldu (HTTP 200). Resmi kategori bazlı seçim sayfası bu saatte ilk denemede HTTP 200 Last-Modified 25 Eylül 2026 Cuma 18.49.15 GMT verdi; sonraki bir indirme HTTP 200 Last-Modified 25 Eylül 2026 Cuma 18.49.15 GMT verdi; yeniden deneme HTTP 200 Last-Modified 25 Eylül 2026 Cuma 21.05.27 GMT verdi. Sayfa Fransızca yeterlilik, araştırmacılar, hekimler, üst düzey yöneticiler ile nitelikli askeri adayları listeliyor. CIC News ana sayfasının Last-Modified damgası bu saatte ilk denemede 25 Eylül 2026 Cuma 20.59.20 GMT. Sonraki ana sayfa indirmeleri bu saatte Last-Modified 25 Eylül 2026 Cuma 20.59.20 GMT verdi. Ana sayfa hâlâ “Canada invites 250 senior managers to apply for permanent residence” başlığını en son Express Entry haberi olarak listeliyor; #444’ten sonra tur yok. CIC ana sayfasındaki “445” eşleşmeleri bu saatte SVG yol sayılarıdır — Express Entry #445 değildir. 0980445 Bill C-3 yazısı bu saatte ana sayfada yoktur. CIC ana sayfası bu saatte hâlâ bir vatandaşlık-soy (citizenship-by-descent) haberi ve vatandaşlık-soy başvuruları için bir letter-of-explanation haberi gösteriyor — Express Entry değil ve banner maddesi olarak kullanılmadı. Temporary-residence timelines haberi bu saatte ana sayfada yok. Bu saatte ana sayfa ayrıca bir political-discontent / Americans-seeking-Canadian-citizenship haberi listeliyor — banner maddesi olarak kullanılmadı. Bu saatte ana sayfa ayrıca bir British Columbia girişimci eyalet adaylığı haberi listeliyor — banner maddesi olarak kullanılmadı. Bu saatte ana sayfa ayrıca bir when-to-hire-an-immigration-lawyer haberi listeliyor — banner maddesi olarak kullanılmadı. Bu saatte ana sayfa ayrıca bir proof-of-citizenship-finalizations-slowed-in-July haberi listeliyor — banner maddesi olarak kullanılmadı. Manitoba 508 yerel mezun eyalet göçü haberi bu saatte ana sayfada yok. Bu saatte ana sayfa ayrıca bir Temporary Foreign Worker Program bekleme süreleri haberi listeliyor — banner maddesi olarak kullanılmadı. Bu saatte ana sayfa ayrıca Kanada’nın Bahreyn, Kuveyt, Katar ve BAE’ye geçici sınır dışı durdurmasını kaldırdığı bir haber listeliyor — banner maddesi olarak kullanılmadı. Bu saatte ana sayfa ayrıca 100.000 İngiliz çocuğun Kanada’ya gönderildiği / Kanada atası haberini listeliyor — banner maddesi olarak kullanılmadı. Bu saatte ana sayfa ayrıca bir Kanada yasasının nesiller boyu upstate New Yorkluları çifte vatandaş yaptığı haberi listeliyor — banner maddesi olarak kullanılmadı. CIC ayrıca bir Newfoundland and Labrador PNP haberi (62 işçi), bir Prince Edward Island PNP 195 aday haberi, bir British Columbia PNP haberi (33 işçi), yabancı işçilerin izin olmadan öğrenim yetkisinin genişletilmesi haberini ve Global Talent Stream ortak listesinin daraltılması haberini listeliyor; banner maddesi olarak kullanılmadı. Newfoundland and Labrador 36 yabancı uyruklu PNP haberi bu saatte ana sayfada yok. Bu saatte ana sayfa ayrıca bir Manitoba 417 STEM işçisi eyalet adaylığı haberi listeliyor — banner maddesi olarak kullanılmadı. Öğrenim izni başvuru fon artışı haberi bu saatte ana sayfada yok. CIC bu saatte ayrıca bir Express Entry aday puanları haberi, 2.000 davetlik bir Kanada Deneyim Sınıfı haberi, bir Newfoundland and Labrador yüzde 54 eyalet göçü artışı haberi ve bir 2026 sonbahar kalıcı oturum semineri listeliyor — bunlar daha yeni resmi tur değildir ve banner maddesi olarak kullanılmadı. CIC üst düzey yöneticiler yazısı bu saatte ilk denemede HTTP 200 Last-Modified 25 Eylül 2026 Cuma 20.38.48 GMT verdi (kanonik 0980361 URL); sonraki indirme HTTP 200 Last-Modified 25 Eylül 2026 Cuma 20.38.48 GMT; article:published_time ve article:modified_time hâlâ 2026-09-16T14:43:48+00:00 ve tablosu hâlâ 16 Eylül üst düzey yöneticiler 389/250 ile başlıyor, 17, 18, 19, 20, 21, 22, 23, 24 veya 25 Eylül turu yok. 25 Eylül 2026 22.00 UTC itibarıyla #445 yayımlanmamıştır. Son teyit edilen resmi JSON hâlâ #440 3 Eylül’den (229 davet / CRS 198) sonra yeni bir hekim daveti, bu döngüde araştırmacı daveti, #437 19 Ağustos’tan (5.000 / 382) sonra yeni bir Fransızca daveti ve bu döngüde nitelikli askeri aday daveti içermiyor. Aynı JSON’da resmi olarak ayrıca: #443 15 Eylül Kanada Deneyim Sınıfı 2.000 davet / CRS 519; #442 14 Eylül Eyalet Aday Programı 576 / 734; #441 4 Eylül sağlık ve sosyal hizmet meslekleri 3.500 / 475.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
    },
    {
      id: 'fallback-ai-climate',
      title: 'Toronto: 27 Eylül Çevre İçin Yapay Zeka',
      desc: '27 Eylül 2026 Pazar 09.00, Türk Toplum Merkezi, 200 Eglinton Ave W.',
      content:
        'Kanada Türk Dernekleri Federasyonu, 27 Eylül 2026 Pazar 09.00’da Türk Toplum Merkezi’nde (Turkish Community Heritage Centre of Canada, 200 Eglinton Ave W, Toronto, ON M4R 1A7) kaynaklı yaklaşan bir topluluk konuşması listeliyor: Çevre İçin Yapay Zeka / AI for Climate. 25 Eylül 2026 22.00 UTC’te yeniden kontrol edildiğinde resmi İngilizce etkinlik sayfası https://www.turkishfederation.ca/etkinlik/ai-for-climate ilk deneme ve sonraki indirmede HTTP 200 verdi; Türkçe sayfa https://www.turkishfederation.ca/etkinlik/cevre-icin-yapay-zeka da ilk deneme ve sonraki indirmede HTTP 200 verdi. Her iki sayfa tarih, 09.00 başlangıç, fiziksel / eğitim biçimi, RSVP ve Eglinton adresinde uyumlu. Toronto merkezli Vector Institute ile Türkiye Bilişim Vakfı’nın ortak Global AI Alliance for Climate Action projesinin yöneticisi Ceren Zeytinoğlu Atıcı, yapay zekâ modellerinin enerji verimliliği, afet tahmini ve biyoçeşitliliğin korunması gibi alanlarda somut iklim çözümlerine nasıl dönüşebileceğini paylaşacak; Kanada’da kurucu ortağı olduğu Pale Blue AI ve Clean AI çalışmalarına da yer verilecek. Anatolia Fest yaklaşan etkinlik olarak geri yüklenmemeli (20 Eylül 2026 Pazardı; anatoliafest.ca bu saatte HTTP 200 verdi ama ilan hâlâ 20 Eylül). Turkish Canadian Society Republic Ball sayfaları bu saatte hâlâ tutarsız (`/event/republic-ball/` ana sayfaya yönlendiriyor; `/republic-ball-101st/` 26 Ekim 2026 Cumartesi Hilton Metrotown Crystal Ballroom diyor ve Fairmont Hotel Vancouver Pacific Ballroom / 100. yıl metni bırakıyor; `/republic-ball-103rd/` bu saatte ilk denemede HTTP 200, sonraki indirmede HTTP 200 verdi ve 24 Ekim 2026 Cumartesi 18.30 Croatian Cultural Centre, Vancouver diyor ve aynı Fairmont metnini bırakıyor) — mekân tutarlı olana kadar kullanılmamalı.',
      category: 'Topluluk',
      color: 'bg-primary',
      link: 'https://www.turkishfederation.ca/etkinlik/cevre-icin-yapay-zeka',
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
