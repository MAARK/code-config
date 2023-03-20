# Stylelint configurations

Step-by-step guide to install any [Stylelint] configuration manually. In this
example we're installing `scss/base`.

### 1. Install dependencies

```bash
npm i --save-dev \
  @maarkllc/code-config \
  stylelint@^15.2.0 \
  stylelint-config-standard-scss@^7.0.1
```

> ⚠️ Please refer to `info.json` inside each configuration's folder to know
> which dependencies are required for the one you choose to install.
> e.g. [`scss/base/info.json`](./scss/base/info.json)

### 2. Configure [Stylelint]

Create a `.stylelintrc.js` file in your project root directory and extend the
configuration.

```javascript
module.exports = {
  extends: ['./node_modules/@maarkllc/code-config/configs/stylelint/scss/base']
}
```

Or, it can also be extended using `require`.

```javascript
const config = require('@maarkllc/code-config/configs/stylelint/scss/base')

module.exports = config
```

[Stylelint]: https://stylelint.io/
