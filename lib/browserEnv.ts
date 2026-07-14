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

export async function copyToClipboard(text: string): Promise<boolean> {
  const nav = getNavigator();
  try {
    if (nav?.clipboard?.writeText) {
      await nav.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    if (typeof document !== 'undefined') {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(el);
      return ok;
    }
  } catch {
    /* ignore */
  }
  return false;
}
