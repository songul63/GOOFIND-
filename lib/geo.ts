export type MapItemType = 'business' | 'event' | 'place' | 'announcement';

export type MapPoint = {
  id: string;
  type: MapItemType;
  title: string;
  subtitle?: string;
  addressQuery: string;
  lat?: number;
  lng?: number;
  imageUrl?: string;
  distanceKm?: number;
  raw: unknown;
};

export const TORONTO_CENTER = { lat: 43.6532, lng: -79.3832 };

const GEO_CACHE_KEY = 'goofind_geo_cache_v2';
const GEOCODER_CACHE_KEY = 'goofind_geocoder_cache_v1';
const GEOCODE_API_URL = '/api/geocode';
const NOMINATIM_MIN_INTERVAL_MS = 1100;
const DEV_GEO_PROXY_PORTS = new Set(['3000', '4173']);
const CANADA_PHOTON_BBOX = '-141,41,-52,83';

type GeoEndpoints = {
  nominatimSearch: string;
  nominatimReverse: string;
  photon: string;
  canadaGeoLocate: string;
};

function geoUsesDevProxy(): boolean {
  if (typeof window === 'undefined') return false;
  const { hostname, port } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return DEV_GEO_PROXY_PORTS.has(port || '80');
  }
  return /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname) && DEV_GEO_PROXY_PORTS.has(port);
}

function getGeoEndpoints(): GeoEndpoints {
  if (geoUsesDevProxy()) {
    return {
      nominatimSearch: '/api/nominatim/search',
      nominatimReverse: '/api/nominatim/reverse',
      photon: '/api/photon/',
      canadaGeoLocate: '/api/canada-geo/locate',
    };
  }
  return {
    nominatimSearch: 'https://nominatim.openstreetmap.org/search',
    nominatimReverse: 'https://nominatim.openstreetmap.org/reverse',
    photon: 'https://photon.komoot.io/api/',
    canadaGeoLocate: 'https://geolocator.api.geo.ca/geolocation/en/locate',
  };
}

