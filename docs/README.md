# Development

The directory structure can be summarized this way:

```
├── configs                     <-- Where all the configurations are
│   ├── eslint
│   │   └── js
│   │       ├── base
│   │       └── react           <-- `eslint/js/react` config directory
│   │           ├── index.js    <-- Main lint configuration file
|   |           |                   (the one that gets exported)
│   │           ├── mock.json   <-- Extends the configuration
|   |           |                   (for testing purposes only)
│   │           └── test.js     <-- To test the lint configuration
│   ├── prettier
│   └── stylelint
├── src
│   ├── app                     <-- Where all the commands logic is
│   ├── mocks                   <-- A place to mock dependencies
│   ├── prompts                 <-- User prompts for enquirer
│   ├── templates               <-- Templates that get copied when
|   |                               the user runs commands
│   └── utils
└── test                        <-- Scripts to run tests on the existing
                                    configurations in ./configs
```

All the configurations are inside `./configs` and each one of them have at least 2 files:

* `index.js` will have the complete lint configuration, the one that gets exported when a user installs it.
* `test.js` a code example where the lint configuration gets tested on.
* `mock.json` (optional) is a JSON that extends the lint configuration under that directory for testing purposes. e.g. The `eslint/js/react` configuration depends on `react` and `prop-types` to work and extending aliases to mock those dependencies help avoid installing them just to test the linter works.

## Scripts

They can be separated into 2 categories.

### Development scripts:

* `start` builds the CLI and runs it.
* `build` builds the CLI.
* `watch` listens to any file change and triggers a `build` when that happens.
* `lint` checks for code formatting in this project only, mostly inside `./src`.
* `lint -- --fix` fixes any code formatting issues that can be done automatically.

### Configuration scripts:

These are only to test the configuration scripts are working as expected. They're only relevant for files inside `./configs`.

* `test` tests all configurations.
* `fix` fixes any code formatting issues that can be done automatically.
* `test:eslint` tests all ESLint configurations.
* `test:stylelint` tests all Stylelint configurations.
