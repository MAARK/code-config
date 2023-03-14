export default [
  {
    name: 'js/base',
    hint: 'Base rules for JavaScript',
    dependencies: ['eslint-config-airbnb-base@15.0.0']
  },
  {
    name: 'js/react',
    hint: 'React rules. Extends from js/base',
    dependencies: ['eslint-config-airbnb@19.0.4']
  }
]
