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
  } as BannerAd,
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

const mapped = mapNewsToBannerItem(
  { title: 'Test item', desc: 'Desc', category: 'Immigration' },
  0,
  'en',
  fallback,
);
assert.equal(mapped.type, 'news');
assert.equal(mapped.isLiveNews, true);
assert.ok(mapped.url.includes('photo-1544013589') || mapped.url.startsWith('https://example.com/'));

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
assert.match(enNews[0].content, /Current status: Closed|consultation page still lists|conducted public consultations|what-we-heard report has not yet been published|in negotiations|4\.3 billion|TCE-Consultations/);
assert.match(trNews[0].content, /Current status: Closed|conducted public consultations|henüz yayımlanmamış|müzakere|4,3 milyar|TCE-Consultations/);
assert.match(enNews[0].content, /\$3\.3 billion|2,550|JETCO|agri-food|dateModified is now 2026-10-06/);
assert.match(enNews[0].content, /Notice of intent|date-modified 2026-10-09|September 21, 2026/);
assert.match(enNews[0].content, /JETCO country-news path returned urllib first HTTP 200, extra handshake timed out, extra2 HTTP 200, later HTTP 200/);
assert.doesNotMatch(enNews[0].content, /JETCO country-news path returned urllib first HTTP 200, extra HTTP 200, extra2 handshake timed out, later HTTP 200/);
assert.doesNotMatch(enNews[0].content, /JETCO country-news path returned urllib first handshake timed out, extra HTTP 200, extra2 handshake timed out, later handshake timed out/);
assert.doesNotMatch(enNews[0].content, /JETCO country-news path returned urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200/);
assert.doesNotMatch(enNews[0].content, /JETCO country-news path returned urllib first handshake timed out, extra HTTP 200, extra2 HTTP 200, later handshake timed out/);
assert.match(enNews[0].content, /curl HTTP\/2 first HTTP 200, curl HTTP\/1.1 first HTTP 200 this hour/);
assert.match(enNews[0].content, /FTA info urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200/);
assert.match(enNews[0].content, /FTA info urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200; wget first HTTP 200; curl HTTP\/2 first HTTP 200; curl HTTP\/1.1 first HTTP 200/);
assert.doesNotMatch(enNews[0].content, /FTA info urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200; wget first HTTP 200; curl HTTP\/2 first timed out \(0 bytes\); curl HTTP\/1.1 first HTTP 200/);
assert.doesNotMatch(enNews[0].content, /FTA info urllib first handshake timed out, extra HTTP 200, extra2 HTTP 200, later HTTP 200/);
assert.doesNotMatch(enNews[0].content, /FTA info urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later handshake timed out/);
assert.match(enNews[0].content, /relations urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200/);
assert.doesNotMatch(enNews[0].content, /relations urllib first HTTP 200, extra handshake timed out/);
assert.doesNotMatch(enNews[0].content, /relations urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later handshake timed out/);
assert.match(enNews[0].content, /consultation urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200/);
assert.doesNotMatch(enNews[0].content, /consultation urllib first HTTP 200, extra HTTP 200, extra2 handshake timed out, later HTTP 200/);
assert.match(enNews[0].content, /Verified 06:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 05:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 04:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 03:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 02:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 01:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 00:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 23:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 22:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 21:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 20:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 19:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 18:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 17:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 16:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 12:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 11:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 10:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 09:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 08:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 07:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 22:00 UTC 29 October 2026/);
assert.match(trNews[0].content, /3,3 milyar|2\.550|JETCO|2026-10-06/);
assert.match(trNews[0].content, /06\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /05\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /04\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /03\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /02\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /01\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /00\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /23\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /22\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /21\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /20\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /19\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /18\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /17\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /16\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /12\.00 UTC/);
assert.doesNotMatch(enNews[0].content, /tugboats|4,650|Stewart|Tuzcu|Bolat and Sidhu|technical teams|NATO Summit/);
assert.doesNotMatch(trNews[0].content, /römorkör|4\.650|Stewart|Tuzcu|Bolat ve Sidhu|teknik ekipler|NATO Zirvesi/);
assert.match(enNews[0].link || '', /consultations\/trade\/2026-07-29-turkiye/);

