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
assert.match(enNews[1].title, /Express Entry|senior managers/i);
assert.match(trNews[1].title, /Express Entry|üst düzey yönetici/i);
assert.match(enNews[1].content, /#444|00012|00013|00014|00015|12 months|TEER 0|250|389/);
assert.match(trNews[1].content, /#444|00012|00013|00014|00015|12 ay|TEER 0|250|389/);
assert.match(enNews[1].content, /official rounds JSON|rounds table/i);
assert.match(trNews[1].content, /resmi tur JSON|tur tablosu/i);
assert.match(enNews[1].content, /no #445 has been published|no round after #444/i);
assert.match(trNews[1].content, /#445 yayımlanmamıştır|#444.ten sonra/i);
assert.match(enNews[0].content, /00:12 UTC on 20 September 2026/);
assert.match(trNews[0].content, /20 Eylül 2026 00\.12 UTC/);
assert.match(enNews[1].content, /13:53:31 GMT/);
assert.match(trNews[1].content, /13\.53\.31 GMT/);
assert.match(enNews[1].content, /16:34:10 GMT/);
assert.match(trNews[1].content, /16\.34\.10 GMT/);
assert.match(enNews[1].content, /21:53:58 GMT/);
assert.match(trNews[1].content, /21\.53\.58 GMT/);
assert.match(enNews[1].content, /same as last hour/);
assert.match(trNews[1].content, /geçen saatle aynı/);
assert.match(enNews[1].content, /17:58:56 GMT/);
assert.match(trNews[1].content, /17\.58\.56 GMT/);
assert.match(enNews[1].content, /Prince Edward Island PNP|195 candidates/);
assert.match(trNews[1].content, /PEI PNP|195 aday/);
assert.match(enNews[1].content, /succeeded over Python urllib \(HTTP 200\)/);
assert.match(enNews[1].content, /curl HTTP\/2 failed \(HTTP\/2 stream INTERNAL_ERROR, 0 bytes\) and curl HTTP\/1\.1 timed out after 55 seconds \(0 bytes\)/);
assert.match(enNews[1].content, /Last hour those official files succeeded over both HTTP\/2 \(200\) and HTTP\/1\.1 \(200\)/);
assert.match(enNews[1].content, /last confirmed successful official fetch is now 00:12 UTC on 20 September 2026/);
assert.match(enNews[1].content, /previous successful official fetch was 23:04 UTC/);
assert.match(enNews[1].content, /this hour’s official JSON|this hour's official JSON/);
assert.match(trNews[1].content, /Python urllib üzerinden başarılı oldu \(HTTP 200\)/);
assert.match(trNews[1].content, /curl HTTP\/2 başarısız oldu \(HTTP\/2 akışı INTERNAL_ERROR, 0 bayt\) ve curl HTTP\/1\.1 55 saniye sonra zaman aşımına uğradı \(0 bayt\)/);
assert.match(trNews[1].content, /Geçen saat bu resmi dosyalar hem HTTP\/2 \(200\) hem HTTP\/1\.1 \(200\) üzerinden başarılı olmuştu/);
assert.match(trNews[1].content, /artık 20 Eylül 2026 00\.12 UTC/);
assert.match(trNews[1].content, /önceki başarılı resmi indirme 23\.04 UTC idi/);
assert.match(trNews[1].content, /bu saatin resmi JSON/);
assert.doesNotMatch(enNews[1].content, /This hour official ee_rounds_123_en.json and the official Express Entry rounds HTML page both succeeded over HTTP\/2 \(200\) and HTTP\/1\.1 \(200\)/);
assert.doesNotMatch(enNews[1].content, /Last hour those official files failed over HTTP\/2 \(HTTP\/2 stream INTERNAL_ERROR, 0 bytes\) and HTTP\/1\.1 \(timeout after 55 seconds, 0 bytes\)/);
assert.doesNotMatch(enNews[1].content, /official files could not be re-fetched this hour/);
assert.doesNotMatch(enNews[1].content, /Last hour those official files also failed/);
assert.doesNotMatch(enNews[1].content, /updated from 11:09:13 GMT last hour/);
assert.doesNotMatch(enNews[1].content, /23:04 UTC on 19 September 2026/);
assert.doesNotMatch(trNews[1].content, /Bu saatte resmi ee_rounds_123_en.json ve resmi Express Entry tur HTML sayfası hem HTTP\/2 \(200\) hem HTTP\/1\.1 \(200\) üzerinden başarılı oldu/);
assert.doesNotMatch(trNews[1].content, /Geçen saat bu resmi dosyalar HTTP\/2 \(HTTP\/2 akışı INTERNAL_ERROR, 0 bayt\) ve HTTP\/1\.1 \(55 saniye zaman aşımı, 0 bayt\) üzerinden başarısız olmuştu/);
assert.doesNotMatch(trNews[1].content, /resmi dosyalar bu saat yeniden indirilemedi/);
assert.doesNotMatch(trNews[1].content, /19 Eylül 2026 23\.04 UTC/);
assert.match(enNews[1].link || '', /express-entry-rounds/);
assert.match(enNews[2].title, /Anatolia Fest/);
assert.match(trNews[2].title, /Anatolia Fest/);
assert.match(enNews[2].content, /Sankofa Square|kutuphane\.ca|baklava|Turkish Airlines/i);
assert.match(trNews[2].content, /Sankofa Square|kutuphane\.ca|baklava|Turkish Airlines/i);
assert.match(enNews[2].content, /00:12 UTC on 20 September 2026/);
assert.match(trNews[2].content, /20 Eylül 2026 00\.12 UTC/);
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
