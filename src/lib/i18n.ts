import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enTranslations, hiTranslations } from '@/lib/translations';
import { enBlogTranslations, hiBlogTranslations } from '@/lib/blog.translations';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        // This 'translation' key is the default. Everything must go inside it.
        translation: {
          ...enTranslations,       // <--- Spreads all your UI keys (header, footer, etc.)
          blogs: enBlogTranslations // <--- Adds the 'blogs' object *inside* translation
        }
      },
      hi: {
        // Do the same for Hindi
        translation: {
          ...hiTranslations,
          blogs: hiBlogTranslations
        }
      },
    },
    lng: 'en', // default language
    // ... (rest of your init config) ...
  });

export default i18n;