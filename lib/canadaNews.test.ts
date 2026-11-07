import assert from 'node:assert/strict';
import {
  BANNER_NEWS_VERIFIED_AT,
  HOURLY_SOURCE_CHECK,
  combineBannerItems,
  getDefaultCanadaNews,
  mapNewsToBannerItem,
} from './canadaNews';
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
assert.match(
  enNews[0].content || '',
  /Current status: Closed|consultation[\s\S]*Closed|what-we-heard report has not yet been published|In negotiations|4\.3 billion/,
);
assert.match(trNews[0].content || '', /Closed|henüz yayımlanmamış|müzakere|4,3 milyar/);
assert.match(enNews[0].content || '', /\$3\.3 billion|2,550|JETCO|agri-food|dateModified 2026-10-06/);
assert.match(enNews[0].content || '', /Notice of intent|date-modified 2026-10-09|September 21, 2026/);
assert.match(trNews[0].content || '', /3,3 milyar|2\.550|JETCO|2026-10-06/);
assert.equal(
  enNews[0].link,
  'https://international.canada.ca/en/global-affairs/consultations/trade/2026-07-29-turkiye',
);

assert.match(enNews[1].title, /Express Entry/);
assert.match(enNews[1].title, /#453|paused/i);
assert.match(trNews[1].title, /Express Entry/);
assert.match(enNews[1].desc || '', /150|CRS 477|3 November|paused/i);
assert.match(enNews[1].content || '', /#453|Transport Occupations|150 invitations|CRS score of 477/);
assert.match(enNews[1].content || '', /454 round records|Labour Market Integration|pause invitation rounds/);
assert.match(trNews[1].content || '', /#453|150 davet|477 CRS|Labour Market Integration/);
assert.match(
  enNews[1].link || '',
  /express-entry\/changes\.html/,
);

assert.match(enNews[2].title, /380,000|2027/);
assert.match(trNews[2].title, /380\.000|2027/);
assert.match(enNews[2].content || '', /380,000|370,000|220,000|150,000|9\.5%/);
assert.match(trNews[2].content || '', /380\.000|370\.000|220\.000|150\.000|9,5/);
assert.match(
  enNews[2].link || '',
  /immigration-system\/levels\.html/,
);

assert.doesNotMatch(enNews[0].content || '', /urllib first HTTP/);
assert.doesNotMatch(enNews[1].content || '', /wget first HTTP/);
assert.doesNotMatch(enNews[2].content || '', /curl HTTP\/2 first HTTP/);
assert.doesNotMatch(trNews[0].content || '', /urllib first HTTP/);

assert.equal(BANNER_NEWS_VERIFIED_AT, '2026-11-07T02:00:00Z');
assert.equal(HOURLY_SOURCE_CHECK.hour, '02:00 UTC 7 November 2026');
assert.equal(HOURLY_SOURCE_CHECK.latestExpressEntryRound, 453);
assert.equal(HOURLY_SOURCE_CHECK.expressEntryRoundCount, 454);
assert.match(HOURLY_SOURCE_CHECK.urllib.ftaConsult, /HTTP 200 \(23064\)/);
assert.match(HOURLY_SOURCE_CHECK.urllib.eeJson, /HTTP 200 \(742096 bytes Last-Modified Wednesday, 28 October 2026 at 13:37:19 GMT, 454 records with latest #453\)/);
assert.match(HOURLY_SOURCE_CHECK.urllib.jetco, /retry first\/extra\/extra2 HTTP 200 \(25730\)/);
assert.match(HOURLY_SOURCE_CHECK.urllib.jetco, /first read timed out/);
assert.match(HOURLY_SOURCE_CHECK.urllib.eeRounds, /38570/);
assert.match(HOURLY_SOURCE_CHECK.urllib.eeRounds, /01:52:16 GMT/);
assert.match(HOURLY_SOURCE_CHECK.wget.eeRounds, /38569-byte body/);
assert.match(HOURLY_SOURCE_CHECK.wget.eeRounds, /01:52:16 GMT/);
assert.match(HOURLY_SOURCE_CHECK.wget.levels, /HTTP 200 \(55405\)/);
assert.match(HOURLY_SOURCE_CHECK.wget.levels, /23:09:16 GMT/);
assert.match(HOURLY_SOURCE_CHECK.wget.category, /54764-byte body after following the 301/);
assert.match(HOURLY_SOURCE_CHECK.wget.category, /00:12:20 GMT/);
assert.match(HOURLY_SOURCE_CHECK.curlHttp2.eeJson, /HTTP 000 \(0 bytes\)/);
assert.match(HOURLY_SOURCE_CHECK.curlHttp2.eeRounds, /HTTP 000 \(0 bytes\)/);
assert.match(HOURLY_SOURCE_CHECK.curlHttp11.eeRounds, /HTTP 000 \(0 bytes\)/);
assert.match(HOURLY_SOURCE_CHECK.curlHttp2.category, /HTTP 000 \(0 bytes\)/);
assert.match(HOURLY_SOURCE_CHECK.curlHttp2.ftaConsult, /HTTP 200 \(23064\)/);
assert.match(HOURLY_SOURCE_CHECK.curlHttp2.ftaInfo, /HTTP 000 \(0 bytes\)/);
assert.match(HOURLY_SOURCE_CHECK.curlHttp11.ftaInfo, /HTTP 200 \(25990\)/);
assert.match(HOURLY_SOURCE_CHECK.curlHttp2.relations, /HTTP 200 \(28593\)/);
assert.ok(HOURLY_SOURCE_CHECK.unusedCicHomepage.includes('1182320'));
assert.ok(HOURLY_SOURCE_CHECK.unusedCicHomepage.includes('1182312'));
assert.ok(HOURLY_SOURCE_CHECK.unusedCicHomepage.includes('1182044'));
assert.ok(HOURLY_SOURCE_CHECK.unusedCicHomepage.includes('1182142'));
assert.ok(HOURLY_SOURCE_CHECK.unusedCicHomepage.includes('1182123'));
assert.ok(HOURLY_SOURCE_CHECK.unusedCicHomepage.includes('1182269'));
assert.ok(HOURLY_SOURCE_CHECK.unusedCicHomepage.includes('1182266'));
assert.match(HOURLY_SOURCE_CHECK.urllib.cic1182269, /22:22:18 GMT/);
assert.match(HOURLY_SOURCE_CHECK.urllib.cic1182269, /152535|152536/);
assert.match(HOURLY_SOURCE_CHECK.urllib.cic1182312, /23:23:21 GMT/);
assert.match(HOURLY_SOURCE_CHECK.urllib.cic1182312, /136022|136021|135887/);
assert.match(HOURLY_SOURCE_CHECK.urllib.cic1182320, /23:22:09 GMT/);
assert.match(HOURLY_SOURCE_CHECK.urllib.cic1182320, /137536|137537|137402/);
assert.match(HOURLY_SOURCE_CHECK.urllib.cic1182142, /01:40:56 GMT/);
assert.match(HOURLY_SOURCE_CHECK.urllib.cic1182142, /143635|143634|143636/);
assert.match(HOURLY_SOURCE_CHECK.urllib.cicHome, /23:28:45 GMT/);
assert.match(HOURLY_SOURCE_CHECK.urllib.eeChanges, /00:26:25 GMT/);
assert.match(HOURLY_SOURCE_CHECK.urllib.levels, /23:09:16 GMT/);

const extraLive = combineBannerItems(
  [],
  [{ title: 'Ontario extra item', desc: 'Live Gemini', category: 'Economy' }],
  true,
  'en',
  fallback,
);
assert.equal(extraLive.length, 4);
assert.ok(extraLive.some((item) => item.title === 'Ontario extra item'));
assert.equal(extraLive[0].id, 'fallback-fta');

console.log('canadaNews 02:00 UTC 7 November 2026 tests passed');
