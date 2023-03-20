# Code configurations

[![badge][badge]][npm-repo] [![badge-ci][badge-ci]][CircleCI]

[badge]: https://img.shields.io/badge/%40maarkllc%2Fcode--config-v2.0.0-blue
[npm-repo]: https://www.npmjs.com/package/@maarkllc/code-config

[badge-ci]: https://circleci.com/gh/MAARK/code-config.svg?style=shield
[CircleCI]: https://app.circleci.com/pipelines/github/MAARK/code-config

Collection of configurations to enforce consistent development guidelines
using Maark's recommendations.

To install a new configuration you can either use the CLI to handle everything
automatically or do it manually.

## Using the CLI with `npx`

```bash
npx @maarkllc/code-config
```

This will guide you through a few steps that will ultimately install the desired
configuration. That's it, happy coding!

## Installing the CLI globally

Alternatively, you can install the `code-config` CLI globally and use it
like so:

```bash
npm i -g @maarkllc/code-config

code-config
```

### Available commands

If you want to skip the first step you can pass the command as a parameter.
This is optional because if you don't pass anything, the CLI will ask you what
you want to execute.

```bash
code-config [command]
```

* `eslint` To install an ESLint configuration.
* `stylelint` To install a Stylelint configuration.
* `help` Shows the help screen.

e.g.
```bash
code-config eslint

// or

npx @maarkllc/code-config stylelint
```

## Installing configurations manually

All configurations are inside the `configs/` folder, categorized by tool.
Each tool explains how to install it manually.

* [Instructions for ESlint](./configs/eslint/index.md)
* [Instructions for Stylelint](./configs/stylelint/index.md)

## Supported configurations

The idea is to have a structure of configurations that extend from each other
as needed depending on the project stack, it is important to define rules to be
able to identify anti-patterns and code-smells for specific known libraries.
[This diagram][diagram] helps illustrate the possible configurations and how
it can scale in the future to include other tools of trade for bundling or
unit testing:

```mermaid
%%{init: {'theme':'base'}}%%
graph TD
    subgraph Legend
        L1[Available]:::available --> L2[Not ready]
    end

    A[ESLint]:::available --> B[JavaScript]:::available
    B --> C[js/base]:::available
    C --> D[js/react]:::available
    C --> js/vue
    C --> js/angular
    D --> js/next

    A --> E[Typescript]

    F[Stylelint]:::available --> G[CSS]:::available
    F --> H[SCSS]:::available
    G --> css/base:::available
    H --> scss/base:::available

    Webpack

    classDef available stroke:#0B410E,fill:#94D1BE
```

### ESLint

- `eslint/js/base`: It extends from [Airbnb] base configuration.
- `eslint/js/react`: It extends from `eslint/js/base` and Airbnb full
  configuration and hooks rules.

### Stylelint

- `stylelint/css/base`: It extends from `stylelint-config-standard`.
- `stylelint/scss/base`: It extends from `stylelint/css/base` and
  `stylelint-config-standard-scss`.

## Development

For more information please refer to the [documentation].

[documentation]: ./docs/index.md

[ESLint]: https://eslint.org/
[Prettier]: https://prettier.io/
[Stylelint]: https://stylelint.io/
[Airbnb]: https://github.com/airbnb/javascript

[diagram]: https://mermaid.live/edit#pako:eNp1klFrwjAUhf9Kia_KdPiyPAzUVmV0e6kwWOrDbXvVzjQtSSor4n9fmqzKZpeHkHvOd5MTuGeSlhkSSvYSqoO38WPhmaXqxAkh7lFkTmxXOGGzE-QcEo5bSil0hTcaPXvhI3srtScRsmbrmq7dbp-xIApzoe975-zFCFEq8-q36xrnFlqwT_WQgMIeYmEJvyVMgFT_ixjgVP9VQOxrDtKpfqcK_NKx-IluxYBtmgqVi9lZSxbphiPv_diKLaKoJ8zSumsW9dsra6fK_ffeX1tf9QMOecekgvTYlSkHpXzcebd8SsvyiHQwnk8n42C4yzmng6epP5kHZEgKlAXkmZmOc3tDTPQBC4wJNcf2zZjE4mI4qHUZNSIlVMsah6SuMtDo52BmqCB0B1wZtQLxUZa32lFBlutSXkW05aubSTual2_O6dT3
