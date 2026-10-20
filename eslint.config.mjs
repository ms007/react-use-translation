import neostandard from 'neostandard'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  { ignores: ['dist/'] },
  ...neostandard(),
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // classic JSX runtime needs React in scope
      'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
      // don't force a space before function parens
      '@stylistic/space-before-function-paren': 'off',
    },
  },
  {
    files: ['**/*.spec.js', 'src/test-utils.js'],
    languageOptions: { globals: globals.vitest },
  },
]
