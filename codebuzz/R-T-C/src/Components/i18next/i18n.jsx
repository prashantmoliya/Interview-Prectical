import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

const resources= {
    en: {
        translation: {
            welcome: "Hello, welcome to the React App",
        }
    },
    fr: {
        translation: {
            welcome: "Bonjour, bienvenue dans l'application React",
        }
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // default language
        fallbackLng: "en", // fallback language if key is not found
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;

// Prashant Moliya
// 111386
// 2202020111386