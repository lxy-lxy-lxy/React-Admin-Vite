import { changeLanguage } from "i18next";
import { errorCode } from "@utils/enum";

/**
 * @returns string
 */
export function getLocale() {
  const defaultLang = "cn";
  let locale = localStorage.getItem("local") || defaultLang;
  if (!["en", "hk", "cn"].includes(locale)) locale = defaultLang;
  return locale;
}

/**
 *
 * @param {string} language
 */
export function setLocale(language = "cn") {
  // console.log(language)
  if (getLocale() !== language) {
    changeLanguage(language);
    localStorage.setItem("local", language);
  }
}

/**
 * 退出登录时清空localStorage
 */
export function logoutClearStorage() {
  const lang = localStorage.getItem("local") || "cn";
  const globalStore = localStorage.getItem("globalStore") || "{}";
  localStorage.clear();
  sessionStorage.clear();
  changeLanguage(lang);
  localStorage.setItem("local", lang);
  localStorage.setItem("globalStore", globalStore);
}

/**
 * 获取错误码对应的信息
 * @param {Number|String} ec
 */
export function getErrorStr(ec: number | string) {
  return global.t(errorCode[`${ec}`]);
}

export function isMobile() {
  return window.innerWidth < 500;
}
