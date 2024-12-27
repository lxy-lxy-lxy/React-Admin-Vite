import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import externalGlobals from "rollup-plugin-external-globals";
import { resolve } from "path";
import "./config/env.js";

const isLocal = process.env.NODE_ENV === "local";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_NAME,
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
      "@layout": resolve(__dirname, "src", "layout"),
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
      open: isLocal, //build后，是否自动打开分析页面，默认false
      gzipSize: isLocal, //是否分析gzip大小
      brotliSize: isLocal, //是否分析brotli大小
      //filename: 'stats.html'//分析文件命名
    }),
  ],
  optimizeDeps: {
    include: ["nprogress", "lodash-es"],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
      define: {
        global: "globalThis",
      },
    },
  },
  build: {
    modulePreload: {
      resolveDependencies(_, deps) {
        return deps.filter((dep) => !dep.endsWith(".js"));
      },
    },
    rollupOptions: {
      external: ["react", "react-dom", "dayjs", "antd"],
      plugins: [
        externalGlobals({
          react: "React",
          "react-dom": "ReactDOM",
          dayjs: "dayjs",
          antd: "antd",
        }),
      ],
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("draft")) {
              return "draft";
            }
          }
        },
      },
    },
  },
});
