export type GeocodeSuggestion = {
  id: string;
  label: string;
  postal?: string;
  lat: number;
  lng: number;
  source: 'geocoder.ca';
};

type GeocoderCaResponse = {
  success?: boolean;
  error?: { code?: string; message?: string };
  latt?: string;
  longt?: string;
  postal?: string;
  stnumber?: string;
  staddress?: string;
  city?: string;
  prov?: string;
  standard?: {
    stnumber?: string;
    staddress?: string;
    city?: string;
    prov?: string;
    confidence?: string;
  };
};

export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function cacheDocId(key: string): string {
  const safe = key.replace(/[^a-z0-9,_-]/gi, '_').slice(0, 80);
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return `g_${Math.abs(hash).toString(36)}_${safe}`;
}

function formatCanadianPostal(postal?: string): string | null {
  if (!postal) return null;
  const compact = postal.replace(/\s+/g, '').toUpperCase();
  if (!/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(compact)) return postal.trim();
  return `${compact.slice(0, 3)} ${compact.slice(3)}`;
}

function formatLabel(parts: {
  houseNumber?: string;
  street?: string;
  city?: string;
  province?: string;
  postal?: string;
}): string {
  const line: string[] = [];
  if (parts.houseNumber && parts.street) line.push(`${parts.houseNumber} ${parts.street}`);
  else if (parts.street) line.push(parts.street);
  if (parts.city) line.push(parts.city);
  const postal = formatCanadianPostal(parts.postal);
  if (parts.province && postal) line.push(`${parts.province} ${postal}`);
  else if (parts.province) line.push(parts.province);
  else if (postal) line.push(postal);
  return line.join(', ');
}

function buildSuggestion(data: GeocoderCaResponse): GeocodeSuggestion | null {
  const lat = data.latt ? parseFloat(data.latt) : NaN;
  const lng = data.longt ? parseFloat(data.longt) : NaN;
  const std = data.standard;
  if (!std || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (std.prov === 'MA' && std.city?.toLowerCase() === 'cambridge') return null;

  const confidence = std.confidence ? parseFloat(std.confidence) : 0;
  if (confidence < 0.35) return null;

  const postal = formatCanadianPostal(data.postal) ?? undefined;
  return {
    id: `gc-${std.stnumber || ''}-${std.staddress || ''}-${std.city || ''}-${data.postal || ''}`,
    label: formatLabel({
      houseNumber: std.stnumber,
      street: std.staddress,
      city: std.city,
      province: std.prov,
      postal,
    }),
    postal,
    lat,
    lng,
    source: 'geocoder.ca',
  };
}

export async function fetchFromGeocoderCa(
  locate: string,
  authToken: string,
): Promise<GeocodeSuggestion | null> {
  const params = new URLSearchParams({
    locate,
    json: '1',
    standard: '1',
  });
  if (authToken) params.set('auth', authToken);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`https://geocoder.ca/?${params}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as GeocoderCaResponse;
    if (data.error || data.success === false) return null;
    return buildSuggestion(data);
  } finally {
    clearTimeout(timeout);
  }
}

export function buildLocateQuery(query: string): string {
  const trimmed = query.trim();
  if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(trimmed)) return trimmed;
  return /ontario|\bon\b/i.test(trimmed) ? `${trimmed}, Canada` : `${trimmed}, ON, Canada`;
}
