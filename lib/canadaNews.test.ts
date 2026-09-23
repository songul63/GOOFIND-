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
assert.match(enNews[0].content, /15:00 UTC on 23 September 2026/);
assert.match(trNews[0].content, /23 Eylül 2026 15\.00 UTC/);
assert.doesNotMatch(enNews[0].content, /18:00 UTC on 22 September 2026/);
assert.doesNotMatch(trNews[0].content, /22 Eylül 2026 18\.00 UTC/);
assert.match(enNews[0].content, /consultation \/report 404 both tries; \/what-we-heard 404 both tries/);
assert.match(trNews[0].content, /istişare \/report her iki denemede 404; \/what-we-heard her iki denemede 404/);
assert.doesNotMatch(enNews[0].content, /SSL handshake timed out/);
assert.doesNotMatch(trNews[0].content, /SSL el sıkışmasında zaman aşımı/);
assert.match(enNews[0].content, /JETCO page first try and retry this hour HTTP 200/);
assert.match(trNews[0].content, /JETCO sayfasında bu saatte ilk deneme ve yeniden deneme HTTP 200/);
assert.match(enNews[0].content, /first try and retry this hour HTTP 200/);
assert.match(trNews[0].content, /ilk deneme ve yeniden deneme bu saatte HTTP 200/);
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
assert.match(enNews[1].content, /15:19:28 GMT/);
assert.match(trNews[1].content, /15\.19\.28 GMT/);
assert.match(enNews[1].content, /14:14:47 GMT/);
assert.match(trNews[1].content, /14\.14\.47 GMT/);
assert.match(enNews[1].content, /14:12:51 GMT/);
assert.match(trNews[1].content, /14\.12\.51 GMT/);
assert.match(enNews[1].content, /13:10:53 GMT/);
assert.match(trNews[1].content, /13\.10\.53 GMT/);
assert.doesNotMatch(enNews[1].content, /17:55:15 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.55\.15 GMT/);
assert.doesNotMatch(enNews[1].content, /17:00:40 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.00\.40 GMT/);
assert.doesNotMatch(enNews[1].content, /15:39:11 GMT/);
assert.doesNotMatch(trNews[1].content, /15\.39\.11 GMT/);
assert.doesNotMatch(enNews[1].content, /18:04:44 GMT/);
assert.doesNotMatch(trNews[1].content, /18\.04\.44 GMT/);
assert.doesNotMatch(enNews[1].content, /14:22:01 GMT/);
assert.doesNotMatch(trNews[1].content, /14\.22\.01 GMT/);
assert.doesNotMatch(enNews[1].content, /17:58:41 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.58\.41 GMT/);
assert.match(enNews[1].content, /CIC News homepage Last-Modified this hour is Wednesday, 23 September 2026 at 14:14:47 GMT after three consistent fetches/);
assert.match(trNews[1].content, /CIC News ana sayfasının Last-Modified damgası bu saatte 23 Eylül 2026 Çarşamba 14\.14\.47 GMT \(üç tutarlı indirme\)/);
assert.match(enNews[1].content, /This hour all three fetches were 14:14:47 GMT/);
assert.match(trNews[1].content, /Bu saatte üç indirme de 14\.14\.47 GMT idi/);
assert.match(enNews[1].content, /is Wednesday, 23 September 2026 at 14:12:51 GMT on the canonical 0980361 URL after three consistent fetches/);
assert.match(trNews[1].content, /bu saatte 23 Eylül 2026 Çarşamba 14\.12\.51 GMT \(kanonik 0980361 URL; üç tutarlı indirme\)/);
assert.match(enNews[1].content, /citizenship-by-descent/);
assert.match(trNews[1].content, /citizenship-by-descent|vatandaşlık-soy/);
assert.match(enNews[1].content, /letter-of-explanation/);
assert.match(trNews[1].content, /letter-of-explanation/);
assert.match(enNews[1].content, /temporary-residence timelines/);
assert.match(trNews[1].content, /temporary-residence timelines/);
assert.doesNotMatch(enNews[1].content, /Atlantic Immigration Program/);
assert.doesNotMatch(trNews[1].content, /Atlantic Immigration Program/);
assert.match(enNews[1].content, /Newfoundland and Labrador PNP|62 workers/);
assert.match(trNews[1].content, /Newfoundland and Labrador PNP|62 işçi/);
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
assert.match(enNews[1].content, /This hour official ee_rounds_123_en.json and the official Express Entry rounds HTML page succeeded over Python urllib on first try and retry \(HTTP 200\)\. curl HTTP\/2 also succeeded this hour \(HTTP 200\) and curl HTTP\/1.1 also succeeded this hour \(HTTP 200\)/);
assert.match(enNews[1].content, /Last hour those official files succeeded over Python urllib on first try and retry \(HTTP 200\)\. Last hour curl HTTP\/2 failed \(HTTP\/2 stream INTERNAL_ERROR, 0 bytes\) and curl HTTP\/1.1 timed out after 25 seconds \(0 bytes\)/);
assert.match(enNews[1].content, /last confirmed successful official fetch is now 15:00 UTC on 23 September 2026/);
assert.match(enNews[1].content, /official Express Entry rounds HTML Last-Modified stamp this hour is Wednesday, 23 September 2026 at 15:19:28 GMT/);
assert.match(enNews[1].content, /category-based selection page returned HTTP 200 this hour on first try and retry \(first-try Last-Modified Wednesday, 23 September 2026 at 13:10:53 GMT; retry Last-Modified Wednesday, 23 September 2026 at 13:10:53 GMT\)/);
assert.match(enNews[1].content, /Later official JSON and category-page re-fetches this hour also succeeded \(HTTP 200\); later HTML re-fetch also HTTP 200 \(LM 15:19:28 GMT\)\. A still-later HTML re-fetch timed out/);
assert.match(enNews[1].content, /a later fetch also returned HTTP 200 \(Last-Modified 13:10:53 GMT\)/);
assert.match(trNews[1].content, /Python urllib ile ilk deneme ve yeniden denemede başarılı oldu \(HTTP 200\)/);
assert.match(trNews[1].content, /Bu saatte resmi ee_rounds_123_en.json ve resmi Express Entry tur HTML sayfası Python urllib ile ilk deneme ve yeniden denemede başarılı oldu \(HTTP 200\)\. curl HTTP\/2 bu saatte de başarılı oldu \(HTTP 200\) ve curl HTTP\/1.1 bu saatte de başarılı oldu \(HTTP 200\)/);
assert.match(trNews[1].content, /Geçen saat bu resmi dosyalar Python urllib ile ilk deneme ve yeniden denemede başarılı olmuştu \(HTTP 200\)\. Geçen saat curl HTTP\/2 başarısız olmuştu \(HTTP\/2 akışı INTERNAL_ERROR, 0 bayt\) ve curl HTTP\/1.1 25 saniye sonra zaman aşımına uğramıştı \(0 bayt\)/);
assert.match(trNews[1].content, /artık 23 Eylül 2026 15\.00 UTC/);
assert.match(trNews[1].content, /Resmi Express Entry tur HTML Last-Modified damgası bu saatte 23 Eylül 2026 Çarşamba 15\.19\.28 GMT/);
assert.match(trNews[1].content, /kategori bazlı seçim sayfası bu saatte ilk deneme ve yeniden denemede HTTP 200 verdi \(ilk deneme Last-Modified 23 Eylül 2026 Çarşamba 13\.10\.53 GMT; yeniden deneme Last-Modified 23 Eylül 2026 Çarşamba 13\.10\.53 GMT\)/);
assert.match(trNews[1].content, /Sonraki resmi JSON ve kategori sayfası yeniden indirmeleri bu saatte de başarılı oldu \(HTTP 200\); sonraki HTML yeniden indirme de HTTP 200 \(LM 15\.19\.28 GMT\)\. Daha sonraki bir HTML yeniden indirme zaman aşımına uğradı/);
assert.match(trNews[1].content, /sonraki bir indirme de HTTP 200 verdi \(Last-Modified 13\.10\.53 GMT\)/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 18:00 UTC on 22 September 2026/);
assert.doesNotMatch(enNews[1].content, /This hour official ee_rounds_123_en.json and the official Express Entry rounds HTML page succeeded over Python urllib on first try and retry \(HTTP 200\)\. curl HTTP\/2 failed this hour \(HTTP\/2 stream INTERNAL_ERROR, 0 bytes\) and curl HTTP\/1.1 timed out after 25 seconds \(0 bytes\)/);
assert.doesNotMatch(trNews[1].content, /artık 22 Eylül 2026 18\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /curl HTTP\/2 bu saatte başarısız oldu \(HTTP\/2 akışı INTERNAL_ERROR, 0 bayt\) ve curl HTTP\/1.1 25 saniye sonra zaman aşımına uğradı \(0 bayt\)/);
assert.match(enNews[1].link || '', /express-entry-rounds/);
assert.match(enNews[2].title, /AI for Climate/i);
assert.match(trNews[2].title, /Çevre İçin Yapay Zeka/i);
assert.match(enNews[2].content, /27 September 2026|09:00|Turkish Community Heritage Centre|200 Eglinton|Vector Institute|Ceren Zeytinoğlu Atıcı/);
assert.match(trNews[2].content, /27 Eylül 2026|09\.00|Türk Toplum Merkezi|200 Eglinton|Vector Institute|Ceren Zeytinoğlu Atıcı/);
assert.match(enNews[2].content, /15:00 UTC on 23 September 2026/);
assert.match(trNews[2].content, /23 Eylül 2026 15\.00 UTC/);
assert.match(enNews[2].content, /turkishfederation.ca\/etkinlik\/ai-for-climate/);
assert.match(trNews[2].link || '', /cevre-icin-yapay-zeka/);
assert.match(enNews[2].link || '', /ai-for-climate/);
assert.match(enNews[2].content, /HTTP 200 on first try and retry/);
assert.match(trNews[2].content, /ilk deneme ve yeniden denemede HTTP 200/);
assert.doesNotMatch(enNews[2].title, /French-language|physicians|skilled military|researchers|Anatolia Fest/i);
assert.doesNotMatch(trNews[2].title, /Fransızca|hekim|nitelikli askeri|araştırmacı|Anatolia Fest/i);
assert.doesNotMatch(enNews[2].content, /NCLC|Sankofa Square|this Sunday|31100|31101|31102|41200|41201|40042|42102|43204|FSMA/i);
assert.doesNotMatch(trNews[2].content, /NCLC|Sankofa Square|bu Pazar|31100|31101|31102|41200|41201|40042|42102|43204|FSMA/i);
assert.match(enNews[2].content, /Do not restore Anatolia Fest/);
assert.match(trNews[2].content, /Anatolia Fest yaklaşan etkinlik olarak geri yüklenmemeli/);
assert.match(enNews[2].content, /venue is consistent/);
assert.match(trNews[2].content, /mekân tutarlı olana kadar/);
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
