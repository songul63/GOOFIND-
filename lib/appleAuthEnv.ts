import { getNavigator } from './browserEnv';

/** Must match Apple Developer → Services ID → Domains and Firebase authDomain. */
export const APPLE_AUTH_HOST = 'gen-lang-client-0422005049.firebaseapp.com';
export const APPLE_AUTH_ORIGIN = `https://${APPLE_AUTH_HOST}`;
export const LEGACY_WEB_APP_HOST = 'gen-lang-client-0422005049.web.app';
export const APPLE_AUTH_QUERY = 'appleAuth=1';

export function buildAppleAuthSafariUrl(): string {
  return `${APPLE_AUTH_ORIGIN}/?${APPLE_AUTH_QUERY}`;
}

export function isIosDevice(): boolean {
  const ua = getNavigator()?.userAgent || '';
  return /iPhone|iPad|iPod/i.test(ua);
}

export function isIosStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  if (!isIosDevice()) return false;
  const nav = getNavigator() as Navigator & { standalone?: boolean };
  return (
    nav?.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches
  );
}

export type AppleAuthIssue = 'standalone' | 'local-dev' | 'wrong-host';

export function getAppleAuthIssue(): AppleAuthIssue | null {
  if (typeof location === 'undefined') return null;

  const host = location.hostname;
  if (host === APPLE_AUTH_HOST || host === LEGACY_WEB_APP_HOST) {
    return isIosStandalone() ? 'standalone' : null;
  }

  if (host === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    return 'local-dev';
  }

  return 'wrong-host';
}

export function isAppleIncompleteSignupError(message: string): boolean {
  return /sign[- ]?up not completed/i.test(message);
}

export function appleAuthIssueMessage(issue: AppleAuthIssue, lang: 'en' | 'tr'): string {
  if (issue === 'standalone') {
    return lang === 'en'
      ? `Apple Sign-In does not work from a home-screen shortcut. Open Safari and go to ${APPLE_AUTH_ORIGIN}`
      : `Apple girişi ana ekran kısayolunda çalışmaz. Safari'de şu adresi açın: ${APPLE_AUTH_ORIGIN}`;
  }
  if (issue === 'local-dev') {
    return lang === 'en'
      ? `Apple Sign-In only works on the live site: ${APPLE_AUTH_ORIGIN}`
      : `Apple girişi yalnızca canlı sitede çalışır: ${APPLE_AUTH_ORIGIN}`;
  }
  return lang === 'en'
    ? `Open ${APPLE_AUTH_ORIGIN} in Safari for Apple Sign-In.`
    : `Apple girişi için Safari'de ${APPLE_AUTH_ORIGIN} adresini açın.`;
}

export function appleIncompleteSignupMessage(lang: 'en' | 'tr'): string {
  return lang === 'en'
    ? 'Apple rejected sign-in (config mismatch). In Apple Developer → Services ID ca.goofind.signin: domain must include gen-lang-client-0422005049.firebaseapp.com; Return URL must be https://gen-lang-client-0422005049.firebaseapp.com/__/auth/handler. In Firebase → Authentication → Apple: Services ID ca.goofind.signin, Team ID F87MJ6JG2M, Key ID 925DL7X37N, and the full .p8 key — then Save. Use Safari (not home-screen icon).'
    : 'Apple girişi reddetti (yapılandırma uyuşmuyor). Apple Developer → Services ID ca.goofind.signin: Domain olarak gen-lang-client-0422005049.firebaseapp.com; Return URL olarak https://gen-lang-client-0422005049.firebaseapp.com/__/auth/handler olmalı. Firebase → Authentication → Apple: Services ID ca.goofind.signin, Team ID F87MJ6JG2M, Key ID 925DL7X37N ve .p8 key — Save. Safari kullanın (ana ekran simgesi değil).';
}
