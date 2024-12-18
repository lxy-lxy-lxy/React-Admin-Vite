import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocale } from "@utils/utils.ts";
import resources from "./resources.ts";

export const defaultNS = "translation";
export const fallbackLanguage = "cn";

const lng = getLocale();

global.t = i18n.t;

i18n.use(initReactI18next).init({
  lng,
  fallbackLng: fallbackLanguage,
  defaultNS,
  ns: [defaultNS],
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
