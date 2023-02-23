import { resolve } from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

export default [
    {
        input: resolve("./src/index.ts"),
        preserveSymlinks: true,
        plugins: [
            peerDepsExternal(),
            nodeResolve({ preferBuiltins: true }),
            commonjs(),
            typescript({ tsconfig: resolve("./tsconfig.build.json") }),
        ],
        output: [
            {
                file: resolve("./dist/index.js"),
                format: "es",
                sourcemap: true,
            },
        ],
    },
];
