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
            typescript({ tsconfig: resolve("./tsconfig.dist.json") }),
        ],
        output: [
            {
                file: resolve("./dist/index.js"),
                format: "es",
                sourcemap: true,
            },
        ],
    },
    {
        input: resolve("./src/index.ts"),
        preserveSymlinks: true,
        plugins: [
            peerDepsExternal(),
            nodeResolve({ preferBuiltins: true }),
            commonjs(),
            typescript({ tsconfig: resolve("./tsconfig.lib.json") }),
        ],
        output: [
            {
                dir: resolve("./lib"),
                format: "es",
                preserveModules: true,
                preserveModulesRoot: resolve("./src"),
                sourcemap: true,
            },
        ],
    },
];
