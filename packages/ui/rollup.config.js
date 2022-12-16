import { resolve } from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default [
    {
        input: [resolve("src/index.ts"), resolve("./tailwind.config.js")],
        plugins: [
            peerDepsExternal(),
            nodeResolve(),
            commonjs(),
            postcss({
                plugins: [tailwindcss, autoprefixer],
                minimize: true,
                extract: resolve("dist/styles.css"),
            }),
            typescript(),
            terser(),
        ],
        output: [
            {
                dir: resolve("dist"),
                format: "es",
            },
        ],
    },
];
