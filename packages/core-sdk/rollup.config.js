import { join } from 'path'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

export default {
  input: join(__dirname, './src/index.ts'),
  plugins: [typescript(), json(), terser()],
  output: [
    {
      format: 'es',
      file: join(__dirname, './dist/carrot-kpi-core-sdk.es.js'),
    },
    {
      format: 'umd',
      name: 'CarrotKpiCoreSdk',
      file: join(__dirname, './dist/carrot-kpi-core-sdk.umd.js'),
    },
  ],
}
