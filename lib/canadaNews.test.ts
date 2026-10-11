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

// 12:00 UTC 11 Oct 2026 this-hour lock
for (const item of enNews) {
  assert.match(item.content || '', /12:00 UTC on 11 October 2026/);
  assert.doesNotMatch(item.content || '', /11:00 UTC on 11 October 2026/);
  assert.doesNotMatch(item.content || '', /10:00 UTC on 11 October 2026/);
  assert.doesNotMatch(item.content || '', /09:00 UTC on 11 October 2026/);
}
for (const item of trNews) {
  assert.match(item.content || '', /11 Ekim 2026 12\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 11\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 10\.00 UTC/);
  assert.doesNotMatch(item.content || '', /11 Ekim 2026 09\.00 UTC/);
}

assert.match(enNews[0].desc || '', /12:00 UTC/);
assert.match(trNews[0].desc || '', /12\.00 UTC/);
assert.doesNotMatch(enNews[0].desc || '', /11:00 UTC/);
assert.doesNotMatch(trNews[0].desc || '', /11\.00 UTC/);

assert.match(enNews[0].content, /consultation \/report first try 404; later 404; retry 404; \/what-we-heard first try 404; later 404; retry 404/);
assert.match(enNews[0].content, /last hour \/report first try 404; later 404; retry 404/);
assert.match(enNews[0].content, /first try this hour HTTP 404; later HTTP 404; retry HTTP 404 \(last hour first try HTTP 404; later HTTP 404; retry HTTP 404\)/);
assert.match(enNews[0].content, /Alternate no-lang first try this hour HTTP 404; later HTTP 404; retry HTTP 404 \(last hour first try HTTP 404; later HTTP 404; retry HTTP 404\)/);
assert.doesNotMatch(enNews[0].content, /Alternate no-lang first try this hour timed out/);
assert.match(trNews[0].content, /istişare \/report ilk denemede 404; sonraki 404; yeniden deneme 404/);
assert.match(trNews[0].content, /geçen saat \/report ilk denemede 404; sonraki 404; yeniden deneme 404/);

assert.match(enNews[1].content, /curl HTTP\/2 succeeded this hour on first try, later, and retry/);
assert.match(enNews[1].content, /curl HTTP\/1\.1 succeeded this hour on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 failed with INTERNAL_ERROR this hour on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/1\.1 timed out this hour on first try, later, and retry/);
assert.match(enNews[1].content, /Last hour curl HTTP\/2 succeeded on first try, later, and retry/);
assert.match(enNews[1].content, /Last hour curl HTTP\/1\.1 succeeded on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /Last hour curl HTTP\/2 failed with INTERNAL_ERROR on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /Last hour curl HTTP\/1\.1 timed out on first try, later, and retry/);
assert.match(enNews[1].content, /Python urllib succeeded this hour \(HTTP 200, 731813 bytes\) on first try, later, and retry/);
assert.match(enNews[1].content, /Last hour official ee_rounds_123_en.json succeeded over Python urllib on first try, later, and retry \(HTTP 200, 731813 bytes\)/);
assert.match(enNews[1].content, /Last hour Python urllib succeeded \(HTTP 200, 731813 bytes\) on first try, later, and retry/);
assert.doesNotMatch(enNews[1].content, /Last hour Python urllib succeeded \(HTTP 200, 731813 bytes\) on first try; later timed out; retry timed out/);
assert.match(enNews[1].content, /last confirmed successful official fetch is now 12:00 UTC on 11 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 11:00 UTC on 11 October 2026/);

assert.match(trNews[1].content, /curl HTTP\/2 bu saatte ilk denemede, sonraki indirmede ve yeniden denemede başarılı oldu/);
assert.doesNotMatch(trNews[1].content, /curl HTTP\/2 bu saatte ilk denemede, sonraki indirmede ve yeniden denemede INTERNAL_ERROR ile başarısız oldu/);
assert.match(trNews[1].content, /Geçen saat curl HTTP\/2 ilk denemede, sonraki indirmede ve yeniden denemede başarılı oldu/);
assert.match(trNews[1].content, /Geçen saat curl HTTP\/1\.1 ilk denemede, sonraki indirmede ve yeniden denemede başarılı oldu/);
assert.doesNotMatch(trNews[1].content, /Geçen saat curl HTTP\/2 ilk denemede, sonraki indirmede ve yeniden denemede INTERNAL_ERROR ile başarısız oldu/);
assert.match(trNews[1].content, /Son teyit edilen başarılı resmi indirme artık 11 Ekim 2026 12\.00 UTC/);

