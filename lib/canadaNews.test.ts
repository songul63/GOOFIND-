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
assert.match(enNews[0].content, /JETCO country-news path returned urllib first HTTP 200/);
assert.match(enNews[0].content, /extra HTTP 200, extra2 handshake timed out, later HTTP 200/);
assert.doesNotMatch(enNews[0].content, /urllib first handshake timed out/);
assert.doesNotMatch(enNews[0].content, /later handshake timed out/);
assert.match(enNews[0].content, /FTA info urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later HTTP 200/);
assert.doesNotMatch(enNews[0].content, /FTA info urllib first HTTP 200, extra HTTP 200, extra2 handshake timed out, later HTTP 200/);
assert.match(enNews[0].content, /relations urllib first HTTP 200, extra HTTP 200, extra2 handshake timed out, later HTTP 200/);
assert.doesNotMatch(enNews[0].content, /relations urllib first HTTP 200, extra HTTP 200, extra2 HTTP 200, later handshake timed out/);
assert.match(enNews[0].content, /Verified 08:00 UTC 29 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 07:00 UTC 29 October 2026/);
assert.doesNotMatch(enNews[0].content, /Verified 06:00 UTC 29 October 2026/);
assert.match(trNews[0].content, /3,3 milyar|2\.550|JETCO|2026-10-06/);
assert.match(trNews[0].content, /08\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /07\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /06\.00 UTC/);
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
assert.match(enNews[1].content, /Thursday, 29 October 2026 at 07:01:12 GMT/);
assert.match(enNews[1].content, /Thursday, 29 October 2026 at 07:10:32 GMT/);
assert.match(enNews[1].content, /Thursday, 29 October 2026 at 08:04:56 GMT/);
assert.match(enNews[1].content, /Wednesday, 28 October 2026 at 13:37:19 GMT/);
assert.match(enNews[1].content, /Thursday, 29 October 2026 at 02:36:25 GMT/);
assert.doesNotMatch(enNews[1].content, /Wednesday, 28 October 2026 at 21:19:25 GMT/);
assert.doesNotMatch(enNews[1].content, /Wednesday, 28 October 2026 at 20:19:43 GMT/);
assert.doesNotMatch(enNews[1].content, /Wednesday, 28 October 2026 at 20:16:53 GMT/);
assert.doesNotMatch(enNews[1].content, /Thursday, 29 October 2026 at 01:58:44 GMT/);
assert.doesNotMatch(enNews[1].content, /Thursday, 29 October 2026 at 01:58:58 GMT/);
assert.doesNotMatch(enNews[1].content, /Wednesday, 28 October 2026 at 22:03:03 GMT/);
assert.match(enNews[1].content, /larger JSON-driven table/);
assert.match(enNews[1].content, /urllib first\/extra\/extra2\/later timed out retrieving the official JSON/);
assert.doesNotMatch(enNews[1].content, /urllib first\/extra\/extra2\/later retrieved the official JSON/);
assert.match(enNews[1].content, /wget first HTTP 200 742096 bytes/);
assert.match(enNews[1].content, /wget first HTTP 200 142196 bytes/);
assert.doesNotMatch(enNews[1].content, /wget first timed out \(0 bytes\)/);
assert.match(enNews[1].content, /Verified 08:00 UTC 29 October 2026/);
assert.doesNotMatch(enNews[1].content, /Verified 07:00 UTC 29 October 2026/);
assert.doesNotMatch(enNews[1].content, /Verified 06:00 UTC 29 October 2026/);
assert.match(enNews[1].content, /curl HTTP\/2 first INTERNAL_ERROR/);
assert.match(enNews[1].content, /curl HTTP\/1.1 first timed out/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 first HTTP 200 742096/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/1.1 first HTTP 200 742096/);
assert.match(trNews[1].content, /29 Ekim 2026 Perşembe 07\.01\.12 GMT/);
assert.match(trNews[1].content, /29 Ekim 2026 Perşembe 07\.10\.32 GMT/);
assert.match(trNews[1].content, /29 Ekim 2026 Perşembe 08\.04\.56 GMT/);
assert.match(trNews[1].content, /29 Ekim 2026 Perşembe 02\.36\.25 GMT/);
assert.doesNotMatch(trNews[1].content, /21\.19\.25/);
assert.doesNotMatch(trNews[1].content, /20\.19\.43/);
assert.doesNotMatch(trNews[1].content, /20\.16\.53/);
assert.doesNotMatch(trNews[1].content, /22\.03\.03/);
assert.doesNotMatch(trNews[1].content, /01\.58\.44/);
assert.match(trNews[1].content, /1081936/);
assert.match(trNews[1].content, /1081876/);
assert.match(enNews[1].content, /1081857[\s\S]*Alberta provincial nomination/);
assert.match(enNews[1].content, /1081864[\s\S]*citizenship-by-descent/);
assert.match(enNews[1].content, /1081904[\s\S]*CRS-score pool breakdown/);
assert.match(enNews[1].content, /1081903[\s\S]*Minnesota citizenship-by-descent/);
assert.match(enNews[1].content, /1081923[\s\S]*British Columbia provincial nomination/);
assert.match(enNews[1].content, /1081930[\s\S]*work-permit extension/);
assert.match(enNews[1].content, /1081947[\s\S]*LMIA/);
assert.match(enNews[1].content, /1081956[\s\S]*Greater Boston citizenship-by-descent/);
assert.match(enNews[1].content, /1082000[\s\S]*study-permit/);

