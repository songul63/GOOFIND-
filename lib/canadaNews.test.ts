import assert from 'node:assert/strict';
import {
  CANADA_NEWS_SOURCES,
  CANADA_NEWS_UPDATED_AT,
  combineBannerItems,
  getDefaultCanadaNews,
  toNewsBannerItem,
} from './canadaNews.ts';

const en = getDefaultCanadaNews('en');
const tr = getDefaultCanadaNews('tr');

assert.equal(en.length, 3, 'English fallbacks should include three headlines');
assert.equal(tr.length, 3, 'Turkish fallbacks should include three headlines');
assert.ok(CANADA_NEWS_UPDATED_AT.startsWith('2026-11-18'), 'snapshot date should match this run');
assert.equal(CANADA_NEWS_UPDATED_AT, '2026-11-18T01:00:00Z');

const officialHost = /(canada\.ca|international\.gc\.ca)$/i;
for (const item of [...en, ...tr]) {
  assert.ok(item.title.trim().length > 8, `title too short: ${item.title}`);
  assert.ok(item.desc.trim().length > 0 && item.desc.length <= 100, `desc out of range: ${item.desc}`);
  assert.ok(item.content.includes('2026'), `content should stay current: ${item.title}`);
  assert.ok(item.link.startsWith('https://'), `link should be https: ${item.link}`);
  const host = new URL(item.link).hostname.replace(/^www\./, '');
  assert.match(host, officialHost, `link should be an official Canada host: ${item.link}`);
  assert.ok(item.url.startsWith('https://'), `image url missing for ${item.title}`);
}

