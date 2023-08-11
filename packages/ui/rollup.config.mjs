import { resolve } from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default [
    {
        input: [
            "src/global.css",
            "src/index.ts",
            "src/components/index.ts",
            "src/components/accordion/index.tsx",
            "src/components/card/index.tsx",
            "src/components/date-input/index.tsx",
            "src/components/date-time-input/index.tsx",
            "src/components/erc20-token-picker/index.tsx",
            "src/components/markdown-input/index.tsx",
            "src/components/multi-step-cards/index.tsx",
            "src/components/button.tsx",
            "src/components/checkbox.tsx",
            "src/components/chip.tsx",
            "src/components/erc20-token-logo.tsx",
            "src/components/error-feedback.tsx",
            "src/components/error-text.tsx",
            "src/components/loader.tsx",
            "src/components/markdown.tsx",
            "src/components/number-input.tsx",
            "src/components/popover.tsx",
            "src/components/radio-group.tsx",
            "src/components/radio.tsx",
            "src/components/remote-logo.tsx",
            "src/components/select.tsx",
            "src/components/skeleton.tsx",
            "src/components/stepper.tsx",
            "src/components/switch.tsx",
            "src/components/tags-input.tsx",
            "src/components/text-input.tsx",
            "src/components/timer.tsx",
            "src/components/typography.tsx",
        ],
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
                dir: resolve("./dist"),
                preserveModules: true,
                preserveModulesRoot: "src",
                format: "es",
                sourcemap: true,
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
