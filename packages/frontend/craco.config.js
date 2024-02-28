require("dotenv").config();

const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");
const { EsbuildPlugin } = require("esbuild-loader");
const { join } = require("node:path");
const shared = require("./shared-dependencies.json");
const { getEnv } = require("./utils/env");

const ALLOWED_ENVIRONMENTS = ["prod", "staging", "dev", "library"];

const environment = process.env.ENVIRONMENT;
if (ALLOWED_ENVIRONMENTS.indexOf(environment) < 0) {
    console.error(
        `Invalid environment "${environment}" specified. Allowed values are: ${ALLOWED_ENVIRONMENTS.join(
            ", ",
        )}`,
    );
    process.exit(1);
}

module.exports = {
    webpack: {
        configure: (config) => {
            for (const rule of config.module.rules) {
                if (!rule.oneOf) continue;
                for (oneOf of rule.oneOf) {
                    if (!oneOf.use) continue;
                    for (const use of oneOf.use) {
                        if (!use.loader) continue;
                        if (use.loader.includes("postcss-loader")) {
                            use.options.postcssOptions.plugins.push("cssnano");
                        }
                    }
                }
            }

            config.optimization.minimizer = [new EsbuildPlugin({})];
            config.plugins.push(
                new webpack.container.ModuleFederationPlugin({
                    name: "host",
                    shared,
                }),
                new webpack.DefinePlugin({
                    __ENVIRONMENT__: JSON.stringify(environment),
                    __INFURA_PROJECT_ID__: getEnv(
                        "INFURA_PROJECT_ID",
                        environment === "prod",
                    ),
                    __WALLETCONNECT_PROJECT_ID__: getEnv(
                        "WALLETCONNECT_PROJECT_ID",
                        environment === "prod",
                    ),
                    __FATHOM_SITE_ID__: getEnv(
                        "FATHOM_SITE_ID",
                        environment === "prod",
                    ),
                }),
                new webpack.ProvidePlugin({
                    Buffer: ["buffer", "Buffer"],
                }),
            );
            if (config.ignoreWarnings)
                config.ignoreWarnings.push(/Failed to parse source map/);
            else config.ignoreWarnings = [/Failed to parse source map/];
            config.resolve.fallback = {
                ...config.resolve.fallback,
                buffer: require.resolve("buffer"),
            };
            // make sure sw.js is there
            const defaultFilename = config.output.filename;
            config.output = {
                ...config.output,
                filename: (pathData) => {
                    return pathData.chunk.name === "sw"
                        ? "sw.js"
                        : defaultFilename;
                },
            };
            if (environment !== "prod") return config;
            // TODO: make Workbox and precaching work (all
            // cacheable files are now excluded)
            config.plugins.push(
                new WorkboxWebpackPlugin.InjectManifest({
                    swSrc: join(__dirname, "/src/sw.ts"),
                    exclude: [/.+/],
                }),
            );
            return config;
        },
    },
};
