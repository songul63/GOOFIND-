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
assert.match(enNews[0].content, /07:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[0].content, /06:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[0].content, /05:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[0].content, /04:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[0].content, /03:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[0].content, /00:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[0].content, /23:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /22:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /21:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /20:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /19:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /18:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /17:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /16:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /15:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /14:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /13:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /12:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[0].content, /17:00 UTC on 27 September 2026/);
assert.match(trNews[0].content, /29 Eylül 2026 07\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /29 Eylül 2026 06\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /29 Eylül 2026 05\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /29 Eylül 2026 04\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /29 Eylül 2026 03\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /29 Eylül 2026 00\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 23\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 22\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 21\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 20\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 19\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 18\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 17\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 16\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 15\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 14\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 13\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /28 Eylül 2026 12\.00 UTC/);
assert.match(enNews[0].content, /consultation \/report first try 404; later 404; retry 404; \/what-we-heard first try 404; later handshake timed out; retry handshake timed out/);
assert.match(enNews[0].content, /last hour first try 404; later 404; retry 404; last hour \/what-we-heard first try 404; later 404; retry 404/);
assert.match(trNews[0].content, /istişare \/report ilk denemede 404; sonraki 404; yeniden deneme 404; \/what-we-heard ilk denemede 404; sonrakinde el sıkışması zaman aşımına uğradı; yeniden denemede el sıkışması zaman aşımına uğradı/);
assert.match(trNews[0].content, /geçen saat ilk denemede 404; sonraki 404; yeniden deneme 404; geçen saat \/what-we-heard ilk denemede 404; sonraki 404; yeniden deneme 404/);
assert.match(enNews[0].content, /JETCO path .* first try this hour HTTP 200; later HTTP 200; retry HTTP 200/);
assert.match(enNews[0].content, /last hour first try HTTP 404; later HTTP 404; retry HTTP 404/);
assert.ok(
  enNews[0].content.includes(
    'JETCO path (`country_news-pays_nouvelles/2026-01-20-turkiye.aspx`) first try this hour HTTP 200; later HTTP 200; retry HTTP 200',
  ),
);
assert.match(trNews[0].content, /JETCO yolu .* bu saatte ilk denemede HTTP 200; sonraki HTTP 200; yeniden deneme HTTP 200/);
assert.match(enNews[0].content, /FTA info page first try this hour HTTP 200; a later fetch also HTTP 200; retry HTTP 200/);
assert.match(trNews[0].content, /STA bilgi sayfası bu saatte ilk denemede HTTP 200 verdi; sonraki bir indirme de HTTP 200 verdi; yeniden deneme HTTP 200/);
assert.match(enNews[0].content, /international.canada.ca probe first try this hour HTTP 200; later HTTP 200; retry HTTP 200 \(last hour first try HTTP 200; later HTTP 200; retry HTTP 200\)/);
assert.match(trNews[0].content, /international.canada.ca denemesi bu saatte ilk denemede HTTP 200; sonraki HTTP 200; yeniden deneme HTTP 200 \(geçen saat ilk denemede HTTP 200; sonraki HTTP 200; yeniden deneme HTTP 200\)/);
assert.match(enNews[0].content, /Alternate no-lang first try this hour handshake timed out; later handshake timed out; retry handshake timed out \(last hour first try HTTP 404; later handshake timed out; retry HTTP 404\)/);

