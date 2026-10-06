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
assert.match(trNews[0].content, /3,3 milyar|2\.550|JETCO|Carney|Erdoğan|2026-10-06/);
assert.doesNotMatch(enNews[0].content, /tugboats|4,650|Stewart|Tuzcu|Bolat and Sidhu|technical teams|NATO Summit/);
assert.doesNotMatch(trNews[0].content, /römorkör|4\.650|Stewart|Tuzcu|Bolat ve Sidhu|teknik ekipler|NATO Zirvesi/);
assert.match(enNews[0].link || '', /consultations\/trade\/2026-07-29-turkiye/);
assert.match(enNews[0].content, /15:00 UTC on 6 October 2026/);
assert.doesNotMatch(enNews[0].content, /14:00 UTC on 6 October 2026/);
assert.doesNotMatch(enNews[0].content, /13:00 UTC on 4 October 2026/);
assert.doesNotMatch(enNews[0].content, /12:00 UTC on 4 October 2026/);
assert.match(trNews[0].content, /6 Ekim 2026 15\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /6 Ekim 2026 14\.00 UTC/);
assert.doesNotMatch(trNews[0].content, /4 Ekim 2026 13\.00 UTC/);
assert.match(enNews[0].content, /consultation \/report first try 404; later 404; retry 404; \/what-we-heard first try 404; later 404; retry 404/);
assert.match(trNews[0].content, /istişare \/report ilk denemede 404; sonraki 404; yeniden deneme 404; \/what-we-heard ilk denemede 404; sonraki 404; yeniden deneme 404/);
assert.ok(
  enNews[0].content.includes(
    'JETCO path (`country_news-pays_nouvelles/2026-01-20-turkiye.aspx`) first try this hour HTTP 404; later timed out; retry timed out (last hour first try HTTP 404; later HTTP 404; retry HTTP 404)',
  ),
);
assert.match(enNews[0].content, /Alternate no-lang first try this hour HTTP 404; later HTTP 404; retry HTTP 404 \(last hour first try HTTP 404; later HTTP 404; retry HTTP 404\)/);
assert.match(trNews[0].content, /JETCO yolu .* bu saatte ilk denemede HTTP 404; sonraki zaman aşımına uğradı; yeniden deneme zaman aşımına uğradı/);
assert.match(enNews[0].content, /FTA info page first try this hour HTTP 200; a later fetch HTTP 200; retry HTTP 200/);
assert.match(trNews[0].content, /STA bilgi sayfası bu saatte ilk denemede HTTP 200 verdi; sonraki bir indirme HTTP 200 verdi; yeniden deneme HTTP 200/);
assert.match(enNews[0].content, /international.canada.ca probe first try this hour HTTP 200; later HTTP 200; retry HTTP 200 \(last hour first try HTTP 200; later HTTP 200; retry HTTP 200\)/);
assert.match(trNews[0].content, /international.canada.ca denemesi bu saatte ilk denemede HTTP 200; sonraki HTTP 200; yeniden deneme HTTP 200 \(geçen saat ilk denemede HTTP 200; sonraki HTTP 200; yeniden deneme HTTP 200\)/);

