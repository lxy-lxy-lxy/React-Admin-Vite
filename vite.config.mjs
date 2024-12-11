import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {visualizer} from "rollup-plugin-visualizer";
// @ts-ignore
import externalGlobals from "rollup-plugin-external-globals";
import {resolve} from "path";
import './config/env.js';

export default defineConfig({
    base: "/React-Admin-Vite/",
    envDir: "env",
    define: {
        global: 'window',
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ['legacy-js-api'],
                additionalData: `@use "src/styles/variables.scss" as *;`,
                javascriptEnabled: true
            },
        },
    },
    resolve: {
        alias: {
            "@assets": resolve(__dirname, "src", "assets"),
            "@config": resolve(__dirname, "config"),
            "@pages": resolve(__dirname, "src", "pages"),
            "@locales": resolve(__dirname, "src", "locales"),
            "@components": resolve(__dirname, "src", "components"),
            "@stores": resolve(__dirname, "src", "stores"),
            "@services": resolve(__dirname, "src", "services"),
            "@utils": resolve(__dirname, "src", "utils"),
        },
    },
    server: {
        hmr: true,
        host: true,
        port: 8000,
    },
    plugins: [
        react({
            babel: {
                plugins: ['@babel/plugin-transform-react-jsx'],
            },
        }),
        visualizer({
            open: true, //build后，是否自动打开分析页面，默认false
            gzipSize: false, //是否分析gzip大小
            brotliSize: true, //是否分析brotli大小
            //filename: 'stats.html'//分析文件命名
        }),
    ],
    esbuild: {
        loader: 'jsx',
        include: /.*\.jsx?$/,
        exclude: []
    },
    optimizeDeps: {
        include: [
            "nprogress",
            "lodash-es",
        ],
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
            define: {
                global: 'globalThis'
            }
        },
    },
    build: {
        modulePreload: {
            resolveDependencies(filename, deps) {
                return deps.filter(dep => !dep.endsWith('.js'))
            }
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
        }
    }
});
