/// <reference types="vite/client" />
import { TFunction } from "react-i18next";

declare const global: Window & { t: TFunction<"translation", undefined> };