assert.match(enNews[1].content, /The 1080909 article first try this hour HTTP 200 Last-Modified Sunday, 11 October 2026 at 04:58:36 GMT; later HTTP 200 Last-Modified Sunday, 11 October 2026 at 04:58:36 GMT; retry HTTP 200 Last-Modified Sunday, 11 October 2026 at 04:58:36 GMT/);
assert.doesNotMatch(enNews[1].content, /The 1080909 article first try this hour HTTP 200 Last-Modified Saturday, 10 October 2026 at 17:58:32 GMT/);
assert.match(enNews[1].content, /Last hour the 1080909 article first try HTTP 200 Last-Modified Sunday, 11 October 2026 at 04:58:36 GMT; later HTTP 200 Last-Modified Sunday, 11 October 2026 at 04:58:36 GMT; retry HTTP 200 Last-Modified Sunday, 11 October 2026 at 04:58:36 GMT/);
assert.match(trNews[1].content, /1080909 yazısı bu saatte ilk denemede HTTP 200 Last-Modified 11 Ekim 2026 Pazar 04\.58\.36 GMT/);
assert.match(trNews[1].content, /Geçen saat 1080909 yazısı ilk denemede HTTP 200 Last-Modified 11 Ekim 2026 Pazar 04\.58\.36 GMT/);

assert.match(enNews[1].content, /The CIC 0980374 article first try this hour HTTP 200 Last-Modified Sunday, 11 October 2026 at 05:37:48 GMT; later HTTP 200 Last-Modified Sunday, 11 October 2026 at 05:37:48 GMT; retry HTTP 200 Last-Modified Sunday, 11 October 2026 at 05:37:48 GMT/);
assert.doesNotMatch(enNews[1].content, /The CIC 0980374 article first try this hour HTTP 200 Last-Modified Saturday, 10 October 2026 at 18:58:36 GMT/);
assert.match(enNews[1].content, /last hour first try HTTP 200 Last-Modified Sunday, 11 October 2026 at 05:37:48 GMT; later HTTP 200 Last-Modified Sunday, 11 October 2026 at 05:37:48 GMT; retry HTTP 200 Last-Modified Sunday, 11 October 2026 at 05:37:48 GMT/);
assert.match(trNews[1].content, /CIC 0980374 yazısı bu saatte ilk denemede HTTP 200 Last-Modified 11 Ekim 2026 Pazar 05\.37\.48 GMT/);

assert.match(enNews[1].content, /CIC News homepage Last-Modified this hour is Sunday, 11 October 2026 at 08:59:35 GMT on first try, Sunday, 11 October 2026 at 08:59:35 GMT on later, and Sunday, 11 October 2026 at 08:59:35 GMT on retry/);
assert.match(enNews[1].content, /last hour Sunday, 11 October 2026 at 08:59:35 GMT on first try/);
assert.match(trNews[1].content, /11 Ekim 2026 Pazar 08\.59\.35 GMT/);
assert.match(enNews[1].content, /The CIC 0980843 article first try this hour HTTP 200 Last-Modified Sunday, 11 October 2026 at 05:16:53 GMT/);
assert.doesNotMatch(enNews[1].content, /The CIC 0980843 article first try this hour HTTP 200 Last-Modified Saturday, 10 October 2026 at 21:26:55 GMT/);
assert.match(enNews[1].content, /last hour first try HTTP 200 Last-Modified Sunday, 11 October 2026 at 05:16:53 GMT/);
assert.match(trNews[1].content, /CIC 0980843 yazısı bu saatte ilk denemede HTTP 200 Last-Modified 11 Ekim 2026 Pazar 05\.16\.53 GMT/);
assert.match(enNews[1].content, /canonical 0980361 URL\) first try this hour HTTP 200 Last-Modified Sunday, 11 October 2026 at 06:07:46 GMT/);
assert.match(enNews[1].content, /Official Express Entry rounds HTML first try this hour HTTP 200 \(Last-Modified Saturday, 10 October 2026 at 02:01:49 GMT\)/);
assert.match(enNews[1].content, /Official category-based selection page first try this hour HTTP 200 \(Last-Modified Saturday, 10 October 2026 at 02:26:22 GMT\)/);
assert.match(enNews[2].content, /that page first try Saturday, 10 October 2026 at 02:26:22 GMT, later Saturday, 10 October 2026 at 02:26:22 GMT, and retry Saturday, 10 October 2026 at 02:26:22 GMT/);
assert.match(enNews[2].content, /last hour first try Saturday, 10 October 2026 at 02:26:22 GMT, later Saturday, 10 October 2026 at 02:26:22 GMT, and retry Saturday, 10 October 2026 at 02:26:22 GMT/);

assert.match(enNews[1].content, /1080909 on homepage/);
assert.match(enNews[1].content, /PEI 195 not listed/);
assert.match(enNews[1].content, /Thursday, 1 October 2026 at 15:30:46 GMT/);
assert.match(enNews[1].content, /448 round records/);

const staleHours = [
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
  '12:00 UTC on 10 October 2026',
];
for (const stamp of staleHours) {
  for (const item of enNews) {
    assert.doesNotMatch(item.content || '', new RegExp(stamp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
}

assert.match(enNews[1].content, /04:58:36 GMT/); // 1080909 still Sunday 11 Oct
assert.match(trNews[1].content, /04\.58\.36 GMT/);
