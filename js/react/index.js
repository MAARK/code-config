/**
 * React ESLint configuration
 */
module.exports = {
  extends: [
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    '../base'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
}
