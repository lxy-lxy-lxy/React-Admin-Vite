import resources from "@i18n/resources.ts";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: (typeof resources)["cn"];
    defaultNS: "translation";
  }
}
