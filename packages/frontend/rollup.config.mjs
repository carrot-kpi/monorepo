import { resolve } from "path";
import { config } from "dotenv";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import { createRequire } from "module";
import esbuild from "rollup-plugin-esbuild";

const require = createRequire(import.meta.url);
const { getEnv } = require("./utils/env");

config();

export default [
    {
        input: resolve("src/library-mode-entrypoint.tsx"),
        preserveSymlinks: true,
        plugins: [
            replace({
                preventAssignment: true,
                values: {
                    __LIBRARY_MODE__: JSON.stringify(true),
                    __STAGING_MODE__: JSON.stringify(false),
                    __PROD__: JSON.stringify(false),
                    __INFURA_PROJECT_ID__: getEnv("INFURA_PROJECT_ID", true),
                    __WALLETCONNECT_PROJECT_ID__: JSON.stringify(""),
                    __FATHOM_SITE_ID__: JSON.stringify(""),
                    "process.env.NODE_ENV": JSON.stringify("production"),
                },
            }),
            peerDepsExternal(),
            nodeResolve({
                preferBuiltins: false,
                browser: true,
            }),
            commonjs(),
            esbuild({ target: "es2020", tsconfig: "./tsconfig.build.json" }),
            postcss({
                plugins: [tailwindcss, autoprefixer],
                extract: resolve("./dist/styles.css"),
            }),
            json(),
            image(),
        ],
        output: {
            dir: resolve("./dist"),
            format: "es",
        },
    },
];
