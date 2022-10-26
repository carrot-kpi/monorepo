const { join } = require('path')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const typescript = require('rollup-plugin-typescript2')

module.exports = [
  {
    input: join(__dirname, './src/index.ts'),
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript(),
      terser({
        output: {
          comments: (_, comment) => {
            return /webpackIgnore/.test(comment.value)
          },
        },
        mangle: {
          reserved: ['__webpack_share_scopes__'],
        },
      }),
    ],
    output: [
      {
        file: join(__dirname, `./dist/index.js`),
        format: 'umd',
        name: 'CarrotKpiReact',
        globals: {
          '@carrot-kpi/sdk': 'CarrotKpiSdk',
          ethers: 'ethers',
          i18next: 'i18next',
          react: 'React',
          'react-i18next': 'ReactI18next',
          wagmi: 'wagmi',
        },
      },
      {
        file: join(__dirname, `./dist/index.mjs`),
        format: 'es',
      },
    ],
  },
]
