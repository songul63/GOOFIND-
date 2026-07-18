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

const POSTAL_RE = /\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b/i;

/** Paid geocoder.ca — only for postal codes or street addresses with a house number. */
export function shouldUsePaidGeocoder(query: string): boolean {
  const trimmed = query.trim();
  if (POSTAL_RE.test(trimmed)) return true;
  if (/^\d+\s+\S/.test(trimmed) && trimmed.length >= 8) return true;
  return false;
}

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

function coerceField(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || undefined;
  }
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return undefined;
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
  const houseNumber = coerceField(std.stnumber);
  const street = coerceField(std.staddress);
  const city = coerceField(std.city);
  const province = coerceField(std.prov);

  return {
    id: `gc-${houseNumber || ''}-${street || ''}-${city || ''}-${data.postal || ''}`,
    label: formatLabel({
      houseNumber,
      street,
      city,
      province,
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
  if (
    /,\s*(Canada|QC|ON|AB|BC|MB|SK|NS|NB|NL|PE|Quebec|Ontario|Alberta|British Columbia|Manitoba|Saskatchewan|Nova Scotia|New Brunswick|Newfoundland|Prince Edward Island)/i.test(
      trimmed,
    )
  ) {
    return /,\s*Canada\b/i.test(trimmed) ? trimmed : `${trimmed}, Canada`;
  }
  if (/quebec|\bqc\b|montr[eé]al|laval|gatineau|longueuil|sherbrooke|trois[- ]rivi/i.test(trimmed)) {
    return `${trimmed}, QC, Canada`;
  }
  if (/british columbia|\bbc\b|vancouver|victoria|surrey|burnaby|kelowna|richmond/i.test(trimmed)) {
    return `${trimmed}, BC, Canada`;
  }
  if (/alberta|\bab\b|calgary|edmonton|lethbridge|red deer|medicine hat|fort mcmurray/i.test(trimmed)) {
    return `${trimmed}, AB, Canada`;
  }
  if (/manitoba|\bmb\b|winnipeg|brandon|steinbach|thompson|portage la prairie|selkirk/i.test(trimmed)) {
    return `${trimmed}, MB, Canada`;
  }
  if (/saskatchewan|\bsk\b|saskatoon|regina|prince albert|moose jaw|swift current|yorkton/i.test(trimmed)) {
    return `${trimmed}, SK, Canada`;
  }
  if (/nova scotia|\bns\b|halifax|dartmouth|sydney|truro|new glasgow|bridgewater/i.test(trimmed)) {
    return `${trimmed}, NS, Canada`;
  }
  if (/new brunswick|\bnb\b|moncton|saint john|fredericton|dieppe|miramichi|edmundston/i.test(trimmed)) {
    return `${trimmed}, NB, Canada`;
  }
  if (/newfoundland|\bnl\b|labrador|st\.?\s*john'?s|mount pearl|corner brook|gander|goose bay/i.test(trimmed)) {
    return `${trimmed}, NL, Canada`;
  }
  if (/prince edward|\bpe\b|charlottetown|summerside|montague|kensington/i.test(trimmed)) {
    return `${trimmed}, PE, Canada`;
  }
  if (/ontario|\bon\b|toronto|ottawa|mississauga|brampton|hamilton/i.test(trimmed)) {
    return `${trimmed}, ON, Canada`;
  }
  return `${trimmed}, Canada`;
}
