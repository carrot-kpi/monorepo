import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { resolve } from "path";

export default [
    {
        input: [
            "src/tailwind-preset.js",
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
            "src/components/feedback-box.tsx",
        ],
        plugins: [
            peerDepsExternal(),
            nodeResolve({ preferBuiltins: true }),
            commonjs(),
            postcss({
                plugins: [
                    tailwindcss({ config: resolve("src/tailwind-config.js") }),
                    autoprefixer,
                ],
                extract: resolve("dist/styles.css"),
            }),
            esbuild({
                target: "es2020",
                tsconfig: resolve("./tsconfig.build.json"),
            }),
        ],
        output: [
            {
                dir: resolve("./dist/es"),
                preserveModules: true,
                preserveModulesRoot: "src",
                format: "es",
                sourcemap: true,
                entryFileNames: "[name].mjs",
            },
            {
                dir: resolve("./dist/cjs"),
                preserveModules: true,
                preserveModulesRoot: "src",
                format: "cjs",
                sourcemap: true,
                entryFileNames: "[name].cjs",
            },
        ],
    },
    {
        input: resolve("./src/global.css"),
        plugins: [
            postcss({
                plugins: [
                    tailwindcss({ config: "src/tailwind-config.js" }),
                    autoprefixer,
                ],
                extract: "styles.css",
            }),
        ],
        output: [
            {
                dir: resolve("./dist"),
            },
        ],
    },
];
