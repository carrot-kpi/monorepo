const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { ProvidePlugin } = require("webpack");
const shared = require("./shared-dependencies.json");

// Used to make the build reproducible between different machines (IPFS-related)
module.exports = {
    webpack: {
        configure: (config, { env }) => {
            config.plugins.push(
                new ModuleFederationPlugin({
                    name: "host",
                    shared,
                }),
                new ProvidePlugin({
                    Buffer: ["buffer", "Buffer"],
                })
            );
            if (env !== "production") {
                return config;
            }
            config.output.publicPath = "auto";
            config.plugins = config.plugins.filter(
                (plugin) => !(plugin instanceof WorkboxWebpackPlugin.GenerateSW)
            );
            return config;
        },
    },
};
