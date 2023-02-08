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

export default [
    {
        input: [resolve("src/index.ts")],
        plugins: [
            peerDepsExternal(),
            nodeResolve({
                preferBuiltins: true,
                rootDir: resolve("../.."),
            }),
            commonjs(),
            postcss({
                plugins: [tailwindcss, autoprefixer],
                extract: resolve("dist/styles.css"),
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
            typescript({ tsconfig: resolve("./tsconfig.build.json") }),
        ],
        output: [
            {
                file: resolve("dist/index.js"),
                format: "es",
            },
        ],
    },
    {
        input: [resolve("./tailwind.preset.js")],
        plugins: [
            peerDepsExternal(),
            nodeResolve({ preferBuiltins: true, rootDir: resolve("../..") }),
            commonjs(),
        ],
        output: [
            {
                file: resolve("dist/tailwind.preset.js"),
                format: "es",
                exports: "auto",
            },
            {
                file: resolve("dist/tailwind.preset.cjs"),
                format: "cjs",
                exports: "auto",
            },
        ],
    },
];
