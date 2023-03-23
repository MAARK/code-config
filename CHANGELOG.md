# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 1.0.0 (2022-07-11)

### Added

* Initial proposal.

## 2.0.0 (2023-03-23)

### Added

* Code-config CLI.
* `eslint` command to create a new ESLint configuration automatically.
* `stylelint` command to create a new Stylelint configuration automatically.
* Auto-install necessary dependencies when running commands.
* Documentation.

### Updates

* Moves the existing configuration to the `configs/` folder.
* Inverts the language and tool in the folder structure.

## 2.0.1 (2023-03-23)

### Added

* Missing `main` property in package.json to execute CLI

## 2.0.2 (2023-03-23)

### Updated

* Execute build before the tests in CI
