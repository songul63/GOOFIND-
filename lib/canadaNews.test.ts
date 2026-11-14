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
assert.ok(CANADA_NEWS_UPDATED_AT.startsWith('2026-11-14'), 'snapshot date should match this run');
assert.equal(CANADA_NEWS_UPDATED_AT, '2026-11-14T15:00:00Z');

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
assert.ok(en.some((item) => item.content.includes('15:00 UTC')));
assert.ok(tr.some((item) => item.content.includes('15:00 UTC')));
assert.ok(en.some((item) => item.content.includes('07:16:22 GMT')));
assert.ok(!en.some((item) => item.content.includes('19:16:52 GMT')));
assert.ok(!en.some((item) => item.content.includes('07:51 GMT')));
assert.ok(en.some((item) => item.content.includes('2026-10-09')));
assert.ok(en.some((item) => item.content.includes('454 rounds')));
assert.ok(en.some((item) => item.content.includes('10:34:14 UTC')));
assert.ok(en.some((item) => item.content.includes('HEAD and GET')));
assert.ok(en.every((item) => item.content.includes('GET')));
assert.ok(en[0].content.includes('HTTP/2 200'));
assert.ok(en[1].content.includes('HTTP/2 200'));
assert.ok(en[2].content.includes('HTTP/2 200'));
assert.ok(!en.some((item) => item.content.includes('INTERNAL_ERROR')));
assert.ok(!en.some((item) => item.content.includes('timed out')));
assert.ok(en.some((item) => item.content.includes('wget HTTP/1.1')));
assert.ok(!en.some((item) => item.content.includes('could not be re-read')));
assert.ok(en.some((item) => item.content.includes('25990')));
assert.ok(en.some((item) => item.content.includes('742096')));
assert.ok(en.some((item) => item.content.includes('04:15:05 GMT')));
assert.ok(en.some((item) => item.content.includes('13:36:47 GMT')));
assert.ok(!en.some((item) => item.content.includes('03:41:48 GMT')));
assert.ok(!en.some((item) => item.content.includes('02:15:34 GMT')));
assert.ok(!en.some((item) => item.content.includes('01:00:21 GMT')));
assert.ok(en.some((item) => item.content.includes('15:04:43 GMT')));
assert.ok(!en.some((item) => item.content.includes('13:14:21 GMT')));
assert.ok(!en.some((item) => item.content.includes('03:01:44 GMT')));
assert.ok(en.some((item) => item.content.includes('14:19:37 GMT')));
assert.ok(!en.some((item) => item.content.includes('03:31:33 GMT')));
assert.ok(!en.some((item) => item.content.includes('03:04:28 GMT')));
assert.ok(en.some((item) => item.content.includes('03:15:22 GMT')));
assert.ok(en.some((item) => item.content.includes('13:37:19 GMT')));
assert.ok(en.some((item) => item.content.includes('33226')));
assert.ok(!en.some((item) => item.content.includes('33227')));
assert.ok(!en.some((item) => item.content.includes('33225')));
assert.ok(!en.some((item) => item.content.includes('02:04:29 GMT')));
assert.ok(!en.some((item) => item.content.includes('23:53:32 GMT')));
assert.ok(!en.some((item) => item.content.includes('22:28:27 GMT')));
assert.ok(!en.some((item) => item.content.includes('22:33:39 GMT')));
assert.ok(!en.some((item) => item.content.includes('02:02:11 GMT')));
assert.ok(!en.some((item) => item.content.includes('20:17:21 GMT')));
assert.ok(!en.some((item) => item.content.includes('21:48:50 GMT')));
assert.ok(!en.some((item) => item.content.includes('01:01:39 GMT')));
assert.ok(en.some((item) => item.content.includes('November 14, 2026')));
assert.ok(tr.some((item) => item.content.includes('14 Kasım 2026')));
assert.ok(!en.some((item) => item.content.includes('November 13, 2026')));
assert.ok(!en.some((item) => item.content.includes('14:00 UTC')));
assert.ok(!en.some((item) => item.content.includes('13:00 UTC')));
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
