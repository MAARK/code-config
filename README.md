# Code configurations

[![badge][badge]][npm-repo] [![badge-ci][badge-ci]][CircleCI]

Collection of linter configurations and tools to enforce consistent code style
and format according to Maark's recommendations.

The idea is to have a structure of configurations that extend from each other
as needed depending on the project stack, it is important to define rules to be
able to identify anti-patterns and code-smells for specific known libraries.
[This diagram][diagram] helps illustrate the possible configurations:

```mermaid
%%{init: {'theme':'base'}}%%
graph TD
    subgraph Legend
        L1[Available]:::available --> L2[Not ready]
    end

    A[js/base/eslint]:::available ---> B[js/react/eslint]:::available
    A --> js/vue/eslint
    A --> js/angular/eslint
    B --> js/next/eslint
    C[css/base/stylelint]:::available --> scss/base/stylelint:::available
    A ---> D[ts/base/eslint]
    D --> ts/angular/eslint

    classDef available stroke:#0B410E,fill:#94D1BE
```

## Usage

### 1. Install

```bash
npm i --save-dev @maarkllc/code-config
```

### 2. Configure ESLint

Create a `.eslintrc.js` file in your project root directory and extend the
configuration depending on the browser stack you are using.

```javascript
module.exports = {
  extends: ['./node_modules/@maarkllc/code-config/js/base/eslint']
}
```

Or it can also be extended this way:

```javascript
const eslintConfig = require('@maarkllc/code-config/js/base/eslint')

module.exports = eslintConfig
```

### 3. Configure Prettier

Create a `.prettierrc.js` file in your project root directory.

```javascript
const prettierConfig = require('@maarkllc/code-config/js/base/prettier')

module.exports = prettierConfig
```

### 4. Configure Stylelint

Create a `.stylelintrc.js` file in your project root directory.

```javascript
module.exports = {
  extends: ['./node_modules/@maarkllc/code-config/css/base/stylelint']
}
```

## Currently supported

### JavaScript

- `js/base/eslint`: base JavaScript [ESLint] rules. It extends from [Airbnb],
  and it uses [Prettier] to format the code.
- `js/react/eslint`: JavaScript rules for React. It extends from
  `js/base/eslint`.

### CSS

- `css/base/stylelint`: base CSS [Stylelint] rules.

[badge]: https://img.shields.io/badge/%40maarkllc%2Fcode--config-v1.0.0-blue
[badge-ci]: https://circleci.com/gh/MAARK/code-config/tree/v1.0.0.svg?style=shield

[npm-repo]: https://www.npmjs.com/package/@maarkllc/code-config
[CircleCI]: https://app.circleci.com/pipelines/github/MAARK/code-config

[ESLint]: https://eslint.org/
[Prettier]: https://prettier.io/
[Airbnb]: https://github.com/airbnb/javascript

[diagram]: https://mermaid.live/edit#pako:eNptkcFugzAMhl8lSq9ULVMvy6FSGdzQLtsNejDEULYQqsRUQ1XffaHAJlp8iBL_n3878pXnjUQueGngfGKfYaqZC9tmQyLGErUckn3EfnK4QKUgU3gUQsD0YOv1nsUvyXtDzCDI7jgU_VUP5yH5spsMLG7QqkrTo4czCXrEWeS0xIw293aOu7ST04MAumwVmJkYTKLGH5opb0lux7ksdQqXRtsz-wwtj-bYMKH5Rwc1vBvR83yDnCuwNsSC_Te2ZJpvFKttsPO3kVdUSonV6y70g4h7vEZTQyXdAq-9Q8rphDWmXLhr3z3lqb45rj1LIIxkRY3hogBl0ePQUvPR6ZwLMi1OUFiB2309UrdfeyGxXA
