import { dirname, join } from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
    {
        input: join(__dirname, "./src/index.ts"),
        plugins: [
            peerDepsExternal(),
            json(),
            nodeResolve(),
            commonjs(),
            typescript(),
        ],
        output: [
            {
                file: join(__dirname, `./dist/index.js`),
                format: "es",
                sourcemap: true,
            },
        ],
    },
];
