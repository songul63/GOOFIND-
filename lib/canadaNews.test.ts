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

assert.match(enNews[1].title, /Express Entry #448|Provincial Nominee Program/);
assert.match(trNews[1].title, /Express Entry #448|Provincial Nominee Program/);
assert.doesNotMatch(enNews[1].title, /#447|Trades Occupations/);
assert.match(enNews[1].content, /752 invitations|CRS score of 772|Provincial Nominee Program|#448/);
assert.match(trNews[1].content, /752 davet|772 CRS|#448|Provincial Nominee Program/);
assert.match(enNews[1].content, /1081246|1080909|0980843|0980374|0980361/);
assert.match(enNews[1].link || '', /express-entry-rounds\.html/);
assert.match(enNews[1].content, /449 round records/);
assert.match(enNews[1].content, /Tuesday, 13 October 2026 at 13:27:13 GMT/);
assert.match(enNews[1].content, /733481 bytes/);

assert.match(enNews[2].title, /skilled military recruits/i);
assert.match(trNews[2].title, /nitelikli askeri adaylar/i);
assert.match(enNews[2].content, /Foreign Skilled Military Applicant|NOC 40042|42102|43204/);
assert.match(trNews[2].content, /FSMA|NOC 40042|42102|43204/);
assert.match(enNews[2].link || '', /category-based-selection\.html/);
assert.match(enNews[2].content, /latest official round is now #448/);

for (const item of enNews) {
  assert.match(item.content || '', /14:00 UTC on 14 October 2026/);
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
  assert.match(item.content || '', /14 Ekim 2026 14\.00 UTC/);
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

assert.match(enNews[0].desc || '', /14:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /13:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /12:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /09:00 UTC/);
assert.match(trNews[0].desc || '', /14\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /13\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /12\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /09\.00 UTC/);

assert.match(enNews[1].content, /1081246 article first try this hour HTTP 200 Last-Modified Wednesday, 14 October 2026 at 14:01:23 GMT/);
assert.match(enNews[1].content, /later HTTP 200 Last-Modified Wednesday, 14 October 2026 at 14:01:23 GMT; retry HTTP 200 Last-Modified Wednesday, 14 October 2026 at 14:01:23 GMT/);
assert.match(enNews[1].content, /extra confirmation Last-Modified Wednesday, 14 October 2026 at 14:01:23 GMT \/ 14:01:23 GMT/);
assert.match(enNews[1].content, /last hour the 1081246 article first try HTTP 200 Last-Modified Wednesday, 14 October 2026 at 11:18:07 GMT/i);
assert.match(enNews[1].content, /1080909 article first try this hour HTTP 200 Last-Modified Wednesday, 14 October 2026 at 14:04:35 GMT/);
assert.match(enNews[1].content, /Last hour the 1080909 article first try HTTP 200 Last-Modified Wednesday, 14 October 2026 at 09:37:00 GMT/);
assert.match(enNews[1].content, /CIC News homepage Last-Modified this hour is Wednesday, 14 October 2026 at 11:15:51 GMT on first try/);
assert.match(enNews[1].content, /Wednesday, 14 October 2026 at 14:07:09 GMT on later/);
assert.match(enNews[1].content, /Wednesday, 14 October 2026 at 14:07:09 GMT on retry/);
assert.match(enNews[1].content, /last hour Wednesday, 14 October 2026 at 11:15:51 GMT/);
assert.match(enNews[1].content, /The CIC 0980843 article first try this hour HTTP 200 Last-Modified Wednesday, 14 October 2026 at 14:05:34 GMT/);
assert.match(enNews[1].content, /last hour first try HTTP 200 Last-Modified Wednesday, 14 October 2026 at 09:38:09 GMT/);
assert.match(enNews[1].content, /The CIC 0980374 article first try this hour HTTP 200 Last-Modified Wednesday, 14 October 2026 at 14:05:36 GMT/);
assert.match(enNews[1].content, /canonical 0980361 URL\) first try this hour HTTP 200 Last-Modified Wednesday, 14 October 2026 at 14:05:46 GMT/);
assert.match(enNews[1].content, /later HTTP 200 Last-Modified Wednesday, 14 October 2026 at 14:05:46 GMT; retry HTTP 200 Last-Modified Wednesday, 14 October 2026 at 14:05:46 GMT/);
assert.match(enNews[1].content, /table still starts with October 13 Provincial Nominee Program 752 invitations \/ CRS 772/);
assert.match(enNews[1].content, /Official Express Entry rounds HTML first try this hour HTTP 200 \(Last-Modified Wednesday, 14 October 2026 at 13:58:16 GMT\); later HTTP 200 \(Last-Modified Wednesday, 14 October 2026 at 14:06:24 GMT\); retry HTTP 200 \(Last-Modified Wednesday, 14 October 2026 at 14:06:24 GMT\)/);
assert.match(enNews[1].content, /Last hour that page first try HTTP 200 \(Last-Modified Wednesday, 14 October 2026 at 13:00:56 GMT\)/);
assert.match(enNews[1].content, /Official category-based selection page first try this hour HTTP 200 \(Last-Modified Wednesday, 14 October 2026 at 13:41:49 GMT\); later HTTP 200 \(Last-Modified Wednesday, 14 October 2026 at 13:41:49 GMT\); retry HTTP 200 \(Last-Modified Wednesday, 14 October 2026 at 13:41:49 GMT\)/);
assert.match(enNews[2].content, /that page first try Wednesday, 14 October 2026 at 13:41:49 GMT, later Wednesday, 14 October 2026 at 13:41:49 GMT, and retry Wednesday, 14 October 2026 at 13:41:49 GMT/);
assert.match(enNews[1].content, /curl HTTP\/2 failed this hour with INTERNAL_ERROR on first try, later, and retry/);
assert.match(enNews[1].content, /curl HTTP\/1.1 timed out this hour on first try, later, and retry/);
assert.match(enNews[1].content, /wget first\/later\/retry timed out/);
assert.match(enNews[1].content, /Last hour wget first\/later\/retry HTTP 200, 733481 bytes/);
assert.match(trNews[1].content, /wget ilk\/sonraki\/yeniden denemede zaman aşımına uğradı/);
assert.match(trNews[1].content, /Geçen saat wget ilk\/sonraki\/yeniden denemede HTTP 200, 733481 bayt/);
assert.match(enNews[1].content, /Last hour curl HTTP\/2 failed with INTERNAL_ERROR/);
assert.match(enNews[1].content, /Last hour curl HTTP\/1.1 timed out/);
assert.match(enNews[1].content, /extra confirmation urllib HTTP 200 \/ HTTP 200/);
assert.match(enNews[1].content, /invitations.html\?q=448/);
assert.match(enNews[1].content, /1081246 on homepage/);
assert.match(enNews[1].content, /1080909 on homepage/);
assert.match(enNews[1].content, /1081241 unused/);
assert.match(enNews[1].content, /1081284 unused/);
assert.match(enNews[1].content, /1081301 unused/);
assert.match(enNews[1].content, /PEI 195 not listed/);
assert.match(enNews[1].content, /1081053 NOT on homepage/);
assert.match(enNews[1].content, /article:published_time 2026-10-13T15:29:43\+00:00/);

assert.match(trNews[1].content, /1081246 yazısı bu saatte ilk denemede HTTP 200 Last-Modified 14 Ekim 2026 Çarşamba 14\.01\.23 GMT/);
assert.match(trNews[1].content, /14 Ekim 2026 Çarşamba 14\.07\.09 GMT/);
assert.match(trNews[1].content, /CIC 0980843 yazısı bu saatte ilk denemede HTTP 200 Last-Modified 14 Ekim 2026 Çarşamba 14\.05\.34 GMT/);
assert.match(trNews[1].content, /14 Ekim 2026 Çarşamba 13\.58\.16 GMT/);

const staleHours = [
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
  '19:00 UTC on 13 October 2026',
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
