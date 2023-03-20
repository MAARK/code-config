# Development

Summary of `src/` directory structure:

```
├── src                         <-- CLI's code
│   ├── app                     <-- Application core commands
│   │   ├── eslint
│   │   ├── help
│   │   └── stylelint
│   └── utils
│   └── index.js                <-- CLI's entry point
```

## CLI source

Everything inside the `src/` folder is to run the `code-config` CLI program. The core commands are inside `src/app` and each folder in it should be a command with the same name. e.g. The folder `eslint/` is to execute the `code-config eslint` command.

### Anatomy of a command

Let's say we want to create a new command called `example`:

```bash
code-config example [...params]
```

We add the file `src/app/example/index.js`:

```javascript
async function example(params) {
  // command's logic here
}

export function exampleDoc() {
  // To be used by `help` to output what this command is about
}

// (Optional) If you want to add the command to the initial CLI prompt
export const examplePrompt = {
  name: 'example',
  message: 'Small descriptive message',
  hint: 'code-config example',
  action: example
}

export default example
```

> ℹ️ `@maarkllc/code-config` uses [`enquirer`][enquirer] as a dependency to prompt the user for information, in this case `examplePrompt` is a [Choice] object for the initial [AutoComplete] prompt when the CLI is called without any command.

Then we need to export the command in `src/app/index.js`:

```javascript
import example, { examplePrompt } from 'src/app/example'

// (Optinoal) If you want to add the command to the initial CLI prompt
const CORE_COMMANDS = [/* ... */, examplePrompt]

//...

export default {
  eslint,
  //...
  example
}
```

And that's it, a new command `example` is created.

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

[enquirer]: https://www.npmjs.com/package/enquirer
[Choice]: https://github.com/enquirer/enquirer#defining-choices
[AutoComplete]: https://github.com/enquirer/enquirer#autocomplete-prompt
