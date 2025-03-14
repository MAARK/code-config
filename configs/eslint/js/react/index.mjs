import ReactPlugin from 'eslint-plugin-react'
import baseConfig from '../base/index.mjs'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  ReactPlugin.configs.flat.recommended,
  {
    rules: {
      'react/prop-types': 'off',
    },
  },
]
