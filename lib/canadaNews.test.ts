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
assert.match(enNews[0].content, /international\.canada\.ca probe first try this hour HTTP 200; later HTTP 200; retry HTTP 200; extra confirmation urllib HTTP 200 \/ HTTP 200/);
assert.match(enNews[0].content, /last hour first try HTTP 200; later HTTP 200; retry HTTP 200; extra confirmation urllib HTTP 200 \/ HTTP 200/);
assert.match(enNews[0].content, /JETCO path[\s\S]*first try this hour HTTP 404; later HTTP 404; retry HTTP 404/);
assert.match(enNews[0].content, /no-lang first try this hour HTTP 404; later HTTP 404; retry HTTP 404; extra confirmation HTTP 404 \/ HTTP 404/);
assert.match(enNews[0].content, /last hour first try timed out; later timed out; retry timed out; extra confirmation HTTP 404 \/ timed out/);
assert.match(enNews[0].content, /The consultation page first try this hour HTTP 200; later HTTP 200; retry HTTP 200; extra confirmation HTTP 200 \/ HTTP 200/);


assert.match(enNews[1].title, /Express Entry #450|French-language proficiency/);
assert.match(trNews[1].title, /Express Entry #450|Fransızca yeterlilik/);
assert.doesNotMatch(enNews[1].title, /#449|#448|#447|Trades Occupations|Provincial Nominee Program|Canadian Experience Class/);
assert.match(enNews[1].content, /5,000 invitations|CRS score of 435|French-Language proficiency|#450/);
assert.match(trNews[1].content, /5\.000 davet|435 CRS|#450|French-Language proficiency/);
assert.match(enNews[1].content, /1081461|1081344|1081246|1080909|0980843|0980374|0980361/);
assert.match(enNews[1].link || '', /express-entry-rounds\.html/);
assert.match(enNews[1].content, /451 round records/);
assert.match(enNews[1].content, /Friday, 16 October 2026 at 13:27:07 GMT/);
assert.match(enNews[1].content, /693170 bytes/);
assert.match(enNews[1].content, /CIC News homepage Last-Modified this hour is Monday, 19 October 2026 at 09:44:59 GMT on first try/);
assert.match(enNews[1].content, /Monday, 19 October 2026 at 09:44:59 GMT on later/);
assert.match(enNews[1].content, /Monday, 19 October 2026 at 09:44:59 GMT on retry/);
assert.match(enNews[1].content, /extra confirmation Last-Modified Monday, 19 October 2026 at 09:44:59 GMT \/ 09:44:59 GMT/);
assert.match(enNews[1].content, /last hour Monday, 19 October 2026 at 09:44:59 GMT on first try, Monday, 19 October 2026 at 09:44:59 GMT on later/);
assert.match(enNews[1].content, /last hour extra confirmation Last-Modified Monday, 19 October 2026 at 09:44:59 GMT \/ 09:44:59 GMT/);
assert.match(enNews[1].content, /wget later Last-Modified Monday, 19 October 2026 at 09:44:59 GMT/);
assert.match(enNews[1].content, /wget extra Last-Modified Monday, 19 October 2026 at 09:44:59 GMT/);
assert.match(enNews[1].content, /last hour wget first Last-Modified Monday, 19 October 2026 at 09:44:59 GMT/);
assert.match(enNews[1].content, /last hour wget\/curl extra2 Last-Modified Monday, 19 October 2026 at 09:44:59 GMT/);
assert.match(enNews[1].content, /earlier Monday, 19 October 2026 at 04:00:22 GMT on first try/);
assert.match(enNews[1].content, /earlier wget first Last-Modified Monday, 19 October 2026 at 04:00:22 GMT/);
assert.match(enNews[1].content, /1081612 unused/);
assert.match(enNews[1].content, /09:40:56 GMT/);
assert.match(enNews[1].content, /1081487 unused \(Last-Modified Monday, 19 October 2026 at 09:38:06 GMT this hour/);
assert.match(enNews[1].content, /1081461 on homepage/);
assert.match(enNews[1].content, /1081344 on homepage/);
assert.match(enNews[1].content, /1081246 on homepage/);
assert.match(enNews[1].content, /1080909 NOT on homepage/);
assert.match(enNews[1].content, /1081521 unused/);
assert.match(enNews[1].content, /1081487 unused/);
assert.match(enNews[1].content, /1081546 unused/);
assert.match(enNews[1].content, /1081461 article first try this hour HTTP 200 Last-Modified Monday, 19 October 2026 at 09:45:11 GMT/);
assert.match(enNews[1].content, /1081344 article first try this hour HTTP 200 Last-Modified Monday, 19 October 2026 at 09:36:44 GMT/);
assert.match(enNews[1].content, /Last hour the 1081344 article first try HTTP 200 Last-Modified Sunday, 18 October 2026 at 23:57:31 GMT/);
assert.match(enNews[1].content, /1081246 article first try this hour HTTP 200 Last-Modified Monday, 19 October 2026 at 09:38:54 GMT/);
assert.match(enNews[1].content, /extra confirmation Last-Modified Monday, 19 October 2026 at 09:38:54 GMT \/ 09:38:54 GMT/);
assert.match(enNews[1].content, /Last hour the 1081246 article first try HTTP 200 Last-Modified Monday, 19 October 2026 at 01:03:17 GMT/);
assert.match(enNews[1].content, /1080909 article first try this hour HTTP 200 Last-Modified Monday, 19 October 2026 at 09:53:11 GMT/);
assert.match(enNews[1].content, /curl HTTP\/2 returned INTERNAL_ERROR this hour on first try/);
assert.match(enNews[1].content, /curl HTTP\/1.1 timed out this hour on first try/);
assert.match(enNews[1].content, /Last hour curl HTTP\/2 first HTTP 200 later HTTP 200/);
assert.match(enNews[1].content, /Last hour curl HTTP\/1.1 first HTTP 200 later HTTP 200/);
assert.match(enNews[1].content, /0980374 article first try this hour HTTP 200 Last-Modified Monday, 19 October 2026 at 09:38:53 GMT/);
assert.match(enNews[1].content, /0980843 article first try this hour HTTP 200 Last-Modified Monday, 19 October 2026 at 09:53:03 GMT/);
assert.match(enNews[1].content, /Python urllib returned HTTP 200 this hour on first try/);
assert.match(enNews[1].content, /extra confirmation urllib HTTP 200 \/ HTTP 200/);
assert.match(enNews[1].content, /Last hour wget first\/later\/retry HTTP 200/);
assert.match(enNews[1].content, /This hour Python urllib first HTTP 200/);
assert.match(enNews[1].content, /This hour retry urllib HTTP 200/);
assert.match(enNews[1].content, /later HTTP 200 on official IRCC JSON/);
assert.match(enNews[1].content, /Last hour curl HTTP\/2 first HTTP 200 later HTTP 200/);
assert.match(enNews[1].content, /This hour wget first HTTP 200/);
assert.match(enNews[1].content, /10:02:13 GMT/);
assert.match(enNews[1].content, /Last hour official ee_rounds_123_en.json returned HTTP 200 over Python urllib on first try/);
assert.match(enNews[1].content, /invitations.html\?q=450/);
assert.match(enNews[1].content, /still lists a dedicated homepage article for official round #450/);
assert.match(enNews[1].content, /article:published_time 2026-10-16T13:50:05\+00:00/);
assert.match(enNews[1].content, /article:modified_time 2026-10-16T14:01:46\+00:00/);
assert.match(enNews[1].content, /table now starts with October 16 French-Language proficiency 5,000 invitations \/ CRS 435/);
assert.match(enNews[1].content, /0980361 URL\) first try this hour HTTP 200 Last-Modified Monday, 19 October 2026 at 09:39:05 GMT/);
assert.match(enNews[1].content, /urllib first try HTTP 200 Last-Modified Monday, 19 October 2026 at 04:02:43 GMT/);
assert.match(enNews[1].content, /Last hour wget first try HTTP 200 Last-Modified Monday, 19 October 2026 at 04:02:43 GMT/);
assert.match(enNews[1].content, /02:09:25 GMT/);
assert.match(enNews[1].content, /01:12:23 GMT/);
assert.match(enNews[1].content, /04:46:36 GMT/);
assert.match(enNews[1].content, /01:30:14 GMT/);
assert.match(enNews[1].content, /23:51:48 GMT/);
assert.match(enNews[1].content, /01:09:28 GMT/);
assert.match(enNews[1].content, /10:18:22 GMT/);
assert.match(enNews[1].content, /11:50:34 GMT/);
assert.match(enNews[1].content, /12:03:37 GMT/);
assert.match(enNews[1].content, /12:08:39 GMT/);
assert.match(enNews[1].content, /01:13:51 GMT/);

assert.match(trNews[1].content, /19 Ekim 2026 Pazartesi 09\.44\.59 GMT/);
assert.match(trNews[1].content, /geçen saat ilk denemede 19 Ekim 2026 Pazartesi 09\.44\.59 GMT, sonraki indirmede 19 Ekim 2026 Pazartesi 09\.44\.59 GMT/);
assert.match(trNews[1].content, /16 Ekim 2026 Cuma 13\.27\.07 GMT/);
assert.match(trNews[1].content, /1081612 kullanılmadı/);
assert.match(trNews[1].content, /1081521 kullanılmadı/);
assert.match(trNews[1].content, /Geçen saat wget ilk\/sonraki\/yeniden deneme HTTP 200/);
assert.match(trNews[1].content, /10\.02\.13 GMT/);
assert.match(trNews[1].content, /Bu saatte wget ilk HTTP 200/);
assert.match(trNews[1].content, /ek teyit Last-Modified 19 Ekim 2026 Pazartesi 09\.38\.54 GMT \/ 09\.38\.54 GMT/);

assert.match(enNews[2].title, /skilled military recruits/i);
assert.match(trNews[2].title, /nitelikli askeri adaylar/i);
assert.match(enNews[2].content, /Foreign Skilled Military Applicant|NOC 40042|42102|43204/);
assert.match(trNews[2].content, /FSMA|NOC 40042|42102|43204/);
assert.match(enNews[2].link || '', /category-based-selection\.html/);
assert.match(enNews[2].content, /latest official round is now #450/);
assert.match(enNews[2].content, /508 Loop Detected/);

for (const item of enNews) {
  assert.match(item.content || '', /12:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /11:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /10:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /09:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /08:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /07:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /06:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /05:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /04:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /03:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /02:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /01:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /00:00 UTC on 19 October 2026/);
  assert.doesNotMatch(item.content || '', /23:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /22:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /21:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /20:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /19:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /18:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /17:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /16:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /15:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /14:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /13:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /12:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /11:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /10:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /09:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /08:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /07:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /06:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /05:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /04:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /03:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /02:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /01:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /00:00 UTC on 18 October 2026/);
  assert.doesNotMatch(item.content || '', /23:00 UTC on 17 October 2026/);
  assert.doesNotMatch(item.content || '', /22:00 UTC on 17 October 2026/);
  assert.doesNotMatch(item.content || '', /21:00 UTC on 17 October 2026/);
  assert.doesNotMatch(item.content || '', /20:00 UTC on 17 October 2026/);
  assert.doesNotMatch(item.content || '', /19:00 UTC on 17 October 2026/);
  assert.doesNotMatch(item.content || '', /18:00 UTC on 17 October 2026/);
  assert.doesNotMatch(item.content || '', /17:00 UTC on 17 October 2026/);
  assert.doesNotMatch(item.content || '', /15:00 UTC on 17 October 2026/);
  assert.doesNotMatch(item.content || '', /14:00 UTC on 17 October 2026/);
  assert.doesNotMatch(item.content || '', /12:00 UTC on 17 October 2026/);
  assert.doesNotMatch(item.content || '', /09:00 UTC on 17 October 2026/);
  assert.doesNotMatch(item.content || '', /08:00 UTC on 17 October 2026/);
}
for (const item of trNews) {
  assert.match(item.content || '', /19 Ekim 2026 12\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 11\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 10\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 09\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 08\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 07\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 06\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 05\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 04\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 03\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 02\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 01\.00 UTC/);
  assert.doesNotMatch(item.content || '', /19 Ekim 2026 00\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 23\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 22\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 21\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 20\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 19\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 18\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 17\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 16\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 15\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 14\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 13\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 12\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 11\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 10\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 09\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 08\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 07\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 06\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 05\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 04\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 03\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 02\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 01\.00 UTC/);
  assert.doesNotMatch(item.content || '', /18 Ekim 2026 00\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 23\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 22\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 21\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 20\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 19\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 18\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 17\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 15\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 14\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 11\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 09\.00 UTC/);
  assert.doesNotMatch(item.content || '', /17 Ekim 2026 08\.00 UTC/);
}

assert.match(enNews[0].desc || '', /12:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /11:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /10:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /09:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /08:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /07:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /06:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /05:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /04:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /03:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /02:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /01:00 UTC/);
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
assert.match(trNews[0].desc || '', /12\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /11\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /10\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /09\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /08\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /07\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /06\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /05\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /04\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /03\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /02\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /01\.00 UTC/);
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

const staleHours = [
  '11:00 UTC on 19 October 2026',
  '10:00 UTC on 19 October 2026',
  '09:00 UTC on 19 October 2026',
  '08:00 UTC on 19 October 2026',
  '07:00 UTC on 19 October 2026',
  '06:00 UTC on 19 October 2026',
  '05:00 UTC on 19 October 2026',
  '04:00 UTC on 19 October 2026',
  '03:00 UTC on 19 October 2026',
  '02:00 UTC on 19 October 2026',
  '01:00 UTC on 19 October 2026',
  '00:00 UTC on 19 October 2026',
  '23:00 UTC on 18 October 2026',
  '22:00 UTC on 18 October 2026',
  '21:00 UTC on 18 October 2026',
  '20:00 UTC on 18 October 2026',
  '19:00 UTC on 18 October 2026',
  '18:00 UTC on 18 October 2026',
  '17:00 UTC on 18 October 2026',
  '16:00 UTC on 18 October 2026',
  '15:00 UTC on 18 October 2026',
  '14:00 UTC on 18 October 2026',
  '13:00 UTC on 18 October 2026',
  '12:00 UTC on 18 October 2026',
  '11:00 UTC on 18 October 2026',
  '10:00 UTC on 18 October 2026',
  '09:00 UTC on 18 October 2026',
  '08:00 UTC on 18 October 2026',
  '07:00 UTC on 18 October 2026',
  '06:00 UTC on 18 October 2026',
  '05:00 UTC on 18 October 2026',
  '04:00 UTC on 18 October 2026',
  '03:00 UTC on 18 October 2026',
  '02:00 UTC on 18 October 2026',
  '01:00 UTC on 18 October 2026',
  '00:00 UTC on 18 October 2026',
  '23:00 UTC on 17 October 2026',
  '22:00 UTC on 17 October 2026',
  '21:00 UTC on 17 October 2026',
  '20:00 UTC on 17 October 2026',
  '19:00 UTC on 17 October 2026',
  '18:00 UTC on 17 October 2026',
  '17:00 UTC on 17 October 2026',
  '16:00 UTC on 17 October 2026',
  '15:00 UTC on 17 October 2026',
  '14:00 UTC on 17 October 2026',
  '13:00 UTC on 17 October 2026',
  '12:00 UTC on 17 October 2026',
  '11:00 UTC on 17 October 2026',
  '10:00 UTC on 17 October 2026',
  '09:00 UTC on 17 October 2026',
  '08:00 UTC on 17 October 2026',
  '07:00 UTC on 17 October 2026',
  '06:00 UTC on 17 October 2026',
  '05:00 UTC on 17 October 2026',
  '04:00 UTC on 17 October 2026',
  '03:00 UTC on 17 October 2026',
  '02:00 UTC on 17 October 2026',
  '01:00 UTC on 17 October 2026',
  '00:00 UTC on 17 October 2026',
  '23:00 UTC on 16 October 2026',
  '22:00 UTC on 16 October 2026',
  '21:00 UTC on 16 October 2026',
  '20:00 UTC on 16 October 2026',
  '19:00 UTC on 16 October 2026',
  '18:00 UTC on 16 October 2026',
  '17:00 UTC on 16 October 2026',
  '16:00 UTC on 16 October 2026',
  '15:00 UTC on 16 October 2026',
  '14:00 UTC on 16 October 2026',
  '13:00 UTC on 16 October 2026',
  '12:00 UTC on 16 October 2026',
  '11:00 UTC on 16 October 2026',
  '10:00 UTC on 16 October 2026',
];
for (const stamp of staleHours) {
  for (const item of enNews) {
    assert.doesNotMatch(item.content || '', new RegExp(stamp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
}

console.log('canadaNews tests passed');
