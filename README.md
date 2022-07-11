# Coding standards

[![badge][badge]][npm-repo]

Maark's recommended linter rules for code style and formatting.

## Usage

### Install

```bash
npm i --save-dev @maarkllc/coding-standards
```

### Configure ESLint

Create a `.eslintrc.js` file in your project root directory and extend the
configuration depending on the browser stack you are using.

```javascript
module.exports = {
  extends: ['@maarkllc/coding-standards/js/base']
}
```

### Configure Prettier

Create a `.prettierrc.js` file in your project root directory.

```javascript
const prettierConfig = require('@maarkllc/coding-standards/js/base/.prettierrc.js')

module.exports = prettierConfig
```

## Specific configurations

The idea is to create a structure of configurations that extend from each other
as needed depending on the project stack, it is important to define rules to be
able to identify anti-patterns and code-smells for specific known libraries.
[This diagram][diagram] helps illustrate the possible configurations but it
doesn't represent the current state:

```mermaid
%%{init: {'theme':'base'}}%%
graph TD
    A[js/base] --> B[js/react]
    A --> js/vue
    A --> js/angular
    B --> js/next
    ts/base --> ts/angular
    css --> scss
```

### Currently supported

- `js/base`: base JavaScript [ESLint] rules. It extends from [Airbnb], and it
  uses [Prettier] to format the code.
- `js/react`: JavaScript rules for React. It extends from `js/base`.

[badge]: https://img.shields.io/badge/%40maarkllc%2Fcoding--standards-1.0.0-blue
[npm-repo]: https://www.npmjs.com/package/@maarkllc/coding-standards
[ESLint]: https://eslint.org/
[Prettier]: https://prettier.io/
[Airbnb]: https://github.com/airbnb/javascript

[diagram]: https://mermaid.live/edit#pako:eNpdj70OgzAMhF8l8gzqnqFSEX2CdmsY3MQFKhJQ4lStEO_e8Lfg6fzd6WSPoHtDIKH2ODTiXion0lwe73B6YqBK5PlZFPPqCTVXm7_gBD-RDgRdHTv0Ky126ujLK-K1eDH4ENchLDwkARlY8hZbk64bZ18BN2RJgUxy7lCg3JRycTDIdDUt9x7kC7tAGWDk_vZzGiT7SHuobDF9arfU9AdRW1Ad
