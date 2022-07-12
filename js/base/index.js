/**
 * Base ESLint configuration
 */

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Needed for prettier
    'prettier/prettier': 2,
    // suppress rules
    'no-console': 0,
    'no-plusplus': 0,
    // error rules
    'require-await': 2,
    'prefer-destructuring': [2, { object: true, array: true }]
  }
}
