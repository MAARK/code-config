# ESLint configurations

Step-by-step guide to install any [ESLint] configuration manually. In this
example we're installing `js/base`.

### 1. Install dependencies

```bash
npm i --save-dev \
  @maarkllc/code-config \
  eslint@^8.35.0 \
  eslint-config-airbnb-base@^15.0.0 \
  eslint-config-prettier@^8.7.0 \
  eslint-plugin-prettier@^4.2.1 \
  prettier@^2.8.4 \
  stylelint@^15.2.0 \
  stylelint-config-standard-scss@^7.0.1
```

> ⚠️ Please refer to `info.json` inside each configuration's folder to know
> which dependencies are required for the one you choose to install.
> e.g. [`js/base/info.json`](./js/base/info.json)

### 2. Configure [ESLint]

Create a `.eslintrc.js` file in your project root directory and extend the
configuration.

```javascript
module.exports = {
  extends: ['./node_modules/@maarkllc/code-config/configs/eslint/js/base']
}
```

Or, it can also be extended using `require`.

```javascript
const eslintConfig = require('@maarkllc/code-config/configs/eslint/js/base')

module.exports = eslintConfig
```

### 3. Configure [Prettier]

Create a `.prettierrc.js` file in your project root directory.

```javascript
const prettierConfig = require('@maarkllc/code-config/configs/eslint/js/base/prettier')

module.exports = prettierConfig
```

[ESLint]: https://eslint.org/
[Prettier]: https://prettier.io/
