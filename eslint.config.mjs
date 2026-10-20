import neostandard from 'neostandard'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  { ignores: ['dist/'] },
  ...neostandard({ ts: true, noStyle: true }),
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // classic JSX runtime needs React in scope
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^React$' }]
    }
  },
  {
    files: ['src/*.spec.{ts,tsx}', 'src/test-utils.ts'],
    languageOptions: { globals: globals.vitest }
  }
]
