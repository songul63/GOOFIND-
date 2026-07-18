import type { Business, Community, Event, Notification, PlaceToVisit } from '../types';

export type CanadianRegion =
  | 'ON'
  | 'QC'
  | 'AB'
  | 'BC'
  | 'MB'
  | 'SK'
  | 'NS'
  | 'NB'
  | 'NL'
  | 'PE';

export const ALL_CANADIAN_REGIONS: CanadianRegion[] = [
  'ON',
  'QC',
  'AB',
  'BC',
  'MB',
  'SK',
  'NS',
  'NB',
  'NL',
  'PE',
];

type RegionMeta = {
  label: { en: string; tr: string };
  defaultCommunity: string;
  communityOrder: readonly string[];
  postal: RegExp;
  markers: RegExp;
  buttonActive: string;
  profileActive: string;
};

const REGION_META: Record<CanadianRegion, RegionMeta> = {
  ON: {
    label: { en: 'Ontario', tr: 'Ontario' },
    defaultCommunity: 'toronto',
    communityOrder: [],
    postal: /\b[KLMNP]\d[A-Z]\s?\d[A-Z]\d\b/i,
    markers:
      /\b(ON|ONTARIO|TORONTO|MISSISSAUGA|HAMILTON|NORTH YORK|BRAMPTON|VAUGHAN|MARKHAM|NIAGARA|KITCHENER|WATERLOO|ETOBICOKE|SCARBOROUGH)\b/i,
    buttonActive: 'bg-primary text-white shadow-md shadow-primary/25',
    profileActive: 'bg-primary text-white border-primary shadow-md shadow-primary/20',
  },
  QC: {
    label: { en: 'Quebec', tr: 'Quebec' },
    defaultCommunity: 'montreal',
    communityOrder: ['ottawa', 'montreal', 'quebec-city', 'laval', 'gatineau', 'longueuil', 'sherbrooke', 'levis', 'trois-rivieres', 'brossard', 'terrebonne'],
    postal: /\b[GHJ]\d[A-Z]\s?\d[A-Z]\d\b/i,
    markers:
      /\b(QC|QUEBEC|QUÉBEC|MONTRÉAL|MONTREAL|LAVAL|GATINEAU|LONGUEUIL|SHERBROOKE|LÉVIS|LEVIS|TROIS-RIVIÈRES|TROIS-RIVIERES|BROSSARD|TERREBONNE|SAGUENAY|QUEBEC CITY|VILLE DE QUÉBEC)\b/i,
    buttonActive: 'bg-accent text-white shadow-md shadow-accent/25',
    profileActive: 'bg-accent text-white border-accent shadow-md shadow-accent/20',
  },
  AB: {
    label: { en: 'Alberta', tr: 'Alberta' },
    defaultCommunity: 'calgary',
    communityOrder: ['calgary', 'edmonton', 'red-deer', 'lethbridge', 'medicine-hat', 'fort-mcmurray'],
    postal: /\bT\d[A-Z]\s?\d[A-Z]\d\b/i,
    markers:
      /\b(AB|ALBERTA|CALGARY|EDMONTON|RED DEER|LETHBRIDGE|MEDICINE HAT|FORT MCMURRAY|GRANDE PRAIRIE|AIRDRIE|ST\.?\s*ALBERT|LEDUC|SPRINGBANK)\b/i,
    buttonActive: 'bg-red-600 text-white shadow-md shadow-red-600/25',
    profileActive: 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20',
  },
  BC: {
    label: { en: 'British Columbia', tr: 'British Columbia' },
    defaultCommunity: 'vancouver',
    communityOrder: ['vancouver', 'surrey', 'burnaby', 'victoria', 'kelowna', 'richmond'],
    postal: /\bV\d[A-Z]\s?\d[A-Z]\d\b/i,
    markers:
      /\b(BC|BRITISH COLUMBIA|VANCOUVER|SURREY|BURNABY|VICTORIA|KELOWNA|RICHMOND|ABBOTSFORD|COQUITLAM|LANGLEY|DELTA|KAMLOOPS|NANAIMO)\b/i,
    buttonActive: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25',
    profileActive: 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20',
  },
  MB: {
    label: { en: 'Manitoba', tr: 'Manitoba' },
    defaultCommunity: 'winnipeg',
    communityOrder: ['winnipeg', 'brandon', 'steinbach', 'thompson', 'portage-la-prairie', 'selkirk'],
    postal: /\bR\d[A-Z]\s?\d[A-Z]\d\b/i,
    markers:
      /\b(MB|MANITOBA|WINNIPEG|BRANDON|STEINBACH|THOMPSON|PORTAGE LA PRAIRIE|SELKIRK|WINKLER|MORDEN|DAUPHIN)\b/i,
    buttonActive: 'bg-amber-600 text-white shadow-md shadow-amber-600/25',
    profileActive: 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20',
  },
  SK: {
    label: { en: 'Saskatchewan', tr: 'Saskatchewan' },
    defaultCommunity: 'saskatoon',
    communityOrder: ['saskatoon', 'regina', 'prince-albert', 'moose-jaw', 'swift-current', 'yorkton'],
    postal: /\bS\d[A-Z]\s?\d[A-Z]\d\b/i,
    markers:
      /\b(SK|SASKATCHEWAN|SASKATOON|REGINA|PRINCE ALBERT|MOOSE JAW|SWIFT CURRENT|YORKTON|NORTH BATTLEFORD|ESTEVAN|WEYBURN)\b/i,
    buttonActive: 'bg-lime-600 text-white shadow-md shadow-lime-600/25',
    profileActive: 'bg-lime-600 text-white border-lime-600 shadow-md shadow-lime-600/20',
  },
  NS: {
    label: { en: 'Nova Scotia', tr: 'Nova Scotia' },
    defaultCommunity: 'halifax',
    communityOrder: ['halifax', 'dartmouth', 'sydney', 'truro', 'new-glasgow', 'bridgewater'],
    postal: /\bB\d[A-Z]\s?\d[A-Z]\d\b/i,
    markers:
      /\b(NS|NOVA SCOTIA|HALIFAX|DARTMOUTH|SYDNEY|TRURO|NEW GLASGOW|BRIDGEWATER|AMHERST|KENTVILLE|YARMOUTH)\b/i,
    buttonActive: 'bg-blue-700 text-white shadow-md shadow-blue-700/25',
    profileActive: 'bg-blue-700 text-white border-blue-700 shadow-md shadow-blue-700/20',
  },
  NB: {
    label: { en: 'New Brunswick', tr: 'New Brunswick' },
    defaultCommunity: 'moncton',
    communityOrder: ['moncton', 'saint-john', 'fredericton', 'dieppe', 'miramichi', 'edmundston'],
    postal: /\bE\d[A-Z]\s?\d[A-Z]\d\b/i,
    markers:
      /\b(NB|NEW BRUNSWICK|MONCTON|SAINT JOHN|FREDERICTON|DIEPPE|MIRAMICHI|EDMUNDSTON|BATHURST|CAMPBELLTON)\b/i,
    buttonActive: 'bg-violet-600 text-white shadow-md shadow-violet-600/25',
    profileActive: 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/20',
  },
  NL: {
    label: { en: 'Newfoundland and Labrador', tr: 'Newfoundland' },
    defaultCommunity: 'st-johns',
    communityOrder: ['st-johns', 'mount-pearl', 'corner-brook', 'grand-falls-windsor', 'gander', 'happy-valley-goose-bay'],
    postal: /\bA\d[A-Z]\s?\d[A-Z]\d\b/i,
    markers:
      /\b(NL|NEWFOUNDLAND|LABRADOR|ST\.?\s*JOHN'?S|MOUNT PEARL|CORNER BROOK|GRAND FALLS|GANDER|GOOSE BAY|HAPPY VALLEY)\b/i,
    buttonActive: 'bg-sky-600 text-white shadow-md shadow-sky-600/25',
    profileActive: 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20',
  },
  PE: {
    label: { en: 'Prince Edward Island', tr: 'Prince Edward Island' },
    defaultCommunity: 'charlottetown',
    communityOrder: ['charlottetown', 'summerside', 'stratford-pe', 'cornwall-pe', 'montague', 'kensington'],
    postal: /\bC\d[A-Z]\s?\d[A-Z]\d\b/i,
    markers:
      /\b(PE|PRINCE EDWARD ISLAND|P\.?\s*E\.?\s*I\.?|CHARLOTTETOWN|SUMMERSIDE|STRATFORD|MONTAGUE|KENSINGTON|CORNWALL)\b/i,
    buttonActive: 'bg-rose-600 text-white shadow-md shadow-rose-600/25',
    profileActive: 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20',
  },
};

export const DEFAULT_COMMUNITY_BY_REGION = Object.fromEntries(
  ALL_CANADIAN_REGIONS.map((region) => [region, REGION_META[region].defaultCommunity]),
) as Record<CanadianRegion, string>;

export const QC_COMMUNITY_ORDER = REGION_META.QC.communityOrder;
export const AB_COMMUNITY_ORDER = REGION_META.AB.communityOrder;
export const BC_COMMUNITY_ORDER = REGION_META.BC.communityOrder;
export const MB_COMMUNITY_ORDER = REGION_META.MB.communityOrder;
export const SK_COMMUNITY_ORDER = REGION_META.SK.communityOrder;
export const NS_COMMUNITY_ORDER = REGION_META.NS.communityOrder;
export const NB_COMMUNITY_ORDER = REGION_META.NB.communityOrder;
export const NL_COMMUNITY_ORDER = REGION_META.NL.communityOrder;
export const PE_COMMUNITY_ORDER = REGION_META.PE.communityOrder;

const COMMUNITY_ID_TO_REGION = new Map<string, CanadianRegion>();
for (const region of ALL_CANADIAN_REGIONS) {
  for (const id of REGION_META[region].communityOrder) {
    COMMUNITY_ID_TO_REGION.set(id, region);
  }
}

const POSTAL_REGION_CHECKS: { region: CanadianRegion; postal: RegExp }[] = ALL_CANADIAN_REGIONS.map(
  (region) => ({ region, postal: REGION_META[region].postal }),
);

const PROVINCE_CODE_IN_TEXT: Record<CanadianRegion, RegExp> = {
  ON: /,?\s*(ON|ONTARIO)\b/i,
  QC: /,?\s*(QC|QUEBEC|QUÉBEC)\b/i,
  AB: /,?\s*(AB|ALBERTA)\b/i,
  BC: /,?\s*(BC|BRITISH COLUMBIA)\b/i,
  MB: /,?\s*(MB|MANITOBA)\b/i,
  SK: /,?\s*(SK|SASKATCHEWAN)\b/i,
  NS: /,?\s*(NS|NOVA SCOTIA)\b/i,
  NB: /,?\s*(NB|NEW BRUNSWICK)\b/i,
  NL: /,?\s*(NL|NEWFOUNDLAND(?: AND LABRADOR)?|LABRADOR)\b/i,
  PE: /,?\s*(PE|PRINCE EDWARD ISLAND|P\.?\s*E\.?\s*I\.?)\b/i,
};

export function inferRegionFromText(text?: string | null): CanadianRegion | null {
  if (!text?.trim()) return null;
  const upper = text.toUpperCase();

  for (const { region, postal } of POSTAL_REGION_CHECKS) {
    if (postal.test(upper)) return region;
  }

  for (const region of ALL_CANADIAN_REGIONS) {
    if (PROVINCE_CODE_IN_TEXT[region].test(text)) return region;
  }

  for (const region of ALL_CANADIAN_REGIONS) {
    if (REGION_META[region].markers.test(text)) return region;
  }
  return null;
}

export function getCommunityRegion(community: Pick<Community, 'id' | 'region'>): CanadianRegion {
  const fromId = COMMUNITY_ID_TO_REGION.get(community.id);
  if (fromId) return fromId;
  if (community.region && isCanadianRegion(community.region)) return community.region;
  if (community.id === 'all') return 'ON';
  return 'ON';
}

export function resolveBusinessRegion(business: Business & { region?: CanadianRegion; province?: string }): CanadianRegion {
  const inferred = inferRegionFromText(
    [business.address, business.province].filter(Boolean).join(' '),
  );
  if (inferred) return inferred;
  if (business.region) return business.region;
  return 'ON';
}

export function resolveNotificationRegion(
  notification: Notification & { region?: CanadianRegion },
): CanadianRegion {
  const inferred = inferRegionFromText(
    [notification.location, notification.description].filter(Boolean).join(' '),
  );
  if (inferred) return inferred;
  if (notification.region) return notification.region;
  return 'ON';
}

export function resolveEventRegion(event: Event & { region?: CanadianRegion }): CanadianRegion {
  const inferred = inferRegionFromText(event.location);
  if (inferred) return inferred;
  if (event.region) return event.region;
  return 'ON';
}

export function resolvePlaceRegion(place: PlaceToVisit & { region?: CanadianRegion }): CanadianRegion {
  const inferred = inferRegionFromText(place.province || place.address);
  if (inferred) return inferred;
  if (place.region) return place.region;
  return 'ON';
}

export function resolveRegionForSave(
  addressOrLocation: string | undefined,
  selectedRegion: CanadianRegion,
): CanadianRegion {
  return inferRegionFromText(addressOrLocation) || selectedRegion;
}

export function filterCommunitiesByRegion(
  communities: Community[],
  region: CanadianRegion,
): Community[] {
  const order = REGION_META[region].communityOrder;
  if (order.length) {
    const byId = new Map(
      communities
        .filter((c) => c && c.id !== 'all' && getCommunityRegion(c) === region)
        .map((c) => [c.id, c] as const),
    );
    return order.map((id) => byId.get(id)).filter(Boolean) as Community[];
  }
  return communities.filter((c) => c && c.id !== 'all' && getCommunityRegion(c) === region);
}

export function filterBusinessesByRegion(
  businesses: Business[],
  region: CanadianRegion,
): Business[] {
  return businesses.filter((b) => b && resolveBusinessRegion(b) === region);
}

export function filterNotificationsByRegion(
  notifications: Notification[],
  region: CanadianRegion,
): Notification[] {
  return notifications.filter((n) => n && resolveNotificationRegion(n) === region);
}

export function filterEventsByRegion(
  events: Event[],
  region: CanadianRegion,
): Event[] {
  return events.filter((e) => e && resolveEventRegion(e) === region);
}

export function filterPlacesByRegion(
  places: PlaceToVisit[],
  region: CanadianRegion,
): PlaceToVisit[] {
  return places.filter((p) => p && resolvePlaceRegion(p) === region);
}

export function regionLabel(region: CanadianRegion, lang: 'en' | 'tr'): string {
  return REGION_META[region].label[lang];
}

export function regionButtonActiveClasses(region: CanadianRegion): string {
  return REGION_META[region].buttonActive;
}

export function regionProfileActiveClasses(region: CanadianRegion): string {
  return REGION_META[region].profileActive;
}

export function isCanadianRegion(value: unknown): value is CanadianRegion {
  return typeof value === 'string' && ALL_CANADIAN_REGIONS.includes(value as CanadianRegion);
}

export function persistRegionPreference(region: CanadianRegion) {
  try {
    localStorage.setItem('goofind-region', region);
  } catch {
    /* ignore */
  }
}

export function readStoredRegion(): CanadianRegion {
  try {
    const saved = localStorage.getItem('goofind-region');
    if (isCanadianRegion(saved)) return saved;
  } catch {
    /* ignore */
  }
  return 'ON';
}

export function markHomeRegionSetupComplete(userId: string, region?: CanadianRegion) {
  try {
    localStorage.setItem(`goofind-home-region-setup-${userId}`, '1');
    if (region) {
      localStorage.setItem(`goofind-home-region-${userId}`, region);
    }
  } catch {
    /* ignore */
  }
}

export function readStoredUserHomeRegion(userId: string): CanadianRegion | null {
  try {
    const saved = localStorage.getItem(`goofind-home-region-${userId}`);
    if (isCanadianRegion(saved)) return saved;
  } catch {
    /* ignore */
  }
  return null;
}

export function persistUserHomeRegion(userId: string, region: CanadianRegion) {
  markHomeRegionSetupComplete(userId, region);
}

export function isHomeRegionSetupComplete(userId: string): boolean {
  try {
    return localStorage.getItem(`goofind-home-region-setup-${userId}`) === '1';
  } catch {
    return false;
  }
}

export const HOME_REGION_CHANGE_COOLDOWN_MS = 60 * 24 * 60 * 60 * 1000;

export const COMMUNITY_SWITCH_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;

export function getHomeRegionChangeCooldownRemaining(changedAt?: number | null): number {
  if (!changedAt) return 0;
  return Math.max(0, HOME_REGION_CHANGE_COOLDOWN_MS - (Date.now() - changedAt));
}

export function getCommunitySwitchCooldownRemaining(joinedAt?: number | null): number {
  if (!joinedAt) return 0;
  return Math.max(0, COMMUNITY_SWITCH_COOLDOWN_MS - (Date.now() - joinedAt));
}

export function canChangeHomeRegion(changedAt?: number | null): boolean {
  return getHomeRegionChangeCooldownRemaining(changedAt) <= 0;
}

export function canSwitchCommunity(joinedAt?: number | null): boolean {
  return getCommunitySwitchCooldownRemaining(joinedAt) <= 0;
}

export function formatCooldownRemaining(remainingMs: number, lang: 'en' | 'tr'): string {
  const days = Math.max(1, Math.ceil(remainingMs / (24 * 60 * 60 * 1000)));
  if (days >= 30) {
    const months = Math.ceil(days / 30);
    if (lang === 'en') return months === 1 ? '1 month' : `${months} months`;
    return months === 1 ? '1 ay' : `${months} ay`;
  }
  if (lang === 'en') return days === 1 ? '1 day' : `${days} days`;
  return days === 1 ? '1 gün' : `${days} gün`;
}

/** @deprecated Use formatCooldownRemaining */
export function formatHomeRegionCooldownDays(remainingMs: number, lang: 'en' | 'tr'): string {
  return formatCooldownRemaining(remainingMs, lang);
}

export function resolveUserHomeRegion(
  userId?: string | null,
  homeRegion?: CanadianRegion | null,
): CanadianRegion | null {
  if (isCanadianRegion(homeRegion)) return homeRegion;
  if (userId) {
    const stored = readStoredUserHomeRegion(userId);
    if (stored) return stored;
  }
  return null;
}

export function isBrowsingOutsideHomeRegion(
  homeRegion: CanadianRegion | null | undefined,
  selectedRegion: CanadianRegion,
): boolean {
  return !!homeRegion && homeRegion !== selectedRegion;
}

export function canParticipateInRegion(
  homeRegion: CanadianRegion | null | undefined,
  targetRegion: CanadianRegion,
): boolean {
  if (!homeRegion) return true;
  return homeRegion === targetRegion;
}
