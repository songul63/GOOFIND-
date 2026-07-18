import { buildLocateQuery, fetchFromGeocoderCa, shouldUsePaidGeocoder, type GeocodeSuggestion } from './geocode';

export type AddressSuggestion = {
  id: string;
  label: string;
  postal?: string;
  lat: number;
  lng: number;
  source?: 'nominatim' | 'photon' | 'geocoder.ca' | 'canada-geo';
};

const PHOTON_URL = 'https://photon.komoot.io/api/';
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const CANADA_GEO_URL = 'https://geolocator.api.geo.ca/geolocation/en/locate';
const CANADA_PHOTON_BBOX = '-141,41,-52,83';
const NOMINATIM_UA = 'Goofind/1.0 (https://gen-lang-client-0422005049.web.app; contact@goofind.ca)';

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function dedupeSuggestions(items: AddressSuggestion[], limit: number): AddressSuggestion[] {
  const kept: AddressSuggestion[] = [];
  for (const item of items) {
    if (!item.label.trim()) continue;
    if (kept.some((existing) => existing.label.toLowerCase() === item.label.toLowerCase())) continue;
    const nearbyIndex = kept.findIndex(
      (existing) => haversineKm(existing.lat, existing.lng, item.lat, item.lng) < 0.04,
    );
    if (nearbyIndex >= 0) {
      if (item.source === 'geocoder.ca' && kept[nearbyIndex].source !== 'geocoder.ca') {
        kept[nearbyIndex] = item;
      }
      continue;
    }
    kept.push(item);
    if (kept.length >= limit) break;
  }
  return kept;
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchPhoton(query: string, limit: number): Promise<AddressSuggestion[]> {
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
    lang: 'en',
    bbox: CANADA_PHOTON_BBOX,
  });
  const data = await fetchJson<{
    features?: Array<{
      geometry?: { coordinates?: [number, number] };
      properties?: {
        osm_id?: number;
        housenumber?: string;
        street?: string;
        name?: string;
        city?: string;
        state?: string;
        countrycode?: string;
      };
    }>;
  }>(`${PHOTON_URL}?${params}`);
  if (!data?.features) return [];

  return data.features
    .filter((f) => f.properties?.countrycode === 'CA')
    .flatMap((feature) => {
      const coords = feature.geometry?.coordinates;
      if (!coords || coords.length < 2) return [];
      const lng = coords[0];
      const lat = coords[1];
      const p = feature.properties;
      if (!p || !Number.isFinite(lat) || !Number.isFinite(lng)) return [];
      const parts: string[] = [];
      if (p.housenumber && p.street) parts.push(`${p.housenumber} ${p.street}`);
      else if (p.street) parts.push(p.street);
      else if (p.name) parts.push(p.name);
      if (p.city) parts.push(p.city);
      if (p.state) parts.push(p.state);
      const label = parts.join(', ');
      if (!label) return [];
      return [{
        id: `ph-${p.osm_id ?? `${lat},${lng}`}`,
        label,
        lat,
        lng,
        source: 'photon' as const,
      }];
    });
}

async function fetchCanadaGeo(query: string, limit: number): Promise<AddressSuggestion[]> {
  const params = new URLSearchParams({ q: query });
  const data = await fetchJson<
    Array<{
      title?: string;
      geometry?: { coordinates?: [number, number] };
    }>
  >(`${CANADA_GEO_URL}?${params}`);
  if (!data) return [];

  return data
    .filter((item) => item.geometry?.coordinates && item.title?.trim())
    .slice(0, limit)
    .map((item, index) => {
      const [lng, lat] = item.geometry!.coordinates!;
      return {
        id: `cgc-${index}-${lat}-${lng}`,
        label: item.title!.trim(),
        lat,
        lng,
        source: 'canada-geo' as const,
      };
    });
}

async function fetchNominatim(query: string, limit: number): Promise<AddressSuggestion[]> {
  const params = new URLSearchParams({
    q: `${query}, Canada`,
    format: 'json',
    limit: String(limit),
    addressdetails: '1',
    countrycodes: 'ca',
  });
  const data = await fetchJson<
    Array<{
      place_id?: number;
      display_name?: string;
      lat?: string;
      lon?: string;
      address?: {
        house_number?: string;
        road?: string;
        city?: string;
        town?: string;
        state?: string;
      };
    }>
  >(`${NOMINATIM_URL}?${params}`, {
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en',
      'User-Agent': NOMINATIM_UA,
    },
  });
  if (!data) return [];

  return data.flatMap((item) => {
      const lat = item.lat ? parseFloat(item.lat) : NaN;
      const lng = item.lon ? parseFloat(item.lon) : NaN;
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return [];
      const addr = item.address;
      const parts: string[] = [];
      if (addr?.house_number && addr?.road) parts.push(`${addr.house_number} ${addr.road}`);
      else if (addr?.road) parts.push(addr.road);
      if (addr?.city || addr?.town) parts.push(addr.city || addr.town || '');
      if (addr?.state) parts.push(addr.state);
      const label = parts.filter(Boolean).join(', ') || item.display_name?.trim() || '';
      if (!label) return [];
      return [{
        id: `nom-${item.place_id ?? `${lat},${lng}`}`,
        label,
        lat,
        lng,
        source: 'nominatim' as const,
      }];
    });
}

function geocoderToSuggestion(item: GeocodeSuggestion): AddressSuggestion {
  return { ...item, source: 'geocoder.ca' };
}

export async function searchCanadianAddresses(
  query: string,
  limit = 8,
  authToken = '',
): Promise<AddressSuggestion[]> {
  const trimmed = query.trim();
  if (trimmed.length < 3) return [];

  const [canadaGeo, photon, nominatim, geocoder] = await Promise.all([
    fetchCanadaGeo(trimmed, 6),
    fetchPhoton(trimmed, 5),
    fetchNominatim(trimmed, 5),
    authToken && shouldUsePaidGeocoder(trimmed)
      ? fetchFromGeocoderCa(buildLocateQuery(trimmed), authToken).catch(() => null)
      : Promise.resolve(null),
  ]);

  const collected: AddressSuggestion[] = [
    ...(geocoder ? [geocoderToSuggestion(geocoder)] : []),
    ...canadaGeo,
    ...photon,
    ...nominatim,
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
}
