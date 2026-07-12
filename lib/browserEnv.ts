export function getNavigator(): Navigator | null {
  return typeof navigator !== 'undefined' ? navigator : null;
}

export function getUserAgent(): string {
  return getNavigator()?.userAgent || '';
}

export function getPlatform(): string {
  return getNavigator()?.platform || '';
}

export function getMediaDevices(): MediaDevices | null {
  return getNavigator()?.mediaDevices ?? null;
}

export function hasGeolocation(): boolean {
  return !!getNavigator()?.geolocation;
}
