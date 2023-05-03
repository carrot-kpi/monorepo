const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");
const { join } = require("path");
const shared = require("./shared-dependencies.json");

module.exports = {
    webpack: {
        configure: (config, { env }) => {
            config.plugins.push(
                new webpack.container.ModuleFederationPlugin({
                    name: "host",
                    shared,
                }),
                new webpack.DefinePlugin({
                    __LIBRARY_MODE__: JSON.stringify(false),
                    __STAGING_MODE__: JSON.stringify(
                        process.env.STAGING === "true"
                    ),
                }),
                new webpack.ProvidePlugin({
                    Buffer: ["buffer", "Buffer"],
                })
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
            if (env !== "production") return config;
            // TODO: make Workbox and precaching work (all
            // cacheable files are now excluded)
            config.plugins.push(
                new WorkboxWebpackPlugin.InjectManifest({
                    swSrc: join(__dirname, "/src/sw.ts"),
                    exclude: [/.+/],
                })
            );
            return config;
        },
    },
};
