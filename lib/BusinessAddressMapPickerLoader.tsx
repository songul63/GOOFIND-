import React, { useEffect, useState } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import type { BusinessLocationValue } from './BusinessAddressMapPicker';

type BusinessAddressMapPickerLoaderProps = {
  lang: 'en' | 'tr';
  value: BusinessLocationValue;
  onChange: (next: BusinessLocationValue) => void;
};

export function BusinessAddressMapPickerLoader(props: BusinessAddressMapPickerLoaderProps) {
  const [Picker, setPicker] = useState<React.ComponentType<BusinessAddressMapPickerLoaderProps> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setPicker(null);

    import('./BusinessAddressMapPicker')
      .then((mod) => {
        if (!cancelled) setPicker(() => mod.BusinessAddressMapPicker);
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
      <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4 text-center space-y-2">
        <MapPin size={20} className="mx-auto text-rose-500" />
        <p className="text-[12px] font-black text-slate-700 uppercase">
          {props.lang === 'en' ? 'Map picker unavailable' : 'Harita seçici kullanılamıyor'}
        </p>
        <p className="text-[11px] font-semibold text-slate-500">{error}</p>
        <input
          required
          name="address"
          autoComplete="street-address"
          type="text"
          value={props.value.address}
          onChange={(e) =>
            props.onChange({
              address: e.target.value,
              latitude: undefined,
              longitude: undefined,
            })
          }
          className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none font-bold text-sm text-slate-900 focus:border-primary transition-all placeholder:text-slate-300"
          placeholder={props.lang === 'en' ? 'Street, city, province...' : 'Sokak, şehir, il...'}
        />
      </div>
    );
  }

  if (!Picker) {
    return (
      <div className="flex items-center justify-center gap-2 py-8 text-primary font-black uppercase text-[11px]">
        <Loader2 className="animate-spin" size={18} />
        {props.lang === 'en' ? 'Loading map...' : 'Harita yükleniyor...'}
      </div>
    );
  }

  return <Picker {...props} />;
}
