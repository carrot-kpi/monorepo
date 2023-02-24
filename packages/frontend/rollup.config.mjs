import { resolve } from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";

export default [
    {
        input: resolve("src/bootstrap.tsx"),
        preserveSymlinks: true,
        plugins: [
            replace({
                preventAssignment: true,
                values: {
                    __PREVIEW_MODE__: JSON.stringify(true),
                },
            }),
            peerDepsExternal(),
            commonjs(),
            nodeResolve({
                preferBuiltins: false,
                browser: true,
            }),
            postcss({
                plugins: [tailwindcss, autoprefixer],
                extract: resolve("./dist/styles.css"),
            }),
            url(),
            svgr({
                prettier: false,
                svgo: false,
                svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                ref: true,
            }),
            json(),
            typescript(),
        ],
        output: {
            dir: resolve("dist"),
            format: "es",
        },
    },
];
