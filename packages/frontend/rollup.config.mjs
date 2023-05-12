import { resolve } from "path";
import { config } from "dotenv";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";

config();

const reactAppEnvs = Object.entries(process.env).reduce(
    (envs, [name, value]) => {
        if (name.startsWith("REACT_APP"))
            envs[`process.env.${name}`] = JSON.stringify(value);
        return envs;
    },
    {}
);

export default [
    {
        input: resolve("src/bootstrap.tsx"),
        preserveSymlinks: true,
        plugins: [
            replace({
                preventAssignment: true,
                values: {
                    __LIBRARY_MODE__: JSON.stringify(true),
                    __STAGING_MODE__: JSON.stringify(false),
                    ...reactAppEnvs,
                    "process.env.NODE_ENV": JSON.stringify(
                        process.env.NODE_ENV
                    ),
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
            json(),
            typescript(),
        ],
        output: {
            dir: resolve("dist"),
            format: "es",
        },
    },
];
