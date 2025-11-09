import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enTranslations, hiTranslations } from '@/lib/translations';
// import { Contact } from 'lucide-react';
// import { updateListing } from './listings-utils';

// English translations


// Hindi translations


// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations, // Use the imported object
      },
      hi: {
        translation: hiTranslations, // Use the imported object
      },
    },
    lng: 'en', // default language
    // ... (rest of your init config) ...
  });


  export default i18n;


