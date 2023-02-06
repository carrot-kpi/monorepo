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
        plugins: [
            replace({
                preventAssignment: true,
                values: {
                    __PREVIEW_MODE__: JSON.stringify(true),
                },
            }),
            peerDepsExternal(),
            nodeResolve({ preferBuiltins: false, rootDir: resolve("../..") }),
            commonjs(),
            postcss({
                plugins: [tailwindcss, autoprefixer],
                extract: resolve("./dist/styles.css"),
            }),
            url(),
            svgr(),
            json(),
            typescript(),
        ],
        output: {
            dir: resolve("dist"),
            format: "es",
        },
    },
];