assert.match(enNews[1].title, /Express Entry #447|Trades Occupations/i);
assert.match(trNews[1].title, /Express Entry #447|Trades Occupations|meslekler/i);
assert.match(enNews[1].content, /#447|3,500|476|Trades Occupations|12:47:55 UTC/);
assert.match(trNews[1].content, /#447|3\.500|476|Trades Occupations|12\.47\.55 UTC/);
assert.match(enNews[1].content, /official rounds JSON|rounds table/i);
assert.match(trNews[1].content, /resmi tur JSON|tur tablosu/i);
assert.match(enNews[1].content, /official round #447 is published|#447\. That JSON listed 448 round records|latest listed round is now #447/);
assert.match(trNews[1].content, /resmi #447 turu resmi IRCC JSON’unda yayımlanmıştır|en son tur artık #447/);
assert.doesNotMatch(enNews[1].content, /no #447 has been published/);
assert.doesNotMatch(enNews[1].content, /no #446 has been published/);
assert.doesNotMatch(trNews[1].content, /#447 yayımlanmamıştır/);
assert.doesNotMatch(trNews[1].content, /#446 yayımlanmamıştır/);
assert.match(enNews[1].content, /15:30:46 GMT/);
assert.match(trNews[1].content, /15\.30\.46 GMT/);
assert.match(enNews[1].content, /Official Express Entry rounds HTML first try this hour HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 15:05:52 GMT\); later HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 15:05:52 GMT\); retry HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 15:12:50 GMT\)/);
assert.match(enNews[1].content, /Last hour that page first try HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 14:18:39 GMT\); later HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 14:18:39 GMT\); retry HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 14:20:38 GMT\)/);
assert.doesNotMatch(enNews[1].content, /13:06:03 GMT/);
assert.doesNotMatch(trNews[1].content, /13\.06\.03 GMT/);
assert.match(enNews[1].content, /Official category-based selection page first try this hour HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 12:21:18 GMT\); later HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 12:21:18 GMT\); retry HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 12:21:18 GMT\)/);
assert.match(enNews[1].content, /Last hour the official category-based selection page first try HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 12:21:18 GMT\); later HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 12:21:18 GMT\); retry HTTP 200 \(Last-Modified Tuesday, 6 October 2026 at 14:04:19 GMT\)/);
assert.doesNotMatch(enNews[1].content, /15:25:54 GMT/);
assert.doesNotMatch(trNews[1].content, /15\.25\.54 GMT/);
assert.match(enNews[1].content, /curl HTTP\/2 failed this hour \(INTERNAL_ERROR\) and curl HTTP\/1.1 timed out this hour/);
assert.match(enNews[1].content, /Python urllib succeeded this hour \(HTTP 200, 731813 bytes\)/);
assert.match(enNews[1].content, /Last hour curl HTTP\/2 succeeded \(HTTP 200, 731813 bytes\) and curl HTTP\/1.1 succeeded/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 succeeded this hour \(HTTP 200, 731813 bytes\)/);
assert.doesNotMatch(enNews[1].content, /Python urllib timed out this hour/);
assert.match(trNews[1].content, /curl HTTP\/2 bu saatte başarısız oldu/);
assert.match(trNews[1].content, /curl HTTP\/1.1 bu saatte zaman aşımına uğradı/);
assert.match(trNews[1].content, /Python urllib bu saatte başarılı oldu/);
assert.match(trNews[1].content, /Geçen saat curl HTTP\/2 başarılı oldu/);
assert.match(enNews[1].content, /last confirmed successful official fetch is now 15:00 UTC on 6 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 14:00 UTC on 6 October 2026/);
assert.doesNotMatch(enNews[1].content, /last confirmed successful official fetch is now 13:00 UTC on 4 October 2026/);
assert.match(enNews[1].content, /11:22:20 GMT/);
assert.match(enNews[1].content, /11:03:57 GMT/);
assert.match(enNews[1].content, /11:10:55 GMT/);
assert.match(enNews[1].content, /11:13:54 GMT/);
assert.match(enNews[1].content, /11:16:22 GMT/);
assert.match(enNews[1].content, /11:18:00 GMT/);
assert.match(enNews[1].content, /11:17:59 GMT/);
assert.match(enNews[1].content, /11:14:14 GMT/);
assert.doesNotMatch(enNews[1].content, /11:14:23 GMT/);
assert.doesNotMatch(enNews[1].content, /11:07:41 GMT/);
assert.doesNotMatch(enNews[1].content, /11:07:25 GMT/);
assert.doesNotMatch(enNews[1].content, /11:13:41 GMT/);
assert.doesNotMatch(enNews[1].content, /11:53:07 GMT/);
assert.match(trNews[1].content, /11\.22\.20 GMT/);
assert.match(trNews[1].content, /11\.03\.57 GMT/);
assert.match(trNews[1].content, /11\.10\.55 GMT/);
assert.match(trNews[1].content, /11\.13\.54 GMT/);
assert.match(trNews[1].content, /11\.16\.22 GMT/);
assert.match(trNews[1].content, /11\.18\.00 GMT/);
assert.match(trNews[1].content, /11\.17\.59 GMT/);
assert.match(trNews[1].content, /11\.14\.14 GMT/);
assert.doesNotMatch(trNews[1].content, /11\.14\.23 GMT/);
assert.doesNotMatch(trNews[1].content, /11\.07\.41 GMT/);
assert.doesNotMatch(trNews[1].content, /11\.07\.25 GMT/);
assert.match(enNews[1].content, /1080909/);
assert.match(enNews[1].content, /article:modified_time 2026-10-01T18:16:48\+00:00/);
assert.match(enNews[1].content, /0980843/);
assert.match(enNews[1].content, /0980374/);
assert.match(enNews[1].content, /0980361/);
assert.match(enNews[1].content, /PEI 195 not listed/);
assert.match(enNews[1].content, /study-permit funds-hike on homepage \(unused\)/);
assert.match(enNews[1].content, /1081021 Clifford unused/);
assert.match(enNews[1].content, /1081030 Haitians TPS unused/);
assert.match(enNews[1].content, /timed out on the canonical 0980361 URL/);

