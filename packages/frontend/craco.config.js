const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { ProvidePlugin } = require("webpack");
const shared = require("./shared-dependencies.json");
const { join } = require("path");

module.exports = {
    webpack: {
        configure: (config, { env }) => {
            if (!config.ignoreWarnings) config.ignoreWarnings = [];
            config.ignoreWarnings.push(/Failed to parse source map/);
            config.plugins.push(
                new ModuleFederationPlugin({
                    name: "host",
                    shared,
                }),
                new ProvidePlugin({
                    Buffer: ["buffer", "Buffer"],
                })
            );
            if (env !== "production") return config;
            config.output.publicPath = "auto";
            config.plugins
                .push(
                    new WorkboxWebpackPlugin.InjectManifest({
                        swSrc: join(__dirname, "/src/sw.ts"),
                    })
                );
            return config;
        },
    },
};
