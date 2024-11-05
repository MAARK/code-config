# ESLint configurations

Step-by-step guide to install any [ESLint] configuration manually. In this
example we're installing `js/base`.

### 1. Install dependencies

```bash
npm i --save-dev \
  @eslint/js@9.14.0 \
  @maarkllc/code-config \
  eslint@^9.14.0 \
  eslint-config-prettier@^9.1.0 \
  eslint-plugin-prettier@^5.2.1 \
  globals@^15.12.0 \
  prettier@^3.3.3
```

> [!IMPORTANT]
> Please refer to `info.json` inside each configuration's folder to know
> which dependencies are required for the one you choose to install.
> e.g. [`js/base/info.json`](./js/base/info.json)

### 2. Configure [ESLint]

Create a `eslint.config.mjs` file in your project root directory and extend the
configuration.

```javascript
import ESLintConfig from './node_modules/@maarkllc/code-config/configs/eslint/js/base/index.mjs'

export default [
  ...ESLintConfig,
  {
    rules: {
      // Add custom rules here
    },
  },
]

```

### 3. Configure [Prettier]

Create a `prettier.config.mjs` file in your project root directory.

```javascript
import prettierConfig from '@maarkllc/code-config/configs/eslint/js/base/prettier.mjs'

export default prettierConfig

```

[ESLint]: https://eslint.org/
[Prettier]: https://prettier.io/