assert.match(enNews[1].title, /Express Entry #445|provincial nominees/i);
assert.match(trNews[1].title, /Express Entry #445|eyalet aday/i);
assert.match(enNews[1].content, /#445|733|725|Provincial Nominee Program|10:41:06 UTC/);
assert.match(trNews[1].content, /#445|733|725|Eyalet Aday Programı|10\.41\.06 UTC/);
assert.match(enNews[1].content, /official rounds JSON|rounds table/i);
assert.match(trNews[1].content, /resmi tur JSON|tur tablosu/i);
assert.match(enNews[1].content, /official round #445 remains published|#445\. That JSON listed 446 round records|latest listed round remains #445/);
assert.match(trNews[1].content, /resmi #445 turu IRCC JSON’unda hâlâ yayımlanmıştır|en son tur hâlâ #445/);
assert.doesNotMatch(enNews[1].content, /no #445 has been published/);
assert.doesNotMatch(trNews[1].content, /#445 yayımlanmamıştır/);
assert.match(enNews[1].content, /12:32:18 GMT/);
assert.match(trNews[1].content, /12\.32\.18 GMT/);
assert.doesNotMatch(enNews[1].content, /The official JSON Last-Modified stamp remains Wednesday, 16 September 2026 at 13:53:31 GMT/);
assert.match(enNews[1].content, /Official Express Entry rounds HTML Last-Modified this hour Tuesday, 29 September 2026 at 00:00:46 GMT on first try, Tuesday, 29 September 2026 at 00:00:46 GMT on later, and Tuesday, 29 September 2026 at 00:00:46 GMT on retry/);
assert.match(enNews[1].content, /last hour first try Tuesday, 29 September 2026 at 00:00:46 GMT; later Tuesday, 29 September 2026 at 00:00:46 GMT; retry Tuesday, 29 September 2026 at 00:00:46 GMT/);
assert.doesNotMatch(enNews[1].content, /23:16:01 GMT on first try, Monday, 28 September 2026 at 23:21:05 GMT on later, and Monday, 28 September 2026 at 23:21:05 GMT on retry/);
assert.doesNotMatch(enNews[1].content, /21:15:28 GMT/);
assert.match(trNews[1].content, /00\.00\.46 GMT/);
assert.doesNotMatch(trNews[1].content, /23\.16\.01 GMT/);
assert.doesNotMatch(trNews[1].content, /23\.21\.05 GMT/);
assert.doesNotMatch(trNews[1].content, /22\.22\.04 GMT/);
assert.doesNotMatch(trNews[1].content, /22\.32\.03 GMT/);
assert.doesNotMatch(trNews[1].content, /22\.41\.12 GMT/);
assert.doesNotMatch(trNews[1].content, /21\.15\.28 GMT/);
assert.doesNotMatch(trNews[1].content, /21\.20\.49 GMT/);
assert.doesNotMatch(trNews[1].content, /21\.30\.52 GMT/);
assert.doesNotMatch(trNews[1].content, /20\.15\.54 GMT/);
assert.doesNotMatch(trNews[1].content, /20\.21\.06 GMT/);
assert.doesNotMatch(trNews[1].content, /20\.29\.20 GMT/);
assert.doesNotMatch(trNews[1].content, /19\.18\.02 GMT/);
assert.doesNotMatch(trNews[1].content, /19\.25\.12 GMT/);
assert.doesNotMatch(trNews[1].content, /18\.07\.58 GMT/);
assert.doesNotMatch(trNews[1].content, /18\.10\.29 GMT/);
assert.doesNotMatch(trNews[1].content, /18\.13\.28 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.11\.57 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.10\.10 GMT/);
assert.doesNotMatch(trNews[1].content, /16\.00\.25 GMT/);
assert.doesNotMatch(trNews[1].content, /16\.06\.04 GMT/);
assert.doesNotMatch(trNews[1].content, /15\.02\.48 GMT/);
assert.doesNotMatch(trNews[1].content, /15\.00\.50 GMT/);
assert.doesNotMatch(trNews[1].content, /12\.30\.43 GMT/);
assert.doesNotMatch(enNews[1].content, /20:57:28 GMT/);
assert.doesNotMatch(trNews[1].content, /20\.57\.28 GMT/);
assert.match(enNews[1].content, /20:57:31 GMT/);
assert.match(trNews[1].content, /20\.57\.31 GMT/);
assert.doesNotMatch(enNews[1].content, /20:16:28 GMT/);
assert.doesNotMatch(trNews[1].content, /20\.16\.28 GMT/);
assert.doesNotMatch(enNews[1].content, /20:27:04 GMT/);
assert.doesNotMatch(trNews[1].content, /20\.27\.04 GMT/);
assert.doesNotMatch(enNews[1].content, /19:14:45 GMT/);
assert.doesNotMatch(trNews[1].content, /19\.14\.45 GMT/);
assert.doesNotMatch(enNews[1].content, /19:25:04 GMT/);
assert.doesNotMatch(trNews[1].content, /19\.25\.04 GMT/);
assert.doesNotMatch(enNews[1].content, /17:31:46 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.31\.46 GMT/);
assert.doesNotMatch(enNews[1].content, /15:08:33 GMT/);
assert.doesNotMatch(trNews[1].content, /15\.08\.33 GMT/);
assert.match(enNews[1].content, /same as last hour/);
assert.doesNotMatch(enNews[1].content, /14:18:16 GMT/);
assert.doesNotMatch(enNews[1].content, /22:55:03 GMT/);
assert.doesNotMatch(trNews[1].content, /22\.55\.03 GMT/);
assert.match(enNews[1].content, /20:57:01 GMT/);
assert.match(trNews[1].content, /20\.57\.01 GMT/);
assert.doesNotMatch(enNews[1].content, /20:13:26 GMT/);
assert.doesNotMatch(trNews[1].content, /20\.13\.26 GMT/);
assert.doesNotMatch(enNews[1].content, /20:25:26 GMT/);
assert.doesNotMatch(trNews[1].content, /20\.25\.26 GMT/);
assert.doesNotMatch(enNews[1].content, /19:22:57 GMT/);
assert.doesNotMatch(trNews[1].content, /19\.22\.57 GMT/);
assert.doesNotMatch(enNews[1].content, /17:29:44 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.29\.44 GMT/);
assert.doesNotMatch(enNews[1].content, /15:05:08 GMT/);
assert.doesNotMatch(trNews[1].content, /15\.05\.08 GMT/);
assert.match(enNews[1].content, /20:26:33 GMT/);
assert.match(trNews[1].content, /20\.26\.33 GMT/);
assert.doesNotMatch(enNews[1].content, /19:18:57 GMT/);
assert.doesNotMatch(trNews[1].content, /19\.18\.57 GMT/);
assert.doesNotMatch(enNews[1].content, /17:35:44 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.35\.44 GMT/);
assert.doesNotMatch(enNews[1].content, /15:10:52 GMT/);
assert.doesNotMatch(trNews[1].content, /15\.10\.52 GMT/);
assert.doesNotMatch(enNews[1].content, /14:19:05 GMT/);
assert.doesNotMatch(trNews[1].content, /14\.19\.05 GMT/);
assert.doesNotMatch(enNews[1].content, /13:51:56 GMT/);
assert.doesNotMatch(trNews[1].content, /13\.51\.56 GMT/);
assert.doesNotMatch(enNews[1].content, /02:55:15 GMT/);
assert.doesNotMatch(trNews[1].content, /02\.55\.15 GMT/);
assert.match(
  enNews[1].content,
  /This hour official ee_rounds_123_en.json, the official Express Entry rounds HTML page, and the official category-based selection page succeeded over Python urllib on first try, later, and retry \(HTTP 200\)\. The official invitations page for round #445 \(`invitations.html\?q=445`\) first try HTTP 200; later HTTP 200; retry HTTP 200\. The non-canonical invitations-445.html path first try HTTP 404; later HTTP 404; retry HTTP 404.*curl HTTP\/2 failed this hour \(INTERNAL_ERROR, 0 bytes\) and curl HTTP\/1.1 timed out after 25 seconds \(0 bytes\)/,
);
assert.match(trNews[1].content, /resmi kategori bazlı seçim sayfası Python urllib ile ilk denemede, sonraki indirmede ve yeniden denemede başarılı oldu/);
assert.match(enNews[1].content, /Last hour curl HTTP\/2 failed \(INTERNAL_ERROR, 0 bytes\) and curl HTTP\/1.1 timed out after 25 seconds \(0 bytes\)/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 succeeded this hour/);
assert.match(enNews[1].content, /curl HTTP\/2 failed this hour \(INTERNAL_ERROR, 0 bytes\)/);
assert.doesNotMatch(enNews[1].content, /12:30:43 GMT/);
assert.match(enNews[1].content, /00:02:42 GMT/);
assert.match(enNews[1].content, /01:00:03 GMT/);
assert.doesNotMatch(enNews[1].content, /23:26:01 GMT/);
assert.doesNotMatch(enNews[1].content, /22:07:31 GMT/);
assert.doesNotMatch(enNews[1].content, /23:18:31 GMT/);
assert.doesNotMatch(enNews[1].content, /20:21:02 GMT/);
assert.doesNotMatch(enNews[1].content, /19:38:32 GMT/);
assert.doesNotMatch(enNews[1].content, /19:43:10 GMT/);
assert.doesNotMatch(enNews[1].content, /16:03:11 GMT/);
assert.doesNotMatch(enNews[1].content, /16:06:43 GMT/);
assert.doesNotMatch(enNews[1].content, /13:55:57 GMT/);
assert.doesNotMatch(enNews[1].content, /12:46:02 GMT/);
assert.doesNotMatch(enNews[1].content, /06:56:01 GMT/);
assert.doesNotMatch(enNews[1].content, /07:34:22 GMT/);
assert.doesNotMatch(trNews[1].content, /12\.30\.43 GMT/);
assert.match(trNews[1].content, /00\.02\.42 GMT/);
assert.match(trNews[1].content, /01\.00\.03 GMT/);
assert.doesNotMatch(trNews[1].content, /23\.26\.01 GMT/);
assert.doesNotMatch(trNews[1].content, /22\.07\.31 GMT/);
assert.doesNotMatch(trNews[1].content, /23\.18\.31 GMT/);
assert.doesNotMatch(trNews[1].content, /20\.21\.02 GMT/);
assert.doesNotMatch(trNews[1].content, /19\.38\.32 GMT/);
assert.doesNotMatch(trNews[1].content, /19\.43\.10 GMT/);
assert.doesNotMatch(trNews[1].content, /16\.03\.11 GMT/);
assert.doesNotMatch(trNews[1].content, /16\.06\.43 GMT/);
assert.doesNotMatch(trNews[1].content, /13\.55\.57 GMT/);
assert.doesNotMatch(trNews[1].content, /12\.46\.02 GMT/);
assert.doesNotMatch(trNews[1].content, /06\.56\.01 GMT/);
assert.doesNotMatch(trNews[1].content, /07\.34\.22 GMT/);
assert.match(enNews[1].content, /last confirmed successful official fetch is now 07:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 06:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 05:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 04:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 03:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 00:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 23:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 22:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 21:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 20:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 19:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 18:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 17:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 16:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 15:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 14:00 UTC on 28 September 2026/);
assert.match(trNews[1].content, /artık 29 Eylül 2026 07\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 29 Eylül 2026 06\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 29 Eylül 2026 05\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 29 Eylül 2026 04\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 29 Eylül 2026 03\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 29 Eylül 2026 00\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 28 Eylül 2026 23\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 28 Eylül 2026 22\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 28 Eylül 2026 21\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 28 Eylül 2026 20\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 28 Eylül 2026 19\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 28 Eylül 2026 18\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 28 Eylül 2026 17\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 28 Eylül 2026 16\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 28 Eylül 2026 15\.00 UTC/);
assert.doesNotMatch(trNews[1].content, /artık 28 Eylül 2026 14\.00 UTC/);
assert.match(enNews[1].content, /100,000 British children/);
assert.match(trNews[1].content, /100\.000 İngiliz çocuk/);
assert.match(enNews[1].content, /upstate New Yorkers|upstate-New-Yorkers/);
assert.match(trNews[1].content, /upstate New Yorkluları çifte vatandaş/);
assert.match(enNews[1].content, /table now starts with September 28 Provincial Nominee Program 733 invitations \/ CRS 725/);
assert.match(enNews[1].content, /no September 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 or 29 draw/);
assert.match(trNews[1].content, /tablosu artık 28 Eylül Eyalet Aday Programı 733 davet \/ CRS 725 ile başlıyor/);
assert.match(trNews[1].content, /17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 veya 29 Eylül turu yok/);
assert.match(enNews[1].content, /54% provincial-immigration boost story is not on the homepage this hour/);
assert.match(trNews[1].content, /yüzde 54 eyalet göçü artışı haberi bu saatte ana sayfada yok/);
assert.match(enNews[1].content, /0980374/);
assert.match(enNews[1].content, /Canada invites 733 provincial nominees/);
assert.match(enNews[1].content, /study-permit funds-hike story is on the homepage this hour/);
assert.match(trNews[1].content, /Öğrenim izni başvuru fon artışı haberi bu saatte ana sayfada var/);
assert.match(trNews[1].content, /0980374/);
assert.match(enNews[1].content, /Alberta 380-workers provincial-immigration story \(0980818\)/);
assert.match(trNews[1].content, /Alberta 380 işçi eyalet göçü haberi \(0980818\)/);
assert.match(enNews[1].content, /The Newfoundland and Labrador PNP story \(62 workers\) is not on the homepage this hour/);
assert.match(trNews[1].content, /Newfoundland and Labrador PNP haberi \(62 işçi\) bu saatte ana sayfada yok/);
assert.match(enNews[1].content, /first try this hour HTTP 200 Last-Modified Tuesday, 29 September 2026 at 06:54:08 GMT/);
assert.match(enNews[1].content, /retry HTTP 200 Last-Modified Tuesday, 29 September 2026 at 06:54:08 GMT \(last hour first try HTTP 200 Last-Modified Monday, 28 September 2026 at 20:26:33 GMT; later HTTP 200 Last-Modified Monday, 28 September 2026 at 20:26:33 GMT; retry timed out\)/);
assert.doesNotMatch(enNews[1].content, /senior-managers article first try this hour timed out/);
assert.doesNotMatch(enNews[1].content, /no CIC article yet for #445/);
assert.doesNotMatch(trNews[1].content, /#445 için henüz bir CIC yazısı yok/);
assert.match(enNews[1].link || '', /express-entry-rounds/);

assert.match(enNews[2].title, /skilled military recruits/i);
assert.match(trNews[2].title, /nitelikli askeri adaylar/i);
assert.match(enNews[2].content, /FSMA|40042|42102|43204|ten years|Canadian Forces Recruiting Group/);
assert.match(trNews[2].content, /FSMA|40042|42102|43204|on yıl|Kanada Kuvvetleri İşe Alım Grubu/);
assert.match(enNews[2].content, /07:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[2].content, /06:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[2].content, /05:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[2].content, /04:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[2].content, /03:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[2].content, /00:00 UTC on 29 September 2026/);
assert.doesNotMatch(enNews[2].content, /23:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /22:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /21:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /20:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /19:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /18:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /17:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /16:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /15:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /14:00 UTC on 28 September 2026/);
assert.doesNotMatch(enNews[2].content, /13:00 UTC on 28 September 2026/);
assert.match(trNews[2].content, /29 Eylül 2026 07\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /29 Eylül 2026 06\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /29 Eylül 2026 05\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /29 Eylül 2026 04\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /29 Eylül 2026 03\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /29 Eylül 2026 00\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 23\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 22\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 21\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 20\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 19\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 18\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 17\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 16\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 15\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 14\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /28 Eylül 2026 13\.00 UTC/);
assert.match(enNews[2].content, /latest official round is now #445 for provincial nominees/);
assert.match(trNews[2].content, /en son resmi tur artık eyalet adayları için #445/);
assert.match(enNews[2].content, /category-based selection page as the source/);
assert.match(enNews[2].link || '', /category-based-selection/);
assert.match(trNews[2].link || '', /category-based-selection/);
assert.match(enNews[2].content, /first try HTTP 200 \(Last-Modified Tuesday, 29 September 2026 at 01:00:03 GMT\)/);
assert.match(enNews[2].content, /later HTTP 200 \(Last-Modified Tuesday, 29 September 2026 at 00:02:42 GMT\)/);
assert.match(trNews[2].content, /ilk denemede HTTP 200 \(Last-Modified 29 Eylül 2026 Salı 01\.00\.03 GMT\)/);
assert.match(trNews[2].content, /sonraki HTTP 200 \(Last-Modified 29 Eylül 2026 Salı 00\.02\.42 GMT\)/);
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
