import { GitRevisionPlugin } from "git-revision-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import { container } from "webpack";
import { ProvidePlugin } from "webpack";
import shared from "./shared-dependencies.json";

// Used to make the build reproducible between different machines (IPFS-related)
export default (config, env) => {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        util: require.resolve("util/"),
    };
    config.plugins.push(
        new container.ModuleFederationPlugin({
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
    const gitRevisionPlugin = new GitRevisionPlugin();
    const shortCommitHash = gitRevisionPlugin.commithash().substring(0, 8);
    config.output.filename = `static/js/[name].${shortCommitHash}.js`;
    config.output.chunkFilename = `static/js/[name].${shortCommitHash}.chunk.js`;
    config.plugins = config.plugins.filter(
        (plugin) =>
            !(
                plugin instanceof WorkboxWebpackPlugin.GenerateSW ||
                plugin instanceof WebpackManifestPlugin ||
                plugin instanceof MiniCssExtractPlugin
            )
    );
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: `static/css/[name].${shortCommitHash}.css`,
            chunkFilename: "static/css/[name].chunk.css",
        })
    );
    config.optimization.moduleIds = "deterministic";
    return config;
};
