const { dirname, join, resolve } = require("node:path");

module.exports = {
    stories: ["../stories/*.stories.@(ts|tsx)"],
    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-interactions"),
        {
            name: "@storybook/addon-styling",
            options: {
                postCss: true,
            },
        },
    ],
    framework: getAbsolutePath("@storybook/react-webpack5"),
    typescript: { reactDocgen: "react-docgen-typescript" },
    core: {
        disableTelemetry: true,
    },
    docs: {
        autodocs: false,
    },
    staticDirs: ["../public"],
    webpackFinal: async (config) => {
        // make tailwind work
        config.module.rules.push({
            test: /\.css$/,
            use: [
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: {
                                tailwindcss: {
                                    config: resolve(
                                        __dirname,
                                        "../src/tailwind-config.js",
                                    ),
                                },
                                autoprefixer: {},
                            },
                        },
                    },
                },
            ],
            include: resolve(__dirname, "../"),
        });
        return config;
    },
};

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}
