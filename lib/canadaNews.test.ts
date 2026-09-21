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
assert.match(enNews[0].content, /Current status: Closed|consultation page still lists|conducted public consultations|what-we-heard report has not yet been published|in negotiations|NATO Summit|4\.3 billion|TCE-Consultations/);
assert.match(trNews[0].content, /Current status: Closed|conducted public consultations|henüz yayımlanmamış|müzakerede|NATO Zirvesi|4,3 milyar|TCE-Consultations/);
assert.doesNotMatch(enNews[0].content, /\$3\.3B|3\.3 billion/i);
assert.doesNotMatch(trNews[0].content, /3,3 milyar/i);
assert.match(enNews[0].content, /tugboats|4,650|JETCO|pharmaceutical|Bolat and Sidhu|technical teams/);
assert.match(trNews[0].content, /römorkör|4\.650|JETCO|ilaç|Bolat ve Sidhu|teknik ekipler/);
assert.doesNotMatch(enNews[0].content, /Stewart|Tuzcu/);
assert.doesNotMatch(trNews[0].content, /Stewart|Tuzcu/);
assert.match(enNews[0].link || '', /consultations\/trade\/2026-07-29-turkiye/);
assert.match(enNews[0].content, /15:00 UTC on 21 September 2026/);
assert.match(trNews[0].content, /21 Eylül 2026 15\.00 UTC/);
assert.doesNotMatch(enNews[0].content, /14:00 UTC on 21 September 2026/);
assert.doesNotMatch(trNews[0].content, /21 Eylül 2026 14\.00 UTC/);
assert.match(enNews[0].content, /consultation \/report 404 both tries; \/what-we-heard 404 both tries/);
assert.match(trNews[0].content, /istişare \/report her iki denemede 404; \/what-we-heard her iki denemede 404/);
assert.match(enNews[1].title, /Express Entry|senior managers/i);
assert.match(trNews[1].title, /Express Entry|üst düzey yönetici/i);
assert.match(enNews[1].content, /#444|00012|00013|00014|00015|12 months|TEER 0|250|389/);
assert.match(trNews[1].content, /#444|00012|00013|00014|00015|12 ay|TEER 0|250|389/);
assert.match(enNews[1].content, /official rounds JSON|rounds table/i);
assert.match(trNews[1].content, /resmi tur JSON|tur tablosu/i);
assert.match(enNews[1].content, /no #445 has been published|no round after #444/i);
assert.match(trNews[1].content, /#445 yayımlanmamıştır|#444.ten sonra/i);
assert.match(enNews[1].content, /13:53:31 GMT/);
assert.match(trNews[1].content, /13\.53\.31 GMT/);
assert.match(enNews[1].content, /15:01:43 GMT/);
assert.match(trNews[1].content, /15\.01\.43 GMT/);
assert.match(enNews[1].content, /14:01:16 GMT/);
assert.match(trNews[1].content, /14\.01\.16 GMT/);
assert.match(enNews[1].content, /13:44:52 GMT/);
assert.match(trNews[1].content, /13\.44\.52 GMT/);
assert.match(enNews[1].content, /13:44:43 GMT/);
assert.match(trNews[1].content, /13\.44\.43 GMT/);
assert.match(enNews[1].content, /14:00:36 GMT/);
assert.match(trNews[1].content, /14\.00\.36 GMT/);
assert.match(enNews[1].content, /same as last hour/);
assert.match(trNews[1].content, /geçen saatle aynı/);
assert.match(enNews[1].content, /CIC News homepage Last-Modified this hour is Monday, 21 September 2026 at 13:44:52 GMT after three consistent fetches \(updated from Monday, 21 September 2026 at 13:44:43 GMT last hour\)/);
assert.match(trNews[1].content, /CIC News ana sayfasının Last-Modified damgası bu saatte 21 Eylül 2026 Pazartesi 13\.44\.52 GMT \(üç tutarlı indirme; geçen saat 21 Eylül 2026 Pazartesi 13\.44\.43 GMT idi\)/);
assert.match(enNews[1].content, /is Monday, 21 September 2026 at 14:00:36 GMT on the canonical 0980361 URL after three consistent fetches \(same as last hour\)/);
assert.match(trNews[1].content, /bu saatte 21 Eylül 2026 Pazartesi 14\.00\.36 GMT \(kanonik 0980361 URL; üç tutarlı indirme; geçen saatle aynı\)/);
assert.match(enNews[1].content, /citizenship-by-descent/);
assert.match(trNews[1].content, /citizenship-by-descent|vatandaşlık-soy/);
assert.match(enNews[1].content, /Newfoundland and Labrador PNP|62 workers/);
assert.match(trNews[1].content, /Newfoundland and Labrador PNP|62 işçi/);
assert.match(enNews[1].content, /Prince Edward Island PNP|195-candidate/);
assert.match(trNews[1].content, /Prince Edward Island PNP|195 aday/);
assert.match(enNews[1].content, /British Columbia PNP|33 workers/);
assert.match(trNews[1].content, /British Columbia PNP|33 işçi/);
assert.match(enNews[1].content, /study without a permit/);
assert.match(trNews[1].content, /izin olmadan öğrenim/);
assert.match(enNews[1].content, /Atlantic Immigration Program/);
assert.match(trNews[1].content, /Atlantic Immigration Program/);
assert.match(enNews[1].content, /0980445 Bill C-3/);
assert.match(trNews[1].content, /0980445 Bill C-3/);
assert.match(enNews[1].content, /JSON still lists 445 round records; latest drawNumber remains 444/);
assert.match(trNews[1].content, /JSON hâlâ 445 tur kaydı listeliyor; en son drawNumber hâlâ 444/);
assert.match(enNews[1].content, /23 July 2020 Canadian Experience Class row with CRS 445/);
assert.match(trNews[1].content, /23 Temmuz 2020 Kanada Deneyim Sınıfı satırındaki CRS 445/);
assert.match(enNews[1].content, /This hour official ee_rounds_123_en.json and the official Express Entry rounds HTML page succeeded over Python urllib on first try and retry \(HTTP 200\)\. curl HTTP\/2 succeeded \(HTTP 200\) and curl HTTP\/1.1 succeeded \(HTTP 200\)/);
assert.match(enNews[1].content, /Last hour those official files succeeded over Python urllib on first try and retry \(HTTP 200\); last hour curl HTTP\/2 failed \(HTTP\/2 stream INTERNAL_ERROR, 0 bytes\) and curl HTTP\/1.1 timed out after 25 seconds \(0 bytes\)/);
assert.match(enNews[1].content, /last confirmed successful official fetch is now 15:00 UTC on 21 September 2026/);
assert.match(enNews[1].content, /previous successful official fetch was 14:00 UTC/);
assert.match(enNews[1].content, /this hour’s official JSON|this hour's official JSON/);
assert.match(enNews[1].content, /official Express Entry rounds HTML Last-Modified stamp this hour is Monday, 21 September 2026 at 15:01:43 GMT on first try and retry \(updated from Monday, 21 September 2026 at 14:01:16 GMT last hour\)/);
assert.match(trNews[1].content, /Python urllib ile ilk deneme ve yeniden denemede başarılı oldu \(HTTP 200\)/);
assert.match(trNews[1].content, /Bu saatte resmi ee_rounds_123_en.json ve resmi Express Entry tur HTML sayfası Python urllib ile ilk deneme ve yeniden denemede başarılı oldu \(HTTP 200\)\. curl HTTP\/2 başarılı oldu \(HTTP 200\) ve curl HTTP\/1.1 başarılı oldu \(HTTP 200\)/);
assert.match(trNews[1].content, /Geçen saat bu resmi dosyalar Python urllib ile ilk deneme ve yeniden denemede başarılı olmuştu \(HTTP 200\); geçen saat curl HTTP\/2 başarısız oldu \(HTTP\/2 akışı INTERNAL_ERROR, 0 bayt\) ve curl HTTP\/1.1 25 saniye sonra zaman aşımına uğradı \(0 bayt\)/);
assert.match(trNews[1].content, /artık 21 Eylül 2026 15\.00 UTC/);
assert.match(trNews[1].content, /önceki başarılı resmi indirme 14\.00 UTC idi/);
assert.match(trNews[1].content, /bu saatin resmi JSON/);
assert.match(trNews[1].content, /Resmi Express Entry tur HTML Last-Modified damgası bu saatte ilk deneme ve yeniden denemede 21 Eylül 2026 Pazartesi 15\.01\.43 GMT \(geçen saat 21 Eylül 2026 Pazartesi 14\.01\.16 GMT idi\)/);
assert.doesNotMatch(enNews[1].content, /now 14:00 UTC on 21 September 2026 \(previous successful official fetch was 13:00 UTC\)/);
assert.doesNotMatch(enNews[1].content, /previous successful official fetch was 13:00 UTC/);
assert.doesNotMatch(enNews[1].content, /official Express Entry rounds HTML Last-Modified stamp this hour is Monday, 21 September 2026 at 14:01:16 GMT on first try and retry \(updated from Monday, 21 September 2026 at 13:09:20 GMT last hour\)/);
assert.doesNotMatch(enNews[1].content, /updated from Monday, 21 September 2026 at 02:54:45 GMT last hour/);
assert.doesNotMatch(enNews[1].content, /curl HTTP\/2 failed \(HTTP\/2 stream INTERNAL_ERROR, 0 bytes\) and curl HTTP\/1.1 timed out after 25 seconds \(0 bytes\)\. Last hour/);
assert.doesNotMatch(trNews[1].content, /artık 21 Eylül 2026 14\.00 UTC \(önceki başarılı resmi indirme 13\.00 UTC idi\)/);
assert.doesNotMatch(trNews[1].content, /önceki başarılı resmi indirme 13\.00 UTC idi/);
assert.doesNotMatch(trNews[1].content, /Resmi Express Entry tur HTML Last-Modified damgası bu saatte ilk deneme ve yeniden denemede 21 Eylül 2026 Pazartesi 14\.01\.16 GMT \(geçen saat 21 Eylül 2026 Pazartesi 13\.09\.20 GMT idi\)/);
assert.match(enNews[1].link || '', /express-entry-rounds/);
assert.match(enNews[2].title, /French-language proficiency/i);
assert.match(trNews[2].title, /Fransızca dil yeterliliği/i);
assert.match(enNews[2].content, /NCLC|Niveaux de compétence linguistique canadiens|minimum score of 7|all 4 language abilities/);
assert.match(trNews[2].content, /NCLC|Niveaux de compétence linguistique canadiens|en az 7|4 dil becerisinin/);
assert.match(enNews[2].content, /#437|August 19|5,000|382/);
assert.match(trNews[2].content, /#437|19 Ağustos|5\.000|382/);
assert.match(enNews[2].content, /15:00 UTC on 21 September 2026/);
assert.match(trNews[2].content, /21 Eylül 2026 15\.00 UTC/);
assert.match(enNews[2].content, /11:57:40 GMT, same as last hour/);
assert.match(trNews[2].content, /11\.57\.40 GMT, geçen saatle aynı/);
assert.match(enNews[2].content, /14:04:09 GMT on the first try and retry/);
assert.match(trNews[2].content, /ilk deneme ve yeniden denemede 21 Eylül 2026 Pazartesi 14\.04\.09 GMT/);
assert.match(enNews[2].content, /12:39:57 GMT/);
assert.match(trNews[2].content, /12\.39\.57 GMT/);
assert.match(enNews[2].link || '', /category-based-selection/);
assert.doesNotMatch(enNews[2].title, /skilled military|physicians|researchers|Anatolia Fest/i);
assert.doesNotMatch(trNews[2].title, /nitelikli askeri|hekim|araştırmacı|Anatolia Fest/i);
assert.doesNotMatch(enNews[2].content, /Sankofa Square|Anatolia Fest|this Sunday|FSMA|40042|42102|43204|41200|41201|31100|31101|31102/i);
assert.doesNotMatch(trNews[2].content, /Sankofa Square|Anatolia Fest|bu Pazar|FSMA|40042|42102|43204|41200|41201|31100|31101|31102/i);
assert.doesNotMatch(enNews[2].content, /14:00 UTC on 21 September 2026/);
assert.doesNotMatch(trNews[2].content, /21 Eylül 2026 14\.00 UTC/);
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
