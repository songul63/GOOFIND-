import React, { useState } from 'react';
import { Apple, Copy, ExternalLink, X } from 'lucide-react';
import { copyToClipboard } from './browserEnv';
import {
  APPLE_AUTH_ORIGIN,
  buildAppleAuthSafariUrl,
  isIosStandalone,
} from './appleAuthEnv';

type AppleStandaloneSignInProps = {
  lang: 'en' | 'tr';
  onAppleLogin: () => void;
  className?: string;
  compact?: boolean;
};

export function AppleStandaloneSignIn({
  lang,
  onAppleLogin,
  className = '',
  compact = false,
}: AppleStandaloneSignInProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const safariUrl = buildAppleAuthSafariUrl();
  const standalone = isIosStandalone();

  const openSafariHelp = () => setHelpOpen(true);

  const copySafariLink = async () => {
    const copied = await copyToClipboard(safariUrl);
    if (copied) {
      alert(
        lang === 'en'
          ? 'Link copied. Paste it in Safari address bar.'
          : 'Link kopyalandı. Safari adres çubuğuna yapıştırın.',
      );
    }
  };

  const tryOpenSafari = () => {
    window.open(safariUrl, '_blank', 'noopener,noreferrer');
    setHelpOpen(true);
  };

  const buttonClass = className || (
    compact
      ? 'w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl'
      : 'w-full bg-black text-white hover:bg-slate-900 py-3.5 rounded-2xl font-black uppercase tracking-[0.2em] text-[14px] shadow-sm transition-all active:scale-95 flex items-center justify-center gap-4 relative group'
  );

  if (!standalone) {
    return (
      <button type="button" onClick={onAppleLogin} className={buttonClass}>
        <Apple
          size={compact ? 22 : 22}
          className={compact ? 'text-white' : 'absolute left-6 text-white'}
        />
        {lang === 'en' ? 'Continue with Apple' : 'Apple ile giriş yap'}
      </button>
    );
  }

  return (
    <>
      <button type="button" onClick={openSafariHelp} className={buttonClass}>
        <Apple
          size={compact ? 22 : 22}
          className={compact ? 'text-white' : 'absolute left-6 text-white'}
        />
        {lang === 'en' ? 'Continue with Apple' : 'Apple ile giriş yap'}
      </button>

      {helpOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-100"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-primary">
                  {lang === 'en' ? 'Home screen app' : 'Ana ekran uygulaması'}
                </p>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {lang === 'en' ? 'Open in Safari for Apple Sign-In' : 'Apple girişi için Safari gerekli'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100"
                aria-label={lang === 'en' ? 'Close' : 'Kapat'}
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {lang === 'en'
                ? 'Apple Sign-In does not work inside the home-screen shortcut on iPhone. Use Safari once — after login you can return to the app icon.'
                : 'iPhone\'da ana ekrana eklenen kısayolda Apple girişi çalışmaz. Bir kez Safari\'de giriş yapın — sonra uygulama simgesine dönebilirsiniz.'}
            </p>

            <ol className="text-sm text-slate-700 space-y-2 mb-5 list-decimal list-inside">
              <li>{lang === 'en' ? 'Tap "Open in Safari" below' : 'Aşağıdan "Safari\'de aç"a basın'}</li>
              <li>{lang === 'en' ? 'Sign in with Apple in Safari' : 'Safari\'de Apple ile giriş yapın'}</li>
              <li>{lang === 'en' ? 'Return to the Goofind home-screen icon' : 'Goofind ana ekran simgesine dönün'}</li>
            </ol>

            <div className="flex flex-col gap-2">
              <a
                href={safariUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setHelpOpen(false)}
                className="w-full py-3.5 rounded-2xl bg-black text-white font-black uppercase tracking-wide text-xs flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} />
                {lang === 'en' ? 'Open in Safari' : 'Safari\'de aç'}
              </a>
              <button
                type="button"
                onClick={tryOpenSafari}
                className="w-full py-3 rounded-2xl bg-primary/10 text-primary border border-primary/25 font-black uppercase tracking-wide text-xs"
              >
                {lang === 'en' ? 'Try again in Safari' : 'Safari\'de tekrar dene'}
              </button>
              <button
                type="button"
                onClick={() => void copySafariLink()}
                className="w-full py-3 rounded-2xl bg-slate-50 text-slate-700 border border-slate-200 font-black uppercase tracking-wide text-xs flex items-center justify-center gap-2"
              >
                <Copy size={16} />
                {lang === 'en' ? 'Copy link' : 'Linki kopyala'}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 break-all">{APPLE_AUTH_ORIGIN}</p>
          </div>
        </div>
      )}
    </>
  );
}
