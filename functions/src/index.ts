import { initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/https';
import { defineSecret } from 'firebase-functions/params';
import {
  buildLocateQuery,
  cacheDocId,
  fetchFromGeocoderCa,
  normalizeQuery,
  type GeocodeSuggestion,
} from './geocode';

initializeApp();

const geocoderAuth = defineSecret('GEOCODER_CA_AUTH');
const CACHE_COLLECTION = 'geocode_cache';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 365;

setGlobalOptions({ maxInstances: 10, region: 'us-central1' });

type CacheDoc = GeocodeSuggestion & {
  cacheKey: string;
  cachedAt: Timestamp;
  hits: number;
};

async function readCache(cacheKey: string): Promise<GeocodeSuggestion | null> {
  const db = getFirestore();
  const snap = await db.collection(CACHE_COLLECTION).doc(cacheDocId(cacheKey)).get();
  if (!snap.exists) return null;

  const data = snap.data() as CacheDoc;
  const ageMs = Date.now() - data.cachedAt.toMillis();
  if (ageMs > CACHE_TTL_MS) return null;

  await snap.ref.update({ hits: (data.hits || 0) + 1 }).catch(() => undefined);
  return {
    id: data.id,
    label: data.label,
    postal: data.postal,
    lat: data.lat,
    lng: data.lng,
    source: 'geocoder.ca',
  };
}

async function writeCache(cacheKey: string, suggestion: GeocodeSuggestion): Promise<void> {
  const db = getFirestore();
  const doc: CacheDoc = {
    ...suggestion,
    cacheKey,
    cachedAt: Timestamp.now(),
    hits: 1,
  };
  await db.collection(CACHE_COLLECTION).doc(cacheDocId(cacheKey)).set(doc, { merge: true });
}

export const geocodeCanadianAddress = onRequest(
  {
    secrets: [geocoderAuth],
    cors: true,
    maxInstances: 10,
  },
  async (req, res) => {
    if (req.method !== 'GET') {
      res.status(405).json({ success: false, error: 'method_not_allowed' });
      return;
    }

    const locate = typeof req.query.locate === 'string' ? req.query.locate.trim() : '';
    const lat = typeof req.query.lat === 'string' ? req.query.lat.trim() : '';
    const lng = typeof req.query.lng === 'string' ? req.query.lng.trim() : '';

    let cacheKey = '';
    let lookup = '';

    if (lat && lng) {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);
      if (!Number.isFinite(parsedLat) || !Number.isFinite(parsedLng)) {
        res.status(400).json({ success: false, error: 'invalid_coords' });
        return;
      }
      cacheKey = `coords:${parsedLat.toFixed(5)},${parsedLng.toFixed(5)}`;
      lookup = `${parsedLat},${parsedLng}`;
    } else if (locate.length >= 5) {
      cacheKey = `query:${normalizeQuery(locate)}`;
      lookup = buildLocateQuery(locate);
    } else {
      res.status(400).json({ success: false, error: 'missing_query' });
      return;
    }

    try {
      const cached = await readCache(cacheKey);
      if (cached) {
        res.set('Cache-Control', 'public, max-age=86400');
        res.json({ success: true, suggestion: cached, cached: true });
        return;
      }

      const authToken = geocoderAuth.value();
      const suggestion = await fetchFromGeocoderCa(lookup, authToken);
      if (!suggestion) {
        res.status(404).json({ success: false, error: 'not_found' });
        return;
      }

      await writeCache(cacheKey, suggestion);
      res.set('Cache-Control', 'public, max-age=86400');
      res.json({ success: true, suggestion, cached: false });
    } catch (error) {
      console.error('geocodeCanadianAddress failed', error);
      res.status(500).json({ success: false, error: 'server_error' });
    }
  },
);
