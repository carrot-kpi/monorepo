import { join } from 'path'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

export default [
  {
    input: join(__dirname, './src/index.ts'),
    plugins: [
      peerDepsExternal(),
      json({ compact: true }),
      commonjs(),
      nodeResolve(),
      typescript(),
      terser(),
    ],
    output: [
      {
        file: join(__dirname, `./dist/carrot-kpi-sdk.umd.js`),
        format: 'umd',
        name: 'CarrotKpiSdk',
        globals: {
          ethers: 'ethers',
          'decimal.js-light': 'Decimal',
        },
      },
      {
        file: join(__dirname, `./dist/carrot-kpi-sdk.es.js`),
        format: 'es',
      },
    ],
  },
]