assert.match(enNews[2].title, /skilled military recruits/i);
assert.match(trNews[2].title, /nitelikli askeri adaylar/i);
assert.match(enNews[2].content, /FSMA|NOC 40042|42102|43204|ten years/);
assert.match(trNews[2].content, /FSMA|NOC 40042|42102|43204|on yıl/);
assert.match(enNews[2].content, /latest official round is now #447 for Trades Occupations/);
assert.match(trNews[2].content, /en son resmi tur artık Trades Occupations için #447/);
assert.match(enNews[2].content, /category-based selection page as the source/);
assert.match(enNews[2].link || '', /category-based-selection/);
assert.match(trNews[2].link || '', /category-based-selection/);
assert.match(enNews[2].content, /first try Tuesday, 6 October 2026 at 12:21:18 GMT, later Tuesday, 6 October 2026 at 12:21:18 GMT, and retry Tuesday, 6 October 2026 at 12:21:18 GMT/);
assert.match(enNews[2].content, /last hour first try Tuesday, 6 October 2026 at 12:21:18 GMT, later Tuesday, 6 October 2026 at 12:21:18 GMT, and retry Tuesday, 6 October 2026 at 14:04:19 GMT/);
assert.doesNotMatch(enNews[2].title, /AI for Climate|French-language|physicians|researchers|Anatolia Fest/i);
assert.doesNotMatch(trNews[2].title, /Çevre İçin Yapay Zeka|Fransızca|hekim|araştırmacı|Anatolia Fest/i);
assert.match(enNews[2].content, /no longer a clean same-day sourced event/);
assert.match(trNews[2].content, /artık aynı gün kaynaklı temiz bir etkinlik olmadığı/);
assert.match(enNews[2].content, /Do not restore Anatolia Fest/);
assert.match(trNews[2].content, /Anatolia Fest yaklaşan etkinlik olarak geri yüklenmemeli/);
assert.match(enNews[2].content, /venue is consistent/);
assert.match(trNews[2].content, /mekân tutarlı olana kadar/);
assert.match(enNews[2].content, /republic-ball\/` first try this hour HTTP 200 with the homepage title Turkish-Canadian Society/);
assert.match(enNews[2].content, /republic-ball-103rd\/` first try this hour HTTP 200, later HTTP 200, retry HTTP 200/);
assert.match(trNews[2].content, /republic-ball-103rd\/` bu saatte ilk denemede HTTP 200, sonraki indirmede HTTP 200, yeniden denemede HTTP 200 verdi/);
assert.match(enNews[2].content, /thefederationto.com host did not resolve this hour/);
assert.match(enNews[2].content, /turkishfederation.ca `\/en\/listings` first try HTTP 404/);
assert.match(trNews[2].content, /thefederationto.com bu saatte çözülmedi/);
assert.doesNotMatch(enNews[2].content, /HTTP 503/);
assert.doesNotMatch(trNews[2].content, /HTTP 503/);
assert.match(enNews[2].content, /15:00 UTC on 6 October 2026/);
assert.doesNotMatch(enNews[2].content, /13:00 UTC on 4 October 2026/);
assert.match(trNews[2].content, /6 Ekim 2026 15\.00 UTC/);
assert.doesNotMatch(trNews[2].content, /4 Ekim 2026 13\.00 UTC/);

for (const item of [...enNews, ...trNews]) {
  assert.ok(item.link && /^https:\/\//.test(item.link), `sourced link required: ${item.title}`);
  assert.ok(!item.link.includes('google.com/search'), `search-page links are not sources: ${item.title}`);
  assert.ok(item.content && item.content.length > 80, `article body required: ${item.title}`);
}

const mapped = mapNewsToBannerItem(
  { title: 'Toronto Turkish Festival', desc: 'Weekend food market', category: 'Community', link: 'https://example.com' },
  0,
  'en',
  fallback,
);
assert.equal(mapped.type, 'news');
assert.equal(mapped.isLiveNews, true);
assert.equal(mapped.link, 'https://example.com');

console.log('canadaNews tests passed');
