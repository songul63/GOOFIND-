import fs from 'fs';
import path from 'path';
import type { Plugin, ViteDevServer } from 'vite';
import {
  buildLocateQuery,
  cacheDocId,
  fetchFromGeocoderCa,
  normalizeQuery,
  type GeocodeSuggestion,
} from './functions/src/geocode';
import { searchCanadianAddresses } from './functions/src/addressSearch';

type CacheFile = Record<
  string,
  GeocodeSuggestion & { cachedAt: number }
>;

const CACHE_PATH = path.resolve('.cache', 'geocode-dev-cache.json');
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 365;

function readDevCache(): CacheFile {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) as CacheFile;
  } catch {
    return {};
  }
}

function writeDevCache(cache: CacheFile) {
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache));
}

function getCachedSuggestion(cacheKey: string): GeocodeSuggestion | null {
  const cache = readDevCache();
  const entry = cache[cacheDocId(cacheKey)];
  if (!entry) return null;
  if (Date.now() - entry.cachedAt > CACHE_TTL_MS) return null;
  return {
    id: entry.id,
    label: entry.label,
    postal: entry.postal,
    lat: entry.lat,
    lng: entry.lng,
    source: 'geocoder.ca',
  };
}

function setCachedSuggestion(cacheKey: string, suggestion: GeocodeSuggestion) {
  const cache = readDevCache();
  cache[cacheDocId(cacheKey)] = {
    ...suggestion,
    cachedAt: Date.now(),
  };
  writeDevCache(cache);
}

async function handleGeocodeRequest(
  url: URL,
  authToken: string,
): Promise<{ status: number; body: unknown }> {
  const locate = (url.searchParams.get('locate') || '').trim();
  const lat = (url.searchParams.get('lat') || '').trim();
  const lng = (url.searchParams.get('lng') || '').trim();

  let cacheKey = '';
  let lookup = '';

  if (lat && lng) {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    if (!Number.isFinite(parsedLat) || !Number.isFinite(parsedLng)) {
      return { status: 400, body: { success: false, error: 'invalid_coords' } };
    }
    cacheKey = `coords:${parsedLat.toFixed(5)},${parsedLng.toFixed(5)}`;
    lookup = `${parsedLat},${parsedLng}`;
  } else if (locate.length >= 5) {
    cacheKey = `query:${normalizeQuery(locate)}`;
    lookup = buildLocateQuery(locate);
  } else {
    return { status: 400, body: { success: false, error: 'missing_query' } };
  }

  const cached = getCachedSuggestion(cacheKey);
  if (cached) {
    return { status: 200, body: { success: true, suggestion: cached, cached: true } };
  }

  const suggestion = await fetchFromGeocoderCa(lookup, authToken);
  if (!suggestion) {
    return { status: 404, body: { success: false, error: 'not_found' } };
  }

  setCachedSuggestion(cacheKey, suggestion);
  return { status: 200, body: { success: true, suggestion, cached: false } };
}

function attachMiddleware(server: ViteDevServer, authToken: string) {
  server.middlewares.use('/api/address-search', (req, res) => {
    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'method_not_allowed' }));
      return;
    }

    const url = new URL(req.url || '/', 'http://localhost');
    const q = (url.searchParams.get('q') || '').trim();
    const limitRaw = parseInt(url.searchParams.get('limit') || '8', 10);
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 12) : 8;

    if (q.length < 3) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'missing_query' }));
      return;
    }

    void searchCanadianAddresses(q, limit, authToken)
      .then((suggestions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, suggestions }));
      })
      .catch(() => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'server_error' }));
      });
  });

  server.middlewares.use('/api/geocode', (req, res) => {
    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'method_not_allowed' }));
      return;
    }

    const url = new URL(req.url || '/', 'http://localhost');
    void handleGeocodeRequest(url, authToken)
      .then(({ status, body }) => {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(body));
      })
      .catch(() => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'server_error' }));
      });
  });
}

export function geocodeDevPlugin(authToken: string): Plugin {
  return {
    name: 'goofind-geocode-dev',
    configureServer(server) {
      attachMiddleware(server, authToken);
    },
    configurePreviewServer(server) {
      attachMiddleware(server, authToken);
    },
  };
}
