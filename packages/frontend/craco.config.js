const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");
const { join } = require("path");
const shared = require("./shared-dependencies.json");

module.exports = {
    webpack: {
        configure: (config, { env }) => {
            config.entry = {
                main: config.entry,
                sw: join(__dirname, "./src/sw.ts"),
            };
            config.plugins.push(
                new webpack.container.ModuleFederationPlugin({
                    name: "host",
                    shared,
                }),
                new webpack.DefinePlugin({
                    __PREVIEW_MODE__: JSON.stringify(false),
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
            config.optimization = {
                ...config.optimization,
                moduleIds: "deterministic",
                runtimeChunk: "single",
            };
            config.output = {
                ...config.output,
                publicPath: "auto",
                filename: (pathData) => {
                    return pathData.chunk.name === "sw"
                        ? "sw.js"
                        : "[name].[contenthash:8].js";
                },
                chunkFilename: "[name].[contenthash:8].js",
                assetModuleFilename: "[name].[contenthash:8][ext]",
            };
            // TODO: make Workbox and precaching work
            // config.plugins.push(
            //     new WorkboxWebpackPlugin.InjectManifest({
            //         swSrc: join(__dirname, "/src/sw.ts"),
            //     })
            // );
            return config;
        },
    },
};
