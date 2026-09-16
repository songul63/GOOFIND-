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
        desc: 'Early June exploratory talks then July 7 launch; 2024 top exports lentils, steel scrap and soybeans.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. The Prime Minister’s July 7, 2026 joint statement notes that in early June 2026, Trade Ministers Bolat and Sidhu issued a Joint Ministerial Statement on Economic Partnership announcing exploratory discussions toward a comprehensive FTA. On July 7, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan then announced the formal launch of negotiations toward a comprehensive, modern, and mutually beneficial FTA. Their statement said closer economic cooperation will support economic growth, job creation, competitiveness and supply chains, and that in the coming months technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. GAC’s relations page notes diplomatic ties since Türkiye opened an embassy in Ottawa in 1944 and Canada appointed its first ambassador in 1947, and that Canada welcomes a Turkish diaspora of over 65,000, concentrated in Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary and Edmonton. In 2024 two-way merchandise trade was over $4.3 billion — Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion — and Canada’s top 2024 exports to Türkiye were lentils and chickpeas ($393 million), iron and steel waste and scrap ($167 million), and soybeans ($113 million). Opportunities exist particularly in agriculture, energy, information and communication technologies, life sciences, transportation, cleantech, mining, education and infrastructure. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-education',
        title: 'Express Entry 2026: education occupations',
        desc: 'Teachers and ECEs need 12 months in one eligible NOC; 9,200 education ITAs in 2025, 8.9% of invitations.',
        content:
          'IRCC’s current Express Entry category-based rounds include education occupations, listed among the 2026 categories that help address long-term labour shortages. IRCC introduced the category in 2025 to align federal economic selection with teaching and child-care shortages — teachers, child care educators and instructors of persons with disabilities — after 2024 consultations showed support, particularly for daycare shortages; the same five occupations remain on the 2026 list. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list — in Canada or abroad. This experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 education list is secondary school teachers (NOC 41220, TEER 1), elementary school and kindergarten teachers (41221, TEER 1), early childhood educators and assistants (42202, TEER 2), instructors of persons with disabilities (42203, TEER 2), and elementary and secondary school teacher assistants (43100, TEER 3). IRCC’s 2026 consultations page reports that in 2025, 9,200 education category-eligible candidates received an invitation to apply (36% already in Canada; average CRS 459, range 379–619), accounting for 8.9% of Express Entry invitations excluding Provincial Nominee Program rounds. Public consultations on economic priorities and categories for 2027 ran from August 4 to September 1, 2026; the department is considering a continued focus on addressing long-term labour shortages, including in education, so Canadians have timely access to education services. IRCC also notes that many candidates invited through the French-language proficiency category are also eligible for education. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'This Sunday, 12 p.m.–8 p.m. at 1 Dundas Street East; 3rd edition with coffee, baklava, music and crafts.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. After festivals in 2016 and 2017, anatoliafest.ca frames the long-awaited 3rd edition as a reunion and a celebration of heritage — Turkish coffee and baklava, music, crafts and regional art. Host kutuphane.ca (Anatolia Fest Vol. 3) invites everyone to traditional music, dance, cuisine and arts from Türkiye in the heart of the city. Sankofa Square lists the gathering as a celebration of Turkish culture, heritage and community. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: 'Haziran başı keşif görüşmeleri, ardından 7 Temmuz lansmanı; 2024 başlıca ihracat mercimek, çelik hurdası ve soya.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. Başbakanlığın 7 Temmuz 2026 ortak açıklamasına göre, 2026 Haziran başında Ticaret Bakanları Bolat ve Sidhu, kapsamlı bir STA’ya yönelik keşif görüşmelerini duyuran Ekonomik Ortaklık Ortak Bakanlar Bildirisini yayımladı. 7 Temmuz’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin resmen başlatıldığını duyurdu. Ortak açıklamada daha yakın ekonomik iş birliğinin büyümeyi, istihdamı, rekabet gücünü ve tedarik zincirlerini destekleyeceği belirtildi; önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfasına göre diplomatik bağlar Türkiye’nin 1944’te Ottawa’da büyükelçilik açması ve Kanada’nın 1947’de ilk büyükelçisini atamasıyla kuruldu; Kanada, çoğunluğu Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary ve Edmonton’da yaşayan 65.000’den fazla Türk diasporasını karşılıyor. 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı — Kanada mal ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar — ve 2024’te Türkiye’ye başlıca Kanada ihracatı mercimek ve nohut (393 milyon dolar), demir ve çelik hurdası (167 milyon) ile soya fasulyesi (113 milyon) oldu. Fırsatlar özellikle tarım, enerji, BİT, yaşam bilimleri, ulaşım, temiz teknoloji, madencilik, eğitim ve altyapı sektörlerinde. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-education',
      title: 'Express Entry 2026: eğitim meslekleri',
      desc: 'Öğretmenler ve okul öncesi eğitimciler için tek NOC’ta 12 ay; 2025’te 9.200 eğitim daveti, davetlerin %8,9’u.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları eğitim mesleklerini kapsıyor; 2026’da uzun vadeli işgücü açıklarını gidermeye yardımcı kategoriler arasında listelendi. IRCC bu kategoriyi 2025’te öğretim ve çocuk bakımındaki açıklarla — öğretmenler, çocuk bakımı eğitimcileri ve engelli kişilerin eğitmenleri — hizalamak için ekledi; 2024 istişareleri özellikle kreş açıklarına destek gösterdi ve aynı beş meslek 2026 listesinde duruyor. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da veya yurt dışında, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 eğitim listesinde ortaokul/lise öğretmenleri (NOC 41220, TEER 1), ilkokul ve anaokulu öğretmenleri (41221, TEER 1), okul öncesi eğitimciler ve yardımcıları (42202, TEER 2), engelli kişilerin eğitmenleri (42203, TEER 2) ile ilkokul ve ortaokul öğretmen yardımcıları (43100, TEER 3) yer alıyor. IRCC’nin 2026 istişare sayfasına göre 2025’te eğitim kategorisine uygun 9.200 aday davet aldı (yüzde 36’sı zaten Kanada’daydı; ortalama CRS 459, aralık 379–619); bu, Eyalet Aday Programı turları hariç Express Entry davetlerinin %8,9’unu oluşturdu. 2027 ekonomik öncelikleri ve kategorilerine ilişkin kamu istişareleri 4 Ağustos–1 Eylül 2026 tarihleri arasında yapıldı; bakanlık eğitim dahil uzun vadeli işgücü açıklarına odaklanmayı sürdürmeyi değerlendiriyor, böylece Kanada’da eğitim hizmetlerine zamanında erişim sağlansın. IRCC, Fransızca yeterlilik kategorisinden davet alan birçok adayın eğitim kategorisine de uygun olduğunu belirtiyor. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Bu Pazar 12.00–20.00, 1 Dundas Street East; 3. edisyon — kahve, baklava, müzik ve el sanatları.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. 2016 ve 2017 festivallerinin ardından anatoliafest.ca uzun zamandır beklenen 3. edisyonu bir yeniden birleşme ve miras kutlaması olarak anlatıyor — Türk kahvesi ve baklava, müzik, el sanatları ve yöresel sanat. Ev sahibi kutuphane.ca (Anatolia Fest Vol. 3) herkesi kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanata davet ediyor. Sankofa Square buluşmayı Türk kültürü, mirası ve topluluğunun kutlanması olarak listeliyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
