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
        desc: '2024 two-way merchandise trade was over $4.3 billion; Canadian FDI in Türkiye fell to $420 million.',
        content:
          'Global Affairs Canada lists the Canada–Türkiye free trade agreement’s current status as in negotiations. On July 7, 2026, Canada and Türkiye announced the launch of talks toward a bilateral FTA. Public consultations ran from July 31 to September 14, 2026. GAC’s relations page reports that in 2024 two-way merchandise trade was over $4.3 billion, with Canadian merchandise exports totalling $1.3 billion and imports from Türkiye $3.1 billion. Canada’s top 2024 exports to Türkiye were lentils and chickpeas ($393 million), iron and steel waste and scrap ($167 million), and soybeans ($113 million). The stock of Canadian direct investment in Türkiye, mostly in the mining sector, fell from $1 billion in 2022 to $420 million in 2023. Canada welcomes a Turkish diaspora of over 65,000, concentrated in Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary and Edmonton. Questions can be sent to Trade Negotiations Division (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1, or TCE-Consultations@international.gc.ca.',
        category: 'Economy',
        color: 'bg-primary',
        link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
      },
      {
        id: 'fallback-french',
        title: 'Express Entry 2026: French-language category',
        desc: 'NCLC 7 in all four abilities; 50,701 French-category ITAs in 2025, 49.2% of Express Entry invitations.',
        content:
          'IRCC’s current Express Entry category-based rounds include French-language proficiency, listed in February 2026 as the category supporting economic growth through Francophone immigration outside Quebec. To be eligible for a category-based invitation you must meet the minimum criteria for Express Entry, including being eligible for one of the three immigration programs it covers, and meet all requirements in the instructions for that round. For this category, you need French-language test results showing a minimum score of 7 in all four abilities on the Niveaux de compétence linguistique canadiens (NCLC), the French version of the Canadian Language Benchmarks. Candidates who score NCLC 7 or higher in all four French skills can also receive 25 additional Comprehensive Ranking System points if their English is CLB 4 or lower (or they did not take an English test), or 50 points if they scored CLB 5 or higher in all four English skills. IRCC’s 2026 consultations page reports that in 2025, 50,701 French-language category-eligible candidates received an invitation to apply (average CRS 449), accounting for 49.2% of Express Entry invitations excluding Provincial Nominee Program rounds. IRCC also reports French-speaking permanent-resident admissions outside Quebec reached 8.9% in 2025, exceeding the 8.5% target. The 2026–2028 Immigration Levels Plan sets targets of 9% (30,267 admissions) in 2026, 9.5% (31,825) in 2027, and 10.5% (35,175) in 2028, toward a 12% target by 2029. Full details appear in each round’s instructions; IRCC publishes rounds after they run.',
        category: 'Immigration',
        color: 'bg-primary',
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
      },
      {
        id: 'fallback-community',
        title: 'Anatolia Fest This Sunday at Sankofa Square',
        desc: 'This Sunday, 12 p.m.–8 p.m. at 1 Dundas Street East; Turkish coffee, baklava, music and crafts.',
        content:
          'Anatolia Fest returns this Sunday, September 20, 2026, from 12 p.m. to 8 p.m. at Sankofa Square, 1 Dundas Street East in downtown Toronto. After festivals in 2016 and 2017, the 3rd edition is billed as a reunion celebrating Turkish culture, heritage and community. Sankofa Square’s calendar highlights Turkish coffee and baklava, traditional crafts and art, and music and cultural performances. Host kutuphane.ca (Anatolia Fest Vol. 3) invites everyone to traditional music, dance, cuisine and arts from Türkiye in the heart of the city. Follow @anatoliafestca or email info@anatoliafest.ca for updates.',
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
      desc: '2024 iki yönlü mal ticareti 4,3 milyar doları aştı; Kanada’nın Türkiye’deki DYY’si 420 milyon dolara geriledi.',
      content:
        'Küresel İşler Kanada, Kanada–Türkiye serbest ticaret anlaşmasının güncel durumunu müzakerede olarak listeliyor. 7 Temmuz 2026’da Kanada ve Türkiye ikili bir STA müzakeresinin başlatıldığını duyurdu. Kamu istişareleri 31 Temmuz–14 Eylül 2026 tarihleri arasında yapıldı. GAC ilişkiler sayfasına göre 2024’te iki yönlü mal ticareti 4,3 milyar doları aştı; Kanada mal ihracatı 1,3 milyar, Türkiye’den ithalat 3,1 milyar dolar oldu. 2024’te Türkiye’ye başlıca ihracat mercimek ve nohut (393 milyon dolar), demir-çelik hurdası (167 milyon) ve soya fasulyesi (113 milyon) oldu. Kanada’nın Türkiye’deki doğrudan yatırımları, çoğunlukla madencilik sektöründe, 2022’de 1 milyar dolardan 2023’te 420 milyon dolara geriledi. Kanada, çoğunluğu Toronto, Montreal, Vancouver, Ottawa, Hamilton, Calgary ve Edmonton’da yaşayan 65.000’den fazla kişilik Türk diasporasını karşılıyor. Sorular Ticaret Müzakereleri Birimi’ne (TCE), 111 Sussex Drive, Ottawa, ON K1N 1J1 veya TCE-Consultations@international.gc.ca adresine gönderilebilir.',
      category: 'Ekonomi',
      color: 'bg-primary',
      link: 'https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/turkiye/fta-ale/info.aspx?lang=eng',
    },
    {
      id: 'fallback-french',
      title: 'Express Entry 2026: Fransızca yeterlilik kategorisi',
      desc: 'Dört beceride NCLC 7; 2025’te 50.701 Fransızca kategori daveti, Express Entry davetlerinin %49,2’si.',
      content:
        'IRCC’nin güncel Express Entry kategori bazlı turları Fransızca dil yeterliliğini kapsıyor; Şubat 2026’da Quebec dışı Frankofon göç yoluyla ekonomik büyümeyi destekleyen kategori olarak listelendi. Kategori bazlı davet için Express Entry asgari ölçütlerini, kapsadığı üç göçmenlik programından birine uygunluğu ve o turun talimatlarındaki tüm şartları karşılamanız gerekir. Bu kategoride, Niveaux de compétence linguistique canadiens (NCLC) — Kanada Dil Ölçütleri’nin Fransızca sürümü — ölçeğinde dört becerinin tümünde en az 7 puan gösteren Fransızca sınav sonuçlarınız olmalıdır. Dört Fransızca becerisinde NCLC 7 veya üzeri alan adaylar, İngilizcesi CLB 4 veya altındaysa (ya da İngilizce sınavı yoksa) Kapsamlı Sıralama Sistemi’nde 25 ek puan, dört İngilizce becerisinde CLB 5 veya üzeri almışlarsa 50 ek puan da kazanabilir. IRCC’nin 2026 istişare sayfasına göre 2025’te Fransızca kategoriye uygun 50.701 aday davet aldı (ortalama CRS 449); bu, Eyalet Aday Programı turları hariç Express Entry davetlerinin %49,2’sini oluşturdu. IRCC ayrıca Quebec dışı Fransızca konuşan kalıcı oturum alımlarının 2025’te %8,9’a ulaştığını ve %8,5 hedefini aştığını bildiriyor. 2026–2028 Göçmenlik Seviyeleri Planı 2026’da %9 (30.267 alım), 2027’de %9,5 (31.825) ve 2028’de %10,5 (35.175) hedeflerini koyuyor; 2029’da %12 hedefine giden yol bu. Ayrıntılar her turun talimatlarında yer alır; turlar gerçekleştikten sonra yayımlanır.',
      category: 'Göçmenlik',
      color: 'bg-primary',
      link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      id: 'fallback-community',
      title: 'Anatolia Fest bu Pazar Toronto’da',
      desc: 'Bu Pazar 12.00–20.00, 1 Dundas Street East; Türk kahvesi, baklava, müzik ve el sanatları.',
      content:
        'Anatolia Fest bu Pazar, 20 Eylül 2026, 12.00–20.00 saatleri arasında Toronto merkezindeki Sankofa Square’de, 1 Dundas Street East adresinde geri dönüyor. 2016 ve 2017 festivallerinin ardından 3. edisyon, Türk kültürü, mirası ve toplumunun kutlandığı bir yeniden birleşme olarak anlatılıyor. Sankofa Square takvimi Türk kahvesi ve baklava, geleneksel el sanatları ve sanat ile müzik ve kültürel gösterileri öne çıkarıyor. Ev sahibi kutuphane.ca (Anatolia Fest Vol. 3) herkesi kentin kalbinde Türkiye’den geleneksel müzik, dans, mutfak ve sanata davet ediyor. Güncellemeler için @anatoliafestca hesabını takip edin veya info@anatoliafest.ca adresine yazın.',
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
