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
assert.match(enNews[0].content, /11:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /15:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /10:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /09:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /14:00 UTC on 27 September 2026/);
assert.match(trNews[0].content, /28 Eylül 2026 11\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 10\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 15\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 09\.00 UTC/);
assert.match(enNews[0].content, /consultation \/report first try 404; later 404; retry 404; \/what-we-heard first try handshake timed out; later 404; retry 404/);
assert.doesNotMatch(enNews[0].content, /\/what-we-heard first try 404; later handshake timed out; retry handshake timed out/);
assert.match(trNews[0].content, /istişare \/report ilk denemede 404; sonraki 404; yeniden deneme 404; \/what-we-heard ilk denemede el sıkışması zaman aşımı; sonraki 404; yeniden deneme 404/);
assert.match(enNews[0].content, /JETCO path .* first try this hour HTTP 200; later HTTP 200; retry HTTP 200/);
assert.match(enNews[0].content, /first try last hour handshake timed out; later HTTP 200; retry HTTP 200/);
assert.doesNotMatch(enNews[0].content, /JETCO path .* first try this hour handshake timed out/);
assert.match(trNews[0].content, /JETCO yolu .* bu saatte ilk denemede HTTP 200; sonraki HTTP 200; yeniden deneme HTTP 200/);
assert.match(enNews[0].content, /FTA info page first try this hour HTTP 200; a later fetch also HTTP 200; retry HTTP 200/);
assert.match(trNews[0].content, /STA bilgi sayfası bu saatte ilk denemede HTTP 200 verdi; sonraki bir indirme de HTTP 200 verdi; yeniden deneme HTTP 200/);
assert.match(enNews[0].content, /international.canada.ca probe first try this hour HTTP 200; later HTTP 200; retry HTTP 200/);
assert.match(trNews[0].content, /international.canada.ca denemesi bu saatte ilk denemede HTTP 200; sonraki HTTP 200; yeniden deneme HTTP 200/);
assert.match(enNews[0].content, /Alternate no-lang first try HTTP 200; later handshake timed out; retry HTTP 200 \(first\/later\/retry handshake timed out last hour\)/);

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
assert.match(enNews[1].content, /Official Express Entry rounds HTML Last-Modified this hour is Monday, 28 September 2026 at 11:00:48 GMT on first try and later; retry Monday, 28 September 2026 at 11:08:09 GMT/);
assert.match(enNews[1].content, /last hour Monday, 28 September 2026 at 06:48:13 GMT on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /13:36:19 GMT/);
assert.match(trNews[1].content, /11\.00\.48 GMT/);
assert.match(trNews[1].content, /11\.08\.09 GMT/);
assert.match(trNews[1].content, /06\.48\.13 GMT/);
assert.doesNotMatch(trNews[1].content, /13\.36\.19 GMT/);
assert.match(enNews[1].content, /09:54:45 GMT/);
assert.match(trNews[1].content, /09\.54\.45 GMT/);
assert.match(enNews[1].content, /Last hour that homepage Last-Modified was Monday, 28 September 2026 at 09:54:45 GMT/);
assert.doesNotMatch(enNews[1].content, /22:55:03 GMT/);
assert.doesNotMatch(trNews[1].content, /22\.55\.03 GMT/);
assert.match(enNews[1].content, /02:55:15 GMT/);
assert.match(trNews[1].content, /02\.55\.15 GMT/);
assert.doesNotMatch(enNews[1].content, /05:04:37 GMT/);
assert.doesNotMatch(trNews[1].content, /05\.04\.37 GMT/);
assert.doesNotMatch(enNews[1].content, /12:08:53 GMT/);
assert.doesNotMatch(trNews[1].content, /12\.08\.53 GMT/);
assert.match(
  enNews[1].content,
  /This hour official ee_rounds_123_en.json, the official Express Entry rounds HTML page, and the official category-based selection page succeeded over Python urllib on first try, later, and retry \(HTTP 200\)\. curl HTTP\/2 failed this hour \(INTERNAL_ERROR, 0 bytes\) and curl HTTP\/1.1 timed out after 25 seconds \(0 bytes\)/,
);
assert.match(trNews[1].content, /resmi kategori bazlı seçim sayfası Python urllib ile ilk denemede, sonraki indirmede ve yeniden denemede başarılı oldu/);
assert.match(enNews[1].content, /Last hour curl HTTP\/2 failed \(INTERNAL_ERROR, 0 bytes\) and curl HTTP\/1.1 timed out after 25 seconds \(0 bytes\)/);
assert.doesNotMatch(enNews[1].content, /Last hour curl HTTP\/2 succeeded/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 succeeded this hour/);
assert.match(enNews[1].content, /07:34:22 GMT/);
assert.doesNotMatch(enNews[1].content, /02:43:04 GMT/);
assert.match(trNews[1].content, /07\.34\.22 GMT/);
assert.doesNotMatch(trNews[1].content, /02\.43\.04 GMT/);
assert.match(enNews[1].content, /last confirmed successful official fetch is now 11:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 10:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 15:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 09:00 UTC on 28 September 2026/);
assert.match(trNews[1].content, /artık 28 Eylül 2026 11\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 28 Eylül 2026 10\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 15\.00 UTC/);
assert.match(enNews[1].content, /100,000 British children/);
assert.match(trNews[1].content, /100\.000 İngiliz çocuk/);
assert.match(enNews[1].content, /upstate New Yorkers|upstate-New-Yorkers/);
assert.match(trNews[1].content, /upstate New Yorkluları çifte vatandaş/);
assert.match(enNews[1].content, /no September 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 or 28 draw/);
assert.match(trNews[1].content, /17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 veya 28 Eylül turu yok/);
assert.match(enNews[1].content, /54% provincial-immigration boost story is not on the homepage this hour/);
assert.match(trNews[1].content, /yüzde 54 eyalet göçü artışı haberi bu saatte ana sayfada yok/);
assert.match(enNews[1].link || '', /express-entry-rounds/);

