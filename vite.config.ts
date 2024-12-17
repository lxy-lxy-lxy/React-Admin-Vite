import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { resolve } from "path";
import "./config/env.js";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "local" ? "/" : "/React-Admin-Vite/",
  envDir: "env",
  define: {
    global: "window",
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       silenceDeprecations: ['legacy-js-api'],
  //       additionalData: `@use "src/styles/variables.scss" as *;`,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src", "assets"),
      "@config": resolve(__dirname, "config"),
      "@pages": resolve(__dirname, "src", "pages"),
      "@locales": resolve(__dirname, "src", "locales"),
      "@mock": resolve(__dirname, "src", "mock"),
      "@components": resolve(__dirname, "src", "components"),
      "@stores": resolve(__dirname, "src", "stores"),
      "@services": resolve(__dirname, "src", "services"),
      "@i18n": resolve(__dirname, "src", "i18n"),
      "@utils": resolve(__dirname, "src", "utils"),
    },
  },
  server: {
    hmr: true,
    host: true,
    port: 8000,
  },
  plugins: [
    react(),
    visualizer({
      open: true, //build后，是否自动打开分析页面，默认false
      gzipSize: false, //是否分析gzip大小
      brotliSize: true, //是否分析brotli大小
      //filename: 'stats.html'//分析文件命名
    }),
  ],
  build: {
    modulePreload: {
      resolveDependencies(_, deps) {
        return deps.filter((dep) => !dep.endsWith(".js"));
      },
    },
    rollupOptions: {
      external: ["react", "react-dom", "dayjs", "antd"],
      // plugins: [
      //   externalGlobals({
      //     react: "React",
      //     "react-dom": "ReactDOM",
      //     dayjs: "dayjs",
      //     antd: "antd",
      //   }),
      // ],
      output: {
        format: "es",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          dayjs: "dayjs",
          antd: "antd",
        },
      },
    },
  },
});
