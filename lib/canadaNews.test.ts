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

assert.match(enNews[1].title, /Express Entry #447|Trades Occupations/);
assert.match(trNews[1].title, /Express Entry #447|Trades Occupations/);
assert.match(enNews[1].content, /3,500 invitations|CRS score of 476|Trades Occupations, 2026-Version 3|#447/);
assert.match(trNews[1].content, /3\.500 davet|476 CRS|#447|Trades Occupations, 2026-Version 3/);
assert.match(enNews[1].content, /1080909|0980843|0980374|0980361/);
assert.match(enNews[1].link || '', /express-entry-rounds\.html/);

assert.match(enNews[2].title, /skilled military recruits/i);
assert.match(trNews[2].title, /nitelikli askeri adaylar/i);
assert.match(enNews[2].content, /Foreign Skilled Military Applicant|NOC 40042|42102|43204/);
assert.match(trNews[2].content, /FSMA|NOC 40042|42102|43204/);
assert.match(enNews[2].link || '', /category-based-selection\.html/);

// 13:00 UTC 13 Oct 2026 this-hour lock
for (const item of enNews) {
  assert.match(item.content || '', /13:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /12:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /11:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /10:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /09:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /08:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /07:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /06:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /05:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /04:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /03:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /02:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /00:00 UTC on 13 October 2026/);
  assert.doesNotMatch(item.content || '', /23:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /22:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /21:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /20:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /19:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /18:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /17:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /16:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /15:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /14:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /13:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /12:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /11:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /10:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /09:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /08:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /07:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /06:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /05:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /04:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /03:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /02:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /01:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /00:00 UTC on 12 October 2026/);
  assert.doesNotMatch(item.content || '', /23:00 UTC on 11 October 2026/);
  assert.doesNotMatch(item.content || '', /22:00 UTC on 11 October 2026/);
  assert.doesNotMatch(item.content || '', /21:00 UTC on 11 October 2026/);
  assert.doesNotMatch(item.content || '', /20:00 UTC on 11 October 2026/);
  assert.doesNotMatch(item.content || '', /17:00 UTC on 11 October 2026/);
  assert.doesNotMatch(item.content || '', /16:00 UTC on 11 October 2026/);
  assert.doesNotMatch(item.content || '', /15:00 UTC on 11 October 2026/);
  assert.doesNotMatch(item.content || '', /13:00 UTC on 11 October 2026/);
  assert.doesNotMatch(item.content || '', /12:00 UTC on 11 October 2026/);
}
for (const item of trNews) {
  assert.match(item.content || '', /13 Ekim 2026 13\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 12\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 11\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 10\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 09\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 08\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 07\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 06\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 05\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 04\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 03\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 02\.00 UTC/);
  assert.doesNotMatch(item.content || '', /13 Ekim 2026 00\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 23\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 22\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 21\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 20\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 19\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 18\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 17\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 16\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 15\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 14\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 13\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 12\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 11\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 10\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 09\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 08\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 07\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 06\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 05\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 04\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 03\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 02\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 01\.00 UTC/);
  assert.doesNotMatch(item.content || '', /12 Ekim 2026 00\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 23\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 22\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 21\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 20\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 17\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 16\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 15\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 13\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 12\.00 UTC/);
}

assert.match(enNews[0].desc || '', /13:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /12:00 UTC/);
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
assert.doesNotMatch(enNews[0].desc || '', /00:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /23:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /22:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /21:00 UTC/);
assert.match(trNews[0].desc || '', /13\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /12\.00 UTC/);
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
assert.doesNotMatch(trNews[0].desc || '', /00\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /23\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /22\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /21\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /20\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /19\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /18\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /17\.00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /20:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /19:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /18:00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /16\.00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /15:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /14:00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /14:00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /15\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /14\.00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /14\.00 UTC/);

assert.match(enNews[0].content, /consultation \/report first try HTTP 404; later HTTP 404; retry HTTP 404; extra confirmation 404\/404; \/what-we-heard first try HTTP 404; later HTTP 404; retry HTTP 404/);
assert.match(enNews[0].content, /The consultation page first try this hour HTTP 200; later HTTP 200; retry HTTP 200 \(last hour first try HTTP 200; later HTTP 200; retry HTTP 200\)/);
assert.match(enNews[0].content, /last hour \/report first try HTTP 404; later HTTP 404; retry HTTP 404/);
assert.match(enNews[0].content, /last hour \/what-we-heard first try HTTP 404; later HTTP 404; retry HTTP 404/);
assert.match(enNews[0].content, /documented JETCO path .* first try this hour HTTP 404; later HTTP 404; retry HTTP 404; extra confirmation HTTP 404 \/ HTTP 404 \(last hour first try HTTP 404; later HTTP 404; retry HTTP 404; extra confirmation HTTP 404 \/ HTTP 404\)/);
assert.match(enNews[0].content, /Alternate no-lang first try this hour HTTP 404; later HTTP 404; retry HTTP 404; extra confirmation HTTP 404 \/ HTTP 404; wget HTTP 404 \(last hour first try timed out; later timed out; retry HTTP 404; extra confirmation HTTP 404 \/ HTTP 404; wget HTTP 404\)/);
assert.match(enNews[0].content, /international.canada.ca probe first try this hour HTTP 200; later HTTP 200; retry HTTP 200 \(last hour first try HTTP 200; later HTTP 200; retry HTTP 200\)/);
assert.match(trNews[0].content, /istişare \/report ilk denemede HTTP 404; sonraki HTTP 404; yeniden denemede HTTP 404/);
assert.match(trNews[0].content, /\/what-we-heard ilk denemede HTTP 404; sonraki HTTP 404; yeniden denemede HTTP 404/);
assert.match(trNews[0].content, /geçen saat \/what-we-heard ilk denemede HTTP 404; sonraki HTTP 404; yeniden denemede HTTP 404/);
assert.match(trNews[0].content, /geçen saat \/report ilk denemede HTTP 404; sonraki HTTP 404; yeniden denemede HTTP 404/);
assert.match(trNews[0].content, /geçen saat \/what-we-heard ilk denemede HTTP 404; sonraki HTTP 404; yeniden denemede HTTP 404/);
assert.match(trNews[0].content, /Dil parametresi olmayan alternatif bu saatte ilk denemede HTTP 404; sonraki HTTP 404; yeniden denemede HTTP 404/);

assert.match(enNews[1].content, /curl HTTP\/2 succeeded this hour on first try, later, and retry/);
assert.match(enNews[1].content, /curl HTTP\/1\.1 succeeded this hour on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 failed with INTERNAL_ERROR this hour on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/1\.1 timed out this hour on first try, later, and retry/);
assert.match(enNews[1].content, /Last hour curl HTTP\/2 failed with INTERNAL_ERROR on first try, later, and retry/);
assert.match(enNews[1].content, /Last hour curl HTTP\/1\.1 timed out on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /Last hour curl HTTP\/2 succeeded on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /Last hour curl HTTP\/1\.1 succeeded on first try, later, and retry/);
assert.match(enNews[1].content, /Python urllib succeeded this hour on first try, later, and retry \(HTTP 200\)/);
assert.match(enNews[1].content, /wget retrieved the official JSON on first try, later, and retry \(HTTP 200, 731813 bytes\)/);
assert.doesNotMatch(enNews[1].content, /Python urllib timed out this hour on first try, later, and retry/);
assert.match(enNews[1].content, /Last hour official ee_rounds_123_en.json succeeded over Python urllib on first try, later, and retry/);
assert.match(enNews[1].content, /Last hour Python urllib succeeded on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /Last hour Python urllib succeeded \(HTTP 200, 731813 bytes\) on first try; later timed out; retry timed out/);
assert.match(enNews[1].content, /last confirmed successful official fetch is now 13:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 12:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 11:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 10:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 09:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 08:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 07:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 06:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 05:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 04:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 03:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 02:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 00:00 UTC on 13 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 23:00 UTC on 12 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 22:00 UTC on 12 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 21:00 UTC on 12 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 20:00 UTC on 12 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 19:00 UTC on 12 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 18:00 UTC on 12 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 17:00 UTC on 12 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 16:00 UTC on 12 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 15:00 UTC on 12 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 14:00 UTC on 12 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 13:00 UTC on 12 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 11:00 UTC on 12 October 2026/);

assert.match(trNews[1].content, /curl HTTP\/2 bu saatte ilk denemede, sonraki indirmede ve yeniden denemede başarılı oldu/);
assert.match(trNews[1].content, /curl HTTP\/1\.1 bu saatte ilk denemede, sonraki indirmede ve yeniden denemede başarılı oldu/);
assert.doesNotMatch(trNews[1].content, /curl HTTP\/2 bu saatte ilk denemede, sonraki indirmede ve yeniden denemede INTERNAL_ERROR ile başarısız oldu/);
assert.doesNotMatch(trNews[1].content, /curl HTTP\/1\.1 bu saatte ilk denemede, sonraki indirmede ve yeniden denemede zaman aşımına uğradı/);
assert.match(trNews[1].content, /Geçen saat curl HTTP\/2 ilk denemede, sonraki indirmede ve yeniden denemede INTERNAL_ERROR ile başarısız oldu/);
assert.match(trNews[1].content, /Geçen saat curl HTTP\/1\.1 ilk denemede, sonraki indirmede ve yeniden denemede zaman aşımına uğradı/);
assert.doesNotMatch(trNews[1].content, /Geçen saat curl HTTP\/2 ilk denemede, sonraki indirmede ve yeniden denemede başarılı oldu/);
assert.doesNotMatch(trNews[1].content, /Geçen saat curl HTTP\/1\.1 ilk denemede, sonraki indirmede ve yeniden denemede başarılı oldu/);
assert.match(trNews[1].content, /Son teyit edilen başarılı resmi indirme artık 13 Ekim 2026 13\.00 UTC/);

assert.match(enNews[1].content, /The 1080909 article first try this hour HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:03:06 GMT; later HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:03:06 GMT; retry HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:03:06 GMT/);
assert.match(enNews[1].content, /Last hour the 1080909 article first try HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:03:06 GMT; later HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:03:06 GMT; retry HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:03:06 GMT/);
assert.match(trNews[1].content, /1080909 yazısı bu saatte ilk denemede HTTP 200 Last-Modified 13 Ekim 2026 Salı 12\.03\.06 GMT; sonraki HTTP 200 Last-Modified 13 Ekim 2026 Salı 12\.03\.06 GMT/);
assert.match(trNews[1].content, /Geçen saat 1080909 yazısı ilk denemede HTTP 200 Last-Modified 13 Ekim 2026 Salı 12\.03\.06 GMT/);
assert.doesNotMatch(enNews[1].content, /04:58:36 GMT/);
assert.doesNotMatch(enNews[1].content, /05:14:15 GMT/);
assert.doesNotMatch(enNews[1].content, /05:06:22 GMT/);
assert.doesNotMatch(enNews[1].content, /05:04:24 GMT/);
assert.doesNotMatch(enNews[1].content, /05:00:31 GMT/);
assert.doesNotMatch(enNews[1].content, /18:20:39 GMT/);
assert.doesNotMatch(enNews[1].content, /19:12:42 GMT/);
assert.doesNotMatch(trNews[1].content, /04\.58\.36 GMT/);
assert.doesNotMatch(trNews[1].content, /19\.12\.42 GMT/);

assert.match(enNews[1].content, /The CIC 0980374 article first try this hour HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:01:13 GMT; later HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:01:13 GMT; retry HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:01:13 GMT/);
assert.match(enNews[1].content, /The CIC 0980374 article first try this hour HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:01:13 GMT; later HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:01:13 GMT; retry HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:01:13 GMT \(last hour first try HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:01:13 GMT; later HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:01:13 GMT; retry HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:01:13 GMT\)/);
assert.match(trNews[1].content, /CIC 0980374 yazısı bu saatte ilk denemede HTTP 200 Last-Modified 13 Ekim 2026 Salı 12\.01\.13 GMT/);
assert.doesNotMatch(enNews[1].content, /18:30:00 GMT/);

assert.match(enNews[1].content, /CIC News homepage Last-Modified this hour is Tuesday, 13 October 2026 at 12:06:10 GMT on first try, Tuesday, 13 October 2026 at 12:06:10 GMT on later, and Tuesday, 13 October 2026 at 12:06:10 GMT on retry/);
assert.match(enNews[1].content, /last hour Tuesday, 13 October 2026 at 11:15:23 GMT on first try, Tuesday, 13 October 2026 at 12:06:10 GMT on later, and Tuesday, 13 October 2026 at 12:06:10 GMT on retry/);
assert.match(trNews[1].content, /13 Ekim 2026 Salı 12\.06\.10 GMT/);
assert.match(trNews[1].content, /geçen saat ilk denemede 13 Ekim 2026 Salı 11\.15\.23 GMT, sonraki indirmede 13 Ekim 2026 Salı 12\.06\.10 GMT/);
assert.doesNotMatch(enNews[1].content, /11:02:23 GMT/);
assert.doesNotMatch(trNews[1].content, /11\.02\.23 GMT/);
assert.match(enNews[1].content, /The CIC 0980843 article first try this hour HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:08:03 GMT; later HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:08:03 GMT; retry HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:08:03 GMT/);
assert.doesNotMatch(enNews[1].content, /The CIC 0980843 article first try this hour HTTP 200 Last-Modified Monday, 12 October 2026 at 07:01:13 GMT/);
assert.doesNotMatch(enNews[1].content, /The CIC 0980843 article first try this hour HTTP 200 Last-Modified Sunday, 11 October 2026 at 18:52:16 GMT/);
assert.doesNotMatch(enNews[1].content, /The CIC 0980843 article first try this hour HTTP 200 Last-Modified Sunday, 11 October 2026 at 18:25:58 GMT/);
assert.match(enNews[1].content, /The CIC 0980843 article first try this hour HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:08:03 GMT; later HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:08:03 GMT; retry HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:08:03 GMT \(last hour first try HTTP 200 Last-Modified Tuesday, 13 October 2026 at 11:16:35 GMT; later HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:08:03 GMT; retry HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:08:03 GMT\)/);
assert.match(trNews[1].content, /CIC 0980843 yazısı bu saatte ilk denemede HTTP 200 Last-Modified 13 Ekim 2026 Salı 12\.08\.03 GMT/);
assert.match(trNews[1].content, /yeniden deneme HTTP 200 Last-Modified 13 Ekim 2026 Salı 12\.08\.03 GMT/);
assert.match(trNews[1].content, /geçen saat ilk denemede HTTP 200 Last-Modified 13 Ekim 2026 Salı 11\.16\.35 GMT/);
assert.match(trNews[1].content, /geçen saat.*yeniden deneme HTTP 200 Last-Modified 13 Ekim 2026 Salı 12\.08\.03 GMT/);
assert.doesNotMatch(enNews[1].content, /07:01:13 GMT/);
assert.doesNotMatch(trNews[1].content, /07\.01\.13 GMT/);
assert.match(enNews[1].content, /canonical 0980361 URL\) first try this hour HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:05:28 GMT/);
assert.match(enNews[1].content, /canonical 0980361 URL\) first try this hour HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:05:28 GMT; later HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:05:28 GMT; retry HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:05:28 GMT \(last hour first try HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:05:28 GMT; later HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:05:28 GMT; retry HTTP 200 Last-Modified Tuesday, 13 October 2026 at 12:05:28 GMT\)/);
assert.doesNotMatch(enNews[1].content, /06:07:46 GMT/);
assert.doesNotMatch(enNews[1].content, /17:06:53 GMT/);
assert.match(enNews[1].content, /wget first try HTTP 200 \(Last-Modified Tuesday, 13 October 2026 at 13:05:46 GMT\); later HTTP 200 \(Last-Modified Tuesday, 13 October 2026 at 13:05:46 GMT\); retry HTTP 200 \(Last-Modified Tuesday, 13 October 2026 at 13:05:46 GMT\)/);
assert.match(enNews[1].content, /Last-Modified first try Tuesday, 13 October 2026 at 13:05:46 GMT; later Tuesday, 13 October 2026 at 13:05:46 GMT; retry Tuesday, 13 October 2026 at 13:05:46 GMT/);
assert.match(enNews[1].content, /Last hour that page succeeded over Python urllib on first try, later, and retry \(Last-Modified first try Tuesday, 13 October 2026 at 12:01:03 GMT; later Tuesday, 13 October 2026 at 12:20:24 GMT; retry Tuesday, 13 October 2026 at 12:30:26 GMT\); wget timed out on that page on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /17:33:03 GMT/);
assert.doesNotMatch(enNews[1].content, /02:00:45 GMT/);
assert.doesNotMatch(enNews[1].content, /13:09:36 GMT/);
assert.doesNotMatch(enNews[1].content, /15:01:08 GMT/);
assert.doesNotMatch(enNews[1].content, /16:49:09 GMT/);
assert.doesNotMatch(enNews[1].content, /16:46:14 GMT/);
assert.doesNotMatch(enNews[1].content, /16:52:00 GMT/);
assert.doesNotMatch(enNews[1].content, /16:51:55 GMT/);
assert.doesNotMatch(enNews[1].content, /21:10:44 GMT/);
assert.match(trNews[1].content, /13 Ekim 2026 Salı 13\.05\.46 GMT/);
assert.match(trNews[1].content, /13 Ekim 2026 Salı 12\.01\.03 GMT/);
assert.doesNotMatch(trNews[1].content, /17\.33\.03 GMT/);
assert.doesNotMatch(trNews[1].content, /16\.49\.09 GMT/);
assert.doesNotMatch(trNews[1].content, /16\.46\.14 GMT/);
assert.doesNotMatch(trNews[1].content, /13\.09\.36 GMT/);
assert.doesNotMatch(trNews[1].content, /02\.00\.45 GMT/);
assert.doesNotMatch(trNews[1].content, /15\.01\.08 GMT/);
assert.match(enNews[1].content, /Official category-based selection page succeeded over Python urllib on first try, later, and retry \(Last-Modified first try Tuesday, 13 October 2026 at 12:37:34 GMT; later Tuesday, 13 October 2026 at 12:37:34 GMT; retry Tuesday, 13 October 2026 at 12:37:34 GMT\)/);
assert.match(enNews[1].content, /Last hour the official category-based selection page succeeded over Python urllib on first try, later, and retry; wget timed out on first try, later, and retry/);
assert.match(enNews[2].content, /that page succeeded over Python urllib on first try, later, and retry; urllib Last-Modified first try Tuesday, 13 October 2026 at 12:37:34 GMT, later Tuesday, 13 October 2026 at 12:37:34 GMT, and retry Tuesday, 13 October 2026 at 12:37:34 GMT/);
assert.match(enNews[2].content, /last hour that page succeeded over Python urllib on first try, later, and retry; urllib Last-Modified first try Monday, 12 October 2026 at 20:50:40 GMT, later Monday, 12 October 2026 at 20:50:40 GMT, and retry Tuesday, 13 October 2026 at 11:34:11 GMT/);
assert.doesNotMatch(enNews[1].content, /17:06:21 GMT/);
assert.doesNotMatch(enNews[2].content, /17:06:21 GMT/);
assert.doesNotMatch(enNews[1].content, /15:35:58 GMT/);
assert.doesNotMatch(enNews[2].content, /15:35:58 GMT/);
assert.doesNotMatch(enNews[1].content, /18:02:42 GMT/);
assert.doesNotMatch(enNews[2].content, /18:02:42 GMT/);
assert.doesNotMatch(enNews[1].content, /18:00:36 GMT/);
assert.doesNotMatch(enNews[1].content, /20:16:28 GMT/);
assert.doesNotMatch(enNews[2].content, /20:16:28 GMT/);
assert.doesNotMatch(enNews[2].content, /02:26:22 GMT/);
assert.doesNotMatch(enNews[2].content, /02:20:16 GMT/);

assert.match(enNews[1].content, /1080909 on homepage/);
assert.match(enNews[1].content, /1081185 unused/);
assert.match(enNews[1].content, /1080954 unused/);
assert.match(enNews[1].content, /1081053 NOT on homepage/);
assert.match(enNews[1].content, /1081199 unused/);
assert.match(enNews[1].content, /PEI 195 not listed/);
assert.match(enNews[1].content, /Thursday, 1 October 2026 at 15:30:46 GMT/);
assert.match(enNews[1].content, /448 round records/);


assert.doesNotMatch(enNews[1].content, /03:35:50 GMT/);
assert.doesNotMatch(enNews[1].content, /03:38:01 GMT/);
assert.doesNotMatch(enNews[1].content, /03:39:17 GMT/);
assert.doesNotMatch(enNews[1].content, /03:45:53 GMT/);
assert.doesNotMatch(enNews[1].content, /03:34:26 GMT/);
assert.doesNotMatch(enNews[1].content, /04:29:33 GMT/);
assert.doesNotMatch(enNews[1].content, /04:27:52 GMT/);
assert.doesNotMatch(enNews[1].content, /05:05:58 GMT/);
assert.doesNotMatch(enNews[1].content, /04:21:06 GMT/);
assert.doesNotMatch(enNews[1].content, /05:54:00 GMT/);
assert.doesNotMatch(enNews[1].content, /05:57:19 GMT/);
assert.doesNotMatch(enNews[1].content, /06:02:57 GMT/);
assert.doesNotMatch(enNews[1].content, /06:03:05 GMT/);
assert.doesNotMatch(enNews[1].content, /05:59:04 GMT/);
assert.doesNotMatch(trNews[1].content, /03\.35\.50 GMT/);
assert.doesNotMatch(trNews[1].content, /03\.38\.01 GMT/);
assert.doesNotMatch(trNews[1].content, /03\.34\.26 GMT/);
assert.doesNotMatch(trNews[1].content, /04\.29\.33 GMT/);
assert.doesNotMatch(trNews[1].content, /04\.27\.52 GMT/);
assert.doesNotMatch(trNews[1].content, /05\.05\.58 GMT/);
assert.doesNotMatch(trNews[1].content, /04\.21\.06 GMT/);
assert.doesNotMatch(trNews[1].content, /05\.54\.00 GMT/);
assert.doesNotMatch(trNews[1].content, /05\.57\.19 GMT/);
assert.doesNotMatch(trNews[1].content, /06\.02\.57 GMT/);
assert.doesNotMatch(trNews[1].content, /06\.03\.05 GMT/);
assert.doesNotMatch(trNews[1].content, /05\.59\.04 GMT/);
assert.doesNotMatch(enNews[1].content, /07:19:08 GMT/);
assert.doesNotMatch(enNews[1].content, /07:19:50 GMT/);
assert.doesNotMatch(enNews[1].content, /08:10:32 GMT/);
assert.doesNotMatch(enNews[1].content, /07:17:25 GMT/);
assert.doesNotMatch(enNews[1].content, /07:17:27 GMT/);
assert.doesNotMatch(enNews[1].content, /07:17:41 GMT/);
assert.doesNotMatch(trNews[1].content, /07\.19\.08 GMT/);
assert.doesNotMatch(trNews[1].content, /07\.19\.50 GMT/);
assert.doesNotMatch(trNews[1].content, /08\.10\.32 GMT/);
assert.doesNotMatch(trNews[1].content, /07\.17\.25 GMT/);
assert.doesNotMatch(trNews[1].content, /07\.17\.27 GMT/);
assert.doesNotMatch(trNews[1].content, /07\.17\.41 GMT/);
assert.match(trNews[0].content, /geçen saat ilk denemede zaman aşımına uğradı; sonraki zaman aşımına uğradı/);
assert.match(trNews[0].content, /Dil parametresi olmayan alternatif bu saatte ilk denemede HTTP 404; sonraki HTTP 404; yeniden denemede HTTP 404; ek doğrulama HTTP 404 \/ HTTP 404; wget HTTP 404 \(geçen saat ilk denemede zaman aşımına uğradı; sonraki zaman aşımına uğradı; yeniden denemede HTTP 404; ek doğrulama HTTP 404 \/ HTTP 404; wget HTTP 404\)/);

const staleHours = [
  '12:00 UTC on 13 October 2026',
  '11:00 UTC on 13 October 2026',
  '10:00 UTC on 13 October 2026',
  '09:00 UTC on 13 October 2026',
  '08:00 UTC on 13 October 2026',
  '07:00 UTC on 13 October 2026',
  '06:00 UTC on 13 October 2026',
  '05:00 UTC on 13 October 2026',
  '04:00 UTC on 13 October 2026',
  '03:00 UTC on 13 October 2026',
  '02:00 UTC on 13 October 2026',
  '00:00 UTC on 13 October 2026',
  '23:00 UTC on 12 October 2026',
  '22:00 UTC on 12 October 2026',
  '21:00 UTC on 12 October 2026',
  '20:00 UTC on 12 October 2026',
  '19:00 UTC on 12 October 2026',
  '18:00 UTC on 12 October 2026',
  '17:00 UTC on 12 October 2026',
  '16:00 UTC on 12 October 2026',
  '15:00 UTC on 12 October 2026',
  '14:00 UTC on 12 October 2026',
  '13:00 UTC on 12 October 2026',
  '12:00 UTC on 12 October 2026',
  '11:00 UTC on 12 October 2026',
  '10:00 UTC on 12 October 2026',
  '09:00 UTC on 12 October 2026',
  '08:00 UTC on 12 October 2026',
  '07:00 UTC on 12 October 2026',
  '06:00 UTC on 12 October 2026',
  '05:00 UTC on 12 October 2026',
  '04:00 UTC on 12 October 2026',
  '03:00 UTC on 12 October 2026',
  '02:00 UTC on 12 October 2026',
  '01:00 UTC on 12 October 2026',
  '00:00 UTC on 12 October 2026',
  '23:00 UTC on 11 October 2026',
  '22:00 UTC on 11 October 2026',
  '21:00 UTC on 11 October 2026',
  '20:00 UTC on 11 October 2026',
  '19:00 UTC on 11 October 2026',
  '17:00 UTC on 11 October 2026',
  '16:00 UTC on 11 October 2026',
  '15:00 UTC on 11 October 2026',
  '14:00 UTC on 11 October 2026',
  '13:00 UTC on 11 October 2026',
  '12:00 UTC on 11 October 2026',
  '11:00 UTC on 11 October 2026',
  '10:00 UTC on 11 October 2026',
  '09:00 UTC on 11 October 2026',
  '08:00 UTC on 11 October 2026',
  '07:00 UTC on 11 October 2026',
  '00:00 UTC on 11 October 2026',
  '23:00 UTC on 10 October 2026',
  '22:00 UTC on 10 October 2026',
  '21:00 UTC on 10 October 2026',
  '18:00 UTC on 10 October 2026',
];
for (const stamp of staleHours) {
  for (const item of enNews) {
    assert.doesNotMatch(item.content || '', new RegExp(stamp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
}

assert.doesNotMatch(enNews[1].content, /09:01:19 GMT/);
assert.doesNotMatch(enNews[1].content, /09:26:33 GMT/);
assert.doesNotMatch(enNews[1].content, /09:34:31 GMT/);
assert.doesNotMatch(enNews[1].content, /09:23:23 GMT/);
assert.doesNotMatch(enNews[1].content, /09:27:05 GMT/);
assert.doesNotMatch(enNews[1].content, /09:29:36 GMT/);
assert.doesNotMatch(enNews[1].content, /11:07:04 GMT/);
assert.doesNotMatch(enNews[1].content, /11:07:37 GMT/);
assert.doesNotMatch(enNews[1].content, /11:16:46 GMT/);
assert.doesNotMatch(trNews[1].content, /09\.01\.19 GMT/);
assert.doesNotMatch(trNews[1].content, /09\.26\.33 GMT/);
assert.doesNotMatch(trNews[1].content, /09\.34\.31 GMT/);
assert.doesNotMatch(trNews[1].content, /09\.23\.23 GMT/);
assert.doesNotMatch(trNews[1].content, /09\.27\.05 GMT/);
assert.doesNotMatch(trNews[1].content, /09\.29\.36 GMT/);
assert.doesNotMatch(trNews[1].content, /11\.07\.04 GMT/);
assert.doesNotMatch(trNews[1].content, /11\.07\.37 GMT/);
assert.doesNotMatch(trNews[1].content, /11\.16\.46 GMT/);
assert.doesNotMatch(enNews[1].content, /09:03:05 GMT/);
assert.doesNotMatch(trNews[1].content, /09\.03\.05 GMT/);
assert.doesNotMatch(enNews[1].content, /09:05:48 GMT/);
assert.doesNotMatch(trNews[1].content, /09\.05\.48 GMT/);
assert.doesNotMatch(enNews[1].content, /09:05:53 GMT/);
assert.doesNotMatch(trNews[1].content, /09\.05\.53 GMT/);
assert.doesNotMatch(enNews[1].content, /08:59:21 GMT/);
assert.doesNotMatch(trNews[1].content, /08\.59\.21 GMT/);
assert.doesNotMatch(enNews[1].content, /09:02:23 GMT/);
assert.doesNotMatch(trNews[1].content, /09\.02\.23 GMT/);