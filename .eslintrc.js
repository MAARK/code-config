module.exports = {
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['./node_modules', './']
      },
      // For template files (templates/../t_<name>)
      alias: [['@maarkllc/code-config', './']]
    }
  },
  // ESLintception ¯\_(ツ)_/¯
  extends: ['./configs/eslint/js/base']
}
