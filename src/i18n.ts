import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enJSON from "./locale/en.json";
import viJSON from "./locale/vi.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enJSON,
    },
    vi: {
      translation: viJSON,
    },
  },
  lng: "vi",
});

export default i18n;