assert.match(enNews[2].title, /skilled military recruits/i);
assert.match(trNews[2].title, /nitelikli askeri adaylar/i);
assert.match(enNews[2].content, /FSMA|ten years|40042|42102|43204|Canadian Forces Recruiting Group/);
assert.match(trNews[2].content, /FSMA|10 yıl|40042|42102|43204/);
assert.match(enNews[2].link || '', /category-based-selection\.html/);
assert.match(enNews[2].content, /submit-profile\/rounds-invitations\/category-based-selection\.html/);
assert.match(enNews[2].content, /skilled-military category unchanged/);
assert.match(enNews[2].content, /Thursday, 29 October 2026 at 02:49:10 GMT/);
assert.match(enNews[2].content, /54760 bytes/);
assert.doesNotMatch(enNews[2].content, /54763 bytes/);
assert.doesNotMatch(enNews[2].content, /54761 bytes/);
assert.match(enNews[2].content, /urllib first\/extra\/extra2\/later timed out this hour/);
assert.match(enNews[2].content, /wget first HTTP 200/);
assert.match(enNews[2].content, /wget first HTTP 404/);
assert.doesNotMatch(enNews[2].content, /wget first timed out \(0 bytes\)/);
assert.doesNotMatch(enNews[2].content, /Thursday, 29 October 2026 at 00:55:25 GMT/);
assert.match(enNews[2].content, /Verified 08:00 UTC 29 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 07:00 UTC 29 October 2026/);
assert.doesNotMatch(enNews[2].content, /Verified 06:00 UTC 29 October 2026/);
assert.doesNotMatch(enNews[2].link || '', /\/express-entry\/category-based-selection\.html$/);
assert.match(enNews[2].content, /curl HTTP\/2 first INTERNAL_ERROR/);
assert.match(enNews[2].content, /curl HTTP\/1.1 first timed out/);
assert.doesNotMatch(enNews[2].content, /curl HTTP\/2 first HTTP 301/);
assert.doesNotMatch(enNews[2].content, /curl HTTP\/1.1 first HTTP 301/);
assert.match(enNews[2].content, /Dedicated category URLs[\s\S]*urllib first timed out this hour/);
assert.doesNotMatch(enNews[2].content, /extra2 HTTP 200/);
assert.doesNotMatch(enNews[2].content, /later HTTP 200 Last-Modified Thursday, 29 October 2026 at 02:49:10 GMT 54763 bytes/);

console.log('canadaNews tests passed');