assert.match(enNews[1].title, /Express Entry #453|Transport occupations/);
assert.match(trNews[1].title, /Express Entry #453|Ulaştırma meslekleri/);
assert.doesNotMatch(enNews[1].title, /#452|#451|#450|#449|#448|#447|French-language|Trades Occupations|Provincial Nominee Program|Canadian Experience Class/);
assert.match(enNews[1].content, /150 invitations|CRS score of 477|Transport Occupations|#453/);
assert.match(trNews[1].content, /150 davet|477 CRS|#453|Transport Occupations/);
assert.match(enNews[1].content, /1081936|1081876|1081832|1081461|1081344|1081246|1080909|0980843|0980374|0980361/);
assert.match(enNews[1].link || '', /express-entry-rounds\.html/);
assert.match(enNews[1].content, /454 round records/);
assert.match(enNews[1].content, /Saturday, 31 October 2026 at 03:01:09 GMT/);
assert.match(enNews[1].content, /142196 bytes/);
assert.match(enNews[1].content, /142197 bytes/);
assert.doesNotMatch(enNews[1].content, /142199 bytes/);
assert.doesNotMatch(enNews[1].content, /Saturday, 31 October 2026 at 03:00:35 GMT/);
assert.doesNotMatch(enNews[1].content, /Saturday, 31 October 2026 at 02:00:08 GMT/);
assert.doesNotMatch(enNews[1].content, /Saturday, 31 October 2026 at 00:00:51 GMT/);
assert.doesNotMatch(enNews[1].content, /Saturday, 31 October 2026 at 00:00:31 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 23:55:48 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 23:58:17 GMT/);

assert.match(enNews[1].content, /invitations.html\?q=453/);
assert.match(enNews[1].content, /dedicated homepage article for official round #453/);
assert.match(enNews[1].content, /dedicated homepage article for official round #452/);
assert.doesNotMatch(enNews[1].content, /does not yet list a dedicated homepage article for official round #453/);
assert.match(enNews[1].content, /article:published_time 2026-10-28T14:10:33\+00:00/);
assert.match(enNews[1].content, /article:modified_time 2026-10-28T14:10:33\+00:00/);
assert.match(enNews[1].content, /article:published_time 2026-10-27T14:38:42\+00:00/);
assert.match(enNews[1].content, /1081936/);
assert.match(enNews[1].content, /1081876/);
assert.match(enNews[1].content, /1081832/);
assert.match(enNews[1].content, /1081461[\s\S]*is NOT on the homepage/);
assert.match(enNews[1].content, /1081344[\s\S]*is NOT on the homepage/);
assert.match(enNews[1].content, /1081246[\s\S]*is NOT on the homepage/);
assert.match(enNews[1].content, /1080909[\s\S]*is NOT on the homepage/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:05:41 GMT/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:06:28 GMT/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:02:09 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 21:06:36 GMT/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:25:49 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 21:05:29 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:22:50 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:18:22 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:34:46 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:44:31 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:00:09 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 18:54:19 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 17:47:32 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 14:24:43 GMT/);
assert.match(enNews[1].content, /Wednesday, 28 October 2026 at 13:37:19 GMT/);
assert.match(enNews[1].content, /urllib first\/extra\/extra2\/later HTTP 200 for the official JSON/);
assert.match(enNews[1].content, /wget first HTTP 200 742096 bytes/);
assert.doesNotMatch(enNews[1].content, /urllib first\/extra\/extra2\/later timed out \(0 bytes\) for the official JSON/);
assert.doesNotMatch(enNews[1].content, /wget first timed out \(0 bytes\)/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:57:23 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 20:04:03 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 18:59:21 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:03:02 GMT/);
assert.match(enNews[1].content, /1082033[\s\S]*Newfoundland/);
assert.match(enNews[1].content, /1081969[\s\S]*wait-times|1081969[\s\S]*extension wait-times/);
assert.match(enNews[1].content, /1081969[\s\S]*is NOT on the homepage this hour/);
assert.match(enNews[1].content, /curl HTTP\/2 first INTERNAL_ERROR \(0 bytes\)/);
assert.match(enNews[1].content, /curl HTTP\/1.1 first timed out \(0 bytes\)/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 first HTTP 200 742096 bytes/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/1.1 first HTTP 200 742096 bytes/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 first HTTP 200 142188/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/1.1 first HTTP 200 142195/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 first HTTP 200 142190/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/1.1 first HTTP 200 142199/);
assert.match(trNews[1].content, /30 Ekim 2026 Cuma 21\.05\.41 GMT/);
assert.match(trNews[1].content, /30 Ekim 2026 Cuma 21\.06\.28 GMT/);
assert.doesNotMatch(trNews[1].content, /30 Ekim 2026 Cuma 21\.06\.36 GMT/);
assert.match(trNews[1].content, /30 Ekim 2026 Cuma 21\.25\.49 GMT/);
assert.doesNotMatch(trNews[1].content, /30 Ekim 2026 Cuma 21\.05\.29 GMT/);
assert.doesNotMatch(trNews[1].content, /30 Ekim 2026 Cuma 19\.22\.50 GMT/);
assert.doesNotMatch(trNews[1].content, /30 Ekim 2026 Cuma 19\.18\.22 GMT/);
assert.doesNotMatch(trNews[1].content, /30 Ekim 2026 Cuma 19\.34\.46 GMT/);
assert.doesNotMatch(trNews[1].content, /30 Ekim 2026 Cuma 19\.44\.31 GMT/);
assert.doesNotMatch(trNews[1].content, /30 Ekim 2026 Cuma 19\.57\.23 GMT/);
assert.doesNotMatch(trNews[1].content, /30 Ekim 2026 Cuma 20\.04\.03 GMT/);
assert.match(trNews[1].content, /1082033/);
assert.match(trNews[1].content, /1081969/);
assert.match(trNews[1].content, /1081936/);
assert.match(trNews[1].content, /1081876/);
assert.match(trNews[1].content, /1082079/);
assert.match(trNews[1].content, /1082085/);
assert.match(enNews[1].content, /1081857[\s\S]*Alberta provincial nomination/);
assert.match(enNews[1].content, /1081864[\s\S]*citizenship-by-descent/);
assert.match(enNews[1].content, /1081904[\s\S]*CRS-score pool breakdown/);
assert.match(enNews[1].content, /1081903[\s\S]*Minnesota citizenship-by-descent/);
assert.match(enNews[1].content, /1081923[\s\S]*British Columbia provincial nomination/);
assert.match(enNews[1].content, /1081930[\s\S]*work-permit extension/);
assert.match(enNews[1].content, /1081947[\s\S]*LMIA/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:01:47 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 21:00:54 GMT/);
assert.match(enNews[1].content, /1082033[\s\S]{0,480}urllib first\/extra HTTP 200, extra2 handshake timed out, later HTTP 200/);
assert.doesNotMatch(enNews[1].content, /1082033 is a Newfoundland[\s\S]{0,350}urllib first timed out/);
assert.doesNotMatch(enNews[1].content, /1082033[\s\S]{0,350}urllib first HTTP 502/);
assert.match(enNews[1].content, /1081956[\s\S]*Greater Boston citizenship-by-descent/);
assert.match(enNews[1].content, /1081956[\s\S]*urllib first HTTP 200, extra timed out \(0 bytes\), extra2 HTTP 200, later timed out \(0 bytes\)/);
assert.doesNotMatch(enNews[1].content, /1081956[\s\S]{0,280}urllib first timed out/);
assert.match(enNews[1].content, /1081995[\s\S]*Bill C-3/);
assert.match(enNews[1].content, /1082000[\s\S]*study-permit/);
assert.match(enNews[1].content, /1082000[\s\S]*urllib first HTTP 200, extra timed out \(0 bytes\), extra2 HTTP 200, later handshake timed out/);
assert.doesNotMatch(enNews[1].content, /1082000[\s\S]{0,280}urllib first timed out/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:00:48 GMT/);
assert.match(enNews[1].content, /1081947[\s\S]{0,420}urllib first HTTP 200/);
assert.doesNotMatch(enNews[1].content, /1081947 is a work-permit LMIA[\s\S]{0,280}urllib first timed out/);
assert.match(enNews[1].content, /1082033[\s\S]*Newfoundland and Labrador/);
assert.match(enNews[1].content, /1081957[\s\S]*Saskatchewan/);
assert.match(enNews[1].content, /1081957[\s\S]*urllib first HTTP 200, extra handshake timed out, extra2 HTTP 200, later handshake timed out/);
assert.doesNotMatch(enNews[1].content, /1081957[\s\S]{0,280}urllib first timed out/);
assert.match(enNews[1].content, /1082079[\s\S]*Archives of Ontario/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:25:09 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 21:03:31 GMT/);
assert.match(enNews[1].content, /1082085[\s\S]*European student-exchange/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:24:19 GMT/);
assert.match(enNews[1].content, /1081816[\s\S]*is NOT on the homepage/);
assert.match(enNews[1].content, /1081816[\s\S]*Friday, 30 October 2026 at 21:02:09 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 21:06:36 GMT/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:04:52 GMT/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:06:59 GMT/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:06:30 GMT/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:09:17 GMT/);
assert.match(enNews[1].content, /Friday, 30 October 2026 at 21:09:13 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:21:15 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:24:08 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:40:14 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:24:14 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:37:10 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:17:10 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:17:28 GMT/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 19:31:27 GMT/);
assert.match(enNews[1].content, /Verified 06:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[1].content, /Verified 05:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[1].content, /Verified 04:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[1].content, /Verified 03:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[1].content, /Verified 02:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[1].content, /Verified 01:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[1].content, /Verified 00:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[1].content, /Verified 23:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[1].content, /Verified 22:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[1].content, /Friday, 30 October 2026 at 22:00:44 GMT/);

assert.match(enNews[2].title, /skilled military recruits/i);
assert.match(trNews[2].title, /nitelikli askeri adaylar/i);
assert.match(enNews[2].content, /FSMA|ten years|40042|42102|43204|Canadian Forces Recruiting Group/);
assert.match(trNews[2].content, /FSMA|10 yıl|40042|42102|43204/);
assert.match(enNews[2].link || '', /category-based-selection\.html/);
assert.match(enNews[2].content, /submit-profile\/rounds-invitations\/category-based-selection\.html/);
assert.match(enNews[2].content, /skilled-military category is unchanged|skilled-military category unchanged/);
assert.match(enNews[2].content, /Saturday, 31 October 2026 at 03:07:08 GMT/);
assert.match(enNews[2].content, /54762 bytes/);
assert.doesNotMatch(enNews[2].content, /Saturday, 31 October 2026 at 02:06:17 GMT/);
assert.doesNotMatch(enNews[2].content, /Saturday, 31 October 2026 at 00:08:32 GMT/);
assert.doesNotMatch(enNews[2].content, /Friday, 30 October 2026 at 22:46:17 GMT/);
assert.doesNotMatch(enNews[2].content, /Friday, 30 October 2026 at 21:43:13 GMT/);
assert.doesNotMatch(enNews[2].content, /Friday, 30 October 2026 at 23:38:31 GMT/);
assert.doesNotMatch(enNews[2].content, /54764 bytes/);
assert.doesNotMatch(enNews[2].content, /54763 bytes/);
assert.doesNotMatch(enNews[2].content, /Friday, 30 October 2026 at 19:10:05 GMT/);
assert.match(enNews[2].content, /Official category page urllib first HTTP 200 Last-Modified Saturday, 31 October 2026 at 03:07:08 GMT \(54762 bytes\)/);
assert.match(enNews[2].content, /extra HTTP 200 Last-Modified Saturday, 31 October 2026 at 03:07:08 GMT \(54762 bytes\)/);
assert.match(enNews[2].content, /wget first HTTP 200 Last-Modified Saturday, 31 October 2026 at 03:07:08 GMT \(54762 bytes\)/);
assert.doesNotMatch(enNews[2].content, /Official category page urllib first\/extra\/extra2\/later timed out \(0 bytes\)/);
assert.doesNotMatch(enNews[2].content, /wget first timed out \(0 bytes\)/);
assert.match(enNews[2].content, /Verified 06:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 05:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 04:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 03:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 02:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 01:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 00:00 UTC 31 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 23:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 22:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 21:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 20:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 19:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 18:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 17:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 16:00 UTC 30 October 2026/);
assert.doesNotMatch(enNews[2].link || '', /\/express-entry\/category-based-selection\.html$/);
assert.match(enNews[2].content, /curl HTTP\/2 first INTERNAL_ERROR \(0 bytes\)/);
assert.match(enNews[2].content, /curl HTTP\/1.1 first timed out \(0 bytes\)/);
assert.doesNotMatch(enNews[2].content, /curl HTTP\/2 first HTTP 301 \(0 bytes\)/);
assert.doesNotMatch(enNews[2].content, /curl HTTP\/1.1 first HTTP 301 \(0 bytes\)/);
assert.match(enNews[2].content, /skilled-military-recruits urllib first HTTP 404 this hour/);
assert.match(enNews[2].content, /french-language-proficiency urllib first HTTP 404 this hour/);
assert.match(enNews[2].content, /researchers and medical-doctors urllib first HTTP 404 this hour/);
assert.doesNotMatch(enNews[2].content, /french-language-proficiency urllib first HTTP 504 this hour/);
assert.doesNotMatch(enNews[2].content, /french-language-proficiency, researchers, and medical-doctors urllib first HTTP 404 this hour/);
assert.doesNotMatch(enNews[2].content, /skilled-military-recruits urllib first timed out this hour/);
assert.doesNotMatch(enNews[2].content, /french-language-proficiency, researchers, and medical-doctors urllib first timed out this hour/);
assert.doesNotMatch(enNews[2].content, /later HTTP 200 Last-Modified Friday, 30 October 2026 at 19:56:44 GMT \(54760 bytes\)/);
assert.doesNotMatch(enNews[2].content, /extra HTTP 200 Last-Modified Friday, 30 October 2026 at 19:56:44 GMT \(54761 bytes\)/);
assert.doesNotMatch(enNews[2].content, /later HTTP 200 Last-Modified Friday, 30 October 2026 at 23:38:31 GMT \(54761 bytes\)/);
assert.doesNotMatch(enNews[2].content, /extra HTTP 200 Last-Modified Friday, 30 October 2026 at 21:43:13 GMT \(54761 bytes\)/);

console.log('canadaNews tests passed');
