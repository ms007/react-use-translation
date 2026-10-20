import { transformWithOxc } from 'vite'
import { defineConfig } from 'vitest/config'

// sources use JSX in .js files, which Vite only parses in .jsx/.tsx
const jsxInJs = {
  name: 'jsx-in-js',
  enforce: 'pre',
  transform(code, id) {
    if (!/\/src\/.*\.js$/.test(id)) return
    return transformWithOxc(code, id, {
      lang: 'jsx',
      jsx: { runtime: 'classic' }
    })
  }
}

export default defineConfig({
  plugins: [jsxInJs],
  test: {
    environment: 'jsdom',
    globals: true
  }
})
