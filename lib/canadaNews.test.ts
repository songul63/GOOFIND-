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
assert.match(enNews[0].content, /18:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /17:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /16:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /15:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /14:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /13:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /12:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /11:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /10:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /09:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /08:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /07:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /06:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /05:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /04:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /03:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /02:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /01:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[0].content, /23:00 UTC on 26 September 2026/);
assert.doesNotMatch(enNews[0].content, /22:00 UTC on 26 September 2026/);
assert.match(trNews[0].content, /27 Eylül 2026 18\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 17\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 16\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 15\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 14\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 13\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 12\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 11\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 10\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 09\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 08\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 07\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 06\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 05\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 04\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 03\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 02\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /27 Eylül 2026 01\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /26 Eylül 2026 23\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /26 Eylül 2026 22\.00 UTC/);
assert.match(enNews[0].content, /consultation \/report first try handshake timed out; later handshake timed out; retry 404; \/what-we-heard first try 404; later 404; retry 404/);
assert.doesNotMatch(enNews[0].content, /consultation \/report first try 404; later handshake timed out; retry 404/);
assert.doesNotMatch(enNews[0].content, /\/what-we-heard first try 404; later handshake timed out; retry handshake timed out/);
assert.match(enNews[0].content, /handshake timed out/);
assert.match(trNews[0].content, /istişare \/report ilk denemede el sıkışması zaman aşımına uğradı; sonraki el sıkışması zaman aşımına uğradı; yeniden deneme 404; \/what-we-heard ilk denemede 404; sonraki 404; yeniden deneme 404/);
assert.doesNotMatch(trNews[0].content, /istişare \/report ilk denemede 404; sonraki el sıkışması zaman aşımı; yeniden deneme 404/);
assert.doesNotMatch(trNews[0].content, /\/what-we-heard ilk denemede 404; sonraki el sıkışması zaman aşımı; yeniden denemede el sıkışması zaman aşımı/);
assert.match(trNews[0].content, /el sıkışması zaman aşımı/);
assert.match(enNews[0].content, /JETCO path .* first try this hour HTTP 200; later HTTP 200; retry HTTP 200/);
assert.match(enNews[0].content, /last hour first try, later, and retry HTTP 200/);
assert.doesNotMatch(enNews[0].content, /JETCO path \([^)]+\) first try this hour HTTP 404/);
assert.doesNotMatch(enNews[0].content, /JETCO path \(`[^`]+`\) first try this hour handshake timed out/);
assert.doesNotMatch(enNews[0].content, /first try last hour handshake timed out/);
assert.match(trNews[0].content, /JETCO yolu .* bu saatte ilk denemede HTTP 200; sonraki HTTP 200; yeniden deneme HTTP 200/);
assert.match(trNews[0].content, /geçen saat ilk deneme, sonraki ve yeniden deneme HTTP 200/);
assert.doesNotMatch(trNews[0].content, /JETCO yolu \([^)]+\) bu saatte ilk denemede HTTP 404/);
assert.doesNotMatch(trNews[0].content, /JETCO yolu \(`[^`]+`\) bu saatte ilk denemede el sıkışması zaman aşımına uğradı/);
assert.doesNotMatch(trNews[0].content, /geçen saat ilk denemede el sıkışması zaman aşımına uğradı; sonraki HTTP 200; yeniden deneme HTTP 200/);
assert.match(enNews[0].content, /Alternate no-lang first try handshake timed out; later handshake timed out; retry handshake timed out \(last hour first try, later, and retry handshake timed out\)/);
assert.match(trNews[0].content, /Dil parametresi olmayan alternatif ilk denemede el sıkışması zaman aşımına uğradı; sonraki el sıkışması zaman aşımına uğradı; yeniden denemede el sıkışması zaman aşımına uğradı \(geçen saat ilk deneme, sonraki ve yeniden denemede el sıkışması zaman aşımına uğradı\)/);
assert.match(enNews[0].content, /FTA info page first try this hour HTTP 200; a later fetch also HTTP 200; retry HTTP 200/);
assert.match(trNews[0].content, /STA bilgi sayfası bu saatte ilk denemede HTTP 200 verdi; sonraki bir indirme de HTTP 200 verdi; yeniden deneme HTTP 200/);
assert.match(enNews[0].content, /international.canada.ca probe first try this hour handshake timed out; later handshake timed out; retry handshake timed out/);
assert.match(trNews[0].content, /international.canada.ca denemesi bu saatte ilk denemede el sıkışması zaman aşımına uğradı; sonraki el sıkışması zaman aşımına uğradı; yeniden denemede el sıkışması zaman aşımına uğradı/);

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
assert.match(enNews[1].content, /Official Express Entry rounds HTML first try this hour HTTP 200/);
assert.match(enNews[1].content, /18:04:35 GMT/);
assert.match(enNews[1].content, /18:05:23 GMT/);
assert.match(enNews[1].content, /16:46:34 GMT/);
assert.match(enNews[1].content, /16:49:25 GMT/);
assert.match(enNews[1].content, /Last hour official HTML first try HTTP 200/);
assert.match(enNews[1].content, /Last-Modified Sunday, 27 September 2026 at 16:49:25 GMT/);
assert.doesNotMatch(enNews[1].content, /13:00:44 GMT/);
assert.match(trNews[1].content, /18\.04\.35 GMT/);
assert.doesNotMatch(trNews[1].content, /13\.00\.44 GMT/);
assert.doesNotMatch(trNews[1].content, /23\.00\.22 GMT/);
assert.doesNotMatch(enNews[1].content, /23:00:22 GMT/);
assert.doesNotMatch(enNews[1].content, /01:03:45 GMT/);
assert.doesNotMatch(enNews[1].content, /23:00:37 GMT/);
assert.doesNotMatch(enNews[1].content, /20:32:54 GMT/);
assert.doesNotMatch(trNews[1].content, /01\.03\.45 GMT/);
assert.doesNotMatch(trNews[1].content, /20\.32\.54 GMT/);
assert.doesNotMatch(enNews[1].content, /17:26:44 GMT/);
assert.doesNotMatch(enNews[1].content, /22:02:54 GMT/);
assert.doesNotMatch(enNews[1].content, /22:04:43 GMT/);
assert.doesNotMatch(enNews[1].content, /21:07:50 GMT/);
assert.doesNotMatch(enNews[1].content, /16:41:19 GMT/);
assert.doesNotMatch(enNews[1].content, /16:56:41 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.26\.44 GMT/);
assert.doesNotMatch(trNews[1].content, /22\.02\.54 GMT/);
assert.doesNotMatch(trNews[1].content, /21\.07\.50 GMT/);
assert.doesNotMatch(trNews[1].content, /16\.41\.19 GMT/);
assert.doesNotMatch(trNews[1].content, /16\.56\.41 GMT/);
assert.match(enNews[1].content, /12:08:53 GMT/);
assert.match(trNews[1].content, /12\.08\.53 GMT/);
assert.match(enNews[1].content, /15:57:39 GMT/);
assert.match(trNews[1].content, /15\.57\.39 GMT/);
assert.doesNotMatch(enNews[1].content, /05:04:37 GMT/);
assert.doesNotMatch(trNews[1].content, /05\.04\.37 GMT/);
assert.doesNotMatch(enNews[1].content, /17:06:07 GMT/);
assert.doesNotMatch(enNews[1].content, /17:06:40 GMT/);
assert.doesNotMatch(enNews[1].content, /17:13:42 GMT/);
assert.doesNotMatch(enNews[1].content, /13:23:34 GMT/);
assert.doesNotMatch(enNews[1].content, /13:38:01 GMT/);
assert.doesNotMatch(enNews[1].content, /04:00:06 GMT/);
assert.doesNotMatch(enNews[1].content, /05:23:03 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.06\.07 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.06\.40 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.13\.42 GMT/);
assert.doesNotMatch(trNews[1].content, /13\.23\.34 GMT/);
assert.doesNotMatch(trNews[1].content, /13\.38\.01 GMT/);
assert.match(enNews[1].content, /CIC News homepage Last-Modified this hour is Sunday, 27 September 2026 at 12:09:25 GMT on first try/);
assert.match(enNews[1].content, /Last hour that homepage Last-Modified was Sunday, 27 September 2026 at 12:08:53 GMT/);
assert.doesNotMatch(enNews[1].content, /11:08:01 GMT/);
assert.doesNotMatch(enNews[1].content, /18:37:57 GMT/);
assert.match(trNews[1].content, /CIC News ana sayfasının Last-Modified damgası bu saatte ilk denemede 27 Eylül 2026 Pazar 12\.09\.25 GMT/);
assert.match(trNews[1].content, /Geçen saat o ana sayfa Last-Modified 27 Eylül 2026 Pazar 12\.08\.53 GMT idi/);
assert.doesNotMatch(trNews[1].content, /11\.08\.01 GMT/);
assert.doesNotMatch(trNews[1].content, /18\.37\.57 GMT/);
assert.match(enNews[1].content, /first try this hour HTTP 200 Last-Modified Sunday, 27 September 2026 at 15:57:39 GMT on the canonical 0980361 URL/);
assert.doesNotMatch(enNews[1].content, /18:47:05 GMT/);
assert.match(trNews[1].content, /ilk denemede HTTP 200 Last-Modified 27 Eylül 2026 Pazar 15\.57\.39 GMT verdi \(kanonik 0980361 URL\)/);
assert.doesNotMatch(trNews[1].content, /18\.47\.05 GMT/);
assert.match(enNews[1].content, /when-to-hire-an-immigration-lawyer/);
assert.match(enNews[1].content, /proof-of-citizenship-finalizations-slowed-in-July/);
assert.match(enNews[1].content, /Manitoba 508, temporary-residence timelines, and the Newfoundland 36-foreign-national PNP story are not on the homepage this hour/);
assert.match(trNews[1].content, /Manitoba 508, temporary-residence timelines ve Newfoundland 36 yabancı uyruklu PNP haberi bu saatte ana sayfada yok/);
assert.match(enNews[1].content, /study-permit funds-hike story is on the homepage this hour/);
assert.match(trNews[1].content, /Öğrenim izni başvuru fon artışı haberi bu saatte ana sayfada var/);
assert.match(enNews[1].content, /Manitoba 417 STEM-workers/);
assert.match(trNews[1].content, /Manitoba 417 STEM/);
assert.match(enNews[1].content, /New Brunswick 678/);
assert.match(enNews[1].content, /British Columbia 714 cream-of-the-crop/);
assert.match(enNews[1].content, /0980711/);
assert.match(trNews[1].content, /New Brunswick 678/);
assert.match(trNews[1].content, /British Columbia 714 cream-of-the-crop/);
assert.match(trNews[1].content, /0980711/);
assert.match(enNews[1].content, /Temporary Foreign Worker Program wait-times|TFWP wait-times/);
assert.match(enNews[1].content, /Bahrain\/Kuwait\/Qatar\/UAE removals-halt story is not on the homepage this hour/);
assert.match(trNews[1].content, /Bahreyn\/Kuveyt\/Katar\/BAE sınır dışı durdurmasının kaldırılması haberi bu saatte ana sayfada yok/);
assert.match(enNews[1].content, /political-discontent \/ Americans-seeking-Canadian-citizenship/);
assert.match(enNews[1].content, /letter-of-explanation story is not on the homepage this hour/);
assert.match(enNews[1].content, /1867-is-not-a-cut-off-date/);
assert.match(trNews[1].content, /Letter-of-explanation haberi bu saatte ana sayfada yok/);
assert.match(trNews[1].content, /1867-is-not-a-cut-off-date/);
assert.match(enNews[1].content, /Prince Edward Island PNP|195-candidate/);
assert.match(enNews[1].content, /British Columbia PNP 33-workers story is not on the homepage this hour/);
assert.match(trNews[1].content, /British Columbia PNP 33 işçi haberi bu saatte ana sayfada yok/);
assert.match(enNews[1].content, /Global Talent Stream/);
assert.match(enNews[1].content, /SVG path numbers/);
assert.match(enNews[1].content, /0980445 Bill C-3 article is not on the homepage this hour/);
assert.match(trNews[1].content, /SVG yol sayıları/);
assert.match(enNews[1].content, /54% provincial-immigration boost|Fall 2026 permanent-residence webinar/);
assert.match(enNews[1].content, /that JSON listed 445 round records; latest drawNumber remains 444/);
assert.match(trNews[1].content, /o JSON 445 tur kaydı listeliyor; en son drawNumber hâlâ 444/);
assert.match(enNews[1].content, /JSON-driven table shell rather than a new Express Entry #445/);
assert.match(enNews[1].content, /This hour official ee_rounds_123_en.json, the official Express Entry rounds HTML page, and the official category-based selection page succeeded over Python urllib on first try, later, and retry/);
assert.match(enNews[1].content, /curl HTTP\/2 failed this hour \(INTERNAL_ERROR, 0 bytes\) and curl HTTP\/1.1 timed out after 25 seconds \(0 bytes\)/);
assert.match(trNews[1].content, /resmi kategori bazlı seçim sayfası Python urllib ile ilk denemede, sonraki indirmede ve yeniden denemede başarılı oldu/);
assert.match(enNews[1].content, /Official category-based selection page first try this hour HTTP 200/);
assert.match(enNews[1].content, /Last hour that page first try HTTP 200/);
assert.match(enNews[1].content, /16:47:38 GMT/);
assert.match(enNews[1].content, /13:50:35 GMT/);
assert.match(trNews[1].content, /16\.47\.38 GMT/);
assert.match(trNews[1].content, /13\.50\.35 GMT/);
assert.match(trNews[1].content, /16\.46\.34 GMT/);
assert.match(trNews[1].content, /16\.49\.25 GMT/);
assert.match(trNews[1].content, /18\.05\.23 GMT/);
assert.match(enNews[1].content, /13:52:14 GMT/);
assert.doesNotMatch(enNews[1].content, /01:05:28 GMT/);
assert.match(trNews[1].content, /13\.52\.14 GMT/);
assert.doesNotMatch(trNews[1].content, /01\.05\.28 GMT/);
assert.doesNotMatch(enNews[1].content, /00:56:07 GMT/);
assert.doesNotMatch(trNews[1].content, /00\.56\.07 GMT/);
assert.match(enNews[1].content, /last confirmed successful official fetch is now 18:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 17:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch remains 15:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 16:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 15:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 14:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 13:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 12:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 11:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 10:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 09:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 08:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 07:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 06:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 05:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 04:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 03:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 02:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 01:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 23:00 UTC on 26 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 22:00 UTC on 26 September 2026/);
assert.match(trNews[1].content, /artık 27 Eylül 2026 18\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 17\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /hâlâ 27 Eylül 2026 15\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 16\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 15\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 14\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 13\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 12\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 11\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 10\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 09\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 08\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 07\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 06\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 05\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 04\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 03\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 02\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 27 Eylül 2026 01\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 26 Eylül 2026 23\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 26 Eylül 2026 22\.00 UTC/);
assert.match(enNews[1].content, /curl HTTP\/2 failed this hour/);
assert.match(enNews[1].content, /Last hour curl HTTP\/2 failed/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 succeeded this hour/);
assert.doesNotMatch(enNews[1].content, /Last hour curl HTTP\/2 succeeded/);
assert.match(enNews[1].content, /100,000 British children/);
assert.match(trNews[1].content, /100\.000 İngiliz çocuk/);
assert.match(enNews[1].content, /upstate New Yorkers|upstate-New-Yorkers/);
assert.match(trNews[1].content, /upstate New Yorkluları çifte vatandaş/);
assert.match(enNews[1].content, /no September 17, 18, 19, 20, 21, 22, 23, 24, 25, 26 or 27 draw/);
assert.match(trNews[1].content, /17, 18, 19, 20, 21, 22, 23, 24, 25, 26 veya 27 Eylül turu yok/);
assert.match(enNews[1].link || '', /express-entry-rounds/);

assert.match(enNews[2].title, /AI for Climate/i);
assert.match(trNews[2].title, /Çevre İçin Yapay Zeka/i);
assert.match(enNews[2].content, /27 September 2026|09:00|Turkish Community Heritage Centre|200 Eglinton|Vector Institute|Ceren Zeytinoğlu Atıcı/);
assert.match(trNews[2].content, /27 Eylül 2026|09\.00|Türk Toplum Merkezi|200 Eglinton|Vector Institute|Ceren Zeytinoğlu Atıcı/);
assert.match(enNews[2].content, /18:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /17:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /16:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /15:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /14:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /13:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /12:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /11:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /10:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /09:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /08:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /07:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /06:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /05:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /04:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /03:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /02:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /01:00 UTC on 27 September 2026/);
assert.doesNotMatch(enNews[2].content, /23:00 UTC on 26 September 2026/);
assert.doesNotMatch(enNews[2].content, /22:00 UTC on 26 September 2026/);
assert.match(trNews[2].content, /27 Eylül 2026 18\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 17\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 16\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 15\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 14\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 13\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 12\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 11\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 10\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 09\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 08\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 07\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 06\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 05\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 04\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 03\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 02\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /27 Eylül 2026 01\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /26 Eylül 2026 23\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /26 Eylül 2026 22\.00 UTC/);
assert.match(enNews[2].content, /turkishfederation.ca\/etkinlik\/ai-for-climate/);
assert.match(trNews[2].link || '', /cevre-icin-yapay-zeka/);
assert.match(enNews[2].link || '', /ai-for-climate/);
assert.match(enNews[2].content, /HTTP 200 on first try, later, and retry/);
assert.match(trNews[2].content, /ilk deneme, sonraki ve yeniden denemede HTTP 200/);
assert.doesNotMatch(enNews[2].title, /French-language|physicians|skilled military|researchers|Anatolia Fest/i);
assert.doesNotMatch(trNews[2].title, /Fransızca|hekim|nitelikli askeri|araştırmacı|Anatolia Fest/i);
assert.doesNotMatch(enNews[2].content, /NCLC|Sankofa Square|this Sunday|31100|31101|31102|41200|41201|40042|42102|43204|FSMA/i);
assert.match(enNews[2].content, /Do not restore Anatolia Fest/);
assert.match(trNews[2].content, /Anatolia Fest yaklaşan etkinlik olarak geri yüklenmemeli/);
assert.match(enNews[2].content, /venue is consistent/);
assert.match(trNews[2].content, /mekân tutarlı olana kadar/);
assert.match(enNews[2].content, /republic-ball\/` first try, later, and retry HTTP 200 with the homepage title/);
assert.match(enNews[2].content, /republic-ball-103rd\/` first try this hour HTTP 200, later HTTP 200, retry HTTP 200/);
assert.match(trNews[2].content, /republic-ball-103rd\/` bu saatte ilk denemede HTTP 200, sonraki indirmede HTTP 200, yeniden denemede HTTP 200 verdi/);
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
