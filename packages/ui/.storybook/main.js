const path = require("path");

module.exports = {
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "storybook-dark-mode",
    ],
    framework: "@storybook/react",
    typescript: { reactDocgen: "react-docgen-typescript" },
    core: {
        builder: "@storybook/builder-webpack5",
        disableTelemetry: true,
    },
    staticDirs: ["../public"],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.css$/,
            use: [
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                require("tailwindcss"),
                                require("autoprefixer"),
                            ],
                        },
                    },
                },
            ],
            include: path.resolve(__dirname, "../"),
        });

        // makes svg import with svgr work
        config.module.rules
            .filter((rule) => rule.test.test(".svg"))
            .forEach((rule) => (rule.exclude = /\.svg$/i));
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        prettier: false,
                        svgo: false,
                        svgoConfig: {
                            plugins: [{ removeViewBox: false }],
                        },
                        titleProp: true,
                        ref: true,
                    },
                },
                {
                    loader: "file-loader",
                    options: {
                        name: "static/media/[path][name].[ext]",
                    },
                },
            ],
            type: "javascript/auto",
            issuer: {
                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
            },
        });

        config.resolve = {
            ...config.resolve,
            alias: {
                "lodash/debounce": path.join(
                    __dirname,
                    "../../../node_modules/lodash.debounce/index.js"
                ),
            },
        };

        return config;
    },
};
