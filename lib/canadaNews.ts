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
        desc: 'July 7 NATO launch; 2024 top exports lentils, steel scrap and soybeans; 4,650 Turkish study permits.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, on the margins of the NATO Summit in Ankara, Prime Minister Mark Carney and President Recep Tayyip Erdoğan announced the launch of talks toward a comprehensive, modern, and mutually beneficial FTA. Their joint statement said closer economic cooperation will support economic growth, job creation, enhance competitiveness, strengthen supply chains, and help businesses succeed in a dynamic global economy. The Prime Minister’s readout of the meeting said the leaders also expressed interest in deepening partnerships in defence, critical minerals, energy, and advanced technologies, including aerospace. In the coming months, technical teams will define the scope and ambition of the agreement and prepare for the first round of negotiations. Public consultations ran from July 31 to September 14, 2026. GAC’s relations page notes diplomatic ties since Türkiye opened an embassy in Ottawa in 1944 and Canada appointed its first ambassador in 1947, and that Canada welcomes a Turkish diaspora of over 65,000, concentrated in Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary and Edmonton. In 2024 two-way merchandise trade was over $4.3 billion, with Canadian exports of $1.3 billion and imports from Türkiye of $3.1 billion. Canada’s top 2024 exports to Türkiye were lentils and chickpeas ($393 million), iron and steel waste and scrap ($167 million), and soybeans ($113 million). On December 31, 2024, 4,650 Turkish citizens held valid study permits in Canada, a return to 2022 levels and a 23% decrease from 2023. GAC notes opportunities in agriculture, energy, ICT, life sciences, transportation, cleantech, mining, education and infrastructure. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-education',
        title: 'Express Entry 2026: education occupations',
        desc: 'Teachers, ECEs and teacher assistants need 12 months in one eligible NOC.',
        content:
          'IRCC’s current Express Entry category-based rounds include education occupations. IRCC introduced the category in 2025 to align federal economic selection with long-term labour shortages in teaching and child care — teachers, child care educators and instructors of persons with disabilities — and the same group remains on the 2026 category-based selection list. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you must have accumulated, within the past three years, at least 12 months of full-time work experience (or an equal amount of part-time experience) in a single occupation on IRCC’s list, in Canada or abroad — this experience does not need to be continuous, and it does not have to be your primary occupation. The 2026 education list is secondary school teachers (NOC 41220, TEER 1), elementary school and kindergarten teachers (41221, TEER 1), early childhood educators and assistants (42202, TEER 2), instructors of persons with disabilities (42203, TEER 2), and elementary and secondary school teacher assistants (43100, TEER 3). Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'Free Turkish Culture, Art & Taste Festival this Sunday, 12 p.m.–8 p.m., with a book fair.',
        content:
          'Anatolia Fest: Turkish Culture, Art & Taste Festival returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. Sankofa Square lists the free, family-friendly festival with Turkish cuisine, traditional arts, live music and cultural performances, hands-on activities, and a Turkish book fair, sponsored by Turkish Airlines and GoTürkiye. kutuphane.ca, the festival host, frames Anatolia Fest Vol. 3 as music, dance, cuisine, and arts from Türkiye in the heart of the city. After the 2016 and 2017 festivals, anatoliafest.ca describes the 3rd edition as a reunion and a bridge reconnecting the community. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: '7 Temmuz NATO lansmanı; 2024 başlıca ihracat mercimek, çelik hurdası ve soya; 4.650 Türk öğrenim izni.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da, Ankara’daki NATO Zirvesi marjında Başbakan Mark Carney ve Cumhurbaşkanı Recep Tayyip Erdoğan kapsamlı, modern ve karşılıklı yarar sağlayan bir STA müzakeresinin başlatıldığını duyurdu. Ortak açıklamada daha yakın ekonomik iş birliğinin büyümeyi ve istihdamı destekleyeceği, rekabet gücünü artıracağı, tedarik zincirlerini güçlendireceği ve işletmelerin dinamik küresel ekonomide başarılı olmasına yardımcı olacağı belirtildi. Başbakanlık toplantı özetine göre liderler savunma, kritik mineraller, enerji ve havacılık dahil ileri teknolojilerde ortaklığı derinleştirme ilgisi de dile getirdi. Önümüzdeki aylarda teknik ekipler anlaşmanın kapsamı ve hedefini belirleyecek ve ilk müzakere turuna hazırlanacak. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfasına göre diplomatik bağlar Türkiye’nin 1944’te Ottawa’da büyükelçilik açması ve Kanada’nın 1947’de ilk büyükelçisini atamasıyla kuruldu; Kanada, çoğunluğu Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary ve Edmonton’da yaşayan 65.000’den fazla Türk diasporasını karşılıyor. 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı; Kanada ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar oldu. 2024’te Türkiye’ye başlıca Kanada ihracatı mercimek ve nohut (393 milyon dolar), demir ve çelik hurdası (167 milyon) ile soya fasulyesi (113 milyon) idi. 31 Aralık 2024’te 4.650 Türk vatandaşı Kanada’da geçerli öğrenim iznine sahipti; bu 2022 düzeyine dönüş ve 2023’e göre %23 azalma anlamına geliyor. GAC tarım, enerji, BİT, yaşam bilimleri, ulaşım, temiz teknoloji, madencilik, eğitim ve altyapıda fırsatlar olduğunu belirtiyor. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-education',
      title: 'Express Entry 2026: eğitim meslekleri',
      desc: 'Öğretmenler, okul öncesi eğitimciler ve öğretmen yardımcıları için tek NOC’ta 12 ay.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları eğitim mesleklerini kapsıyor. IRCC bu kategoriyi 2025’te öğretim ve çocuk bakımındaki uzun vadeli işgücü açıklarına — öğretmenler, çocuk bakımı eğitimcileri ve engelli kişilerin eğitmenleri — hizalamak için ekledi; aynı grup 2026 kategori bazlı seçim listesinde duruyor. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, son üç yıl içinde IRCC listesindeki tek bir meslekte, Kanada’da veya yurt dışında, en az 12 aylık tam zamanlı (veya eşdeğer yarı zamanlı) iş deneyimi biriktirmiş olmalısınız; deneyimin kesintisiz olması veya asıl mesleğiniz olması gerekmez. 2026 eğitim listesinde ortaokul/lise öğretmenleri (NOC 41220, TEER 1), ilkokul ve anaokulu öğretmenleri (41221, TEER 1), okul öncesi eğitimciler ve yardımcıları (42202, TEER 2), engelli kişilerin eğitmenleri (42203, TEER 2) ile ilkokul ve ortaokul öğretmen yardımcıları (43100, TEER 3) yer alıyor. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Ücretsiz Türk Kültürü, Sanat ve Tat Festivali bu Pazar 12.00–20.00; kitap fuarı da var.',
      content:
        'Anatolia Fest: Türk Kültürü, Sanat ve Tat Festivali bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. Sankofa Square ücretsiz, aile dostu festivali Türk mutfağı, geleneksel sanatlar, canlı müzik ve kültürel gösteriler, uygulamalı etkinlikler ve Türk kitap fuarı olarak listeliyor; etkinliğin sponsorları Turkish Airlines ve GoTürkiye. Festivalin ev sahibi kutuphane.ca, Anatolia Fest Vol. 3’ü kentin kalbinde Türkiye’den müzik, dans, mutfak ve sanat olarak tanımlıyor. 2016 ve 2017 festivallerinin ardından anatoliafest.ca 3. edisyonu bir yeniden birleşme ve toplumla köprü olarak anlatıyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
