const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");
const shared = require("./shared-dependencies.json");
const { join } = require("path");

module.exports = {
    webpack: {
        configure: (config, { env }) => {
            if (!config.ignoreWarnings) config.ignoreWarnings = [];
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
            config.ignoreWarnings.push(/Failed to parse source map/);
            config.resolve.fallback = {
                ...config.resolve.fallback,
                buffer: require.resolve("buffer"),
            };
            if (env !== "production") return config;
            config.output.publicPath = "auto";
            config.plugins.push(
                new WorkboxWebpackPlugin.InjectManifest({
                    swSrc: join(__dirname, "/src/sw.ts"),
                })
            );
            return config;
        },
    },
};
