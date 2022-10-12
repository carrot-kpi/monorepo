import { join } from 'path'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

export default [
  {
    input: join(__dirname, './src/index.ts'),
    plugins: [
      peerDepsExternal(),
      commonjs(),
      nodeResolve(),
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
