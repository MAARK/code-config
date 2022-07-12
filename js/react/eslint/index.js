const SUPPRESS = 0

module.exports = {
  extends: ['airbnb', 'airbnb/hooks', '../../base/eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/jsx-filename-extension': SUPPRESS
  }
}
