//  加载所有语言包
const modules = import.meta.glob("@i18n/**/*.json", {
  eager: true,
}) as Record<string, { default: never }>;

export const localeTransitions = Object.entries(modules).reduce(
  (prev, current) => {
    const [path, module] = current;
    const filename = path.match(/\/([\w-_]+)\.json$/);

    if (filename) {
      prev[filename[1]] = module.default || {};
    } else {
      console.error(`无法解析文件名称 path:${path}`);
    }

    return prev;
  },
  {} as Record<string, never>,
);
