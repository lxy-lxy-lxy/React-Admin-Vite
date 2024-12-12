import dotenv from "dotenv";
import minimist from "minimist";

const { mode } = minimist(process.argv.slice(2));

/* 根据打包配置设置环境变量，先设置的优先级最高 */
/* 优先级： .env.local > .env.mode > .env */
dotenv.config({ path: process.cwd() + "/env/" + ".env.local" });
dotenv.config({ path: process.cwd() + "/env/" + ".env." + mode });
dotenv.config({ path: process.cwd() + "/env/" + ".env" });

process.env.NODE_ENV = process.env.VITE_NODE_ENV;
