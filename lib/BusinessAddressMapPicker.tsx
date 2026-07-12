import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Crosshair, Loader2, MapPin } from 'lucide-react';
import {
  type AddressSuggestion,
  enrichCanadianAddress,
  reverseGeocode,
  searchAddressSuggestions,
  TORONTO_CENTER,
} from './geo';
import { getNavigator, hasGeolocation } from './browserEnv';

export type BusinessLocationValue = {
  address: string;
  latitude?: number;
  longitude?: number;
};

type BusinessAddressMapPickerProps = {
  lang: 'en' | 'tr';
  value: BusinessLocationValue;
  onChange: (next: BusinessLocationValue) => void;
};

const PIN_ICON = L.divIcon({
  className: 'goofind-address-pin',
  html: `<div style="transform:translate(-50%,-100%);filter:drop-shadow(0 4px 8px rgba(37,99,235,.45));">
    <svg width="34" height="42" viewBox="0 0 34 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 1C9.8 1 4 6.8 4 14c0 9.5 13 26 13 26s13-16.5 13-26C30 6.8 24.2 1 17 1z" fill="#2563EB" stroke="white" stroke-width="2"/>
      <circle cx="17" cy="14" r="5" fill="white"/>
    </svg>
  </div>`,
  iconSize: [34, 42],
  iconAnchor: [17, 42],
});

function MapRecenter({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng], zoom, { animate: true });
  }, [center.lat, center.lng, zoom, map]);
  return null;
}

function MapClickPicker({
  onPick,
}: {
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function BusinessAddressMapPicker({ lang, value, onChange }: BusinessAddressMapPickerProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [resolving, setResolving] = useState(false);
  const skipNextSearchRef = useRef(false);
  const searchRequestIdRef = useRef(0);

  const center = useMemo(() => {
    if (typeof value.latitude === 'number' && typeof value.longitude === 'number') {
      return { lat: value.latitude, lng: value.longitude };
    }
    return TORONTO_CENTER;
  }, [value.latitude, value.longitude]);

  const hasPin = typeof value.latitude === 'number' && typeof value.longitude === 'number';
  const zoom = hasPin ? 15 : 11;

  const labels = useMemo(
    () => ({
      hint:
        lang === 'en'
          ? 'Type your address and pick the best match from the list below.'
          : 'Adresinizi yazın, alttaki listeden size en uygun olanı seçin.',
      myLocation: lang === 'en' ? 'My location' : 'Konumum',
      placeholder: lang === 'en' ? 'Street, city, province...' : 'Sokak, şehir, il...',
      pinned: lang === 'en' ? 'Location selected' : 'Konum seçildi',
      searching: lang === 'en' ? 'Searching addresses...' : 'Adresler aranıyor...',
      noResults: lang === 'en' ? 'No similar addresses found' : 'Benzer adres bulunamadı',
    }),
    [lang],
  );

  useEffect(() => {
    const query = value.address.trim();
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    if (query.length < 3) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }

    const requestId = ++searchRequestIdRef.current;
    setLoadingSuggestions(true);

    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const results = await searchAddressSuggestions(query);
          if (searchRequestIdRef.current !== requestId) return;
          setSuggestions(results);
        } catch {
          if (searchRequestIdRef.current === requestId) {
            setSuggestions([]);
          }
        } finally {
          if (searchRequestIdRef.current === requestId) {
            setLoadingSuggestions(false);
          }
        }
      })();
    }, 450);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value.address]);

  const showSuggestionPanel = value.address.trim().length >= 3;

  const handleAddressChange = useCallback(
    (nextAddress: string) => {
      onChange({
        address: nextAddress,
        latitude: undefined,
        longitude: undefined,
      });
    },
    [onChange],
  );

  const handleSelectSuggestion = useCallback(
    async (suggestion: AddressSuggestion) => {
      skipNextSearchRef.current = true;
      setSuggestions([]);
      setResolving(true);
      try {
        const enriched = await enrichCanadianAddress(suggestion);
        onChange({
          address: enriched.label,
          latitude: enriched.lat,
          longitude: enriched.lng,
        });
      } finally {
        setResolving(false);
      }
    },
    [onChange],
  );

  const handleMapPick = useCallback(
    async (lat: number, lng: number) => {
      setResolving(true);
      try {
        const address = (await reverseGeocode(lat, lng)) || value.address;
        skipNextSearchRef.current = true;
        onChange({
          address: address || value.address,
          latitude: lat,
          longitude: lng,
        });
      } finally {
        setResolving(false);
      }
    },
    [onChange, value.address],
  );

  const handleMyLocation = useCallback(() => {
    const geolocation = hasGeolocation() ? getNavigator()?.geolocation : null;
    if (!geolocation) return;
    geolocation.getCurrentPosition(
      (pos) => {
        void handleMapPick(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        /* permission denied */
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [handleMapPick]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          required
          name="address"
          autoComplete="off"
          type="text"
          value={value.address}
          onChange={(e) => handleAddressChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 pr-14 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300"
          placeholder={labels.placeholder}
        />
        <button
          type="button"
          onClick={handleMyLocation}
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-primary/20 text-primary active:scale-[0.98] transition-all"
          title={labels.myLocation}
        >
          <Crosshair size={16} />
        </button>
      </div>

      {showSuggestionPanel && (
        <div className="rounded-2xl border border-primary/15 bg-white shadow-sm overflow-hidden">
          {loadingSuggestions ? (
            <div className="px-4 py-3 text-[12px] font-semibold text-slate-500 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-primary" />
              {labels.searching}
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="max-h-56 overflow-y-auto divide-y divide-slate-50">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  <button
                    type="button"
                    onClick={() => void handleSelectSuggestion(suggestion)}
                    className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-primary/5 active:bg-primary/10 transition-colors"
                  >
                    <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-[12px] font-semibold text-slate-700 leading-snug">
                      {suggestion.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-[12px] font-semibold text-slate-500">
              {labels.noResults}
            </div>
          )}
        </div>
      )}

      <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-sm">
        <div className="h-[180px] sm:h-[200px]">
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            <MapRecenter center={center} zoom={zoom} />
            <MapClickPicker onPick={(lat, lng) => void handleMapPick(lat, lng)} />
            {hasPin && (
              <Marker position={[value.latitude!, value.longitude!]} icon={PIN_ICON} />
            )}
          </MapContainer>
        </div>
        {resolving && (
          <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px] flex items-center justify-center">
            <Loader2 size={24} className="animate-spin text-primary" />
          </div>
        )}
      </div>

      <p className="text-[11px] font-semibold text-slate-500 flex items-start gap-2">
        <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
        <span>{hasPin ? labels.pinned : labels.hint}</span>
      </p>

      {hasPin && (
        <>
          <input type="hidden" name="latitude" value={String(value.latitude)} />
          <input type="hidden" name="longitude" value={String(value.longitude)} />
        </>
      )}
    </div>
  );
}
