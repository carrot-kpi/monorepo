const { join } = require('path')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const typescript = require('rollup-plugin-typescript2')
const json = require('@rollup/plugin-json')

module.exports = [
  {
    input: join(__dirname, './src/index.ts'),
    plugins: [
      peerDepsExternal(),
      json(),
      nodeResolve(),
      commonjs(),
      typescript(),
      terser(),
    ],
    output: [
      {
        file: join(__dirname, `./dist/index.js`),
        format: 'umd',
        name: 'CarrotKpiSdk',
        globals: {
          ethers: 'ethers',
          'decimal.js-light': 'Decimal',
        },
        sourcemap: true,
      },
      {
        file: join(__dirname, `./dist/index.mjs`),
        format: 'es',
        sourcemap: true,
      },
    ],
  },
]
