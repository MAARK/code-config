import ReactPlugin from 'eslint-plugin-react'
import NextPlugin from '@next/eslint-plugin-next'
import baseConfig from '../base/index.mjs'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  ReactPlugin.configs.flat.recommended,
  {
    plugins: {
      '@next/next': NextPlugin,
    },
    rules: {
      'react/prop-types': 'off',
      // next doesn't require importing React
      'react/react-in-jsx-scope': 'off',
    },
  },
]
