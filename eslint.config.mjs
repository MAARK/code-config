import baseConfig from './configs/eslint/js/base/index.mjs'

export default [
  ...baseConfig,
  {
    ignores: ['libs/*', 'configs/*'],
  },
]
