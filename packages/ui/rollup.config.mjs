import { resolve } from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import url from "@rollup/plugin-url";

export default [
    {
        input: [resolve("src/index.ts")],
        preserveSymlinks: true,
        plugins: [
            peerDepsExternal(),
            nodeResolve({ preferBuiltins: true }),
            commonjs(),
            postcss({
                plugins: [
                    tailwindcss({ config: resolve("src/tailwind.config.js") }),
                    autoprefixer,
                ],
                extract: resolve("dist/styles.css"),
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
        input: [resolve("./src/tailwind.preset.js")],
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