async function readJsonResponse<T>(res: Response): Promise<T | null> {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type GeoCache = Record<string, { lat: number; lng: number }>;
type GeocoderCache = Record<string, AddressSuggestion>;

let lastNominatimRequestAt = 0;

function readGeocoderCache(): GeocoderCache {
  try {
    return JSON.parse(localStorage.getItem(GEOCODER_CACHE_KEY) || '{}') as GeocoderCache;
  } catch {
    return {};
  }
}

function writeGeocoderCache(cache: GeocoderCache) {
  try {
    localStorage.setItem(GEOCODER_CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* ignore quota */
  }
}

function geocoderCacheKey(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, ' ');
}

function coordsCacheKey(lat: number, lng: number): string {
  return `${lat.toFixed(5)},${lng.toFixed(5)}`;
}

function readCache(): GeoCache {
  try {
    return JSON.parse(localStorage.getItem(GEO_CACHE_KEY) || '{}') as GeoCache;
  } catch {
    return {};
  }
}

function writeCache(cache: GeoCache) {
  try {
    localStorage.setItem(GEO_CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* ignore quota */
  }
}

async function waitForNominatimSlot() {
  const elapsed = Date.now() - lastNominatimRequestAt;
  if (elapsed < NOMINATIM_MIN_INTERVAL_MS) {
    await new Promise((r) => setTimeout(r, NOMINATIM_MIN_INTERVAL_MS - elapsed));
  }
  lastNominatimRequestAt = Date.now();
}

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(km: number, lang: 'en' | 'tr'): string {
  if (km < 1) {
    const m = Math.round(km * 1000);
    return lang === 'en' ? `${m} m` : `${m} m`;
  }
  return lang === 'en' ? `${km.toFixed(1)} km` : `${km.toFixed(1)} km`;
}

export type AddressSuggestion = {
  id: string;
  label: string;
  postal?: string;
  lat: number;
  lng: number;
  source?: 'nominatim' | 'photon' | 'geocoder.ca';
};

function formatCanadianPostal(postal?: string): string | null {
  if (!postal) return null;
  const compact = postal.replace(/\s+/g, '').toUpperCase();
  if (!/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(compact)) return postal.trim();
  return `${compact.slice(0, 3)} ${compact.slice(3)}`;
}

function formatCanadianAddressLabel(
  parts: {
    houseNumber?: string;
    street?: string;
    city?: string;
    province?: string;
    postal?: string;
  },
  options?: { includeCountry?: boolean },
): string {
  const line: string[] = [];
  if (parts.houseNumber && parts.street) line.push(`${parts.houseNumber} ${parts.street}`);
  else if (parts.street) line.push(parts.street);
  if (parts.city) line.push(parts.city);
  const postal = formatCanadianPostal(parts.postal);
  if (parts.province && postal) line.push(`${parts.province} ${postal}`);
  else if (parts.province) line.push(parts.province);
  else if (postal) line.push(postal);
  if (options?.includeCountry !== false) line.push('Canada');
  return line.join(', ');
}

function buildSuggestion(parts: {
  id: string;
  houseNumber?: string;
  street?: string;
  city?: string;
  province?: string;
  postal?: string;
  lat: number;
  lng: number;
  source?: AddressSuggestion['source'];
}, options?: { includePostal?: boolean; includeCountry?: boolean }): AddressSuggestion {
  const includePostal = options?.includePostal ?? false;
  const postal = includePostal ? (formatCanadianPostal(parts.postal) ?? undefined) : undefined;
  return {
    id: parts.id,
    postal,
    label: formatCanadianAddressLabel(
      {
        houseNumber: parts.houseNumber,
        street: parts.street,
        city: parts.city,
        province: parts.province,
        postal,
      },
      { includeCountry: options?.includeCountry ?? false },
    ),
    lat: parts.lat,
    lng: parts.lng,
    source: parts.source,
  };
}

export function extractCanadianPostal(text?: string): string | undefined {
  if (!text) return undefined;
  const match = text.toUpperCase().match(/\b([A-Z]\d[A-Z])\s?(\d[A-Z]\d)\b/);
  if (!match) return undefined;
  return `${match[1]} ${match[2]}`;
}

function shouldUsePaidGeocoder(query: string): boolean {
  if (extractCanadianPostal(query)) return true;
  const trimmed = query.trim();
  return /^\d+\s+\S/.test(trimmed) && trimmed.length >= 8;
}

export function mergeAddressWithPostal(address: string, postalCode?: string): string {
  const trimmed = address.trim();
  const postal = formatCanadianPostal(postalCode) ?? undefined;
  if (!postal) return trimmed;
  if (trimmed.toUpperCase().includes(postal.replace(/\s+/g, ''))) return trimmed;
  const withoutPostal = trimmed
    .replace(/,?\s*[A-Z]\d[A-Z]\s?\d[A-Z]\d,?\s*Canada$/i, '')
    .replace(/,\s*Canada$/i, '')
    .trim()
    .replace(/,\s*$/, '');
  return `${withoutPostal}, ${postal}, Canada`;
}

function dedupeSuggestions(items: AddressSuggestion[], limit: number): AddressSuggestion[] {
  const kept: AddressSuggestion[] = [];

  for (const item of items) {
    if (kept.some((existing) => existing.label.toLowerCase() === item.label.toLowerCase())) {
      continue;
    }

    const nearbyIndex = kept.findIndex(
      (existing) => haversineKm(existing.lat, existing.lng, item.lat, item.lng) < 0.04,
    );

    if (nearbyIndex >= 0) {
      const existing = kept[nearbyIndex];
      if (item.source === 'geocoder.ca' && existing.source === 'geocoder.ca' && item.postal) {
        kept.push(item);
        continue;
      }
      if (item.source === 'geocoder.ca' && existing.source !== 'geocoder.ca') {
        kept[nearbyIndex] = item;
      }
      continue;
    }

    kept.push(item);
    if (kept.length >= limit) break;
  }

  return kept;
}

type NominatimAddress = {
  house_number?: string;
  road?: string;
  city?: string;
  town?: string;
  state?: string;
  postcode?: string;
};

function labelFromNominatimItem(item: {
  display_name?: string;
  address?: NominatimAddress;
}): string | null {
  const addr = item.address;
  if (!addr) return item.display_name?.trim() || null;

  return formatCanadianAddressLabel({
    houseNumber: addr.house_number,
    street: addr.road,
    city: addr.city || addr.town,
    province: addr.state,
    postal: addr.postcode,
  });
}

async function fetchNominatimSuggestions(query: string, limit: number): Promise<AddressSuggestion[]> {
  try {
    await waitForNominatimSlot();

    const params = new URLSearchParams({
      q: query,
      format: 'json',
      limit: String(limit),
      addressdetails: '1',
      countrycodes: 'ca',
    });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${getGeoEndpoints().nominatimSearch}?${params}`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en',
      },
    });
    window.clearTimeout(timeout);
    if (!res.ok) return [];

    const data = await readJsonResponse<Array<{
      place_id?: number;
      display_name?: string;
      lat?: string;
      lon?: string;
      address?: NominatimAddress;
    }>>(res);
    if (!data) return [];

    return data
      .map((item) => {
        const lat = item.lat ? parseFloat(item.lat) : NaN;
        const lng = item.lon ? parseFloat(item.lon) : NaN;
        const label = labelFromNominatimItem(item);
        if (!label || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;
        return buildSuggestion({
          id: `nom-${item.place_id ?? `${lat},${lng}`}`,
          houseNumber: item.address?.house_number,
          street: item.address?.road,
          city: item.address?.city || item.address?.town,
          province: item.address?.state,
          lat,
          lng,
          source: 'nominatim',
        }, { includePostal: false });
      })
      .filter((item): item is AddressSuggestion => item !== null);
  } catch {
    return [];
  }
}

async function fetchPhotonSuggestions(query: string, limit: number): Promise<AddressSuggestion[]> {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: String(limit),
      lang: 'en',
      bbox: CANADA_PHOTON_BBOX,
    });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${getGeoEndpoints().photon}?${params}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    window.clearTimeout(timeout);
    if (!res.ok) return [];

    const data = await readJsonResponse<{
      features?: Array<{
        geometry?: { coordinates?: [number, number] };
        properties?: {
          osm_id?: number;
          housenumber?: string;
          street?: string;
          city?: string;
          state?: string;
          postcode?: string;
          countrycode?: string;
        };
      }>;
    }>(res);
    if (!data) return [];

    return (data.features || [])
      .filter((feature) => feature.properties?.countrycode === 'CA')
      .map((feature) => {
        const [lng, lat] = feature.geometry?.coordinates || [];
        const props = feature.properties;
        if (!props || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;

        return buildSuggestion({
          id: `ph-${props.osm_id ?? `${lat},${lng}`}`,
          houseNumber: props.housenumber,
          street: props.street,
          city: props.city,
          province: props.state,
          lat,
          lng,
          source: 'photon',
        }, { includePostal: false });
      })
      .filter((item): item is AddressSuggestion => item !== null);
  } catch {
    return [];
  }
}

async function fetchCanadaGeoSuggestions(query: string, limit = 6): Promise<AddressSuggestion[]> {
  try {
    const params = new URLSearchParams({ q: query });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${getGeoEndpoints().canadaGeoLocate}?${params}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    window.clearTimeout(timeout);
    if (!res.ok) return [];

    const data = await readJsonResponse<Array<{
      title?: string;
      qualifier?: string;
      type?: string;
      geometry?: { coordinates?: [number, number] };
    }>>(res);
    if (!data) return [];

    return data
      .filter(
        (item) =>
          item.geometry?.coordinates &&
          (item.type?.includes('Street') ||
            item.type?.includes('Intersection') ||
            item.qualifier === 'INTERPOLATED_POSITION' ||
            item.qualifier === 'INTERPOLATED_CENTROID'),
      )
      .slice(0, limit)
      .map((item, index) => {
        const [lng, lat] = item.geometry!.coordinates!;
        const title = (item.title || query).trim();
        return {
          id: `cgc-${index}-${lat}-${lng}`,
          label: title,
          lat,
          lng,
        };
      });
  } catch {
    return [];
  }
}

type GeocodeApiResponse = {
  success?: boolean;
  suggestion?: AddressSuggestion;
  cached?: boolean;
  error?: string;
};

async function fetchGeocodeApi(params: {
  locate?: string;
  lat?: number;
  lng?: number;
}): Promise<AddressSuggestion | null> {
  try {
    const search = new URLSearchParams();
    if (typeof params.lat === 'number' && typeof params.lng === 'number') {
      search.set('lat', String(params.lat));
      search.set('lng', String(params.lng));
    } else if (params.locate) {
      search.set('locate', params.locate);
    } else {
      return null;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`${GEOCODE_API_URL}?${search}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    window.clearTimeout(timeout);
    if (!res.ok) return null;

    const data = (await res.json()) as GeocodeApiResponse;
    if (!data.success || !data.suggestion) return null;
    return {
      ...data.suggestion,
      source: 'geocoder.ca',
    };
  } catch {
    return null;
  }
}

async function lookupCanadianAddress(query: string): Promise<AddressSuggestion | null> {
  const trimmed = query.trim();
  if (trimmed.length < 5) return null;

  const cache = readGeocoderCache();
  const cacheKey = geocoderCacheKey(trimmed);
  if (cache[cacheKey]?.source === 'geocoder.ca') return cache[cacheKey];

  const suggestion = await fetchGeocodeApi({ locate: trimmed });
  if (!suggestion) return cache[cacheKey] ?? null;

  cache[cacheKey] = suggestion;
  cache[coordsCacheKey(suggestion.lat, suggestion.lng)] = suggestion;
  writeGeocoderCache(cache);
  return suggestion;
}

async function lookupCanadianAddressByCoords(lat: number, lng: number): Promise<AddressSuggestion | null> {
  const cache = readGeocoderCache();
  const cacheKey = coordsCacheKey(lat, lng);
  if (cache[cacheKey]?.source === 'geocoder.ca') return cache[cacheKey];

  const suggestion = await fetchGeocodeApi({ lat, lng });
  if (!suggestion) return cache[cacheKey] ?? null;

  cache[cacheKey] = suggestion;
  writeGeocoderCache(cache);
  return suggestion;
}

export async function enrichCanadianAddress(
  suggestion: AddressSuggestion,
): Promise<AddressSuggestion> {
  const query = suggestion.label.replace(/, Canada$/i, '').trim();
  const byQuery = await lookupCanadianAddress(query);
  if (byQuery?.postal) return byQuery;

  const byCoords = await lookupCanadianAddressByCoords(suggestion.lat, suggestion.lng);
  if (byCoords?.postal) return byCoords;

  return suggestion;
}

export async function searchAddressSuggestions(
  query: string,
  limit = 8,
): Promise<AddressSuggestion[]> {
  const trimmed = query.trim();
  if (trimmed.length < 3) return [];

  try {
    const params = new URLSearchParams({ q: trimmed, limit: String(limit) });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    const res = await fetch(`/api/address-search?${params}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    window.clearTimeout(timeout);
    if (!res.ok) return [];

    const data = await readJsonResponse<{ suggestions?: AddressSuggestion[] }>(res);
    if (data?.suggestions?.length) return data.suggestions;

    // Fallback if function not deployed yet
    const [canadaGeoResults, photonResults, nominatimResults, geocoderResult] = await Promise.all([
      fetchCanadaGeoSuggestions(trimmed, 6),
      fetchPhotonSuggestions(trimmed, 4),
      fetchNominatimSuggestions(`${trimmed}, Canada`, 4),
      trimmed.length >= 5 && shouldUsePaidGeocoder(trimmed)
        ? fetchGeocodeApi({ locate: trimmed })
        : Promise.resolve(null),
    ]);

    const collected: AddressSuggestion[] = [
      ...(geocoderResult ? [geocoderResult] : []),
      ...canadaGeoResults,
      ...photonResults,
      ...nominatimResults,
    ];

    return dedupeSuggestions(collected, limit).sort((a, b) => {
      if (a.source === 'geocoder.ca' && b.source !== 'geocoder.ca') return -1;
      if (b.source === 'geocoder.ca' && a.source !== 'geocoder.ca') return 1;
      const aHasNumber = /^\d+/.test(a.label);
      const bHasNumber = /^\d+/.test(b.label);
      if (aHasNumber && !bHasNumber) return -1;
      if (bHasNumber && !aHasNumber) return 1;
      return 0;
    });
  } catch {
    return [];
  }
}

export async function geocodeAddress(
  query: string,
  options?: { allowPaidGeocoder?: boolean },
): Promise<{ lat: number; lng: number } | null> {
  const normalized = query.trim().toLowerCase();
  if (!normalized || normalized === 'online' || normalized.includes('zoom')) return null;

  const cache = readCache();
  if (cache[normalized]) return cache[normalized];

  if (options?.allowPaidGeocoder !== false && shouldUsePaidGeocoder(query)) {
    const verified = await lookupCanadianAddress(query);
    if (verified) {
      const coords = { lat: verified.lat, lng: verified.lng };
      cache[normalized] = coords;
      writeCache(cache);
      return coords;
    }
  }

  await waitForNominatimSlot();

  try {
    const params = new URLSearchParams({
      q: `${query}, Canada`,
      format: 'json',
      limit: '1',
      countrycodes: 'ca',
    });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${getGeoEndpoints().nominatimSearch}?${params}`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en',
      },
    });
    window.clearTimeout(timeout);
    if (!res.ok) return null;

    const data = await readJsonResponse<Array<{ lat?: string; lon?: string }>>(res);
    const item = data?.[0];
    if (item?.lat && item?.lon) {
      const coords = { lat: parseFloat(item.lat), lng: parseFloat(item.lon) };
      if (Number.isFinite(coords.lat) && Number.isFinite(coords.lng)) {
        cache[normalized] = coords;
        writeCache(cache);
        return coords;
      }
    }
  } catch {
    /* geocode failed */
  }
  return null;
}

