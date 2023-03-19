module.exports = {
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['./node_modules', './']
      },
      // For template files
      alias: [['@maarkllc/code-config', './']]
    }
  },
  // ESLintception ¯\_(ツ)_/¯
  extends: ['./configs/eslint/js/base']
}
