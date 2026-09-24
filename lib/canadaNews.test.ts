import assert from 'node:assert/strict';
import { combineBannerItems, getDefaultCanadaNews, mapNewsToBannerItem } from './canadaNews';
import type { BannerAd } from '../types';

const fallback = (title: string) => `https://example.com/${encodeURIComponent(title)}`;

const ads: BannerAd[] = [
  {
    id: 'ad-1',
    title: 'Turkish Airlines - Special Offers',
    url: 'https://img.example/ad.jpg',
    type: 'image',
    link: 'https://turkishairlines.com',
    active: true,
  },
  {
    id: 'news-dup',
    title: 'Canada–Türkiye FTA consultations closed',
    url: 'https://img.example/news.jpg',
    type: 'news',
    link: '#',
    active: true,
    desc: 'Already approved',
  },
];

const withNews = combineBannerItems(ads, getDefaultCanadaNews('en'), true, 'en', fallback);
assert.equal(withNews[0].type, 'news');
assert.equal(withNews[0].isLiveNews, true);
assert.ok(withNews.some((item) => item.id === 'ad-1'));
assert.equal(
  withNews.filter((item) => item.title === 'Canada–Türkiye FTA consultations closed').length,
  1,
  'approved news should not be duplicated by live feed',
);

const adsOnly = combineBannerItems(ads, getDefaultCanadaNews('en'), false, 'en', fallback);
assert.equal(adsOnly.length, 2);
assert.ok(adsOnly.every((item) => !item.isLiveNews));

const emptyAds = combineBannerItems([], [], true, 'tr', fallback);
assert.equal(emptyAds.length, 3);
assert.ok(emptyAds.every((item) => item.isLiveNews && item.type === 'news'));
assert.ok(emptyAds[0].title.length > 0);

const enNews = getDefaultCanadaNews('en');
const trNews = getDefaultCanadaNews('tr');
assert.equal(enNews.length, 3);
assert.equal(trNews.length, 3);
assert.match(enNews[0].title, /FTA|Türkiye/);
assert.match(trNews[0].title, /STA|Türkiye/);
assert.match(enNews[0].title, /consultations closed/i);
assert.match(trNews[0].title, /istişareleri kapandı/i);
assert.doesNotMatch(enNews[0].title, /Last day|comments/i);
assert.doesNotMatch(trNews[0].title, /Son gün|görüşleri/i);
assert.match(enNews[0].content, /Current status: Closed|consultation page still lists|conducted public consultations|what-we-heard report has not yet been published|in negotiations|NATO Summit|4\.3 billion|TCE-Consultations/);
assert.match(trNews[0].content, /Current status: Closed|conducted public consultations|henüz yayımlanmamış|müzakerede|NATO Zirvesi|4,3 milyar|TCE-Consultations/);
assert.doesNotMatch(enNews[0].content, /\$3\.3B|3\.3 billion/i);
assert.doesNotMatch(trNews[0].content, /3,3 milyar/i);
assert.match(enNews[0].content, /tugboats|4,650|JETCO|pharmaceutical|Bolat and Sidhu|technical teams/);
assert.match(trNews[0].content, /römorkör|4\.650|JETCO|ilaç|Bolat ve Sidhu|teknik ekipler/);
assert.doesNotMatch(enNews[0].content, /Stewart|Tuzcu/);
assert.doesNotMatch(trNews[0].content, /Stewart|Tuzcu/);
assert.match(enNews[0].link || '', /consultations\/trade\/2026-07-29-turkiye/);
assert.match(enNews[0].content, /07:00 UTC on 24 September 2026/);
assert.match(trNews[0].content, /24 Eylül 2026 07\.00 UTC/);
assert.doesNotMatch(enNews[0].content, /06:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[0].content, /05:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[0].content, /04:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[0].content, /03:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[0].content, /02:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[0].content, /01:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[0].content, /00:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[0].content, /23:00 UTC on 23 September 2026/);
assert.doesNotMatch(trNews[0].content, /24 Eylül 2026 06\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /24 Eylül 2026 05\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /24 Eylül 2026 04\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /24 Eylül 2026 03\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /24 Eylül 2026 02\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /24 Eylül 2026 01\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /24 Eylül 2026 00\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /23 Eylül 2026 23\.00 UTC/);
assert.match(enNews[0].content, /consultation \/report first try 404; later 404; \/what-we-heard first try 404; later 404/);
assert.match(trNews[0].content, /istişare \/report ilk denemede 404; sonraki 404; \/what-we-heard ilk denemede 404; sonraki 404/);
assert.doesNotMatch(enNews[0].content, /\/what-we-heard first try SSL handshake timed out; later 404/);
assert.doesNotMatch(trNews[0].content, /\/what-we-heard ilk denemede SSL el sıkışmasında zaman aşımına uğradı; sonraki 404/);
assert.match(enNews[0].content, /JETCO page first try this hour SSL handshake timed out; a later fetch SSL handshake timed out; retry HTTP 200/);
assert.match(trNews[0].content, /JETCO sayfasında bu saatte ilk deneme SSL el sıkışmasında zaman aşımına uğradı; sonraki bir JETCO indirmesi SSL el sıkışmasında zaman aşımına uğradı; yeniden deneme HTTP 200 verdi/);
assert.doesNotMatch(enNews[0].content, /JETCO page first try this hour HTTP 200/);
assert.doesNotMatch(trNews[0].content, /JETCO sayfasında bu saatte ilk deneme HTTP 200/);
assert.match(enNews[0].content, /first try this hour HTTP 200; a later fetch also HTTP 200/);
assert.match(trNews[0].content, /ilk deneme bu saatte HTTP 200; sonraki bir indirme de HTTP 200 verdi/);
assert.match(enNews[0].content, /FTA info page first try this hour HTTP 200; a later fetch also HTTP 200/);
assert.match(trNews[0].content, /STA bilgi sayfası bu saatte ilk denemede HTTP 200 verdi; sonraki bir indirme de HTTP 200 verdi/);
assert.doesNotMatch(enNews[0].content, /retry SSL handshake timed out/);
assert.doesNotMatch(trNews[0].content, /yeniden deneme SSL el sıkışmasında zaman aşımına uğradı/);

