import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  format: ['esm', 'cjs'],
  platform: 'neutral',
  sourcemap: true,
  dts: true,
  exports: true,
  publint: true
})
