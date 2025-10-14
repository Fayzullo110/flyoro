import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { welcome: "Discover the Excitement Ahead" } },
  de: { translation: { welcome: "Entdecke das Abenteuer vor dir" } },
  uz: { translation: { welcome: "Oldinda sarguzashtni kashf eting" } },
  kz: { translation: { welcome: "Алдыңдағы қызықты ашыңыз" } },
  ru: { translation: { welcome: "Открой для себя приключения впереди" } },
  tr: { translation: { welcome: "Önündeki heyecanı keşfet" } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: typeof window !== 'undefined' ? (localStorage.getItem('lang') || 'en') : 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