assert.match(enNews[1].title, /Express Entry|senior managers/i);
assert.match(trNews[1].title, /Express Entry|üst düzey yönetici/i);
assert.match(enNews[1].content, /#444|00012|00013|00014|00015|12 months|TEER 0|250|389/);
assert.match(trNews[1].content, /#444|00012|00013|00014|00015|12 ay|TEER 0|250|389/);
assert.match(enNews[1].content, /official rounds JSON|rounds table/i);
assert.match(trNews[1].content, /resmi tur JSON|tur tablosu/i);
assert.match(enNews[1].content, /no #445 has been published|no round after #444/i);
assert.match(trNews[1].content, /#445 yayımlanmamıştır|#444.ten sonra/i);
assert.match(enNews[1].content, /13:53:31 GMT/);
assert.match(trNews[1].content, /13\.53\.31 GMT/);
assert.match(enNews[1].content, /00:04:12 GMT/);
assert.match(trNews[1].content, /00\.04\.12 GMT/);
assert.doesNotMatch(enNews[1].content, /21:21:40 GMT/);
assert.doesNotMatch(trNews[1].content, /21\.21\.40 GMT/);
assert.doesNotMatch(enNews[1].content, /23:02:11 GMT/);
assert.doesNotMatch(trNews[1].content, /23\.02\.11 GMT/);
assert.doesNotMatch(enNews[1].content, /23:08:06 GMT/);
assert.doesNotMatch(trNews[1].content, /23\.08\.06 GMT/);
assert.match(enNews[1].content, /06:23:29 GMT/);
assert.match(trNews[1].content, /06\.23\.29 GMT/);
assert.match(enNews[1].content, /06:28:45 GMT/);
assert.match(trNews[1].content, /06\.28\.45 GMT/);
assert.doesNotMatch(enNews[1].content, /05:17:22 GMT/);
assert.doesNotMatch(enNews[1].content, /06:18:06 GMT/);
assert.doesNotMatch(trNews[1].content, /05\.17\.22 GMT/);
assert.doesNotMatch(trNews[1].content, /06\.18\.06 GMT/);
assert.doesNotMatch(enNews[1].content, /05:14:27 GMT/);
assert.doesNotMatch(trNews[1].content, /05\.14\.27 GMT/);
assert.doesNotMatch(enNews[1].content, /06:18:09 GMT/);
assert.doesNotMatch(trNews[1].content, /06\.18\.09 GMT/);
assert.doesNotMatch(enNews[1].content, /04:35:36 GMT/);
assert.doesNotMatch(enNews[1].content, /04:05:00 GMT/);
assert.doesNotMatch(enNews[1].content, /04:37:34 GMT/);
assert.doesNotMatch(enNews[1].content, /04:08:05 GMT/);
assert.doesNotMatch(trNews[1].content, /04\.35\.36 GMT/);
assert.doesNotMatch(trNews[1].content, /04\.05\.00 GMT/);
assert.doesNotMatch(trNews[1].content, /04\.37\.34 GMT/);
assert.doesNotMatch(trNews[1].content, /04\.08\.05 GMT/);
assert.doesNotMatch(enNews[1].content, /03:14:24 GMT/);
assert.doesNotMatch(enNews[1].content, /03:14:01 GMT/);
assert.doesNotMatch(enNews[1].content, /01:53:11 GMT/);
assert.doesNotMatch(trNews[1].content, /03\.14\.24 GMT/);
assert.doesNotMatch(trNews[1].content, /03\.14\.01 GMT/);
assert.doesNotMatch(trNews[1].content, /01\.53\.11 GMT/);
assert.doesNotMatch(enNews[1].content, /01:58:39 GMT/);
assert.doesNotMatch(trNews[1].content, /01\.58\.39 GMT/);
assert.doesNotMatch(enNews[1].content, /00:32:05 GMT/);
assert.doesNotMatch(trNews[1].content, /00\.32\.05 GMT/);
assert.doesNotMatch(enNews[1].content, /00:37:53 GMT/);
assert.doesNotMatch(trNews[1].content, /00\.37\.53 GMT/);
assert.doesNotMatch(enNews[1].content, /23:51:20 GMT/);
assert.doesNotMatch(trNews[1].content, /23\.51\.20 GMT/);
assert.doesNotMatch(enNews[1].content, /23:51:13 GMT/);
assert.doesNotMatch(trNews[1].content, /23\.51\.13 GMT/);
assert.doesNotMatch(enNews[1].content, /23:49:45 GMT/);
assert.doesNotMatch(trNews[1].content, /23\.49\.45 GMT/);
assert.doesNotMatch(enNews[1].content, /22:29:50 GMT/);
assert.doesNotMatch(trNews[1].content, /22\.29\.50 GMT/);
assert.doesNotMatch(enNews[1].content, /22:38:37 GMT/);
assert.doesNotMatch(trNews[1].content, /22\.38\.37 GMT/);
assert.match(enNews[1].content, /00:00:41 GMT/);
assert.match(trNews[1].content, /00\.00\.41 GMT/);
assert.doesNotMatch(enNews[1].content, /22:01:08 GMT/);
assert.doesNotMatch(trNews[1].content, /22\.01\.08 GMT/);
assert.doesNotMatch(enNews[1].content, /20:57:23 GMT/);
assert.doesNotMatch(trNews[1].content, /20\.57\.23 GMT/);
assert.doesNotMatch(enNews[1].content, /19:56:25 GMT/);
assert.doesNotMatch(trNews[1].content, /19\.56\.25 GMT/);
assert.match(enNews[1].content, /CIC News homepage Last-Modified this hour is Thursday, 24 September 2026 at 06:23:29 GMT on first try/);
assert.match(trNews[1].content, /CIC News ana sayfasının Last-Modified damgası bu saatte ilk denemede 24 Eylül 2026 Perşembe 06\.23\.29 GMT/);
assert.match(enNews[1].content, /Later homepage fetches this hour returned Last-Modified Thursday, 24 September 2026 at 06:23:29 GMT/);
assert.match(trNews[1].content, /Sonraki ana sayfa indirmeleri bu saatte Last-Modified 24 Eylül 2026 Perşembe 06\.23\.29 GMT verdi/);
assert.match(enNews[1].content, /is Thursday, 24 September 2026 at 06:28:45 GMT on the canonical 0980361 URL after first try/);
assert.match(enNews[1].content, /later fetch Last-Modified Thursday, 24 September 2026 at 06:28:45 GMT/);
assert.match(trNews[1].content, /bu saatte ilk denemede 24 Eylül 2026 Perşembe 06\.28\.45 GMT \(kanonik 0980361 URL\)/);
assert.match(trNews[1].content, /sonraki indirme Last-Modified 24 Eylül 2026 Perşembe 06\.28\.45 GMT/);
assert.match(enNews[1].content, /when-to-hire-an-immigration-lawyer/);
assert.match(trNews[1].content, /when-to-hire-an-immigration-lawyer/);
assert.match(enNews[1].content, /proof-of-citizenship-finalizations-slowed-in-July/);
assert.match(trNews[1].content, /proof-of-citizenship-finalizations-slowed-in-July/);
assert.match(enNews[1].content, /lists a Manitoba 508 local-graduates provincial-immigration story/);
assert.match(trNews[1].content, /bir Manitoba 508 yerel mezun eyalet göçü haberi listeliyor/);
assert.doesNotMatch(enNews[1].content, /is not on the homepage this hour/);
assert.doesNotMatch(trNews[1].content, /Manitoba 508 yerel mezun eyalet göçü haberi bu saatte ana sayfada yok/);
assert.match(enNews[1].content, /Temporary Foreign Worker Program wait-times/);
assert.match(trNews[1].content, /Temporary Foreign Worker Program bekleme süreleri/);
assert.match(enNews[1].content, /citizenship-by-descent/);
assert.match(trNews[1].content, /citizenship-by-descent|vatandaşlık-soy/);
assert.match(enNews[1].content, /letter-of-explanation/);
assert.match(trNews[1].content, /letter-of-explanation/);
assert.match(enNews[1].content, /temporary-residence timelines/);
assert.match(trNews[1].content, /temporary-residence timelines/);
assert.match(enNews[1].content, /British Columbia entrepreneurs/);
assert.match(trNews[1].content, /British Columbia girişimci/);
assert.doesNotMatch(enNews[1].content, /Atlantic Immigration Program/);
assert.doesNotMatch(trNews[1].content, /Atlantic Immigration Program/);
assert.match(enNews[1].content, /Newfoundland and Labrador PNP|62 workers/);
assert.match(trNews[1].content, /Newfoundland and Labrador PNP|62 işçi/);
assert.match(enNews[1].content, /36-foreign-national/);
assert.match(trNews[1].content, /36 yabancı uyruklu/);
assert.match(enNews[1].content, /Prince Edward Island PNP|195-candidate/);
assert.match(trNews[1].content, /Prince Edward Island PNP|195 aday/);
assert.match(enNews[1].content, /British Columbia PNP|33 workers/);
assert.match(trNews[1].content, /British Columbia PNP|33 işçi/);
assert.match(enNews[1].content, /study without a permit/);
assert.match(trNews[1].content, /izin olmadan öğrenim/);
assert.match(enNews[1].content, /study-permit funds-hike story is still/);
assert.match(trNews[1].content, /Öğrenim izni başvuru fon artışı haberi bu saatin ana sayfa bağlantıları arasında hâlâ yer alıyor/);
assert.match(enNews[1].content, /Global Talent Stream/);
assert.match(trNews[1].content, /Global Talent Stream/);
assert.match(enNews[1].content, /0980445 Bill C-3/);
assert.match(trNews[1].content, /0980445 Bill C-3/);
assert.match(enNews[1].content, /54% provincial-immigration boost|Fall 2026 permanent-residence webinar/);
assert.match(trNews[1].content, /yüzde 54 eyalet göçü|2026 sonbahar kalıcı oturum/);
assert.match(enNews[1].content, /this hour.s JSON listed 445 round records; latest drawNumber remains 444/);
assert.match(trNews[1].content, /bu saatin JSON’u 445 tur kaydı listeliyor; en son drawNumber hâlâ 444/);
assert.match(enNews[1].content, /JSON-driven table shell rather than a new Express Entry #445/);
assert.match(trNews[1].content, /yeni bir Express Entry #445 değildir/);
assert.match(enNews[1].content, /This hour official ee_rounds_123_en.json and the official Express Entry rounds HTML page succeeded over Python urllib on first try \(HTTP 200\)\. Later official JSON and HTML re-fetches this hour also succeeded \(HTTP 200\)\. curl HTTP\/2 succeeded this hour \(HTTP 200\) and curl HTTP\/1.1 succeeded this hour \(HTTP 200\)/);
assert.match(enNews[1].content, /Last hour those official files succeeded over Python urllib on first try \(HTTP 200\)\. Last hour later official JSON and HTML re-fetches also succeeded \(HTTP 200\)\. Last hour curl HTTP\/2 succeeded \(HTTP 200\) and curl HTTP\/1.1 succeeded \(HTTP 200\)/);
assert.match(enNews[1].content, /last confirmed successful official fetch is now 07:00 UTC on 24 September 2026/);
assert.match(enNews[1].content, /official Express Entry rounds HTML Last-Modified stamp this hour is Thursday, 24 September 2026 at 00:04:12 GMT on first try/);
assert.match(enNews[1].content, /Later HTML Last-Modified this hour is Thursday, 24 September 2026 at 00:04:12 GMT/);
assert.match(enNews[1].content, /category-based selection page returned HTTP 200 this hour on first try \(Last-Modified Thursday, 24 September 2026 at 00:00:41 GMT\)/);
assert.match(enNews[1].content, /a later fetch also returned HTTP 200 \(Last-Modified 00:00:41 GMT\)/);
assert.match(trNews[1].content, /Python urllib ile ilk denemede başarılı oldu \(HTTP 200\)/);
assert.match(trNews[1].content, /Bu saatte resmi ee_rounds_123_en.json ve resmi Express Entry tur HTML sayfası Python urllib ile ilk denemede başarılı oldu \(HTTP 200\)\. Sonraki resmi JSON ve HTML yeniden indirmeleri bu saatte de başarılı oldu \(HTTP 200\)\. curl HTTP\/2 bu saatte başarılı oldu \(HTTP 200\) ve curl HTTP\/1.1 bu saatte başarılı oldu \(HTTP 200\)/);
assert.match(trNews[1].content, /Geçen saat bu resmi dosyalar Python urllib ile ilk denemede başarılı olmuştu \(HTTP 200\)\. Geçen saat sonraki resmi JSON ve HTML yeniden indirmeleri de başarılı olmuştu \(HTTP 200\)\. Geçen saat curl HTTP\/2 başarılı olmuştu \(HTTP 200\) ve curl HTTP\/1.1 başarılı olmuştu \(HTTP 200\)/);
assert.match(trNews[1].content, /artık 24 Eylül 2026 07\.00 UTC/);
assert.match(trNews[1].content, /Resmi Express Entry tur HTML Last-Modified damgası bu saatte ilk denemede 24 Eylül 2026 Perşembe 00\.04\.12 GMT/);
assert.match(trNews[1].content, /Sonraki HTML Last-Modified damgası bu saatte 24 Eylül 2026 Perşembe 00\.04\.12 GMT/);
assert.match(trNews[1].content, /kategori bazlı seçim sayfası bu saatte ilk denemede HTTP 200 verdi \(Last-Modified 24 Eylül 2026 Perşembe 00\.00\.41 GMT\)/);
assert.match(trNews[1].content, /sonraki bir indirme de HTTP 200 verdi \(Last-Modified 00\.00\.41 GMT\)/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 06:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 05:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 04:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 03:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 02:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 01:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 failed this hour/);
assert.doesNotMatch(enNews[1].content, /Last hour curl HTTP\/2 failed/);
assert.doesNotMatch(trNews[1].content, /artık 24 Eylül 2026 06\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 24 Eylül 2026 05\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 24 Eylül 2026 04\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 24 Eylül 2026 03\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 24 Eylül 2026 02\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 24 Eylül 2026 01\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /curl HTTP\/2 bu saatte başarısız oldu/);
assert.doesNotMatch(trNews[1].content, /Geçen saat curl HTTP\/2 başarısız olmuştu/);
assert.match(enNews[1].content, /no September 17, 18, 19, 20, 21, 22, 23 or 24 draw/);
assert.match(trNews[1].content, /17, 18, 19, 20, 21, 22, 23 veya 24 Eylül turu yok/);
assert.match(enNews[1].link || '', /express-entry-rounds/);

assert.match(enNews[2].title, /AI for Climate/i);
assert.match(trNews[2].title, /Çevre İçin Yapay Zeka/i);
assert.match(enNews[2].content, /27 September 2026|09:00|Turkish Community Heritage Centre|200 Eglinton|Vector Institute|Ceren Zeytinoğlu Atıcı/);
assert.match(trNews[2].content, /27 Eylül 2026|09\.00|Türk Toplum Merkezi|200 Eglinton|Vector Institute|Ceren Zeytinoğlu Atıcı/);
assert.match(enNews[2].content, /07:00 UTC on 24 September 2026/);
assert.match(trNews[2].content, /24 Eylül 2026 07\.00 UTC/);
assert.doesNotMatch(enNews[2].content, /06:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[2].content, /05:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[2].content, /04:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[2].content, /03:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[2].content, /02:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[2].content, /01:00 UTC on 24 September 2026/);
assert.doesNotMatch(enNews[2].content, /00:00 UTC on 24 September 2026/);
assert.doesNotMatch(trNews[2].content, /24 Eylül 2026 06\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /24 Eylül 2026 05\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /24 Eylül 2026 04\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /24 Eylül 2026 03\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /24 Eylül 2026 02\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /24 Eylül 2026 01\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /24 Eylül 2026 00\.00 UTC/);
assert.match(enNews[2].content, /turkishfederation.ca\/etkinlik\/ai-for-climate/);
assert.match(trNews[2].link || '', /cevre-icin-yapay-zeka/);
assert.match(enNews[2].link || '', /ai-for-climate/);
assert.match(enNews[2].content, /HTTP 200 on first try and later/);
assert.match(trNews[2].content, /ilk deneme ve sonraki indirmede HTTP 200/);
assert.doesNotMatch(enNews[2].title, /French-language|physicians|skilled military|researchers|Anatolia Fest/i);
assert.doesNotMatch(trNews[2].title, /Fransızca|hekim|nitelikli askeri|araştırmacı|Anatolia Fest/i);
assert.doesNotMatch(enNews[2].content, /NCLC|Sankofa Square|this Sunday|31100|31101|31102|41200|41201|40042|42102|43204|FSMA/i);
assert.doesNotMatch(trNews[2].content, /NCLC|Sankofa Square|bu Pazar|31100|31101|31102|41200|41201|40042|42102|43204|FSMA/i);
assert.match(enNews[2].content, /Do not restore Anatolia Fest/);
assert.match(trNews[2].content, /Anatolia Fest yaklaşan etkinlik olarak geri yüklenmemeli/);
assert.match(enNews[2].content, /venue is consistent/);
assert.match(trNews[2].content, /mekân tutarlı olana kadar/);
assert.match(enNews[2].content, /republic-ball-103rd\/` first try this hour HTTP 200 and later HTTP 200/);
assert.match(trNews[2].content, /republic-ball-103rd\/` bu saatte ilk denemede HTTP 200, sonraki indirmede HTTP 200 verdi/);
assert.doesNotMatch(enNews[2].content, /HTTP 503/);
assert.doesNotMatch(trNews[2].content, /HTTP 503/);
for (const item of [...enNews, ...trNews]) {
  assert.ok(item.link && /^https:\/\//.test(item.link), `sourced link required: ${item.title}`);
  assert.ok(!item.link.includes('google.com/search'), `search-page links are not sources: ${item.title}`);
  assert.ok(item.content && item.content.length > 80, `article body required: ${item.title}`);
}

const mapped = mapNewsToBannerItem(
  { title: 'Toronto Turkish Festival', desc: 'Weekend food market', category: 'Community', link: 'https://example.com' },
  0,
  'en',
  fallback,
);
assert.equal(mapped.type, 'news');
assert.equal(mapped.isLiveNews, true);
assert.equal(mapped.link, 'https://example.com');

assert.doesNotMatch(enNews[1].content, /12:52:26 GMT/);
assert.doesNotMatch(trNews[1].content, /12\.52\.26 GMT/);
assert.doesNotMatch(enNews[1].content, /04:54:54 GMT/);
assert.doesNotMatch(trNews[1].content, /04\.54\.54 GMT/);

console.log('canadaNews tests passed');
