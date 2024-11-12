import pluginReact from 'eslint-plugin-react'
import baseConfig from '../base/index.mjs'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/prop-types': 'off',
    },
  },
]
