import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import {
  Building2,
  Calendar,
  MapPin,
  Megaphone,
  Navigation,
  Loader2,
  Search,
  X,
  Crosshair,
} from 'lucide-react';
import { Business, Event, Notification } from '../types';
import {
  formatDistance,
  fetchApproximateLocation,
  MapItemType,
  MapPoint,
  openMapDirections,
  resolveMapPoints,
  sortByDistance,
  TORONTO_CENTER,
} from './geo';
import { MapBrandMark } from './mapBrandMark';
import { getNavigator, hasGeolocation } from './browserEnv';

export type MapPlace = {
  id: string;
  name: string;
  province?: string;
  address?: string;
  img?: string;
  latitude?: number;
  longitude?: number;
  approved?: boolean;
};

type NearbyMapViewProps = {
  lang: 'en' | 'tr';
  businesses: Business[];
  events: Event[];
  places: MapPlace[];
  notifications: Notification[];
  onSelectBusiness: (biz: Business) => void;
  onSelectEvent: (evt: Event) => void;
  onSelectPlace: (place: MapPlace) => void;
  onSelectAnnouncement: (notif: Notification) => void;
  onClose: () => void;
};

const MARKER_COLORS: Record<MapItemType, string> = {
  business: '#059669',
  announcement: '#FF4500',
  event: '#E11D48',
  place: '#2563EB',
};

const MARKER_SOFT: Record<MapItemType, string> = {
  business: '#A7F3D0',
  announcement: '#FED7AA',
  event: '#FECDD3',
  place: '#BFDBFE',
};

const FILTER_KEYS = ['all', 'business', 'announcement', 'event', 'place'] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

type LocationStatus = 'idle' | 'loading' | 'active' | 'denied' | 'unavailable';

const RADIUS_OPTIONS_KM = [10, 25, 50] as const;

const FILTER_ACTIVE: Record<FilterKey, string> = {
  all: '#2563EB',
  business: '#059669',
  announcement: '#FF4500',
  event: '#E11D48',
  place: '#2563EB',
};

const FILTER_LABELS: Record<FilterKey, { en: string; tr: string }> = {
  all: { en: 'All', tr: 'Tümü' },
  business: { en: 'Co.', tr: 'Şirket' },
  announcement: { en: 'Ads', tr: 'Duyuru' },
  event: { en: 'Events', tr: 'Etkinlik' },
  place: { en: 'Places', tr: 'Yerler' },
};

const TYPE_LABELS: Record<MapItemType, { en: string; tr: string }> = {
  business: { en: 'Company', tr: 'Şirket' },
  announcement: { en: 'Announcement', tr: 'Duyuru' },
  event: { en: 'Event', tr: 'Etkinlik' },
  place: { en: 'Place', tr: 'Gezilecek Yer' },
};

const PIN_ICON_PATHS: Record<MapItemType, string> = {
  business:
    '<path d="M16 11h2v7h-2v-7zm-1-5h4l1 4h-6l1-4zm-1 4h8v1H14v-1z" fill="CURRENT" transform="translate(4,4) scale(0.9)"/>',
  announcement:
    '<path d="M14 8l8-3v14l-8-3V8zm0 0v5.5" stroke="CURRENT" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="11" cy="12" r="2.5" fill="CURRENT"/>',
  event:
    '<path d="M12 7v2m8 2v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8m12 0H8m12 0V9a2 2 0 00-2-2H10a2 2 0 00-2 2v2" stroke="CURRENT" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M10 14h4" stroke="CURRENT" stroke-width="1.8" stroke-linecap="round"/>',
  place:
    '<path d="M20 10.5c0 4.2-5 9.5-5 9.5S10 14.7 10 10.5a5 5 0 1110 0z" stroke="CURRENT" stroke-width="1.8" fill="none"/><circle cx="15" cy="10.5" r="1.8" fill="CURRENT"/>',
};

