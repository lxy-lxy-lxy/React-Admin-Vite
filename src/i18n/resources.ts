//  加载所有语言包
import { Resource } from "i18next";

const modules = import.meta.glob("@i18n/**/*.json", {
  eager: true,
}) as Record<string, { default: never }>;

const localeTransitions = Object.entries(modules).reduce((prev, current) => {
  const [path, module] = current;
  const lang = path.match(/\/i18n\/([\w-]+)\//);
  const filename = path.match(/\/([\w-_]+)\.json$/);

  if (filename && lang) {
    prev[lang[1]] = {
      ...(prev[lang[1]] || {}),
      [filename[1]]: module.default,
    };
  } else {
    console.error(`无法解析文件名称 path:${path}`);
  }

  return prev;
}, {} as Resource);

const resources = {
  ...localeTransitions,
} as object;

export default resources;
