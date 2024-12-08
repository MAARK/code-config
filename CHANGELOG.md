# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 3.0.1

_2024-12-09_

### Added

* Next.js configuration

### Updated

* Readme diagram
* Fixed mermaid issues in CONTRIBUTING file

## 3.0.0

_2024-11-12_

Breaks backward compatibility with the previous version.

### Added

* Jest configuration
* Start writing unit tests

### Updated

* Dependencies upgraded
* ESlint upgraded to version 9
* Stylelint upgraded to version 16
* Moved from CommonJS to ECMAScript modules as required by the upgrades
* README files

### Removed

* Airbnb ESLint configuration as it's no longer supported by ESLint 9

## 2.1.0

_2023-11-05_

### Added

* `githook` core command to create a new Git hook configuration automatically.

## 2.0.2

_2023-03-23_

### Changed

* Execute build before the tests in CI

## 2.0.1

_2023-03-23_

### Added

* Missing `main` property in package.json to execute CLI

## 2.0.0

_2023-03-23_

### Added

* Code-config CLI.
* `eslint` command to create a new ESLint configuration automatically.
* `stylelint` command to create a new Stylelint configuration automatically.
* Auto-install necessary dependencies when running commands.
* Documentation.

### Changed

* Moves the existing configuration to the `configs/` folder.
* Inverts the language and tool in the folder structure.

## 1.0.0

_2022-07-11_

### Added

* Initial proposal.