function createPinIcon(type: MapItemType, active = false): L.DivIcon {
  const color = MARKER_COLORS[type];
  const iconPath = PIN_ICON_PATHS[type].replace(/CURRENT/g, color);
  const scale = active ? 1.12 : 1;
  const html = `
    <div style="transform:translate(-50%,-100%) scale(${scale});transition:transform .18s ease;filter:drop-shadow(0 5px 10px ${color}66);">
      <svg width="42" height="50" viewBox="0 0 42 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 2C12.8 2 6 8.8 6 17c0 12.2 15 29 15 29s15-16.8 15-29C36 8.8 29.2 2 21 2z" fill="${color}" stroke="white" stroke-width="2.5"/>
        <circle cx="21" cy="17" r="10" fill="white"/>
        <g transform="translate(6,5)">${iconPath}</g>
      </svg>
    </div>`;
  return L.divIcon({
    className: 'goofind-map-pin',
    html,
    iconSize: [42, 50],
    iconAnchor: [21, 50],
  });
}

const USER_LOCATION_ICON = L.divIcon({
  className: 'goofind-user-pin',
  html: `
    <div style="position:relative;width:22px;height:22px;transform:translate(-50%,-50%);">
      <div style="position:absolute;inset:-12px;background:rgba(255,69,0,.22);border-radius:50%;animation:goofind-pulse 2.2s ease-out infinite;"></div>
      <div style="width:14px;height:14px;background:#2563EB;border:3px solid white;border-radius:50%;box-shadow:0 2px 10px rgba(37,99,235,.55);position:absolute;top:4px;left:4px;"></div>
    </div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function MapRecenter({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng], zoom, { animate: false });
  }, [center.lat, center.lng, zoom, map]);
  return null;
}

function MapFlyTo({ target, zoom }: { target: { lat: number; lng: number } | null; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], zoom, { duration: 0.65 });
  }, [target?.lat, target?.lng, zoom, map]);
  return null;
}

function DeferredMapContainer({
  center,
  zoom,
  children,
}: {
  center: { lat: number; lng: number };
  zoom: number;
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 50);
    return () => {
      window.clearTimeout(timer);
      setReady(false);
    };
  }, []);

  if (!ready) {
    return (
      <div
        className="flex items-center justify-center bg-[#E8F4F0]"
        style={{ height: '100%', width: '100%' }}
      >
        <Loader2 size={28} className="animate-spin text-slate-600" />
      </div>
    );
  }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom
      zoomControl={false}
      attributionControl={false}
    >
      {children}
    </MapContainer>
  );
}

class MapErrorBoundary extends React.Component<
  { lang: 'en' | 'tr'; onClose: () => void; children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-8 text-center min-h-[50vh]">
          <MapPin size={36} className="text-slate-800" />
          <p className="text-sm font-black text-slate-800">
            {this.props.lang === 'en' ? 'Map could not open' : 'Harita açılamadı'}
          </p>
          <p className="text-xs font-semibold text-slate-500 max-w-sm">{this.state.error.message}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => this.setState({ error: null })}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold"
            >
              {this.props.lang === 'en' ? 'Try again' : 'Tekrar dene'}
            </button>
            <button
              type="button"
              onClick={this.props.onClose}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold"
            >
              {this.props.lang === 'en' ? 'Close' : 'Kapat'}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function buildPoints(
  businesses: Business[],
  events: Event[],
  places: MapPlace[],
  notifications: Notification[],
): MapPoint[] {
  const bizPoints: MapPoint[] = businesses
    .filter((b) => b?.address?.trim())
    .map((b) => ({
      id: `biz-${b.id}`,
      type: 'business' as const,
      title: b.name,
      subtitle: b.category,
      addressQuery: b.address,
      lat: (b as Business & { latitude?: number }).latitude,
      lng: (b as Business & { longitude?: number }).longitude,
      imageUrl: b.imageUrl,
      raw: b,
    }));

  const eventPoints: MapPoint[] = events
    .filter((e) => e?.approved !== false && e?.location?.trim() && !e.location.toLowerCase().includes('online'))
    .map((e) => ({
      id: `evt-${e.id}`,
      type: 'event' as const,
      title: e.title,
      subtitle: e.date,
      addressQuery: e.location,
      lat: (e as Event & { latitude?: number }).latitude,
      lng: (e as Event & { longitude?: number }).longitude,
      imageUrl: e.imageUrl,
      raw: e,
    }));

  const placePoints: MapPoint[] = places
    .filter((p) => p?.approved !== false && (p.address || p.province))
    .map((p) => ({
      id: `plc-${p.id}`,
      type: 'place' as const,
      title: p.name,
      subtitle: p.province,
      addressQuery: p.address || p.province || p.name,
      lat: p.latitude,
      lng: p.longitude,
      imageUrl: p.img,
      raw: p,
    }));

  const notifPoints: MapPoint[] = notifications
    .filter((n) => n?.approved)
    .map((n) => {
      const loc =
        (n as Notification & { location?: string }).location ||
        [n.title, n.description].filter(Boolean).join(' ').slice(0, 120);
      return {
        id: `ntf-${n.id}`,
        type: 'announcement' as const,
        title: n.title,
        subtitle: n.category,
        addressQuery: loc,
        lat: (n as Notification & { latitude?: number }).latitude,
        lng: (n as Notification & { longitude?: number }).longitude,
        imageUrl: n.imageUrl,
        raw: n,
      };
    })
    .filter((p) => p.addressQuery.trim().length > 8);

  return [...bizPoints, ...eventPoints, ...placePoints, ...notifPoints];
}

export function NearbyMapView(props: NearbyMapViewProps) {
  return (
    <MapErrorBoundary lang={props.lang} onClose={props.onClose}>
      <NearbyMapViewInner {...props} />
    </MapErrorBoundary>
  );
}

function NearbyMapViewInner({
  lang,
  businesses,
  events,
  places,
  notifications,
  onSelectBusiness,
  onSelectEvent,
  onSelectPlace,
  onSelectAnnouncement,
  onClose,
}: NearbyMapViewProps) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [locationApproximate, setLocationApproximate] = useState(false);
  const [resolvedPoints, setResolvedPoints] = useState<MapPoint[]>([]);
  const [geocoding, setGeocoding] = useState(false);
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number } | null>(null);
  const [radiusKm, setRadiusKm] = useState<(typeof RADIUS_OPTIONS_KM)[number]>(25);

  const sourcePoints = useMemo(
    () => buildPoints(businesses, events, places, notifications),
    [businesses, events, places, notifications],
  );

  const sourcePointsKey = useMemo(
    () => sourcePoints.map((p) => `${p.id}|${p.addressQuery}`).join(';;'),
    [sourcePoints],
  );

  const geocodeRunKeyRef = useRef('');
  const autoLocationStartedRef = useRef(false);

  // Open with approximate area immediately — no browser GPS permission needed.
  useEffect(() => {
    if (autoLocationStartedRef.current) return;
    autoLocationStartedRef.current = true;

    let cancelled = false;
    setLocationStatus('loading');

    void fetchApproximateLocation().then((approx) => {
      if (cancelled) return;
      if (approx) {
        setUserLocation(approx);
        setLocationApproximate(true);
        setLocationStatus('active');
        setFlyTarget(approx);
      } else {
        setLocationStatus('idle');
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (sourcePoints.length === 0) {
      setResolvedPoints([]);
      setGeocoding(false);
      return;
    }

    if (geocodeRunKeyRef.current === sourcePointsKey) return;
    geocodeRunKeyRef.current = sourcePointsKey;

    const withCoords = sourcePoints.filter((p) => p.lat && p.lng);
    setResolvedPoints(withCoords);

    const pendingCount = sourcePoints.filter((p) => !p.lat || !p.lng).length;
    if (pendingCount === 0) {
      setGeocoding(false);
      return;
    }

    setGeocoding(withCoords.length === 0);

    let cancelled = false;
    const stopLoadingTimer = window.setTimeout(() => {
      if (!cancelled) setGeocoding(false);
    }, 22000);

    resolveMapPoints(sourcePoints, (resolved) => {
      if (cancelled) return;
      const mapped = resolved.filter((p) => p.lat && p.lng);
      setResolvedPoints(mapped);
      if (mapped.length > 0) setGeocoding(false);
    }, { maxGeocode: 28 })
      .then((pts) => {
        if (!cancelled) {
          setResolvedPoints(pts.filter((p) => p.lat && p.lng));
        }
      })
      .catch(() => {
        /* geocoding failed — keep coords we already have */
      })
      .finally(() => {
        if (!cancelled) setGeocoding(false);
        window.clearTimeout(stopLoadingTimer);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(stopLoadingTimer);
    };
  }, [sourcePoints, sourcePointsKey]);

  const requestLocation = useCallback(() => {
    const applyLocation = (loc: { lat: number; lng: number }, approximate: boolean) => {
      setUserLocation(loc);
      setLocationApproximate(approximate);
      setLocationStatus('active');
      setFlyTarget(loc);
    };

    const tryApproximate = async () => {
      const approx = await fetchApproximateLocation();
      if (approx) {
        applyLocation(approx, true);
      } else {
        setUserLocation(null);
        setLocationStatus('idle');
      }
    };

    setLocationStatus('loading');

    const geolocation = hasGeolocation() ? getNavigator()?.geolocation : null;
    if (!geolocation) {
      void tryApproximate();
      return;
    }

    const opts: PositionOptions = { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 };

    geolocation.getCurrentPosition(
      (pos) => {
        applyLocation(
          { lat: pos.coords.latitude, lng: pos.coords.longitude },
          false,
        );
      },
      () => {
        void tryApproximate();
      },
      opts,
    );
  }, []);

  useEffect(() => {
    const permissions = getNavigator()?.permissions;
    if (!permissions?.query) return;
    let permissionStatus: PermissionStatus | null = null;

    permissions
      .query({ name: 'geolocation' })
      .then((status) => {
        permissionStatus = status;
        status.onchange = () => {
          if (status.state === 'granted') {
            requestLocation();
          }
        };
      })
      .catch(() => {
        /* Permissions API not supported */
      });

    return () => {
      if (permissionStatus) permissionStatus.onchange = null;
    };
  }, [requestLocation]);

  const center = userLocation || TORONTO_CENTER;
  const zoom = userLocation ? 13 : 11;
  const hasLiveLocation = locationStatus === 'active' && userLocation != null;

  const filteredPoints = useMemo(() => {
    let pts = filter === 'all' ? resolvedPoints : resolvedPoints.filter((p) => p.type === filter);
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      pts = pts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.subtitle || '').toLowerCase().includes(q) ||
          p.addressQuery.toLowerCase().includes(q),
      );
    }
    const anchor = userLocation || TORONTO_CENTER;
    pts = sortByDistance(pts, anchor.lat, anchor.lng);
    if (hasLiveLocation) {
      pts = pts.filter((p) => (p.distanceKm ?? 0) <= radiusKm);
    }
    return pts;
  }, [resolvedPoints, filter, searchQuery, userLocation, hasLiveLocation, radiusKm]);

  const activeMarker = useMemo(
    () => filteredPoints.find((p) => p.id === activeMarkerId) ?? null,
    [filteredPoints, activeMarkerId],
  );

  const handleOpenItem = useCallback(
    (point: MapPoint) => {
      if (point.type === 'business') onSelectBusiness(point.raw as Business);
      else if (point.type === 'event') onSelectEvent(point.raw as Event);
      else if (point.type === 'place') onSelectPlace(point.raw as MapPlace);
      else onSelectAnnouncement(point.raw as Notification);
      setActiveMarkerId(null);
    },
    [onSelectBusiness, onSelectEvent, onSelectPlace, onSelectAnnouncement],
  );

  const handleMarkerClick = (point: MapPoint) => {
    setActiveMarkerId(point.id);
    if (point.lat && point.lng) setFlyTarget({ lat: point.lat, lng: point.lng });
  };

  const openDirections = (point: MapPoint) => {
    openMapDirections(point);
  };

  const TypeIcon =
    activeMarker?.type === 'business'
      ? Building2
      : activeMarker?.type === 'event'
        ? Calendar
        : activeMarker?.type === 'place'
          ? MapPin
          : Megaphone;

  const locationHint =
    locationStatus === 'loading'
      ? lang === 'en'
        ? 'Opening location...'
        : 'Konum açılıyor...'
      : lang === 'en'
        ? 'Nearby places'
        : 'Yakınındaki yerler';

  return (
    <div className="relative flex flex-col h-[100dvh] bg-white overflow-hidden">
      <style>{`
        @keyframes goofind-pulse {
          0% { transform: scale(0.85); opacity: 0.9; }
          70% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        .goofind-map-pin, .goofind-user-pin { background: transparent !important; border: none !important; }
        .leaflet-container { font-family: inherit; background: linear-gradient(160deg, #DBEAFE 0%, #D1FAE5 50%, #FFEDD5 100%); }
      `}</style>

      {/* Compact header */}
      <div className="shrink-0 px-3 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 z-20 border-b border-primary/15 bg-gradient-to-r from-primary/12 via-white to-accent/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <MapBrandMark size={36} />
            <div>
              <h2 className="text-lg font-black text-primary tracking-tight leading-none">
                {lang === 'en' ? 'Map' : 'Harita'}
              </h2>
              <p className="text-[10px] font-bold text-slate-500 mt-0.5">
                {hasLiveLocation
                  ? locationApproximate
                    ? lang === 'en'
                      ? 'Approximate area — closest first'
                      : 'Yaklaşık konum — en yakınlar önce'
                    : lang === 'en'
                      ? 'Closest places around you'
                      : 'Çevrenizdeki en yakın yerler'
                  : locationStatus === 'loading'
                    ? lang === 'en'
                      ? 'Finding your area...'
                      : 'Bölgeniz bulunuyor...'
                    : lang === 'en'
                      ? 'Tap Open for precise GPS'
                      : 'Tam konum için Aç\'a dokun'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center"
            aria-label={lang === 'en' ? 'Close' : 'Kapat'}
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="relative mb-2">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              hasLiveLocation
                ? lang === 'en'
                  ? 'Search near you...'
                  : 'Yakınımda ara...'
                : lang === 'en'
                  ? 'Search map...'
                  : 'Haritada ara...'
            }
            className="w-full h-9 pl-9 pr-3 rounded-full bg-white border border-primary/25 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/35 focus:border-primary/40 shadow-sm"
          />
        </div>

        {/* GPS upgrade — only when IP fallback could not open location */}
        {!hasLiveLocation && locationStatus !== 'loading' && (
          <div
            className={`mb-2 flex items-center gap-2 rounded-xl px-2.5 py-2 border ${
              locationStatus === 'loading'
                ? 'bg-primary/5 border-primary/15'
                : 'bg-white border-primary/20'
            }`}
          >
            {locationStatus === 'loading' ? (
              <Loader2 size={16} className="animate-spin text-primary shrink-0" />
            ) : (
              <Crosshair size={16} className="text-primary shrink-0" strokeWidth={2.25} />
            )}
            <p className="flex-1 min-w-0 text-[11px] font-bold text-slate-700 leading-tight truncate">
              {locationHint}
            </p>
            <button
              type="button"
              onClick={requestLocation}
              disabled={locationStatus === 'loading'}
              className="shrink-0 min-w-[52px] h-8 px-3 rounded-lg bg-primary text-white text-[11px] font-black uppercase tracking-wide shadow-md shadow-primary/25 active:scale-95 disabled:opacity-60 transition-transform"
            >
              {locationStatus === 'loading'
                ? lang === 'en'
                  ? '...'
                  : '...'
                : lang === 'en'
                  ? 'Open'
                  : 'Aç'}
            </button>
          </div>
        )}

        {hasLiveLocation && (
          <div className="flex gap-1 mb-2 overflow-x-auto no-scrollbar">
            {RADIUS_OPTIONS_KM.map((km) => (
              <button
                key={km}
                type="button"
                onClick={() => setRadiusKm(km)}
                className={`shrink-0 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wide border transition-all ${
                  radiusKm === km
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                {lang === 'en' ? `${km} km` : `${km} km`}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {FILTER_KEYS.map((key) => {
            const isActive = filter === key;
            const accent = FILTER_ACTIVE[key];
            const dotColor = key === 'all' ? '#2563EB' : MARKER_COLORS[key as MapItemType];
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all shrink-0 border ${
                  isActive ? 'text-white shadow-md' : 'bg-white text-slate-700 border-slate-200'
                }`}
                style={
                  isActive
                    ? { backgroundColor: accent, borderColor: accent }
                    : undefined
                }
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: isActive ? '#fff' : dotColor }}
                />
                {FILTER_LABELS[key][lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map + floating bottom panels */}
      <div className="relative flex-1 min-h-0">
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-primary/5 via-transparent to-accent/8" />
        <DeferredMapContainer center={center} zoom={zoom}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          />
          <MapRecenter center={center} zoom={zoom} />
          <MapFlyTo target={flyTarget} zoom={14} />
          {userLocation && locationStatus === 'active' && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={USER_LOCATION_ICON} />
          )}
          {filteredPoints.map((point) => (
            <Marker
              key={point.id}
              position={[point.lat!, point.lng!]}
              icon={createPinIcon(point.type, activeMarkerId === point.id)}
              eventHandlers={{ click: () => handleMarkerClick(point) }}
            />
          ))}
        </DeferredMapContainer>

        {geocoding && resolvedPoints.length === 0 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[500] inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 shadow-md border border-slate-100 text-[11px] font-bold text-slate-600">
            <Loader2 size={12} className="animate-spin" />
            {lang === 'en' ? 'Loading pins...' : 'Pinler yükleniyor...'}
          </div>
        )}

        <button
          type="button"
          onClick={requestLocation}
          className={`absolute right-3 z-[500] w-9 h-9 rounded-xl shadow-lg flex items-center justify-center active:scale-95 transition-all ${
            hasLiveLocation
              ? 'bg-emerald-500 text-white border border-emerald-400 shadow-emerald-500/30'
              : activeMarker
                ? 'bg-white border border-primary/30 text-primary'
                : 'bg-primary text-white border border-primary shadow-primary/30'
          } ${activeMarker ? 'bottom-3' : 'bottom-[200px]'}`}
          aria-label={lang === 'en' ? 'My location' : 'Konumum'}
          title={
            hasLiveLocation
              ? lang === 'en'
                ? 'Center on my location'
                : 'Konumuma odaklan'
              : locationApproximate
                ? lang === 'en'
                  ? 'Switch to precise GPS'
                  : 'Tam konuma geç'
                : lang === 'en'
                  ? 'Use my location'
                  : 'Konumumu kullan'
          }
        >
          <Crosshair size={17} strokeWidth={2.25} />
        </button>

        {!geocoding && filteredPoints.length === 0 && !activeMarker && (
          <div className="absolute inset-x-3 top-1/3 z-[500] text-center px-3 py-2 rounded-xl bg-white/90 shadow border border-slate-100">
            <p className="text-xs font-bold text-slate-600">
              {hasLiveLocation
                ? lang === 'en'
                  ? `Nothing within ${radiusKm} km — try a wider radius`
                  : `${radiusKm} km içinde sonuç yok — yarıçapı genişletin`
                : lang === 'en'
                  ? 'No map pins yet — enable location or wait for loading'
                  : 'Henüz pin yok — konumu açın veya yüklenmeyi bekleyin'}
            </p>
          </div>
        )}

        {/* Nearby list — floats over map, lifted from bottom edge */}
        {!activeMarker && (
          <div
            className="absolute inset-x-0 z-[600] px-2"
            style={{ bottom: 'max(72px, calc(env(safe-area-inset-bottom, 0px) + 56px))' }}
          >
            <div className="bg-white rounded-2xl border-2 border-primary/15 shadow-[0_-6px_28px_rgba(37,99,235,0.18)] pt-2 pb-1.5 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-emerald-500 mx-3 rounded-full mb-2" />
              <div className="px-2.5 pb-1 flex items-center justify-between">
                <p className="text-[11px] font-black text-primary uppercase tracking-wide">
                  {hasLiveLocation
                    ? lang === 'en'
                      ? 'Closest to you'
                      : 'Size en yakın'
                    : lang === 'en'
                      ? 'Nearby'
                      : 'Yakındakiler'}
                  {!geocoding && (
                    <span className="ml-1.5 text-slate-400 font-bold">({filteredPoints.length})</span>
                  )}
                </p>
                {geocoding && resolvedPoints.length === 0 && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500">
                    <Loader2 size={10} className="animate-spin" />
                    {lang === 'en' ? 'Loading...' : 'Yükleniyor...'}
                  </span>
                )}
              </div>
              <div className="overflow-x-auto no-scrollbar px-2 pb-1 flex gap-2">
                {filteredPoints.length === 0 && !geocoding ? (
                  <p className="text-[11px] font-semibold text-slate-400 py-2 px-1">
                    {lang === 'en' ? 'No items in this area yet' : 'Bu alanda henüz kayıt yok'}
                  </p>
                ) : (
                  filteredPoints.slice(0, 20).map((point, index) => {
                    const Icon =
                      point.type === 'business'
                        ? Building2
                        : point.type === 'event'
                          ? Calendar
                          : point.type === 'place'
                            ? MapPin
                            : Megaphone;
                    const isClosest = hasLiveLocation && index === 0;
                    return (
                      <button
                        key={point.id}
                        type="button"
                        onClick={() => handleMarkerClick(point)}
                        className={`shrink-0 w-[140px] p-2 rounded-xl border-2 text-left transition-all active:scale-[0.98] relative ${
                          activeMarkerId === point.id
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : isClosest
                              ? 'border-emerald-400 bg-emerald-50/80 hover:border-emerald-500'
                              : 'border-slate-100 bg-white hover:border-primary/25'
                        }`}
                      >
                        {isClosest && (
                          <span className="absolute -top-1.5 left-2 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-black uppercase tracking-wide shadow-sm">
                            {lang === 'en' ? 'Closest' : 'En yakın'}
                          </span>
                        )}
                        <div className="flex items-center gap-1.5 mb-1">
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: MARKER_SOFT[point.type],
                              color: MARKER_COLORS[point.type],
                            }}
                          >
                            <Icon size={12} strokeWidth={2.25} />
                          </div>
                          <span
                            className="text-[9px] font-bold uppercase truncate"
                            style={{ color: MARKER_COLORS[point.type] }}
                          >
                            {TYPE_LABELS[point.type][lang]}
                          </span>
                        </div>
                        <p className="text-[11px] font-black text-slate-900 leading-tight line-clamp-2">
                          {point.title}
                        </p>
                        {hasLiveLocation && point.distanceKm != null && (
                          <p className="text-[10px] font-bold text-slate-500 mt-0.5 inline-flex items-center gap-0.5">
                            <Navigation size={9} />
                            {formatDistance(point.distanceKm, lang)}
                          </p>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* Detail sheet when pin/list item selected */}
        {activeMarker && (
          <div
            className="absolute inset-x-0 z-[600] px-2"
            style={{ bottom: 'max(72px, calc(env(safe-area-inset-bottom, 0px) + 56px))' }}
          >
            <div className="bg-white rounded-2xl border-2 border-primary/15 shadow-[0_-6px_28px_rgba(37,99,235,0.18)] p-3.5 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-emerald-500 rounded-full mb-3" />

            <div className="flex gap-4">
              {activeMarker.imageUrl ? (
                <img
                  src={activeMarker.imageUrl}
                  alt=""
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 no-lightbox"
                />
              ) : (
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-lg font-black"
                  style={{
                    backgroundColor: MARKER_SOFT[activeMarker.type],
                    color: MARKER_COLORS[activeMarker.type],
                  }}
                >
                  {getInitials(activeMarker.title)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold mb-1.5"
                  style={{
                    backgroundColor: MARKER_SOFT[activeMarker.type],
                    color: MARKER_COLORS[activeMarker.type],
                  }}
                >
                  <TypeIcon size={12} />
                  {TYPE_LABELS[activeMarker.type][lang]}
                  {activeMarker.subtitle ? ` · ${activeMarker.subtitle}` : ''}
                </span>
                <h3 className="text-base font-black text-slate-900 leading-tight truncate">
                  {activeMarker.title}
                </h3>
                <p className="text-sm font-semibold text-slate-500 mt-1 inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-red-500 shrink-0" />
                  {activeMarker.distanceKm != null && hasLiveLocation
                    ? `${formatDistance(activeMarker.distanceKm, lang)} · ${activeMarker.addressQuery.split(',')[0]}`
                    : activeMarker.addressQuery.split(',')[0]}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveMarkerId(null)}
                className="shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex gap-3 mt-3">
              <button
                type="button"
                onClick={() => handleOpenItem(activeMarker)}
                className="flex-1 h-10 rounded-xl bg-primary/10 text-primary text-xs font-bold border border-primary/20"
              >
                {lang === 'en' ? 'View profile' : 'Profili Gör'}
              </button>
              <button
                type="button"
                onClick={() => openDirections(activeMarker)}
                className="flex-1 h-10 rounded-xl bg-accent text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Navigation size={14} />
                {lang === 'en' ? 'Directions' : 'Yol Tarifi'}
              </button>
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
