# Configurations

Summary of `configs/` directory structure:

```
├── configs                     <-- Where all the configurations are
│   ├── eslint
│   │   └── js
│   │       ├── base
│   │       └── react           <-- React's ESLint configuration folder
│   │           ├── index.js    <-- Main lint configuration file
|   |           |                   (the one that gets exported)
│   │           ├── info.json   <-- Used by the CLI
│   │           └── test.js     <-- Tests the lint configuration
│   └── stylelint
```

Each configuration has at least 2 files, `index.js` and `info.json`:

* `index.js` is the entry point for the configuration, the one that gets exported when a user installs it.
* `info.json` is a JSON object with relevant information for the CLI to work its magic.
* `test.js` (optional) is a code example where the lint configurations get tested.

### `info.json`

This project uses [`enquirer`][enquirer] as a dependency to prompt the user for information, in this case `info.json` is a [Choice] object for the [AutoComplete] prompt when the CLI is called to run a command.

```json
{
  "name": "Unique name",
  "hint": "Small description",
  "devDependencies": {},
  "mockConfig": {}
}
```

Additionally, it has the `devDependencies` property that the commands can use to know which dependencies to add prior to installing the configuration.

And in the case of the linters (ESLint, Stylelint, etc.) and for testing purposes, there's an optional property `mockConfig` to overwrite a specific configuration just for testing, it allows us to – for example – mock dependencies in the test scripts by using aliases instead.

[enquirer]: https://www.npmjs.com/package/enquirer
[Choice]: https://github.com/enquirer/enquirer#defining-choices
[AutoComplete]: https://github.com/enquirer/enquirer#autocomplete-prompt
