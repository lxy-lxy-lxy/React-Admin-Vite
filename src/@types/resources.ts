// import { localeTransitions } from "@utils/loadLangsToResouerce.ts";
import en from "@i18n/en/en.json";
import hk from "@i18n/hk/hk.json";

const resources = {
  en: {
    translation: en,
  },
  hk: {
    translation: hk,
  },
  cn: {},
} as const;

export default resources;
