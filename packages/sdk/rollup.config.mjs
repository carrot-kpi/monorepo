import { resolve } from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

export default [
    {
        input: [
            "src/index.ts",
            "src/commons.ts",
            "src/cacher.ts",
            "src/fetcher/index.ts",
            "src/utils/index.ts",
            "src/entities/amount.ts",
            "src/entities/currency.ts",
            "src/entities/kpi-token.ts",
            "src/entities/oracle.ts",
            "src/entities/template.ts",
            "src/entities/token.ts",
        ],
        plugins: [
            peerDepsExternal(),
            nodeResolve({ preferBuiltins: true }),
            commonjs(),
            typescript({
                tsconfig: resolve("./tsconfig.build.json"),
                useTsconfigDeclarationDir: true,
            }),
        ],
        output: [
            {
                dir: resolve("./dist/es"),
                preserveModules: true,
                preserveModulesRoot: "src",
                format: "es",
                sourcemap: true,
            },
            {
                dir: resolve("./dist/cjs"),
                preserveModules: true,
                preserveModulesRoot: "src",
                format: "cjs",
                sourcemap: true,
            },
        ],
    },
];