export async function reverseGeocode(
  lat: number,
  lng: number,
  options?: { allowPaidGeocoder?: boolean },
): Promise<string | null> {
  await waitForNominatimSlot();

  try {
    const params = new URLSearchParams({
      format: 'json',
      lat: String(lat),
      lon: String(lng),
      zoom: '18',
      addressdetails: '1',
    });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${getGeoEndpoints().nominatimReverse}?${params}`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en',
      },
    });
    window.clearTimeout(timeout);
    if (res.ok) {
      const data = await readJsonResponse<{ display_name?: string }>(res);
      const nominatimLabel = data?.display_name?.trim();
      if (nominatimLabel) return nominatimLabel;
    }
  } catch {
    /* try paid geocoder fallback below */
  }

  if (options?.allowPaidGeocoder !== false) {
    const verified = await lookupCanadianAddressByCoords(lat, lng);
    if (verified?.label) return verified.label;
  }

  return null;
}

const GEOCODE_TYPE_PRIORITY: Record<MapItemType, number> = {
  business: 0,
  place: 1,
  event: 2,
  announcement: 3,
};

export async function resolveMapPoints(
  points: MapPoint[],
  onUpdate?: (resolved: MapPoint[]) => void,
  options?: { maxGeocode?: number },
): Promise<MapPoint[]> {
  const maxGeocode = options?.maxGeocode ?? 28;
  const result: MapPoint[] = points.filter((p) => p.lat && p.lng);
  onUpdate?.([...result]);

  const toGeocode = points
    .filter((p) => !p.lat || !p.lng)
    .sort((a, b) => GEOCODE_TYPE_PRIORITY[a.type] - GEOCODE_TYPE_PRIORITY[b.type])
    .slice(0, maxGeocode);

  for (const point of toGeocode) {
    try {
      const coords = await geocodeAddress(point.addressQuery, { allowPaidGeocoder: false });
      if (coords) {
        result.push({ ...point, lat: coords.lat, lng: coords.lng });
        onUpdate?.([...result]);
      }
    } catch {
      /* skip failed geocode */
    }
  }

  return result;
}

export function sortByDistance(
  points: MapPoint[],
  userLat: number,
  userLng: number,
): MapPoint[] {
  return [...points]
    .map((p) =>
      p.lat && p.lng
        ? { ...p, distanceKm: haversineKm(userLat, userLng, p.lat, p.lng) }
        : p,
    )
    .sort((a, b) => (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999));
}

type DirectionsTargets = {
  native: string | null;
  web: string;
};

function buildDirectionsTargets(point: MapPoint): DirectionsTargets {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  const web =
    point.lat && point.lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}&travelmode=driving`
      : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(point.addressQuery)}&travelmode=driving`;

  const destination =
    point.lat && point.lng
      ? `${point.lat},${point.lng}`
      : encodeURIComponent(point.addressQuery);

  if (isIOS) {
    return {
      native: `comgooglemaps://?daddr=${destination}&directionsmode=driving`,
      web,
    };
  }

  if (isAndroid) {
    return {
      native: `google.navigation:q=${destination}`,
      web,
    };
  }

  return { native: null, web };
}

