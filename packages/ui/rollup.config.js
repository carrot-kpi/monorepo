import { resolve } from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
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
            nodeResolve(),
            commonjs(),
            postcss({
                plugins: [tailwindcss, autoprefixer],
                minimize: true,
                extract: resolve("dist/styles.css"),
            }),
            url(),
            svgr(),
            typescript(),
            terser(),
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
        plugins: [peerDepsExternal(), nodeResolve(), commonjs(), terser()],
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
