import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.js',
  format: ['esm', 'cjs'],
  platform: 'neutral',
  sourcemap: true,
  exports: true,
  publint: true,
  // sources use JSX in .js files
  loader: { '.js': 'jsx' },
  // classic runtime keeps React >=16.8 working, react/jsx-runtime needs 16.14
  inputOptions: { transform: { jsx: 'react' } }
})
