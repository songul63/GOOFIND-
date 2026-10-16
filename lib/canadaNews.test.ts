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
assert.match(enNews[0].content, /\$3\.3 billion|2,550|JETCO|Carney|Erdoğan|agri-food|dateModified is now 2026-10-06/);
assert.match(enNews[0].content, /Notice of intent|date-modified 2026-10-09|September 21, 2026/);
assert.match(trNews[0].content, /3,3 milyar|2\.550|JETCO|Carney|Erdoğan|2026-10-06/);
assert.doesNotMatch(enNews[0].content, /tugboats|4,650|Stewart|Tuzcu|Bolat and Sidhu|technical teams|NATO Summit/);
assert.doesNotMatch(trNews[0].content, /römorkör|4\.650|Stewart|Tuzcu|Bolat ve Sidhu|teknik ekipler|NATO Zirvesi/);
assert.match(enNews[0].link || '', /consultations\/trade\/2026-07-29-turkiye/);

assert.match(enNews[1].title, /Express Entry #449|Canadian Experience Class/);
assert.match(trNews[1].title, /Express Entry #449|Canadian Experience Class/);
assert.doesNotMatch(enNews[1].title, /#448|#447|Trades Occupations|Provincial Nominee Program/);
assert.match(enNews[1].content, /2,500 invitations|CRS score of 519|Canadian Experience Class|#449/);
assert.match(trNews[1].content, /2\.500 davet|519 CRS|#449|Canadian Experience Class/);
assert.match(enNews[1].content, /1081246|1080909|0980843|0980374|0980361/);
assert.match(enNews[1].link || '', /express-entry-rounds\.html/);
assert.match(enNews[1].content, /450 round records/);
assert.match(enNews[1].content, /Thursday, 15 October 2026 at 14:37:19 GMT/);
assert.match(enNews[1].content, /691506 bytes/);

assert.match(enNews[2].title, /skilled military recruits/i);
assert.match(trNews[2].title, /nitelikli askeri adaylar/i);
assert.match(enNews[2].content, /Foreign Skilled Military Applicant|NOC 40042|42102|43204/);
assert.match(trNews[2].content, /FSMA|NOC 40042|42102|43204/);
assert.match(enNews[2].link || '', /category-based-selection\.html/);
assert.match(enNews[2].content, /latest official round is now #449/);

for (const item of enNews) {
  assert.match(item.content || '', /08:00 UTC on 16 October 2026/);
  assert.doesNotMatch(item.content || '', /07:00 UTC on 16 October 2026/);
  assert.doesNotMatch(item.content || '', /06:00 UTC on 16 October 2026/);
  assert.doesNotMatch(item.content || '', /05:00 UTC on 16 October 2026/);
  assert.doesNotMatch(item.content || '', /04:00 UTC on 16 October 2026/);
  assert.doesNotMatch(item.content || '', /03:00 UTC on 16 October 2026/);
  assert.doesNotMatch(item.content || '', /02:00 UTC on 16 October 2026/);
  assert.doesNotMatch(item.content || '', /00:00 UTC on 16 October 2026/);
  assert.doesNotMatch(item.content || '', /23:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /22:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /21:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /20:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /19:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /18:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /17:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /16:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /15:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /14:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /13:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /12:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /11:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /10:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /09:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /08:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /07:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /06:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /05:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /04:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /03:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /02:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /01:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /00:00 UTC on 15 October 2026/);
  assert.doesNotMatch(item.content || '', /23:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /22:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /21:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /20:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /19:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /18:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /17:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /16:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /15:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /14:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /13:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /12:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /09:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /08:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /07:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /06:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /01:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /00:00 UTC on 14 October 2026/);
  assert.doesNotMatch(item.content || '', /23:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /22:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /21:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /00:00 UTC on 13 October 2026/);
}
for (const item of trNews) {
  assert.match(item.content || '', /16 Ekim 2026 08\.00 UTC/);
  assert.doesNotMatch(item.content || '', /16 Ekim 2026 07\.00 UTC/);
  assert.doesNotMatch(item.content || '', /16 Ekim 2026 06\.00 UTC/);
  assert.doesNotMatch(item.content || '', /16 Ekim 2026 05\.00 UTC/);
  assert.doesNotMatch(item.content || '', /16 Ekim 2026 04\.00 UTC/);
  assert.doesNotMatch(item.content || '', /16 Ekim 2026 03\.00 UTC/);
  assert.doesNotMatch(item.content || '', /16 Ekim 2026 02\.00 UTC/);
  assert.doesNotMatch(item.content || '', /16 Ekim 2026 00\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 23\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 22\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 21\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 20\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 19\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 18\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 17\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 16\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 15\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 14\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 13\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 12\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 11\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 10\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 09\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 08\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 07\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 06\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 05\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 04\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 03\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 02\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 01\.00 UTC/);
  assert.doesNotMatch(item.content || '', /15 Ekim 2026 00\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 23\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 22\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 21\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 20\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 19\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 18\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 17\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 16\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 15\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 14\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 13\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 12\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 09\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 08\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 07\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 06\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 01\.00 UTC/);
  assert.doesNotMatch(item.content || '', /14 Ekim 2026 00\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 23\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 22\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 21\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 00\.00 UTC/);
}

assert.match(enNews[0].desc || '', /08:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /07:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /06:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /05:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /04:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /03:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /02:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /00:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /23:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /22:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /21:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /20:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /19:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /18:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /17:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /16:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /15:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /14:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /13:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /12:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /11:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /10:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /09:00 UTC/);
assert.match(trNews[0].desc || '', /08\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /07\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /06\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /05\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /04\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /03\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /02\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /00\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /23\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /22\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /21\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /20\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /19\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /18\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /17\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /16\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /15\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /14\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /13\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /12\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /11\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /10\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /09\.00 UTC/);

assert.match(enNews[1].content, /1081246 article first try this hour HTTP 200 Last-Modified Friday, 16 October 2026 at 01:12:34 GMT/);
assert.match(enNews[1].content, /later HTTP 200 Last-Modified Friday, 16 October 2026 at 01:12:34 GMT; retry HTTP 200 Last-Modified Friday, 16 October 2026 at 01:12:34 GMT/);
assert.match(enNews[1].content, /extra confirmation Last-Modified Friday, 16 October 2026 at 01:12:34 GMT \/ 01:12:34 GMT/);
assert.match(enNews[1].content, /Last hour the 1081246 article[\s\S]*extra confirmation Last-Modified Friday, 16 October 2026 at 01:12:34 GMT \/ 01:12:34 GMT/);
assert.match(enNews[1].content, /last hour the 1081246 article first try HTTP 200 Last-Modified Friday, 16 October 2026 at 01:12:34 GMT/i);
assert.match(enNews[1].content, /1080909 article first try this hour HTTP 200 Last-Modified Friday, 16 October 2026 at 01:02:40 GMT/);
assert.match(enNews[1].content, /later HTTP 200 Last-Modified Friday, 16 October 2026 at 01:02:40 GMT; retry HTTP 200 Last-Modified Friday, 16 October 2026 at 01:02:40 GMT/);
assert.match(enNews[1].content, /extra2 HTTP 200 Last-Modified Friday, 16 October 2026 at 01:02:40 GMT/);
assert.match(enNews[1].content, /Last hour the 1080909 article first try HTTP 200 Last-Modified Friday, 16 October 2026 at 01:02:40 GMT/);
assert.match(enNews[1].content, /CIC News homepage Last-Modified this hour is Friday, 16 October 2026 at 01:07:17 GMT on first try/);
assert.match(enNews[1].content, /Friday, 16 October 2026 at 01:07:17 GMT on later/);
assert.match(enNews[1].content, /Friday, 16 October 2026 at 01:07:17 GMT on retry/);
assert.match(enNews[1].content, /last hour Friday, 16 October 2026 at 01:07:17 GMT/);
assert.match(enNews[1].content, /The CIC 0980843 article first try this hour HTTP 200 Last-Modified Friday, 16 October 2026 at 01:17:55 GMT/);
assert.match(enNews[1].content, /retry HTTP 200 Last-Modified Friday, 16 October 2026 at 01:17:55 GMT/);
assert.match(enNews[1].content, /extra confirmation Last-Modified Friday, 16 October 2026 at 01:17:55 GMT \/ 01:17:55 GMT/);
assert.match(enNews[1].content, /last hour first try HTTP 200 Last-Modified Friday, 16 October 2026 at 01:17:55 GMT/);
assert.match(enNews[1].content, /The CIC 0980374 article first try this hour HTTP 200 Last-Modified Friday, 16 October 2026 at 01:02:46 GMT/);
assert.match(enNews[1].content, /canonical 0980361 URL\) first try this hour HTTP 200 Last-Modified Friday, 16 October 2026 at 01:11:12 GMT/);
assert.match(enNews[1].content, /last hour first try HTTP 200 Last-Modified Friday, 16 October 2026 at 01:12:36 GMT/);
assert.match(enNews[1].content, /later HTTP 200 Last-Modified Friday, 16 October 2026 at 01:11:12 GMT; retry HTTP 200 Last-Modified Friday, 16 October 2026 at 01:11:12 GMT/);
assert.match(enNews[1].content, /extra confirmation Last-Modified Friday, 16 October 2026 at 01:11:12 GMT \/ 01:11:12 GMT/);
assert.match(enNews[1].content, /table now starts with October 15 Canadian Experience Class 2,500 invitations \/ CRS 519/);
assert.match(enNews[1].content, /Official Express Entry rounds HTML returned HTTP 200 over Python urllib on first try, later, and retry this hour/);
assert.match(enNews[1].content, /wget first try HTTP 200 Last-Modified Friday, 16 October 2026 at 02:42:44 GMT/);
assert.match(enNews[1].content, /extra confirmation wget HTTP 200 \/ HTTP 200 Last-Modified Friday, 16 October 2026 at 02:42:44 GMT \/ 02:42:44 GMT/);
assert.match(enNews[1].content, /Last hour that page returned HTTP 200 over Python urllib on first try, later, and retry/);
assert.match(enNews[1].content, /urllib first try HTTP 200 Last-Modified Friday, 16 October 2026 at 03:01:27 GMT/);
assert.match(enNews[1].content, /later HTTP 200 Last-Modified Friday, 16 October 2026 at 02:44:05 GMT; retry HTTP 200 Last-Modified Friday, 16 October 2026 at 03:01:27 GMT/);
assert.match(enNews[1].content, /wget first try HTTP 200 Last-Modified Friday, 16 October 2026 at 03:01:27 GMT/);
assert.match(enNews[2].content, /wget first try HTTP 200 Last-Modified Friday, 16 October 2026 at 03:01:27 GMT/);
assert.match(enNews[2].content, /last hour urllib first try HTTP 200 Last-Modified Friday, 16 October 2026 at 02:44:05 GMT/);
assert.match(enNews[1].content, /ee_rounds_123_en.json returned HTTP 200 over Python urllib on first try, later, and retry/);
assert.match(enNews[1].content, /curl HTTP\/2 returned HTTP 200 this hour on first try, later, and retry/);
assert.match(enNews[1].content, /curl HTTP\/1.1 returned HTTP 200 this hour on first try, later, and retry/);
assert.match(enNews[1].content, /Python urllib returned HTTP 200 this hour on first try, later, and retry/);
assert.match(enNews[1].content, /wget first\/later\/retry HTTP 200/);
assert.match(enNews[1].content, /Last hour wget first\/later\/retry HTTP 200/);
assert.match(trNews[1].content, /wget ilk\/sonraki\/yeniden denemede HTTP 200 verdi/);
assert.match(trNews[1].content, /Geçen saat wget ilk\/sonraki\/yeniden denemede HTTP 200 verdi/);
assert.match(enNews[1].content, /Last hour curl HTTP\/2 returned INTERNAL_ERROR/);
assert.match(enNews[1].content, /Last hour curl HTTP\/1.1 timed out/);
assert.match(enNews[1].content, /extra confirmation urllib HTTP 200 \/ HTTP 200/);
assert.match(enNews[1].content, /Last hour extra confirmation urllib HTTP 200 \/ HTTP 200/);
assert.match(enNews[1].content, /invitations.html\?q=449/);
assert.match(enNews[1].content, /still lists a dedicated homepage article for official round #449/);
assert.match(enNews[1].content, /1081430 unused/);
assert.match(enNews[1].content, /1081434 unused/);
assert.match(enNews[1].content, /1081415 unused/);
assert.match(enNews[1].content, /1081337 unused/);
assert.match(enNews[1].content, /1081344 on homepage/);
assert.match(enNews[1].content, /1081246 on homepage/);
assert.match(enNews[1].content, /1080909 on homepage/);
assert.match(enNews[1].content, /0980361 NOT on homepage/);
assert.match(enNews[1].content, /1081344 article first try this hour HTTP 200 Last-Modified Friday, 16 October 2026 at 01:04:19 GMT/);
assert.match(enNews[1].content, /1081241 unused/);
assert.match(enNews[1].content, /1081284 unused/);
assert.match(enNews[1].content, /1081301 NOT on homepage/);
assert.match(enNews[1].content, /1081349 unused/);
assert.match(enNews[1].content, /1081387 unused/);
assert.match(enNews[1].content, /1081365 unused/);
assert.match(enNews[1].content, /1081123 NOT on homepage/);
assert.match(enNews[1].content, /1080995 unused/);
assert.match(enNews[1].content, /PEI 195 not listed/);
assert.match(enNews[1].content, /1081053 NOT on homepage/);
assert.match(enNews[1].content, /article:published_time 2026-10-13T15:29:43\+00:00/);

assert.match(trNews[1].content, /1081246 yazısı bu saatte ilk denemede HTTP 200 Last-Modified 16 Ekim 2026 Cuma 01\.12\.34 GMT/);
assert.match(trNews[1].content, /ek teyit Last-Modified 16 Ekim 2026 Cuma 01\.12\.34 GMT/);
assert.match(trNews[1].content, /Geçen saat 1081246 yazısı[\s\S]*ek teyit Last-Modified 16 Ekim 2026 Cuma 01\.12\.34 GMT/);
assert.match(trNews[1].content, /geçen saat urllib ilk denemede HTTP 200 Last-Modified 16 Ekim 2026 Cuma 02\.44\.05 GMT/);
assert.match(trNews[1].content, /16 Ekim 2026 Cuma 01\.07\.17 GMT/);
assert.match(trNews[1].content, /CIC 0980843 yazısı bu saatte ilk denemede HTTP 200 Last-Modified 16 Ekim 2026 Cuma 01\.17\.55 GMT/);
assert.match(trNews[1].content, /16 Ekim 2026 Cuma 01\.02\.46 GMT/);
assert.match(trNews[1].content, /16 Ekim 2026 Cuma 02\.42\.44 GMT/);
assert.match(trNews[1].content, /16 Ekim 2026 Cuma 02\.44\.05 GMT/);
assert.match(trNews[1].content, /16 Ekim 2026 Cuma 03\.01\.27 GMT/);
assert.match(trNews[1].content, /15 Ekim 2026 Perşembe 14\.37\.19 GMT/);

const staleHours = [
  '07:00 UTC on 16 October 2026',
  '06:00 UTC on 16 October 2026',
  '05:00 UTC on 16 October 2026',
  '04:00 UTC on 16 October 2026',
  '03:00 UTC on 16 October 2026',
  '02:00 UTC on 16 October 2026',
  '00:00 UTC on 16 October 2026',
  '23:00 UTC on 15 October 2026',
  '22:00 UTC on 15 October 2026',
  '21:00 UTC on 15 October 2026',
  '20:00 UTC on 15 October 2026',
  '19:00 UTC on 15 October 2026',
  '18:00 UTC on 15 October 2026',
  '17:00 UTC on 15 October 2026',
  '16:00 UTC on 15 October 2026',
  '15:00 UTC on 15 October 2026',
  '14:00 UTC on 15 October 2026',
  '13:00 UTC on 15 October 2026',
  '12:00 UTC on 15 October 2026',
  '11:00 UTC on 15 October 2026',
  '10:00 UTC on 15 October 2026',
  '09:00 UTC on 15 October 2026',
  '08:00 UTC on 15 October 2026',
  '07:00 UTC on 15 October 2026',
  '06:00 UTC on 15 October 2026',
  '05:00 UTC on 15 October 2026',
  '04:00 UTC on 15 October 2026',
  '03:00 UTC on 15 October 2026',
  '02:00 UTC on 15 October 2026',
  '01:00 UTC on 15 October 2026',
  '00:00 UTC on 15 October 2026',
  '23:00 UTC on 14 October 2026',
  '22:00 UTC on 14 October 2026',
  '21:00 UTC on 14 October 2026',
  '20:00 UTC on 14 October 2026',
  '19:00 UTC on 14 October 2026',
  '18:00 UTC on 14 October 2026',
  '17:00 UTC on 14 October 2026',
  '16:00 UTC on 14 October 2026',
  '15:00 UTC on 14 October 2026',
  '14:00 UTC on 14 October 2026',
  '13:00 UTC on 14 October 2026',
  '12:00 UTC on 14 October 2026',
  '11:00 UTC on 14 October 2026',
  '10:00 UTC on 14 October 2026',
  '09:00 UTC on 14 October 2026',
  '08:00 UTC on 14 October 2026',
  '07:00 UTC on 14 October 2026',
  '06:00 UTC on 14 October 2026',
  '05:00 UTC on 14 October 2026',
  '04:00 UTC on 14 October 2026',
  '03:00 UTC on 14 October 2026',
  '02:00 UTC on 14 October 2026',
  '01:00 UTC on 14 October 2026',
  '00:00 UTC on 14 October 2026',
  '23:00 UTC on 13 October 2026',
  '22:00 UTC on 13 October 2026',
  '21:00 UTC on 13 October 2026',
  '20:00 UTC on 13 October 2026',
  '18:00 UTC on 13 October 2026',
  '17:00 UTC on 13 October 2026',
  '16:00 UTC on 13 October 2026',
  '14:00 UTC on 13 October 2026',
  '00:00 UTC on 13 October 2026',
  '23:00 UTC on 12 October 2026',
  '22:00 UTC on 12 October 2026',
];
for (const stamp of staleHours) {
  for (const item of enNews) {
    assert.doesNotMatch(item.content || '', new RegExp(stamp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
}

console.log('canadaNews tests passed');
