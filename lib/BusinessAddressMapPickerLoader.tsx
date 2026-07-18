import React from 'react';
import { BusinessAddressMapPicker } from './BusinessAddressMapPicker';
import type { BusinessLocationValue } from './BusinessAddressMapPicker';

type BusinessAddressMapPickerLoaderProps = {
  lang: 'en' | 'tr';
  value: BusinessLocationValue;
  onChange: (next: BusinessLocationValue) => void;
};

/** Eager load — avoids stale lazy-chunk MIME errors on mobile after deploys. */
export function BusinessAddressMapPickerLoader(props: BusinessAddressMapPickerLoaderProps) {
  return <BusinessAddressMapPicker {...props} />;
}
