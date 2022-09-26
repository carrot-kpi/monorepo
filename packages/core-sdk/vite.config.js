import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: join(__dirname, './src/index.ts'),
      name: 'CarrotKpiCoreSdk',
      fileName: (format) => `carrot-kpi-core-sdk.${format}.js`,
      formats: ['es', 'umd'],
    },
  },
})
