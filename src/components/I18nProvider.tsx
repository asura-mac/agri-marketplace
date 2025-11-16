"use client";
// import { useEffect } from 'react'; // <--- REMOVED
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  // The useEffect block has been completely removed.
  // i18n is already initialized in lib/i18n.ts when it's imported.

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
