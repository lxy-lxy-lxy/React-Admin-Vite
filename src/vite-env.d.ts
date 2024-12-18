/// <reference types="vite/client" />
/// <reference types="react-i18next" />
interface globalInterface {
  t: (str: string, msg?: object) => string;
}

declare const global = {
  t,
} as globalInterface;