assert.match(enNews[2].title, /skilled military recruits/i);
assert.match(trNews[2].title, /nitelikli askeri adaylar/i);
assert.match(enNews[2].content, /FSMA|40042|42102|43204|ten years|Canadian Forces Recruiting Group/);
assert.match(trNews[2].content, /FSMA|40042|42102|43204|on yıl|Kanada Kuvvetleri İşe Alım Grubu/);
assert.match(enNews[2].content, /11:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /10:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /15:00 UTC on 27 September 2026/);
assert.match(trNews[2].content, /28 Eylül 2026 11\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 10\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 15\.00 UTC/);
assert.match(enNews[2].content, /category-based selection page as the source/);
assert.match(enNews[2].link || '', /category-based-selection/);
assert.match(trNews[2].link || '', /category-based-selection/);
assert.match(enNews[2].content, /HTTP 200 on first try, later, and retry/);
assert.match(trNews[2].content, /ilk deneme, sonraki ve yeniden denemede HTTP 200/);
assert.doesNotMatch(enNews[2].title, /AI for Climate|French-language|physicians|researchers|Anatolia Fest/i);
assert.doesNotMatch(trNews[2].title, /Çevre İçin Yapay Zeka|Fransızca|hekim|araştırmacı|Anatolia Fest/i);
assert.match(enNews[2].content, /no longer a clean same-day sourced event/);
assert.match(trNews[2].content, /artık aynı gün kaynaklı temiz bir etkinlik olmadığı/);
assert.match(enNews[2].content, /Do not restore Anatolia Fest/);
assert.match(trNews[2].content, /Anatolia Fest yaklaşan etkinlik olarak geri yüklenmemeli/);
assert.match(enNews[2].content, /venue is consistent/);
assert.match(trNews[2].content, /mekân tutarlı olana kadar/);
assert.match(enNews[2].content, /republic-ball\/` first try, later, and retry HTTP 200 with the homepage title/);
assert.match(enNews[2].content, /republic-ball-103rd\/` first try this hour HTTP 200, later HTTP 200, retry HTTP 200/);
assert.match(trNews[2].content, /republic-ball-103rd\/` bu saatte ilk denemede HTTP 200, sonraki indirmede HTTP 200, yeniden denemede HTTP 200 verdi/);
assert.match(enNews[2].content, /Do not use `\/en\/listings` \(404 this hour on first try, later, and retry\)/);
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

console.log('canadaNews tests passed');
