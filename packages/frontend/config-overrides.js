const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const { ProvidePlugin } = require('webpack')
const pkg = require('./package.json')

const sharedDependencies = Object.entries(pkg.sharedDependencies).reduce(
  (deps, [name, version]) => {
    deps[name] = {
      requiredVersion: version,
      singleton: true,
      eager: false,
    }
    return deps
  },
  {}
)

// Used to make the build reproducible between different machines (IPFS-related)
module.exports = (config, env) => {
  config.resolve.fallback = { ...config.resolve.fallback, util: require.resolve('util/') }
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'host',
      shared: sharedDependencies,
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  )
  if (env !== 'production') {
    return config
  }
  const gitRevisionPlugin = new GitRevisionPlugin()
  const shortCommitHash = gitRevisionPlugin.commithash().substring(0, 8)
  config.output.filename = `static/js/[name].${shortCommitHash}.js`
  config.output.chunkFilename = `static/js/[name].${shortCommitHash}.chunk.js`
  config.plugins = config.plugins.filter(
    (plugin) =>
      !(
        plugin instanceof WorkboxWebpackPlugin.GenerateSW ||
        plugin instanceof WebpackManifestPlugin ||
        plugin instanceof MiniCssExtractPlugin
      )
  )
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: `static/css/[name].${shortCommitHash}.css`,
      chunkFilename: 'static/css/[name].chunk.css',
    })
  )
  config.optimization.moduleIds = 'deterministic'
  return config
}
