import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import baseConfig from '../base/index.mjs'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/prop-types': 'off',
    },
  },
]
