const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const { ProvidePlugin } = require('webpack')

// Used to make the build reproducible between different machines (IPFS-related)
module.exports = (config, env) => {
  config.resolve.fallback = { ...config.resolve.fallback, util: require.resolve('util/') }
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'host',
      shared: {
        '@carrot-kpi/react': '^0.1.2',
        '@carrot-kpi/sdk': '^1.0.0',
        ethers: '^5.7.1',
        react: { requiredVersion: '^18.2.0', singleton: true },
        'react-dom': { requiredVersion: '^18.2.0', singleton: true },
        wagmi: '^0.6.7',
      },
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
