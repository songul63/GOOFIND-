import React from 'react';
import { NearbyMapView } from './NearbyMapView';
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

/** Eager load — avoids stale lazy-chunk MIME errors on mobile after deploys. */
export function NearbyMapLoader(props: NearbyMapLoaderProps) {
  return <NearbyMapView {...props} />;
}
