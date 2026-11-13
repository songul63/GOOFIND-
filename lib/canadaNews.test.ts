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
assert.ok(CANADA_NEWS_UPDATED_AT.startsWith('2026-11-13'), 'snapshot date should match this run');
assert.equal(CANADA_NEWS_UPDATED_AT, '2026-11-13T22:00:00Z');

const officialHost = /(canada\.ca|international\.gc\.ca|pm\.gc\.ca)$/i;
for (const item of [...en, ...tr]) {
  assert.ok(item.title.trim().length > 8, `title too short: ${item.title}`);
  assert.ok(item.desc.trim().length > 0 && item.desc.length <= 100, `desc out of range: ${item.desc}`);
  assert.ok(item.content.includes('2026'), `content should stay current: ${item.title}`);
  assert.ok(!/HTTP\/|INTERNAL_ERROR|HEAD and GET/i.test(item.content), `user copy should not include fetch debug: ${item.title}`);
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
assert.ok(en.some((item) => item.content.includes('22:00 UTC')));
assert.ok(tr.some((item) => item.content.includes('22:00 UTC')));
assert.ok(en.some((item) => item.content.includes('Labour Market Integration')));
assert.ok(en.some((item) => item.content.includes('64.4%')));
assert.ok(en.some((item) => item.content.includes('200,000')));
assert.ok(en.some((item) => item.content.includes('220,000') && item.content.includes('150,000')));
assert.ok(tr.some((item) => item.content.includes('220.000') && item.content.includes('150.000')));
assert.ok(en.some((item) => item.content.includes('Dieppe') && item.content.includes('31 March 2027')));
assert.ok(tr.some((item) => item.content.includes('Dieppe') && item.content.includes('31 Mart 2027')));
assert.ok(en.some((item) => item.content.includes('$4.3 billion')));
assert.ok(tr.some((item) => item.content.includes('4,3 milyar')));
assert.equal(en[0].link, CANADA_NEWS_SOURCES.fta);
assert.equal(en[1].link, CANADA_NEWS_SOURCES.expressEntryChanges);
assert.equal(en[2].link, CANADA_NEWS_SOURCES.levelsPlan);

const ads = [
  { id: 'b1', title: 'Turkish Airlines - Special Offers', type: 'image' as const },
  { id: 'b2', title: en[0].title, type: 'news' as const },
];

const adsOnly = combineBannerItems(ads, en, false, 'en');
assert.equal(adsOnly[0].title, en[1].title, 'official snapshot still leads when Gemini live news is off');
assert.equal(adsOnly.filter((item) => item.isLiveNews).length, 2, 'FTA already stored so two curated items remain');
assert.ok(adsOnly.some((item) => item.id === 'b1' && item.type === 'ad'));

const mixed = combineBannerItems(ads, en, true, 'en');
assert.equal(mixed[0].type, 'news');
assert.equal(mixed[0].isLiveNews, true);
assert.equal(mixed[0].title, en[1].title, 'already-published FTA headline should be skipped');
assert.ok(mixed.some((item) => item.id === 'b1' && item.type === 'ad'));
assert.equal(mixed.filter((item) => item.title === en[0].title).length, 1);

const geminiExtra = [
  { id: 'gemini-1', title: 'Ontario newcomer housing update', desc: 'Toronto units', content: '2026 housing note', category: 'Community', link: 'https://www.canada.ca/' },
];
const adsNoOverlap = [{ id: 'b1', title: 'Turkish Airlines - Special Offers', type: 'image' as const }];
const withGemini = combineBannerItems(adsNoOverlap, geminiExtra, true, 'en');
assert.equal(withGemini[0].title, en[0].title, 'curated official news should stay first even when Gemini returns other headlines');
assert.ok(withGemini.some((item) => item.title === 'Ontario newcomer housing update'));
assert.ok(withGemini.some((item) => item.id === 'b1' && item.type === 'ad'));

const emptyAds = combineBannerItems([], [], true, 'tr');
assert.equal(emptyAds.length, 3);
assert.ok(emptyAds.every((item) => item.type === 'news' && item.isLiveNews && item.link?.startsWith('https://')));
assert.ok(emptyAds[0].title.length > 0);

const converted = toNewsBannerItem({ title: 'Test', category: 'Immigration' });
assert.equal(converted.type, 'news');
assert.equal(converted.isLiveNews, true);
assert.ok(converted.url?.includes('unsplash.com'));

console.log(`canadaNews tests passed (${en.length} EN / ${tr.length} TR items, updated ${CANADA_NEWS_UPDATED_AT})`);
