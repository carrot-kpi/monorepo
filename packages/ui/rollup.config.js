import { join } from 'path'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'

export default [
  {
    input: join(__dirname, './src/index.ts'),
    plugins: [
      peerDepsExternal(),
      commonjs(),
      nodeResolve(),
      postcss(),
      typescript(),
      terser(),
    ],
    external: ['@emotion/react'],
    output: [
      {
        file: join(__dirname, `./dist/index.js`),
        format: 'umd',
        name: 'CarrotKpiUi',
        globals: {
          '@emotion/react': 'emotionReact',
        },
      },
      {
        file: join(__dirname, `./dist/index.mjs`),
        format: 'es',
      },
    ],
  },
]
