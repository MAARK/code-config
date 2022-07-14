module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // suppress rules
    'no-console': 0,
    'no-plusplus': 0,
    // error rules
    'require-await': 2,
    'prefer-destructuring': [2, { object: true, array: true }]
  }
}
