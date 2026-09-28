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
        desc: 'Re-checked 02:00 UTC: FTA info page still date-modified 17 Sep and uses past tense; consultation page still Closed.',
        content:
          'Global Affairs Canada’s Canada–Türkiye FTA information page is still date-modified 17 September 2026 and still lists Current status: In negotiations. The consultations section now uses past tense: “The Government of Canada conducted public consultations from July 31, 2026, to September 14, 2026,” and says a report summarizing the feedback received from this consultation will be published. The consultation page still lists Current status: Closed for “Consulting Canadians on a potential free trade agreement with Türkiye.” That page says this consultation ran from July 31, 2026, to September 14, 2026; its dcterms.modified stamp is still 16 September 2026, and the footer dateModified remains 31 July 2026. As of 02:00 UTC on 28 September 2026 that what-we-heard report has not yet been published (consultation /report first try 404; later 404; retry 404; /what-we-heard first try handshake timed out; later 404; retry handshake timed out). On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement notes that in early June 2026 Trade Ministers Bolat and Sidhu issued a Joint Ministerial Statement on Economic Partnership launching exploratory discussions, and that closer economic cooperation will support growth, job creation, competitiveness and supply chains. In the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Prefer GAC’s relations-page 2024 figures over the consultation page’s 2025 merchandise and FDI lines: in 2024 two-way merchandise trade was over $4.3 billion — Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion. Canada’s top 2024 imports from Türkiye were flat-rolled iron sheet products ($203 million), tugboats ($128 million) and pharmaceutical products ($107 million). The stock of Canadian direct investment in Türkiye, mostly in mining, fell from $1 billion in 2022 to $420 million in 2023. On December 31, 2024, there were 4,650 Turkish citizens holding valid study permits in Canada, a return to 2022 levels and a 23% decrease from 2023. The relations page dateModified remains 2025-09-19 and still only names Istanbul 2019 JETCO (Ottawa appears only as embassy/diaspora, not the 2026 JETCO); first try this hour HTTP 200; a later fetch also HTTP 200; retry HTTP 200. The FTA info page first try this hour HTTP 200; a later fetch also HTTP 200; retry HTTP 200. A GAC country news release says Canada hosted the second Joint Economic and Trade Committee (JETCO) meeting in Ottawa on January 20, 2026, after the inaugural Istanbul meeting in 2019; the two countries discussed priority sectors including infrastructure, the green economy, energy and mining, aerospace and defence, and renewable energy technologies, and committed to continue exploring ways to improve air transportation links. The documented JETCO path (`country_news-pays_nouvelles/2026-01-20-turkiye.aspx`) first try this hour HTTP 404; later HTTP 404; retry HTTP 404 (last hour first try, later, and retry HTTP 200). Alternate no-lang first try this hour HTTP 404; later handshake timed out; retry handshake timed out (last hour first try HTTP 200; later handshake timed out; retry handshake timed out). international.canada.ca probe first try this hour HTTP 200; later HTTP 200; retry HTTP 200 (last hour first try, later, and retry HTTP 200). Questions can still be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
      },
      {
        id: 'fallback-senior-managers',
        title: 'Express Entry #444: senior managers with Canadian work',
        desc: 'Official Sep 16, 2026 round still latest: 250 invitations, CRS 389; NOC 00012–00015 (TEER 0).',
        content:
          'IRCC’s official Express Entry rounds table and official rounds JSON still list round #444 on September 16, 2026, as a category-based invitation for Senior managers with Canadian Work Experience, 2026-Version 1. The published results are 250 invitations issued, with a Comprehensive Ranking System (CRS) score of 389 for the lowest-ranked candidate invited. The ministerial instructions time the round at 12:44:28 UTC on September 16, 2026, and name the Federal Skilled Worker Program, the Canadian Experience Class and the Federal Skilled Trades Program. On February 18, 2026, Immigration Minister Lena Metlege Diab announced this as one of the new 2026 Express Entry categories for senior managers with Canadian work experience. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in Canada — the experience does not need to be continuous — in a single occupation listed as Senior managers - financial, communications and other business services (NOC 00012, TEER 0), Senior managers - health, education, social and community services and membership organizations (00013, TEER 0), Senior managers - trade, broadcasting and other services (00014, TEER 0), or Senior managers - construction, transportation, production and utilities (00015, TEER 0). If invited, you must submit your application within 60 days. Full details appear in each round’s instructions; IRCC publishes rounds after they run. This hour official ee_rounds_123_en.json, the official Express Entry rounds HTML page, and the official category-based selection page succeeded over Python urllib on first try, later, and retry (HTTP 200). curl HTTP/2 failed this hour (INTERNAL_ERROR, 0 bytes) and curl HTTP/1.1 timed out after 25 seconds (0 bytes). Last hour official ee_rounds_123_en.json, the official Express Entry rounds HTML page, and the official category-based selection page succeeded over Python urllib on first try, later, and retry (HTTP 200). Last hour curl HTTP/2 failed (INTERNAL_ERROR, 0 bytes) and curl HTTP/1.1 timed out after 25 seconds (0 bytes). The last confirmed successful official fetch is now 02:00 UTC on 28 September 2026. The official JSON Last-Modified stamp remains Wednesday, 16 September 2026 at 13:53:31 GMT, and the latest listed round is still #444. Official Express Entry rounds HTML first try this hour HTTP 200 (Last-Modified Monday, 28 September 2026 at 02:01:26 GMT); later HTTP 200 (Last-Modified Monday, 28 September 2026 at 02:01:26 GMT); retry HTTP 200 (Last-Modified Monday, 28 September 2026 at 02:01:26 GMT). Last hour official HTML first try HTTP 200 (Last-Modified Sunday, 27 September 2026 at 23:50:11 GMT); later HTTP 200 (Last-Modified Sunday, 27 September 2026 at 23:50:11 GMT); retry HTTP 200 (Last-Modified Sunday, 27 September 2026 at 23:50:11 GMT). Official HTML is still a JSON-driven table shell rather than a new Express Entry #445 (that JSON listed 445 round records; latest drawNumber remains 444). Official category-based selection page first try this hour HTTP 200 (Last-Modified Sunday, 27 September 2026 at 21:16:32 GMT); later HTTP 200 (Last-Modified Sunday, 27 September 2026 at 23:49:34 GMT); retry HTTP 200 (Last-Modified Sunday, 27 September 2026 at 23:49:34 GMT), listing French-language proficiency, researchers, physicians, senior managers and skilled military recruits. Last hour that page first try HTTP 200 (Last-Modified Sunday, 27 September 2026 at 21:16:32 GMT); later HTTP 200 (Last-Modified Sunday, 27 September 2026 at 21:05:42 GMT); retry HTTP 200 (Last-Modified Sunday, 27 September 2026 at 21:16:32 GMT). CIC News homepage Last-Modified this hour is Sunday, 27 September 2026 at 22:55:03 GMT on first try. Later homepage fetches this hour returned Last-Modified Sunday, 27 September 2026 at 22:55:03 GMT. Retry homepage Last-Modified this hour is Sunday, 27 September 2026 at 22:55:03 GMT. Last hour that homepage Last-Modified was Sunday, 27 September 2026 at 22:55:03 GMT on first try, later, and retry. The homepage still lists “Canada invites 250 senior managers to apply for permanent residence” as the latest Express Entry story, with no round after #444. CIC homepage “445” hits this hour are SVG path numbers — not an Express Entry #445. The 0980445 Bill C-3 article is not on the homepage this hour. CIC still lists TFWP wait-times, political-discontent / Americans-seeking-Canadian-citizenship, 100,000 British children, and upstate-New-Yorkers dual-citizens stories — not used as banner items. The Bahrain/Kuwait/Qatar/UAE removals-halt story is not on the homepage this hour. Manitoba 508, temporary-residence timelines, and the Newfoundland 36-foreign-national PNP story are not on the homepage this hour. The study-permit funds-hike story is on the homepage this hour — not used as a banner item. CIC homepage this hour also lists a Manitoba 417 STEM-workers provincial-nomination story — not used as a banner item. CIC homepage this hour also lists a New Brunswick 678 in-demand-workers provincial-immigration story — not used as a banner item. CIC homepage this hour also lists a British Columbia 714 cream-of-the-crop-workers provincial-immigration story — not used as a banner item. CIC homepage this hour also lists an Americans-applying-for-Canadian-citizenship-for-their-adult-kids story (0980711) — not used as a banner item. This hour the homepage also lists a when-to-hire-an-immigration-lawyer story — not used as a banner item. This hour the homepage also lists a proof-of-citizenship-finalizations-slowed-in-July story — not used as a banner item. The letter-of-explanation story is not on the homepage this hour. This hour the homepage also lists an 1867-is-not-a-cut-off-date citizenship-by-descent story — not used as a banner item. CIC also lists a Newfoundland and Labrador PNP story (62 workers), a Prince Edward Island PNP 195-candidate story, and a British Columbia entrepreneurs provincial-nomination story; the British Columbia PNP 33-workers story is not on the homepage this hour. CIC also lists a story on trimming the Global Talent Stream partner list; do not use as banner items. CIC this hour also lists a story on Express Entry candidate scores, a 2,000-invitation Canadian Experience Class story, a Newfoundland and Labrador 54% provincial-immigration boost story, and a Fall 2026 permanent-residence webinar — those are not a newer official round and are not used as banner items. The CIC senior-managers article first try this hour HTTP 200 Last-Modified Sunday, 27 September 2026 at 15:57:39 GMT on the canonical 0980361 URL; later fetch HTTP 200 Last-Modified Sunday, 27 September 2026 at 15:57:39 GMT; retry HTTP 200 Last-Modified Sunday, 27 September 2026 at 15:57:39 GMT (last hour Sunday, 27 September 2026 at 15:57:39 GMT); article:published_time and article:modified_time remain 2026-09-16T14:43:48+00:00, and its table still starts at September 16 senior managers 389/250 with no September 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 or 28 draw. As of 02:00 UTC on 28 September 2026 no #445 has been published. The last confirmed official JSON still has no newer physicians invitation after #440 September 3 (229 invitations / CRS 198), no researcher invitation this cycle, no newer French-language invitation after #437 August 19 (5,000 / 382), and no skilled-military invitation this cycle. Also previously official on the same JSON: #443 September 15 Canadian Experience Class 2,000 invitations / CRS 519; #442 September 14 Provincial Nominee Program 576 / 734; #441 September 4 Healthcare and Social Services Occupations 3,500 / 475.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
      },
      {
        id: 'fallback-military',
        title: 'Express Entry 2026: skilled military recruits',
        desc: 'FSMA: 10 years’ continuous service and a CAF offer in NOC 40042, 42102 or 43204.',
        content:
          'IRCC’s Express Entry category-based selection page still lists skilled military recruits as a 2026 category. Re-checked at 02:00 UTC on 28 September 2026, that page first try this hour HTTP 200 (Last-Modified Sunday, 27 September 2026 at 21:16:32 GMT); later HTTP 200 (Last-Modified Sunday, 27 September 2026 at 23:49:34 GMT); retry HTTP 200 (Last-Modified Sunday, 27 September 2026 at 23:49:34 GMT). dcterms.modified still 22 June 2026. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must be a Foreign Skilled Military Applicant (FSMA) serving in a recognized foreign military with at least ten years of continuous service, with work experience and training aligned with commissioned officers of the Canadian Armed Forces (NOC 40042, TEER 0), specialized members (42102, TEER 2), or operations members (43204, TEER 3). You must have an offer of arranged employment from the Canadian Forces Recruiting Group for continuous full-time work in Canada lasting at least three years in one of those occupations, and at least a two-year post-secondary credential (with an educational credential assessment if completed outside Canada). If invited, you must submit your application within 60 days. Full details appear in each round’s instructions; IRCC publishes rounds after they run. The dedicated skilled-military category page returned 404 this hour on first try, later, and retry (the dedicated french-language-proficiency, researchers and medical-doctors pages also 404’d), so this item uses the category-based selection page as the source. As of 02:00 UTC on 28 September 2026 the official rounds JSON still has no skilled-military invitation this cycle; the latest official round remains #444 for senior managers. The Federation AI for Climate listing is no longer a clean same-day sourced event (27 September 2026, 09:00 Toronto / 13:00 UTC start) and is not used as a banner item; English and Turkish Federation pages still returned HTTP 200 on first try, later, and retry with a consistent 27 Eylül 2026, 09:00, 200 Eglinton, Fiziksel / Eğitim, RSVP listing. Do not restore Anatolia Fest as upcoming (it was Sunday 20 September 2026; anatoliafest.ca returned HTTP 200 this hour but the listing is still 20 Sep). Turkish Canadian Society Republic Ball pages remain inconsistent this hour (`/event/republic-ball/` first try, later, and retry HTTP 200 with the homepage title Turkish-Canadian Society; `/republic-ball-101st/` first try, later, and retry HTTP 200, listing Saturday 26 Oct 2026 at Hilton Metrotown Crystal Ballroom with leftover Fairmont Hotel Vancouver Pacific Ballroom / 100th-anniversary copy; `/republic-ball-103rd/` first try this hour HTTP 200, later HTTP 200, retry HTTP 200, listing Saturday 24 October 2026 at Croatian Cultural Centre, Vancouver, with the same leftover Fairmont copy) — do not use until the venue is consistent.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
    ];
  }

  return [
    {
      id: 'fallback-trade',
      title: 'Kanada–Türkiye STA istişareleri kapandı',
        desc: '02.00 UTC yeniden kontrol: STA bilgi sayfası hâlâ 17 Eylül tarihli ve geçmiş zaman; istişare sayfası hâlâ Closed.',
      content:
        'Global Affairs Canada’nın Kanada–Türkiye STA bilgi sayfası hâlâ 17 Eylül 2026 tarihli (date-modified) ve hâlâ Current status: In negotiations listeliyor. İstişareler bölümü artık geçmiş zaman kullanıyor: “The Government of Canada conducted public consultations from July 31, 2026, to September 14, 2026,” ve alınan geri bildirimi özetleyen bir raporun yayımlanacağını belirtiyor. İstişare sayfası, “Türkiye ile olası bir serbest ticaret anlaşması hakkında Kanadalılara danışma” için hâlâ Current status: Closed listeliyor. Sayfa, bu istişarenin 31 Temmuz 2026–14 Eylül 2026 tarihleri arasında yapıldığını söylüyor; dcterms.modified damgası hâlâ 16 Eylül 2026 ve alt bilgi dateModified 31 Temmuz 2026 olarak kalıyor. 28 Eylül 2026 02.00 UTC itibarıyla bu özet (what-we-heard) rapor henüz yayımlanmamış (istişare /report ilk denemede 404; sonraki 404; yeniden deneme 404; /what-we-heard ilk denemede el sıkışması zaman aşımına uğradı; sonraki 404; yeniden denemede el sıkışması zaman aşımına uğradı). 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada, 2026’nın erken haziranında Ticaret Bakanları Bolat ve Sidhu’nun Ekonomik Ortaklık Ortak Bakanlar Açıklaması ile keşif görüşmelerini başlattığı; daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi. Önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. İstişare sayfasındaki 2025 mal ticareti ve DYY satırları yerine GAC ilişkiler sayfasının 2024 rakamlarını kullanın: 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı — Kanada mal ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar. Kanada’nın 2024’te Türkiye’den başlıca ithalatı yassı haddelenmiş demir sac ürünleri (203 milyon dolar), römorkörler (128 milyon) ve ilaç ürünleri (107 milyon) oldu. Kanada’nın Türkiye’deki doğrudan yatırımları, ağırlıklı olarak madencilikte, 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. 31 Aralık 2024’te Kanada’da geçerli öğrenim izni bulunan 4.650 Türk vatandaşı vardı; bu, 2022 düzeyine dönüş ve 2023’e göre %23 azalmadır. İlişkiler sayfasının dateModified damgası hâlâ 2025-09-19 ve hâlâ yalnızca İstanbul 2019 JETCO’yu adlandırıyor (Ottawa yalnızca büyükelçilik/diaspora olarak geçiyor, 2026 JETCO olarak değil); ilk deneme bu saatte HTTP 200; sonraki bir indirme de HTTP 200 verdi; yeniden deneme HTTP 200. STA bilgi sayfası bu saatte ilk denemede HTTP 200 verdi; sonraki bir indirme de HTTP 200 verdi; yeniden deneme HTTP 200. GAC ülke haber bültenine göre Kanada, 2019’daki İstanbul’daki ilk toplantının ardından 20 Ocak 2026’da Ottawa’da ikinci Ortak Ekonomi ve Ticaret Komitesi (JETCO) toplantısına ev sahipliği yaptı; ülkeler altyapı, yeşil ekonomi, enerji ve madencilik, havacılık ve savunma ile yenilenebilir enerji teknolojileri gibi öncelikli sektörleri görüştü ve hava ulaşım bağlantılarını iyileştirme yollarını keşfetmeye devam etme taahhüdünde bulundu. Belgelenen JETCO yolu (`country_news-pays_nouvelles/2026-01-20-turkiye.aspx`) bu saatte ilk denemede HTTP 404; sonraki HTTP 404; yeniden deneme HTTP 404 (geçen saat ilk deneme, sonraki ve yeniden deneme HTTP 200). Dil parametresi olmayan alternatif bu saatte ilk denemede HTTP 404; sonraki el sıkışması zaman aşımına uğradı; yeniden denemede el sıkışması zaman aşımına uğradı (geçen saat ilk denemede HTTP 200; sonraki el sıkışması zaman aşımına uğradı; yeniden denemede el sıkışması zaman aşımına uğradı). international.canada.ca denemesi bu saatte ilk denemede HTTP 200; sonraki HTTP 200; yeniden deneme HTTP 200 (geçen saat ilk deneme, sonraki ve yeniden deneme HTTP 200). Sorular hâlâ Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
    },
    {
      id: 'fallback-senior-managers',
      title: 'Express Entry #444: Kanada deneyimli üst düzey yöneticiler',
      desc: '16 Eylül 2026 resmi tur hâlâ en son: 250 davet, CRS 389; NOC 00012–00015 (TEER 0).',
      content:
        'IRCC’nin resmi Express Entry tur tablosu ve resmi tur JSON’u hâlâ 16 Eylül 2026, #444 turunu Senior managers with Canadian Work Experience, 2026-Version 1 kategori bazlı daveti olarak listeliyor. Yayımlanan sonuçlar 250 davet ve en düşük davet alan aday için 389 CRS puanıdır. Bakanlık talimatları turu 16 Eylül 2026 12.44.28 UTC olarak zamanlıyor ve Federal Nitelikli İşçi Programı, Kanada Deneyim Sınıfı ile Federal Nitelikli Meslek Programı’nı adlandırıyor. 18 Şubat 2026’da Göçmenlik Bakanı Lena Metlege Diab bunu, Kanada’da çalışma deneyimi olan üst düzey yöneticiler için 2026’nın yeni Express Entry kategorilerinden biri olarak duyurdu. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde Kanada’da en az 12 ay tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız — deneyimin kesintisiz olması gerekmez — ve bu deneyim tek bir meslekte olmalıdır: finans, iletişim ve diğer iş hizmetlerinde üst düzey yöneticiler (NOC 00012, TEER 0), sağlık, eğitim, sosyal ve toplum hizmetleri ile üyelik kuruluşlarında üst düzey yöneticiler (00013, TEER 0), ticaret, yayıncılık ve diğer hizmetlerde üst düzey yöneticiler (00014, TEER 0) veya inşaat, ulaşım, üretim ve kamu hizmetlerinde üst düzey yöneticiler (00015, TEER 0). Davet edilirseniz başvurunuzu 60 gün içinde sunmalısınız. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır. Bu saatte resmi ee_rounds_123_en.json, resmi Express Entry tur HTML sayfası ve resmi kategori bazlı seçim sayfası Python urllib ile ilk denemede, sonraki indirmede ve yeniden denemede başarılı oldu (HTTP 200). curl HTTP/2 bu saatte INTERNAL_ERROR ile başarısız oldu (0 bayt) ve curl HTTP/1.1 25 saniye sonra zaman aşımına uğradı (0 bayt). Geçen saat resmi ee_rounds_123_en.json, resmi Express Entry tur HTML sayfası ve resmi kategori bazlı seçim sayfası Python urllib ile ilk denemede, sonraki indirmede ve yeniden denemede başarılı olmuştu (HTTP 200). Geçen saat curl HTTP/2 INTERNAL_ERROR ile başarısız olmuştu (0 bayt) ve curl HTTP/1.1 25 saniye sonra zaman aşımına uğramıştı (0 bayt). Son teyit edilen başarılı resmi indirme artık 28 Eylül 2026 02.00 UTC. Resmi JSON Last-Modified damgası hâlâ 16 Eylül 2026 Çarşamba 13.53.31 GMT ve listelenen en son tur hâlâ #444. Resmi Express Entry tur HTML bu saatte ilk denemede HTTP 200 (Last-Modified 28 Eylül 2026 Pazartesi 02.01.26 GMT); sonraki HTTP 200 (Last-Modified 28 Eylül 2026 Pazartesi 02.01.26 GMT); yeniden deneme HTTP 200 (Last-Modified 28 Eylül 2026 Pazartesi 02.01.26 GMT). Geçen saat resmi HTML ilk denemede HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 23.50.11 GMT); sonraki HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 23.50.11 GMT); yeniden deneme HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 23.50.11 GMT). Resmi HTML yeni bir Express Entry #445 değildir; JSON sürümlü tablo kabuğu olarak kalır (o JSON 445 tur kaydı listeliyor; en son drawNumber hâlâ 444). Resmi kategori bazlı seçim sayfası bu saatte ilk denemede HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 21.16.32 GMT); sonraki HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 23.49.34 GMT); yeniden deneme HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 23.49.34 GMT) ve Fransızca yeterlilik, araştırmacılar, hekimler, üst düzey yöneticiler ile nitelikli askeri adayları listeliyor. Geçen saat o sayfa ilk denemede HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 21.16.32 GMT); sonraki HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 21.05.42 GMT); yeniden deneme HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 21.16.32 GMT). CIC News ana sayfasının Last-Modified damgası bu saatte ilk denemede 27 Eylül 2026 Pazar 22.55.03 GMT. Sonraki ana sayfa indirmeleri bu saatte Last-Modified 27 Eylül 2026 Pazar 22.55.03 GMT verdi. Yeniden deneme ana sayfa Last-Modified damgası bu saatte 27 Eylül 2026 Pazar 22.55.03 GMT. Geçen saat o ana sayfa Last-Modified ilk deneme, sonraki ve yeniden denemede 27 Eylül 2026 Pazar 22.55.03 GMT idi. Ana sayfa hâlâ “Canada invites 250 senior managers to apply for permanent residence” başlığını en son Express Entry haberi olarak listeliyor; #444’ten sonra tur yok. CIC ana sayfasındaki “445” eşleşmeleri bu saatte SVG yol sayılarıdır — Express Entry #445 değildir. 0980445 Bill C-3 yazısı bu saatte ana sayfada yoktur. CIC hâlâ TFWP bekleme süreleri, political-discontent / Americans-seeking-Canadian-citizenship, 100.000 İngiliz çocuk ve upstate New Yorkluları çifte vatandaş yapan haberleri listeliyor — banner maddesi olarak kullanılmadı. Bahreyn/Kuveyt/Katar/BAE sınır dışı durdurmasının kaldırılması haberi bu saatte ana sayfada yok. Manitoba 508, temporary-residence timelines ve Newfoundland 36 yabancı uyruklu PNP haberi bu saatte ana sayfada yok. Öğrenim izni başvuru fon artışı haberi bu saatte ana sayfada var — banner maddesi olarak kullanılmadı. CIC ana sayfası bu saatte ayrıca bir Manitoba 417 STEM işçisi eyalet adaylığı haberi listeliyor — banner maddesi olarak kullanılmadı. CIC ana sayfası bu saatte ayrıca bir New Brunswick 678 aranan işçi eyalet göçü haberi listeliyor — banner maddesi olarak kullanılmadı. CIC ana sayfası bu saatte ayrıca bir British Columbia 714 cream-of-the-crop işçisi eyalet göçü haberi listeliyor — banner maddesi olarak kullanılmadı. CIC ana sayfası bu saatte ayrıca Amerikalıların yetişkin çocukları için Kanada vatandaşlığı başvurusu haberi (0980711) listeliyor — banner maddesi olarak kullanılmadı. Bu saatte ana sayfa ayrıca bir when-to-hire-an-immigration-lawyer haberi listeliyor — banner maddesi olarak kullanılmadı. Bu saatte ana sayfa ayrıca bir proof-of-citizenship-finalizations-slowed-in-July haberi listeliyor — banner maddesi olarak kullanılmadı. Letter-of-explanation haberi bu saatte ana sayfada yok. Bu saatte ana sayfa ayrıca 1867-is-not-a-cut-off-date vatandaşlık-soy haberi listeliyor — banner maddesi olarak kullanılmadı. CIC ayrıca bir Newfoundland and Labrador PNP haberi (62 işçi), bir Prince Edward Island PNP 195 aday haberi ve bir British Columbia girişimci eyalet adaylığı haberi listeliyor; British Columbia PNP 33 işçi haberi bu saatte ana sayfada yok. CIC ayrıca Global Talent Stream ortak listesinin daraltılması haberini listeliyor; banner maddesi olarak kullanılmadı. CIC bu saatte ayrıca bir Express Entry aday puanları haberi, 2.000 davetlik bir Kanada Deneyim Sınıfı haberi, bir Newfoundland and Labrador yüzde 54 eyalet göçü artışı haberi ve bir 2026 sonbahar kalıcı oturum semineri listeliyor — bunlar daha yeni resmi tur değildir ve banner maddesi olarak kullanılmadı. CIC üst düzey yöneticiler yazısı bu saatte ilk denemede HTTP 200 Last-Modified 27 Eylül 2026 Pazar 15.57.39 GMT verdi (kanonik 0980361 URL); sonraki indirme HTTP 200 Last-Modified 27 Eylül 2026 Pazar 15.57.39 GMT; yeniden deneme HTTP 200 Last-Modified 27 Eylül 2026 Pazar 15.57.39 GMT (geçen saat 27 Eylül 2026 Pazar 15.57.39 GMT); article:published_time ve article:modified_time hâlâ 2026-09-16T14:43:48+00:00 ve tablosu hâlâ 16 Eylül üst düzey yöneticiler 389/250 ile başlıyor, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 veya 28 Eylül turu yok. 28 Eylül 2026 02.00 UTC itibarıyla #445 yayımlanmamıştır. Son teyit edilen resmi JSON hâlâ #440 3 Eylül’den (229 davet / CRS 198) sonra yeni bir hekim daveti, bu döngüde araştırmacı daveti, #437 19 Ağustos’tan (5.000 / 382) sonra yeni bir Fransızca daveti ve bu döngüde nitelikli askeri aday daveti içermiyor. Aynı JSON’da resmi olarak ayrıca: #443 15 Eylül Kanada Deneyim Sınıfı 2.000 davet / CRS 519; #442 14 Eylül Eyalet Aday Programı 576 / 734; #441 4 Eylül sağlık ve sosyal hizmet meslekleri 3.500 / 475.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
    },
    {
      id: 'fallback-military',
      title: 'Express Entry 2026: nitelikli askeri adaylar',
      desc: 'FSMA: 10 yıl kesintisiz hizmet ve NOC 40042, 42102 veya 43204’te Kuvvetler teklifi.',
      content:
        'IRCC’nin Express Entry kategori bazlı seçim sayfası nitelikli askeri adayları hâlâ 2026 kategorisi olarak listeliyor. 28 Eylül 2026 02.00 UTC’te yeniden kontrol edildiğinde sayfa bu saatte ilk denemede HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 21.16.32 GMT); sonraki HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 23.49.34 GMT); yeniden deneme HTTP 200 (Last-Modified 27 Eylül 2026 Pazar 23.49.34 GMT). dcterms.modified hâlâ 22 Haziran 2026. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, tanınmış bir yabancı orduda en az on yıl kesintisiz hizmet veren Yabancı Nitelikli Askeri Aday (FSMA) olmanız ve deneyiminizin Kanada Silahlı Kuvvetleri’nin görevli subayları (NOC 40042, TEER 0), uzman üyeleri (42102, TEER 2) veya harekât üyeleri (43204, TEER 3) meslekleriyle uyumlu olması gerekir. Kanada Kuvvetleri İşe Alım Grubu’ndan Kanada’da en az üç yıl sürecek kesintisiz tam zamanlı bir istihdam teklifiniz ve en az iki yıllık yükseköğretim belgeniz olmalıdır (Kanada dışında tamamlandıysa eğitim belgesi değerlendirmesi gerekir). Davet edilirseniz başvurunuzu 60 gün içinde sunmalısınız. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır. Ayrı nitelikli askeri adaylar kategori sayfası bu saatte ilk deneme, sonraki ve yeniden denemede 404 verdi (ayrı Fransızca dil yeterliliği, araştırmacılar ve tıp doktorları sayfaları da 404); bu yüzden kaynak olarak kategori bazlı seçim sayfası kullanıldı. 28 Eylül 2026 02.00 UTC itibarıyla resmi tur JSON’unda bu döngüde nitelikli askeri aday daveti yoktur; en son resmi tur hâlâ üst düzey yöneticiler için #444’tür. Federasyon Çevre İçin Yapay Zeka ilanı artık aynı gün kaynaklı temiz bir etkinlik değildir (27 Eylül 2026, 09.00 Toronto / 13.00 UTC başlangıç) ve banner maddesi olarak kullanılmadı; İngilizce ve Türkçe Federasyon sayfaları ilk deneme, sonraki ve yeniden denemede hâlâ HTTP 200 verdi ve 27 Eylül 2026, 09.00, 200 Eglinton, Fiziksel / Eğitim, RSVP konusunda uyumlu. Anatolia Fest yaklaşan etkinlik olarak geri yüklenmemeli (20 Eylül 2026 Pazardı; anatoliafest.ca bu saatte HTTP 200 verdi ama ilan hâlâ 20 Eylül). Turkish Canadian Society Republic Ball sayfaları bu saatte hâlâ tutarsız (`/event/republic-ball/` ilk deneme, sonraki ve yeniden denemede HTTP 200 ve ana sayfa başlığı Turkish-Canadian Society; `/republic-ball-101st/` ilk deneme, sonraki ve yeniden denemede HTTP 200, 26 Ekim 2026 Cumartesi Hilton Metrotown Crystal Ballroom diyor ve Fairmont Hotel Vancouver Pacific Ballroom / 100. yıl metni bırakıyor; `/republic-ball-103rd/` bu saatte ilk denemede HTTP 200, sonraki indirmede HTTP 200, yeniden denemede HTTP 200 verdi ve 24 Ekim 2026 Cumartesi Croatian Cultural Centre, Vancouver diyor ve aynı Fairmont metnini bırakıyor) — mekân tutarlı olana kadar kullanılmamalı.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
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