/** @deprecated Use openMapDirections instead. */
export function openStreetMapDirectionsUrl(point: MapPoint): string {
  return buildDirectionsTargets(point).web;
}

/** Open Google Maps directions on mobile; fall back to web if the app is unavailable. */
export function openMapDirections(point: MapPoint): void {
  const { native, web } = buildDirectionsTargets(point);
  const isMobile =
    typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile && native) {
    window.location.href = native;

    const fallbackTimer = window.setTimeout(() => {
      if (!document.hidden) {
        window.location.assign(web);
      }
    }, 1200);

    const cancelFallback = () => window.clearTimeout(fallbackTimer);
    document.addEventListener('visibilitychange', cancelFallback, { once: true });
    window.addEventListener('pagehide', cancelFallback, { once: true });
    return;
  }

  if (isMobile) {
    window.location.assign(web);
    return;
  }

  window.open(web, '_blank', 'noopener,noreferrer');
}

/** Open Google Maps to view a place by coordinates or address. */
export function openGoogleMapsPlace(options: {
  address: string;
  lat?: number;
  lng?: number;
}): void {
  const query =
    typeof options.lat === 'number' && typeof options.lng === 'number'
      ? `${options.lat},${options.lng}`
      : options.address.trim();
  if (!query) return;
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** City-level fallback when GPS permission is blocked (e.g. HTTP preview). */
export async function fetchApproximateLocation(): Promise<{ lat: number; lng: number } | null> {
  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6000);
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    window.clearTimeout(timeout);
    if (!res.ok) return null;
    const data = (await res.json()) as { latitude?: number; longitude?: number };
    if (typeof data.latitude === 'number' && typeof data.longitude === 'number') {
      return { lat: data.latitude, lng: data.longitude };
    }
  } catch {
    /* network or blocked */
  }
  return null;
}
