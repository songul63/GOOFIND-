import React, { useEffect, useState } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import type { MapPlace } from './NearbyMapView';
import { Business, Event, Notification } from '../types';

type NearbyMapLoaderProps = {
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

export function NearbyMapLoader(props: NearbyMapLoaderProps) {
  const [MapView, setMapView] = useState<React.ComponentType<NearbyMapLoaderProps> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setMapView(null);

    import('./NearbyMapView')
      .then((mod) => {
        if (!cancelled) setMapView(() => mod.NearbyMapView);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center min-h-[50vh]">
        <MapPin size={36} className="text-primary" />
        <p className="text-sm font-black text-slate-800 uppercase">
          {props.lang === 'en' ? 'Map could not load' : 'Harita yüklenemedi'}
        </p>
        <p className="text-xs font-semibold text-slate-500 max-w-sm">{error}</p>
        <button
          type="button"
          onClick={props.onClose}
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-black uppercase"
        >
          {props.lang === 'en' ? 'Close' : 'Kapat'}
        </button>
      </div>
    );
  }

  if (!MapView) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-primary font-black uppercase text-sm gap-2">
        <Loader2 className="animate-spin" size={20} />
        {props.lang === 'en' ? 'Loading map...' : 'Harita yükleniyor...'}
      </div>
    );
  }

  return <MapView {...props} />;
}
