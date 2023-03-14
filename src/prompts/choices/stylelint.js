export default [
  {
    name: 'css/base',
    hint: 'Base rules for CSS',
    dependencies: ['stylelint-config-standard@30.0.1']
  },
  {
    name: 'scss/base',
    hint: 'Base rules for SCSS. Extends from css/base',
    dependencies: ['stylelint-config-standard-scss@7.0.1']
  }
]