assert.notEqual(en[0].title, tr[0].title, 'English and Turkish titles should differ');
assert.match(en.map((item) => item.title).join(' '), /FTA|Express Entry|380,000/);
assert.match(tr.map((item) => item.title).join(' '), /STA|Express Entry|380\.000/);
assert.ok(en.some((item) => item.content.includes('#453') && item.content.includes('477')));
assert.ok(tr.some((item) => item.content.includes('#453') && item.content.includes('477')));
assert.ok(en.some((item) => item.content.includes('370,000')));
assert.ok(en.some((item) => item.content.includes('100,000') && item.content.includes('95,000')));
assert.ok(en.some((item) => item.content.includes('November 30') && item.content.includes('December 4')));
assert.ok(tr.some((item) => item.content.includes('30 Kasım') && item.content.includes('4 Aralık')));
assert.ok(en.some((item) => item.content.includes('01:00 UTC')));
assert.ok(tr.some((item) => item.content.includes('01:00 UTC')));
assert.ok(en.some((item) => item.content.includes('21:01:08 GMT')));
assert.ok(en.some((item) => item.content.includes('2026-10-09')));
assert.ok(en.some((item) => item.content.includes('454 rounds')));
assert.ok(en.some((item) => item.content.includes('10:34:14 UTC')));
assert.ok(en.some((item) => item.content.includes('HEAD and GET')));
assert.ok(en.every((item) => item.content.includes('GET')));
assert.ok(en[0].content.includes('HTTP/2 200'));
assert.ok(en[1].content.includes('HTTP/2'));
assert.ok(en[2].content.includes('HTTP/2'));
assert.ok(en[0].content.includes('200'));
assert.ok(en[1].content.includes('200'));
assert.ok(en[2].content.includes('200'));
assert.ok(en.some((item) => item.content.includes('INTERNAL_ERROR')));
assert.ok(en.some((item) => item.content.includes('timed out')));
assert.ok(en.some((item) => item.content.includes('urllib timed out')));
assert.ok(en.some((item) => item.content.includes('Chrome-UA wget timed out')));
assert.ok(!en.some((item) => item.content.includes('timed out in headers')));
assert.ok(!en.some((item) => item.content.includes('recovered')));
assert.ok(!en.some((item) => item.content.includes('Akamai')));
assert.ok(en.some((item) => item.content.includes('wget HTTP/1.1')));
assert.ok(en.some((item) => item.content.includes('wget HTTP/1.1 GET succeeded')));
assert.ok(en.some((item) => item.content.includes('urllib HTTP 200')));
assert.ok(!en.some((item) => item.content.includes('could not be re-read')));
assert.ok(!en.some((item) => item.content.includes('wget HTTP/1.1 GET 200')));
assert.ok(en.some((item) => item.content.includes('25990')));
assert.ok(en.some((item) => item.content.includes('742096')));
assert.ok(en.some((item) => item.content.includes('50766')));
assert.ok(en.some((item) => item.content.includes('50765')));
assert.ok(en.some((item) => item.content.includes('50757')));
assert.ok(!en.some((item) => item.content.includes('50767')));
assert.ok(!en.some((item) => item.content.includes('50764')));
assert.ok(!en.some((item) => item.content.includes('50763')));
assert.ok(!en.some((item) => item.content.includes('50762')));
assert.ok(!en.some((item) => item.content.includes('50760')));
assert.ok(!en.some((item) => item.content.includes('50758')));
assert.ok(!en.some((item) => item.content.includes('50756')));
assert.ok(!en.some((item) => item.content.includes('50755')));
assert.ok(!en.some((item) => item.content.includes('50754')));
assert.ok(!en.some((item) => item.content.includes('50753')));
assert.ok(en.some((item) => item.content.includes('01:01:01 GMT')));
assert.ok(en.some((item) => item.content.includes('00:07:51 GMT')));
assert.ok(en.some((item) => item.content.includes('23:02:37 GMT')));
assert.ok(en.some((item) => item.content.includes('00:23:23 GMT')));
assert.ok(en.some((item) => item.content.includes('22:19:09 GMT')));
assert.ok(en.some((item) => item.content.includes('142199')));
assert.ok(en.some((item) => item.content.includes('34805')));
assert.ok(en.some((item) => item.content.includes('40636')));
assert.ok(en.some((item) => item.content.includes('52076')));
assert.ok(en.some((item) => item.content.includes('33225')));
assert.ok(!en.some((item) => item.content.includes('00:11:21 GMT')));
assert.ok(!en.some((item) => item.content.includes('20:30:11 GMT')));
assert.ok(!en.some((item) => item.content.includes('20:45:38 GMT')));
assert.ok(!en.some((item) => item.content.includes('23:05:26 GMT')));
assert.ok(!en.some((item) => item.content.includes('19:26:04 GMT')));
assert.ok(!en.some((item) => item.content.includes('21:01:37 GMT')));
assert.ok(!en.some((item) => item.content.includes('18:36:42 GMT')));
assert.ok(!en.some((item) => item.content.includes('20:01:32 GMT')));
assert.ok(!en.some((item) => item.content.includes('16:53:39 GMT')));
assert.ok(!en.some((item) => item.content.includes('17:08:03 GMT')));
assert.ok(!en.some((item) => item.content.includes('18:55:29 GMT')));
assert.ok(!en.some((item) => item.content.includes('19:05:29 GMT')));
assert.ok(!en.some((item) => item.content.includes('15:45:44 GMT')));
assert.ok(!en.some((item) => item.content.includes('18:00:16 GMT')));
assert.ok(!en.some((item) => item.content.includes('17:09:49 GMT')));
assert.ok(!en.some((item) => item.content.includes('15:00:06 GMT')));
assert.ok(!en.some((item) => item.content.includes('07:17:47 GMT')));
assert.ok(!en.some((item) => item.content.includes('19:00:38 GMT')));
assert.ok(!en.some((item) => item.content.includes('17:00:40 GMT')));
assert.ok(!en.some((item) => item.content.includes('13:31:40 GMT')));
assert.ok(!en.some((item) => item.content.includes('16:00:42 GMT')));
assert.ok(!en.some((item) => item.content.includes('13:01:08 GMT')));
assert.ok(!en.some((item) => item.content.includes('15:04:12 GMT')));
assert.ok(!en.some((item) => item.content.includes('13:58:36 GMT')));
assert.ok(!en.some((item) => item.content.includes('13:03:06 GMT')));
assert.ok(!en.some((item) => item.content.includes('12:05:55 GMT')));
assert.ok(!en.some((item) => item.content.includes('10:35:03 GMT')));
assert.ok(!en.some((item) => item.content.includes('08:55:45 GMT')));
assert.ok(!en.some((item) => item.content.includes('09:10:43 GMT')));
assert.ok(!en.some((item) => item.content.includes('09:59:29 GMT')));
assert.ok(!en.some((item) => item.content.includes('08:28:44 GMT')));
assert.ok(!en.some((item) => item.content.includes('142198')));
assert.ok(!en.some((item) => item.content.includes('142197')));
assert.ok(!en.some((item) => item.content.includes('142200')));
assert.ok(!en.some((item) => item.content.includes('142190')));
assert.ok(!en.some((item) => item.content.includes('142189')));
assert.ok(!en.some((item) => item.content.includes('31737')));
assert.ok(!en.some((item) => item.content.includes('34806')));
assert.ok(!en.some((item) => item.content.includes('34804')));
assert.ok(!en.some((item) => item.content.includes('34797')));
assert.ok(!en.some((item) => item.content.includes('34796')));
assert.ok(!en.some((item) => item.content.includes('34795')));
assert.ok(!en.some((item) => item.content.includes('40635')));
assert.ok(!en.some((item) => item.content.includes('40634')));
assert.ok(!en.some((item) => item.content.includes('40628')));
assert.ok(!en.some((item) => item.content.includes('40627')));
assert.ok(!en.some((item) => item.content.includes('40625')));
assert.ok(!en.some((item) => item.content.includes('52077')));
assert.ok(!en.some((item) => item.content.includes('52075')));
assert.ok(!en.some((item) => item.content.includes('52074')));
assert.ok(!en.some((item) => item.content.includes('52068')));
assert.ok(!en.some((item) => item.content.includes('52067')));
assert.ok(!en.some((item) => item.content.includes('33226')));
assert.ok(!en.some((item) => item.content.includes('33224')));
assert.ok(!en.some((item) => item.content.includes('33217')));
assert.ok(!en.some((item) => item.content.includes('33216')));
assert.ok(!en.some((item) => item.content.includes('07:45:06 GMT')));
assert.ok(!en.some((item) => item.content.includes('07:44:27 GMT')));
assert.ok(!en.some((item) => item.content.includes('07:44:48 GMT')));
assert.ok(!en.some((item) => item.content.includes('03:34:13 GMT')));
assert.ok(!en.some((item) => item.content.includes('03:44:46 GMT')));
assert.ok(!en.some((item) => item.content.includes('07:39:40 GMT')));
assert.ok(!en.some((item) => item.content.includes('04:40:39 GMT')));
assert.ok(!en.some((item) => item.content.includes('03:32:59 GMT')));
assert.ok(!en.some((item) => item.content.includes('03:32:14 GMT')));
assert.ok(!en.some((item) => item.content.includes('01:38:11 GMT')));
assert.ok(!en.some((item) => item.content.includes('01:11:21 GMT')));
assert.ok(!en.some((item) => item.content.includes('01:04:07 GMT')));
assert.ok(!en.some((item) => item.content.includes('01:04:10 GMT')));
assert.ok(!en.some((item) => item.content.includes('04:08:39 GMT')));
assert.ok(!en.some((item) => item.content.includes('01:02:01 GMT')));
assert.ok(!en.some((item) => item.content.includes('00:26:08 GMT')));
assert.ok(!en.some((item) => item.content.includes('22:50:41 GMT')));
assert.ok(!en.some((item) => item.content.includes('22:40:50 GMT')));
assert.ok(!en.some((item) => item.content.includes('21:25:19 GMT')));
assert.ok(!en.some((item) => item.content.includes('03:00:57 GMT')));
assert.ok(!en.some((item) => item.content.includes('01:05:26 GMT')));
assert.ok(!en.some((item) => item.content.includes('00:00:39 GMT')));
assert.ok(!en.some((item) => item.content.includes('13:37:19 GMT')));
assert.ok(en.some((item) => item.content.includes('November 18, 2026')));
assert.ok(tr.some((item) => item.content.includes('18 Kasım 2026')));
assert.ok(!en.some((item) => item.content.includes('November 17, 2026')));
assert.ok(!en.some((item) => item.content.includes('November 16, 2026')));
assert.ok(!en.some((item) => item.content.includes('November 15, 2026')));
assert.ok(!en.some((item) => item.content.includes('November 14, 2026')));
assert.ok(!en.some((item) => item.content.includes('00:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('23:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('22:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('21:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('20:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('19:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('18:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('17:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('16:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('15:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('14:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('13:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('12:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('11:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('10:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('09:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('08:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('07:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('06:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('05:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('04:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('03:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('02:00 UTC')));
assert.ok(en.some((item) => item.content.includes('64.4%')));
assert.ok(en.some((item) => item.content.includes('200,000')));
assert.ok(en.some((item) => item.content.includes('220,000') && item.content.includes('150,000')));
assert.ok(tr.some((item) => item.content.includes('220.000') && item.content.includes('150.000')));
assert.ok(en.some((item) => item.content.includes('Dieppe') && item.content.includes('31 March 2027')));
assert.ok(tr.some((item) => item.content.includes('Dieppe') && item.content.includes('31 Mart 2027')));
assert.equal(en[0].link, CANADA_NEWS_SOURCES.fta);
assert.equal(en[1].link, CANADA_NEWS_SOURCES.expressEntryChanges);
assert.equal(en[2].link, CANADA_NEWS_SOURCES.levelsPlan);

const ads = [
  { id: 'b1', title: 'Turkish Airlines - Special Offers', type: 'image' as const },
  { id: 'b2', title: en[0].title, type: 'news' as const },
];

const adsOnly = combineBannerItems(ads, en, false);
assert.equal(adsOnly.length, 2);
assert.deepEqual(
  adsOnly.map((item) => item.type),
  ['ad', 'news'],
);

const mixed = combineBannerItems(ads, en, true);
assert.equal(mixed[0].type, 'news');
assert.equal(mixed[0].title, en[1].title, 'already-published FTA headline should be skipped');
assert.ok(mixed.some((item) => item.id === 'b1' && item.type === 'ad'));
assert.equal(mixed.filter((item) => item.title === en[0].title).length, 1);

const emptyAds = combineBannerItems([], en, true);
assert.equal(emptyAds.length, 3);
assert.ok(emptyAds.every((item) => item.type === 'news' && item.link?.startsWith('https://')));

const converted = toNewsBannerItem({ title: 'Test', category: 'Immigration' });
assert.equal(converted.type, 'news');
assert.ok(converted.url?.includes('unsplash.com'));

console.log(`canadaNews tests passed (${en.length} EN / ${tr.length} TR items, updated ${CANADA_NEWS_UPDATED_AT})`);
