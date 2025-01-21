import { changeLanguage } from "i18next";
import { errorCode } from "@/utils/enum";

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

interface LoadingState {
  key: string;
  type?: "global" | "comp";
  loading: boolean;
}

export function setLoading({ key, type = "global", loading }: LoadingState) {
  if (key) {
    const data = getLoading();
    if (loading) {
      if (!data[type]) data[type] = {};
      data[type][key] = loading;
    } else {
      delete data[type][key];
    }
    const value = JSON.stringify(data);
    sessionStorage.setItem("loading", value);
    const event = new CustomEvent("storageChange", {
      detail: {
        key: "loading",
        value,
      },
    });
    window.dispatchEvent(event);
  }
}

export function getLoading(key?: string, type?: "global" | "comp") {
  const data = JSON.parse(sessionStorage.getItem("loading") || "{}");
  if (!type) return data;
  return (!key ? data[type] : data[type][key]) || {};
}

// 节点是否在主页面，不在则位于model，drawer等位置
export function checkEleInLayout(ele: Element) {
  const content = document.getElementById("contentLayout");
  return content && content.contains(ele);
}
