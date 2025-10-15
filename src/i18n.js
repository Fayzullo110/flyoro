import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import de from "./locales/de.json";
import ru from "./locales/ru.json";
import uz from "./locales/uz.json";
import kz from "./locales/kz.json";
import tr from "./locales/tr.json";

const resources = { en: { translation: en }, de: { translation: de }, ru: { translation: ru }, uz: { translation: uz }, kz: { translation: kz }, tr: { translation: tr } };

i18n.use(initReactI18next).init({
  resources,
  lng: typeof window !== 'undefined' ? (localStorage.getItem('lang') || 'en') : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
